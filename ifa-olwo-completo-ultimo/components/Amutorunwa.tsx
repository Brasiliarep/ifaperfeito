
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Baby, Sparkles, Check, Search } from 'lucide-react';

const NAMES_DB = [
    { circumstance: 'Gêmeos (Primeiro)', name: 'Taiwo', meaning: 'Aquele que provou o mundo primeiro' },
    { circumstance: 'Gêmeos (Segundo)', name: 'Kehinde', meaning: 'Aquele que veio depois' },
    { circumstance: 'Nasceu com cordão', name: 'Ojo', meaning: 'Difícil de nascer' },
    { circumstance: 'Nasceu de pé', name: 'Ige', meaning: 'Nascido de peito' },
    { circumstance: 'Depois de gêmeos', name: 'Idowu', meaning: 'O filho depois dos gêmeos' },
    { circumstance: 'Cabelo trançado', name: 'Dada', meaning: 'Cabelos encaracolados/trançados' },
    { circumstance: 'Nasceu em dia de festa', name: 'Abiodun', meaning: 'Nascido durante o festival' },
    { circumstance: 'Esperado por muito tempo', name: 'Ayomide', meaning: 'Minha alegria chegou' },
    { circumstance: 'Reencarnação do Pai', name: 'Babatunde', meaning: 'Pai retornou' },
    { circumstance: 'Reencarnação da Mãe', name: 'Yetunde', meaning: 'Mãe retornou' },
    { circumstance: 'Nasceu com a bolsa', name: 'Oke', meaning: 'Envolto no saco amniótico' },
    { circumstance: 'Primeira filha mulher', name: 'Yewande', meaning: 'Mãe me procurou' },
    { circumstance: 'Filho desejado', name: 'Ifeoluwa', meaning: 'Amor de Deus' },
];

const Amutorunwa = ({ onBack }: { onBack: () => void }) => {
    const [selected, setSelected] = useState<any>(null);
    const [search, setSearch] = useState('');

    const filteredNames = useMemo(() => {
        if (!search) return NAMES_DB;
        const q = search.toLowerCase();
        return NAMES_DB.filter(n => 
            n.circumstance.toLowerCase().includes(q) || 
            n.name.toLowerCase().includes(q) || 
            n.meaning.toLowerCase().includes(q)
        );
    }, [search]);

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Baby size={20}/> Amutorunwa (Nomes)</h1>
                <div className="w-6"></div>
            </div>

            <div className="w-full max-w-md space-y-4">
                <div className="relative mb-4">
                    <input 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por circunstância ou nome..."
                        className="w-full bg-ifa-base border border-ifa-border rounded-lg pl-10 pr-4 py-3 focus:border-ifa-gold outline-none"
                    />
                    <Search className="absolute left-3 top-3.5 text-ifa-neutral" size={18} />
                </div>

                <p className="text-sm text-ifa-neutral text-center">Selecione a circunstância do nascimento para revelar o nome predestinado pelo céu.</p>
                
                <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
                    {filteredNames.map((item, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setSelected(item)}
                            className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${selected?.name === item.name ? 'bg-ifa-gold text-ifa-base font-bold' : 'bg-ifa-base border-ifa-border hover:border-ifa-gold'}`}
                        >
                            <span>{item.circumstance}</span>
                            {selected?.name === item.name && <Check size={16} />}
                        </button>
                    ))}
                    {filteredNames.length === 0 && (
                        <p className="text-center text-ifa-neutral py-8">Nenhum nome encontrado.</p>
                    )}
                </div>

                {selected && (
                    <div className="bg-ifa-surface border border-ifa-gold p-6 rounded-xl text-center animate-fade-in shadow-2xl mt-4">
                        <Sparkles className="mx-auto text-ifa-gold mb-2" />
                        <h2 className="text-3xl font-serif font-bold text-ifa-text mb-2">{selected.name}</h2>
                        <p className="text-ifa-text-light italic">"{selected.meaning}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Amutorunwa;
