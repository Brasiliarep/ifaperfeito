import type { EncyclopediaEntity } from './types';

export const ORIXAS_DIVERSOS_DATA: EncyclopediaEntity[] = [
  // ─── 1. Ọkọ̀ — Orixá da Agricultura ───
  {
    id: 'orixa-oko',
    nome: 'Ọkọ̀',
    nomeYoruba: 'Ọkọ̀',
    nomeLucumi: 'Okó',
    nomeIngles: 'Oko',
    nomeEspanhol: 'Okó',
    variacoesRegionais: ['Ọkọ̀ Alágbára', 'Okó Ayé', 'Ọkọ̀ Ará', 'Ogó Okó'],
    categoria: 'Orixá',
    linha: 'Agricultura e Colheita',
    reino: 'Lavouras, Fertilidade do Solo, Colheita, Abundância Agrícola',
    falange: 'Orixás / Orishas',
    saudacao: 'Opa Ọkọ̀! Epa Ọkọ̀!',
    caracteristicas: ['Orixá senhor da agricultura e da colheita','Senhor do arado (ilá) e das lavouras','Ensina o cultivo de inhame, milho e feijão','Associado à fertilidade do solo cultivado','Protetor dos agricultores'],
    simbolos: ['Arado (ilá)','Boi sagrado (àgbọ̀)','Semente de inhame','Machado de ferro'],
    cores: ['Verde (plantações)','Amarelo (sol e colheita)'],
    elementosNaturais: ['Solo cultivado','Água de irrigação','Sol','Chuva fertilizante'],
    diaTradicional: 'Quarta-feira',

    historiaTradicional:
      'Ọkọ̀ é o Orixá senhor da agricultura, da colheita e da fertilidade da terra cultivada. Nos mitos yorùbá, Ọkọ̀ desceu do Orun trazendo consigo os segredos do plantio e do manejo do solo, ensinando aos humanos como cultivar inhame, milho, feijão e outros alimentos essenciais para a sobrevivência. Diferente de Oní Ilé, que é o dono da terra bruta e ancestral, Ọkọ̀ governa especificamente a terra que foi trabalhada pelas mãos humanas, o campo arado, a lavoura, a colheita. Ele é retratado como um Orixá robusto e trabalhador, que veste verde e amarelo, as cores das plantações e do sol que amadurece os frutos. Seu símbolo principal é o arado, ilá, que quebra a terra dura e abre caminho para a semente. Em muitos itans, Ọkọ̀ é descrito como o marido devotado de Ọya, embora em outras tradições seja ligado a Òṣun ou a Ìyá Mi Ajé. Ele é um Orixá que valoriza o trabalho honesto, a paciência e a persistência, qualidades necessárias para quem cultiva a terra. Seus filhos são conhecidos por serem trabalhadores incansáveis, generosos e abundantes. No culto tradicional, Ọkọ̀ é homenageado no início da época de plantio e na colheita, com oferendas de inhame, milho, mel e pombo verde.',

    quemFoi:
      'O Orixá da agricultura, da colheita e da fertilidade do solo cultivado. Senhor do arado e das lavouras. Traduz a sabedoria do plantio para a humanidade.',

    personalidade: [
      'Trabalhador incansável',
      'Paciente — entende que a terra exige tempo para dar frutos',
      'Abundante — traz prosperidade através do cultivo',
      'Generoso — compartilha os frutos de seu trabalho',
      'Prático e direto — prefere ação a palavras',
      'Humilde — vive entre os campos, longe do luxo',
      'Protetor dos agricultores e dos que trabalham a terra',
      'Determinado — não desiste diante da seca ou da dificuldade',
    ],

    biografia: {
      nascimento:
        'Um dos Ìrúnmọlẹ̀ que desceram do Orun ao Aiyê, trazendo consigo o conhecimento sagrado da agricultura. Recebeu de Olódùmarè a missão de ensinar aos humanos a arte de cultivar a terra.',
      feitos: [
        'Ensinou aos humanos a arte do plantio e da colheita',
        'Introduziu o uso do arado (ilá) para quebrar o solo',
        'Ensinou o cultivo do inhame, milho, feijão e outros alimentos',
        'Estabeleceu os ciclos agrícolas de plantio e colheita',
        'Protegeu os campos contra pragas e secas',
        'Trouxe a abundância para as comunidades que o honravam',
      ],
      transformacao:
        'De um Ìrúnmọlẹ̀ do Orun a senhor absoluto dos campos cultivados, tornou-se a esperança de todo povo que depende da terra para sobreviver.',
    },

    genealogia: {
      pai: 'Ọbàtálá (em algumas tradições)',
      mae: 'Yemoo (em algumas tradições)',
      irmaos: [
        'Todos os Ìrúnmọlẹ̀ são seus irmãos espirituais',
        'Irmão de Ògún (ambos ligados ao trabalho e à terra)',
      ],
      esposasMaridos: [
        'Ọya (em muitos itans)',
        'Òṣun (em algumas tradições)',
        'Ìyá Mi Ajé (em outros relatos)',
      ],
      filhos: ['Seus filhos espirituais são todos os agricultores e cultivadores'],
    },

    linhaDoTempoMitica: [
      'Descida do Orun — Ọkọ̀ recebe de Olódùmarè a missão de ensinar a agricultura',
      'O Primeiro Plantio — sementes sagradas são depositadas no solo pela primeira vez',
      'O Ensinamento do Arado — Ọkọ̀ mostra aos humanos como usar o ilá',
      'A Primeira Colheita — os campos dão frutos abundantes pela primeira vez',
      'O Casamento com Ọya — união entre a colheita e os ventos fertilizantes',
      'A Proteção dos Campos — Ọkọ̀ estabelece rituais para proteção das lavouras',
    ],

    itans: [
      {
        titulo: 'Ọkọ̀ e o Primeiro Plantio',
        historia:
          'Quando os seres humanos ainda não sabiam cultivar a terra, viviam da caça e da coleta, passando frequentemente fome. Olódùmarè, vendo seu sofrimento, chamou Ọkọ̀ e deu-lhe sementes sagradas de inhame, milho e feijão. Ọkọ̀ desceu ao Aiyê e encontrou os humanos desnutuídos e perdidos. Ele reuniu-os em torno de si, pegou uma porção de terra, quebrou-a com as mãos e plantou a primeira semente. Aguardem, disse ele. A terra precisa de tempo, de chuva e de sol. Os humanos, impacientes, quiseram arrancar a semente para ver se já havia germinado. Ọkọ̀ os deteve: A paciência é a mãe da colheita. Sete luas se passaram, e da terra brotaram as primeiras plantas de inhame, carregadas de raízes robustas. Os humanos choraram de alegria e nunca mais passaram fome. Ọkọ̀ ensinou-lhes os ciclos de plantio, as estações, os sinais da chuva e a importância de oferecer parte da colheita aos Orixás em gratidão.',
        licao:
          'A paciência e o trabalho são as chaves da abundância. Não se pode colher antes de plantar, nem plantar sem preparar a terra.',
      },
      {
        titulo: 'O Arado de Ọkọ̀',
        historia:
          'Conta-se que Ọkọ̀ percebeu que os humanos plantavam apenas com as mãos, o que era lento e ineficiente. Ele então forjou o primeiro arado, ilá, a partir de um galho resistente e uma ponta de pedra afiada. Quando os humanos viram a ferramenta, ficaram assombrados: com um único gesto, o arado abria um sulco na terra que antes levava horas para ser feito com as mãos. Ọkọ̀ mostrou como acoplar o arado ao boi sagrado, àgbọ̀, que puxava o implemento pelos campos. A revolução foi imediata: em poucos dias, campos inteiros eram preparados para o plantio. O arado de Ọkọ̀ tornou-se o símbolo da agricultura yorùbá e é representado nos assentamentos sagrados do Orixá. O boi, em gratidão, tornou-se o animal sagrado mais importante de Ọkọ̀, e seu sacrifício é oferecido nas festas de colheita.',
        licao:
          'O progresso vem da inovação e do trabalho conjunto entre humanos, animais e Orixás.',
      },
      {
        titulo: 'Ọkọ̀ e Ọya — O Casamento dos Ventos e da Colheita',
        historia:
          'Ọya, senhora dos ventos, das tempestades e do rio Níger, encontrou Ọkọ̀ certa vez nos campos durante uma colheita. Ela soprou seus ventos sobre os campos, e os grãos amadureceram mais rápido. Ọkọ̀, impressionado com seu poder, pediu-a em casamento. Ọya aceitou, mas impôs uma condição: ele deveria sempre oferecer parte da colheita antes de consumi-la. Ọkọ̀ concordou, e sua união trouxe prosperidade sem precedentes às cidades yorùbá. No entanto, em alguns itans, o casamento é descrito como turbulento: os ventos de Ọya às vezes arrasavam os campos que Ọkọ̀ havia cultivado, gerando conflitos. Essa tensão simboliza a relação entre a natureza selvagem e o trabalho humano.',
        licao:
          'A união entre forças opostas gera prosperidade, mas exige equilíbrio e respeito mútuo.',
      },
    ],

    dominios: [
      'Agricultura e Lavoura',
      'Colheita',
      'Fertilidade do Solo Cultivado',
      'Inhame e Milho',
      'Abundância Alimentar',
      'Trabalho e Dedicação',
      'Ciclos Naturais de Plantio',
      'Campos e Plantações',
      'Paciência e Persistência',
    ],

    correspondencias: {
      arvores: ['Bananeira', 'Palmeira de dendezeiro', 'Moringa', 'Árvore do inhame'],
      locaisNatureza: [
        'Campos cultivados',
        'Plantações de inhame',
        'Milharais',
        'Hortas e quintais agrícolas',
        'Terras férteis ribeirinhas',
      ],
      metaisPedras: ['Ferro (do arado)', 'Pedra de moagem', 'Obsidiana'],
      animais: ['Boi sagrado (àgbọ̀)', 'Pombo verde', 'Galo', 'Cobra do campo'],
    },

    ervas: {
      liturgicas: [
        'Folha de inhame',
        'Folha de milho',
        'Erva do campo',
        'Folha de bananeira',
      ],
      medicinais: [
        'Erva-cidreira — para digestivo e calmante',
        'Folha de inhame — para fortalecimento',
        'Guiné — para lavagens espirituais',
      ],
    },

    comidas: [
      'Inhame cozido e pilado',
      'Milho cozido',
      'Feijão',
      'Mel silvestre',
      'Frutas do campo',
      'Fubá de milho',
      'Amendoim',
    ],

    ewoTabus: [
      {
        tabu: 'Desperdiçar alimentos ou colheita',
        motivo:
          'Ọkọ̀ é o senhor da abundância, mas exige respeito pelos frutos do trabalho. Desperdiçar comida é ofender profundamente o Orixá.',
      },
      {
        tabu: 'Não oferecer parte da colheita aos Orixás',
        motivo:
          'A primeira colheita pertence aos Orixás. Guardar tudo para si é quebrar a aliança sagrada entre o homem e a terra.',
      },
      {
        tabu: 'Plantar em terras alheias sem permissão',
        motivo:
          'A terra pertence a Oní Ilé, e o plantio é domínio de Ọkọ̀. Invadir terras é ofender ambos.',
      },
    ],

    qualidades: [
      {
        nome: 'Ọkọ̀ Alágbára',
        descricao:
          'Ọkọ̀ Poderoso — manifestação guerreira e protetora do Orixá da agricultura.',
      },
      {
        nome: 'Ọkọ̀ Ayé',
        descricao:
          'Ọkọ̀ da Terra — a qualidade mais ligada à fertilidade do solo e à colheita.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria e no Benin, Ọkọ̀ é reverenciado como o Orixá da agricultura. Seu culto é especialmente forte em comunidades rurais yorùbá, onde os agricultores oferecem inhame, milho e sacrifícios de boi antes do plantio e da colheita.',
      brasil:
        'No Brasil, o culto a Ọkọ̀ é menos difundido que o de outros Orixás, mas está presente em terreiros de nação Ketu que preservam as tradições agrícolas. Filhos de Ọkọ̀ são trabalhadores e práticos.',
      cuba:
        'Em Cuba, Okó é venerado no Santería como o orixá da agricultura. Seu culto é menos popular que o de outros orixás, mas mantém-se em comunidades rurais.',
    },

    orikis: [
      {
        yoruba:
          'Ọkọ̀, Ọkọ̀\nIlá rẹ ti ilẹ̀ gbé\nAlágbára ni mo ní o\nO fi ohun tí ó ṣe fún wa\nOpa Ọkọ̀!',
        traducao:
          'Ọkọ̀, Ọkọ̀, Seu arado ergueu a terra. Eu possuo o poderoso. Ele trouxe o que fez para nós. O bastão de Ọkọ̀!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Opa Ọkọ̀, a bọ̀ wáyé o\nÓ gbé ilá sí ilẹ̀\nÓ kọ ilẹ̀ fún wa\nOpa Ọkọ̀!',
        portugues:
          'O bastão de Ọkọ̀ desceu à Terra. Ele ergueu o arado no solo. Ele cultivou a terra para nós. O bastão de Ọkọ̀!',
      },
    ],

    oracoes: [
      'Opa Ọkọ̀! Epa Ọkọ̀! Senhor da agricultura, que a terra seja fértil e que a colheita seja abundante. Protege meus campos e abençoa meu trabalho. Opa Ọkọ̀!',
    ],

    templosHistoricos: [
      'Templos agrícolas em comunidades yorùbá rurais da Nigéria',
      'Assentamentos de Ọkọ̀ em terreiros de nação Ketu no Brasil',
    ],

    influenciaCultural: [
      'Agricultura: Ọkọ̀ é o patrono espiritual dos agricultores yorùbá e de toda a tradição agrícola afro-brasileira.',
      'Festival de Colheita: Cerimônias de agradecimento pela colheita são realizadas em sua homenagem.',
      'Arte: Representações de Ọkọ̀ com arado e boi são comuns na arte yorùbá tradicional.',
    ],

    pesquisasRelacionadas: [
      'Ọkọ̀ — Orixá da agricultura yorùbá',
      'Agricultura sagrada na religião yorùbá',
      'Orixás da terra e da colheita',
      'Cultos agrícolas afro-brasileiros',
    ],

    palavrasChaveSEO: [
      'Oko',
      'Ọkọ̀',
      'Orixá da agricultura',
      'Orixás',
      'Colheita yorùbá',
      'Religião yorùbá',
      'Candomblé',
      'Fertilidade da terra',
      'Arado sagrado',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Orixá da agricultura', 'Colheita', 'Inhame sagrado', 'Arado', 'Candomblé'],
      en: ['Oko', 'Orisha of agriculture', 'Yoruba harvest deity', 'Sacred yam', 'Farming'],
      es: ['Okó', 'Orisha de la agricultura', 'Cosecha yoruba', 'Ñame sagrado', 'Agricultura'],
      yo: ['Ọkọ̀', 'Òrìṣà àgbà', 'Ìgbàgbọ́', 'Isu', 'Ìṣẹ́ agbára'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'Quem é Ọkọ̀ na religião yorùbá?',
        resposta:
          'Ọkọ̀ é o Orixá da agricultura, da colheita e da fertilidade do solo cultivado. Ele é o senhor do arado e ensinou aos humanos a arte de plantar e colher. Diferente de Oní Ilé, que governa a terra bruta, Ọkọ̀ é o senhor da terra trabalhada pelas mãos humanas.',
      },
      {
        pergunta: 'Qual a diferença entre Ọkọ̀ e Oní Ilé?',
        resposta:
          'Oní Ilé é o dono da terra ancestral e bruta, a terra em sua forma natural. Ọkọ̀ é o senhor da terra cultivada, o campo arado, a lavoura plantada. Oní Ilé representa a terra em si; Ọkọ̀ representa o trabalho humano sobre a terra.',
      },
      {
        pergunta: 'Quais são as oferendas para Ọkọ̀?',
        resposta:
          'As principais oferendas para Ọkọ̀ incluem inhame, milho, mel, pombo verde e sacrifícios de boi sagrado. A primeira colheita sempre deve ser oferecida a ele em gratidão.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
      'Johnson, Samuel. (1921). "The History of the Yorubas". Routledge & Kegan Paul.',
      'Bascom, William. (1969). "Ifa Divination". Indiana University Press.',
    ],

    pontosCantados: [
      'Opa Ọkọ̀! Epa Ọkọ̀!\nA bọ̀ wáyé lọ́run\nÓ gbé ilá sí ilẹ̀\nÓ kọ ilẹ̀ fún wa\nOpa Ọkọ̀!',
    ],

    pontosRiscados: [
      'Epa Ọkọ̀!\nIlá rẹ ti ilẹ̀ gbé\nAlágbára ni mo ní o\nOpa Ọkọ̀!',
    ],
  },

  // ─── 2. Ọkè — Orixá das Montanhas ───
  {
    id: 'orixa-oke',
    nome: 'Ọkè',
    nomeYoruba: 'Ọkè',
    nomeLucumi: 'Oke',
    nomeIngles: 'Oke',
    nomeEspanhol: 'Oke',
    variacoesRegionais: ['Ọkè Ọrun', 'Okê Alágbára', 'Okê Ayé'],
    categoria: 'Orixá',
    linha: 'Montanhas e Alturas',
    reino: 'Montanhas, Cummes Elevados, Colinas, Trovões nas Alturas',
    falange: 'Orixás / Orishas',
    saudacao: 'Oke! Epa Okê!',
    caracteristicas: ['Orixá das montanhas e cummes elevados','Guardião dos altos e protetor dos viajantes','Senhor do trovão nas montanhas','Associado à estabilidade e ao poder elevado'],
    simbolos: ['Montanha','Tambor sagrado','Pedra de cume','Bandeira branca e azul'],
    cores: ['Branco (céu e nuvens)','Azul (céu elevado)'],
    elementosNaturais: ['Montanhas','Cummes elevados','Trovoes','Ventes nas alturas'],
    diaTradicional: 'Sexta-feira',

    historiaTradicional:
      'Ọkè é o Orixá das montanhas, dos cummes elevados e das colinas. Nos mitos yorùbá, Ọkè governa todos os pontos elevados da terra, os morros, as serras e as montanhas onde o trovão ressoa com mais força e onde o céu parece mais próximo. Ele é o guardião dos altos, dos lugares elevados onde os Orixás se reúnem e de onde os trovões ecoam. Ọkè é frequentemente associado a Ọ̀rúnmìlà, pois as montanhas são locais de adivinhação e oráculo, e também a Ògún, pois os caminhos das montanhas são rotas de passagem e conquista. Ele é retratado como uma figura majestosa e estável, que veste branco e azul, as cores do céu e das nuvens que envolvem os cummes. Suas oferendas são colocadas nos pontos mais elevados, onde o vento sopra mais forte e onde os trovões são ouvidos primeiro. Na tradição yorùbá, antes de iniciar qualquer jornada importante, é costume pedir a bênção de Ọkè, pois ele protege os viajantes que cruzam terras elevadas. Os filhos de Ọkè são conhecidos por serem estáveis, confiáveis, com senso de justiça e protegidos contra as intempéries.',

    quemFoi:
      'O Orixá das montanhas, dos cummes elevados e das colinas. Guardião dos altos e protetor dos viajantes nas terras elevadas.',

    personalidade: [
      'Majestoso — sua presença impõe respeito e reverência',
      'Estável — como a própria montanha, não se move diante de tempestades',
      'Protetor — guarda os cummes e protege quem os atravessa',
      'Elevado — está acima das baixezas humanas',
      'Soberano — governa seu domínio com autoridade',
      'Paciente — como a erosão que molda as montanhas ao longo dos séculos',
      'Silencioso — fala pouco, mas quando fala, ecoa como trovão',
    ],

    biografia: {
      nascimento:
        'Um dos Ìrúnmọlẹ̀ que habita os pontos mais elevados da terra. Ọkè escolheu as montanhas como sua morada, onde o ar é puro e o céu está mais próximo.',
      feitos: [
        'Guardião dos cummes — protege todos os pontos elevados do mundo',
        'Protege viajantes que cruzam montanhas e passes perigosos',
        'Resoa com o trovão — suas vozes ecoam nas tempestades',
        'Lugar sagrado de oráculo — muitas adivinhações são feitas nos altos',
        'Protege as cidades situadas em altitudes',
      ],
      transformacao:
        'Tornou-se a encarnação viva das montanhas — sua presença é sentida em cada cume, cada colina, cada ponto elevado.',
    },

    genealogia: {
      pai: 'Ọbàtálá (em algumas tradições)',
      mae: 'Yemoo',
      irmaos: [
        'Todos os Ìrúnmọlẹ̀ são seus irmãos',
        'Frequentemente associado a Ọ̀rúnmìlà e a Ògún',
      ],
      filhos: [
        'Seus filhos espirituais são os montanhistas, guias e viajantes das alturas',
      ],
    },

    linhaDoTempoMitica: [
      'Escolha das Montanhas — Ọkè decide habitar os cummes mais elevados',
      'A Voz do Trovão — o trovão ecoa nas montanhas como sua voz',
      'O Oráculo dos Altos — Ọkè estabelece os montes como locais de adivinhação',
      'A Proteção dos Viajantes — Ọkè se torna guardião dos caminhos elevados',
    ],

    itans: [
      {
        titulo: 'Ọkè e o Trovão',
        historia:
          'Conta-se que, quando Ọkè desceu do Orun, ele escolheu habitar o ponto mais alto da terra. Quando os ventos sopravam com força e as nuvens se acumulavam sobre as montanhas, Ọkè batia em seu tambor sagrado, e o som ecoava como trovão por toda a terra. Os humanos, assombrados, corriam para debaixo das árvores. Mas Ọkè lhes ensinou que o trovão era sua voz, uma voz que anunciava chuva fertilizante e protegia contra males invisíveis. Quando ouvirem meu trovão, dizia Ọkè, saibam que estou sobre vocês, protegendo seus campos e suas casas. Assim, os humanos passaram a reverenciar as montanhas e a não temer o trovão, pois sabiam que era a voz protetora de Ọkè.',
        licao:
          'O que parece assustador pode ser uma proteção disfarçada. As forças da natureza são expressões dos Orixás.',
      },
      {
        titulo: 'O Oráculo da Montanha',
        historia:
          'Ọ̀rúnmìlà subiu a montanha mais alta para consultar os segredos de Ifá. Lá, no cume, o vento sussurrava respostas que não podiam ser ouvidas nos vales. Ọkè, senhor do lugar, abriu espaço para o Babalawo e lhe mostrou como as nuvens formavam padrões no céu que revelavam o futuro. Desde então, os montes sagrados tornaram-se locais privilegiados para a adivinhação yorùbá. Os sacerdotes sobem às montanhas em dias de lua cheia para ouvir o vento de Ọkè e receber mensagens do Orun.',
        licao:
          'A sabedoria está nos altos — é preciso elevar-se acima do mundano para ouvir as verdades profundas.',
      },
    ],

    dominios: [
      'Montanhas e Cummes Elevados',
      'Colinas e Serras',
      'Trovoes',
      'Viajantes e Caminhantes',
      'Adivinhação nos Altos',
      'Proteção Contra Intempéries',
      'Elevação Espiritual',
    ],

    correspondencias: {
      arvores: ['Pinheiro', 'Cedro', 'Árvores de altitude'],
      locaisNatureza: [
        'Montanhas',
        'Cummes elevados',
        'Colinas',
        'Passagens de montanha',
        'Vales profundos',
      ],
      metaisPedras: [
        'Pedra de montanha (granito)',
        'Obsidiana',
        'Cristal de rocha',
        'Prata',
      ],
      animais: ['Águia', 'Carneiro branco', 'Bode', 'Falcão'],
    },

    ervas: {
      liturgicas: ['Erva de montanha', 'Folha de cedro', 'Arruda'],
      medicinais: [
        'Erva-cidreira — para acalmar',
        'Camomila — para banhos de proteção',
      ],
    },

    comidas: ['Arroz branco', 'Inhame cozido', 'Mel de montanha', 'Água de nascente'],

    ewoTabus: [
      {
        tabu: 'Desrespeitar os pontos elevados',
        motivo:
          'As montanhas são a morada de Ọkè. Desrespeitar um cume sagrado pode trazer tempestades e desgraças.',
      },
      {
        tabu: 'Cortar árvores sagradas nas montanhas',
        motivo:
          'As árvores das montanhas são protegidas por Ọkè e pelos espíritos da floresta.',
      },
    ],

    qualidades: [
      {
        nome: 'Ọkè Ọrun',
        descricao:
          'A Montanha do Céu — a qualidade mais elevada e espiritual de Ọkè, ligada ao Orun.',
      },
      {
        nome: 'Ọkè Alágbára',
        descricao:
          'Ọkè Poderoso — a manifestação protetora e guerreira do Orixá das montanhas.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, Ọkè é reverenciado nos morros e colinas. Os agricultores de regiões montanhosas oferecem sacrifícios antes de subir às alturas.',
      brasil:
        'No Brasil, o culto a Ọkè é preservado em alguns terreiros de nação Ketu, especialmente em comunidades que mantêm tradições de proteção de território.',
    },

    orikis: [
      {
        yoruba:
          'Ọkè, Ọkè\nIlé ọ̀run ti mo ní o\nAlágbára ni mo ní o\nEpa Ọkè!',
        traducao:
          'Ọkè, Ọkè, A casa do céu é minha. Eu possuo o poderoso. Epa Ọkè!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Ọkè, a bọ̀ wáyé o\nÓ gbé ilé sí ọ̀run\nÓ rí ilẹ̀ ní kílọ̀rùn\nEpa Ọkè!',
        portugues:
          'Ọkè, desceu à Terra. Ele ergueu o céu. Ele viu a terra de cima. Epa Ọkè!',
      },
    ],

    oracoes: [
      'Epa Okê! Senhor das montanhas, que vossa proteção me cubra como as nuvens cobrem os cummes. Guia meus passos nos caminhos elevados e protege-me de toda intempérie. Oke!',
    ],

    templosHistoricos: [
      'Morros sagrados de Ilé-Ifẹ̀',
      'Colinas de Oyo (Nigéria)',
      'Montanhas do Noroeste da Nigéria',
    ],

    influenciaCultural: [
      'Geografia sagrada: Os pontos elevados da Nigéria yorùbá são considerados territórios sagrados de Ọkè.',
      'Proteção territorial: Comunidades em regiões montanhosas invocam Ọkè para proteção contra deslizamentos e tempestades.',
    ],

    pesquisasRelacionadas: [
      'Ọkè — Orixá das montanhas',
      'Montanhas sagradas na religião yorùbá',
      'Trovoes nos mitos yorùbá',
    ],

    palavrasChaveSEO: [
      'Oke',
      'Ọkè',
      'Orixá das montanhas',
      'Montanhas sagradas',
      'Trovoes yorùbá',
      'Religião yorùbá',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Orixá das montanhas', 'Oke', 'Trovoes', 'Cummes elevados'],
      en: ['Oke', 'Orisha of mountains', 'Thunder deity', 'Sacred peaks'],
      es: ['Oké', 'Orisha de las montañas', 'Trueno', 'Cumbres sagradas'],
      yo: ['Ọkè', 'Òrìṣà oke', 'Ìjì', 'Oke Ọrun'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'Quem é Ọkè?',
        resposta:
          'Ọkè é o Orixá das montanhas, dos cummes elevados e das colinas. Ele governa todos os pontos elevados da terra e é associado ao trovão que ecoa nos altos.',
      },
      {
        pergunta: 'Qual a relação entre Ọkè e o trovão?',
        resposta:
          'Ọkè é frequentemente associado ao trovão nas montanhas. Seu tambor sagrado, quando batido, ecoa como trovão por toda a terra. O trovão é considerado a voz de Ọkè.',
      },
      {
        pergunta: 'Onde se cultua Ọkè?',
        resposta:
          'Ọkè é cultuado nos morros, colinas e pontos elevados. Na Nigéria, os agricultores de regiões montanhosas oferecem sacrifícios antes de subir às alturas.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
      'Johnson, Samuel. (1921). "The History of the Yorubas". Routledge & Kegan Paul.',
    ],

    pontosCantados: [
      'Epa Okê!\nỌkè a bọ̀ wáyé o\nÓ gbé ilé sí ọ̀run\nÓ rí ilẹ̀ ní kílọ̀rùn\nEpa Ọkè!',
    ],

    pontosRiscados: [
      'Oke! Epa Okê!\nIlé ọ̀run ti mo ní o\nAlágbára ni mo ní o\nEpa Ọkè!',
    ],
  },

  // ─── 3. Iroko — Espírito da Árvore Sagrada ───
  {
    id: 'orixa-iroko',
    nome: 'Iroko',
    nomeYoruba: 'Ìrókò',
    nomeLucumi: 'Iroko',
    nomeIngles: 'Iroko',
    nomeEspanhol: 'Iroko',
    variacoesRegionais: ['Ìrókò Olúwo', 'Iroko Alágbára', 'Timber (na diáspora)'],
    categoria: 'Orixá',
    linha: 'Árvores e Ancestrais',
    reino: 'Árvores Sagradas, Ancestrais, Sabedoria, Casamento',
    falange: 'Orixás / Ancestrais',
    saudacao: 'Epa Iroko! Àṣẹ Iroko!',
    caracteristicas: ['Espírito da árvore sagrada Iroko (Chlorophora excelsa)','Guardião dos ancestrais e protetor dos casamentos','Um dos espíritos mais antigos da tradição yorùbá','Cortá-lo sem permissão traz loucura e desgraça'],
    simbolos: ['Árvore Iroko','Tronco sagrado','Raízes ancestrais','Folhas verdes'],
    cores: ['Marrom (tronco)','Verde (folhas)'],
    elementosNaturais: ['Árvore Iroko','Florestas densas','Solo ancestral','Raízes profundas'],
    diaTradicional: 'Quarta-feira',

    historiaTradicional:
      'Iroko é o espírito da árvore sagrada Ìrókò, Chlorophora excelsa, uma das árvores mais reverenciadas da África Ocidental. Diferente de outros Orixás que são personalidades independentes, Iroko é a própria manifestação espiritual da árvore, um espírito ancestral que habita o tronco, as raízes e as folhas desta árvore majestosa. Na mitologia yorùbá, Iroko é considerado um dos espíritos mais antigos e poderosos. Ele é ligado aos ancestrais, pois acredita-se que os espíritos dos antepassados habitam entre suas raízes e galhos. Cortar uma árvore de Iroko sem a devida permissão e ritual é um dos atos mais perigosos que um ser humano pode cometer, pois traz loucura, doença e desgraça sobre o trespassador e sua família inteira. Iroko é também o espírito do casamento e da união, pois sua madeira é usada para construir caixilhos sagrados e móveis que protegem as casas. Sua madeira é extremamente valiosa e resistente, comparada ao mogno africano. Na tradição yorùbá, os casais que desejam uma união duradoura oferecem sacrifícios a Iroko antes do casamento.',

    quemFoi:
      'O Espírito da árvore sagrada Iroko (Chlorophora excelsa). Guardião dos ancestrais e protetor dos casamentos. Um dos espíritos mais antigos e temidos da tradição yorùbá.',

    personalidade: [
      'Ancião — um dos espíritos mais antigos que existem',
      'Sábio — possui conhecimentos que datam da criação do mundo',
      'Misterioso — seus caminhos são obscuros e profundos',
      'Poderoso — capaz de causar loucura e desgraça aos desobedientes',
      'Protetor — guarda os ancestrais e as famílias',
      'Pacífico quando respeitado, terrível quando ofendido',
      'Generoso com quem o busca com sinceridade',
    ],

    biografia: {
      nascimento:
        'Iroko manifestou-se quando a primeira árvore de sua espécie brotou da terra sagrada, com raízes que se entranhavam no mundo dos ancestrais.',
      feitos: [
        'Hospeda os espíritos dos ancestrais em suas raízes e galhos',
        'Protege os casamentos e as uniões sagradas',
        'Sua madeira é usada em construção sagrada e proteção de casas',
        'Pode causar loucura e desgraça aos desobedientes',
        'Fonte de sabedoria ancestral para os sacerdotes',
      ],
      transformacao:
        'De uma simples árvore a um dos espíritos mais reverenciados da cosmologia yorùbá.',
    },

    genealogia: {
      pai: 'Olódùmarè (manifestação natural)',
      irmaos: [
        'Todos os espíritos de árvores sagradas são seus companheiros',
        'Igbo (Outra árvore sagrada yorùbá)',
      ],
    },

    linhaDoTempoMitica: [
      'O Nascimento da Primeira Árvore — Iroko brota da terra sagrada',
      'A Habitação dos Ancestrais — os espíritos ancestrais escolhem Iroko como morada',
      'O Tabu do Corte — Iroko estabelece que ninguém deve cortá-lo sem permissão',
      'O Casamento Sagrado — Iroko se torna o protetor das uniões',
    ],

    itans: [
      {
        titulo: 'O Homem que Cortou o Iroko',
        historia:
          'Conta-se que um jovem yorùbá, ávido por fazer uma cama para sua noiva, decidiu cortar uma árvore de Iroko na floresta. Os anciãos da aldeia o advertiram: Não toques no Iroko sem oferecer sacrifícios e pedir permissão aos ancestrais. O jovem, arrogante e descrente, ignorou o aviso e cortou a árvore com seu machado. No retorno para casa, começou a ouvir vozes que ninguém mais ouvia. Viu sombras que não tinham corpo. Em poucos dias, enlouqueceu completamente. Sua família, desesperada, buscou um Babalawo, que revelou que o espírito de Iroko estava furioso. Para curá-lo, o jovem teve que retornar ao local da árvore cortada, oferecer sacrifícios generosos, pedir perdão aos ancestrais e plantar três novas árvores de Iroko em expiação. Somente depois de sete anos de penitência é que a loucura o deixou.',
        licao:
          'A natureza possui espíritos que exigem respeito. Desrespeitar as árvores sagradas é desrespeitar os ancestrais que nelas habitam.',
      },
      {
        titulo: 'Iroko e o Casamento',
        historia:
          'Um casal de jovens yorùbá queria se casar, mas seus pais eram rivais e se opunham à união. Desesperados, os jovens foram até uma árvore de Iroko e imploraram ao espírito que os ajudasse. Iroko, comovido com seu amor, soprou seus galhos e criou uma brisa que acalmou os corações dos pais. Na manhã seguinte, os pais acordaram com sentimentos de paz e aceitaram o casamento. Desde então, Iroko é invocado como protetor dos casamentos e das uniões amorosas. Os sacerdotes de Iroko são chamados para abençoar casamentos, especialmente quando há conflitos familiares.',
        licao:
          'O amor verdadeiro, quando buscado com sinceridade, encontra apoio nos mundos espirituais.',
      },
    ],

    dominios: [
      'Árvores Sagradas',
      'Ancestrais e Espíritos Ancestrais',
      'Sabedoria Antiga',
      'Casamento e Uniões',
      'Madeira e Construção Sagrada',
      'Proteção de Casas',
      'Cura e Loucura',
    ],

    correspondencias: {
      arvores: [
        'Iroko (Chlorophora excelsa) — sua árvore sagrada',
        'Cedro',
        'Imburana',
      ],
      locaisNatureza: [
        'Florestas densas',
        'Locais onde crescem árvores Iroko',
        'Sítios ancestrais',
      ],
      metaisPedras: ['Pedra de rios', 'Cristal de rocha'],
      animais: ['Bode', 'Pombo', 'Coruja (símbolo de sabedoria)'],
    },

    ervas: {
      liturgicas: [
        'Folha de Iroko',
        'Folha de cedro',
        'Folha de imburana',
      ],
      medicinais: [
        'Casca de Iroko — usada em defumações ancestrais',
        'Erva-cidreira — para acalmar espíritos',
      ],
    },

    comidas: ['Inhame', 'Mel', 'Leite de coco', 'Frutas da floresta'],

    ewoTabus: [
      {
        tabu: 'Cortar uma árvore de Iroko sem permissão ritual',
        motivo:
          'A árvore de Iroko abriga os espíritos dos ancestrais. Cortá-la sem rituais é uma ofensa grave que pode causar loucura e desgraça.',
      },
      {
        tabu: 'Usar madeira de Iroko sem oferecimentos',
        motivo: 'A madeira de Iroko é sagrada. Utilizá-la requer oferendas aos ancestrais.',
      },
    ],

    qualidades: [
      {
        nome: 'Iroko Alágbára',
        descricao:
          'Iroko Poderoso — a manifestação mais temida e respeitada do espírito da árvore.',
      },
      {
        nome: 'Ìrókò Olúwo',
        descricao:
          'Iroko Senhor — a qualidade de liderança e sabedoria do espírito da árvore.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, as árvores de Iroko são tratadas com extremo respeito. Sacrifícios são oferecidos antes de qualquer utilização de sua madeira.',
      brasil:
        'No Brasil, o culto a Iroko está presente em alguns terreiros, especialmente nos que praticam a cura espiritual e a consulta aos ancestrais.',
    },

    orikis: [
      {
        yoruba:
          'Ìrókò, Ìrókò\nÀgbà tí ó ní ìmọ̀ràn\nA fi ọwọ́ bọ̀ wáyé\nÀṣẹ Iroko!',
        traducao:
          'Iroko, Iroko, O ancião que possui conselho. Ele veio à Terra com as mãos. Àṣẹ Iroko!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Iroko, a jòkòó o\nÓ jòkòó nínú ilé\nÓ fi ọwọ́ rán sí wa\nEpa Iroko!',
        portugues:
          'Iroko, sentou-se. Ele sentou-se dentro de casa. Ele foi enviado para nós com suas mãos. Epa Iroko!',
      },
    ],

    oracoes: [
      'Epa Iroko! Àṣẹ Iroko! Espírito da árvore sagrada, ancião sábio, protetor dos ancestrais e dos casamentos, eu vos invoco com respeito. Que vossa sabedoria ancestral me guie e que vossa proteção me cubra. Epa Iroko!',
    ],

    templosHistoricos: [
      'Florestas sagradas de Iroko na Nigéria yorùbá',
      'Locais ancestrais onde árvores centenárias de Iroko são veneradas',
    ],

    influenciaCultural: [
      'Madeiraria sagrada: A madeira de Iroko é usada em construção sagrada em toda a África Ocidental.',
      'Tradição oral: Dezenas de itans sobre Iroko são transmitidos oralmente.',
      'Proteção ambiental: O respeito pelas árvores de Iroko contribuiu para a preservação florestal na Nigéria.',
    ],

    pesquisasRelacionadas: [
      'Iroko — Espírito da árvore sagrada',
      'Chlorophora excelsa na cultura yorùbá',
      'Árvores sagradas e ancestrais',
      'Proteção de árvores na tradição africana',
    ],

    palavrasChaveSEO: [
      'Iroko',
      'Árvore sagrada',
      'Espírito da árvore',
      'Ancestrais yorùbá',
      'Religião yorùbá',
      'Madeira sagrada',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Iroko', 'Árvore sagrada', 'Ancestrais', 'Espírito da árvore'],
      en: ['Iroko', 'Sacred tree', 'Ancestral spirits', 'Chlorophora excelsa'],
      es: ['Iroko', 'Árbol sagrado', 'Espíritus ancestrales', 'Chlorophora excelsa'],
      yo: ['Ìrókò', 'Igi ìmọ̀ràn', 'Àwọn àgbà', 'Ori ọmọ'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'O que acontece se cortar uma árvore de Iroko?',
        resposta:
          'De acordo com a tradição yorùbá, cortar uma árvore de Iroko sem oferecer os devidos sacrifícios e pedir permissão aos ancestrais pode trazer loucura, doença e desgraça sobre o trespassador e sua família. A árvore abriga espíritos ancestrais que devem ser respeitados.',
      },
      {
        pergunta: 'Iroko é um Orixá?',
        resposta:
          'Iroko é frequentemente classificado como um Orixá, embora seja mais precisamente um espírito da natureza, a manifestação espiritual da árvore sagrada Chlorophora excelsa. Ele é reverenciado com o mesmo respeito que os Orixás.',
      },
      {
        pergunta: 'Qual a relação entre Iroko e o casamento?',
        resposta:
          'Iroko é o protetor dos casamentos e das uniões sagradas. Casais que desejam uma união duradoura oferecem sacrifícios a Iroko antes do casamento, e sacerdotes de Iroko são chamados para abençoar cerimônias.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
      'Bascom, William. (1969). "Ifa Divination". Indiana University Press.',
    ],

    pontosCantados: [
      'Epa Iroko!\nIroko a jòkòó o\nÓ jòkòó nínú ilé\nÓ fi ọwọ́ rán sí wa\nÀṣẹ Iroko!',
    ],

    pontosRiscados: [
      'Àṣẹ Iroko!\nÀgbà tí ó ní ìmọ̀ràn\nA fi ọwọ́ bọ̀ wáyé\nEpa Iroko!',
    ],
  },

  // ─── 4. Ìbejì — Divindade dos Gêmeos ───
  {
    id: 'orixa-ibeji',
    nome: 'Ìbejì',
    nomeYoruba: 'Ìbejì',
    nomeLucumi: 'Ibeji',
    nomeIngles: 'Ibeji',
    nomeEspanhol: 'Ibeji',
    variacoesRegionais: ['Ìbejì Alágbára', 'Ibeji Ayé', 'Naná (em algumas tradições)'],
    categoria: 'Orixá',
    linha: 'Gêmeos e Dualidade',
    reino: 'Gêmeos, Dualidade, Equilíbrio, Sorte, Alegria',
    falange: 'Orixás / Orishas',
    saudacao: 'Epa Ibeji! Àṣẹ Ibeji!',
    caracteristicas: ['Divindade dos gêmeos na tradição yorùbá','Representação da dualidade e do equilíbrio','A ere ìbejì preserva a alma do gêmeo falecido','Gêmeos são especialmente sagrados na cultura yorùbá'],
    simbolos: ['Ere ìbejì (estátua de gêmeos)','Búzios duplos','Figuras gêmeas'],
    cores: ['Azul (céu)','Vermelho (vida)','Branco (pureza)'],
    elementosNaturais: ['Búzios','Água','Duas árvores gêmeas'],
    diaTradicional: 'Quarta-feira',

    historiaTradicional:
      'Ìbejì é a divindade dos gêmeos na tradição yorùbá. Os gêmeos, ìbejì, são considerados seres especialmente sagrados, pois carregam em si a dualidade fundamental da existência, vida e morte, luz e escuridão, masculino e feminino. Na cosmologia yorùbá, os gêmeos são filhos diretos dos Orixás, e sua chegada ao mundo é vista como uma bênção divina. Em muitos itans, Ìbejì é descrito como filho de Xangô e Ọya, ou, em algumas tradições, de Oxum. Quando um gêmeo morre, a família deve esculpir uma estátua de madeira chamada ere ìbejì para o gêmeo falecido, pois acredita-se que sua alma continua viva e precisa de um corpo para habitar. Se a estátua for bem cuidada, banhada, vestida, alimentada, o gêmeo sobrevivente terá sorte e proteção. Se for negligenciada, tragédias podem ocorrer. Na tradição yorùbá, os gêmeos gozam de status elevado e são tratados com honra e reverência, e suas festas são grandiosas. Eles representam a crença de que a vida possui duas faces, e que ambas devem ser honradas igualmente.',

    quemFoi:
      'A Divindade dos Gêmeos — representação da dualidade, do equilíbrio e da sorte na cultura yorùbá. Filhos sagrados dos Orixás, especialmente honrados na tradição.',

    personalidade: [
      'Alegres — trazem alegria a todos ao redor',
      'Travessos — são conhecidos por suas escapadelas',
      'Inseparáveis — um sempre reflete o outro',
      'Sortudos — trazem sorte e prosperidade',
      'Dinâmicos — sua energia é contagiante',
      'Protetores — cuidam um do outro e de sua família',
      'Representam a dualidade — vida e morte, luz e sombra',
    ],

    biografia: {
      nascimento:
        'Gêmeos são recebidos como bênçãos especiais de Olódùmarè. Seu nascimento é celebrado com rituais específicos que garantem a proteção de ambos.',
      feitos: [
        'Representam a dualidade fundamental da existência',
        'Trazem sorte e prosperidade para suas famílias',
        'Ensinam que a vida possui duas faces que devem ser honradas',
        'Protegem seus sobreviventes através das ere ìbejì',
        'Celebram a alegria e a irreverência da vida',
      ],
      transformacao:
        'Mesmo quando um dos gêmeos morre, sua alma continua viva na estátua, mantendo o equilíbrio da dualidade.',
    },

    genealogia: {
      pai: 'Xangô (em muitos itans)',
      mae: 'Ọya (em muitas tradições) ou Òṣun (em outras)',
      irmaos: [
        'Outros gêmeos espirituais',
        'Todos os Orixás são seus tios e tias',
      ],
    },

    linhaDoTempoMitica: [
      'O Nascimento Sagrado — Ìbejì chega ao mundo como bênção divina',
      'A Ere ìbejì — quando um gêmeo morre, a estátua de madeira preserva sua alma',
      'A Proteção dos Sobreviventes — o gêmeo sobrevivente é protegido',
      'A Celebração da Dualidade — Ìbejì se torna símbolo do equilíbrio universal',
    ],

    itans: [
      {
        titulo: 'A Ere ìbejì — A Estátua do Gêmeo Falecido',
        historia:
          'Conta-se que, em uma aldeia yorùbá, dois gêmeos nasceram, um menino e uma menina. A mãe os amava igualmente, mas quando a menina morreu ainda bebê, a família ficou devastada. O Babalawo da aldeia ordenou que esculpissem uma estátua de madeira representando a menina morta, chamada ere ìbejì. A mãe passou a banhar, vestir e alimentar a estátua como se ela fosse viva. Com o tempo, o gêmeo sobrevivente cresceu forte e saudável, e a família prosperou. Quando a mãe parou de cuidar da estátua por negligência, o gêmeo sobrevivente adoeceu gravemente. A família então retomou os cuidados com a ere ìbejì, e o menino se curou. Desde então, a tradição da ere ìbejì tornou-se sagrada e obrigatória em toda a cultura yorùbá.',
        licao:
          'A morte de um gêmeo não é o fim — a alma continua viva e precisa de cuidado. Honrar os dois lados da dualidade é essencial.',
      },
      {
        titulo: 'Ìbejì e Xangô',
        historia:
          'Xangô, o poderoso Orixá do trovão e da justiça, teve gêmeos com Ọya. Quando os dois nasceram, Xangô ficou orgulhoso e declarou que seus filhos seriam os mais fortes de todos os gêmeos. No entanto, os gêmeos, ainda bebês, brincaram com o machado de Xangô e quase destruíram o trono do pai. Xangô, furioso no início, riu e reconheceu que seus filhos herdavam sua energia indomável. Ele os abençoou e declarou que todo gêmeo nascido no mundo seria protegido por ele e por Ọya.',
        licao:
          'A energia dos gêmeos é poderosa e deve ser canalizada com sabedoria. Mesmo os Orixás mais poderosos aprendem com a irreverência da infância.',
      },
    ],

    dominios: [
      'Gêmeos',
      'Dualidade',
      'Equilíbrio',
      'Sorte e Prosperidade',
      'Alegria',
      'Estátuas Ancestrais (ere ìbejì)',
      'Infância Sagrada',
    ],

    correspondencias: {
      arvores: ['Árvore de Iroko', 'Bananeira'],
      locaisNatureza: ['Aldeias yorùbá', 'Casas de gêmeos', 'Locais de festas'],
      metaisPedras: ['Latão', 'Cobre', 'Pedra de rios'],
      animais: ['Bode duplo', 'Galo', 'Pombo'],
    },

    ervas: {
      liturgicas: ['Folha de bananeira', 'Erva-doce', 'Saião'],
      medicinais: [
        'Erva-cidreira — para proteção infantil',
        'Folha de limão — para banhos de proteção',
      ],
    },

    comidas: ['Mel', 'Inhame', 'Amendoim', 'Frutas doces', 'Canjica'],

    ewoTabus: [
      {
        tabu: 'Negligenciar a ere ìbejì',
        motivo:
          'Se a estátua do gêmeo falecido não for cuidada, o gêmeo sobrevivente pode adoecer ou morrer.',
      },
      {
        tabu: 'Discriminar gêmeos',
        motivo:
          'Gêmeos são sagrados e devem ser tratados com igualdade e honra.',
      },
    ],

    qualidades: [
      {
        nome: 'Ìbejì Alágbára',
        descricao:
          'Ìbejì Poderoso — a manifestação mais intensa e protetora da divindade dos gêmeos.',
      },
      {
        nome: 'Naná Burukú',
        descricao:
          'Qualidade ligada à velhice e à sabedoria dos gêmeos em algumas tradições.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, os gêmeos são tratados com reverência. Quando um morre, uma estátua (ere ìbejì) é esculpida e cuidada como se fosse viva.',
      brasil:
        'No Brasil, Ìbejì é homenageado em festas de gêmeos e em terreiros que preservam a tradição da ere ìbejì.',
      cuba:
        'Em Cuba, Ibeji é sincretizado com Santos Niños de Atocha e La Caridad del Cobre.',
    },

    orikis: [
      {
        yoruba:
          'Ìbejì, Ìbejì\nOmo tí a fi aṣẹ rán sí Ayyè\nGbogbo rẹ̀ ni ń bọ̀ wáyé\nEpa Ìbejì!',
        traducao:
          'Ìbejì, Ìbejì, Filhos que foram enviados à Terra com o poder. Todos vêm à Terra. Epa Ìbejì!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Ìbejì, ìbejì\nOmo Xangô, a bọ̀ wáyé\nGbogbo rẹ̀ a bọ̀ wáyé\nEpa Ìbejì!',
        portugues:
          'Ìbejì, ìbejì, Filhos de Xangô, desceram à Terra. Todos desceram à Terra. Epa Ìbejì!',
      },
    ],

    oracoes: [
      'Epa Ibeji! Divindade dos gêmeos, que a alegria e a sorte reinem em minha casa. Protege os gêmeos do mundo e mantenha o equilíbrio em minha vida. Àṣẹ Ibeji!',
    ],

    templosHistoricos: [
      'Casas de gêmeos na Nigéria yorùbá — onde as ere ìbejì são mantidas',
      'Festivais de gêmeos em Ilé-Ifẹ̀',
    ],

    influenciaCultural: [
      'Escultura: As ere ìbejì são uma das formas de arte mais significativas da cultura yorùbá, com estátua duplas que retratam gêmeos.',
      'Cultura popular: Em muitas partes da Nigéria, gêmeos ainda são tratados com reverência especial.',
      'Arte afro-brasileira: Representações de Ibeji influenciaram a arte sacra brasileira.',
    ],

    pesquisasRelacionadas: [
      'Ìbejì — Divindade dos gêmeos',
      'Ere ìbejì — Esculturas de gêmeos',
      'Gêmeos na cultura yorùbá',
      'Dualidade e equilíbrio na religião yorùbá',
    ],

    palavrasChaveSEO: [
      'Ibeji',
      'Ìbejì',
      'Gêmeos yorùbá',
      'Ere ìbejì',
      'Orixá dos gêmeos',
      'Religião yorùbá',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Ibeji', 'Gêmeos yorùbá', 'Ere ìbejì', 'Esculturas de gêmeos'],
      en: ['Ibeji', 'Yoruba twins', 'Ere ibeji', 'Twin sculptures'],
      es: ['Ibeji', 'Gemelos yorubas', 'Ere ibeji', 'Esculturas de gemelos'],
      yo: ['Ìbejì', 'Ìbejì méjì', 'Ere ìbejì', 'Àwọn ọmọ méjì'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'O que é a ere ìbejì?',
        resposta:
          'A ere ìbejì é uma estátua de madeira esculpida para honrar um gêmeo que morreu. Acredita-se que a alma do gêmeo morto habita a estátua, que deve ser banhada, vestida e alimentada como se fosse viva.',
      },
      {
        pergunta: 'Por que os gêmeos são sagrados na cultura yorùbá?',
        resposta:
          'Os gêmeos representam a dualidade fundamental da existência, vida e morte, luz e sombra, masculino e feminino. Seu nascimento é visto como uma bênção divina e uma demonstração do poder da criação.',
      },
      {
        pergunta: 'Quem são os pais dos gêmeos?',
        resposta:
          'Em muitos itans, Ìbejì é filho de Xangô e Ọya. Em algumas tradições, os pais são Oxum ou outros Orixás. A linhagem varia conforme a região e a tradição.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Drewal, Henry John & Drewal, Margaret Thompson. (1983). "Gelede: Art and Female Power among the Yoruba". Indiana University Press.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
    ],

    pontosCantados: [
      'Epa Ibeji!\nÌbejì a bọ̀ wáyé\nOmo Xangô, a bọ̀ wáyé\nGbogbo rẹ̀ ni ń bọ̀ wáyé\nÀṣẹ Ibeji!',
    ],

    pontosRiscados: [
      'Epa Ìbejì!\nOmo tí a fi aṣẹ rán sí Ayyè\nGbogbo rẹ̀ ni ń bọ̀ wáyé\nEpa Ìbejì!',
    ],
  },

  // ─── 5. Orí — Divindade da Consciência e Destino Pessoal ───
  {
    id: 'orixa-ori',
    nome: 'Orí',
    nomeYoruba: 'Orí',
    nomeLucumi: 'Orí',
    nomeIngles: 'Ori',
    nomeEspanhol: 'Orí',
    variacoesRegionais: ['Orí Inú', 'Orí Ọrun', 'Ori Alágbára'],
    categoria: 'Orixá',
    linha: 'Destino e Consciência',
    reino: 'Cabeça, Destino Pessoal, Consciência, Ìwà (Caráter)',
    falange: 'Orixás / Consciência',
    saudacao: 'Ori! Epa Ori!',
    caracteristicas: ['A divindade interior — o destino pessoal dentro de cada pessoa','Mais importante que qualquer Orixá externo','Habita na cabeça (cabeça é o local mais sagrado)','Alimentado pelo ritual de bori'],
    simbolos: ['Cabeça (orí)','Quartzo branco','Algodão branco','Côco'],
    cores: ['Branco (pureza)','Amarelo (luz interna)'],
    elementosNaturais: ['Quartzo branco','Côco','Água de coco','Algodão'],
    diaTradicional: 'Todos os dias',

    historiaTradicional:
      'Orí é a divindade da consciência e do destino pessoal na tradição yorùbá. A palavra orí significa literalmente cabeça, mas seu significado espiritual vai muito além da anatomia. Orí é a divindade interior que habita dentro de cada ser humano, mais importante que qualquer Orixá externo. Na cosmologia yorùbá, antes de nascer no mundo, cada alma escolhe seu Orí, seu destino, no Orun (céu). Esse destino é selado e trazido para o Aiyê (terra) dentro da cabeça. Por isso, a cabeça é o local mais sagrado do corpo, pois ela contém o contrato espiritual que determinará a vida da pessoa. Orí é mais íntimo e pessoal que qualquer outro Orixá. Enquanto Xangô, Ọbàtálá ou Ògún são divindades externas, Orí é a própria essência divina dentro de cada um. Bori, alimentar o Orí, é o ritual mais fundamental da religião yorùbá, pois sem o consentimento e a bênção do próprio Orí, nenhum outro Orixá pode ajudar. Um Orí forte supera qualquer Orixá fraco; um Orí fraco anula qualquer bênção externa. A lição central de Orí é que o caráter, ìwà, define o destino.',

    quemFoi:
      'A Divindade Interior — o destino pessoal, a consciência e a essência divina que habita dentro de cada ser humano. Mais importante que qualquer Orixá externo.',

    personalidade: [
      'Íntimo — habita dentro de cada pessoa',
      'Pessoal — cada Orí é único e irrepetível',
      'Justo — cumpre o contrato espiritual que a alma escolheu',
      'Demandador — exige boas ações e caráter puro',
      'Silencioso — fala através de sentimentos e intuições',
      'Poderoso — pode superar qualquer Orixá externo',
      'Leal — acompanha a pessoa desde o nascimento até a morte',
      'Protetor — guarda o destino mais profundo',
    ],

    biografia: {
      nascimento:
        'Orí é eterno — ele existe antes do nascimento, é escolhido no Orun, e acompanha a pessoa durante toda sua vida terrena.',
      feitos: [
        'Contém o destino escolhido pela alma antes do nascimento',
        'É alimentado por sacrifícios (bori) para fortalecer o destino',
        'Pode ser consultado através da adivinhação',
        'Supera qualquer Orixá quando é forte',
        'É o local mais sagrado do corpo humano',
        'Ensina que o caráter (ìwà) define o destino',
      ],
      transformacao:
        'De uma parte anatômica a uma divindade que é o centro de toda a espiritualidade yorùbá.',
    },

    genealogia: {
      pai: 'Olódùmarè (a escolha do Orí é feita diante dele)',
      irmaos: [
        'Todos os Orí são irmãos no Orun antes do nascimento',
        'Os Orixás são "menos" que Orí — ele é anterior e superior',
      ],
    },

    linhaDoTempoMitica: [
      'A Escolha no Orun — cada alma escolhe seu Orí antes de nascer',
      'O Selo do Destino — Orí é selado e trazido para o Aiyê',
      'O Ritual de Bori — os humanos aprendem a alimentar seu Orí',
      'A Lição do Caráter — Orí ensina que ìwà é mais importante que qualquer Orixá',
    ],

    itans: [
      {
        titulo: 'A Escolha do Orí',
        historia:
          'Conta-se que, antes de nascer, cada alma se apresenta diante de Olódùmarè no Orun. Lá, é-lhe apresentada uma mesa com muitos potes de barro, cada um contendo um destino diferente: um pote continha riqueza, outro pobreza, outro saúde, outro doença, outro amor, outro solidão. A alma deve escolher um pote sem saber o que há dentro, pois ninguém conhece seu destino antes de viver. Essa escolha é o Orí, o contrato espiritual que a pessoa carregará consigo para o mundo. Um Babalawo, ao consultar Ifá, pode revelar o que foi escolhido e ensinar como fortalecer o Orí escolhido. A lição é profunda: ninguém pode reclamar de seu destino, pois ele foi escolhido por si mesmo.',
        licao:
          'Cada pessoa é responsável por seu destino. O que chamamos de sorte ou azar são escolhas que fizemos antes de nascer.',
      },
      {
        titulo: 'O Orí que Superou Xangô',
        historia:
          'Conta-se que um homem pobre, que não tinha iniciação em nenhum Orixá, vivia feliz e próspero porque tinha um Orí forte. Um dia, o homem ofendeu acidentalmente Xangô ao pisar em uma de suas pedras sagradas. Xangô, furioso, enviou trovões para destruí-lo. Mas o homem, ao sentir os trovões, simplesmente tocou sua cabeça, seu Orí, e disse: Orí mi, protege-me. O trovão desviou-se e caiu em um campo vazio. Xangô, espantado, consultou Ifá e recebeu que o Orí daquele homem era mais forte que seu próprio poder. Xangô então pediu desculpas ao homem e o abençoou. A história ensina que um Orí forte, cultivado com boas ações e bom caráter, pode superar qualquer força externa.',
        licao:
          'O Orí é a divindade mais poderosa que existe. Um bom Orí supera qualquer Orixá, qualquer feitiço, qualquer infortúnio.',
      },
      {
        titulo: 'O Ritual de Bori',
        historia:
          'Um sacerdote yorùbá observou que seus filhos espirituais estavam passando por dificuldades, apesar de suas iniciações em vários Orixás. Ele consultou Ifá e recebeu que seus filhos não haviam alimentado seu Orí. O sacerdote então ensinou o ritual de bori: oferendas de quartzo branco, côco, mel e amendoim diretamente sobre a cabeça, envoltos em algodão branco. Quando os filhos espirituais realizaram o bori, suas vidas mudaram radicalmente. Os problemas desapareceram, as oportunidades surgiram, e eles compreenderam que o Orí é a raiz de tudo.',
        licao:
          'Alimentar o Orí é o ritual mais básico e mais importante da religião yorùbá. Sem um Orí forte, nenhuma iniciação funciona.',
      },
    ],

    dominios: [
      'Destino Pessoal',
      'Consciência',
      'Caráter (Ìwà)',
      'Cabeça e Mente',
      'Intuição',
      'Escolhas de Vida',
      'Contrato Espiritual',
      'Sabedoria Interior',
    ],

    correspondencias: {
      arvores: ['Árvore de Orí (Iroko)', 'Cedro'],
      locaisNatureza: [
        'Dentro de cada pessoa',
        'Locais de consultas espirituais',
        'O Orun (céu)',
      ],
      metaisPedras: ['Quartzo branco', 'Pedra de rios', 'Ouro'],
      animais: ['Pombo branca', 'Carneiro branco'],
    },

    ervas: {
      liturgicas: ['Algodão branco', 'Folha de Iroko', 'Erva-doce'],
      medicinais: [
        'Óleo de dendê — para bori',
        'Mel — para fortalecimento espiritual',
      ],
    },

    comidas: ['Côco', 'Mel', 'Amendoim', 'Quartzo branco (simbólico)', 'Amêndoas'],

    ewoTabus: [
      {
        tabu: 'Agir com mau caráter (ìwà búburú)',
        motivo:
          'O mau caráter enfraquece o Orí. Uma pessoa de má índole terá um Orí fraco, independente de quantos Orixás inicie.',
      },
      {
        tabu: 'Ignorar o próprio destino',
        motivo:
          'O Orí foi escolhido antes do nascimento. Ignorar ou lutar contra ele traz sofrimento desnecessário.',
      },
      {
        tabu: 'Não realizar o bori',
        motivo:
          'O Orí precisa ser alimentado regularmente. Sem sacrifícios, o destino não se manifesta plenamente.',
      },
    ],

    qualidades: [
      {
        nome: 'Orí Inú',
        descricao: 'O Ori Interior — a qualidade mais profunda e espiritual do destino pessoal.',
      },
      {
        nome: 'Orí Ọrun',
        descricao:
          'O Ori Celeste — a qualidade ligada à escolha feita antes do nascimento.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, o culto a Orí é o mais fundamental. O ritual de bori (alimentação do Orí) é realizado antes de qualquer outro.',
      brasil:
        'No Brasil, o culto a Orí é mantido em terreiros que preservam as tradições mais antigas. O bori é realizado regularmente.',
      cuba:
        'Em Cuba, Orí é reverenciado como el Orí (la Cabeza), e o ritual de bori é uma das práticas mais comuns na Santería.',
    },

    orikis: [
      {
        yoruba:
          `Orí mi, Orí mi\nOmo tí a fi aṣẹ rán sí Ayyè\nOrí mi l'ọ̀run lè dènà ohunkóhun\nEpa Orí!`,
        traducao:
          'Meu Orí, meu Orí, Filho que foi enviado à Terra com o poder. Meu Orí no céu pode impedir qualquer coisa. Epa Orí!',
      },
    ],

    cantigas: [
      {
        yoruba:
          `Orí mi, a bọ̀ wáyé o\nÓ gbé àṣẹ rán sí wa\nÓ kọ wa l'ọ̀run\nEpa Orí!`,
        portugues:
          'Meu Orí, desceu à Terra. Ele trouxe o poder para nós. Ele nos ensinou no céu. Epa Orí!',
      },
    ],

    oracoes: [
      'Orí mi! Minha cabeça sagrada, sede do meu destino, eu vos honro e alimento. Que vossa luz guie meus passos e que vossa força sustente meu caminho. Bori mi, Orí mi!',
    ],

    templosHistoricos: [
      'Casa de Orí — locais onde o bori é realizado na Nigéria',
      'Consultas de Orí em Ilé-Ifẹ̀',
    ],

    influenciaCultural: [
      'Filosofia: O conceito de Orí influenciou profundamente a filosofia yorùbá sobre destino e responsabilidade pessoal.',
      'Psicologia: Orí pode ser comparado ao conceito moderno de inconsciente e intuição.',
      'Espiritualidade: O bori é uma das práticas espirituais mais antigas e preservadas da África.',
    ],

    pesquisasRelacionadas: [
      'Orí — O destino pessoal na religião yorùbá',
      'Ritual de bori — Alimentação do Orí',
      'Ìwà (caráter) e destino na filosofia yorùbá',
      'A cabeça como sede da consciência',
    ],

    palavrasChaveSEO: [
      'Ori',
      'Orí',
      'Destino pessoal',
      'Bori',
      'Cabeça sagrada',
      'Ìwà',
      'Religião yorùbá',
      'Consciência',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Ori', 'Destino pessoal', 'Bori', 'Cabeça sagrada', 'Caráter'],
      en: ['Ori', 'Personal destiny', 'Bori', 'Sacred head', 'Character'],
      es: ['Orí', 'Destino personal', 'Bori', 'Cabeza sagrada', 'Carácter'],
      yo: ['Orí', 'Destino personal', 'Bori', 'Orí ayé', 'Ìwà pẹ̀lẹ̀'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'O que é Orí na religião yorùbá?',
        resposta:
          'Orí é literalmente a cabeça, mas espiritualmente é o destino pessoal e a consciência que habita dentro de cada pessoa. É a divindade mais importante e íntima — mais poderosa que qualquer Orixá externo.',
      },
      {
        pergunta: 'Por que Orí é mais importante que os Orixás?',
        resposta:
          'Porque Orí é escolhido pela própria alma antes do nascimento. Um Orí forte pode superar qualquer Orixá fraco. Sem o consentimento de seu próprio Orí, nenhuma iniciação ou Orixá externo pode ajudar.',
      },
      {
        pergunta: 'O que é o ritual de bori?',
        resposta:
          'Bori é o ritual de alimentação do Orí. Consiste em oferecer quartzo branco, côco, mel e amendoim sobre a cabeça, envoltos em algodão branco. É o ritual mais básico e mais importante da religião yorùbá.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
      'Abimbola, Wande. (1976). "Ifa: An Exposition of the Literary Corpus". Oxford University Press.',
    ],

    pontosCantados: [
      `Ori mi, Ori mi!\nA bọ̀ wáyé lọ́run\nÓ gbé àṣẹ rán sí wa\nÓ kọ wa l'ọ̀run\nEpa Orí!`,
    ],

    pontosRiscados: [
      `Epa Orí!\nOmo tí a fi aṣẹ rán sí Ayyè\nOrí mi l'ọ̀run\nEpa Orí!`,
    ],
  },

  // ─── 6. Àjẹ́ — Divindade da Prosperidade ───
  {
    id: 'orixa-aje',
    nome: 'Àjẹ́',
    nomeYoruba: 'Àjẹ́',
    nomeLucumi: 'Aché',
    nomeIngles: 'Aje',
    nomeEspanhol: 'Aché',
    variacoesRegionais: ['Àjẹ́ Alágbára', 'Ajé Ayé', 'Ìyá Mi Ajé'],
    categoria: 'Orixá',
    linha: 'Prosperidade e Comércio',
    reino: 'Riqueza, Comércio, Abundância Feminina, Cowrie',
    falange: 'Orixás / Orishas',
    saudacao: 'Opa Ajé! Epa Ajé!',
    caracteristicas: ['Divindade feminina da prosperidade e do comércio','Senhora da cowrie (búzio) como moeda sagrada','Mãe de todas as prosperidades','Ensina que riqueza e espiritualidade são compatíveis'],
    simbolos: ['Cowrie (búzio)','Bolsa de moedas','Espelho','Sino de latão'],
    cores: ['Amarelo (ouro)','Dourado (riqueza)','Coral (prosperidade)'],
    elementosNaturais: ['Búzios','Ouro','Rios (associação com Òṣun)','Mercados'],
    diaTradicional: 'Quinta-feira',

    historiaTradicional:
      'Àjẹ́ é a divindade da prosperidade, da riqueza e do comércio na tradição yorùbá. É a energia feminina da abundância, a mãe que nutre, a comerciante que distribui, a senhora da cowrie, búzio, que é o símbolo universal da moeda e da sorte. Na cosmologia yorùbá, Àjẹ́ não é apenas dinheiro, é a capacidade de gerar, distribuir e multiplicar recursos. Ela é a mãe de todas as prosperidades, e seu símbolo mais poderoso é o búzio, owó, que foi a primeira moeda da África Ocidental. O lema de Àjẹ́ é Àjẹ́ ni mo jẹ́, Ọ̀run ni mo ń lọ — Eu sou próspera, estou indo para o céu. Essa frase encapsula a filosofia de Àjẹ́: a riqueza não é pecado, é uma bênção divina que deve ser usada com sabedoria e generosidade. Àjẹ́ é frequentemente associada a Òṣun, pois ambas representam o poder feminino e a prosperidade, mas Àjẹ́ é mais especificamente ligada ao comércio, aos negócios e à troca.',

    quemFoi:
      'A Divindade Feminina da Prosperidade. Mãe da abundância, senhora da cowrie e patrona do comércio e da riqueza.',

    personalidade: [
      'Próspera — encarna a abundância',
      'Generosa — distribui riqueza com sabedoria',
      'Comerciante — entende as artes do comércio',
      'Maternal — nutre seus filhos com abundância',
      'Magnética — atrai riqueza e oportunidades',
      'Justa — exige honestidade nos negócios',
      'Protetora dos comerciantes',
    ],

    biografia: {
      nascimento:
        'Uma das Ìrúnmọlẹ̀ que desceram do Orun trazendo a dádiva da prosperidade para o mundo.',
      feitos: [
        'Trouxe o búzio (owó) como primeira moeda da humanidade',
        'Ensinou o comércio e a troca justa',
        'Protege os comerciantes e empresários',
        'Multiplica a riqueza dos que a honram',
        'Ensina que prosperidade e espiritualidade não são incompatíveis',
      ],
      transformacao:
        'De uma Ìrúnmọlẹ̀ do Orun a senhora absoluta da prosperidade e do comércio.',
    },

    genealogia: {
      pai: 'Olódùmarè (criação direta)',
      mae: 'Em muitas tradições, considerada filha de Ọbàtálá',
      irmaos: [
        'Todos os Ìrúnmọlẹ̀',
        'Frequentemente associada a Òṣun',
      ],
      filhos: ['Todos os comerciantes e pessoas prósperas'],
    },

    linhaDoTempoMitica: [
      'A Descida com a Cowrie — Àjẹ́ traz o búzio como moeda sagrada',
      'O Ensinamento do Comércio — Àjẹ́ ensina a arte da troca justa',
      'A Multiplicação da Riqueza — Àjẹ́ abençoa os que trabalham honestamente',
      'O Lema da Prosperidade — Àjẹ́ ni mo jẹ́, Ọ̀run ni mo ń lọ',
    ],

    itans: [
      {
        titulo: 'Àjẹ́ e o Primeiro Búzio',
        historia:
          'Conta-se que, quando os humanos começaram a trocar mercadorias, eles usavam barras de ferro e tecidos como moeda, mas esses eram pesados e difíceis de carregar. Àjẹ́, vendo a dificuldade do povo, subiu ao Orun e trouxe consigo uma mão cheia de búzios brilhantes. Ela os lançou sobre o mercado e disse: Estes são meus filhos. Eles representam meu poder. Com eles, vocês poderão trocar o que produzem. Os humanos, maravilhados com a beleza e o tamanho dos búzios, começaram a usá-los como moeda. Desde então, o búzio tornou-se o símbolo universal da riqueza yorùbá e é usado em todos os rituais de prosperidade.',
        licao:
          'A riqueza deve ser acessível e democrática. Àjẹ́ trouxe um símbolo que todos podiam usar e entender.',
      },
      {
        titulo: 'A Mulher que Desafiou Àjẹ́',
        historia:
          'Uma mulher yorùbá muito rica, mas avarenta, acumulava búzios sem nunca oferecer parte deles aos Orixás ou aos necessitados. Àjẹ́, vendo sua avareza, visitou-a em sonho e advertiu: A riqueza que não circula morre. A mulher ignorou o aviso. Em poucos meses, seus búzios começaram a desaparecer misteriosamente, caíam de suas bolsas, sumiam dos potes, perdiam seu brilho. Em desespero, a mulher buscou um Babalawo, que revelou que Àjẹ́ havia retirado sua bênção. Para restaurar sua riqueza, a mulher teve que oferecer metade de seus búzios restantes aos necessitados e jurar que sempre dividiria sua prosperidade. Quando o fez, seus búzios voltaram a brilhar e sua riqueza se multiplicou.',
        licao:
          'A riqueza que não é compartilhada é riqueza perdida. Àjẹ́ exige generosidade como condição da prosperidade.',
      },
    ],

    dominios: [
      'Riqueza e Prosperidade',
      'Comércio e Negócios',
      'Cowrie (Búzio)',
      'Abundância Feminina',
      'Generosidade',
      'Mercados',
      'Fortuna',
    ],

    correspondencias: {
      arvores: ['Dendezeiro', 'Bananeira', 'Árvore de búzio'],
      locaisNatureza: [
        'Mercados',
        'Rios (por associação com Òṣun)',
        'Locais de comércio',
      ],
      metaisPedras: ['Ouro', 'Búzio (owó)', 'Latão', 'Cobre'],
      animais: ['Pombo', 'Galinha', 'Peixe dourado'],
    },

    ervas: {
      liturgicas: [
        'Folha de limão',
        'Folha de bananeira',
        'Erva-doce',
      ],
      medicinais: [
        'Erva-cidreira — para prosperidade',
        'Folha de abacate — para fortalecimento financeiro',
      ],
    },

    comidas: ['Mel', 'Amendoim', 'Banana', 'Batata-doce', 'Inhame', 'Acarajé'],

    ewoTabus: [
      {
        tabu: 'Avareza — não oferecer parte da riqueza',
        motivo:
          'Àjẹ́ exige generosidade. Acumular sem distribuir faz com que a bênção se retire.',
      },
      {
        tabu: 'Comércio desonesto',
        motivo:
          'A honestidade é fundamental para a prosperidade de Àjẹ́. Enganar clientes é ofender a própria divindade.',
      },
    ],

    qualidades: [
      {
        nome: 'Àjẹ́ Alágbára',
        descricao: 'Àjẹ́ Poderosa — a manifestação mais intensa da prosperidade.',
      },
      {
        nome: 'Ìyá Mi Ajé',
        descricao:
          'Minha Mãe a Prosperidade — a qualidade maternal e nutridora de Àjẹ́.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, Àjẹ́ é reverenciada como a mãe da prosperidade. Seu culto é especialmente forte entre comerciantes e mulheres de negócios.',
      brasil:
        'No Brasil, Àjẹ́ é associada a Òṣun e cultuada em terreiros que preservam a tradição da prosperidade feminina.',
      cuba:
        'Em Cuba, Aché é venerada no Santería como orisha de la prosperidad y el comercio.',
    },

    orikis: [
      {
        yoruba:
          'Àjẹ́, Àjẹ́\nÌyá tí ó ní owó\nÀjẹ́ ni mo jẹ́\nỌ̀run ni mo ń lọ\nEpa Ajé!',
        traducao:
          'Àjẹ́, Àjẹ́, A mãe que possui búzios. Eu sou próspera, estou indo para o céu. Epa Ajé!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Àjẹ́, àjẹ́\nOwó mi a bọ̀ wáyé\nGbogbo ohun tí mo ní lọ̀wọ̀ Àjẹ́\nEpa Ajé!',
        portugues:
          'Àjẹ́, àjẹ́, Meus búzios desceram à Terra. Tudo que tenho vem de Àjẹ́. Epa Ajé!',
      },
    ],

    oracoes: [
      'Opa Ajé! Epa Ajé! Senhora da prosperidade, que vossa cowrie brilhe sobre minha vida. Abençoa meus negócios, multiplica minha riqueza e ensina-me a ser generosa. Àjẹ́ ni mo jẹ́, Ọ̀run ni mo ń lọ!',
    ],

    templosHistoricos: [
      'Mercados sagrados de Ilé-Ifẹ̀',
      'Templos de prosperidade na Nigéria yorùbá',
    ],

    influenciaCultural: [
      'Comércio: Àjẹ́ é a patrona de todo comércio na África Ocidental.',
      'Moeda: O búzio, símbolo de Àjẹ́, foi usado como moeda por séculos.',
      'Empreendedorismo: O culto a Àjẹ́ incentiva o trabalho honesto e a generosidade.',
    ],

    pesquisasRelacionadas: [
      'Àjẹ́ — Divindade da prosperidade yorùbá',
      'O búzio como moeda sagrada',
      'Prosperidade e espiritualidade na África',
      'Mulheres de negócios na cultura yorùbá',
    ],

    palavrasChaveSEO: [
      'Ajé',
      'Àjẹ́',
      'Prosperidade yorùbá',
      'Cowrie',
      'Búzio sagrado',
      'Comércio yorùbá',
      'Riqueza',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Ajé', 'Prosperidade', 'Cowrie', 'Búzio', 'Riqueza yorùbá'],
      en: ['Aje', 'Prosperity', 'Cowrie shell', 'Yoruba wealth', 'Commerce'],
      es: ['Aché', 'Prosperidad', 'Cauri', 'Riqueza yoruba', 'Comercio'],
      yo: ['Àjẹ́', 'Ọlọ́rọ̀', 'Owó', 'Ìrìn-ajo', 'Ìyà mi Ajé'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'Quem é Àjẹ́?',
        resposta:
          'Àjẹ́ é a divindade feminina da prosperidade, do comércio e da abundância na tradição yorùbá. Ela é a senhora da cowrie, búzio, o símbolo universal da riqueza.',
      },
      {
        pergunta: 'O que significa Àjẹ́ ni mo jẹ́, Ọ̀run ni mo ń lọ?',
        resposta:
          'Significa Eu sou próspera, estou indo para o céu. É o lema de Àjẹ́, que ensina que a riqueza é uma bênção divina e que prosperidade e espiritualidade não são incompatíveis.',
      },
      {
        pergunta: 'Como homenagear Àjẹ́?',
        resposta:
          'Para homenagear Àjẹ́, é necessário ser generoso, honesto nos negócios e oferecer parte da riqueza aos Orixás e aos necessitados. O búzio é oferecido em seus rituais.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
      'Lody, Raul. (2003). "Dicionário de Arte Sacra e Técnicas Afro-brasileiras". Editora Pallas.',
    ],

    pontosCantados: [
      'Epa Ajé!\nÀjẹ́, àjẹ́\nOwó mi a bọ̀ wáyé\nGbogbo ohun tí mo ní lọ̀wọ̀ Àjẹ́\nÀjẹ́ ni mo jẹ́, Ọ̀run ni mo ń lọ!',
    ],

    pontosRiscados: [
      'Opa Ajé!\nÀjẹ́, Àjẹ́\nÌyá tí ó ní owó\nEpa Ajé!',
    ],
  },

  // ─── 7. Àjẹ́ Ṣálúgà — Prosperidade Marítima ───
  {
    id: 'orixa-aje-saluga',
    nome: 'Àjẹ́ Ṣálúgà',
    nomeYoruba: 'Àjẹ́ Ṣálúgà',
    nomeLucumi: 'Aché Saluga',
    nomeIngles: 'Aje Saluga',
    nomeEspanhol: 'Aché Saluga',
    variacoesRegionais: ['Ajé Saluga', 'Àjẹ́ Alágbẹ̀ Ogun', 'Mercador do Mar'],
    categoria: 'Orixá',
    linha: 'Comércio Marítimo e Prosperidade Internacional',
    reino: 'Comércio Internacional, Navegação, Prosperidade Mercantil',
    falange: 'Orixás / Orishas',
    saudacao: 'Opa Ajé Saluga! Epa Ajé!',
    caracteristicas: ['Manifestação de Àjẹ́ para o comércio marítimo','Patrona dos mercadores internacionais','Controla as rotas marítimas do comércio','Conecta povos distantes através do intercâmbio'],
    simbolos: ['Búzio','Âncora','Vela de barco','Barco mercante'],
    cores: ['Amarelo (prosperidade)','Azul (mar)'],
    elementosNaturais: ['Mar','Portos','Rios navegáveis','Costas e praias'],
    diaTradicional: 'Quinta-feira',

    historiaTradicional:
      'Àjẹ́ Ṣálúgà é a manifestação de Àjẹ́ ligada especificamente ao comércio marítimo e ao intercâmbio internacional. Enquanto Àjẹ́ genérica governa a prosperidade em geral, Àjẹ́ Ṣálúgà é o orixá dos mercadores que viajam pelo mar, dos comerciantes internacionais e da riqueza que vem do intercâmbio entre povos distantes. Nos mitos yorùbá, Àjẹ́ Ṣálúgà é descrita como uma figura que controla as rotas marítimas e as fortunas dos que navegam. Ela é mais mundana e pragmática que a Àjẹ́ original, menos espiritual e mais focada nos negócios concretos. Seus seguidores são comerciantes experientes, importadores, exportadores e todos os que lucram com o comércio entre nações. Àjẹ́ Ṣálúgà ensina que a prosperidade verdadeira vem da capacidade de conectar mundos, de levar o que sobra de um lugar e trazer o que falta de outro.',

    quemFoi:
      'A Manifestação de Àjẹ́ para o Comércio Marítimo e Internacional. Patrona dos mercadores que viajam pelo mar e do intercâmbio entre povos.',

    personalidade: [
      'Pragmática — foca no comércio concreto',
      'Viajante — domina as rotas marítimas',
      'Mundana — entende os negócios internacionais',
      'Generosa — distribui as bênçãos do comércio',
      'Estratégica — planeja rotas e negociações',
      'Protetora dos mercadores e navegantes',
    ],

    biografia: {
      nascimento:
        'Uma manifestação especial de Àjẹ́ que surgiu quando os primeiros comerciantes yorùbá começaram a navegar pelos rios e mares.',
      feitos: [
        'Controla as rotas marítimas do comércio',
        'Protege os mercadores que viajam pelo mar',
        'Ensina o intercâmbio internacional',
        'Multiplica as fortunas dos comerciantes',
        'Conecta povos distantes através do comércio',
      ],
      transformacao:
        'De uma qualidade de Àjẹ́ a entidade independente do comércio marítimo.',
    },

    genealogia: {
      pai: 'Manifestação de Àjẹ́',
      irmaos: [
        'Àjẹ́ Alágbára',
        'Ìyá Mi Ajé',
        'Todos os aspectos de Àjẹ́',
      ],
    },

    linhaDoTempoMitica: [
      'A Criação das Rotas Marítimas — Àjẹ́ Ṣálúgà abre os caminhos do comércio',
      'O Primeiro Navio — os mercadores yorùbá lançam seu primeiro barco',
      'A Prosperidade Internacional — o comércio entre nações floresce',
    ],

    itans: [
      {
        titulo: 'Àjẹ́ Ṣálúgà e o Rio que Conectava os Povos',
        historia:
          'Conta-se que um grupo de mercadores yorùbá queria trocar suas mercadorias com um povo distante, mas não sabiam como atravessar o grande rio que os separava. Àjẹ́ Ṣálúgà, vendo sua determinação, soprou seus ventos e criou uma corrente que levou seus barcos até a outra margem. Lá, os mercadores encontraram um povo que tinha ouro em abundância mas faltava inhame. Os yorùbá trocaram inhame por ouro, e ambos os povos prosperaram. Desde então, Àjẹ́ Ṣálúgà é invocada por todos que fazem comércio internacional.',
        licao:
          'O comércio é uma ponte entre povos. A prosperidade vem da capacidade de conectar o que falta ao que sobra.',
      },
    ],

    dominios: [
      'Comércio Marítimo',
      'Comércio Internacional',
      'Navegação Mercantil',
      'Importação e Exportação',
      'Mercadores',
      'Rotas Comerciais',
    ],

    correspondencias: {
      arvores: ['Palmeira', 'Dendezeiro'],
      locaisNatureza: [
        'Portos',
        'Rios navegáveis',
        'Costas e praias',
        'Mercados costeiros',
      ],
      metaisPedras: ['Ouro', 'Búzio', 'Prata'],
      animais: ['Peixe', 'Pato', 'Tartaruga marinha'],
    },

    ervas: {
      liturgicas: ['Alga marinha', 'Folha de bananeira'],
      medicinais: ['Erva-doce — para prosperidade'],
    },

    comidas: ['Peixe', 'Frutas do mar', 'Mel', 'Amendoim'],

    ewoTabus: [
      {
        tabu: 'Comércio desonesto em negociações internacionais',
        motivo:
          'Àjẹ́ Ṣálúgà exige honestidade em todas as transações, especialmente entre povos de diferentes culturas.',
      },
      {
        tabu: 'Recusar compartilhar informações comerciais',
        motivo:
          'A prosperidade marítima baseia-se no fluxo de informações e mercadorias.',
      },
    ],

    qualidades: [
      {
        nome: 'Àjẹ́ Ṣálúgà Alágbára',
        descricao:
          'Àjẹ́ Ṣálúgà Poderosa — a manifestação mais intensa da prosperidade marítima.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria costeira, Àjẹ́ Ṣálúgà é cultuada por comunidades de pescadores e mercadores que dependem do mar.',
      brasil:
        'No Brasil, Àjẹ́ Ṣálúgà está presente em terreiros de nação Ketu, especialmente em cidades costeiras como Salvador e Recife.',
    },

    orikis: [
      {
        yoruba:
          'Àjẹ́ Ṣálúgà, Àjẹ́ Ṣálúgà\nOlú-ọ̀jà tí ó ní owó\nA fi omo ọ̀jà rán sí Ayyè\nepa Ajé Saluga!',
        traducao:
          'Àjẹ́ Ṣálúgà, Àjẹ́ Ṣálúgà, Senhora do mercado que possui búzios. Ela enviou o filho do mercado à Terra. Epa Ajé Saluga!',
      },
    ],

    cantigas: [
      {
        yoruba:
          `Àjẹ́ Ṣálúgà, a bọ̀ wáyé o\nÓ fi omo ọ̀jà rán sí ilẹ̀\nÓ kọ wa l'ọ̀run\nEpa Ajé Saluga!`,
        portugues:
          'Àjẹ́ Ṣálúgà, desceu à Terra. Ela enviou o filho do mercado para a terra. Ela nos ensinou no céu. Epa Ajé Saluga!',
      },
    ],

    oracoes: [
      'Epa Ajé Saluga! Senhora do comércio marítimo, que vossas rotas estejam sempre abertas e que a prosperidade flua como as águas. Abençoa meus negócios internacionais. Epa Ajé!',
    ],

    templosHistoricos: [
      'Portos sagrados na costa yorùbá da Nigéria',
      'Mercados costeiros do Benin',
    ],

    influenciaCultural: [
      'Comércio: Àjẹ́ Ṣálúgà é a patrona do comércio marítimo yorùbá.',
      'Navegação: Seu culto influenciou as rotas comerciais do golfo da Guiné.',
    ],

    pesquisasRelacionadas: [
      'Àjẹ́ Ṣálúgà — Prosperidade marítima',
      'Comércio yorùbá no golfo da Guiné',
      'Orixás do comércio',
    ],

    palavrasChaveSEO: [
      'Ajé Saluga',
      'Àjẹ́ Ṣálúgà',
      'Comércio marítimo yorùbá',
      'Prosperidade internacional',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Ajé Saluga', 'Comércio marítimo', 'Prosperidade internacional', 'Mercador'],
      en: ['Aje Saluga', 'Maritime commerce', 'International prosperity', 'Merchant deity'],
      es: ['Aché Saluga', 'Comercio marítimo', 'Prosperidad internacional', 'Deidad mercante'],
      yo: ['Àjẹ́ Ṣálúgà', 'Ìjà Ogun', 'Owó olokun', 'Olú ọ̀jà'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'Qual a diferença entre Àjẹ́ e Àjẹ́ Ṣálúgà?',
        resposta:
          'Àjẹ́ é a divindade geral da prosperidade. Àjẹ́ Ṣálúgà é sua manifestação específica para o comércio marítimo e internacional, mais focada em negócios concretos e rotas comerciais.',
      },
      {
        pergunta: 'Quem cultua Àjẹ́ Ṣálúgà?',
        resposta:
          'Comerciantes, importadores, exportadores e todos os que lucram com o comércio entre nações. Na Nigéria costeira, pescadores e mercadores marítimos são seus principais devotos.',
      },
      {
        pergunta: 'Qual o símbolo de Àjẹ́ Ṣálúgà?',
        resposta:
          'Assim como Àjẹ́, Àjẹ́ Ṣálúgà usa o búzio como símbolo principal, mas também é associada a âncoras, velas e barcos.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
    ],

    pontosCantados: [
      'Epa Ajé Saluga!\nÀjẹ́ Ṣálúgà a bọ̀ wáyé\nÓ fi omo ọ̀jà rán sí ilẹ̀\nEpa Ajé Saluga!',
    ],

    pontosRiscados: [
      'Epa Ajé Saluga!\nOlú-ọ̀jà tí ó ní owó\nEpa Ajé Saluga!',
    ],
  },

  // ─── 8. Ọranfe — Orixá dos Relâmpagos e Poder Celeste ───
  {
    id: 'orixa-oranfe',
    nome: 'Ọranfe',
    nomeYoruba: 'Ọranfe',
    nomeLucumi: 'Oranfe',
    nomeIngles: 'Oranfe',
    nomeEspanhol: 'Oranfe',
    variacoesRegionais: ['Ọranfe Alágbára', 'Ìjì-Ọ̀run', 'Ọranfẹ́'],
    categoria: 'Orixá',
    linha: 'Relâmpagos e Poder Celeste',
    reino: 'Relâmpagos, Trovão Puro, Purificação Celeste',
    falange: 'Orixás / Orishas',
    saudacao: 'Epa Ọranfe! Àṣẹ Ọranfe!',
    caracteristicas: ['Orixá dos relâmpagos em sua forma mais pura','A descarga divina que purifica a terra','Diferente de Xangô, é trovão sem justiça — apenas purificação','Ilumina verdades ocultas e quebra maldições'],
    simbolos: ['Relâmpago','Trovão','Raio','Fulgo celeste'],
    cores: ['Branco (luz)','Dourado (relâmpago)','Azul elétrico'],
    elementosNaturais: ['Relâmpagos','Trovoes','Nuvens carregadas','Luz celeste'],
    diaTradicional: 'Terça-feira',

    historiaTradicional:
      'Ọranfe é o Orixá dos relâmpagos em sua forma mais pura e primordial. Enquanto Xangô é o Orixá do trovão e da justiça, combinando poder celestial com autoridade terrena, Ọranfe é o trovão em sua essência bruta, a descarga elétrica que purifica a terra, queima as impurezas e ilumina a escuridão. Nos mitos yorùbá, Ọranfe é descrito como uma força da natureza indomável, um fogo que cai do céu sem aviso, sem piedade, mas com um propósito de purificação. Ele é mais antigo e mais selvagem que Xangô no que diz respeito ao trovão. Xangô é o rei que usa o trovão como arma de justiça; Ọranfe é o trovão puro, sem dono, sem juízo, apenas purificação. Sua manifestação é o relâmpago que rasga o céu, o trovão que faz a terra tremer, e a luz que expõe tudo o que está escondido. Ọranfe é invocado para purificar espaços carregados de energia negativa, quebrar maldições e revelar verdades ocultas.',

    quemFoi:
      'O Orixá dos Relâmpagos e do Poder Celeste em sua forma pura. A descarga divina que purifica a terra e ilumina a escuridão.',

    personalidade: [
      'Explosivo — sua energia é instantânea e avassaladora',
      'Purificador — queima tudo o que é impuro',
      'Brilhante — ilumina a escuridão mais profunda',
      'Indomável — não pode ser controlado ou contido',
      'Imparcial — purifica sem distinguir justo ou injusto',
      'Rápido — age sem aviso',
      'Terrível — inspira temor reverencial',
    ],

    biografia: {
      nascimento:
        'Uma das primeiras manifestações energéticas do universo — o relâmpago primordial que existia antes mesmo dos Orixás.',
      feitos: [
        'Purifica a terra com relâmpagos',
        'Quebra maldições e feitiços',
        'Ilumina verdades ocultas',
        'Inspira temor e respeito',
        'Protege contra forças do mal',
      ],
      transformacao:
        'De uma força bruta da natureza a uma divindade reconhecida e reverenciada.',
    },

    genealogia: {
      pai: 'Olódùmarè (manifestação energética direta)',
      irmaos: [
        'Xangô (frequentemente associado)',
        'Orixás do trovão e do fogo',
      ],
    },

    linhaDoTempoMitica: [
      'O Primeiro Relâmpago — Ọranfe rasga o céu pela primeira vez',
      'A Purificação da Terra — relâmpagos queimam as impurezas do mundo',
      'A Luz na Escuridão — Ọranfe ilumina os caminhos mais escuros',
    ],

    itans: [
      {
        titulo: 'Ọranfe e a Purificação do Mundo',
        historia:
          'Conta-se que, em tempos imemoriais, as forças do mal se espalharam pela terra tão densamente que até os Orixás tinham dificuldade em respirar. Xangô, Oxóssi e outros Orixás guerreiros lutaram contra os inimigos, mas não conseguiam vencê-los. Foi então que Ọranfe emergiu, um relâmpago gigantesco que rasgou o céu de ponta a ponta. A luz foi tão intensa que queimou todas as forças negras em um instante. A terra ficou em silêncio por sete dias, completamente purificada. Quando os Orixás voltaram, encontraram um mundo limpo, livre de toda impureza. Ọranfe retornou ao céu, mas sua promessa permanece: sempre que as trevas se acumularem, seu relâmpago voltará para purificar.',
        licao:
          'Existem forças que apenas a luz pode vencer. A purificação violenta é às vezes necessária para restaurar o equilíbrio.',
      },
      {
        titulo: 'O Relâmpago que Revelou a Verdade',
        historia:
          'Um Babalawo era acusado injustamente de praticar feitiçaria. A comunidade o condenou sem julgamento. Nessa noite, um relâmpago de Ọranfe caiu exatamente sobre a casa do verdadeiro feiticeiro, queimando seus instrumentos e revelando sua identidade. A comunidade, envergonhada, pediu perdão ao Babalawo inocente. Desde então, diz-se que Ọranfe é o revelador de verdades, o relâmpago que expõe o que está escondido.',
        licao:
          'A verdade sempre será revelada. Ọranfe ilumina o que os humanos tentam esconder.',
      },
    ],

    dominios: [
      'Relâmpagos',
      'Trovão Puro',
      'Purificação',
      'Revelação de Verdades',
      'Poder Celeste',
      'Quebra de Maldições',
      'Iluminação',
    ],

    correspondencias: {
      arvores: ['Árvore atingida por relâmpago', 'Cedro'],
      locaisNatureza: [
        'Locais onde relâmpagos caíram',
        'Cummes elevados',
        'Planícies abertas',
      ],
      metaisPedras: ['Obsidiana', 'Pedra fulminada', 'Ferro meteoro'],
      animais: ['Águia', 'Serpente elétrica'],
    },

    ervas: {
      liturgicas: ['Folha de cedro', 'Erva-de-três-folhas', 'Arruda'],
      medicinais: [
        'Erva-cidreira — para limpeza espiritual',
        'Boldo — para banhos de purificação',
      ],
    },

    comidas: ['Inhame', 'Carne grelhada', 'Mel'],

    ewoTabus: [
      {
        tabu: 'Invocar Ọranfe sem necessidade',
        motivo:
          'O poder de Ọranfe é extremo. Invocá-lo sem necessidade grave pode trazer destruição indiscriminada.',
      },
      {
        tabu: 'Esconder verdades',
        motivo:
          'Ọranfe revela o que está escondido. Esconder verdades é atrair seu relâmpago punitivo.',
      },
    ],

    qualidades: [
      {
        nome: 'Ọranfe Alágbára',
        descricao:
          'Ọranfe Poderoso — a manifestação mais intensa do relâmpago purificador.',
      },
      {
        nome: 'Ìjì-Ọ̀run',
        descricao:
          'Trovo Celeste — a qualidade mais espiritual e menos destrutiva de Ọranfe.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, Ọranfe é cultuado como a força bruta da purificação. Locais onde relâmpagos caíram são considerados sagrados.',
      brasil:
        'No Brasil, Ọranfe está presente em terreiros que trabalham com limpeza espiritual profunda e quebra de maldições.',
    },

    orikis: [
      {
        yoruba:
          'Ọranfe, Ọranfe\nÌjì tí ó ní àṣẹ\nÓ fi ìmọ́lẹ̀ rán sí ilẹ̀\nEpa Ọranfe!',
        traducao:
          'Ọranfe, Ọranfe, O trovão que possui o poder. Ele enviou a luz para a terra. Epa Ọranfe!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Ọranfe, a jà o\nÓ fi ìmọ́lẹ̀ rán sí ilẹ̀\nÓ fi ohun rán sí wa\nEpa Ọranfe!',
        portugues:
          'Ọranfe, lutou. Ele enviou a luz para a terra. Ele enviou o som para nós. Epa Ọranfe!',
      },
    ],

    oracoes: [
      'Epa Ọranfe! Senhor dos relâmpagos, que vossa luz purifique meu caminho e queima todo mal que se interpõe. Àṣẹ Ọranfe!',
    ],

    templosHistoricos: [
      'Locais de relâmpagos sagrados na Nigéria',
      'Cummes elevados onde Ọranfe é invocado',
    ],

    influenciaCultural: [
      'Proteção: Locais onde relâmpagos caíram são considerados sagrados e protegidos.',
      'Purificação: O culto a Ọranfe é usado para limpeza espiritual de espaços e pessoas.',
    ],

    pesquisasRelacionadas: [
      'Ọranfe — Orixá dos relâmpagos',
      'Diferença entre Ọranfe e Xangô',
      'Relâmpagos sagrados na cultura yorùbá',
      'Purificação espiritual yorùbá',
    ],

    palavrasChaveSEO: [
      'Oranfe',
      'Ọranfe',
      'Relâmpagos yorùbá',
      'Orixá do trovão',
      'Purificação',
      'Poder celeste',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Oranfe', 'Relâmpagos', 'Purificação', 'Trovão puro'],
      en: ['Oranfe', 'Lightning', 'Purification', 'Celestial power'],
      es: ['Oranfe', 'Relámpagos', 'Purificación', 'Poder celestial'],
      yo: ['Ọranfe', 'Ìjì', 'Ìmọ́lẹ̀', 'Àṣẹ ọ̀run'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'Qual a diferença entre Ọranfe e Xangô?',
        resposta:
          'Xangô é o Orixá do trovão e da justiça, usa o trovão como arma de governança. Ọranfe é o trovão puro, sem dono, sem juízo, apenas purificação e destruição das forças do mal.',
      },
      {
        pergunta: 'Quando se invoca Ọranfe?',
        resposta:
          'Ọranfe é invocado em situações de extrema necessidade, quando há forças do mal muito poderosas, maldições graves ou a necessidade de purificação total.',
      },
      {
        pergunta: 'O que acontece quando um relâmpago cai?',
        resposta:
          'Na tradição yorùbá, um relâmpago é a manifestação física de Ọranfe. O local onde cai é sagrado e purificado por sete anos.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
    ],

    pontosCantados: [
      'Epa Ọranfe!\nỌranfe, a jà o\nÓ fi ìmọ́lẹ̀ rán sí ilẹ̀\nÓ fi ohun rán sí wa\nEpa Ọranfe!',
    ],

    pontosRiscados: [
      'Epa Ọranfe!\nÌjì tí ó ní àṣẹ\nÓ fi ìmọ́lẹ̀ rán sí ilẹ̀\nEpa Ọranfe!',
    ],
  },

  // ─── 9. Oní Ilé — Senhora/Senhor da Terra Ancestral ───
  {
    id: 'orixa-onile',
    nome: 'Oní Ilé',
    nomeYoruba: 'Oní Ilé',
    nomeLucumi: 'Onile',
    nomeIngles: 'Onile',
    nomeEspanhol: 'Onilé',
    variacoesRegionais: ['Oní Ilé Alágbára', 'Ìyá Ilé', 'Ilé Ayé'],
    categoria: 'Orixá',
    linha: 'Terra Ancestral e Fertilidade',
    reino: 'Terra Ancestral, Solo, Fertilidade do Solo, Ancoramento',
    falange: 'Orixás / Ancestrais',
    saudacao: 'Epa Oní Ilé! Àṣẹ Oní Ilé!',
    caracteristicas: ['Senhor/Senhora da terra ancestral','Dono do solo sagrado que sustenta toda a vida','Um dos espíritos mais antigos da cosmologia yorùbá','Antes de qualquer construção, pede-se permissão a Oní Ilé'],
    simbolos: ['Solo sagrado','Pedra de fundação','Argila','Raízes profundas'],
    cores: ['Verde (vegetação)','Marrom (solo)','Branco (pureza)'],
    elementosNaturais: ['Solo','Terra','Argila','Águas subterrâneas','Minerais'],
    diaTradicional: 'Segunda-feira',

    historiaTradicional:
      'Oní Ilé é o senhor ou a senhora da terra ancestral, o dono literal do solo sobre o qual os humanos pisam. Enquanto Ọkọ̀ governa a terra cultivada, Oní Ilé governa a terra bruta e ancestral, representando o solo em sua forma mais pura e sagrada, o solo que sustenta todas as coisas vivas. Na cosmologia yorùbá, Oní Ilé é um dos espíritos mais antigos, ligado diretamente à própria criação da terra firme por Odùduwà. Ele é a terra em si, não apenas a superfície, mas as camadas profundas, as raízes que se entranham no subsolo, os minerais, as águas subterrâneas. Oní Ilé é especialmente reverenciado por agricultores, construtores e todos aqueles que trabalham com a terra. Antes de qualquer construção ou plantio, é costume pedir permissão a Oní Ilé. Seu culto é profundo e silencioso, ele não é um Orixá de festas barulhentas, mas de cerimônias íntimas e respeitosas. Filhos de Oní Ilé são conhecidos por serem extremamente ligados à natureza, humildes e estáveis.',

    quemFoi:
      'O Senhor/Senhora da Terra Ancestral. Dono do solo sagrado, da fertilidade natural e da força que sustenta todas as coisas vivas.',

    personalidade: [
      'Grounded — está conectado ao solo mais profundo',
      'Nurturing — nutre todas as coisas vivas com sua fertilidade',
      'Ancient — um dos espíritos mais antigos do mundo',
      'Fértil — é a própria fonte da fertilidade do solo',
      'Paciente — trabalha silenciosamente ao longo dos séculos',
      'Silencioso — suas manifestações são sutis mas poderosas',
      'Protetor da terra',
    ],

    biografia: {
      nascimento:
        'Oní Ilé manifestou-se quando Odùduwà criou a primeira terra firme — o próprio solo tornou-se consciente e sagrado.',
      feitos: [
        'Sustenta toda a vida no planeta',
        'Protege a terra contra pragas e destruição',
        'Ensina o respeito pelo solo e pela natureza',
        'Abençoa construções e plantios',
        'Ancora os seres vivos ao mundo físico',
      ],
      transformacao:
        'De solo inerte a divindade consciente que sustenta toda a existência.',
    },

    genealogia: {
      pai: 'Odùduwà (em alguns mitos — a terra firme que criou)',
      mae: 'A própria terra (Oní Ilé é auto-gerado)',
      irmaos: [
        'Todos os espíritos da natureza',
        'Oní Ilé é anterior a muitos Orixás',
      ],
    },

    linhaDoTempoMitica: [
      'A Criação da Terra Firme — Odùduwà espalha terra sobre o oceano',
      'O Nascimento de Oní Ilé — o solo ganha consciência',
      'O Culto da Terra — os humanos aprendem a honrar a terra',
      'A Proteção dos Solos — Oní Ilé estabelece seus domínios',
    ],

    itans: [
      {
        titulo: 'Oní Ilé e a Primeira Construção',
        historia:
          'Conta-se que, quando os humanos quiseram construir suas primeiras casas, a terra se recusou a sustentá-las, os pilares afundavam, os muros desabavam. Um Babalawo consultou Ifá e recebeu que Oní Ilé estava ofendido porque os humanos não pediram permissão antes de tocar na terra. O Babalawo levou os líderes ao solo nu, onde fizeram oferendas de inhame, mel e sangue de galinha. A terra, satisfeita, firmou-se e as casas foram construídas com sucesso. Desde então, toda construção começa com uma oferenda a Oní Ilé.',
        licao:
          'A terra não é propriedade humana — ela é uma entidade viva que exige respeito e permissão.',
      },
      {
        titulo: 'Oní Ilé e a Seca',
        historia:
          'Em uma época de seca prolongada, os campos estavam estéreis e os rios secavam. Os Orixás do céu, Xangô, Ọranfe, não conseguiam trazer chuva. Foi então que os sacerdotes consultaram Oní Ilé, que revelou que a terra estava cansada de ser maltratada. Os humanos haviam extraído demais sem devolver. Oní Ilé exigiu que enterrassem oferendas profundas no solo, inhame, côco, sementes, e que parassem de derrubar árvores. Quando obedeceram, a terra recuperou sua umidade e fertilidade.',
        licao:
          'A terra precisa ser cuidada e alimentada, não apenas explorada. A reciprocidade com Oní Ilé é essencial.',
      },
    ],

    dominios: [
      'Solo Ancestral',
      'Fertilidade do Solo',
      'Construções',
      'Ancoramento',
      'Natureza Profunda',
      'Águas Subterrâneas',
      'Minerais',
      'Raízes',
    ],

    correspondencias: {
      arvores: ['Árvores com raízes profundas', 'Cedro', 'Imburana'],
      locaisNatureza: [
        'Solo nu',
        'Campos abertos',
        'Terras cultiváveis',
        'Locais de construção',
      ],
      metaisPedras: ['Pedra de fundação', 'Cristal de rocha', 'Minério de ferro'],
      animais: ['Tartaruga', 'Bode', 'Pombo'],
    },

    ervas: {
      liturgicas: ['Folha de cedro', 'Erva-doce', 'Saião'],
      medicinais: [
        'Argila — para cura e proteção',
        'Erva-cidreira — para banhos terrestres',
      ],
    },

    comidas: ['Inhame', 'Mandioca', 'Batata-doce', 'Frutas da terra', 'Mel'],

    ewoTabus: [
      {
        tabu: 'Construir sem pedir permissão a Oní Ilé',
        motivo:
          'A terra é sagrada. Toda construção requer a bênção de Oní Ilé para ser sustentável.',
      },
      {
        tabu: 'Poluir o solo deliberadamente',
        motivo:
          'Oní Ilé é o próprio solo. Poluí-lo é ofender diretamente a divindade.',
      },
    ],

    qualidades: [
      {
        nome: 'Oní Ilé Alágbára',
        descricao:
          'Oní Ilé Poderoso — a manifestação mais intensa e protetora do senhor da terra.',
      },
      {
        nome: 'Ìyá Ilé',
        descricao:
          'Mãe da Terra — a qualidade maternal e nutridora de Oní Ilé.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, Oní Ilé é reverenciado antes de qualquer construção ou plantio. Oferendas são feitas diretamente ao solo.',
      brasil:
        'No Brasil, Oní Ilé está presente em terreiros que preservam o culto à terra e à natureza.',
    },

    orikis: [
      {
        yoruba:
          'Oní Ilé, Oní Ilé\nÌyá tí ó ní ilẹ̀\nÓ fi àṣẹ rán sí ilẹ̀\nEpa Oní Ilé!',
        traducao:
          'Oní Ilé, Oní Ilé, A mãe que possui a terra. Ela enviou o poder para a terra. Epa Oní Ilé!',
      },
    ],

    cantigas: [
      {
        yoruba:
          `Oní Ilé, a bọ̀ wáyé o\nÓ gbé ilẹ̀ sí ilẹ̀\nÓ kọ wa l'ọ̀run\nEpa Oní Ilé!`,
        portugues:
          'Oní Ilé, desceu à Terra. Ele ergueu a terra na terra. Ele nos ensinou no céu. Epa Oní Ilé!',
      },
    ],

    oracoes: [
      'Epa Oní Ilé! Senhor/Senhora da terra ancestral, que o solo sob meus pés seja sagrado e fértil. Perdoa meu descuido e abençoa minha jornada. Àṣẹ Oní Ilé!',
    ],

    templosHistoricos: [
      'Locais sagrados de terra na Nigéria yorùbá',
      'Campos ancestrais de cultivo',
    ],

    influenciaCultural: [
      'Construção: Toda construção na Nigéria tradicional começa com oferendas a Oní Ilé.',
      'Agricultura: Oní Ilé é o patrono espiritual da fertilidade do solo.',
      'Ecologia: O culto a Oní Ilé promove o respeito pela terra e pela natureza.',
    ],

    pesquisasRelacionadas: [
      'Oní Ilé — Senhor da terra yorùbá',
      'Culto à terra na religião yorùbá',
      'Fertilidade do solo e espiritualidade',
    ],

    palavrasChaveSEO: [
      'Onile',
      'Oní Ilé',
      'Terra yorùbá',
      'Fertilidade do solo',
      'Ancestrais',
      'Natureza sagrada',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Onile', 'Terra yorùbá', 'Fertilidade do solo', 'Ancestrais'],
      en: ['Onile', 'Earth deity', 'Soil fertility', 'Ancestral spirits'],
      es: ['Onilé', 'Tierra yoruba', 'Fertilidad del suelo', 'Espíritus ancestrales'],
      yo: ['Oní Ilé', 'Ilẹ̀ ayé', 'Ìgbàgbọ́ ilẹ̀', 'Àwọn àgbà'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'Quem é Oní Ilé?',
        resposta:
          'Oní Ilé é o senhor ou a senhora da terra ancestral, o dono do solo sagrado que sustenta toda a vida. É um dos espíritos mais antigos da cosmologia yorùbá.',
      },
      {
        pergunta: 'Qual a diferença entre Oní Ilé e Ọkọ̀?',
        resposta:
          'Oní Ilé é o dono da terra bruta e ancestral, o solo em sua forma natural. Ọkọ̀ é o senhor da terra cultivada, o campo arado, a lavoura. Oní Ilé representa a terra em si; Ọkọ̀ representa o trabalho humano sobre a terra.',
      },
      {
        pergunta: 'Como se pede permissão a Oní Ilé?',
        resposta:
          'Antes de qualquer construção ou plantio, fazem-se oferendas diretamente ao solo, incluindo inhame, côco, mel e, em alguns casos, sangue de galinha.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
    ],

    pontosCantados: [
      `Epa Oní Ilé!\nOní Ilé a bọ̀ wáyé\nÓ gbé ilẹ̀ sí ilẹ̀\nÓ kọ wa l'ọ̀run\nEpa Oní Ilé!`,
    ],

    pontosRiscados: [
      'Àṣẹ Oní Ilé!\nÌyá tí ó ní ilẹ̀\nÓ fi àṣẹ rán sí ilẹ̀\nEpa Oní Ilé!',
    ],
  },

  // ─── 10. Ẹgbẹ́ — Sociedade Espiritual dos Gêmeos e Companheiros ───
  {
    id: 'orixa-egbe',
    nome: 'Ẹgbẹ́',
    nomeYoruba: 'Ẹgbẹ́',
    nomeLucumi: 'Egbe',
    nomeIngles: 'Egbe',
    nomeEspanhol: 'Egbé',
    variacoesRegionais: ['Ẹgbẹ́ Ọrun', 'Egbé Ayé', 'Companheiro do Orí'],
    categoria: 'Orixá',
    linha: 'Comunidade Espiritual e Companheiros',
    reino: 'Alma Gêmea, Comunidade Espiritual, Karmicidade, Proteção Grupal',
    falange: 'Orixás / Espíritos Companheiros',
    saudacao: 'Epa Ẹgbẹ́! Àṣẹ Ẹgbẹ́!',
    caracteristicas: ['Sociedade espiritual dos companheiros e almas gêmeas','Cada pessoa tem seu Ẹgbẹ́ escolhido no Orun','Espelha as ações — boas ou más — de seus membros','Protege durante a vida e além da morte'],
    simbolos: ['Búzios do grupo','Fios entrelaçados','Espelho (espelhamento)'],
    cores: ['Varia conforme o Ẹgbẹ́','Cores do grupo espiritual'],
    elementosNaturais: ['Varia conforme o Ẹgbẹ́','Elementos do grupo espiritual'],
    diaTradicional: 'Variável',

    historiaTradicional:
      'Ẹgbẹ́ não é exatamente um Orixá no sentido convencional, mas uma sociedade espiritual que existe desde antes do nascimento. Ẹgbẹ́ é o grupo de almas companheiras que cada pessoa escolhe no Orun antes de descer ao Aiyê. São seus companheiros espirituais, suas almas gêmeas, que caminham com ela durante toda a vida. Na cosmologia yorùbá, Ẹgbẹ́ é tão importante quanto o próprio Orí. Se o Orí é o contrato individual, Ẹgbẹ́ é o contrato grupal. Cada pessoa nasce cercada por seus Ẹgbẹ́, espíritos que a protegem, a desafiam e a espelham. Quando alguém diz que tem um bom Ẹgbẹ́, significa que seus companheiros espirituais são fortes e favoráveis. Quando o Ẹgbẹ́ é fraco ou em conflito, a pessoa pode enfrentar dificuldades inexplicáveis. O Ẹgbẹ́ se manifesta através de sonhos, coincidências, sentimentos de conexão com certas pessoas e através do grupo natural de amigos e companheiros que cada pessoa atrai. O culto a Ẹgbẹ́ envolve oferendas para manter a harmonia grupal e a proteção mútua.',

    quemFoi:
      'A Sociedade Espiritual dos Companheiros. O grupo de almas que cada pessoa escolhe no Orun e que a acompanha durante toda a vida.',

    personalidade: [
      'Supportive — apóia seus companheiros em todas as situações',
      'Mirroring — espelha as qualidades e defeitos',
      'Protetor — guarda seus companheiros contra males',
      'Karmic — ligações que transcendem uma vida',
      'Coletivo — existe como comunidade, não como indivíduo',
      'Leal — permanece com seus companheiros além da morte',
    ],

    biografia: {
      nascimento:
        'O Ẹgbẹ́ se forma no Orun, quando almas que se conhecem e se escolhem formam um grupo antes de descer ao Aiyê.',
      feitos: [
        'Protege cada membro do grupo durante a vida terrena',
        'Espelha as ações — boas ou más — de seus membros',
        'Manifesta-se através de coincidências e sonhos',
        'Mantém as ligações além da morte',
        'Ajudas na resolução de conflitos internos',
      ],
      transformacao:
        'De um conceito abstrato a uma força viva que influencia diariamente a vida de cada pessoa.',
    },

    genealogia: {
      pai: 'Olódùmarè (a formação dos grupos de almas é de sua vontade)',
      irmaos: [
        'Os membros do Ẹgbẹ́ são companheiros, não irmãos biológicos',
        'Cada Ẹgbẹ́ é independente dos outros',
      ],
    },

    linhaDoTempoMitica: [
      'A Formação no Orun — almas se agrupam antes do nascimento',
      'A Descida ao Aiyê — o Ẹgbẹ́ desce junto com a pessoa',
      'As Provações da Vida — o Ẹgbẹ́ testa e fortalece seus membros',
      'O Retorno ao Orun — o Ẹgbẹ́ se reúne após a morte',
    ],

    itans: [
      {
        titulo: 'O Ẹgbẹ́ que Protegeu um Homem',
        historia:
          'Conta-se que um jovem yorùbá estava caminhando por uma floresta perigosa quando foi atacado por bandidos. Em desespero, ele gritou por ajuda. Nesse momento, uma presença invisível o empurrou para trás, fazendo com que a flecha dos bandidos errasse o alvo por centímetros. O jovem fugiu e, ao chegar em casa, contou a experiência ao seu Babalawo. O Babalawo explicou que seu Ẹgbẹ́ — seus companheiros espirituais — haviam se manifestado para protegê-lo. Desde então, o jovem sempre oferecia sacrifícios a seu Ẹgbẹ́ antes de viajar.',
        licao:
          'O Ẹgbẹ́ é uma força de proteção que pode se manifestar fisicamente quando seus membros estão em perigo.',
      },
      {
        titulo: 'O Espelho do Ẹgbẹ́',
        historia:
          'Uma mulher tinha o hábito de falar mal de seus amigas pelas costas. Sem perceber, ela notava que suas próprias amigas faziam o mesmo com ela. Confusa e magoada, buscou orientação espiritual. O Babalawo explicou que o Ẹgbẹ́ funciona como um espelho: o que você faz para os outros, o Ẹgbẹ́ devolve para você. Quando ela parou de falar mal e começou a elogiar, percebeu que suas amigas também mudaram. O espelho do Ẹgbẹ́ refletiu sua nova atitude.',
        licao:
          'O Ẹgbẹ́ espelha nossas ações. Tratar os outros bem é receber bondade de volta.',
      },
    ],

    dominios: [
      'Comunidade Espiritual',
      'Alma Gêmea',
      'Proteção Grupal',
      'Karmicidade',
      'Espelhamento',
      'Sonhos e Coincidências',
      'Ligações Além da Morte',
    ],

    correspondencias: {
      arvores: [
        'Varia conforme o Ẹgbẹ́',
        'Árvore do grupo espiritual',
      ],
      locaisNatureza: [
        'Locais onde o grupo se reúne',
        'Pontos de encontro espiritual',
      ],
      metaisPedras: [
        'Varia conforme o Ẹgbẹ́',
        'Quartzo (conexão grupal)',
      ],
      animais: [
        'Varia conforme o Ẹgbẹ́',
        'Animais do grupo espiritual',
      ],
    },

    ervas: {
      liturgicas: ['Erva do grupo espiritual', 'Folha escolhida pelo Babalawo'],
      medicinais: [
        'Erva-cidreira — para harmonia grupal',
      ],
    },

    comidas: ['Varia conforme o Ẹgbẹ́', 'Mel', 'Inhame'],

    ewoTabus: [
      {
        tabu: 'Trair membros do próprio Ẹgbẹ́',
        motivo:
          'O Ẹgbẹ́ é uma aliança sagrada. Trair seus membros enfraquece toda a comunidade espiritual.',
      },
      {
        tabu: 'Ignorar os sinais do Ẹgbẹ́',
        motivo:
          'Os sinais do Ẹgbẹ́, sonhos, coincidências, são mensagens que devem ser levadas a sério.',
      },
    ],

    qualidades: [
      {
        nome: 'Ẹgbẹ́ Ọrun',
        descricao:
          'O Ẹgbẹ́ Celeste — a qualidade mais espiritual e protetora da comunidade de almas.',
      },
      {
        nome: 'Ẹgbẹ́ Ayé',
        descricao:
          'O Ẹgbẹ́ da Terra — a manifestação terrena do grupo espiritual.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, o Ẹgbẹ́ é honrado com oferendas grupais. Comunidades inteiras podem cultuar o mesmo Ẹgbẹ́.',
      brasil:
        'No Brasil, o culto ao Ẹgbẹ́ está presente em terreiros que trabalham com ancestrais e espíritos companheiros.',
    },

    orikis: [
      {
        yoruba:
          'Ẹgbẹ́, Ẹgbẹ́\nÀwọn ọmọ tí a fi aṣẹ rán sí Ayyè\nGbogbo rẹ̀ ń bọ̀ wáyé\nEpa Ẹgbẹ́!',
        traducao:
          'Ẹgbẹ́, Ẹgbẹ́, Os filhos que foram enviados à Terra com o poder. Todos vêm à Terra. Epa Ẹgbẹ́!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Ẹgbẹ́, ẹgbẹ́\nA bọ̀ wáyé lọ́run\nA jọ ọmọ méjì\nEpa Ẹgbẹ́!',
        portugues:
          'Ẹgbẹ́, ẹgbẹ́, Desceu do céu. Reuniu-se como dois filhos. Epa Ẹgbẹ́!',
      },
    ],

    oracoes: [
      'Epa Ẹgbẹ́! Companheiros do meu Orí, que vossa proteção me cubra e que vossa sabedoria me guie. Honro nossa aliança sagrada. Àṣẹ Ẹgbẹ́!',
    ],

    templosHistoricos: [
      'Locais de reunião do Ẹgbẹ́ na Nigéria yorùbá',
      'Círculos espirituais de comunidades yorùbá',
    ],

    influenciaCultural: [
      'Comunidade: O conceito de Ẹgbẹ́ influenciou fortemente a ideia de comunidade na cultura yorùbá.',
      'Solidariedade: O Ẹgbẹ́ ensina que ninguém caminha sozinho.',
      'Espiritualidade grupal: O culto ao Ẹgbẹ́ é uma das práticas mais comunitárias da religião yorùbá.',
    ],

    pesquisasRelacionadas: [
      'Ẹgbẹ́ — Sociedade espiritual dos companheiros',
      'Almas gêmeas na religião yorùbá',
      'Karmicidade e comunidade espiritual',
      'O papel do Ẹgbẹ́ na vida cotidiana',
    ],

    palavrasChaveSEO: [
      'Egbé',
      'Ẹgbẹ́',
      'Companheiro espiritual',
      'Alma gêmea',
      'Comunidade yorùbá',
      'Espíritos companheiros',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Egbé', 'Companheiro espiritual', 'Alma gêmea', 'Comunidade yorùbá'],
      en: ['Egbe', 'Spirit companion', 'Soul mate', 'Yoruba community'],
      es: ['Egbé', 'Compañero espiritual', 'Alma gemela', 'Comunidad yoruba'],
      yo: ['Ẹgbẹ́', 'Omode ẹgbẹ́', 'Ori ẹgbẹ́', 'Ilé ẹgbẹ́'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'O que é Ẹgbẹ́?',
        resposta:
          'Ẹgbẹ́ é a sociedade espiritual dos companheiros — o grupo de almas que cada pessoa escolhe no Orun antes de nascer. São seus companheiros espirituais que a acompanham durante toda a vida.',
      },
      {
        pergunta: 'Como sei quem são meus Ẹgbẹ́?',
        resposta:
          'Um Babalawo pode consultar Ifá para identificar seus Ẹgbẹ́. Pessoas do seu Ẹgbẹ́ geralmente têm conexão imediata e sentem-se como se já se conhecessem.',
      },
      {
        pergunta: 'O que acontece quando alguém morre?',
        resposta:
          'Quando alguém morre, seu Ẹgbẹ́ continua existindo. Os membros falecidos retornam ao Orun, mas permanecem conectados aos vivos através de sonhos e proteção espiritual.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
      'Bascom, William. (1969). "Ifa Divination". Indiana University Press.',
    ],

    pontosCantados: [
      'Epa Ẹgbẹ́!\nẸgbẹ́ a bọ̀ wáyé\nÀwọn ọmọ tí a fi aṣẹ rán sí Ayyè\nGbogbo rẹ̀ ń bọ̀ wáyé\nEpa Ẹgbẹ́!',
    ],

    pontosRiscados: [
      'Àṣẹ Ẹgbẹ́!\nẸgbẹ́ Ọrun\nÀwọn ọmọ méjì\nEpa Ẹgbẹ́!',
    ],
  },

  // ─── 11. Àjagun — Aspecto Guerreiro de Ògún ───
  {
    id: 'orixa-ajagun',
    nome: 'Àjagun',
    nomeYoruba: 'Àjágun',
    nomeLucumi: 'Ajagun',
    nomeIngles: 'Ajagun',
    nomeEspanhol: 'Ajagun',
    variacoesRegionais: ['Àjágun Alágbára', 'Ogun Ajagun', 'Senhor das Batalhas'],
    categoria: 'Orixá',
    linha: 'Guerreiro e Conquista',
    reino: 'Batalhas, Guerra, Conquista, Invencibilidade',
    falange: 'Orixás / Orishas',
    saudacao: 'Opa Ajagun! Epa Ajagun!',
    caracteristicas: ['Aspecto guerreiro puro e feroz de Ògún','Lord of Battles — nunca perde uma batalha','Energia da conquista e da invencibilidade','Invocado antes de batalhas e disputas'],
    simbolos: ['Lança de ferro','Espada','Escudo','Chamas de batalha'],
    cores: ['Verde escuro (guerra)','Preto (força)'],
    elementosNaturais: ['Ferro','Fogo de batalha','Campos de conflito'],
    diaTradicional: 'Terça-feira',

    historiaTradicional:
      'Àjagun é o aspecto guerreiro mais puro e feroz de Ògún, o Lord of Battles. Enquanto Ògún é o Orixá completo que governa o ferro, a guerra, a tecnologia e os caminhos, Àjagun é sua manifestação puramente martial, a fúria da batalha, a sede de conquista, a invencibilidade em combate. Nos mitos yorùbá, Àjagun é descrito como aquele que nunca perde uma guerra, que marcha à frente dos exércitos com sua lança de ferro e que transforma a derrota em vitória. Ele é o protótipo do guerreiro invencível, a energia que move os exércitos, inspira a coragem e garante a vitória. Àjagun é invocado antes de batalhas, disputas legais, competições e qualquer situação que exija força e determinação. Seus seguidores são guerreiros, atletas, advogados e todos os que precisam de coragem e força para superar adversários. Àjagun representa a energia pura da conquista, sem a sabedoria nem a paciência de Ògún — é a fúria bruta canalizada para a vitória.',

    quemFoi:
      'O Aspecto Guerreiro de Ògún — Lord of Battles. A fúria da batalha, a sede de conquista e a invencibilidade em combate.',

    personalidade: [
      'Agressivo — energia pura e indômita',
      'Conquistador — nunca aceita derrota',
      'Implacável — avança sem piedade',
      'Victorious — sua vitória é garantida',
      'Corajoso — enfrenta qualquer adversário',
      'Feroz — inspira medo nos inimigos',
      'Relentless — não para até conquistar',
    ],

    biografia: {
      nascimento:
        'Àjagun surgiu da necessidade de uma energia guerreira mais pura e feroz que a de Ògún. É a manifestação da guerra sem limitações.',
      feitos: [
        'Nunca perdeu uma batalha',
        'Inspira coragem em todos que o invocam',
        'Conquista territórios e vitórias',
        'Quebra as resistências dos inimigos',
        'Ensina a arte da guerra e da conquista',
      ],
      transformacao:
        'De uma qualidade de Ògún a uma entidade独立 e temida do panteão yorùbá.',
    },

    genealogia: {
      pai: 'Ògún (manifestação direta)',
      irmaos: [
        'Todos os aspectos de Ògún',
        'Frequentemente associado a Ọranfe',
      ],
    },

    linhaDoTempoMitica: [
      'A Separação de Ògún — Àjagun surge como aspecto guerreiro puro',
      'A Primeira Batalha — Àjagun conquista sua primeira vitória',
      'A Marcha dos Exércitos — Àjagun se torna o patrono dos guerreiros',
      'A Invencibilidade — Àjagun nunca perde uma batalha',
    ],

    itans: [
      {
        titulo: 'Àjagun e a Batalha Perdida que se Tornou Vitória',
        historia:
          'Conta-se que um rei yorùbá estava prestes a ser derrotado por um exército inimigo muito maior. Desesperado, ele consultou o oráculo e recebeu que deveria invocar Àjagun, não Ògún. O rei fez oferendas a Àjagun, que surgiu no campo de batalha como um guerreiro de ferro coberto de chamas. O exército inimigo, ao ver a energia de Àjagun, entrou em pânico e fugiu sem lutar. O rei venceu a batalha sem perder um único soldado. Desde então, Àjagun é invocado antes de qualquer conflito importante.',
        licao:
          'A presença de Àjagun é suficiente para vencer. Às vezes, a vitória vem não pela força, mas pela energia que se projeta.',
      },
    ],

    dominios: [
      'Batalhas',
      'Guerra',
      'Conquista',
      'Invencibilidade',
      'Coragem',
      'Competição',
      'Disputas Legais',
      'Força Bruta',
    ],

    correspondencias: {
      arvores: ['Árvore de ferro', 'Cedro'],
      locaisNatureza: [
        'Campos de batalha',
        'Encruzilhadas',
        'Locais de conflito',
      ],
      metaisPedras: ['Ferro', 'Aço', 'Pedra de moagem'],
      animais: ['Bode preto', 'Galo de briga', 'Águia'],
    },

    ervas: {
      liturgicas: ['Folha de cedro', 'Erva-de-três-folhas', 'Folha de ferro'],
      medicinais: [
        'Boldo — para fortalecimento espiritual',
        'Erva-cidreira — para acalmar antes da batalha',
      ],
    },

    comidas: ['Carne grelhada', 'Inhame', 'Mel', 'Pimenta'],

    ewoTabus: [
      {
        tabu: 'Invocar Àjagun sem necessidade legítima',
        motivo:
          'Àjagun é energia destrutiva. Invocá-lo sem necessidade pode trazer destruição ao próprio invocador.',
      },
      {
        tabu: 'Recuar de uma batalha justa',
        motivo:
          'Àjagun é o espírito da conquista. Recuar de uma luta justa enfraquece a conexão com o Orixá.',
      },
    ],

    qualidades: [
      {
        nome: 'Àjágun Alágbára',
        descricao:
          'Àjagun Poderoso — a manifestação mais intensa e invencível do guerreiro.',
      },
      {
        nome: 'Ogun Ajagun',
        descricao:
          'Ògún Guerreiro — a qualidade que combina a força de Ògún com a fúria de Àjagun.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'Na Nigéria yorùbá, Àjagun é invocado antes de batalhas e disputas. Guerreiros oferecem sacrifícios antes de marchar.',
      brasil:
        'No Brasil, Àjagun está presente em terreiros que trabalham com a energia guerreira de Ògún.',
    },

    orikis: [
      {
        yoruba:
          'Àjagun, Àjagun\nOlúgun tí kò sí ẹnikẹ́ni tó lè dènà ọ̀rẹ́\nO fi ohun tí ó ṣe fún wa\nOpa Àjagun!',
        traducao:
          'Àjagun, Àjagun, O senhor da guerra que ninguém pode impedir. Ele trouxe o que fez para nós. O bastão de Àjagun!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Àjagun, àjagun\nA jà fún wa\nA bọ̀ wáyé\nOpa Àjagun!',
        portugues:
          'Àjagun, àjagun, Ele lutou por nós. Desceu à Terra. O bastão de Àjagun!',
      },
    ],

    oracoes: [
      'Opa Ajagun! Epa Ajagun! Senhor das batalhas, que vossa força me guie e que vossa coragem me sustente. Em toda batalha, seja ela física ou espiritual, que eu saia vitorioso. Àṣẹ Àjagun!',
    ],

    templosHistoricos: [
      'Campos de batalha sagrados na Nigéria yorùbá',
      'Locais onde exércitos ofereceram sacrifícios a Àjagun',
    ],

    influenciaCultural: [
      'Guerreiros: Àjagun é o patrono espiritual dos guerreiros yorùbá.',
      'Competição: Sua energia é invocada em competições esportivas e disputas.',
      'Advocacia: Advogados invocam Àjagun para causas legais difíceis.',
    ],

    pesquisasRelacionadas: [
      'Àjagun — Aspecto guerreiro de Ògún',
      'A guerra na religião yorùbá',
      'Orixás da batalha',
      'Energia guerreira e espiritualidade',
    ],

    palavrasChaveSEO: [
      'Ajagun',
      'Àjágun',
      'Aspecto guerreiro',
      'Orixá da guerra',
      'Lord of Battles',
      'Ògún',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Ajagun', 'Orixá da guerra', 'Guerreiro', 'Lord of Battles'],
      en: ['Ajagun', 'Warrior aspect', 'Lord of Battles', 'Yoruba war deity'],
      es: ['Ajagun', 'Aspecto guerrero', 'Señor de las Batallas', 'Deidad de la guerra'],
      yo: ['Àjágun', 'Olúgun', 'Ìjà', 'Àṣẹ ogun'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'Qual a diferença entre Àjagun e Ògún?',
        resposta:
          'Ògún é o Orixá completo que governa o ferro, a guerra, a tecnologia e os caminhos. Àjagun é seu aspecto puramente guerreiro, focado apenas na batalha e na conquista, sem a sabedoria nem a paciência de Ògún.',
      },
      {
        pergunta: 'Quando invocar Àjagun?',
        resposta:
          'Àjagun é invocado antes de batalhas, disputas legais, competições e qualquer situação que exija força, coragem e determinação para vencer.',
      },
      {
        pergunta: 'Como ofrecer a Àjagun?',
        resposta:
          'Àjagun aceita oferendas de carne grelhada, mel, pimenta e sangue de bode preto. Suas oferendas são mais intensas que as de Ògún.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
      'Bastide, Roger. (1971). "As Religiões Africanas no Brasil". Editora Pioneira.',
    ],

    pontosCantados: [
      'Opa Ajagun!\nÀjagun, àjagun\nA jà fún wa\nA bọ̀ wáyé\nOpa Àjagun!',
    ],

    pontosRiscados: [
      'Epa Àjagun!\nOlúgun tí kò sí ẹnikẹ́ni tó lè dènà ọ̀rẹ́\nOpa Àjagun!',
    ],
  },

  // ─── 12. Boromu — Orixá do Ferro e da Guerra (Tradição Fon/Dahomey) ───
  {
    id: 'orixa-boromu',
    nome: 'Boromu',
    nomeYoruba: 'Bòròmù',
    nomeLucumi: 'Boromu',
    nomeIngles: 'Boromu',
    nomeEspanhol: 'Boromu',
    variacoesRegionais: ['Bòròmù Alágbára', 'Gu (Fon)', 'Boromu Alágbẹ̀'],
    categoria: 'Orixá',
    linha: 'Ferro e Guerra (Tradição Fon/Dahomey)',
    reino: 'Ferro, Guerra, Tradição, Defesa do Povo',
    falange: 'Orixás / Vodun',
    saudacao: 'Epa Boromu! Àṣẹ Boromu!',
    caracteristicas: ['Orixá do ferro e da guerra na tradição Fon/Dahomey','Guardião das tradições guerreiras do Império do Daomé','Associado a Ògún mas com características próprias','Feroz, tradicional e dedicado à honra e à defesa'],
    simbolos: ['Ferro','Lança','Forja','Escudo tradicional'],
    cores: ['Branco (tradição)','Vermelho (guerra)'],
    elementosNaturais: ['Ferro','Minério','Fogo da forja','Solo do Daomé'],
    diaTradicional: 'Terça-feira',

    historiaTradicional:
      'Boromu é um orixá menos documentado nas fontes ocidentais, mas tradicional e significativo na tradição Fon/Dahomey, atual Benin. Ele é frequentemente associado a Ògún na tradição yorùbá, mas possui características próprias que o distinguem. Boromu é o senhor do ferro e da guerra na tradição Fon, e seu culto era especialmente importante entre os guerreiros do Império do Daomé. Enquanto Ògún yorùbá é o ferreiro e o abridor de caminhos, Boromu é mais especificamente o guerreiro tradicional, o protetor do povo em batalha, o que mantém as tradições de defesa e honra. Seu nome pode ser traduzido como Senhor do Ferro ou Guerreiro de Ferro, referindo-se tanto à sua natureza martial quanto ao metal que governa. Boromu é retratado como um orixá feroz e tradicional, que valoriza acima de tudo a honra, a coragem e a defesa da comunidade. Seus seguidores são guerreiros tradicionais, guardiões das tradições e todos os que defendem seu povo contra ameaças externas. Na tradição brasileira, Boromu às vezes é confundido com Ògún, mas aqueles que mantêm as tradições Fon reconhecem suas diferenças.',

    quemFoi:
      'O Orixá do Ferro e da Guerra na tradição Fon/Dahomey. Guardião das tradições guerreiras e protetor do povo contra ameaças externas.',

    personalidade: [
      'Feroz — energia guerreira pura e tradição',
      'Tradicional — mantém as antigas tradições de defesa',
      'Guerreiro — dedicado à batalha e à proteção',
      'Honrado — valoriza a honra acima de tudo',
      'Protetor — defende seu povo com ferro e fogo',
      'Leal — nunca abandona seus seguidores',
      'Implacável contra os inimigos',
    ],

    biografia: {
      nascimento:
        'Boromu é uma das divindades mais antigas da tradição Fon, que remonta ao Império do Daomé e às comunidades agrícolas e guerreiras do sudeste da Nigéria e do Benin.',
      feitos: [
        'Protegeu o povo Fon/Dahomey em inúmeras batalhas',
        'Mantém as tradições guerreiras vivas',
        'Ensina a arte do manejo do ferro para guerra',
        'Defende a comunidade contra ameaças externas',
        'Inspira coragem e honra nos guerreiros',
      ],
      transformacao:
        'De uma divindade regional Fon a um orixá reconhecido em toda a diáspora africana.',
    },

    genealogia: {
      pai: 'Mawu-Lisa (deuses supremos da tradição Fon)',
      irmaos: [
        'Outros Vodun da tradição Fon',
        'Associado a Ògún na tradição yorùbá',
        'Gu (a versão Fon de Ògún)',
      ],
    },

    linhaDoTempoMitica: [
      'O Nascimento na Tradição Fon — Boromu surge como senhor do ferro no Daomé',
      'A Defesa do Império — Boromu protege os guerreiros do Daomé',
      'A Diáspora — o culto de Boromu chega às Américas',
      'A Fusão com Ògún — Boromu é reconhecido como aspecto de Ògún',
    ],

    itans: [
      {
        titulo: 'Boromu e a Batalha do Daomé',
        historia:
          'Conta-se que, quando o Império do Daomé estava sob ameaça de invasão, os guerreiros clamaram por ajuda a Boromu. Na noite anterior à batalha, todos os guerreiros tiveram o mesmo sonho: Boromu apareceu vestido em ferro, empunhando uma lança que brilhava como relâmpago. Ele disse: Eu sou o ferro, eu sou a defesa do povo. Amanhã, minha lança estará em suas mãos. Na manhã seguinte, os guerreiros do Daomé entraram em batalha com uma força sobre-humana e venceram um exército muito maior. Boromu estava presente no campo, embora invisível aos olhos comuns. Somente os guerreiros podiam senti-lo ao lado deles.',
        licao:
          'A tradição e a honra são armas poderosas. Quando um povo luta por suas tradições, Boromu está ao seu lado.',
      },
      {
        titulo: 'O Ferro de Boromu',
        historia:
          'Um ferreiro Fon estava prestes a desistir de seu trabalho, pois seu ferro não ficava forte o suficiente para fazer armas. Boromu, em sonho, mostrou-lhe um forno especial que usava carvão de uma árvore sagrada. O ferreiro seguiu as instruções e conseguiu forjar o aço mais forte que o Daomé já havia visto. Esse aço foi usado para armar o exército que defendeu o reino por gerações. Boromu ensinou que o ferro, quando tratado com respeito e conhecimento, torna-se a arma mais poderosa do mundo.',
        licao:
          'O ferro é sagrado quando trabalhado com sabedoria e tradição. Boromu honra aqueles que mantêm viva a arte da forja.',
      },
    ],

    dominios: [
      'Ferro',
      'Guerra Tradicional',
      'Defesa do Povo',
      'Tradição e Honra',
      'Forja de Armas',
      'Coragem Guerreira',
      'Proteção Comunitária',
    ],

    correspondencias: {
      arvores: [
        'Árvore de ferro',
        'Cedro',
        'Árvores usadas para carvão de forja',
      ],
      locaisNatureza: [
        'Forjas',
        'Campos de batalha',
        'Locais de defesa comunitária',
      ],
      metaisPedras: [
        'Ferro',
        'Aço',
        'Pedra de moagem',
        'Minério',
      ],
      animais: [
        'Bode preto',
        'Touro',
        'Galo de briga',
      ],
    },

    ervas: {
      liturgicas: [
        'Folha de cedro',
        'Erva-de-três-folhas',
        'Folha de ferro (planta com folhas metálicas)',
      ],
      medicinais: [
        'Boldo — para fortalecimento',
        'Erva-cidreira — para preparação espiritual',
      ],
    },

    comidas: [
      'Carne grelhada',
      'Inhame',
      'Mel',
      'Pimenta',
      'Fubá de milho',
    ],

    ewoTabus: [
      {
        tabu: 'Abandonar a tradição',
        motivo:
          'Boromu é o guardião das tradições. Abandonar o que é sagrado ofende profundamente o orixá.',
      },
      {
        tabu: 'Lutar sem honra',
        motivo:
          'Boromu exige honra em todas as batalhas. Usar trapaças ou agir sem honra enfraquece a conexão.',
      },
    ],

    qualidades: [
      {
        nome: 'Bòròmù Alágbára',
        descricao:
          'Boromu Poderoso — a manifestação mais intensa e guerreira do orixá Fon.',
      },
      {
        nome: 'Gu Boromu',
        descricao:
          'A qualidade Fon de Ògún — a fusão entre Boromu e o orixá yorùbá do ferro.',
      },
    ],

    cultos: {
      tradicionalAfricano:
        'No Benin e no Daomé (atual República do Benin), Boromu é cultuado como o senhor do ferro e da guerra. Seu culto era especialmente importante entre os guerreiros do Império do Daomé.',
      brasil:
        'No Brasil, Boromu está presente em terreiros que mantêm as tradições Fon e Dahomey, frequentemente associado a Ògún.',
    },

    orikis: [
      {
        yoruba:
          'Boromu, Boromu\nOlúgun tí ó ní ohun gbogbo\nO fi ohun tí ó ṣe fún wa\nEpa Boromu!',
        traducao:
          'Boromu, Boromu, O senhor da guerra que possui tudo. Ele trouxe o que fez para nós. Epa Boromu!',
      },
    ],

    cantigas: [
      {
        yoruba:
          'Boromu, boromu\nA jà fún wa o\nÓ bọ̀ wáyé\nEpa Boromu!',
        portugues:
          'Boromu, boromu, Lutou por nós. Desceu à Terra. Epa Boromu!',
      },
    ],

    oracoes: [
      'Epa Boromu! Senhor do ferro e da guerra na tradição Fon, que vossa força e vossa honra me guiem. Protege minha comunidade e mantém vivas as tradições. Àṣẹ Boromu!',
    ],

    templosHistoricos: [
      'Templos do Império do Daomé (República do Benin)',
      'Forjas sagradas na tradição Fon',
      'Locais de culto no sudeste da Nigéria',
    ],

    influenciaCultural: [
      'Tradição Fon: Boromu é uma das divindades mais importantes da tradição Fon/Dahomey.',
      'Império do Daomé: Os guerreiros do Daomé eram devotos de Boromu.',
      'Diáspora: O culto de Boromu chegou às Américas através da diáspora Fon/Dahomey.',
    ],

    pesquisasRelacionadas: [
      'Boromu — Orixá Fon do ferro e da guerra',
      'Vodun na tradição Fon/Dahomey',
      'Império do Daomé e seus orixás',
      'Diferenças entre Boromu e Ògún',
      'Tradições Fon no Brasil',
    ],

    palavrasChaveSEO: [
      'Boromu',
      'Bòròmù',
      'Orixá Fon',
      'Guerra Fon',
      'Ferro',
      'Daomé',
      'Dahomey',
      'Vodun',
    ],

    palavrasChaveMultiIdiomas: {
      pt: ['Boromu', 'Orixá Fon', 'Ferro', 'Guerra', 'Daomé'],
      en: ['Boromu', 'Fon orisha', 'Iron', 'Warfare', 'Dahomey'],
      es: ['Boromu', 'Orisha Fon', 'Hierro', 'Guerra', 'Dahomey'],
      yo: ['Bòròmù', 'Òrìṣà Fon', 'Iron', 'Ogun', 'Daomé'],
    },

    perguntasFrequentes: [
      {
        pergunta: 'Quem é Boromu?',
        resposta:
          'Boromu é o orixá do ferro e da guerra na tradição Fon/Dahomey, atual Benin. Ele é frequentemente associado a Ògún, mas possui características próprias que o distinguem como orixá da tradição e da honra guerreira.',
      },
      {
        pergunta: 'Qual a diferença entre Boromu e Ògún?',
        resposta:
          'Ògún é o orixá yorùbá completo do ferro, da guerra, da tecnologia e dos caminhos. Boromu é mais especificamente ligado à guerra tradicional e à defesa do povo, com ênfase na honra e nas tradições. Boromu é uma tradição Fon/Dahomey, enquanto Ògún é yorùbá.',
      },
      {
        pergunta: 'Boromu é reconhecido no Brasil?',
        resposta:
          'Sim, Boromu está presente em terreiros que mantêm as tradições Fon e Dahomey. No Brasil, frequentemente é associado a Ògún, mas sacerdotes que preservam as tradições Fon o reconhecem como entidade independente.',
      },
    ],

    referencias: [
      'Verger, Pierre Fatumbi. (1995). "Orixás: Deuses Iorubás na África e no Novo Mundo". Editora Corrupio.',
      'Prandi, Reginaldo. (2001). "Mitologia dos Orixás". Editora Companhia das Letras.',
      'Herskovits, Melville J. (1938). "Dahomey: An Ancient West African Kingdom". J.J. Augustin.',
      'Bastide, Roger. (1971). "As Religiões Africanas no Brasil". Editora Pioneira.',
    ],

    pontosCantados: [
      'Epa Boromu!\nBoromu, boromu\nA jà fún wa o\nÓ bọ̀ wáyé\nEpa Boromu!',
    ],

    pontosRiscados: [
      'Àṣẹ Boromu!\nOlúgun tí ó ní ohun gbogbo\nO fi ohun tí ó ṣe fún wa\nEpa Boromu!',
    ],
  },
];

