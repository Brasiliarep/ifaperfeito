import React, { useState } from "react";
import {
  X, User, Sparkles, ArrowRight, Droplets, Hand,
  Loader2, Compass, BookOpen, Star, Leaf,
  Heart, Eye, DollarSign, Brain
} from "lucide-react";

interface ConsultationFlowProps {
  method: string;
  onClose: () => void;
}

const ODUS_16 = [
  { name: "Èjì Ogbè", meaning: "Criação, luz, expansão, novos caminhos" },
  { name: "Ọ̀yẹ̀kú Méjì", meaning: "Mistério, noite, ancestralidade, fim de ciclos" },
  { name: "Ìwòrì Méjì", meaning: "Fogo, purificação, visão espiritual" },
  { name: "Òdí Méjì", meaning: "Terra, estabilidade, renascimento" },
  { name: "Ìrosùn Méjì", meaning: "Sol interno, determinação, foco" },
  { name: "Ọ̀wọ́nrín Méjì", meaning: "Mudança, ventania, caos criativo" },
  { name: "Ọ̀bàrà Méjì", meaning: "Prosperidade, realeza, conquistas" },
  { name: "Ọ̀kànràn Méjì", meaning: "Rebeldia, justiça, recomeço" },
  { name: "Ògúndá Méjì", meaning: "Luta, vitória, Ogum, trabalho" },
  { name: "Òsá Méjì", meaning: "Vento, intuição, Iansã, poder feminino" },
  { name: "Ìká Méjì", meaning: "Serpente, sigilo, proteção" },
  { name: "Òtúru pọ̀n Méjì", meaning: "Saúde, cura, paciência" },
  { name: "Òtúrá Méjì", meaning: "Paz, harmonia, sabedoria" },
  { name: "Ìrẹtẹ̀ Méjì", meaning: "Terra fértil, persistência, cura" },
  { name: "Ọ̀ṣẹ́ Méjì", meaning: "Doçura, Oxum, amor, criatividade" },
  { name: "Òfún Méjì", meaning: "Pureza, Obatalá, mistério divino" },
];

const IBA_SAUDACOES = [
  { pt: "Reverencio Olodumare (Deus Supremo)", yoruba: "Ìbà Olódùmarè" },
  { pt: "Reverencio Orunmila, o testemunha do destino", yoruba: "Ìbà Ọ̀rúnmìlà" },
  { pt: "Reverencio os ancestrais (Egúngún)", yoruba: "Ìbà Egúngún" },
  { pt: "Reverencio os Orixás que regem os caminhos", yoruba: "Ìbà Gbogbo Orixá" },
];

const LITURGY_STEPS = [
  {
    icon: "🚿",
    title: "Pureza Pessoal",
    desc: "Lave as mãos, o rosto e os pés com água fresca (Omi Tutu). Vista-se adequadamente — preferencialmente branco ou cores claras. Se passou por situações de raiva ou estresse intenso, sente-se em silêncio por alguns minutos e respire fundo para equilibrar o Ori (cabeça) antes de tocar no instrumento.",
  },
  {
    icon: "🛖",
    title: "Preparação do Espaço e Instrumentos",
    desc: "Limpe e posicione o Opon-Ifá sobre uma esteira. Coloque o instrumento sobre o tabuleiro ou ao seu lado, junto com os Ibó (instrumentos para respostas sim/não). Derrame um pouco de Omi Tutu no chão para refrescar o ambiente e acalmar as energias do espaço.",
  },
  {
    icon: "🙏",
    title: "Mojubá — Reverência e Abertura Ritual",
    desc: `Recite o Ìjùbá Ifá pedindo licença a Olodumare, aos ancestrais, aos mestres e a Esu.

Em Iorubá — profira em voz alta:

"Àbọ́rú, Àbọ́yẹ́, Àbọ́ṣíṣẹ.
Mojuba Olodumare. Mojuba Orunmila Baba mi.
Mojuba Esu Laroye, ode orun.
Mojuba gbogbo Egungun. Ase o."`,
  },
  {
    icon: "🔮",
    title: "Ativação com o Consulente",
    desc: "Instrua o consulente a mentalizar com clareza sua pergunta, depositando sua energia no instrumento por um momento. Em seguida, toque o instrumento nos quatro pontos cardeais antes do primeiro lançamento, para identificar o Odù regente da consulta.",
  },
];

