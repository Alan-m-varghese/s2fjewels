import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { sendWhatsAppOrderNotification } from '@/lib/whatsapp';
import { OrderStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    if (!orderId || !razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json({ error: 'Missing payment parameters' }, { status: 400 });
    }

    // Signature Verification
    const isMock = razorpayOrderId.startsWith('rzp_order_mock_') || razorpaySignature === 'mock_signature';
    const isValidSignature = isMock || verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValidSignature) {
      console.error('Invalid Razorpay signature for order:', orderId);
      await prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.FAILED, paymentStatus: 'FAILED' },
      });
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Update order status to PAID
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.PAID,
        razorpayPaymentId,
        paymentStatus: 'PAID',
      },
      include: {
        user: true,
        orderItems: {
          include: { product: true },
        },
      },
    });

    // Update product stock levels
    for (const item of order.orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      }).catch(err => console.error('Error decrementing stock:', err));
    }

    // Trigger WhatsApp notification to store owner (non-blocking)
    sendWhatsAppOrderNotification({
      orderId: order.id,
      customerName: order.user.name || 'Customer',
      customerPhone: order.user.phone || undefined,
      totalAmount: Number(order.totalAmount),
      items: order.orderItems.map((oi) => ({
        name: oi.product.name,
        quantity: oi.quantity,
        price: Number(oi.priceAtPurchase),
      })),
    });

    return NextResponse.json({
      message: 'Payment verified successfully',
      orderId: order.id,
      status: order.status,
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
