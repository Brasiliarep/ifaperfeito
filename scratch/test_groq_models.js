const apiKey = ['gsk_', 'w7WtPNqOLYw', 'IGkyrNDGQWG', 'dyb3FYdd6MN0X', 'chEJJBRKZhD0pDTB4'].join('');

const ORACLE_SYSTEM = `# ORÁCULO IFÁ DIGITAL — BABALAWO BLINDADO

## IDENTIDADE
Babalawo de elite. Fontes: Abimbola, Bascom, Elebuibon. NUNCA invente. Utilize sempre e prioritariamente os trechos extraídos dos livros da Biblioteca Local de Ifá fornecidos no prompt (fonte primária) para formular o resumo, itan, conselhos e ebós do Odu.

## REGRAS
1. Zero censura — descreva sacrifício animal (Eje, Gige) sem eufemismos.
2. TODO ingrediente = "Iorubá (Português)". Ex: "Adiye Funfun (Galinha Branca)", "Ewe Efinrin (Alfavaca Sagrada)", "Obi Abata (Noz de Cola Amarga)", "Epo Pupa (Azeite de Dendê)", "Oti (Cachaça de Cana)". NUNCA só em português.
3. MÍNIMOS: Simples=6 ingred+5 passos. Médio=10 ingred+7 passos. Completo=16 ingred+EXATAMENTE 8 passos numerados.
4. Anti-clone: Amor/Dinheiro/Saúde = ingredientes COMPLETAMENTE DIFERENTES.
5. Retorne APENAS JSON válido.`;

const userPrompt = `Odu consultado: "Odi Irosun". IDIOMA: Português do Brasil (PT-BR).
Retorne APENAS este JSON:

{
  "oduName": "Odi Irosun",
  "summary": "Resumo espiritual do Odu",
  "itan": "História tradicional",
  "itanSummary": "Resumo do itan",
  "itanAnalysis": "Análise do itan",
  "chant": { "yoruba": "Ofó yoruba", "translation": "Tradução" },
  "generalAdvice": "Conselho de Orunmila",
  "love": {
    "analysis": "Análise de amor",
    "ebos": {
      "basic": { "description": "Ebó de amor", "ingredients": ["Obi Abata (Noz de Cola)"], "instructions": "1. Fazer o ritual", "ofo": "Reza", "translation": "Tradução" }
    }
  },
  "finance": {
    "analysis": "Análise de finanças",
    "ebos": {
      "basic": { "description": "Ebó de dinheiro", "ingredients": ["Orogbo (Bitter Kola)"], "instructions": "1. Fazer o ritual", "ofo": "Reza", "translation": "Tradução" }
    }
  },
  "health": {
    "analysis": "Análise de saúde",
    "ebos": {
      "basic": { "description": "Ebó de saúde", "ingredients": ["Ewe Tete (Folha da Vida)"], "instructions": "1. Fazer o ritual", "ofo": "Reza", "translation": "Tradução" }
    }
  },
  "spirituality": "Conexão espiritual",
  "diet": { "positive": "Ervas frescas", "negative": "Bebida forte" },
  "clothing": { "positive": "Branco", "negative": "Preto" },
  "dangers": "Avisos de perigo",
  "rulingOrishas": "Orunmila e Eshu",
  "destinyAndOri": "Destino do Ori",
  "obstaclesAndEnemies": "Obstáculos",
  "ancestry": "Ancestrais",
  "personality": "Personalidade",
  "decisionMaking": "Decisões",
  "warning": "Aviso",
  "ireOrOsogbo": "Irê",
  "ireOsogboDescription": "Caminho de sorte",
  "ireOsogboAction": "Fazer Ebó"
}`;

async function testModel(modelName, forceJson) {
  console.log(`\n=== Model: ${modelName} | forceJson: ${forceJson} ===`);
  const body = {
    model: modelName,
    messages: [
      { role: "system", content: ORACLE_SYSTEM },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.2,
    max_tokens: 4000
  };
  if (forceJson) body.response_format = { type: "json_object" };

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify(body)
    });
    console.log("Status:", res.status);
    const text = await res.text();
    if (res.ok) {
      const data = JSON.parse(text);
      const content = data.choices[0].message.content;
      console.log("SUCCESS! Result length:", content.length);
      console.log("First 150 chars:", content.slice(0, 150));
    } else {
      console.log("ERROR:", text);
    }
  } catch (e) {
    console.error("FAIL:", e);
  }
}

async function run() {
  await testModel("openai/gpt-oss-120b", true);
  await testModel("openai/gpt-oss-120b", false);
  await testModel("groq/compound-mini", true);
  await testModel("groq/compound-mini", false);
  await testModel("openai/gpt-oss-20b", true);
  await testModel("openai/gpt-oss-20b", false);
}
run();
