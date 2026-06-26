import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@vyttai.com" },
    update: {},
    create: {
      name: "Admin VYTTAI",
      email: "admin@vyttai.com",
      password: "change-this-password-hash",
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: "sf-group" },
    update: {},
    create: {
      name: "SF GROUP",
      slug: "sf-group",
      users: {
        create: {
          userId: user.id,
          role: "owner",
        },
      },
    },
  });

  const brands = [
    {
      name: "IFÁ OLUWO",
      slug: "ifa-oluwo",
      site: "https://ifaoluwo.com",
      description: "Plataforma de assinatura para sacerdotes de Ifa.",
      brain: {
        identity: {
          mission: "Organizar e preservar conhecimento sacerdotal de Ifa com tecnologia.",
          positioning: "Sabedoria ancestral, orientacao e destino em uma plataforma premium.",
        },
        voice: {
          tone: "espiritual, profundo, respeitoso e sacerdotal",
          favoriteWords: ["sabedoria", "ancestralidade", "destino", "orientacao"],
          forbiddenWords: ["milagre garantido", "adivinhacao banalizada"],
        },
        visual: {
          colors: ["verde profundo", "ouro", "preto"],
          style: "cinematografico, sagrado, premium, ancestral",
          symbols: ["arvore sagrada", "ikin", "odu", "ornamentos yoruba"],
        },
        rules: {
          compliance: "Manter respeito religioso e evitar caricaturas ou simplificacoes ofensivas.",
        },
        knowledge: {
          product: "Assinatura IFÁ OLUWO",
          audience: "Sacerdotes, estudantes e praticantes de Ifa.",
        },
      },
    },
    {
      name: "PEPTIUM",
      slug: "peptium",
      site: "https://peptium.com.br",
      description: "Biblioteca mundial de conhecimento sobre peptideos com assinatura.",
      brain: {
        identity: {
          mission: "Organizar conhecimento cientifico sobre peptideos em uma biblioteca premium.",
          positioning: "Autoridade cientifica acessivel sobre peptideos.",
        },
        voice: {
          tone: "cientifico, preciso, moderno e confiavel",
          favoriteWords: ["evidencia", "mecanismo", "biblioteca", "estudo"],
          forbiddenWords: ["cura garantida", "resultado garantido"],
        },
        visual: {
          colors: ["azul cientifico", "verde neon", "branco", "preto"],
          style: "biotecnologia, molecular, limpo, internacional",
          symbols: ["moleculas", "DNA", "laboratorio", "interfaces cientificas"],
        },
        rules: {
          compliance: "Evitar prescricao direta, promessas medicas absolutas e alegacoes sem base.",
        },
        knowledge: {
          product: "Assinatura PEPTIUM",
          audience: "Profissionais e estudiosos de saude, performance e peptideos.",
        },
      },
    },
    {
      name: "VYTTAI",
      slug: "vyttai",
      site: "https://vyttai.com",
      description: "Plataforma de saude familiar com inteligencia artificial.",
      brain: {
        identity: {
          mission: "Ajudar familias a organizarem sua saude com inteligencia artificial.",
          positioning: "Saude familiar inteligente, preventiva e acessivel.",
        },
        voice: {
          tone: "acolhedor, claro, confiavel e humano",
          favoriteWords: ["cuidado", "familia", "prevencao", "saude inteligente"],
          forbiddenWords: ["diagnostico garantido", "substitui medico"],
        },
        visual: {
          colors: ["azul saude", "verde", "branco"],
          style: "limpo, humano, tecnologico e familiar",
          symbols: ["familia", "IA", "saude preventiva", "dashboard"],
        },
        rules: {
          compliance: "Nao substituir avaliacao medica e evitar promessas diagnosticas.",
        },
        knowledge: {
          product: "Plataforma VYTTAI",
          audience: "Familias que querem organizar saude, exames e cuidado preventivo.",
        },
      },
    },
    {
      name: "SF PERFORMANCE",
      slug: "sf-performance",
      description: "Saude, performance e longevidade.",
      brain: {
        identity: {
          mission: "Elevar saude, performance e longevidade com estrategia e ciencia.",
          positioning: "Performance humana com linguagem tecnica, aspiracional e comercial.",
        },
        voice: {
          tone: "direto, tecnico, forte e aspiracional",
          favoriteWords: ["performance", "longevidade", "resultado", "protocolo"],
          forbiddenWords: ["cura", "garantia absoluta", "use sem orientacao"],
        },
        visual: {
          colors: ["azul escuro", "branco", "dourado", "verde neon"],
          style: "cientifico, comercial, infografico, alta densidade de informacao",
          symbols: ["moleculas", "corpo atletico", "icones medicos", "dados"],
        },
        rules: {
          compliance: "Evitar prescricao direta e incluir orientacao profissional quando necessario.",
        },
        knowledge: {
          products: ["Retatrutida", "Mounjaro", "Peptideos", "Protocolos"],
          audience: "Pessoas interessadas em emagrecimento, performance, saude e longevidade.",
        },
      },
    },
    {
      name: "SF IMPORTS",
      slug: "sf-imports",
      description: "Vinhos e importacao.",
      brain: {
        identity: {
          mission: "Oferecer curadoria sofisticada de vinhos e produtos importados.",
          positioning: "Oferta premium, sensorial e comercial para vinhos e importacao.",
        },
        voice: {
          tone: "sofisticado, sensorial, elegante e comercial",
          favoriteWords: ["curadoria", "safra", "harmonizacao", "experiencia"],
          forbiddenWords: ["beneficio para saude", "direcionado a menores"],
        },
        visual: {
          colors: ["verde escuro", "dourado", "vinho", "creme"],
          style: "catalogo premium, ficha tecnica, produto em destaque, preco claro",
          symbols: ["garrafa", "taca", "uvas", "origem", "harmonizacao"],
        },
        rules: {
          compliance: "Incluir aviso de venda proibida para menores de 18 anos.",
        },
        knowledge: {
          product: "Vinhos importados",
          audience: "Consumidores adultos interessados em vinhos e experiencias gastronomicas.",
        },
      },
    },
  ];

  for (const item of brands) {
    const brand = await prisma.brand.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        site: item.site,
        description: item.description,
      },
      create: {
        workspaceId: workspace.id,
        name: item.name,
        slug: item.slug,
        site: item.site,
        description: item.description,
      },
    });

    await prisma.brandBrain.upsert({
      where: { brandId: brand.id },
      update: item.brain,
      create: {
        brandId: brand.id,
        ...item.brain,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
