
import React, { useState } from 'react';
import { ArrowLeft, Scale, Gavel, ShieldAlert, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import EboSelector from './EboSelector';
import { EboSelectionType, SangoJusticeResult } from '../types';
import { askSangoJustice } from '../services/geminiService';

const SangoWheel = ({ onBack }: { onBack: () => void }) => {
    const [form, setForm] = useState({ myName: '', opponent: '', caseNumber: '', details: '' });
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<SangoJusticeResult | null>(null);
    const [selection, setSelection] = useState<EboSelectionType>('none');

    const handleCast = async () => {
        if (!form.myName || !form.details) return;
        setIsSpinning(true);
        setSelection('none');
        
        try {
            const data = await askSangoJustice(form.myName, form.opponent, form.details);
            setResult(data);
        } catch (error) {
            alert("Erro ao consultar Xangô. Tente novamente.");
        } finally {
            setIsSpinning(false);
        }
    };

    const reset = () => {
        setResult(null);
        setForm({ myName: '', opponent: '', caseNumber: '', details: '' });
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-lg flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Scale size={20}/> Roda de Xangô (Oráculo)</h1>
                <div className="w-6"></div>
            </div>

            {!result ? (
                <div className="w-full max-w-lg bg-ifa-base border border-ifa-border rounded-xl p-6 shadow-xl">
                    <h2 className="text-lg font-bold text-red-500 mb-4 uppercase flex items-center gap-2">
                        <Gavel size={20} /> Tribunal Espiritual
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Seu Nome / Cliente</label>
                            <input 
                                value={form.myName}
                                onChange={e => setForm({...form, myName: e.target.value})}
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                placeholder="Quem pede justiça?"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Parte Contrária</label>
                            <input 
                                value={form.opponent}
                                onChange={e => setForm({...form, opponent: e.target.value})}
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                placeholder="Nome do adversário (opcional)"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Detalhes da Causa</label>
                            <textarea 
                                value={form.details}
                                onChange={e => setForm({...form, details: e.target.value})}
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text h-24 resize-none"
                                placeholder="Descreva o problema jurídico ou disputa..."
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleCast}
                        disabled={!form.myName || !form.details || isSpinning}
                        className={`w-full py-4 rounded-xl font-bold uppercase flex items-center justify-center gap-2 transition-all ${isSpinning ? 'bg-red-900 text-red-300 cursor-wait' : 'bg-red-600 text-white hover:bg-red-700'}`}
                    >
                        {isSpinning ? <><Loader2 className="animate-spin"/> Consultando...</> : "Obter Veredito"}
                        {!isSpinning && <Scale size={20} />}
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-lg animate-fade-in text-center pb-20">
                    <div className="bg-ifa-base border-4 border-red-600 p-8 rounded-xl shadow-2xl mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 bg-red-600 text-white text-xs font-bold uppercase rounded-bl">
                            Sentença
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-ifa-gold mb-2">{result.name}</h2>
                        
                        <div className="my-6">
                            {result.outcome === 'victory_hard' && <ShieldAlert size={64} className="mx-auto text-yellow-500" />}
                            {result.outcome === 'peace' && <CheckCircle2 size={64} className="mx-auto text-green-500" />}
                            {result.outcome === 'trouble' && <AlertTriangle size={64} className="mx-auto text-red-500" />}
                        </div>

                        <p className="text-lg text-ifa-text mb-6 font-medium">"{result.advice}"</p>

                        <div className="text-left bg-black/20 p-4 rounded mb-6 border border-ifa-border/30">
                            <h4 className="text-xs font-bold text-ifa-wood uppercase mb-1">Akose (Magia Sugerida):</h4>
                            <p className="text-sm text-ifa-text mb-3">{result.akose}</p>
                            
                            <h4 className="text-xs font-bold text-ifa-wood uppercase mb-1">Ofo (Encantamento):</h4>
                            <p className="text-sm text-ifa-text italic font-serif">"{result.ofo}"</p>
                        </div>
                        
                        <EboSelector 
                            category="Ebó de Justiça (3 Níveis)"
                            basic={result.ebos.basic}
                            medium={result.ebos.medium}
                            complete={result.ebos.complete}
                            currentSelection={selection}
                            onSelect={setSelection}
                            oduName={result.name}
                            context="Justiça de Xangô"
                        />
                    </div>

                    <div className="bg-ifa-wood text-white p-4 rounded-lg mb-6">
                        <p className="text-xs uppercase font-bold mb-1">Oração para o caso:</p>
                        <p className="italic font-serif">"Sango, Kabiyesi! Julgue com a verdade. Que a justiça seja feita. Kawo Kabiyesi!"</p>
                    </div>

                    <button onClick={reset} className="text-ifa-neutral hover:text-white underline text-sm">
                        Nova Consulta
                    </button>
                </div>
            )}
        </div>
    );
};

export default SangoWheel;
