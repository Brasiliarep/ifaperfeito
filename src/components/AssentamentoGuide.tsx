
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Hammer, ShoppingCart, Calculator, Search, Printer, Zap, BookOpen, MessageCircle, Mail, DollarSign, List, Shield, Info, Droplet, Calendar, AlertTriangle, Layers, X, Save, MessageSquare, Sparkles } from 'lucide-react';
import { ASSENTAMENTOS_DB, AssentamentoItem, RitualLevel } from '../data/offlineLibrary';
import TextReader from './TextReader';
import BabalawoListModal from './BabalawoListModal';
import { normalizeText } from '../utils/textHelper';
import EboSheet from './EboSheet';

const ORISHAS = ['Todos', 'Esu', 'Ogun', 'Osun', 'Sango', 'Obatala', 'Ifá', 'Yemoja', 'Oya', 'Oxossi'];


export const AssentamentoGuideView = ({ onBack, onConsultOracle }: { onBack: () => void, onConsultOracle: (q: string) => void }) => {
    const [selectedGuide, setSelectedGuide] = useState<AssentamentoItem | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeOrisha, setActiveOrisha] = useState('Todos');

    const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
    const [eboSheet, setEboSheet] = useState<{ open: boolean; data: any }>({ open: false, data: null });

    // --- BUSCA UNIVERSAL INTELIGENTE ---
    const filteredList = useMemo(() => {
        const query = normalizeText(searchQuery);

        return ASSENTAMENTOS_DB.filter(item => {
            const matchesOrisha = activeOrisha === 'Todos' || item.orisha === activeOrisha;

            if (!matchesOrisha) return false;
            if (!query) return true;

            const matchTitle = normalizeText(item.title).includes(query);
            const matchYoruba = normalizeText(item.nomeYoruba).includes(query);
            const matchDesc = normalizeText(item.description).includes(query);
            const matchOrishaName = normalizeText(item.orisha).includes(query);

            const matchMaterials = item.niveis.some(nivel =>
                nivel.materiais.some(mat => normalizeText(mat).includes(query))
            );

            return matchTitle || matchYoruba || matchDesc || matchOrishaName || matchMaterials;
        });
    }, [searchQuery, activeOrisha]);

    const handleOpenOrcamento = () => {
        if (!selectedGuide) return;
        const level = selectedGuide.niveis[selectedLevelIndex];

        const mappedData = {
            titulo: `${selectedGuide.title} - ${level.tipo}`,
            orixaRegente: selectedGuide.orisha,
            materiais: level.materiais,
            passos: level.preparo,
            ofo: selectedGuide.ofo,
            ofo_traducao: '',
            orcamento_estimado: level.estimativa_materiais,
            observacoes: `Manutenção: ${selectedGuide.maintenance.ciclo}. Oferenda: ${selectedGuide.maintenance.oferenda_simples}. Proibições: ${selectedGuide.maintenance.proibicoes.join(', ')}.`
        };

        setEboSheet({ open: true, data: mappedData });
    };

    if (selectedGuide) {
        const currentLevel = selectedGuide.niveis[selectedLevelIndex];

        return (
            <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8 pt-safe pb-48 animate-fade-in">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={() => setSelectedGuide(null)} className="text-ifa-neutral hover:text-ifa-text flex items-center gap-2">
                            <ArrowLeft /> Voltar
                        </button>
                    </div>

                    <div className="bg-ifa-base border border-ifa-border rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-ifa-border bg-[#1a1510] relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Hammer size={100} className="text-ifa-gold" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1 block">
                                {selectedGuide.orisha.toUpperCase()} • IGBÁ
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">{selectedGuide.title}</h2>
                            <p className="text-sm text-gray-400 italic">{selectedGuide.nomeYoruba}</p>
                        </div>

                        <div className="flex border-b border-ifa-border bg-ifa-base-dark overflow-x-auto no-scrollbar">
                            {selectedGuide.niveis.map((lvl, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedLevelIndex(idx)}
                                    className={`flex-1 py-4 px-6 text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${selectedLevelIndex === idx ? 'bg-ifa-gold text-black border-b-4 border-white' : 'text-ifa-neutral hover:text-white'}`}
                                >
                                    {lvl.tipo}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="mb-8">
                                <h3 className="text-[#D4AF37] font-bold uppercase text-sm mb-4 flex items-center gap-2">
                                    <ShoppingCart size={16} /> Materiais Necessários ({currentLevel.tipo})
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                                    {currentLevel.materiais.map((mat, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> {mat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-[#D4AF37] font-bold uppercase text-sm mb-4 flex items-center gap-2">
                                    <Hammer size={16} /> Ritual de Montagem
                                </h3>
                                <div className="bg-black/20 p-6 rounded-lg border border-ifa-border/30 text-sm leading-relaxed whitespace-pre-line text-justify text-gray-300">
                                    {currentLevel.preparo.map((step, i) => (
                                        <p key={i} className="mb-2 flex gap-2"><span className="text-ifa-gold font-bold">{i + 1}.</span> {step}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-black/40 p-6 rounded-xl border-l-4 border-[#D4AF37] relative mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-[#D4AF37] text-xs font-bold uppercase flex items-center gap-2">
                                        <BookOpen size={14} /> Ofo de Consagração
                                    </h4>
                                    <TextReader text={selectedGuide.ofo} forceLang="yo-NG" label="Entoar" />
                                </div>
                                <p className="text-xl font-serif italic text-white leading-relaxed">"{selectedGuide.ofo}"</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-900/10 p-4 rounded-lg border border-green-500/30">
                                    <h4 className="text-green-400 font-bold uppercase text-xs mb-2 flex items-center gap-2">
                                        <Zap size={14} /> Manutenção
                                    </h4>
                                    <p className="text-sm text-green-100">Ciclo: {selectedGuide.maintenance.ciclo}</p>
                                    <p className="text-sm text-green-100 mt-1">Oferenda: {selectedGuide.maintenance.oferenda_simples}</p>
                                </div>

                                <div className="bg-red-900/10 p-4 rounded-lg border border-red-500/30">
                                    <h4 className="text-red-400 font-bold uppercase text-xs mb-2 flex items-center gap-2">
                                        <AlertTriangle size={14} /> Proibições (Ewo)
                                    </h4>
                                    <ul className="list-disc pl-4 text-sm text-red-100">
                                        {selectedGuide.maintenance.proibicoes.map((pro, i) => <li key={i}>{pro}</li>)}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="h-16 w-full"></div>
                </div>

                <div className="fixed bottom-0 left-0 w-full bg-[#1a1510] border-t border-[#5D4037] p-4 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
                    <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
                        <div className="hidden md:block">
                            <p className="text-xs text-ifa-neutral uppercase font-bold">Estimativa de Custo</p>
                            <p className="text-xl font-bold text-white">R$ {currentLevel.estimativa_materiais.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={handleOpenOrcamento}
                            className="flex-grow flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-6 py-4 rounded-xl font-bold uppercase text-sm shadow-lg hover:bg-white transition-all transform hover:scale-105"
                        >
                            <DollarSign size={20} /> Gerar Orçamento Profissional
                        </button>
                    </div>
                </div>

                {eboSheet.open && (
                    <EboSheet
                        ebo={eboSheet.data}
                        onClose={() => setEboSheet({ open: false, data: null })}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1510] text-[#F5F5DC] pb-24 pt-safe flex flex-col">
            <div className="p-4 bg-[#1a1510] sticky top-0 z-10 border-b border-[#5D4037] shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={onBack} className="text-[#a8a29e] hover:text-white"><ArrowLeft /></button>
                    <h1 className="text-xl font-serif text-[#D4AF37] flex items-center gap-2">
                        <Hammer className="text-[#D4AF37]" /> Guia de Assentamentos
                    </h1>
                </div>

                <div className="relative mb-4">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar (Ex: Exu, Igbá, Oferenda)..."
                        className="w-full bg-[#0f0c08] border border-[#5D4037] text-white rounded-lg py-3 pl-10 pr-4 focus:border-[#D4AF37] outline-none"
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {ORISHAS.map(orisha => (
                        <button
                            key={orisha}
                            onClick={() => setActiveOrisha(orisha)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${activeOrisha === orisha
                                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                                : 'bg-transparent text-[#a8a29e] border-[#5D4037] hover:border-[#D4AF37]'
                                }`}
                        >
                            {orisha}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 flex-grow overflow-y-auto">
                {filteredList.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {filteredList.map(guide => (
                            <button
                                key={guide.id}
                                onClick={() => setSelectedGuide(guide)}
                                className="bg-[#2a2420] border border-[#5D4037] p-6 rounded-xl text-left hover:border-[#D4AF37] hover:shadow-lg transition-all group relative overflow-hidden flex flex-col justify-between min-h-[140px]"
                            >
                                <div>
                                    <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl ${guide.category === 'igba' ? 'bg-[#D4AF37] text-black' : 'bg-green-800 text-white'}`}>
                                        {guide.category === 'igba' ? 'Igbá' : 'Adimu'}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#F5F5DC] group-hover:text-[#D4AF37] mb-1 pr-12">{guide.title}</h3>
                                    <p className="text-xs text-gray-400 mb-4 line-clamp-2">{guide.description}</p>
                                </div>

                                <div className="flex items-center justify-between border-t border-[#5D4037] pt-3">
                                    <span className="bg-black/30 px-2 py-1 rounded border border-[#5D4037] text-[10px] text-[#a8a29e]">{guide.orisha}</span>
                                    <div className="flex items-center gap-1 text-[10px] text-[#D4AF37] font-bold">
                                        <Layers size={12} /> 3 Níveis
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    // --- FALLBACK UI (IA) ---
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
                        <div className="bg-[#2a2420] border-2 border-[#5D4037] rounded-xl p-8 max-w-sm shadow-xl relative">
                            <div className="absolute inset-0 bg-[#D4AF37]/5 pointer-events-none"></div>
                            <Sparkles size={48} className="text-[#a8a29e] mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-[#F5F5DC] mb-2">Não encontrado offline.</h3>
                            <p className="text-sm text-[#a8a29e] mb-6">
                                O fundamento <strong>"{searchQuery}"</strong> não consta na base local. Deseja consultar a sabedoria universal de Ifá?
                            </p>
                            <button
                                onClick={() => onConsultOracle(searchQuery)}
                                className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-black py-4 rounded-lg font-bold uppercase flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg border border-[#F5F5DC]/20"
                            >
                                <MessageSquare size={20} /> CONSULTAR GRANDE ORÁCULO
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
