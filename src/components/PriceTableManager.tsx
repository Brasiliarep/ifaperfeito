
import React, { useState, useEffect, useMemo } from 'react';
import { InventoryItem } from '../types';
import { getInventory, updateInventoryItem } from '../services/storageService';
import { ArrowLeft, Plus, Search, DollarSign, TrendingUp, Save, X, Edit2 } from 'lucide-react';

const PriceTableManager = ({ onBack }: { onBack: () => void }) => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [search, setSearch] = useState('');
    const [editingItem, setEditingItem] = useState<Partial<InventoryItem> | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setItems(getInventory());
    };

    const handleSave = () => {
        if (!editingItem || !editingItem.name) return;

        // Find existing or create new
        const existing = items.find(i => i.id === editingItem.id);
        
        const newItem: InventoryItem = {
            id: existing?.id || crypto.randomUUID(),
            name: editingItem.name,
            quantity: existing?.quantity || 0, // Preserve quantity if exists, else 0
            unit: existing?.unit || 'unidade',
            category: existing?.category || 'other',
            minThreshold: existing?.minThreshold || 5,
            purchasePrice: parseFloat(String(editingItem.purchasePrice || 0)),
            sellingPrice: parseFloat(String(editingItem.sellingPrice || 0))
        };

        updateInventoryItem(newItem);
        setEditingItem(null);
        loadData();
    };

    const startAdd = () => {
        setEditingItem({ name: '', purchasePrice: 0, sellingPrice: 0 });
    };

    const startEdit = (item: InventoryItem) => {
        setEditingItem({ ...item });
    };

    const filteredItems = useMemo(() => {
        return items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    }, [items, search]);

    const calculateMargin = (buy: number, sell: number) => {
        if (!buy || buy === 0) return 100;
        return ((sell - buy) / buy) * 100;
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <DollarSign size={24} /> Tabela de Preços
                    </h1>
                </div>

                {/* Search & Add */}
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-grow">
                        <input 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar item..." 
                            className="w-full bg-ifa-base border border-ifa-border rounded-lg pl-10 pr-4 py-3 focus:border-ifa-gold outline-none"
                        />
                        <Search className="absolute left-3 top-3.5 text-ifa-neutral" size={18} />
                    </div>
                    <button onClick={startAdd} className="bg-ifa-gold text-ifa-base px-4 rounded-lg font-bold hover:opacity-90 flex items-center gap-2">
                        <Plus size={20} /> <span className="hidden md:inline">Novo</span>
                    </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 text-xs font-bold uppercase text-ifa-neutral mb-2 px-4">
                    <div className="col-span-5 md:col-span-4">Item</div>
                    <div className="col-span-2 text-right">Compra</div>
                    <div className="col-span-2 text-right">Venda</div>
                    <div className="col-span-2 text-center hidden md:block">Margem</div>
                    <div className="col-span-3 md:col-span-2 text-right">Ação</div>
                </div>

                {/* List */}
                <div className="space-y-2">
                    {filteredItems.map(item => {
                        const margin = calculateMargin(item.purchasePrice || 0, item.sellingPrice || 0);
                        return (
                            <div key={item.id} className="bg-ifa-base border border-ifa-border rounded-lg p-4 grid grid-cols-12 gap-2 items-center hover:border-ifa-gold transition-colors">
                                <div className="col-span-5 md:col-span-4 font-bold text-sm truncate">{item.name}</div>
                                <div className="col-span-2 text-right text-sm text-red-300">
                                    <span className="text-[10px] opacity-50 mr-1">R$</span>{item.purchasePrice?.toFixed(2) || '0.00'}
                                </div>
                                <div className="col-span-2 text-right text-sm text-green-400">
                                    <span className="text-[10px] opacity-50 mr-1">R$</span>{item.sellingPrice?.toFixed(2) || '0.00'}
                                </div>
                                <div className="col-span-2 text-center hidden md:block">
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${margin > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                        {margin.toFixed(0)}%
                                    </span>
                                </div>
                                <div className="col-span-3 md:col-span-2 flex justify-end">
                                    <button onClick={() => startEdit(item)} className="p-2 bg-ifa-wood text-white rounded hover:bg-ifa-gold hover:text-black">
                                        <Edit2 size={14} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    {filteredItems.length === 0 && <p className="text-center text-ifa-neutral py-8">Nenhum item encontrado.</p>}
                </div>

                {/* Edit Modal */}
                {editingItem && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-ifa-base border border-ifa-gold rounded-xl p-6 w-full max-w-sm shadow-2xl">
                            <h3 className="text-lg font-bold text-ifa-gold mb-4 flex items-center gap-2">
                                <TrendingUp size={20} /> {editingItem.id ? 'Editar Preços' : 'Novo Produto'}
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Nome do Item</label>
                                    <input 
                                        value={editingItem.name} 
                                        onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                                        className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                        placeholder="Ex: Obi Africano"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs uppercase font-bold text-red-400 block mb-1">Custo (Compra)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-ifa-neutral text-sm">R$</span>
                                            <input 
                                                type="number"
                                                value={editingItem.purchasePrice} 
                                                onChange={e => setEditingItem({...editingItem, purchasePrice: parseFloat(e.target.value)})}
                                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 pl-8 text-ifa-text"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase font-bold text-green-400 block mb-1">Valor (Venda)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-ifa-neutral text-sm">R$</span>
                                            <input 
                                                type="number"
                                                value={editingItem.sellingPrice} 
                                                onChange={e => setEditingItem({...editingItem, sellingPrice: parseFloat(e.target.value)})}
                                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 pl-8 text-ifa-text"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {editingItem.purchasePrice && editingItem.sellingPrice ? (
                                    <div className="bg-black/20 p-3 rounded flex justify-between items-center text-sm">
                                        <span>Margem de Lucro Estimada:</span>
                                        <span className={`font-bold ${calculateMargin(editingItem.purchasePrice, editingItem.sellingPrice) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {calculateMargin(editingItem.purchasePrice, editingItem.sellingPrice).toFixed(1)}%
                                        </span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setEditingItem(null)} className="flex-1 py-3 border border-ifa-border text-ifa-neutral rounded hover:text-white flex items-center justify-center gap-2">
                                    <X size={18} /> Cancelar
                                </button>
                                <button onClick={handleSave} className="flex-1 py-3 bg-ifa-gold text-ifa-base font-bold rounded hover:opacity-90 flex items-center justify-center gap-2">
                                    <Save size={18} /> Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PriceTableManager;
