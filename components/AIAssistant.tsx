import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { askVoiceOfThunder } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Sou seu assistente Ifá. Pergunte sobre rituais, Odùs, Ebós, ou como usar o aplicativo.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const answer = await askVoiceOfThunder(q);
      setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'O Oráculo está em silêncio. Tente novamente em instantes.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-ifa-gold to-yellow-700 text-black shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] hover:scale-110 transition-all duration-300 flex items-center justify-center"
        title="Assistente Ifá"
      >
        <MessageSquare size={24} />
      </button>

      {/* CHAT PANEL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-[#1a1611] border border-ifa-gold/40 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md sm:max-h-[600px] h-[85vh] sm:h-auto flex flex-col overflow-hidden animate-fade-in">
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ifa-border/40 bg-black/30">
              <div className="flex items-center gap-3">
                <div className="bg-ifa-gold/20 p-2 rounded-full">
                  <Sparkles size={18} className="text-ifa-gold" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest">Assistente Ifá</h2>
                  <p className="text-[10px] text-ifa-neutral">Voz do Trovão</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-ifa-neutral hover:text-white p-1">
                <X size={20} />
              </button>
            </div>

            {/* MESSAGES */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-ifa-gold/20 text-ifa-gold border border-ifa-gold/30 rounded-br-md'
                        : 'bg-black/60 text-ifa-text border border-white/10 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-black/60 border border-white/10 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-ifa-neutral flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Consultando o Oráculo...
                  </div>
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="border-t border-ifa-border/40 p-3 bg-black/30">
              <form
                onSubmit={e => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Pergunte ao Oráculo..."
                  disabled={loading}
                  className="flex-1 bg-black/60 border border-ifa-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-ifa-neutral outline-none focus:border-ifa-gold transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-full bg-ifa-gold text-black flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
