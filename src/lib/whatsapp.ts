export async function sendWhatsAppOrderNotification(orderDetails: {
  orderId: string;
  customerName: string;
  customerPhone?: string;
  totalAmount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}) {
  try {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipientPhone = process.env.WHATSAPP_TO_NUMBER;

    if (!token || !phoneId || !recipientPhone || token.includes('placeholder')) {
      console.log(
        '[WhatsApp Notification Skipped - Demo Mode]: Order confirmed:',
        orderDetails.orderId,
        'Amount: ₹' + orderDetails.totalAmount
      );
      return { success: true, mocked: true };
    }

    const itemsSummary = orderDetails.items
      .map((i) => `• ${i.name} x${i.quantity} (₹${i.price})`)
      .join('\n');

    const messageText = `✨ *NEW ORDER CONFIRMED!* ✨\n\n` +
      `*Order ID:* ${orderDetails.orderId}\n` +
      `*Customer:* ${orderDetails.customerName}\n` +
      `*Phone:* ${orderDetails.customerPhone || 'N/A'}\n` +
      `*Total Amount:* ₹${orderDetails.totalAmount.toLocaleString('en-IN')}\n\n` +
      `*Items Ordered:*\n${itemsSummary}\n\n` +
      `Thank you for using S2F Jewels Order Manager.`;

    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipientPhone,
        type: 'text',
        text: { body: messageText },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('WhatsApp API Error:', data);
      return { success: false, error: data };
    }

    console.log('WhatsApp notification sent successfully to:', recipientPhone);
    return { success: true, data };
  } catch (error) {
    // Wrap in try/catch so notification failures NEVER block or fail the order itself
    console.error('Failed to send WhatsApp order notification:', error);
    return { success: false, error };
  }
}
