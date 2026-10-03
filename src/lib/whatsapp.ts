export interface OrderNotificationPayload {
  orderId: string;
  customerName: string;
  customerPhone?: string;
  totalAmount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  shippingAddress?: string;
}

/**
 * Formats a phone number for Meta WhatsApp Cloud API (E.164 without leading +)
 */
export function formatWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  // Default to India country code 91 if 10 digits
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
}

/**
 * Sends Meta WhatsApp Cloud API message (text or template)
 */
async function sendMetaWhatsAppMessage(toPhone: string, messageText: string, templateName?: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId || token.includes('placeholder') || token.trim() === '') {
    console.log(
      `[WhatsApp Notification Skipped - Demo/Placeholder Mode] To: ${toPhone} | Message Preview: ${messageText.substring(0, 60)}...`
    );
    return { success: true, mocked: true };
  }

  const formattedTo = formatWhatsAppNumber(toPhone);

  const payload = templateName
    ? {
        messaging_product: 'whatsapp',
        to: formattedTo,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en_US' },
        },
      }
    : {
        messaging_product: 'whatsapp',
        to: formattedTo,
        type: 'text',
        text: { body: messageText },
      };

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error(`[WhatsApp API Error] (${formattedTo}):`, data);
      return { success: false, error: data };
    }

    console.log(`[WhatsApp Sent] Successfully delivered to: ${formattedTo}`);
    return { success: true, data };
  } catch (error) {
    console.error(`[WhatsApp Request Failed] (${formattedTo}):`, error);
    return { success: false, error };
  }
}

/**
 * Trigger order notifications to both Store Admin and Customer
 */
export async function sendWhatsAppOrderNotification(orderDetails: OrderNotificationPayload) {
  const results = { admin: null as any, customer: null as any };

  const itemsSummary = orderDetails.items
    .map((i) => `• ${i.name} x${i.quantity} (₹${i.price})`)
    .join('\n');

  // 1. Admin Notification Message
  const adminMessage =
    `✨ *NEW ORDER RECEIVED!* ✨\n\n` +
    `*Order ID:* ${orderDetails.orderId}\n` +
    `*Customer:* ${orderDetails.customerName}\n` +
    `*Phone:* ${orderDetails.customerPhone || 'N/A'}\n` +
    `*Total Amount:* ₹${orderDetails.totalAmount.toLocaleString('en-IN')}\n\n` +
    `*Items Ordered:*\n${itemsSummary}\n\n` +
    `Check your Admin Dashboard for details.`;

  const adminPhone = process.env.WHATSAPP_ADMIN_NUMBER || process.env.WHATSAPP_TO_NUMBER;
  if (adminPhone) {
    results.admin = await sendMetaWhatsAppMessage(adminPhone, adminMessage);
  }

  // 2. Customer Confirmation Message
  if (orderDetails.customerPhone) {
    const customerMessage =
      `🌸 *Thank you for shopping with S2F Jewels!* 🌸\n\n` +
      `Hi ${orderDetails.customerName},\n` +
      `Your order *#${orderDetails.orderId}* has been confirmed!\n\n` +
      `*Total Amount:* ₹${orderDetails.totalAmount.toLocaleString('en-IN')}\n\n` +
      `*Items:*\n${itemsSummary}\n\n` +
      `We are preparing your handcrafted jewels for dispatch. You can track your order status in your account profile.`;

    results.customer = await sendMetaWhatsAppMessage(
      orderDetails.customerPhone,
      customerMessage,
      process.env.WHATSAPP_CUSTOMER_TEMPLATE_NAME // Optional template if approved by Meta
    );
  }

  return results;
}

