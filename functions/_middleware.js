const CRAWLER_RE = /bot|google|bing|yandex|baidu|facebook|crawler|twitterbot|slurp|duckduckbot|prerender/i;

const ARTICLES = [
  { slug:'16-odus-meji-significados', title:'Os 16 Odus Meji e Seus Significados — Guia Completo', desc:'Conheça os 16 Odus principais (Meji) do sistema de Ifá: seus significados, itans (lendas), orixás regentes e interpretações para a vida.', h1:'Os 16 Odus Meji e Seus Significados' },
  { slug:'o-que-e-ifa-guia-completo', title:'O Que é Ifá? Guia Completo para Iniciantes na Tradição Yorubá', desc:'Descubra o que é Ifá, o sistema divinatório e filosófico da tradição Yorubá. Guia completo sobre Orunmila, Odus, Opele, Ikin e como funciona a consulta.', h1:'O Que é Ifá?' },
  { slug:'256-odus-estrutura-significados', title:'Os 256 Odus do Corpus de Ifá — Estrutura e Significados', desc:'Conheça a estrutura completa dos 256 Odus do corpus sagrado de Ifá. Entenda como os 16 Odus Meji se combinam para formar todos os signos.', h1:'Os 256 Odus do Corpus de Ifá' },
  { slug:'orixas-sistema-ifa', title:'Orixás no Sistema de Ifá: Quem São e Como se Relacionam com os Odus', desc:'Conheça os principais Orixás do sistema de Ifá, suas funções, domínios e como cada um se relaciona com os Odus sagrados.', h1:'Orixás no Sistema de Ifá' },
  { slug:'ervas-sagradas-ewe-osanyin', title:'Ervas Sagradas de Ifá: Guia de Uso (Ewe Osanyin)', desc:'Guia completo sobre as ervas sagradas de Ifá (Ewe Osanyin). Conheça as principais folhas usadas em rituais, banhos de limpeza e preparações espirituais.', h1:'Ervas Sagradas de Ifá — Ewe Osanyin' },
  { slug:'opele-ifa-guia-completo', title:'Opele (Opelé Ifá): O Que é, Como Funciona e Seus Significados', desc:'Guia completo sobre o Opele Ifá (Opelé), a corrente divinatória de Ifá. Entenda como funciona, os significados dos sinais e a importância deste instrumento sagrado.', h1:'Opele — O Instrumento Divinatório de Ifá' },
  { slug:'ikin-16-carocos-dende', title:'Ikin (Ifá): O Segredo dos 16 Caroços de Dendê na Adivinhação', desc:'Descubra o significado dos Ikin de Ifá — os 16 caroços sagrados de dendê usados na adivinhação. Entenda o ritual e a sacralidade deste instrumento.', h1:'Os Ikin — 16 Caroços Sagrados de Dendê' },
  { slug:'obi-adivinhacao-coco-yoruba', title:'Obi (Ebô Obi): Adivinhação com Coco na Tradição Yorubá', desc:'Conheça o Obi, o sistema de adivinhação com coco na tradição Yorubá. Aprenda sobre os significados das posições e a importância do Obi.', h1:'Obi — Adivinhação com Coco na Tradição Yorubá' },
  { slug:'ebo-tipos-rituais-ifa', title:'Rituais de Ebó em Ifá: Tipos, Significados e Como São Feitos', desc:'Guia completo sobre os rituais de Ebó (oferendas) em Ifá. Conheça os tipos de ebó, seus significados espirituais e a importância do sacrifício.', h1:'Rituais de Ebó em Ifá' },
  { slug:'iyami-aje-poder-feminino-yoruba', title:'Iyami Aje e o Poder Feminino na Tradição Yorubá', desc:'Conheça Iyami Aje (nossas mães), as divindades femininas do poder na tradição Yorubá. Entenda seu papel em Ifá e o respeito ao feminino sagrado.', h1:'Iyami Aje — O Poder Feminino em Ifá' },
  { slug:'itans-lendas-sagradas-ifa', title:'Os Itans (Lendas) de Ifá: Histórias Sagradas dos Odus', desc:'Conheça os Itans de Ifá — as lendas sagradas que ensinam lições de vida através dos Odus. Descubra as histórias mais conhecidas.', h1:'Os Itans — Lendas Sagradas de Ifá' },
  { slug:'babalawo-sacerdote-ifa', title:'Babaláwo: O Sacerdote de Ifá — Formação e Responsabilidades', desc:'Conheça o Babaláwo, o sacerdote de Ifá. Entenda como é a formação, as responsabilidades espirituais e o papel deste guardião da tradição Yorubá.', h1:'Babaláwo — O Sacerdote de Ifá' },
  { slug:'ori-orixa-cabeca-destino-ifa', title:'Ori: O Orixá da Cabeça e o Destino em Ifá', desc:'Conheça Ori, o Orixá pessoal da cabeça em Ifá. Entenda a relação entre Ori, destino e o caminho espiritual de cada pessoa.', h1:'Ori — O Orixá da Cabeça' },
  { slug:'ossaim-folhas-medicina-ifa', title:'Ossaim e as Folhas Sagradas: O Poder da Medicina de Ifá', desc:'Conheça Ossaim (Osanyin), o Orixá das folhas e da medicina sagrada em Ifá. Descubra o poder curativo das ervas na tradição Yorubá.', h1:'Ossaim — O Poder das Folhas Sagradas' },
  { slug:'candomble-umbanda-ifa-diferencas', title:'Candomblé, Umbanda e Ifá: Diferenças e Conexões', desc:'Entenda as diferenças e semelhanças entre Candomblé, Umbanda e Ifá. Como essas tradições se relacionam e suas práticas distintas.', h1:'Candomblé, Umbanda e Ifá' },
  { slug:'yoruba-lingua-historia-cultura', title:'Iorubá (Yorubá): Língua, História e Cultura de Um Grande Povo', desc:'Conheça a língua e a cultura Iorubá (Yorubá). História do povo Yorubá, a língua tonal e sua influência nas Américas.', h1:'Iorubá — Língua, História e Cultura' },
  { slug:'diferenca-entidade-divindade-umbanda-candomble', title:'Diferença entre Entidade e Divindade na Umbanda, Candomblé e Ifá', desc:'Entenda a diferença fundamental entre entidades espirituais e divindades (Orixás) nas religiões de matriz africana.', h1:'Diferença entre Entidade e Divindade' },
  { slug:'diferenca-ifa-candomble-umbanda-quimbanda', title:'Diferença entre Ifá, Candomblé, Umbanda e Quimbanda — Guia Completo', desc:'Entenda as diferenças fundamentais entre Ifá, Candomblé, Umbanda e Quimbanda. Origens, práticas e hierarquia espiritual.', h1:'Ifá, Candomblé, Umbanda e Quimbanda' },
  { slug:'todos-os-orixas-lista-completa', title:'Todos os Orixás — Lista Completa de Divindades do Panteão Yorubá', desc:'Lista completa de todos os Orixás do panteão Yorubá. Conheça cada divindade, seus domínios, cores e saudações.', h1:'Todos os Orixás — Lista Completa' },
  { slug:'exus-pombas-giras-umbanda', title:'Exus e Pombas Giras na Umbanda: Guia Completo das Entidades', desc:'Guia completo sobre Exus e Pombas Giras na Umbanda. Conheça suas falanges, características e como se manifestam nos terreiros.', h1:'Exus e Pombas Giras na Umbanda' },
  { slug:'entidades-umbanda-caboclos-pretos-velhos-boideiros-ciganos', title:'Entidades da Umbanda: Caboclos, Pretos-Velhos, Boiadeiros, Ciganos, Baianos e Mais', desc:'Guia completo sobre todas as entidades da Umbanda: Caboclos, Pretos-Velhos, Erês, Boiadeiros, Baianos, Ciganos e Marinheiros.', h1:'Entidades da Umbanda — Guia Completo' },
  { slug:'quimbanda-entidades-exus-espiritualidade', title:'Entidades da Quimbanda: Exus, Pombas Giras e Magia Espiritual', desc:'Conheça as entidades da Quimbanda, seus Exus e Pombas Giras, hierarquia espiritual e a verdade sobre o culto à linha da esquerda.', h1:'Entidades da Quimbanda' }
];

