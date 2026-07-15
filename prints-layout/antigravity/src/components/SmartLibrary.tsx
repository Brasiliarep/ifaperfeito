import React from "react";
import { Clock } from "lucide-react";

// Beautiful custom sacred divination wheel icon (similar to Opon Ifá layout)
const WheelIcon = () => (
  <svg 
    className="w-8 h-8 shrink-0 text-[#dca34b] drop-shadow-[0_0_4px_rgba(220,163,75,0.2)]" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer circle with small notches */}
    <circle cx="20" cy="20" r="16" stroke="#c19a4d" strokeWidth="0.8" className="opacity-40" />
    <circle cx="20" cy="20" r="14" stroke="#dca34b" strokeWidth="1" />
    <circle cx="20" cy="20" r="11" stroke="#c19a4d" strokeWidth="0.6" strokeDasharray="2 1.5" />
    
    {/* Center core */}
    <circle cx="20" cy="20" r="5" stroke="#dca34b" strokeWidth="0.8" fill="#12100e" />
    <circle cx="20" cy="20" r="2" fill="#f7e2af" />

    {/* Sacred cardinal lines and rays */}
    <path d="M20 4 L20 14" stroke="#dca34b" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M20 26 L20 36" stroke="#dca34b" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M4 20 L14 20" stroke="#dca34b" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M26 20 L36 20" stroke="#dca34b" strokeWidth="0.8" strokeLinecap="round" />
    
    {/* Diagonals */}
    <path d="M9 9 L15 15" stroke="#c19a4d" strokeWidth="0.6" strokeLinecap="round" className="opacity-75" />
    <path d="M25 25 L31 31" stroke="#c19a4d" strokeWidth="0.6" strokeLinecap="round" className="opacity-75" />
    <path d="M9 31 L15 25" stroke="#c19a4d" strokeWidth="0.6" strokeLinecap="round" className="opacity-75" />
    <path d="M25 15 L31 9" stroke="#c19a4d" strokeWidth="0.6" strokeLinecap="round" className="opacity-75" />

    {/* Inner decorative dots */}
    <circle cx="20" cy="10" r="1" fill="#f7e2af" />
    <circle cx="20" cy="30" r="1" fill="#f7e2af" />
    <circle cx="10" cy="20" r="1" fill="#f7e2af" />
    <circle cx="30" cy="20" r="1" fill="#f7e2af" />
  </svg>
);

// Beautiful custom sacred book/tablet icon matching the screenshot (looks like open scriptures/wooden board with ancient text markings)
const BookOrnament = () => (
  <svg 
    className="w-8 h-8 shrink-0 text-[#dca34b] drop-shadow-[0_0_4px_rgba(220,163,75,0.2)]" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Elegant wood or gold plate borders */}
    <rect x="5" y="8" width="30" height="24" rx="3" fill="#12100e" stroke="#c19a4d" strokeWidth="1" />
    <rect x="7" y="10" width="26" height="20" rx="1.5" stroke="#dca34b" strokeWidth="0.8" className="opacity-80" />
    
    {/* Book spine / division */}
    <path d="M20 10 L20 30" stroke="#dca34b" strokeWidth="1" strokeLinecap="round" />
    
    {/* Decorative details inside scriptures */}
    {/* Left Page Text Lines */}
    <path d="M10 14 H17 M10 18 H17 M10 22 H15 M10 26 H16" stroke="#f7e2af" strokeWidth="1.2" strokeLinecap="round" className="opacity-85" />
    
    {/* Right Page Text Lines */}
    <path d="M23 14 H30 M23 18 H30 M23 22 H28 M23 26 H29" stroke="#f7e2af" strokeWidth="1.2" strokeLinecap="round" className="opacity-85" />

    {/* Elegant corner dots or bindings */}
    <circle cx="9" cy="12" r="0.6" fill="#dca34b" />
    <circle cx="31" cy="12" r="0.6" fill="#dca34b" />
    <circle cx="9" cy="28" r="0.6" fill="#dca34b" />
    <circle cx="31" cy="28" r="0.6" fill="#dca34b" />
  </svg>
);

