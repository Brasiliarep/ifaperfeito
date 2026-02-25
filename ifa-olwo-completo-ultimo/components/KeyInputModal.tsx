
import React, { useState } from 'react';
import { Key, Save, ShieldCheck } from 'lucide-react';

interface Props {
    onSave: (key: string) => void;
}

const KeyInputModal: React.FC<Props> = ({ onSave }) => {
    const [inputKey, setInputKey] = useState("");

    const handleSubmit = () => {
        if (inputKey.length > 10) {
            onSave(inputKey.trim());
        } else {
            alert("Chave inválida. Deve começar com AIza...");
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#1a1510] flex items-center justify-center p-6 text-white font-sans">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <Key size={40} className="text-black" />
                </div>
                
                <h1 className="text-3xl font-serif font-bold text-[#D4AF37] mb-2">Configuração Inicial</h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    O aplicativo não detectou uma chave de API configurada automaticamente. Para ativar a Inteligência Artificial do Ifá (Google Gemini), insira sua chave abaixo.
                </p>

                <div className="bg-white/5 border border-[#5D4037] rounded-xl p-4 mb-6 text-left">
                    <label className="text-xs uppercase font-bold text-[#D4AF37] block mb-2">Sua Chave (Google Gemini Key)</label>
                    <input 
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        placeholder="Cole aqui (Ex: AIzaSy...)"
                        className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-2">
                        * A chave será salva apenas no seu dispositivo (LocalStorage).
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
