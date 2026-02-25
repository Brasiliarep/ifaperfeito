
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CloudRain, Sun, Mic, Music, Sprout, Leaf, Flower, AlertTriangle } from 'lucide-react';
import { updateInventoryItem, getInventory } from '../services/storageService';

const GROWTH_TIME = 10000; // 10 seconds for demo (In real app: 24h)
const DEATH_TIME = 48 * 60 * 60 * 1000; // 48h

interface PlantState {
    stage: 0 | 1 | 2 | 3 | 4; // 0=Seed, 1=Sprout, 2=Small, 3=Big, 4=Flower
    lastWatered: number;
    health: number; // 0-100
    isSinging: boolean;
}

const OsanyinGarden = ({ onBack }: { onBack: () => void }) => {
    const [plant, setPlant] = useState<PlantState>({
        stage: 0,
        lastWatered: Date.now(),
        health: 100,
        isSinging: false
    });
    const [message, setMessage] = useState("A terra está fértil. Cuidar é um ato de Axé.");

    useEffect(() => {
        const saved = localStorage.getItem('ifa_garden');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Calculate health decay based on time away
            const diff = Date.now() - parsed.lastWatered;
            let newHealth = parsed.health;
            if (diff > 24 * 60 * 60 * 1000) newHealth -= 20; // -20 health per day missed
            if (diff > 48 * 60 * 60 * 1000) newHealth = 0; // Dead
            
            setPlant({ ...parsed, health: Math.max(0, newHealth) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ifa_garden', JSON.stringify(plant));
    }, [plant]);

    const handleWater = () => {
        if (plant.health === 0) return;
        setPlant(prev => ({
            ...prev,
            lastWatered: Date.now(),
            health: Math.min(100, prev.health + 10)
        }));
        setMessage("Água fresca acalma a terra (Omi Tutu). A planta agradece.");
    };

    const handleSing = () => {
        if (plant.health === 0) return;
        setPlant(prev => ({ ...prev, isSinging: true }));
        setMessage("Cantando: 'Ewe O! Ewe O!...' (O poder da folha!)");
        
        setTimeout(() => {
            setPlant(prev => {
                // Growth Logic
                let newStage = prev.stage;
                if (prev.health > 80 && prev.stage < 4) newStage = (prev.stage + 1) as any;
                
                return { 
                    ...prev, 
                    isSinging: false,
                    stage: newStage 
                };
            });
            
            if (plant.stage === 4) {
                setMessage("A planta não pode crescer mais, mas sua energia está vibrante!");
            } else {
                setMessage("A vibração da voz estimulou o crescimento!");
            }
        }, 3000);
    };

    const harvest = () => {
        if (plant.stage !== 4) return;
        
        alert("Colheita Realizada! Você ganhou: 1x Ewe Rinrin (Erva da Fortuna).");
        
        // Add to inventory
        const item = {
            id: crypto.randomUUID(),
            name: "Ewe Rinrin (Jardim)",
            quantity: 1,
            unit: 'unidade' as any,
            category: 'herb' as any,
            minThreshold: 1
        };
        updateInventoryItem(item);

        // Reset
        setPlant({ stage: 0, lastWatered: Date.now(), health: 100, isSinging: false });
        setMessage("A semente foi replantada. O ciclo recomeça.");
    };

    const resetDead = () => {
        setPlant({ stage: 0, lastWatered: Date.now(), health: 100, isSinging: false });
        setMessage("Nova semente plantada. Não esqueça de regar!");
    };

    const renderPlant = () => {
        if (plant.health === 0) return <div className="text-6xl grayscale opacity-50">🥀</div>;
        
        const pulse = plant.isSinging ? 'animate-bounce' : 'animate-pulse-slow';
        
        switch (plant.stage) {
            case 0: return <div className="text-4xl">🌰</div>; // Seed
            case 1: return <div className={`text-6xl text-green-400 ${pulse}`}><Sprout size={64}/></div>;
            case 2: return <div className={`text-8xl text-green-500 ${pulse}`}><Leaf size={96}/></div>;
            case 3: return <div className={`text-9xl text-green-600 ${pulse}`}><div className="flex"><Leaf size={80} className="-scale-x-100"/><Leaf size={80}/></div></div>;
            case 4: return <div className={`text-9xl text-pink-400 ${pulse}`}><Flower size={128}/></div>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900/20 to-green-900/20 text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-white"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-green-400 flex items-center gap-2"><Leaf size={20}/> Jardim de Osanyin</h1>
                <div className="w-6"></div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
                
                {/* Sun/Moon Cycle (Visual) */}
                <div className="absolute top-20 right-10 animate-spin-slow duration-[20s]">
                    <Sun className="text-yellow-500" size={48} />
                </div>

                <div className="bg-black/30 border-4 border-[#5D4037] rounded-full w-72 h-72 flex items-center justify-center relative mb-8 shadow-2xl backdrop-blur-sm">
                    {/* Soil */}
                    <div className="absolute bottom-4 w-3/4 h-8 bg-[#3E2723] rounded-[50%] blur-md"></div>
                    
                    {/* The Plant */}
                    <div className="relative z-10 transition-all duration-1000">
                        {renderPlant()}
                    </div>

                    {/* Singing Effect */}
                    {plant.isSinging && (
                        <div className="absolute -top-10 left-0 right-0 flex justify-center gap-2 animate-fade-in-up">
                            <Music size={20} className="text-gold"/>
                            <Music size={24} className="text-gold"/>
                        </div>
                    )}
                </div>

                <div className="bg-ifa-base border border-ifa-border p-4 rounded-xl text-center mb-8 w-full">
                    <p className="text-ifa-gold font-bold text-lg mb-1">{plant.health === 0 ? "A planta morreu." : message}</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                        <div 
                            className={`h-full ${plant.health < 30 ? 'bg-red-500' : 'bg-green-500'}`} 
                            style={{width: `${plant.health}%`}}
                        ></div>
                    </div>
                    <p className="text-[10px] text-ifa-neutral mt-1 text-right">Saúde: {plant.health}%</p>
                </div>

                {plant.health === 0 ? (
                    <button onClick={resetDead} className="bg-ifa-wood text-white px-8 py-3 rounded-full font-bold uppercase shadow-lg hover:bg-ifa-gold hover:text-black">
                        Replantar
                    </button>
                ) : (
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <button 
                            onClick={handleWater}
                            className="bg-blue-900/50 border border-blue-500 text-blue-200 py-4 rounded-xl flex flex-col items-center gap-2 hover:bg-blue-900 transition-all"
                        >
                            <CloudRain size={32} />
                            <span className="text-xs font-bold uppercase">Regar (Omi)</span>
                        </button>

                        <button 
                            onClick={handleSing}
                            disabled={plant.isSinging}
                            className="bg-purple-900/50 border border-purple-500 text-purple-200 py-4 rounded-xl flex flex-col items-center gap-2 hover:bg-purple-900 transition-all disabled:opacity-50"
                        >
                            <Mic size={32} />
                            <span className="text-xs font-bold uppercase">Cantar (Ofo)</span>
                        </button>

                        {plant.stage === 4 && (
                            <button 
                                onClick={harvest}
                                className="col-span-2 bg-gradient-to-r from-green-600 to-green-800 text-white py-4 rounded-xl font-bold uppercase shadow-lg flex items-center justify-center gap-2 animate-pulse"
                            >
                                <Leaf /> Colher Erva Sagrada
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OsanyinGarden;
