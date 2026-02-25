
import React, { useState, useEffect } from 'react';
import { X, Printer, CheckSquare, Square, FileText, ShoppingCart, DollarSign, BookOpen, Layers, Save } from 'lucide-react';

interface Recipe {
    title: string;
    odu: string;
    type: string;
    ingredients: string[];
    instructions: string;
}

interface ShoppingItem {
    name: string;
    quantity: number;
}

interface Props {
    title: string;
    description?: string;
    shoppingList?: ShoppingItem[]; 
    recipes?: Recipe[]; 
    category?: string;
    onClose: () => void;
    // Props para controle externo de orçamento (PrintLayout)
    externalPrices?: Record<string, number>;
    setExternalPrices?: (prices: Record<string, number>) => void;
    externalLabor?: number;
    setExternalLabor?: (val: number) => void;
}

const BabalawoListModal: React.FC<Props> = ({ 
    title, 
    description, 
    shoppingList = [], 
    recipes = [], 
    onClose,
    externalPrices,
    setExternalPrices,
    externalLabor,
    setExternalLabor
}) => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    
    // Fallback local se não houver controle externo
    const [localPrices, setLocalPrices] = useState<Record<string, number>>({});
    const [localLabor, setLocalLabor] = useState<number>(0);
    
    const [showPrices, setShowPrices] = useState(true);

    const prices = externalPrices || localPrices;
    const labor = externalLabor !== undefined ? externalLabor : localLabor;

    const handlePriceChange = (name: string, val: number) => {
        if (setExternalPrices) {
            setExternalPrices({ ...prices, [name]: val });
        } else {
            setLocalPrices(prev => ({ ...prev, [name]: val }));
        }
    };

    const handleLaborChange = (val: number) => {
        if (setExternalLabor) {
            setExternalLabor(val);
        } else {
            setLocalLabor(val);
        }
    };

    const toggleCheck = (name: string) => {
        setCheckedItems(prev => ({...prev, [name]: !prev[name]}));
    };

    // Safe reduce
    const safeList = Array.isArray(shoppingList) ? shoppingList : [];
    const safeRecipes = Array.isArray(recipes) ? recipes : [];

    const total = safeList.reduce((acc, item) => acc + (prices[item.name] || 0), 0) + labor;

    const handlePrint = () => {
        window.print();
    };

    const handleSaveAndClose = () => {
        // Since state is lifted (externalPrices), simply closing saves it to the parent.
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto print:p-0 print:block print:relative print:bg-white print:overflow-visible">
            
            {/* CSS hack for print to only show this modal content */}
            <style>{`
                @media print {
                    body > *:not(#root) { display: none !important; }
                    #root > *:not(.fixed) { display: none !important; }
                    .fixed { position: absolute !important; inset: 0 !important; background: white !important; z-index: 9999 !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:text-black { color: black !important; }
                    .print\\:border-black { border-color: black !important; }
                    .print\\:bg-white { background: white !important; }
                }
            `}</style>

            <div className="bg-[#fdfbf7] w-full max-w-4xl rounded-xl shadow-2xl relative flex flex-col my-auto min-h-[90vh] text-black border border-[#D4AF37] print:border-none print:shadow-none print:w-full print:max-w-none print:min-h-0 print:absolute print:top-0 print:left-0">
                
                {/* HEADER */}
                <div className="bg-[#1a1510] text-[#D4AF37] p-6 rounded-t-xl flex justify-between items-start border-b-4 border-[#D4AF37] print:bg-white print:text-black print:border-black print:p-0 print:mb-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest bg-[#D4AF37] text-black px-2 py-1 rounded mb-2 inline-block print:border print:border-black print:bg-white print:text-black">
                            Lista de Materiais / Orçamento
                        </span>
                        <h2 className="text-3xl font-serif font-bold leading-tight">{title}</h2>
                        {description && <p className="text-gray-400 text-sm mt-1 italic print:text-gray-600">{description}</p>}
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white print:hidden"><X size={28} /></button>
                </div>

                <div className="p-8 flex-grow space-y-12 print:p-0 print:space-y-8">
                    
                    {/* SECTION 1: MASTER SHOPPING LIST (AGGREGATED) */}
                    <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 print:bg-transparent print:border-black print:border-2 print:p-4">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-300 pb-2">
                            <h3 className="font-bold text-black uppercase text-lg flex items-center gap-2">
                                <ShoppingCart size={20} className="text-[#D4AF37] print:text-black"/> Lista de Compras
                            </h3>
                            <button 
                                onClick={() => setShowPrices(!showPrices)}
                                className="text-xs flex items-center gap-1 bg-white border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-200 print:hidden font-bold uppercase"
                            >
                                <DollarSign size={14}/> {showPrices ? 'Ocultar Preços' : 'Adicionar Preços'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            {safeList.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-200 pb-1 break-inside-avoid">
                                    <div 
                                        className="flex items-center gap-3 cursor-pointer group flex-grow"
                                        onClick={() => toggleCheck(item.name)}
                                    >
                                        <div className={`mt-0.5 print:hidden ${checkedItems[item.name] ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                            {checkedItems[item.name] ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </div>
                                        {/* Print Checkbox */}
                                        <div className="hidden print:block w-4 h-4 border border-black mr-2"></div>
                                        
                                        <span className={`font-serif text-base ${checkedItems[item.name] ? 'line-through text-gray-400' : 'text-gray-900 font-bold'}`}>
                                            {item.quantity > 1 ? <span className="text-red-700 font-bold mr-1 print:text-black">{item.quantity}x</span> : ''} 
                                            {item.name}
                                        </span>
                                    </div>
                                    
                                    {showPrices && (
                                        <div className="flex items-center gap-1 print:hidden">
                                            <span className="text-xs text-gray-500">R$</span>
                                            <input 
                                                type="number"
                                                value={prices[item.name] || ''}
                                                className="w-20 border border-gray-300 rounded px-1 text-right text-sm bg-white"
                                                placeholder="0.00"
                                                onChange={(e) => handlePriceChange(item.name, parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    )}
                                    {/* Print Price View */}
                                    {showPrices && (prices[item.name] > 0) && (
                                        <div className="hidden print:block font-mono">
                                            R$ {prices[item.name].toFixed(2)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {showPrices && (
                            <div className="mt-6 pt-4 border-t-2 border-gray-300 bg-white p-4 rounded print:bg-transparent print:border-black">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-gray-600 uppercase print:text-black">Mão de Obra / Ase</span>
                                    <div className="flex items-center gap-1 print:hidden">
                                        <span className="text-xs text-gray-500">R$</span>
                                        <input 
                                            type="number"
                                            value={labor || ''}
                                            className="w-24 border border-gray-300 rounded px-1 text-right text-sm font-bold"
                                            placeholder="0.00"
                                            onChange={(e) => handleLaborChange(parseFloat(e.target.value) || 0)}
                                        />
                                    </div>
                                    <div className="hidden print:block font-bold">R$ {labor.toFixed(2)}</div>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold text-[#1a1510] mt-4 pt-4 border-t border-gray-200 print:text-black print:border-black">
                                    <span>TOTAL ESTIMADO</span>
                                    <span>R$ {total.toFixed(2)}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION 2: RECIPE BOOK (Only if recipes exist and not just shopping) */}
                    {safeRecipes.length > 0 && (
                        <div className="print:break-before-page">
                            <div className="flex items-center gap-2 mb-6 border-b-2 border-black pb-2">
                                 <BookOpen size={24} />
                                 <h2 className="text-2xl font-serif font-bold uppercase">Caderno de Fundamentos</h2>
                            </div>
                            
                            <div className="space-y-12">
                                {safeRecipes.map((recipe, idx) => (
                                    <div key={idx} className="break-inside-avoid border-l-4 border-[#1a1510] pl-6 py-2">
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="bg-[#1a1510] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded uppercase print:border print:border-black print:bg-white print:text-black">{recipe.type}</span>
                                                <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase print:border print:border-black print:bg-white print:text-black">Odu: {recipe.odu}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#1a1510] font-serif uppercase">{recipe.title}</h3>
                                        </div>

                                        <div className="mb-4 bg-yellow-50/50 p-4 rounded border border-yellow-200 print:border-black print:bg-transparent">
                                            <h4 className="font-bold text-xs uppercase text-yellow-800 mb-2 flex items-center gap-2 print:text-black">
                                                <Layers size={14}/> Materiais:
                                            </h4>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-800 print:text-black">
                                                {recipe.ingredients.map((ing, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="mt-1.5 w-1 h-1 bg-black rounded-full"></span>
                                                        {ing}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xs uppercase text-gray-500 mb-2 flex items-center gap-2 print:text-black">
                                                <FileText size={14}/> Modo de Preparo:
                                            </h4>
                                            <div className="prose prose-sm max-w-none text-gray-900 leading-relaxed whitespace-pre-line font-serif text-justify border-t border-gray-200 pt-2 bg-white p-4 rounded shadow-inner print:shadow-none print:border-none print:p-0">
                                                {recipe.instructions}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="bg-gray-100 p-4 rounded-b-xl border-t border-gray-200 flex justify-between items-center print:hidden">
                    <p className="text-xs text-gray-500 italic hidden md:block">
                        * Os valores salvos aqui aparecerão automaticamente no relatório final.
                    </p>
                    <div className="flex gap-3 ml-auto">
                        <button onClick={handlePrint} className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded font-bold uppercase flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                            <Printer size={20} /> Imprimir Lista
                        </button>
                        <button onClick={handleSaveAndClose} className="bg-[#1a1510] text-[#D4AF37] px-6 py-3 rounded font-bold uppercase flex items-center gap-2 hover:bg-black transition-colors shadow-lg animate-pulse">
                            <Save size={20} /> Salvar e Incluir no Documento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BabalawoListModal;
