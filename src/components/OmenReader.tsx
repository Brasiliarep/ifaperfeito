
import React, { useState } from 'react';
import { ArrowLeft, Bird, Search } from 'lucide-react';

const OMENS = [
    { key: 'bird_left', text: 'Pássaro cantou à esquerda', meaning: 'Iyami (Mães Ancestrais) estão presentes. Sinal de alerta. Ofereça algo à terra.' },
    { key: 'bird_right', text: 'Pássaro cantou à direita', meaning: 'Sinal de aceitação e boa sorte.' },
    { key: 'dog_bark', text: 'Cachorro latindo sem parar', meaning: 'Presença de Esu ou Eguns perturbados. Jogar água na porta.' },
    { key: 'lizard', text: 'Lagartixa caiu no meio da sala', meaning: 'Visita inesperada ou notícia chegando.' },
    { key: 'glass_break', text: 'Copo quebrou sozinho', meaning: 'Absorção de carga negativa. O objeto se sacrificou por você.' },
    { key: 'wind', text: 'Vento forte repentino', meaning: 'Oya está passando. Mudança de direção no assunto.' },
];

const OmenReader = ({ onBack }: { onBack: () => void }) => {
    const [filter, setFilter] = useState('');

    const filtered = OMENS.filter(o => o.text.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Bird size={20}/> Mensageiro (Agouros)</h1>
                <div className="w-6"></div>
            </div>

            <div className="w-full max-w-md">
                <div className="relative mb-6">
                    <input 
                        placeholder="O que aconteceu? (Ex: Pássaro, Vento)" 
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full bg-ifa-base border border-ifa-border p-3 pl-10 rounded-xl text-ifa-text focus:border-ifa-gold outline-none"
                    />
                    <Search className="absolute left-3 top-3.5 text-ifa-neutral" size={18} />
                </div>

                <div className="space-y-4">
                    {filtered.map(omen => (
                        <div key={omen.key} className="bg-ifa-base border-l-4 border-ifa-gold p-4 rounded shadow-lg">
                            <h3 className="font-bold text-ifa-text mb-1">{omen.text}</h3>
                            <p className="text-sm text-ifa-neutral">{omen.meaning}</p>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <p className="text-center text-ifa-neutral">Nenhum sinal encontrado na base de dados.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OmenReader;
