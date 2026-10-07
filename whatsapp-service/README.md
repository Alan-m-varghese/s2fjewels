# 📱 S2F Jewels WhatsApp Microservice

Self-hosted, open-source WhatsApp notification microservice powered by **Node.js**, **Express**, and **`@whiskeysockets/baileys`**.

---

## 🚀 How to Start the Service

### 1. Start in Development Mode
```bash
cd whatsapp-service
node server.js
```

### 2. Scan the QR Code
1. When you run `node server.js`, a QR code will print in your terminal window.
2. Open **WhatsApp** on your phone -> **Settings / Menu** -> **Linked Devices** -> **Link a Device**.
3. Scan the QR code displayed in the terminal.

Once scanned:
- You will see: `✅ [WhatsApp Service] WhatsApp Client Connected & Ready for Orders!`
- Session auth keys are saved to `whatsapp-service/auth_info_baileys/`.
- You do **NOT** need to scan the QR code again on future restarts!

---

## 🌐 API Endpoints

### Connection Status
* `GET http://localhost:5001/status`
* Returns current connection state (`connected`, `qr_ready`, `disconnected`) and active QR code.

### Send WhatsApp Message
* `POST http://localhost:5001/send-message`
* **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer s2f_whatsapp_secret_key_2026`
* **Body:**
  ```json
  {
    "to": "919037812684",
    "message": "Hello from S2F Jewels!"
  }
  ```

---

## 🔄 Running in Production (PM2)
To keep the WhatsApp microservice running continuously in the background on your server:

```bash
npm install -g pm2
cd whatsapp-service
pm2 start server.js --name "s2f-whatsapp"
pm2 save
```
