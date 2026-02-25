
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, FlaskConical, ChevronRight, MessageSquare, Sparkles } from 'lucide-react';
import { OogunItem } from '../data/offlineLibrary'; 
import { normalizeText } from '../utils/textHelper';
import RitualCardView from './RitualCardView';

interface LibraryProps {
    onBack: () => void; 
    onOpenInventory: () => void;
    items: OogunItem[]; 
    title: string;
    onConsultOracle: (query: string) => void; // NOVO PROP PARA NAVEGAÇÃO
}

const AkoseLibrary: React.FC<LibraryProps> = ({ onBack, items, title, onConsultOracle }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<OogunItem | null>(null);
    const [selectedTag, setSelectedTag] = useState<string>('Todos');

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        items.forEach(i => i.tags?.forEach(t => tags.add(t)));
        return ['Todos', ...Array.from(tags)];
    }, [items]);

    // --- BUSCA INTELIGENTE (UNIVERSAL) ---
    const filteredItems = useMemo(() => {
        const query = normalizeText(searchQuery);
        
        return items.filter(item => {
            // Filtro de Tags
            const matchesTag = selectedTag === 'Todos' || item.tags?.includes(selectedTag);
            
            if (!matchesTag) return false;
            if (!query) return true;

            // Busca Profunda (Campos Principais)
            const matchTitle = normalizeText(item.title).includes(query);
            const matchYoruba = normalizeText(item.nomeYoruba).includes(query);
            const matchPurpose = normalizeText(item.purpose).includes(query);
            
            // Busca Profunda (Tags)
            const matchTags = item.tags?.some(tag => normalizeText(tag).includes(query));

            // Busca Profunda (Ingredientes nos Níveis)
            const matchIngredients = item.niveis.some(nivel => 
                nivel.materiais.some(mat => normalizeText(mat).includes(query))
            );

            return matchTitle || matchYoruba || matchPurpose || matchTags || matchIngredients;
        });
    }, [searchQuery, items, selectedTag]);

    if (selectedItem) return <RitualCardView item={selectedItem} onClose={() => setSelectedItem(null)} />;

    return (
        <div className="min-h-screen bg-[#1a1510] text-[#F5F5DC] pb-24 pt-safe flex flex-col">
             <div className="p-4 bg-[#1a1510] sticky top-0 z-10 border-b border-[#5D4037] shadow-lg">
                 <div className="flex items-center gap-4 mb-4">
                    <button onClick={onBack} className="text-[#a8a29e] hover:text-white"><ArrowLeft/></button>
                    <h1 className="text-xl font-serif text-[#D4AF37] flex items-center gap-2 uppercase tracking-widest">
                        <FlaskConical className="text-[#D4AF37]"/> {title}
                    </h1>
                 </div>
                 <div className="relative mb-4">
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Buscar em ${title}...`}
                        className="w-full bg-[#0f0c08] border border-[#5D4037] text-white rounded-lg py-3 pl-10 pr-4 focus:border-[#D4AF37] outline-none"
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
                 </div>
                 <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                     {allTags.map(tag => (
                         <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold border transition-all ${selectedTag === tag ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-transparent text-[#a8a29e] border-[#5D4037]'}`}
                         >
                             {tag}
                         </button>
                     ))}
                 </div>
             </div>

             <div className="p-4 flex-grow overflow-y-auto">
                 <div className="grid gap-3">
                     {filteredItems.map(item => (
                         <button 
                            key={item.id} 
                            onClick={() => setSelectedItem(item)} 
                            className="bg-[#2a2420] border border-[#5D4037] rounded-lg p-4 text-left hover:border-[#D4AF37] flex justify-between items-center group transition-all"
                         >
                             <div>
                                 <div className="flex items-center gap-2 mb-1">
                                     <h3 className="font-bold text-[#F5F5DC] group-hover:text-[#D4AF37]">{item.title}</h3>
                                     {item.oduReference && <span className="text-[9px] bg-black/40 px-2 rounded text-[#a8a29e]">{item.oduReference}</span>}
                                 </div>
                                 <p className="text-xs text-gray-400 italic line-clamp-1">{item.purpose}</p>
                                 <div className="flex gap-1 mt-2">
                                     {item.tags?.slice(0,2).map(t => <span key={t} className="text-[9px] bg-black/20 px-2 rounded text-[#5D4037] border border-[#5D4037]/30">{t}</span>)}
                                 </div>
                             </div>
                             <ChevronRight className="text-gray-500 group-hover:text-[#D4AF37]" size={20} />
                         </button>
                     ))}
                 </div>
                 
                 {/* FALLBACK DOURADO: SE A LISTA ESTIVER VAZIA */}
                 {filteredItems.length === 0 && (
                     <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
                         <div className="bg-[#2a2420] border-2 border-[#5D4037] rounded-xl p-8 max-w-sm shadow-xl relative overflow-hidden">
                             {/* Background Glow */}
                             <div className="absolute inset-0 bg-[#D4AF37]/5 pointer-events-none"></div>
                             
                             <div className="bg-black/30 p-4 rounded-full mb-4 inline-block border border-[#D4AF37]/30">
                                 <Sparkles size={32} className="text-[#D4AF37]" />
                             </div>
                             
                             <h3 className="text-lg font-bold text-[#F5F5DC] mb-2">
                                 {searchQuery ? "Não encontrado offline." : "Nenhum item disponível."}
                             </h3>
                             <p className="text-sm text-[#a8a29e] mb-6">
                                 {searchQuery 
                                    ? <>A magia <strong>"{searchQuery}"</strong> não está no seu caderno local. Deseja buscar na sabedoria universal de Ifá?</>
                                    : "Esta categoria ainda não possui itens offline. Deseja consultar o Grande Oráculo?"
                                 }
                             </p>
                             
                             <button 
                                 onClick={() => onConsultOracle(searchQuery)}
                                 className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-black py-4 rounded-lg font-bold uppercase flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg border border-[#F5F5DC]/20"
                             >
                                 <MessageSquare size={20} /> CONSULTAR GRANDE ORÁCULO
                             </button>
                             
                             <p className="text-[10px] text-[#a8a29e] mt-4 uppercase tracking-widest opacity-60">
                                 Busca nas Escrituras Sagradas de Ifá pelo Mundo
                             </p>
                         </div>
                     </div>
                 )}
             </div>
        </div>
    );
};

export default AkoseLibrary;
