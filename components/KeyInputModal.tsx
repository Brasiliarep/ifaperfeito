
import React, { useState } from 'react';
import { Key, Save, ShieldCheck, ExternalLink } from 'lucide-react';

interface Props {
    onSave: (key: string) => void;
}

const KeyInputModal: React.FC<Props> = ({ onSave }) => {
    const [inputKey, setInputKey] = useState("");

    const handleSubmit = () => {
        const trimmed = inputKey.trim();
        if (trimmed.length > 10) {
            onSave(trimmed);
        } else {
            alert("Chave inválida. A chave Groq começa com 'gsk_...'");
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#1a1510] flex flex-col items-center justify-start md:justify-center p-6 text-white font-sans overflow-y-auto pt-10 md:pt-0">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <Key size={40} className="text-black" />
                </div>

                <h1 className="text-3xl font-serif font-bold text-[#D4AF37] mb-2">Configuração Inicial</h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Para ativar a Inteligência Oracular (Groq — gratuito), insira sua chave abaixo.
                    Obtenha gratuitamente em{' '}
                    <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
                        className="text-[#D4AF37] underline inline-flex items-center gap-1">
                        console.groq.com <ExternalLink size={12} />
                    </a>
                </p>

                <div className="bg-white/5 border border-[#5D4037] rounded-xl p-4 mb-6 text-left">
                    <label className="text-xs uppercase font-bold text-[#D4AF37] block mb-2">Sua Chave Groq (Gratuita)</label>
                    <input
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        placeholder="Cole aqui (Ex: gsk_XXXXXX...)"
                        className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-2">
                        * A chave será salva apenas no seu dispositivo (LocalStorage). Nunca é enviada para nossos servidores.
                    </p>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-[#D4AF37] text-black font-bold uppercase py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                    <Save size={20} /> Salvar e Iniciar
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-600">
                    <ShieldCheck size={14} /> Ambiente Seguro
                </div>
            </div>
        </div>
    );
};

export default KeyInputModal;
