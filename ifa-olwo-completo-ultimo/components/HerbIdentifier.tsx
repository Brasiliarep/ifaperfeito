
import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Image as ImageIcon, Leaf, Loader2, Info, Search } from 'lucide-react';
import { identifyPlant } from '../services/geminiService';
import { HERB_DATABASE } from '../data/herbs';

const HerbIdentifier = ({ onBack }: { onBack: () => void }) => {
    const [image, setImage] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");
    const [result, setResult] = useState<{yorubaName: string, scientificName: string, commonName: string, spiritualUse: string, oduReference: string, imageUrl?: string} | null>(null);
    const [loading, setLoading] = useState(false);
    
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

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

    // Consistent logic with ShoppingList
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

            // Check Key
            if (inputNorm.includes(dbKeyNorm) || dbKeyNorm.includes(inputNorm) || 
                inputNorm.includes(dbKeyClean) || dbKeyClean.includes(cleanInput)) {
                return item;
            }
            // Check Values
            if (yorubaNorm.includes(inputNorm) || inputNorm.includes(yorubaNorm) ||
                commonNorm.includes(inputNorm) || inputNorm.includes(commonNorm) ||
                commonNorm.includes(cleanInput)) {
                return item;
            }
        }
        return null;
    };

    const enhanceWithLocalImage = (aiData: any) => {
        // Try to match AI results with local DB to get better images
        const match = searchLocalDB(aiData.yorubaName) || searchLocalDB(aiData.commonName) || searchLocalDB(aiData.scientificName);
        if (match) {
            return { ...aiData, imageUrl: match.imageUrl };
        }
        return aiData;
    };

    const processImage = async (base64: string) => {
        setLoading(true);
        try {
            const data = await identifyPlant(base64, 'pt-BR');
            setResult(enhanceWithLocalImage(data));
        } catch (error) {
            alert("Não foi possível identificar a planta. Tente uma foto mais clara ou use a busca por texto.");
        } finally {
            setLoading(false);
        }
    };

    const handleTextSearch = async () => {
        if (!searchText.trim()) return;
        setLoading(true);
        setImage(null);
        setResult(null);

        // 1. Try DIRECT Local Match First
        const localMatch = searchLocalDB(searchText);

        if (localMatch) {
            setLoading(false);
            setResult({
                yorubaName: localMatch.yorubaName,
                scientificName: localMatch.scientificName,
                commonName: localMatch.commonName,
                spiritualUse: localMatch.description,
                oduReference: "Referência Interna",
                imageUrl: localMatch.imageUrl
            });
            return;
        }

        // 2. If not found locally, ask AI
        try {
            const data = await identifyPlant(`TEXT_SEARCH:${searchText}`, 'pt-BR');
            setResult(enhanceWithLocalImage(data));
        } catch (error) {
            alert("Erro na pesquisa.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <Leaf size={24} /> Identificador de Ewé (Ervas)
                    </h1>
                </div>

                <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 shadow-2xl text-center">
                    
                    {/* TEXT SEARCH BAR */}
                    <div className="flex gap-2 mb-8 relative">
                        <input 
                            placeholder="Pesquisar nome da planta (Ex: Peregun)..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleTextSearch()}
                            className="w-full bg-ifa-base-dark border border-ifa-border rounded-lg pl-4 pr-12 py-3 focus:border-ifa-gold outline-none"
                        />
                        <button 
                            onClick={handleTextSearch}
                            disabled={loading || !searchText.trim()}
                            className="absolute right-2 top-2 p-1.5 bg-ifa-gold text-ifa-base rounded hover:opacity-90 disabled:opacity-50"
                        >
                            <Search size={20} />
                        </button>
                    </div>

                    <p className="text-xs text-ifa-neutral mb-6 uppercase font-bold">Ou use a câmera</p>

                    <div className="flex justify-center gap-4 mb-8">
                        <button 
                            onClick={() => cameraInputRef.current?.click()}
                            className="flex flex-col items-center justify-center w-24 h-24 bg-ifa-base-dark border-2 border-dashed border-ifa-border rounded-xl hover:border-ifa-gold transition-colors group"
                        >
                            <Camera size={24} className="text-ifa-neutral group-hover:text-ifa-gold mb-2"/>
                            <span className="text-[10px] uppercase font-bold text-ifa-neutral">Câmera</span>
                        </button>
                        
                        <button 
                            onClick={() => galleryInputRef.current?.click()}
                            className="flex flex-col items-center justify-center w-24 h-24 bg-ifa-base-dark border-2 border-dashed border-ifa-border rounded-xl hover:border-ifa-gold transition-colors group"
                        >
                            <ImageIcon size={24} className="text-ifa-neutral group-hover:text-ifa-gold mb-2"/>
                            <span className="text-[10px] uppercase font-bold text-ifa-neutral">Galeria</span>
                        </button>
                    </div>

                    {/* Hidden Inputs */}
                    <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
                    <input type="file" accept="image/*" ref={galleryInputRef} onChange={handleFileChange} className="hidden" />

                    {/* Preview & Loading */}
                    {image && (
                        <div className="mb-6 relative rounded-lg overflow-hidden border border-ifa-gold/50 mx-auto max-w-sm">
                            <img src={image} className="w-full h-auto" alt="Plant Preview" />
                        </div>
                    )}
                    
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <Loader2 className="animate-spin text-ifa-gold mb-2" size={48} />
                            <span className="text-ifa-gold font-bold animate-pulse">Consultando Osanyin...</span>
                        </div>
                    )}

                    {/* Result */}
                    {result && !loading && (
                        <div className="text-left bg-green-900/10 border border-green-500/30 rounded-lg p-6 animate-fade-in mt-4">
                            
                            {/* Generated Image Logic with fallback */}
                            <div className="mb-4 rounded-lg overflow-hidden border border-green-500/30 max-h-60 bg-black/40">
                                <img 
                                    src={result.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'} 
                                    alt={result.yorubaName} 
                                    className="w-full h-full object-cover" 
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (!target.src.includes('No_image')) {
                                            target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-serif text-ifa-gold font-bold">{result.yorubaName}</h2>
                                    <p className="text-sm text-white italic">{result.scientificName}</p>
                                </div>
                                <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded border border-green-500 max-h-6">
                                    {result.commonName}
                                </span>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-ifa-base-dark p-3 rounded border border-ifa-border">
                                    <h4 className="text-xs font-bold text-ifa-neutral uppercase mb-1">Uso Litúrgico / Mágico</h4>
                                    <p className="text-sm text-ifa-text leading-relaxed">{result.spiritualUse}</p>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-ifa-wood font-bold bg-ifa-wood/10 p-2 rounded w-fit">
                                    <Info size={14} /> Referência: {result.oduReference}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HerbIdentifier;
