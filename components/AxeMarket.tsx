
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, ShoppingCart, Save, Plus, Trash2 } from 'lucide-react';

interface Supplier {
    id: string;
    name: string;
    phone: string; // WhatsApp number
    category: string;
}

const AxeMarket = ({ onBack }: { onBack: () => void }) => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('ifa_suppliers');
        if (saved) setSuppliers(JSON.parse(saved));
    }, []);

    const saveSuppliers = (list: Supplier[]) => {
        setSuppliers(list);
        localStorage.setItem('ifa_suppliers', JSON.stringify(list));
    };

    const addSupplier = () => {
        if (!newName || !newPhone) return;
        const newS: Supplier = {
            id: crypto.randomUUID(),
            name: newName,
            phone: newPhone.replace(/\D/g, ''), // Clean number
            category: 'Geral'
        };
        saveSuppliers([...suppliers, newS]);
        setNewName('');
        setNewPhone('');
    };

    const deleteSupplier = (id: string) => {
        saveSuppliers(suppliers.filter(s => s.id !== id));
    };

    const testMessage = (phone: string) => {
        const msg = "Olá, gostaria de fazer uma cotação de materiais para Ifá.";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft size={24} /></button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <ShoppingCart size={24} /> Mercado de Axé
                    </h1>
                </div>

                <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 mb-6">
                    <h3 className="text-sm font-bold text-ifa-neutral uppercase mb-4">Adicionar Fornecedor</h3>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <input 
                            placeholder="Nome (Ex: Casa das Ervas)" 
                            value={newName} 
                            onChange={e => setNewName(e.target.value)}
                            className="bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                        />
                        <input 
                            placeholder="WhatsApp (Ex: 5511999999999)" 
                            value={newPhone} 
                            onChange={e => setNewPhone(e.target.value)}
                            className="bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                        />
                    </div>
                    <button onClick={addSupplier} className="w-full bg-ifa-wood text-white py-3 rounded flex items-center justify-center gap-2 hover:opacity-90">
                        <Plus size={18} /> Salvar Fornecedor
                    </button>
                </div>

                <div className="space-y-4">
                    {suppliers.map(sup => (
                        <div key={sup.id} className="bg-ifa-base border border-ifa-border p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-ifa-text">{sup.name}</h4>
                                <p className="text-xs text-ifa-neutral">{sup.phone}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => testMessage(sup.phone)} className="p-2 bg-green-900/50 text-green-400 rounded hover:bg-green-900">
                                    <Phone size={18} />
                                </button>
                                <button onClick={() => deleteSupplier(sup.id)} className="p-2 bg-red-900/50 text-red-400 rounded hover:bg-red-900">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {suppliers.length === 0 && (
                        <p className="text-center text-ifa-neutral">Nenhum fornecedor cadastrado. Adicione para enviar listas de compras rapidamente.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AxeMarket;
