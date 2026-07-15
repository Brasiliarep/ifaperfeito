import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Check, X, Shuffle, Hand } from 'lucide-react';
import { OpeleState, OduInfo } from '../types';
import OpeleSeed from './OpeleSeed';
import { calculateOdu, valueToLeg, NAME_TO_VALUE, SIGN_NAMES } from '../utils/oduLogic';

// Ibo Items
type IboItemType = 'ota' | 'gungun' | 'aye' | 'igbin' | 'apadi';

interface IboItem {
    id: IboItemType;
    name: string;
    meaning: string;
    color: string;
    icon: string; // Emoji or simple text representation
}

const IBO_ITEMS: IboItem[] = [
    { id: 'ota', name: 'Otá (Pedra)', meaning: 'Sim / Ire / Vida', color: 'bg-stone-400', icon: '🪨' },
    { id: 'gungun', name: 'Gungun (Osso)', meaning: 'Não / Osogbo / Morte', color: 'bg-white', icon: '🦴' },
    { id: 'aye', name: 'Ayé (Búzio)', meaning: 'Sim (Dinheiro/Relacionamento)', color: 'bg-yellow-100', icon: '🐚' },
    { id: 'igbin', name: 'Igbín (Casco)', meaning: 'Não (Doença/Problema)', color: 'bg-amber-800', icon: '🐌' },
    { id: 'apadi', name: 'Apadi (Caco)', meaning: 'Perda / Derrota', color: 'bg-red-900', icon: '🧱' }
];

interface IboOracleProps {
    onBack: () => void;
    onComplete: (result: { type: 'ire' | 'osogbo', detail: string }) => void;
    initialOdu?: OduInfo; // If we are checking the orientation of a specific Odu
}

const INITIAL_OPELE: OpeleState = {
    rightLeg: ['open', 'open', 'open', 'open'],
    leftLeg: ['open', 'open', 'open', 'open'],
};