export default function SmartLibrary() {
  const odusRelacionados = [
    { name: "Ògún Yono", desc: "Odu do dia" },
    { name: "Òsá Méjì", desc: "Harmonia e equilíbrio" },
    { name: "Òtúrá Méjì", desc: "Sabedoria e direção" },
    { name: "Ìròsùn", desc: "Transformação" }
  ];

  const estudosRecomendados = [
    { title: "A Energia de Ògún na Vida Cotidiana", type: "Tratado", readTime: "15 min de leitura" },
    { title: "Movimento e Transformação em Ifá", type: "Estudo", readTime: "22 min de leitura" },
    { title: "Os Caminhos da Expansão", type: "Artigo", readTime: "18 min de leitura" }
  ];

  const ultimosPesquisados = [
    { name: "Òsá Méjì", time: "Há 2 horas" },
    { name: "Òtúrá Méjì", time: "Há 1 dia" },
    { name: "Ìròsùn", time: "Há 2 dias" },
    { name: "Ògún Yono", time: "Há 3 dias" }
  ];

  return (
    <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-5 rounded-2xl shadow-xl space-y-4">
      {/* Decorative Elegant Header matching the custom divider pattern */}
      <div className="flex items-center justify-center gap-4 py-1 border-b border-[#c19a4d]/15 mb-3.5">
        <span className="h-[1px] bg-gradient-to-r from-transparent via-[#c19a4d]/30 to-transparent flex-1" />
        <div className="flex items-center gap-2 text-[#e2b963] font-cinzel font-bold tracking-[0.2em] text-xs uppercase">
          <span className="opacity-60 text-[#c19a4d]">—— ❧</span>
          <span>Biblioteca Inteligente</span>
          <span className="opacity-60 text-[#c19a4d]">❧ ——</span>
        </div>
        <span className="h-[1px] bg-gradient-to-l from-transparent via-[#c19a4d]/30 to-transparent flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Column 1: Odu Relacionados */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-4 rounded-xl flex flex-col justify-between h-[280px]">
          <div>
            <h4 className="font-cinzel text-[9.5px] tracking-wider font-bold text-[#dca34b] uppercase pb-1.5 mb-3 text-center border-b border-[#c19a4d]/15">
              Ódu Relacionados ao Odu do Dia
            </h4>
            <div className="space-y-3.5 mt-3">
              {odusRelacionados.map((odu, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs pb-1 border-b border-[#c19a4d]/5 last:border-0">
                  <WheelIcon />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-bold text-[#f7e2af] font-cinzel text-[11px]">{odu.name}</h5>
                    <p className="text-[9px] text-[#8b754e] font-semibold tracking-wide">{odu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[9px] font-bold text-[#8b754e] hover:text-[#dca34b] uppercase tracking-widest w-full text-center border-t border-[#c19a4d]/10 mt-3 pt-2">
            Ver todos relacionados
          </button>
        </div>

        {/* Column 2: Estudos Recomendados */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-4 rounded-xl flex flex-col justify-between h-[280px]">
          <div>
            <h4 className="font-cinzel text-[9.5px] tracking-wider font-bold text-[#dca34b] uppercase pb-1.5 mb-3 text-center border-b border-[#c19a4d]/15">
              Estudos Recomendados
            </h4>
            <div className="space-y-3.5 mt-3">
              {estudosRecomendados.map((est, idx) => (
                <div key={idx} className="flex gap-3 items-center text-xs pb-1 border-b border-[#c19a4d]/5 last:border-0">
                  <BookOrnament />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-[11px] font-bold text-[#f7e2af] leading-tight hover:text-white cursor-pointer transition-colors truncate">
                      {est.title}
                    </h5>
                    <div className="flex items-center gap-1.5 text-[8.5px] text-[#8b754e] font-semibold uppercase mt-0.5">
                      <span>{est.type}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 font-mono">
                        <Clock size={8} />
                        {est.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[9px] font-bold text-[#8b754e] hover:text-[#dca34b] uppercase tracking-widest w-full text-center border-t border-[#c19a4d]/10 mt-3 pt-2">
            Ver mais estudos
          </button>
        </div>

        {/* Column 3: Últimos Odus Pesquisados */}
        <div className="bg-[#12100e]/70 border border-[#c19a4d]/20 p-4 rounded-xl flex flex-col justify-between h-[280px]">
          <div>
            <h4 className="font-cinzel text-[9.5px] tracking-wider font-bold text-[#dca34b] uppercase pb-1.5 mb-3 text-center border-b border-[#c19a4d]/15">
              Últimos Odus Pesquisados
            </h4>
            <div className="space-y-3.5 mt-3">
              {ultimosPesquisados.map((odu, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pb-1 border-b border-[#c19a4d]/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <WheelIcon />
                    <h5 className="font-bold text-[#f7e2af] font-cinzel text-[11px]">{odu.name}</h5>
                  </div>
                  <span className="text-[9px] text-[#8b754e] font-mono font-bold uppercase tracking-wider">{odu.time}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="text-[9px] font-bold text-[#8b754e] hover:text-[#dca34b] uppercase tracking-widest w-full text-center border-t border-[#c19a4d]/10 mt-3 pt-2">
            Ver histórico completo
          </button>
        </div>

      </div>
    </div>
  );
}
