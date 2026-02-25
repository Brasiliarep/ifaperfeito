
import React, { useState } from 'react';
import { ArrowLeft, Mic2, Activity, Trees, Ghost, Moon, Drum } from 'lucide-react';
import IyerePlayer from './IyerePlayer';
import OduSound from './OduSound';
import NatureMixer from './NatureMixer';
import EgunAudio from './EgunAudio';
import LucidDreamingPlayer from './LucidDreamingPlayer';
import RhythmOracle from './RhythmOracle';

const SoundHub = ({ onBack }: { onBack: () => void }) => {
    const [subView, setSubView] = useState<'menu' | 'iyere' | 'binaural' | 'nature' | 'egun' | 'lucid' | 'rhythm'>('menu');

    if (subView === 'iyere') return <IyerePlayer onBack={() => setSubView('menu')} />;
    if (subView === 'binaural') return <OduSound onBack={() => setSubView('menu')} />;
    if (subView === 'nature') return <NatureMixer onBack={() => setSubView('menu')} />;
    if (subView === 'egun') return <EgunAudio onBack={() => setSubView('menu')} />;
    if (subView === 'lucid') return <LucidDreamingPlayer onBack={() => setSubView('menu')} />;
    if (subView === 'rhythm') return <RhythmOracle onBack={() => setSubView('menu')} />;

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2">Sons Sagrados</h1>
                <div className="w-6"></div>
            </div>

            <div className="grid gap-4 w-full max-w-md">
                <button 
                    onClick={() => setSubView('rhythm')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-4 rounded-full group-hover:bg-ifa-gold transition-colors">
                        <Drum size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Ayan Agalu (Ritmo)</h3>
                        <p className="text-xs text-ifa-neutral">Oráculo de percussão e transe.</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('iyere')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-4 rounded-full group-hover:bg-ifa-gold transition-colors">
                        <Mic2 size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Karaokê Iyere</h3>
                        <p className="text-xs text-ifa-neutral">Treine os cânticos sagrados dos Odus.</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('binaural')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-4 rounded-full group-hover:bg-ifa-gold transition-colors">
                        <Activity size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Som do Odu (Binaural)</h3>
                        <p className="text-xs text-ifa-neutral">Frequências de alinhamento cerebral.</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('lucid')}
                    className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl flex items-center gap-4 hover:bg-purple-900/40 transition-all group"
                >
                    <div className="bg-purple-900 text-purple-200 p-4 rounded-full group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <Moon size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Sonhos Lúcidos (Theta)</h3>
                        <p className="text-xs text-ifa-neutral">Indução 4Hz para viagem astral.</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('nature')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-4 rounded-full group-hover:bg-ifa-gold transition-colors">
                        <Trees size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Sons da Natureza</h3>
                        <p className="text-xs text-ifa-neutral">Ambiência para meditação e jogo.</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('egun')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-4 rounded-full group-hover:bg-ifa-gold transition-colors">
                        <Ghost size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Sussurro dos Ancestrais</h3>
                        <p className="text-xs text-ifa-neutral">Imersão de áudio 3D (Egun).</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SoundHub;
