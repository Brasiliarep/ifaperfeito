import React, { useState } from "react";
import { 
  Calendar, 
  CheckSquare, 
  Play, 
  Clock, 
  Layers, 
  Heart, 
  Boxes, 
  Users, 
  AlertTriangle,
  Flame,
  CheckCircle2,
  ListTodo
} from "lucide-react";
// @ts-ignore
import ritualOfferingImage from "../assets/images/ifa_ritual_offering_1782576830972.jpg";

export default function CentroOperacional() {
  // Checklist state to allow the Babaláwo to toggle completed items!
  const [checklist, setChecklist] = useState([
    { id: "obi", text: "Obi", checked: true },
    { id: "atare", text: "Ataré", checked: true },
    { id: "orogbo", text: "Orogbo", checked: true },
    { id: "velas", text: "Velas", checked: true },
    { id: "mel", text: "Mel", checked: false },
    { id: "agua", text: "Água", checked: false },
    { id: "ervas", text: "Ervas", checked: false }
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const stats = [
    { value: "06", label: "Consultas", icon: Users, color: "text-amber-500" },
    { value: "02", label: "Ebós", icon: Flame, color: "text-red-500" },
    { value: "01", label: "Bori", icon: Heart, color: "text-pink-500" },
    { value: "01", label: "Assentamentos", icon: Boxes, color: "text-blue-500" },
    { value: "03", label: "Clientes aguardando", icon: Users, color: "text-[#dca34b]" },
    { value: "02", label: "Materiais pendentes", icon: AlertTriangle, color: "text-orange-500" }
  ];

  const timelineItems = [
    { time: "08:00", title: "Consulta João", status: "Realizada", color: "bg-green-500 text-green-400" },
    { time: "09:30", title: "Consulta Carlos", status: "Confirmado", color: "bg-blue-500 text-blue-400" },
    { time: "11:00", title: "Bori", status: "Em preparação", color: "bg-yellow-500 text-yellow-400" },
    { time: "14:00", title: "Ebó Prosperidade", status: "Agendado", color: "bg-orange-500 text-orange-400" },
    { time: "17:00", title: "Entrega", status: "Pendente", color: "bg-red-500 text-red-400" }
  ];

  const workflowSteps = [
    { name: "Consulta", completed: true },
    { name: "Odu", completed: true },
    { name: "Interpretação", completed: true },
    { name: "Recomendação", completed: true },
    { name: "Agendamento", completed: false },
    { name: "Preparação", completed: false },
    { name: "Execução", completed: false },
    { name: "Entrega", completed: false }
  ];

  // Visual Agenda of Next 7 Days (mock data for illustration)
  const agendaDays = [
    { date: "HOJE", num: "26", month: "Jun", status: "Bori", details: "Assentamento Ifá" },
    { date: "AMANHÃ", num: "27", month: "Jun", status: "Bori", details: "Assentamento" },
    { date: "SEXTA", num: "29", month: "Jun", status: "Livre", details: "Ebó de Oxóssi" },
    { date: "SÁBADO", num: "29", month: "Jun", status: "Plano", details: "Entrega de Ebó" },
    { date: "DOMINGO", num: "01", month: "Jul", status: "Ofício", details: "Bori Coletivo" },
    { date: "TERÇA", num: "02", month: "Jul", status: "Livre", details: "" }
  ];

  return (
    <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-5 rounded-2xl shadow-xl space-y-4">
      {/* Golden Banner Header */}
      <div className="flex items-center justify-center gap-4 py-1.5 border-b border-[#c19a4d]/20 mb-3">
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#c19a4d]/40 to-transparent flex-1 hidden md:block" />
        <h2 className="font-cinzel text-xs md:text-sm font-bold tracking-[0.25em] text-[#e2b963] text-center uppercase flex items-center gap-2">
          <span>✦</span>
          <span>Centro Operacional do Sacerdote</span>
          <span>✦</span>
        </h2>
        <span className="h-[1px] bg-gradient-to-l from-transparent via-[#c19a4d]/40 to-transparent flex-1 hidden md:block" />
      </div>

      <p className="text-[9px] text-[#8b754e] font-cinzel tracking-[0.2em] text-center uppercase -mt-1.5 mb-2 font-bold">
        Hoje você possui:
      </p>

      {/* Stats Counter Row - Unified horizontal bar with gold border & divide-x */}
      <div className="border border-[#c19a4d]/20 bg-black/45 rounded-xl grid grid-cols-2 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-[#c19a4d]/15 overflow-hidden">
        {stats.map((st, idx) => (
          <div 
            key={idx}
            className="p-3.5 flex items-center gap-3 hover:bg-[#c19a4d]/5 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-[#c19a4d]/25 flex items-center justify-center bg-[#12100e]/90 text-[#dca34b] group-hover:border-[#dca34b]/50 transition-all shrink-0">
              <st.icon size={13} className={st.color} />
            </div>
            <div className="leading-none min-w-0">
              <span className="text-sm font-cinzel font-extrabold text-[#f7e2af] block">{st.value}</span>
              <span className="text-[7.5px] text-[#8b754e] font-bold uppercase tracking-wider block mt-0.5 truncate">{st.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Split Section in 4 Columns - Aligned to exactly h-[230px] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Col 1: Linha do Tempo do Dia */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col h-[230px] overflow-hidden">
          <h4 className="font-cinzel text-[9px] tracking-wider font-bold text-[#dca34b] uppercase pb-2 mb-3 text-center flex items-center justify-center gap-1.5 border-b border-[#c19a4d]/15">
            <span>Linha do Tempo</span>
          </h4>
          <div className="space-y-3 relative pl-3 border-l border-[#c19a4d]/15 ml-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            {timelineItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Outer circle status pointer */}
                <span className={`w-2 h-2 rounded-full absolute -left-[16.5px] top-1 border border-black bg-current ${item.color.split(" ")[0]}`} />
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="min-w-0">
                    <h5 className="text-[10px] font-bold text-[#f7e2af] truncate leading-tight">{item.title}</h5>
                    <span className={`text-[8px] font-bold uppercase tracking-wider block mt-0.5 leading-none ${item.color.split(" ")[1]}`}>
                      {item.status}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#8b754e] font-mono shrink-0 font-semibold">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Preparação Ritual */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col h-[230px] overflow-hidden">
          <h4 className="font-cinzel text-[9px] tracking-wider font-bold text-[#dca34b] uppercase pb-2 mb-3 text-center flex items-center justify-between border-b border-[#c19a4d]/15">
            <span>Preparação Ritual</span>
            <span className="text-[8px] text-[#8b754e] font-sans font-bold">Próximo Ebó</span>
          </h4>
          
          <div className="grid grid-cols-12 gap-2 items-start flex-1 overflow-hidden">
            {/* Checklist left */}
            <div className="col-span-6 space-y-1.5 overflow-y-auto max-h-[170px] pr-1 custom-scrollbar">
              {checklist.map((item) => (
                <label 
                  key={item.id} 
                  className="flex items-center gap-1.5 cursor-pointer select-none group text-left"
                >
                  <input 
                    type="checkbox" 
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                    className="sr-only"
                  />
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all shrink-0 ${
                    item.checked 
                      ? "bg-[#dca34b] border-[#dca34b] text-black" 
                      : "border-[#c19a4d]/30 group-hover:border-[#dca34b]/50 bg-black/40"
                  }`}>
                    {item.checked && <CheckCircle2 size={10} strokeWidth={3} />}
                  </div>
                  <span className={`text-[9.5px] font-semibold leading-none truncate ${
                    item.checked ? "text-[#a88e5d] line-through" : "text-[#f3eee3] group-hover:text-[#f7e2af]"
                  }`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>

            {/* Ritual generated image right */}
            <div className="col-span-6 self-center">
              <div className="rounded-xl overflow-hidden border border-[#c19a4d]/35 shadow-md aspect-square bg-[#1c1611] relative">
                <img 
                  src={ritualOfferingImage} 
                  alt="Ritual preparations" 
                  className="w-full h-full object-cover grayscale-[20%] brightness-95 hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-1.5 pointer-events-none">
                  <span className="text-[7.5px] font-bold text-[#f7e2af] font-cinzel leading-none truncate uppercase tracking-widest">
                    Ebó Sagrado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Fluxo Ritual */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col h-[230px] overflow-hidden">
          <h4 className="font-cinzel text-[9px] tracking-wider font-bold text-[#dca34b] uppercase pb-2 mb-3 text-center flex items-center justify-center gap-1.5 border-b border-[#c19a4d]/15">
            <span>Fluxo Ritual</span>
          </h4>
          <div className="space-y-2 relative pl-3 border-l border-[#c19a4d]/15 ml-1.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="relative group flex items-center justify-between">
                {/* Timeline bullet */}
                <span className={`w-1.5 h-1.5 rounded-full absolute -left-[15.5px] border border-black ${
                  step.completed ? "bg-[#dca34b]" : "bg-zinc-800"
                }`} />
                <span className={`text-[9.5px] font-bold tracking-wide ${
                  step.completed ? "text-[#f7e2af]" : "text-zinc-600 font-medium"
                }`}>
                  {step.name}
                </span>
                <span className={`w-1 h-1 rounded-full ${
                  step.completed ? "bg-[#dca34b]" : "bg-zinc-800"
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Col 4: Agenda Próximos 7 Dias */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col h-[230px] overflow-hidden">
          <h4 className="font-cinzel text-[9px] tracking-wider font-bold text-[#dca34b] uppercase pb-2 mb-3 text-center flex items-center justify-center gap-1.5 border-b border-[#c19a4d]/15">
            <span>Agenda 7 Dias</span>
          </h4>
          <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            {[
              { date: "HOJE", num: "26 Jun", dateColor: "text-green-400", bori: "Bori", task: "Consulta" },
              { date: "AMANHÃ", num: "27 Jun", dateColor: "text-amber-500", bori: "Bori", task: "Assentamento Ifá" },
              { date: "SEXTA", num: "28 Jun", dateColor: "text-zinc-500", bori: "", task: "Assentamento" },
              { date: "SÁBADO", num: "29 Jun", dateColor: "text-zinc-500", bori: "", task: "Ebó de Oxóssi" },
              { date: "DOMINGO", num: "30 Jun", dateColor: "text-zinc-500", bori: "", task: "Entrega de Ebó" },
              { date: "TERÇA", num: "02 Jul", dateColor: "text-zinc-500", bori: "", task: "Bori Coletivo" }
            ].map((day, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-1.5 items-center text-[10px] border-b border-[#c19a4d]/5 pb-1.5 last:border-0 last:pb-0">
                {/* Col 1: Day & Date */}
                <div className="col-span-4 min-w-0">
                  <div className={`font-bold uppercase text-[7.5px] tracking-wider leading-none ${day.dateColor}`}>{day.date}</div>
                  <div className="text-[8.5px] font-mono text-[#8b754e] leading-none mt-0.5">{day.num}</div>
                </div>

                {/* Col 2: Bori Status Indicator (● Circle) */}
                <div className="col-span-3 flex items-center gap-1">
                  {day.bori ? (
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                      <span className="text-[8.5px] font-semibold text-cyan-300 truncate">{day.bori}</span>
                    </div>
                  ) : (
                    <span className="text-[8px] text-zinc-700 font-mono italic pl-1">-</span>
                  )}
                </div>

                {/* Col 3: Task Indicator (■ Square) */}
                <div className="col-span-5 flex items-center gap-1 justify-end min-w-0">
                  <div className="w-1.5 h-1.5 bg-amber-500 shrink-0" />
                  <span className="text-[8.5px] font-bold text-[#f7e2af] truncate">{day.task}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
