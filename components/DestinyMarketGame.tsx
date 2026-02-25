
import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Coins, Heart, Brain, AlertTriangle, CheckCircle2, TrendingUp, User } from 'lucide-react';

interface Item {
    id: string;
    name: string;
    cost: number;
    power: 'health' | 'wisdom' | 'protection' | 'wealth';
    value: number; // How much points it restores
    icon: string;
}

const MARKET_ITEMS: Item[] = [
    { id: 'obi', name: 'Obi Abata', cost: 10, power: 'wisdom', value: 15, icon: '🥥' },
    { id: 'water', name: 'Água (Omi)', cost: 5, power: 'health', value: 10, icon: '💧' },
    { id: 'gin', name: 'Gim (Oti)', cost: 15, power: 'protection', value: 20, icon: '🍶' },
    { id: 'goat', name: 'Cabrito (Ewure)', cost: 100, power: 'wealth', value: 50, icon: '🐐' },
    { id: 'fowl', name: 'Galinha', cost: 40, power: 'health', value: 30, icon: '🐓' },
    { id: 'soap', name: 'Sabão da Costa', cost: 25, power: 'protection', value: 25, icon: '🧼' },
    { id: 'pigeon', name: 'Pombo (Eyele)', cost: 30, power: 'wisdom', value: 25, icon: '🕊️' },
    { id: 'palm_oil', name: 'Dendê (Epo)', cost: 10, power: 'protection', value: 10, icon: '🏺' },
];

const SCENARIOS = [
    {
        text: "Um cliente chega desesperado. Seu filho está com febre alta e pesadelos.",
        required: 'health',
        difficulty: 30,
        reward: 60
    },
    {
        text: "O Rei da cidade precisa tomar uma decisão difícil sobre a guerra.",
        required: 'wisdom',
        difficulty: 40,
        reward: 80
    },
    {
        text: "Sua casa está sendo atacada por Ajogun (energias negativas).",
        required: 'protection',
        difficulty: 50,
        reward: 0 // Survival only
    },
    {
        text: "Um comerciante quer expandir seus negócios.",
        required: 'wealth',
        difficulty: 40,
        reward: 100
    }
];

