import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TREATISE_CHAPTERS } from '../data/treatiseData';

interface TreatiseViewProps {
    onBack: () => void;
}

const SECTION_LABELS: Record<string, string> = {
    intro: '📖 Introdução',
    meji: '🔮 Odù Meji',
    appendix: '📚 Apêndices',
};

const SECTION_ORDER = ['intro', 'meji', 'appendix'];

export const TreatiseView: React.FC<TreatiseViewProps> = ({ onBack }) => {
    const [activeId, setActiveId] = useState<string>('prefacio');
    const [search, setSearch] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() => {
        if (!search.trim()) return TREATISE_CHAPTERS;
        const q = search.toLowerCase();
        return TREATISE_CHAPTERS.filter(
            c =>
                c.title.toLowerCase().includes(q) ||
                (c.subtitle || '').toLowerCase().includes(q) ||
                c.content.toLowerCase().includes(q)
        );
    }, [search]);

    const activeChapter = TREATISE_CHAPTERS.find(c => c.id === activeId) || TREATISE_CHAPTERS[0];

    const grouped = useMemo(() => {
        return SECTION_ORDER.map(sec => ({
            section: sec,
            label: SECTION_LABELS[sec],
            chapters: filtered.filter(c => c.section === sec),
        })).filter(g => g.chapters.length > 0);
    }, [filtered]);

    useEffect(() => {
        if (contentRef.current) contentRef.current.scrollTop = 0;
    }, [activeId]);

    const mejiList = TREATISE_CHAPTERS.filter(c => c.section === 'meji');
    const currentIdx = mejiList.findIndex(c => c.id === activeId);
    const prevChapter = currentIdx > 0 ? mejiList[currentIdx - 1] : null;
    const nextChapter = currentIdx >= 0 && currentIdx < mejiList.length - 1 ? mejiList[currentIdx + 1] : null;

    const formatContent = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('━━━') && line.endsWith('━━━')) {
                const inner = line.replace(/━━━\s?/g, '').replace(/\s?━━━/g, '').trim();
                return (
                    <div key={i} className="flex items-center gap-2 my-4">
                        <div className="flex-1 h-px bg-ifa-gold opacity-40" />
                        <span className="text-ifa-gold font-serif text-xs tracking-widest uppercase">{inner}</span>
                        <div className="flex-1 h-px bg-ifa-gold opacity-40" />
                    </div>
                );
            }
            if (line.startsWith('•')) {
                return (
                    <div key={i} className="flex gap-2 my-1 text-ifa-text-light text-sm leading-relaxed pl-2">
                        <span className="text-ifa-gold mt-0.5 flex-shrink-0">•</span>
                        <span>{line.slice(1).trim()}</span>
                    </div>
                );
            }
            if (line.match(/^[A-ZÉÁÍÓÚÀÂÊÔÃÕÜ –—]{6,}$/) && !line.startsWith('•')) {
                return <div key={i} className="text-ifa-gold font-serif font-bold text-base mt-5 mb-1 tracking-wide">{line}</div>;
            }
            if (line.startsWith('"') && line.endsWith('"') && line.length > 20) {
                return (
                    <div key={i} className="border-l-2 border-ifa-gold pl-4 my-3 italic text-ifa-text-light text-sm opacity-90 leading-relaxed">
                        {line}
                    </div>
                );
            }
            if (line.trim() === '') return <div key={i} className="h-2" />;
            return <p key={i} className="text-ifa-text-light text-sm leading-relaxed my-1">{line}</p>;
        });
    };

    return (
        <div className="flex flex-col h-screen bg-ifa-base text-ifa-text" style={{ fontFamily: 'Lato, sans-serif' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-ifa-border bg-ifa-base-dark flex-shrink-0">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-ifa-gold text-sm font-bold hover:opacity-80 transition-opacity"
                >
                    ← Voltar
                </button>

                <div className="flex items-center gap-2 text-center flex-1 mx-4">
                    <span className="text-xl">📜</span>
                    <div className="min-w-0">
                        <div className="text-ifa-gold font-serif font-bold text-sm truncate">Tratado de Ifá — Corpus Completo</div>
                        <div className="text-ifa-neutral text-xs truncate">16 Odù Meji · Cosmologia · Filosofia · Glossário</div>
                    </div>
                </div>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-ifa-neutral text-xs hover:text-ifa-gold transition-colors flex-shrink-0"
                >
                    {sidebarOpen ? '◀ Fechar' : '▶ Índice'}
                </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {sidebarOpen && (
                    <div className="w-64 flex-shrink-0 bg-ifa-base-dark border-r border-ifa-border flex flex-col overflow-hidden">
                        {/* Search */}
                        <div className="p-3 border-b border-ifa-border">
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-ifa-neutral text-xs">🔍</span>
                                <input
                                    className="w-full bg-ifa-surface border border-ifa-border rounded pl-7 pr-6 py-1.5 text-xs text-ifa-text placeholder-ifa-neutral focus:outline-none focus:border-ifa-gold"
                                    placeholder="Buscar no Corpus..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                {search && (
                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-ifa-neutral hover:text-ifa-text text-xs"
                                        onClick={() => setSearch('')}
                                    >✕</button>
                                )}
                            </div>
                        </div>

                        {/* Nav */}
                        <div className="flex-1 overflow-y-auto py-2">
                            {grouped.map(g => (
                                <div key={g.section} className="mb-2">
                                    <div className="px-3 py-1.5 text-ifa-gold text-xs font-bold tracking-widest uppercase opacity-70">
                                        {g.label}
                                    </div>
                                    {g.chapters.map(ch => (
                                        <button
                                            key={ch.id}
                                            onClick={() => { setActiveId(ch.id); setSearch(''); }}
                                            className={`w-full text-left px-3 py-2 transition-colors ${activeId === ch.id
                                                    ? 'bg-ifa-wood text-ifa-gold border-l-2 border-ifa-gold'
                                                    : 'text-ifa-text-light hover:bg-ifa-surface hover:text-ifa-gold border-l-2 border-transparent'
                                                }`}
                                        >
                                            <div className="text-xs font-medium leading-tight truncate">
                                                {ch.title.split('—')[0].trim()}
                                            </div>
                                            {ch.subtitle && (
                                                <div className="text-ifa-neutral text-xs leading-tight truncate mt-0.5 opacity-70">
                                                    {ch.subtitle.length > 38 ? ch.subtitle.slice(0, 38) + '…' : ch.subtitle}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ))}

                            {filtered.length === 0 && (
                                <div className="px-4 py-6 text-ifa-neutral text-xs text-center">
                                    Nenhum resultado para "{search}"
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto" ref={contentRef}>
                    <div className="max-w-3xl mx-auto px-6 py-8">
                        {/* Chapter Header */}
                        <div className="mb-6 pb-4 border-b border-ifa-border">
                            <div className="text-ifa-neutral text-xs tracking-widest uppercase mb-2">
                                {SECTION_LABELS[activeChapter.section]}
                            </div>
                            <h1 className="text-ifa-gold font-serif text-2xl font-bold leading-tight mb-1">
                                {activeChapter.title}
                            </h1>
                            {activeChapter.subtitle && (
                                <div className="text-ifa-neutral text-sm italic">{activeChapter.subtitle}</div>
                            )}
                        </div>

                        {/* Chapter Content */}
                        <div className="space-y-0.5">
                            {formatContent(activeChapter.content)}
                        </div>

                        {/* Chapter Navigation (Meji only) */}
                        {activeChapter.section === 'meji' && (
                            <div className="flex justify-between mt-10 pt-6 border-t border-ifa-border">
                                {prevChapter ? (
                                    <button
                                        onClick={() => setActiveId(prevChapter.id)}
                                        className="flex items-center gap-2 text-ifa-gold text-xs hover:opacity-70 transition-opacity"
                                    >
                                        <span>←</span>
                                        <span>{prevChapter.title.split('—')[0].trim()}</span>
                                    </button>
                                ) : <div />}
                                {nextChapter && (
                                    <button
                                        onClick={() => setActiveId(nextChapter.id)}
                                        className="flex items-center gap-2 text-ifa-gold text-xs hover:opacity-70 transition-opacity"
                                    >
                                        <span>{nextChapter.title.split('—')[0].trim()}</span>
                                        <span>→</span>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Sacred Footer */}
                        <div className="mt-12 pt-6 border-t border-ifa-border text-center">
                            <div className="text-ifa-gold font-serif text-sm opacity-60">✦ Iboru, Iboya, Iboshishe ✦</div>
                            <div className="text-ifa-neutral text-xs mt-1 opacity-40">Ase o</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatiseView;