const RESULT_SECTIONS = [
  { id: "espiritual", label: "Espiritual", icon: Star, content: "Cuidar do Ori é essencial. Ayanmo e Ori (Destino e Cabeça Espiritual) pedem atenção." },
  { id: "oria", label: "Ori/Destino", icon: Brain, content: "Seu Ori está alinhado com o propósito maior. Confie na jornada." },
  { id: "ebo", label: "Ebó Principal", icon: Sparkles, content: "Oferecer vela branca, mel e água fresca a Obatalá." },
  { id: "ervas", label: "Ervas & Banhos", icon: Leaf, content: "Manjericão, alecrim e folha de fortuna para banho de descarrego." },
  { id: "amor", label: "Amor", icon: Heart, content: "Oxum abençoa. Tempo de cultivar afetos com paciência." },
  { id: "dinheiro", label: "Dinheiro", icon: DollarSign, content: "Prosperidade a caminho. Ogum abre portas materiais." },
  { id: "saude", label: "Saúde", icon: Heart, content: "Cuidado com o estresse. Banho de ervas e repouso." },
  { id: "perigos", label: "Perigos", icon: Eye, content: "Falta de paciência (Suuru) traz bloqueios." },
  { id: "comportamento", label: "Comportamento", icon: User, content: "Humildade e escuta ativa são as chaves." },
  { id: "decisoes", label: "Decisões", icon: Compass, content: "Consulte um Babaláwo presencialmente para confirmação." },
];

type SeedState = "aberto" | "fechado";

