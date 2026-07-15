import React, { useState, useRef } from 'react';
import { OpeleState } from '../types';
import { Hand, Sparkles, Wind, ArrowDown, User, ArrowUp, CheckCircle2, Shell, Loader2, Image, Camera, FastForward } from 'lucide-react';
import CameraButtons from './CameraButtons';
import TextReader from './TextReader';
import { analyzeOpeleImage } from '../services/geminiService';

interface Props {
    opele: OpeleState;
    onToggle: (leg: 'right' | 'left', index: number) => void;
    onSetState?: (state: OpeleState) => void;
}

type RitualStep = 0 | 1 | 2 | 3 | 4 | 5; 

const RITUAL_DATA = [
    {
        title: "Iwẹ̀ Òpèlè (O Despertar)",
        instruction: "Sopre 3 vezes sobre o Òpèlè para acordar o axé.",
        yoruba: "Ji o! Òpèlè Ifá, ji o!",
        translation: "Acorde! Òpèlè Ifá, acorde!",
        action: "blow_3x",
        totalTaps: 3,
        icon: <Wind size={48} className="text-blue-300" />
    },
    {
        title: "Kan Ilẹ̀ (Toque na Terra)",
        instruction: "Toque o Òpèlè no chão 3 vezes para saudar a Terra.",
        yoruba: "Ilẹ̀ mọ̀ pè o! Ilẹ̀ gbó o!",
        translation: "Terra, eu te chamo! Terra, ouça!",
        action: "tap_earth_3x",
        totalTaps: 3,
        icon: <ArrowDown size={48} className="text-[#8D6E63]" />
    },
    {
        title: "Kan Ara (Conexão com Ori)",
        instruction: "Toque o Òpèlè na testa (Ori) e no coração (Okan).",
        yoruba: "Ori mi là, Òrúnmìlà a gbe mi.",
        translation: "Meu Ori me salvará, Orunmila me apoiará.",
        action: "tap_body_2x",
        totalTaps: 2,
        icon: <User size={48} className="text-ifa-gold" />
    },
    {
        title: "Ìbà (Saudação)",
        instruction: "Erga o Òpèlè e faça um círculo no ar.",
        yoruba: "Ìbà Olódùmarè, Ìbà Òrúnmìlà.",
        translation: "Saudação ao Criador, Saudação a Orunmila.",
        action: "lift_sky",
        totalTaps: 1,
        icon: <ArrowUp size={48} className="text-yellow-400" />
    },
    {
        title: "Dá Ifá (Lançamento)",
        instruction: "Arremesse o Òpèlè na esteira para revelar o Odu.",
        yoruba: "Sọ̀rọ̀ s'emi, Ifá!",
        translation: "Fale comigo, Ifá!",
        action: "cast_mat",
        totalTaps: 1,
        icon: <Hand size={48} className="text-green-400" />
    }
];

