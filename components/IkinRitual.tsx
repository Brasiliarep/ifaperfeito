
import React, { useState, useRef } from 'react';
import { OpeleState } from '../types';

interface Props {
    opele: OpeleState;
    onToggle: (leg: 'right' | 'left', index: number) => void;
    onReset: () => void;
    oduName?: string;
}

type Phase = 'start' | 'animating' | 'revealed' | 'idle' | 'complete';
type Mark = 1 | 2;
type HandPose = 'open' | 'closing' | 'release' | 'rest';

// ─── SOUND ──────────────────────────────────────────────────────────────────

const audioCtx = { current: null as AudioContext | null };

function getAudio() {
    if (!audioCtx.current) audioCtx.current = new AudioContext();
    const ctx = audioCtx.current;
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
        [260, 330, 390].forEach((f, i) => {
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

// ─── MAIN ───────────────────────────────────────────────────────────────────

const IkinRitual: React.FC<Props> = ({ opele, onToggle, onReset, oduName }) => {
    const [phase, setPhase] = useState<Phase>('start');
    const [marks, setMarks] = useState<Mark[]>([]);
    const [revealedMark, setRevealedMark] = useState<Mark | null>(null);
    const [handPose, setHandPose] = useState<HandPose>('open');

    const iniciarLancamento = () => {
        if (marks.length >= 8) return;
        setPhase('animating');
        somQueda();

        // Animation sequence: closing → release → rest
        setHandPose('closing');
        setTimeout(() => setHandPose('release'), 280);
        setTimeout(() => setHandPose('rest'), 560);

        const mark: Mark = Math.random() < 0.5 ? 1 : 2;

        // Reveal result at 750ms
        setTimeout(() => {
            setRevealedMark(mark);
            setPhase('revealed');
            somRevelacao();
        }, 750);

        // Back to idle at 750+1200ms
        setTimeout(() => {
            setMarks(prev => {
                const next = [...prev, mark];
                const leg = prev.length < 4 ? 'right' : 'left';
                const idx = prev.length < 4 ? prev.length : prev.length - 4;
                if (mark === 2) onToggle(leg, idx);
                if (next.length >= 8) {
                    setTimeout(() => {
                        setPhase('complete');
                        somCompleto();
                    }, 1000);
                }
                return next;
            });
            setHandPose('open');
            setPhase('idle');
        }, 750 + 1200);
    };

    const count = marks.length >= 8 ? 8 : marks.length;

    const poseSrc = `/ikin/hand-${handPose}.webp`;

    return (
        <div className="w-full flex flex-col items-center py-8 px-4" style={{ animation: 'fadeIn 0.6s ease' }}>
            <div className="w-full max-w-sm">

                {/* ===== START ===== */}
                {phase === 'start' && (
                    <>
                        <div className="text-center mb-10">
                            <p className="text-[9px] uppercase tracking-[4px] text-ifa-neutral/35 mb-3">Ifá — Oráculo Supremo</p>
                            <h1 className="font-serif text-[28px] font-bold text-ifa-gold tracking-wide leading-tight">
                                Ikin Ifá
                            </h1>
                            <p className="text-xs text-ifa-neutral/45 tracking-[3px] uppercase mt-2 font-sans">Lançamento Sacerdotal</p>
                        </div>

                        {/* Hand image — 35% of viewport */}
                        <div className="w-full max-w-[260px] mx-auto mb-10 flex items-center justify-center" style={{ height: '35vh', maxHeight: 320 }}>
                            <img src={poseSrc} alt="Mão segurando Ikin" className="w-full h-full object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]" style={{ animation: 'fadeIn 0.6s ease' }} />
                        </div>

                        <div className="text-center mb-10">
                            <p className="text-sm text-ifa-neutral/60 leading-relaxed">
                                Segure simbolicamente os 16 Ikin na mão esquerda.<br />
                                <span className="text-ifa-neutral/40 text-xs">A cada lançamento, o sistema registrará automaticamente o resultado.</span>
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={iniciarLancamento}
                            className="w-full py-[18px] bg-ifa-gold text-black font-bold text-sm uppercase tracking-[4px] rounded-2xl hover:brightness-110 transition-all duration-300 shadow-lg shadow-ifa-gold/15"
                        >
                            Iniciar Lançamento
                        </button>
                    </>
                )}

                {/* ===== THROWING / REVEALED / IDLE ===== */}
                {(phase === 'animating' || phase === 'revealed' || phase === 'idle') && (
                    <>
                        {/* Progress */}
                        <div className="text-center mb-10">
                            <p className="text-[10px] uppercase tracking-[3px] text-ifa-neutral/45">
                                Lançamento <span className="text-ifa-gold font-bold">{Math.min(count + 1, 8)}</span> de 8
                            </p>
                            <div className="w-full h-[2px] bg-white/5 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-ifa-gold/50 rounded-full transition-all duration-500 ease-out" style={{ width: `${(count / 8) * 100}%` }} />
                            </div>
                        </div>

                        {/* Hand image */}
                        <div className="w-full max-w-[220px] mx-auto mb-8 flex items-center justify-center" style={{ height: '30vh', maxHeight: 260 }}>
                            <img
                                key={`${handPose}-${count}`}
                                src={poseSrc}
                                alt="Mão segurando Ikin"
                                className="w-full h-full object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                                style={{ animation: 'fadeIn 0.35s ease' }}
                            />
                        </div>

                        {/* Revealed result */}
                        {phase === 'revealed' && revealedMark && (
                            <div className="text-center mb-8" style={{ animation: 'fadeIn 0.4s ease' }} key={`r-${count}`}>
                                <p className="text-[10px] uppercase tracking-[3px] text-ifa-neutral/40 mb-2">
                                    {revealedMark === 2 ? 'Restaram' : 'Restou'}
                                </p>
                                <span className="font-mono text-[32px] font-bold text-ifa-gold tracking-[4px]">
                                    {revealedMark === 2 ? 'II' : 'I'}
                                </span>
                                <p className="text-[10px] text-ifa-neutral/30 mt-2 italic">
                                    {revealedMark === 2
                                        ? '2 Ikins restaram — marcam-se II'
                                        : '1 Ikin restou — marca-se I'}
                                </p>
                            </div>
                        )}

                        {/* ODU EM FORMAÇÃO */}
                        <div className="mb-8">
                            <p className="text-[9px] uppercase tracking-[3px] text-ifa-neutral/30 text-center mb-3">Odù em Formação</p>
                            <div className="flex justify-center gap-2.5">
                                {Array.from({ length: 8 }, (_, i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-500"
                                        style={{
                                            borderColor: marks[i] ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.05)',
                                            background: marks[i] ? 'rgba(212,175,55,0.06)' : 'rgba(0,0,0,0.15)',
                                            opacity: marks[i] ? 1 : 0.25,
                                        }}
                                    >
                                        {marks[i] ? (
                                            <span className={`font-mono text-sm font-bold tracking-wider ${marks[i] === 2 ? 'text-ifa-gold' : 'text-amber-300/80'}`}>
                                                {marks[i] === 2 ? 'II' : 'I'}
                                            </span>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action button */}
                        {phase === 'idle' && count < 8 && (
                            <button
                                type="button"
                                onClick={iniciarLancamento}
                                className="w-full py-[18px] bg-ifa-gold text-black font-bold text-sm uppercase tracking-[4px] rounded-2xl hover:brightness-110 transition-all duration-300 shadow-lg shadow-ifa-gold/15"
                            >
                                Próximo Lançamento
                            </button>
                        )}
                    </>
                )}

                {/* ===== COMPLETE ===== */}
                {phase === 'complete' && (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-ifa-gold/20 flex items-center justify-center" style={{ animation: 'fadeIn 0.6s ease' }}>
                                <span className="text-ifa-gold/60 text-lg">✦</span>
                            </div>
                            <p className="text-[9px] uppercase tracking-[4px] text-green-400/40 mb-2">Odù Revelado</p>
                            <h2 className="font-serif text-[28px] font-bold text-ifa-gold tracking-wide">{oduName || '...'}</h2>
                        </div>

                        {/* Complete grid */}
                        <div className="bg-black/20 border border-ifa-gold/10 rounded-2xl p-5 mb-8">
                            <div className="grid grid-cols-2 gap-2 max-w-[200px] mx-auto">
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className="flex justify-center gap-4">
                                        <div className="w-14 h-9 rounded-lg bg-black/20 border border-ifa-border/10 flex items-center justify-center">
                                            <span className="font-mono text-sm font-bold tracking-wider text-white/80">
                                                {marks[i] === 2 ? 'II' : marks[i] === 1 ? 'I' : ''}
                                            </span>
                                        </div>
                                        <div className="w-14 h-9 rounded-lg bg-black/20 border border-ifa-border/10 flex items-center justify-center">
                                            <span className="font-mono text-sm font-bold tracking-wider text-white/80">
                                                {marks[i + 4] === 2 ? 'II' : marks[i + 4] === 1 ? 'I' : ''}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* History */}
                        <div className="mb-8">
                            <p className="text-[9px] uppercase tracking-[3px] text-ifa-neutral/30 text-center mb-3">Lançamentos</p>
                            <div className="flex justify-center gap-2.5">
                                {marks.map((m, i) => (
                                    <div key={i} className="w-9 h-9 rounded-xl border border-ifa-gold/20 flex items-center justify-center bg-ifa-gold/5">
                                        <span className="font-mono text-xs font-bold text-ifa-gold">{m === 2 ? 'II' : 'I'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onReset}
                            className="w-full py-[18px] border-2 border-ifa-gold/25 text-ifa-gold font-bold text-sm uppercase tracking-[4px] rounded-2xl hover:bg-ifa-gold/5 transition-all duration-300"
                        >
                            Nova Consulta
                        </button>
                    </>
                )}
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default IkinRitual;
