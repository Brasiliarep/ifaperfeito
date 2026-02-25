
import React, { useState, useRef } from 'react';
import { OpeleState } from '../types';
import { Hand, Sparkles, Wind, ArrowDown, User, ArrowUp, CheckCircle2 } from 'lucide-react';
import TextReader from './TextReader';

interface Props {
    opele: OpeleState;
    onToggle: (leg: 'right' | 'left', index: number) => void;
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

const OponIfaBoard: React.FC<Props> = ({ opele, onToggle }) => {
    const [step, setStep] = useState<RitualStep>(0);
    const [progressCount, setProgressCount] = useState(0); 
    const [isAnimating, setIsAnimating] = useState(false);
    
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

    // Helper to render the mark (I or II)
    const RenderMark = ({ state }: { state: 'open' | 'closed' }) => (
        <div className="flex flex-col items-center justify-center h-full w-full">
            {state === 'open' ? (
                // Single Mark (I)
                <div className="w-3 h-12 md:w-4 md:h-16 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)] border border-yellow-600"></div>
            ) : (
                // Double Mark (II)
                <div className="flex gap-2 md:gap-3">
                    <div className="w-3 h-12 md:w-4 md:h-16 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)] border border-yellow-600"></div>
                    <div className="w-3 h-12 md:w-4 md:h-16 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)] border border-yellow-600"></div>
                </div>
            )}
        </div>
    );

    const handleToggle = (leg: 'right' | 'left', index: number) => {
        if (step !== 5) return; // Locked until ritual complete (step 5)
        playSound('rattle');
        onToggle(leg, index);
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

                    <div className="text-center text-[10px] text-gray-500 uppercase tracking-widest">
                        Passo {step + 1} de 5
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

            {/* THE OPON (Circular Tray) */}
            <div id="opon-container" className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full bg-[#3E2723] border-[12px] border-[#2E150F] shadow-2xl flex items-center justify-center overflow-hidden">
                
                {/* Wood Texture Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] rounded-full pointer-events-none"></div>
                
                {/* Inner Recessed Area */}
                <div className="absolute inset-4 rounded-full bg-[#5D4037] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] border border-[#3E2723]/50"></div>

                {/* Eshu Carving (Top Center) */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-12 opacity-40 pointer-events-none">
                    <div className="w-10 h-10 mx-auto border-2 border-[#2E150F] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#2E150F] rounded-full mr-2"></div>
                        <div className="w-2 h-2 bg-[#2E150F] rounded-full ml-2"></div>
                    </div>
                    <div className="w-12 h-4 border-b-4 border-[#2E150F] rounded-[50%] mx-auto mt-[-4px]"></div>
                </div>

                {/* Powder/Dust Texture (Iyerosun effect) */}
                <div className="absolute inset-8 rounded-full bg-[#D2B48C] opacity-10 blur-xl pointer-events-none"></div>

                {/* The Chains Container */}
                <div className="relative z-10 flex gap-16 md:gap-24 h-3/4 items-center">
                    
                    {/* Right Leg */}
                    <div className="flex flex-col justify-between h-full py-4">
                        <h3 className="absolute top-[15%] right-[60%] text-[8px] md:text-[10px] text-[#D2B48C]/50 font-bold uppercase tracking-widest -rotate-90 origin-bottom-right">Otun (Dir)</h3>
                        {opele.rightLeg.map((state, idx) => (
                            <button
                                key={`r-${idx}`}
                                onClick={() => handleToggle('right', idx)}
                                className="w-14 h-12 md:w-16 md:h-14 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 cursor-pointer"
                            >
                                <RenderMark state={state} />
                            </button>
                        ))}
                    </div>

                    {/* Divider Line (Visual only, subtle) */}
                    <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-black/20 blur-[1px]"></div>

                    {/* Left Leg */}
                    <div className="flex flex-col justify-between h-full py-4">
                        <h3 className="absolute top-[15%] left-[60%] text-[8px] md:text-[10px] text-[#D2B48C]/50 font-bold uppercase tracking-widest rotate-90 origin-bottom-left">Osi (Esq)</h3>
                        {opele.leftLeg.map((state, idx) => (
                            <button
                                key={`l-${idx}`}
                                onClick={() => handleToggle('left', idx)}
                                className="w-14 h-12 md:w-16 md:h-14 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 cursor-pointer"
                            >
                                <RenderMark state={state} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Decor */}
                <div className="absolute bottom-4 text-[#2E150F] opacity-30 text-[10px] font-serif font-bold">
                    IFA
                </div>
            </div>
        </div>
    );
};

export default OponIfaBoard;
