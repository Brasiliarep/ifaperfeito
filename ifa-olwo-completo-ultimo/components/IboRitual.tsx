import React, { useState } from 'react';
import { Loader2, Check, X } from 'lucide-react';
import { IreOsogboType } from '../types';

interface Props {
    onComplete: (result: IreOsogboType) => void;
    onCancel: () => void;
}

const IboRitual: React.FC<Props> = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleChoice = (choice: 'PEDRA' | 'OSSO') => {
        setLoading(true);
        setTimeout(() => {
            let result: IreOsogboType;
            if (choice === 'PEDRA') {
                const ireSubTypes: IreOsogboType[] = [
                    { type: 'IRE', subType: 'Ire Aiku', description: 'Longevidade e saúde plena.' },
                    { type: 'IRE', subType: 'Ire Aje', description: 'Prosperidade e riqueza material.' },
                    { type: 'IRE', subType: 'Ire Iya', description: 'Amor, união e maternidade.' },
                    { type: 'IRE', subType: 'Ire Ogbo', description: 'Velhice com sabedoria e dignidade.' },
                    { type: 'IRE', subType: 'Ire Omo', description: 'Bênçãos de filhos e descendência.' },
                    { type: 'IRE', subType: 'Ire Gbogbo', description: 'Bênçãos e sorte em todos os aspectos da vida.' },
                ];
                result = ireSubTypes[Math.floor(Math.random() * ireSubTypes.length)];
            } else {
                const osogboSubTypes: IreOsogboType[] = [
                    { type: 'OSOGBO', subType: 'Osogbo Iku', description: 'Advertência sobre perdas e finalizações.' },
                    { type: 'OSOGBO', subType: 'Osogbo Arun', description: 'Aviso sobre doenças e enfermidades.' },
                    { type: 'OSOGBO', subType: 'Osogbo Eyo', description: 'Alerta para tragédias e luto.' },
                    { type: 'OSOGBO', subType: 'Osogbo Ofo', description: 'Perdas materiais e financeiras.' },
                    { type: 'OSOGBO', subType: 'Osogbo Oran', description: 'Conflitos, disputas e processos.' },
                    { type: 'OSOGBO', subType: 'Osogbo Gbogbo', description: 'Adversidades e desafios gerais.' },
                ];
                result = osogboSubTypes[Math.floor(Math.random() * osogboSubTypes.length)];
            }
            setLoading(false);
            onComplete(result);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm pt-safe">
            <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto mt-8 text-center">
                <button onClick={onCancel} className="absolute top-4 right-4 text-ifa-neutral hover:text-ifa-text p-2 bg-black/20 rounded-full">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-serif text-ifa-gold mb-4 mt-2">Jogo de Ibó</h2>
                <p className="text-ifa-text mb-6">Antes de revelarmos o que Ifá vê, é preciso abrir o caminho com o Ibó.</p>
                <p className="text-ifa-neutral italic mb-8">Visualize em sua mente dois objetos sagrados diante de você:</p>

                <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                    <button 
                        onClick={() => handleChoice('PEDRA')}
                        disabled={loading}
                        className="flex-1 p-6 bg-ifa-wood border border-ifa-border rounded-lg flex flex-col items-center justify-center text-white hover:bg-ifa-gold hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="text-4xl mb-2">🪨</span>
                        <span className="font-bold text-lg uppercase">PEDRA (Ire)</span>
                        <span className="text-xs text-ifa-neutral mt-1">Bênção e prosperidade</span>
                    </button>
                    <button 
                        onClick={() => handleChoice('OSSO')}
                        disabled={loading}
                        className="flex-1 p-6 bg-ifa-wood border border-ifa-border rounded-lg flex flex-col items-center justify-center text-white hover:bg-ifa-gold hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="text-4xl mb-2">🦴</span>
                        <span className="font-bold text-lg uppercase">OSSO (Osogbo)</span>
                        <span className="text-xs text-ifa-neutral mt-1">Desafio e advertência</span>
                    </button>
                </div>

                {loading && (
                    <div className="flex items-center justify-center gap-2 text-ifa-gold">
                        <Loader2 className="animate-spin" size={20} />
                        <span>Ifá está consultando...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IboRitual;
