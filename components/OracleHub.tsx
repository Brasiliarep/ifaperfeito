
import React, { useState } from 'react';
import { ArrowLeft, CircleDot, Hand, GripHorizontal, CheckSquare } from 'lucide-react';
import ObiDivination from './ObiDivination';
import IboOracle from './IboOracle';
import ItaAssistant from './ItaAssistant';

const OracleHub = ({ onBack, isStudent }: { onBack: () => void, isStudent?: boolean }) => {
    const [activeOracle, setActiveOracle] = useState<'menu' | 'obi' | 'ibo' | 'ita'>('menu');
    const [iboResult, setIboResult] = useState<{ type: 'ire' | 'osogbo', detail: string } | null>(null);

    const handleIboComplete = (result: { type: 'ire' | 'osogbo', detail: string }) => {
        setIboResult(result);
        setActiveOracle('menu');
    };

    if (activeOracle === 'obi') return <ObiDivination onBack={() => setActiveOracle('menu')} />;
    if (activeOracle === 'ibo') return <IboOracle onBack={() => setActiveOracle('menu')} onComplete={handleIboComplete} />;
    if (activeOracle === 'ita') return <ItaAssistant onBack={() => setActiveOracle('menu')} />;

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft size={24} /></button>
                <h1 className="text-2xl font-serif text-ifa-gold">Oráculos Sagrados</h1>
                <div className="w-6"></div>
            </div>

            <div className="grid gap-6 w-full max-w-md">
                <button 
                    onClick={() => setActiveOracle('obi')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group shadow-lg"
                >
                    <div className="bg-[#D4AF37]/20 text-[#D4AF37] p-4 rounded-full group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                        <CircleDot size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-xl text-ifa-text">Obi Abata</h3>
                        <p className="text-xs text-ifa-neutral mt-1">Comunicação direta (4 gomos). Perguntas do dia a dia.</p>
                    </div>
                </button>

                <button 
                    onClick={() => setActiveOracle('ibo')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group shadow-lg"
                >
                    <div className="bg-blue-900/30 text-blue-400 p-4 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Hand size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-xl text-ifa-text">Ibo (Sim/Não)</h3>
                        <p className="text-xs text-ifa-neutral mt-1">Tira-teima rápido durante a consulta (Mão Esquerda/Direita).</p>
                    </div>
                </button>



                {!isStudent && (
                    <button 
                        onClick={() => setActiveOracle('ita')}
                        className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group shadow-lg"
                    >
                        <div className="bg-green-900/30 text-green-400 p-4 rounded-full group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <CheckSquare size={32} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-xl text-ifa-text">Confirmação de Ebó (Ita)</h3>
                            <p className="text-xs text-ifa-neutral mt-1">Assistente para verificar se a oferenda foi aceita.</p>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default OracleHub;
