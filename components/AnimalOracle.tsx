
import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Image as ImageIcon, Sparkles, Loader2, Bird } from 'lucide-react';
import { analyzeAnimalSymbolism } from '../services/geminiService';

const AnimalOracle = ({ onBack }: { onBack: () => void }) => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setResult(null);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const analyze = async () => {
        if(!image) return;
        setLoading(true);
        try {
            const data = await analyzeAnimalSymbolism(image, 'pt-BR');
            setResult(data);
        } catch (error) {
            alert("Erro na análise.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Bird size={20}/> Oráculo dos Bichos</h1>
                <div className="w-6"></div>
            </div>

            <div className="w-full max-w-md">
                <div 
                    onClick={() => fileRef.current?.click()}
                    className="w-full aspect-video bg-black/30 border-2 border-dashed border-ifa-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-ifa-gold transition-colors relative overflow-hidden"
                >
                    {image ? (
                        <img src={image} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-ifa-neutral flex flex-col items-center gap-2">
                            <Camera size={32} />
                            <span className="text-xs uppercase font-bold">Foto do Animal</span>
                        </div>
                    )}
                    <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleFile} />
                </div>

                {image && !result && (
                    <button 
                        onClick={analyze}
                        disabled={loading}
                        className="w-full mt-4 py-3 bg-ifa-gold text-ifa-base font-bold rounded flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Interpretar Sinal
                    </button>
                )}

                {result && (
                    <div className="mt-6 bg-ifa-base border border-ifa-gold p-6 rounded-xl animate-fade-in">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-ifa-gold">{result.animalName}</h2>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${result.omenType === 'Good' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                {result.omenType === 'Good' ? 'Irê (Bom)' : 'Osogbo (Aviso)'}
                            </span>
                        </div>
                        <p className="text-sm text-ifa-text mb-4 leading-relaxed">{result.spiritualMeaning}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-black/20 p-3 rounded">
                                <span className="text-xs text-ifa-neutral uppercase block">Orixá</span>
                                <span className="font-bold">{result.relatedOrisha}</span>
                            </div>
                            <div className="bg-black/20 p-3 rounded">
                                <span className="text-xs text-ifa-neutral uppercase block">Ação</span>
                                <span className="font-bold text-xs">{result.actionRequired}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalOracle;
