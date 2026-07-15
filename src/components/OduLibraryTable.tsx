import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, WifiOff, Wifi } from 'lucide-react';
import { getAllOdu, OduDetails } from '../data/oduLibrary';

const ITEMS_PER_PAGE = 20;

const OduLibraryTable: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'meji' | 'omo'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const allOdu = useMemo(() => getAllOdu(), []);

    const filteredOdu = useMemo(() => {
        return allOdu.filter(odu => {
            const matchesSearch = odu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  odu.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  odu.orishas.some(o => o.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const isMeji = odu.name.includes('Meji') || odu.name === 'Ejiogbe';
            
            if (filter === 'meji') return matchesSearch && isMeji;
            if (filter === 'omo') return matchesSearch && !isMeji;
            return matchesSearch;
        });
    }, [allOdu, searchTerm, filter]);

    const totalPages = Math.ceil(filteredOdu.length / ITEMS_PER_PAGE);
    const currentData = filteredOdu.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const toggleExpand = (name: string) => {
        setExpandedRow(expandedRow === name ? null : name);
    };

    // Helper to render binary string as visual Odu mark
    const renderBinaryMark = (binary: string) => {
        // binary format: "1111-0000" (Right-Left)
        // 1 = I, 0 = II
        const [right, left] = binary.split('-');
        if (!right || !left) return null;

        const renderLeg = (bits: string) => (
            <div className="flex flex-col gap-1 items-center">
                {bits.split('').map((bit, i) => (
                    <div key={i} className="h-4 flex items-center justify-center">
                        {bit === '1' ? (
                            <div className="w-2 h-4 bg-ifa-gold rounded-sm"></div>
                        ) : (
                            <div className="flex gap-1">
                                <div className="w-2 h-4 bg-ifa-gold rounded-sm"></div>
                                <div className="w-2 h-4 bg-ifa-gold rounded-sm"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );

        return (
            <div className="flex gap-8 justify-center p-4 bg-ifa-wood/20 rounded-lg border border-ifa-gold/30">
                {renderLeg(right)}
                {renderLeg(left)}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-ifa-gold hover:text-white transition-colors self-start md:self-auto"
                    >
                        <ChevronLeft /> Voltar
                    </button>
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-serif font-bold text-ifa-gold text-center">
                            Biblioteca dos 256 Odu
                        </h1>
                        <div className="flex items-center gap-2 mt-2 text-xs uppercase tracking-widest">
                            {isOffline ? (
                                <span className="text-green-500 flex items-center gap-1">
                                    <WifiOff size={14} /> Modo Offline Ativo
                                </span>
                            ) : (
                                <span className="text-ifa-neutral/50 flex items-center gap-1">
                                    <Wifi size={14} /> Online
                                </span>
                            )}
                            <span className="text-ifa-neutral/30">|</span>
                            <span className="text-ifa-gold">256 Caminhos Carregados</span>
                        </div>
                    </div>
                    <div className="w-24 hidden md:block"></div> {/* Spacer */}
                </div>

                {/* Controls */}
                <div className="bg-ifa-surface p-4 rounded-xl border border-ifa-border mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ifa-neutral" size={20} />
                        <input 
                            type="text" 
                            placeholder="Buscar Odu, Orixá ou significado..." 
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full bg-ifa-base border border-ifa-border rounded-lg pl-10 pr-4 py-2 text-ifa-text focus:outline-none focus:border-ifa-gold"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button 
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'all' ? 'bg-ifa-gold text-ifa-base' : 'bg-ifa-base text-ifa-neutral hover:bg-ifa-wood'}`}
                        >
                            Todos
                        </button>
                        <button 
                            onClick={() => setFilter('meji')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'meji' ? 'bg-ifa-gold text-ifa-base' : 'bg-ifa-base text-ifa-neutral hover:bg-ifa-wood'}`}
                        >
                            16 Mejis
                        </button>
                        <button 
                            onClick={() => setFilter('omo')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'omo' ? 'bg-ifa-gold text-ifa-base' : 'bg-ifa-base text-ifa-neutral hover:bg-ifa-wood'}`}
                        >
                            Omo Odu
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-ifa-surface rounded-xl border border-ifa-border overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-ifa-wood/30 text-ifa-gold border-b border-ifa-border">
                                    <th className="p-4 font-serif">Nome</th>
                                    <th className="p-4 font-serif hidden md:table-cell">Significado Principal</th>
                                    <th className="p-4 font-serif hidden lg:table-cell">Orixás</th>
                                    <th className="p-4 font-serif text-center">Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((odu, idx) => (
                                    <React.Fragment key={odu.name}>
                                        <tr 
                                            className={`border-b border-ifa-border/50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-ifa-base/50' : 'bg-ifa-base'} hover:bg-ifa-wood/20`}
                                            onClick={() => toggleExpand(odu.name)}
                                        >
                                            <td className="p-4 font-bold text-lg text-ifa-gold whitespace-nowrap">
                                                {odu.name}
                                            </td>
                                            <td className="p-4 text-ifa-text-light hidden md:table-cell">
                                                {odu.meaning}
                                            </td>
                                            <td className="p-4 text-ifa-neutral hidden lg:table-cell">
                                                {odu.orishas.join(', ')}
                                            </td>
                                            <td className="p-4 text-center text-ifa-gold">
                                                {expandedRow === odu.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </td>
                                        </tr>
                                        {expandedRow === odu.name && (
                                            <tr className="bg-ifa-wood/10">
                                                <td colSpan={4} className="p-6 animate-fade-in">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        <div className="md:col-span-2">
                                                            <h3 className="text-ifa-gold font-bold mb-2 flex items-center gap-2">
                                                                <BookOpen size={18} /> Itan (Lenda)
                                                            </h3>
                                                            <p className="text-ifa-text-light leading-relaxed text-sm italic mb-4 border-l-2 border-ifa-gold/50 pl-4">
                                                                "{odu.itan}"
                                                            </p>
                                                            
                                                            <h3 className="text-ifa-gold font-bold mb-2 mt-6">Interpretações</h3>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div className="bg-ifa-base/40 p-3 rounded border border-ifa-border/30">
                                                                    <span className="text-ifa-gold font-bold text-xs uppercase block mb-1">Geral</span>
                                                                    <span className="text-sm text-ifa-text-light">{odu.interpretations.general}</span>
                                                                </div>
                                                                <div className="bg-ifa-base/40 p-3 rounded border border-ifa-border/30">
                                                                    <span className="text-ifa-gold font-bold text-xs uppercase block mb-1">Amor</span>
                                                                    <span className="text-sm text-ifa-text-light">{odu.interpretations.love}</span>
                                                                </div>
                                                                <div className="bg-ifa-base/40 p-3 rounded border border-ifa-border/30">
                                                                    <span className="text-ifa-gold font-bold text-xs uppercase block mb-1">Dinheiro</span>
                                                                    <span className="text-sm text-ifa-text-light">{odu.interpretations.money}</span>
                                                                </div>
                                                                <div className="bg-ifa-base/40 p-3 rounded border border-ifa-border/30">
                                                                    <span className="text-ifa-gold font-bold text-xs uppercase block mb-1">Saúde</span>
                                                                    <span className="text-sm text-ifa-text-light">{odu.interpretations.health}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-center justify-start pt-4">
                                                            <h4 className="text-ifa-neutral text-xs uppercase tracking-widest mb-4">Marca de Ifá</h4>
                                                            {renderBinaryMark(odu.binary)}
                                                            <div className="mt-4 text-center">
                                                                <span className="text-ifa-gold font-bold text-xl block">{odu.name}</span>
                                                                <span className="text-ifa-neutral text-xs">Ordem: #{odu.rank}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-ifa-border flex justify-between items-center bg-ifa-base">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded hover:bg-ifa-wood disabled:opacity-30 text-ifa-gold"
                        >
                            <ChevronLeft />
                        </button>
                        <span className="text-ifa-neutral text-sm">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded hover:bg-ifa-wood disabled:opacity-30 text-ifa-gold"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OduLibraryTable;
