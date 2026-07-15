import React, { useState } from 'react';
import { ArrowLeft, Database, FlaskConical } from 'lucide-react';
import EboSelector from './EboSelector';
import { EboSelectionType } from '../types';

const REVERSE_DB = [
    {
        odu: "Okanran Meji",
        keywords: ["carvão", "pimenta", "oleo", "polvora", "fogo", "vermelho", "preto"],
        meaning: "Problemas, brigas, necessidade de afastar o mal."
    },
    {
        odu: "Ejiogbe",
        keywords: ["agua", "pombo", "coco", "efun", "algodao", "branco", "prata"],
        meaning: "Paz, caminhos abertos, clareza mental."
    },
    {
        odu: "Osun Meji",
        keywords: ["mel", "ovos", "perfume", "ouro", "macaça", "amarelo", "rio"],
        meaning: "Amor, fertilidade, riqueza doce."
    },
    {
        odu: "Ogunda Meji",
        keywords: ["ferro", "aco", "faca", "inhame", "gim", "cachorro", "estrada"],
        meaning: "Guerra, trabalho, justiça, tecnologia."
    }
];

const ReverseOdu = ({ onBack }: { onBack: () => void }) => {
    const [input, setInput] = useState<string>("");
    // USO DE 'any' PARA GARANTIR O BUILD
    const [result, setResult] = useState<any>(null);
    const [selection, setSelection] = useState<EboSelectionType>('none');

    const handleAnalyze = () => {
        if (!input) return;
        const terms = input.toLowerCase().split(',').map(t => t.trim());
        
        // USO DE 'any' PARA EVITAR INFERÊNCIA 'never' PELO COMPILADOR
        let bestMatch: any = null;
        let maxScore = 0;

        REVERSE_DB.forEach(entry => {
            let score = 0;
            terms.forEach(term => {
                if (entry.keywords.some(k => k.includes(term) || term.includes(k))) score++;
            });
            if (score > maxScore) {
                maxScore = score;
                bestMatch = entry;
            }
        });

        if (maxScore > 0 && bestMatch) {
            const ingredientsList = terms.filter(t => t.length > 2);
            
            const generatedResult = {
                odu: bestMatch.odu,
                meaning: bestMatch.meaning,
                ebos: {
                    basic: { 
                        description: `Ritual Básico de ${bestMatch.odu}`,
                        instructions: `1. Prepare um local limpo. \n2. Pegue os materiais identificados (${ingredientsList.join(', ')}). \n3. Organize-os em um alguidar ou prato. \n4. Reze o Odu ${bestMatch.odu} sobre eles. \n5. Leve a uma encruzilhada ou local aberto e peça a liberação dos caminhos.`,
                        ingredients: ingredientsList 
                    },
                    medium: {
                        description: `Ritual Intermediário de ${bestMatch.odu}`,
                        instructions: `1. Além dos materiais básicos, adicione Oti e Epo. \n2. Faça uma defumação no ambiente. \n3. Ofereça os ingredientes pedindo clareza e força.`,
                        ingredients: [...ingredientsList, "Oti", "Epo"]
                    },
                    complete: { 
                        description: `Ebó Completo de ${bestMatch.odu}`,
                        instructions: `Para este trabalho sacerdotal:\n\n1. Risque o Odu ${bestMatch.odu} no Opon Ifá com Iyerosun.\n2. Sacrifique o animal de 4 pés (se houver) sobre o assentamento.\n3. Misture os ingredientes (${ingredientsList.join(', ')}) com o Axé do animal.\n4. Passe no corpo do consulente.\n5. Entregue no local sagrado correspondente (Mato/Rio/Estrada).`,
                        ingredients: [...ingredientsList, "Animal de 4 pés", "Otí", "Epô", "Iyerosun"]
                    }
                }
            };
            setResult(generatedResult);
            setSelection('none');
        } else {
            alert("Nenhuma combinação óbvia encontrada na base de dados para estes ingredientes. Tente termos mais específicos (ex: mel, carvão).");
        }
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-lg flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Database size={20}/> Matemática Reversa</h1>
                <div className="w-6"></div>
            </div>

            <div className="w-full max-w-lg">
                <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 mb-8">
                    <p className="text-sm text-ifa-neutral mb-4">Insira os ingredientes que você tem ou viu no jogo (separados por vírgula) para descobrir o Odu regente.</p>
                    <textarea 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ex: carvão, pimenta, azeite..."
                        className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text mb-4 h-24 focus:border-ifa-gold outline-none"
                    />
                    <button 
                        onClick={handleAnalyze}
                        className="w-full py-3 bg-ifa-wood text-white font-bold rounded hover:opacity-90 flex items-center justify-center gap-2"
                    >
                        <FlaskConical size={18} /> Analisar Fundamentos
                    </button>
                </div>

                {result && (
                    <div className="animate-fade-in pb-20">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-serif text-ifa-gold font-bold mb-2">{result.odu}</h2>
                            <p className="text-ifa-text-light">{result.meaning}</p>
                        </div>

                        <EboSelector 
                            category="Ebó Identificado"
                            basic={result.ebos.basic}
                            medium={result.ebos.medium}
                            complete={result.ebos.complete}
                            currentSelection={selection}
                            onSelect={setSelection}
                            oduName={result.odu}
                            context="Engenharia Reversa"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReverseOdu;