
import React, { useState } from 'react';
import { ArrowLeft, Check, X, RefreshCw, AlertTriangle, Droplet, Coins, Wine, Sparkles } from 'lucide-react';
import TextReader from './TextReader';

const ItaAssistant = ({ onBack }: { onBack: () => void }) => {
    const [history, setHistory] = useState<boolean[]>([]); // true = Yes, false = No
    const [complete, setComplete] = useState(false);
    const [rejectionReason, setRejectionReason] = useState<string | null>(null);

    const currentStepIndex = history.length;

    const handleAnswer = (answer: boolean) => {
        const newHistory = [...history, answer];
        setHistory(newHistory);

        // Lógica Litúrgica Tradicional
        if (currentStepIndex === 0) {
            // Passo 1: Ebó Fin? (O céu aceitou?)
            if (answer) {
                // Se sim, pergunta se a Terra aceitou (Ebó Da)
            } 
            // Se não, passamos para investigação
        } 
        else if (currentStepIndex === 1) {
            // Se passo 0 foi SIM, passo 1 é Ebó Da?
            // Se passo 0 foi NÃO, passo 1 é Koru Oti?
            if (history[0] === true) {
                if (answer) setComplete(true); // Fin e Da = Sucesso
            } else {
                if (answer) { setRejectionReason("Falta Oti (Gim/Bebida) para esquentar."); setComplete(true); }
            }
        }
        else if (currentStepIndex === 2) {
            // Investigação continua... Koru Omi?
            if (answer) { setRejectionReason("Falta Omi (Água Fresca) para esfriar/acalmar."); setComplete(true); }
        }
        else if (currentStepIndex === 3) {
            // Koru Owo?
            if (answer) { setRejectionReason("Falta Owo (Dinheiro/Esmola) para Exu."); setComplete(true); }
        }
        else if (currentStepIndex === 4) {
            // Koru Gbigbona?
            if (answer) { setRejectionReason("Falta Gbigbona (Comida Quente/Cozida)."); setComplete(true); }
        }
        else {
            setRejectionReason("O Ebó foi totalmente rejeitado. Investigar proibições (Ewo) ou refazer a consulta com Obi.");
            setComplete(true);
        }
    };

    const reset = () => {
        setHistory([]);
        setComplete(false);
        setRejectionReason(null);
    }

    const getQuestion = () => {
        if (currentStepIndex === 0) return "Ebó Fin? (O Ebó foi aceito no Céu?)";
        
        if (history.length > 0 && history[0] === true) {
             if (currentStepIndex === 1) return "Ebó Da? (O Ebó foi aceito na Terra?)";
        }

        // Se o primeiro foi Não, entramos no diagnóstico
        if (currentStepIndex === 1) return "Koru Oti? (Falta Bebida?)";
        if (currentStepIndex === 2) return "Koru Omi? (Falta Água?)";
        if (currentStepIndex === 3) return "Koru Owo? (Falta Dinheiro?)";
        if (currentStepIndex === 4) return "Koru Gbigbona? (Falta Comida Quente?)";
        return "Há algo mais errado?";
    }

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-8 flex flex-col items-center">
            <div className="w-full flex justify-between mb-8 max-w-md">
                <button onClick={onBack}><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold">Confirmação (Ita)</h1>
                <button onClick={reset}><RefreshCw size={20} /></button>
            </div>

            <div className="w-full max-w-md bg-ifa-base border border-ifa-border rounded-xl p-8 shadow-2xl text-center min-h-[400px] flex flex-col justify-center relative">
                
                {!complete ? (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4 font-serif text-ifa-text">{getQuestion()}</h2>
                        <p className="text-sm text-ifa-neutral mb-8 italic">Use o Ibo ou Obi para obter a resposta.</p>
                        
                        <div className="flex gap-4 justify-center">
                            <button 
                                onClick={() => handleAnswer(false)}
                                className="w-32 h-32 rounded-xl bg-red-900/30 border-2 border-red-500 flex flex-col items-center justify-center gap-2 hover:bg-red-900/50 transition-all"
                            >
                                <X size={48} className="text-red-500" />
                                <span className="font-bold text-red-400">KO (Não)</span>
                            </button>

                            <button 
                                onClick={() => handleAnswer(true)}
                                className="w-32 h-32 rounded-xl bg-green-900/30 border-2 border-green-500 flex flex-col items-center justify-center gap-2 hover:bg-green-900/50 transition-all"
                            >
                                <Check size={48} className="text-green-500" />
                                <span className="font-bold text-green-400">BEE NI (Sim)</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="animate-scale-in">
                        {rejectionReason ? (
                            <div>
                                <div className="mx-auto bg-yellow-900/20 p-6 rounded-full w-32 h-32 flex items-center justify-center border-4 border-yellow-500 mb-6">
                                    <AlertTriangle size={64} className="text-yellow-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-yellow-500 mb-2">Ajuste Necessário</h2>
                                <p className="text-xl text-white mb-6">{rejectionReason}</p>
                                <div className="flex justify-center gap-4">
                                    {rejectionReason.includes('Oti') && <Wine size={32} className="text-purple-400" />}
                                    {rejectionReason.includes('Omi') && <Droplet size={32} className="text-blue-400" />}
                                    {rejectionReason.includes('Owo') && <Coins size={32} className="text-yellow-400" />}
                                </div>
                                <p className="text-sm text-ifa-neutral mt-6">Adicione o item e pergunte "Ebó Fin?" novamente.</p>
                            </div>
                        ) : (
                            <div>
                                <div className="mx-auto bg-green-900/20 p-6 rounded-full w-32 h-32 flex items-center justify-center border-4 border-green-500 mb-6 relative shadow-[0_0_30px_green]">
                                    <Check size={64} className="text-green-500" />
                                    <Sparkles className="absolute top-0 right-0 text-yellow-400 animate-spin-slow" size={24} />
                                </div>
                                <h2 className="text-3xl font-bold text-green-500 mb-2 font-serif">Ebó Fin, Ebó Da!</h2>
                                <p className="text-lg text-white mb-6">"O sacrifício foi aceito no Céu e sancionado na Terra."</p>
                                
                                <div className="bg-black/30 p-4 rounded border-l-4 border-green-500 text-left">
                                    <p className="text-xs font-bold text-green-400 uppercase mb-2">Reza de Fechamento:</p>
                                    <p className="italic text-ifa-text-light text-lg font-serif mb-2">"Ebo na a fin, a da. Odu to jade ko ni pa wa lara. Ase."</p>
                                    <div className="flex justify-end">
                                        <TextReader text="Ebo na a fin, a da. Odu to jade ko ni pa wa lara. Ase." forceLang="yo-NG" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <button onClick={reset} className="mt-8 bg-ifa-wood text-white px-8 py-3 rounded-full font-bold uppercase hover:opacity-90">
                            Reiniciar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItaAssistant;
