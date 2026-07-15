
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { SeedState } from '../types';
import { Shell, Camera, Shuffle, Image } from 'lucide-react';
import CameraButtons from './CameraButtons';

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

interface Posicao { x: number; y: number; rot: number; pctX: string; pctY: string; }

function gerarPosicoes(largura: number, altura: number): Posicao[] {
  const scale = Math.min(largura / 448, 1);
  const pad = Math.round(Math.max(20, 38 * scale));
  const bW = 52, bH = 36;
  // Reduce minimum distance heavily to allow overlapping and stacking
  const minDist = Math.max(10, Math.round(15 * scale)); 
  const pos: Posicao[] = [];
  
  const cx = largura / 2;
  const cy = altura / 2;
  const maxRadius = (largura / 2) - pad - (Math.max(bW, bH) / 2);

  // 50% chance to have distinct clusters/groups
  const isClustered = Math.random() > 0.5;
  const clusters: {x: number, y: number}[] = [];
  if (isClustered) {
    const numClusters = Math.floor(Math.random() * 3) + 1;
    for (let i=0; i<numClusters; i++) {
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * maxRadius * 0.6;
        clusters.push({x: cx + Math.cos(angle)*rad, y: cy + Math.sin(angle)*rad});
    }
  }

  let tentativas = 0;
  while (pos.length < 16 && tentativas < 5000) {
    tentativas++;
    let targetX, targetY;

    // Decide if this cowrie falls near a cluster or randomly
    if (isClustered && Math.random() > 0.25 && clusters.length > 0) {
        const c = clusters[Math.floor(Math.random() * clusters.length)];
        const spread = maxRadius * 0.45; // Group spread
        targetX = c.x + (Math.random() - 0.5) * spread;
        targetY = c.y + (Math.random() - 0.5) * spread;
    } else {
        // Fall anywhere in circle randomly
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * maxRadius;
        targetX = cx + Math.cos(angle) * r;
        targetY = cy + Math.sin(angle) * r;
    }

    const x = targetX - bW / 2;
    const y = targetY - bH / 2;
    // Allow full 360 degree rotation for organic messiness
    const rot = Math.random() * 360; 
    
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
    if (valido) {
      pos.push({ 
        x, y, rot,
        pctX: `${(x / largura) * 100}%`,
        pctY: `${(y / altura) * 100}%`
      });
    }
  }
  
  if (pos.length < 16) {
    for (let i = pos.length; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const radius = maxRadius * 0.5 * Math.random();
        const x = cx + Math.cos(angle) * radius - bW / 2;
        const y = cy + Math.sin(angle) * radius - bH / 2;
        pos.push({
            x, y,
            rot: Math.random() * 360,
            pctX: `${(x / largura) * 100}%`,
            pctY: `${(y / altura) * 100}%`
        });
    }
  }
  return pos;
}

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
    const galleryRef = useRef<HTMLInputElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const initialThrowDoneRef = useRef(false);

    const openCount = cowries.filter(c => c === 'open').length;
    const odu = useMemo(() => ODUS[Math.min(openCount, 16)], [openCount]);

    useEffect(() => {
        const el = tapeteRef.current;
        if (!el) return;
        const w = el.offsetWidth;
        setPositions(gerarPosicoes(w, w)); 
    }, []);



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
            const h = w;
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
            
            setTimeout(() => {
                setThrowPhase('revealed');
                somRevelacao();
                setHasThrown(true);
                setThrowing(false);
                throwingRef.current = false;
            }, 600);
        }, 400);
    }

    const handleThrowAll = (e?: React.MouseEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        relancarBuzios();
    };

    const handleCowrieClick = (idx: number) => {
        if (throwingRef.current || throwPhase === 'falling' || throwPhase === 'trembling') return;
        somVirada();
        onToggleRef.current(idx);
        setHasThrown(true);
    };

    const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsAnalyzing(true);
            setTimeout(() => {
                setIsAnalyzing(false);
                alert('Integração com API Gemini vision virá aqui!');
            }, 2000);
        }
    };

    if (!ritualComplete) {
        const allInvoked = directionsInvoked.length === 4;
        return (
            <div className="flex flex-col items-center px-4 py-8 w-full max-w-md mx-auto">
                <h1 className="font-serif text-2xl text-ifa-gold mb-2 tracking-wider">Saudação às Direções</h1>
                <p className="text-ifa-neutral/70 text-center mb-8 italic">
                    Toque em cada ponto cardeal para alinhar a mesa oracular com o plano físico e espiritual.
                </p>

                <div className="relative w-full aspect-square bg-[rgba(255,255,255,0.03)] border border-ifa-gold/20 rounded-full flex items-center justify-center mb-12">
                    <div className="absolute inset-4 rounded-full border border-dashed border-ifa-gold/10 animate-spin-slow"></div>
                    
                    {DIRECTIONS.map((dir, i) => {
                        const angle = i * 90 - 90;
                        const radius = 42; 
                        const active = directionsInvoked.includes(dir.id);
                        
                        return (
                            <button
                                key={dir.id}
                                type="button"
                                onClick={() => invokeDirection(dir.id)}
                                className={`absolute flex flex-col items-center justify-center transition-all duration-500
                                    ${active ? 'scale-110 opacity-100' : 'scale-90 opacity-60 hover:opacity-100 hover:scale-100'}
                                `}
                                style={{
                                    top: `${50 + Math.sin(angle * Math.PI / 180) * radius}%`,
                                    left: `${50 + Math.cos(angle * Math.PI / 180) * radius}%`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 border-2 transition-colors
                                    ${active ? 'bg-ifa-gold/20 border-ifa-gold text-ifa-gold shadow-[0_0_20px_rgba(210,165,40,0.3)]' : 'bg-black/40 border-ifa-neutral/20 text-ifa-neutral/40'}
                                `}>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L15 8H9L12 2Z" transform={`rotate(${i * 90} 12 12)`} />
                                    </svg>
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-widest ${active ? 'text-ifa-gold' : 'text-ifa-neutral/50'}`}>{dir.label}</span>
                                <span className="text-[10px] text-ifa-neutral/40 mt-1">{dir.desc}</span>
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={finishRitual}
                    disabled={!allInvoked}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all
                        ${allInvoked 
                            ? 'bg-ifa-gold text-black shadow-[0_0_30px_rgba(210,165,40,0.4)] hover:bg-yellow-400' 
                            : 'bg-black/50 text-ifa-neutral/30 cursor-not-allowed border border-ifa-neutral/10'
                        }
                    `}
                >
                    {allInvoked ? 'Soprar Asé (Imule)' : 'Complete a Saudação'}
                </button>
            </div>
        );
    }

    const tapeteClass = [
        'tapete',
        throwPhase === 'trembling' ? 'tremendo' : '',
        throwPhase === 'revealed' ? 'revelado' : '',
    ].filter(Boolean).join(' ');

    const shouldHideCowries = throwPhase === 'trembling';
    const cowriesFalling = throwPhase === 'falling';

    return (
        <div className="merindilogun-page flex flex-col items-center px-4 py-6 w-full">
            <style>{`
                .buzio {
                    transform: translate(0, 0) rotate(var(--rot, 0deg)) scale(1);
                    transition: filter 0.2s ease, transform 0s !important;
                }
                .buzio:not(.caindo):hover {
                    transform: translate(0, -2px) rotate(var(--rot, 0deg)) scale(1.06);
                    transition: filter 0.2s ease, transform 0.15s ease !important;
                }
                .buzio:not(.caindo):active {
                    transform: translate(0, 0) rotate(var(--rot, 0deg)) scale(0.95);
                    transition: filter 0.2s ease, transform 0.1s ease !important;
                }
            `}</style>
            <div className="w-full max-w-md text-center mb-4">
                <h1 className="font-serif text-2xl font-bold text-ifa-gold tracking-wider">Mérìndílógún</h1>
                <p className="text-[10px] uppercase tracking-[3px] text-ifa-neutral/50 mt-0.5">Jogo dos Búzios</p>
            </div>

            <div className="w-full max-w-md relative">
                <div ref={tapeteRef} className={tapeteClass}>
                    <div className="absolute inset-0" style={{ zIndex: 1 }}>
                        {positions.map((pos, i) => {
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
                                        left: pos.pctX,
                                        top: pos.pctY,
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

            <div className="w-full max-w-md mt-4 flex items-center justify-between bg-[rgba(255,255,255,0.04)] border border-ifa-gold/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                    <span className="text-ifa-gold"><Shell size={18} /></span>
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-ifa-neutral/60">Contagem</div>
                        <div className="text-sm font-bold text-ifa-gold">{openCount} Abertos</div>
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
                </div>
            </div>
            
            <CameraButtons />

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
