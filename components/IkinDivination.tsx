
import React, { useState } from 'react';
import { ArrowLeft, Hand, RefreshCcw, Volume2, MoveDown, BookOpen, Sparkles } from 'lucide-react';
import TextReader from './TextReader';

type Mark = 'I' | 'II' | null;
type Step = 'ritual_start' | 'ritual_earth' | 'ritual_prayer' | 'divination' | 'result';

const IkinDivination = ({ onBack }: { onBack: () => void }) => {
    const [step, setStep] = useState<Step>('ritual_start');
    const [marks, setMarks] = useState<Mark[]>([]);
    const [message, setMessage] = useState("Segure os 16 Ikins na mão esquerda.");
    const [animating, setAnimating] = useState(false);

    // Audio Synthesis for "Shaking Nuts" sound
    const playShakeSound = () => {
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

            // Probabilidades ajustadas para a física do Ikin
            if (rand < 0.25) {
                remainder = 1;
                resultMark = 'II'; // 1 resta -> marca 2 (Oyeku)
                resultText = "1 Ikin restou: Marca-se II (Oyeku).";
            } else if (rand < 0.5) {
                remainder = 2;
                resultMark = 'I'; // 2 restam -> marca 1 (Ogbe)
                resultText = "2 Ikins restaram: Marca-se I (Ogbe).";
            } else {
                remainder = Math.floor(Math.random() * 5) + 3; // 0, 3, 4+
                resultMark = null;
                resultText = `${remainder} Ikins restaram. Nada se marca. Tente novamente.`;
            }

            setAnimating(false);
            setMessage(resultText);

            if (resultMark) {
                setMarks(prev => [...prev, resultMark]);
            }
        }, 1500);
    };

    const reset = () => {
        setMarks([]);
        setMessage("Segure os 16 Ikins na mão esquerda.");
        setStep('ritual_start');
    };

    // RENDERIZADORES DE RITUAL
    const renderRitualStep = () => {
        switch(step) {
            case 'ritual_start':
                return (
                    <div className="text-center animate-fade-in px-6 max-w-md">
                        <div className="w-24 h-24 bg-ifa-wood rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-ifa-gold">
                            <Hand size={48} className="text-white"/>
                        </div>
                        <h2 className="text-2xl font-serif text-ifa-gold mb-4">Ikin Ifá: O Oráculo Supremo</h2>
                        <p className="text-ifa-text-light mb-8 leading-relaxed">
                            O Ikin é a representação física de Orunmila na Terra. Antes de perguntar, devemos reverenciar sua antiguidade e conectar com o solo.
                        </p>
                        <button onClick={() => setStep('ritual_earth')} className="w-full bg-ifa-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                            Iniciar Ritual
                        </button>
                    </div>
                );
            case 'ritual_earth':
                return (
                    <div className="text-center animate-fade-in px-6 max-w-md">
                        <div className="w-24 h-24 bg-[#5D4037] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-[#3E2723]">
                            <MoveDown size={48} className="text-[#D2B48C]"/>
                        </div>
                        <h2 className="text-xl font-serif text-ifa-gold mb-2">Toque na Terra (Ile)</h2>
                        <p className="text-ifa-text-light text-sm mb-6">
                            Toque os Ikins no chão 3 vezes para acordar a terra:
                        </p>
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-ifa-wood mb-8">
                            <p className="font-serif italic text-xl mb-2">"Ile mo juba. Ifá mo juba."</p>
                            <p className="text-xs text-ifa-neutral uppercase tracking-widest">Terra eu saúdo. Ifá eu saúdo.</p>
                            <div className="mt-4 flex justify-center">
                                <TextReader text="Ile mo juba. Ifá mo juba." forceLang="yo-NG" />
                            </div>
                        </div>
                        <button onClick={() => setStep('ritual_prayer')} className="w-full bg-ifa-wood text-white py-4 rounded-xl font-bold uppercase hover:bg-ifa-gold hover:text-black transition-colors">
                            Próximo Passo
                        </button>
                    </div>
                );
            case 'ritual_prayer':
                return (
                    <div className="text-center animate-fade-in px-6 max-w-md">
                        <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-blue-500">
                            <BookOpen size={48} className="text-white"/>
                        </div>
                        <h2 className="text-xl font-serif text-ifa-gold mb-2">Invocação (Adura)</h2>
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-ifa-gold mb-8 text-left">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-ifa-gold uppercase">Recite com Fé:</span>
                                <TextReader text="Orunmila Eleri Ipin, Ibikeji Olodumare. Wa gbo temi loni." forceLang="yo-NG"/>
                            </div>
                            <p className="font-serif italic text-lg mb-4 leading-relaxed">"Orunmila Eleri Ipin, Ibikeji Olodumare. Wa gbo temi loni."</p>
                            <p className="text-xs text-ifa-neutral border-t border-white/10 pt-2">Orunmila, Testemunha do Destino, Vice de Deus. Venha me ouvir hoje.</p>
                        </div>
                        <button onClick={() => setStep('divination')} className="w-full bg-ifa-gold text-black py-4 rounded-xl font-bold uppercase animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                            Abrir Jogo
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    if (step !== 'divination' && step !== 'result') {
        return (
            <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center justify-center relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-ifa-neutral hover:text-white"><ArrowLeft /></button>
                {renderRitualStep()}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center h-full animate-fade-in pt-8 md:pt-4 w-full max-w-lg mx-auto">
            <div className="w-full flex justify-between items-center mb-6 px-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-ifa-gold/10"><ArrowLeft /></button>
                <h2 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Sparkles size={18}/> Ikin Ifá (Sagrado)</h2>
                <div className="w-8"></div>
            </div>

            {/* Opon Tray Visual */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#D2B48C] border-8 border-[#5D4037] relative flex items-center justify-center shadow-2xl mb-8">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] rounded-full"></div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#5D4037] rounded-full opacity-50"></div> {/* Eshu Face */}
                
                {/* Marks Grid - Right to Left reading */}
                <div className="grid grid-cols-2 gap-x-16 gap-y-4 z-10 w-full px-12">
                    {/* Right Leg (Mão Direita - 1, 2, 3, 4) */}
                    <div className="flex flex-col gap-3 items-end">
                        {[0, 1, 2, 3].map(i => (
                            <div key={`r-${i}`} className="h-8 flex items-center justify-end w-full">
                                {marks[i] ? (
                                    <div className="flex justify-end gap-1">
                                        <div className="w-3 h-8 bg-[#3E2723] rounded-full shadow-inner"></div>
                                        {marks[i] === 'II' && <div className="w-3 h-8 bg-[#3E2723] rounded-full shadow-inner"></div>}
                                    </div>
                                ) : (
                                    <span className="w-2 h-2 bg-[#3E2723]/20 rounded-full"></span>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Left Leg (Mão Esquerda - 5, 6, 7, 8) */}
                    <div className="flex flex-col gap-3 items-start">
                         {[4, 5, 6, 7].map(i => (
                            <div key={`l-${i}`} className="h-8 flex items-center justify-start w-full">
                                {marks[i] ? (
                                    <div className="flex justify-start gap-1">
                                        <div className="w-3 h-8 bg-[#3E2723] rounded-full shadow-inner"></div>
                                        {marks[i] === 'II' && <div className="w-3 h-8 bg-[#3E2723] rounded-full shadow-inner"></div>}
                                    </div>
                                ) : (
                                    <span className="w-2 h-2 bg-[#3E2723]/20 rounded-full"></span>
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
                    <span className="text-xs font-bold uppercase text-ifa-gold">Dá'Fa (Pegar)</span>
                </button>
            ) : (
                <div className="text-center animate-scale-in w-full px-4">
                    <div className="bg-green-900/20 border border-green-500 p-4 rounded-xl mb-6">
                        <p className="text-green-400 font-bold text-xl uppercase">Odu Revelado!</p>
                        <p className="text-xs text-green-200 mt-1">A assinatura vibracional está completa.</p>
                    </div>
                    <button onClick={reset} className="w-full py-4 border border-ifa-gold text-ifa-gold rounded-xl flex items-center justify-center gap-2 hover:bg-ifa-gold hover:text-black transition-colors font-bold uppercase">
                        <RefreshCcw size={18} /> Nova Consulta
                    </button>
                </div>
            )}
        </div>
    );
};

export default IkinDivination;
