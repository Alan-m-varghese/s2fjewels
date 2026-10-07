const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const QRCode = require('qrcode');
const pino = require('pino');
const path = require('path');
const fs = require('fs');

dotenv.config();

// Import Baileys
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require('@whiskeysockets/baileys');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const SERVICE_SECRET = process.env.WHATSAPP_SERVICE_SECRET || 's2f_whatsapp_secret_key_2026';
const AUTH_FOLDER = path.join(__dirname, 'auth_info_baileys');

let sock = null;
let connectionStatus = 'disconnected'; // 'connecting' | 'qr_ready' | 'connected' | 'disconnected'
let currentQRDataUrl = null;
let currentRawQR = null;

// Format phone number to WhatsApp JID format (e.g., 919876543210@s.whatsapp.net)
function formatToJid(phone) {
  let cleaned = phone.toString().replace(/\D/g, '');
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return `${cleaned}@s.whatsapp.net`;
}

async function connectToWhatsApp() {
  connectionStatus = 'connecting';
  currentQRDataUrl = null;
  currentRawQR = null;

  if (!fs.existsSync(AUTH_FOLDER)) {
    fs.mkdirSync(AUTH_FOLDER, { recursive: true });
  }

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);
  const { version } = await fetchLatestBaileysVersion();

  console.log(`\n[WhatsApp Service] Starting Baileys v${version.join('.')}...`);

  sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    browser: ['S2F Jewels Store', 'Chrome', '1.0.0'],
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      currentRawQR = qr;
      connectionStatus = 'qr_ready';
      try {
        currentQRDataUrl = await QRCode.toDataURL(qr, { margin: 2, scale: 8 });
      } catch (err) {
        console.error('Failed to generate QR data URL:', err);
      }
      console.log(`\n📱 [WhatsApp Service] NEW QR CODE GENERATED! View and scan cleanly in browser:`);
      console.log(`👉  http://localhost:${PORT}/\n`);
    }

    if (connection === 'close') {
      connectionStatus = 'disconnected';
      currentQRDataUrl = null;
      currentRawQR = null;
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      console.log(`[WhatsApp Service] Connection closed (${lastDisconnect?.error?.message || statusCode}). Reconnecting: ${shouldReconnect}`);

      if (shouldReconnect) {
        setTimeout(connectToWhatsApp, 3000);
      } else {
        console.log('[WhatsApp Service] Logged out. Delete auth_info_baileys folder to reset.');
      }
    } else if (connection === 'open') {
      connectionStatus = 'connected';
      currentQRDataUrl = null;
      currentRawQR = null;
      console.log('\n✅ [WhatsApp Service] Connected successfully & ready for order notifications!\n');
    }
  });
}

// Middleware
function authenticateSecret(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['x-api-key'];
  const token = authHeader ? authHeader.replace('Bearer ', '') : req.query.secret;

  if (SERVICE_SECRET && token !== SERVICE_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid WhatsApp secret token' });
  }
  next();
}

// Web Browser Page for Easy QR Code Scanning
app.get(['/', '/qr'], (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>S2F Jewels - WhatsApp Pair Service</title>
      <style>
        * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: #1e293b; padding: 32px; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); text-align: center; max-width: 440px; width: 100%; border: 1px solid #334155; }
        h1 { margin: 0 0 8px; font-size: 24px; color: #38bdf8; }
        p { color: #94a3b8; font-size: 14px; margin-bottom: 24px; line-height: 1.5; }
        .badge { display: inline-block; padding: 6px 16px; border-radius: 9999px; font-weight: 600; font-size: 13px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
        .badge.connected { background: #059669; color: #ecfdf5; }
        .badge.qr_ready { background: #d97706; color: #fffbeb; }
        .badge.connecting { background: #2563eb; color: #eff6ff; }
        .badge.disconnected { background: #dc2626; color: #fef2f2; }
        .qr-container { background: #ffffff; padding: 16px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); margin-bottom: 20px; min-width: 280px; min-height: 280px; }
        img { width: 250px; height: 250px; display: block; border: none; }
        .spinner { border: 4px solid #334155; border-top: 4px solid #38bdf8; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 100px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .footer { font-size: 12px; color: #64748b; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>💎 S2F Jewels WhatsApp</h1>
        <p>Link your WhatsApp phone to send order confirmation messages automatically.</p>
        <div id="statusBadge" class="badge ${connectionStatus}">${connectionStatus.replace('_', ' ')}</div>
        <div class="qr-container" id="qrContainer">
          <div class="spinner"></div>
        </div>
        <div class="footer">Open WhatsApp → Settings → Linked Devices → Link a Device</div>
      </div>

      <script>
        let lastQR = '';
        async function checkStatus() {
          try {
            const res = await fetch('/status');
            const data = await res.json();
            const badge = document.getElementById('statusBadge');
            const container = document.getElementById('qrContainer');

            badge.className = 'badge ' + data.status;
            badge.innerText = data.status.replace('_', ' ');

            if (data.status === 'connected') {
              container.innerHTML = '<div style="color: #059669; padding: 80px 0; font-weight: bold; font-size: 18px;">✅ WhatsApp Connected!</div>';
            } else if (data.qrCodeDataUrl) {
              if (lastQR !== data.qrCodeDataUrl) {
                lastQR = data.qrCodeDataUrl;
                container.innerHTML = '<img src="' + data.qrCodeDataUrl + '" alt="Scan WhatsApp QR">';
              }
            } else {
              container.innerHTML = '<div class="spinner"></div>';
            }
          } catch(e) { console.error(e); }
        }

        setInterval(checkStatus, 1500);
        checkStatus();
      </script>
    </body>
    </html>
  `);
});

// Status API
app.get('/status', (req, res) => {
  res.json({
    status: connectionStatus,
    qrAvailable: !!currentQRDataUrl,
    qrCodeDataUrl: currentQRDataUrl || null,
    timestamp: new Date().toISOString(),
  });
});

// Send WhatsApp Text Message Endpoint
app.post('/send-message', authenticateSecret, async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'Missing required parameters: "to" and "message"' });
    }

    if (connectionStatus !== 'connected' || !sock) {
      console.warn(`[WhatsApp Service] Message skipped to ${to} (WhatsApp client not connected)`);
      return res.status(503).json({
        error: 'WhatsApp service is not currently connected.',
        status: connectionStatus,
      });
    }

    const jid = formatToJid(to);
    console.log(`[WhatsApp Service] Sending message to ${jid}...`);

    const result = await sock.sendMessage(jid, { text: message });

    console.log(`[WhatsApp Service] Message delivered to ${jid} (ID: ${result.key.id})`);

    return res.json({
      success: true,
      messageId: result.key.id,
      to: jid,
    });
  } catch (error) {
    console.error('[WhatsApp Service Error]:', error);
    return res.status(500).json({
      error: 'Failed to send WhatsApp message',
      details: error.message,
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 [WhatsApp Service] API Server running at http://localhost:${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT}/ to view and scan the clean QR code in your browser!\n`);
  connectToWhatsApp();
});
