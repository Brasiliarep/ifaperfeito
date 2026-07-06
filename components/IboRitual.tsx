import React, { useState } from 'react';
import { Loader2, X, HelpCircle } from 'lucide-react';
import { IreOsogboType } from '../types';

interface Props {
    onComplete: (result: IreOsogboType) => void;
    onCancel: () => void;
}

const IboRitual: React.FC<Props> = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState<'instruction' | 'waiting' | 'reveal'>('instruction');
    const [questionType, setQuestionType] = useState<'general' | 'health' | 'wealth' | 'love'>('general');
    const [result, setResult] = useState<IreOsogboType | null>(null);

    const handleChoice = (choice: 'PEDRA' | 'OSSO') => {
        setStep('waiting');
        setTimeout(() => {
            let resolved: IreOsogboType;
            if (choice === 'PEDRA') {
                if (questionType === 'health') {
                    resolved = { type: 'IRE', subType: 'Ire Aiku', description: 'Longevidade e saúde plena. Ifá abençoa com vida longa e vitalidade.' };
                } else if (questionType === 'wealth') {
                    resolved = { type: 'IRE', subType: 'Ire Aje', description: 'Prosperidade e riqueza material. Aje (Orixá da riqueza) está presente.' };
                } else if (questionType === 'love') {
                    resolved = { type: 'IRE', subType: 'Ire Iya', description: 'Amor, união e relacionamento. Forças de Oshun cercam o consulente.' };
                } else {
                    // General or fallback - select from others
                    const generalSubtypes: IreOsogboType[] = [
                        { type: 'IRE', subType: 'Ire Ogbo', description: 'Velhice com sabedoria e dignidade. O caminho é de amadurecimento.' },
                        { type: 'IRE', subType: 'Ire Omo', description: 'Bênçãos de filhos e descendência. O Ori abre caminhos para a família.' },
                        { type: 'IRE', subType: 'Ire Gbogbo', description: 'Bênçãos gerais em todos os aspectos da vida. Caminho aberto e iluminado.' },
                    ];
                    resolved = generalSubtypes[Math.floor(Math.random() * generalSubtypes.length)];
                }
            } else {
                if (questionType === 'health') {
                    const healthSubtypes: IreOsogboType[] = [
                        { type: 'OSOGBO', subType: 'Osogbo Arun', description: 'Aviso sobre doenças e enfermidades. Cuidar da saúde com prioridade.' },
                        { type: 'OSOGBO', subType: 'Osogbo Iku', description: 'Advertência sobre perdas graves e finalizações de ciclos de vida.' }
                    ];
                    resolved = healthSubtypes[Math.floor(Math.random() * healthSubtypes.length)];
                } else if (questionType === 'wealth') {
                    resolved = { type: 'OSOGBO', subType: 'Osogbo Ofo', description: 'Perdas materiais e financeiras em curso. Ebó de proteção imediato.' };
                } else if (questionType === 'love') {
                    resolved = { type: 'OSOGBO', subType: 'Osogbo Oran', description: 'Conflitos, disputas amorosas, intrigas e processos. Cautela é essencial.' };
                } else {
                    const generalOsogbo: IreOsogboType[] = [
                        { type: 'OSOGBO', subType: 'Osogbo Eyo', description: 'Alerta para tragédias, discussões públicas e luto. Atenção redobrada.' },
                        { type: 'OSOGBO', subType: 'Osogbo Gbogbo', description: 'Adversidades gerais. O caminho pede Ebó amplo e dedicação aos Orixás.' }
                    ];
                    resolved = generalOsogbo[Math.floor(Math.random() * generalOsogbo.length)];
                }
            }
            setResult(resolved);
            setStep('reveal');
        }, 2000);
    };

    const isIre = result?.type === 'IRE';

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-ifa-base border border-ifa-gold/40 rounded-2xl p-6 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto text-center animate-fade-in">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-ifa-neutral hover:text-ifa-text p-2 bg-black/20 rounded-full"
                >
                    <X size={20} />
                </button>

                {/* HEADER */}
                <div className="mb-6">
                    <span className="text-4xl">🫲</span>
                    <h2 className="text-2xl font-serif text-ifa-gold mt-2 mb-1">Jogo de Ibó</h2>
                    <p className="text-xs text-ifa-neutral uppercase tracking-widest">Ritual de Abertura — Determinação do Caminho</p>
                </div>

                {/* STEP: INSTRUCTION */}
                {step === 'instruction' && (
                    <div className="animate-fade-in">
                        {/* CATEGORY SELECTION CARD */}
                        <div className="bg-ifa-base-dark border border-ifa-border rounded-xl p-5 mb-5 text-left">
                            <h3 className="text-sm font-bold text-ifa-gold mb-3 flex items-center gap-1.5"><HelpCircle size={16} /> O que deseja determinar?</h3>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <button 
                                    onClick={() => setQuestionType('general')} 
                                    className={`py-2.5 px-3 rounded-lg border font-bold transition-all ${questionType === 'general' ? 'bg-ifa-gold text-black border-ifa-gold' : 'border-ifa-border hover:bg-white/5 text-gray-300'}`}
                                >
                                    Geral (Ire/Osogbo)
                                </button>
                                <button 
                                    onClick={() => setQuestionType('wealth')} 
                                    className={`py-2.5 px-3 rounded-lg border font-bold transition-all ${questionType === 'wealth' ? 'bg-ifa-gold text-black border-ifa-gold' : 'border-ifa-border hover:bg-white/5 text-gray-300'}`}
                                >
                                    Financeiro
                                </button>
                                <button 
                                    onClick={() => setQuestionType('health')} 
                                    className={`py-2.5 px-3 rounded-lg border font-bold transition-all ${questionType === 'health' ? 'bg-ifa-gold text-black border-ifa-gold' : 'border-ifa-border hover:bg-white/5 text-gray-300'}`}
                                >
                                    Saúde
                                </button>
                                <button 
                                    onClick={() => setQuestionType('love')} 
                                    className={`py-2.5 px-3 rounded-lg border font-bold transition-all ${questionType === 'love' ? 'bg-ifa-gold text-black border-ifa-gold' : 'border-ifa-border hover:bg-white/5 text-gray-300'}`}
                                >
                                    Relacionamento
                                </button>
                            </div>
                        </div>

                        <div className="bg-ifa-base-dark border border-ifa-border rounded-xl p-5 mb-6 text-left">
                            <p className="text-ifa-text text-sm leading-7 mb-4">
                                Antes de revelarmos o que Ifá vê, é preciso abrir o caminho com o <strong className="text-ifa-gold">Ibó</strong>.
                            </p>
                            <p className="text-ifa-neutral text-sm italic leading-7 mb-4">
                                Visualize em sua mente dois objetos sagrados diante de você:
                            </p>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 bg-ifa-base p-3 rounded-lg border border-ifa-border">
                                    <span className="text-2xl">🪨</span>
                                    <div className="text-left">
                                        <p className="font-bold text-white">MÃO DIREITA — PEDRA (Otá)</p>
                                        <p className="text-ifa-neutral text-xs">Símbolo de <strong className="text-green-400">Irê</strong> — bênção e prosperidade</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-ifa-base p-3 rounded-lg border border-ifa-border">
                                    <span className="text-2xl">🦴</span>
                                    <div className="text-left">
                                        <p className="font-bold text-white">MÃO ESQUERDA — OSSO (Gungun)</p>
                                        <p className="text-ifa-neutral text-xs">Símbolo de <strong className="text-red-400">Osogbo</strong> — desafio e advertência</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-ifa-neutral text-sm italic mt-5 text-center">
                                Feche os olhos. Respire fundo.<br />
                                <strong className="text-ifa-gold">Qual objeto sua mão sente chamar?</strong>
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleChoice('PEDRA')}
                                className="flex-1 p-5 bg-gradient-to-b from-ifa-wood to-amber-900 border border-amber-600/40 rounded-xl flex flex-col items-center gap-2 text-white hover:brightness-110 transition-all active:scale-95"
                            >
                                <span className="text-4xl">🪨</span>
                                <span className="font-bold uppercase text-sm">Pedra (Irê)</span>
                            </button>
                            <button
                                onClick={() => handleChoice('OSSO')}
                                className="flex-1 p-5 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-600/40 rounded-xl flex flex-col items-center gap-2 text-white hover:brightness-110 transition-all active:scale-95"
                            >
                                <span className="text-4xl">🦴</span>
                                <span className="font-bold uppercase text-sm">Osso (Osogbo)</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP: WAITING */}
                {step === 'waiting' && (
                    <div className="animate-fade-in py-10 flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-ifa-gold" size={48} />
                        <p className="text-ifa-gold font-serif text-lg">Ifá está consultando...</p>
                        <p className="text-ifa-neutral text-sm italic">Os ancestrais são ouvidos</p>
                    </div>
                )}

                {/* STEP: REVEAL */}
                {step === 'reveal' && result && (
                    <div className="animate-fade-in">
                        <div className={`rounded-xl p-6 mb-6 border-2 ${isIre
                                ? 'bg-green-950/60 border-green-500/50'
                                : 'bg-red-950/60 border-red-500/50'
                            }`}>
                            <p className="text-xs uppercase tracking-widest text-ifa-neutral mb-2">O Ibó Revelou</p>
                            <h3 className={`text-3xl font-serif font-bold mb-1 ${isIre ? 'text-green-400' : 'text-red-400'}`}>
                                {isIre ? '✦ IRÊ ✦' : '⚠ OSOGBO ⚠'}
                            </h3>
                            <p className={`font-bold uppercase tracking-wider mb-3 text-sm ${isIre ? 'text-green-300' : 'text-red-300'}`}>
                                {result.subType}
                            </p>
                            <p className="text-ifa-neutral text-sm leading-relaxed italic">
                                {result.description}
                            </p>
                        </div>
                        <p className="text-ifa-gold font-serif mb-6">Ifá fala agora.</p>
                        <button
                            onClick={() => onComplete(result)}
                            className="w-full bg-ifa-gold text-black py-3 px-8 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
                        >
                            Continuar com a Leitura →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IboRitual;
