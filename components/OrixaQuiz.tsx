import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Share2, Star, ChevronRight } from 'lucide-react';
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

const ORIXAS: Record<string, {
  name: string; title: string; color: string; gradient: string;
  description: string; qualities: string[]; day: string;
  element: string; offerings: string; greeting: string;
  advice: string; emoji: string;
}> = {
  iemanja: {
    name: 'Iemanjá', title: 'A Rainha dos Mares', emoji: '🌊',
    color: '#4FC3F7', gradient: 'linear-gradient(135deg, #0d47a1, #29b6f6, #80deea)',
    description: 'Você é protegido(a) por Iemanjá, a Grande Mãe das Águas. Sua personalidade é profunda como o oceano — acolhedora, intuitiva e cheia de sabedoria emocional. Você nutre as pessoas ao seu redor com um amor incondicional e tem uma ligação especial com a intuição e os mistérios da alma.',
    qualities: ['Amoroso(a)', 'Protetor(a)', 'Intuitivo(a)', 'Profundo(a)', 'Materno(a)'],
    day: 'Sábado', element: 'Água salgada', offerings: 'Flores brancas, perfume, espelhos',
    greeting: 'Odôiá!', advice: 'Sua força está no amor que você dá. Confie na sua intuição — ela nunca mente.'
  },
  oxum: {
    name: 'Oxum', title: 'A Rainha das Águas Doces', emoji: '💛',
    color: '#FFD54F', gradient: 'linear-gradient(135deg, #ff6f00, #ffca28, #fff176)',
    description: 'Oxum rege seu caminho! Você irradia beleza, amor e prosperidade por onde passa. Tem um senso estético apurado, atrai as pessoas naturalmente e possui uma generosidade que encanta todos. Seu coração é de ouro — literalmente.',
    qualities: ['Carismático(a)', 'Amoroso(a)', 'Próspero(a)', 'Artístico(a)', 'Diplomático(a)'],
    day: 'Sábado', element: 'Água doce', offerings: 'Mel, abóbora, espelho dourado',
    greeting: 'Ora Yeye O!', advice: 'Você foi feito(a) para brilhar. Permita-se receber tanto quanto você doa.'
  },
  xango: {
    name: 'Xangô', title: 'O Rei da Justiça', emoji: '⚡',
    color: '#EF5350', gradient: 'linear-gradient(135deg, #b71c1c, #ef5350, #ff8a65)',
    description: 'Xangô é seu orixá! Você tem uma personalidade magnética, justa e poderosa. Não tolera injustiça e tem coragem para dizer verdades difíceis. Sua presença imponente abre portas e inspira respeito onde quer que você vá.',
    qualities: ['Justo(a)', 'Corajoso(a)', 'Líder', 'Magnético(a)', 'Honesto(a)'],
    day: 'Quarta', element: 'Fogo e trovão', offerings: 'Amalá, banana-da-terra, vinho tinto',
    greeting: 'Kaô Kabiecilê!', advice: 'Sua voz tem poder. Use-a para defender quem não pode se defender.'
  },
  ogun: {
    name: 'Ogum', title: 'O Senhor dos Caminhos', emoji: '⚔️',
    color: '#66BB6A', gradient: 'linear-gradient(135deg, #1b5e20, #66bb6a, #a5d6a7)',
    description: 'Ogum é o seu protetor! Você é determinado(a), trabalhador(a) e não desiste facilmente. Tem uma energia que abre caminhos onde não existiam antes. Sua honestidade às vezes parece brusca, mas vem de um lugar de integridade absoluta.',
    qualities: ['Determinado(a)', 'Protetor(a)', 'Honesto(a)', 'Trabalhador(a)', 'Perseverante'],
    day: 'Terça', element: 'Ferro e floresta', offerings: 'Feijoada, cachaça, azeite de dendê',
    greeting: 'Ogum Iê!', advice: 'Você tem força para superar qualquer obstáculo. Mas lembre: a espada protege, não destrói.'
  },
  oxossi: {
    name: 'Oxóssi', title: 'O Rei da Floresta', emoji: '🏹',
    color: '#26A69A', gradient: 'linear-gradient(135deg, #004d40, #26a69a, #80cbc4)',
    description: 'Oxóssi rege seu destino! Você tem um espírito livre, aventureiro e profundamente conectado com a natureza. Sua intuição para encontrar o que precisa é extraordinária — seja uma solução para um problema ou o caminho certo na vida.',
    qualities: ['Livre', 'Intuitivo(a)', 'Aventureiro(a)', 'Sábio(a)', 'Generoso(a)'],
    day: 'Quinta', element: 'Floresta e caça', offerings: 'Inhame, milho, frutas da mata',
    greeting: 'Okê Arô!', advice: 'Confie no seu instinto. Como o caçador, você sabe exatamente onde mirar.'
  },
  oxala: {
    name: 'Oxalá', title: 'O Pai da Criação', emoji: '🕊️',
    color: '#EEEEEE', gradient: 'linear-gradient(135deg, #37474f, #90a4ae, #eceff1)',
    description: 'Oxalá, o Pai Criador, rege seu caminho! Você possui uma sabedoria rara e uma presença que acalma as pessoas. É um pacificador natural, com uma perspectiva elevada sobre a vida que poucos alcançam. Sua paciência é sua maior virtude.',
    qualities: ['Sábio(a)', 'Pacífico(a)', 'Espiritual', 'Criativo(a)', 'Tolerante'],
    day: 'Sexta', element: 'Ar e branco', offerings: 'Acaçá, água fresca, coco',
    greeting: 'Êpa Baba!', advice: 'Sua presença é um presente para o mundo. A paz que você irradia é a maior das magias.'
  },
  iansa: {
    name: 'Iansã', title: 'A Senhora dos Ventos', emoji: '🌪️',
    color: '#CE93D8', gradient: 'linear-gradient(135deg, #4a148c, #ab47bc, #f48fb1)',
    description: 'Iansã, guerreira dos ventos, é quem rege você! Você é apaixonado(a), intenso(a) e não tem medo de enfrentar tempestades — as próprias ou as dos outros. Sua coragem é contagiante e sua lealdade, inquestionável.',
    qualities: ['Apaixonado(a)', 'Corajoso(a)', 'Intenso(a)', 'Leal', 'Transformador(a)'],
    day: 'Quarta', element: 'Vento e tempestade', offerings: 'Acarajé, carurú, azeite de dendê',
    greeting: 'Êpá Hei!', advice: 'Você tem a força do vento. Não destrua — renove, transforme e leve o velho embora.'
  },
  omolu: {
    name: 'Omolu', title: 'O Senhor da Cura', emoji: '✨',
    color: '#A1887F', gradient: 'linear-gradient(135deg, #1a1a1a, #795548, #d7ccc8)',
    description: 'Omolu, o senhor das curas, é o seu orixá. Você passou por provações que fariam outros desistirem, mas cada dificuldade só fortaleceu seu espírito. Tem um dom natural para curar e ajudar pessoas que estão sofrendo.',
    qualities: ['Resiliente', 'Curador(a)', 'Transformador(a)', 'Profundo(a)', 'Sábio(a)'],
    day: 'Segunda', element: 'Terra e cinzas', offerings: 'Pipoca, milho torrado',
    greeting: 'Atotô!', advice: 'Você foi forjado(a) na dificuldade. Sua maior missão é transformar dor em sabedoria.'
  },
  nana: {
    name: 'Nanã', title: 'A Anciã Sagrada', emoji: '🌧️',
    color: '#7986CB', gradient: 'linear-gradient(135deg, #1a237e, #5c6bc0, #b39ddb)',
    description: 'Nanã Burucu, a mais antiga das divindades, rege você. Você carrega uma sabedoria que transcende o tempo, uma capacidade de sentir as emoções com profundidade incomum e uma ligação especial com o mundo espiritual.',
    qualities: ['Ancestral', 'Profundo(a)', 'Sensitivo(a)', 'Misterioso(a)', 'Sábio(a)'],
    day: 'Sábado', element: 'Lama e chuva', offerings: 'Inhame, milho, abará sem sal',
    greeting: 'Saluba Nanã!', advice: 'Respeite o tempo das coisas. A chuva não chega antes de ser necessária.'
  },
  exu: {
    name: 'Exu', title: 'O Abridor de Caminhos', emoji: '🔑',
    color: '#FF7043', gradient: 'linear-gradient(135deg, #000000, #c62828, #ff7043)',
    description: 'Exu Mensageiro guia seus passos! Você é inteligente, espirituoso e sabe adaptar-se a qualquer situação. Tem um dom especial para encontrar caminhos onde outros veem muros. Sua comunicação é poderosa e seu senso de humor, único.',
    qualities: ['Inteligente', 'Comunicativo(a)', 'Adaptável', 'Estratégico(a)', 'Criativo(a)'],
    day: 'Segunda', element: 'Encruzilhada', offerings: 'Farofa, cachaça, charuto',
    greeting: 'Laroyê Exu!', advice: 'Você tem as chaves de todos os caminhos. Abra portas — para você e para os outros.'
  },
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1, emoji: '🌅', question: 'Qual é a sua relação com a água?',
    options: [
      { text: 'Sinto uma paz profunda perto do mar ou de rios', scores: { iemanja: 3, oxum: 2 } },
      { text: 'Prefiro a chuva e as tempestades — me energizam', scores: { iansa: 3, xango: 1 } },
      { text: 'Água é vida, mas prefiro a terra firme sob os pés', scores: { ogun: 2, omolu: 2 } },
      { text: 'Gosto de observar a água de longe — ela me fascina', scores: { nana: 2, oxala: 2 } },
    ]
  },
  {
    id: 2, emoji: '⚡', question: 'Quando enfrenta uma injustiça, você...',
    options: [
      { text: 'Entra em campo imediatamente — não tolero injustiça', scores: { xango: 3, ogun: 2 } },
      { text: 'Busco a melhor estratégia antes de agir', scores: { exu: 3, oxossi: 2 } },
      { text: 'Ofereço acolhimento e apoio emocional à vítima', scores: { iemanja: 3, oxum: 2 } },
      { text: 'Busco a paz e a reconciliação com sabedoria', scores: { oxala: 3, nana: 2 } },
    ]
  },
  {
    id: 3, emoji: '🌿', question: 'Qual ambiente te faz sentir mais em casa?',
    options: [
      { text: 'A floresta virgem, com seus sons e cheiros', scores: { oxossi: 3, ogun: 2 } },
      { text: 'À beira do mar, olhando o horizonte', scores: { iemanja: 3, oxum: 1 } },
      { text: 'Um espaço branco, limpo e silencioso', scores: { oxala: 3, nana: 2 } },
      { text: 'No centro da cidade, onde tudo acontece', scores: { exu: 3, xango: 1 } },
    ]
  },
  {
    id: 4, emoji: '💫', question: 'Como as pessoas geralmente te descrevem?',
    options: [
      { text: 'Amoroso(a), acolhedor(a), meu ombro é sempre amigo', scores: { iemanja: 3, oxum: 2 } },
      { text: 'Determinado(a), corajoso(a), não desisto fácil', scores: { ogun: 3, xango: 2 } },
      { text: 'Inteligente, comunicativo(a), tenho sempre uma solução', scores: { exu: 3, oxossi: 2 } },
      { text: 'Calmo(a), sábio(a), pessoas buscam meu conselho', scores: { oxala: 3, nana: 2 } },
    ]
  },
  {
    id: 5, emoji: '🎭', question: 'Qual é o seu maior medo?',
    options: [
      { text: 'Perder as pessoas que amo', scores: { iemanja: 3, oxum: 2 } },
      { text: 'A injustiça vencer e eu não poder fazer nada', scores: { xango: 3, ogun: 2 } },
      { text: 'Ficar preso(a), sem liberdade ou movimento', scores: { oxossi: 3, iansa: 2 } },
      { text: 'O passado me definir para sempre', scores: { omolu: 3, nana: 2 } },
    ]
  },
  {
    id: 6, emoji: '🌟', question: 'O que mais move você na vida?',
    options: [
      { text: 'Amor, família e cuidar de quem amo', scores: { iemanja: 3, oxum: 2 } },
      { text: 'Justiça, verdade e fazer a diferença', scores: { xango: 3, ogun: 2 } },
      { text: 'Liberdade, aventura e novas descobertas', scores: { oxossi: 3, exu: 2 } },
      { text: 'Paz interior, sabedoria e conexão espiritual', scores: { oxala: 3, nana: 2 } },
    ]
  },
  {
    id: 7, emoji: '🔥', question: 'Como você lida com mudanças inesperadas?',
    options: [
      { text: 'Abraço a mudança — faz parte da vida!', scores: { iansa: 3, exu: 2 } },
      { text: 'Preciso de tempo para processar, mas supero', scores: { nana: 3, oxala: 2 } },
      { text: 'Busco um plano e enfrento de frente', scores: { ogun: 3, xango: 2 } },
      { text: 'Sigo meu instinto e confio no processo', scores: { oxossi: 3, iemanja: 2 } },
    ]
  },
  {
    id: 8, emoji: '💎', question: 'Qual sua relação com a prosperidade?',
    options: [
      { text: 'Acredito que mereço e atraio abundância', scores: { oxum: 3, xango: 2 } },
      { text: 'Conquisto tudo com muito trabalho e esforço', scores: { ogun: 3, omolu: 2 } },
      { text: 'A riqueza real está nas relações e experiências', scores: { iemanja: 2, oxossi: 2 } },
      { text: 'O suficiente com paz vale mais que muito com conflito', scores: { oxala: 3, nana: 2 } },
    ]
  },
  {
    id: 9, emoji: '🌙', question: 'Como você se relaciona com o mundo espiritual?',
    options: [
      { text: 'Tenho sonhos vívidos e uma intuição muito forte', scores: { iemanja: 3, nana: 2 } },
      { text: 'Sinto a presença dos ancestrais e honro minha linhagem', scores: { omolu: 3, nana: 2 } },
      { text: 'Busco a verdade e a sabedoria por caminhos racionais', scores: { oxala: 3, xango: 2 } },
      { text: 'Vejo sinais e mensagens no cotidiano', scores: { exu: 3, oxossi: 2 } },
    ]
  },
  {
    id: 10, emoji: '🎵', question: 'Que tipo de música ecoa na sua alma?',
    options: [
      { text: 'Música que faz chorar de emoção — o sentimento puro', scores: { iemanja: 3, oxum: 2 } },
      { text: 'Ritmos que dão energia para lutar e conquistar', scores: { xango: 3, ogun: 2, iansa: 2 } },
      { text: 'Sons da natureza, instrumentos ancestrais', scores: { oxossi: 3, omolu: 2 } },
      { text: 'Silêncio e meditação — a música do ser', scores: { oxala: 3, nana: 2 } },
    ]
  },
  {
    id: 11, emoji: '🌺', question: 'Qual cor te atrai mais profundamente?',
    options: [
      { text: 'Azul e branco — a serenidade do céu e do mar', scores: { iemanja: 3, oxala: 2 } },
      { text: 'Dourado e amarelo — o brilho da prosperidade', scores: { oxum: 3 } },
      { text: 'Vermelho e branco — poder e pureza', scores: { xango: 3 } },
      { text: 'Verde — a vida da floresta', scores: { ogun: 2, oxossi: 3 } },
      { text: 'Roxo e lilás — mistério e espiritualidade', scores: { nana: 3, iansa: 2 } },
      { text: 'Preto e vermelho — força e transformação', scores: { exu: 3, omolu: 2 } },
    ]
  },
  {
    id: 12, emoji: '🦅', question: 'Qual animal te representa melhor?',
    options: [
      { text: 'Baleia ou peixe — profundidade e intuição', scores: { iemanja: 3 } },
      { text: 'Pavão ou borboleta — beleza e transformação', scores: { oxum: 3, iansa: 2 } },
      { text: 'Leão ou falcão — força e visão', scores: { xango: 3, oxossi: 2 } },
      { text: 'Lobo ou cachorro — lealdade e proteção', scores: { ogun: 3 } },
      { text: 'Veado ou cervo — rapidez e liberdade', scores: { oxossi: 3 } },
      { text: 'Pomba ou coruja — paz e sabedoria', scores: { oxala: 3, nana: 2 } },
    ]
  },
];