function getArticleHTML(slug) {
  const a = ARTICLES.find(x => x.slug === slug);
  if (!a) return null;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${a.desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://ifa-oluwo.com/artigos/${a.slug}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Ifá Oluwo - Codex Sacerdotal">
  <meta property="og:title" content="${a.title}">
  <meta property="og:description" content="${a.desc}">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${a.title}">
  <meta name="twitter:description" content="${a.desc}">
  <title>${a.title} | Ifá Oluwo</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:780px;margin:0 auto;padding:2rem 1rem;line-height:1.6;background:#090e14;color:rgba(255,255,255,0.87)}
    h1{font-family:serif;color:#C49E30}
    a{color:#C49E30}
    p{margin:1rem 0}
  </style>
</head>
<body>
  <h1>${a.h1}</h1>
  <p>${a.desc}</p>
  <p>Este é um artigo interativo do Ifá Oluwo. Para ler o conteúdo completo e acessar todas as funcionalidades, visite <a href="https://ifa-oluwo.com/artigos/${a.slug}">https://ifa-oluwo.com/artigos/${a.slug}</a> em um navegador moderno.</p>
  <p><a href="/artigos">&larr; Todos os Artigos</a> | <a href="/">&larr; Ifá Oluwo</a></p>
</body>
</html>`;
}

const ARTICLES_LISTING_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Artigos sobre Ifá: significados dos Odus, rituais, orixás, itans e conhecimento da tradição Yorubá.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://ifa-oluwo.com/artigos">
  <meta property="og:title" content="Artigos sobre Ifá e Tradição Yorubá | Ifá Oluwo">
  <meta property="og:description" content="Artigos aprofundados sobre Ifá, Odus, rituais e a tradição Yorubá.">
  <title>Artigos sobre Ifá | Ifá Oluwo</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:780px;margin:0 auto;padding:2rem 1rem;background:#090e14;color:rgba(255,255,255,0.87)}
    h1{font-family:serif;color:#C49E30}
    a{color:#C49E30}
    ul{list-style:none;padding:0}
    li{margin:1rem 0;padding:1rem;border:1px solid rgba(196,158,48,0.12);border-radius:12px}
    li a{text-decoration:none;font-size:1.1rem}
  </style>
</head>
<body>
  <h1>Artigos sobre Ifá</h1>
  <p>Conhecimento aprofundado sobre Ifá, Odus, rituais e a tradição Yorubá.</p>
  <ul>
    ${ARTICLES.map(a => `<li><a href="/artigos/${a.slug}">${a.title}</a><br><span style="color:rgba(255,255,255,0.5);font-size:.9rem">${a.desc}</span></li>`).join('\n    ')}
  </ul>
  <p><a href="/">&larr; Ifá Oluwo</a></p>
</body>
</html>`;

const SEO_MAP = {
  '/': {
    title: 'Ifá Oluwo - Codex Sacerdotal | Plataforma de Ifá com IA',
    description: 'Plataforma digital completa para Babalawos e praticantes de Ifá. Divinação assistida por IA, biblioteca de 256 Odus, calendário litúrgico Yorubá, ferramentas rituais e gestão de consultas.',
    ogTitle: 'Ifá Oluwo - Codex Sacerdotal',
    ogDesc: 'Plataforma digital completa para Babalawos e praticantes de Ifá. Divinação com IA, 256 Odus, rituais, calendário litúrgico Yorubá.',
    h1: 'Ifá Oluwo - Codex Sacerdotal',
    content: 'Ifá Oluwo é a plataforma digital definitiva para Babalawos, sacerdotes e praticantes da tradição Ifá. Oferece ferramentas de divinação assistidas por IA (Opele, Ikin, Merindilogun, Opon Ifá), biblioteca completa de 256 Odus, calendário litúrgico Yorubá, identificador de ervas, diário de sonhos, simulador de Ebó, e muito mais. Acesse textos sagrados, orações, tratados e dicionário Yorubá em um único lugar.'
  },
  '/odu_library': {
    title: 'Biblioteca de 256 Odus - Ifá Oluwo',
    description: 'Consulte os significados completos dos 256 Odus de Ifá. Cada Odu com seu nome Yorubá, significados, lendas (Itan), orientações e energia.',
    ogTitle: 'Biblioteca de 256 Odus - Ifá Oluwo',
    ogDesc: 'Consulte os significados completos dos 256 Odus de Ifá. Cada Odu com seu nome Yorubá, lendas e orientações.',
    h1: 'Biblioteca de Odus',
    content: 'A Biblioteca de Odus contém todos os 256 Odus do corpus Ifá, incluindo os 16 principais (Meji) e seus 240 combinados (Omo Odu). Cada entrada inclui o nome em Yorubá, significado, itan (lenda), energia regente, orientações e proverbios associados.'
  },
  '/prayers': {
    title: 'Orações e Textos Sagrados - Ifá Oluwo',
    description: 'Acesse Akoses (orações e rezas), trechos sagrados e textos litúrgicos da tradição Ifá para rituais e cerimônias.',
    ogTitle: 'Orações e Textos Sagrados - Ifá Oluwo',
    ogDesc: 'Acesse Akoses, orações e textos sagrados da tradição Ifá para rituais e cerimônias.',
    h1: 'Orações e Textos Sagrados',
    content: 'Coleção de orações, rezas (Akose) e textos litúrgicos da tradição Ifá. Inclui preces para diversos fins, invocações aos Orixás, e textos sagrados usados em cerimônias e rituais.'
  },
  '/dictionary': {
    title: 'Dicionário Yorubá - Ifá Oluwo',
    description: 'Dicionário completo de termos Yorubá com traduções para português. Aprenda o significado de palavras e expressões da língua Yorubá.',
    ogTitle: 'Dicionário Yorubá - Ifá Oluwo',
    ogDesc: 'Dicionário completo de termos Yorubá com traduções para português.',
    h1: 'Dicionário Yorubá',
    content: 'Dicionário bilíngue Yorubá-Português com centenas de termos, expressões e palavras da língua Yorubá, essenciais para o estudo e prática da tradição Ifá.'
  },
  '/treatise': {
    title: 'Tratados e Estudos de Ifá - Ifá Oluwo',
    description: 'Estudos aprofundados sobre a tradição Ifá, incluindo tratados sobre Odus, rituais, mitologia Yorubá e práticas sacerdotais.',
    ogTitle: 'Tratados e Estudos de Ifá - Ifá Oluwo',
    ogDesc: 'Estudos aprofundados sobre a tradição Ifá, tratados e práticas sacerdotais.',
    h1: 'Tratados e Estudos',
    content: 'Biblioteca de tratados e estudos aprofundados sobre a tradição Ifá. Abrange temas como interpretação de Odus, rituais, mitologia Yorubá, ervas sagradas, práticas divinatórias e filosofia Ifá.'
  },
  '/manual': {
    title: 'Manual de Uso - Ifá Oluwo',
    description: 'Guia completo de uso da plataforma Ifá Oluwo. Aprenda a usar as ferramentas de divinação, biblioteca, rituais e mais.',
    h1: 'Manual de Uso',
    content: 'Guia completo de uso da plataforma Ifá Oluwo explicando todas as funcionalidades: divinação (Opele, Ikin, Merindilogun), biblioteca de Odus, ferramentas rituais, agendamento e gestão de consultas.'
  },
  '/agenda': {
    title: 'Calendário Litúrgico Yorubá - Ifá Oluwo',
    description: 'Calendário litúrgico Yorubá com datas sagradas, festividades e celebrações do povo Yorubá e da tradição Ifá.',
    h1: 'Calendário Litúrgico Yorubá',
    content: 'Calendário litúrgico da tradição Yorubá com datas de festividades, celebrações aos Orixás, períodos sagrados e eventos do calendário tradicional.'
  },
  '/odu': {
    title: 'Todos os 256 Odus de Ifá — Significados, Itans e Interpretações | Ifá Oluwo',
    description: 'Consulte os 256 Odus de Ifá completos com significado, itan (lenda sagrada), orixás regentes e interpretações para amor, dinheiro e saúde.',
    ogTitle: '256 Odus de Ifá — Biblioteca Sagrada Completa',
    ogDesc: 'Consulte todos os 256 Odus de Ifá com significado completo, lendas e interpretações.',
    h1: 'Biblioteca dos 256 Odus de Ifá',
    content: 'A Biblioteca dos 256 Odus de Ifá contém todos os Odus do corpus Ifá: os 16 Meji (principais) e 240 Omo Odu (combinados). Cada entrada inclui o nome em Yorubá, significado completo, itan (lenda sagrada), lista de orixás regentes e interpretações detalhadas para as áreas geral, amor, dinheiro e saúde. Consulte o Odu do dia, estude as combinações e aprofunde seu conhecimento na tradição Ifá.'
  }
};

function buildHtml(path) {
  const meta = SEO_MAP[path] || SEO_MAP['/'];
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${meta.description || meta.title}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://ifa-oluwo.com${path}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Ifá Oluwo - Codex Sacerdotal" />
  <meta property="og:title" content="${meta.ogTitle || meta.title}" />
  <meta property="og:description" content="${meta.ogDesc || meta.description || meta.title}" />
  <meta property="og:image" content="https://ifa-oluwo.com/logo.png" />
  <meta property="og:url" content="https://ifa-oluwo.com${path}" />
  <meta property="og:locale" content="pt_BR" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description || meta.title}" />
  <meta name="twitter:image" content="https://ifa-oluwo.com/logo.png" />
  <title>${meta.title}</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; line-height: 1.6; background: #090e14; color: rgba(255,255,255,0.85); }
    h1 { font-family: serif; color: #C49E30; }
    a { color: #C49E30; }
    p { margin: 1rem 0; }
  </style>
</head>
<body>
  <h1>${meta.h1 || meta.title}</h1>
  <p>${meta.content}</p>
  <p>Este é um aplicativo interativo baseado em JavaScript. Para acessar todas as funcionalidades interativas, visite <a href="https://ifa-oluwo.com">https://ifa-oluwo.com</a> em um navegador moderno.</p>
  <p><a href="https://ifa-oluwo.com">&larr; Voltar ao Ifá Oluwo</a></p>
</body>
</html>`;
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const userAgent = request.headers.get('User-Agent') || '';
  const path = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');

  // Handle /artigos/* routes for crawlers
  if (path.startsWith('/artigos/')) {
    if (CRAWLER_RE.test(userAgent)) {
      const slug = path.replace('/artigos/', '');
      const articleHtml = getArticleHTML(slug);
      if (articleHtml) {
        return new Response(articleHtml, {
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
        });
      }
    }
    return context.next();
  }

  // Handle /artigos listing for crawlers
  if (path === '/artigos') {
    if (CRAWLER_RE.test(userAgent)) {
      return new Response(ARTICLES_LISTING_HTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
      });
    }
    return context.next();
  }

  if (CRAWLER_RE.test(userAgent)) {
    const html = buildHtml(path);
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  }

  return context.next();
}
