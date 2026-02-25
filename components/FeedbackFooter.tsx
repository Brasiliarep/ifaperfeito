import React, { useState } from 'react';
import { MessageSquare, X, Send, Heart, AlertCircle, Lightbulb } from 'lucide-react';

const FeedbackFooter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState<'suggestion' | 'bug' | 'thanks'>('suggestion');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Ifá Guia Feedback: ${type.toUpperCase()}`;
        const body = `Tipo: ${type}\n\nMensagem:\n${message}\n\nEnviado via App.`;
        window.location.href = `mailto:babaifalore@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setIsOpen(false);
        setMessage('');
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-4 left-4 z-40">
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-ifa-wood text-white px-4 py-2 rounded-full shadow-lg hover:bg-ifa-gold transition-colors flex items-center gap-2 text-xs font-bold uppercase"
                >
                    <MessageSquare size={16} /> Contato e Sugestões
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-fade-in w-full max-w-sm">
            <div className="bg-ifa-base border border-ifa-border rounded-xl shadow-2xl p-4 relative">
                <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-ifa-neutral hover:text-white">
                    <X size={20} />
                </button>
                
                <h3 className="text-ifa-gold font-bold uppercase text-sm mb-4">Babalawo Ifálore</h3>
                
                <div className="flex gap-2 mb-4">
                    <button 
                        onClick={() => setType('suggestion')}
                        className={`flex-1 py-2 rounded text-[10px] uppercase font-bold flex flex-col items-center gap-1 ${type === 'suggestion' ? 'bg-blue-900/50 text-blue-200 border border-blue-500' : 'bg-ifa-base-dark border border-ifa-border text-ifa-neutral'}`}
                    >
                        <Lightbulb size={16}/> Sugestão
                    </button>
                    <button 
                        onClick={() => setType('bug')}
                        className={`flex-1 py-2 rounded text-[10px] uppercase font-bold flex flex-col items-center gap-1 ${type === 'bug' ? 'bg-red-900/50 text-red-200 border border-red-500' : 'bg-ifa-base-dark border border-ifa-border text-ifa-neutral'}`}
                    >
                        <AlertCircle size={16}/> Problema
                    </button>
                    <button 
                        onClick={() => setType('thanks')}
                        className={`flex-1 py-2 rounded text-[10px] uppercase font-bold flex flex-col items-center gap-1 ${type === 'thanks' ? 'bg-green-900/50 text-green-200 border border-green-500' : 'bg-ifa-base-dark border border-ifa-border text-ifa-neutral'}`}
                    >
                        <Heart size={16}/> Agradecer
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <textarea 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Deixe sua mensagem para o Babalawo..."
                        className="w-full h-24 bg-ifa-base-dark border border-ifa-border rounded p-3 text-sm text-ifa-text mb-4 focus:border-ifa-gold outline-none resize-none"
                        required
                    />
                    <button type="submit" className="w-full bg-ifa-gold text-ifa-base font-bold py-2 rounded flex items-center justify-center gap-2 hover:opacity-90">
                        <Send size={16} /> Enviar E-mail
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackFooter;