# Relatório de Auditoria de Segurança - iFA Oluwo

**Data:** 2026-07-16
**Auditor:** opencode + Anthropic Cybersecurity Skills
**Escopo:** Análise de código estático (SAST) - Frontend, Backend, APIs

---

## Resumo Executivo

Foram identificadas **4 vulnerabilidades críticas**, **5 de alta severidade**, **4 de média** e **3 de baixa**. As vulnerabilidades críticas permitem: ativação de assinaturas para qualquer usuário, uso não autorizado da API Groq, e exposição de chaves de API.

---

## CRÍTICO (CVSS 9.0-10.0)

### 1. BOLA/IDOR na Ativação de Assinatura
**ID:** SEC-001
**Severidade:** Crítica (CVSS 9.8)
**Arquivo:** `functions/api/activate-subscription.js:28`
**OWASP API:** API1:2023 - Broken Object Level Authorization

**Descrição:**
O endpoint aceita `uid` no body da requisição sem verificar se o chamador é realmente esse usuário. Qualquer pessoa pode enviar um POST com o `uid` de outro usuário e ativar uma assinatura para ele.

**PoC:**
```bash
curl -X POST https://ifaoluwo.com/api/activate-subscription \
  -H "Content-Type: application/json" \
  -d '{"subscriptionId":"FAKE123","uid":"VITIMA_UID_AQUI","planKey":"anual"}'
```

**Impacto:**
Qualquer usuário autenticado pode conceder assinatura Pro Anual para qualquer outro usuário, bypassando completamente o pagamento.

**Correção:**
```javascript
// Adicionar verificação de autenticação
const authHeader = request.headers.get('Authorization');
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
}
// Verificar se o uid do token corresponde ao uid do body
```

---

### 2. API Key Exposta no Proxy Groq
**ID:** SEC-002
**Severidade:** Crítica (CVSS 9.5)
**Arquivo:** `functions/api/groq-proxy.js:24`
**CWE:** CWE-798 - Use of Hard-coded Credentials

**Descrição:**
O proxy Groq tem `Access-Control-Allow-Origin: *` e não requer autenticação. Qualquer pessoa pode usar sua chave de API Groq fazendo chamadas diretas ao endpoint.

**PoC:**
```bash
curl -X POST https://ifaoluwo.com/api/groq-proxy \
  -H "Content-Type: application/json" \
  -d '{"model":"llama-3.3-70b-versatile","messages":[{"role":"user","content":"Hi"}]}'
```

**Impacto:**
Uso não autorizado da sua API Groq, gerando custos financeiros e potencial abuso para geração de conteúdo malicioso.

**Correção:**
```javascript
// Adicionar autenticação e rate limiting
const authHeader = request.headers.get('Authorization');
if (!authHeader) {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
}
// Implementar rate limiting por IP/usuário
```

---

### 3. Chaves de API no AGENTS.md
**ID:** SEC-003
**Severidade:** Crítica (CVSS 9.2)
**Arquivo:** `AGENTS.md`
**CWE:** CWE-798 - Use of Hard-coded Credentials

**Descrição:**
O arquivo `AGENTS.md` contém `PAYPAL_SECRET` e `FIREBASE_SERVICE_ACCOUNT` em texto puro. Este arquivo é commitado no Git.

**Impacto:**
Se o repositório for público ou comprometido, todas as suas chaves de API ficam expostas.

**Correção:**
- Remover secrets do AGENTS.md
- Usar variáveis de ambiente em todos os ambientes
- Rotacionar todas as chaves comprometidas

---

### 4. Variáveis de Ambiente no .env
**ID:** SEC-004
**Severidade:** Crítica (CVSS 9.0)
**Arquivo:** `.env`
**CWE:** CWE-312 - Cleartext Storage of Sensitive Information

**Descrição:**
O arquivo `.env` contém `GEMINI_API_KEY` e 6 chaves `nvapi-*` em texto puro. Embora `.gitignore` inclua `.env`, o arquivo existe no workspace.

**Impacto:**
Se o repositório for comprometido, todas as chaves de API ficam expostas.

**Correção:**
- Verificar se `.env` nunca foi commitado: `git log --all --full-history -- .env`
- Se foi, rotacionar todas as chaves
- Usar Cloudflare Secrets para todas as chaves

---

## ALTO (CVSS 7.0-8.9)

