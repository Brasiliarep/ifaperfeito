
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Book, Plus, Trash2, Moon, Sparkles, Save, Brain, Loader2, GitGraph } from 'lucide-react';
import { interpretDream } from '../services/geminiService';

interface DreamEntry {
    id: string;
    date: string;
    title: string;
    description: string;
    interpretation: string;
    oduReference?: string;
    advice?: string;
}

const DreamJournal = ({ onBack }: { onBack: () => void }) => {
    const [dreams, setDreams] = useState<DreamEntry[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [isAdding, setIsAdding] = useState(false);
    const [isInterpreting, setIsInterpreting] = useState(false);
    const [newDream, setNewDream] = useState<Partial<DreamEntry>>({
        date: new Date().toISOString().split('T')[0]
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const stored = localStorage.getItem('ifa_dream_journal');
        if (stored) setDreams(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (viewMode === 'map' && canvasRef.current) {
            drawMap();
        }
    }, [viewMode, dreams]);

    const saveDreams = (updated: DreamEntry[]) => {
        setDreams(updated);
        localStorage.setItem('ifa_dream_journal', JSON.stringify(updated));
    };

    const handleAdd = () => {
        if (!newDream.title || !newDream.description) return;
        const entry: DreamEntry = {
            id: crypto.randomUUID(),
            date: newDream.date!,
            title: newDream.title,
            description: newDream.description,
            interpretation: newDream.interpretation || "",
            oduReference: newDream.oduReference,
            advice: newDream.advice
        };
        saveDreams([entry, ...dreams]);
        setIsAdding(false);
        setNewDream({ date: new Date().toISOString().split('T')[0], title: '', description: '', interpretation: '' });
    };

    const handleInterpret = async () => {
        if (!newDream.description) return;
        setIsInterpreting(true);
        try {
            const result = await interpretDream(newDream.description, 'pt-BR');
            setNewDream(prev => ({
                ...prev,
                interpretation: result.meaning,
                oduReference: result.relatedOdu,
                advice: result.advice
            }));
        } catch (error) {
            alert("Erro ao interpretar sonho. Verifique a conexão.");
        } finally {
            setIsInterpreting(false);
        }
    }

    const handleDelete = (id: string) => {
        if (confirm("Apagar este sonho?")) {
            saveDreams(dreams.filter(d => d.id !== id));
        }
    };

    const drawMap = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset
        canvas.width = canvas.parentElement?.clientWidth || 300;
        canvas.height = 400;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Simple mock visualization logic
        // In a real app, this would use force-directed graph logic
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.fillStyle = '#D4AF37';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        // Draw Central Node (The Dreamer)
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText("Ori", centerX, centerY + 35);

        // Draw Dreams as Satellites
        dreams.slice(0, 8).forEach((dream, i) => {
            const angle = (i / Math.min(dreams.length, 8)) * Math.PI * 2;
            const radius = 100 + Math.random() * 50;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            // Line
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#5D4037';
            ctx.stroke();

            // Node
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#a8a29e';
            ctx.fill();

            // Label
            ctx.fillStyle = '#D4AF37';
            ctx.fillText(dream.title.substring(0, 10), x, y + 20);
        });
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                            <Moon size={24} /> Diário Onírico
                        </h1>
                    </div>
                    
                    {!isAdding && (
                        <div className="flex bg-ifa-base border border-ifa-border rounded-lg p-1">
                            <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded text-xs font-bold uppercase ${viewMode === 'list' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral'}`}><Book size={16}/></button>
                            <button onClick={() => setViewMode('map')} className={`px-3 py-1 rounded text-xs font-bold uppercase ${viewMode === 'map' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral'}`}><GitGraph size={16}/></button>
                        </div>
                    )}
                </div>

                {!isAdding ? (
                    <>
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="w-full mb-8 py-4 border-2 border-dashed border-ifa-border rounded-xl text-ifa-neutral hover:text-ifa-gold hover:border-ifa-gold transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={20} /> Registrar Novo Sonho
                        </button>

                        {viewMode === 'list' ? (
                            <div className="space-y-4">
                                {dreams.length === 0 && (
                                    <p className="text-center text-ifa-neutral italic">Nenhum sonho registrado. Os sonhos são mensageiros dos Orixás.</p>
                                )}
                                {dreams.map(dream => (
                                    <div key={dream.id} className="bg-ifa-base border border-ifa-border rounded-lg p-5 relative group hover:border-ifa-gold transition-all">
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleDelete(dream.id)} className="text-red-500 hover:text-red-400">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-ifa-wood font-bold uppercase mb-2">
                                            <span>{new Date(dream.date).toLocaleDateString()}</span>
                                            <span className="w-1 h-1 rounded-full bg-ifa-gold"></span>
                                            <span>Registro</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-ifa-text mb-2">{dream.title}</h3>
                                        <p className="text-sm text-ifa-text-light whitespace-pre-line leading-relaxed">
                                            {dream.description}
                                        </p>
                                        
                                        {dream.interpretation && (
                                            <div className="mt-4 pt-4 border-t border-ifa-border/30 bg-black/10 p-3 rounded">
                                                <div className="flex items-center gap-2 text-ifa-gold text-xs font-bold uppercase mb-2">
                                                    <Brain size={14} /> Interpretação de Ifá ({dream.oduReference})
                                                </div>
                                                <p className="text-sm text-ifa-text-light mb-2">{dream.interpretation}</p>
                                                <p className="text-xs text-ifa-neutral italic">Conselho: {dream.advice}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-ifa-base border border-ifa-border rounded-xl p-4 shadow-2xl">
                                <h3 className="text-center text-ifa-gold font-bold uppercase text-xs mb-4">Cartografia dos Sonhos (Conexões)</h3>
                                <div className="w-full overflow-hidden rounded-lg bg-black/20">
                                    <canvas ref={canvasRef} className="w-full h-[400px]" />
                                </div>
                                <p className="text-center text-xs text-ifa-neutral mt-4">Visualização das conexões entre seus sonhos recentes e seu Ori.</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 shadow-xl animate-fade-in">
                        {/* Form Code (Same as before) */}
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-ifa-gold uppercase mb-1">Data</label>
                            <input 
                                type="date" 
                                value={newDream.date}
                                onChange={e => setNewDream({...newDream, date: e.target.value})}
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text focus:border-ifa-gold outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-ifa-gold uppercase mb-1">Título do Sonho</label>
                            <input 
                                placeholder="Ex: Rio Vermelho, Cobra, Dente caindo..."
                                value={newDream.title || ''}
                                onChange={e => setNewDream({...newDream, title: e.target.value})}
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text focus:border-ifa-gold outline-none"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-ifa-gold uppercase mb-1">Descrição Detalhada</label>
                            <textarea 
                                placeholder="Descreva símbolos, cores, emoções e pessoas..."
                                value={newDream.description || ''}
                                onChange={e => setNewDream({...newDream, description: e.target.value})}
                                className="w-full h-40 bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text focus:border-ifa-gold outline-none resize-none"
                            />
                        </div>

                        {/* AI INTERPRETATION BUTTON */}
                        <div className="mb-6">
                            <button 
                                onClick={handleInterpret}
                                disabled={!newDream.description || isInterpreting}
                                className="w-full py-3 bg-purple-900/30 border border-purple-500/50 text-purple-200 rounded flex items-center justify-center gap-2 hover:bg-purple-900/50 transition-colors"
                            >
                                {isInterpreting ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                Interpretar com Ifá
                            </button>
                            
                            {newDream.interpretation && (
                                <div className="mt-4 p-4 bg-ifa-surface border border-ifa-gold/30 rounded animate-fade-in">
                                    <h4 className="text-ifa-gold font-bold mb-1">Interpretação:</h4>
                                    <p className="text-sm mb-2">{newDream.interpretation}</p>
                                    <p className="text-xs text-ifa-wood font-bold">Odu Relacionado: {newDream.oduReference}</p>
                                    <p className="text-xs text-ifa-neutral">Conselho: {newDream.advice}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setIsAdding(false)} className="flex-1 py-3 border border-ifa-border text-ifa-neutral rounded hover:text-white">
                                Cancelar
                            </button>
                            <button onClick={handleAdd} className="flex-1 py-3 bg-ifa-gold text-ifa-base font-bold rounded hover:opacity-90 flex items-center justify-center gap-2">
                                <Save size={18} /> Salvar Sonho
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DreamJournal;
