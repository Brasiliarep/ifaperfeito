
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Plus, Trash2, Leaf, Navigation } from 'lucide-react';

interface HerbLocation {
    id: string;
    name: string;
    lat: number;
    lng: number;
    date: string;
    note?: string;
}

const GeoHerbManager = ({ onBack }: { onBack: () => void }) => {
    const [locations, setLocations] = useState<HerbLocation[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newLocName, setNewLocName] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('ifa_herb_map');
        if (stored) setLocations(JSON.parse(stored));
    }, []);

    const saveLocations = (updated: HerbLocation[]) => {
        setLocations(updated);
        localStorage.setItem('ifa_herb_map', JSON.stringify(updated));
    };

    const handleAddCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocalização não suportada.");
            return;
        }
        
        navigator.geolocation.getCurrentPosition((position) => {
            const newLoc: HerbLocation = {
                id: crypto.randomUUID(),
                name: newLocName || "Erva Desconhecida",
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                date: new Date().toLocaleDateString()
            };
            saveLocations([newLoc, ...locations]);
            setIsAdding(false);
            setNewLocName('');
        }, (err) => {
            alert("Erro ao obter localização.");
        });
    };

    const openInMaps = (lat: number, lng: number) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    };

    const handleDelete = (id: string) => {
        if(confirm("Remover este ponto?")) {
            saveLocations(locations.filter(l => l.id !== id));
        }
    }

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <MapPin size={24} /> Mapa de Coleta (Geo-Ervas)
                    </h1>
                </div>

                {!isAdding ? (
                    <>
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="w-full mb-6 py-4 bg-green-900/30 border border-green-700/50 text-green-200 rounded-xl flex items-center justify-center gap-2 hover:bg-green-900/50"
                        >
                            <Plus size={20} /> Marcar Erva Aqui
                        </button>

                        <div className="space-y-4">
                            {locations.length === 0 && <p className="text-center text-ifa-neutral">Nenhum ponto de coleta marcado.</p>}
                            {locations.map(loc => (
                                <div key={loc.id} className="bg-ifa-base border border-ifa-border p-4 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-900/50 text-green-400 rounded-full">
                                            <Leaf size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-ifa-text">{loc.name}</h3>
                                            <p className="text-xs text-ifa-neutral">Lat: {loc.lat.toFixed(4)}, Lng: {loc.lng.toFixed(4)}</p>
                                            <p className="text-[10px] text-ifa-neutral opacity-70">{loc.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openInMaps(loc.lat, loc.lng)} className="p-2 bg-ifa-wood text-white rounded hover:opacity-90">
                                            <Navigation size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(loc.id)} className="p-2 bg-red-900/50 text-red-400 rounded hover:bg-red-900">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="bg-ifa-base border border-ifa-border p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-ifa-gold mb-4">Nova Marcação</h3>
                        <label className="block text-xs uppercase mb-1 text-ifa-neutral">Nome da Planta</label>
                        <input 
                            value={newLocName}
                            onChange={(e) => setNewLocName(e.target.value)}
                            placeholder="Ex: Peregun, Folha da Costa..."
                            className="w-full bg-ifa-base-dark border border-ifa-border p-3 rounded mb-6 text-ifa-text"
                        />
                        <div className="flex gap-4">
                            <button onClick={() => setIsAdding(false)} className="flex-1 py-3 border border-ifa-border text-ifa-neutral rounded">Cancelar</button>
                            <button onClick={handleAddCurrentLocation} className="flex-1 py-3 bg-ifa-gold text-ifa-base font-bold rounded">Salvar Localização Atual</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeoHerbManager;
