export interface OrderNotificationPayload {
  orderId: string;
  customerName: string;
  customerPhone?: string;
  totalAmount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  shippingAddress?: string;
}

/**
 * Formats a phone number into E.164 without leading + (e.g. 91XXXXXXXXXX)
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
 * Sends message via Self-Hosted Baileys WhatsApp Microservice (Primary)
 */
async function sendSelfHostedWhatsAppMessage(toPhone: string, messageText: string) {
  const serviceUrl = process.env.WHATSAPP_SERVICE_URL || 'http://localhost:5001';
  const secret = process.env.WHATSAPP_SERVICE_SECRET || 's2f_whatsapp_secret_key_2026';
  const formattedTo = formatWhatsAppNumber(toPhone);

  try {
    const response = await fetch(`${serviceUrl}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secret}`,
      },
      body: JSON.stringify({
        to: formattedTo,
        message: messageText,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`[WhatsApp Microservice Error] (${formattedTo}):`, data);
      return { success: false, error: data };
    }

    console.log(`[WhatsApp Microservice Sent] Delivered to ${formattedTo} (ID: ${data.messageId})`);
    return { success: true, data };
  } catch (error: any) {
    console.warn(`[WhatsApp Microservice Offline/Unavailable] (${formattedTo}):`, error?.message || error);
    return { success: false, error: error?.message || error, offline: true };
  }
}

/**
 * Sends message via Meta WhatsApp Cloud API (Legacy / Backup)
 */
async function sendMetaWhatsAppMessage(toPhone: string, messageText: string, templateName?: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId || token.includes('placeholder') || token.trim() === '') {
    console.log(`[WhatsApp Meta Notification Skipped] To: ${toPhone} | Message Preview: ${messageText.substring(0, 60)}...`);
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
      console.error(`[Meta WhatsApp API Error] (${formattedTo}):`, data);
      return { success: false, error: data };
    }

    console.log(`[Meta WhatsApp Sent] Successfully delivered to: ${formattedTo}`);
    return { success: true, data };
  } catch (error) {
    console.error(`[Meta WhatsApp Request Failed] (${formattedTo}):`, error);
    return { success: false, error };
  }
}

/**
 * Unified Sender: Tries Self-Hosted Microservice first, falls back to Meta API if configured
 */
async function sendWhatsAppMessage(toPhone: string, messageText: string, templateName?: string) {
  // 1. Try Self-Hosted Microservice
  const selfHostedRes = await sendSelfHostedWhatsAppMessage(toPhone, messageText);
  if (selfHostedRes.success) {
    return selfHostedRes;
  }

  // 2. Fallback to Meta API if Microservice is offline/failed
  return await sendMetaWhatsAppMessage(toPhone, messageText, templateName);
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
    `Check your S2F Jewels Admin Dashboard for details.`;

  const adminPhone = process.env.WHATSAPP_ADMIN_NUMBER || process.env.WHATSAPP_TO_NUMBER;
  if (adminPhone) {
    results.admin = await sendWhatsAppMessage(adminPhone, adminMessage);
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

    results.customer = await sendWhatsAppMessage(
      orderDetails.customerPhone,
      customerMessage,
      process.env.WHATSAPP_CUSTOMER_TEMPLATE_NAME
    );
  }

  return results;
}
