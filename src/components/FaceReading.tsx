
import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Sparkles, User, Loader2 } from 'lucide-react';
import { analyzeFace } from '../services/geminiService';

const FaceReading = ({ onBack }: { onBack: () => void }) => {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<{emotionalState: string, oriDiagnosis: string, recommendation: string} | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setResult(null);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const analysis = await analyzeFace(image, 'pt-BR');
            setResult(analysis);
        } catch (error) {
            alert("Erro ao analisar imagem. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <User size={24} /> Espelho da Alma (Ori)
                    </h1>
                </div>

                <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 shadow-2xl text-center">
                    <p className="text-sm text-ifa-neutral mb-6">
                        Tire uma selfie. A IA analisará as micro-expressões para identificar o estado do seu Ori (cansaço, brilho, tensão).
                    </p>

                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-square md:aspect-video bg-black/30 border-2 border-dashed border-ifa-border rounded-xl mb-6 flex flex-col items-center justify-center cursor-pointer hover:border-ifa-gold transition-colors overflow-hidden relative"
                    >
                        {image ? (
                            <img src={image} className="w-full h-full object-cover" alt="Selfie" />
                        ) : (
                            <div className="text-ifa-neutral flex flex-col items-center gap-2">
                                <Camera size={48} />
                                <span>Toque para capturar</span>
                            </div>
                        )}
                        <input 
                            type="file" 
                            accept="image/*" 
                            capture="user" 
                            ref={fileInputRef} 
                            onChange={handleCapture} 
                            className="hidden" 
                        />
                    </div>

                    {image && !result && (
                        <button 
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full py-4 bg-ifa-gold text-ifa-base font-bold uppercase rounded hover:opacity-90 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                            Analisar Ori
                        </button>
                    )}

                    {result && (
                        <div className="bg-ifa-surface border border-ifa-gold/30 p-6 rounded-lg text-left animate-fade-in">
                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-ifa-neutral uppercase">Estado Emocional</h4>
                                <p className="text-ifa-text text-lg">{result.emotionalState}</p>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-xs font-bold text-ifa-gold uppercase">Diagnóstico do Ori</h4>
                                <p className="text-ifa-text italic">"{result.oriDiagnosis}"</p>
                            </div>
                            <div className="bg-green-900/20 p-4 rounded border border-green-800">
                                <h4 className="text-xs font-bold text-green-400 uppercase mb-1">Recomendação</h4>
                                <p className="text-sm text-green-100">{result.recommendation}</p>
                            </div>
                            
                            <button 
                                onClick={() => { setImage(null); setResult(null); }}
                                className="mt-6 w-full py-2 border border-ifa-border text-ifa-neutral text-sm rounded hover:text-ifa-text"
                            >
                                Nova Leitura
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaceReading;
