import React, { useState } from 'react';
import { ArrowLeft, FlaskConical, Scroll, Stethoscope, Shield, Hand, Skull } from 'lucide-react';
import AkoseLibrary from './AkoseLibrary';
import { DB_AKOSE, DB_OFO, DB_IWOSAN, DB_ONDE, DB_IMULE, DB_GIGA } from '../data/offlineLibrary';

interface Props {
    onBack: () => void;
    onOpenInventory: () => void;
    onConsultOracle?: (query: string) => void;
}

type OogunCategory = 'menu' | 'akose' | 'ofo' | 'iwosan' | 'onde' | 'imule' | 'giga';

const OogunHub: React.FC<Props> = ({ onBack, onOpenInventory, onConsultOracle }) => {
    const [subView, setSubView] = useState<OogunCategory>('menu');

    const handleConsult = (q: string) => {
        if (onConsultOracle) {
            onConsultOracle(q);
        } else {
            console.warn("onConsultOracle not provided to OogunHub");
            alert("Navegação direta indisponível. Vá ao Chat Manualmente.");
        }
    }

    if (subView === 'akose') return <AkoseLibrary onBack={() => setSubView('menu')} onOpenInventory={onOpenInventory} items={DB_AKOSE} title="Akose (Magias)" onConsultOracle={handleConsult} />;
    if (subView === 'ofo') return <AkoseLibrary onBack={() => setSubView('menu')} onOpenInventory={onOpenInventory} items={DB_OFO} title="Ofó (Encantamentos)" onConsultOracle={handleConsult} />;
    if (subView === 'iwosan') return <AkoseLibrary onBack={() => setSubView('menu')} onOpenInventory={onOpenInventory} items={DB_IWOSAN} title="Iwosan (Cura)" onConsultOracle={handleConsult} />;
    if (subView === 'onde') return <AkoseLibrary onBack={() => setSubView('menu')} onOpenInventory={onOpenInventory} items={DB_ONDE} title="Onde (Amuletos)" onConsultOracle={handleConsult} />;
    if (subView === 'imule') return <AkoseLibrary onBack={() => setSubView('menu')} onOpenInventory={onOpenInventory} items={DB_IMULE} title="Imule (Pactos)" onConsultOracle={handleConsult} />;
    if (subView === 'giga') return <AkoseLibrary onBack={() => setSubView('menu')} onOpenInventory={onOpenInventory} items={DB_GIGA} title="Ọọgùn Gíga (Alta Magia)" onConsultOracle={handleConsult} />;

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center pt-safe">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft size={24} /></button>
                <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                    <FlaskConical size={24} /> ỌỌGÙN (MAGIAS)
                </h1>
                <div className="w-6"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                
                <button 
                    onClick={() => setSubView('akose')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group shadow-lg"
                >
                    <div className="bg-ifa-wood text-white p-4 rounded-full group-hover:bg-ifa-gold group-hover:text-black transition-colors">
                        <FlaskConical size={28} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">AKOSE</h3>
                        <p className="text-xs text-ifa-neutral uppercase tracking-widest">Magias de Ifá (Pós, Sabões)</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('ofo')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-blue-500 transition-all group shadow-lg"
                >
                    <div className="bg-blue-900/30 text-blue-400 p-4 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Scroll size={28} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">OFÓ</h3>
                        <p className="text-[10px] text-ifa-neutral uppercase tracking-widest">Encantamentos de Poder</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('iwosan')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-green-500 transition-all group shadow-lg"
                >
                    <div className="bg-green-900/30 text-green-400 p-4 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <Stethoscope size={28} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">IWOSAN</h3>
                        <p className="text-[10px] text-ifa-neutral uppercase tracking-widest">Cura e Benzimentos</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('onde')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-yellow-500 transition-all group shadow-lg"
                >
                    <div className="bg-yellow-900/30 text-yellow-400 p-4 rounded-full group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                        <Shield size={28} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">ONDE / IDEFÁ</h3>
                        <p className="text-[10px] text-ifa-neutral uppercase tracking-widest">Amuletos e Proteções</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('imule')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-purple-500 transition-all group shadow-lg"
                >
                    <div className="bg-purple-900/30 text-purple-400 p-4 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Hand size={28} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">IMULE</h3>
                        <p className="text-[10px] text-ifa-neutral uppercase tracking-widest">Pactos e Alianças</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('giga')}
                    className="bg-red-950/50 border-2 border-red-800 p-6 rounded-xl flex items-center gap-4 hover:bg-red-900 transition-all group shadow-2xl mt-4"
                >
                    <div className="bg-red-600 text-white p-4 rounded-full animate-pulse">
                        <Skull size={28} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-xl text-red-500 group-hover:text-white">ỌỌGÙN GÍGA</h3>
                        <p className="text-[10px] text-red-300 uppercase tracking-widest font-bold">Alta Magia • Acesso Restrito</p>
                    </div>
                </button>

            </div>
        </div>
    );
};

export default OogunHub;