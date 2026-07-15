
import React, { useState } from 'react';
import { CheckCircle2, DollarSign, Ban, MessageCircle, FileText, ShoppingBag, AlertTriangle, Calculator, Skull, Zap, List, BookOpen, Clock } from 'lucide-react';
import ShoppingList from './ShoppingList';
import TextReader from './TextReader';
import EboTimer from './EboTimer';
import BabalawoListModal from './BabalawoListModal';
import { EboDetail, EboSelectionType } from '../types';

interface Props {
    category?: string;
    basic?: EboDetail;
    medium?: EboDetail;
    complete?: EboDetail;
    currentSelection: EboSelectionType;
    onSelect: (type: EboSelectionType) => void;
    oduName: string;
    context?: string; 
}

// Fallback detail to prevent crashes
const DEFAULT_DETAIL: EboDetail = {
    description: "Informação indisponível no momento.",
    ingredients: [],
    instructions: "Consulte o oráculo novamente ou use intuição sacerdotal."
};

const EboSelector: React.FC<Props> = ({ category, basic, medium, complete, currentSelection, onSelect, oduName, context }) => {
    const [showInstructions, setShowInstructions] = useState(false);
    const [showBudget, setShowBudget] = useState(false);
    const [showBabalawoList, setShowBabalawoList] = useState(false);
    const [prices, setPrices] = useState<Record<string, number>>({});
    const [labor, setLabor] = useState<number>(0);

    // Robust Selection Logic
    let activeDetail: EboDetail = DEFAULT_DETAIL;
    if (currentSelection === 'basic' && basic) activeDetail = basic;
    if (currentSelection === 'medium' && medium) activeDetail = medium;
    if (currentSelection === 'complete' && complete) activeDetail = complete;

    // Force default description if empty from API
    if (!activeDetail.description) activeDetail.description = "Detalhes não gerados. Consulte o Babalawo.";
    if (!activeDetail.ingredients) activeDetail.ingredients = [];

    const calculateTotal = () => {
        const materials = activeDetail.ingredients.reduce((acc, item) => acc + (prices[item] || 0), 0);
        return materials + labor;
    };

    const handleShareBudget = () => {
        const total = calculateTotal();
        const text = `*Orçamento Ebó (${context || category || 'Geral'})*\n*Odu:* ${oduName}\n*Ritual:* ${activeDetail.title || 'Personalizado'}\n\n*Materiais:*\n${activeDetail.ingredients.map(i => `- ${i}: R$ ${prices[i] || 0}`).join('\n')}\n\n*Mão de Obra:* R$ ${labor}\n*TOTAL:* R$ ${total.toFixed(2)}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="mt-4 pt-4 border-t border-ifa-border/30 w-full">
            <h4 className="text-ifa-gold text-xs font-bold uppercase mb-3 tracking-widest flex items-center justify-between">
                <span>{category ? `${category}` : 'Opções de Ritual'}</span>
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                <button onClick={() => onSelect('basic')} className={`py-3 px-2 rounded border text-[10px] font-bold uppercase flex flex-col items-center justify-center gap-1 transition-all ${currentSelection === 'basic' ? 'bg-green-900/40 border-green-500 text-green-400' : 'bg-ifa-base border-ifa-border text-ifa-neutral'}`}>
                    <CheckCircle2 size={16} /> Básico (Acessível)
                </button>
                <button onClick={() => onSelect('medium')} className={`py-3 px-2 rounded border text-[10px] font-bold uppercase flex flex-col items-center justify-center gap-1 transition-all ${currentSelection === 'medium' ? 'bg-blue-900/40 border-blue-500 text-blue-400' : 'bg-ifa-base border-ifa-border text-ifa-neutral'}`}>
                    <Zap size={16} /> Médio (Tradição)
                </button>
                <button onClick={() => onSelect('complete')} className={`py-3 px-2 rounded border text-[10px] font-bold uppercase flex flex-col items-center justify-center gap-1 transition-all ${currentSelection === 'complete' ? 'bg-red-900/40 border-red-500 text-red-400' : 'bg-ifa-base border-ifa-border text-ifa-neutral'}`}>
                    <Skull size={16} /> Completo (Matança)
                </button>
                <button onClick={() => onSelect('none')} className={`py-3 px-2 rounded border text-[10px] font-bold uppercase flex flex-col items-center justify-center gap-1 transition-all ${currentSelection === 'none' ? 'bg-gray-800 border-gray-600 text-gray-400' : 'bg-ifa-base border-ifa-border text-ifa-neutral'}`}>
                    <Ban size={16} /> Dispensar
                </button>
            </div>

            {currentSelection !== 'none' && (
                <div className={`rounded-xl border-l-4 overflow-hidden animate-fade-in ${currentSelection === 'basic' ? 'bg-green-900/10 border-green-500' : currentSelection === 'medium' ? 'bg-blue-900/10 border-blue-500' : 'bg-red-900/10 border-red-600'}`}>
                    <div className="p-4">
                        {activeDetail.title && <h3 className="font-bold text-lg text-ifa-text mb-2 border-b border-ifa-border/20 pb-1">{activeDetail.title}</h3>}
                        
                        <div className="flex justify-between items-start mb-2 gap-4">
                            <p className="leading-relaxed text-ifa-text font-medium text-sm md:text-base">{activeDetail.description}</p>
                            <TextReader text={activeDetail.description} />
                        </div>

                        {/* WARNING FOR COMPLETE */}
                        {currentSelection === 'complete' && (
                            <div className="bg-red-900/30 border border-red-500/50 p-3 rounded mb-4 flex items-start gap-2">
                                <AlertTriangle className="text-red-500 flex-shrink-0" size={18} />
                                <div className="text-xs text-red-200">
                                    <p className="font-bold">USO EXCLUSIVO DO BABALAWO</p>
                                    <p>Este Ebó envolve sacrifício (Eje) e fundamentos secretos.</p>
                                </div>
                            </div>
                        )}

                        <ShoppingList ingredients={activeDetail.ingredients} />

                        {/* OFO SECTION - ALWAYS VISIBLE FOR SELECTED */}
                        {activeDetail.ofo && (
                            <div className="mt-4 bg-black/40 p-4 rounded border-l-4 border-ifa-gold shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-xs font-bold text-ifa-gold uppercase flex items-center gap-2"><BookOpen size={14}/> Ofo (Encantamento Obrigatório)</h5>
                                    <TextReader text={activeDetail.ofo} forceLang="yo-NG" label="Recitar" />
                                </div>
                                <p className="font-serif italic text-white text-base md:text-lg mb-2 leading-relaxed whitespace-pre-line">"{activeDetail.ofo}"</p>
                                {activeDetail.translation && <p className="text-xs text-ifa-neutral border-t border-white/10 pt-2 italic">{activeDetail.translation}</p>}
                            </div>
                        )}

                        {/* PREPARATION TOGGLE - MORE PROMINENT */}
                        <button 
                            onClick={() => setShowInstructions(!showInstructions)} 
                            className="w-full mt-4 flex items-center justify-between gap-2 text-sm font-bold uppercase tracking-widest px-4 py-3 rounded transition-colors bg-ifa-wood text-white hover:bg-ifa-gold hover:text-black shadow-lg"
                        >
                            <span className="flex items-center gap-2"><FileText size={16} /> {showInstructions ? 'Ocultar Modo de Preparo' : 'Ver Modo de Preparo Detalhado'}</span>
                            <span>{showInstructions ? '▲' : '▼'}</span>
                        </button>

                        {showInstructions && (
                            <div className="p-4 bg-black/30 border-x border-b border-ifa-wood/50 rounded-b text-sm font-sans text-gray-200 leading-relaxed whitespace-pre-line relative animate-slide-down">
                                <div className="absolute top-2 right-2 text-ifa-neutral opacity-50"><Clock size={16} /></div>
                                <h5 className="font-bold text-ifa-gold mb-2 uppercase text-xs">Instruções Sacerdotais:</h5>
                                {activeDetail.instructions || "Siga a intuição do oráculo. As instruções específicas não foram geradas."}
                                <EboTimer />
                            </div>
                        )}

                        {/* BUDGET SECTION */}
                        <div className="mt-4 bg-black/20 p-3 rounded border border-ifa-border/30">
                            <button 
                                onClick={() => setShowBudget(!showBudget)}
                                className="w-full flex items-center justify-between text-xs font-bold uppercase text-ifa-gold mb-2"
                            >
                                <span className="flex items-center gap-2"><Calculator size={14}/> Orçamento Rápido</span>
                                <span>{showBudget ? 'Fechar' : 'Abrir'}</span>
                            </button>
                            
                            {showBudget && (
                                <div className="space-y-2 animate-fade-in">
                                    {activeDetail.ingredients.map((ing, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-xs">
                                            <span className="text-ifa-text-light">{ing}</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-ifa-neutral">R$</span>
                                                <input 
                                                    type="number" 
                                                    className="w-16 bg-ifa-base border border-ifa-border rounded px-1 text-right text-ifa-text"
                                                    onChange={(e) => setPrices({...prices, [ing]: parseFloat(e.target.value) || 0})}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center text-xs pt-2 border-t border-ifa-border/30">
                                        <span className="text-ifa-wood font-bold">Mão de Obra</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-ifa-neutral">R$</span>
                                            <input 
                                                type="number" 
                                                className="w-16 bg-ifa-base border border-ifa-border rounded px-1 text-right text-ifa-text"
                                                onChange={(e) => setLabor(parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center bg-ifa-base p-2 rounded mt-2">
                                        <span className="font-bold text-ifa-gold">TOTAL</span>
                                        <span className="font-bold text-white">R$ {calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <button onClick={handleShareBudget} className="w-full py-2 bg-green-700 text-white rounded text-xs font-bold uppercase hover:bg-green-600 mt-2">
                                        Enviar Orçamento (WhatsApp)
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 mt-4 flex-wrap">
                            <button onClick={() => {const text=`*Ebó - ${oduName}*\n\n${activeDetail.description}`; window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');}} className="flex-1 py-3 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/50 rounded font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#25D366]/30"><MessageCircle size={16} /> WhatsApp</button>
                            <button 
                                onClick={() => setShowBabalawoList(true)}
                                className="flex-1 py-3 bg-ifa-base border border-ifa-gold text-ifa-gold rounded font-bold uppercase text-xs flex items-center justify-center gap-2 hover:bg-ifa-gold hover:text-black transition-all"
                            >
                                <List size={16} /> Ficha Técnica (PDF)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showBabalawoList && activeDetail && (
                <BabalawoListModal 
                    title={`${activeDetail.title || category || 'Ritual'} - ${oduName}`}
                    category="Ebó"
                    description={activeDetail.description}
                    shoppingList={activeDetail.ingredients.map(i => ({name: i, quantity: 1}))}
                    recipes={[{
                        title: activeDetail.title || activeDetail.description,
                        odu: oduName,
                        type: 'Ebó',
                        ingredients: activeDetail.ingredients,
                        instructions: activeDetail.instructions + (activeDetail.ofo ? `\n\nOfo de Ativação:\n"${activeDetail.ofo}"\n\nTradução: ${activeDetail.translation}` : "")
                    }]}
                    onClose={() => setShowBabalawoList(false)}
                />
            )}
        </div>
    );
};

export default EboSelector;
