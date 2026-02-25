
import React, { useState } from 'react';
import { ArrowLeft, MapPin, X, Info, Mountain, Waves, Map as MapIcon } from 'lucide-react';

interface City {
    id: string;
    name: string;
    x: number; // Percentage
    y: number; // Percentage
    description: string;
    orishas: string[];
    type: 'capital' | 'sacred' | 'nature';
}

const CITIES: City[] = [
    { id: 'ife', name: 'Ilé-Ifẹ̀', x: 50, y: 55, type: 'capital', description: "O Berço da Humanidade. Onde Oduduwa desceu dos céus. Centro espiritual de todo o povo Yoruba e lar do Orunmila.", orishas: ['Oduduwa', 'Orunmila', 'Obatala', 'Obaluaye'] },
    { id: 'oyo', name: 'Ọ̀yọ́', x: 35, y: 30, type: 'capital', description: "O Império do Trovão. Capital política histórica do povo Yoruba. Terra de onde Sango governou com seu machado duplo.", orishas: ['Sango', 'Bayanja', 'Aganju'] },
    { id: 'osogbo', name: 'Oṣogbo', x: 55, y: 45, type: 'sacred', description: "A cidade das águas doces. Lar do bosque sagrado de Osun (Patrimônio Mundial), onde o rio fez um pacto com o povo.", orishas: ['Osun', 'Osanyin'] },
    { id: 'abeokuta', name: 'Abeokuta', x: 25, y: 65, type: 'nature', description: "Significa 'Sob a Rocha'. Famosa pela Olumo Rock, onde o povo Egba se escondeu durante as guerras. Terra de Yemoja.", orishas: ['Yemoja', 'Ogun', 'Orisa Oko'] },
    { id: 'ketu', name: 'Ketu', x: 10, y: 55, type: 'sacred', description: "Terra ancestral no atual Benin. Conhecida por seus poderosos caçadores e magia. Origem do Candomblé Ketu.", orishas: ['Osoosi', 'Esu', 'Osumare'] },
    { id: 'ire', name: 'Irè', x: 60, y: 40, type: 'sacred', description: "A cidade onde Ogun desapareceu na terra após lutar ferozmente. Centro de culto ao Deus do Ferro.", orishas: ['Ogun'] },
    { id: 'ejigbo', name: 'Ejigbo', x: 45, y: 40, type: 'sacred', description: "Terra do Elejigbo (Oxaguiã), o guerreiro branco que come inhame pilado.", orishas: ['Osagiyan'] },
];

const YorubalandMap = ({ onBack }: { onBack: () => void }) => {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    return (
        <div className="min-h-screen bg-[#F5F5DC] text-[#3E2723] p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4 sticky top-0 z-20 bg-[#F5F5DC]/90 backdrop-blur-sm p-2 rounded-xl">
                <button onClick={onBack} className="p-2 hover:bg-black/5 rounded-full"><ArrowLeft /></button>
                <h1 className="text-xl font-serif font-bold text-[#5D4037] flex items-center gap-2"><MapIcon size={20}/> Terras Yorubás</h1>
                <div className="w-6"></div>
            </div>

            <div className="flex-grow relative bg-[#87CEEB] rounded-xl overflow-hidden border-8 border-[#8D6E63] shadow-2xl mb-24">
                {/* Ocean */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-[#4682B4] opacity-50 flex items-end">
                    <Waves className="text-white w-full opacity-20 mb-2" />
                </div>

                {/* Landmass (Abstract CSS Shape representing SW Nigeria/Benin) */}
                <div className="absolute top-4 bottom-4 left-4 right-4 bg-[#D2B48C] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] shadow-inner border-4 border-[#C19A6B]"></div>
                
                {/* River Niger/Osun (Abstract) */}
                <div className="absolute top-0 right-1/3 w-2 h-full bg-[#87CEEB] rounded-full transform rotate-12 opacity-80 border border-white/20"></div>
                <div className="absolute top-1/2 left-1/4 w-32 h-1 bg-[#87CEEB] rounded-full transform rotate-45 opacity-80"></div>

                {/* Forest Areas */}
                <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-green-700/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-green-800/30 rounded-full blur-xl"></div>

                {/* Cities */}
                {CITIES.map(city => (
                    <button
                        key={city.id}
                        onClick={() => setSelectedCity(city)}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 hover:z-20 transition-all"
                        style={{ left: `${city.x}%`, top: `${city.y}%` }}
                    >
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className={`relative transition-transform duration-300 ${selectedCity?.id === city.id ? 'scale-150 -translate-y-2' : 'group-hover:scale-125'}`}>
                                <MapPin 
                                    className={`fill-current drop-shadow-md ${city.type === 'capital' ? 'text-red-700' : city.type === 'nature' ? 'text-green-700' : 'text-[#5D4037]'}`} 
                                    size={32} 
                                />
                                {city.type === 'capital' && <span className="absolute -top-1 -right-1 text-yellow-500">👑</span>}
                            </div>
                            <span className="text-[10px] font-bold bg-[#F5F5DC]/90 px-2 py-0.5 rounded shadow mt-1 border border-[#5D4037]/30 text-[#3E2723]">
                                {city.name}
                            </span>
                        </div>
                    </button>
                ))}

                <div className="absolute bottom-4 right-4 bg-[#F5F5DC]/80 p-2 rounded border border-[#5D4037] text-[8px] text-[#5D4037]">
                    <p className="font-bold">LEGENDA</p>
                    <div className="flex items-center gap-1 mt-1"><div className="w-2 h-2 rounded-full bg-red-700"></div> Capital</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#5D4037]"></div> Cidade Sagrada</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-700"></div> Natureza</div>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedCity && (
                <div className="fixed bottom-0 left-0 w-full bg-[#F5F5DC] rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.4)] p-6 z-50 animate-slide-up border-t-4 border-[#D4AF37]">
                    <button onClick={() => setSelectedCity(null)} className="absolute top-4 right-4 text-[#5D4037] hover:text-black bg-black/5 rounded-full p-1">
                        <X size={24} />
                    </button>
                    
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-serif font-bold text-[#5D4037]">{selectedCity.name}</h2>
                        {selectedCity.type === 'capital' && <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded uppercase border border-red-200">Capital</span>}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedCity.orishas.map(o => (
                            <span key={o} className="bg-[#5D4037] text-[#F5F5DC] text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                                {o}
                            </span>
                        ))}
                    </div>
                    
                    <div className="bg-white/50 p-4 rounded-xl border border-[#5D4037]/20 mb-4">
                        <p className="text-[#3E2723] leading-relaxed text-sm">
                            {selectedCity.description}
                        </p>
                    </div>

                    <button className="w-full bg-[#D4AF37] text-[#2E150F] py-3 rounded-xl font-bold uppercase flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all">
                        <Info size={18} /> Ver Mitos de {selectedCity.name}
                    </button>
                </div>
            )}
        </div>
    );
};

export default YorubalandMap;
