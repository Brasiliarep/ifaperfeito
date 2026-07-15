
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { SeedState } from '../types';
import { Shell, Camera, Shuffle } from 'lucide-react';

interface Props {
    cowries: SeedState[];
    onToggle: (index: number) => void;
}

const ODUS = [
  { n: 0,  nome: 'Oyeku Meji',     energia: 'Iku presente — recomeço total, transformação profunda' },
  { n: 1,  nome: 'Okofun',         energia: 'Silêncio sagrado — escuta o que não é dito' },
  { n: 2,  nome: 'Eji Oko',        energia: 'Dualidade — dois caminhos se apresentam' },
  { n: 3,  nome: 'Ogunda Meji',    energia: 'Ogun abre — força, determinação e vitória' },
  { n: 4,  nome: 'Irosun Meji',    energia: 'Sangue e vida — prosperidade e realização' },
  { n: 5,  nome: 'Oshé Meji',      energia: 'Oshun fala — amor, beleza e abundância chegam' },
  { n: 6,  nome: 'Obara Meji',     energia: 'Xangô reina — poder, justiça e realeza' },
  { n: 7,  nome: 'Odi Meji',       energia: 'Mistério — o que está oculto se revela' },
  { n: 8,  nome: 'Eji Ogbe',       energia: 'Obatalá ilumina — pureza, paz e sabedoria' },
  { n: 9,  nome: 'Osa Meji',       energia: 'Oyá sopra — transformação e mudança iminente' },
  { n: 10, nome: 'Ofun Meji',      energia: 'Ancestrais falam — honrar as raízes traz força' },
  { n: 11, nome: 'Owonrin Meji',   energia: 'Eshu ri — imprevisível, o destino se dobra' },
  { n: 12, nome: 'Ejila Shebora',  energia: 'Oxalá abençoa — renovação e recomeço sagrado' },
  { n: 13, nome: 'Metanla',        energia: 'Caça ao destino — persistência traz recompensa' },
  { n: 14, nome: 'Merinla',        energia: 'Quatro ventos — equilíbrio e proteção' },
  { n: 15, nome: 'Marunla',        energia: 'Águas profundas — emoções e intuição emergem' },
  { n: 16, nome: 'Merindilogun',   energia: 'Olorum fala — mensagem suprema, ouça com reverência' },
];

// Búzio FECHADO — foto realista (dorso)
const BuzioFechado: React.FC<{ id: string }> = ({ id: _id }) => (
  <img
    src="/buzio_fechado.png"
    alt="búzio fechado"
    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', pointerEvents: 'none' }}
  />
);

// Búzio ABERTO — foto realista (ventre furado)
const BuzioAberto: React.FC<{ id: string }> = ({ id: _id }) => (
  <img
    src="/buzio_aberto.png"
    alt="búzio aberto"
    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', pointerEvents: 'none' }}
  />
);

// --- SOUND FUNCTIONS ---

function somImpacto(delay: number) {
  setTimeout(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140 + Math.random() * 60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.10, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      const noise = ctx.createOscillator();
      const noiseGain = ctx.createGain();
      noise.connect(noiseGain); noiseGain.connect(ctx.destination);
      noise.type = 'sawtooth';
      noise.frequency.setValueAtTime(600 + Math.random() * 300, ctx.currentTime);
      noiseGain.gain.setValueAtTime(0.03, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
      noise.start(); noise.stop(ctx.currentTime + 0.07);
    } catch {}
  }, delay);
}

function somRevelacao() {
  try {
    const ctx = new AudioContext();
    const freqs = [220, 277, 330, 415];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
      gain.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.7);
      osc.start(ctx.currentTime + i * 0.07);
      osc.stop(ctx.currentTime + i * 0.07 + 0.8);
    });
  } catch {}
}

function somVirada() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(); osc.stop(ctx.currentTime + 0.25);
  } catch {}
}

// --- COLLISION DETECTION ---

interface Posicao { x: number; y: number; rot: number; }

