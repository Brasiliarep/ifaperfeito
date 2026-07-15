import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import OduHero from "./components/OduHero";
import QuickActions from "./components/QuickActions";
import CentroOperacional from "./components/CentroOperacional";
import AnalyticsSection from "./components/AnalyticsSection";
import AISuggestions from "./components/AISuggestions";
import SmartLibrary from "./components/SmartLibrary";
import YorubaCalendar from "./components/YorubaCalendar";
import DashboardWidgets, { RecentActivities, FutureActivities } from "./components/DashboardWidgets";
import DivinationModal from "./components/DivinationModal";
import ConsultationFlow from "./components/ConsultationFlow";
import AssistantChatDrawer from "./components/AssistantChatDrawer";
import SubModulesGrid from "./components/SubModulesGrid";
import { Compass, BookOpen, Layers, Activity, AlertCircle, Settings } from "lucide-react";
// @ts-ignore
import yorubaBronzeHeads from "./assets/images/yoruba_bronze_heads_1782581516586.jpg";
// @ts-ignore
import opeleImg from "./assets/images/opele_ifa_1782582931066.jpg";
// @ts-ignore
import oponImg from "./assets/images/opon_ifa_1782582948180.jpg";
// @ts-ignore
import ikinImg from "./assets/images/ikin_ifa_1782582960543.jpg";
// @ts-ignore
import merindilogunImg from "./assets/images/merindilogun_ifa_1782582975661.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState("painel");
  const [selectedDivinationMethod, setSelectedDivinationMethod] = useState<string | null>(null);
  const [consultationMethod, setConsultationMethod] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const DIVINATION_IDS = ["opele", "opon", "ikin", "merindilogun", "oraculos", "ebo-obi", "oraculo-ibo", "preparacao", "nova-consulta", "consulentes"];

  const handleDivinationSelect = (method: string) => {
    if (DIVINATION_IDS.includes(method)) {
      setConsultationMethod(method);
    } else {
      setActiveTab("module-" + method);
    }
  };

  // List of 5 main divination methods
  const divinatoryMethods = [
    {
      id: "opele",
      name: "Semente Opele",
      description: "Jogo das 8 sementes",
      subtitle: "Corrente sagrada de adivinhação rápida",
      icon: opeleImg
    },
    {
      id: "opon",
      name: "Tabuleiro Opon Ifá",
      description: "Tabuleiro de Ifá",
      subtitle: "Mandala litúrgica com pó de Ierosun",
      icon: oponImg
    },
    {
      id: "ikin",
      name: "Ritual Ikin",
      description: "16 sementes de dendê",
      subtitle: "Divinação profunda do destino primordial",
      icon: ikinImg
    },
    {
      id: "merindilogun",
      name: "Merindilogun",
      description: "16 búzios de Orúnmilá",
      subtitle: "Leitura direta das divindades Orixás",
      icon: merindilogunImg
    },
    {
      id: "oraculos",
      name: "Mais oráculos",
      description: "Obi, Ibo, Opele...",
      subtitle: "Ver outros métodos divinatórios",
      icon: null
    }
  ];

  return (
    <div className="flex bg-[#070605] text-[#f3eee3] min-h-screen font-sans relative overflow-x-hidden antialiased selection:bg-[#c19a4d]/30 selection:text-[#f7e2af]">
      
      {/* 1. Left Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenChat={() => setIsChatOpen(true)}
        onSelectDivination={handleDivinationSelect}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Sticky Header */}
        <Header 
          onSearchClick={() => setIsChatOpen(true)} 
          onOpenChat={() => setIsChatOpen(true)} 
        />

        {/* Dynamic Route views */}
        <main className="p-6 flex-1 space-y-6 w-full max-w-none">
          {activeTab === "painel" && (
            <div className="flex flex-col gap-6 w-full">
              
              {/* Row 1: Top Dashboard content (Hero, Métodos, Ações, Submódulos Top 3) and top sidebar */}
              <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
                {/* Center Column (Main Dashboard Content) - Expanded */}
                <div className="flex-1 min-w-0 space-y-6">
                  
                  {/* Odu Hero (Hero card of the Day) */}
                  <OduHero onConsultClick={() => handleDivinationSelect("opele")} />

                  {/* ADIVINHAÇÃO RÁPIDA section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <Compass size={14} className="text-[#dca34b]" />
                      <h3 className="font-cinzel text-[10px] tracking-widest font-bold text-[#dca34b] uppercase">
                        Adivinhação Rápida
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {divinatoryMethods.map((met) => (
                        <div
                          key={met.id}
                          onClick={() => handleDivinationSelect(met.id)}
                          className="bg-[#12100e] border border-[#c19a4d]/20 hover:border-[#dca34b]/60 rounded-2xl p-3.5 text-center cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between h-44 group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                          
                          {/* Artwork placeholder frames */}
                          <div className="w-full h-20 rounded-xl overflow-hidden border border-[#c19a4d]/10 mb-2 relative bg-[#1c1611] flex items-center justify-center">
                            {met.icon ? (
                              <img 
                                src={met.icon} 
                                alt={met.name} 
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-[#c19a4d] group-hover:text-[#dca34b] transition-colors">
                                <div className="w-10 h-10 rounded-full border border-[#c19a4d]/30 flex items-center justify-center bg-black/40 group-hover:border-[#dca34b]">
                                  <span className="text-xl font-light font-cinzel leading-none">+</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <h4 className="text-xs font-bold font-cinzel text-[#f7e2af] tracking-wider leading-none truncate">
                              {met.name}
                            </h4>
                            <p className="text-[9px] text-[#8b754e] font-sans mt-1.5 uppercase tracking-wide leading-tight">
                              {met.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consultas Rápidas Actions Block */}
                  <QuickActions onSelectAction={handleDivinationSelect} />

                  {/* Sub-modules Group Grid (Ferramentas, Conhecimento, Oogun) */}
                  <SubModulesGrid onSelectAction={handleDivinationSelect} />
                </div>

                {/* Right Column (Sidebar widgets in main viewport) - Sleek and Compact */}
                <div className="w-full lg:w-[240px] xl:w-[250px] shrink-0 space-y-6">
                  <DashboardWidgets 
                    onSelectDivination={handleDivinationSelect} 
                    onOpenChat={() => setIsChatOpen(true)} 
                  />
                  <RecentActivities />
                  <FutureActivities />
                </div>
              </div>

              {/* Row 2: Centro Operacional - Spans Full Width */}
              <div className="w-full">
                <CentroOperacional />
              </div>

            </div>
          )}

          {activeTab === "painel" && (
            <>
              {/* Analytics & Indicadores Sections */}
              <AnalyticsSection />

              {/* AI Assistant Suggestions */}
              <AISuggestions onOpenChat={() => setIsChatOpen(true)} />

              {/* Biblioteca Inteligente & Calendário Yorubá */}
              <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-stretch">
                <div className="lg:col-span-2 xl:col-span-3">
                  <SmartLibrary />
                </div>
                <div className="lg:col-span-1 xl:col-span-1">
                  <YorubaCalendar />
                </div>
              </div>
            </>
          )}

          {/* Subpages fallback layouts */}
          {activeTab !== "painel" && (
            <div className="bg-[#12100e] border border-[#c19a4d]/20 rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-6 my-12 shadow-md">
              <div className="w-16 h-16 rounded-full border border-[#c19a4d]/30 bg-[#251f16] flex items-center justify-center mx-auto">
                <BookOpen size={24} className="text-[#dca34b]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-cinzel text-lg font-bold text-[#f7e2af] tracking-widest uppercase">
                  Módulo em Preparação Litúrgica
                </h3>
                <p className="text-xs text-[#b49d79] max-w-md mx-auto leading-relaxed">
                  O acesso à seção &ldquo;{activeTab.replace("-", " ")}&rdquo; está sendo consagrado. Converse com o Babaláwo virtual ou volte ao painel principal para efetuar consultas em tempo real.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("painel")}
                className="bg-[#1c1611] border border-[#c19a4d]/40 text-[#f7e2af] hover:bg-[#c19a4d]/10 px-5 py-2 rounded-xl text-xs font-bold font-cinzel tracking-wider transition-all"
              >
                Retornar ao Painel Principal
              </button>
            </div>
          )}

          {/* Majestic Footer and spiritual quote banner */}
          <footer className="mt-12 mb-8 bg-[#0c0a08]/90 border border-[#c19a4d]/25 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            {/* Left side: Yoruba Bronze heads decorative image */}
            <div className="w-full md:w-44 h-24 overflow-hidden rounded-xl border border-[#c19a4d]/20 bg-[#12100e] relative shrink-0">
              <img 
                src={yorubaBronzeHeads} 
                alt="Yoruba classical art" 
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 hover:brightness-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/60 pointer-events-none" />
            </div>

            {/* Central content */}
            <div className="flex-1 text-center space-y-4 px-2">
              <p className="font-serif italic text-base sm:text-lg text-[#f7e2af] leading-relaxed tracking-wide text-center uppercase">
                &ldquo;IFÁ KÍ Í SE FÀ ÌTÀN, Ó GÉ KÓ IẸ KÓÓTÍTÓ.&rdquo;
              </p>
              <p className="text-[10px] text-[#a88e5d] uppercase tracking-[0.15em] font-semibold -mt-1">
                Ifá não é para contar histórias, é para ter a verdade certa. — Provérbio Yorùbá
              </p>

              {/* Status footer list */}
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[8.5px] uppercase tracking-widest font-bold text-[#8b754e] border-t border-[#c19a4d]/10 pt-3">
                <span>Versão Pro</span>
                <span className="text-[#c19a4d]/40">●</span>
                <span>Base de dados: +50.000 registros</span>
                <span className="text-[#c19a4d]/40">●</span>
                <span>Sincronizado com nuvem segura</span>
              </div>
            </div>

            {/* Right side: Yoruba Bronze heads decorative image */}
            <div className="w-full md:w-44 h-24 overflow-hidden rounded-xl border border-[#c19a4d]/20 bg-[#12100e] relative shrink-0">
              <img 
                src={yorubaBronzeHeads} 
                alt="Yoruba sacred art" 
                className="w-full h-full object-cover scale-x-[-1] grayscale contrast-125 hover:grayscale-0 hover:brightness-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/60 pointer-events-none" />
            </div>
          </footer>
        </main>
      </div>

      {/* 3. Full Consultation Flow (Nova Consulta / Consulentes) */}
      {consultationMethod && (
        <ConsultationFlow
          method={consultationMethod}
          onClose={() => setConsultationMethod(null)}
        />
      )}

      {/* 5. Interactive Divination Oracle Casting Modal (quick methods) */}
      {selectedDivinationMethod && (
        <DivinationModal 
          method={selectedDivinationMethod} 
          onClose={() => setSelectedDivinationMethod(null)} 
        />
      )}

      {/* 6. Slide-out Active AI Spiritual Assistant chat drawer */}
      <AssistantChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

    </div>
  );
}
