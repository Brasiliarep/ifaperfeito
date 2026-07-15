import type { EncyclopediaEntity } from './types';

export const VODUN_LOA_DATA: EncyclopediaEntity[] = [
  // ═══════════════════════════════════════════════════════════════
  // 1. BARON SAMEDI
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-baron-samedi',
    nome: 'Baron Samedi',
    categoria: 'Loa',
    linha: 'Guédé / Linha dos Mortos',
    reino: 'Cemitérios, Campo-Santo, Morte e Renascimento',
    historiaTradicional:
      'Baron Samedi é o mais célebre e reconhecível de todos os Loa do Vodou haitiano, o senhor absoluto dos mortos e patriarca da família Guédé. Seu nome, que significa literalmente "Barão do Sábado", remete ao dia sagrado em que os mortos supostamente retornam ao mundo dos vivos. Na tradição oral haitiana, Baron Samedi habita no cruzamento entre o mundo dos vivos e o dos espíritos, residindo especificamente no campo-santo, sob uma árvore de flamboyant ou sob uma cruz de madeira. Ele é retratado com um chapéu-coco preto, óculos escuros, um terno preto imaculado, uma gravata-borboleta branca e charutos de tabaco preto que fuma sem parar. Sua esposa é Maman Brigitte, e juntos governam o reino dos mortos com autoridade incontestável. Baron Samedi é conhecido por sua personalidade extremamente irreverente, obscena e humorística. Ele faz piadas de duplo sentido, dança de forma cômica e bebe rhum em quantidades industriais. Porém, por trás dessa fachada de palhaço esconde-se uma entidade de poder colossal. Ele é o único Loa capaz de curar qualquer doença mortal e de impedir que os mortos retornem prematuramente ao mundo dos vivos.',
    quemFoi:
      'Baron Samedi não foi uma pessoa humana histórica, mas sim uma entidade espiritual cuja origem remonta às tradições funerárias do povo Fon do Daomé (atual Benin) e dos Kongo. Ele é a personificação da morte no Vodou haitiano.',
    personalidade: [
      'Irreverente e humorístico',
      'Poderoso e incontestável',
      'Teatral e extravagante',
      'Misericordioso quando convocado com respeito',
      'Bêbado contumaz',
      'Moralmente ambíguo',
      'Protetor dos moribundos',
    ],
    dominios: ['Morte', 'Cemitérios', 'Transição espiritual', 'Cura de doenças terminais', 'Dia dos Mortos'],
    cores: ['Preto', 'Roxo', 'Branco'],
    simbolos: ['Chapéu-coco preto', 'Óculos escuros', 'Charuto de tabaco preto', 'Cruz de madeira', 'Rhum enxaguante com pimenta', 'Terno preto'],
    elementosNaturais: ['Cemitério', 'Árvore de flamboyant', 'Charuto defumado', 'Rhum', 'Pimenta', 'Terra de cemitério', 'Osso', 'Fumaça'],
    saudacao: 'Viv Baron Samedi! Anba fwey lanmò!',
    orikis: [
      { yoruba: 'Baron Samedi, senhor dos campos-santos, guardião da última porta!', traducao: 'Baron Samedi, senhor dos cemitérios, guardião da porta final!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Baron Samedi no Vodou haitiano?', resposta: 'Baron Samedi é o Loa da morte e patriarca da família Guédé no Vodou haitiano. Ele é o guardião do limiar entre a vida e a morte.' },
      { pergunta: 'Baron Samedi é mau?', resposta: 'Não. Baron Samedi não é uma entidade maligna, mas sim a personificação da transição entre a vida e a morte.' },
      { pergunta: 'O que Baron Samedi gosta de receber como oferenda?', resposta: 'Baron Samedi aceita rhum enxaguante, charutos de tabaco preto, café preto, pão escuro e velas pretas ou roxas.' },
    ],
    palavrasChaveSEO: ['Baron Samedi', 'Vodou haitiano', 'Loa da morte', 'Família Guédé', 'Cemitério Vodou'],
    palavrasChaveMultiIdiomas: {
      pt: ['Baron Samedi', 'Barão dos Mortos', 'Loa do cemitério', 'Guédé'],
      en: ['Baron Samedi', 'Lord of the Dead', 'Haitian Vodou death loa', 'Guédé family'],
      es: ['Barón Samedi', 'Señor de los Muertos', 'Loa del cementerio', 'Guédé'],
      yo: ['Baron Samedi', 'Olókun àwọn ti kú', 'Guédé Baba'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Mama Lola: A Vodou Priestess in Brooklyn — Karen McCarthy Brown',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Baron Samedi, Baron Samedi, ouvri ba m chemin an!', 'Viv Baron Samedi, nan ti moun yo!'],
    cultos: {
      tradicionalAfricano: 'Originário das tradições funerárias Fon do Daomé (Benin).',
      brasil: 'Reconhecido em terreiros de Matriz Africana no Brasil.',
      cuba: 'Sincretizado com Santos Católicos em Cuba.',
      eua: 'Presente em comunidades haitianas da Flórida e Nova York.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['Maman Brigitte'],
      filhos: ['Baron Kriminel', 'Baron Cimetière', 'Baron Croix', 'Baron Tí'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. MAMAN BRIGITTE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-maman-brigitte',
    nome: 'Maman Brigitte',
    categoria: 'Loa',
    linha: 'Guédé / Linha dos Mortos',
    reino: 'Cemitérios, Cura, Proteção Feminina',
    historiaTradicional:
      'Maman Brigitte é a esposa de Baron Samedi e a matriarca da família Guédé no Vodou haitiano. Ela é uma das entidades mais complexas e temidas do panteão vodou, representando simultaneamente a cura e a destruição, a maternidade e a morte. Em contraste com todas as outras Loa que são retratadas como seres africanos de pele escura, Maman Brigitte é frequentemente descrita como uma mulher branca de cabelos prateados, uma peculiaridade que levou estudiosos a especularem sobre suas origens europeias, possivelmente ligadas a Santa Brígida da Irlanda ou a Brígida pagã celta. Maman Brigitte habita nos cemitérios, especialmente perto das cruzes e dos túmulos, e é a protetora suprema dos túmulos e dos mortos. Ela é terrivelmente severa com quem desrespeita os cemitérios ou profana os mortos, podendo enviar doenças fatais e maldições terríveis. Para seus devotos fiéis, ela é uma mãe amorosa e protetora, capaz de curar qualquer doença e de proteger contra o mal. Ela é invocada especialmente em casos de envenenamento, feitiçaria e doenças da pele.',
    quemFoi:
      'Maman Brigitte é a matriarca da família Guédé e esposa de Baron Samedi. Sua origem é objeto de debate entre estudiosos que a ligam à deusa celta Brígida ou às escravas europeias da colônia francesa.',
    personalidade: [
      'Feroz e aterrorizante quando provocada',
      'Maternal e protetora com seus devotos fiéis',
      'Extremamente ciúmenta de Baron Samedi',
      'Curandeira poderosa contra venenos e feitiçaria',
      'Severa com quem profana cemitérios',
      'Bebe rhum enxaguante com pimenta',
      'Uma das poucas Loa brancas do Vodou',
    ],
    dominios: ['Morte', 'Cemitérios', 'Cura de envenenamento', 'Proteção feminina', 'Maternidade'],
    cores: ['Preto', 'Branco', 'Roxo'],
    simbolos: ['Cruz de cemitério', 'Pimenta vermelha', 'Garrafa de rhum', 'Vela preta', 'Faca de abacaxi'],
    elementosNaturais: ['Cemitério', 'Pimenta', 'Rhum', 'Folhas medicinais amargas', 'Terra sagrada', 'Sal grosso', 'Fogo'],
    saudacao: 'Viv Maman Brigitte! Béniré!',
    orikis: [
      { yoruba: 'Maman Brigitte, mãe dos mortos, protetora dos túmulos sagrados!', traducao: 'Maman Brigitte, mãe dos mortos, protetora dos túmulos sagrados!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Por que Maman Brigitte é branca?', resposta: 'Maman Brigitte é uma das poucas Loa retratadas como branca, o que é incomum no Vodou. Pode derivar da deusa celta Brígida ou representar escravas europeias.' },
      { pergunta: 'Qual a relação entre Maman Brigitte e o cemitério?', resposta: 'Maman Brigitte é a guardiã suprema dos cemitérios. Ela habita junto às cruzes e túmulos, protegendo os mortos de profanação.' },
      { pergunta: 'Maman Brigitte é perigosa?', resposta: 'Sim. Ela envia doenças fatais e maldições terríveis para quem profana cemitérios ou desrespeita seus devotos.' },
    ],
    palavrasChaveSEO: ['Maman Brigitte', 'Loa do cemitério', 'Vodou haitiano', 'Esposa de Baron Samedi', 'Matriarca Guédé'],
    palavrasChaveMultiIdiomas: {
      pt: ['Maman Brigitte', 'Mãe Brigitte', 'Loa do cemitério'],
      en: ['Maman Brigitte', 'Mother Brigitte', 'Haitian Vodou cemetery loa'],
      es: ['Maman Brigitte', 'Madre Brigitte', 'Loa del cementerio'],
      yo: ['Maman Brigitte', 'Iya Brigitte', 'Guédé Iya'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Mama Lola: A Vodou Priestess in Brooklyn — Karen McCarthy Brown',
      'Vodou in Haitian Life and Culture — Donald Cosentino',
    ],
    pontosCantados: ['Maman Brigitte, Maman Brigitte, ba m yon ti souf!', 'Béniré Maman, nan ti moun yo!'],
    cultos: {
      tradicionalAfricano: 'Culto desenvolvido na colônia de Saint-Domingue, mesclando tradições Fon com elementos europeus.',
      brasil: 'Reconhecida em terreiros de Matriz Africana e Jeje.',
      cuba: 'Associada a Santa Brígida na Santería cubana.',
      eua: 'Reverenciada em comunidades haitianas da Flórida e Nova York.',
    },
    genealogia: {
      pai: 'Desconhecido',
      mae: 'Ada',
      esposasMaridos: ['Baron Samedi'],
      filhos: ['Baron Kriminel', 'Baron Cimetière', 'Baron Croix', 'Baron Tí'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. PAPA LEGBA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-papa-legba',
    nome: 'Papa Legba',
    categoria: 'Loa',
    linha: 'Rada / Linha dos Anciãos',
    reino: 'Encruzilhadas, Comunicação, Portais Espirituais',
    historiaTradicional:
      'Papa Legba é o guardião sagrado das encruzilhadas e o intermediário entre a humanidade e todos os outros Loa do Vodou haitiano. Ele é a porta espiritual através da qual todas as comunicações com o mundo dos espíritos devem passar, sem exceção. Sem a permissão de Papa Legba, nenhum ritual pode começar, nenhuma prece pode alcançar os outros Loa e nenhuma cerimônia pode se completar. Por isso, ele é sempre o primeiro Loa a ser saudado e servido em qualquer cerimônia de Vodou. Papa Legba é retratado como um velho sábio e simpático, com um chapéu de palha, bastão de madeira ou muletas, charuto e um cesto de sementes de milho. Ele fala todas as línguas e compreende todas as línguas, sendo o tradutor universal entre os mundos. Seu dia da semana é segunda-feira, e seus números são o 3 e o 7. Papa Legba é um dos poucos Loa que pode transitar livremente entre todos os reinos espirituais. Ele habita na encruzilhada mais próxima da casa onde o Vodou é praticado, e é ele quem decide se os outros Loa podem ou não atender às súplicas dos devotos.',
    quemFoi:
      'Papa Legba é a personificação da abertura e da comunicação entre os mundos. Ele é o espírito guardião de todas as transições e o intermediário necessário entre humanos e divindades no Vodou haitiano.',
    personalidade: [
      'Sábio e experiente',
      'Simpático e acolhedor',
      'Estratégico — decide quem acessa os outros Loa',
      'Fala todas as línguas',
      'Alegre e bem-humorado',
      'Paciente — espera os devotos aprenderem',
      'Protetor dos viajantes e peregrinos',
      'Irônico — suas lições vêm em paradoxos',
    ],
    dominios: ['Encruzilhadas', 'Comunicação entre mundos', 'Portais espirituais', 'Viajantes', 'Início de cerimônias'],
    cores: ['Vermelho', 'Preto', 'Branco'],
    simbolos: ['Cajado de madeira', 'Muletas', 'Chapéu de palha', 'Charuto', 'Chave de ferro', 'Cesto de milho', 'Sino pequeno', 'Galo branco'],
    elementosNaturais: ['Encruzilhada', 'Pedras de encruzilhada', 'Água', 'Fogo de carvão', 'Milho', 'Café', 'Machado de ferro'],
    saudacao: 'Bless Papa Legba! Oun Legba!',
    orikis: [
      { yoruba: 'Papa Legba, ouvri ba m chemin an! Ba m yon ti chimen pou m pase!', traducao: 'Papa Legba, abra-me o caminho! Dá-me um caminho para eu passar!' },
      { yoruba: 'Legba matirio, Legba ati Legba!', traducao: 'Legba do caminho, Legba de todos os Legba!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Por que Papa Legba é sempre o primeiro a ser servido?', resposta: 'Papa Legba é o guardião de todos os portais espirituais. Sem sua permissão, nenhum outro Loa pode ser acessado.' },
      { pergunta: 'Papa Legba é igual a Exu?', resposta: 'Embora ambos sejam guardiões das encruzilhadas, Papa Legba e Exu são entidades distintas com origens e características próprias.' },
      { pergunta: 'O que Papa Legba precisa para atender uma prece?', resposta: 'Papa Legba aceita galos brancos, milho, café preto, charutos e rhum. É necessário dirigir-se a ele com respeito e sinceridade.' },
    ],
    palavrasChaveSEO: ['Papa Legba', 'Guardião das encruzilhadas', 'Vodou haitiano', 'Loa das portas', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Papa Legba', 'Guardião da encruzilhada', 'Abre-caminhos'],
      en: ['Papa Legba', 'Guardian of the Crossroads', 'Gate keeper'],
      es: ['Papa Legba', 'Guardián de las Encrucijadas', 'Abre-caminos'],
      yo: ['Papa Legba', 'Olùparí Ìsodì', 'Alákétu Vodou'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Mama Lola: A Vodou Priestess in Brooklyn — Karen McCarthy Brown',
      'Haitian Vodou: An Introduction — Kate Ramsey',
    ],
    pontosCantados: ['Oun Legba, Legba, ouvri ba m chemin an!', 'Papa Legba, ba m yon ti chimen!'],
    cultos: {
      tradicionalAfricano: 'Originário do culto a Legba nas tradições Fon e Ewe do Daomé.',
      brasil: 'Sincretizado com São Pedro e com Exu em terreiros de Umbanda e Candomblé.',
      cuba: 'Associado a Eleguá na Santería cubana.',
      eua: 'Reverenciado em comunidades haitianas e afro-caribenhas.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      irmaos: ['Danbala', 'Agwé', 'Ogou'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. ERZULIE FREDA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-erzulie-freda',
    nome: 'Erzulie Freda',
    categoria: 'Loa',
    linha: 'Rada / Linha do Amor',
    reino: 'Amor, Beleza, Luxo, Feminilidade',
    historiaTradicional:
      'Erzulie Freda é a Loa do amor, da beleza, do luxo e da sedução no Vodou haitiano. Ela é a Rainha do Coração, a dona de todos os encantos femininos e a protetora dos amantes. Erzulie Freda habita no mundo das cores rosas, das sedas, dos perfumes e das águas claras. Ela é retratada como uma mulher de beleza deslumbrante, com três corações de ouro pendurados ao redor do pescoço, cada um representando um de seus três maridos: Ogou Feray, Agwé e Simgan. Apesar de ser a senhora do amor, Erzulie Freda é uma entidade profundamente triste e insatisfeita, buscando o amor perfeito que nunca encontra. Sua festa é celebrada na segunda-feira de Páscoa, quando os devotos preparam banquetes elaborados com doces, perfumes, espelhos e vestidos rosas. Erzulie Freda é extremamente ciúmenta e vingativa quando traída em amor, podendo enviar doenças e destruição. Ela é uma das Loa mais populares do Haiti, especialmente entre as mulheres.',
    quemFoi:
      'Erzulie Freda é a personificação do amor romântico e da beleza feminina no Vodou haitiano. Ela representa o ideal inalcançável do amor perfeito.',
    personalidade: [
      'Romântica e apaixonada',
      'Ciumenta e possessiva',
      'Belíssima e vaidosa',
      'Triste e melancólica',
      'Luxuosa e refinada',
      'Vingativa contra traidores',
      'Sensual e encantadora',
      'Generosa com devotos fiéis',
    ],
    dominios: ['Amor romântico', 'Beleza', 'Luxo e sofisticação', 'Sensualidade', 'Feminilidade', 'Casamento', 'Artes'],
    cores: ['Rosa', 'Branco', 'Azul claro', 'Dourado'],
    simbolos: ['Três corações de ouro', 'Espelho', 'Pente de marfim', 'Sapato de salto alto', 'Vestido de seda rosa', 'Perfume de rosas', 'Sino de prata'],
    elementosNaturais: ['Água clara e doce', 'Rosa', 'Perfume', 'Seda', 'Borboleta', 'Colibri', 'Lua cheia'],
    saudacao: 'Erzulie! ErzulieFreda! Béniré!',
    orikis: [
      { yoruba: 'Erzulie Freda, rainha do amor, dona de todos os corações!', traducao: 'Erzulie Freda, rainha do amor, dona de todos os corações!' },
      { yoruba: 'Erzulie nan lanmou, ba m yon ti kè pou m renmen!', traducao: 'Erzulie do amor, dá-me um pouco de coração para eu amar!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem são os três maridos de Erzulie Freda?', resposta: 'Ogou Feray (o guerreiro), Agwé (o senhor do mar) e Simgan (o mensageiro). Nenhum a satisfaz completamente.' },
      { pergunta: 'Erzulie Freda é perigosa?', resposta: 'Sim. É extremamente ciumenta e vingativa, enviando doenças e destruição para quem traí seus devotos.' },
      { pergunta: 'O que Erzulie Freda gosta de receber?', resposta: 'Perfumes rosas, velas rosas, espelhos, sedas, doces, sapatos femininos e banquetes elaborados.' },
    ],
    palavrasChaveSEO: ['Erzulie Freda', 'Loa do amor', 'Vodou haitiano', 'Beleza feminina', 'Três corações', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Erzulie Freda', 'Loa do amor', 'Rainha do coração'],
      en: ['Erzulie Freda', 'Spirit of Love', 'Haitian Vodou love loa'],
      es: ['Erzulie Freda', 'Espíritu del Amor', 'Loa del amor'],
      yo: ['Erzulie Freda', 'Ẹmi Ìfẹ́', 'Ọba Okan'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Erzulie: A Psychosocial Interpretation of Vodou — Leslie Desmangles',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Erzulie Freda, Erzulie Freda, ba m yon ti kè!', 'Doudou Erzulie, ba m lanmou!'],
    cultos: {
      tradicionalAfricano: 'Ligada às divindades da água e fertilidade nas tradições Fon.',
      brasil: 'Sincretizada com Iemanjá e Nossa Senhora dos Navegantes.',
      cuba: 'Associada a Santa Barbara Africana na Santería.',
      eua: 'Muito cultuada em comunidades haitianas.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['Ogou Feray', 'Agwé', 'Simgan'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. ERZULIE DANTOR
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-erzulie-dantor',
    nome: 'Erzulie Dantor',
    categoria: 'Loa',
    linha: 'Petwo / Linha da Proteção',
    reino: 'Proteção, Maternidade, Vingança, Ferimentos',
    historiaTradicional:
      'Erzulie Dantor é a face sombria e feroz de Erzulie, a Mãe Negra do Vodou haitiano. Enquanto Erzulie Freda é a donzela do amor, Erzulie Dantor é a mãe ferida e vingativa, a protetora dos fracos contra os opressores. Ela é frequentemente retratada com uma cicatriz cortando seu rosto e segurando uma faca em uma mão e um bebê no colo. Muitos a associam com a Virgem Maria negra de Czestochowa, cuja imagem chegou ao Haiti através dos poloneses que serviram nas tropas coloniais francesas durante a revolução haitiana. Erzulie Dantor é a Loa da justiça social, da proteção maternal e da vingança contra abusadores. Ela é invocada especialmente por mulheres que sofreram violência e mães que protegem seus filhos. Seu culto é parte da nação Petwo, a linha mais feroz e transformadora do Vodou. Erzulie Dantor bebe raramente, e quando bebe, é de sangue de galo ou de pimenta vermelha.',
    quemFoi:
      'Erzulie Dantor é a Mãe Negra do Vodou haitiano, a face feroz e protetora de Erzulie. Ela representa a maternidade ferida e a vingança justa.',
    personalidade: [
      'Feroz e protetora',
      'Ferida e traumatizada',
      'Vingativa — não perdoa traições',
      'Maternal com os fracos e vulneráveis',
      'Séria e sombria',
      'Corajosa — enfrenta qualquer inimigo',
      'Leal até a morte com seus devotos',
      'Justiciera — pune opressores',
    ],
    dominios: ['Proteção materna', 'Vingança', 'Justiça social', 'Defesa dos fracos', 'Violência justa'],
    cores: ['Vermelho', 'Preto', 'Azul escuro'],
    simbolos: ['Faca ou facão', 'Bebê no colo', 'Cicatriz no rosto', 'Virgem Negra', 'Sangue de galo', 'Espelho quebrado'],
    elementosNaturais: ['Fogo', 'Sangue', 'Ferro', 'Pimenta vermelha', 'Noite escura', 'Tempestade'],
    saudacao: 'Erzulie Dantor! Dantor nan!',
    orikis: [
      { yoruba: 'Erzulie Dantor, mãe dos fracos, vingadora dos oprimidos!', traducao: 'Erzulie Dantor, mãe dos fracos, vingadora dos oprimidos!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Qual a diferença entre Erzulie Freda e Erzulie Dantor?', resposta: 'Freda é a face romântica do amor; Dantor é a face feroz da maternidade. Freda chora por amor; Dantor sangra por justiça.' },
      { pergunta: 'Erzulie Dantor é a Virgem Maria?', resposta: 'Não, mas sua imagem se sincretizou com a Virgem Maria negra de Czestochowa no Haiti.' },
      { pergunta: 'Quando invocar Erzulie Dantor?', resposta: 'Para proteção contra agressores, vingança justa e defesa de crianças e mulheres.' },
    ],
    palavrasChaveSEO: ['Erzulie Dantor', 'Mãe Negra', 'Vodou haitiano', 'Proteção materna', 'Nação Petwo'],
    palavrasChaveMultiIdiomas: {
      pt: ['Erzulie Dantor', 'Mãe Negra', 'Loa protetora', 'Petwo'],
      en: ['Erzulie Dantor', 'The Dark Mother', 'Haitian Vodou protector loa', 'Petwo nation'],
      es: ['Erzulie Dantor', 'La Madre Oscura', 'Loa protectora', 'Nación Petwo'],
      yo: ['Erzulie Dantor', 'Iya Dudu', 'Petwo Iya'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Erzulie: A Psychosocial Interpretation of Vodou — Leslie Desmangles',
      'Tradição oral dos mambo haitianos da nação Petwo',
    ],
    pontosCantados: ['Erzulie Dantor, Dantor nan, ba m yon ti fòs!', 'Maman Dantor, protejé ti moun yo!'],
    cultos: {
      tradicionalAfricano: 'Na nação Petwo, ligada ao fogo revolucionário e à quebra de correntes.',
      brasil: 'Reconhecida em terreiros Jeje e terreiros de Matriz Africana.',
      cuba: 'Associada a Santa Bárbara Africana.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['Ogou Feray'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. OGOU FERAY
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-ogou-feray',
    nome: 'Ogou Feray',
    categoria: 'Loa',
    linha: 'Rada / Linha dos Guerreiros',
    reino: 'Guerra, Ferro, Política, Justiça',
    historiaTradicional:
      'Ogou Feray é o grande guerreiro do Vodou haitiano, o senhor do ferro, da guerra, da política e da justiça. Ele é a manifestação haitiana de Ògún, o poderoso Orixá da guerra e do ferro da tradição Yorùbá, trazido para o Haiti pelos escravos africanos que mantiveram viva sua memória através do Atlântico. Ogou Feray é retratado como um soldado imponente de uniforme azul-marinho com insígnias de prata, carregando uma longa espada de ferro e uma bandeira vermelha. Ele lidera procissões e danças guerreiras com passos firmes e decididos. Ogou Feray é particularmente reverenciado como o Loa que guiou o povo haitiano na Revolução Haitiana de 1791, a primeira revolução escravista bem-sucedida da história. Diz-se que ele possuía os generais Toussaint Louverture e Jean-Jacques Dessalines durante as batalhas. Sua festa é celebrada em 2 de janeiro, com banquetes de carne assada, milho, feijão preto e rhum. Ogou Feray aceita galos vermelhos e touros como sacrifícios. Ele é o protetor dos soldados, dos políticos e dos metalúrgicos.',
    quemFoi:
      'Ogou Feray é a manifestação haitiana de Ògún, o Orixá Yorùbá da guerra e do ferro. Tratado como herói nacional no Haiti por seu papel na Revolução Haitiana.',
    personalidade: [
      'Corajoso e indomável',
      'Disciplinado',
      'Honrado — luta apenas por causas justas',
      'Estrategista brilhante',
      'Protetor dos oprimidos',
      'Firme e decidido',
      'Leal a seus aliados até a morte',
      'Implacável com traidores',
    ],
    dominios: ['Guerra', 'Ferro e metalurgia', 'Política', 'Justiça', 'Liberdade', 'Soldados e militares'],
    cores: ['Vermelho', 'Preto', 'Azul-marinho'],
    simbolos: ['Espada de ferro', 'Bandeira vermelha', 'Uniforme militar', 'Machado de guerra', 'Galo vermelho', 'Corrente quebrada'],
    elementosNaturais: ['Ferro', 'Fogo de forja', 'Sangue', 'Tempestade', 'Raio', 'Rio caudaloso'],
    saudacao: 'Ogou Feray! Ogou ba!',
    orikis: [
      { yoruba: 'Ogou Feray, guerreiro de ferro, espada da liberdade!', traducao: 'Ogou Feray, guerreiro de ferro, espada da liberdade!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Ogou Feray participou da Revolução Haitiana?', resposta: 'Sim, na tradição vodou, Ogou Feray é creditado por guiar os generais revolucionários durante as batalhas.' },
      { pergunta: 'Ogou Feray é o mesmo que Ògún?', resposta: 'É a manifestação haitiana de Ògún. Embora compartilhem origens, o culto se desenvolveu de forma distinta no Haiti.' },
      { pergunta: 'O que Ogou Feray gosta de receber?', resposta: 'Galos vermelhos, touros, milho, feijão preto, carne assada, rhum e velas vermelhas.' },
    ],
    palavrasChaveSEO: ['Ogou Feray', 'Loa da guerra', 'Vodou haitiano', 'Revolução Haitiana', 'Ògún haitiano', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Ogou Feray', 'Guerreiro de ferro', 'Loa da guerra'],
      en: ['Ogou Feray', 'The Iron Warrior', 'Haitian Vodou war loa'],
      es: ['Ogou Feray', 'El Guerrero de Hierro', 'Loa de la guerra'],
      yo: ['Ogou Feray', 'Ogún Ọ̀nà', 'Ògún of Iron'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'A Black Republic: Haiti in the African Imagination — Leslie Desmangles',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Ogou Feray, Ogou Feray, ba m yon ti fòs!', 'Ogou nan, coupe chenn mwen!'],
    cultos: {
      tradicionalAfricano: 'Originário do culto a Ògún nas tradições Yorùbá da Nigéria e Benin.',
      brasil: 'Sincretizado com Ogum nos terreiros de Candomblé e Umbanda.',
      cuba: 'Associado a Ogún na Santería cubana.',
      eua: 'Reverenciado em comunidades haitianos com grandes procissões em Miami.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['Erzulie Freda', 'Erzulie Dantor'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. AGWÉ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-agwe',
    nome: 'Agwé',
    categoria: 'Loa',
    linha: 'Rada / Linha Aquática',
    reino: 'Oceano, Navios, Marinheiros, Pesca',
    historiaTradicional:
      'Agwé é o senhor do mar no Vodou haitiano, o guardião dos navios, dos marinheiros e de todas as criaturas que vivem sob as ondas. Ele é um Loa nobre e poderoso que habita em um palácio subaquático repleto de tesouros, âmbar e corais, puxado por cavalos-marinhos e conduzido por sereias. Agwé governa um reino submarino que espelha a corte de um rei terreno, com conselheiros, servos e guardas. Ele é retratado como um homem negro e belo, sentado em um trono de coral, usando uma coroa dourada e segurando um cetro de concha. Agwé é invocado pelos pescadores antes de zarpar e pelos marinheiros antes de cada viagem. Ele é especialmente importante na costa norte do Haiti, onde as comunidades pesqueiras dependem de sua proteção. Agwé é esposo de La Sirène, a rainha sereia, e juntos governam os mares. Sua oferenda preferida são navios em miniatura depositados no mar, peixes frescos, café, mel e velas brancas.',
    quemFoi:
      'Agwé é o senhor do mar no Vodou haitiano, guardião dos navios e marinheiros. Ele habita um palácio subaquático e governa todas as criaturas marinhas.',
    personalidade: [
      'Nobre e digno — rei absoluto dos mares',
      'Protetor dos marinheiros e pescadores',
      'Generoso com quem o respeita',
      'Poderoso — controla tempestades',
      'Justo — protege todos que vivem do mar',
      'Tranquilo — age com calma',
    ],
    dominios: ['Oceano', 'Navios', 'Marinheiros', 'Pesca', 'Tempestades marítimas', 'Comércio marítimo'],
    cores: ['Azul', 'Branco', 'Dourado'],
    simbolos: ['Coroa dourada', 'Cetro de concha', 'Navio em miniatura', 'Âncora', 'Cavalos-marinhos', 'Concha gigante'],
    elementosNaturais: ['Água salgada', 'Oceano profundo', 'Conchas', 'Coral', 'Sargasso', 'Tempestade marítima'],
    saudacao: 'Agwé! Agwé tetefwa!',
    orikis: [
      { yoruba: 'Agwé, senhor do abismo azul, protetor dos que cruzam o mar!', traducao: 'Agwé, senhor do abismo azul, protetor dos que cruzam o mar!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Agwé no Vodou?', resposta: 'Agwé é o senhor do mar, guardião dos navios e marinheiros. É esposo de La Sirène.' },
      { pergunta: 'Como invocar Agwé?', resposta: 'Colocando um navio em miniatura no mar com oferendas de peixe, café e mel, e acendendo velas brancas na beira-mar.' },
      { pergunta: 'Agwé e Iemanjá são a mesma entidade?', resposta: 'Não. Agwé (Vodou haitiano) e Iemanjá (Candomblé) são entidades de tradições diferentes. Agwé é masculino; Iemanjá é feminina.' },
    ],
    palavrasChaveSEO: ['Agwé', 'Senhor do mar', 'Vodou haitiano', 'Loa aquático', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Agwé', 'Senhor do mar', 'Loa aquático'],
      en: ['Agwé', 'Lord of the Sea', 'Haitian Vodou sea loa'],
      es: ['Agwé', 'Señor del Mar', 'Loa acuático'],
      yo: ['Agwé', 'Ọba Okun', 'Alágbò Okun'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral das comunidades pesqueiras do norte do Haiti',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Agwé tetefwa, Agwé tetefwa!', 'Agwé nan lanmè a, ba m yon ti chimen!'],
    cultos: {
      tradicionalAfricano: 'Originário dos cultos aquáticos das tradições Fon e Kongo.',
      brasil: 'Associado a Oxalá e Obaluaiê em terreiros de Matriz Africana.',
      cuba: 'Relacionado a Babalú-Ayé na Santería.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['La Sirène'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. LA SIRÈNE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-la-sirene',
    nome: 'La Sirène',
    categoria: 'Loa',
    linha: 'Rada / Linha Aquática',
    reino: 'Mar, Beleza, Feminilidade, Magia',
    historiaTradicional:
      'La Sirène é a rainha sereia do Vodou haitiano, uma das entidades mais belas, misteriosas e temidas do panteão. Ela é a esposa de Agwé, o senhor do mar, e juntos governam o reino subaquático. La Sirène é retratada como uma mulher de beleza sobrenatural com uma cauda de peixe reluzente, cabelos longos e negros que flutuam como ondas e olhos que brilham como péolas. Ela habita nos recifes de coral e cavernas submarinas mais profundas, onde guarda tesouros incalculáveis e segredos ancestrais. Diz-se que ela aparece nas praias do Haiti em noites de lua cheia, sentada em uma rocha, pentando seus longos cabelos com um pente de ouro e cantando canções que hipnotizam qualquer mortal. Aquele que é tocado pela música de La Sirène fica impossibilitado de viver na terra e deve segui-la para o fundo do mar. Ela é a protetora dos nascituros e das mães grávidas, e a guardiã dos segredos mais profundos do oceano.',
    quemFoi:
      'La Sirène é a rainha sereia do Vodou haitiano, esposa de Agwé e governante do reino subaquático. Ela é a personificação da beleza marinha e do poder feminino.',
    personalidade: [
      'Deslumbrantemente bela',
      'Misteriosa — guarda segredos do fundo do mar',
      'Sedutora — sua voz encanta e prende',
      'Protetora das mães e nascituros',
      'Generosa com quem a honra',
      'Inalcançável — pertence ao mar',
      'Mágica — domina artes ocultas submarinas',
    ],
    dominios: ['Beleza', 'Mar e criaturas marinhas', 'Feminilidade', 'Magia e mistério', 'Gravidez e nascimento', 'Tesouros submarinos'],
    cores: ['Azul', 'Prata', 'Branco'],
    simbolos: ['Cauda de peixe prateada', 'Pente de ouro', 'Espelho de concha', 'Pérola branca', 'Coroa de coral', 'Espuma do mar'],
    elementosNaturais: ['Água doce e salgada', 'Pérola', 'Coral', 'Concha', 'Lua cheia', 'Espuma', 'Rochas costeiras'],
    saudacao: 'La Sirène! Sirène douce!',
    orikis: [
      { yoruba: 'La Sirène, rainha das águas, dona dos tesouros do abismo!', traducao: 'La Sirène, rainha das águas, dona dos tesouros do abismo!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'La Sirène é uma sereia real?', resposta: 'No Vodou, La Sirène é uma entidade espiritual que assume a forma de uma sereia. É real no contexto espiritual do Vodou.' },
      { pergunta: 'La Sirène e La Baleine são iguais?', resposta: 'Não. La Sirène é a rainha sereia bela e sedutora; La Baleine é uma entidade mais velha e protetora do oceano profundo.' },
      { pergunta: 'O que La Sirène gosta de receber?', resposta: 'Perfumes, espelhos, péolas, conchas, flores brancas, velas azuis, mel e frutas do mar.' },
    ],
    palavrasChaveSEO: ['La Sirène', 'Rainha sereia', 'Vodou haitiano', 'Loa do mar', 'Beleza marinha', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['La Sirène', 'Rainha sereia', 'Loa do mar'],
      en: ['La Sirène', 'The Mermaid Queen', 'Haitian Vodou sea loa'],
      es: ['La Sirène', 'La Reina Sirena', 'Loa del mar'],
      yo: ['La Sirène', 'Oba Omirin', 'Alágbò Okun Iya'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Mama Lola: A Vodou Priestess in Brooklyn — Karen McCarthy Brown',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['La Sirène, La Sirène, douce Sirène!', 'Sirène nan dlo a, ba m yon ti kè!'],
    cultos: {
      tradicionalAfricano: 'Ligada às tradições aquáticas das costas da África Ocidental.',
      brasil: 'Associada a Iemanjá em terreiros de Candomblé e Umbanda.',
      cuba: 'Relacionada a Yemayá na Santería cubana.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['Agwé'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. MARINETTE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-marinette',
    nome: 'Marinette',
    categoria: 'Loa',
    linha: 'Petwo / Linha do Fogo',
    reino: 'Fogo, Posse, Dança Extática, Transformação',
    historiaTradicional:
      'Marinette é uma das entidades mais selvagens e extáticas do Vodou haitiano, a Loa do fogo, da possessão e da dança transformadora. Ela é o espírito da dança frenética que consome o corpo e liberta a alma, a energia pura que queima todas as ilusões e limitações. Marinette é frequentemente retratada como uma mulher de cabelos flamejantes e olhos de fogo, dançando descalça sobre brasas vivas com uma liberdade que transcende a dor física. Ela habita nas chamas dos fogos sagrados e nos momentos de possessão extática, quando o vodouisant perde completamente o controle de si e se torna puro êxtase. Marinette é particularmente associada aos rituais da nação Petwo, a linha mais intensa e transformadora do Vodou, que utiliza fogo, gritos e movimentos vigorosos para quebrar as correntes da escravidão espiritual. Ela é invocada quando se precisa de transformação radical, de quebra de padrões antigos e de acesso ao poder bruto da natureza.',
    quemFoi:
      'Marinette é a Loa do fogo extático no Vodou haitiano, uma entidade da nação Petwo que representa a transformação através do êxtase e da possessão pura.',
    personalidade: [
      'Selvagem e indomável',
      'Extática — habita no êxtase da dança',
      'Transformadora — queima o velho para o novo',
      'Poderosa — seu fogo consome tudo',
      'Libertadora — quebra correntes espirituais',
      'Alegre em sua loucura sagrada',
      'Inspiradora — desperta coragem',
    ],
    dominios: ['Fogo', 'Possessão extática', 'Dança sagrada', 'Transformação', 'Libertação', 'Êxtase espiritual'],
    cores: ['Vermelho', 'Preto', 'Branco'],
    simbolos: ['Fogos sagrados', 'Chamas dançantes', 'Pés descalços sobre brasas', 'Cabelos flamejantes', 'Tambores Petwo', 'Machado'],
    elementosNaturais: ['Fogo', 'Brasa viva', 'Fumaça', 'Lava', 'Sol escaldante', 'Raio', 'Pólvora'],
    saudacao: 'Marinette! Marinette fouyi!',
    orikis: [
      { yoruba: 'Marinette, doudou nan, danseur dife!', traducao: 'Marinette, a louca sagrada, dançarina do fogo!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Marinette no Vodou?', resposta: 'Marinette é a Loa do fogo extático na nação Petwo. Representa a transformação radical através da dança e da possessão.' },
      { pergunta: 'Marinette é perigosa?', resposta: 'Sim. Seu fogo transformador consome indiscriminadamente se não houver um houngan qualificado para guiar o ritual.' },
      { pergunta: 'Como se manifesta Marinette?', resposta: 'Através de dança extática, gritos, movimentos frenéticos e, em alguns casos, o vodouisant dança sobre brasas.' },
    ],
    palavrasChaveSEO: ['Marinette', 'Dançarina do fogo', 'Vodou haitiano', 'Possessão extática', 'Nação Petwo'],
    palavrasChaveMultiIdiomas: {
      pt: ['Marinette', 'Dançarina do fogo', 'Loa extática', 'Petwo'],
      en: ['Marinette', 'The Fire Dancer', 'Haitian Vodou fire loa', 'Ecstatic possession'],
      es: ['Marinette', 'La Danzante del Fuego', 'Loa del fuego', 'Éxtasis Petwo'],
      yo: ['Marinette', 'Olùrìn Iná', 'Petwo Iná'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral dos terreiros Petwo haitianos',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Marinette fouyi! Marinette fouyi!', 'Danseur Marinette, coupe chenn mwen!'],
    cultos: {
      tradicionalAfricano: 'Desenvolvida no Haiti como parte da nação Petwo, nascida da resistência escrava.',
      brasil: 'Reconhecida em terreiros de Umbanda e Matriz Africana que trabalham com fogo.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. SIMGAN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-simgan',
    nome: 'Simgan',
    categoria: 'Loa',
    linha: 'Rada / Linha dos Mensageiros',
    reino: 'Mensagens, Viagens, Transições, Comunicação',
    historiaTradicional:
      'Simgan é o mensageiro veloz do Vodou haitiano, o Loa que transporta comunicações entre os seres humanos e os outros espíritos com rapidez e eficiência. Ele é o correio divino, o carteiro dos Loa, responsável por levar mensagens, pedidos e oferendas de um lado para o outro do mundo espiritual. Simgan é retratado como um jovem ágil e astuto, com sapatos alados que lhe permitem voar entre os mundos e um saco de couro cheio de cartas e recados. Ele é um dos três maridos de Erzulie Freda, sendo o mais rápido e vibrante dos três, e seu papel como mensageiro o torna indispensável em todas as cerimônias. Simgan é especialmente importante quando um devoto precisa de uma resposta rápida de um Loa, ou quando uma mensagem precisa atravessar grandes distâncias espirituais. Ele aceita oferendas de galinhas brancas, milho, café e sapatos novos. Seu dia é a segunda-feira, e seu número é o 3.',
    quemFoi:
      'Simgan é o mensageiro divino do Vodou haitiano, responsável por transportar comunicações entre humanos e Loa. Ele é um dos três maridos de Erzulie Freda.',
    personalidade: [
      'Rápido e ágil',
      'Astuto e esperto',
      'Comunicativo — fala todas as línguas',
      'Leal — nunca distorce mensagens',
      'Alegre e vibrante',
      'Eficiente — cumpridor incansável',
      'Curioso — quer saber de tudo',
    ],
    dominios: ['Mensagens', 'Viagens', 'Transições', 'Comunicação', 'Velocidade', 'Mercados'],
    cores: ['Branco', 'Vermelho'],
    simbolos: ['Sapatos alados', 'Saco de couro', 'Cartas e recados', 'Pássaro mensageiro', 'Relógio', 'Caminho'],
    elementosNaturais: ['Vento', 'Pássaro', 'Caminho', 'Pó de estrada', 'Nuvem', 'Milho'],
    saudacao: 'Simgan! Simgan vini!',
    orikis: [
      { yoruba: 'Simgan, mensageiro veloz, porta-voz dos Loa!', traducao: 'Simgan, mensageiro veloz, porta-voz dos Loa!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Simgan no Vodou?', resposta: 'Simgan é o mensageiro divino, o Loa que transporta comunicações com velocidade sobrenatural. É um dos três maridos de Erzulie Freda.' },
      { pergunta: 'Qual a relação de Simgan com Erzulie Freda?', resposta: 'Simgan é um dos três maridos dela, sendo o mais rápido e vibrante dos três.' },
      { pergunta: 'O que Simgan gosta de receber?', resposta: 'Galinas brancas, milho, café, sapatos novos e velas brancas.' },
    ],
    palavrasChaveSEO: ['Simgan', 'Mensageiro Vodou', 'Vodou haitiano', 'Loa das viagens', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Simgan', 'Mensageiro', 'Loa das viagens'],
      en: ['Simgan', 'The Messenger', 'Haitian Vodou messenger loa'],
      es: ['Simgan', 'El Mensajero', 'Loa mensajero'],
      yo: ['Simgan', 'Olùkọ̀rọ̀', 'Àláròkọ'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral dos houngan haitianos',
      'Mama Lola: A Vodou Priestess in Brooklyn — Karen McCarthy Brown',
    ],
    pontosCantados: ['Simgan vini! Simgan vini!', 'Simgan nan, ba m yon ti chimen pou m pase!'],
    cultos: {
      tradicionalAfricano: 'Ligado às tradições de mensageiros espirituais das culturas Fon e Yorùbá.',
      brasil: 'Associado a Exu msgs em terreiros de Umbanda.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['Erzulie Freda'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. DANBALA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-danbala',
    nome: 'Danbala',
    categoria: 'Loa',
    linha: 'Rada / Linha Primordial',
    reino: 'Criação, Água, Arco-Íris, Cosmologia',
    historiaTradicional:
      'Danbala é uma das divindades mais antigas e reverenciadas do Vodou haitiano, a Serpente Arco-Íris cósmica que representa a criação do mundo e a conexão entre o céu e a terra. Ele é o aspecto haitiano de Dan (ou Da), o Vodun da serpente da tradição Fon/Dahomeana, e é venerado como uma das primordiais forças criadoras do universo. Na cosmogonia vodou, Danbala era a serpente colossal que enrolou o mundo nas costas do deus criador Mawu-Lisa, sustentando a terra sobre o abismo. Quando a criação ameaçou afundar, Danbala comeu sua própria cauda para se contrair e segurar tudo junto, o que é o símbolo do ouroboros, da eternidade e do ciclo sem fim. O corpo de Danbala é o próprio arco-íris que une o céu à terra, e suas escamas reluzem com todas as cores do espectro. Danbala é uma das poucas entidades do Vodou que não precisa de sangue em seus sacrifícios, aceitando apenas leite branco, mel e ovos, símbolos de pureza e origem. Seu culto é profundamente pacífico e meditativo, e os iniciados de Danbala são conhecidos como curandeiros espirituais de grande sabedoria.',
    quemFoi:
      'Danbala é a Serpente Arco-Íris cósmica do Vodou haitiano, a manifestação de Da/Dan das tradições Fon. Uma das divindades mais antigas do panteão.',
    personalidade: [
      'Ancião e sábio',
      'Pacífico e sereno',
      'Generoso — derrama chuva fertilizante',
      'Protetor da criação',
      'Misterioso — habita águas subterrâneas',
      'Puro — aceita apenas oferendas sem sangue',
      'Curador — seus iniciados são grandes curandeiros',
    ],
    dominios: ['Criação do universo', 'Água e chuva', 'Arco-íris', 'Sabedoria ancestral', 'Curandeirismo', 'Renascimento'],
    cores: ['Branco', 'Arco-íris'],
    simbolos: ['Serpente enrolada (ouroboros)', 'Arco-íris', 'Leite branco', 'Mel', 'Ovo', 'Pedras brancas de rio', 'Fita branca'],
    elementosNaturais: ['Serpente', 'Água doce', 'Chuva', 'Arco-íris', 'Nascentes', 'Rios', 'Leite', 'Mel'],
    saudacao: 'Danbala! Danbala wedo!',
    orikis: [
      { yoruba: 'Danbala, serpente do céu, arco-íris que sustenta o mundo!', traducao: 'Danbala, serpente celeste, arco-íris que segura a terra!' },
      { yoruba: 'Danbala wedo, ba m yon ti dlo pou m bwè!', traducao: 'Danbala wedo, dá-me um pouco de água para eu beber!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Por que Danbala não aceita sangue?', resposta: 'Danbala é uma entidade primordial e pacífica que se alimenta apenas de pureza. Leite, mel e ovos representam a origem e a inocência.' },
      { pergunta: 'Danbala e Dan são a mesma entidade?', resposta: 'Sim. Danbala é a forma haitiana de Dan (ou Da), o Vodun da serpente da tradição Fon/Dahomeana.' },
      { pergunta: 'Como se manifesta Danbala?', resposta: 'Como uma serpente branca ou arco-íris. Em possessão, o vodouisant se move suavemente como uma serpente e fala com sabedoria ancestral.' },
    ],
    palavrasChaveSEO: ['Danbala', 'Serpente arco-íris', 'Vodou haitiano', 'Criação do mundo', 'Loa primordial', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Danbala', 'Serpente arco-íris', 'Loa da criação', 'Dan'],
      en: ['Danbala', 'Rainbow Serpent', 'Haitian Vodou creation loa', 'Da'],
      es: ['Danbala', 'Serpiente Arcoíris', 'Loa de la creación', 'Da'],
      yo: ['Danbala', 'Ejò Ará', 'Da Aido-Hwedo'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral dos mambo haitianos',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Danbala wedo! Danbala wedo!', 'Serpente du ciel, arche-en-ciel du monde!'],
    cultos: {
      tradicionalAfricano: 'Originário do culto a Dan/Da nas tradições Fon e Ewe do Daomé.',
      brasil: 'Associado a Oxalá e à serpente sagrada em terreiros de Candomblé.',
      cuba: 'Relacionado a Damballa na Santería cubana.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['Ayida Wedo'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. AYIDA WEDO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-ayida-wedo',
    nome: 'Ayida Wedo',
    categoria: 'Loa',
    linha: 'Rada / Linha Primordial',
    reino: 'Arco-Íris, Fertilidade, Criação, Maternidade Cósmica',
    historiaTradicional:
      'Ayida Wedo é a esposa de Danbala e uma das divindades mais poderosas e nutrientes do Vodou haitiano. Ela é a Serpente Fêmea Arco-Íris, a complemento cósmica de Danbala, e juntos eles formam o par divino que sustenta a criação. Ayida Wedo é a personificação da fertilidade, da maternidade cósmica e da abundância que flui da união perfeita entre masculino e feminino no universo. Enquanto Danbala é a serpente que enrola o mundo, Ayida Wedo é a serpente que dá vida a todas as criaturas que nele habitam. Ela é frequentemente retratada como uma mulher-serpente de beleza etérea, com escamas reluzentes que refletem todas as cores do arco-íris. Ayida Wedo é especialmente invocada por mulheres que desejam engravidar, mães que buscam proteção para seus filhos e pessoas que precisam de fertilidade em qualquer área da vida. Ela aceita oferendas de leite, mel, ovos brancos e flores coloridas, sempre sem sangue, assim como seu marido. Seu culto é pacífico, amoroso e profundamente ligado à natureza e aos ciclos da vida.',
    quemFoi:
      'Ayida Wedo é a Serpente Fêmea Arco-Íris do Vodou haitiano, esposa de Danbala e divindade da fertilidade e da maternidade cósmica.',
    personalidade: [
      'Nutritiva e amorosa — mãe cósmica',
      'Fértil — traz abundância e crescimento',
      'Pacífica e serena',
      'Protetora das mães e dos filhos',
      'Radiante — corpo é puro arco-íris',
      'Generosa — derrama bênçãos',
      'Sábia — conhecimento ancestral feminino',
    ],
    dominios: ['Arco-íris', 'Fertilidade', 'Maternidade', 'Criação', 'Abundância', 'Proteção de crianças'],
    cores: ['Arco-íris', 'Branco', 'Azul'],
    simbolos: ['Arco-íris feminino', 'Serpente fêmea enrolada', 'Leite e mel', 'Ovo branco', 'Flores coloridas', 'Lua cheia'],
    elementosNaturais: ['Arco-íris', 'Chuva', 'Leite', 'Flores', 'Rios', 'Nascentes', 'Lua'],
    saudacao: 'Ayida Wedo! Ayida nan!',
    orikis: [
      { yoruba: 'Ayida Wedo, serpente fêmea, mãe de toda a criação!', traducao: 'Ayida Wedo, serpente fêmea, mãe de toda a criação!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Ayida Wedo?', resposta: 'Ayida Wedo é a esposa de Danbala, a Serpente Fêmea Arco-Íris do Vodou haitiano. Divindade da fertilidade e maternidade cósmica.' },
      { pergunta: 'Danbala e Ayida Wedo são a mesma entidade?', resposta: 'Não, são complementos cósmicos. Danbala é o princípio masculino; Ayida Wedo o feminino. Juntos sustentam a criação.' },
      { pergunta: 'Como invocar Ayida Wedo?', resposta: 'Com leite, mel, ovos brancos e flores coloridas. Especialmente acessada por mulheres que buscam fertilidade.' },
    ],
    palavrasChaveSEO: ['Ayida Wedo', 'Serpente fêmea arco-íris', 'Vodou haitiano', 'Fertilidade', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Ayida Wedo', 'Serpente fêmea', 'Loa da fertilidade'],
      en: ['Ayida Wedo', 'Female Rainbow Serpent', 'Vodou fertility loa'],
      es: ['Ayida Wedo', 'Serpiente Femenina', 'Loa de la fertilidad'],
      yo: ['Ayida Wedo', 'Ará Inú', 'Dan Iya'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral dos mambo haitianos',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Ayida Wedo! Ayida nan dife!', 'Serpente du ciel, ba m yon ti dlo!'],
    cultos: {
      tradicionalAfricano: 'Originária do culto a Dan nas tradições Fon do Daomé.',
      brasil: 'Associada a Oxum e à fertilidade em terreiros de Candomblé.',
      cuba: 'Relacionada a Erzulie na Santería cubana.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      esposasMaridos: ['Danbala'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. SIMBI
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-simbi',
    nome: 'Simbi',
    categoria: 'Loa',
    linha: 'Rada / Linha das Águas',
    reino: 'Pântanos, Magia, Profecia, Águas Paradas',
    historiaTradicional:
      'Simbi é um dos Loa mais misteriosos e perigosos do Vodou haitiano, o espírito das águas paradas, dos pântanos e das lagoas escuras. Ele habita nos pântanos e charcos do interior do Haiti, onde as águas estagnadas criam um mundo à parte, separado do fluxo normal da natureza. Simbi é retratado como uma entidade de pele esverdeada com olhos que brilham como fogo-fátuo nas noites de lua nova. Ele é o senhor da magia, da profecia e do conhecimento oculto, e seus iniciados são reconhecidos como videntes e adivinhos de grande poder. Simbi possui vários aspectos, cada um governando uma corrente ou lagoa diferente: Simbi Dlo das águas claras, Simbi Makaya das águas escuras e pantanais, e Simbi Gran Bwa das águas da floresta. Ele é particularmente invocado para adivinhação, revelação de segredos e acesso ao conhecimento oculto. Porém, seu culto é considerado perigoso, pois diz-se que quem entra no pântano para encontrar Simbi pode nunca voltar.',
    quemFoi:
      'Simbi é o espírito das águas paradas e dos pântanos no Vodou haitiano, uma entidade misteriosa ligada à magia, profecia e conhecimento oculto.',
    personalidade: [
      'Misterioso e enigmático',
      'Perigoso — seu culto exige preparo',
      'Profético — revela o futuro',
      'Indomável — não obedece a ninguém',
      'Observador — habita o silêncio',
      'Poderoso — habilidades mágicas incomparáveis',
      'Temido — mesmo outros Loa o respeitam',
    ],
    dominios: ['Pântanos', 'Magia', 'Profecia', 'Águas paradas', 'Conhecimento oculto', 'Adivinhação'],
    cores: ['Verde', 'Preto', 'Marrom'],
    simbolos: ['Pântano', 'Água estagnada', 'Fogo-fátuo', 'Lagarto verde', 'Sapo', 'Pedra preta de rio', 'Raiz de pântano'],
    elementosNaturais: ['Água parada', 'Pântano', 'Lama', 'Musgo', 'Sapos', 'Lagartos', 'Névoa', 'Raízes submersas'],
    saudacao: 'Simbi! Simbi ou!',
    orikis: [
      { yoruba: 'Simbi, senhor das águas escuras, guardião dos segredos!', traducao: 'Simbi, senhor das águas escuras, guardião dos segredos!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Simbi no Vodou?', resposta: 'Simbi é o espírito das águas paradas e dos pântanos, ligado à magia e profecia. Habita charcos e lagoas escuras.' },
      { pergunta: 'Simbi é perigoso?', resposta: 'Sim, é uma das entidades mais perigosas do Vodou. Seu culto requer iniciação especial e um houngan experiente.' },
      { pergunta: 'Quais são os aspectos de Simbi?', resposta: 'Simbi Dlo (águas claras), Simbi Makaya (águas escuras/pantanais) e Simbi Gran Bwa (águas da floresta).' },
    ],
    palavrasChaveSEO: ['Simbi', 'Espírito do pântano', 'Vodou haitiano', 'Loa misterioso', 'Magia', 'Profecia'],
    palavrasChaveMultiIdiomas: {
      pt: ['Simbi', 'Espírito do pântano', 'Loa da magia'],
      en: ['Simbi', 'Swamp Spirit', 'Haitian Vodou magic loa'],
      es: ['Simbi', 'Espíritu del Pantano', 'Loa de la magia'],
      yo: ['Simbi', 'Ẹmi Igbo', 'Ìmọ̀lẹ̀ Igbo'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Mama Lola: A Vodou Priestess in Brooklyn — Karen McCarthy Brown',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Simbi ou! Simbi ou!', 'Simbi nan dlo a, ba m yon ti chimen!'],
    cultos: {
      tradicionalAfricano: 'Originário dos cultos de águas das tradições Fon e Kongo.',
      brasil: 'Associado a Oxóssi e espíritos da mata em terreiros de Umbanda.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      irmaos: ['Danbala', 'Agwé', 'Ayida Wedo'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. PETWO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-petwo',
    nome: 'Petwo',
    categoria: 'Loa',
    linha: 'Petwo / Linha do Fogo',
    reino: 'Revolução, Fogo, Quebra de Correntes, Transformação Radical',
    historiaTradicional:
      'Petwo não é apenas uma nação do Vodou, é também considerado uma entidade viva, o espírito encarnado do fogo revolucionário que libertou o Haiti da escravidão. O nome Petwo vem do verbo crioulo petwe que significa assado no fogo ou frito, referindo-se à transformação pelo calor intenso. A nação Petwo nasceu durante a Revolução Haitiana de 1791, quando os escravos africanos criaram uma nova forma de Vodou que incorporava o fogo, a força bruta e a energia transformadora necessária para quebrar as correntes da escravidão. Petwo é o espírito que habita em cada chama, em cada fogo sagrado, em cada gesto de resistência contra a opressão. Ele é o oposto complementar de Rada, a nação pacífica e ancestral. Enquanto Rada traz harmonia e sabedoria, Petwo traz mudança radical e quebra de padrões. Diz-se que Petwo precisa de Rada para não se destruir, e que Rada precisa de Petwo para não estagnar. Juntos, eles formam o equilíbrio dinâmico que mantém o Vodou vivo e relevante.',
    quemFoi:
      'Petwo é o espírito do fogo revolucionário no Vodou haitiano, nascido durante a Revolução Haitiana de 1791. Personifica a resistência e a liberdade conquistada pelo fogo.',
    personalidade: [
      'Feroz e revolucionário',
      'Transformador — nada escapa de sua força',
      'Libertador — quebra correntes',
      'Impulsivo — age antes de pensar',
      'Necessário — sem Petwo não há mudança',
      'Complementar a Rada',
      'Inabalável — enfrenta qualquer obstáculo',
    ],
    dominios: ['Revolução', 'Fogo', 'Quebra de correntes', 'Transformação radical', 'Resistência', 'Liberdade'],
    cores: ['Vermelho', 'Preto'],
    simbolos: ['Fogo sagrado', 'Corrente quebrada', 'Machado de guerra', 'Tocha', 'Pólvora', 'Sangue de resistência', 'Brasas vivas'],
    elementosNaturais: ['Fogo', 'Lava', 'Pólvora', 'Sangue', 'Raio', 'Sol escaldante', 'Tempestade'],
    saudacao: 'Petwo! Petwo rivi!',
    orikis: [
      { yoruba: 'Petwo, fogo da liberdade, quebra correntes!', traducao: 'Petwo, fogo da liberdade, quebra correntes!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'O que é a nação Petwo no Vodou?', resposta: 'Uma das duas grandes divisões do Vodou haitiano. Petwo é a linha do fogo, transformação e revolução, nascida em 1791.' },
      { pergunta: 'Petwo e Rada são opostos?', resposta: 'São complementares. Rada representa sabedoria ancestral; Petwo representa o fogo da mudança. Ambos são necessários.' },
      { pergunta: 'Quando se usa rituais Petwo?', resposta: 'Quando se precisa de mudança radical, quebra de correntes espirituais, justiça rápida e transformação profunda.' },
    ],
    palavrasChaveSEO: ['Petwo', 'Fogo revolucionário', 'Vodou haitiano', 'Nação Petwo', 'Revolução Haitiana'],
    palavrasChaveMultiIdiomas: {
      pt: ['Petwo', 'Fogo revolucionário', 'Nação Petwo'],
      en: ['Petwo', 'Revolutionary Fire', 'Petwo nation'],
      es: ['Petwo', 'Fuego Revolucionario', 'Nación Petwo'],
      yo: ['Petwo', 'Iná Ìyína', 'Petwo Ilé'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Haitian Vodou: An Introduction — Kate Ramsey',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Petwo rivi! Petwo rivi!', 'Petwo nan dife a, coupe chenn mwen!'],
    cultos: {
      tradicionalAfricano: 'Nascido no Haiti durante a Revolução de 1791, incorporando tradições Fon e Kongo.',
      brasil: 'Reconhecido em terreiros de Umbanda e Matriz Africana que trabalham com fogo.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 15. MARINETTE BRAQUETO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-marinette-braqueto',
    nome: 'Marinette Braqueto',
    categoria: 'Loa',
    linha: 'Petwo / Linha da Guerra',
    reino: 'Flechas, Precisão, Guerra, Artes Marciais',
    historiaTradicional:
      'Marinette Braqueto é uma das entidades mais temidas e respeitadas da nação Petwo, a Loa das flechas e da precisão mortal. Diferente de Marinette, a dançarina do fogo, Marinette Braqueto é a guerreira que jamais erra, cada flecha que dispara atinge o alvo com precisão cirúrgica. Ela é retratada como uma guerreira esbelta e feroz, com um arco de madeira negra tensionado por corda de tendão, e um aljava cheio de flechas cujas pontas brilham com veneno sagrado. Marinette Braqueto é invocada quando se precisa de precisão em qualquer empreendimento, seja na guerra espiritual, na justiça ou na vida cotidiana. Ela ensina que a força bruta sem precisão é inútil, e que o verdadeiro poder vem da combinação entre força e habilidade. Seus iniciados são conhecidos como guerreiros de extrema habilidade, capazes de acertar qualquer alvo com os meios que tiverem à disposição. Marinette Braqueto é especialmente reverenciada pelos caçadores e pelos guerreiros espirituais do Vodou.',
    quemFoi:
      'Marinette Braqueto é a Loa das flechas e da precisão na nação Petwo. A guerreira que jamais erra, representando a combinação perfeita entre força e habilidade.',
    personalidade: [
      'Precisa — nunca erra o alvo',
      'Feroz — guerra sem piedade',
      'Disciplinada — controla cada movimento',
      'Silenciosa — age no silêncio da noite',
      'Respeitosa — códigos de honra',
      'Eficaz — resultados acima de tudo',
      'Temida — seus inimigos tremem',
    ],
    dominios: ['Flechas e arco', 'Precisão', 'Guerreiro espiritual', 'Caça', 'Justiça direta', 'Artes marciais'],
    cores: ['Vermelho', 'Branco', 'Preto'],
    simbolos: ['Arco e flecha', 'Aljava', 'Flecha envenenada', 'Olho mirando', 'Mira', 'Pontaria'],
    elementosNaturais: ['Madeira negra de arco', 'Corda de tendão', 'Ponta de osso', 'Flecha de ferro', 'Noite escura', 'Silêncio da floresta'],
    saudacao: 'Marinette Braqueto! Braqueto nan!',
    orikis: [
      { yoruba: 'Marinette Braqueto, flecha que nunca erra, olho que nunca dorme!', traducao: 'Marinette Braqueto, flecha que nunca erra, olho que nunca dorme!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Qual a diferença entre Marinette e Marinette Braqueto?', resposta: 'Marinette é a dançarina do fogo extático; Marinette Braqueto é a guerreira das flechas, ligada à precisão e guerra direta.' },
      { pergunta: 'Quando invocar Marinette Braqueto?', resposta: 'Quando se precisa de precisão em qualquer empreendimento, especialmente justiça, caça e guerra espiritual.' },
      { pergunta: 'Marinette Braqueto aceita sacrifícios?', resposta: 'Sim, galos vermelhos e, em cerimônias especiais, cabritos.' },
    ],
    palavrasChaveSEO: ['Marinette Braqueto', 'Flecha que nunca erra', 'Vodou haitiano', 'Nação Petwo', 'Precisão guerreira'],
    palavrasChaveMultiIdiomas: {
      pt: ['Marinette Braqueto', 'Flecha que nunca erra', 'Loa da precisão'],
      en: ['Marinette Braqueto', 'The Arrow Dancer', 'Haitian Vodou precision loa'],
      es: ['Marinette Braqueto', 'La Danzante de Flechas', 'Loa de la precisión'],
      yo: ['Marinette Braqueto', 'Olùrìn Akó', 'Petwo Akó'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral dos terreiros Petwo haitianos',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Braqueto nan! Braqueto nan!', 'Flecha que nunca erra, venha nos guiar!'],
    cultos: {
      tradicionalAfricano: 'Parte da nação Petwo, desenvolvida durante a resistência escrava.',
      brasil: 'Reconhecida em terreiros de Umbanda e Matriz Africana.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 16. TI JEAN
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-ti-jean',
    nome: 'Ti Jean',
    categoria: 'Loa',
    linha: 'Rada / Linha dos Truques',
    reino: 'Transformação, Trapaça, Justiça, Inversão',
    historiaTradicional:
      'Ti Jean, ou Petit Jean, é o trapaceiro astuto do Vodou haitiano, um Loa que se assemelha aos tricksters de muitas mitologias mundiais. Ele é o eterno subversivo, o pequeno que vence o grande, o fraco que derrota o forte através da inteligência e da astúcia. Ti Jean é retratado como um jovem baixinho e sorrateiro, sempre sorrindo, com sapatos furados e roupas remendadas, mas com olhos que brilham de inteligência afiada. Nas histórias populares do Haiti, Ti Jean enfrenta ogros gigantes, reis cruéis e monstros terríveis, sempre vencendo através de truques, mentiras engenhosas e inversões de expectativa. Ele é a personificação do povo oprimido que sobrevive e vence através da esperteza quando a força bruta não está disponível. Ti Jean é especialmente importante no Vodou porque ensina que a verdadeira justiça muitas vezes precisa ser conquistada fora das regras do opressor. Ele é invocada para resolver problemas difíceis, encontrar saídas onde parece não haver nenhuma, e trazer justiça aos oprimidos.',
    quemFoi:
      'Ti Jean é o trickster do Vodou haitiano, o eterno subversivo que vence o grande através da inteligência. Representa o povo oprimido que sobrevive pela esperteza.',
    personalidade: [
      'Astuto e engenhoso',
      'Humorístico',
      'Subversivo — desafia a ordem',
      'Corajoso — enfrenta gigantes',
      'Justo — pune poderosos',
      'Imprevisível',
      'Transformador — muda de forma',
    ],
    dominios: ['Transformação', 'Trapaça sagrada', 'Justiça dos oprimidos', 'Inversão de poder', 'Inteligência', 'Humor'],
    cores: ['Vermelho', 'Preto', 'Branco'],
    simbolos: ['Sapatos furados', 'Punhal pequeno', 'Saco de truques', 'Máscara de palhaço', 'Dado', 'Galo pequeno'],
    elementosNaturais: ['Fogo de fogueira', 'Caminho de terra', 'Água rasa', 'Lama', 'Noite com lua', 'Floresta'],
    saudacao: 'Ti Jean! Ti Jean petro!',
    orikis: [
      { yoruba: 'Ti Jean, o pequeno que vence o grande, o fraco que derrota o forte!', traducao: 'Ti Jean, o pequeno que vence o grande, o fraco que derrota o forte!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Ti Jean no Vodou?', resposta: 'O trickster do Vodou haitiano, um Loa astuto que representa o povo oprimido vencendo o opressor pela inteligência.' },
      { pergunta: 'Ti Jean é bom ou mau?', resposta: 'Não é nem bom nem mau. Pune os maus e recompensa os bons usando métodos não convencionais.' },
      { pergunta: 'Ti Jean é o mesmo que Anansi?', resposta: 'São tricksters de tradições diferentes. Anansi é Ashanti (Gana); Ti Jean é haitiano. Compartilham astúcia e humor.' },
    ],
    palavrasChaveSEO: ['Ti Jean', 'Trapaceiro', 'Vodou haitiano', 'Trickster', 'Justiça dos oprimidos'],
    palavrasChaveMultiIdiomas: {
      pt: ['Ti Jean', 'O Trapaceiro', 'Loa da transformação'],
      en: ['Ti Jean', 'The Trickster', 'Haitian Vodou trickster'],
      es: ['Ti Jean', 'El Tramposo', 'Loa tramposo'],
      yo: ['Ti Jean', 'Alágbèdè', 'Ẹlẹ́gbẹ́ẹ́'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Contos populares do Haiti compilados por Alfred Métraux',
      'Tradição oral das comunidades rurais do Haiti',
    ],
    pontosCantados: ['Ti Jean petro! Ti Jean petro!', 'O pequeno vence o grande!'],
    cultos: {
      tradicionalAfricano: 'Ligado às tradições de tricksters das culturas Fon e Kongo.',
      brasil: 'Associado a Exu Trapaceiro e figuras de inversão em terreiros de Umbanda.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 17. BOSALIE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-bosalie',
    nome: 'Bosalie',
    categoria: 'Loa',
    linha: 'Rada / Linha Selvagem',
    reino: 'Selvagem, Natureza Indomada, Poder Primordial',
    historiaTradicional:
      'Bosalie, também conhecido como Bossale ou Bosale, é o Loa da selvageria indomada do Vodou haitiano. Ele representa a natureza antes da domesticação, o poder primordial que existia antes da civilização, da religião organizada e das regras sociais. O nome Bosalie vem de bossale que significa não domesticado ou selvagem em crioulo haitiano, referindo-se originalmente aos escravos africanos recém-chegados que ainda não tinham sido quebrados pelos senhores coloniais. Bosalie é retratado como um ser selvagem e poderoso, vestido com peles de animais, com cabelos trançados e olhos que brilham com fogo primitivo. Ele é o guardião da força bruta da natureza, da energia não domesticada que pulsa no coração de todas as coisas vivas. Bosalie é invocada quando se precisa de força primal, coragem bruta e acesso ao poder não filtrado da natureza. Ele é particularmente importante para os guerreiros espirituais que precisam acessar reservas de força que não vêm da civilização, mas do próprio sangue e da própria terra.',
    quemFoi:
      'Bosalie é o Loa da selvageria indomada no Vodou haitiano, representando o poder primordial da natureza antes da civilização. Seu nome significa não domesticado.',
    personalidade: [
      'Selvagem e indomado',
      'Primal — acesso ao poder bruto',
      'Feroz — força que não pode ser contida',
      'Livre — não conhece limites',
      'Honesto em sua selvageria',
      'Poderoso — energia das raízes',
      'Protetor dos oprimidos',
    ],
    dominios: ['Selvageria', 'Natureza indomada', 'Força primordial', 'Liberdade', 'Resistência', 'Animais selvagens'],
    cores: ['Vermelho', 'Preto', 'Marrom'],
    simbolos: ['Peles de animais', 'Correntes quebradas', 'Machado de guerra', 'Cabelo trançado', 'Fogo primitivo', 'Raiz de árvore'],
    elementosNaturais: ['Floresta selvagem', 'Fogo', 'Sangue', 'Terra crua', 'Animais', 'Raízes', 'Tempestade'],
    saudacao: 'Bosalie! Bosale!',
    orikis: [
      { yoruba: 'Bosalie, o indomado, força que não pode ser quebrada!', traducao: 'Bosalie, o indomado, força que não pode ser quebrada!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'O que significa Bosalie?', resposta: 'Vem de bossale em crioulo haitiano, significando não domesticado ou selvagem. Originalmente referia-se aos escravos recém-chegados.' },
      { pergunta: 'Bosalie é perigoso?', resposta: 'Sim, representa poder bruto indomado. Seu culto requer respeito e preparo.' },
      { pergunta: 'Quando invocar Bosalie?', resposta: 'Quando se precisa de força primal, coragem bruta e acesso ao poder não filtrado da natureza.' },
    ],
    palavrasChaveSEO: ['Bosalie', 'O Não Batizado', 'Vodou haitiano', 'Poder primordial', 'Selvageria'],
    palavrasChaveMultiIdiomas: {
      pt: ['Bosalie', 'O Não Batizado', 'Selvageria', 'Poder primordial'],
      en: ['Bosalie', 'The Unbaptized One', 'Wild power', 'Primal force'],
      es: ['Bosalie', 'El No Bautizado', 'Poder salvaje', 'Fuerza primordial'],
      yo: ['Bosalie', 'Àgbára Aìsọ̀kan', 'Ipá Adúgbọn'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral das comunidades rurais do Haiti',
      'Haitian Vodou: An Introduction — Kate Ramsey',
    ],
    pontosCantados: ['Bosalie! Bosale!', 'O indomado, venha nos guiar!'],
    cultos: {
      tradicionalAfricano: 'Originário do culto aos escravos recém-chegados com tradições africanas intactas.',
      brasil: 'Associado a Pretos Velhos e ancestrais indomados em terreiros de Umbanda.',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 18. GRAND BOIS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-grand-bois',
    nome: 'Grand Bois',
    categoria: 'Loa',
    linha: 'Rada / Linha da Natureza',
    reino: 'Floresta, Árvores, Espíritos da Natureza',
    historiaTradicional:
      'Grand Bois, que significa A Grande Floresta em francês, é o senhor de todas as árvores, de todas as florestas e de todos os espíritos que habitam o mundo vegetal no Vodou haitiano. Ele é a personificação viva da floresta, cada árvore, cada raiz, cada folha é parte de seu corpo e de seu espírito. Grand Bois é retratado como um velho colossal feito de casca de árvore e musgo, com olhos que são duas águas de nascentes e braços que são ramos enormes. Ele habita no coração das florestas mais densas e antigas do Haiti, onde os raios de sol mal conseguem penetrar e o silêncio é profundo. Grand Bois é o protetor de todas as plantas medicinais e ervas sagradas que os houngan e mambo utilizam em seus rituais. Sem ele, nenhuma fórmula herbal funcionaria, nenhuma cura com ervas seria possível. Ele é especialmente invocada por curandeiros, herbalistas e todos que trabalham com plantas medicinais. Grand Bois é pacífico quando respeitado, mas terrivelmente furioso quando as florestas são derrubadas ou destruídas.',
    quemFoi:
      'Grand Bois é a personificação da floresta no Vodou haitiano, senhor de todas as árvores e espíritos vegetais. Guardião das plantas medicinais e do conhecimento herbal.',
    personalidade: [
      'Ancião e sábio',
      'Protetor — defensor das árvores',
      'Pacífico quando respeitado',
      'Terrível quando florestas são destruídas',
      'Generoso — compartilha ervas',
      'Paciente — espera o tempo certo',
      'Onipresente — está em cada árvore',
    ],
    dominios: ['Floresta', 'Árvores', 'Ervas medicinais', 'Curandeirismo herbal', 'Espíritos da natureza', 'Conhecimento botânico'],
    cores: ['Verde', 'Marrom', 'Branco'],
    simbolos: ['Árvore centenária', 'Casca de árvore', 'Musgo', 'Raízes', 'Folhas verdes', 'Nascente de água', 'Machado'],
    elementosNaturais: ['Árvore', 'Folha', 'Raiz', 'Musgo', 'Fungo', 'Fern', 'Terra úmida', 'Chuva na floresta'],
    saudacao: 'Grand Bois! Gran Bwa!',
    orikis: [
      { yoruba: 'Grand Bois, senhor da floresta, guardião de todas as árvores!', traducao: 'Grand Bois, senhor da floresta, guardião de todas as árvores!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Grand Bois no Vodou?', resposta: 'O senhor da floresta e de todas as árvores. Guardião das plantas medicinais e do conhecimento herbal ancestral.' },
      { pergunta: 'Grand Bois é ligado a Simbi?', resposta: 'Sim, Grand Bois e Simbi são frequentemente associados, especialmente Simbi Gran Bwa que governa as águas da floresta.' },
      { pergunta: 'Como honrar Grand Bois?', resposta: 'Plantando árvores, protegendo florestas e oferecendo velas brancas e verdes no pé de árvores centenárias, café e mel.' },
    ],
    palavrasChaveSEO: ['Grand Bois', 'A Grande Floresta', 'Vodou haitiano', 'Loa das árvores', 'Ervas medicinais', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Grand Bois', 'A Grande Floresta', 'Loa das árvores'],
      en: ['Grand Bois', 'The Great Forest', 'Haitian Vodou tree loa'],
      es: ['Grand Bois', 'El Gran Bosque', 'Loa de los árboles'],
      yo: ['Grand Bois', 'Igi Nla', 'Àgbà Igi'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral dos houngan haitianos',
      'Les Plantes Sacrées du Vodou — Milo Rigaud',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Gran Bwa! Gran Bwa!', 'Senhor da floresta, ouvri ba m chemin an!'],
    cultos: {
      tradicionalAfricano: 'Ligado aos cultos de floresta das tradições Fon e Kongo.',
      brasil: 'Associado a Oxóssi e espíritos da mata em terreiros de Umbanda e Candomblé.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      irmaos: ['Simbi', 'Danbala', 'Ayida Wedo'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 19. LOKO
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-loko',
    nome: 'Loko',
    categoria: 'Loa',
    linha: 'Rada / Linha da Cura',
    reino: 'Cura, Plantas Medicinais, Botânica Sagrada',
    historiaTradicional:
      'Loko é o grande curador do Vodou haitiano, o Loa que domina todas as artes de cura com plantas medicinais, ervas sagradas e fórmulas botânicas. Ele é frequentemente associado a Ayida Wedo e é reconhecido como o médico-chefe dos Loa, se algum outro Loa fica doente ou ferido, é Loko quem os cura. Loko é retratado como um homem de aparência suave e serena, vestido com roupas brancas e verdes, com um cesto cheio de ervas medicinais pendurado ao ombro e um bastão de madeira sagrada na mão. Ele é o patrono dos houngan e mambo que se especializam em curandeirismo herbal, e seus iniciados são conhecidos como os melhores curandeiros do Vodou. Loko ensina que a cura começa no espírito e se manifesta no corpo, e que todas as plantas do mundo foram criadas com um propósito curativo específico. Ele é especialmente invocada para curar doenças, envenenamentos, feitiçaria e para purificar o corpo e a alma. A festa de Loko é celebrada com oferendas de flores brancas, ervas frescas, café e velas brancas.',
    quemFoi:
      'Loko é o grande curador do Vodou haitiano, o médico-chefe dos Loa e patrono do curandeirismo herbal. Domina todas as artes de cura com plantas medicinais.',
    personalidade: [
      'Gentil e acolhedor',
      'Sábio — conhece todas as plantas',
      'Paciente — espera a cura',
      'Sereno — transmite calma',
      'Generoso — cura sem distinção',
      'Humilde apesar de seu poder',
      'Protetor dos doentes',
    ],
    dominios: ['Cura com ervas', 'Medicina herbal', 'Botânica sagrada', 'Purificação', 'Envenenamento (cura)', 'Doenças espirituais'],
    cores: ['Branco', 'Verde', 'Amarelo'],
    simbolos: ['Cesto de ervas', 'Bastão de madeira sagrada', 'Flores brancas', 'Mortero e pilão', 'Folhas medicinais', 'Vela branca'],
    elementosNaturais: ['Ervas medicinais', 'Flores', 'Raízes curativas', 'Folhas verdes', 'Água de nascente', 'Terra fértil', 'Luz do sol'],
    saudacao: 'Loko! Loko ayi!',
    orikis: [
      { yoruba: 'Loko, curador supremo, mestre de todas as ervas sagradas!', traducao: 'Loko, curador supremo, mestre de todas as ervas sagradas!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Loko no Vodou?', resposta: 'O grande curador do Vodou haitiano, médico-chefe dos Loa e patrono do curandeirismo herbal.' },
      { pergunta: 'Loko e Ayida Wedo têm relação?', resposta: 'Sim, Loko é frequentemente associado a Ayida Wedo como companheiro de cura, representando o poder curativo da natureza.' },
      { pergunta: 'Como invocar Loko?', resposta: 'Com velas brancas, flores frescas, ervas medicinais e café. Seus iniciados carregam cestos de ervas.' },
    ],
    palavrasChaveSEO: ['Loko', 'Curador Vodou', 'Vodou haitiano', 'Ervas medicinais', 'Botânica sagrada', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Loko', 'O Curador', 'Loa da cura'],
      en: ['Loko', 'The Healer', 'Haitian Vodou healing loa'],
      es: ['Loko', 'El Curandero', 'Loa sanador'],
      yo: ['Loko', 'Olùdà', 'Oníṣẹ̀gùn'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Les Plantes Sacrées du Vodou — Milo Rigaud',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
    ],
    pontosCantados: ['Loko ayi! Loko ayi!', 'Curador supremo, ba m yon ti fèy!'],
    cultos: {
      tradicionalAfricano: 'Ligado aos cultos de cura e ervas das tradições Fon e Kongo.',
      brasil: 'Associado a Oxóssi e às tradições de cura em terreiros de Umbanda.',
    },
    genealogia: {
      esposasMaridos: ['Ayida Wedo'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // 20. AZAKA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'loa-azaka',
    nome: 'Azaka',
    categoria: 'Loa',
    linha: 'Rada / Linha da Terra',
    reino: 'Agricultura, Colheita, Plantio, Terra Fértil',
    historiaTradicional:
      'Azaka, também conhecido como Coyer ou Koyasan, é o Loa da agricultura, da colheita e do trabalho na terra no Vodou haitiano. Ele é o senhor de todas as plantações, o protetor dos fazendeiros e dos trabalhadores rurais que dependem da terra para sobreviver. Azaka é retratado como um homem simples e trabalhador, vestido com roupas de fazendeiro, usando um chapéu de palha, sapatos de couro surrado e carregando uma enxada ou um facão. Ele é humilde e generoso, sempre pronto para ajudar quem trabalha honestamente a terra. Azaka habita nas plantações e nos campos de cultivo, especialmente nos milharais e nas roças de mandioca. Ele é especialmente invocado no início da estação de plantio, na hora da colheita e quando as safras estão ameaçadas por pragas ou secas. Azaka aceita oferendas de milho, feijão, batata-doce, café, charutos e rhum. Ele é um dos Loa mais populares entre os haitianos rurais, que dependem de sua proteção para ter boas colheitas e sobreviver. Sua festa é celebrada em 1 de maio, o Dia do Trabalho, com banquetes campestres e danças ao som de tambores.',
    quemFoi:
      'Azaka é o Loa da agricultura no Vodou haitiano, o senhor das plantações e protetor dos fazendeiros. Humilde e generoso, é um dos Loa mais populares entre os rurais.',
    personalidade: [
      'Trabalhador incansável',
      'Humilde — apesar de seu poder',
      'Generoso — compartilha a colheita',
      'Paciente — confia nos ciclos da terra',
      'Protetor dos fazendeiros',
      'Simples — prefere a vida rural',
      'Agradecido — agradece cada colheita',
    ],
    dominios: ['Agricultura', 'Colheita', 'Plantio', 'Terra fértil', 'Fazendeiros', 'Manejo de pragas', 'Prosperidade rural'],
    cores: ['Azul', 'Branco', 'Marrom'],
    simbolos: ['Enxada', 'Facão', 'Chapéu de palha', 'Milho', 'Mandioca', 'Saco de sementes', 'Sapato de couro'],
    elementosNaturais: ['Terra fértil', 'Milho', 'Mandioca', 'Feijão', 'Chuva', 'Sol', 'Enxada', 'Semente'],
    saudacao: 'Azaka! Azaka Ker yo!',
    orikis: [
      { yoruba: 'Azaka, senhor da terra, pai de todas as colheitas!', traducao: 'Azaka, senhor da terra, pai de todas as colheitas!' },
    ],
    perguntasFrequentes: [
      { pergunta: 'Quem é Azaka no Vodou?', resposta: 'O Loa da agricultura e da colheita, senhor das plantações e protetor dos fazendeiros haitianos.' },
      { pergunta: 'Azaka é o mesmo que Oxóssi?', resposta: 'Não. Azaka (Vodou haitiano) e Oxóssi (Orixá Yorùbá) são entidades de tradições diferentes, embora ambos sejam ligados à terra e caça.' },
      { pergunta: 'O que Azaka gosta de receber?', resposta: 'Milho, feijão, batata-doce, café, charutos e rhum. Ele prefere oferendas simples e sinceras.' },
    ],
    palavrasChaveSEO: ['Azaka', 'Loa da agricultura', 'Vodou haitiano', 'Colheita', 'Fazendeiro', 'Rada'],
    palavrasChaveMultiIdiomas: {
      pt: ['Azaka', 'Loa da agricultura', 'Senhor da terra'],
      en: ['Azaka', 'The Farmer', 'Haitian Vodou agriculture loa'],
      es: ['Azaka', 'El Agricultor', 'Loa de la agricultura'],
      yo: ['Azaka', 'Olùgbìn', 'Ọba Ilẹ̀'],
    },
    referencias: [
      'Vodou Haitiano: Mitos y Rituales — Milo Rigaud',
      'The Voodoo Gods — Maya Deren',
      'Tradição oral dos houngan rurais do Haiti',
      'Sacred Arts of Haitian Vodou — Donald Cosentino',
      'Haitian Vodou: An Introduction — Kate Ramsey',
    ],
    pontosCantados: ['Azaka Ker yo! Azaka Ker yo!', 'Senhor da terra, ba m yon ti chimen!'],
    cultos: {
      tradicionalAfricano: 'Originário dos cultos de terra e agricultura das tradições Fon e Kongo.',
      brasil: 'Associado a Oxóssi e Oxalá em terreiros de Candomblé e Umbanda.',
      cuba: 'Relacionado a Ogún em suas qualidades de senhor da terra.',
      eua: 'Reverenciado em comunidades haitianas rurais e urbanas.',
    },
    genealogia: {
      pai: 'Mawu-Lisa',
      irmaos: ['Grand Bois', 'Simbi', 'Danbala'],
    },
  },
];
