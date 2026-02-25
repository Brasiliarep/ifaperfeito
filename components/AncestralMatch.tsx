
import React, { useState, useRef } from 'react';
import { ArrowLeft, User, Users, Upload, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { compareAncestry } from '../services/geminiService';

const AncestralMatch = ({ onBack }: { onBack: () => void }) => {
    const [personImg, setPersonImg] = useState<string | null>(null);
    const [ancestorImg, setAncestorImg] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const personRef = useRef<HTMLInputElement>(null);
    const ancestorRef = useRef<HTMLInputElement>(null);

    const handleUpload = (type: 'person' | 'ancestor', e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                if(type === 'person') setPersonImg(reader.result as string);
                else setAncestorImg(reader.result as string);
                setResult(null);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const analyze = async () => {
        if(!personImg || !ancestorImg) return;
        setLoading(true);
        try {
            const data = await compareAncestry(personImg, ancestorImg, 'pt-BR');
            setResult(data);
        } catch (error) {
            alert("Erro na análise. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-lg flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-white"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Users size={20}/> Atunwa (Ancestralidade)</h1>
                <div className="w-6"></div>
            </div>

            <div className="w-full max-w-lg space-y-6">
                <p className="text-center text-gray-400 text-sm">
                    Carregue sua foto e a de um ancestral (bisavô, avó). A IA analisará os traços físicos para identificar sinais de <strong>Atunwa</strong> (Reencarnação Familiar).
                </p>

                <div className="flex gap-4 justify-center">
                    {/* Person Upload */}
                    <div 
                        onClick={() => personRef.current?.click()}
                        className="w-32 h-32 md:w-40 md:h-40 bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-ifa-gold relative overflow-hidden"
                    >
                        {personImg ? (
                            <img src={personImg} className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <User size={32} className="text-gray-500 mb-2" />
                                <span className="text-[10px] uppercase font-bold text-gray-500">Você</span>
                            </>
                        )}
                        <input type="file" ref={personRef} className="hidden" accept="image/*" onChange={(e) => handleUpload('person', e)} />
                    </div>

                    {/* Ancestor Upload */}
                    <div 
                        onClick={() => ancestorRef.current?.click()}
                        className="w-32 h-32 md:w-40 md:h-40 bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-ifa-gold relative overflow-hidden"
                    >
                        {ancestorImg ? (
                            <img src={ancestorImg} className="w-full h-full object-cover grayscale" />
                        ) : (
                            <>
                                <Users size={32} className="text-gray-500 mb-2" />
                                <span className="text-[10px] uppercase font-bold text-gray-500">Ancestral</span>
                            </>
                        )}
                        <input type="file" ref={ancestorRef} className="hidden" accept="image/*" onChange={(e) => handleUpload('ancestor', e)} />
                    </div>
                </div>

                {personImg && ancestorImg && !result && (
                    <button 
                        onClick={analyze}
                        disabled={loading}
                        className="w-full py-4 bg-ifa-gold text-black font-bold uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} 
                        {loading ? "Consultando Linhagem..." : "Verificar Reencarnação"}
                    </button>
                )}

                {result && (
                    <div className="animate-fade-in bg-ifa-base border border-ifa-gold/30 p-6 rounded-xl text-center">
                        <div className="mb-6">
                            <div className="inline-block p-4 rounded-full border-4 border-ifa-gold bg-black/50 mb-2">
                                <span className="text-3xl font-bold text-ifa-gold">{result.similarityScore}%</span>
                            </div>
                            <p className="text-xs uppercase font-bold text-ifa-neutral">Grau de Semelhança (Atunwa)</p>
                        </div>

                        <div className="text-left space-y-4">
                            <div className="bg-black/20 p-4 rounded border border-gray-800">
                                <h4 className="text-ifa-gold text-xs font-bold uppercase mb-2">Análise Facial</h4>
                                <p className="text-sm text-gray-300">{result.facialAnalysis}</p>
                            </div>
                            
                            <div className="bg-purple-900/10 p-4 rounded border border-purple-500/30">
                                <h4 className="text-purple-400 text-xs font-bold uppercase mb-2">Conexão Espiritual</h4>
                                <p className="text-sm text-purple-200 italic">"{result.spiritualConnection}"</p>
                            </div>

                            <div className="bg-ifa-wood/20 p-4 rounded border border-ifa-wood">
                                <h4 className="text-ifa-text text-xs font-bold uppercase mb-2">Conselho do Ancestral</h4>
                                <p className="text-sm text-gray-300">{result.ancestralAdvice}</p>
                            </div>
                        </div>

                        <button onClick={() => { setResult(null); setPersonImg(null); setAncestorImg(null); }} className="mt-6 text-sm text-ifa-neutral underline flex items-center justify-center gap-2 mx-auto">
                            <RefreshCw size={14} /> Nova Análise
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AncestralMatch;
