import React, { useState, useMemo } from 'react';
import { ArrowLeft, RefreshCw, Share2, ChevronRight, Trophy, Medal, Award } from 'lucide-react';
import SEO from './SEO';

interface QuizOption {
  text: string;
  scores: Record<string, number>;
}
interface QuizQuestion {
  id: number;
  question: string;
  emoji: string;
  options: QuizOption[];
}

interface OrixaData {
  name: string; title: string; emoji: string;
  color: string; gradient: string;
  description: string; qualities: string[];
  day: string; element: string; offerings: string;
  greeting: string; advice: string;
}

const ORIXAS: Record<string, OrixaData> = {
  exu: {
    name: 'Exu', title: 'O Abridor de Caminhos', emoji: '🔑',
    color: '#FF7043', gradient: 'linear-gradient(135deg, #1a1a1a, #c62828, #ff7043)',
    description: 'Exu Mensageiro guia seus passos! Você é espirituoso, adaptável e estratégico. Tem um dom para encontrar caminhos onde outros veem muros. Sua comunicação é poderosa e seu humor, contagiente. Na encruzilhada, você sempre sabe qual rumo tomar.',
    qualities: ['Estratégico(a)', 'Comunicativo(a)', 'Adaptável', 'Espirituoso(a)', 'Astuto(a)'],
    day: 'Segunda', element: 'Encruzilhada e fogo', offerings: 'Farofa, cachaça, charuto, pimenta',
    greeting: 'Laroyê Exu!', advice: 'Você tem as chaves de todos os caminhos. Abra portas — para você e para os outros.'
  },
  ogum: {
    name: 'Ogum', title: 'O Senhor dos Caminhos', emoji: '⚔️',
    color: '#66BB6A', gradient: 'linear-gradient(135deg, #1b5e20, #2e7d32, #66bb6a)',
    description: 'Ogum é o seu protetor! Você é determinado, trabalhador e não desiste. Tem uma energia que abre caminhos onde não existiam. Sua honestidade às vezes parece brusca, mas vem de integridade absoluta. O ferro e a luta são sua essência.',
    qualities: ['Determinado(a)', 'Perseverante', 'Honesto(a)', 'Líder', 'Corajoso(a)'],
    day: 'Terça', element: 'Ferro e floresta', offerings: 'Feijoada, cachaça, azeite de dendê, melancia',
    greeting: 'Ogum Iê!', advice: 'Você tem força para superar qualquer obstáculo. Mas lembre: a espada protege, não destrói.'
  },
  oxossi: {
    name: 'Oxóssi', title: 'O Rei da Floresta', emoji: '🏹',
    color: '#26A69A', gradient: 'linear-gradient(135deg, #004d40, #00695c, #26a69a)',
    description: 'Oxóssi rege seu destino! Você tem espírito livre, aventureiro e conectado com a natureza. Sua intuição para encontrar o que precisa é extraordinária — seja uma solução ou o caminho certo. A floresta é seu templo.',
    qualities: ['Livre', 'Intuitivo(a)', 'Aventureiro(a)', 'Generoso(a)', 'Conectado(a)'],
    day: 'Quinta', element: 'Floresta e caça', offerings: 'Inhame, milho, frutas da mata, favas',
    greeting: 'Okê Arô!', advice: 'Confie no seu instinto. Como o caçador, você sabe exatamente onde mirar.'
  },
  oxum: {
    name: 'Oxum', title: 'A Rainha das Águas Doces', emoji: '💛',
    color: '#FFD54F', gradient: 'linear-gradient(135deg, #e65100, #ff8f00, #ffca28)',
    description: 'Oxum rege seu caminho! Você irradia beleza, amor e prosperidade. Tem senso estético apurado, atrai pessoas naturalmente e possui generosidade que encanta. Seu coração é de ouro — literalmente. As águas doces cantam sua história.',
    qualities: ['Carismático(a)', 'Amoroso(a)', 'Próspero(a)', 'Artístico(a)', 'Diplomático(a)'],
    day: 'Sábado', element: 'Água doce e ouro', offerings: 'Mel, abóbora, espelho dourado, amarelo',
    greeting: 'Ora Yeye O!', advice: 'Você foi feito(a) para brilhar. Permita-se receber tanto quanto você doa.'
  },
  iansa: {
    name: 'Iansã', title: 'A Senhora dos Ventos', emoji: '🌪️',
    color: '#AB47BC', gradient: 'linear-gradient(135deg, #4a148c, #7b1fa2, #ab47bc)',
    description: 'Iansã, guerreira dos ventos, é quem rege você! Você é apaixonado, intenso e não tem medo de enfrentar tempestades. Sua coragem é contagiante e sua lealdade, inquestionável. O vento leva e traz — e você controla essa força.',
    qualities: ['Corajoso(a)', 'Intenso(a)', 'Leal', 'Transformador(a)', 'Apaixonado(a)'],
    day: 'Quarta', element: 'Vento e tempestade', offerings: 'Acarajé, carurú, azeite de dendê',
    greeting: 'Êpá Hei!', advice: 'Você tem a força do vento. Não destrua — renove, transforme e leve o velho embora.'
  },
  xango: {
    name: 'Xangô', title: 'O Rei da Justiça', emoji: '⚡',
    color: '#EF5350', gradient: 'linear-gradient(135deg, #b71c1c, #c62828, #ef5350)',
    description: 'Xangô é seu orixá! Você tem personalidade magnética, justa e poderosa. Não tolera injustiça e tem coragem para dizer verdades difíceis. Sua presença imponente abre portas e inspira respeito. O trovão é sua voz.',
    qualities: ['Justo(a)', 'Magnético(a)', 'Poderoso(a)', 'Corajoso(a)', 'Honesto(a)'],
    day: 'Quarta', element: 'Fogo e trovão', offerings: 'Amalá, banana-da-terra, vinho tinto, carne',
    greeting: 'Kaô Kabiecilê!', advice: 'Sua voz tem poder. Use-a para defender quem não pode se defender.'
  },
  oxala: {
    name: 'Oxalá', title: 'O Pai da Criação', emoji: '🕊️',
    color: '#B0BEC5', gradient: 'linear-gradient(135deg, #37474f, #607d8b, #b0bec5)',
    description: 'Oxalá, o Pai Criador, rege seu caminho! Você possui sabedoria rara e presença que acalma. É pacificador natural, com perspectiva elevada sobre a vida. Sua paciência é sua maior virtude. Em você, o branco de toda pureza se manifesta.',
    qualities: ['Sábio(a)', 'Pacífico(a)', 'Espiritual', 'Tolerante', 'Sereno(a)'],
    day: 'Sexta', element: 'Ar e branco', offerings: 'Acaçá, água fresca, coco, milho branco',
    greeting: 'Êpa Baba!', advice: 'Sua presença é um presente para o mundo. A paz que você irradia é a maior das magias.'
  },
  iemanja: {
    name: 'Iemanjá', title: 'A Rainha dos Mares', emoji: '🌊',
    color: '#4FC3F7', gradient: 'linear-gradient(135deg, #01579b, #0288d1, #4fc3f7)',
    description: 'Iemanjá, a Grande Mãe das Águas, protege você. Sua personalidade é profunda como o oceano — acolhedora, intuitiva e cheia de sabedoria emocional. Você nutre as pessoas ao seu redor com amor incondicional e tem ligação especial com os mistérios da alma.',
    qualities: ['Materno(a)', 'Protetor(a)', 'Intuitivo(a)', 'Profundo(a)', 'Acolhedor(a)'],
    day: 'Sábado', element: 'Água salgada', offerings: 'Flores brancas, perfume, espelhos, melancia',
    greeting: 'Odôiá!', advice: 'Sua força está no amor que você dá. Confie na sua intuição — ela nunca mente.'
  },
  nana: {
    name: 'Nanã', title: 'A Anciã Sagrada', emoji: '🌧️',
    color: '#5C6BC0', gradient: 'linear-gradient(135deg, #1a237e, #3949ab, #5c6bc0)',
    description: 'Nanã Burucu, a mais antiga das divindades, rege você. Você carrega sabedoria que transcende o tempo, capacidade de sentir emoções com profundidade incomum e ligação especial com o mundo espiritual. A lama é origem — e você honra essa origem.',
    qualities: ['Ancestral', 'Sábio(a)', 'Profundo(a)', 'Sensitivo(a)', 'Paciente'],
    day: 'Sábado', element: 'Lama e chuva', offerings: 'Inhame, milho, abará sem sal',
    greeting: 'Saluba Nanã!', advice: 'Respeite o tempo das coisas. A chuva não chega antes de ser necessária.'
  },
  omolu: {
    name: 'Omolu', title: 'O Senhor da Cura', emoji: '✨',
    color: '#8D6E63', gradient: 'linear-gradient(135deg, #1a1a1a, #4e342e, #8d6e63)',
    description: 'Omolu, senhor das curas, é o seu orixá. Você passou por provações que fariam outros desistirem, mas cada dificuldade fortaleceu seu espírito. Tem dom natural para curar e ajudar quem sofre. A transformação da dor em sabedoria é sua missão.',
    qualities: ['Resiliente', 'Curador(a)', 'Transformador(a)', 'Sábio(a)', 'Humilde'],
    day: 'Segunda', element: 'Terra e cinzas', offerings: 'Pipoca, milho torrado, fumo',
    greeting: 'Atotô!', advice: 'Você foi forjado(a) na dificuldade. Sua maior missão é transformar dor em sabedoria.'
  },
  iroko: {
    name: 'Iroko', title: 'A Árvore Sagrada', emoji: '🌳',
    color: '#4CAF50', gradient: 'linear-gradient(135deg, #1b5e20, #388e3c, #66bb6a)',
    description: 'Iroko, a árvore sagrada, rege seu caminho. Você é forte, protetor e possui sabedoria que vem da profundidade das raízes. Sua presença traz segurança e sua energia é impossível de ignorar. Você é o refúgio onde outros encontram paz.',
    qualities: ['Forte', 'Protetor(a)', 'Sábio(a)', 'Estável', 'Perseverante'],
    day: 'Quarta', element: 'Árvore e madeira', offerings: 'Mel, azeite, velas verdes',
    greeting: 'Iroko Iê!', advice: 'Suas raízes são sua força. Não se move pelo vento — se move pela terra.'
  },
  logunede: {
    name: 'Logunedé', title: 'O Príncipe da Floresta', emoji: '🐟',
    color: '#00BCD4', gradient: 'linear-gradient(135deg, #006064, #00838f, #00bcd4)',
    description: 'Logunedé, filho de Oxóssi e Oxum, rege você. Você combina a energia da caça com a doce水流 — é ágil, belo e cheio de juventude. Tem dom para as águas e para a floresta. Sua beleza é irresistível e seu espírito, livre.',
    qualities: ['Jovem', 'Ágil', 'Beloo(a)', 'Livre', 'Carismático(a)'],
    day: 'Quinta', element: 'Rios e floresta', offerings: 'Peixe, frutas, mel, flores',
    greeting: 'Oxuabô!', advice: 'A juventude é uma força. Use-a para criar, explorar e celebrar a vida.'
  },
  oxumare: {
    name: 'Oxumarê', title: 'A Serpente Arco-Íris', emoji: '🌈',
    color: '#FF9800', gradient: 'linear-gradient(135deg, #e65100, #f57c00, #ffb74d)',
    description: 'Oxumarê, a serpente arco-íris, guia seu destino. Você entende os ciclos da vida — subidas e descidas, luz e sombra. Tem dom para a magia e a transformação. Sua energia é dual: traz chuva e sol, vida e renascimento.',
    qualities: ['Mágico(a)', 'Transformador(a)', 'Cíclico(a)', 'Dual', 'Misterioso(a)'],
    day: 'Quinta', element: 'Arco-íris e serpente', offerings: 'Banana, inhame, azeite, velas coloridas',
    greeting: 'Oxumarê Arodá!', advice: 'Tudo é ciclo. Nas nuvens mais escuras, já nasce o arco-íris.'
  },
  olokun: {
    name: 'Olokun', title: 'O Dono do Fundo do Mar', emoji: '🫧',
    color: '#1565C0', gradient: 'linear-gradient(135deg, #0d47a1, #1565c0, #42a5f5)',
    description: 'Olokun, senhor do abismo marinho, rege você. Você é profundo, misterioso e possuindo riqueza interior incomum. Gosta de silêncio e solidão produtiva. Sua meditação é natural e sua conexão com o desconhecido, extraordinária.',
    qualities: ['Profundo(a)', 'Misterioso(a)', 'Rico(a)', 'Silencioso(a)', 'Meditativo(a)'],
    day: 'Sexta', element: 'Abismo marinho', offerings: 'Prata,espelhos, água salgada, peixe cru',
    greeting: 'Olokun Arodá!', advice: 'O verdadeiro poder está no silêncio. Quanto mais profundo, mais ouro encontra.'
  },
  ibeji: {
    name: 'Ibeji', title: 'Os Gêmeos Sagrados', emoji: '👶',
    color: '#F48FB1', gradient: 'linear-gradient(135deg, #ad1457, #d81b60, #f48fb1)',
    description: 'Ibeji, os gêmeos sagrados, rege seu caminho. Você tem espírito jovem, alegre e cheio de vida. Sua energia é contagiante e sua criatividade, sem limites. Celebra a vida com intensidade e traz alegria onde quer que vá.',
    qualities: ['Alegre', 'Criativo(a)', 'Jovial', 'Energético(a)', 'Espontâneo(a)'],
    day: 'Domingo', element: 'Dualidade e infância', offerings: 'Doces, frutas, brinquedos, balas',
    greeting: 'Ibeji Lorubó!', advice: 'A alegria é sagrada. Nunca deixe oadulto dentro de você matar a criança.'
  },
  oxaguian: {
    name: 'Oxaguian', title: 'O Príncipe Guerreiro', emoji: '🗡️',
    color: '#78909C', gradient: 'linear-gradient(135deg, #263238, #455a64, #78909c)',
    description: 'Oxaguian, jovem guerreiro dos rios, é seu orixá. Você combina puridade com força, juventude com sabedoria. É combativo mas justo, puro mas poderoso. Os rios correm em suas veias — fluidos e implacáveis.',
    qualities: ['Puro(a)', 'Guerreiro(a)', 'Juvenil', 'Justo(a)', 'Fluido(a)'],
    day: 'Quarta', element: 'Rios e prata', offerings: 'Leite, azeite, carnes brancas',
    greeting: 'Oxaguian Arodá!', advice: 'A pureza não é fraqueza. A água do rio corta a pedra com o tempo.'
  },
  oduduwa: {
    name: 'Oduduwa', title: 'O Pai dos Povos', emoji: '🌍',
    color: '#795548', gradient: 'linear-gradient(135deg, #3e2723, #5d4037, #8d6e63)',
    description: 'Oduduwa, o primeiro rei, rege seu destino. Você tem energia fundadora, de quem constrói civilizações. Sua liderança é ancestral e sua visão, de quem enxerga gerações à frente. A terra é sua herança e a história, sua missão.',
    qualities: ['Fundador(a)', 'Líder', 'Ancestral', 'Visionário(a)', 'Construtor(a)'],
    day: 'Segunda', element: 'Terra e criação', offerings: 'Milho, feijão, terra sagrada',
    greeting: 'Oduduwa Arodá!', advice: 'Você veio para construir. Cada pedra que coloca é um legado para gerações.'
  },
  ossaine: {
    name: 'Ossainê', title: 'O Senhor das Folhas', emoji: '🍃',
    color: '#43A047', gradient: 'linear-gradient(135deg, #1b5e20, #2e7d32, #43a047)',
    description: 'Ossainê, senhor das ervas e da medicina, rege você. Você tem conhecimento natural sobre as plantas e curas. Sua sabedoria vem da observação atenta da natureza. Cada folha é uma lição, cada raiz, uma resposta.',
    qualities: ['Curador(a)', 'Sábio(a)', 'Naturalista', 'Observador(a)', 'Conectado(a)'],
    day: 'Quinta', element: 'Folhas e ervas', offerings: 'Folhas frescas, mel, fumo, água',
    greeting: 'Ossainê Arodá!', advice: 'A cura está na natureza. Aprenda a ouvir as folhas — elas sussurram verdades.'
  },
  dada: {
    name: 'Dada', title: 'A Protetora das Crianças', emoji: '🌸',
    color: '#EC407A', gradient: 'linear-gradient(135deg, #880e4f, #ad1457, #ec407a)',
    description: 'Dada, protetora das crianças e da inocência, rege seu caminho. Você tem coração puro, espírito bondoso e protege os mais vulneráveis com fervor. Sua energia é maternal, doce e transformadora.',
    qualities: ['Puro(a)', 'Protetor(a)', 'Bondoso(a)', 'Inocente', 'Maternal'],
    day: 'Domingo', element: 'Inocência e luz', offerings: 'Doces, leite, flores, brinquedos',
    greeting: 'Dada Lorubó!', advice: 'Proteger a inocência é o ato mais corajoso que existe.'
  },
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1, emoji: '🌊', question: 'Qual elemento da natureza mais te atrai?',
    options: [
      { text: 'O mar — suas ondas me acalmam e me inspiram', scores: { iemanja: 3, olokun: 1 } },
      { text: 'O fogo — me dá energia e coragem', scores: { xango: 3, ogum: 1 } },
      { text: 'A floresta — me sinto livre e em paz', scores: { oxossi: 3, iroko: 1 } },
      { text: 'As águas doces — rios e cachoeiras me renovam', scores: { oxum: 3, logunede: 1 } },
      { text: 'A terra — me dá raízes e força', scores: { oduduwa: 3, nana: 1 } },
    ]
  },
  {
    id: 2, emoji: '⚔️', question: 'Quando enfrenta um conflito, você tende a...',
    options: [
      { text: 'Enfrentar de frente — não fujo de briga', scores: { ogum: 3, xango: 1 } },
      { text: 'Usar estratégia e astúcia para resolver', scores: { exu: 3, oxaguian: 1 } },
      { text: 'Buscar a paz e a reconciliação', scores: { oxala: 3, iemanja: 1 } },
      { text: 'Esperar o momento certo para agir', scores: { nanã: 3, omolu: 1 } },
      { text: 'Me transformar com a mudança — renascer', scores: { iansa: 3, oxumare: 1 } },
    ]
  },
  {
    id: 3, emoji: '💎', question: 'O que mais valoriza na vida?',
    options: [
      { text: 'Justiça e verdade acima de tudo', scores: { xango: 3, oxaguian: 1 } },
      { text: 'Amor, beleza e harmonia', scores: { oxum: 3, iemanja: 1 } },
      { text: 'Liberdade e aventura', scores: { oxossi: 3, logunede: 1 } },
      { text: 'Sabedoria e paz interior', scores: { oxala: 3, olokun: 1 } },
      { text: 'Proteger quem amo', scores: { iroko: 3, ogum: 1 } },
    ]
  },
  {
    id: 4, emoji: '🗣️', question: 'Qual é o seu estilo de comunicação?',
    options: [
      { text: 'Direto e astuto — sempre sei o que dizer', scores: { exu: 3 } },
      { text: 'Diplomático e encantador — seduzo com palavras', scores: { oxum: 3, logunede: 1 } },
      { text: 'Intuitivo — sinto o que o outro precisa ouvir', scores: { iemanja: 3, nanã: 1 } },
      { text: 'Silencioso — minhas palavras pesam quando falo', scores: { olokun: 3, omolu: 1 } },
      { text: 'Eloquente e imponente — minha voz comanda', scores: { xango: 3, ogum: 1 } },
    ]
  },
  {
    id: 5, emoji: '⚖️', question: 'Quando vê uma injustiça, sua reação é...',
    options: [
      { text: 'Agir imediatamente — não tolero opressão', scores: { xango: 3, iansa: 1 } },
      { text: 'Planejar uma estratégia para derrubar o opressor', scores: { exu: 3, oxaguian: 1 } },
      { text: 'Acolher a vítima e dar força emocional', scores: { iemanja: 3, dada: 1 } },
      { text: 'Ensinar a vítima a se defender sozinha', scores: { oxala: 3, ossaine: 1 } },
      { text: 'Usar a raiva como combustível para mudar tudo', scores: { ogum: 3, iansa: 1 } },
    ]
  },
  {
    id: 6, emoji: '🏡', question: 'Que ambiente te faz sentir mais em casa?',
    options: [
      { text: 'À beira do mar, com o som das ondas', scores: { iemanja: 3, olokun: 1 } },
      { text: 'No meio da mata, cercado(a) de natureza', scores: { oxossi: 3, iroko: 1 } },
      { text: 'No centro da cidade, onde tudo acontece', scores: { exu: 3, xango: 1 } },
      { text: 'Em um lugar alto — montanha ou colina', scores: { nanã: 3, oduduwa: 1 } },
      { text: 'Junto a um rio ou cachoeira', scores: { oxum: 3, logunede: 1 } },
    ]
  },
  {
    id: 7, emoji: '🔥', question: 'O que mais te dá energia?',
    options: [
      { text: 'Estar na natureza e ao ar livre', scores: { oxossi: 3, ossaine: 1 } },
      { text: 'Estar com pessoas que amo', scores: { oxum: 3, iemanja: 1 } },
      { text: 'Superar desafios e provações', scores: { ogum: 3, omolu: 1 } },
      { text: 'Criar algo — arte, música, projetos', scores: { iansa: 3, ibeji: 1 } },
      { text: 'Meditar e连接ar com o espiritual', scores: { oxala: 3, olokun: 1 } },
    ]
  },
  {
    id: 8, emoji: '🧠', question: 'Como você toma decisões importantes?',
    options: [
      { text: 'Pelo instinto — meu corpo sabe o certo', scores: { oxossi: 3, iemanja: 1 } },
      { text: 'Pela razão — analiso prós e contras', scores: { oxala: 3, oduduwa: 1 } },
      { text: 'Pelo consenso — ouço quem confio', scores: { iemanja: 3, ogum: 1 } },
      { text: 'De forma impulsiva — sinto e faço', scores: { xango: 3, iansa: 1 } },
      { text: 'Consultando sinais e oráculos', scores: { omolu: 3, exu: 1 } },
    ]
  },
  {
    id: 9, emoji: '😰', question: 'Qual é seu maior medo?',
    options: [
      { text: 'Perder as pessoas que amo', scores: { iemanja: 3, oxum: 1 } },
      { text: 'A injustiça vencer', scores: { xango: 3, ogum: 1 } },
      { text: 'Ficar preso(a), sem liberdade', scores: { oxossi: 3, iansa: 1 } },
      { text: 'Esquecimento — ninguém me lembrar', scores: { olokun: 3, oduduwa: 1 } },
      { text: 'Estagnação — parar de crescer', scores: { nanã: 3, oxumare: 1 } },
    ]
  },
  {
    id: 10, emoji: '💑', question: 'Em um relacionamento, você é...',
    options: [
      { text: 'Acolhedor(a) — cuido com amor incondicional', scores: { iemanja: 3, dada: 1 } },
      { text: 'Paixão intensa — tudo ou nada', scores: { xango: 3, iansa: 1 } },
      { text: 'Leal e protetor(a) — nunca abandono', scores: { iroko: 3, ogum: 1 } },
      { text: 'Misterioso(a) — guardo parte de mim', scores: { olokun: 3, nanã: 1 } },
      { text: 'Carismático(a) — seduzo sem esforço', scores: { oxum: 3, logunede: 1 } },
    ]
  },
  {
    id: 11, emoji: '🤝', question: 'Como você demonstra amor?',
    options: [
      { text: 'Cuidando e protegendo — presentes de serviço', scores: { iemanja: 3, iroko: 1 } },
      { text: 'Com presentes e gestos de beleza', scores: { oxum: 3, dada: 1 } },
      { text: 'Com palavras e verdade — nunca minto', scores: { xango: 3, exu: 1 } },
      { text: 'Com presença — estar junto é tudo', scores: { ogum: 3, ibeji: 1 } },
      { text: 'Com sabedoria — ensino o que sei', scores: { oxala: 3, ossaine: 1 } },
    ]
  },
  {
    id: 12, emoji: '🔄', question: 'O que mais te transforma como pessoa?',
    options: [
      { text: 'O amor — cada relacionamento me muda', scores: { oxum: 3, iemanja: 1 } },
      { text: 'A dor — cada sofrimento me fortalece', scores: { omolu: 3, nanã: 1 } },
      { text: 'A natureza — estar na mata me renova', scores: { oxossi: 3, iroko: 1 } },
      { text: 'O conhecimento — cada lição me expande', scores: { oxala: 3, olokun: 1 } },
      { text: 'A mudança — abraço o novo sem medo', scores: { iansa: 3, oxumare: 1 } },
    ]
  },
  {
    id: 13, emoji: '👑', question: 'Que tipo de liderança mais te identifica?',
    options: [
      { text: 'Natural — as pessoas me seguem sem pedir', scores: { xango: 3, oduduwa: 1 } },
      { text: 'Consultiva — decido ouvindo todos', scores: { iemanja: 3, oxala: 1 } },
      { text: 'Inspiracional — motivo pelo exemplo', scores: { oxum: 3, logunede: 1 } },
      { text: 'Estratégica — sempre três passos à frente', scores: { exu: 3, oxaguian: 1 } },
      { text: 'Servidora — lidero servindo', scores: { ogum: 3, dada: 1 } },
    ]
  },
  {
    id: 14, emoji: '🌪️', question: 'Como você lida com mudanças inesperadas?',
    options: [
      { text: 'Abraço a mudança — faz parte da vida!', scores: { iansa: 3, oxumare: 1 } },
      { text: 'Preciso de tempo para processar', scores: { nanã: 3, oxala: 1 } },
      { text: 'Busco um plano e enfrento', scores: { ogum: 3, exu: 1 } },
      { text: 'Me adapto rápido — sou fluido(a)', scores: { exu: 3, logunede: 1 } },
      { text: 'Aceito com serenidade — confio no processo', scores: { oxala: 3, olokun: 1 } },
    ]
  },
  {
    id: 15, emoji: '🎵', question: 'Que tipo de música toca sua alma?',
    options: [
      { text: 'Risos e cantos alegres — a música da vida', scores: { ibeji: 3, dada: 1 } },
      { text: 'Cantos suaves que fazem chorar de emoção', scores: { oxum: 3, iemanja: 1 } },
      { text: 'Batuques fortes que dão energia', scores: { xango: 3, ogum: 1 } },
      { text: 'Sinos e cantos sagrados', scores: { omolu: 3, oxala: 1 } },
      { text: 'Flautas e sons da natureza', scores: { oxossi: 3, ossaine: 1 } },
    ]
  },
  {
    id: 16, emoji: '🐾', question: 'Qual animal te representa melhor?',
    options: [
      { text: 'Leão ou falcão — força e visão', scores: { xango: 3, ogum: 1 } },
      { text: 'Águia ou veado — liberdade e intuição', scores: { oxossi: 3, logunede: 1 } },
      { text: 'Serpente ou arco-íris — transformação', scores: { oxumare: 3, nana: 1 } },
      { text: 'Baleia ou golfinho — profundidade', scores: { iemanja: 3, olokun: 1 } },
      { text: 'Gato ou coruja — mistério e sabedoria', scores: { nanã: 3, oxala: 1 } },
    ]
  },
  {
    id: 17, emoji: '🎨', question: 'Qual cor mais te representa?',
    options: [
      { text: 'Azul e branco — serenidade do céu e mar', scores: { iemanja: 3, oxala: 1 } },
      { text: 'Dourado e amarelo — brilho da prosperidade', scores: { oxum: 3, oxumare: 1 } },
      { text: 'Vermelho e branco — poder e pureza', scores: { xango: 3, oxaguian: 1 } },
      { text: 'Verde — vida da floresta', scores: { oxossi: 3, iroko: 1 } },
      { text: 'Preto e roxo — mistério e transformação', scores: { omolu: 3, iansa: 1 } },
    ]
  },
  {
    id: 18, emoji: '🌅', question: 'Que horário do dia mais te representa?',
    options: [
      { text: 'Amanhecer — quando tudo começa', scores: { oxossi: 3, logunede: 1 } },
      { text: 'Manhã — produtivo e determinado', scores: { ogum: 3, oduduwa: 1 } },
      { text: 'Tarde — calor e paixão', scores: { xango: 3, iansa: 1 } },
      { text: 'Noite — profundo e misterioso', scores: { olokun: 3, nanã: 1 } },
      { text: 'Madrugada — olimpo dos orixás', scores: { omolu: 3, oxala: 1 } },
    ]
  },
  {
    id: 19, emoji: '🌸', question: 'Que estação do ano mais ressoa com você?',
    options: [
      { text: 'Verão — calor, energia, intensidade', scores: { iansa: 3, xango: 1 } },
      { text: 'Outono — reflexão e transformação', scores: { nanã: 3, oxumare: 1 } },
      { text: 'Inverno — força e resistência', scores: { omolu: 3, iroko: 1 } },
      { text: 'Primavera — renascimento e beleza', scores: { logunede: 3, dada: 1 } },
      { text: 'Época de chuvas — renovação', scores: { iemanja: 3, nana: 1 } },
    ]
  },
  {
    id: 20, emoji: '🧭', question: 'O que mais busca na vida?',
    options: [
      { text: 'Paz e harmonia interior', scores: { oxala: 3, olokun: 1 } },
      { text: 'Aventura e novas descobertas', scores: { oxossi: 3, exu: 1 } },
      { text: 'Amor e conexão profunda', scores: { oxum: 3, iemanja: 1 } },
      { text: 'Verdade e justiça', scores: { xango: 3, oxaguian: 1 } },
      { text: 'Poder e realização', scores: { ogum: 3, oduduwa: 1 } },
    ]
  },
  {
    id: 21, emoji: '🌿', question: 'Como você vê a cura e a medicina?',
    options: [
      { text: 'A natureza cura — ervas e plantas são medicina', scores: { ossaine: 3, oxossi: 1 } },
      { text: 'A fé cura — a espiritualidade é a maior medicina', scores: { omolu: 3, oxala: 1 } },
      { text: 'O tempo cura — paciência é tudo', scores: { nanã: 3, iemanja: 1 } },
      { text: 'A comunidade cura — estar junto sara', scores: { iemanja: 3, dada: 1 } },
      { text: 'A luta cura — superar provações fortalece', scores: { ogum: 3, iansa: 1 } },
    ]
  },
  {
    id: 22, emoji: '🕯️', question: 'Como se relaciona com seus ancestrais?',
    options: [
      { text: 'Honro e celebro — são minha força', scores: { omolu: 3, oduduwa: 1 } },
      { text: 'Busco conhecimento sobre minha linhagem', scores: { nanã: 3, oxala: 1 } },
      { text: 'Sinto sua presença no dia a dia', scores: { iroko: 3, olokun: 1 } },
      { text: 'Mantenho vivas as tradições deles', scores: { oxaguian: 3, ossaine: 1 } },
      { text: 'Crio meu próprio caminho honrando-os', scores: { exu: 3, ogum: 1 } },
    ]
  },
  {
    id: 23, emoji: '😢', question: 'O que mais te faz chorar?',
    options: [
      { text: 'Injustiça — ver o fraco sendo esmagado', scores: { xango: 3, iansa: 1 } },
      { text: 'Beleza — uma música, pôr do sol, um gesto', scores: { oxum: 3, ibeji: 1 } },
      { text: 'Perda — perder alguém ou algo querido', scores: { iemanja: 3, nanã: 1 } },
      { text: 'Bondade — quando alguém é generoso sem querer nada', scores: { oxala: 3, dada: 1 } },
      { text: 'Liberdade — quando vejo alguém se libertar', scores: { oxossi: 3, logunede: 1 } },
    ]
  },
  {
    id: 24, emoji: '♾️', question: 'Como você vê a morte e o além?',
    options: [
      { text: 'Como passagem — a vida continua em outro plano', scores: { omolu: 3, oxala: 1 } },
      { text: 'Como transformação — renascimento em nova forma', scores: { oxumare: 3, iansa: 1 } },
      { text: 'Como mistério — o desconhecido me fascina', scores: { olokun: 3, nanã: 1 } },
      { text: 'Como reencontro — voltarei com quem amo', scores: { iemanja: 3, ibeji: 1 } },
      { text: 'Como continuação — sirvo enquanto vivo', scores: { oduduwa: 3, ogum: 1 } },
    ]
  },
  {
    id: 25, emoji: '🏛️', question: 'Que legado quer deixar para o mundo?',
    options: [
      { text: 'Paz — que minha presença tenha trazido harmonia', scores: { oxala: 3, olokun: 1 } },
      { text: 'Justiça — que tenho feito a diferença', scores: { xango: 3, oxaguian: 1 } },
      { text: 'Amor — que fui amado(a) e amei de verdade', scores: { oxum: 3, iemanja: 1 } },
      { text: 'Sabedoria — que meus ensinamentos vivam', scores: { nanã: 3, ossaine: 1 } },
      { text: 'Mudança — que abri caminhos para outros', scores: { ogum: 3, exu: 1 } },
    ]
  },
];

