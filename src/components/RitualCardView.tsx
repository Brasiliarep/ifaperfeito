
import React, { useState, useEffect } from 'react';
import { ArrowLeft, FlaskConical, ShoppingCart, Hammer, DollarSign, MessageCircle, Printer, X, AlertTriangle, BookOpen, Mail } from 'lucide-react';
import { OogunItem } from '../data/offlineLibrary'; 
import TextReader from './TextReader';

// --- SHARED BUDGET MODAL ---
const ItemizedBudgetModal = ({ isOpen, onClose, levelName, materials, onSave }: any) => {
    const [prices, setPrices] = useState<Record<string, string>>({});
    const [laborCost, setLaborCost] = useState<string>("0");

    useEffect(() => {
        if(isOpen && materials) {
            const initialPrices: Record<string, string> = {};
            materials.forEach((mat: string) => {
                initialPrices[mat] = ""; 
            });
            setPrices(initialPrices);
            setLaborCost("");
        }
    }, [isOpen, materials]);

    if (!isOpen) return null;

    const handlePriceChange = (item: string, val: string) => {
        if (/^\d*\.?\d*$/.test(val)) {
            setPrices(prev => ({ ...prev, [item]: val }));
        }
    };

    const handleLaborChange = (val: string) => {
        if (/^\d*\.?\d*$/.test(val)) {
            setLaborCost(val);
        }
    };

    const getNumber = (val: string) => parseFloat(val) || 0;
    const materialSubtotal = (Object.values(prices) as string[]).reduce((acc, val) => acc + getNumber(val), 0);
    const total = materialSubtotal + getNumber(laborCost);

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-ifa-base border-2 border-ifa-gold rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-ifa-border bg-[#1a1510]">
                    <div>
                        <h3 className="text-xl font-serif text-ifa-gold font-bold">Orçamento Detalhado</h3>
                        <p className="text-xs text-ifa-neutral uppercase tracking-widest">{levelName}</p>
                    </div>
                    <button onClick={onClose}><X className="text-ifa-neutral hover:text-white" /></button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    <div>
                        <h4 className="text-xs font-bold text-ifa-neutral uppercase mb-3 flex items-center gap-2">
                            <ShoppingCart size={14}/> Precificar Materiais
                        </h4>
                        <div className="space-y-3">
                            {materials.map((mat: string, idx: number) => (
                                <div key={idx} className="flex items-center justify-between bg-ifa-base-dark p-3 rounded border border-ifa-border">
                                    <span className="text-sm text-ifa-text-light w-2/3">{mat}</span>
                                    <div className="flex items-center gap-2 w-1/3">
                                        <span className="text-xs text-green-500 font-bold">R$</span>
                                        <input 
                                            type="number" inputMode="decimal" placeholder="0.00"
                                            value={prices[mat] || ''}
                                            onChange={(e) => handlePriceChange(mat, e.target.value)}
                                            className="w-full bg-ifa-base border border-ifa-border rounded px-2 py-1 text-right text-white focus:border-ifa-gold outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-ifa-border/30">
                            <span className="text-xs text-ifa-neutral">Subtotal Materiais:</span>
                            <span className="text-green-400 font-bold">R$ {materialSubtotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="bg-ifa-wood/10 p-4 rounded border border-ifa-wood/30">
                        <label className="text-xs font-bold text-ifa-wood uppercase mb-2 block">Mão de Obra (Asé)</label>
                        <div className="flex items-center gap-2">
                            <span className="text-xl text-ifa-gold font-bold">R$</span>
                            <input 
                                type="number" inputMode="decimal"
                                value={laborCost} onChange={(e) => handleLaborChange(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-ifa-base border-2 border-ifa-wood/50 rounded p-3 text-xl text-white font-bold focus:border-ifa-gold outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-ifa-border bg-[#1a1510]">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-sm text-ifa-neutral uppercase font-bold">Valor Final</span>
                        <span className="text-4xl font-bold text-ifa-gold">R$ {total.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={() => {
                            const numericPrices: Record<string, number> = {};
                            Object.keys(prices).forEach(k => numericPrices[k] = getNumber(prices[k]));
                            onSave(total, materialSubtotal, getNumber(laborCost), numericPrices);
                        }}
                        className="w-full bg-ifa-gold text-black py-4 rounded-xl font-bold uppercase flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg"
                    >
                        <DollarSign size={20} /> Salvar Orçamento
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN CARD COMPONENT ---
const RitualCardView = ({ item, onClose, isAiGenerated = false }: { item: OogunItem, onClose: () => void, isAiGenerated?: boolean }) => {
    const [selectedLevelIndex, setSelectedLevelIndex] = useState(0); 
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    
    // Financial State
    const [savedTotal, setSavedTotal] = useState<number | null>(null);
    const [breakdown, setBreakdown] = useState({ mat: 0, labor: 0 });
    const [itemizedPrices, setItemizedPrices] = useState<Record<string, number>>({});

    const levels = item.niveis || [];
    const currentLevel = levels[selectedLevelIndex] || { tipo: 'N/A', materiais: [], preparo: [], estimativa_materiais: 0 };

    useEffect(() => {
        setSavedTotal(null);
        setBreakdown({ mat: 0, labor: 0 });
        setItemizedPrices({});
    }, [selectedLevelIndex]);

    const handleSaveBudget = (total: number, mat: number, lab: number, prices: Record<string, number>) => {
        setSavedTotal(total);
        setBreakdown({ mat, labor: lab });
        setItemizedPrices(prices);
        setShowBudgetModal(false);
    };

    const generateBudgetSummary = () => {
        let text = `*🕊️ ORÇAMENTO DETALHADO - IFÁ*\n\n` +
                   `*Trabalho:* ${item.title}\n` +
                   `*Finalidade:* ${item.purpose}\n` +
                   `*Nível:* ${currentLevel.tipo}\n\n` +
                   `*MATERIAIS NECESSÁRIOS:*\n`;
        
        currentLevel.materiais.forEach(mat => {
            const price = itemizedPrices[mat];
            text += `- ${mat} ${price ? `(R$ ${price.toFixed(2)})` : ''}\n`;
        });

        if (savedTotal !== null) {
            text += `\n*-------------------------*`;
            text += `\n*Subtotal Materiais:* R$ ${breakdown.mat.toFixed(2)}\n` +
                    `*Mão de Obra (Asé):* R$ ${breakdown.labor.toFixed(2)}\n\n` +
                    `*💰 TOTAL GERAL: R$ ${savedTotal.toFixed(2)}*`;
        } else {
            text += `\n*Estimativa Base:* R$ ${currentLevel.estimativa_materiais.toFixed(2)}`;
        }
        
        text += `\n\n_Pagamento via PIX ou Cartão._\nAxé!`;
        return text;
    };

    const handleWhatsapp = () => {
        const text = generateBudgetSummary();
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleEmail = () => {
        const subject = `Orçamento: ${item.title}`;
        const body = generateBudgetSummary();
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={`fixed inset-0 z-[100] bg-ifa-base-dark flex flex-col pt-safe animate-fade-in overflow-hidden ${isAiGenerated ? 'absolute top-0 left-0 w-full h-full' : ''}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-ifa-border bg-[#1a1510] shadow-md z-10">
                <button onClick={onClose} className="text-ifa-neutral hover:text-ifa-text flex items-center gap-2">
                    <ArrowLeft /> Voltar
                </button>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-ifa-gold font-bold uppercase tracking-widest">
                        {isAiGenerated ? 'GERADO POR ORÁCULO' : `${item.category} • ${item.subCategory}`}
                    </span>
                    <span className="text-xs text-ifa-neutral">{item.oduReference}</span>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto pb-48 bg-ifa-base-dark">
                
                {/* Hero */}
                <div className="p-6 md:p-8 bg-gradient-to-b from-[#1a1510] to-ifa-base-dark border-b border-ifa-border relative">
                    <div className="absolute top-4 right-4 opacity-10">
                        <FlaskConical size={80} className="text-ifa-gold"/>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight">{item.title}</h1>
                    <p className="text-lg text-ifa-gold italic font-medium mb-4">"{item.nomeYoruba}"</p>
                    <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">{item.purpose}</p>
                    
                    <div className="flex gap-2 mt-4">
                        {item.tags?.map(t => <span key={t} className="text-[10px] bg-black/40 px-2 py-1 rounded border border-gray-700 text-gray-400 uppercase">{t}</span>)}
                        <span className={`text-[10px] px-2 py-1 rounded border uppercase font-bold ${item.complexity === 'Alta' || item.complexity === 'Perigosa' ? 'text-red-400 border-red-900 bg-red-900/20' : 'text-green-400 border-green-900 bg-green-900/20'}`}>
                            {item.complexity}
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-ifa-border bg-black/20 sticky top-0 z-10 backdrop-blur-sm overflow-x-auto no-scrollbar">
                    {levels.map((lvl, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setSelectedLevelIndex(idx)}
                            className={`flex-1 py-4 px-6 text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap border-b-4 ${selectedLevelIndex === idx ? 'border-ifa-gold text-ifa-gold bg-white/5' : 'border-transparent text-ifa-neutral hover:text-white'}`}
                        >
                            {lvl.tipo}
                        </button>
                    ))}
                </div>

                <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
                    
                    {/* Warning */}
                    {currentLevel.tipo.includes('COMPLETO') && (
                        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex gap-3 items-start animate-pulse">
                            <AlertTriangle className="text-red-500 flex-shrink-0" />
                            <div className="text-xs text-red-200">
                                <strong className="uppercase">Atenção Sacerdotal (Ewo)</strong>
                                <p>Este nível envolve fundamentos profundos e segredos de Igbodu. Use com responsabilidade.</p>
                            </div>
                        </div>
                    )}

                    {/* Materiais */}
                    <div className="bg-ifa-surface p-6 rounded-xl border border-ifa-border shadow-lg">
                        <h3 className="text-ifa-gold font-bold uppercase text-sm mb-4 flex items-center gap-2 border-b border-ifa-border/30 pb-2">
                            <ShoppingCart size={16} /> Ingredientes ({currentLevel.tipo})
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                            {currentLevel.materiais.map((mat, idx) => (
                                <li key={idx} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-ifa-gold flex-shrink-0"></span> 
                                        <span>{mat}</span>
                                    </div>
                                    {savedTotal !== null && itemizedPrices[mat] > 0 && (
                                        <span className="text-xs text-green-400 font-bold bg-green-900/20 px-2 py-0.5 rounded">
                                            R$ {itemizedPrices[mat].toFixed(2)}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Preparo */}
                    <div>
                        <h3 className="text-white font-bold uppercase text-sm mb-4 flex items-center gap-2">
                            <Hammer size={16} /> Ritual de Preparo
                        </h3>
                        <div className="space-y-4">
                            {currentLevel.preparo.map((step, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-black/20 rounded-lg border border-ifa-border/30">
                                    <span className="text-ifa-gold font-bold text-lg">{i+1}</span>
                                    <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* OFO */}
                    {currentLevel.ofo && (
                        <div className="bg-black/40 p-6 rounded-xl border-l-4 border-ifa-gold relative shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-ifa-gold text-xs font-bold uppercase flex items-center gap-2">
                                    <BookOpen size={14}/> Ofó (Encantamento)
                                </h4>
                                <TextReader text={currentLevel.ofo} forceLang="yo-NG" label="Recitar" />
                            </div>
                            <p className="text-lg font-serif italic text-white leading-relaxed whitespace-pre-line mb-3">
                                "{currentLevel.ofo}"
                            </p>
                            {currentLevel.traducao && (
                                <p className="text-sm text-ifa-neutral border-t border-ifa-border/30 pt-2 italic">
                                    Tradução: {currentLevel.traducao}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* --- ACTION BAR (FIXED FOOTER) --- */}
            <div className="fixed bottom-0 left-0 w-full bg-[#1a1510] border-t-2 border-[#5D4037] p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    {/* Display de Preço */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start bg-black/30 p-3 rounded-lg border border-ifa-border min-w-[200px]">
                        <div>
                            <p className="text-[10px] text-ifa-neutral uppercase font-bold">
                                {savedTotal !== null ? 'Valor Definido' : 'Estimativa Base'}
                            </p>
                            <p className="text-xl font-bold text-green-400">
                                R$ {savedTotal !== null ? savedTotal.toFixed(2) : currentLevel.estimativa_materiais.toFixed(2)}
                            </p>
                        </div>
                        {savedTotal !== null && <span className="text-[10px] bg-green-900 text-green-300 px-2 py-1 rounded border border-green-500">Salvo</span>}
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                        <button 
                            onClick={() => setShowBudgetModal(true)}
                            className="flex-shrink-0 flex items-center gap-2 bg-ifa-wood text-white px-4 py-3 rounded-xl font-bold uppercase text-xs hover:bg-ifa-gold hover:text-black transition-colors"
                        >
                            <DollarSign size={18} /> Orçar
                        </button>

                        <button 
                            onClick={handleWhatsapp}
                            className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] text-black px-4 py-3 rounded-xl font-bold uppercase text-xs hover:brightness-110 transition-colors shadow-lg"
                        >
                            <MessageCircle size={18} /> Zap
                        </button>

                        <button 
                            onClick={handleEmail}
                            className="flex-shrink-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold uppercase text-xs hover:brightness-110 transition-colors"
                        >
                            <Mail size={18} /> Email
                        </button>

                        <button 
                            onClick={handlePrint}
                            className="flex-shrink-0 p-3 bg-ifa-base border border-ifa-border rounded-xl text-ifa-neutral hover:text-white"
                            title="Imprimir Ficha"
                        >
                            <Printer size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <ItemizedBudgetModal 
                isOpen={showBudgetModal} 
                onClose={() => setShowBudgetModal(false)}
                levelName={currentLevel.tipo}
                materials={currentLevel.materiais}
                onSave={handleSaveBudget}
            />
        </div>
    );
};

export default RitualCardView;
