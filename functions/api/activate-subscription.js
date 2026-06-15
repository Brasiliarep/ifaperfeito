import { SignJWT, importPKCS8 } from 'jose';

const PAYPAL_API = 'https://api-m.paypal.com';
const SCOPE = 'https://www.googleapis.com/auth/datastore';

const PLAN_MAP = {
  estudante: 'student_monthly',
  mensal: 'pro_monthly',
  anual: 'pro_annual',
};

export async function onRequest(context) {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') return new Response(null, { headers });
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  try {
    const { subscriptionId, uid, planKey } = await request.json();

    if (!subscriptionId || !uid || !planKey) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers });
    }

    const plan = PLAN_MAP[planKey];
    if (!plan) {
      return new Response(JSON.stringify({ error: 'Unknown plan: ' + planKey }), { status: 400, headers });
    }

    // 1. Verify PayPal subscription
    const paypalToken = await getPayPalAccessToken(env.PAYPAL_CLIENT_ID, env.PAYPAL_SECRET);
    const subscription = await getPayPalSubscription(paypalToken, subscriptionId);

    if (subscription.status !== 'ACTIVE') {
      return new Response(JSON.stringify({ error: 'Subscription is not active', status: subscription.status }), { status: 400, headers });
    }

    // 2. Calculate expiry
    const now = Date.now();
    const validUntil = plan === 'pro_annual'
      ? new Date(now + 365 * 24 * 60 * 60 * 1000).toISOString()
      : new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();

    // 3. Update Firestore via REST API
    const firebaseToken = await getFirebaseAccessToken(env.FIREBASE_SERVICE_ACCOUNT);
    await updateFirestore(firebaseToken, uid, { plan, validUntil, paypalSubscriptionId: subscriptionId });

    return new Response(JSON.stringify({ success: true, plan, validUntil }), { headers });
  } catch (error) {
    console.error('activate-subscription error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
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
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function getPayPalSubscription(token, id) {
  const res = await fetch(`${PAYPAL_API}/v1/billing/subscriptions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal verification failed (${res.status}): ${text}`);
  }
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
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firebase token exchange failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function updateFirestore(token, uid, data) {
  const projectId = 'ifa-oluwo';
  const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`;

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

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore update failed (${res.status}): ${text}`);
  }
}
