const IFA_ORDER = ['Ogbe','Oyeku','Iwori','Odi','Irosun','Owonrin','Obara','Okanran','Ogunda','Osa','Ika','Oturupon','Otura','Irete','Ose','Ofun'];

const ODUS = {
  'Ejiogbe': { m:"O princípio da luz, expansão, alinhamento perfeito e vitória. Representa o despertar, o início de ciclos e a bênção pura.", i:"A história de como Ejiogbe se tornou o rei dos Odu. Ele foi o único que fez o sacrifício completo de humildade antes de vir à Terra. Fala sobre a cabeça (Ori) buscando seu destino.", o:["Obatala","Ori","Eshu"], g:"Caminho aberto, vitória sobre inimigos, necessidade de manter a ética.", l:"Relacionamento abençoado, mas cuidado com o ego.", mf:"Prosperidade garantida se houver bom caráter.", h:"Boa saúde, mas cuidado com dores de cabeça e estresse." },
  'Oyeku Meji': { m:"O fim de ciclos, a sabedoria ancestral, o feminino, a noite. Representa proteção contra a morte prematura.", i:"Oyeku Meji traz a noite e o mistério. É o Odu que introduziu a morte, mas também a honra aos ancestrais.", o:["Egun","Oya","Shango"], g:"Necessidade de cultuar ancestrais. Fim de um sofrimento.", l:"Relacionamento profundo, cármico.", mf:"Ganhos através de heranças ou comércio noturno.", h:"Cuidado com doenças ocultas ou depressão." },
  'Iwori Meji': { m:"Transformação, análise, o chacal que observa. Representa a lógica e a visão espiritual.", i:"Iwori viajou para o mar e para a floresta. Fala sobre ver as coisas claramente e a importância da perspectiva.", o:["Ifá","Eshu"], g:"Pense antes de agir. Mudanças estão por vir.", l:"Paixão intensa mas passageira se não houver diálogo.", mf:"Oportunidades intelectuais.", h:"Problemas de visão ou digestão." },
  'Odi Meji': { m:"Bloqueio, proteção, renascimento, o feminino reprodutivo.", i:"Odi cercou seus inimigos. Fala sobre proteção, barreiras e o útero materno.", o:["Yemoja","Ogun"], g:"Você está protegido, mas pode se sentir estagnado.", l:"Fertilidade alta. Relacionamento seguro.", mf:"Ganhos lentos mas constantes.", h:"Questões reprodutivas ou nas nádegas." },
  'Irosun Meji': { m:"Memória, sangue, menstruação, buracos, depressão ou profundidade emocional.", i:"Irosun cavou um buraco fundo para guardar seus tesouros. Fala sobre memória, ancestralidade e cautela.", o:["Shango","Egun","Osun"], g:"Não confie em todos. Guarde seus segredos.", l:"Sofrimento emocional ou saudade.", mf:"Herança ou dinheiro vindo do passado.", h:"Problemas no sangue ou olhos." },
  'Owonrin Meji': { m:"Inversão, karma, consequências de ações passadas, magia.", i:"Owonrin inverteu a ordem das coisas. Fala sobre o caos necessário para a mudança e acidentes.", o:["Eshu","Egun"], g:"O que vai, volta. Cuidado com acidentes.", l:"Relações tumultuadas.", mf:"Perdas repentinas ou ganhos inesperados.", h:"Acidentes físicos, mãos ou pés." },
  'Obara Meji': { m:"Prosperidade repentina, ego, comércio, comunicação.", i:"Obara era pobre e ignorado, mas através de um sacrifício (uma abóbora), tornou-se rico. O rei da prosperidade.", o:["Shango","Oshun","Aje"], g:"Mudança de sorte para melhor. Cuidado com a arrogância.", l:"Atração magnética.", mf:"Grande riqueza potencial.", h:"Pressão alta ou estresse." },
  'Okanran Meji': { m:"Justiça, problemas legais, disputas, novos caminhos difíceis.", i:"Okanran foi o único que desafiou a ordem. Fala sobre justiça, disputas e falar a verdade.", o:["Shango","Eshu"], g:"Problemas com a lei ou autoridade. Diga a verdade.", l:"Brigas constantes.", mf:"Disputas por dinheiro.", h:"Problemas cardíacos ou dores de cabeça." },
  'Ogunda Meji': { m:"Trabalho, ferro, guerra, cirurgia, remoção de obstáculos.", i:"Ogunda dividiu o peixe ao meio para satisfazer a todos. O caminho do guerreiro e do trabalho duro.", o:["Ogun"], g:"Lute pelo que quer. Vitória através do esforço.", l:"Disputas ou proteção excessiva.", mf:"Ganho pelo suor do trabalho.", h:"Cirurgias ou cortes." },
  'Osa Meji': { m:"Vento, mudança, feitiçaria, o poder feminino perigoso.", i:"Osa trouxe o vento e as feiticeiras (Iyami). Fala sobre mudanças bruscas e forças invisíveis.", o:["Oya","Iyami Aje"], g:"Mudanças incontroláveis. Respeite as mulheres.", l:"Instabilidade emocional.", mf:"Dinheiro voa fácil.", h:"Problemas respiratórios." },
  'Ika Meji': { m:"Controle, retração, a cobra, feitiço, maldade.", i:"Ika controlou a serpente. Fala sobre restrição, controle e maldade oculta.", o:["Osoosi","Eshu"], g:"Cuidado com quem te cerca. Recolha-se.", l:"Ciúmes possessivos.", mf:"Economize, não gaste.", h:"Cãibras ou paralisia." },
  'Oturupon Meji': { m:"Resistência, doença, teimosia, a terra, o urso.", i:"Oturupon carrega o fardo do mundo. Fala sobre resistência, doenças e teimosia.", o:["Babalu Aye","Ile"], g:"Seja resiliente. Cuide da saúde.", l:"Relação duradoura mas difícil.", mf:"Trabalho pesado.", h:"Doenças infecciosas ou de pele." },
  'Otura Meji': { m:"Liberdade, paz mental, inteligência, diplomacia.", i:"Otura libertou os cativos com sua sabedoria. Fala sobre paz, liberdade e o poder da palavra.", o:["Obatala","Ifá"], g:"Use a mente, não a força. Busque a paz.", l:"Relacionamento intelectual e livre.", mf:"Ganhos através do comércio ou escrita.", h:"Problemas nervosos leves." },
  'Irete Meji': { m:"Pressão, iniciação, terra, varíola, humilhação que leva à exaltação.", i:"Irete pisou na terra para marcá-la. Fala sobre pressão, iniciação e morte/renascimento.", o:["Babalu Aye","Ogun"], g:"Você será testado. Mantenha a fé.", l:"Relação cármica difícil.", mf:"Perdas antes de ganhos.", h:"Pernas e sangue." },
  'Ose Meji': { m:"Vitória, amor, dinheiro, beleza, conquista.", i:"Ose conquistou pelo amor e pela beleza. Fala sobre vitória sobre inimigos, amor e fertilidade.", o:["Oshun","Aje"], g:"Vitória sobre adversários. Alegria.", l:"Grande amor e fertilidade.", mf:"Prosperidade e luxo.", h:"Rins e sangue." },
  'Ofun Meji': { m:"O grande mistério, milagre, generosidade, o branco total.", i:"Ofun criou o universo com seu sopro. O grande milagre. Fala sobre generosidade e mistério.", o:["Obatala","Oduduwa"], g:"Um milagre vai acontecer. Dê para receber.", l:"Amor puro e divino.", mf:"Riqueza abundante.", h:"Problemas respiratórios ou inchaço." },
  'Ose Tura': { m:"O transportador do Ebó. A comunicação entre o Céu e a Terra. Vitória através do sacrifício e da astúcia.", i:"Ose Tura é o mensageiro especial de Eshu. Foi ele quem carregou o ebó para o céu quando todos os outros falharam.", o:["Eshu","Osun"], g:"Faça o ebó imediatamente. Sucesso garantido se houver sacrifício.", l:"Amor fértil e doce, mas requer atenção.", mf:"Dinheiro virá através de conexões e comunicação.", h:"Cuidado com a garganta e a fala." },
  'Irete Iwori': { m:"Transformação, decomposição que gera vida, paciência, iniciação tântrica ou profunda.", i:"Irete Iwori (Atiwa) fala sobre a iniciação e a paciência. A história de como a podridão se transforma em adubo para a vida.", o:["Babalu Aye","Osun"], g:"O que parece ruim é adubo para o novo. Tenha paciência.", l:"Relação que precisa ser curada ou transformada.", mf:"Ganhos lentos, vindos de coisas antigas.", h:"Cuidado com infecções ou pele." },
  'Ogbe Oyeku': { m:"O Redentor. A luz que dissipa as trevas. Solução de problemas antigos.", i:"O dia em que a luz (Ogbe) visitou a escuridão (Oyeku) e trouxe redenção. Fala sobre o fim do sofrimento através da consciência.", o:["Obatala","Egun"], g:"Um problema antigo será resolvido. Alívio.", l:"Reconciliação ou clareza em uma relação confusa.", mf:"Fim de dívidas ou período de escassez.", h:"Recuperação de doença longa." },
  'Oyeku Logbe': { m:"Chuva, limpeza, proteção contra inimigos, mas cuidado com a arrogância.", i:"A chuva que cai para limpar a terra. Oyeku (nuvem) cobrindo Ogbe (sol), trazendo a chuva benéfica.", o:["Sango","Oya"], g:"Limpeza espiritual necessária. Proteção contra fofocas.", l:"Relação intensa, tempestuosa mas fértil.", mf:"Ganhos inesperados, como chuva.", h:"Cuidado com resfriados ou umidade." }
};