const OponIfaBoard: React.FC<Props> = ({ opele, onToggle, onSetState }) => {
    const [step, setStep] = useState<RitualStep>(5);
    const [progressCount, setProgressCount] = useState(0); 
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !onSetState) return;

        setIsAnalyzing(true);
        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64 = event.target?.result as string;
                try {
                    const result = await analyzeOpeleImage(base64);
                    onSetState(result);
                    playSound('rattle');
                } catch(err) {
                    alert('Erro ao analisar a imagem. Tente novamente.');
                } finally {
                    setIsAnalyzing(false);
                }
            };
            reader.readAsDataURL(file);
        } catch(err) {
            console.error(err);
            setIsAnalyzing(false);
        }
    };
    
    // Audio Context Ref
    const audioCtxRef = useRef<AudioContext | null>(null);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        return audioCtxRef.current;
    };

    // --- SOUND GENERATORS ---
    const playSound = (type: 'blow' | 'wood' | 'metal' | 'rattle') => {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Basic filter for tone shaping
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'blow') {
            // White Noise Simulation (using Oscillator approximation for brevity, ideal involves buffer)
            // Using FM synthesis to create "breath" like noise
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(50, now);
            const lfo = ctx.createOscillator();
            lfo.type = 'sawtooth';
            lfo.frequency.value = 800; // Noise texture
            const lfoGain = ctx.createGain();
            lfoGain.gain.value = 1000;
            lfo.connect(lfoGain).connect(osc.frequency);
            lfo.start(now);
            lfo.stop(now + 0.4);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.5, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            
            osc.start(now);
            osc.stop(now + 0.4);
        } else if (type === 'wood') {
            // Earth Tap (Deep Thud)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
            gain.gain.setValueAtTime(0.8, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'metal') {
            // Chain/Metal Tap
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
            filter.type = 'highpass';
            filter.frequency.value = 1000;
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'rattle') {
            // Shake/Rattle
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(1200, now);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        }
    };

    const handleStepAction = () => {
        setIsAnimating(true);
        const currentConfig = RITUAL_DATA[step];
        
        // Haptic
        if (navigator.vibrate) navigator.vibrate(30);

        // Sound Selection
        if (currentConfig.action === 'blow_3x') playSound('blow');
        else if (currentConfig.action === 'tap_earth_3x') playSound('wood');
        else if (currentConfig.action === 'tap_body_2x') playSound('metal'); // Metal chain touching body
        else playSound('rattle');

        // Progress Logic
        const newCount = progressCount + 1;
        setProgressCount(newCount);

        // Reset animation quickly
        setTimeout(() => setIsAnimating(false), 200);

        if (newCount >= currentConfig.totalTaps) {
            setTimeout(() => {
                advanceStep();
            }, 600);
        }
    };

    const advanceStep = () => {
        setProgressCount(0);
        if (step < 5) {
            setStep((prev) => (prev + 1) as RitualStep);
        }
    };

    const oponRef = useRef<HTMLDivElement>(null);

    function particulaIyerosun(x: number, y: number) {
      const container = oponRef.current;
      if (!container) return;
      for (let i = 0; i < 6; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
          position:absolute; width:3px; height:3px; border-radius:50%;
          background:rgba(210,185,130,0.6); left:${x}px; top:${y}px;
          pointer-events:none;
          animation: particula 0.5s ease forwards;
          --dx:${(Math.random() - 0.5) * 20}px;
          --dy:${(Math.random() - 0.5) * 20}px;
        `;
        container.appendChild(p);
        setTimeout(() => p.remove(), 500);
      }
    }

    // Iyerosun Mark — traço no pó sagrado (I = 1 traço, II = 2 traços)
    // state='open' → II (2 traços, Ogbe), state='closed' → I (1 traço, Oyeku)
    const Traco = () => (
        <div
            style={{
                width: '8px',
                height: '22px',
                borderRadius: '4px',
                background: 'linear-gradient(180deg, #c8a428 0%, #f0d060 30%, #fae880 50%, #d4aa30 80%, #8a6010 100%)',
                boxShadow:
                    '0 0 8px rgba(220,180,50,0.9), ' +
                    'inset 0 1px 3px rgba(255,255,200,0.5), ' +
                    'inset 0 -1px 3px rgba(0,0,0,0.5), ' +
                    '1px 0 3px rgba(0,0,0,0.4)',
                border: '1px solid rgba(100,72,8,0.7)',
                position: 'relative',
                flexShrink: 0,
            }}
        >
            <div style={{
                position: 'absolute', top: '10%', left: '15%',
                width: '35%', height: '28%',
                background: 'rgba(255,255,200,0.4)',
                borderRadius: '50%',
                filter: 'blur(0.5px)',
            }} />
        </div>
    );

    const RenderMark = ({ state, markKey }: { state: 'open' | 'closed'; markKey: string }) => (
        <div
            key={markKey}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <div style={{ display: 'flex', gap: state === 'closed' ? '0px' : '7px', alignItems: 'center' }}>
                <Traco />
                {state === 'open' && <Traco />}
            </div>
            <div style={{
                marginTop: '2px',
                fontSize: '7px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                color: 'rgba(220,180,50,0.65)',
                fontFamily: 'serif',
            }}>
                {state === 'open' ? 'II' : 'I'}
            </div>
        </div>
    );

    const handleToggle = (leg: 'right' | 'left', index: number) => {
        if (step !== 5) return; // Locked until ritual complete (step 5)
        playSound('rattle');
        particulaIyerosun(180 + Math.random() * 40, 150 + Math.random() * 40);
        onToggle(leg, index);
    };

    // Track mark key for animation re-trigger
    const markKeys = useRef<Record<string, number>>({});
    const getMarkKey = (leg: string, idx: number, state: string) => {
      const k = `${leg}-${idx}`;
      const prev = markKeys.current[k];
      const newKey = `${k}-${state}-${Date.now()}`;
      markKeys.current[k] = Date.now();
      return newKey;
    };

    // RENDER RITUAL OVERLAY
    if (step < 5) {
        const currentData = RITUAL_DATA[step];
        
        return (
            <div className="w-full flex flex-col items-center justify-center py-8 min-h-[500px]">
                <div className="max-w-md w-full bg-ifa-base border-2 border-ifa-gold/50 rounded-2xl p-8 relative overflow-hidden shadow-2xl animate-fade-in">
                    
                    {/* Top Progress Bar (Overall Ritual) */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                        <div 
                            className="h-full bg-ifa-gold transition-all duration-500" 
                            style={{ width: `${((step) / 5) * 100}%` }}
                        ></div>
                    </div>

                    <div className="text-center mb-8 mt-2">
                        <h3 className="text-ifa-gold font-serif text-xl font-bold uppercase mb-2">{currentData.title}</h3>
                        <p className="text-ifa-neutral text-sm">{currentData.instruction}</p>
                    </div>

                    {/* Interactive Icon Area */}
                    <div className="flex justify-center mb-8 relative">
                        <button 
                            onClick={handleStepAction}
                            className={`w-36 h-36 rounded-full border-4 flex items-center justify-center transition-all duration-150 ${isAnimating ? 'scale-95 border-ifa-gold bg-ifa-gold/10' : 'bg-black/30 border-ifa-border hover:border-ifa-gold hover:bg-ifa-surface'}`}
                        >
                            <div className={`${isAnimating ? 'animate-bounce' : ''}`}>
                                {currentData.icon}
                            </div>
                        </button>
                        
                        {/* Step Progress Indicator (Dots) */}
                        <div className="absolute -bottom-6 flex gap-2">
                            {Array.from({length: currentData.totalTaps}).map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`w-3 h-3 rounded-full border border-ifa-border transition-colors ${i < progressCount ? 'bg-ifa-gold' : 'bg-transparent'}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Prayer Section */}
                    <div className="bg-black/40 p-4 rounded-xl border-l-4 border-ifa-wood mb-6 mt-8">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] uppercase font-bold text-ifa-gold tracking-widest">Ofo (Reza)</span>
                            <TextReader text={currentData.yoruba} forceLang="yo-NG" />
                        </div>
                        <p className="text-lg font-serif italic text-white mb-2 leading-relaxed">"{currentData.yoruba}"</p>
                        <p className="text-xs text-ifa-neutral">{currentData.translation}</p>
                    </div>

                    <div className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-2 flex justify-between items-center px-4">
                        <span>Passo {step + 1} de 5</span>
                        <button 
                            onClick={() => setStep(5)}
                            className="text-ifa-gold opacity-60 hover:opacity-100 flex items-center gap-1 transition-opacity cursor-pointer z-50"
                        >
                            <FastForward size={12} /> Pular Ritual
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // RENDER MAIN BOARD (ACTIVE)
    return (
        <div className="w-full flex flex-col items-center py-4 relative animate-fade-in">
            
            <div className="mb-4 flex items-center gap-2 text-green-400 bg-green-900/20 px-4 py-2 rounded-full border border-green-500/30 shadow-glow">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase">Sọ̀rọ̀ s'emi, Ifá! (Fale, Ifá!)</span>
            </div>

            {/* THE OPON IFÁ — Real carved wood board photo */}
            <div
                ref={oponRef}
                id="opon-container"
                className="relative flex items-center justify-center"
                style={{
                    width: 'min(400px, 97vw)',
                    height: 'min(400px, 97vw)',
                }}
            >
                {/* ── REAL OPON PHOTO as circular background ── */}
                <div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{
                        boxShadow: '0 16px 50px rgba(0,0,0,0.92), 0 4px 16px rgba(0,0,0,0.7), inset 0 0 30px rgba(0,0,0,0.5)',
                    }}
                >
                    <img
                        src="/opon_real.png"
                        alt="Opon Ifá"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                        }}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    {/* Fallback gradient behind image */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at 30% 25%, #6b3a22 0%, #2e1208 55%, #1a0a04 100%)',
                            zIndex: -1,
                        }}
                    />
                </div>

                {/* ── DARK VIGNETTE over border to deepen 3D feel ── */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.28) 65%, rgba(0,0,0,0.55) 100%)',
                    }}
                />

                {/* ── INNER PLAYING SURFACE tint (Iyerosun dust) ── */}
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        inset: '22%',
                        background: 'radial-gradient(ellipse, rgba(210,175,95,0.08) 0%, transparent 70%)',
                        filter: 'blur(6px)',
                    }}
                />

                {/* ── CENTRAL SACRED GROOVE (Divider between legs) ── */}
                <div
                    className="absolute z-10 pointer-events-none"
                    style={{
                        left: '50%',
                        top: '24%',
                        bottom: '24%',
                        width: '1.5px',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, transparent)',
                    }}
                />

                {/* ── THE MARKS CONTAINER ── */}
                <div className="relative z-20 flex items-center justify-center" style={{ gap: 'clamp(20px, 5vw, 36px)', height: '33%' }}>

                    {/* Right Leg — Ọtún */}
                    <div className="flex flex-col justify-between h-full py-1">
                        <span
                            className="absolute font-bold uppercase tracking-widest"
                            style={{ fontSize: '8px', color: 'rgba(210,180,100,0.5)', top: '26%', right: '56%', transform: 'rotate(-90deg)', transformOrigin: 'bottom right' }}
                        >Ọtún</span>
                        {opele.rightLeg.map((state, idx) => (
                            <button
                                key={`r-${idx}`}
                                onClick={() => handleToggle('right', idx)}
                                className="flex items-center justify-center hover:scale-105 transition-transform active:scale-95 cursor-pointer"
                                style={{ width: '68px', height: '80px' }}
                            >
                                <RenderMark state={state} markKey={`r-${idx}-${state}`} />
                            </button>
                        ))}
                    </div>

                    {/* Left Leg — Òsì */}
                    <div className="flex flex-col justify-between h-full py-1">
                        <span
                            className="absolute font-bold uppercase tracking-widest"
                            style={{ fontSize: '8px', color: 'rgba(210,180,100,0.5)', top: '26%', left: '56%', transform: 'rotate(90deg)', transformOrigin: 'bottom left' }}
                        >Òsì</span>
                        {opele.leftLeg.map((state, idx) => (
                            <button
                                key={`l-${idx}`}
                                onClick={() => handleToggle('left', idx)}
                                className="flex items-center justify-center hover:scale-105 transition-transform active:scale-95 cursor-pointer"
                                style={{ width: '38px', height: '32px' }}
                            >
                                <RenderMark state={state} markKey={`l-${idx}-${state}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── BOTTOM SACRED TEXT ── */}
                <div
                    className="absolute bottom-[10%] left-1/2 -translate-x-1/2 pointer-events-none z-20"
                    style={{
                        fontFamily: 'serif',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        letterSpacing: '0.2em',
                        color: 'rgba(210,175,95,0.5)',
                        textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                    }}
                >
                    ÒRÚNMÌLÀ
                </div>
            </div>

            {onSetState && (
                <div className="w-full max-w-md mt-12 flex flex-col items-center">
                    <CameraButtons />
                    <span className="text-[10px] text-ifa-neutral uppercase tracking-widest text-center max-w-xs leading-relaxed">
                        Tire uma foto nítida da caída ou selecione uma imagem para o oráculo interpretar.
                    </span>
                </div>
            )}
        </div>
    );
};

export default OponIfaBoard;
