
import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Flame, Droplet, Box, Save, RefreshCw, X, Sparkles } from 'lucide-react';

interface AltarItem {
    id: string;
    type: string;
    icon: React.ReactNode;
    x: number;
    y: number;
    active: boolean; // Lit candle, filled water, etc
}

const ITEM_TYPES = [
    { id: 'candle', label: 'Vela (Ina)', icon: <div className="w-4 h-12 bg-white rounded relative border border-gray-300 shadow-sm"></div> },
    { id: 'water', label: 'Quartinha', icon: <div className="w-10 h-10 rounded-full bg-blue-900/80 border-2 border-white flex items-center justify-center shadow-md"><Droplet size={16} className="text-blue-200"/></div> },
    { id: 'gin', label: 'Oti (Gim)', icon: <div className="w-6 h-12 bg-green-900/30 border-2 border-green-800 rounded-t-lg backdrop-blur-sm"></div> },
    { id: 'ota', label: 'Otá (Pedra)', icon: <div className="w-8 h-6 bg-gray-600 rounded-[40%] border border-gray-500 shadow-lg transform rotate-45"></div> },
    { id: 'obi', label: 'Obi', icon: <div className="w-6 h-6 bg-red-900 rounded-full border border-red-950 flex items-center justify-center shadow-md"><span className="text-[6px] text-white font-bold">OBI</span></div> },
    { id: 'opon', label: 'Opon Ifá', icon: <div className="w-16 h-16 bg-[#D2B48C] rounded-full border-4 border-[#5D4037] flex items-center justify-center shadow-xl"><div className="w-12 h-12 rounded-full border border-[#5D4037]/30"></div></div> },
    { id: 'buzios', label: 'Búzios', icon: <div className="grid grid-cols-2 gap-0.5 w-6"><div className="w-2 h-3 bg-[#F5F5DC] rounded-full border border-[#D4AF37]"></div><div className="w-2 h-3 bg-[#F5F5DC] rounded-full border border-[#D4AF37]"></div><div className="w-2 h-3 bg-[#F5F5DC] rounded-full border border-[#D4AF37]"></div></div> },
];

const OjuboBuilder = ({ onBack }: { onBack: () => void }) => {
    const [items, setItems] = useState<AltarItem[]>([]);
    const [selectedType, setSelectedType] = useState(ITEM_TYPES[0]);

    const handlePlace = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newItem: AltarItem = {
            id: crypto.randomUUID(),
            type: selectedType.id,
            icon: selectedType.icon,
            x, 
            y,
            active: false
        };
        setItems([...items, newItem]);
    };

    const toggleItem = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setItems(items.map(i => i.id === id ? { ...i, active: !i.active } : i));
    };

    const removeItem = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setItems(items.filter(i => i.id !== id));
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-2xl flex justify-between items-center mb-4">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Box size={20}/> Ojubo Digital</h1>
                <button onClick={() => setItems([])} className="text-red-400 hover:text-red-300"><RefreshCw size={20}/></button>
            </div>

            {/* EDITOR AREA */}
            <div className="relative w-full max-w-2xl aspect-square mb-6 group">
                <div 
                    className="w-full h-full bg-[#3E2723] rounded-lg border-8 border-[#5D4037] relative overflow-hidden shadow-2xl cursor-crosshair"
                    onClick={handlePlace}
                >
                    {/* Mat Texture */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/woven.png')] opacity-30 pointer-events-none"></div>
                    
                    {/* Items */}
                    {items.map(item => (
                        <div 
                            key={item.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 active:scale-95"
                            style={{ left: item.x, top: item.y }}
                            onClick={(e) => toggleItem(item.id, e)}
                            onContextMenu={(e) => { e.preventDefault(); removeItem(item.id, e); }}
                        >
                            <div className="relative">
                                {item.icon}
                                
                                {/* Remove Button (Visible on hover) */}
                                <button 
                                    onClick={(e) => removeItem(item.id, e)}
                                    className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity scale-75 z-20"
                                >
                                    <X size={10} />
                                </button>

                                {/* Effects */}
                                {item.type === 'candle' && item.active && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-orange-500 animate-pulse drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]">
                                        <Flame size={24} fill="orange" />
                                    </div>
                                )}
                                {item.type === 'water' && item.active && (
                                    <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
                                )}
                                {item.type === 'gin' && item.active && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white animate-bounce">
                                        <Sparkles size={12} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 pointer-events-none select-none">
                            <Box size={48} className="mb-2 opacity-50" />
                            <p className="text-sm font-bold uppercase tracking-widest text-center">Toque na esteira para<br/>posicionar os fundamentos</p>
                        </div>
                    )}
                </div>
            </div>

            {/* TOOLBAR */}
            <div className="w-full max-w-2xl bg-ifa-base border border-ifa-border rounded-xl p-4 shadow-lg">
                <p className="text-xs text-ifa-neutral mb-3 uppercase font-bold flex justify-between">
                    <span>Selecionar Item:</span>
                    <span className="text-ifa-gold">Toque no item para ativar (acender/ofertar)</span>
                </p>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                    {ITEM_TYPES.map(type => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-lg border min-w-[80px] transition-all flex-shrink-0 ${selectedType.id === type.id ? 'bg-ifa-gold text-black border-ifa-gold scale-105 shadow-lg' : 'bg-ifa-base-dark border-ifa-border text-ifa-neutral hover:bg-ifa-surface'}`}
                        >
                            <div className="scale-75 pointer-events-none">{type.icon}</div>
                            <span className="text-[10px] font-bold uppercase">{type.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OjuboBuilder;
