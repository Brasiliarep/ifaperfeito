import React from "react";
import { Search, Bell, Shield, Calendar, Sun, Sparkles, UserCheck } from "lucide-react";
// @ts-ignore
import babalawoAvatar from "../assets/images/babalawo_avatar_1782583026238.jpg";

interface HeaderProps {
  onSearchClick: () => void;
  onOpenChat: () => void;
}

export default function Header({ onSearchClick, onOpenChat }: HeaderProps) {
  return (
    <header className="bg-[#090807]/90 backdrop-blur border-b border-[#c19a4d]/20 px-6 py-3 sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Search Input Box - expanded with flex-1 and max-w-2xl */}
      <div 
        onClick={onSearchClick}
        className="flex-1 max-w-lg lg:max-w-xl xl:max-w-2xl flex items-center gap-2 px-3 py-1.5 bg-[#15120e] border border-[#c19a4d]/25 rounded-md text-xs text-[#a88e5d] hover:border-[#dca34b]/50 cursor-pointer transition-all"
      >
        <Search size={14} className="text-[#c19a4d]" />
        <span className="flex-1 text-left text-[#8b754e]">Buscar odus, estudos, orações, funções...</span>
        <kbd className="bg-[#251f16] border border-[#c19a4d]/20 px-1.5 py-0.2 rounded text-[9px] font-mono tracking-wider">⌘K</kbd>
      </div>

      {/* Header Indicators / Quick Stats Bar */}
      <div className="hidden lg:flex items-center gap-3 text-[11px] font-medium text-[#9d8964] shrink-0">
        {/* Stat 1: Consultas Hoje */}
        <div className="flex items-center gap-2.5 bg-[#12100e]/40 border border-[#c19a4d]/15 px-2.5 py-1 rounded-xl">
          <ConsultasIcon />
          <div className="flex flex-col leading-none">
            <span className="text-[8.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider">Consultas hoje</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-bold text-sm text-[#f7e2af] font-cinzel">12</span>
              <span className="text-[8px] text-green-400 font-bold bg-green-950/60 px-1 py-0.2 rounded">+3</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Odus Estudados */}
        <div className="flex items-center gap-2.5 bg-[#12100e]/40 border border-[#c19a4d]/15 px-2.5 py-1 rounded-xl">
          <OdusIcon />
          <div className="flex flex-col leading-none">
            <span className="text-[8.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider">Odus estudados</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-bold text-sm text-[#f7e2af] font-cinzel">89</span>
              <span className="text-[8px] text-green-400 font-bold bg-green-950/60 px-1 py-0.2 rounded">+7</span>
            </div>
          </div>
        </div>

        {/* Stat 3: Odu do dia */}
        <div className="flex items-center gap-2.5 bg-[#12100e]/40 border border-[#c19a4d]/15 px-2.5 py-1 rounded-xl">
          <OduDiaIcon />
          <div className="flex flex-col leading-none">
            <span className="text-[8.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider">Odu do dia</span>
            <span className="font-bold text-xs text-[#f7e2af] font-cinzel mt-0.5">Ògún Yono</span>
          </div>
        </div>

        {/* Stat 4: Próximo Evento */}
        <div className="flex items-center gap-2.5 bg-[#12100e]/40 border border-[#c19a4d]/15 px-2.5 py-1 rounded-xl">
          <EventoIcon />
          <div className="flex flex-col leading-none">
            <span className="text-[8.5px] text-[#8b754e] font-sans font-bold uppercase tracking-wider">Próximo evento</span>
            <span className="font-bold text-xs text-[#f7e2af] mt-0.5">Ebó de Oxóssi</span>
            <span className="text-[8px] text-[#dca34b] font-mono mt-0.5">28 Jun - 16:00</span>
          </div>
        </div>
      </div>

      {/* Right Side: Active Assistant & Profile Selection */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Assistente Ativo button */}
        <button 
          onClick={onOpenChat}
          className="flex items-center gap-2.5 px-3 py-1 bg-[#12100e] border border-[#c19a4d]/25 hover:border-[#dca34b]/50 rounded-xl text-left transition-all group"
        >
          <AssistenteIcon />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-bold text-[#dca34b] uppercase tracking-wide">Assistente</span>
            <span className="text-[9px] font-bold text-green-400 mt-0.5 flex items-center gap-1">
              <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
              Ativo
            </span>
          </div>
        </button>

        {/* Profile Info */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-[#c19a4d]/20 shrink-0">
          <div className="text-right hidden sm:block leading-none">
            <span className="text-[9px] font-sans font-bold text-[#8b754e] uppercase tracking-wider block">Babaláwo</span>
            <h4 className="text-xs font-bold text-[#f7e2af] font-cinzel mt-1 tracking-wide block">TXORÍ ÁGBÒ</h4>
            <div className="flex items-center justify-end mt-1">
              <span className="text-[7.5px] font-bold text-[#dca34b] uppercase tracking-widest bg-[#332512] px-1.5 py-0.2 rounded border border-[#c19a4d]/20 leading-none">
                PRO ANUAL
              </span>
            </div>
          </div>
          {/* Avatar frame */}
          <div className="w-8 h-8 rounded-full border border-[#c19a4d] p-0.5 overflow-hidden bg-gradient-to-tr from-[#96501a] to-[#f7e2af]">
            <img 
              src={babalawoAvatar} 
              alt="Babaláwo avatar" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// Circular Sacred Icons matching Opon Ifa / Yoruba geometric designs
function ConsultasIcon() {
  return (
    <svg className="w-7 h-7 text-[#dca34b] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#c19a4d" strokeWidth="0.8" strokeDasharray="1 1.5" />
      <circle cx="12" cy="12" r="6" stroke="#dca34b" strokeWidth="1" />
      <path d="M12 2 L12 4 M12 20 L12 22 M2 12 L4 12 M20 12 L22 12" stroke="#dca34b" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="2.5" fill="#f7e2af" />
    </svg>
  );
}

function OdusIcon() {
  return (
    <svg className="w-7 h-7 text-[#dca34b] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#c19a4d" strokeWidth="0.8" />
      <path d="M8.5 5.5 H15.5 L18.5 8.5 V15.5 L15.5 18.5 H8.5 L5.5 15.5 V8.5 Z" stroke="#dca34b" strokeWidth="1" />
      <circle cx="12" cy="12" r="2" fill="#dca34b" />
    </svg>
  );
}

function OduDiaIcon() {
  return (
    <svg className="w-7 h-7 text-[#dca34b] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#c19a4d" strokeWidth="0.8" />
      <line x1="9" y1="7" x2="9" y2="17" stroke="#dca34b" strokeWidth="1" strokeLinecap="round" />
      <line x1="15" y1="7" x2="15" y2="17" stroke="#dca34b" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      <line x1="12" y1="8" x2="12" y2="16" stroke="#c19a4d" strokeWidth="0.6" />
    </svg>
  );
}

function EventoIcon() {
  return (
    <svg className="w-7 h-7 text-[#dca34b] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#c19a4d" strokeWidth="0.8" />
      <path d="M8 10 C8 7, 16 7, 16 10 C16 14, 12 17, 12 17" stroke="#dca34b" strokeWidth="1" strokeLinecap="round" />
      <path d="M10 12 H14" stroke="#c19a4d" strokeWidth="0.8" />
      <circle cx="12" cy="7" r="1" fill="#f7e2af" />
    </svg>
  );
}

function AssistenteIcon() {
  return (
    <svg className="w-6 h-6 text-[#dca34b] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#c19a4d" strokeWidth="1" />
      <circle cx="12" cy="12" r="4" stroke="#dca34b" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="1.5" fill="#f7e2af" />
      <line x1="12" y1="2" x2="12" y2="6" stroke="#dca34b" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="#dca34b" strokeWidth="1" strokeLinecap="round" />
      <line x1="2" y1="12" x2="6" y2="12" stroke="#dca34b" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="12" x2="22" y2="12" stroke="#dca34b" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
