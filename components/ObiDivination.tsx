
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Droplet, Scroll, Hand, Shield, AlertTriangle, CheckCircle2, HelpCircle, XCircle, Volume2 } from 'lucide-react';
import TextReader from './TextReader';

// Tipos baseados na anatomia do PDF
type LobeType = 'male' | 'female'; // Ako (Macho) vs Abo (Fêmea)
type LobeState = 'open' | 'closed';

interface Lobe {
    id: number;
    type: LobeType;
    state: LobeState;
}

interface ObiResult {
    name: string;
    meaning: string;
    description: string;
    isPositive: boolean | null; // null = uncertain (Etawa)
    icon: React.ReactNode;
}

// Rezas extraídas do PDF via OCR
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
    const [lobes, setLobes] = useState<Lobe[]>([
        { id: 1, type: 'male', state: 'closed' },
        { id: 2, type: 'male', state: 'closed' },
        { id: 3, type: 'female', state: 'closed' },
        { id: 4, type: 'female', state: 'closed' }
    ]);
    const [result, setResult] = useState<ObiResult | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    // Lógica de Lançamento (Anatomia)
    const castObi = () => {
        setIsAnimating(true);
        setResult(null);

        // Som de chacoalhar
        if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);

        setTimeout(() => {
            // Randomiza os estados mantendo os tipos fixos (2 machos, 2 fêmeas)
            const newLobes: Lobe[] = lobes.map(l => ({
                ...l,
                state: Math.random() > 0.5 ? 'open' : 'closed'
            }));

            setLobes(newLobes);
            interpretCast(newLobes);
            setIsAnimating(false);
            setStep('result');
        }, 1500); // Tempo da animação
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
                    icon: <CheckCircle2 size={64} className="text-white" />
                };
                break;
            case 3:
                res = {
                    name: "Etawa",
                    meaning: "INCERTO (Dúvida)",
                    description: "Resposta possível, mas influenciada por algo oculto (o gomo fechado). É necessário lançar novamente para confirmar.",
                    isPositive: null, // Requer novo lançamento
                    icon: <HelpCircle size={64} className="text-yellow-400" />
                };
                break;
            case 2:
                res = {
                    name: "Ejife",
                    meaning: "SIM DEFINITIVO (Equilíbrio)",
                    description: "O maior Sim do oráculo. Equilíbrio perfeito entre luz e sombra (2 abertos, 2 fechados). Não precisa de confirmação. Estabilidade suprema.",
                    isPositive: true,
                    icon: <CheckCircle2 size={64} className="text-green-400" />
                };
                break;
            case 1:
                res = {
                    name: "Okanran",
                    meaning: "NÃO (Bloqueio)",
                    description: "Caminho fechado. Ausência de luz. O esforço pode falhar devido à falta de dedicação ou bloqueios externos. Cuidado com obstáculos.",
                    isPositive: false,
                    icon: <XCircle size={64} className="text-red-400" />
                };
                break;
            case 0:
                res = {
                    name: "Oyeku",
                    meaning: "NÃO ABSOLUTO (Escuridão/Proteção)",
                    description: "Bloqueio total ou proteção extrema contra um mal invisível. Paradoxalmente, pode significar o fim de um sofrimento ou um aviso grave.",
                    isPositive: false,
                    icon: <Shield size={64} className="text-gray-500" />
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

    // Renderizador Visual do Gomo (Lobe)
    const LobeVisual = ({ lobe }: { lobe: Lobe }) => {
        if (lobe.state === 'closed') {
            // Lado convexo (casca)
            return (
                <div className="w-20 h-24 bg-gradient-to-br from-[#3E2723] to-[#2d1b18] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-lg border border-[#5D4037] flex items-center justify-center relative transform rotate-12">
                    <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                </div>
            );
        } else {
            // Lado côncavo (interno)
            return (
                <div className="w-20 h-24 bg-[#F5F5DC] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-inner border-2 border-[#D4AF37] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Distinção Macho vs Fêmea */}
                    {lobe.type === 'male' ? (
                        // Macho: Linha única (Cunha)
                        <div className="h-16 w-1 bg-[#5D4037] opacity-60 rounded-full"></div>
                    ) : (
                        // Fêmea: Linha dupla/Y (Split)
                        <div className="relative h-16 w-full flex justify-center">
                            <div className="h-10 w-1 bg-[#5D4037] opacity-60 rounded-full absolute top-6"></div>
                            <div className="h-6 w-1 bg-[#5D4037] opacity-60 rounded-full absolute top-0 left-[45%] rotate-[-20deg]"></div>
                            <div className="h-6 w-1 bg-[#5D4037] opacity-60 rounded-full absolute top-0 right-[45%] rotate-[20deg]"></div>
                        </div>
                    )}
                    <span className="absolute bottom-2 text-[8px] font-bold text-[#5D4037] uppercase">{lobe.type === 'male' ? 'Ako' : 'Abo'}</span>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            
            {/* Header */}
            <div className="w-full max-w-md flex items-center justify-between mb-6">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold">Obi Abata (Oráculo)</h1>
                <div className="w-6"></div>
            </div>

            {/* INTRODUÇÃO */}
            {step === 'intro' && (
                <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
                    <div className="bg-ifa-base border border-ifa-border p-6 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-serif text-ifa-gold mb-4">"Aquele que dá Obi, dá a vida."</h2>
                        <p className="text-ifa-text-light mb-4 leading-relaxed">
                            A adivinhação com Obi Abata é a comunicação direta com Ori e os Ancestrais. 
                            Este módulo segue estritamente o tratado tradicional, utilizando os 4 gomos (Iya Obi).
                        </p>
                        <div className="bg-black/20 p-4 rounded text-sm text-ifa-neutral text-left border-l-2 border-red-500">
                            <strong>Nota Importante:</strong> Nunca faça adivinhação para outra pessoa sem permissão dos Anciãos. 
                            Este oráculo é para consulta pessoal ao seu próprio Ori e Egun.
                        </div>
                    </div>
                    <button 
                        onClick={() => setStep('ritual')}
                        className="w-full bg-ifa-gold text-ifa-base font-bold py-4 rounded-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2"
                    >
                        <Droplet size={20} /> Iniciar Ritual de Abertura
                    </button>
                </div>
            )}

            {/* RITUAL GUIADO */}
            {step === 'ritual' && (
                <div className="max-w-md w-full flex-grow flex flex-col justify-center animate-fade-in">
                    <div className="text-center mb-2">
                        <span className="text-xs font-bold uppercase text-ifa-neutral">Passo {ritualIndex + 1} de {RITUAL_STEPS.length}</span>
                        <div className="w-full h-1 bg-gray-700 mt-2 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-ifa-gold transition-all duration-500" 
                                style={{ width: `${((ritualIndex + 1) / RITUAL_STEPS.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-ifa-base border border-ifa-gold/30 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Scroll size={100} className="text-ifa-gold" />
                        </div>
                        
                        <h2 className="text-2xl font-serif text-ifa-gold mb-4 relative z-10">{RITUAL_STEPS[ritualIndex].title}</h2>
                        
                        <p className="text-ifa-text mb-6 italic relative z-10">
                            "{RITUAL_STEPS[ritualIndex].instruction}"
                        </p>

                        <div className="bg-black/30 p-4 rounded-xl border-l-4 border-ifa-wood mb-6 relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-ifa-gold text-sm font-bold uppercase">Yoruba</h3>
                                <TextReader text={RITUAL_STEPS[ritualIndex].yoruba} forceLang="yo-NG" />
                            </div>
                            <p className="text-lg font-serif mb-4 leading-relaxed">{RITUAL_STEPS[ritualIndex].yoruba}</p>
                            
                            <h3 className="text-ifa-neutral text-xs font-bold uppercase mb-1">Tradução</h3>
                            <p className="text-sm text-gray-300">{RITUAL_STEPS[ritualIndex].translation}</p>
                        </div>

                        <button 
                            onClick={nextRitualStep}
                            className="w-full bg-ifa-wood text-white py-3 rounded-lg font-bold uppercase hover:bg-ifa-gold hover:text-black transition-colors"
                        >
                            {ritualIndex < RITUAL_STEPS.length - 1 ? "Próximo Passo" : "Iniciar Consulta"}
                        </button>
                    </div>
                </div>
            )}

            {/* MESA DE JOGO (CASTING & RESULT) */}
            {(step === 'casting' || step === 'result') && (
                <div className="w-full max-w-md flex flex-col items-center">
                    
                    {/* OBI DISPLAY */}
                    <div className="w-full aspect-square bg-[#2E150F] rounded-full border-8 border-[#5D4037] shadow-2xl relative flex items-center justify-center mb-8 overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                        
                        <div className={`grid grid-cols-2 gap-8 z-10 transition-all duration-500 ${isAnimating ? 'animate-spin-slow blur-sm scale-90' : 'scale-100'}`}>
                            {lobes.map(lobe => (
                                <div key={lobe.id} className="transform transition-transform duration-700 hover:scale-105">
                                    <LobeVisual lobe={lobe} />
                                </div>
                            ))}
                        </div>

                        {step === 'casting' && !isAnimating && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                                <button 
                                    onClick={castObi}
                                    className="bg-ifa-gold text-ifa-base px-8 py-4 rounded-full font-bold uppercase text-xl shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-110 transition-transform animate-pulse"
                                >
                                    Lançar
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RESULT CARD */}
                    {step === 'result' && result && (
                        <div className="w-full animate-slide-up">
                            <div className={`bg-ifa-base border-t-4 p-6 rounded-xl shadow-2xl ${result.name === 'Oyeku' || result.name === 'Okanran' ? 'border-red-500' : result.name === 'Etawa' ? 'border-yellow-500' : 'border-green-500'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-3xl font-serif font-bold text-ifa-text">{result.name}</h2>
                                        <p className={`text-sm font-bold uppercase tracking-widest ${result.name === 'Etawa' ? 'text-yellow-400' : result.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {result.meaning}
                                        </p>
                                    </div>
                                    <div className="opacity-80">{result.icon}</div>
                                </div>

                                <p className="text-ifa-text-light leading-relaxed mb-6 border-l-2 border-ifa-border pl-4 text-sm md:text-base">
                                    {result.description}
                                </p>

                                {/* AÇÃO SUGERIDA */}
                                {result.name === 'Etawa' ? (
                                    <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg mb-4 text-center">
                                        <p className="text-yellow-200 font-bold text-sm mb-2 uppercase flex items-center justify-center gap-2">
                                            <AlertTriangle size={16}/> Requer Confirmação
                                        </p>
                                        <button 
                                            onClick={castObi}
                                            className="bg-yellow-600 text-black px-6 py-2 rounded-full font-bold uppercase text-xs hover:bg-yellow-500"
                                        >
                                            Lançar Novamente
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => setStep('casting')}
                                            className="flex-1 py-3 border border-ifa-border text-ifa-neutral rounded-lg font-bold uppercase text-xs hover:bg-ifa-base-dark"
                                        >
                                            Nova Pergunta
                                        </button>
                                        <button 
                                            onClick={onBack}
                                            className="flex-1 py-3 bg-ifa-wood text-white rounded-lg font-bold uppercase text-xs hover:bg-ifa-gold hover:text-black"
                                        >
                                            Encerrar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ObiDivination;