function gerarPosicoes(largura: number, altura: number): Posicao[] {
  const scale = Math.min(largura / 448, 1);
  const pad = Math.round(Math.max(20, 38 * scale));
  const bW = 52, bH = 36;
  const minDist = Math.max(34, Math.round(52 * scale));
  const pos: Posicao[] = [];
  
  const cx = largura / 2;
  const cy = altura / 2;
  const maxRadius = (largura / 2) - pad - (Math.max(bW, bH) / 2);

  let tentativas = 0;
  while (pos.length < 16 && tentativas < 5000) {
    tentativas++;
    const x = pad + Math.random() * (largura - bW - pad * 2);
    const y = pad + Math.random() * (altura - bH - pad * 2);
    const rot = Math.random() * 60 - 30;
    
    // Check circular boundary
    const centerBuzioX = x + bW / 2;
    const centerBuzioY = y + bH / 2;
    const distToCenter = Math.sqrt((centerBuzioX - cx) ** 2 + (centerBuzioY - cy) ** 2);
    
    if (distToCenter > maxRadius) continue; // Outside the circle!

    let valido = true;
    for (const p of pos) {
      const dx = x - p.x, dy = y - p.y;
      if (Math.sqrt(dx * dx + dy * dy) < minDist) { valido = false; break; }
    }
    if (valido) pos.push({ x, y, rot });
  }
  
  // Fallback: if still not 16, force-place remaining using a spiral or inner circle
  if (pos.length < 16) {
    for (let i = pos.length; i < 16; i++) {
        // Just place them in a tight circle in the center if we run out of space
        const angle = (i / 16) * Math.PI * 2;
        const radius = maxRadius * 0.5 * Math.random();
        pos.push({
            x: cx + Math.cos(angle) * radius - bW / 2,
            y: cy + Math.sin(angle) * radius - bH / 2,
            rot: Math.random() * 30 - 15
        });
    }
  }
  return pos;
}

// --- MAIN COMPONENT ---