// Pré-calcula pontuação máxima possível por orixá
const MAX_SCORES: Record<string, number> = {};
Object.keys(ORIXAS).forEach(k => { MAX_SCORES[k] = 0; });
QUESTIONS.forEach(q => {
  q.options.forEach(opt => {
    Object.entries(opt.scores).forEach(([k, v]) => {
      MAX_SCORES[k] = (MAX_SCORES[k] || 0) + v;
    });
  });
});

interface RankedResult {
  key: string;
  score: number;
  pct: number;
  data: OrixaData;
}

interface Props {
  onBack: () => void;
}

export default function OrixaQuiz({ onBack }: Props) {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelect = (idx: number, option: QuizOption) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([k, v]) => {
      newScores[k] = (newScores[k] || 0) + v;
    });
    setTimeout(() => {
      setScores(newScores);
      setAnswers([...answers, idx]);
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setStep('result');
      }
    }, 400);
  };

  const topResults = useMemo<RankedResult[]>(() => {
    if (Object.keys(scores).length === 0) return [];
    const maxPossible = Math.max(...Object.values(MAX_SCORES).filter(v => v > 0));
    return Object.entries(scores)
      .filter(([_, v]) => v > 0)
      .map(([k, v]) => ({
        key: k,
        score: v,
        pct: maxPossible > 0 ? Math.round((v / maxPossible) * 100) : 0,
        data: ORIXAS[k],
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [scores]);

  const handleShare = async () => {
    if (topResults.length === 0) return;
    const top = topResults[0];
    const second = topResults.length > 1 ? `, ${topResults[1].data.name}` : '';
    const text = `🔮 Meu Orixá principal é ${top.data.name} — ${top.data.title}! ${top.data.emoji}\n${topResults.length > 1 ? `Influências: ${topResults[1].data.name}${topResults.length > 2 ? `, ${topResults[2].data.name}` : ''}\n` : ''}"${top.data.advice}"\n\nDescubra o seu em Ifá Oluwo → ifaoluwo.com`;
    if (navigator.share) {
      await navigator.share({ title: `Meu Orixá é ${top.data.name}!`, text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Resultado copiado!');
    }
  };

  const restart = () => {
    setStep('intro');
    setCurrentQ(0);
    setScores({});
    setSelectedOption(null);
    setAnswers([]);
  };

  const progress = (currentQ / QUESTIONS.length) * 100;

  const rankIcons = [<Trophy size={20} />, <Medal size={20} />, <Award size={20} />];
  const rankLabels = ['Seu Orixá Principal', 'Influência Secundária', 'Influência Terciária'];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #07090d 0%, #0c0e14 100%)', display: 'flex', flexDirection: 'column' }}>
      <SEO
        title={step === 'result' && topResults.length > 0
          ? `Meu Orixá é ${topResults[0].data.name} | Ifá Oluwo Quiz`
          : "Qual é o seu Orixá? Descubra seu Arquétipo | Ifá Oluwo"}
        description="Descubra o possível Orixá que rege seu caminho. 25 perguntas, 18 orixás. Iemanjá, Oxum, Xangô, Ogum, Oxóssi e mais."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Quiz dos Orixás - Ifá Oluwo",
          "applicationCategory": "LifestyleApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid rgba(196,158,48,0.1)' }}>
        <button onClick={onBack} style={{ background: 'none', border: '1px solid rgba(196,158,48,0.3)', borderRadius: 8, padding: '6px 10px', color: '#C49E30', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <ArrowLeft size={14} /> Voltar
        </button>
        <div>
          <div style={{ color: '#C49E30', fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>QUIZ DOS ORIXÁS</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>18 orixás · 25 perguntas</div>
        </div>
      </div>

      {/* INTRO */}
      {step === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 24, filter: 'drop-shadow(0 0 30px rgba(196,158,48,0.5))' }}>🔮</div>
          <h1 style={{ color: '#C49E30', fontFamily: 'Georgia, serif', fontSize: 28, marginBottom: 12, lineHeight: 1.3 }}>
            Qual seria seu Orixá?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, maxWidth: 420, marginBottom: 16 }}>
            Responda 25 perguntas sobre personalidade, valores e essência. O oráculo revelará seu Orixá principal e influências secundárias.
          </p>
          <div style={{ color: '#ff4d4d', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 24, padding: '8px 16px', background: 'rgba(255, 77, 77, 0.1)', borderRadius: 8, border: '1px solid rgba(255, 77, 77, 0.3)' }}>
            Atenção: Este é um teste arquetípico. A confirmação espiritual do seu Orixá só pode ser revelada por um Sacerdote iniciado.
          </div>
          <div style={{ background: 'rgba(196,158,48,0.06)', border: '1px solid rgba(196,158,48,0.15)', borderRadius: 12, padding: '12px 20px', marginBottom: 32, display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['⏱️', '~5 min', 'duração'], ['❓', '25', 'perguntas'], ['✨', '18', 'orixás']].map(([e, v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{e}</div>
                <div style={{ color: '#C49E30', fontWeight: 700, fontSize: 16 }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', maxWidth: 500, marginBottom: 32 }}>
            {Object.values(ORIXAS).map(o => (
              <span key={o.name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                {o.emoji} {o.name}
              </span>
            ))}
          </div>
          <button
            onClick={() => setStep('quiz')}
            style={{ background: 'linear-gradient(135deg, #C49E30, #8B6914)', color: '#07090d', border: 'none', borderRadius: 50, padding: '14px 40px', fontWeight: 800, fontSize: 15, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 30px rgba(196,158,48,0.35)' }}
          >
            Iniciar Quiz <ChevronRight size={18} />
          </button>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 16 }}>
            Este quiz é uma orientação espiritual e não substitui uma consulta com um Babalawo.
          </p>
        </div>
      )}

      {/* QUIZ */}
      {step === 'quiz' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 20px 40px' }}>
          {/* Progress */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Pergunta {currentQ + 1} de {QUESTIONS.length}</span>
              <span style={{ color: '#C49E30', fontSize: 12, fontWeight: 700 }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(196,158,48,0.15)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #C49E30, #FFD700)', borderRadius: 4, transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* Question */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{QUESTIONS[currentQ].emoji}</div>
            <h2 style={{ color: '#fff', fontSize: 20, fontFamily: 'Georgia, serif', lineHeight: 1.4, margin: 0 }}>
              {QUESTIONS[currentQ].question}
            </h2>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560, width: '100%', margin: '0 auto' }}>
            {QUESTIONS[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx, opt)}
                style={{
                  background: selectedOption === idx
                    ? 'linear-gradient(135deg, rgba(196,158,48,0.25), rgba(196,158,48,0.1))'
                    : 'rgba(255,255,255,0.04)',
                  border: selectedOption === idx
                    ? '1px solid rgba(196,158,48,0.8)'
                    : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: '14px 20px',
                  color: selectedOption === idx ? '#FFD700' : 'rgba(255,255,255,0.85)',
                  fontSize: 14, textAlign: 'left', cursor: selectedOption !== null ? 'default' : 'pointer',
                  transition: 'all 0.25s ease', fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
                  display: 'flex', alignItems: 'center', gap: 12,
                  transform: selectedOption === idx ? 'scale(1.01)' : 'scale(1)',
                }}
              >
                <span style={{ width: 28, height: 28, borderRadius: '50%',
                  background: selectedOption === idx ? 'rgba(196,158,48,0.3)' : 'rgba(255,255,255,0.06)',
                  border: selectedOption === idx ? '2px solid #C49E30' : '2px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0,
                  color: selectedOption === idx ? '#FFD700' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  {selectedOption === idx ? '✓' : String.fromCharCode(65 + idx)}
                </span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RESULT */}
      {step === 'result' && topResults.length > 0 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px 60px' }}>

          {/* Top 1 - Card principal */}
          <div style={{ width: '100%', maxWidth: 520, borderRadius: 24, overflow: 'hidden', background: topResults[0].data.gradient, boxShadow: `0 20px 60px ${topResults[0].data.color}40`, marginBottom: 20, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
            <div style={{ position: 'relative', padding: '36px 28px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
                <Trophy size={16} color="#FFD700" />
                <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: '#FFD700', fontWeight: 700 }}>
                  Seu Orixá Principal — {topResults[0].pct}%
                </span>
              </div>
              <div style={{ fontSize: 72, marginBottom: 8 }}>{topResults[0].data.emoji}</div>
              <h2 style={{ color: '#fff', fontSize: 36, fontFamily: 'Georgia, serif', margin: '0 0 4px', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                {topResults[0].data.name}
              </h2>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginBottom: 20 }}>{topResults[0].data.title}</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                {topResults[0].data.qualities.map(q => (
                  <span key={q} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 50, padding: '4px 12px', fontSize: 12, color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>{q}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Descrição do principal */}
          <div style={{ width: '100%', maxWidth: 520, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,158,48,0.12)', borderRadius: 16, padding: '20px', marginBottom: 16 }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              {topResults[0].data.description}
            </p>
          </div>

          {/* Top 2 e 3 */}
          {topResults.length > 1 && (
            <div style={{ width: '100%', maxWidth: 520, display: 'flex', gap: 12, marginBottom: 16 }}>
              {topResults.slice(1).map((r, i) => (
                <div key={r.key} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,158,48,0.12)', borderRadius: 16, padding: '16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
                    {rankIcons[i + 1]}
                    <span style={{ color: '#C49E30', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>
                      {rankLabels[i + 1]} — {r.pct}%
                    </span>
                  </div>
                  <div style={{ fontSize: 40, marginBottom: 4 }}>{r.data.emoji}</div>
                  <div style={{ color: '#fff', fontSize: 16, fontFamily: 'Georgia, serif', fontWeight: 700 }}>{r.data.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 2 }}>{r.data.title}</div>
                </div>
              ))}
            </div>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4" style={{ width: '100%', maxWidth: 520 }}>
            {[
              { label: 'Saudação', value: topResults[0].data.greeting },
              { label: 'Dia da semana', value: topResults[0].data.day },
              { label: 'Elemento', value: topResults[0].data.element },
              { label: 'Oferendas', value: topResults[0].data.offerings },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,158,48,0.1)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#C49E30', fontSize: 13, fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Mensagem */}
          <div style={{ width: '100%', maxWidth: 520, background: 'rgba(196,158,48,0.06)', border: '1px solid rgba(196,158,48,0.2)', borderRadius: 16, padding: '16px 20px', marginBottom: 24 }}>
            <div style={{ color: '#C49E30', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>⚡ Mensagem de {topResults[0].data.name}</div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
              "{topResults[0].data.advice}"
            </p>
          </div>

          {/* Botões */}
          <div style={{ width: '100%', maxWidth: 520, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={handleShare} style={{ flex: 1, background: 'linear-gradient(135deg, #C49E30, #8B6914)', color: '#07090d', border: 'none', borderRadius: 12, padding: '14px', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              <Share2 size={16} /> Compartilhar
            </button>
            <button onClick={restart} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <RefreshCw size={16} /> Refazer
            </button>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 20, textAlign: 'center', maxWidth: 420 }}>
            Para uma consulta oficial, fale com um Babalawo iniciado. Este teste é apenas uma orientação arquetípica.
          </p>
        </div>
      )}
    </div>
  );
}
