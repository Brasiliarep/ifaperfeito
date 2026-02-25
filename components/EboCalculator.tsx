
import React, { useState } from 'react';
import { ArrowLeft, Calculator, Plus, Minus } from 'lucide-react';

const EboCalculator = ({ onBack }: { onBack: () => void }) => {
    const [familySize, setFamilySize] = useState(1);
    const [oduNumber, setOduNumber] = useState(1); // 1-16 (Mejis)
    
    // Odu Multiplication Factors (Esoteric Logic)
    // Example: Ogunda (3) implies breaking things in 3 or multiples of 3.
    // Ejiogbe (8/1) implies abundance/singularity.
    const calculateMaterials = () => {
        const baseObi = oduNumber === 1 ? 2 : oduNumber > 10 ? 4 : 2;
        const baseOrogbo = oduNumber === 3 || oduNumber === 4 ? 2 : 0;
        const baseDende = 50 * familySize; // ml
        const baseGin = 30 * familySize; // ml
        
        // Multiplier based on family size (Head of family carries weight)
        const multiplier = Math.ceil(familySize / 2);

        return {
            obi: baseObi * multiplier,
            orogbo: baseOrogbo * multiplier,
            dende: baseDende,
            gin: baseGin,
            akara: oduNumber % 2 === 0 ? 2 * familySize : 1 * familySize,
            ekuru: oduNumber === 8 || oduNumber === 10 ? 2 * familySize : 0
        };
    };

    const results = calculateMaterials();

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-8 flex flex-col items-center">
            <div className="w-full flex justify-between mb-8 max-w-lg">
                <button onClick={onBack}><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2">
                    <Calculator /> Matemática do Ebó
                </h1>
            </div>

            <div className="bg-ifa-base border border-ifa-border p-6 rounded-xl w-full max-w-lg shadow-2xl">
                <div className="mb-6">
                    <label className="block text-xs uppercase text-ifa-neutral mb-2">Número de Pessoas (Família)</label>
                    <div className="flex items-center gap-4 bg-ifa-base-dark p-2 rounded border border-ifa-border">
                        <button onClick={() => setFamilySize(Math.max(1, familySize - 1))} className="p-2 bg-ifa-surface rounded hover:bg-ifa-wood hover:text-white"><Minus size={16}/></button>
                        <span className="font-bold text-xl flex-grow text-center">{familySize}</span>
                        <button onClick={() => setFamilySize(familySize + 1)} className="p-2 bg-ifa-surface rounded hover:bg-ifa-wood hover:text-white"><Plus size={16}/></button>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-xs uppercase text-ifa-neutral mb-2">Posição do Odu (1-16)</label>
                    <input 
                        type="range" 
                        min="1" 
                        max="16" 
                        value={oduNumber} 
                        onChange={(e) => setOduNumber(parseInt(e.target.value))}
                        className="w-full accent-ifa-gold"
                    />
                    <div className="text-center font-bold text-ifa-gold mt-2">Odu #{oduNumber}</div>
                </div>

                <div className="border-t border-ifa-border pt-6">
                    <h3 className="text-center font-serif text-lg mb-4">Proporção Sagrada</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-ifa-base-dark p-3 rounded text-center border border-ifa-border/50">
                            <span className="block text-2xl font-bold text-ifa-text">{results.obi}</span>
                            <span className="text-xs uppercase text-ifa-neutral">Obi Abata</span>
                        </div>
                        <div className="bg-ifa-base-dark p-3 rounded text-center border border-ifa-border/50">
                            <span className="block text-2xl font-bold text-ifa-text">{results.orogbo}</span>
                            <span className="text-xs uppercase text-ifa-neutral">Orogbo</span>
                        </div>
                        <div className="bg-ifa-base-dark p-3 rounded text-center border border-ifa-border/50">
                            <span className="block text-2xl font-bold text-ifa-text">{results.dende} ml</span>
                            <span className="text-xs uppercase text-ifa-neutral">Dendê (Epo)</span>
                        </div>
                        <div className="bg-ifa-base-dark p-3 rounded text-center border border-ifa-border/50">
                            <span className="block text-2xl font-bold text-ifa-text">{results.gin} ml</span>
                            <span className="text-xs uppercase text-ifa-neutral">Gim (Oti)</span>
                        </div>
                        {results.akara > 0 && (
                            <div className="bg-ifa-base-dark p-3 rounded text-center border border-ifa-border/50">
                                <span className="block text-2xl font-bold text-ifa-text">{results.akara}</span>
                                <span className="text-xs uppercase text-ifa-neutral">Acarajé (Akara)</span>
                            </div>
                        )}
                         {results.ekuru > 0 && (
                            <div className="bg-ifa-base-dark p-3 rounded text-center border border-ifa-border/50">
                                <span className="block text-2xl font-bold text-ifa-text">{results.ekuru}</span>
                                <span className="text-xs uppercase text-ifa-neutral">Ekuru Funfun</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EboCalculator;