interface Props {
  onBack: () => void;
}

export default function OrixaQuiz({ onBack }: Props) {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSelect = (idx: number, option: QuizOption) => {
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
    }, 500);
  };

  const getResult = () => {
    if (Object.keys(scores).length === 0) return ORIXAS.iemanja;
    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return ORIXAS[top] || ORIXAS.iemanja;
  };

  const handleShare = async () => {
    const result = getResult();
    const text = `🔮 Descobri que meu Orixá pode ser ${result.name} — ${result.title}! ${result.emoji}\n"${result.advice}"\n\nDescubra a possibilidade do seu em Ifá Oluwo → ifaoluwo.com`;
    if (navigator.share) {
      await navigator.share({ title: `Meu possível Orixá é ${result.name}!`, text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Resultado copiado! Cole e compartilhe com seus amigos 😊');
    }
  };

  const restart = () => {
    setStep('intro');
    setCurrentQ(0);
    setScores({});
    setSelectedOption(null);
    setAnswers([]);
  };

  const result = step === 'result' ? getResult() : null;
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #07090d 0%, #0c0e14 100%)', display: 'flex', flexDirection: 'column' }}>
      <SEO 
        title={step === 'result' && result ? `Meu possível Orixá é ${result.name} | Ifá Oluwo Quiz` : "Qual é o meu Orixá? Descubra seu Arquétipo e Caminho | Ifá Oluwo"}
        description={step === 'result' && result ? `Fiz o teste e descobri que meu arquétipo é regido por ${result.name}. Descubra o seu também no Ifá Oluwo.` : "Descubra o possível Orixá que rege seu caminho. Um teste arquetípico baseado nas características de Iemanjá, Oxum, Xangô, Ogum e muito mais."}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Quiz dos Orixás - Ifá Oluwo",
          "applicationCategory": "LifestyleApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
          }
        }}
      />
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid rgba(196,158,48,0.1)' }}>
        <button onClick={onBack} style={{ background: 'none', border: '1px solid rgba(196,158,48,0.3)', borderRadius: 8, padding: '6px 10px', color: '#C49E30', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <ArrowLeft size={14} /> Voltar
        </button>
        <div>
          <div style={{ color: '#C49E30', fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>QUIZ DOS ORIXÁS</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Descubra qual Orixá rege seu caminho</div>
        </div>
      </div>

      {/* INTRO */}
      {step === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 24, filter: 'drop-shadow(0 0 30px rgba(196,158,48,0.5))' }}>🔮</div>
          <h1 style={{ color: '#C49E30', fontFamily: 'Georgia, serif', fontSize: 28, marginBottom: 12, lineHeight: 1.3 }}>
            Qual seria seu Orixá?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, maxWidth: 380, marginBottom: 16 }}>
            Responda 12 perguntas sobre sua personalidade, valores e forma de ver a vida. O oráculo revelará a possibilidade de qual Orixá rege seu caminho.
          </p>
          <div style={{ color: '#ff4d4d', fontSize: 12, fontWeight: 700, letterSpacing: 0.5, marginBottom: 24, padding: '8px 16px', background: 'rgba(255, 77, 77, 0.1)', borderRadius: 8, border: '1px solid rgba(255, 77, 77, 0.3)' }}>
            Atenção: Este é um teste arquetípico. A confirmação espiritual do seu Orixá só pode ser revelada através de uma consulta oracular com um Sacerdote iniciado.
          </div>
          <div style={{ background: 'rgba(196,158,48,0.06)', border: '1px solid rgba(196,158,48,0.15)', borderRadius: 12, padding: '12px 20px', marginBottom: 32, display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['⏱️', '3 min', 'duração'], ['❓', '12', 'perguntas'], ['✨', '10', 'Orixás']].map(([e, v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{e}</div>
                <div style={{ color: '#C49E30', fontWeight: 700, fontSize: 16 }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{l}</div>
              </div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520, width: '100%', margin: '0 auto' }}>
            {QUESTIONS[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => selectedOption === null && handleSelect(idx, opt)}
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
                  fontSize: 14,
                  textAlign: 'left',
                  cursor: selectedOption !== null ? 'default' : 'pointer',
                  transition: 'all 0.25s ease',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transform: selectedOption === idx ? 'scale(1.01)' : 'scale(1)',
                }}
              >
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: selectedOption === idx ? 'rgba(196,158,48,0.3)' : 'rgba(255,255,255,0.06)', border: selectedOption === idx ? '2px solid #C49E30' : '2px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0, color: selectedOption === idx ? '#FFD700' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  {selectedOption === idx ? '✓' : String.fromCharCode(65 + idx)}
                </span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RESULT */}
      {step === 'result' && result && (
        <div ref={resultRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px 60px' }}>

          {/* Orixá card */}
          <div style={{ width: '100%', maxWidth: 500, borderRadius: 24, overflow: 'hidden', background: result.gradient, boxShadow: `0 20px 60px ${result.color}40`, marginBottom: 28, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
            <div style={{ position: 'relative', padding: '40px 30px', textAlign: 'center' }}>
              <div style={{ fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Seu possível Orixá é</div>
              <div style={{ fontSize: 72, marginBottom: 8 }}>{result.emoji}</div>
              <h2 style={{ color: '#fff', fontSize: 36, fontFamily: 'Georgia, serif', margin: '0 0 4px', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                {result.name}
              </h2>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginBottom: 20 }}>{result.title}</div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                {result.qualities.map(q => (
                  <span key={q} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 50, padding: '4px 12px', fontSize: 12, color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>{q}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ width: '100%', maxWidth: 500, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,158,48,0.12)', borderRadius: 16, padding: '20px', marginBottom: 16 }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              {result.description}
            </p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4" style={{ width: '100%', maxWidth: 500 }}>
            {[
              { label: 'Saudação', value: result.greeting },
              { label: 'Dia da semana', value: result.day },
              { label: 'Elemento', value: result.element },
              { label: 'Oferendas', value: result.offerings },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,158,48,0.1)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#C49E30', fontSize: 13, fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Advice */}
          <div style={{ width: '100%', maxWidth: 500, background: 'rgba(196,158,48,0.06)', border: '1px solid rgba(196,158,48,0.2)', borderRadius: 16, padding: '16px 20px', marginBottom: 24 }}>
            <div style={{ color: '#C49E30', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>⚡ Mensagem Espiritual</div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
              "{result.advice}"
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ width: '100%', maxWidth: 500, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={handleShare}
              style={{ flex: 1, background: 'linear-gradient(135deg, #C49E30, #8B6914)', color: '#07090d', border: 'none', borderRadius: 12, padding: '14px', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: 1 }}
            >
              <Share2 size={16} /> Compartilhar
            </button>
            <button
              onClick={restart}
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <RefreshCw size={16} /> Refazer
            </button>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 20, textAlign: 'center' }}>
            Para uma consulta oficial, fale com um Babalawo iniciado. Este quiz é uma orientação espiritual.
          </p>
        </div>
      )}
    </div>
  );
}
