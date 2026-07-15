import React from "react";
import { Sparkles, ArrowRight, Layers, Shield, Compass } from "lucide-react";
// @ts-ignore
import sacredWheel from "../assets/images/sacred_wheel_ifa_oluwo_1782582702450.jpg";

interface OduHeroProps {
  onConsultClick: () => void;
}

export default function OduHero({ onConsultClick }: OduHeroProps) {
  return (
    <section className="bg-[#100d0a] border border-[#c19a4d]/25 rounded-2xl p-6 md:py-4 md:px-8 relative overflow-hidden shadow-[0_0_35px_rgba(212,175,55,0.06)]">
      {/* Decorative Background lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,154,77,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(220,163,75,0.05),transparent_60%)] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Odu do Dia text & main action */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[#dca34b] text-xs font-semibold">✦</span>
            <span className="text-[10px] font-bold text-[#dca34b] uppercase tracking-[0.2em] font-sans">
              Odu do Dia
            </span>
          </div>

          <h2 className="font-cinzel text-3.5xl font-extrabold text-[#f7e2af] tracking-widest leading-none">
            Ògún Yono
          </h2>

          <div className="space-y-3.5">
            <p className="text-sm text-[#f7e2af]/90 font-sans font-medium leading-relaxed">
              Energia de renovação e movimento.
            </p>
            <p className="text-[12px] text-[#b49d79] font-sans leading-relaxed tracking-wide">
              Momento propício para iniciar projetos, buscar conhecimento e fortalecer sua conexão espiritual.
            </p>
          </div>

          <div className="pt-3">
            <button
              onClick={onConsultClick}
              className="group bg-[#161310] border border-[#c19a4d]/40 hover:border-[#dca34b] hover:bg-[#c19a4d]/10 px-5 py-2.5 rounded-lg text-xs font-cinzel font-bold text-[#f7e2af] tracking-widest transition-all flex items-center gap-2"
            >
              <span>Consultar Odu do Dia</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#dca34b]" />
            </button>
          </div>
        </div>

        {/* Middle Column: The Majestic Sacred Wheel (Exactly in the proportions of the print) */}
        <div className="lg:col-span-4 flex justify-center items-center my-4 lg:my-0">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] shrink-0">
            {/* Ambient gold glow */}
            <div className="absolute inset-0 rounded-full bg-[#dca34b]/5 blur-xl pointer-events-none" />
            
            {/* Double outer rings */}
            <div className="absolute -inset-2 rounded-full border border-[#c19a4d]/20 animate-spin-slow pointer-events-none" />
            <div className="absolute -inset-1 rounded-full border border-dashed border-[#dca34b]/15 pointer-events-none" />
            
            {/* The circular cropped image of the Wheel */}
            <div className="absolute inset-0 rounded-full border-2 border-[#c19a4d]/40 overflow-hidden shadow-[0_0_30px_rgba(220,163,75,0.25)] bg-[#0e0c0a] group cursor-pointer">
              <img
                src={sacredWheel}
                alt="Sagrada Roda de Ifá Oluwo"
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-[1.05] hover:scale-[1.12] transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Column: Clean Vertical Parameters List with custom sacred badges */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-4 md:pl-4">
          {[
            { label: "Elemento", val: "Terra", icon: ElementoIcon },
            { label: "Regente", val: "Ògún", icon: RegenteIcon },
            { label: "Energia", val: "Expansão", icon: EnergiaIcon },
            { label: "Símbolo", val: "Movimento", icon: SimboloIcon }
          ].map((param, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3.5 group transition-colors py-1 border-b border-[#c19a4d]/5 last:border-0"
            >
              {/* Sacred custom vector icon on the left */}
              <div className="shrink-0 transition-transform group-hover:scale-105 duration-300">
                <param.icon />
              </div>
              <div className="min-w-0 leading-none">
                <span className="text-[9px] text-[#8b754e] font-sans font-bold uppercase tracking-wider block">
                  {param.label}
                </span>
                <span className="text-[12px] text-[#f7e2af] font-cinzel font-bold tracking-widest block mt-1">
                  {param.val}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Custom sacred vector badges matching Yoruba / Opon Ifa geometries
function ElementoIcon() {
  return (
    <svg className="w-8 h-8 text-[#dca34b]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#c19a4d" strokeWidth="0.8" />
      <path d="M7 9 H17 M7 12 H17 M7 15 H17" stroke="#dca34b" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.2" fill="#f7e2af" />
    </svg>
  );
}

function RegenteIcon() {
  return (
    <svg className="w-8 h-8 text-[#dca34b]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#c19a4d" strokeWidth="0.8" />
      <path d="M6 18 L18 6" stroke="#dca34b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 6 L6 11 M18 13 L13 18" stroke="#dca34b" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="1.5 1.5" />
      <circle cx="12" cy="12" r="1.5" fill="#f7e2af" />
    </svg>
  );
}

function EnergiaIcon() {
  return (
    <svg className="w-8 h-8 text-[#dca34b]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#c19a4d" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="6" stroke="#dca34b" strokeWidth="1" strokeDasharray="1 2" />
      <circle cx="12" cy="12" r="3" stroke="#f7e2af" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="0.8" fill="#f7e2af" />
    </svg>
  );
}

function SimboloIcon() {
  return (
    <svg className="w-8 h-8 text-[#dca34b]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#c19a4d" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="5" stroke="#dca34b" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2" fill="#f7e2af" />
    </svg>
  );
}
