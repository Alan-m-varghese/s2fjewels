import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { sendWhatsAppOrderNotification } from '@/lib/whatsapp';
import { OrderStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    // Verify webhook signature if secret is configured
    if (process.env.RAZORPAY_WEBHOOK_SECRET && !process.env.RAZORPAY_WEBHOOK_SECRET.includes('placeholder')) {
      const isValid = verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        console.error('Invalid Razorpay Webhook signature');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    if (event === 'payment.captured') {
      const paymentEntity = payload.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      // Find local order by razorpayOrderId
      const order = await prisma.order.findFirst({
        where: { razorpayOrderId },
        include: {
          user: true,
          orderItems: { include: { product: true } },
        },
      });

      if (order && order.status !== OrderStatus.PAID) {
        // Mark as PAID (Source of Truth)
        const updatedOrder = await prisma.order.update({
          where: { id: order.id },
          data: {
            status: OrderStatus.PAID,
            razorpayPaymentId,
            paymentStatus: 'PAID',
          },
        });

        // Trigger WhatsApp Notification
        await sendWhatsAppOrderNotification({
          orderId: order.id,
          customerName: order.user.name || 'Customer',
          customerPhone: order.user.phone || undefined,
          totalAmount: Number(updatedOrder.totalAmount),
          items: order.orderItems.map((oi) => ({
            name: oi.product.name,
            quantity: oi.quantity,
            price: Number(oi.priceAtPurchase),
          })),
        });

        console.log(`[Webhook] Order ${order.id} updated to PAID and WhatsApp notification triggered.`);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Razorpay Webhook Handler Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
