
import React, { useState } from 'react';
import { ShoppingCart, Check, Circle, Leaf } from 'lucide-react';
import { HERB_DATABASE } from '../data/herbs';
import HerbModal from './HerbModal';
import { HerbInfo } from '../types';

interface Props {
    ingredients: string[];
}

const ShoppingList: React.FC<Props> = ({ ingredients }) => {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
    const [selectedHerb, setSelectedHerb] = useState<HerbInfo | null>(null);

    const toggleItem = (index: number) => {
        setCheckedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // --- CRITICAL FIX: AGGRESSIVE HERB MATCHING LOGIC ---
    const findHerbInfo = (text: string): HerbInfo | null => {
        if (!text) return null;

        // 1. Normalize Input: remove accents, lowercase, trim extra spaces
        const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
        const inputNorm = normalize(text);
        
        // Remove common prefixes to find the core name
        const cleanInput = inputNorm
            .replace(/^ewe\s+/, '') // Remove 'ewe '
            .replace(/^folha(s)?\s+(de|da|do)\s+/, '') // Remove 'folha de '
            .trim();

        const keys = Object.keys(HERB_DATABASE);

        // Check against keys
        for (const k of keys) {
            const dbKeyNorm = normalize(k);
            if (cleanInput.includes(dbKeyNorm) || dbKeyNorm.includes(cleanInput)) {
                return HERB_DATABASE[k];
            }
        }
        
        // Check inside the values (commonName or yorubaName)
        for (const k of keys) {
            const item = HERB_DATABASE[k];
            const yorubaNorm = normalize(item.yorubaName);
            const commonNorm = normalize(item.commonName);
            
            if (yorubaNorm.includes(cleanInput) || commonNorm.includes(cleanInput) ||
                cleanInput.includes(yorubaNorm) || cleanInput.includes(commonNorm)) {
                return item;
            }
        }

        return null;
    };

    if (!ingredients || ingredients.length === 0) return null;

    return (
        <>
            <div className="bg-[#1a1510] border border-[#5D4037] rounded-lg p-4 mt-4 shadow-inner">
                <h5 className="text-[#D4AF37] font-bold text-xs uppercase flex items-center gap-2 mb-3">
                    <ShoppingCart size={14} /> Lista de Compras (Ebó)
                </h5>
                <div className="space-y-2">
                    {ingredients.map((item, idx) => {
                        const herbInfo = findHerbInfo(item);
                        
                        return (
                            <div 
                                key={idx} 
                                className={`flex items-start gap-3 p-2 rounded transition-colors border border-transparent ${
                                    checkedItems[idx] 
                                    ? 'bg-green-900/30 border-green-900/50' 
                                    : 'hover:bg-[#2a2420] hover:border-[#5D4037]/30'
                                }`}
                            >
                                <div 
                                    onClick={() => toggleItem(idx)}
                                    className={`mt-0.5 cursor-pointer ${checkedItems[idx] ? 'text-green-400' : 'text-[#a8a29e]'}`}
                                >
                                    {checkedItems[idx] ? <Check size={16} /> : <Circle size={16} />}
                                </div>
                                <div className="flex-grow">
                                    <span className={`text-sm ${checkedItems[idx] ? 'line-through text-gray-300' : 'text-[#e5e5e5]'}`}>
                                        {item}
                                    </span>
                                    {herbInfo && (
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setSelectedHerb(herbInfo); }}
                                            className="ml-2 inline-flex items-center gap-1 text-[10px] text-ifa-gold border border-ifa-gold/30 px-1.5 py-0.5 rounded hover:bg-ifa-gold hover:text-black transition-colors"
                                        >
                                            <Leaf size={10} /> Ver Planta
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedHerb && <HerbModal herb={selectedHerb} onClose={() => setSelectedHerb(null)} />}
        </>
    );
};

export default ShoppingList;