const IboOracle: React.FC<IboOracleProps> = ({ onBack, onComplete, initialOdu }) => {
    const [step, setStep] = useState<'setup' | 'selection' | 'cast1' | 'cast2' | 'result'>('setup');
    const [questionType, setQuestionType] = useState<'general' | 'health' | 'wealth' | 'love'>('general');
    const [selectedItems, setSelectedItems] = useState<[IboItem, IboItem] | null>(null);
    
    // Casting State
    const [opele1, setOpele1] = useState<OpeleState>(INITIAL_OPELE);
    const [opele2, setOpele2] = useState<OpeleState>(INITIAL_OPELE);
    const [odu1, setOdu1] = useState<OduInfo | null>(null);
    const [odu2, setOdu2] = useState<OduInfo | null>(null);
    
    // Virtual Client State
    const [virtualHandLeft, setVirtualHandLeft] = useState<IboItem | null>(null);
    const [virtualHandRight, setVirtualHandRight] = useState<IboItem | null>(null);
    const [isVirtual, setIsVirtual] = useState(true);

    // Setup default pairs based on question
    useEffect(() => {
        if (questionType === 'general') setSelectedItems([IBO_ITEMS[0], IBO_ITEMS[1]]); // Ota vs Gungun
        if (questionType === 'wealth') setSelectedItems([IBO_ITEMS[2], IBO_ITEMS[4]]); // Aye vs Apadi
        if (questionType === 'health') setSelectedItems([IBO_ITEMS[0], IBO_ITEMS[3]]); // Ota vs Igbin
        if (questionType === 'love') setSelectedItems([IBO_ITEMS[2], IBO_ITEMS[1]]); // Aye vs Gungun
    }, [questionType]);

    const handleShuffleVirtual = () => {
        if (!selectedItems) return;
        const shuffled = [...selectedItems].sort(() => Math.random() - 0.5);
        setVirtualHandLeft(shuffled[0]);
        setVirtualHandRight(shuffled[1]);
        setStep('cast1');
    };

    const toggleSeed = (leg: 'right' | 'left', index: number, setOpele: React.Dispatch<React.SetStateAction<OpeleState>>) => {
        setOpele(prev => {
            const newLeg = [...prev[leg === 'right' ? 'rightLeg' : 'leftLeg']] as any;
            newLeg[index] = newLeg[index] === 'open' ? 'closed' : 'open';
            return { ...prev, [leg === 'right' ? 'rightLeg' : 'leftLeg']: newLeg };
        });
    };

    const confirmCast1 = () => {
        setOdu1(calculateOdu(opele1));
        setStep('cast2');
    };

    const confirmCast2 = () => {
        const o2 = calculateOdu(opele2);
        setOdu2(o2);
        setStep('result');
    };

    const determineSeniority = (o1: OduInfo, o2: OduInfo): 'first' | 'second' => {
        // Simplified Seniority Logic based on standard order (Ogbe -> Oyeku -> ...)
        // In real practice, there are complex rules (Apola, etc).
        // Here we use the rank from NAME_TO_VALUE (assuming it reflects seniority or we map it).
        // Let's assume lower ID in SIGN_NAMES = Senior (Standard Ifa Order: Ogbe=15 (binary), but usually Ogbe is #1).
        // We need a reliable rank.
        
        // Let's use a mock rank for now based on the standard list order
        const ORDER = ['Ogbe', 'Oyeku', 'Iwori', 'Odi', 'Irosun', 'Owonrin', 'Obara', 'Okanran', 'Ogunda', 'Osa', 'Ika', 'Oturupon', 'Otura', 'Irete', 'Ose', 'Ofun'];
        
        const getRank = (name: string) => {
            // Handle "Ejiogbe" -> "Ogbe"
            const root = name.split(' ')[0].replace('Eji', '');
            const idx = ORDER.findIndex(n => root.includes(n));
            return idx === -1 ? 99 : idx;
        };

        const r1 = getRank(o1.name);
        const r2 = getRank(o2.name);

        // Senior is usually "Older" (Lower index in the list 1..16)
        if (r1 < r2) return 'first';
        if (r2 < r1) return 'second';
        
        // If same root (e.g. Ogbe Oyeku vs Ogbe Iwori), check second leg? 
        // For simplicity, if equal, First wins.
        return 'first';
    };

    const getResult = () => {
        if (!odu1 || !odu2 || !selectedItems) return { text: "Erro", item: null };
        
        const winner = determineSeniority(odu1, odu2);
        
        // Rule: Senior picks LEFT hand. Junior picks RIGHT hand.
        // (This is a common convention, though some lineages differ).
        
        let chosenItem: IboItem | null = null;
        let hand = '';

        if (winner === 'first') {
            // Odu 1 is Senior -> Pick Left
            chosenItem = isVirtual ? virtualHandLeft : null; // In manual mode, we ask user
            hand = 'Esquerda';
        } else {
            // Odu 2 is Senior (or Odu 1 is Junior) -> Pick Right
            chosenItem = isVirtual ? virtualHandRight : null;
            hand = 'Direita';
        }

        return { winnerOdu: winner === 'first' ? odu1 : odu2, hand, chosenItem };
    };

    const renderOpele = (opele: OpeleState, setOpele: any, label: string) => (
        <div className="flex flex-col items-center bg-black/20 p-4 rounded-xl border border-ifa-border">
            <h4 className="text-ifa-gold font-bold mb-4">{label}</h4>
            <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                    {opele.rightLeg.map((s, i) => <OpeleSeed key={i} position={i} state={s} onClick={() => toggleSeed('right', i, setOpele)} />)}
                </div>
                <div className="flex flex-col gap-2">
                    {opele.leftLeg.map((s, i) => <OpeleSeed key={i} position={i} state={s} onClick={() => toggleSeed('left', i, setOpele)} />)}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-gold"><ArrowLeft /></button>
                    <h1 className="text-2xl font-serif font-bold text-ifa-gold">Consulta com Ibó</h1>
                    <div className="w-6"></div>
                </div>

                {/* STEP 1: SETUP */}
                {step === 'setup' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-ifa-surface p-6 rounded-xl border border-ifa-border">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><HelpCircle size={20} /> O que deseja determinar?</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setQuestionType('general')} className={`p-4 rounded-lg border ${questionType === 'general' ? 'bg-ifa-gold text-black border-ifa-gold' : 'border-ifa-border hover:bg-ifa-wood'}`}>Geral (Ire/Osogbo)</button>
                                <button onClick={() => setQuestionType('wealth')} className={`p-4 rounded-lg border ${questionType === 'wealth' ? 'bg-ifa-gold text-black border-ifa-gold' : 'border-ifa-border hover:bg-ifa-wood'}`}>Financeiro</button>
                                <button onClick={() => setQuestionType('health')} className={`p-4 rounded-lg border ${questionType === 'health' ? 'bg-ifa-gold text-black border-ifa-gold' : 'border-ifa-border hover:bg-ifa-wood'}`}>Saúde</button>
                                <button onClick={() => setQuestionType('love')} className={`p-4 rounded-lg border ${questionType === 'love' ? 'bg-ifa-gold text-black border-ifa-gold' : 'border-ifa-border hover:bg-ifa-wood'}`}>Relacionamento</button>
                            </div>
                        </div>

                        <div className="bg-ifa-surface p-6 rounded-xl border border-ifa-border">
                            <h3 className="text-lg font-bold mb-4">Itens Selecionados</h3>
                            <div className="flex justify-center gap-8">
                                {selectedItems?.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-2">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg ${item.color} text-black`}>
                                            {item.icon}
                                        </div>
                                        <span className="font-bold">{item.name}</span>
                                        <span className="text-xs text-ifa-neutral">{item.meaning}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setIsVirtual(true)} className={`flex-1 p-4 rounded-lg border text-center font-bold ${isVirtual ? 'bg-blue-900/50 border-blue-500' : 'border-ifa-border'}`}>
                                Modo Virtual (App Esconde)
                            </button>
                            {/* Manual mode logic omitted for brevity, defaulting to virtual for now as per user request for "creating ibo" */}
                        </div>

                        <button onClick={handleShuffleVirtual} className="w-full bg-ifa-gold text-black font-bold py-4 rounded-xl text-lg uppercase tracking-widest hover:opacity-90 flex items-center justify-center gap-2">
                            <Shuffle size={20} /> Misturar e Esconder
                        </button>
                    </div>
                )}

                {/* STEP 2: CASTING */}
                {(step === 'cast1' || step === 'cast2') && (
                    <div className="space-y-6 animate-fade-in text-center">
                        <div className="bg-ifa-surface p-4 rounded-lg inline-block mb-4">
                            <p className="text-ifa-gold uppercase tracking-widest text-xs font-bold">
                                {step === 'cast1' ? 'Primeira Caída' : 'Segunda Caída'}
                            </p>
                            <p className="text-ifa-text text-sm mt-2">
                                {step === 'cast1' ? 'Jogue o Opele para perguntar ao Oráculo.' : 'Jogue novamente para determinar a senioridade.'}
                            </p>
                        </div>

                        <div className="flex justify-center">
                            {step === 'cast1' ? renderOpele(opele1, setOpele1, "1º Odu") : renderOpele(opele2, setOpele2, "2º Odu")}
                        </div>

                        <button 
                            onClick={step === 'cast1' ? confirmCast1 : confirmCast2}
                            className="w-full max-w-md bg-ifa-gold text-black font-bold py-4 rounded-xl text-lg uppercase tracking-widest hover:opacity-90 mt-8"
                        >
                            Confirmar Caída
                        </button>
                    </div>
                )}

                {/* STEP 3: RESULT */}
                {step === 'result' && odu1 && odu2 && (
                    <div className="space-y-8 animate-fade-in text-center">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-ifa-surface p-4 rounded-xl border border-ifa-border opacity-70">
                                <span className="text-xs text-ifa-neutral uppercase">1º Odu</span>
                                <h3 className="text-xl font-serif font-bold text-ifa-gold">{odu1.name}</h3>
                            </div>
                            <div className="bg-ifa-surface p-4 rounded-xl border border-ifa-border opacity-70">
                                <span className="text-xs text-ifa-neutral uppercase">2º Odu</span>
                                <h3 className="text-xl font-serif font-bold text-ifa-gold">{odu2.name}</h3>
                            </div>
                        </div>

                        <div className="bg-ifa-surface p-8 rounded-2xl border-2 border-ifa-gold shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-ifa-gold to-transparent"></div>
                            
                            <h2 className="text-ifa-neutral uppercase tracking-widest text-sm mb-4">Veredito do Ibó</h2>
                            
                            {(() => {
                                const { winnerOdu, hand, chosenItem } = getResult();
                                if (!chosenItem) return <div>Erro no cálculo</div>;
                                
                                const isIre = chosenItem.id === 'ota' || chosenItem.id === 'aye';
                                
                                return (
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="text-4xl font-serif font-bold text-white">
                                            {winnerOdu.name} é Senior
                                        </div>
                                        <div className="flex items-center gap-2 text-ifa-gold">
                                            <Hand size={24} />
                                            <span className="text-xl">Escolhe a mão {hand}</span>
                                        </div>
                                        
                                        <div className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-2xl ${chosenItem.color} text-black animate-bounce-slow`}>
                                            {chosenItem.icon}
                                        </div>
                                        
                                        <div className="text-center">
                                            <h3 className="text-3xl font-bold mb-2">{chosenItem.name}</h3>
                                            <p className={`text-xl font-bold px-6 py-2 rounded-full inline-block ${isIre ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                                                {chosenItem.meaning}
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => onComplete({ type: isIre ? 'ire' : 'osogbo', detail: chosenItem.meaning })}
                                            className="mt-4 bg-ifa-gold text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
                                        >
                                            Continuar Leitura
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IboOracle;
