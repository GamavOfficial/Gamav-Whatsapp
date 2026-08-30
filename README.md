# GAMAV WhatsApp

A WhatsApp-only automation platform starter: dashboard, inbox, contacts/labels, visual bot builder, templates, campaigns, developer/webhook console, local mock mode, and a server-side Meta WhatsApp Cloud API adapter.

## Termux
```bash
pkg update
pkg install nodejs
cd gamav-whatsapp
cp .env.example .env
npm start
```
Open http://127.0.0.1:3000

## Real WhatsApp
Run the Node backend on a public HTTPS host, set `MOCK_MODE=false`, then configure `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, and `WHATSAPP_VERIFY_TOKEN`. Never expose the access token to browser code.

## GitHub Pages
The `public/` folder can be published as a static demo. GitHub Pages cannot run the Node backend or receive WhatsApp webhooks; real API/webhook traffic must use a server runtime.
