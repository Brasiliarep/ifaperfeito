# Security Rules

1. **Nunca** deixar o frontend comunicar diretamente com banco de dados
2. **Sempre** autenticar com login e senha em todo sistema
3. **Nunca** commitar .env ou secrets no GitHub

# Deploy - Cloudflare Pages Secrets

Set these in Cloudflare Pages Dashboard (`ifaaluwo`):
- Project Settings → Environment variables → Production

**IMPORTANTE:** O frontend (Vite) precisa de `VITE_` no prefixo. O backend (Pages Function) lê sem prefixo. São DUAS entradas separadas com o **mesmo valor** para o PayPal Client ID.

**ATENÇÃO:** Como o deploy usa GitHub Actions (não o build nativo do Cloudflare), as variáveis `VITE_*` precisam ser passadas no workflow. Adicione também no **GitHub → Settings → Secrets and variables → Actions**:

| Variable (Frontend — Vite) | Variable (Backend — Pages Function) |
|---|---|
| `VITE_PAYPAL_CLIENT_ID` | `PAYPAL_CLIENT_ID` |
| `VITE_FIREBASE_API_KEY` | `FIREBASE_API_KEY` |
| — | `PAYPAL_SECRET` |
| — | `FIREBASE_SERVICE_ACCOUNT` |
| — | `GROQ_API_KEY` |

**VALORES:** Configure as variáveis acima no Cloudflare Dashboard e GitHub Secrets com os valores reais. **NUNCA** coloque os valores reais neste arquivo.

**IMPORTANTE**: Após setar as secrets, fazer novo deploy para ativar a Pages Function (`functions/api/activate-subscription.js`). Build command: `npm run build`, Output: `dist`.

# Segurança Adicionada (2026-07-16)

## Endpoints Protegidos

### /api/activate-subscription
- Requer autenticação Firebase (ID Token no header Authorization)
- Verifica se o UID do token corresponde ao UID no body
- CORS restrito para domínios permitidos

### /api/groq-proxy
- Requer autenticação Firebase (ID Token no header Authorization)
- Rate limiting: 30 requisições por minuto por IP
- Validação de input (modelo, mensagens, max_tokens)
- CORS restrito para domínios permitidos

## Domínios Permitidos
- https://ifaoluwo.com
- https://www.ifaoluwo.com
- https://ifaoluwo.com.br
- https://www.ifaoluwo.com.br
- http://localhost:3001 (desenvolvimento)
