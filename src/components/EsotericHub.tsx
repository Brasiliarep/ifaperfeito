
import React, { useState } from 'react';
import { ArrowLeft, Activity, Cat, Bird, Flame, Sparkles, Eye, Compass, Calendar, Shield, Hexagon, Mic, Stars, Users, Camera } from 'lucide-react';
import IyamiDetector from './IyamiDetector';
import AnimalOracle from './AnimalOracle';
import OmenReader from './OmenReader';
import SixteenLamps from './SixteenLamps';
import ScryingMirror from './ScryingMirror';
import LeyLineCompass from './LeyLineCompass';
import BioCalendar from './BioCalendar';
import DoorGuardian from './DoorGuardian';
import OduMandala from './OduMandala';
import MojubaMode from './MojubaMode';
import OduConstellation from './OduConstellation';
import AncestralMatch from './AncestralMatch';
import OponAR from './OponAR';

const EsotericHub = ({ onBack }: { onBack: () => void }) => {
    const [subView, setSubView] = useState<'menu' | 'iyami' | 'animal' | 'omen' | 'lamps' | 'scrying' | 'ley' | 'bio' | 'guardian' | 'mandala' | 'mojuba' | 'constellation' | 'atunwa' | 'ar'>('menu');

    if (subView === 'iyami') return <IyamiDetector onBack={() => setSubView('menu')} />;
    if (subView === 'animal') return <AnimalOracle onBack={() => setSubView('menu')} />;
    if (subView === 'omen') return <OmenReader onBack={() => setSubView('menu')} />;
    if (subView === 'lamps') return <SixteenLamps onBack={() => setSubView('menu')} />;
    if (subView === 'scrying') return <ScryingMirror onBack={() => setSubView('menu')} />;
    if (subView === 'ley') return <LeyLineCompass onBack={() => setSubView('menu')} />;
    if (subView === 'bio') return <BioCalendar onBack={() => setSubView('menu')} />;
    if (subView === 'guardian') return <DoorGuardian onBack={() => setSubView('menu')} />;
    if (subView === 'mandala') return <OduMandala odu={{name: 'Ejiogbe', isMeji: true, binaryRepresentation: 'I I I I'}} onBack={() => setSubView('menu')} />; 
    if (subView === 'mojuba') return <MojubaMode onBack={() => setSubView('menu')} />;
    if (subView === 'constellation') return <OduConstellation onBack={() => setSubView('menu')} />;
    if (subView === 'atunwa') return <AncestralMatch onBack={() => setSubView('menu')} />;
    if (subView === 'ar') return <OponAR onBack={() => setSubView('menu')} />;

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft size={24} /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Sparkles size={20} /> Ferramentas Esotéricas de Ifá</h1>
                <div className="w-6"></div>
            </div>

            <div className="grid gap-6 w-full max-w-md">
                
                {/* AR & VOICE TOOLS */}
                <button 
                    onClick={() => setSubView('ar')}
                    className="bg-ifa-base border border-ifa-border p-4 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-3 rounded-full group-hover:bg-ifa-gold group-hover:text-black">
                        <Camera size={24} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-sm text-ifa-text">Opon Ifá AR</h3>
                        <p className="text-[10px] text-ifa-neutral">Projeção em Realidade Aumentada.</p>
                    </div>
                </button>

                 <button 
                    onClick={() => setSubView('mojuba')}
                    className="bg-ifa-base border border-ifa-border p-4 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-orange-900/30 text-orange-400 p-3 rounded-full">
                        <Mic size={24} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-sm text-ifa-text">Mojuba Voice</h3>
                        <p className="text-[10px] text-ifa-neutral">Autenticador Litúrgico por Voz.</p>
                    </div>
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setSubView('atunwa')}
                        className="bg-ifa-base border border-ifa-border p-3 rounded-xl flex flex-col items-center gap-2 hover:border-ifa-gold transition-all"
                    >
                        <Users size={24} className="text-gray-400"/>
                        <span className="text-xs font-bold">Atunwa (IA)</span>
                    </button>
                    
                    <button 
                        onClick={() => setSubView('constellation')}
                        className="bg-ifa-base border border-ifa-border p-3 rounded-xl flex flex-col items-center gap-2 hover:border-ifa-gold transition-all"
                    >
                        <Stars size={24} className="text-blue-400"/>
                        <span className="text-xs font-bold">Constelação</span>
                    </button>

                    <button 
                        onClick={() => setSubView('mandala')}
                        className="bg-ifa-base border border-ifa-border p-3 rounded-xl flex flex-col items-center gap-2 hover:border-ifa-gold transition-all"
                    >
                        <Hexagon size={24} className="text-ifa-wood"/>
                        <span className="text-xs font-bold">Mandala Odu</span>
                    </button>

                    <button 
                        onClick={() => setSubView('scrying')}
                        className="bg-black border border-gray-700 p-3 rounded-xl flex flex-col items-center gap-2 hover:border-white transition-all"
                    >
                        <Eye size={24} className="text-gray-300"/>
                        <span className="text-xs font-bold">Espelho Negro</span>
                    </button>
                </div>

                <button 
                    onClick={() => setSubView('guardian')}
                    className="bg-ifa-base border border-ifa-border p-4 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-3 rounded-full">
                        <Shield size={24} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-sm text-ifa-text">Guardião da Porta (AR)</h3>
                        <p className="text-[10px] text-ifa-neutral">Sigilo de Proteção para Ambientes.</p>
                    </div>
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => setSubView('ley')}
                        className="bg-blue-900/30 border border-blue-500/50 p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-blue-900/50"
                    >
                        <Compass size={24} className="text-blue-200"/>
                        <span className="text-xs font-bold">Bússola Força</span>
                    </button>

                     <button 
                        onClick={() => setSubView('bio')}
                        className="bg-purple-900/30 border border-purple-500/50 p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-purple-900/50"
                    >
                        <Calendar size={24} className="text-purple-200"/>
                        <span className="text-xs font-bold">Bio-Ritmo</span>
                    </button>
                </div>
            
                <button 
                    onClick={() => setSubView('iyami')}
                    className="bg-red-900/30 border border-red-500/50 p-4 rounded-xl flex items-center gap-4 hover:bg-red-900/50 transition-all group"
                >
                    <div className="bg-red-900 text-red-200 p-3 rounded-full">
                        <Activity size={24} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-sm text-ifa-text">Sensor de Iyami</h3>
                        <p className="text-[10px] text-ifa-neutral">Detecção de frequências espirituais.</p>
                    </div>
                </button>

                <div className="grid grid-cols-3 gap-3">
                    <button 
                        onClick={() => setSubView('animal')}
                        className="bg-green-900/30 border border-green-500/50 p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-green-900/50"
                    >
                        <Cat size={20} className="text-green-200"/>
                        <span className="text-[10px] font-bold">Bichos</span>
                    </button>

                    <button 
                        onClick={() => setSubView('omen')}
                        className="bg-blue-900/30 border border-blue-500/50 p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-blue-900/50"
                    >
                        <Bird size={20} className="text-blue-200"/>
                        <span className="text-[10px] font-bold">Agouros</span>
                    </button>

                    <button 
                        onClick={() => setSubView('lamps')}
                        className="bg-yellow-900/30 border border-yellow-500/50 p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-yellow-900/50"
                    >
                        <Flame size={20} className="text-yellow-200"/>
                        <span className="text-[10px] font-bold">Lâmpadas</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EsotericHub;