const DestinyMarketGame = ({ onBack }: { onBack: () => void }) => {
    // Player Stats
    const [cowries, setCowries] = useState(150);
    const [inventory, setInventory] = useState<Item[]>([]);
    const [turn, setTurn] = useState(1);
    const [currentScenario, setCurrentScenario] = useState(SCENARIOS[0]);
    const [log, setLog] = useState<string[]>(["Bem-vindo ao Mercado do Destino!"]);
    const [gameState, setGameState] = useState<'market' | 'scenario'>('market');

    const buyItem = (item: Item) => {
        if (cowries >= item.cost) {
            setCowries(c => c - item.cost);
            setInventory([...inventory, item]);
            setLog(prev => [`Comprou ${item.name} (-${item.cost} búzios)`, ...prev]);
        } else {
            alert("Búzios insuficientes!");
        }
    };

    const solveScenario = () => {
        // Calculate total power for required type
        const relevantItems = inventory.filter(i => i.power === currentScenario.required);
        const powerSum = relevantItems.reduce((acc, i) => acc + i.value, 0);

        if (powerSum >= currentScenario.difficulty) {
            // Success
            setCowries(c => c + currentScenario.reward);
            // Consume items (Sacrifice)
            const remaining = inventory.filter(i => !relevantItems.includes(i));
            setInventory(remaining);
            
            setLog(prev => [`SUCESSO! Problema resolvido. Ganhou ${currentScenario.reward} búzios.`, ...prev]);
            nextTurn();
        } else {
            // Fail
            setLog(prev => [`FALHA! Poder insuficiente (${powerSum}/${currentScenario.difficulty}).`, ...prev]);
            alert("Você falhou! Os materiais eram insuficientes.");
            nextTurn(); // Still advance but maybe penalty?
        }
    };

    const nextTurn = () => {
        setTurn(t => t + 1);
        const nextScen = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
        setCurrentScenario(nextScen);
        setGameState('market');
    };

    return (
        <div className="min-h-screen bg-[#3E2723] text-[#F5F5DC] p-4 flex flex-col items-center font-serif">
            <div className="w-full max-w-2xl flex items-center justify-between mb-6">
                <button onClick={onBack} className="text-white/70 hover:text-white"><ArrowLeft /></button>
                <h1 className="text-xl font-bold flex items-center gap-2"><ShoppingBag /> Mercado do Destino</h1>
                <div className="bg-ifa-gold text-black px-3 py-1 rounded-full font-bold flex items-center gap-2">
                    <Coins size={16} /> {cowries}
                </div>
            </div>

            <div className="w-full max-w-2xl grid md:grid-cols-2 gap-6">
                
                {/* LEFT: ACTION AREA */}
                <div className="space-y-6">
                    {gameState === 'market' ? (
                        <div className="bg-[#2E150F] border border-[#D4AF37] p-4 rounded-xl shadow-xl">
                            <h3 className="text-ifa-gold font-bold uppercase mb-4 text-center">Banca do Mercado</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {MARKET_ITEMS.map(item => (
                                    <button 
                                        key={item.id} 
                                        onClick={() => buyItem(item)}
                                        className="bg-[#5D4037] p-3 rounded hover:bg-[#D4AF37] hover:text-black transition-colors flex flex-col items-center text-center"
                                    >
                                        <span className="text-2xl mb-1">{item.icon}</span>
                                        <span className="text-xs font-bold">{item.name}</span>
                                        <span className="text-xs opacity-70">{item.cost} búzios</span>
                                        <span className="text-[10px] uppercase mt-1 bg-black/20 px-1 rounded">{item.power} +{item.value}</span>
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={() => setGameState('scenario')}
                                className="w-full mt-6 bg-green-700 text-white py-3 rounded font-bold uppercase hover:bg-green-600"
                            >
                                Enfrentar o Destino
                            </button>
                        </div>
                    ) : (
                        <div className="bg-[#2E150F] border border-red-500 p-6 rounded-xl shadow-xl text-center">
                            <h3 className="text-red-400 font-bold uppercase mb-4 flex items-center justify-center gap-2"><AlertTriangle /> Problema do Dia {turn}</h3>
                            <p className="text-lg italic mb-6">"{currentScenario.text}"</p>
                            
                            <div className="flex justify-around text-sm mb-6 bg-black/20 p-2 rounded">
                                <div>
                                    <span className="block text-gray-400 text-xs uppercase">Necessário</span>
                                    <span className="font-bold text-white uppercase">{currentScenario.required}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-400 text-xs uppercase">Dificuldade</span>
                                    <span className="font-bold text-white">{currentScenario.difficulty} pts</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-xs text-gray-400 uppercase mb-2">Seus Materiais Disponíveis:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {inventory.filter(i => i.power === currentScenario.required).map((i, idx) => (
                                        <span key={idx} className="bg-green-900 text-green-200 px-2 py-1 rounded text-xs border border-green-500">
                                            {i.icon} {i.name} (+{i.value})
                                        </span>
                                    ))}
                                    {inventory.filter(i => i.power === currentScenario.required).length === 0 && <span className="text-red-500 text-xs">Nenhum item útil!</span>}
                                </div>
                            </div>

                            <button 
                                onClick={solveScenario}
                                className="w-full bg-ifa-gold text-black py-3 rounded font-bold uppercase hover:scale-105 transition-transform"
                            >
                                Realizar Ebó
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT: INVENTORY & LOG */}
                <div className="space-y-6">
                    <div className="bg-[#1a1510] p-4 rounded-xl border border-[#5D4037]">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Sua Sacola (Apo)</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {inventory.map((item, idx) => (
                                <div key={idx} className="bg-[#3E2723] p-2 rounded flex flex-col items-center relative group" title={item.name}>
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500"></span>
                                </div>
                            ))}
                            {inventory.length === 0 && <span className="text-xs text-gray-600 col-span-4 text-center">Vazia. Compre itens.</span>}
                        </div>
                    </div>

                    <div className="bg-black/30 p-4 rounded-xl border border-[#5D4037] h-48 overflow-y-auto font-mono text-xs">
                        {log.map((entry, i) => (
                            <div key={i} className="mb-1 border-b border-white/5 pb-1">
                                <span className="text-ifa-gold">{">"}</span> {entry}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DestinyMarketGame;
