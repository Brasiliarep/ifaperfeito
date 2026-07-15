import React from "react";
import { Sparkles, Users, AlertTriangle, Leaf, Hourglass } from "lucide-react";

interface AISuggestionsProps {
  onOpenChat: () => void;
}

export default function AISuggestions({ onOpenChat }: AISuggestionsProps) {
  const suggestions = [
    {
      text: "Realizar ebó de prosperidade e iniciar novos projetos.",
      title: "HOJE É UM BOM DIA PARA...",
      icon: Leaf,
      color: "text-emerald-400 border-[#c19a4d]/20 hover:border-emerald-500/45",
      iconBg: "bg-emerald-950/20 text-emerald-400 border-emerald-500/20"
    },
    {
      text: "está há 30 dias sem retorno. Considere um acompanhamento.",
      title: "CONSULENTE JOÃO",
      icon: Users,
      color: "text-[#f7e2af] border-[#c19a4d]/20 hover:border-[#dca34b]/45",
      iconBg: "bg-[#c19a4d]/10 text-[#dca34b] border-[#c19a4d]/20"
    },
    {
      text: "Você tem 4 clientes aguardando respostas ou agendamentos.",
      title: "CLIENTES AGUARDANDO",
      icon: Hourglass,
      color: "text-amber-400 border-[#c19a4d]/20 hover:border-amber-500/45",
      iconBg: "bg-amber-950/20 text-amber-400 border-amber-500/20"
    },
    {
      text: "Você ainda não registrou os materiais do Ebó de amanhã.",
      title: "ATENÇÃO",
      icon: AlertTriangle,
      color: "text-red-400 border-[#c19a4d]/20 hover:border-red-500/45 animate-pulse-slow",
      iconBg: "bg-red-950/20 text-red-400 border-red-500/20"
    }
  ];

  return (
    <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-5 rounded-2xl shadow-xl space-y-4">
      {/* Ornament Header */}
      <div className="flex items-center justify-center gap-4 py-1 border-b border-[#c19a4d]/15 mb-2">
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#c19a4d]/30 to-transparent flex-1" />
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-[#e2b963] font-cinzel font-bold tracking-[0.2em] text-xs uppercase">
            <span className="opacity-60 text-[#c19a4d]">—— ❧</span>
            <span>Inteligência Artificial</span>
            <span className="opacity-60 text-[#c19a4d]">❧ ——</span>
          </div>
          <span className="text-[8px] text-[#8b754e] font-sans font-bold uppercase tracking-[0.25em] mt-1">
            Sugestões do Assistente
          </span>
        </div>
        <span className="h-[1px] bg-gradient-to-l from-transparent via-[#c19a4d]/30 to-transparent flex-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            onClick={onOpenChat}
            className={`border bg-[#12100e]/70 p-3.5 rounded-xl text-left cursor-pointer transition-all flex items-start gap-3 h-[92px] ${s.color}`}
          >
            <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${s.iconBg}`}>
              <s.icon size={13} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[8.5px] font-bold tracking-[0.1em] uppercase text-[#8b754e]">{s.title}</h4>
              <p className="text-[10px] font-semibold text-[#f7e2af] leading-relaxed mt-1 line-clamp-2">
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
