import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader2, Sparkles, MessageSquare } from "lucide-react";
import { Message } from "../types";
// @ts-ignore
import babalawoAvatar from "../assets/images/babalawo_avatar_1782583026238.jpg";

interface AssistantChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssistantChatDrawer({ isOpen, onClose }: AssistantChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Saudações sagradas, meu filho. Eu sou o Babaláwo virtual Ifalorê, seu conselheiro espiritual. Como posso lhe guiar na sabedoria dos Odus e na trilha de Ifá hoje? Pergunte-me sobre rituais, orações, significados de Odus ou conselhos práticos.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      text: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages.map((m) => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Erro de comunicação com o servidor.");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: Math.random().toString(),
        role: "model",
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      // Fallback message
      const errorMessage: Message = {
        id: Math.random().toString(),
        role: "model",
        text: "Desculpe, meu filho. As correntes espirituais sofreram uma breve oscilação na rede. Que tal tentarmos novamente? Àṣẹ.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      {/* Tap to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-md bg-[#0c0a08] border-l border-[#c19a4d]/30 h-full flex flex-col relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="p-4 border-b border-[#c19a4d]/20 bg-[#12100e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-[#c19a4d] p-0.5 overflow-hidden bg-gradient-to-tr from-[#96501a] to-[#f7e2af]">
              <img 
                src={babalawoAvatar} 
                alt="Babaláwo" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-cinzel text-xs font-bold tracking-widest text-[#f7e2af]">
                Babaláwo Ifalorê
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-[#8b754e] font-sans uppercase tracking-wider font-semibold">
                  Assistente de Ifá Ativo
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#a88e5d] hover:text-[#f3eee3] p-1.5 rounded-full hover:bg-[#c19a4d]/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0807]">
          {messages.map((m) => (
            <div 
              key={m.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px] shrink-0 mt-1 ${
                m.role === "user" 
                  ? "bg-[#251f16] border-[#c19a4d]/30 text-[#f7e2af]" 
                  : "bg-[#181512] border-[#c19a4d]/50 text-[#dca34b]"
              }`}>
                {m.role === "user" ? <User size={10} /> : <MessageSquare size={10} />}
              </div>

              <div className={`p-3 rounded-2xl text-xs leading-relaxed space-y-2 ${
                m.role === "user"
                  ? "bg-[#c19a4d]/15 border border-[#c19a4d]/25 text-[#f3eee3] rounded-tr-none"
                  : "bg-[#12100e] border border-[#c19a4d]/15 text-[#b49d79] rounded-tl-none shadow-sm"
              }`}>
                {m.text.split("\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
              <div className="w-6 h-6 rounded-full flex items-center justify-center border bg-[#181512] border-[#c19a4d]/50 text-[#dca34b]">
                <Loader2 size={10} className="animate-spin" />
              </div>
              <div className="p-3 bg-[#12100e] border border-[#c19a4d]/15 rounded-2xl rounded-tl-none text-xs text-[#8b754e] italic flex items-center gap-2">
                <span>Babaláwo está consultando as escrituras sagradas...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input box */}
        <form onSubmit={handleSend} className="p-4 border-t border-[#c19a4d]/20 bg-[#12100e] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte aos Odus sagrados..."
            className="flex-1 bg-[#0a0807] border border-[#c19a4d]/20 rounded-xl px-4 py-2.5 text-xs text-[#f3eee3] placeholder-[#8b754e]/60 focus:outline-none focus:border-[#dca34b] transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#dca34b] hover:bg-[#ecc67d] disabled:opacity-40 text-black p-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center shrink-0"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
