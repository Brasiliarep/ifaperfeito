import React from "react";
import { 
  Sparkles, 
  History, 
  User, 
  FileText, 
  Tv, 
  Printer, 
  Share2, 
  Bell, 
  BookOpen, 
  Flame, 
  Scroll, 
  Book, 
  Activity 
} from "lucide-react";

interface QuickActionsProps {
  onSelectAction: (actionId: string) => void;
}

export default function QuickActions({ onSelectAction }: QuickActionsProps) {
  const atendimentoItems = [
    { id: "opele", title: "Nova Consulta", desc: "Iniciar atendimento", icon: Sparkles },
    { id: "sala-virtual", title: "Sala Virtual", desc: "Consulta online", icon: Tv },
    { id: "imprimir", title: "Imprimir Consulta", desc: "Completa ou resumida", icon: Printer },
    { id: "compartilhar", title: "Compartilhar", desc: "WhatsApp, E-mail", icon: Share2 },
    { id: "historico", title: "Histórico", desc: "Consultas realizadas", icon: History },
    { id: "lembretes", title: "Lembretes", desc: "Acompanhar retornos", icon: Bell }
  ];

  const estudoItems = [
    { id: "biblioteca-odus", title: "Biblioteca de Odus", desc: "Estude os 256 Odus", icon: BookOpen },
    { id: "study", title: "Modo de Estudo", desc: "Jogo educativo", icon: Flame },
    { id: "tratados", title: "Tratados & Textos", desc: "Mais de 50 textos", icon: Scroll },
    { id: "oracoes", title: "Orikis & Orações", desc: "Rezas sagradas", icon: Book },
    { id: "dicionario", title: "Dicionário Yorubá", desc: "Mais de 70 verbetes", icon: FileText },
    { id: "simulados", title: "Simulados", desc: "Teste conhecimentos", icon: Activity }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
      
      {/* Card 1: Atendimento a Consulente */}
      <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-4 rounded-2xl shadow-xl space-y-3 relative overflow-hidden">
        <h4 className="text-[10px] tracking-widest font-bold text-[#dca34b] uppercase px-1 pb-2 border-b border-[#c19a4d]/15 flex items-center justify-center gap-1.5 font-cinzel text-center">
          <span>Atendimento a Consulente</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dca34b]" />
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {atendimentoItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectAction(item.id)}
              className="bg-[#12100e] border border-[#c19a4d]/15 hover:border-[#dca34b]/50 p-2 px-2.5 rounded-xl text-left transition-all hover:bg-[#1a1714] flex items-center gap-2 h-14 group"
            >
              <div className="w-6 h-6 rounded-lg bg-[#1c1611] border border-[#c19a4d]/15 flex items-center justify-center shrink-0 group-hover:border-[#dca34b]/40 group-hover:bg-[#251f16] transition-colors">
                <item.icon size={12} className="text-[#c19a4d] opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <h5 className="text-[10px] font-bold text-[#f7e2af] truncate font-cinzel">{item.title}</h5>
                <p className="text-[8px] text-[#8b754e] truncate mt-0.5 leading-none">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Card 2: Modo de Estudo */}
      <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-4 rounded-2xl shadow-xl space-y-3 relative overflow-hidden">
        <h4 className="text-[10px] tracking-widest font-bold text-[#dca34b] uppercase px-1 pb-2 border-b border-[#c19a4d]/15 flex items-center justify-center gap-1.5 font-cinzel text-center">
          <span>Modo de Estudo</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dca34b]" />
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {estudoItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectAction(item.id)}
              className="bg-[#12100e] border border-[#c19a4d]/15 hover:border-[#dca34b]/50 p-2 px-2.5 rounded-xl text-left transition-all hover:bg-[#1a1714] flex items-center gap-2 h-14 group"
            >
              <div className="w-6 h-6 rounded-lg bg-[#1c1611] border border-[#c19a4d]/15 flex items-center justify-center shrink-0 group-hover:border-[#dca34b]/40 group-hover:bg-[#251f16] transition-colors">
                <item.icon size={12} className="text-[#c19a4d] opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <h5 className="text-[10px] font-bold text-[#f7e2af] truncate font-cinzel">{item.title}</h5>
                <p className="text-[8px] text-[#8b754e] truncate mt-0.5 leading-none">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
