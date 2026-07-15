import React, { useState } from "react";
import { 
   Compass, 
   Calendar, 
   Sparkles, 
   Award, 
   Smartphone, 
   ExternalLink, 
   ArrowRight, 
   Clock, 
   CalendarDays 
} from "lucide-react";
// @ts-ignore
import bussulaImg from "../assets/images/bussula_ifa_compass_1782583136146.jpg";
// @ts-ignore
import coroaImg from "../assets/images/yoruba_crown_bronze_1782583151521.jpg";
// @ts-ignore
import babalawoAvatar from "../assets/images/babalawo_avatar_1782583026238.jpg";
// @ts-ignore
import ritualOfferingImg from "../assets/images/ifa_ritual_offering_1782576830972.jpg";
// @ts-ignore
import crownPlanoImg from "../assets/images/crown_plano_gold_1782583648783.jpg";

interface DashboardWidgetsProps {
  onSelectDivination: (method: string) => void;
  onOpenChat: () => void;
}

export default function DashboardWidgets({ onSelectDivination, onOpenChat }: DashboardWidgetsProps) {
  // Compass state to make it interactive on hover/mouse move!
  const [rotation, setRotation] = useState(123);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Calculate angle in degrees
    const angle = Math.round((Math.atan2(y, x) * 180) / Math.PI) + 90;
    setRotation(angle);
  };

  const handleMouseLeave = () => {
    setRotation(123); // reset to original 123 deg
  };

  const recentActivities = [
    { text: "Consulta realizada: Ògún Yono", time: "Há 2h", dot: "bg-green-500" },
    { text: "Estudo concluído: Odu Òsá Méjì", time: "Há 5h", dot: "bg-[#dca34b]" },
    { text: "Ebó simulado: Ebó de Proteção", time: "Há 1d", dot: "bg-blue-500" },
    { text: "Sonho registrado: Sonho 12.47", time: "Há 1d", dot: "bg-purple-500" },
    { text: "Estudo iniciado: Tratado dos Odus", time: "Há 2d", dot: "bg-amber-700" }
  ];

  const futureActivities = [
    { text: "Ebó de Oxóssi", date: "Amanhã", time: "16:00", dot: "bg-red-500" },
    { text: "Assentamento: Ifá", date: "29 Jun", time: "09:00", dot: "bg-blue-500" },
    { text: "Bori para cliente", date: "30 Jun", time: "14:00", dot: "bg-yellow-500" },
    { text: "Entrega de Ebó", date: "01 Jul", time: "10:30", dot: "bg-green-500" },
    { text: "Consulta agendada", date: "02 Jul", time: "15:00", dot: "bg-purple-500" }
  ];

  return (
    <div className="space-y-4">
      {/* 1. Bússola de Ilé-Ifá */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-[#12100e] border border-[#c19a4d]/20 p-3.5 rounded-2xl transition-all hover:border-[#dca34b]/40 shadow-sm relative group cursor-crosshair"
      >
        <span className="text-[9px] font-bold text-[#dca34b] uppercase tracking-widest block mb-2 font-cinzel">
          Bússola de Ilé-Ifé
        </span>

        <div className="flex items-center gap-4">
          {/* Compass Circle Left */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center rounded-full border-2 border-[#c19a4d]/40 overflow-hidden bg-black shadow-[0_0_15px_rgba(193,154,77,0.15)]">
            <img 
              src={bussulaImg} 
              alt="Bússola Sagrada" 
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: `rotate(${rotation}deg)` }}
              referrerPolicy="no-referrer"
            />
            {/* Minimal pointer overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f7e2af] shadow-md border border-[#96501a]" />
            </div>
          </div>

          {/* Details Right */}
          <div className="flex-1 min-w-0 space-y-1">
            <span className="text-[9px] text-[#8b754e] uppercase font-bold tracking-wider block">
              Direção atual
            </span>
            <span className="text-base font-bold font-cinzel text-[#f7e2af] block leading-none">
              {rotation}° SE
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[9px] text-[#b49d79] font-medium truncate">
                Seu caminho para Ilé-Ifé
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
            </div>
          </div>
        </div>

        {/* Action Link Bottom Right */}
        <div className="flex justify-end mt-1">
          <button 
            onClick={() => onSelectDivination("opele")}
            className="text-[9px] font-bold text-[#dca34b] hover:text-[#f7e2af] flex items-center gap-1 uppercase tracking-widest transition-colors font-cinzel"
          >
            <span>Ver direção</span>
            <ArrowRight size={10} />
          </button>
        </div>
      </div>



      {/* 2. Calendário Litúrgico */}
      <div className="bg-[#12100e] border border-[#c19a4d]/20 p-4 rounded-2xl relative overflow-hidden group flex flex-col justify-between hover:border-[#dca34b]/40 transition-colors">
        <div className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase text-center flex items-center justify-center gap-2 mb-3">
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
          <span>Calendário Litúrgico</span>
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
        </div>
        <div className="flex gap-3 items-center justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#f7e2af] font-sans">26 de Junho de 2025</h4>
            <p className="text-[11px] text-[#b49d79] mt-1 leading-relaxed truncate">
              Ègwè - ọdún Ifá (Aberto)
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl border border-[#c19a4d]/30 flex items-center justify-center shrink-0 bg-[#251f16] shadow-md text-[#dca34b] group-hover:text-[#f7e2af] transition-all duration-300">
            <CalendarDays size={20} strokeWidth={1.5} />
          </div>
        </div>
        <button className="w-full mt-4 bg-[#1c140d] border border-[#c19a4d]/20 text-[#dca34b] hover:text-[#f7e2af] hover:border-[#dca34b]/50 hover:bg-[#dca34b]/10 transition-colors py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase font-cinzel flex items-center justify-between px-3">
          <span>Ver calendário completo</span>
          <Calendar size={12} />
        </button>
      </div>

      {/* 3. Próximo Evento */}
      <div className="bg-[#12100e] border border-[#c19a4d]/20 p-4 rounded-2xl relative overflow-hidden group flex flex-col justify-between hover:border-[#dca34b]/40 transition-colors">
        <div className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase text-center flex items-center justify-center gap-2 mb-3">
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
          <span>Próximo Evento</span>
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
        </div>
        <div className="flex gap-3 items-center justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#f7e2af] font-cinzel">Ebó de Oxóssi</h4>
            <p className="text-[10px] text-[#b49d79] mt-0.5 leading-relaxed">
              28 de Junho de 2025 - 16:00
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[8.5px] text-[#8b754e] font-semibold uppercase">
              <Clock size={10} className="text-[#dca34b]" />
              <span>Preparação: 2 dias restantes</span>
            </div>
          </div>
          <div className="w-14 h-12 rounded-xl border border-[#c19a4d]/30 overflow-hidden shrink-0 bg-[#251f16] shadow-md">
            <img 
              src={ritualOfferingImg} 
              alt="Ebó de Oxóssi" 
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* 4. Provérbio Yorùbá */}
      <div className="bg-[#12100e] border border-[#c19a4d]/20 p-4 rounded-2xl flex flex-col gap-3 justify-between hover:border-[#dca34b]/55 transition-colors">
        <div className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase text-center flex items-center justify-center gap-2 mb-1">
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
          <span>Provérbio Yorùbá</span>
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-11 h-11 rounded-xl border border-[#c19a4d]/30 overflow-hidden shrink-0 bg-[#251f16] shadow-inner">
            <img 
              src={coroaImg} 
              alt="Yoruba Crown Bronze" 
              className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10.5px] italic text-[#f7e2af] font-serif leading-snug">
              &ldquo;Ifá não é apenas o que vemos, mas o que compreendemos.&rdquo;
            </p>
            <span className="text-[8.5px] font-bold text-[#8b754e] uppercase block text-right mt-1 font-cinzel tracking-wider">
              — Sabedoria Yorùbá
            </span>
          </div>
        </div>
      </div>

      {/* 5. Seu Plano */}
      <div className="bg-[#12100e] border border-[#c19a4d]/20 p-4 rounded-2xl flex flex-col justify-between hover:border-[#dca34b]/40 transition-colors">
        <div>
          <div className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase text-center flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
            <span>Seu Plano</span>
            <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 flex flex-col justify-between h-14">
              <p className="text-[10px] text-[#b49d79] leading-snug">
                Acesso completo a todos os recursos.
              </p>
              <button className="self-start bg-[#1c140d] border border-[#c19a4d]/35 text-[#f7e2af] hover:bg-[#dca34b]/15 hover:border-[#dca34b]/50 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest font-cinzel transition-all leading-none">
                Gerenciar Assinatura
              </button>
            </div>
            
            <div className="w-14 h-14 rounded-xl border border-[#c19a4d]/35 overflow-hidden shrink-0 bg-black shadow-md">
              <img 
                src={crownPlanoImg} 
                alt="Coroa de Assinatura" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Baixar App (Janela Separada) */}
      <div className="bg-[#12100e] border border-[#c19a4d]/20 p-4 rounded-2xl space-y-3 relative overflow-hidden group hover:border-[#dca34b]/40 transition-colors flex flex-col justify-between">
        <div className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase text-center flex items-center justify-center gap-2 mb-1">
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
          <span>Baixar App</span>
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone size={14} className="text-[#dca34b]" />
            <h4 className="text-xs font-bold text-[#f7e2af] font-cinzel tracking-wider">Móvel Ifá</h4>
          </div>
          <span className="text-[8px] px-1.5 py-0.5 bg-[#dca34b]/10 text-[#dca34b] rounded-full font-bold uppercase tracking-wider">Disponível</span>
        </div>
        <p className="text-[10px] text-[#b49d79] leading-relaxed">
          Acesse o Ifá Oluwo no seu celular com notificações em tempo real.
        </p>
        <button className="w-full bg-[#1c140d] border border-[#c19a4d]/30 text-[#f7e2af] hover:bg-[#dca34b]/10 transition-colors py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase font-cinzel flex items-center justify-center gap-1.5">
          <span>Instalar Agora</span>
          <ArrowRight size={10} />
        </button>
      </div>

      {/* 7. Atendimento Virtual (Janela Separada) */}
      <div className="bg-[#12100e] border border-[#c19a4d]/20 p-4 rounded-2xl space-y-3 hover:border-[#dca34b]/40 transition-colors">
        <div className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase text-center flex items-center justify-center gap-2 mb-1">
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
          <span>Atendimento Virtual</span>
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h4 className="text-xs font-bold text-[#f7e2af] font-cinzel tracking-wider">Sala de Consulta</h4>
          </div>
          <span className="text-[8px] text-green-400 font-bold uppercase tracking-wider">Online</span>
        </div>
        
        <div 
          onClick={onOpenChat}
          className="bg-gradient-to-r from-[#1c140d] to-[#0e0d0b] border border-[#c19a4d]/20 p-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer hover:border-[#dca34b]/60 transition-all group"
        >
          <div className="w-8.5 h-8.5 rounded-full border border-[#dca34b]/40 p-0.5 overflow-hidden shrink-0 bg-[#1c1611]">
            <img 
              src={babalawoAvatar} 
              alt="Babaláwo" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-[10px] font-bold text-[#f7e2af] truncate">Consultar Sacerdote</h5>
            <p className="text-[8.5px] text-[#8b754e] truncate mt-0.5">Iniciar chat online</p>
          </div>
          <ExternalLink size={11} className="text-[#dca34b] shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

    </div>
  );
}

export function RecentActivities() {
  const recentActivities = [
    { text: "Consulta realizada: Ògún Yono", time: "Há 2h" },
    { text: "Estudo concluído: Odu Òsá Méjì", time: "Há 5h" },
    { text: "Ebó simulado: Ebó de Proteção", time: "Há 1d" },
    { text: "Sonho registrado: Sonho 12.47", time: "Há 1d" },
    { text: "Estudo iniciado: Tratado dos Odus", time: "Há 2d" }
  ];

  return (
    <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full min-h-[220px]">
      <div className="space-y-4">
        <div className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase text-center flex items-center justify-center gap-2 border-b border-[#c19a4d]/15 pb-2">
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
          <span>Atividades Recentes</span>
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
        </div>
        <div className="space-y-3.5 mt-2">
          {recentActivities.map((act, idx) => (
            <div key={idx} className="flex items-start justify-between gap-3 text-xs border-b border-[#c19a4d]/5 pb-2 last:border-0 last:pb-0">
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="w-3.5 h-3.5 rounded-full border border-[#dca34b]/40 flex items-center justify-center shrink-0 mt-0.5 bg-[#12100e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dca34b]" />
                </span>
                <span className="text-[11px] text-[#b49d79] font-medium leading-relaxed truncate">{act.text}</span>
              </div>
              <span className="text-[9px] text-[#8b754e] shrink-0 font-mono font-bold mt-0.5">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="text-[9px] font-bold text-[#8b754e] hover:text-[#dca34b] uppercase tracking-widest w-full text-center border-t border-[#c19a4d]/10 mt-4 pt-3.5 shrink-0">
        Ver todas as atividades
      </button>
    </div>
  );
}

export function FutureActivities() {
  const futureActivities = [
    { text: "Ebó de Oxóssi", date: "Amanhã", time: "16:00" },
    { text: "Assentamento: Ifá", date: "29 Jun", time: "09:00" },
    { text: "Bori para cliente", date: "30 Jun", time: "14:00" },
    { text: "Entrega de Ebó", date: "01 Jul", time: "10:30" },
    { text: "Consulta agendada", date: "02 Jul", time: "15:00" }
  ];

  return (
    <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full min-h-[220px]">
      <div className="space-y-4">
        <div className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase text-center flex items-center justify-center gap-2 border-b border-[#c19a4d]/15 pb-2">
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
          <span>Atividades Futuras</span>
          <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
        </div>
        <div className="space-y-3 mt-2 pr-1 custom-scrollbar overflow-y-auto max-h-[175px]">
          {futureActivities.map((act, idx) => (
            <div key={idx} className="flex items-start justify-between gap-3 text-xs border-b border-[#c19a4d]/5 pb-2.5 last:border-0 last:pb-0">
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="w-3.5 h-3.5 rounded-full border border-[#dca34b]/40 flex items-center justify-center shrink-0 mt-0.5 bg-[#12100e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dca34b]" />
                </span>
                <span className="text-[11px] text-[#b49d79] font-medium leading-relaxed truncate">{act.text}</span>
              </div>
              <div className="text-[8.5px] text-[#8b754e] font-mono font-bold text-right shrink-0">
                <div className="leading-none">{act.date}</div>
                <div className="text-[#a88e5d] mt-0.5 leading-none">{act.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="text-[9px] font-bold text-[#8b754e] hover:text-[#dca34b] uppercase tracking-widest w-full text-center border-t border-[#c19a4d]/10 mt-4 pt-3.5 shrink-0">
        Ver agenda completa
      </button>
    </div>
  );
}