const MerindilogunBoard: React.FC<Props> = ({ cowries, onToggle }) => {
    const [ritualComplete, setRitualComplete] = useState(true);
    const [directionsInvoked, setDirectionsInvoked] = useState<string[]>([]);
    const [throwPhase, setThrowPhase] = useState<'idle' | 'trembling' | 'falling' | 'revealed'>('idle');
    const [positions, setPositions] = useState<Posicao[]>([]);
    const [hasThrown, setHasThrown] = useState(false);
    const [throwing, setThrowing] = useState(false);

    const tapeteRef = useRef<HTMLDivElement>(null);
    const throwingRef = useRef(false);
    const onToggleRef = useRef(onToggle);
    onToggleRef.current = onToggle;
    const fileRef = useRef<HTMLInputElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const initialThrowDoneRef = useRef(false);

    const openCount = cowries.filter(c => c === 'open').length;
    const odu = useMemo(() => ODUS[Math.min(openCount, 16)], [openCount]);

    // --- MEASURE TAPETE ---
    useEffect(() => {
        const el = tapeteRef.current;
        if (!el) return;
        const update = () => {
            const w = el.offsetWidth;
            setPositions(gerarPosicoes(w, w)); // Square aspect ratio
        };
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // --- AUTO-FALL ON MOUNT (after ritual and positions ready) ---
    useEffect(() => {
        if (!ritualComplete || positions.length < 16 || initialThrowDoneRef.current) return;
        initialThrowDoneRef.current = true;
        const timer = setTimeout(relancarBuzios, 350);
        return () => clearTimeout(timer);
    }, [ritualComplete, positions]);

    // --- DIRECTIONS RITUAL ---
    const DIRECTIONS = [
        { id: 'iwaju', label: 'Iwájú (Frente)', desc: 'Visão / Futuro' },
        { id: 'ehin', label: 'Ehin (Trás)', desc: 'Ancestrais / Passado' },
        { id: 'otun', label: 'Otún (Direita)', desc: 'Ação / Masculino' },
        { id: 'osi', label: 'Òsì (Esquerda)', desc: 'Intuição / Feminino' },
    ];

    const invokeDirection = (id: string) => {
        if (!directionsInvoked.includes(id)) {
            if (navigator.vibrate) navigator.vibrate(20);
            setDirectionsInvoked(prev => [...prev, id]);
        }
    };

    const finishRitual = () => setRitualComplete(true);

    // --- CORE THROW LOGIC (no event, called by both click and auto-fall) ---
    function relancarBuzios() {
        if (throwingRef.current) return;
        throwingRef.current = true;
        setThrowing(true);
        setThrowPhase('trembling');
        setHasThrown(false);

        setTimeout(() => {
            const tapete = tapeteRef.current;
            if (!tapete) return;
            const w = tapete.offsetWidth;
            const h = w; // Square aspect ratio for the circular mat
            const newPos = gerarPosicoes(w, h);
            setPositions(newPos);

            const initial = [...cowries];
            const targetStates: SeedState[] = Array.from({ length: 16 }, () =>
                Math.random() < 0.5 ? 'open' : 'closed'
            );

            for (let i = 0; i < 16; i++) {
                if (targetStates[i] !== initial[i]) onToggleRef.current(i);
                somImpacto(i * 30);
            }

            setThrowPhase('falling');
            setHasThrown(true);
        }, 400);

        setTimeout(() => {
            setThrowPhase('revealed');
            somRevelacao();
        }, 400 + 550);

        setTimeout(() => {
            throwingRef.current = false;
            setThrowing(false);
        }, 400 + 550 + 100);
    }

    // --- THROW HANDLER (prevents navigation) ---
    const handleThrowAll = (e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        relancarBuzios();
    };

    // --- MANUAL TOGGLE ---
    const handleCowrieClick = (idx: number) => {
        if (throwingRef.current || throwPhase === 'falling' || throwPhase === 'trembling') return;
        somVirada();
        onToggleRef.current(idx);
        setHasThrown(true);
    };

    // --- CAMERA ---
    const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsAnalyzing(true);
            const reader = new FileReader();
            reader.onload = () => {
                setTimeout(() => {
                    setIsAnalyzing(false);
                }, 1500);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // --- RITUAL OVERLAY ---
    if (!ritualComplete) {
        const allInvoked = directionsInvoked.length === 4;
        return (
            <div className="w-full max-w-md mx-auto my-6 p-8 bg-ifa-base border border-ifa-gold rounded-2xl shadow-2xl relative overflow-hidden text-center flex flex-col justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/woven.png')] opacity-10 pointer-events-none"></div>
                <h2 className="text-2xl font-serif text-ifa-gold mb-2 flex items-center justify-center gap-2">
                    Saudação às Direções
                </h2>
                <p className="text-sm text-ifa-neutral mb-8 leading-relaxed">
                    Toque nos 4 pontos cardeais para abrir o portal do Mérìndílógún.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {DIRECTIONS.map(dir => (
                        <button
                            type="button"
                            key={dir.id}
                            onClick={() => invokeDirection(dir.id)}
                            disabled={directionsInvoked.includes(dir.id)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center h-24 ${
                                directionsInvoked.includes(dir.id)
                                ? 'bg-green-900/30 border-green-500 text-green-400 opacity-60'
                                : 'bg-ifa-base-dark border-ifa-border text-ifa-text hover:border-ifa-gold hover:scale-105'
                            }`}
                        >
                            {directionsInvoked.includes(dir.id) ? <Shell size={32} /> : <Shell size={32} />}
                            <span className="text-xs font-bold uppercase mt-2">{dir.label}</span>
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={finishRitual}
                    disabled={!allInvoked}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                        allInvoked
                        ? 'bg-ifa-gold text-black hover:bg-white animate-pulse'
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {allInvoked ? 'Soprar Asé (Imule)' : 'Complete a Saudação'}
                </button>
                <button
                    type="button"
                    onClick={finishRitual}
                    className="mt-4 text-[10px] uppercase font-bold text-ifa-neutral/50 hover:text-ifa-gold transition-colors z-50 cursor-pointer"
                >
                    [Modo Teste] Pular Saudação
                </button>
            </div>
        );
    }

    // --- MAIN VIEW ---
    const tapeteClass = [
        'tapete',
        throwPhase === 'trembling' ? 'tremendo' : '',
        throwPhase === 'revealed' ? 'revelado' : '',
    ].filter(Boolean).join(' ');

    const shouldHideCowries = throwPhase === 'trembling';
    const cowriesFalling = throwPhase === 'falling';

    return (
        <div className="merindilogun-page flex flex-col items-center px-4 py-6 w-full">
            {/* Header */}
            <div className="w-full max-w-md text-center mb-4">
                <h1 className="font-serif text-2xl font-bold text-ifa-gold tracking-wider">Mérìndílógún</h1>
                <p className="text-[10px] uppercase tracking-[3px] text-ifa-neutral/50 mt-0.5">Jogo dos Búzios</p>
            </div>

            {/* Tapete */}
            <div className="w-full max-w-md relative">
                <div ref={tapeteRef} className={tapeteClass}>
                    <div className="absolute inset-0" style={{ zIndex: 1 }}>
                        {positions.map((pos, i) => {
                            const pctX = tapeteRef.current ? `${pos.x / (tapeteRef.current.offsetWidth || 448) * 100}%` : `${pos.x / 448 * 100}%`;
                            const pctY = tapeteRef.current ? `${pos.y / (tapeteRef.current.offsetHeight || 296) * 100}%` : `${pos.y / 296 * 100}%`;
                            return (
                                <button
                                    type="button"
                                    key={`b-${i}`}
                                    onClick={() => handleCowrieClick(i)}
                                    disabled={throwPhase === 'trembling' || throwPhase === 'falling'}
                                    className={[
                                        'buzio',
                                        cowriesFalling ? 'caindo' : '',
                                        shouldHideCowries ? 'opacity-0' : '',
                                    ].filter(Boolean).join(' ')}
                                    style={{
                                        left: pctX,
                                        top: pctY,
                                        '--rot': `${pos.rot}deg`,
                                        opacity: shouldHideCowries ? 0 : undefined,
                                        animationDelay: cowriesFalling ? undefined : undefined,
                                    } as any}
                                >
                                    {cowries[i] === 'open'
                                        ? <BuzioAberto id={`b${i}`} />
                                        : <BuzioFechado id={`b${i}`} />
                                    }
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Info Bar */}
            <div className="w-full max-w-md mt-4 flex items-center justify-between bg-[rgba(255,255,255,0.04)] border border-ifa-gold/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                    <span className="text-ifa-gold"><Shell size={18} /></span>
                    <div>
                        <p className="text-white text-sm font-bold tracking-wide">Mérìndílógún</p>
                        <p className="text-xs" style={{ color: openCount > 0 ? 'rgba(100,220,140,0.8)' : 'rgba(255,255,255,0.35)' }}>
                            {openCount} Abertos
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        type="button"
                        onClick={handleThrowAll}
                        disabled={throwing}
                        className="p-2 rounded-lg text-ifa-neutral hover:text-ifa-gold hover:bg-ifa-gold/10 transition-all"
                        title="Jogar todos os 16 búzios"
                    >
                        <Shuffle size={18} className={throwPhase === 'trembling' || throwPhase === 'falling' ? 'animate-spin' : ''} />
                    </button>
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="p-2 rounded-lg text-ifa-neutral hover:text-ifa-gold hover:bg-ifa-gold/10 transition-all"
                        title="Ler Foto com IA"
                    >
                        {isAnalyzing ? <div className="w-[18px] h-[18px] border-2 border-ifa-gold border-t-transparent rounded-full animate-spin" /> : <Camera size={18} />}
                    </button>
                </div>
            </div>
            <input type="file" ref={fileRef} accept="image/*" capture="environment" className="hidden" onChange={handleCameraCapture} />

            {/* Odu Card */}
            <div className={`odu-card w-full max-w-md ${!hasThrown ? 'vazio' : ''}`}>
                {hasThrown ? (
                    <>
                        <p className="text-[10px] uppercase tracking-[3px] text-ifa-neutral/40 mb-1">Oju Opon (Olhos do Tabuleiro) Abertos.</p>
                        <div className="odu-numero" key={openCount}>{openCount}</div>
                        <div className="odu-nome">{odu.nome}</div>
                        <div className="odu-energia">{odu.energia}</div>
                    </>
                ) : (
                    <div className="odu-numero text-ifa-neutral/40">Aguardando os Búzios...</div>
                )}
            </div>

            {/* Jogar Button */}
            <button
                type="button"
                onClick={handleThrowAll}
                disabled={throwing}
                className="btn-jogar mt-2 max-w-md"
            >
                {throwPhase === 'trembling' ? 'Tremendo...' :
                 throwPhase === 'falling' ? 'Caem os Búzios...' :
                 hasThrown ? 'Jogar Novamente' :
                 'Jogar os Búzios'}
            </button>

            {/* Hint */}
            <p className="text-[9px] uppercase tracking-widest text-ifa-neutral/40 mt-3 text-center max-w-md">
                TOQUE EM CADA BÚZIO PARA ABRIR OU FECHAR MANUALMENTE
            </p>
        </div>
    );
};

export default MerindilogunBoard;
