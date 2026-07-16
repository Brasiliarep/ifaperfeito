import { jwtVerify, importPKCS8 } from 'jose';

const FIREBASE_PROJECT_ID = 'ifa-oluwo';
const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions';
const MAX_TOKENS = 4096;
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 30;

const ALLOWED_ORIGINS = [
  'https://ifaoluwo.com',
  'https://www.ifaoluwo.com',
  'https://ifaoluwo.com.br',
  'https://www.ifaoluwo.com.br',
  'http://localhost:3001',
];

const rateLimitMap = new Map();

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }
  record.count++;
  if (record.count > RATE_LIMIT_MAX) return false;
  return true;
}

async function verifyFirebaseToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization header');
  }
  const token = authHeader.split('Bearer ')[1];
  const publicKeyResponse = await fetch(
    `https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com`
  );
  const publicKeys = await publicKeyResponse.json();
  const { payload } = await jwtVerify(
    token,
    async (header) => {
      const kid = header.kid;
      const publicKey = publicKeys[kid];
      if (!publicKey) throw new Error('Invalid token kid');
      return await importPKCS8(publicKey, 'RS256');
    },
    { issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}` }
  );
  return payload;
}

function validateInput(body) {
  if (!body || typeof body !== 'object') return false;
  if (!body.model || typeof body.model !== 'string') return false;
  if (!Array.isArray(body.messages)) return false;
  if (body.messages.length === 0 || body.messages.length > 50) return false;
  for (const msg of body.messages) {
    if (!msg.role || !['system', 'user', 'assistant'].includes(msg.role)) return false;
    if (!msg.content || typeof msg.content !== 'string') return false;
    if (msg.content.length > 10000) return false;
  }
  if (body.max_tokens && (typeof body.max_tokens !== 'number' || body.max_tokens > MAX_TOKENS)) {
    return false;
  }
  return true;
}

export async function onRequest(context) {
  const { request, env } = context;
  const headers = getCorsHeaders(request);

  if (request.method === 'OPTIONS') return new Response(null, { headers });
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429, headers });
  }

  try {
    const authHeader = request.headers.get('Authorization');
    await verifyFirebaseToken(authHeader);

    const body = await request.json();
    if (!validateInput(body)) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers });
    }

    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Service unavailable' }), { status: 503, headers });
    }

    const groqResponse = await fetch(GROQ_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: body.model,
        messages: body.messages,
        max_tokens: body.max_tokens || 2048,
        temperature: body.temperature || 0.7,
      }),
    });

    if (!groqResponse.ok) {
      console.error('Groq API error:', groqResponse.status);
      return new Response(JSON.stringify({ error: 'AI service error' }), { status: 502, headers });
    }

    const data = await groqResponse.json();
    return new Response(JSON.stringify(data), { status: 200, headers });

  } catch (error) {
    console.error('groq-proxy error:', error.message);
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
