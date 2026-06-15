# Security Rules

1. **Nunca** deixar o frontend comunicar diretamente com banco de dados
2. **Sempre** autenticar com login e senha em todo sistema
3. **Nunca** commitar .env ou secrets no GitHub

# Deploy - Cloudflare Pages Secrets

Set these in Cloudflare Pages Dashboard (`ifaaluwo`):
- Project Settings → Environment variables → Production

| Variable | Value |
|----------|-------|
| `PAYPAL_CLIENT_ID` | `ATL01C45AXIlTU-WGEkhK84Y5h2LaKy9dZmPClzhKJmEt2Egp3Udx3QoLVV_Rnpb6XbhdULxrCfwlV1s` |
| `PAYPAL_SECRET` | `EA-AoTZ01tFRQIvZVnpgLKySUTkIMUKqLPz4ZulA7dQ4GNoYKsoMtxO_jS5cNMVG-SG81spKY0DjP0XB` |
| `FIREBASE_SERVICE_ACCOUNT` | JSON inteiro (minificado em 1 linha) da service account |

**IMPORTANTE**: Após setar as secrets, fazer novo deploy para ativar a Pages Function (`functions/api/activate-subscription.js`). Build command: `npm run build`, Output: `dist`.
