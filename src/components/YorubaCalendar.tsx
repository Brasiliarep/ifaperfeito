import React from "react";
import { ArrowRight, CalendarDays } from "lucide-react";

// Beautiful interactive custom Gold Moon SVG
const GoldMoonSVG = () => (
  <svg 
    className="w-16 h-16 text-[#dca34b] drop-shadow-[0_0_12px_rgba(220,163,75,0.25)] animate-pulse shrink-0" 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="goldMoonGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fcf0d3" />
        <stop offset="60%" stopColor="#e2b963" />
        <stop offset="100%" stopColor="#8d6c2c" />
      </radialGradient>
      <filter id="moonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Subtle orbital ring */}
    <circle cx="32" cy="32" r="29" stroke="#c19a4d" strokeWidth="0.5" strokeDasharray="3 4" className="opacity-30" />
    
    {/* Main Moon Sphere */}
    <circle cx="32" cy="32" r="23" fill="url(#goldMoonGrad)" filter="url(#moonGlow)" />
    
    {/* Mystical craters and lunar surface textures */}
    <circle cx="24" cy="24" r="3.5" fill="#5c451b" className="opacity-20" />
    <circle cx="40" cy="38" r="4.5" fill="#5c451b" className="opacity-15" />
    <circle cx="28" cy="42" r="2.5" fill="#5c451b" className="opacity-20" />
    <circle cx="38" cy="22" r="2" fill="#5c451b" className="opacity-15" />
    
    {/* Crescent shadow overlay (to create the "Lua Crescente" shape) */}
    <path 
      d="M 32,9 A 23,23 0 0,0 32,55 A 17,17 0 0,1 32,9 Z" 
      fill="#0c0a08" 
      className="opacity-55" 
    />
  </svg>
);

export default function YorubaCalendar() {
  return (
    <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full min-h-[340px] lg:h-[340px] relative overflow-hidden group hover:border-[#dca34b]/40 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-b from-[#c19a4d]/2 to-transparent pointer-events-none" />
      
      <div className="space-y-4">
        {/* Header with decorative lines */}
        <div className="flex items-center justify-center gap-3 py-1 border-b border-[#c19a4d]/15 mb-1">
          <span className="h-[1px] bg-gradient-to-r from-transparent via-[#c19a4d]/30 to-transparent flex-1" />
          <div className="flex items-center gap-1.5 text-[#e2b963] font-cinzel font-bold tracking-[0.15em] text-[10px] uppercase">
            <CalendarDays size={12} className="text-[#c19a4d]" />
            <span>Calendário Yorùbá</span>
          </div>
          <span className="h-[1px] bg-gradient-to-l from-transparent via-[#c19a4d]/30 to-transparent flex-1" />
        </div>

        {/* Content Box */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1 min-w-0">
            <div>
              <h4 className="text-[13px] font-bold text-[#f7e2af] font-cinzel tracking-wide">
                26 de Junho de 2025
              </h4>
              <p className="text-[10px] text-[#b49d79] mt-1 leading-snug">
                Ẹ̀gbẹ́ - Mercado de Ifá (<span className="text-green-400 font-bold">Aberto</span>)
              </p>
            </div>

            <div className="border-t border-[#c19a4d]/10 pt-3">
              <span className="text-[8.5px] font-bold text-[#dca34b] uppercase tracking-widest block font-sans">
                Dia Yorùbá
              </span>
              <h5 className="text-[15px] font-bold text-[#f7e2af] font-cinzel mt-1 tracking-wide leading-none">
                Òjò Áwo
              </h5>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2.5 text-[9px] text-[#8b754e] font-semibold uppercase tracking-wider">
                <span className="bg-[#1c1611] px-2 py-0.5 rounded border border-[#c19a4d]/15 text-[#b49d79]">
                  Lua Crescente
                </span>
                <span className="bg-[#1c1611] px-2 py-0.5 rounded border border-[#c19a4d]/15 text-[#b49d79]">
                  Odu: Ògún Yono
                </span>
              </div>
            </div>
          </div>

          {/* Golden Moon illustration on the right */}
          <div className="flex items-center justify-center pt-1 shrink-0">
            <GoldMoonSVG />
          </div>
        </div>
      </div>

      {/* Button link aligned at the bottom */}
      <button className="text-[9px] font-bold text-[#8b754e] hover:text-[#dca34b] uppercase tracking-widest w-full text-center border-t border-[#c19a4d]/10 pt-3 mt-4 flex items-center justify-between group-hover:text-[#f7e2af] transition-colors shrink-0">
        <span>Ver calendário completo</span>
        <ArrowRight size={11} className="text-[#c19a4d] group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
