
import React, { useState } from 'react';
import { ArrowLeft, Stethoscope, AlertTriangle, Search, Loader2, User } from 'lucide-react';
import { searchAjogunRemedy } from '../services/geminiService';

const AjogunDiagnosis = ({ onBack }: { onBack: () => void }) => {
    const [customSymptom, setCustomSymptom] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [customResult, setCustomResult] = useState<{ajogunName: string, spiritualCause: string, suggestedRemedy: string} | null>(null);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);

    const bodyZones = [
        { id: 'head', label: 'Cabeça (Ori)', symptom: 'Dores, Confusão' },
        { id: 'chest', label: 'Peito/Coração', symptom: 'Angústia, Falta de Ar' },
        { id: 'stomach', label: 'Estômago', symptom: 'Medo, Ansiedade' },
        { id: 'back', label: 'Costas/Ombros', symptom: 'Peso Espiritual (Egun)' },
        { id: 'legs', label: 'Pernas/Pés', symptom: 'Caminhos Fechados' }
    ];

    const handleCustomSearch = async (term?: string) => {
        const query = term || customSymptom;
        if (!query.trim()) return;
        
        setIsSearching(true);
        setCustomResult(null); 
        try {
            const searchRes = await searchAjogunRemedy(query, 'pt-BR');
            setCustomResult(searchRes);
        } catch (error) {
            alert("Erro ao consultar a base de dados de Ifá.");
        } finally {
            setIsSearching(false);
        }
    }

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-lg flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Stethoscope size={20}/> Diagnóstico Ajogun</h1>
                <div className="w-6"></div>
            </div>

            <div className="w-full max-w-lg">
                
                {/* Body Map Selection */}
                <div className="mb-8">
                     <p className="text-center text-ifa-neutral text-sm mb-4">Selecione a área afetada:</p>
                     <div className="flex flex-wrap justify-center gap-3">
                         {bodyZones.map(zone => (
                             <button 
                                key={zone.id}
                                onClick={() => { setSelectedZone(zone.id); handleCustomSearch(zone.symptom); }}
                                className={`px-4 py-2 rounded-full border text-xs font-bold uppercase transition-all ${selectedZone === zone.id ? 'bg-red-900 text-red-100 border-red-500' : 'bg-ifa-base border-ifa-border text-ifa-text'}`}
                             >
                                 {zone.label}
                             </button>
                         ))}
                     </div>
                </div>

                {/* Custom Search Section */}
                <div className="bg-ifa-base border border-ifa-border rounded-xl p-4 mb-8 shadow-lg">
                    <h3 className="text-ifa-gold text-xs font-bold uppercase mb-2">Sintoma Específico</h3>
                    <div className="flex gap-2">
                        <input 
                            value={customSymptom}
                            onChange={(e) => setCustomSymptom(e.target.value)}
                            placeholder="Descreva (ex: Vultos, Frio na espinha)..."
                            className="flex-grow bg-ifa-base-dark border border-ifa-border rounded px-3 py-2 text-ifa-text text-sm focus:border-ifa-gold outline-none"
                        />
                        <button 
                            onClick={() => handleCustomSearch()}
                            disabled={!customSymptom || isSearching}
                            className="bg-ifa-wood text-white px-4 rounded hover:bg-opacity-90 disabled:opacity-50"
                        >
                            {isSearching ? <Loader2 className="animate-spin" size={18}/> : <Search size={18}/>}
                        </button>
                    </div>
                </div>

                {customResult && (
                    <div className="bg-purple-900/20 border-2 border-purple-500 p-6 rounded-xl animate-fade-in text-center mb-8 relative">
                        <button onClick={() => setCustomResult(null)} className="absolute top-2 right-2 text-purple-300 hover:text-white">x</button>
                        <AlertTriangle className="mx-auto text-purple-400 mb-4" size={32} />
                        <h2 className="text-xl font-bold text-white mb-2">Força Identificada: {customResult.ajogunName}</h2>
                        <div className="text-left space-y-3">
                            <p className="text-sm text-gray-300"><strong className="text-purple-300">Causa Espiritual:</strong> {customResult.spiritualCause}</p>
                            <div className="bg-black/30 p-3 rounded border border-purple-500/30">
                                <p className="text-sm text-white italic"><strong className="text-purple-300">Remédio (Ebó):</strong> {customResult.suggestedRemedy}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AjogunDiagnosis;
