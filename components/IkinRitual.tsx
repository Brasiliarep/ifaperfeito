import React, { useState } from 'react';
import { OpeleState } from '../types';
import { Hand, RefreshCcw, Sparkles } from 'lucide-react';
import CameraButtons from './CameraButtons';

interface Props {
    opele: OpeleState;
    onToggle: (leg: 'right' | 'left', index: number) => void;
    onReset: () => void;
    oduName?: string;
}

type Mark = 'I' | 'II' | null;

const IkinRitual: React.FC<Props> = ({ opele, onToggle, onReset, oduName }) => {
    const [marks, setMarks] = useState<Mark[]>([]);
    const [message, setMessage] = useState("Segure os 16 Ikins na mão esquerda.");
    const [animating, setAnimating] = useState(false);

    // Audio Synthesis for "Shaking Nuts" sound
    const playShakeSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContext();
            const bufferSize = ctx.sampleRate * 1.5;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1000;
            filter.Q.value = 1;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, ctx.currentTime);
            for(let i=0; i<8; i++) {
                const time = ctx.currentTime + (i * 0.15);
                gain.gain.linearRampToValueAtTime(0.8, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
            }
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
        } catch(e) {}
    };

    const graspIkin = () => {
        if (marks.length >= 8) return;
        
        playShakeSound();
        setAnimating(true);
        setMessage("Ifá n lu! (Batendo os Ikins)...");

        setTimeout(() => {
            const rand = Math.random();
            let remainder = 0;
            let resultMark: Mark = null;
            let resultText = "";

            if (rand < 0.25) {
                remainder = 1;
                resultMark = 'II';
                resultText = "1 Ikin restou: Marca-se II (Oyeku).";
            } else if (rand < 0.5) {
                remainder = 2;
                resultMark = 'I';
                resultText = "2 Ikins restaram: Marca-se I (Ogbe).";
            } else {
                remainder = Math.floor(Math.random() * 5) + 3; // 0, 3, 4+
                resultMark = null;
                resultText = `${remainder} Ikins restaram. Nada se marca. Tente novamente.`;
            }

            setAnimating(false);
            setMessage(resultText);

            if (resultMark) {
                const newLength = marks.length + 1;
                setMarks(prev => [...prev, resultMark]);
                
                // Atualizar o state global do App
                const leg = (newLength - 1) < 4 ? 'right' : 'left';
                const idx = (newLength - 1) < 4 ? (newLength - 1) : (newLength - 1) - 4;
                if (resultMark === 'II') {
                    onToggle(leg, idx);
                }
            }
        }, 1500);
    };

    const reset = () => {
        setMarks([]);
        setMessage("Segure os 16 Ikins na mão esquerda.");
        onReset(); // Avisa o App.tsx para limpar o state global
    };

    return (
        <div className="flex flex-col items-center h-full animate-fade-in pt-4 w-full max-w-lg mx-auto pb-8">
            <div className="w-full flex justify-center items-center mb-4 px-4">
                <h2 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Sparkles size={18}/> Ikin Ifá</h2>
            </div>

            {/* === CONTADOR DE IKINS NA MÃO === */}
            <div className="w-full max-w-md px-4 mb-5">
                <div
                    style={{
                        background: 'radial-gradient(ellipse at 30% 25%, #3d2410 0%, #1e0e05 100%)',
                        border: '2px solid rgba(180,130,40,0.35)',
                        borderRadius: '18px',
                        padding: '16px 20px',
                        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.5)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Hand size={28} style={{ color: '#C49E30' }} />
                            <div>
                                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(180,140,50,0.7)', margin: 0 }}>Ikins na Mão</p>
                                <p style={{ fontSize: '28px', fontFamily: 'serif', fontWeight: 700, color: '#e2b84a', lineHeight: 1, margin: 0 }}>
                                    {16 - marks.length}
                                    <span style={{ fontSize: '14px', color: 'rgba(180,140,50,0.5)', marginLeft: '4px' }}>/ 16</span>
                                </p>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(180,140,50,0.7)', margin: 0 }}>Jogadas</p>
                            <p style={{ fontSize: '28px', fontFamily: 'serif', fontWeight: 700, color: '#e2b84a', lineHeight: 1, margin: 0 }}>{marks.length}<span style={{ fontSize: '14px', color: 'rgba(180,140,50,0.5)', marginLeft: '4px' }}>/8</span></p>
                        </div>
                    </div>

                    {/* Grade visual de nozes */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                        {Array.from({ length: 16 }).map((_, i) => {
                            const used = i < marks.length; 
                            return (
                                <div
                                    key={i}
                                    style={{
                                        width: '26px',
                                        height: '26px',
                                        borderRadius: '50%',
                                        background: used
                                            ? 'radial-gradient(circle at 35% 30%, #3a2010 0%, #1a0c04 100%)'
                                            : 'radial-gradient(circle at 35% 30%, #6b4220 0%, #3e2210 60%, #1e0e05 100%)',
                                        border: used
                                            ? '1.5px solid rgba(80,50,15,0.4)'
                                            : '1.5px solid rgba(160,110,40,0.6)',
                                        boxShadow: used
                                            ? 'none'
                                            : 'inset 0 2px 4px rgba(255,200,100,0.15), 0 2px 4px rgba(0,0,0,0.5)',
                                        opacity: used ? 0.25 : 1,
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {!used && (
                                        <div style={{
                                            position: 'absolute', top: '15%', left: '20%',
                                            width: '30%', height: '25%',
                                            background: 'rgba(255,220,150,0.3)',
                                            borderRadius: '50%',
                                        }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* === OPON (TABULEIRO DE MARCAS) === */}
            <div
                style={{
                    width: 'min(320px, 88vw)',
                    height: 'min(320px, 88vw)',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at 32% 28%, #5c2e14 0%, #2a1008 45%, #130703 100%)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.9), inset 0 0 50px rgba(0,0,0,0.7)',
                    border: '3px solid rgba(100,60,20,0.4)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}
            >
                <div style={{
                    position: 'absolute', inset: '8px', borderRadius: '50%',
                    border: '2px solid rgba(150,95,35,0.2)',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                }} />
                <div style={{
                    position: 'absolute', inset: '20%', borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(210,170,85,0.12) 0%, transparent 75%)',
                    filter: 'blur(10px)',
                    pointerEvents: 'none',
                }} />

                {/* Marks Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px', zIndex: 10 }}>
                    {/* Leg Esquerda (marks 0-3) -> Ọtún (Direita do Ifá, que pra gente aparece na direita ou esquerda dependendo da convenção. Vou manter do IkinDivination) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                        <p style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(180,140,50,0.4)', textAlign: 'right', margin: '0 0 2px 0' }}>Ọtún</p>
                        {[0, 1, 2, 3].map(i => (
                            <div key={i} style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                {marks[i] ? (
                                    <div style={{ display: 'flex', gap: marks[i] === 'II' ? '8px' : '0', alignItems: 'center' }}>
                                        <div style={{
                                            width: '11px', height: '44px', borderRadius: '6px',
                                            background: 'linear-gradient(180deg, #c8a428 0%, #f0d060 40%, #fae880 55%, #d4aa30 80%, #8a6010 100%)',
                                            boxShadow: '0 0 10px rgba(220,180,50,0.6), inset 0 2px 5px rgba(255,255,200,0.3)',
                                            border: '1.5px solid rgba(100,72,8,0.6)',
                                        }} />
                                        {marks[i] === 'II' && <div style={{
                                            width: '11px', height: '44px', borderRadius: '6px',
                                            background: 'linear-gradient(180deg, #c8a428 0%, #f0d060 40%, #fae880 55%, #d4aa30 80%, #8a6010 100%)',
                                            boxShadow: '0 0 10px rgba(220,180,50,0.6), inset 0 2px 5px rgba(255,255,200,0.3)',
                                            border: '1.5px solid rgba(100,72,8,0.6)',
                                        }} />}
                                    </div>
                                ) : (
                                    <div style={{ width: '28px', height: '44px', borderRadius: '4px', border: '1px dashed rgba(150,110,40,0.2)', opacity: 0.5 }} />
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Leg Direita (marks 4-7) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                        <p style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(180,140,50,0.4)', margin: '0 0 2px 0' }}>Òsì</p>
                        {[4, 5, 6, 7].map(i => (
                            <div key={i} style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                {marks[i] ? (
                                    <div style={{ display: 'flex', gap: marks[i] === 'II' ? '8px' : '0', alignItems: 'center' }}>
                                        <div style={{
                                            width: '11px', height: '44px', borderRadius: '6px',
                                            background: 'linear-gradient(180deg, #c8a428 0%, #f0d060 40%, #fae880 55%, #d4aa30 80%, #8a6010 100%)',
                                            boxShadow: '0 0 10px rgba(220,180,50,0.6), inset 0 2px 5px rgba(255,255,200,0.3)',
                                            border: '1.5px solid rgba(100,72,8,0.6)',
                                        }} />
                                        {marks[i] === 'II' && <div style={{
                                            width: '11px', height: '44px', borderRadius: '6px',
                                            background: 'linear-gradient(180deg, #c8a428 0%, #f0d060 40%, #fae880 55%, #d4aa30 80%, #8a6010 100%)',
                                            boxShadow: '0 0 10px rgba(220,180,50,0.6), inset 0 2px 5px rgba(255,255,200,0.3)',
                                            border: '1.5px solid rgba(100,72,8,0.6)',
                                        }} />}
                                    </div>
                                ) : (
                                    <div style={{ width: '28px', height: '44px', borderRadius: '4px', border: '1px dashed rgba(150,110,40,0.2)', opacity: 0.5 }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`text-center mb-8 h-16 flex items-center justify-center px-4 rounded-lg transition-all ${animating ? 'bg-ifa-gold/10 border border-ifa-gold/30' : ''}`}>
                <p className={`text-sm font-bold uppercase tracking-wide ${animating ? 'animate-pulse text-ifa-gold' : 'text-ifa-neutral'}`}>
                    {message}
                </p>
            </div>

            {marks.length < 8 ? (
                <button 
                    onClick={graspIkin}
                    disabled={animating}
                    className={`w-32 h-32 rounded-full bg-ifa-wood border-4 border-ifa-gold flex flex-col items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-95 transition-transform hover:bg-[#4E342E] ${animating ? 'animate-shake cursor-wait' : ''}`}
                >
                    <Hand size={48} className="text-white mb-2" />
                    <span className="text-xs font-bold uppercase text-ifa-gold">Dá'Fa</span>
                </button>
            ) : (
                <div className="text-center animate-scale-in w-full px-4">
                    <div className="bg-green-900/20 border border-green-500 p-4 rounded-xl mb-6">
                        <p className="text-green-400 font-bold text-xl uppercase">Odu Revelado!</p>
                        <p className="text-xs text-green-200 mt-1">{oduName ? `Odù: ${oduName}` : 'A assinatura vibracional está completa.'}</p>
                    </div>
                    <button onClick={reset} className="w-full py-4 border border-ifa-gold text-ifa-gold rounded-xl flex items-center justify-center gap-2 hover:bg-ifa-gold hover:text-black transition-colors font-bold uppercase">
                        <RefreshCcw size={18} /> Nova Consulta
                    </button>
                </div>
            )}
            
            <CameraButtons />
        </div>
    );
};

export default IkinRitual;