function getMejiName(sign) {
  if (sign === 'Ogbe') return 'Ejiogbe';
  if (sign === 'Oyeku') return 'Oyeku Meji';
  return sign + ' Meji';
}

function getParent(sign) {
  return ODUS[getMejiName(sign)] || null;
}

function getAllOdu() {
  const list = [];
  let rank = 1;
  for (const s1 of IFA_ORDER) {
    for (const s2 of IFA_ORDER) {
      let name, odu;
      if (s1 === s2) {
        name = getMejiName(s1);
        odu = ODUS[name] || {};
      } else {
        name = s1 + ' ' + s2;
        if (ODUS[name]) {
          odu = ODUS[name];
        } else {
          const p1 = getParent(s1) || {};
          const p2 = getParent(s2) || {};
          const m1 = p1.m ? p1.m.split('.')[0] : 'energia desconhecida';
          const m2 = p2.m ? p2.m.split('.')[0] : 'influência desconhecida';
          odu = {
            m: `A síntese entre ${s1} (Regente) e ${s2}. Representa ${m1.toLowerCase()} manifestando-se através de ${m2.toLowerCase()}.`,
            i: `Este Odu nasce do encontro entre ${s1} e ${s2}. A tradição conta que ${s1} traz a energia de "${m1}" para interagir com ${s2}, que responde com "${m2}".`,
            o: [...new Set([...(p1.o||[]), ...(p2.o||[])])],
            g: `Momento de ${m1.toLowerCase()} influenciando ${m2.toLowerCase()}.`,
            l: `A relação reflete a dinâmica entre ${s1} e ${s2}. Busque equilíbrio.`,
            mf: `Fluxo financeiro depende da harmonia entre ${s1} e ${s2}.`,
            h: `Atenção às áreas regidas por ambos os Odu.`
          };
        }
      }
      list.push({ name, rank: rank++, meaning: odu.m||'', itan: odu.i||'', orishas: odu.o||['Ifá'], gen: odu.g||'', love: odu.l||'', money: odu.mf||'', health: odu.h||'' });
    }
  }
  return list;
}

