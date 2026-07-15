
import React, { useState, useEffect, useMemo } from 'react';
import { InventoryItem } from '../types';
import { getInventory, updateInventoryItem, deleteInventoryItem } from '../services/storageService';
import { ArrowLeft, Plus, Trash2, Edit2, AlertTriangle, Package, Leaf, Droplet, Archive, Save, X } from 'lucide-react';

const InventoryManager = ({ onBack }: { onBack: () => void }) => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<InventoryItem>>({});

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = () => {
        setItems(getInventory());
    };

    const handleSave = () => {
        if (!editForm.name || !editForm.unit || !editForm.category) return;

        const newItem: InventoryItem = {
            id: editForm.id || crypto.randomUUID(),
            name: editForm.name,
            quantity: editForm.quantity || 0,
            unit: editForm.unit as any,
            category: editForm.category as any,
            minThreshold: editForm.minThreshold || 5
        };

        updateInventoryItem(newItem);
        setIsEditing(null);
        setEditForm({});
        loadInventory();
    };

    const handleDelete = (id: string) => {
        if (confirm('Tem certeza?')) {
            deleteInventoryItem(id);
            loadInventory();
        }
    };

    const startEdit = (item?: InventoryItem) => {
        if (item) {
            setEditForm(item);
            setIsEditing(item.id);
        } else {
            setEditForm({ quantity: 0, minThreshold: 5, unit: 'unidade', category: 'herb' });
            setIsEditing('new');
        }
    };

    const lowStockItems = useMemo(() => items.filter(i => i.quantity <= i.minThreshold), [items]);

    const getIcon = (cat: string) => {
        switch(cat) {
            case 'herb': return <Leaf size={16} className="text-green-500"/>;
            case 'liquid': return <Droplet size={16} className="text-blue-500"/>;
            case 'animal': return <Archive size={16} className="text-red-500"/>; // Using Archive as placeholder for Animal/Sacrifice
            default: return <Package size={16} className="text-gray-500"/>;
        }
    }

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <Package size={24} /> Gestão de Estoque do Templo
                    </h1>
                </div>

                {lowStockItems.length > 0 && (
                    <div className="mb-6 bg-red-900/20 border border-red-500/50 p-4 rounded-lg flex items-start gap-3">
                        <AlertTriangle className="text-red-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-red-400 text-sm uppercase">Alerta de Estoque Baixo</h3>
                            <ul className="text-sm text-red-200 mt-1 list-disc pl-4">
                                {lowStockItems.map(i => (
                                    <li key={i.id}>{i.name}: Restam {i.quantity} {i.unit}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="flex justify-end mb-4">
                    <button 
                        onClick={() => startEdit()}
                        className="bg-ifa-gold text-ifa-base px-4 py-2 rounded font-bold uppercase text-xs flex items-center gap-2 hover:opacity-90"
                    >
                        <Plus size={16} /> Novo Item
                    </button>
                </div>

                {/* Edit/Add Form Modal Overlay */}
                {isEditing && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-ifa-base border border-ifa-border p-6 rounded-xl w-full max-w-md">
                            <h3 className="text-ifa-gold font-bold mb-4">{isEditing === 'new' ? 'Novo Item' : 'Editar Item'}</h3>
                            <div className="space-y-3">
                                <input 
                                    placeholder="Nome (Ex: Ewe Rinrin)" 
                                    value={editForm.name || ''} 
                                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                                    className="w-full bg-ifa-base-dark border border-ifa-border p-2 rounded text-ifa-text"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input 
                                        type="number"
                                        placeholder="Qtd" 
                                        value={editForm.quantity} 
                                        onChange={e => setEditForm({...editForm, quantity: parseFloat(e.target.value)})}
                                        className="bg-ifa-base-dark border border-ifa-border p-2 rounded text-ifa-text"
                                    />
                                    <input 
                                        type="number"
                                        placeholder="Alerta Min." 
                                        value={editForm.minThreshold} 
                                        onChange={e => setEditForm({...editForm, minThreshold: parseFloat(e.target.value)})}
                                        className="bg-ifa-base-dark border border-ifa-border p-2 rounded text-ifa-text"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                     <select 
                                        value={editForm.unit} 
                                        onChange={e => setEditForm({...editForm, unit: e.target.value as any})}
                                        className="bg-ifa-base-dark border border-ifa-border p-2 rounded text-ifa-text"
                                    >
                                        <option value="unidade">Unidade</option>
                                        <option value="g">Gramas (g)</option>
                                        <option value="kg">Quilos (kg)</option>
                                        <option value="ml">Mililitros (ml)</option>
                                        <option value="l">Litros (l)</option>
                                        <option value="fatias">Fatias/Pedaços</option>
                                    </select>
                                    <select 
                                        value={editForm.category} 
                                        onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                                        className="bg-ifa-base-dark border border-ifa-border p-2 rounded text-ifa-text"
                                    >
                                        <option value="herb">Erva (Ewe)</option>
                                        <option value="animal">Animal/Bicho</option>
                                        <option value="mineral">Pó/Mineral</option>
                                        <option value="liquid">Líquido</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-ifa-neutral hover:text-white"><X size={20}/></button>
                                <button onClick={handleSave} className="bg-ifa-gold text-ifa-base px-4 py-2 rounded font-bold"><Save size={20}/></button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Inventory List */}
                <div className="grid gap-3">
                    {items.map(item => (
                        <div key={item.id} className="bg-ifa-base border border-ifa-border p-4 rounded flex justify-between items-center group hover:border-ifa-gold transition-colors">
                            <div className="flex items-center gap-3">
                                {getIcon(item.category)}
                                <div>
                                    <p className="font-bold text-ifa-text">{item.name}</p>
                                    <p className={`text-xs ${item.quantity <= item.minThreshold ? 'text-red-400 font-bold' : 'text-ifa-neutral'}`}>
                                        Estoque: {item.quantity} {item.unit}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(item)} className="p-2 bg-ifa-wood text-white rounded"><Edit2 size={14}/></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-900 text-red-200 rounded"><Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="text-center py-12 text-ifa-neutral">
                            Seu estoque está vazio. Adicione Obi, Orogbo, Ewe, etc.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryManager;
