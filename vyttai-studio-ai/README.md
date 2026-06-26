# VYTTAI STUDIO AI — Backend MVP 1

Backend modular monolith do MVP 1, construído com Node.js, TypeScript, Express, Prisma e PostgreSQL.

## Instalação

```bash
npm install
```

## Configuração

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Exemplo:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vyttai_studio_ai?schema=public"
PORT=3333
```

## Prisma

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

O seed inicial cria:

- Workspace `SF GROUP`
- Usuário admin inicial
- IFÁ OLUWO
- PEPTIUM
- VYTTAI
- SF PERFORMANCE
- SF IMPORTS
- Brand Brain inicial de cada marca

## Rodar servidor

```bash
npm run dev
```

Servidor:

```text
http://localhost:3333
```

## Interface MVP

A primeira UI do produto fica no proprio backend:

```text
http://localhost:3333
```

Ela permite:

- escolher uma marca
- criar campanha
- rodar o Campaign Orchestrator v1.1
- renderizar slides do output `creative-output.v1.1`
- aprovar, rejeitar ou pedir ajuste
- ver eventos de memoria da marca

## Endpoints MVP 1

### Health

- `GET /health`

### Workspace

- `GET /workspace/current`

### Brands

- `GET /brands`
- `GET /brands/:id`

### Brand Brain

- `PUT /brand-brains/:brandId`

Body:

```json
{
  "identity": {},
  "voice": {},
  "visual": {},
  "rules": {},
  "knowledge": {}
}
```

### Campaigns

- `POST /campaigns`

Body:

```json
{
  "brandId": "string",
  "userId": "string",
  "name": "Campanha exemplo",
  "objective": "captar assinantes",
  "theme": "O que é Odù?",
  "mode": "creator"
}
```

- `POST /campaigns/:id/run`

Dispara o Campaign Orchestrator v1.1:

1. Consulta Brand Brain
2. Monta contexto da campanha
3. Executa Strategy Agent
4. Executa Copy Agent
5. Executa Prompt Engine
6. Monta contrato `creative-output.v1.1`
7. Salva output e versão 1
8. Cria evento de memória `generation`

Formato do output:

```json
{
  "schemaVersion": "creative-output.v1.1",
  "type": "carousel",
  "brand": {
    "id": "string",
    "name": "IFÁ OLUWO",
    "slug": "ifa-oluwo"
  },
  "campaign": {
    "id": "string",
    "name": "Campanha exemplo",
    "objective": "captar assinantes",
    "theme": "O que é Odù?",
    "mode": "creator"
  },
  "strategy": {
    "objective": "string",
    "audience": "string",
    "promise": "string",
    "angle": "string",
    "emotion": "string",
    "insight": "string",
    "objections": []
  },
  "creative": {
    "title": "string",
    "slides": [
      {
        "number": 1,
        "intent": "hook",
        "role": "hook",
        "headline": "string",
        "body": "string",
        "visualDirection": "string",
        "imagePrompt": "string",
        "layoutHint": "bold"
      }
    ],
    "caption": "string",
    "hashtags": [],
    "cta": "string"
  },
  "design": {
    "palette": [],
    "style": "string",
    "typographyMood": "string",
    "symbols": [],
    "layoutSystem": "cinematic"
  },
  "compliance": {
    "warnings": [],
    "requiredDisclaimers": []
  },
  "metadata": {
    "orchestratorVersion": "campaign-orchestrator.v1.1",
    "generatedAt": "string",
    "agentTrace": [],
    "renderReady": true
  }
}
```

### Approvals

- `POST /approvals`

Body:

```json
{
  "outputId": "string",
  "userId": "string",
  "status": "approved",
  "feedback": "Gostei da estrutura e do tom.",
  "qualityScore": 9,
  "whatChanged": "Aprovado sem ajustes."
}
```

Status aceitos:

- `approved`
- `rejected`
- `needs_changes`

Ao enviar uma aprovação, o sistema:

1. Cria um registro em `Approval`
2. Atualiza o status do `CreativeOutput`
3. Cria um `CreativeMemoryEvent` automático para a marca

### Memory

- `POST /memory/events`
- `GET /memory/brand/:brandId/events`

### Observability

- `GET /observability/campaign/:campaignId/runs`
- `GET /observability/output/:outputId/run`

Cada execução do Orchestrator registra:

- status
- duração total
- etapas executadas
- duração por etapa
- decisões importantes
- erro, se houver

### Insights

- `GET /insights/brand/:brandId`

Agrega:

- runs por marca
- taxa de aprovação
- score médio
- tempo médio do Orchestrator
- etapas mais custosas
- eventos de memória recentes

Body manual:

```json
{
  "brandId": "string",
  "outputId": "string",
  "eventType": "manual_note",
  "payload": {
    "reason": "Esse estilo ficou mais próximo da marca.",
    "qualityScore": 8
  }
}
```

Event types aceitos:

- `generation`
- `approval`
- `rejection`
- `needs_changes`
- `edit`
- `manual_note`

## Estado atual

Este estágio entrega:

- Backend real separado do projeto IFÁ atual
- Estrutura modular monolith
- Banco modelado para MVP 1
- Brand Brain estruturado
- Campaign Orchestrator v1.1 sem API externa
- Strategy Agent simples
- Copy Agent simples
- Prompt Engine visual simples
- Creative Output versionado com contrato render-ready
- Approval Flow
- Creative Memory Events automaticos
- Orchestrator observability com trace de decisoes
- Brand Insights Dashboard

Fora do MVP atual:

- Vídeo
- Viral Radar
- Editor visual avançado
- Integrações com redes sociais
- Publicação automática
