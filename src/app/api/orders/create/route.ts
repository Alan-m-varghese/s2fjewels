import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { razorpay } from '@/lib/razorpay';
import { OrderStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { items, address } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart items are required' }, { status: 400 });
    }

    // Ensure valid User record exists in DB for foreign key constraint
    let dbUser = null;
    if (session?.user?.id) {
      dbUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    }
    if (!dbUser && session?.user?.email) {
      dbUser = await prisma.user.findUnique({ where: { email: session.user.email } });
    }

    if (!dbUser) {
      const email = session?.user?.email || address?.email || 'guest@s2fjewels.com';
      dbUser = await prisma.user.findUnique({ where: { email } });
      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            id: session?.user?.id ? session.user.id : undefined,
            email,
            name: session?.user?.name || address?.name || 'Customer',
            passwordHash: 'dev_no_login_pass',
            phone: session?.user?.phone || address?.phone || null,
          },
        });
      }
    }

    const userId = dbUser.id;

    // Create / retrieve Shipping Address
    let addressId = null;
    if (address) {
      const createdAddress = await prisma.address.create({
        data: {
          userId,
          line1: address.line1 || '123 Main St',
          line2: address.line2 || null,
          city: address.city || 'Mumbai',
          state: address.state || 'Maharashtra',
          postalCode: address.postalCode || '400001',
          country: address.country || 'India',
        },
      });
      addressId = createdAddress.id;
    }

    // Verify products & calculate total
    const DELIVERY_FEE = 100;
    let itemsTotal = 0;
    const orderItemData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        return NextResponse.json({ error: `Product with ID ${item.productId} not found` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 400 });
      }

      const itemPrice = Number(product.price);
      itemsTotal += itemPrice * item.quantity;

      orderItemData.push({
        productId: product.id,
        quantity: item.quantity,
        priceAtPurchase: itemPrice,
      });
    }

    const totalAmount = itemsTotal + DELIVERY_FEE;

    // Create local Order record with status PENDING
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: OrderStatus.PENDING,
        addressId,
        orderItems: {
          create: orderItemData,
        },
      },
      include: {
        orderItems: {
          include: { product: true },
        },
        user: true,
      },
    });

    // Create Razorpay Order via Razorpay API
    let razorpayOrderId = `rzp_order_mock_${order.id}`;

    try {
      if (process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes('placeholder')) {
        const rzpOrder = await razorpay.orders.create({
          amount: Math.round(totalAmount * 100), // Amount in paise
          currency: 'INR',
          receipt: order.id,
          notes: {
            orderId: order.id,
            customerEmail: order.user.email,
          },
        });
        razorpayOrderId = rzpOrder.id;
      }
    } catch (rzpErr) {
      console.warn('Razorpay API call warning (using test mock ID if keys are placeholder):', rzpErr);
    }

    // Update local Order with razorpayOrderId
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { razorpayOrderId },
    });

    return NextResponse.json({
      orderId: updatedOrder.id,
      razorpayOrderId: updatedOrder.razorpayOrderId,
      amount: totalAmount,
      amountPaise: Math.round(totalAmount * 100),
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholderKeyId',
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
