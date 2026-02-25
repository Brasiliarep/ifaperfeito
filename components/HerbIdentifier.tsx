
import React, { useState, useRef, useEffect } from 'react';
import {
    ArrowLeft, Camera, Image as ImageIcon, Leaf, Loader2, Info, Search,
    Droplets, Mountain, Wind, Flame, Zap, ShieldCheck, X, Sparkles, Filter
} from 'lucide-react';
import { identifyPlant } from '../services/geminiService';
import { HERB_DATABASE } from '../data/herbs';
import { HerbInfo } from '../types';

const HerbIdentifier = ({ onBack }: { onBack: () => void }) => {
    const [image, setImage] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");
    const [result, setResult] = useState<HerbInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [liveImageUrl, setLiveImageUrl] = useState<string | null>(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [selectedHerb, setSelectedHerb] = useState<HerbInfo | null>(null);
    const [filterClass, setFilterClass] = useState<'ero' | 'gun' | 'all'>('all');

    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    // ─── FETCH LIVE IMAGE VIA WIKIPEDIA ───
    useEffect(() => {
        const target = selectedHerb || result;
        if (!target) { setLiveImageUrl(null); return; }

        setLiveImageUrl(null);
        setImageLoading(true);
        const fetchImage = async () => {
            const queries = [
                target.scientificName,
                target.commonName?.split('/')[0].trim(),
                target.yorubaName,
            ].filter(Boolean);
            for (const q of queries) {
                try {
                    const slug = encodeURIComponent(q.replace(/\s+/g, '_'));
                    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`, {
                        headers: { 'Accept': 'application/json' }
                    });
                    if (!res.ok) continue;
                    const data = await res.json();
                    const url = data?.thumbnail?.source || data?.originalimage?.source;
                    if (url) { setLiveImageUrl(url); setImageLoading(false); return; }
                } catch { continue; }
            }
            setImageLoading(false);
        };
        fetchImage();
    }, [result, selectedHerb]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setResult(null);
                processImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const searchLocalDB = (query: string) => {
        if (!query) return null;
        const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
        const inputNorm = normalize(query);
        const cleanInput = inputNorm.replace(/^ewe\s+/, '').replace(/^folha(s)?\s+(de|da|do)\s+/, '').trim();
        const keys = Object.keys(HERB_DATABASE);

        for (const k of keys) {
            const dbKeyNorm = normalize(k);
            const dbKeyClean = dbKeyNorm.replace(/^ewe\s+/, '').trim();
            const item = HERB_DATABASE[k];
            const yorubaNorm = normalize(item.yorubaName);
            const commonNorm = normalize(item.commonName);

            if (inputNorm.includes(dbKeyNorm) || dbKeyNorm.includes(inputNorm) ||
                inputNorm.includes(dbKeyClean) || dbKeyClean.includes(cleanInput)) return item;
            if (yorubaNorm.includes(inputNorm) || inputNorm.includes(yorubaNorm) ||
                commonNorm.includes(inputNorm) || inputNorm.includes(commonNorm)) return item;
        }
        return null;
    };

    const enhanceWithLocalImage = (aiData: any) => {
        const match = searchLocalDB(aiData.yorubaName) || searchLocalDB(aiData.commonName) || searchLocalDB(aiData.scientificName);
        if (match) return { ...match, ...aiData, imageUrl: match.imageUrl || aiData.imageUrl };
        return aiData;
    };

    const processImage = async (base64: string) => {
        setLoading(true);
        try {
            const data = await identifyPlant(base64, 'pt-BR');
            setResult(enhanceWithLocalImage(data));
        } catch (error) {
            alert("Não foi possível identificar. Tente uma foto mais clara.");
        } finally {
            setLoading(false);
        }
    };

    const handleTextSearch = async () => {
        if (!searchText.trim()) return;
        setLoading(true);
        setImage(null);
        setResult(null);

        const localMatch = searchLocalDB(searchText);
        if (localMatch) {
            setLoading(false);
            setResult(localMatch);
            return;
        }

        try {
            const data = await identifyPlant(`TEXT_SEARCH:${searchText}`, 'pt-BR');
            setResult(enhanceWithLocalImage(data));
        } catch (error) {
            alert("Erro na pesquisa.");
        } finally {
            setLoading(false);
        }
    };

    const ElementIcon = ({ type }: { type?: string }) => {
        switch (type) {
            case 'water': return <Droplets className="text-blue-400" size={16} />;
            case 'earth': return <Mountain className="text-amber-600" size={16} />;
            case 'air': return <Wind className="text-cyan-300" size={16} />;
            case 'fire': return <Flame className="text-red-500" size={16} />;
            default: return <Leaf className="text-green-500" size={16} />;
        }
    };

    const ClassificationBadge = ({ type }: { type?: string }) => {
        if (!type || type === 'none') return null;
        const isEro = type === 'ero';
        return (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${isEro ? 'bg-blue-900/50 text-blue-300 border border-blue-500/30' : 'bg-red-900/50 text-red-300 border border-red-500/30'}`}>
                {isEro ? 'Ero (Fria)' : 'Gun (Quente)'}
            </span>
        );
    };

    const filteredHerbs = Object.values(HERB_DATABASE).filter(h => {
        if (filterClass === 'all') return true;
        return h.classification === filterClass;
    });

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8 relative">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text bg-ifa-base p-2 rounded-full border border-ifa-border">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                            <Sparkles size={24} /> Jardim de Osanyin
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => cameraInputRef.current?.click()} className="p-3 bg-ifa-gold text-ifa-base rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Camera size={20} />
                        </button>
                        <button onClick={() => galleryInputRef.current?.click()} className="p-3 bg-ifa-base border border-ifa-gold text-ifa-gold rounded-full shadow-lg hover:scale-110 transition-transform">
                            <ImageIcon size={20} />
                        </button>
                    </div>
                </div>

                {/* SEARCH BAR */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-ifa-neutral group-focus-within:text-ifa-gold transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        placeholder="Pesquisar erva por nome Yorubá ou popular..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTextSearch()}
                        className="w-full bg-ifa-base border-2 border-ifa-border rounded-2xl pl-12 pr-4 py-4 focus:border-ifa-gold outline-none shadow-xl text-lg transition-all"
                    />
                </div>

                {/* FILTERS & STATS */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterClass('all')}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${filterClass === 'all' ? 'bg-ifa-gold text-ifa-base shadow-lg' : 'bg-ifa-base border border-ifa-border text-ifa-neutral'}`}
                        >
                            Todas
                        </button>
                        <button
                            onClick={() => setFilterClass('ero')}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${filterClass === 'ero' ? 'bg-blue-600 text-white shadow-lg' : 'bg-ifa-base border border-ifa-border text-ifa-neutral'}`}
                        >
                            Ero (Frias)
                        </button>
                        <button
                            onClick={() => setFilterClass('gun')}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${filterClass === 'gun' ? 'bg-red-600 text-white shadow-lg' : 'bg-ifa-base border border-ifa-border text-ifa-neutral'}`}
                        >
                            Gun (Quentes)
                        </button>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-ifa-neutral tracking-widest">{filteredHerbs.length} Ewé Mapeadas</span>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                    {filteredHerbs.map((herb, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedHerb(herb)}
                            className="bg-ifa-base border border-ifa-border rounded-2xl overflow-hidden hover:border-ifa-gold transition-all cursor-pointer group shadow-lg"
                        >
                            <div className="h-32 bg-ifa-base-dark relative overflow-hidden">
                                <img src={herb.imageUrl} alt={herb.yorubaName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                <div className="absolute top-2 right-2">
                                    <div className="bg-black/40 backdrop-blur-sm p-1.5 rounded-full border border-white/20">
                                        <ElementIcon type={herb.element} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-bold text-ifa-gold truncate">{herb.yorubaName}</h3>
                                <p className="text-[10px] text-ifa-neutral truncate mb-2">{herb.commonName}</p>
                                <ClassificationBadge type={herb.classification} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* HIDDEN INPUTS */}
                <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
                <input type="file" accept="image/*" ref={galleryInputRef} onChange={handleFileChange} className="hidden" />

                {/* LOADING OVERLAY */}
                {loading && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-[100]">
                        <div className="relative">
                            <Loader2 className="animate-spin text-ifa-gold mb-4" size={64} />
                            <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500" size={24} />
                        </div>
                        <span className="text-ifa-gold font-bold tracking-widest uppercase animate-pulse">Consultando Osanyin...</span>
                    </div>
                )}

                {/* DETAIL MODAL */}
                {(selectedHerb || result) && (
                    <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
                        <div className="bg-ifa-base-dark w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border-t md:border border-ifa-gold/30 shadow-2xl relative">

                            <button
                                onClick={() => { setSelectedHerb(null); setResult(null); }}
                                className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-red-600 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Header/Image */}
                            <div className="h-64 md:h-80 bg-black relative">
                                {imageLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                                        <Loader2 size={32} className="animate-spin text-ifa-gold" />
                                    </div>
                                )}
                                <img
                                    src={liveImageUrl || (selectedHerb || result)?.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'}
                                    className="w-full h-full object-cover opacity-80"
                                    alt="Herb"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ifa-base-dark to-transparent p-6 pt-20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ClassificationBadge type={(selectedHerb || result)?.classification} />
                                        <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-2 text-xs">
                                            <ElementIcon type={(selectedHerb || result)?.element} />
                                            <span className="capitalize">Elemento {(selectedHerb || result)?.element || '---'}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold text-white">{(selectedHerb || result)?.yorubaName}</h2>
                                    <p className="text-ifa-gold italic">{(selectedHerb || result)?.scientificName}</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-8 space-y-8">
                                {/* Overview */}
                                <div className="bg-ifa-base p-5 rounded-2xl border border-ifa-border">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-ifa-neutral uppercase tracking-widest mb-3">
                                        <Info size={14} /> Descrição Botânica & Sagrada
                                    </h4>
                                    <p className="text-ifa-text leading-relaxed italic">"{(selectedHerb || result)?.description}"</p>
                                </div>

                                {/* Ritual Use */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-ifa-gold uppercase tracking-widest mb-4">
                                        <Zap size={16} /> Fundamento Litúrgico
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-1 bg-ifa-gold rounded-full"></div>
                                            <div>
                                                <p className="text-[10px] text-ifa-neutral uppercase font-bold mb-1">Orixás Relacionados</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(selectedHerb || result)?.orishas?.map((o, idx) => (
                                                        <span key={idx} className="bg-ifa-surface px-3 py-1 rounded-lg border border-ifa-border text-xs text-ifa-text-light font-medium">{o}</span>
                                                    )) || <span className="text-xs italic text-ifa-neutral">Não especificado</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-1 bg-ifa-wood rounded-full"></div>
                                            <div>
                                                <p className="text-[10px] text-ifa-neutral uppercase font-bold mb-1">Aplicação Prática (Oogun / Ebó)</p>
                                                <p className="text-sm text-ifa-text-light">{(selectedHerb || result)?.liturgy || "Uso conforme orientação oracular ou conhecimento sacerdotal."}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Warning */}
                                <div className="border-t border-ifa-border pt-6 flex items-start gap-3 opacity-60">
                                    <ShieldCheck className="text-ifa-gold mt-1" size={20} />
                                    <p className="text-[10px] text-ifa-neutral leading-tight italic">
                                        O uso ritualístico de ervas deve respeitar o segredo (awo) e ser conduzido por pessoas devidamente iniciadas. Ewé d'ógùn — "A folha se torna remédio/magia".
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HerbIdentifier;