function FavaSeed({ state, onClick }: { state: SeedState; onClick: () => void }) {
  const [animating, setAnimating] = useState(false);
  const [rotation, setRotation] = useState(state === 'aberto' ? 0 : 180);

  const DURATION = 360; // ms
  const EASING = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

  // Keep rotation in sync when external state changes and we are not animating
  React.useEffect(() => {
    if (!animating) {
      setRotation(state === 'aberto' ? 0 : 180);
    }
  }, [state, animating]);

  const handleClick = () => {
    if (animating) return;
    setAnimating(true);
    const target = state === 'aberto' ? 180 : 0;
    // overshoot by +2deg for organic feel
    setRotation(target + 2);
    // toggle logical state at half‑duration
    setTimeout(() => {
      onClick();
    }, DURATION / 2);
    // settle to final rotation after overshoot
    setTimeout(() => {
      setRotation(target);
    }, DURATION);
    // end animation flag
    setTimeout(() => setAnimating(false), DURATION + 150);
  };

  // Visual helpers
  const isActive = animating;
  const glowOpacity = isActive ? 0.5 : 0;
  const openShadow = `0 0 12px rgba(247,226,175,${glowOpacity})`;
  const closedShadow = `inset 0 2px 8px rgba(0,0,0,0.5), 0 ${isActive ? 6 : 4}px ${isActive ? 14 : 10}px rgba(0,0,0,${isActive ? 0.4 : 0.3})`;

  const sharedFace = {
    position: 'absolute' as const,
    inset: 0,
    backfaceVisibility: 'hidden' as const,
    borderRadius: '9999px',
  };

  const seedStyle: React.CSSProperties = {
    perspective: '800px',
    width: '56px',
    height: '30px',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
  };

  const innerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: `rotateY(${rotation}deg) scale(${isActive ? 1.05 : 1})`,
    transition: `transform ${DURATION}ms ${EASING}`,
    willChange: 'transform',
    filter: isActive ? 'brightness(1.1)' : 'none',
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={state === 'aberto'}
      aria-label={`Semente ${state === 'aberto' ? 'aberta' : 'fechada'}`}
      onClick={handleClick}
      onKeyDown={handleKey}
      style={seedStyle}
    >
      <div style={innerStyle}>
        {/* Front – aberta */}
        <div
          style={{
            ...sharedFace,
            background: 'linear-gradient(165deg, #f7e2af 0%, #dca34b 50%, #c9842a 100%)',
            border: '1.5px solid rgba(247,226,175,0.6)',
            boxShadow: state === 'aberto' ? openShadow : 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(247,226,175,0.25)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.12)',
              }}
            />
          </div>
        </div>
        {/* Back – fechada */}
        <div
          style={{
            ...sharedFace,
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(165deg, #2a2218 0%, #1a1510 50%, #0f0c09 100%)',
            border: '1.5px solid #4a3d2e',
            boxShadow: state === 'fechado' ? closedShadow : 'inset 0 2px 6px rgba(0,0,0,0.4)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 35% 30%, rgba(58,50,37,0.4) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#3a3225',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConsultationFlow({ method, onClose }: ConsultationFlowProps) {
  const validOracles = ["opele", "opon", "ikin", "merindilogun"];
  const preselectedOracle = validOracles.includes(method) ? method : null;
  const [step, setStep] = useState(preselectedOracle ? 1 : 0);
  const [consulente, setConsulente] = useState({ nome: "", pergunta: "", contato: "" });
  const [waterClicks, setWaterClicks] = useState(0);
  const [iboChoice, setIboChoice] = useState<string | null>(null);
  const [iboResult, setIboResult] = useState<any>(null);
  const [oracleChoice, setOracleChoice] = useState<string | null>(preselectedOracle);
  const [liturgyStep, setLiturgyStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stageText, setStageText] = useState("");

  const [leftSeeds, setLeftSeeds] = useState<SeedState[]>(["aberto", "fechado", "aberto", "fechado"]);
  const [rightSeeds, setRightSeeds] = useState<SeedState[]>(["fechado", "aberto", "fechado", "aberto"]);

  const [result, setResult] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("espiritual");
  const [notes, setNotes] = useState("");
  const [specificQuestion, setSpecificQuestion] = useState("");

  const toggleSeed = (side: "left" | "right", idx: number) => {
    if (side === "left") {
      setLeftSeeds(prev => prev.map((s, i) => i === idx ? (s === "aberto" ? "fechado" : "aberto") : s));
    } else {
      setRightSeeds(prev => prev.map((s, i) => i === idx ? (s === "aberto" ? "fechado" : "aberto") : s));
    }
  };

  const getOduFromSeeds = () => {
    const leftBin = leftSeeds.map(s => s === "aberto" ? "1" : "0").join("");
    const rightBin = rightSeeds.map(s => s === "aberto" ? "1" : "0").join("");
    const binary = leftBin + rightBin;
    const idx = parseInt(binary, 2) % ODUS_16.length;
    return ODUS_16[idx];
  };

  const handleCast = async () => {
    setLoading(true);
    const stages = [
      "Concentrando energias no Ori do consulente...",
      "Invocando os Orixás e os ancestrais...",
      "Soprando o pó sagrado de Ierosun...",
      "Lançando os oráculos sagrados..."
    ];
    for (const s of stages) {
      setStageText(s);
      await new Promise(r => setTimeout(r, 700));
    }
    const odu = getOduFromSeeds();
    const ireType = iboChoice === "pedra" ? "Iré" : "Osogbo";
    try {
      const response = await fetch("/api/divinate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: oracleChoice || "opele", question: consulente.pergunta })
      });
      if (response.ok) {
        const data = await response.json();
        setResult({ ...data, ire: ireType, odu: data.odu || odu });
      } else {
        throw new Error("API error");
      }
    } catch {
      setResult({
        success: true,
        odu,
        ire: ireType,
        interpretation: `Orixá regente: Ṣàngó.

Ifá revela que você está em um momento de ${ireType === "Iré" ? "bênçãos e prosperidade" : "desafios e aprendizado"}.

Odu ${odu.name}: ${odu.meaning}.

Recomenda-se paciência e respeito aos ancestrais.`
      });
    } finally {
      setLoading(false);
      setStageText("");
    }
  };

  const totalSteps = preselectedOracle ? 8 : 9;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#0e0c0a] border border-[#c19a4d]/30 rounded-2xl w-full max-w-3xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col max-h-[95vh] min-h-[60vh]">
        {/* Header */}
        <div className="border-b border-[#c19a4d]/20 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-[#15120e] shrink-0">
          <div className="flex items-center gap-2.5">
            <Compass size={16} className="text-[#dca34b]" />
            <div>
              <h3 className="font-cinzel text-sm sm:text-md font-bold tracking-widest text-[#f7e2af]">
                {step === 0 && "Divinação Sagrada"}
                {step === 1 && "Ìbà — Saudação Sagrada"}
                {step === 2 && "Omi Tutu — Água Fresca"}
                {step === 3 && "Jogo de Ibó — Abertura do Caminho"}
                {step === 4 && "Ibó Revelado"}
                {step === 5 && "Escolha do Oráculo Sagrado"}
                {step === 6 && "Obrigação Litúrgica"}
                {step === 7 && "O Jogo — Lançamento Sagrado"}
                {step === 8 && "Resultado da Consulta"}
              </h3>
              <p className="text-[9px] text-[#8b754e] font-sans uppercase tracking-wider mt-0.5">
                {step === 0 && "Consulta Espiritual & Conexão Cósmica"}
                {step === 1 && "Reverência aos ancestrais"}
                {step === 2 && `Toque na gota para derramar ${waterClicks}/3`}
                {step === 3 && "Pedra (Irê) ou Osso (Osogbo)"}
                {step === 4 && "O caminho foi determinado"}
                {step === 5 && "Selecione o método divinatório"}
                {step === 6 && `Passo ${liturgyStep + 1} de 4`}
                {step === 7 && "Ajuste as favas e interprete"}
                {step === 8 && "Ifá falou"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#a88e5d] hover:text-[#f3eee3] p-1 rounded-full hover:bg-[#c19a4d]/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 bg-[#0a0807] shrink-0">
          <div className="h-full bg-gradient-to-r from-[#c19a4d] to-[#dca34b] transition-all duration-500" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

          {/* ===== STEP 0: Cadastro — Instrumento + Pergunta ===== */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-center space-y-1.5">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#f7e2af] tracking-widest uppercase">Divinação Sagrada</h4>
                <p className="text-[10px] text-[#8b754e] tracking-wider">Consulta Espiritual & Conexão Cósmica</p>
              </div>

              {/* Seletor de Instrumento */}
              <div>
                <p className="text-[10px] text-[#b49d79] font-semibold uppercase tracking-wider text-center mb-3">Selecione o Instrumento Divinatório</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "opele", name: "Opelé Ifá", desc: "Corrente de 8 sementes", icon: "🔗" },
                    { id: "opon", name: "Opon Ifá", desc: "Tabuleiro Sagrado", icon: "🔲" },
                    { id: "ikin", name: "Ikin Ifá", desc: "16 Sementes de Dendê", icon: "🌴" },
                    { id: "merindilogun", name: "Búzios", desc: "16 Conchas Sagradas", icon: "🐚" },
                  ].map((o) => {
                    const selected = oracleChoice === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setOracleChoice(o.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selected
                            ? "bg-[#c19a4d]/15 border-[#dca34b] shadow-[0_0_12px_rgba(220,163,75,0.15)]"
                            : "bg-[#0a0807] border-[#c19a4d]/20 hover:border-[#dca34b]/60"
                        }`}
                      >
                        <div className="text-2xl mb-1.5">{o.icon}</div>
                        <h5 className="text-xs font-bold text-[#f7e2af] font-cinzel tracking-wider">{o.name}</h5>
                        <p className="text-[9px] text-[#8b754e] mt-0.5">{o.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pergunta */}
              <div>
                <textarea
                  value={consulente.pergunta}
                  onChange={e => setConsulente(p => ({ ...p, pergunta: e.target.value }))}
                  placeholder="Mentalize sua pergunta ou dilema
Ex: Como posso me alinhar melhor com a minha prosperidade financeira e caminhos profissionais?"
                  rows={4}
                  className="w-full bg-[#0a0807] border border-[#c19a4d]/20 rounded-xl px-4 py-3 text-sm text-[#f3eee3] placeholder-[#5a4d38] focus:outline-none focus:border-[#dca34b] transition-all resize-none"
                />
                <p className="text-[8px] text-[#5a4d38] mt-1.5 text-center italic">* A consulta exige silêncio interior, sinceridade e respeito aos ensinamentos sagrados dos Odus.</p>
              </div>

              <button
                onClick={() => { if (oracleChoice) setStep(1); }}
                disabled={!oracleChoice}
                className="w-full bg-gradient-to-r from-[#b46b1f] via-[#dca34b] to-[#b46b1f] text-black font-cinzel font-bold text-xs tracking-widest py-4 px-6 rounded-xl hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(220,163,75,0.2)]"
              >
                <span>Realizar Lançamento Sagrado</span>
                <Sparkles size={14} />
              </button>
            </div>
          )}

          {/* ===== STEP 1: Iba ===== */}
          {step === 1 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#dca34b]/40 bg-[#12100e] flex items-center justify-center mx-auto">
                <BookOpen size={28} className="text-[#dca34b]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-cinzel text-base font-bold text-[#f7e2af] tracking-widest">Ìbà — Saudação Sagrada</h4>
                <p className="text-[11px] text-[#b49d79]">Antes de iniciar a consulta, reverenciamos as forças espirituais.</p>
              </div>
              <div className="space-y-3 text-left max-w-lg mx-auto">
                {IBA_SAUDACOES.map((s, i) => (
                  <div key={i} className="bg-[#0a0807] border border-[#c19a4d]/10 rounded-xl p-4">
                    <p className="text-xs font-bold text-[#dca34b] font-cinzel tracking-wider">{s.yoruba}</p>
                    <p className="text-[11px] text-[#8b754e] mt-1">{s.pt}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="bg-gradient-to-r from-[#b46b1f] via-[#dca34b] to-[#b46b1f] text-black font-cinzel font-bold text-xs tracking-widest py-3.5 px-6 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mx-auto shadow-[0_4px_20px_rgba(220,163,75,0.2)]">
                <span>Prosseguir — Omi Tutu</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* ===== STEP 2: Omi Tutu ===== */}
          {step === 2 && (
            <div className="space-y-6 text-center">
              <div className="relative w-32 h-32 mx-auto">
                <div className={`absolute inset-0 rounded-full border-2 ${waterClicks < 3 ? "border-[#c19a4d]/40 animate-pulse" : "border-green-500/60"} flex items-center justify-center bg-[#0a0807]`}>
                  <Droplets size={waterClicks >= 3 ? 36 : 28} className={`transition-all duration-300 ${waterClicks >= 3 ? "text-blue-400" : "text-[#dca34b]"} ${waterClicks < 3 ? "animate-bounce" : ""}`} />
                </div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold font-cinzel text-[#8b754e]">{waterClicks}/3</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-cinzel text-sm font-bold text-[#f7e2af] tracking-widest">Omi Tutu — Água Fresca</h4>
                <p className="text-xs text-[#b49d79] max-w-sm mx-auto">Toque na gota 3 vezes para derramar a água sagrada e purificar o ambiente.</p>
              </div>
              <button
                onClick={() => {
                  if (waterClicks < 3) setWaterClicks(prev => prev + 1);
                }}
                disabled={waterClicks >= 3}
                className="w-20 h-20 rounded-full border-2 border-[#dca34b]/50 bg-[#12100e] hover:bg-[#1a1714] disabled:opacity-30 disabled:cursor-not-allowed transition-all mx-auto flex items-center justify-center"
              >
                <Droplets size={32} className={`text-[#dca34b] ${waterClicks < 3 ? "animate-bounce" : ""}`} />
              </button>
              <p className="text-[10px] text-[#8b754e]">{waterClicks < 3 ? `Toque +${3 - waterClicks} vezes para completar` : "Água derramada. Ambiente purificado."}</p>
              {waterClicks >= 3 && (
                <button onClick={() => setStep(3)} className="bg-gradient-to-r from-[#b46b1f] via-[#dca34b] to-[#b46b1f] text-black font-cinzel font-bold text-xs tracking-widest py-3 px-6 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mx-auto shadow-[0_4px_20px_rgba(220,163,75,0.2)]">
                  <span>Abrir Jogo de Ibó</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          )}

          {/* ===== STEP 3: Jogo de Ibó ===== */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#dca34b]/40 bg-[#12100e] flex items-center justify-center mx-auto">
                <Hand size={28} className="text-[#dca34b]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-cinzel text-sm font-bold text-[#f7e2af] tracking-widest">Jogo de Ibó</h4>
                <p className="text-[11px] text-[#b49d79] max-w-md mx-auto">Ritual de Abertura — Determinação do Caminho</p>
                <p className="text-[10px] text-[#8b754e] max-w-sm mx-auto">Visualize dois objetos sagrados. Qual sua mão sente chamar?</p>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={() => { setIboChoice("pedra"); setIboResult({ type: "Iré", sub: "Ire Omo", desc: "Bênçãos de filhos e descendência. O Ori abre caminhos para a família." }); setStep(4); }}
                  className={`p-6 rounded-xl border-2 transition-all text-center ${iboChoice === "pedra" ? "bg-[#c19a4d]/15 border-[#dca34b]" : "bg-[#0a0807] border-[#c19a4d]/20 hover:border-[#dca34b]/60"}`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#1c1611] border-2 border-[#a88e5d]/40 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🪨</span>
                  </div>
                  <p className="text-xs font-bold text-[#f7e2af] font-cinzel tracking-wider">MÃO DIREITA</p>
                  <p className="text-[9px] text-[#8b754e] mt-1">PEDRA (OTÁ)</p>
                  <p className="text-[9px] text-green-500/80 mt-1">Símbolo de Irê — bênção</p>
                </button>
                <button
                  onClick={() => { setIboChoice("osso"); setIboResult({ type: "Osogbo", sub: "Desafio", desc: "Momento de atenção. Os ancestrais pedem cautela e ebó." }); setStep(4); }}
                  className={`p-6 rounded-xl border-2 transition-all text-center ${iboChoice === "osso" ? "bg-[#c19a4d]/15 border-[#dca34b]" : "bg-[#0a0807] border-[#c19a4d]/20 hover:border-[#dca34b]/60"}`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#1c1611] border-2 border-[#a88e5d]/40 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🦴</span>
                  </div>
                  <p className="text-xs font-bold text-[#f7e2af] font-cinzel tracking-wider">MÃO ESQUERDA</p>
                  <p className="text-[9px] text-[#8b754e] mt-1">OSSO (GUNGUN)</p>
                  <p className="text-[9px] text-red-500/80 mt-1">Símbolo de Osogbo — desafio</p>
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 4: Ibó Resultado ===== */}
          {step === 4 && iboResult && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#dca34b]/40 bg-[#12100e] flex items-center justify-center mx-auto">
                <Star size={28} className="text-[#dca34b]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-cinzel text-sm font-bold text-[#f7e2af] tracking-widest">O Ibó Revelou</h4>
                <div className={`inline-block px-4 py-1.5 rounded-full border text-xs font-bold font-cinzel tracking-wider ${iboResult.type === "Iré" ? "bg-green-900/30 border-green-600/50 text-green-400" : "bg-red-900/30 border-red-600/50 text-red-400"}`}>
                  ✦ {iboResult.type} ✦
                </div>
                <p className="text-sm font-bold text-[#f7e2af] font-cinzel tracking-widest mt-2">{iboResult.sub}</p>
                <p className="text-[11px] text-[#b49d79] max-w-sm mx-auto">{iboResult.desc}</p>
              </div>
              <div className="bg-[#0a0807] border border-[#c19a4d]/10 rounded-xl p-4 text-[10px] text-[#8b754e]">
                Ifá fala agora. Escolha o oráculo para prosseguir.
              </div>
              <button onClick={() => setStep(oracleChoice ? 6 : 5)} className="bg-gradient-to-r from-[#b46b1f] via-[#dca34b] to-[#b46b1f] text-black font-cinzel font-bold text-xs tracking-widest py-3 px-6 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mx-auto shadow-[0_4px_20px_rgba(220,163,75,0.2)]">
                <span>Continuar com a Leitura</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* ===== STEP 5: Escolha do Oráculo ===== */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-[10px] text-[#8b754e] uppercase tracking-wider">Sacerdote Admin (Teste)</p>
                <h4 className="font-cinzel text-sm font-bold text-[#f7e2af] tracking-widest mt-1">Escolha o Oráculo Sagrado</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "opele", name: "Opelé Ifá", desc: "Corrente Sagrada", sub: "16 sementes · Uso diário", icon: "🔗" },
                  { id: "opon", name: "Opon Ifá", desc: "Tabuleiro Sagrado", sub: "Marcas no Iyerosun · Sacerdotal", icon: "🔲" },
                  { id: "ikin", name: "Ikin Ifá", desc: "Sementes de Palma", sub: "16 Ikin · Orunmila", icon: "🌴" },
                  { id: "merindilogun", name: "Mérìndílógún", desc: "Dezesseis Búzios", sub: "Oráculo de Oshun", icon: "🐚" },
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => { setOracleChoice(o.id); setStep(6); }}
                    className="bg-[#0a0807] border border-[#c19a4d]/20 hover:border-[#dca34b]/60 rounded-xl p-4 sm:p-5 text-left transition-all group"
                  >
                    <div className="text-2xl mb-2">{o.icon}</div>
                    <h5 className="text-xs font-bold text-[#f7e2af] font-cinzel tracking-wider group-hover:text-[#dca34b] transition-colors">{o.name}</h5>
                    <p className="text-[11px] text-[#dca34b] font-semibold mt-0.5">{o.desc}</p>
                    <p className="text-[9px] text-[#8b754e] mt-1">{o.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== STEP 6: Obrigação Litúrgica ===== */}
          {step === 6 && (
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-[10px] text-[#8b754e] uppercase tracking-wider">Obrigação Litúrgica</p>
                <h4 className="font-cinzel text-sm font-bold text-[#f7e2af] tracking-widest mt-1">{oracleChoice === "opele" ? "Opelé Ifá" : oracleChoice} — Preparação Ritual</h4>
              </div>

              {/* Sub-passos */}
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setLiturgyStep(i)}
                    className={`w-7 h-7 rounded-full text-[10px] font-bold font-cinzel border transition-all ${liturgyStep === i ? "bg-[#dca34b] text-black border-[#dca34b]" : "bg-[#0a0807] text-[#8b754e] border-[#c19a4d]/20 hover:border-[#c19a4d]/40"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="bg-[#0a0807] border border-[#c19a4d]/15 rounded-xl p-5 space-y-3">
                <div className="text-2xl">{LITURGY_STEPS[liturgyStep].icon}</div>
                <h5 className="text-xs font-bold text-[#f7e2af] font-cinzel tracking-wider">Passo {liturgyStep + 1} de 4 — {LITURGY_STEPS[liturgyStep].title}</h5>
                <p className="text-[11px] text-[#b49d79] leading-relaxed whitespace-pre-line">{LITURGY_STEPS[liturgyStep].desc}</p>
              </div>

              <div className="flex gap-3">
                {liturgyStep > 0 && (
                  <button onClick={() => setLiturgyStep(liturgyStep - 1)} className="flex-1 bg-[#161310] border border-[#c19a4d]/20 text-[#8b754e] hover:text-[#f7e2af] py-3 rounded-xl text-[10px] font-bold font-cinzel tracking-wider transition-all">
                    Passo Anterior
                  </button>
                )}
                <button
                  onClick={() => {
                    if (liturgyStep < 3) setLiturgyStep(liturgyStep + 1);
                    else { setStep(7); handleCast(); }
                  }}
                  className="flex-1 bg-gradient-to-r from-[#b46b1f] via-[#dca34b] to-[#b46b1f] text-black font-cinzel font-bold text-xs tracking-widest py-3 rounded-xl hover:brightness-110 transition-all"
                >
                  {liturgyStep < 3 ? "Próximo Passo" : "Concluído — Iniciar Jogo"}
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 7: O Jogo (loading ou interactive) ===== */}
          {step === 7 && loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <Loader2 size={48} className="text-[#dca34b] animate-spin" />
                <Sparkles size={16} className="text-[#f7e2af] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
              </div>
              <div className="text-center space-y-1.5">
                <h4 className="text-sm font-bold text-[#f7e2af] font-cinzel tracking-wider uppercase animate-pulse">{stageText}</h4>
                <p className="text-[10px] text-[#8b754e] uppercase tracking-widest">Processando vibrações energéticas</p>
              </div>
            </div>
          )}

          {step === 7 && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-[#dca34b]" />
                  <span className="text-xs text-[#b49d79]">Consulente</span>
                </div>
                <button onClick={() => setStep(5)} className="text-[9px] text-[#8b754e] hover:text-[#dca34b] underline underline-offset-2 transition-colors">
                  Trocar Método
                </button>
              </div>

              {/* Instrução */}
              <p className="text-[9px] text-center text-[#8b754e] italic">Clique nas sementes para alternar entre Aberto (ouro) e Fechado (bronze)</p>

              {/* Opelé — Corrente Sagrada (3D) */}
              <div className="max-w-xs mx-auto relative">
                {/* Top chain */}
                <div className="flex justify-center mb-1">
                  <div className="flex gap-1">
                    {[0,1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[#8b754e]/30" />)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {(["left", "right"] as const).map((side) => (
                    <div key={side} className="flex flex-col items-center">
                      <p className="text-[8px] text-[#8b754e] uppercase tracking-wider font-bold mb-1.5">
                        Perna {side === "left" ? "Esquerda" : "Direita"}
                      </p>
                      <div className="flex flex-col items-center">
                        {(side === "left" ? leftSeeds : rightSeeds).map((s, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <FavaSeed
                              state={s}
                              onClick={() => toggleSeed(side, i)}
                            />
                            {i < 3 && (
                              <div className="h-2 flex items-center justify-center">
                                <div className="w-px h-2 bg-[#8b754e]/20 rounded-full" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom chain */}
                <div className="flex justify-center mt-1">
                  <div className="flex gap-1">
                    {[0,1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[#8b754e]/30" />)}
                  </div>
                </div>
              </div>

              {/* Odu Detectado */}
              <div className="bg-[#0a0807] border border-[#c19a4d]/20 rounded-xl p-4 text-center space-y-2">
                <p className="text-[9px] text-[#8b754e] uppercase tracking-wider">Odu Detectado</p>
                <h4 className="font-cinzel text-base font-bold text-[#f7e2af] tracking-widest">{getOduFromSeeds().name}</h4>
                <p className="text-[10px] text-[#b49d79]">{getOduFromSeeds().meaning}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => handleCast()} className="flex-1 bg-gradient-to-r from-[#b46b1f] via-[#dca34b] to-[#b46b1f] text-black font-cinzel font-bold text-xs tracking-widest py-3 rounded-xl hover:brightness-110 transition-all">
                  Interpretar Caída
                </button>
                <button onClick={onClose} className="px-4 bg-[#161310] border border-[#c19a4d]/20 text-[#8b754e] hover:text-[#f7e2af] py-3 rounded-xl text-[10px] font-bold font-cinzel tracking-wider transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 8: Resultado ===== */}
          {step === 8 && result && (
            <div className="space-y-5">
              {/* Header info */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#8b754e]">
                <span className="text-[#b49d79]">{oracleChoice}</span>
              </div>

              {/* Ire/Osogbo banner */}
              <div className={`p-4 rounded-xl border text-center ${
                result.ire === "Iré" ? "bg-green-900/20 border-green-700/40" : "bg-red-900/20 border-red-700/40"
              }`}>
                <p className="text-base font-bold font-cinzel tracking-widest text-green-400">{result.ire}</p>
                <p className="text-[9px] text-[#b49d79] mt-1">{result.ire === "Iré" ? "Positivo — Caminho aberto" : "Desafio — Ebó recomendado"}</p>
              </div>

              {/* Odu */}
              <div className="bg-gradient-to-r from-[#201912] to-[#12100e] border border-[#dca34b]/35 p-4 rounded-2xl text-center">
                <span className="text-[8px] font-bold text-[#dca34b] uppercase tracking-widest bg-[#3a2c16] px-2 py-0.5 rounded border border-[#c19a4d]/20">Odu Detectado</span>
                <h3 className="font-cinzel text-lg font-bold text-[#f7e2af] tracking-widest mt-2">{result.odu?.name || "Irete Irosun"}</h3>
                <p className="text-[10px] text-[#b49d79] mt-1">{result.odu?.description || "Caminho de sorte."}</p>
                <div className="flex justify-center gap-4 mt-3 text-[9px] text-[#8b754e]">
                  <span>Osan (Tarde)</span>
                  <span className="text-[#c19a4d]/30">|</span>
                  <span className="text-green-400">{result.ire} (Positivo)</span>
                </div>
              </div>

              {/* Sections grid */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {RESULT_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      activeSection === s.id
                        ? "bg-[#c19a4d]/15 border-[#dca34b]"
                        : "bg-[#0a0807] border-[#c19a4d]/10 hover:border-[#c19a4d]/30"
                    }`}
                  >
                    <s.icon size={12} className="mx-auto text-[#dca34b]" />
                    <p className="text-[7px] text-[#8b754e] mt-1 leading-tight">{s.label}</p>
                  </button>
                ))}
              </div>

              {/* Active section content */}
              <div className="bg-[#0a0807] border border-[#c19a4d]/10 rounded-xl p-4">
                <p className="text-[11px] text-[#b49d79] leading-relaxed">
                  {RESULT_SECTIONS.find(s => s.id === activeSection)?.content}
                </p>
              </div>

              {/* Interpretation */}
              {result.interpretation && (
                <div className="bg-[#12100e] border border-[#c19a4d]/15 p-4 rounded-xl text-[11px] text-[#b49d79] leading-relaxed max-h-40 overflow-y-auto">
                  {typeof result.interpretation === "string" ? result.interpretation.split("\n\n").map((p: string, i: number) => (
                    <p key={i} className="mb-2">{p.replace(/^###?\s*/, "")}</p>
                  )) : <p>Interpretação disponível.</p>}
                </div>
              )}

              {/* Mandala */}
              <div className="bg-[#0a0807] border border-[#c19a4d]/10 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] text-[#8b754e] uppercase tracking-wider">Mandala do Odu</p>
                  <p className="text-xs text-[#b49d79] mt-1">Arte digital vibracional para o cliente.</p>
                </div>
                <button className="bg-[#1c1611] border border-[#c19a4d]/30 text-[#f7e2af] px-3 py-1.5 rounded-lg text-[9px] font-bold font-cinzel tracking-wider hover:bg-[#c19a4d]/10 transition-all whitespace-nowrap">
                  R$ 50 · Adicionar
                </button>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[9px] text-[#8b754e] uppercase tracking-wider block mb-1">Notas Confidenciais do Babaláwo</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Escreva aqui observações que não aparecerão na impressão..." rows={2} className="w-full bg-[#0a0807] border border-[#c19a4d]/15 rounded-xl px-4 py-2.5 text-[11px] text-[#f3eee3] placeholder-[#5a4d38] focus:outline-none focus:border-[#dca34b] transition-all resize-none" />
              </div>

              {/* Specific question */}
              <div>
                <label className="text-[9px] text-[#8b754e] uppercase tracking-wider block mb-1">Pergunta Específica ao Oráculo</label>
                <input value={specificQuestion} onChange={e => setSpecificQuestion(e.target.value)} placeholder="Faça uma pergunta específica sobre..." className="w-full bg-[#0a0807] border border-[#c19a4d]/15 rounded-xl px-4 py-2.5 text-[11px] text-[#f3eee3] placeholder-[#5a4d38] focus:outline-none focus:border-[#dca34b] transition-all" />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => { setStep(0); setConsulente({ nome: "", pergunta: "", contato: "" }); setWaterClicks(0); setIboChoice(null); setIboResult(null); setOracleChoice(null); setLiturgyStep(0); setResult(null); setLeftSeeds(["aberto", "fechado", "aberto", "fechado"]); setRightSeeds(["fechado", "aberto", "fechado", "aberto"]); setActiveSection("espiritual"); setNotes(""); setSpecificQuestion(""); }}
                  className="flex-1 bg-[#dca34b] hover:bg-[#ecc67d] text-black font-cinzel font-bold text-[10px] tracking-widest py-3 rounded-xl transition-all"
                >
                  Jogar Novamente
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-[#1a1714] border border-[#c19a4d]/30 text-[#f7e2af] font-cinzel font-bold text-[10px] tracking-widest py-3 rounded-xl hover:bg-[#c19a4d]/10 transition-all"
                >
                  Encerrar e Gerar Impressão
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}


