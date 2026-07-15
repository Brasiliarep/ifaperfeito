import React from "react";
import { Users, Flame, DollarSign, Clock, Globe } from "lucide-react";

export default function AnalyticsSection() {
  const odusConsultados = [
    { name: "Ògún Yono", count: 12, percent: "100%" },
    { name: "Òsá Méjì", count: 8, percent: "66%" },
    { name: "Òtúrá Méjì", count: 6, percent: "50%" },
    { name: "Ìròsùn", count: 5, percent: "41%" },
    { name: "Òsá Méjì", count: 4, percent: "33%" }
  ];

  return (
    <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-5 rounded-2xl shadow-xl space-y-4">
      {/* Decorative Ornament Divider */}
      <div className="flex items-center justify-center gap-4 py-1 border-b border-[#c19a4d]/15 mb-3.5">
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#c19a4d]/30 to-transparent flex-1" />
        <div className="flex items-center gap-2 text-[#e2b963] font-cinzel font-bold tracking-[0.2em] text-xs uppercase">
          <span className="opacity-60 text-[#c19a4d]">—— ❧</span>
          <span>Analytics & Indicadores</span>
          <span className="opacity-60 text-[#c19a4d]">❧ ——</span>
        </div>
        <span className="h-[1px] bg-gradient-to-l from-transparent via-[#c19a4d]/30 to-transparent flex-1" />
      </div>

      {/* Unified 6-Column Horizontal Grid on Large Screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Widget 1: Consultas */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col justify-between h-[210px] hover:border-[#c19a4d]/35 transition-colors">
          <div>
            <div className="text-center border-b border-[#c19a4d]/15 pb-1.5 mb-2">
              <span className="font-cinzel text-[9px] font-bold text-[#dca34b] uppercase tracking-widest block">Consultas</span>
              <span className="text-[7.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider block">Este mês</span>
            </div>
            <div className="flex justify-between items-start mt-1">
              <div className="space-y-0.5">
                <h3 className="text-lg font-extrabold text-[#f7e2af] font-cinzel leading-none">42</h3>
                <span className="text-[7.5px] text-green-400 font-bold bg-green-950/40 px-1 py-0.5 rounded border border-green-500/10 inline-block">
                  +18%
                </span>
              </div>
              <Users size={12} className="text-[#dca34b]" />
            </div>
          </div>
          {/* Custom SVG Bar Chart */}
          <div className="h-16 w-full mt-2 flex items-end justify-between px-1">
            {[15, 22, 18, 30, 25, 35, 42].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                <div 
                  className="w-1.5 rounded-t bg-gradient-to-t from-[#96501a]/80 to-[#dca34b] hover:brightness-110 transition-all duration-300 relative group"
                  style={{ height: `${(val / 42) * 44}px` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#090807] border border-[#c19a4d] text-[#f7e2af] text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {val}
                  </div>
                </div>
                <span className="text-[7px] text-[#8b754e] font-mono font-bold">S{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Odus Mais Consultados */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col justify-between h-[210px] hover:border-[#c19a4d]/35 transition-colors">
          <div>
            <div className="text-center border-b border-[#c19a4d]/15 pb-1.5 mb-2">
              <span className="font-cinzel text-[9px] font-bold text-[#dca34b] uppercase tracking-widest block">Odus Frequentes</span>
              <span className="text-[7.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider block">Este mês</span>
            </div>
            <div className="space-y-1.5 mt-1">
              {odusConsultados.map((odu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-center text-[8.5px] font-bold text-[#f7e2af]">
                    <span className="font-cinzel truncate max-w-[50px]">{odu.name}</span>
                    <span className="font-mono text-[#a88e5d]">{odu.count}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-[#201c18] h-1 rounded-full overflow-hidden border border-[#c19a4d]/5">
                    <div 
                      className="bg-gradient-to-r from-[#96501a] to-[#dca34b] h-full rounded-full" 
                      style={{ width: odu.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 3: Ebós Realizados */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col justify-between h-[210px] hover:border-[#c19a4d]/35 transition-colors">
          <div>
            <div className="text-center border-b border-[#c19a4d]/15 pb-1.5 mb-2">
              <span className="font-cinzel text-[9px] font-bold text-[#dca34b] uppercase tracking-widest block">Ebós Feitos</span>
              <span className="text-[7.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider block">Este mês</span>
            </div>
            <div className="flex justify-between items-start mt-1">
              <div className="space-y-0.5">
                <h3 className="text-lg font-extrabold text-[#f7e2af] font-cinzel leading-none">18</h3>
                <span className="text-[7.5px] text-green-400 font-bold bg-green-950/40 px-1 py-0.5 rounded border border-green-500/10 inline-block">
                  +12%
                </span>
              </div>
              <Flame size={12} className="text-[#dca34b]" />
            </div>
          </div>
          {/* Custom SVG Line Chart matching print */}
          <div className="h-16 w-full mt-2 relative">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dca34b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#dca34b" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Gridlines */}
              <line x1="0" y1="10" x2="100" y2="10" stroke="#c19a4d" strokeWidth="0.1" strokeDasharray="1 1" />
              <line x1="0" y1="20" x2="100" y2="20" stroke="#c19a4d" strokeWidth="0.1" strokeDasharray="1 1" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#c19a4d" strokeWidth="0.1" strokeDasharray="1 1" />
              
              {/* Filled Area */}
              <path d="M5 35 L20 28 L35 31 L50 22 L65 18 L80 24 L95 8 L95 40 L5 40 Z" fill="url(#gold-grad)" />
              {/* Connecting Line */}
              <path d="M5 35 L20 28 L35 31 L50 22 L65 18 L80 24 L95 8" fill="none" stroke="#dca34b" strokeWidth="1.2" />
              
              {/* Vertex Nodes */}
              <circle cx="5" cy="35" r="1.5" fill="#f7e2af" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="20" cy="28" r="1.5" fill="#f7e2af" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="35" cy="31" r="1.5" fill="#f7e2af" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="50" cy="22" r="1.5" fill="#f7e2af" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="65" cy="18" r="1.5" fill="#f7e2af" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="80" cy="24" r="1.5" fill="#f7e2af" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="95" cy="8" r="2" fill="#fcf3db" stroke="#96501a" strokeWidth="0.5" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* Widget 4: Receita */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col justify-between h-[210px] hover:border-[#c19a4d]/35 transition-colors">
          <div>
            <div className="text-center border-b border-[#c19a4d]/15 pb-1.5 mb-2">
              <span className="font-cinzel text-[9px] font-bold text-[#dca34b] uppercase tracking-widest block">Receita</span>
              <span className="text-[7.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider block">Este mês</span>
            </div>
            <div className="flex justify-between items-start mt-1">
              <div className="space-y-0.5">
                <h3 className="text-[13px] font-extrabold text-[#f7e2af] font-cinzel leading-none truncate">R$ 8.450</h3>
                <span className="text-[7.5px] text-green-400 font-bold bg-green-950/40 px-1 py-0.5 rounded border border-green-500/10 inline-block">
                  +22%
                </span>
              </div>
              <DollarSign size={12} className="text-[#dca34b]" />
            </div>
          </div>
          {/* Custom SVG Line Chart matching print */}
          <div className="h-16 w-full mt-2 relative">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e2b963" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#e2b963" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Gridlines */}
              <line x1="0" y1="12" x2="100" y2="12" stroke="#c19a4d" strokeWidth="0.1" strokeDasharray="1 1" />
              <line x1="0" y1="24" x2="100" y2="24" stroke="#c19a4d" strokeWidth="0.1" strokeDasharray="1 1" />
              
              {/* Filled Area */}
              <path d="M5 36 L20 30 L35 25 L50 18 L65 14 L80 20 L95 6 L95 40 L5 40 Z" fill="url(#area-grad)" />
              {/* Connecting Line */}
              <path d="M5 36 L20 30 L35 25 L50 18 L65 14 L80 20 L95 6" fill="none" stroke="#e2b963" strokeWidth="1.2" />
              
              {/* Vertex Nodes */}
              <circle cx="5" cy="36" r="1.5" fill="#fcf3db" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="20" cy="30" r="1.5" fill="#fcf3db" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="35" cy="25" r="1.5" fill="#fcf3db" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="50" cy="18" r="1.5" fill="#fcf3db" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="65" cy="14" r="1.5" fill="#fcf3db" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="80" cy="20" r="1.5" fill="#fcf3db" stroke="#96501a" strokeWidth="0.5" />
              <circle cx="95" cy="6" r="2" fill="#fcf3db" stroke="#96501a" strokeWidth="0.5" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* Widget 5: Horas Atendidas */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col justify-between h-[210px] hover:border-[#c19a4d]/35 transition-colors">
          <div>
            <div className="text-center border-b border-[#c19a4d]/15 pb-1.5 mb-2">
              <span className="font-cinzel text-[9px] font-bold text-[#dca34b] uppercase tracking-widest block">Horas Atendidas</span>
              <span className="text-[7.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider block">Este mês</span>
            </div>
            <div className="flex justify-between items-start mt-1">
              <div className="space-y-0.5">
                <h3 className="text-[12px] font-extrabold text-[#f7e2af] font-cinzel leading-none truncate">36h 20m</h3>
                <span className="text-[7.5px] text-green-400 font-bold bg-green-950/40 px-1 py-0.5 rounded border border-green-500/10 inline-block">
                  +15%
                </span>
              </div>
              <Clock size={12} className="text-[#dca34b]" />
            </div>
          </div>
          {/* Custom SVG Bar Chart */}
          <div className="h-16 w-full mt-2 flex items-end justify-between px-1">
            {[12, 18, 15, 24, 21, 30, 36].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                <div 
                  className="w-1.5 rounded-t bg-gradient-to-t from-[#96501a]/80 to-[#dca34b] hover:brightness-110 transition-all duration-300 relative group"
                  style={{ height: `${(val / 36) * 44}px` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#090807] border border-[#c19a4d] text-[#f7e2af] text-[8px] font-mono px-1 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {val}h
                  </div>
                </div>
                <span className="text-[7px] text-[#8b754e] font-mono font-bold">S{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 6: Mapa dos Consulentes */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-3.5 rounded-xl flex flex-col justify-between h-[210px] relative overflow-hidden hover:border-[#c19a4d]/35 transition-colors">
          <div>
            <div className="text-center border-b border-[#c19a4d]/15 pb-1.5 mb-2 relative z-10">
              <div className="flex items-center justify-center gap-1">
                <span className="font-cinzel text-[9px] font-bold text-[#dca34b] uppercase tracking-widest block">Consulentes</span>
                <Globe size={10} className="text-[#dca34b]" />
              </div>
              <span className="text-[7.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider block">Este mês</span>
            </div>
          </div>
          
          {/* Stylized world dot map */}
          <div className="absolute inset-0 top-8 opacity-45 flex items-center justify-center p-2 select-none pointer-events-none">
            <svg viewBox="0 0 320 180" className="w-full h-full text-zinc-800">
              {/* Highly abstract continent contours */}
              <path d="M40 50 Q70 40, 90 70 T120 60 T140 100 T110 130 Z" fill="#25211c" />
              <path d="M150 110 Q160 140, 180 150 T170 170 Z" fill="#201a15" />
              <path d="M180 30 Q220 20, 260 40 T290 60 T250 110 T180 30 Z" fill="#2c251f" />
              <path d="M210 110 Q240 120, 260 145 Z" fill="#1e1814" />
              <path d="M70 100 Q80 120, 95 150 Z" fill="#221d18" />

              {/* Golden pulsing location dots */}
              <circle cx="95" cy="120" r="3" fill="#dca34b" className="animate-ping" />
              <circle cx="95" cy="120" r="2" fill="#fcf3db" />
              
              <circle cx="165" cy="100" r="3" fill="#dca34b" className="animate-ping" />
              <circle cx="165" cy="100" r="2" fill="#fcf3db" />

              <circle cx="175" cy="55" r="1.5" fill="#dca34b" />
              <circle cx="65" cy="65" r="1.5" fill="#dca34b" />
            </svg>
          </div>

          <div className="text-[8px] leading-tight text-[#b49d79] relative z-10 bg-[#12100e]/90 p-1.5 rounded-lg border border-[#c19a4d]/10 mt-auto text-center font-semibold">
            Foco em: <strong className="text-[#f7e2af]">SSA, RJ e Lagos (NG)</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
