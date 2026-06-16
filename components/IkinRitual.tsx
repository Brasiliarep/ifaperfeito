
import React, { useState, useRef, useEffect } from 'react';
import { OpeleState, SeedState } from '../types';

interface Props {
    opele: OpeleState;
    onToggle: (leg: 'right' | 'left', index: number) => void;
    onReset: () => void;
    oduName?: string;
}

type Phase = 'start' | 'animating' | 'revealed' | 'idle' | 'complete';
type Mark = 1 | 2; // 1 = I (single), 2 = II (double)

const IkinRitual: React.FC<Props> = ({ opele, onToggle, onReset, oduName }) => {
    const [phase, setPhase] = useState<Phase>('start');
    const [marks, setMarks] = useState<Mark[]>([]);
    const [revealedMark, setRevealedMark] = useState<Mark | null>(null);
    const [animTick, setAnimTick] = useState(0);

    const audioCtxRef = useRef<AudioContext | null>(null);

    function getAudio() {
        if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
    }

    function somQueda() {
        try {
            const ctx = getAudio();
            for (let i = 0; i < 3; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(300 + Math.random() * 120, ctx.currentTime + i * 0.08);
                osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + i * 0.08 + 0.12);
                gain.gain.setValueAtTime(0.10, ctx.currentTime + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.15);
                osc.start(ctx.currentTime + i * 0.08);
                osc.stop(ctx.currentTime + i * 0.08 + 0.15);
            }
        } catch {}
    }

    function somRevelacao() {
        try {
            const ctx = getAudio();
            const freqs = [260, 330, 390];
            freqs.forEach((f, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12);
                gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
                osc.start(ctx.currentTime + i * 0.12);
                osc.stop(ctx.currentTime + i * 0.12 + 0.6);
            });
        } catch {}
    }

    function somCompleto() {
        try {
            const ctx = getAudio();
            [220, 277, 330, 440, 554].forEach((f, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
                gain.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.6);
                osc.start(ctx.currentTime + i * 0.1);
                osc.stop(ctx.currentTime + i * 0.1 + 0.7);
            });
        } catch {}
    }

    // Animate throw: phase 'animating' → after ~900ms → 'revealed'
    const iniciarLancamento = () => {
        if (marks.length >= 8) return;
        setPhase('animating');
        setAnimTick(t => t + 1);
        somQueda();

        const mark: Mark = Math.random() < 0.5 ? 1 : 2;

        setTimeout(() => {
            setRevealedMark(mark);
            setPhase('revealed');
            somRevelacao();
        }, 900);

        setTimeout(() => {
            setMarks(prev => {
                const next = [...prev, mark];
                handleToggle(mark, prev.length);
                if (next.length >= 8) {
                    setTimeout(() => {
                        setPhase('complete');
                        somCompleto();
                    }, 1200);
                }
                return next;
            });
            setPhase('idle');
        }, 900 + 1400);
    };

    const handleToggle = (mark: Mark, index: number) => {
        const leg = index < 4 ? 'right' : 'left';
        const idx = index < 4 ? index : index - 4;
        if (mark === 2) onToggle(leg, idx);
    };

    const totalThrows = marks.length >= 8 ? 8 : marks.length;
    const currentThrow = totalThrows + 1;

    function renderIkinDots() {
        return (
            <div className="flex flex-col items-center gap-1.5 select-none pointer-events-none">
                <div className="flex gap-2">
                    {[0,1,2,3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-ifa-gold/70 shadow-[0_0_6px_rgba(212,175,55,0.3)]" />)}
                </div>
                <div className="flex gap-2">
                    {[0,1,2,3,4].map(i => <div key={i} className="w-4 h-4 rounded-full bg-ifa-gold/70 shadow-[0_0_6px_rgba(212,175,55,0.3)]" />)}
                </div>
                <div className="flex gap-2">
                    {[0,1,2,3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-ifa-gold/70 shadow-[0_0_6px_rgba(212,175,55,0.3)]" />)}
                </div>
                <div className="flex gap-2">
                    {[0,1,2].map(i => <div key={i} className="w-4 h-4 rounded-full bg-ifa-gold/70 shadow-[0_0_6px_rgba(212,175,55,0.3)]" />)}
                </div>
            </div>
        );
    }

    function renderThrowAnimation() {
        return (
            <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
                {/* Left hand */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-ifa-gold/30 flex items-center justify-center bg-black/30">
                        <span className="text-[9px] text-ifa-gold/60 uppercase tracking-widest text-center leading-tight">Mão<br/>Esquerda</span>
                    </div>
                </div>

                {/* Sliding dots */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" key={animTick}>
                    <div className="flex gap-1 animate-slide-ikin">
                        {[0,1,2,3].map(i => (
                            <div key={i} className="w-3 h-3 rounded-full bg-ifa-gold/90 shadow-[0_0_8px_rgba(212,175,55,0.5)] animate-bounce" style={{ animationDelay: `${i * 0.08}s`, animationDuration: '0.3s' }} />
                        ))}
                    </div>
                </div>

                {/* Right hand */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-ifa-gold/30 flex items-center justify-center bg-black/30">
                        <span className="text-[9px] text-ifa-gold/60 uppercase tracking-widest text-center leading-tight">Mão<br/>Direita</span>
                    </div>
                </div>
            </div>
        );
    }

    function renderHistory() {
        return (
            <div className="w-full max-w-xs">
                <p className="text-[9px] uppercase tracking-[3px] text-ifa-neutral/40 mb-3 text-center">Lançamentos</p>
                <div className="flex justify-center gap-3 flex-wrap">
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="w-10 h-10 rounded-lg border border-ifa-border/30 flex items-center justify-center bg-black/20 transition-all duration-500"
                            style={{
                                borderColor: marks[i] ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.06)',
                                opacity: marks[i] ? 1 : 0.3,
                            }}
                        >
                            {marks[i] ? (
                                <span className="text-sm font-mono font-bold text-ifa-gold">
                                    {marks[i] === 2 ? 'II' : 'I'}
                                </span>
                            ) : (
                                <span className="text-[9px] text-ifa-neutral/30">{i + 1}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function renderOduGrid() {
        const rightMarks = marks.slice(0, 4);
        const leftMarks = marks.slice(4, 8);
        return (
            <div className="w-full max-w-xs mx-auto mb-6">
                <div className="grid grid-cols-2 gap-3">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="flex justify-center gap-6">
                            <div className="w-16 h-10 rounded-lg bg-black/30 border border-ifa-border/20 flex items-center justify-center">
                                <span className="font-mono text-base font-bold tracking-wider text-white/90">
                                    {rightMarks[i] === 2 ? 'II' : rightMarks[i] === 1 ? 'I' : ''}
                                </span>
                            </div>
                            <div className="w-16 h-10 rounded-lg bg-black/30 border border-ifa-border/20 flex items-center justify-center">
                                <span className="font-mono text-base font-bold tracking-wider text-white/90">
                                    {leftMarks[i] === 2 ? 'II' : leftMarks[i] === 1 ? 'I' : ''}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (phase === 'start') {
        return (
            <div className="w-full flex flex-col items-center py-8 animate-fade-in px-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <p className="text-[10px] uppercase tracking-[4px] text-ifa-neutral/40 mb-2">Ifá — Oráculo Supremo</p>
                        <h1 className="font-serif text-2xl font-bold text-ifa-gold tracking-wider leading-snug">
                            Ikin Ifá<br/>
                            <span className="text-sm font-sans font-normal text-ifa-neutral/60 tracking-[3px] uppercase">Lançamento Sacerdotal</span>
                        </h1>
                    </div>

                    {/* Ikin visualization */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-black/30 border border-ifa-gold/20 rounded-2xl p-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMjBhMTAgMTAgMCAwIDAtMTAgMTAgMTAgMTAgMCAwIDAgMjAgMCAxMCAxMCAwIDAgMC0xMC0xMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyYjg0YSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')]"></div>
                            {renderIkinDots()}
                            <p className="text-[10px] text-ifa-neutral/30 text-center mt-6 uppercase tracking-[2px]">16 Ikin</p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-black/20 border border-ifa-gold/10 rounded-xl px-5 py-4 mb-8">
                        <p className="text-sm text-ifa-neutral/80 leading-relaxed text-center">
                            Segure simbolicamente os 16 Ikin na mão esquerda. A cada lançamento, o sistema registrará automaticamente o resultado do Odù.
                        </p>
                    </div>

                    {/* Start button */}
                    <button
                        type="button"
                        onClick={iniciarLancamento}
                        className="w-full py-4 bg-ifa-gold text-black font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg shadow-ifa-gold/20"
                    >
                        Iniciar Lançamento
                    </button>
                </div>
            </div>
        );
    }

    if (phase === 'complete') {
        return (
            <div className="w-full flex flex-col items-center py-8 animate-fade-in px-4">
                <div className="w-full max-w-md">
                    {/* Odu revealed */}
                    <div className="text-center mb-6">
                        <p className="text-[10px] uppercase tracking-[4px] text-green-400/60 mb-2">Odù Revelado</p>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-ifa-gold/40 flex items-center justify-center bg-ifa-gold/5 animate-pulse">
                            <span className="text-2xl">✦</span>
                        </div>
                    </div>

                    {/* Complete grid */}
                    <div className="bg-black/30 border border-ifa-gold/20 rounded-2xl p-6 mb-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                        {renderOduGrid()}
                        <div className="text-center mt-4 pt-4 border-t border-ifa-border/20">
                            <p className="text-[9px] uppercase tracking-[3px] text-ifa-neutral/40 mb-1">Otún (Direita) — Òsì (Esquerda)</p>
                        </div>
                    </div>

                    {/* Odu Name */}
                    <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <p className="text-xs uppercase tracking-[3px] text-ifa-neutral/50 mb-2">Odù</p>
                        <h2 className="font-serif text-3xl font-bold text-ifa-gold tracking-wider">{oduName || '...'}</h2>
                    </div>

                    {/* History */}
                    <div className="mb-8">
                        {renderHistory()}
                    </div>

                    {/* Nova Consulta */}
                    <button
                        type="button"
                        onClick={onReset}
                        className="w-full py-4 border-2 border-ifa-gold/40 text-ifa-gold font-bold uppercase tracking-widest rounded-xl hover:bg-ifa-gold/10 transition-all"
                    >
                        Nova Consulta
                    </button>
                </div>
            </div>
        );
    }

    // Phases: animating, revealed, idle
    return (
        <div className="w-full flex flex-col items-center py-8 animate-fade-in px-4">
            <div className="w-full max-w-md">
                {/* Progress */}
                <div className="text-center mb-6">
                    <p className="text-[10px] uppercase tracking-[3px] text-ifa-neutral/50">
                        Lançamento <span className="text-ifa-gold font-bold">{Math.min(totalThrows + 1, 8)}</span> de 8
                    </p>
                    {/* Progress bar */}
                    <div className="w-full h-1 bg-black/40 rounded-full mt-2 overflow-hidden">
                        <div
                            className="h-full bg-ifa-gold/60 rounded-full transition-all duration-500"
                            style={{ width: `${(totalThrows / 8) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Animated area */}
                <div className="bg-black/30 border border-ifa-gold/20 rounded-2xl p-8 mb-6 min-h-[160px] flex flex-col items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    {phase === 'animating' && renderThrowAnimation()}

                    {phase === 'revealed' && revealedMark && (
                        <div className="text-center animate-fade-in" key={`r-${totalThrows}`}>
                            <p className="text-[11px] uppercase tracking-[3px] text-ifa-neutral/50 mb-3">
                                {revealedMark === 2 ? 'Restaram' : 'Restou'}
                            </p>
                            <div className={`inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl border transition-all ${
                                revealedMark === 2
                                    ? 'border-ifa-gold/40 bg-ifa-gold/5'
                                    : 'border-amber-400/30 bg-amber-400/5'
                            }`}>
                                <span className="font-mono text-2xl font-bold text-ifa-gold">
                                    {revealedMark === 2 ? 'II' : 'I'}
                                </span>
                            </div>
                            <p className="text-[10px] text-ifa-neutral/40 mt-3 italic">
                                {revealedMark === 2
                                    ? '2 Ikins restaram — marcam-se II'
                                    : '1 Ikin restou — marca-se I'}
                            </p>
                        </div>
                    )}

                    {phase === 'idle' && (
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                {renderIkinDots()}
                            </div>
                            <p className="text-xs text-ifa-neutral/50 italic">Prossiga com o próximo lançamento</p>
                        </div>
                    )}
                </div>

                {/* History */}
                <div className="mb-6">
                    {renderHistory()}
                </div>

                {/* Action button */}
                {phase === 'idle' && totalThrows < 8 && (
                    <button
                        type="button"
                        onClick={iniciarLancamento}
                        className="w-full py-4 bg-ifa-gold text-black font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg shadow-ifa-gold/20"
                    >
                        Realizar Próximo Lançamento
                    </button>
                )}
            </div>

            <style>{`
                @keyframes slide-ikin {
                    0% { transform: translateX(-60px); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(60px); opacity: 0; }
                }
                .animate-slide-ikin {
                    animation: slide-ikin 0.9s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default IkinRitual;
