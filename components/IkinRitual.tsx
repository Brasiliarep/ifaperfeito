
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

// ─── SVG HAND WITH IKIN SEEDS ───────────────────────────────────────────────

const MaoIkin: React.FC<{ animating?: boolean; revealed?: boolean }> = ({ animating, revealed }) => (
  <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
    <defs>
      {/* Skin gradient — warm brown, cinematic soft */}
      <radialGradient id="pele" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stopColor="#8B6F4A" />
        <stop offset="40%" stopColor="#6F5236" />
        <stop offset="80%" stopColor="#4E3520" />
        <stop offset="100%" stopColor="#3A2715" />
      </radialGradient>

      {/* Palm highlight — soft light from above */}
      <radialGradient id="palmDestaque" cx="50%" cy="35%" r="50%">
        <stop offset="0%" stopColor="rgba(255,220,160,0.12)" />
        <stop offset="100%" stopColor="rgba(255,220,160,0)" />
      </radialGradient>

      {/* Shadow under hand */}
      <radialGradient id="sombraBase" cx="50%" cy="100%" r="50%">
        <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
      </radialGradient>

      {/* Ikin seed gradient */}
      <radialGradient id="ikinBase" cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#2a2015" />
        <stop offset="60%" stopColor="#1a1008" />
        <stop offset="100%" stopColor="#0a0502" />
      </radialGradient>

      {/* Ikin highlight */}
      <radialGradient id="ikinBrilho" cx="30%" cy="25%" r="30%">
        <stop offset="0%" stopColor="rgba(255,200,120,0.18)" />
        <stop offset="100%" stopColor="rgba(255,200,120,0)" />
      </radialGradient>

      {/* Finger top lighting */}
      <linearGradient id="dedoTopo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,220,180,0.08)" />
        <stop offset="100%" stopColor="rgba(255,220,180,0)" />
      </linearGradient>

      {/* Nail */}
      <linearGradient id="unha" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,235,210,0.25)" />
        <stop offset="100%" stopColor="rgba(200,170,140,0.15)" />
      </linearGradient>
    </defs>

    {/* Base shadow */}
    <ellipse cx="200" cy="440" rx="140" ry="20" fill="url(#sombraBase)" opacity={0.6} />

    {/* ANIMATION CLOSURE — subtle finger curl */}
    <g className={animating ? 'animar-mao' : ''}>
      <style>{`
        .animar-mao .dedo { transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
        .animar-mao .dedo-indicador { transform: translateY(6px) rotate(2deg); }
        .animar-mao .dedo-medio { transform: translateY(5px) rotate(1deg); }
        .animar-mao .dedo-anelar { transform: translateY(5px) rotate(-1deg); }
        .animar-mao .dedo-minimo { transform: translateY(4px) rotate(-2deg); }
        .animar-mao .dedo-polegar { transform: translateX(-4px) translateY(2px) rotate(3deg); }
        .ikin-grupo { transition: transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease; }
        .animar-mao .ikin-grupo { transform: translateY(-6px) scale(0.97); opacity: 0.7; }
        .revelado-result .ikin-grupo { opacity: 0.85; }
      `}</style>

      {/* ===== PALM ===== */}
      <path d="
        M 150 420
        C 130 410, 110 390, 100 360
        C 90 330, 88 300, 95 270
        C 100 250, 110 235, 120 220
        L 130 210
        L 155 200
        C 170 195, 190 190, 210 190
        C 230 190, 250 192, 265 198
        L 280 205
        L 290 220
        C 300 240, 305 260, 300 290
        C 295 320, 285 350, 275 370
        C 265 390, 250 410, 235 420
        C 220 430, 200 435, 180 435
        C 165 435, 155 430, 150 420
        Z"
        fill="url(#pele)"
        stroke="rgba(40,20,5,0.3)"
        strokeWidth="0.5"
      />

      {/* Palm highlight */}
      <path d="
        M 160 380
        C 140 350, 130 310, 135 270
        C 140 240, 155 215, 175 205
        L 195 200
        C 185 220, 180 250, 182 280
        C 185 320, 190 350, 200 380
        Z"
        fill="url(#palmDestaque)"
      />

      {/* ===== FINGERS ===== */}

      {/* Indicador */}
      <g className="dedo dedo-indicador">
        <path d="M 120 220 C 110 190, 105 160, 108 130 C 110 110, 115 95, 122 85 C 128 78, 132 80, 130 90 C 128 100, 125 120, 126 140 C 127 160, 130 185, 135 205 Z" fill="url(#pele)" stroke="rgba(40,20,5,0.2)" strokeWidth="0.3" />
        {/* Nail */}
        <ellipse cx="124" cy="88" rx="6" ry="4" fill="url(#unha)" transform="rotate(-10,124,88)" />
        {/* Top light */}
        <path d="M 115 130 C 112 110, 115 95, 122 85 C 125 82, 128 82, 128 88 C 126 100, 123 120, 120 140 Z" fill="url(#dedoTopo)" />
      </g>

      {/* Médio */}
      <g className="dedo dedo-medio">
        <path d="M 145 200 C 140 165, 138 130, 140 100 C 142 80, 146 68, 152 62 C 158 58, 160 62, 157 72 C 154 82, 150 100, 150 125 C 150 150, 150 175, 152 198 Z" fill="url(#pele)" stroke="rgba(40,20,5,0.2)" strokeWidth="0.3" />
        <ellipse cx="154" cy="65" rx="6" ry="4.5" fill="url(#unha)" transform="rotate(-5,154,65)" />
        <path d="M 145 100 C 143 80, 147 68, 152 62 C 155 59, 158 60, 157 67 C 155 78, 150 95, 148 110 Z" fill="url(#dedoTopo)" />
      </g>

      {/* Anelar */}
      <g className="dedo dedo-anelar">
        <path d="M 172 198 C 170 170, 170 140, 173 115 C 176 95, 180 82, 186 78 C 192 75, 193 80, 190 88 C 187 96, 183 115, 183 135 C 183 158, 182 178, 180 198 Z" fill="url(#pele)" stroke="rgba(40,20,5,0.2)" strokeWidth="0.3" />
        <ellipse cx="188" cy="80" rx="6" ry="4" fill="url(#unha)" transform="rotate(5,188,80)" />
        <path d="M 176 120 C 175 100, 178 85, 184 78 C 187 75, 190 77, 189 83 C 187 92, 182 110, 180 125 Z" fill="url(#dedoTopo)" />
      </g>

      {/* Mínimo */}
      <g className="dedo dedo-minimo">
        <path d="M 200 200 C 202 180, 205 155, 208 138 C 210 125, 214 116, 218 113 C 222 110, 223 114, 221 120 C 219 128, 215 140, 213 155 C 211 170, 210 185, 208 200 Z" fill="url(#pele)" stroke="rgba(40,20,5,0.2)" strokeWidth="0.3" />
        <ellipse cx="220" cy="114" rx="5" ry="3.5" fill="url(#unha)" transform="rotate(8,220,114)" />
        <path d="M 207 138 C 209 125, 213 116, 218 113 C 220 111, 222 114, 220 120 C 217 128, 213 140, 211 150 Z" fill="url(#dedoTopo)" />
      </g>

      {/* Polegar */}
      <g className="dedo dedo-polegar">
        <path d="M 250 310 C 270 300, 295 285, 310 275 C 322 267, 330 262, 332 258 C 334 254, 330 252, 325 255 C 318 260, 300 272, 280 282 C 260 292, 245 300, 240 310 Z" fill="url(#pele)" stroke="rgba(40,20,5,0.2)" strokeWidth="0.3" />
        {/* Nail */}
        <ellipse cx="330" cy="258" rx="5" ry="3.5" fill="url(#unha)" transform="rotate(30,330,258)" />
        <path d="M 310 275 C 320 268, 328 262, 332 258 C 334 256, 332 253, 328 256 C 322 260, 308 272, 295 280 Z" fill="url(#dedoTopo)" />
      </g>

      {/* ===== IKIN SEEDS (16 organic shapes) ===== */}
      <g className="ikin-grupo" style={{ transformOrigin: '200px 310px' }}>
        {/* Row 1 (top) */}
        <ellipse cx="195" cy="264" rx="7" ry="10" fill="url(#ikinBase)" transform="rotate(-8,195,264)" />
        <ellipse cx="195" cy="264" rx="7" ry="10" fill="url(#ikinBrilho)" transform="rotate(-8,195,264)" />
        <ellipse cx="208" cy="260" rx="6.5" ry="9.5" fill="url(#ikinBase)" transform="rotate(5,208,260)" />
        <ellipse cx="208" cy="260" rx="6.5" ry="9.5" fill="url(#ikinBrilho)" transform="rotate(5,208,260)" />
        <ellipse cx="220" cy="262" rx="7.5" ry="10" fill="url(#ikinBase)" transform="rotate(-3,220,262)" />
        <ellipse cx="220" cy="262" rx="7.5" ry="10" fill="url(#ikinBrilho)" transform="rotate(-3,220,262)" />
        <ellipse cx="233" cy="265" rx="6.5" ry="9" fill="url(#ikinBase)" transform="rotate(10,233,265)" />
        <ellipse cx="233" cy="265" rx="6.5" ry="9" fill="url(#ikinBrilho)" transform="rotate(10,233,265)" />

        {/* Row 2 */}
        <ellipse cx="188" cy="282" rx="7.5" ry="10.5" fill="url(#ikinBase)" transform="rotate(-15,188,282)" />
        <ellipse cx="188" cy="282" rx="7.5" ry="10.5" fill="url(#ikinBrilho)" transform="rotate(-15,188,282)" />
        <ellipse cx="202" cy="280" rx="7" ry="9.5" fill="url(#ikinBase)" transform="rotate(2,202,280)" />
        <ellipse cx="202" cy="280" rx="7" ry="9.5" fill="url(#ikinBrilho)" transform="rotate(2,202,280)" />
        <ellipse cx="215" cy="278" rx="6.5" ry="9" fill="url(#ikinBase)" transform="rotate(-7,215,278)" />
        <ellipse cx="215" cy="278" rx="6.5" ry="9" fill="url(#ikinBrilho)" transform="rotate(-7,215,278)" />
        <ellipse cx="228" cy="282" rx="7" ry="10" fill="url(#ikinBase)" transform="rotate(12,228,282)" />
        <ellipse cx="228" cy="282" rx="7" ry="10" fill="url(#ikinBrilho)" transform="rotate(12,228,282)" />

        {/* Row 3 */}
        <ellipse cx="192" cy="300" rx="6.5" ry="9.5" fill="url(#ikinBase)" transform="rotate(-10,192,300)" />
        <ellipse cx="192" cy="300" rx="6.5" ry="9.5" fill="url(#ikinBrilho)" transform="rotate(-10,192,300)" />
        <ellipse cx="205" cy="298" rx="7" ry="10" fill="url(#ikinBase)" transform="rotate(5,205,298)" />
        <ellipse cx="205" cy="298" rx="7" ry="10" fill="url(#ikinBrilho)" transform="rotate(5,205,298)" />
        <ellipse cx="218" cy="296" rx="6.5" ry="9" fill="url(#ikinBase)" transform="rotate(-3,218,296)" />
        <ellipse cx="218" cy="296" rx="6.5" ry="9" fill="url(#ikinBrilho)" transform="rotate(-3,218,296)" />
        <ellipse cx="230" cy="300" rx="7" ry="9.5" fill="url(#ikinBase)" transform="rotate(8,230,300)" />
        <ellipse cx="230" cy="300" rx="7" ry="9.5" fill="url(#ikinBrilho)" transform="rotate(8,230,300)" />

        {/* Row 4 (bottom) */}
        <ellipse cx="198" cy="318" rx="6" ry="9" fill="url(#ikinBase)" transform="rotate(-5,198,318)" />
        <ellipse cx="198" cy="318" rx="6" ry="9" fill="url(#ikinBrilho)" transform="rotate(-5,198,318)" />
        <ellipse cx="210" cy="316" rx="6.5" ry="9.5" fill="url(#ikinBase)" transform="rotate(3,210,316)" />
        <ellipse cx="210" cy="316" rx="6.5" ry="9.5" fill="url(#ikinBrilho)" transform="rotate(3,210,316)" />
        <ellipse cx="222" cy="318" rx="6" ry="8.5" fill="url(#ikinBase)" transform="rotate(-8,222,318)" />
        <ellipse cx="222" cy="318" rx="6" ry="8.5" fill="url(#ikinBrilho)" transform="rotate(-8,222,318)" />
        <ellipse cx="233" cy="320" rx="6.5" ry="9" fill="url(#ikinBase)" transform="rotate(15,233,320)" />
        <ellipse cx="233" cy="320" rx="6.5" ry="9" fill="url(#ikinBrilho)" transform="rotate(15,233,320)" />

        {/* Extra seeds in between for natural look */}
        <ellipse cx="196" cy="272" rx="5.5" ry="8" fill="url(#ikinBase)" transform="rotate(-20,196,272)" />
        <ellipse cx="196" cy="272" rx="5.5" ry="8" fill="url(#ikinBrilho)" transform="rotate(-20,196,272)" />
        <ellipse cx="225" cy="272" rx="5.5" ry="8.5" fill="url(#ikinBase)" transform="rotate(15,225,272)" />
        <ellipse cx="225" cy="272" rx="5.5" ry="8.5" fill="url(#ikinBrilho)" transform="rotate(15,225,272)" />
        <ellipse cx="210" cy="292" rx="5" ry="7.5" fill="url(#ikinBase)" transform="rotate(-2,210,292)" />
        <ellipse cx="210" cy="292" rx="5" ry="7.5" fill="url(#ikinBrilho)" transform="rotate(-2,210,292)" />
      </g>
    </g>
  </svg>
);

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

    const iniciarLancamento = () => {
        if (marks.length >= 8) return;
        setPhase('animating');
        somQueda();

        const mark: Mark = Math.random() < 0.5 ? 1 : 2;

        setTimeout(() => {
            setRevealedMark(mark);
            setPhase('revealed');
            somRevelacao();
        }, 750);

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
            setPhase('idle');
        }, 750 + 1200);
    };

    const count = marks.length >= 8 ? 8 : marks.length;

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

                        {/* Hand — 35% of viewport */}
                        <div className="w-full max-w-[260px] mx-auto mb-10" style={{ height: '35vh', maxHeight: 320 }}>
                            <MaoIkin />
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

                        {/* Hand area */}
                        <div className="w-full max-w-[220px] mx-auto mb-8 transition-all duration-700" style={{ height: '30vh', maxHeight: 260 }}>
                            <div className={`w-full h-full transition-all duration-700 ${phase === 'revealed' ? 'opacity-90' : 'opacity-100'}`}>
                                <MaoIkin animating={phase === 'animating'} revealed={phase === 'revealed'} />
                            </div>
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