### 5. CORS Wildcard em Todos os Endpoints
**ID:** SEC-005
**Severidade:** Alta (CVSS 8.1)
**Arquivos:** `functions/api/activate-subscription.js:17`, `functions/api/groq-proxy.js:6`
**CWE:** CWE-942 - Permissive Cross-domain Policy

**Descrição:**
Todos os endpoints usam `Access-Control-Allow-Origin: *`, permitindo chamadas de qualquer origem.

**Impacto:**
Qualquer site malicioso pode fazer chamadas aos seus endpoints usando as credenciais do usuário.

**Correção:**
```javascript
const ALLOWED_ORIGINS = ['https://ifaoluwo.com', 'https://www.ifaoluwo.com'];
const origin = request.headers.get('Origin');
if (!ALLOWED_ORIGINS.includes(origin)) {
  return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers });
}
headers['Access-Control-Allow-Origin'] = origin;
```

---

### 6. VIP Emails Hardcoded
**ID:** SEC-006
**Severidade:** Alta (CVSS 7.5)
**Arquivo:** `services/AuthContext.tsx:70`
**CWE:** CWE-798 - Use of Hard-coded Credentials

**Descrição:**
A lista de emails VIP/admin está hardcoded no código fonte:
```javascript
const VIP_EMAILS = ['safffnb@gmail.com', 'raquel.rafen@gmail.com', 'babaifalore@gmail.com', 'babaifalote@gmail.com'];
```

**Impacto:**
- Qualquer pessoa com acesso ao código fonte sabe quais emails dão acesso admin
- Impossível mudar sem redeploy
- Viola o princípio de menor privilégio

**Correção:**
- Usar Firebase Custom Claims para roles
- Ou buscar lista de admins do Firestore (com cache)

---

### 7. CSP Extremamente Permissivo
**ID:** SEC-007
**Severidade:** Alta (CVSS 7.2)
**Arquivo:** `vite.config.ts:33`
**CWE:** CWE-693 - Protection Mechanism Failure

**Descrição:**
O Content Security Policy permite tudo:
```
default-src * 'self' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval'
```

**Impacto:**
Não protege contra XSS, injection, ou outras attacks de conteúdo.

**Correção:**
```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.groq.com https://*.googleapis.com;
```

---

### 8. Domínio Lock Bypassável
**ID:** SEC-008
**Severidade:** Alta (CVSS 7.0)
**Arquivo:** `utils/security.ts:9,43`
**CWE:** CWE-287 - Improper Authentication

**Descrição:**
A proteção de domínio pode ser bypassada com:
- `?admin=true` na URL
- `localStorage.setItem('ifa_dev_mode', 'true')`

**Impacto:**
Qualquer pessoa pode contornar as proteções de cópia/clonagem.

**Correção:**
- Remover os bypasses de client-side
- Implementar verificação server-side quando necessário

---

### 9. Sem Rate Limiting nos Endpoints
**ID:** SEC-009
**Severidade:** Alta (CVSS 7.0)
**Arquivo:** `functions/api/groq-proxy.js`, `functions/api/activate-subscription.js`
**CWE:** CWE-770 - Allocation of Resources Without Limits

**Descrição:**
Nenhum dos endpoints implementa rate limiting.

**Impacto:**
- Brute force em autenticação
- Abuso de API Groq
- Ataques de negação de serviço

**Correção:**
Implementar rate limiting using Cloudflare Rate Limiting rules ou no código:
```javascript
const rateLimit = new Map();
// Implementar lógica de rate limiting por IP
```

---

## MÉDIO (CVSS 4.0-6.9)

### 10. Uso de Service Account no Frontend
**ID:** SEC-010
**Severidade:** Média (CVSS 6.5)
**Arquivo:** `functions/api/activate-subscription.js:54`
**CWE:** CWE-250 - Execution with Unnecessary Privileges

**Descrição:**
A Cloudflare Function usa uma Firebase Service Account com acesso completo ao Firestore para atualizar apenas um documento de usuário.

**Impacto:**
Se a Service Account for comprometida, o atacante tem acesso total ao Firestore.

**Correção:**
- Usar uma Service Account com escopo mínimo (apenas escrever em `users/{uid}`)
- Ou usar Firebase Admin SDK com regras mais restritivas

---

### 11. Tracking de Uso Apenas Client-Side
**ID:** SEC-011
**Severidade:** Média (CVSS 6.0)
**Arquivo:** `utils/anonymousTracker.ts`
**CWE:** CWE-602 - Client-Side Enforcement of Server-Side Security

