import { EncyclopediaEntity } from './types';

export const ORIXAS_MIGRADOS_DATA: EncyclopediaEntity[] = [
  {
    id: 'orixa-oxum',
    nome: 'Oxum (Òṣun)',
    nomeYoruba: 'Òṣun',
    nomeLucumi: 'Oshún',
    nomeIngles: 'Oshun',
    nomeEspanhol: 'Oshún',
    variacoesRegionais: ['Oshun', 'Ochún', 'Osum', 'Yeye Odo', 'Iyalode'],
    categoria: 'Orixá',
    linha: 'Águas Doces',
    reino: 'Rios, Cachoeiras, Fertilidade, Ouro',
    falange: 'Orixás / Orishas',
    historiaTradicional: 'Òṣun é a divindade dos rios, da fertilidade, da beleza, do amor e do ouro (riqueza material e espiritual). Nos mitos (Itans), Òṣun é fundamental para a criação do mundo; os outros deuses não conseguiam criar a Terra até pedirem a sua ajuda. No panteão Yoruba, é reverenciada em Osogbo (Nigéria). É senhora dos búzios e da adivinhação ao lado de Èṣù e Ọ̀rúnmìlà. No Brasil, é uma das orixás mais amadas e procuradas, representando a feminidade, a sedução, a maternidade e a prosperidade financeira.',
    quemFoi: 'A Única Mulher entre os 16 Irúnmolẹ̀ originais. Rainha dos Rios, Protetora das Gestantes e Senhora do Ouro.',
    personalidade: [
      'Doce mas guerreira — Yeye Odo (Mãe do Rio)',
      'Vaidosa e elegante — ama espelhos, perfume e ouro',
      'Sedutora e magnética — conquista pelo carinho',
      'Protetora feroz dos filhos e das gestantes',
      'Diplomata — resolve problemas com sabedoria',
      'Maternal — acolhe e nutre',
      'Estrategista — alcança seus objetivos com inteligência',
      'Vingativa quando traída ou desrespeitada',
      'Alegre e festeira — ama música e dança',
      'Justa — cobra o que é seu'
    ],
    biografia: {
      nascimento: 'Uma dos 16 Irúnmolẹ̀ que desceram do Orun ao Aiyê. Ela escolheu o rio como sua morada e se tornou a senhora das águas doces. Em muitos Itans, ela é retratada como a única mulher entre os Orixás primordiais.',
      feitos: [
        'Participou ativa da criação do mundo — sem sua água doce, os outros Orixás não conseguiam firmar a terra',
        'Salvou a humanidade diversas vezes intercedendo junto a Olódùmarè',
        'Estabeleceu a civilização em Osogbo (Nigéria), tornando-se sua rainha',
        'Ensinou aos humanos o valor da vaidade, do amor próprio e da beleza',
        'Trouxe o ouro do Céu para a Terra como símbolo de prosperidade',
        'Mãe de Logunedé (com Ọ̀ṣọ́ọ̀sì)',
        'Protetora de todas as gestantes e crianças não nascidas'
      ],
      transformacao: 'Após seu reinado em Osogbo, Òṣun retornou ao rio para sempre, tornando-se a entidade viva das águas doces.'
    },
    genealogia: {
      pai: 'Olódùmarè (criação direta)',
      irmaos: ['Todos os Irúnmolẹ̀ são seus irmãos', 'Irmã gêmea de Inle (em alguns itans)'],
      esposasMaridos: ['Ọ̀rúnmìlà (em alguns itans)', 'Oxóssi (em alguns itans — pai de Logunedé)', 'Ògún (segundo esposo em alguns mitos)'],
      filhos: ['Logunedé (com Oxóssi)', 'Seus "filhos espirituais" são todas as mães e gestantes que buscam sua proteção']
    },
    linhaDoTempoMitica: [
      'Descida do Orun: Uma dos 16 Irúnmolẹ̀ que escolheram habitar a Terra.',
      'A Criação do Rio: Encontrou o primeiro rio na floresta e o fez sua morada.',
      'Rainha de Osogbo: Reinou sobre a cidade, trazendo prosperidade e justiça.',
      'O Espelho de Ouro: Recebeu de Olódùmarè o Abebê (espelho de latão) como insígnia de poder.',
      'O Sacrifício por Oxóssi: Ofereceu sua proteção ao caçador em troca de amor.',
      'A Cachoeira Eterna: Após a vida terrena, fundiu-se com as águas, tornando-se eterna.'
    ],
    itans: [
      {
        titulo: 'Òṣun e a Criação do Mundo',
        historia: 'Quando os Orixás tentaram firmar a terra, tudo afundava na água. Eles pediram ajuda a Òṣun, mas ela recusou-se inicialmente, pois acreditava que os homens não mereciam sua bondade. Os Orixás imploraram e ela aceitou, derramando suas águas doces ao redor da terra firme, permitindo que os rios nacessem e a vida florescesse. Sem Òṣun, não haveria rios, lagos, nem fertilidade no solo.',
        licao: 'A água doce — o símbolo da maternidade e da fertilidade — é essencial para a vida. Sem a mulher, o mundo não subsiste.'
      },
      {
        titulo: 'O Espelho de Òṣun',
        historia: 'Em Osogbo, Òṣun vivia admirando sua própria beleza nas águas do rio. Certo dia, seu espelho de latão (Abebê) caiu no fundo do rio. Os peixes o encontraram e começaram a brilhar com sua luz, tornando-se os primeiros peixes dourados. Òṣun riu e decretou que todo peixe que vivesse em suas águas seria dourado e sagrado.',
        licao: 'A beleza de Òṣun não é vaidade vazia — é a capacidade de transformar o mundano em sagrado.'
      },
      {
        titulo: 'Òṣun e Ọ̀rúnmìlà',
        historia: 'Ọ̀rúnmìlà consultou Ifá e recebeu que Òṣun deveria ser sua esposa para que sua sabedoria não se perdesse na solidão. Òṣun aceitou, mas impôs uma condição: ele nunca deveria omitir seu nome em nenhuma consulta. Desde então, todo Babalawo que consulta Ifá menciona Òṣun no início da sessão.',
        licao: 'O amor verdadeiro é baseado em respeito mútuo e reconhecimento do valor do outro.'
      },
      {
        titulo: 'A Cachoeira de Osogbo',
        historia: 'Quando Òṣun chegou a Osogbo, a cachoeira não existia. Ela caminhou até um penhasco e, ao se inclinar para beber água, suas lágrimas de alegria criaram a cachoeira que leva seu nome até hoje. O Rio Òṣun (em Osogbo, Nigéria) é Patrimônio Mundial da UNESCO desde 2005.',
        licao: 'As águas de Òṣun são sagradas — todo rio, lago e cachoeira carregam sua energia.'
      },
      {
        titulo: 'Òṣun e o Ouro Perdido',
        historia: 'Um dia, Òṣun perdeu todas as suas joias no fundo do rio. Um pobre pescador as encontrou e, em vez de guardá-las, devolveu tudo a ela. Òṣun, grata, o abençoou com riqueza infinita e proteção eterna. Aquele pescador tornou-se o primeiro Babalawo rico da história.',
        licao: 'A honestidade com Òṣun sempre é recompensada — ela ama quem devolve o que não é seu.'
      }
    ],
    dominios: ['Águas Doces', 'Fertilidade', 'Beleza', 'Amor', 'Ouro e Riqueza', 'Maternidade', 'Adivinhação (Búzios)', 'Música e Dança', 'Beleza Feminina'],
    correspondencias: {
      arvores: ['Dendezeiro', 'Bananeira', 'Mirta', 'Vassourinha', 'Folha de Limão'],
      locaisNatureza: ['Rios', 'Cachoeiras', 'Lagos', 'Fontes de água doce', 'Cascatas'],
      metaisPedras: ['Ouro', 'Cobre', 'Latão', 'Obsidiana', 'Quartzo rosa'],
      animais: ['Pato', 'Peixe dourado', 'Carneiro', 'Golfinho', 'Flamingo']
    },
    ervas: {
      liturgicas: ['Folha de Limão', 'Dendezeiro', 'Mirta', 'Erva-doce', 'Alfavaca-do-careta'],
      medicinais: ['Folha de Abacate', 'Guiné', 'Erva-cidreira', 'Alfavaca-do-mato']
    },
    comidas: ['Mel', 'Amendoim', 'Batata-doce cozida', 'Frutas amarelas (banana, abacaxi)', 'Acarajé'],
    ewoTabus: [
      { tabu: 'Água salgada', motivo: 'Òṣun é senhora das águas doces; a água salgada é domínio de Iemanjá e pode confundir suas energias.' },
      { tabu: 'Beber álcool em excesso', motivo: 'Embora aceite vinho de palma, a embriaguez ofende a elegância e a sobriedade de Òṣun.' },
      { tabu: 'Coisas sujas ou malcheirosas', motivo: 'Òṣun ama perfume, limpeza e brilho. O sujo afasta sua presença.' }
    ],
    qualidades: [
      { nome: 'Òṣun Apará', descricao: 'A guerreira mais feroz de Òṣun, ligada à defesa dos oprimidos e à justiça.' },
      { nome: 'Òṣun Ipondá', descricao: 'A mãe protetora, ligada ao parto e à gravidez saudável.' },
      { nome: 'Òṣun Karé', descricao: 'A sedutora, a mais bela e encantadora, ligada ao amor e à paixão.' },
      { nome: 'Òṣun Abotô', descricao: 'A sábia, ligada à adivinhação e ao conhecimento ancestral.' },
      { nome: 'Òṣun Colá', descricao: 'A mãe dos rios, ligada à fertilidade das águas e dos campos.' },
      { nome: 'Òṣun Muiwa', descricao: 'A graciosa, ligada à música, à dança e à arte.' }
    ],
    diaTradicional: 'Sábado (Candomblé) / Sexta-feira (em muitas tradições)',
    saudacao: 'Ora Yeye O! (Ore Yeye o!) — Salve a Mãe do Rio!',
    cultos: {
      tradicionalAfricano: 'Em Osogbo (Nigéria), o Festival anual do Rio Òṣun é um dos maiores eventos religiosos da África. Milhares de devotos vão ao Rio Òṣun para banhar-se e fazer oferendas. O Santuário de Òṣun-Osogbo é Patrimônio Mundial da UNESCO.',
      brasil: 'No Candomblé, Òṣun é uma das orixás mais cultuadas. Suas filhas são mulheres elegantes, sedutoras e protetoras. Seus filhos são homens carismáticos e diplomáticos. O assentamento inclui espelho de latão (Abebê), búzios e água doce com mel.',
      cuba: 'Na Santería, Oshún é sincretizada com a Virgem de Cobre (Virgen de la Caridad del Cobre), padroeira de Cuba. Seu feriado é o dia 8 de setembro. Ela é a orisha do amor, da fertilidade e do ouro.',
      eua: 'Nos EUA, Oshún é cultuada tanto na tradição Lukumí quanto no Isese. É uma das orishas mais populares entre as mulheres afro-americanas que se reconnectam com a fé Yorùbá.',
      europa: 'Na Europa, Oshún é cultuada em terreiros brasileiros e cubanos. Em Portugal e Espanha, ganha cada vez mais seguidores.'
    },
    orikis: [
      {
        yoruba: 'Òṣun yè yé, Òṣun yè yé, Òṣun yè yé, òun ni ìyá mi.',
        traducao: 'Òṣun, oh! Òṣun, oh! Òṣun, oh! Ela é a minha mãe.'
      },
      {
        yoruba: 'Ìyá mi òṣun, a rò gbò gbò, a dìde li òun.',
        traducao: 'Minha mãe Òṣun, ela flutua e se levanta sozinha.'
      },
      {
        yoruba: 'Òṣun àwọ̀ ewé, aláròpò ẹ̀wù.',
        traducao: 'Òṣun da cor das folhas, a que veste roupas coloridas.'
      }
    ],
    cantigas: [
      {
        yoruba: 'Ei, yeye ô! Ore yeye ô! Oi, yeye ô! Yeye, yeye, yeye ô!',
        portugues: 'Oi, mãe do rio! Salve a mãe do rio!'
      },
      {
        yoruba: 'Òṣun ìyá mi, àbò rere, àbò rere.',
        portugues: 'Òṣun minha mãe, proteção boa, proteção boa.'
      },
      {
        yoruba: 'Iyalode òde osogbo, ìyá mi òṣun.',
        portugues: 'Rainha de Osogbo, minha mãe Òṣun.'
      }
    ],
    oracoes: [
      'Òṣun, Yeye O, Mãe do Rio, Protetora das Gestantes, concede-me saúde, amor e prosperidade. Que tuas águas doces limpem meu caminho e tragam abundance à minha vida. Àṣẹ!',
      'Iyá mi Òṣun, a gbé O ga, a fi ọwọ́ O bọ̀. Olódùmarè fi O sílẹ̀ fun awọn ọmọ Rẹ̀. Àṣẹ!'
    ],
    templosHistoricos: [
      'Rio Òṣun, Osogbo (Nigéria) — Patrimônio Mundial da UNESCO',
      'Sagrado Bosque de Òṣun-Osogbo',
      'Templo de Òṣun em Abeokuta (Nigéria)',
      ' terreiros de Candomblé no Brasil (Salvador, Recife, Rio de Janeiro)',
      'Casa de Oshún em Havana (Cuba)'
    ],
    influenciaCultural: [
      'Festival do Rio Òṣun — evento cultural e religioso mundialmente reconhecido',
      'Representação na música pop e no cinema',
      'Símbolo do feminino africano na diáspora',
      'Referência em estudos de gênero e religião',
      'Influência na moda e na arte contemporânea afro-brasileira'
    ],
    palavrasChaveSEO: [
      'oxum', 'orixa oxum', 'banho de oxum', 'filhas de oxum',
      'oshun', 'ora yeye o', 'orixá do amor', 'orixá do ouro',
      'cachoeira de oxum', 'osogbo oxum', 'oxum no candomblé',
      'oxum santeria', 'virgem de cobre oxum', 'oxum fertilidade',
      'qualidades de oxum'
    ],
    palavrasChaveMultiIdiomas: {
      pt: ['oxum', 'orixa oxum', 'banho de oxum', 'filhas de oxum', 'oshun', 'ora yeye o', 'amor', 'ouro'],
      en: ['oshun', 'orisha of love', 'osun river', 'osogbo festival', 'osun fertility', 'yoruba goddess', 'osun osogbo', 'oshun offerings'],
      es: ['oshún', 'orisha del amor', 'osun', 'osogbo', 'virgen de la caridad', 'orisha de la fertilidad', 'oshún santería', 'oro oshún'],
      yo: ['Òṣun', 'Yeye O', 'Iyá mi Òṣun', 'Ìyálòde', 'Òṣun-Osogbo', 'Aláròpò ẹ̀wù', 'Ìwọ̀ Yeye', 'Ore Yeye ô']
    },
    pesquisasRelacionadas: [
      'Como fazer banho de Oxum',
      'Oração para Oxum trazer o amor',
      'Características dos filhos de Oxum',
      'Festival do Rio Òṣun em Osogbo',
      'Diferença entre Oxum e Iemanjá',
      'Oferendas para Oxum',
      'Qualidades de Oxum no Candomblé',
      'Oxum e a Virgem de Cobre'
    ],
    perguntasFrequentes: [
      { pergunta: 'O que pedir para Òṣun?', resposta: 'Òṣun é procurada para abertura financeira (ouro), problemas de fertilidade e gestação, adoçamento amoroso, proteção feminina e paz de espírito.' },
      { pergunta: 'Qual a cor de Òṣun?', resposta: 'Ouro, amarelo e laranja são as cores tradicionais. No Brasil, também é associada ao rosa e ao coral.' },
      { pergunta: 'Òṣun e Oxum são a mesma?', resposta: 'Sim. Oxum é a grafia brasileira de Òṣun. A diferença é apenas na pronúncia regional.' },
      { pergunta: 'Como é uma filha de Òṣun?', resposta: 'Geralmente mulheres bonitas, vaidosas, carismáticas, amorosas, protetoras, diplomáticas e com facilidade para o comércio e as finanças.' },
      { pergunta: 'Òṣun aceita flores?', resposta: 'Sim, especialmente flores amarelas, rosas amarelas, violetas e flores do campo. O mel também é uma oferta perfeita.' }
    ],
    referencias: [
      'Pierre Verger — Orixás: Deuses Iorubás no Brasil',
      'Reginaldo Prandi — Mitologia dos Orixás',
      'Joelho Sobral — Os Orixás no Brasil',
      'Wande Abimbola — Ifá Divination Poetry',
      'Fatunmbi — Oshun: Yoruba Goddess of Love',
      'Santería Church of the Orishas — Oshún',
      'UNESCO — Sacred Grove of Osun-Osogbo'
    ],
    pontosCantados: [
      'Nessa cidade todo mundo é de Òṣun, menos eu que sou de Ọ̀ṣọ́ọ̀sì.',
      'Eu vi a mamãe Òṣun na cachoeira, banhando-se com ouro.',
      'Òṣun yè yé, Òṣun yè yé, yeye ô!',
      'Iyalode òde Osogbo, ìyá mi òṣun, yeye ô!'
    ],
    pontosRiscados: [
      'O Abebê (espelho de latão) é o símbolo principal — representa a beleza e a verdade de Òṣun.',
      'O Yoko (trono) de Òṣun é feito de madeira pintada de amarelo com búzios.',
      'O símbolo do rio (ondas douradas) é frequentemente usado para representá-la.'
    ]
  },
  {
    id: 'orixa-iemanja',
    nome: 'Iemanjá (Yemọja)',
    nomeYoruba: 'Yemọja',
    nomeLucumi: 'Yemayá',
    nomeIngles: 'Yemaya',
    nomeEspanhol: 'Yemayá',
    variacoesRegionais: ['Yemoja', 'Iemanjá', 'Madre de Agua', 'Nanutricá'],
    categoria: 'Orixá',
    linha: 'Águas Salgadas',
    reino: 'Oceanos, Mares, Rio Ogun',
    falange: 'Orixás / Orishas',
    historiaTradicional: 'Yemọja (Iemanjá) é a grande mãe dos Orixás e dos seres humanos. Originalmente divindade do Rio Ogun na Nigéria, no Brasil e em Cuba (Yemayá) tornou-se a deusa suprema dos oceanos. Representa a maternidade, a acolhida, a proteção mental (ori) e o lar. É uma das divindades mais populares do Brasil, recebendo oferendas massivas em 2 de Fevereiro e 31 de Dezembro. Sua força é a da água salgada — infinita, profundamente conectada com a lua, os maremotos e a origem da vida.',
    quemFoi: 'A Mãe Suprema de todos os Orixás. Guardiã dos oceanos e protetora da humanidade. Uma das mais poderosas forças da natureza na cosmologia Yorùbá.',
    personalidade: [
      'Acolhedora e maternal — acolhe todos como filhos',
      'Protetora feroz — revida contra quem ameaça seus filhos',
      'Severa quando desrespeitada',
      'Misteriosa como o oceano profundo',
      'Generosa e abundante',
      'Lunar — ligada às marés e aos ciclos',
      'Fortaleza emocional — sustenta a família',
      'Regente da mente (Ori)'
    ],
    biografia: {
      nascimento: 'Uma dos 16 Irúnmolẹ̀ originais. Filha de Olódùmarè. Escolheu o Rio Ogun na Nigéria como sua primeira morada. No Brasil, suas águas se expandiram para o oceano.',
      feitos: [
        'Mãe de todos os Orixás (na maioria dos itans)',
        'Criou o oceano ao chorar pela perda de seu filho',
        'Salvou a humanidade das águas primordiais',
        'Protetora dos marinheiros e pescadores',
        'Regente da mente e da consciência humana',
        'Mãe de Xangô, Ogum, Oxóssi, Oya (em diferentes versões)',
        'Símbolo da maternidade universal'
      ],
      transformacao: 'Do Rio Ogun à senhora de todos os oceanos — sua energia expandiu com a diáspora africana.'
    },
    genealogia: {
      pai: 'Olódùmarè',
      irmaos: ['Todos os Irúnmolẹ̀'],
      esposasMaridos: ['Ọba (em alguns itans)', 'Ọ̀rúnmìlà (em alguns mitos)', 'Ògún (em algumas tradições)'],
      filhos: ['Ṣàngó (Xangô)', 'Ọ̀ṣọ́ọ̀sì (Oxóssi)', 'Ògún (em alguns itans)', 'Ọya (Iansã — em alguns mitos)', 'Todos os seres humanos são seus filhos']
    },
    linhaDoTempoMitica: [
      'Descida do Orun: Chegou ao Rio Ogun na Nigéria.',
      'Mãe dos Orixás: Deu à luz todos os orixás menores.',
      'A Expansão para o Oceano: Com a diáspora, suas águas se tornaram salgadas.',
      'O Luto: Ao perder um filho, suas lágrimas criaram o oceano.',
      'O Festival de 2 de Fevereiro: Tradição brasileira de oferendas na praia.'
    ],
    itans: [
      {
        titulo: 'As Lágrimas de Yemọja',
        historia: 'Quando Yemọja perdeu um de seus filhos mais preciosos, seu choro foi tão intenso que suas lágrimas transbordaram do rio e criaram o oceano. Até hoje, as marés são seus suspires de mãe.',
        licao: 'O amor de uma mãe é infinito como o oceano — suas lágrimas podem moldar o mundo.'
      },
      {
        titulo: 'Yemọja e Xangô',
        historia: 'Xangô, seu filho, era impaciente e queria governar antes da hora. Yemọja o castigou afogando-o nas águas, mas depois o ressuscitou com seu leite materno. Xangô nunca mais desobedeceu.',
        licao: 'A mãe castiga por amor, e o amor da mãe é mais forte que a morte.'
      },
      {
        titulo: 'O Presente das Pérolas',
        historia: 'Yemọja abriu o ventre do oceano e entregou às mulheres as pérolas como presentes de fertilidade. Cada pérola é uma lágrima sua transformada em beleza.',
        licao: 'A fertilidade é o maior presente que a mãe natureza oferece.'
      }
    ],
    dominios: ['Oceanos', 'Maternidade', 'Proteção', 'Mente (Ori)', 'Fertilidade', 'Lunar', 'Marés', 'Lar e Família'],
    correspondencias: {
      arvores: ['Bananeira', 'Coqueiro', 'Oiti'],
      locaisNatureza: ['Oceano', 'Praias', 'Rios largos', 'Foz dos rios', 'Costas rochosas'],
      metaisPedras: ['Prata', 'Pérolas', 'Coral', 'Obsidiana azul'],
      animais: ['Peixe', 'Cavalo-marinho', 'Tartaruga', 'Baleia', 'Corvo-marinho']
    },
    ervas: {
      liturgicas: ['Agrião', 'Alface-mansa', 'Espada-de-São-Jorge', 'Agapanto', 'Lírio-branco'],
      medicinais: ['Erva-mate', 'Guiné', 'Unha-de-gato']
    },
    comidas: ['Melancia', 'Abacaxi', 'Frutas do mar', 'Arroz com leite de coco', 'Canja de galinha'],
    ewoTabus: [
      { tabu: 'Banana-maçã', motivo: 'Iemanjá não gosta de bananas pequenas, associadas a energias infantis demais para sua grandeza.' },
      { tabu: 'Azeite de dendê nas oferendas do mar', motivo: 'O dendê é quente e fogo — as águas salgadas de Iemanjá são frias e profundas.' },
      { tabu: 'Azeite doce nas oferendas de Iemanjá', motivo: 'O azeite doce é domínio de outros orixás; Iemanjá prefere manteiga de garrafa.' }
    ],
    qualidades: [
      { nome: 'Yemọja Okuté', descricao: 'A mãe pedregosa, dura, que castiga com severidade.' },
      { nome: 'Yemọja Atorí', descricao: 'A mãe da cabeça (Ori), protetora da mente e da consciência.' },
      { nome: 'Yemọja Olokun', descricao: 'A versão profunda, ligada aos abismos marinhos e aos mistérios.' },
      { nome: 'Yemọja Nana', descricao: 'A mãe ancestral, ligada à sabedoria e à velhice.' }
    ],
    diaTradicional: 'Sábado',
    saudacao: 'Odoyá! Omi o! (Erù-Iyá!) — Salve a Mãe das Águas!',
    cultos: {
      tradicionalAfricano: 'Na Nigéria, Yemọja é cultuada no Rio Ogun. O festival anual reúne milhares de devotos que levam oferendas ao rio.',
      brasil: 'No Brasil, é sincretizada com Nossa Senhora dos Navegantes. Em 2 de fevereiro, milhares de fiéis levam flores e oferendas ao mar. No Candomblé, é uma das orixás mais poderosas.',
      cuba: 'Na Santería, Yemayá é uma das orixás mais reverenciadas. Sincretizada com a Virgem de Regla. Seu feriado é 7 de setembro.',
      eua: 'Yemayá é uma das orixás mais cultuadas na diáspora, especialmente em Miami e Nova York.',
      europa: 'Na Europa, Yemayá ganha seguidores crescentes, especialmente em Portugal e Espanha.'
    },
    orikis: [
      {
        yoruba: 'Yemọja ọ̀sọ̀, a rọ gbò gbò, a dìde li òun.',
        traducao: 'Yemọja da saudação, ela se levanta e flutua.'
      },
      {
        yoruba: 'Ìyá mi Yemọja, a gbé O ga, a fi ọwọ́ O bọ̀.',
        traducao: 'Minha mãe Yemọja, nós Te elevamos, com as mãos Te cumprimentamos.'
      }
    ],
    cantigas: [
      {
        yoruba: 'Odoiá, odoiá, rainha do mar, Yemayá!',
        portugues: 'Odoyá, odoyá, rainha do mar, Iemanjá!'
      },
      {
        yoruba: 'Yemayá aché, Yemayá aché, omi olodo.',
        portugues: 'Yemayá tem poder, Yemayá tem poder, água do rio.'
      }
    ],
    oracoes: [
      'Yemọja, mãe de todos os Orixás, senhora dos oceanos, protege nossos filhos e nossa família. Que tuas águas nos lavem de todo mal e nos tragam paz. Odoyá! Àṣẹ!'
    ],
    templosHistoricos: [
      'Rio Ogun (Nigéria) — morada original',
      'Praias do Rio de Janeiro (REDE — Registro do Patrimônio Imaterial)',
      'Terreiros de Candomblé da Bahia',
      'Templo de Yemayá em Havana (Cuba)',
      'Igreja de Nossa Senhora dos Navegantes (Sincretismo)'
    ],
    influenciaCultural: [
      'Festa de 2 de Fevereiro — maior evento religioso popular do Brasil',
      'Sincretismo com Nossa Senhora dos Navegantes',
      'Referência na música popular brasileira (Iemanjá — various songs)',
      'Símbolo da maternidade na cultura afro-brasileira',
      'Presença em filmes e literatura sobre religião afro-brasileira'
    ],
    palavrasChaveSEO: [
      'iemanja', 'yemaya', 'orixa iemanja', 'festa de iemanja',
      'filhos de iemanja', 'rainha do mar', '2 de fevereiro iemanja',
      'yemaya santeria', 'orixá do mar', 'iemanja candomblé',
      'oda iemanja', 'oferecimento iemanja', 'iemanja praia',
      'qualidades de iemanja', 'iemanja umbanda'
    ],
    palavrasChaveMultiIdiomas: {
      pt: ['iemanjá', 'yemaya', 'rainha do mar', 'orixá do mar', 'oda iemanjá', '2 de fevereiro', 'candomblé'],
      en: ['yemaya', 'yoruba ocean goddess', 'yemaya festival', 'yemaya offerings', 'queen of the sea', 'yoruba mother goddess', 'february 2'],
      es: ['yemayá', 'orisha del mar', 'virgen de regla', 'yemayá santería', 'reina del mar', 'yemayá festival', 'diosas yoruba'],
      yo: ['Yemọja', 'Odoyá', 'Ìyá mi Yemọja', 'Omi olodo', 'Yemọja Ọ̀sọ̀', 'Alágbára Omi', 'Yemọja Okuté', 'Ìyálòde Omi']
    },
    pesquisasRelacionadas: [
      'Festa de Iemanjá 2 de fevereiro',
      'Como ofertar a Iemanjá na praia',
      'Características dos filhos de Iemanjá',
      'Iemanjá e Nossa Senhora dos Navegantes',
      'Oferendas de Iemanjá',
      'Qualidades de Iemanjá',
      'Banho de Iemanjá',
      'Iemanjá e Xangô — mãe e filho'
    ],
    perguntasFrequentes: [
      { pergunta: 'O que significa Odoyá?', resposta: 'É a saudação a Iemanjá, que se traduz como "Salve a Senhora das Águas" ou "Mãe do Rio".' },
      { pergunta: 'Qual o dia de Iemanjá?', resposta: 'No Brasil, 2 de Fevereiro é a data mais famosa. Em Cuba, 7 de Setembro. Em algumas tradições, Sábado.' },
      { pergunta: 'Iemanjá e Yemọja são a mesma?', resposta: 'Sim. Iemanjá é a grafia brasileira; Yemọja é a grafia Yorùbá original; Yemayá é a grafia cubana.' }
    ],
    referencias: [
      'Pierre Verger — Orixás: Deuses Iorubás no Brasil',
      'Reginaldo Prandi — Mitologia dos Orixás',
      'Candomblé — Tradição Oral',
      'Lilia Moritz Schwarcz — As Barbas do Imperador',
      'Juno — Yemayá and the Orishas'
    ],
    pontosCantados: [
      'Retira a jangada do mar, mãe d\'água mandou avisar.',
      'Odoiá, odoiá, rainha do mar.',
      'Yemayá aché, Yemayá aché, omi olodo.'
    ],
    pontosRiscados: [
      'O espelho prateado (Abebê) — símbolo da superfície do mar.',
      'As pérolas e conchas — representam a riqueza do oceano.',
      'A coroa de prata com estrelas — insírnia de Rainha dos Mares.'
    ]
  },
  {
    id: 'orixa-xango',
    nome: 'Xangô (Ṣàngó)',
    nomeYoruba: 'Ṣàngó',
    nomeLucumi: 'Changó',
    nomeIngles: 'Shango',
    nomeEspanhol: 'Changó',
    variacoesRegionais: ['Shangó', 'Changó', 'Xangô', 'Jakuta', 'Obakosso'],
    categoria: 'Orixá',
    linha: 'Fogo e Justiça',
    reino: 'Pedreiras, Trovões, Relâmpagos, Justiça',
    falange: 'Orixás / Orishas',
    historiaTradicional: 'Ṣàngó é o Orixá da justiça, dos raios, do trovão e do fogo. Foi o quarto Rei (Alaafin) de Oyo, deificado após sua vida na Terra. Xangô é a lei, o equilíbrio, aquele que castiga os mentirosos e protege os justos. Ele cospe fogo e carrega seu machado duplo (Oxê), que representa a justiça imparcial que corta para ambos os lados. Sua鼓 (bateria) ecoa como trovão. Sua energia é intensa, apaixonada e temida.',
    quemFoi: 'O quarto Rei de Oyo, o mais poderoso dos governantes Yorùbá. Deificado após a morte, tornou-se o Orixá da Justiça e dos Raios.',
    personalidade: [
      'Justiceiro — pune os injustos sem piedade',
      'Temperamental — sua fúria é como trovão',
      'Poderoso — o mais forte dos Orixás guerreiros',
      'Orgulhoso — não tolera desrespeito',
      'Estrategista — vence batalhas com inteligência',
      'Justo — equilibra poder com retidão',
      'Apaixonado — ama intensamente',
      'Generoso com os leais'
    ],
    biografia: {
      nascimento: 'Quarto Rei de Oyo, filho de Oranyan (ou Orangun). Reinou com poder absoluto.',
      feitos: [
        'Governou Oyo com justiça e prosperidade',
        'Derrotou inimigos com poder de trovão',
        'Estabeleceu o sistema de justiça Yorùbá',
        'Deu nome à cidade de Oyo',
        'Transformou-se em Orixá após a morte',
        'Senhor de todas as pedreiras do mundo'
      ],
      transformacao: 'Após sua morte violenta (afogou-se ou explodiu em fogo), sua energia foi reconhecida como divina.'
    },
    genealogia: {
      pai: 'Oranyan (Orangun)',
      mae: 'Toromade (em alguns itans)',
      irmaos: ['Dadá Ajaká (irmão mais velho)', 'Aganjú (meio-irmão)'],
      esposasMaridos: ['Ọ̀ṣun (Oxum)', 'Ọya (Iansã) — primeira esposa', 'Obá (Obá)'],
      filhos: ['Aganjú (em alguns itans)', 'Ladigbo', 'Ogun']
    },
    linhaDoTempoMitica: [
      'Nascimento: Filho de Oranyan, nasceu com poder de trovão.',
      'Ascensão ao Trono: Tornou-se o quarto Rei de Oyo.',
      'Guerras: Conquistou vizinhos e expandiu o império.',
      'Casamento com Ọya: Uniu-se à guerreira dos ventos.',
      'Queda: Em um acesso de fúria, destruiu parte de Oyo.',
      'Morte e Apotheose: Afogou-se ou explodiu em fogo, tornando-se Orixá.'
    ],
    itans: [
      {
        titulo: 'A Morte de Ṣàngó',
        historia: 'Ṣàngó, em um acesso de fúria contra seus inimigos, invocou tantos raios que a terra tremeu. Quando percebeu que também havia atingido inocentes, seu orgulho não o deixou pedir desculpas. Ele correu para o rio e se afogou, mas sua energia se transformou em trovão que ecoa até hoje.',
        licao: 'O poder sem sabedoria destrói até quem o possui. A justiça precisa de equilíbrio.'
      },
      {
        titulo: 'O Machado Duplo (Oxê)',
        historia: 'Ṣàngó forjou o Oxê (machado duplo) com ferro sagrado. O machado representa a justiça — um lado corta para a direita (os justos) e o outro para a esquerda (os injustos). Nenhum machado é tão poderoso quanto o de Xangô.',
        licao: 'A justiça divina é imparcial — ela corta para todos os lados sem exceção.'
      },
      {
        titulo: 'Ṣàngó e Ọya',
        historia: 'Ọya era uma guerreira mortal que Ṣàngó amou. Ele a transformou em Orixá dos ventos para que ela pudesse lutar ao seu lado eternamente. Juntos,他们是tempestade mais temida do universo Yorùbá.',
        licao: 'O amor verdadeiro transforma — Ṣàngó deu a Ọya a imortalidade através do amor.'
      },
      {
        titulo: 'O Castigo dos Mentirosos',
        historia: 'Um homem mentiu para Ṣàngó sobre um pecado. No dia seguinte, um raio atingiu sua casa e o matou. Desde então, ninguém ousa mentir diante do Oxê de Ṣàngó.',
        licao: 'A mentira é o pecado mais odiado por Ṣàngó — a verdade é sua lei absoluta.'
      },
      {
        titulo: 'Dadá Ajaká e o Trono',
        historia: 'Dadá Ajaká era o irmão mais velho, mas era covarde e indeciso. Ṣàngó o derrotou em combate e tomou o trono. Dadá fugiu e nunca mais retornou, mas Ṣàngó sempre o respeitou como irmão.',
        licao: 'O poder legítimo vem da coragem, não da senioridade.'
      }
    ],
    dominios: ['Justiça', 'Raios e Trovões', 'Fogo', 'Pedreiras', 'Batalhas', 'Drumming (Batucada)', 'Virilidade', 'Poder Real'],
    correspondencias: {
      arvores: ['Árvore de ferro (Iroko)', 'Dendezeiro', 'Pereira'],
      locaisNatureza: ['Pedreiras', 'Montanhas altas', 'Locais onde caem raios', 'Quedas d\'água'],
      metaisPedras: ['Ferro', 'Meteorito (Edun Ara)', 'Obsidiana', 'Granada'],
      animais: ['Bode', 'Carneiro', 'Pássaro-rio (martim-pescador)', 'Cavalo']
    },
    ervas: {
      liturgicas: ['Iná-òrìṣà (folha de ferro)', 'Araba', 'Abre-caminho', 'Pimenta-de-macaco'],
      medicinais: ['Guiné', 'Erva-cidreira', 'Capim-limão']
    },
    comidas: ['Amalá (caruru de quiabo)', 'Carne de bode assada', 'Farinha de mandioca', 'Azeite de dendê'],
    ewoTabus: [
      { tabu: 'Mentira', motivo: 'Ṣàngó castiga mentirosos com raios. A mentira é seu tabu absoluto.' },
      { tabu: 'Cuscuz (em alguns itans)', motivo: 'Associado à traição na história de Xangô e Oxum.' },
      { tabu: 'Crueldade com animais', motivo: 'Ṣàngó respeita a vida animal — sacrifícios são feitos com respeito.' }
    ],
    qualidades: [
      { nome: 'Ṣàngó Obakosso', descricao: 'O rei guerreiro, mais agressivo e destrutivo.' },
      { nome: 'Ṣàngó Alufá', descricao: 'O sacerdote sábio, mais pacífico e conselheiro.' },
      { nome: 'Ṣàngó Omirã', descricao: 'O pai de todos, ligado à ancestralidade.' },
      { nome: 'Ṣàngó Jakutá', descricao: 'O que lança pedras (raios), o mais temido.' },
      { nome: 'Ṣàngó Sabá', descricao: 'O rei de Oyo, o governante justo.' }
    ],
    diaTradicional: 'Quarta-feira',
    saudacao: 'Kaô Kabecilé! Kaô! — Salve o Rei da Justiça!',
    cultos: {
      tradicionalAfricano: 'Ṣàngó é o Orixá mais reverenciado em Oyo (Nigéria). O Festival de Ṣàngó é um dos maiores eventos do povo Yorùbá.',
      brasil: 'No Candomblé, Xangô é sincretizado com São Jerônimo. No Batuque (Rio Grande do Sul), é o Orixá mais cultuado.',
      cuba: 'Na Santería, Changó é sincretizado com Santa Bárbara. Seu feriado é 4 de dezembro.',
      eua: 'Changó é cultuado na tradição Lukumí, especialmente em comunidades cubanas.',
      europa: 'Na Europa, Xangô ganha seguidores através do Candomblé e da Santería.'
    },
    orikis: [
      {
        yoruba: 'Ṣàngó obà tòye, Ṣàngó alágbára, a gbé O ga.',
        traducao: 'Xangô, o rei que usa a máscara, Xangô o poderoso, nós Te exaltamos.'
      },
      {
        yoruba: 'Òde òde, ọba tí kò sí bí Rẹ̀, Ṣàngó.',
        traducao: 'Em todo lugar, o rei incomparável, Xangô.'
      },
      {
        yoruba: 'Kò sí ẹnikẹ́ni tó bá máa fi ọwọ́ rẹ̀ fi ọwọ́ Rẹ̀ sílẹ̀.',
        traducao: 'Ninguém é capaz de igualá-lo em poder.'
      }
    ],
    cantigas: [
      {
        yoruba: 'Machado de Ṣàngó cortou, cortou, não parou!',
        portugues: 'O machado de Xangô cortou, cortou, não parou!'
      },
      {
        yoruba: 'Pedra rolou na pedreira, segura o ponto meu pai.',
        portugues: 'Pedra rolou na pedreira, segura o ponto meu pai.'
      },
      {
        yoruba: 'Kaô kabecilé, kaô kabecilé, Ṣàngó!',
        portugues: 'Salve o poderoso, salve o poderoso, Xangô!'
      }
    ],
    oracoes: [
      'Ṣàngó, rei de Oyo, senhor dos raios, concede-me justiça e coragem. Que teu Oxê proteja meus caminhos e puna os injustos. Kaô Kabecilé! Àṣẹ!'
    ],
    templosHistoricos: [
      'Oyo (Nigéria) — antiga capital do império de Xangô',
      'Koso — local onde Xangô se transformou em Orixá',
      'Terreiros de Candomblé Ketu',
      'Igreja de Santa Bárbara (Sincretismo em Cuba)',
      'Templos de Batuque no Rio Grande do Sul'
    ],
    influenciaCultural: [
      'Representação na música — Xangô é tema de centenas de pontos cantados',
      'Influência na justiça Yorùbá — seu machado é símbolo de equidade',
      'Presença na literatura e no cinema',
      'Referência na arte afro-brasileira',
      'Festival de Xangô em Oyo — evento internacional'
    ],
    palavrasChaveSEO: [
      'xango', 'orixa xango', 'shango', 'justiça divina xango',
      'kao kabecile', 'orixá do raio', 'machado de xango',
      'xango candomblé', 'changó santería', 'qualidades de xango',
      'xango e oxum', 'xango e iansã', 'amalá de xango',
      'ponto de xango', 'santa bárbara xango'
    ],
    palavrasChaveMultiIdiomas: {
      pt: ['xangô', 'orixá da justiça', 'raios', 'kabecilé', 'amalá', 'machado duplo'],
      en: ['shango', 'yoruba god of thunder', 'thunder deity', 'changó santería', 'justice orisha', 'shango worship', 'yoruba king'],
      es: ['changó', 'orisha del rayo', 'justicia divina', 'changó santería', 'machete doble', 'dios del trueno', 'rey de oyo'],
      yo: ['Ṣàngó', 'Kaô Kabecilé', 'Jakutá', 'Obakosso', 'Ọba Kòso', 'Alágbára', 'Edun Ara', 'Oxê']
    },
    pesquisasRelacionadas: [
      'Como pedir justiça para Xangô',
      'Orixá do raio',
      'Comida de Xangô (Amalá)',
      'Xangô e Iansã — casamento',
      'Xangô e São Jerônimo',
      'Qualidades de Xangô',
      'Machado de Xangô',
      'Xangô no Batuque'
    ],
    perguntasFrequentes: [
      { pergunta: 'Quando pedir a ajuda de Xangô?', resposta: 'Para resolver processos judiciais (causas justas), encontrar o equilíbrio em situações de conflito, pedir coragem e justiça divina.' },
      { pergunta: 'Xangô e São Jerônimo são o mesmo?', resposta: 'São Jerônimo é um santo católico. A sincretização ocorreu no Brasil porque ambos são símbolos de sabedoria e justiça. Mas Xangô é uma força da natureza independente.' },
      { pergunta: 'Qual a comida de Xangô?', resposta: 'Amalá (caruru de quiabo com azeite de dendê), farinha de mandioca, carne de bode assada.' }
    ],
    referencias: [
      'Pierre Verger — Orixás: Deuses Iorubás no Brasil',
      'Reginaldo Prandi — Mitologia dos Orixás',
      'Samuel Johnson — The History of the Yorubas',
      'Robert Farris Thompson — Flash of the Spirit',
      'Candomblé — Tradição Oral',
      'Santería Church of the Orishas — Changó'
    ],
    pontosCantados: [
      'Machado de Xangô cortou, cortou, não parou!',
      'Pedra rolou na pedreira, segura o ponto meu pai.',
      'Kaô kabecilé, kaô kabecilé, Ṣàngó!',
      'Oxê! Oxê! Oxê!'
    ],
    pontosRiscados: [
      'O Oxê (machado duplo) — símbolo principal de justiça.',
      'O trovão — representação visual da presença de Xangô.',
      'A pedra de raio (Edun Ara) — fragmento de meteorito.'
    ]
  },
  {
    id: 'orixa-olokun',
    nome: 'Olokun',
    nomeYoruba: 'Olókun',
    nomeLucumi: 'Olokun',
    nomeIngles: 'Olokun',
    nomeEspanhol: 'Olokun',
    variacoesRegionais: ['Olokun Mare', 'Olókun Iye'],
    categoria: 'Orixá',
    linha: 'Águas Salgadas Primordiais',
    reino: 'Abismos do Oceano',
    falange: 'Orixás / Orishas',
    historiaTradicional: 'Olókun é o Orixá do oceano profundo, da riqueza incompreensível e dos segredos que a humanidade não pode acessar. No Ifá tradicional (Nigéria) e em Cuba, é uma deidade das profundezas (às vezes andrógina ou masculina, diferente de Iemanjá que é o rio/mar costeiro). É a divindade da riqueza, estabilidade e saúde. Seus segredos estão trancados no fundo do mar. Representa o mistério absoluto, a profundidade infinita e a riqueza escondida.',
    quemFoi: 'A divindade do abismo oceânico. Detentor dos segredos mais profundos e da riqueza inacessível.',
    personalidade: [
      'Misterioso — guarda segredos insondáveis',
      'Riquíssimo — senhor da abundância oculta',
      'Estável — como o fundo do mar, imutável',
      'Andrógino — transcende gênero',
      'Poderoso mas silencioso',
      'Protetor dos que buscam sabedoria oculta',
      'Dono da vida e da morte nos mares',
      'Calmo e profundo'
    ],
    biografia: {
      nascimento: 'Um dos Irúnmolẹ̀ primordiais. Morador do fundo do oceano, onde guarda os segredos da criação.',
      feitos: [
        'Guarda os segredos mais profundos do oceano',
        'Controla a riqueza escondida do mundo',
        'Mantém o equilíbrio das águas profundas',
        'Protege os navios que cruzam seus domínios',
        'Dono de todas as pérolas e coral do mar'
      ],
      transformacao: 'Olókun nunca se transforma — ele é a constante do abismo.'
    },
    genealogia: {
      pai: 'Olódùmarè',
      irmaos: ['Iemanjá (irmã — águas superficiais vs. profundas)', 'Todos os Irúnmolẹ̀'],
      filhos: ['Seus filhos são todos os mistérios do oceano']
    },
    linhaDoTempoMitica: [
      'Criação: Morador do abismo desde o início dos tempos.',
      'O Segredo: Guarda as chaves da riqueza universal.',
      'O Equilíbrio: Mantém as profundezas em harmonia.',
      'O Contato: Em Cuba e Ifá, é consultado para prosperidade.'
    ],
    itans: [
      {
        titulo: 'O Tesouro de Olókun',
        historia: 'Olókun guardava no fundo do mar um baú com todas as riquezas do mundo. Um dia, Òṣun bajulou Olókun com dança e beleza, e ele abriu o baú para ela. Òṣun espalhou parte da riqueza pela terra — nascendo assim o ouro e os minérios.',
        licao: 'A riqueza verdadeira vem da sabedoria e da persistência, não da violência.'
      },
      {
        titulo: 'O Silêncio do Abismo',
        historia: 'Quando os outros Orixás brigavam, Olókun ficava em silêncio no fundo do mar. Quando sua paciência acabava, as águas subiam e inundavam tudo. Somente a música de Òṣun o acalmava.',
        licao: 'O silêncio é poder — mas quando rompe, é destruidor.'
      }
    ],
    dominios: ['Abismos Oceânicos', 'Riqueza Oculta', 'Segredos', 'Saúde Profunda', 'Estabilidade', 'Mistério'],
    correspondencias: {
      locaisNatureza: ['Oceano profundo', 'Fundo do mar', 'Recifes distantes', 'Águas calmas e profundas'],
      metaisPedras: ['Coral', 'Pérolas', 'Obsidiana', 'Cobre'],
      animais: ['Peixe espada', 'Tartaruga marinha', 'Baleia', 'Sereia']
    },
    ervas: {
      liturgicas: ['Algas', 'Folhas de coqueiro', 'Ervas marinhas'],
      medicinais: ['Algas marinhas', 'Coral moído', 'Água salgada purificada']
    },
    comidas: ['Mel', 'Acarajé', 'Cozinhados de inhame branco', 'Água com mel'],
    qualidades: [
      { nome: 'Olókun Mare', descricao: 'O senhor do mar profundo, mais masculino e guerreiro.' },
      { nome: 'Olókun Iye', descricao: 'A versão feminina/materna, ligada à saúde e à cura.' }
    ],
    diaTradicional: 'Sábado',
    saudacao: 'Maferefun Olókun! (Salve Olókun!)',
    cultos: {
      tradicionalAfricano: 'Cultuado em comunidades costeiras da Nigéria e Benin.',
      brasil: 'No Candomblé, é menos cultuado que Iemanjá, mas possui terreiros dedicados.',
      cuba: 'Na Santería, Olokun é uma entidade misteriosa, cultuada por Babalawos para prosperidade.',
      eua: 'Cultuado em comunidades Lukumí para prosperidade financeira.',
      europa: 'Pouco documentado na Europa, mas presente em terreiros cubanos.'
    },
    orikis: [
      {
        yoruba: 'Olókun àlàáfíà, alágbára omi.',
        traducao: 'Olókun da paz, o poderoso das águas.'
      }
    ],
    oracoes: [
      'Olókun, senhor do abismo, abre as portas da riqueza e concede saúde ao meu corpo e à minha família. Maferefun Olókun! Àṣẹ!'
    ],
    templosHistoricos: [
      'Costas da Nigéria e Benin',
      'Terreiros de Candomblé em Salvador',
      'Templos de Santería em Havana'
    ],
    palavrasChaveSEO: [
      'olokun', 'orixa olokun', 'olokun ifa', 'olokun santeria',
      'olokun candomblé', 'riqueza olokun', 'fundo do mar orixá',
      'diferença iemanjá olokun', 'assentamento olokun'
    ],
    palavrasChaveMultiIdiomas: {
      pt: ['olokun', 'orixá do oceano', 'riqueza oculta', 'fundo do mar', 'olokun candomblé'],
      en: ['olokun', 'deep sea deity', 'yoruba ocean god', 'olokun ifa', 'olokun santeria'],
      es: ['olokun', 'dios del océano', 'olokun ifá', 'olokun santería', 'riqueza oceánica'],
      yo: ['Olókun', 'Olókun Mare', 'Alágbára Omi', 'Olókun Iye', 'Omi Púpò']
    },
    pesquisasRelacionadas: [
      'Diferença entre Iemanjá e Olokun',
      'Como receber Olokun',
      'Assentamento de Olokun',
      'Olokun e a riqueza',
      'Olokun no Ifá'
    ],
    perguntasFrequentes: [
      { pergunta: 'Qual a diferença entre Iemanjá e Olókun?', resposta: 'Iemanjá é a superfície do mar e o rio, a maternidade. Olókun é o abismo inexplorado, o fundo do mar, detentor da riqueza mundial e dos grandes mistérios.' }
    ],
    referencias: [
      'Ifá Tradicional',
      'Santería (Regla de Ocha)',
      'Pierre Verger — Orixás',
      'Fatunmbi — Olokun: Lord of the Deep'
    ],
    pontosCantados: [
      'Olókun Bomi O...',
      'Olókun àlàáfíà, a gbé O ga.'
    ],
    pontosRiscados: [
      'O baú selado — representação dos segredos guardados.',
      'As ondas profundas — símbolo do poder oceânico.',
      'A máscara de Olokun — rosto humano com elementos marinhos.'
    ]
  },
  {
    id: 'orixa-babalu-aye',
    nome: 'Babalú-Ayé (Obaluaiyê)',
    nomeYoruba: 'Bàbálú-Ayé',
    nomeLucumi: 'Babalú Ayé',
    nomeIngles: 'Babalu Aye',
    nomeEspanhol: 'Babalú Ayé',
    variacoesRegionais: ['Obaluaiyê', 'Omolu', 'Ọbaluayé', 'Ṣọ̀pọ̀nná (forma tradicional africana)'],
    categoria: 'Orixá',
    linha: 'Terra e Doença (Cura)',
    reino: 'Terra, Cemitérios, Hospitais, Doenças',
    falange: 'Orixás / Orishas',
    historiaTradicional: 'Babalú-Ayé (Omolu/Obaluaiyê) é o temido e amado Orixá das doenças infecciosas e da cura. Ele domina as pestes, varíola e epidemias, mas, ao mesmo tempo, é o único capaz de retirá-las e conceder saúde perfeita. Coberto de palha-da-costa para esconder suas chagas (ou seu brilho de sol), ele representa a relação mais íntima que o ser humano tem com a Terra (para onde todos voltamos). Sua energia é temida, mas seu amor pelos sofredores é infinito.',
    quemFoi: 'O Senhor das Doenças e da Cura. Aquele que trouxe as epidemias e as curou. Protetor dos desvalidos e dos enfermos.',
    personalidade: [
      'Curador mestre — o maior sanador da cosmologia Yorùbá',
      'Severo com os soberbos',
      'Compassivo com os sofredores',
      'Misterioso e temido',
      'Honesto — não tolera hipocrisia',
      'Justo — cobra o que é devido',
      'Protetor dos cemitérios',
      'Sábio na medicina ancestral'
    ],
    biografia: {
      nascimento: 'Filho de Ọbàtálá e Yemoo (em alguns itans). Nasceu coberto de chagas, que ele assumiu pela humanidade.',
      feitos: [
        'Trouxe as epidemias ao mundo como castigo',
        'Curou as epidemias que ele mesmo trouxe',
        'Ensinou aos humanos a relação com a Terra',
        'Protege os enfermos e os moribundos',
        'Controla o ciclo vida-morte-vida'
      ],
      transformacao: 'De portador de doenças a curador supremo — sua dor se transformou em cura.'
    },
    genealogia: {
      pai: 'Ọbàtálá',
      mae: 'Yemoo',
      irmaos: ['Outros filhos de Ọbàtálá'],
      filhos: ['Seus filhos espirituais são todos os enfermos e curandeiros']
    },
    linhaDoTempoMitica: [
      'Nascimento: Nasceu coberto de chagas (palha-da-costa).',
      'A Praga: Trouxe varíola e epidemias ao mundo.',
      'O Arrependimento: Perdoou a humanidade e as curou.',
      'O Banho: Iemanjá/Nanã o banhou e o curou.',
      'A Aliança: Tornou-se protetor dos cemitérios.'
    ],
    itans: [
      {
        titulo: 'Babalú-Ayé e o Banho de Iemanjá',
        historia: 'Quando Babalú-Ayé estava coberto de chagas e rejeitado por todos, foi Iemanjá (ou Nanã, dependendo da tradição) quem o banhou nas águas sagradas e o curou. Em gratidão, ele jurou proteger todos os filhos dela.',
        licao: 'A compaixão cura o que a força não pode tocar.'
      },
      {
        titulo: 'A Palha-da-Costa',
        historia: 'Babalú-Ayé usa palha-da-costa (Íko) para cobrir suas chagas — mas também para esconder sua luz ofuscante. Quando alguém o vê sem a palha, é cegado pelo brilho do sol que ele se tornou.',
        licao: 'A humildade é uma forma de proteger os outros de nosso poder.'
      },
      {
        titulo: 'A Pipoca de Babalú-Ayé',
        historia: 'Quando Babalú-Ayé caminha, suas palhas caem e viram pipoca no chão. A pipoca é sua comida sagrada — o grão que explode com calor, como as doenças que ele controla.',
        licao: 'Até o simples pode ser sagrado quando conectado ao divino.'
      }
    ],
    dominios: ['Doenças Infecciosas', 'Cura', 'Terra', 'Cemitérios', 'Hospitais', 'Epidemias', 'Desapego', 'Ciclo da Vida'],
    correspondencias: {
      locaisNatureza: ['Cemitérios', 'Hospitais', 'Locais de terre', 'Queimadas'],
      metaisPedras: ['Ferro', 'Pedra de osso', 'Cascalho'],
      animais: ['Galo preto', 'Bode', 'Cachorro']
    },
    ervas: {
      liturgicas: ['Palha-da-costa (Íko)', 'Erva-de-São-João', 'Erva-cidreira'],
      medicinais: ['Guiné', 'Capim-limão', 'Arruda']
    },
    comidas: ['Pipoca (Deburu)', 'Milho cozido', 'Batata-doce assada', 'Arroz branco'],
    ewoTabus: [
      { tabu: 'Matar galinha preta sem necessidade', motivo: 'O galinha preta é sagrada para Babalú-Ayé.' },
      { tabu: 'Zombar de enfermos', motivo: 'Babalú-Ayé protege todos os doentes — zombar é ofendê-lo diretamente.' }
    ],
    qualidades: [
      { nome: 'Babalú-Ayé Atotô', descricao: 'O pai da terra, o mais poderoso.' },
      { nome: 'Obaluaiyê Ojá', descricao: 'O que caminha no mercado, ligado ao comércio.' },
      { nome: 'Omolu Abiá', descricao: 'O que cura sem ferir.' }
    ],
    diaTradicional: 'Segunda-feira',
    saudacao: 'Atotô! (Silêncio, o Rei da Terra está aqui!)',
    cultos: {
      tradicionalAfricano: 'Cultuado em toda a região Yorùbá, especialmente onde há epidemias.',
      brasil: 'No Candomblé, é sincretizado com São Lázaro. Seu feriado é 17 de setembro.',
      cuba: 'Na Santería, Babalú Ayé é sincretizado com São Lázaro. Seu feriado é 17 de dezembro.',
      eua: 'Cultuado na tradição Lukumí como Babalú Ayé.',
      europa: 'Presente em terreiros cubanos e brasileiros.'
    },
    orikis: [
      {
        yoruba: 'Atotô Obaluaiyê, ọba àìkú, a gbé O ga.',
        traducao: 'Atotô Obaluaiyê, rei imortal, nós Te exaltamos.'
      }
    ],
    cantigas: [
      {
        yoruba: 'Ele é um velho, é um velho muito velho...',
        portugues: 'Ele é um velho, é um velho muito velho...'
      },
      {
        yoruba: 'Atotô Obaluaiyê, omode a ba mu.',
        portugues: 'Atotô Obaluaiyê, o jovem que trouxe a cura.'
      }
    ],
    oracoes: [
      'Atotô! Pai da Terra, Babalú-Ayé, afasta as doenças e traz a cura ao meu lar. Que tuas palhas nos protejam e tuas ervas nos curem. Àṣẹ!'
    ],
    templosHistoricos: [
      'Sakete (Nigéria) — centro do culto a Babalú-Ayé',
      'Terreiros de Candomblé em Salvador',
      'Igreja de São Lázaro (Sincretismo em Cuba)'
    ],
    palavrasChaveSEO: [
      'babalu aye', 'obaluaiye', 'omolu', 'atoto',
      'orixa da cura', 'orixa pipoca', 'babalu aye candomblé',
      'babalu aye santeria', 'são lázaro babalu', 'palha da costa'
    ],
    palavrasChaveMultiIdiomas: {
      pt: ['babalu ayé', 'obaluaiyê', 'omolu', 'orixá da cura', 'atotô', 'pipoca'],
      en: ['babalu aye', 'obaluaiye', 'omolu', 'orisha of disease', 'orisha of healing', 'palm straw'],
      es: ['babalú ayé', 'obaluaê', 'omolú', 'orisha de las enfermedades', 'orisha de la curación', 'paja de costa'],
      yo: ['Bàbálú-Ayé', 'Ọbaluayé', 'Omolu', 'Ṣọ̀pọ̀nná', 'Atotô', 'Alágbára Iku']
    },
    pesquisasRelacionadas: [
      'Banho de pipoca Obaluaiê',
      'Diferença Omolu e Obaluaiê',
      'Como pedir cura para Babalu Aye',
      'Babalú-Ayé e São Lázaro',
      'Palha-da-costa significado'
    ],
    perguntasFrequentes: [
      { pergunta: 'Por que ele usa palha-da-costa?', resposta: 'Nos mitos, a palha esconde as marcas das doenças que ele assumiu por nós, e em outros Itans, esconde a luz ofuscante do sol que ele se tornou após ser curado por Iemanjá/Nanã.' },
      { pergunta: 'Omolu e Babalú-Ayé são o mesmo?', resposta: 'Sim. Omolu é a forma mais usada no Brasil; Babalú-Ayé é a forma Yorùbá mais usada em Cuba e na África.' }
    ],
    referencias: [
      'Pierre Verger — Orixás',
      'Reginaldo Prandi — Mitologia dos Orixás',
      'Santería Church of the Orishas — Babalú Ayé',
      'Mitologia Yoruba'
    ],
    pontosCantados: [
      'Ele é um velho, é um velho muito velho...',
      'Atotô Obaluaiyê, omode a ba mu.',
      'Babalú-Ayé, Babalú-Ayé, omode omode.'
    ],
    pontosRiscados: [
      'O Xaxará (lança de palha) — arma e símbolo de Babalú-Ayé.',
      'A palha-da-costa cruzada — proteção sagrada.',
      'O crânio com palha — representação da cura.'
    ]
  }
];
