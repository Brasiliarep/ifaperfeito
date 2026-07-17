const CRAWLER_RE = /bot|google|bing|yandex|baidu|facebook|crawler|twitterbot|slurp|duckduckbot|prerender|chatgpt|copilot|perplexity|you\.com|brave/i;

const SITE = 'https://ifaoluwo.com';

const ARTICLES = [
  { slug:'16-odus-meji-significados', title:'Os 16 Odus Meji e Seus Significados — Guia Completo', desc:'Conheça os 16 Odus principais (Meji) do sistema de Ifá: seus significados, itans (lendas), orixás regentes e interpretações para a vida.' },
  { slug:'o-que-e-ifa-guia-completo', title:'O Que é Ifá? Guia Completo para Iniciantes na Tradição Yorubá', desc:'Descubra o que é Ifá, o sistema divinatório e filosófico da tradição Yorubá. Guia completo sobre Orunmila, Odus, Opele, Ikin e como funciona a consulta.' },
  { slug:'256-odus-estrutura-significados', title:'Os 256 Odus do Corpus de Ifá — Estrutura e Significados', desc:'Conheça a estrutura completa dos 256 Odus do corpus sagrado de Ifá. Entenda como os 16 Odus Meji se combinam para formar todos os signos.' },
  { slug:'orixas-sistema-ifa', title:'Orixás no Sistema de Ifá: Quem São e Como se Relacionam com os Odus', desc:'Conheça os principais Orixás do sistema de Ifá, suas funções, domínios e como cada um se relaciona com os Odus sagrados.' },
  { slug:'ervas-sagradas-ewe-osanyin', title:'Ervas Sagradas de Ifá: Guia de Uso (Ewe Osanyin)', desc:'Guia completo sobre as ervas sagradas de Ifá (Ewe Osanyin). Conheça as principais folhas usadas em rituais, banhos de limpeza e preparações espirituais.' },
  { slug:'opele-ifa-guia-completo', title:'Opele (Opelé Ifá): O Que é, Como Funciona e Seus Significados', desc:'Guia completo sobre o Opele Ifá (Opelé), a corrente divinatória de Ifá. Entenda como funciona, os significados dos sinais e a importância deste instrumento sagrado.' },
  { slug:'ikin-16-carocos-dende', title:'Ikin (Ifá): O Segredo dos 16 Caroços de Dendê na Adivinhação', desc:'Descubra o significado dos Ikin de Ifá — os 16 caroços sagrados de dendê usados na adivinhação. Entenda o ritual e a sacralidade deste instrumento.' },
  { slug:'obi-adivinhacao-coco-yoruba', title:'Obi (Ebô Obi): Adivinhação com Coco na Tradição Yorubá', desc:'Conheça o Obi, o sistema de adivinhação com coco na tradição Yorubá. Aprenda sobre os significados das posições e a importância do Obi.' },
  { slug:'ebo-tipos-rituais-ifa', title:'Rituais de Ebó em Ifá: Tipos, Significados e Como São Feitos', desc:'Guia completo sobre os rituais de Ebó (oferendas) em Ifá. Conheça os tipos de ebó, seus significados espirituais e a importância do sacrifício.' },
  { slug:'iyami-aje-poder-feminino-yoruba', title:'Iyami Aje e o Poder Feminino na Tradição Yorubá', desc:'Conheça Iyami Aje (nossas mães), as divindades femininas do poder na tradição Yorubá. Entenda seu papel em Ifá e o respeito ao feminino sagrado.' },
  { slug:'itans-lendas-sagradas-ifa', title:'Os Itans (Lendas) de Ifá: Histórias Sagradas dos Odus', desc:'Conheça os Itans de Ifá — as lendas sagradas que ensinam lições de vida através dos Odus. Descubra as histórias mais conhecidas.' },
  { slug:'babalawo-sacerdote-ifa', title:'Babaláwo: O Sacerdote de Ifá — Formação e Responsabilidades', desc:'Conheça o Babaláwo, o sacerdote de Ifá. Entenda como é a formação, as responsabilidades espirituais e o papel deste guardião da tradição Yorubá.' },
  { slug:'ori-orixa-cabeca-destino-ifa', title:'Ori: O Orixá da Cabeça e o Destino em Ifá', desc:'Conheça Ori, o Orixá pessoal da cabeça em Ifá. Entenda a relação entre Ori, destino e o caminho espiritual de cada pessoa.' },
  { slug:'ossaim-folhas-medicina-ifa', title:'Ossaim e as Folhas Sagradas: O Poder da Medicina de Ifá', desc:'Conheça Ossaim (Osanyin), o Orixá das folhas e da medicina sagrada em Ifá. Descubra o poder curativo das ervas na tradição Yorubá.' },
  { slug:'candomble-umbanda-ifa-diferencas', title:'Candomblé, Umbanda e Ifá: Diferenças e Conexões', desc:'Entenda as diferenças e semelhanças entre Candomblé, Umbanda e Ifá. Como essas tradições se relacionam e suas práticas distintas.' },
  { slug:'yoruba-lingua-historia-cultura', title:'Iorubá (Yorubá): Língua, História e Cultura de Um Grande Povo', desc:'Conheça a língua e a cultura Iorubá (Yorubá). História do povo Yorubá, a língua tonal e sua influência nas Américas.' },
  { slug:'diferenca-entidade-divindade-umbanda-candomble', title:'Diferença entre Entidade e Divindade na Umbanda, Candomblé e Ifá', desc:'Entenda a diferença fundamental entre entidades espirituais e divindades (Orixás) nas religiões de matriz africana.' },
  { slug:'diferenca-ifa-candomble-umbanda-quimbanda', title:'Diferença entre Ifá, Candomblé, Umbanda e Quimbanda — Guia Completo', desc:'Entenda as diferenças fundamentais entre Ifá, Candomblé, Umbanda e Quimbanda. Origens, práticas e hierarquia espiritual.' },
  { slug:'todos-os-orixas-lista-completa', title:'Todos os Orixás — Lista Completa de Divindades do Panteão Yorubá', desc:'Lista completa de todos os Orixás do panteão Yorubá. Conheça cada divindade, seus domínios, cores e saudações.' },
  { slug:'exus-pombas-giras-umbanda', title:'Exus e Pombas Giras na Umbanda: Guia Completo das Entidades', desc:'Guia completo sobre Exus e Pombas Giras na Umbanda. Conheça suas falanges, características e como se manifestam nos terreiros.' },
  { slug:'entidades-umbanda-caboclos-pretos-velhos-boideiros-ciganos', title:'Entidades da Umbanda: Caboclos, Pretos-Velhos, Boiadeiros, Ciganos e Mais', desc:'Guia completo sobre todas as entidades da Umbanda: Caboclos, Pretos-Velhos, Erês, Boiadeiros, Baianos, Ciganos e Marinheiros.' },
  { slug:'quimbanda-entidades-exus-espiritualidade', title:'Entidades da Quimbanda: Exus, Pombas Giras e Magia Espiritual', desc:'Conheça as entidades da Quimbanda, seus Exus e Pombas Giras, hierarquia espiritual e a verdade sobre o culto à linha da esquerda.' },
  { slug:'magia-umbanda-quimbanda-trabalhos-espirituais-guia', title:'Magia na Umbanda e Quimbanda: Trabalhos Espirituais — Guia Completo', desc:'Guia completo sobre trabalhos espirituais na Umbanda e Quimbanda. Entenda o que são, como funcionam e quais os tipos existentes.' },
  { slug:'guia-completo-vida-espiritual-depois-morte', title:'Guia Completo da Vida Espiritual: O Que Acontece Depois da Morte', desc:'Descubra o que acontece depois da morte segundo a tradição Yorubá. Reencarnação, ancestralidade e o mundo espiritual.' },
  { slug:'significado-orixas-nao-sabe-existe', title:'Significado dos Orixás Que Você Não Sabia que Existiam', desc:'Descubra os significados profundos dos Orixás que talvez você não conheça. Orixás menos conhecidos mas igualmente importantes.' },
  { slug:'oferendas-nao-funcionam-porque-nao-faz', title:'Por que suas Oferendas não Funcionam? O Que Você Não Está Fazendo', desc:'Entenda por que suas oferendas podem não estar funcionando. Erros comuns e como corrigir para ter resultados.' },
  { slug:'ervas-magia-branca-defumacao-limpeza', title:'Ervas para Magia Branca, Defumação e Limpeza Espiritual', desc:'Conheça as ervas mais usadas na magia branca, defumação e limpeza espiritual. Receitas e usos de cada planta.' },
  { slug:'como-comecar-candomble-guia-iniciante', title:'Como Começar no Candomblé: Guia Completo para Iniciantes', desc:'Guia completo para quem quer começar no Candomblé. Primeiros passos, o que esperar e como encontrar um terreiro.' },
  { slug:'oraculo-de-ifa-como-funciona-historia', title:'Oráculo de Ifá: Como Funciona a História Deste Sistema Divinatório', desc:'Conheça o Oráculo de Ifá, um dos sistemas divinatórios mais antigos do mundo. Sua história, funcionamento e importância.' },
  { slug:'significado-orixas-cada-qual-e', title:'Significado dos Orixás: Cada Qual é a Sua Função na Espiritualidade', desc:'Entenda a função de cada Orixá no panteão Yorubá. Quem é cada divindade e qual sua importância na espiritualidade.' },
  { slug:'oferendas-para-orixas-como-fazer', title:'Oferendas para os Orixás: Como Fazer e o que Oferecer', desc:'Guia completo de oferendas para os Orixás. Saiba como fazer, o que oferecer e em quais dias de cada divindade.' },
  { slug:'ervas-sagradas-usos-magia-branca', title:'Ervas Sagradas e Seus Usos na Magia Branca e Espiritual', desc:'Conheça as ervas sagradas mais usadas em rituais de magia branca e práticas espirituais. Usos, significados e preparações.' },
  { slug:'por-que-exu-confundido-diabo-nao-e-o-diabo', title:'Por que Exu é Confundido com o Diabo? A Verdade sobre a Figura de Exu', desc:'Entenda por que Exu da Umbanda e Candomblé NÃO é o diabo cristão. Descubra a verdadeira origem dessa confusão.' },
  { slug:'verdadeira-funcao-pomba-gira-espiritualidade', title:'A Verdadeira Função de uma Pomba Gira na Espiritualidade', desc:'Conheça o papel real das Pombas Giras na Umbanda e no Candomblé. Entenda por que elas são importantes e como trabalham.' },
  { slug:'amarração-amorosa-pomba-gira-perigo-pecado', title:'É Perigoso ou Pecado Fazer Amarração Amorosa com Pomba Gira?', desc:'Verdade sobre amarração amorosa com Pomba Gira. Entenda o que realmente acontece nesses trabalhos.' },
  { slug:'exu-caveira-verdade-historia', title:'Quem é o Exu Caveira? A Verdadeira História', desc:'Conheça a verdadeira história do Exu Caveira, uma das entidades mais temidas e respeitadas da Umbanda.' },
  { slug:'deixar-cachaca-cigarro-pade-encruzilhada', title:'O que Significa Deixar Cachaça, Cigarro ou Padê na Encruzilhada?', desc:'Entenda o significado de deixar oferendas na encruzilhada para Exu. Saiba o que é um padê e quando fazer.' },
  { slug:'diferenca-exu-orixa-exu-entidade-trabalhador', title:'Qual a Diferença entre o Exu Orixá e o Exu Entidade/Trabalhador?', desc:'Entenda a diferença fundamental entre Exu como Orixá (divindade) e Exu como entidade trabalhadora.' },
  { slug:'pomba-gira-maria-padilha-famosa-historia', title:'Quem é a Pomba Gira Maria Padilha e Por que Ela é Tão Famosa?', desc:'Conheça a história de Maria Padilha, a Pomba Gira mais famosa do Brasil. Entenda sua verdadeira função.' },
  { slug:'como-pedir-protecao-exu-tranca-ruas', title:'Como Pedir Proteção ao Exu Tranca Ruas?', desc:'Guia completo para pedir proteção ao Exu Tranca Ruas. Saiba como funciona, quando pedir e como oferecer.' },
  { slug:'entidade-mais-forte-umbanda-resposta', title:'Qual é a Entidade Mais Forte da Umbanda?', desc:'Descubra qual é a entidade mais poderosa da Umbanda e por que. Entenda que a força depende da conexão.' },
  { slug:'umbanda-acredita-deus-dogmas', title:'A Umbanda Acredita em Deus? Quais São Seus Dogmas?', desc:'Entenda se a Umbanda acredita em Deus, como ela concebe o divino e quais são seus princípios fundamentais.' },
  { slug:'tomar-passe-umbanda-o-que-e-o-que-sente', title:'O que é Tomar Passe na Umbanda e O que se Sente?', desc:'Entenda o que é tomar passe na Umbanda, como funciona o ritual e quais são as sensações que a pessoa sente.' },
  { slug:'como-saber-se-tenho-orixa-na-cabeca', title:'Como Saber se Tenho um Orixá na Cabeça?', desc:'Entenda o que significa ter um Orixá de cabeça e como descobrir qual é a sua divindade guia.' },
  { slug:'quantas-vidas-ancestrais-anteriores-espiritualidade', title:'Quantas Vidas eu Já Vivi? Como Saber sobre minhas Vidas Anteriores?', desc:'Entenda o conceito de reencarnação na Umbanda e no Candomblé. Saiba como ter acesso às suas vidas anteriores.' },
  { slug:'como-falar-com-espirito-guia-ancestral', title:'Como Falar com Meu Espírito Guia ou Ancestral?', desc:'Guia prático para se comunicar com espíritos guias e ancestrais na Umbanda e no Candomblé.' },
  { slug:'sonho-com-morte-mau-pressagio-espiritualidade', title:'Sonhar com Morte é Mau Presságio? O Que a Espiritualidade Diz?', desc:'Entenda o significado espiritual de sonhar com morte na Umbanda e no Candomblé.' },
  { slug:'como-tirar-virado-azar-despacho-espiritual', title:'Como Tirar o Virado do Azar? Despacho Espiritual Simples', desc:'Guia para fazer um despacho espiritual caseiro para tirar o azar e as energias negativas.' },
  { slug:'exu-7-encruzilhadas-nao-e-diabo-completo', title:'Exu das 7 Encruzilhadas: Não é o Diabo! Verdade Completa', desc:'Toda a verdade sobre Exu das 7 Encruzilhadas. Entenda sua origem, função e por que ele é respeitado.' },
  { slug:'pomba-gira-negativa-o-que-fazer', title:'Como Saber se uma Pomba Gira está Trabalhando Contra Mim?', desc:'Entenda os sinais de que uma Pomba Gira pode estar trabalhando contra você e o que fazer para se proteger.' },
  { slug:'orixas-dias-semana-quais-dias-oferecer', title:'Os Orixás e os Dias da Semana: O Que Oferecer em Cada Dia', desc:'Guia completo dos dias da semana na Umbanda e no Candomblé. Qual Orixá é cultuado em cada dia.' },
  { slug:'limpar-casa-energia-negativa-remedios-naturais', title:'Como Limpar sua Casa de Energias Negativas: Remedios Naturais', desc:'Receitas naturais e caseiras para limpar sua casa de energias negativas. Ervas, velas e defumação.' },
  { slug:'preto-velho-mais-forte-brasil-quem-ele', title:'Quem é o Preto Velho Mais Forte do Brasil?', desc:'Conheça os Preto Velhos mais poderosos da Umbanda brasileira. A verdadeira força de um Preto Velho.' },
  { slug:'como-saber-se-estou-amarrado-espiritualmente', title:'Como Saber se Estou Amarrado Espiritualmente?', desc:'Sinais de que você pode estar espiritualmente amarrado e o que fazer para se libertar.' },
  { slug:'como-fazer-banho-de-ervas-protecao', title:'Como Fazer um Banho de Ervas para Proteção?', desc:'Receitas de banhos de ervas para proteção espiritual. Alecrim, arruda, manjerição e mais.' },
  { slug:'o-que-e-descarrego-espiritual-como-funciona', title:'O que é Descarrego Espiritual e Como Funciona?', desc:'Entenda o que é um descarrego espiritual, quando é necessário e como funciona na Umbanda e no Candomblé.' },
  { slug:'significado-sonhar-orixas-qual-orixa-apareceu', title:'O que Significa Sonhar com Orixás? Qual Orixá Apareceu?', desc:'Interpretação dos sonhos com Orixás na Umbanda e no Candomblé.' },
  { slug:'como-se-proteger-de-inveja-olho-gordo', title:'Como se Proteger da Inveja e do Olho Gordo?', desc:'Técnicas simples e eficazes para se proteger da inveja e do olho gordo na vida cotidiana.' },
  { slug:'como-invocar-orixas-simples-iniciante', title:'Como Invocar os Orixás de Forma Simples para Iniciantes', desc:'Guia prático para iniciantes sobre como invocar Orixás de forma simples e segura.' },
  { slug:'como-cortar-laço-de-amor-amarração-espiritual', title:'Como Cortar Laço de Amarração Amorosa Espiritualmente', desc:'Guia para desfazer uma amarração amorosa espiritualmente. Técnicas de corte energético.' },
  { slug:'como-saber-se-tenho-debito-espiritual', title:'Como Saber se Tenho Débito Espiritual?', desc:'Entenda o que é débito espiritual, como saber se você tem um e o que fazer para saldar.' },
  { slug:'como-atrar-dinheiro-espiritualmente', title:'Como Atrair Dinheiro Espiritualmente? Orações e Oferendas', desc:'Técnicas espirituais para atrair prosperidade e dinheiro. Orações, oferendas e trabalhos.' },
  { slug:'basta-de-terreiro-como-funciona-beneficios', title:'O que é Basta de Terreiro? Como Funciona e Quais os Benefícios', desc:'Entenda o que é o Basta de Terreiro, como funciona esse ritual de proteção.' },
  { slug:'como-fazer-simbolo-de-orixa-em-casa', title:'Como Fazer o Símbolo de um Orixá em Casa', desc:'Guia para confeccionar símbolos e pontos riscados dos Orixás em casa.' },
  { slug:'como-saber-se-fui-incorporado-na-gira', title:'Como Saber se Fui Incorporado numa Gira?', desc:'Entenda o que é incorporação na Umbanda, como saber se você incorporou.' },
  { slug:'o-que-e-axé-como-aumentar-sua-energia', title:'O que é Axé e Como Aumentar sua Energia Espiritual?', desc:'Entenda o conceito de Axé na Umbanda e no Candomblé. Saiba como aumentar sua energia.' },
  { slug:'como-fazer-defumacao-casa-espiritos-negativos', title:'Como Fazer Defumação na Casa para Afastar Espíritos Negativos?', desc:'Guia completo para defumação caseira com sálvia, arruda e outras ervas.' },
  { slug:'como-descobrir-seu-orixa-guia-por-nascimento', title:'Como Descobrir seu Orixá de Acordo com o Dia de Nascimento?', desc:'Tabela completa mostrando qual Orixá rege cada dia da semana de nascimento.' },
  { slug:'como-se-proteger-de-magoa-espiritual-trabalho', title:'Como se Proteger de um Trabalho Espiritual Ruim?', desc:'Técnicas de proteção espiritual contra trabalhos ruins, maldições e energias negativas.' },
  { slug:'como-fazer-oracao-para-acalmar-a-mente', title:'Como Fazer uma Oração para Acalmar a Mente e o Coração?', desc:'Orações simples e poderosas para acalmar a mente, trazer paz e equilibrar as emoções.' },
  { slug:'como-saber-se-tenho-entidade-me-seguindo', title:'Como Saber se Tenho uma Entidade me Seguindo?', desc:'Sinais de que uma entidade espiritual pode estar acompanhando você.' },
  { slug:'como-tirar-mau-olhado-com-agua-e-sal', title:'Como Tirar o Mau Olhado com Água e Sal?', desc:'Receita simples e eficaz para remover o mau olhado usando água e sal.' },
  { slug:'como-fazer-acende-luz-orixas-espirituais', title:'Como Acender uma Luz para os Orixás Espirituais?', desc:'Guia para acender velas e luzes para os Orixás. Cores, dias e orações.' },
  { slug:'como-cortar-mau-olhado-de-pessoa', title:'Como Cortar o Mau Olhado de uma Pessoa?', desc:'Técnicas espirituais para cortar o mau olhado proveniente de outra pessoa.' },
  { slug:'como-saber-se-estou-vibrando-baixo-espiritualmente', title:'Como Saber se Estou Vibrando Baixo Espiritualmente?', desc:'Sinais de que sua vibração espiritual está baixa e como elevá-la.' },
  { slug:'como-fazer-oracao-de-segunda-feira-exu', title:'Como Fazer a Oração de Segunda-feira para Exu?', desc:'Oração completa para Exu toda segunda-feira. Proteção e abertura de caminhos.' },
  { slug:'como-saber-se-tenho-duende-espiritual-casa', title:'Como Saber se Tenho Duende Espiritual na Casa?', desc:'Sinais da presença de duendes espirituais em casa. O que são e como conviver.' },
  { slug:'como-curar-ansiedade-com-espiritualidade', title:'Como Curar a Ansiedade com Espiritualidade?', desc:'Técnicas espirituais para aliviar a ansiedade. Orações, meditação e práticas.' },
  { slug:'como-receber-um-passe-espiritual-em-casa', title:'Como Receber um Passe Espiritual em Casa?', desc:'Guia para receber um passe espiritual em casa. Preparação e depois do passe.' },
  { slug:'como-saber-se-fui-marcado-por-morte', title:'Como Saber se Fui Marcado pela Morte? Sinais e Proteção', desc:'Entenda o que significa ser "marcado pela morte" na espiritualidade.' },
  { slug:'como-fazer-santa-ceia-espiritual-para-dinheiro', title:'Como Fazer uma Santa Ceia Espiritual para Dinheiro?', desc:'Guia para fazer uma Santa Ceia espiritual para atrair prosperidade e dinheiro.' },
  { slug:'como-saber-se-tenho-maldicao-de-familia', title:'Como Saber se Tenho uma Maldição de Família?', desc:'Sinais de que existe uma maldição ou débito espiritual na família.' },
  { slug:'como-fazer-oracao-para-paz-no-casaral', title:'Como Fazer uma Oração para Trazer Paz no Lar?', desc:'Orações simples e poderosas para trazer paz e harmonia para o lar.' }
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
  <meta name="keywords" content="${a.title}, Ifá, Yorubá, Ifá Oluwo, ${a.desc.slice(0,100)}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <link rel="canonical" href="${SITE}/artigos/${a.slug}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Ifá Oluwo - Enciclopédia Sagrada">
  <meta property="og:title" content="${a.title}">
  <meta property="og:description" content="${a.desc}">
  <meta property="og:image" content="${SITE}/logo.png">
  <meta property="og:url" content="${SITE}/artigos/${a.slug}">
  <meta property="og:locale" content="pt_BR">
  <meta property="article:published_time" content="">
  <meta property="article:author" content="Ifá Oluwo">
  <meta property="article:section" content="Ifá">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@ifaluwo">
  <meta name="twitter:title" content="${a.title}">
  <meta name="twitter:description" content="${a.desc}">
  <meta name="twitter:image" content="${SITE}/logo.png">
  <title>${a.title} | Ifá Oluwo</title>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Article","headline":"${a.title}","description":"${a.desc}","image":"${SITE}/logo.png","author":{"@type":"Organization","name":"Ifá Oluwo","url":"${SITE}"},"publisher":{"@type":"Organization","name":"Ifá Oluwo","url":"${SITE}","logo":{"@type":"ImageObject","url":"${SITE}/logo.png"}},"mainEntityOfPage":{"@type":"WebPage","@id":"${SITE}/artigos/${a.slug}"},"datePublished":"","dateModified":"","inLanguage":"pt-BR"}
  </script>
  <style>
    body{font-family:system-ui,sans-serif;max-width:780px;margin:0 auto;padding:2rem 1rem;line-height:1.6;background:#090e14;color:rgba(255,255,255,0.87)}
    h1{font-family:serif;color:#C49E30}
    a{color:#C49E30}
    p{margin:1rem 0}
  </style>
</head>
<body>
  <h1>${a.title}</h1>
  <p>${a.desc}</p>
  <p>Este é um artigo interativo do Ifá Oluwo. Para ler o conteúdo completo, acesse <a href="${SITE}/artigos/${a.slug}">${SITE}/artigos/${a.slug}</a> em um navegador.</p>
  <p><a href="/artigos">&larr; Todos os Artigos</a> | <a href="/">&larr; Ifá Oluwo</a></p>
</body>
</html>`;
}

const ARTICLES_LISTING_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Artigos sobre Ifá: significados dos Odus, rituais, orixás, ervas sagradas e conhecimento da tradição Yorubá. 90+ artigos completos.">
  <meta name="keywords" content="Ifá, artigos, Yorubá, Orixás, Odus, rituais, espiritualidade, candomblé, umbanda">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <link rel="canonical" href="${SITE}/artigos">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Ifá Oluwo - Enciclopédia Sagrada">
  <meta property="og:title" content="Artigos sobre Ifá e Tradição Yorubá | Ifá Oluwo">
  <meta property="og:description" content="Artigos aprofundados sobre Ifá, Odus, rituais e a tradição Yorubá. 90+ artigos completos.">
  <meta property="og:image" content="${SITE}/logo.png">
  <meta property="og:url" content="${SITE}/artigos">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Artigos sobre Ifá | Ifá Oluwo">
  <meta name="twitter:description" content="Artigos aprofundados sobre Ifá, Odus, rituais e a tradição Yorubá.">
  <meta name="twitter:image" content="${SITE}/logo.png">
  <title>Artigos sobre Ifá e Tradição Yorubá | Ifá Oluwo</title>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"CollectionPage","name":"Artigos sobre Ifá e Tradição Yorubá","description":"Artigos aprofundados sobre Ifá, Odus, rituais, orixás e a tradição Yorubá.","url":"${SITE}/artigos","isPartOf":{"@type":"WebSite","name":"Ifá Oluwo","url":"${SITE}"}}
  </script>
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
  <h1>Artigos sobre Ifá e Tradição Yorubá</h1>
  <p>Conhecimento aprofundado sobre Ifá, Odus, rituais e a tradição Yorubá. 90+ artigos completos.</p>
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
    content: 'Ifá Oluwo é a plataforma digital definitiva para Babalawos, sacerdotes e praticantes da tradição Ifá. Oferece ferramentas de divinação assistidas por IA (Opele, Ikin, Merindilogun, Opon Ifá), biblioteca completa de 256 Odus, calendário litúrgico Yorubá, identificador de ervas, diário de sonhos, simulador de Ebó, e muito mais.'
  },
  '/odu_library': {
    title: 'Biblioteca de 256 Odus - Ifá Oluwo',
    description: 'Consulte os significados completos dos 256 Odus de Ifá. Cada Odu com seu nome Yorubá, significados, lendas (Itan), orientações e energia.',
    ogTitle: 'Biblioteca de 256 Odus - Ifá Oluwo',
    ogDesc: 'Consulte os significados completos dos 256 Odus de Ifá. Cada Odu com seu nome Yorubá, lendas e orientações.',
    h1: 'Biblioteca de Odus',
    content: 'A Biblioteca de Odus contém todos os 256 Odus do corpus Ifá, incluindo os 16 principais (Meji) e seus 240 combinados (Omo Odu).'
  },
  '/prayers': {
    title: 'Orações e Textos Sagrados - Ifá Oluwo',
    description: 'Acesse Akoses (orações e rezas), trechos sagrados e textos litúrgicos da tradição Ifá para rituais e cerimônias.',
    ogTitle: 'Orações e Textos Sagrados - Ifá Oluwo',
    ogDesc: 'Acesse Akoses, orações e textos sagrados da tradição Ifá para rituais e cerimônias.',
    h1: 'Orações e Textos Sagrados',
    content: 'Coleção de orações, rezas (Akose) e textos litúrgicos da tradição Ifá.'
  },
  '/dictionary': {
    title: 'Dicionário Yorubá - Ifá Oluwo',
    description: 'Dicionário completo de termos Yorubá com traduções para português.',
    ogTitle: 'Dicionário Yorubá - Ifá Oluwo',
    ogDesc: 'Dicionário completo de termos Yorubá com traduções para português.',
    h1: 'Dicionário Yorubá',
    content: 'Dicionário bilíngue Yorubá-Português com centenas de termos e expressões.'
  },
  '/treatise': {
    title: 'Tratados e Estudos de Ifá - Ifá Oluwo',
    description: 'Estudos aprofundados sobre a tradição Ifá, incluindo tratados sobre Odus, rituais e mitologia Yorubá.',
    ogTitle: 'Tratados e Estudos de Ifá - Ifá Oluwo',
    ogDesc: 'Estudos aprofundados sobre a tradição Ifá.',
    h1: 'Tratados e Estudos',
    content: 'Biblioteca de tratados e estudos aprofundados sobre a tradição Ifá.'
  },
  '/manual': {
    title: 'Manual de Uso - Ifá Oluwo',
    description: 'Guia completo de uso da plataforma Ifá Oluwo.',
    h1: 'Manual de Uso',
    content: 'Guia completo de uso da plataforma Ifá Oluwo.'
  },
  '/agenda': {
    title: 'Calendário Litúrgico Yorubá - Ifá Oluwo',
    description: 'Calendário litúrgico Yorubá com datas sagradas e festividades.',
    h1: 'Calendário Litúrgico Yorubá',
    content: 'Calendário litúrgico da tradição Yorubá.'
  },
  '/odu': {
    title: 'Todos os 256 Odus de Ifá — Significados, Itans e Interpretações | Ifá Oluwo',
    description: 'Consulte os 256 Odus de Ifá completos com significado, itan (lenda sagrada), orixás regentes e interpretações.',
    ogTitle: '256 Odus de Ifá — Biblioteca Sagrada Completa',
    ogDesc: 'Consulte todos os 256 Odus de Ifá com significado completo, lendas e interpretações.',
    h1: 'Biblioteca dos 256 Odus de Ifá',
    content: 'A Biblioteca dos 256 Odus de Ifá contém todos os Odus do corpus Ifá.'
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
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${SITE}${path}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Ifá Oluwo - Enciclopédia Sagrada" />
  <meta property="og:title" content="${meta.ogTitle || meta.title}" />
  <meta property="og:description" content="${meta.ogDesc || meta.description || meta.title}" />
  <meta property="og:image" content="${SITE}/logo.png" />
  <meta property="og:url" content="${SITE}${path}" />
  <meta property="og:locale" content="pt_BR" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@ifaluwo" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description || meta.title}" />
  <meta name="twitter:image" content="${SITE}/logo.png" />
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
  <p>Este é um aplicativo interativo baseado em JavaScript. Para acessar todas as funcionalidades interativas, visite <a href="${SITE}">${SITE}</a> em um navegador moderno.</p>
  <p><a href="${SITE}">&larr; Voltar ao Ifá Oluwo</a></p>
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
