import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Droplet, Scroll, Hand, Shield, AlertTriangle, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import TextReader from './TextReader';

// Tipos baseados na anatomia tradicional do Obi Abata
type LobeType = 'male' | 'female'; // Ako (Macho) vs Abo (Fêmea)
type LobeState = 'open' | 'closed';

interface Lobe {
    id: number;
    type: LobeType;
    state: LobeState;
    rotation: number;
    offsetX: number;
    offsetY: number;
}

interface ObiResult {
    name: string;
    meaning: string;
    description: string;
    isPositive: boolean | null; // null = incerto (Etawa)
    icon: React.ReactNode;
}

// Rezas e etapas rituais tradicionais
const RITUAL_STEPS = [
    {
        title: "Preparação com Água",
        instruction: "Mergulhe o dedo médio na água fresca. Toque sua testa, topo da cabeça, nuca e umbigo. Depois, polvilhe água no chão para os Ancestrais.",
        yoruba: "Omi Tutu, Ona Tutu, Ile Tutu.",
        translation: "Água fresca, caminho fresco, casa fresca."
    },
    {
        title: "Invocação (Adura)",
        instruction: "Segure os 4 gomos de Obi. Invoque seu Ori ou Ancestrais:",
        yoruba: "Ori (ou Egun) mo pe o!\nOri fun mi ni ire.\nOri fun mi ni alaafia.\nOri fun mi ni ilera.\nOri fun mi ni Iwa Pele.\nModupe, modupe pupo.\nAse!",
        translation: "Ori, eu te chamo!\nOri, me traga boa sorte.\nOri, me traga bem-estar.\nOri, me traga estabilidade.\nOri, me traga bom caráter.\nEu agradeço muito. Axé!"
    },
    {
        title: "Proteção (Ofo)",
        instruction: "Reze para afastar o negativo antes de perguntar:",
        yoruba: "Obi ni ibi iku\nObi ni ibi arun\nObi ni ibi ofo\nAse! Ase! Ase O!",
        translation: "Obi evite a morte.\nObi evite a doença.\nObi evite as perdas.\nQue assim seja e assim se faça."
    },
    {
        title: "Abertura Final",
        instruction: "Lance o chamado para as forças divinas no Céu:",
        yoruba: "Akinmoran!",
        translation: "Que as forças divinas do Céu ajudem o adivinho na Terra!"
    }
];

