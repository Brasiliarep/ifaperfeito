
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Hand, AlertTriangle, CheckCircle2, RotateCcw, Search, Move } from 'lucide-react';

interface Ingredient {
    id: string;
    name: string;
    type: 'cool' | 'hot' | 'neutral'; // Concept
}

const INGREDIENTS: Ingredient[] = [
    { id: 'omi', name: 'Água (Omi)', type: 'cool' },
    { id: 'epo', name: 'Dendê (Epo)', type: 'hot' },
    { id: 'ori', name: 'Banha de Ori', type: 'cool' },
    { id: 'oti', name: 'Gim (Oti)', type: 'hot' },
    { id: 'oyin', name: 'Mel (Oyin)', type: 'cool' },
    { id: 'iyo', name: 'Sal (Iyo)', type: 'hot' }, 
    { id: 'obi', name: 'Obi', type: 'neutral' },
];

const SCENARIOS = [
    {
        name: "Acalmar Esu",
        target: "Esu",
        forbidden: ['iyo', 'oyin'], 
        required: ['epo', 'oti', 'omi'],
        description: "Esu está agitado. Prepare um Padê para acalmá-lo e abrir caminhos."
    },
    {
        name: "Agradar Obatala",
        target: "Obatala",
        forbidden: ['epo', 'oti', 'iyo'],
        required: ['omi', 'ori', 'obi'],
        description: "Obatala exige pureza e brancura. Cuidado com o que usa."
    },
    {
        name: "Oferenda para Ogun",
        target: "Ogun",
        forbidden: ['ori', 'oyin'],
        required: ['epo', 'oti', 'iyo'],
        description: "Ogun precisa de força para vencer a guerra. Use elementos quentes."
    },
    {
        name: "Adoçar Osun",
        target: "Osun",
        forbidden: ['epo'], // Simplified view for simulation
        required: ['oyin', 'omi', 'obi'],
        description: "Osun traz amor e riqueza. Use doçura."
    }
];

const EboSimulator = ({ onBack }: { onBack: () => void }) => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [bowl, setBowl] = useState<Ingredient[]>([]);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [status, setStatus] = useState<'neutral' | 'success' | 'fail'>('neutral');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Filter scenarios logic
    const filteredScenarios = useMemo(() => {
        if (!searchTerm) return SCENARIOS;
        return SCENARIOS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    // Use selected or default to first valid
    const activeScenario = filteredScenarios.length > 0 
        ? filteredScenarios[currentScenarioIndex % filteredScenarios.length] 
        : null;

    const addToBowl = (ing: Ingredient) => {
        if (status !== 'neutral' || !activeScenario) return;
        
        if (activeScenario.forbidden.includes(ing.id)) {
            setFeedback(`EWO! (Tabu). ${activeScenario.target} rejeita ${ing.name} neste momento! O Ebó foi quebrado.`);
            setStatus('fail');
            return;
        }

        const newBowl = [...bowl, ing];
        setBowl(newBowl);

        const hasAllRequired = activeScenario.required.every(req => newBowl.some(i => i.id === req));
        if (hasAllRequired) {
            setFeedback(`Aṣẹ! Você completou a oferenda corretamente para ${activeScenario.target}.`);
            setStatus('success');
        } else {
            setFeedback(`Adicionado ${ing.name}. Continue...`);
        }
    };

    const reset = () => {
        setBowl([]);
        setFeedback(null);
        setStatus('neutral');
    };

    const nextScenario = () => {
        setCurrentScenarioIndex((prev) => prev + 1);
        reset();
    }

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-6">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Move size={20}/> Simulador de Ebó</h1>
                <div className="w-6"></div>
            </div>

            {/* SEARCH AND SELECTOR */}
            <div className="w-full max-w-md mb-6">
                <div className="relative mb-2">
                    <input 
                        placeholder="Buscar cenário (Ex: Ogun, Obatala)..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentScenarioIndex(0); reset(); }}
                        className="w-full bg-ifa-base border border-ifa-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-ifa-gold outline-none"
                    />
                    <Search className="absolute left-3 top-3.5 text-ifa-neutral" size={18} />
                </div>
                
                <button 
                    onClick={nextScenario} 
                    className="w-full py-2 bg-ifa-wood/20 border border-ifa-wood/50 rounded text-xs font-bold uppercase text-ifa-neutral hover:text-white hover:border-ifa-gold"
                >
                    Trocar Cenário ({filteredScenarios.length} disponíveis)
                </button>
            </div>

            {activeScenario ? (
                <div className="w-full max-w-md bg-ifa-base p-6 rounded-xl border border-ifa-border text-center mb-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-ifa-text mb-2">{activeScenario.name}</h2>
                    <p className="text-sm text-ifa-neutral mb-4">{activeScenario.description}</p>
                    
                    {/* THE BOWL */}
                    <div className={`w-48 h-48 mx-auto rounded-full border-4 flex items-center justify-center relative overflow-hidden transition-all ${status === 'fail' ? 'border-red-600 bg-red-900/20' : status === 'success' ? 'border-green-500 bg-green-900/20' : 'border-ifa-wood bg-black/20'}`}>
                        {status === 'fail' && <AlertTriangle size={64} className="text-red-500 opacity-50" />}
                        {status === 'success' && <CheckCircle2 size={64} className="text-green-500 opacity-50" />}
                        
                        <div className="absolute bottom-4 flex flex-wrap justify-center gap-1 w-3/4">
                            {bowl.map((ing, idx) => (
                                <span key={idx} className="w-2 h-2 rounded-full bg-ifa-text" title={ing.name}></span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 h-12 flex items-center justify-center">
                        <p className={`font-bold ${status === 'fail' ? 'text-red-400' : status === 'success' ? 'text-green-400' : 'text-ifa-gold'}`}>
                            {feedback || "Adicione os ingredientes na ordem correta."}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center text-ifa-neutral">Nenhum cenário encontrado.</div>
            )}

            <div className="grid grid-cols-4 gap-4 max-w-md w-full">
                {INGREDIENTS.map(ing => (
                    <button 
                        key={ing.id}
                        onClick={() => addToBowl(ing)}
                        disabled={status !== 'neutral' || !activeScenario}
                        className="bg-ifa-surface p-3 rounded-lg flex flex-col items-center gap-2 border border-ifa-border hover:border-ifa-gold disabled:opacity-50 transition-colors"
                    >
                        <div className={`w-8 h-8 rounded-full ${ing.type === 'hot' ? 'bg-red-900' : ing.type === 'cool' ? 'bg-blue-900' : 'bg-gray-700'}`}></div>
                        <span className="text-[10px] text-center font-bold">{ing.name.split(' ')[0]}</span>
                    </button>
                ))}
            </div>

            {status !== 'neutral' && (
                <button onClick={reset} className="mt-8 flex items-center gap-2 bg-ifa-wood text-white px-6 py-3 rounded font-bold uppercase">
                    <RotateCcw size={18} /> Tentar Novamente
                </button>
            )}
        </div>
    );
};

export default EboSimulator;