function normalizeName(input) {
  const decoded = decodeURIComponent(input).toLowerCase().trim();
  return decoded.replace(/-/g, ' ');
}

function findOdu(all, rawName) {
  const norm = normalizeName(rawName);
  for (const o of all) {
    if (o.name.toLowerCase() === norm) return o;
  }
  // Try partial match
  for (const o of all) {
    if (o.name.toLowerCase().includes(norm) || norm.includes(o.name.toLowerCase())) return o;
  }
  return null;
}

function getRankInMejiSystem(n) {
  const i = IFA_ORDER.indexOf(n);
  return i >= 0 ? i + 1 : null;
}

const CRAWLER_RE = /bot|google|bing|yandex|baidu|facebook|crawler|twitterbot|slurp|duckduckbot|prerender/i;

function oduHtml(odu, allOdus) {
  const pMeji1 = odu.name.split(' ')[0];
  const pMeji2 = odu.name.includes(' ') ? odu.name.split(' ').slice(-1)[0] : null;
  const rank1 = getRankInMejiSystem(pMeji1);
  const rank2 = pMeji2 ? getRankInMejiSystem(pMeji2) : null;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Odu ${odu.name}: significado, itan (lenda), orixás regentes e interpretações para amor, dinheiro e saúde. Consulte o significado completo do Odu ${odu.name} no Ifá Oluwo.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://ifa-oluwo.com/odu/${encodeURIComponent(odu.name)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Ifá Oluwo - Codex Sacerdotal">
  <meta property="og:title" content="Odu ${odu.name} — Significado, Itan e Interpretações | Ifá Oluwo">
  <meta property="og:description" content="${odu.meaning.substring(0, 120)}">
  <meta property="og:image" content="https://ifa-oluwo.com/logo.png">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Odu ${odu.name} — Ifá Oluwo">
  <meta name="twitter:description" content="${odu.meaning.substring(0, 120)}">
  <title>Odu ${odu.name} — Significado, Itan e Interpretações | Ifá Oluwo</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:780px;margin:0 auto;padding:2rem 1rem;line-height:1.6;background:#090e14;color:rgba(255,255,255,0.87)}
    h1{font-family:serif;color:#C49E30;font-size:2rem;border-bottom:1px solid rgba(196,158,48,0.25);padding-bottom:.5rem}
    h2{color:#C49E30;font-family:serif;margin-top:2rem}
    .meta{color:rgba(255,255,255,0.5);font-size:.9rem;margin:1rem 0}
    .meta span{display:inline-block;margin-right:1.5rem}
    .tag{display:inline-block;background:rgba(196,158,48,0.12);border:1px solid rgba(196,158,48,0.2);border-radius:20px;padding:2px 10px;font-size:.8rem;color:#C49E30;margin:2px 3px}
    .section{background:rgba(255,255,255,0.035);border:1px solid rgba(196,158,48,0.08);border-radius:12px;padding:1rem 1.2rem;margin:1rem 0}
    .section h3{color:#C49E30;margin:0 0 .3rem 0;font-size:.8rem;text-transform:uppercase;letter-spacing:1.5px;font-family:system-ui}
    .section p{margin:0;color:rgba(255,255,255,0.75)}
    a{color:#C49E30}
    .nav-links{margin:2rem 0;display:flex;gap:1rem;flex-wrap:wrap}
    .nav-links a{font-size:.9rem}
    table{width:100%;border-collapse:collapse;margin:1rem 0}
    td,th{border:1px solid rgba(196,158,48,0.12);padding:.5rem;text-align:left;font-size:.9rem}
    th{background:rgba(196,158,48,0.06);color:#C49E30;font-weight:600}
  </style>
</head>
<body>
  <h1>Odu ${odu.name}</h1>
  <div class="meta">
    <span>Rank: ${odu.rank}º de 256</span>
    ${rank1 ? `<span>Signo Regente: ${pMeji1} (${rank1}º Meji)</span>` : ''}
    ${rank2 ? `<span>Influência: ${pMeji2} (${rank2}º Meji)</span>` : ''}
  </div>

  ${odu.orishas.length ? `<p>${odu.orishas.map(o => `<span class="tag">${o}</span>`).join(' ')}</p>` : ''}

  <div class="section">
    <h3>Significado</h3>
    <p>${odu.meaning}</p>
  </div>

  <div class="section">
    <h3>Itan (Lenda)</h3>
    <p>${odu.itan}</p>
  </div>

  <h2>Interpretações</h2>

  <div class="section">
    <h3>Geral</h3>
    <p>${odu.gen}</p>
  </div>
  <div class="section">
    <h3>Amor</h3>
    <p>${odu.love}</p>
  </div>
  <div class="section">
    <h3>Dinheiro</h3>
    <p>${odu.money}</p>
  </div>
  <div class="section">
    <h3>Saúde</h3>
    <p>${odu.health}</p>
  </div>

  <div class="nav-links">
    <a href="/odu">&larr; Todos os 256 Odus</a>
    <a href="/">&larr; Ifá Oluwo</a>
  </div>

  <p style="margin-top:2rem;font-size:.8rem;color:rgba(255,255,255,0.3);border-top:1px solid rgba(196,158,48,0.08);padding-top:1rem">
    Ifá Oluwo - Codex Sacerdotal | Plataforma digital para Babalawos e praticantes de Ifá | 
    <a href="/">ifa-oluwo.com</a>
  </p>
</body>
</html>`;
}

function listingHtml(allOdus) {
  const rows = allOdus.map(o => {
    const url = `/odu/${encodeURIComponent(o.name)}`;
    return `<tr><td>${o.rank}</td><td><a href="${url}">${o.name}</a></td><td>${o.orishas.slice(0, 3).join(', ')}</td><td>${o.meaning.substring(0, 80)}...</td></tr>`;
  }).join('\n');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Consulte os 256 Odus de Ifá completos com significado, itan (lenda), orixás regentes e interpretações para amor, dinheiro e saúde.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://ifa-oluwo.com/odu">
  <meta property="og:title" content="Todos os 256 Odus de Ifá — Biblioteca Completa | Ifá Oluwo">
  <meta property="og:description" content="Consulte os 256 Odus de Ifá completos com significado, itan, orixás e interpretações.">
  <title>Todos os 256 Odus de Ifá | Ifá Oluwo</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:960px;margin:0 auto;padding:2rem 1rem;background:#090e14;color:rgba(255,255,255,0.87)}
    h1{font-family:serif;color:#C49E30}
    a{color:#C49E30}
    table{width:100%;border-collapse:collapse}
    td,th{border:1px solid rgba(196,158,48,0.12);padding:.4rem .5rem;text-align:left;font-size:.85rem}
    th{background:rgba(196,158,48,0.06);color:#C49E30;font-weight:600}
    tr:hover{background:rgba(196,158,48,0.03)}
  </style>
</head>
<body>
  <h1>Todos os 256 Odus de Ifá</h1>
  <p>Lista completa dos 256 Odus com significado, itan (lenda), orixás regentes e interpretações.</p>
  <table>
    <thead><tr><th>#</th><th>Odu</th><th>Orixás</th><th>Significado</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p style="margin-top:2rem;font-size:.9rem"><a href="/">&larr; Voltar ao Ifá Oluwo</a></p>
</body>
</html>`;
}

export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);
  const userAgent = request.headers.get('User-Agent') || '';

  // If /odu with no name, show listing
  if (!params.name || params.name === 'index') {
    if (CRAWLER_RE.test(userAgent)) {
      return new Response(listingHtml(getAllOdu()), {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
      });
    }
    return context.next();
  }

  const allOdus = getAllOdu();
  const odu = findOdu(allOdus, params.name);

  if (!odu) {
    // Odu not found - pass through to SPA
    return context.next();
  }

  if (CRAWLER_RE.test(userAgent)) {
    return new Response(oduHtml(odu, allOdus), {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
    });
  }

  return context.next();
}