**Descrição:**
O controle de uso anônimo é feito apenas via `localStorage`, facilmente manipulável.

**Impacto:**
Usuários anônimos podem bypassar os limites de uso.

**Correção:**
- Implementar rate limiting server-side
- Usar Firebase Anonymous Auth + Firestore rules

---

### 12. Mensagens de Erro Informativas
**ID:** SEC-012
**Severidade:** Média (CVSS 5.5)
**Arquivo:** `functions/api/activate-subscription.js:60`
**CWE:** CWE-209 - Generation of Error Message Containing Sensitive Information

**Descrição:**
As mensagens de erro expõem detalhes internos:
```javascript
return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
```

**Impacto:**
Revela informações sobre tecnologias internas e potenciais vetores de ataque.

**Correção:**
```javascript
console.error('Error:', error); // Log detalhado no servidor
return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
```

---

### 13. Download de Código Fonte
**ID:** SEC-013
**Severidade:** Média (CVSS 5.0)
**Arquivo:** `services/storageService.ts`
**CWE:** CWE-200 - Exposure of Sensitive Information

**Descrição:
A função `downloadSourceCode` permite baixar o código fonte completo da aplicação.

**Impacto:**
Exposição de lógica de negócio, possíveis secrets hardcoded, e facilita engenharia reversa.

**Correção:**
- Limitar esta funcionalidade apenas para admins
- Ou remover completamente em produção

---

## BAIXO (CVSS 0.1-3.9)

### 14. Proteções de UI Ineficazes
**ID:** SEC-014
**Severidade:** Baixa (CVSS 3.1)
**Arquivo:** `utils/security.ts`
**CWE:** CWE-693 - Protection Mechanism Failure

**Descrição:**
Desabilitar click direito e DevTools são proteções cosméticas, trivialmente bypassáveis.

**Impacto:**
Nenhuma proteção real contra inspeção ou cópia.

**Correção:**
- Aceitar que client-side não é seguro para proteção de IP
- Implementar proteção server-side quando necessário

---

### 15. Múltiplos Alvos de Deploy
**ID:** SEC-015
**Severidade:** Baixa (CVSS 3.0)
**Arquivos:** `netlify.toml`, `vercel.json`, `firebase.json`
**CWE:** CWE-16 - Configuration

**Descrição:**
O projeto tem configs para Cloudflare Pages, Netlify e Vercel, criando risco de configuração inconsistente.

**Impacto:**
Diferenças entre ambientes podem criar vulnerabilities.

**Correção:**
- Manter apenas o target de deploy principal
- Remover configs legadas

---

### 16. .wrangler/ no Repositório
**ID:** SEC-016
**Severidade:** Baixa (CVSS 2.5)
**Arquivo:** `.wrangler/`
**CWE:** CWE-538 - Insertion of Sensitive Information into Externally-Accessible File

**Descrição:**
O diretório `.wrangler/` pode conter tokens cacheados do Cloudflare.

**Impacto:**
Se o repositório for comprometido, tokens podem ser extraídos.

**Correção:**
- Adicionar `.wrangler/` ao `.gitignore`
- Remover do repositório se já estiver commitado

---

## Recomendações Prioritárias

### Imediato (Esta Semana)
1. **SEC-001:** Adicionar verificação de autenticação no `activate-subscription.js`
2. **SEC-002:** Adicionar autenticação e rate limiting no `groq-proxy.js`
3. **SEC-003:** Remover secrets do AGENTS.md e rotacionar chaves
4. **SEC-005:** Restringir CORS para domínios permitidos

### Curto Prazo (Próximo Mês)
5. **SEC-006:** Migrar VIP emails para Firebase Custom Claims
6. **SEC-007:** Implementar CSP adequado
7. **SEC-009:** Implementar rate limiting em todos os endpoints
8. **SEC-012:** Generealizar mensagens de erro

### Médio Prazo (Próximos 3 Meses)
9. **SEC-010:** Revisar permissões da Service Account
10. **SEC-011:** Implementar rate limiting server-side
11. **SEC-013:** Limitar download de código fonte

---

## Conclusão

O app iFA Oluwo tem vulnerabilidades significativas que precisam ser endereçadas urgentemente, especialmente as relacionadas à autenticação e autorização nos endpoints da API. Recomenda-se implementar as correções imediatas antes de qualquer expansão de base de usuários.

---

*Relatório gerado usando Anthropic Cybersecurity Skills (MITRE ATT&CK Mapped)*