const ObiDivination = ({ onBack }: { onBack: () => void }) => {
    const [step, setStep] = useState<'intro' | 'ritual' | 'casting' | 'result'>('intro');
    const [ritualIndex, setRitualIndex] = useState(0);
    
    // Initial lobes with natural, organic offset/rotation
    const [lobes, setLobes] = useState<Lobe[]>([
        { id: 1, type: 'male', state: 'closed', rotation: 25, offsetX: -8, offsetY: -10 },
        { id: 2, type: 'male', state: 'closed', rotation: 110, offsetX: 10, offsetY: -5 },
        { id: 3, type: 'female', state: 'closed', rotation: -45, offsetX: -5, offsetY: 12 },
        { id: 4, type: 'female', state: 'closed', rotation: 175, offsetX: 8, offsetY: 8 }
    ]);
    
    const [result, setResult] = useState<ObiResult | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    const castObi = () => {
        setIsAnimating(true);
        setResult(null);

        if (navigator.vibrate) navigator.vibrate([60, 40, 60, 40, 120]);

        setTimeout(() => {
            // Randomize state, scatter offsets, and rotations to feel physically cast on a plate
            const newLobes: Lobe[] = lobes.map(l => ({
                ...l,
                state: Math.random() > 0.5 ? 'open' : 'closed',
                rotation: Math.floor(Math.random() * 360),
                offsetX: Math.floor(Math.random() * 24) - 12, // -12px to +12px
                offsetY: Math.floor(Math.random() * 24) - 12  // -12px to +12px
            }));

            setLobes(newLobes);
            interpretCast(newLobes);
            setIsAnimating(false);
            setStep('result');
        }, 1400);
    };

    const interpretCast = (currentLobes: Lobe[]) => {
        const openCount = currentLobes.filter(l => l.state === 'open').length;
        let res: ObiResult;

        switch (openCount) {
            case 4:
                res = {
                    name: "Alaafia",
                    meaning: "SIM (Paz e Tranquilidade)",
                    description: "Todas as energias estão abertas e fluindo. Instiga a avançar com foco e calma. Cuidado: às vezes sugere estabilidade inconstante.",
                    isPositive: true,
                    icon: <CheckCircle2 size={56} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                };
                break;
            case 3:
                res = {
                    name: "Etawa",
                    meaning: "INCERTO (Dúvida)",
                    description: "Resposta possível, mas influenciada por algo oculto (o gomo fechado). É necessário lançar novamente para confirmar.",
                    isPositive: null,
                    icon: <HelpCircle size={56} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]" />
                };
                break;
            case 2:
                res = {
                    name: "Ejife",
                    meaning: "SIM DEFINITIVO (Equilíbrio)",
                    description: "O maior Sim do oráculo. Equilíbrio perfeito entre luz e sombra (2 abertos, 2 fechados). Não precisa de confirmação. Estabilidade suprema.",
                    isPositive: true,
                    icon: <CheckCircle2 size={56} className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]" />
                };
                break;
            case 1:
                res = {
                    name: "Okanran",
                    meaning: "NÃO (Bloqueio)",
                    description: "Caminho fechado. Ausência de luz. O esforço pode falhar devido à falta de dedicação ou bloqueios externos. Cuidado com obstáculos.",
                    isPositive: false,
                    icon: <XCircle size={56} className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.4)]" />
                };
                break;
            case 0:
                res = {
                    name: "Oyeku",
                    meaning: "NÃO ABSOLUTO (Escuridão/Proteção)",
                    description: "Bloqueio total ou proteção extrema contra um mal invisível. Paradoxalmente, pode significar o fim de um sofrimento ou um aviso grave.",
                    isPositive: false,
                    icon: <Shield size={56} className="text-slate-400 drop-shadow-[0_0_10px_rgba(148,163,184,0.4)]" />
                };
                break;
            default:
                res = { name: "Erro", meaning: "Erro", description: "", isPositive: false, icon: <AlertTriangle /> };
        }

        setResult(res);
        setHistory(prev => [res.name, ...prev]);
    };

    const nextRitualStep = () => {
        if (ritualIndex < RITUAL_STEPS.length - 1) {
            setRitualIndex(prev => prev + 1);
        } else {
            setStep('casting');
        }
    };

    // Renderizador Visual do Gomo do Obi (Lobe)
    const LobeVisual = ({ lobe }: { lobe: Lobe }) => {
        const style = {
            transform: `rotate(${lobe.rotation}deg) translate(${lobe.offsetX}px, ${lobe.offsetY}px)`,
            transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
        };

        if (lobe.state === 'closed') {
            return (
                <div style={style} className="w-20 h-24 md:w-24 md:h-28 relative flex items-center justify-center filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.65)]">
                    <img 
                        src="./obi_real_closed.png" 
                        alt="Obi Fechado (Casca)" 
                        className="w-full h-full object-contain pointer-events-none" 
                        onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=200';
                        }}
                    />
                </div>
            );
        } else {
            const imgSrc = lobe.type === 'male' ? './obi_real_open_male.png' : './obi_real_open_female.png';
            return (
                <div style={style} className="w-20 h-24 md:w-24 md:h-28 relative flex flex-col items-center justify-center filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.65)]">
                    <img 
                        src={imgSrc} 
                        alt={`${lobe.type === 'male' ? 'Ako' : 'Abo'} Aberto`} 
                        className="w-full h-full object-contain pointer-events-none"
                        onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=200';
                        }}
                    />
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0c0a07] via-[#050505] to-black text-ifa-text p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Custom Animation Keyframes */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin-slow-opon {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow-opon {
                    animation: spin-slow-opon 20s linear infinite;
                }
            `}} />

            {/* Header */}
            <div className="w-full max-w-md flex items-center justify-between mb-6 z-10">
                <button 
                    onClick={onBack} 
                    className="text-ifa-neutral hover:text-ifa-gold p-2 rounded-full bg-white/5 border border-white/10 hover:border-ifa-gold/50 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-serif text-ifa-gold tracking-widest font-bold">Obi Abata (Oráculo)</h1>
                <div className="w-8"></div>
            </div>

            {/* INTRODUÇÃO */}
            {step === 'intro' && (
                <div className="max-w-md w-full text-center space-y-6 animate-fade-in z-10">
                    <div className="bg-ifa-base border border-ifa-gold/20 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ifa-gold to-yellow-700"></div>
                        <h2 className="text-xl md:text-2xl font-serif text-ifa-gold mb-4 mt-2">"Aquele que dá Obi, dá a vida."</h2>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            A adivinhação com Obi Abata é a comunicação direta com Ori e os Ancestrais. 
                            Este módulo segue estritamente o tratado tradicional, utilizando os 4 gomos naturais (2 masculinos/Ako e 2 femininos/Abo) de Obi Abata avermelhados.
                        </p>
                        <div className="bg-black/40 p-4 rounded-xl text-xs text-ifa-neutral text-left border-l-2 border-ifa-gold/50">
                            <strong>Nota Importante:</strong> Nunca faça adivinhação para outra pessoa sem permissão dos Anciãos. 
                            Este oráculo é para consulta pessoal ao seu próprio Ori e Egun.
                        </div>
                    </div>
                    <button 
                        onClick={() => setStep('ritual')}
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold py-4 rounded-xl uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <Droplet size={18} /> Iniciar Ritual de Abertura
                    </button>
                </div>
            )}

            {/* RITUAL GUIADO */}
            {step === 'ritual' && (
                <div className="max-w-md w-full flex-grow flex flex-col justify-center animate-fade-in z-10">
                    <div className="text-center mb-4">
                        <span className="text-xs font-bold uppercase text-ifa-neutral">Passo {ritualIndex + 1} de {RITUAL_STEPS.length}</span>
                        <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-ifa-gold transition-all duration-500" 
                                style={{ width: `${((ritualIndex + 1) / RITUAL_STEPS.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-ifa-base border border-ifa-gold/25 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Scroll size={120} className="text-ifa-gold" />
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-serif text-ifa-gold mb-3 relative z-10">{RITUAL_STEPS[ritualIndex].title}</h2>
                        
                        <p className="text-gray-300 text-sm mb-5 italic relative z-10 leading-relaxed">
                            "{RITUAL_STEPS[ritualIndex].instruction}"
                        </p>

                        <div className="bg-black/40 p-4 rounded-xl border-l-4 border-ifa-gold mb-6 relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-ifa-gold text-[10px] font-bold uppercase tracking-wider">Yoruba</h3>
                                <TextReader text={RITUAL_STEPS[ritualIndex].yoruba} forceLang="yo-NG" />
                            </div>
                            <p className="text-base font-serif mb-4 leading-relaxed italic text-white whitespace-pre-line">{RITUAL_STEPS[ritualIndex].yoruba}</p>
                            
                            <h3 className="text-ifa-neutral text-[10px] font-bold uppercase tracking-wider mb-1">Tradução</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{RITUAL_STEPS[ritualIndex].translation}</p>
                        </div>

                        <button 
                            onClick={nextRitualStep}
                            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 rounded-lg font-bold uppercase hover:opacity-90 transition-opacity"
                        >
                            {ritualIndex < RITUAL_STEPS.length - 1 ? "Próximo Passo" : "Iniciar Consulta"}
                        </button>
                    </div>
                </div>
            )}

            {/* MESA DE JOGO (CASTING & RESULT) */}
            {(step === 'casting' || step === 'result') && (
                <div className="w-full max-w-md flex flex-col items-center z-10">
                    
                    {/* OBI DISPLAY (Polished Wood Opon Ifá Tray) */}
                    <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] flex-shrink-0 aspect-square rounded-full border-[10px] border-[#3e1b12] bg-gradient-to-br from-[#2a130c] via-[#1a0805] to-black shadow-2xl relative flex items-center justify-center mb-8 overflow-hidden">
                        
                        {/* High-quality wood ring overlay */}
                        <div className="absolute inset-0 opacity-40 rounded-full border-[4px] border-[#5d2b1d]/30 pointer-events-none"></div>
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(196,158,48,0.15),_transparent)] pointer-events-none"></div>

                        {/* Lobes list */}
                        <div className={`grid grid-cols-2 gap-x-12 gap-y-12 z-10 transition-all duration-500 ${isAnimating ? 'animate-spin-slow blur-[2px] scale-90' : 'scale-100'}`}>
                            {lobes.map(lobe => (
                                <div key={lobe.id} className="w-20 h-24 md:w-24 md:h-28 flex items-center justify-center">
                                    <LobeVisual lobe={lobe} />
                                </div>
                            ))}
                        </div>

                        {/* Cast button overlay on casting step */}
                        {step === 'casting' && !isAnimating && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-xs z-20">
                                <button 
                                    onClick={castObi}
                                    className="bg-ifa-gold text-black px-8 py-3.5 rounded-full font-bold uppercase text-sm shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-105 transition-all animate-pulse tracking-widest"
                                >
                                    Lançar Obi
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RESULT CARD */}
                    {step === 'result' && result && (
                        <div className="w-full animate-slide-up px-2">
                            <div className={`bg-black/60 border border-ifa-gold/20 border-t-4 p-5 md:p-6 rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden ${
                                result.name === 'Oyeku' || result.name === 'Okanran' 
                                ? 'border-t-red-500' 
                                : result.name === 'Etawa' 
                                ? 'border-t-yellow-500' 
                                : 'border-t-green-500'
                            }`}>
                                {/* Golden Top Accent */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ifa-gold to-transparent"></div>

                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-ifa-border/30">
                                    <div>
                                        <h2 className="text-2xl font-serif font-bold text-ifa-gold leading-none">{result.name}</h2>
                                        <p className={`text-[10px] font-bold uppercase tracking-wider mt-1.5 ${
                                            result.name === 'Etawa' 
                                            ? 'text-yellow-400' 
                                            : result.isPositive 
                                            ? 'text-green-400' 
                                            : 'text-red-400'
                                        }`}>
                                            {result.meaning}
                                        </p>
                                    </div>
                                    <div className="opacity-80 p-2 bg-white/5 rounded-full border border-white/10">{result.icon}</div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-4 text-xs md:text-sm">
                                    {result.description}
                                </p>

                                {/* DETAILED LOBES BREAKDOWN */}
                                <div className="mt-4 pt-3 border-t border-ifa-border/20">
                                    <span className="text-[9px] uppercase tracking-widest text-ifa-neutral font-bold block mb-2">Gomos Lançados</span>
                                    <div className="grid grid-cols-4 gap-2 bg-black/35 p-2.5 rounded-xl border border-ifa-gold/15">
                                        {lobes.map((l, i) => (
                                            <div key={l.id} className="flex flex-col items-center text-center">
                                                <span className="text-[8px] text-ifa-neutral uppercase font-bold">Gomo {i+1}</span>
                                                <span className="text-[9px] font-serif font-bold text-white mt-0.5">
                                                    {l.type === 'male' ? 'Ako (M)' : 'Abo (F)'}
                                                </span>
                                                <span className={`text-[8px] font-bold mt-1 px-1 py-0.5 rounded leading-none ${
                                                    l.state === 'open' 
                                                    ? 'bg-green-950/40 text-green-300 border border-green-500/20' 
                                                    : 'bg-amber-950/40 text-amber-300 border border-amber-500/20'
                                                }`}>
                                                    {l.state === 'open' ? 'Aberto' : 'Fechado'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SUGGESTED ACTION / CTA */}
                                <div className="mt-5">
                                    {result.name === 'Etawa' ? (
                                        <div className="bg-yellow-950/20 border border-yellow-700/50 p-4 rounded-xl text-center">
                                            <p className="text-yellow-200 font-bold text-xs mb-3 uppercase flex items-center justify-center gap-2 tracking-widest leading-none">
                                                <AlertTriangle size={14}/> Requer Confirmação
                                            </p>
                                            <button 
                                                onClick={castObi}
                                                className="bg-yellow-600 text-black px-6 py-2 rounded-full font-bold uppercase text-[10px] hover:bg-yellow-500 transition-colors tracking-widest"
                                            >
                                                Jogar Novamente
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-4">
                                            <button 
                                                onClick={() => setStep('casting')}
                                                className="flex-1 py-3 border border-ifa-border text-ifa-neutral rounded-lg font-bold uppercase text-[10px] hover:bg-white/5 hover:text-white transition-colors tracking-widest"
                                            >
                                                Outra Pergunta
                                            </button>
                                            <button 
                                                onClick={onBack}
                                                className="flex-1 py-3 bg-ifa-wood text-white rounded-lg font-bold uppercase text-[10px] hover:bg-ifa-gold hover:text-black transition-colors tracking-widest"
                                            >
                                                Encerrar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ObiDivination;
