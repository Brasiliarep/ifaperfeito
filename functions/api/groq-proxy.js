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
    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GROQ_API_KEY is not configured on the server.' }), { status: 500, headers });
    }

    const body = await request.json();

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      return new Response(errText, { status: groqResponse.status, headers });
    }

    const data = await groqResponse.json();
    return new Response(JSON.stringify(data), { status: 200, headers });

  } catch (error) {
    console.error('groq-proxy error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}
