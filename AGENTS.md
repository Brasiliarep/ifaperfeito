# Security Rules

1. **Nunca** deixar o frontend comunicar diretamente com banco de dados
2. **Sempre** autenticar com login e senha em todo sistema
3. **Nunca** commitar .env ou secrets no GitHub

# Deploy - Cloudflare Pages Secrets

Set these in Cloudflare Pages Dashboard (`ifaaluwo`):
- Project Settings → Environment variables → Production

**IMPORTANTE:** O frontend (Vite) precisa de `VITE_` no prefixo. O backend (Pages Function) lê sem prefixo. São DUAS entradas separadas com o **mesmo valor** para o PayPal Client ID.

**ATENÇÃO:** Como o deploy usa GitHub Actions (não o build nativo do Cloudflare), as variáveis `VITE_*` precisam ser passadas no workflow. Adicione também no **GitHub → Settings → Secrets and variables → Actions**:
| Secret | Value |
|---|----|
| `VITE_PAYPAL_CLIENT_ID` | `ATL01C45AXIlTU...` (valor do Client ID) |
| `VITE_FIREBASE_API_KEY` | `AIzaSyDHW0PpLoUAVaFQrkLt5hSAMQ-ZVOZlK40` |

| Variable (Frontend — Vite) | Variable (Backend — Pages Function) | Value |
|---|---|---|
| `VITE_PAYPAL_CLIENT_ID` | `PAYPAL_CLIENT_ID` | `ATL01C45AXIlTU-WGEkhK84Y5h2LaKy9dZmPClzhKJmEt2Egp3Udx3QoLVV_Rnpb6XbhdULxrCfwlV1s` |
| — | `PAYPAL_SECRET` | `EA-AoTZ01tFRQIvZVnpgLKySUTkIMUKqLPz4ZulA7dQ4GNoYKsoMtxO_jS5cNMVG-SG81spKY0DjP0XB` |
| — | `FIREBASE_SERVICE_ACCOUNT` | JSON inteiro (minificado em 1 linha) da service account |

**IMPORTANTE**: Após setar as secrets, fazer novo deploy para ativar a Pages Function (`functions/api/activate-subscription.js`). Build command: `npm run build`, Output: `dist`.
