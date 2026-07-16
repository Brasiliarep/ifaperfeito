import { SignJWT, importPKCS8, jwtVerify } from 'jose';

const PAYPAL_API = 'https://api-m.paypal.com';
const SCOPE = 'https://www.googleapis.com/auth/datastore';
const FIREBASE_PROJECT_ID = 'ifa-oluwo';

const ALLOWED_ORIGINS = [
  'https://ifaoluwo.com',
  'https://www.ifaoluwo.com',
  'https://ifaoluwo.com.br',
  'https://www.ifaoluwo.com.br',
  'http://localhost:3001',
];

const PLAN_MAP = {
  estudante: 'student_monthly',
  mensal: 'pro_monthly',
  anual: 'pro_annual',
};

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

export async function onRequest(context) {
  const { request, env } = context;
  const headers = getCorsHeaders(request);

  if (request.method === 'OPTIONS') return new Response(null, { headers });
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  try {
    const authHeader = request.headers.get('Authorization');
    const caller = await verifyFirebaseToken(authHeader);

    const { subscriptionId, uid, planKey } = await request.json();

    if (!subscriptionId || !uid || !planKey) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers });
    }

    if (caller.sub !== uid) {
      console.warn(`UID mismatch: caller=${caller.sub}, target=${uid}`);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403, headers });
    }

    const plan = PLAN_MAP[planKey];
    if (!plan) {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), { status: 400, headers });
    }

    const paypalToken = await getPayPalAccessToken(env.PAYPAL_CLIENT_ID, env.PAYPAL_SECRET);
    const subscription = await getPayPalSubscription(paypalToken, subscriptionId);

    if (subscription.status !== 'ACTIVE') {
      return new Response(JSON.stringify({ error: 'Subscription not active' }), { status: 400, headers });
    }

    const now = Date.now();
    const validUntil = plan === 'pro_annual'
      ? new Date(now + 365 * 24 * 60 * 60 * 1000).toISOString()
      : new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();

    const firebaseToken = await getFirebaseAccessToken(env.FIREBASE_SERVICE_ACCOUNT);
    await updateFirestore(firebaseToken, uid, { plan, validUntil, paypalSubscriptionId: subscriptionId });

    return new Response(JSON.stringify({ success: true, plan, validUntil }), { headers });
  } catch (error) {
    console.error('activate-subscription error:', error.message);
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

async function getPayPalAccessToken(clientId, secret) {
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error('Payment provider authentication failed');
  const data = await res.json();
  return data.access_token;
}

async function getPayPalSubscription(token, id) {
  const res = await fetch(`${PAYPAL_API}/v1/billing/subscriptions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Subscription verification failed');
  return res.json();
}

async function getFirebaseAccessToken(saJson) {
  const sa = JSON.parse(saJson);
  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    iss: sa.client_email,
    scope: SCOPE,
    aud: sa.token_uri,
    exp: now + 3600,
    iat: now,
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .sign(await importPKCS8(sa.private_key, 'RS256'));

  const res = await fetch(sa.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error('Service authentication failed');
  const data = await res.json();
  return data.access_token;
}

async function updateFirestore(token, uid, data) {
  const baseUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}`;
  const fields = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      fields[key] = { stringValue: value };
    }
  }
  const fieldPaths = Object.keys(data).map(k => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join('&');
  const res = await fetch(`${baseUrl}?${fieldPaths}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error('Database update failed');
}
