import React, { useState } from "react";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Flame,
  Shield,
  Calendar,
  Sparkles,
  Cpu,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  FileText,
  User,
  History,
  Eye,
  Tv,
  Bookmark,
  Scroll,
  Book,
  Heart,
  Music,
  MoonStar,
  Binary,
  Layers,
  Leaf,
  Map,
  Activity,
  Boxes,
  Package,
  LineChart,
  GitFork,
  CheckCircle,
  HelpCircle,
  Mic,
  PenTool,
  Printer,
  Share2,
  Coins,
  LogOut
// Removido import do brandLogo pesado

interface SidebarProps {

  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
  onSelectDivination: (method: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab, onOpenChat, onSelectDivination }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuSections = [
    {
      title: "ADIVINHAÇÃO",
      items: [
        { name: "Semente Opele", icon: Compass, id: "opele" },
        { name: "Tabuleiro Opon Ifá", icon: Layers, id: "opon" },
        { name: "Ritual Ikin", icon: Leaf, id: "ikin" },
        { name: "Merindilogun", icon: Compass, id: "merindilogun" },
        { name: "Ebó Obi", icon: Flame, id: "ebo-obi" },
        { name: "Oráculo Ibo", icon: HelpCircle, id: "oraculo-ibo" },
        { name: "Hub de Oráculos", icon: Sparkles, id: "oraculos" },
        { name: "Preparação", icon: Activity, id: "preparacao" }
      ]
    },
    {
      title: "CONSULTA",
      items: [
        { name: "Nova Consulta", icon: Sparkles, id: "nova-consulta", action: () => onSelectDivination("opele") },
        { name: "Consulentes", icon: User, id: "consulentes" },
        { name: "Interpretações", icon: FileText, id: "interpretacoes" },
        { name: "Histórico", icon: History, id: "historico" },
        { name: "Imprimir", icon: Printer, id: "imprimir" },
        { name: "Compartilhar", icon: Share2, id: "compartilhar" }
      ]
    },
    {
      title: "CONHECIMENTO",
      items: [
        { name: "Biblioteca de Odus", icon: Bookmark, id: "biblioteca-odus", badge: "256" },
        { name: "Tratados & Textos", icon: Scroll, id: "tratados" },
        { name: "Orikis & Orações", icon: Book, id: "oracoes" },
        { name: "Dicionário Yoruba", icon: FileText, id: "dicionario" },
        { name: "Modo de Estudo", icon: Flame, id: "study" },
        { name: "Manual do App", icon: HelpCircle, id: "manual" }
      ]
    },
    {
      title: "ESOTÉRICO",
      items: [
        { name: "Detector Iyami", icon: Eye, id: "detector-iyami" },
        { name: "Oráculo Animal", icon: Activity, id: "oraculo-animal" },
        { name: "Leitor de Presságios", icon: Compass, id: "pressagios" },
        { name: "Lâmpadas de Ifá", icon: Flame, id: "lampadas" },
        { name: "Bússola Sagrada", icon: Compass, id: "bussola" },
        { name: "Mais Ferramentas", icon: Sparkles, id: "mais-ferramentas" }
      ]
    },
    {
      title: "MAGIA",
      items: [
        { name: "Casa de Ogún", icon: Shield, id: "casa-ogun" },
        { name: "Biblioteca de Akose", icon: Bookmark, id: "biblioteca-akose" },
        { name: "Simulador de Ebós", icon: Binary, id: "ebo-sim", action: () => onSelectDivination("opele") },
        { name: "Ervas & Remédios", icon: Leaf, id: "ervas" },
        { name: "Assentamentos", icon: Boxes, id: "assentamentos" },
        { name: "Mais Ferramentas", icon: Sparkles, id: "mais-ferramentas-magia" }
      ]
    },
    {
      title: "VOZ & SOM",
      items: [
        { name: "Comandante de Voz", icon: Mic, id: "voz", action: onOpenChat },
        { name: "Central de Sons", icon: Music, id: "sons" },
        { name: "Cânticos de Ifá", icon: Scroll, id: "canticos" },
        { name: "Sons dos Odus", icon: Music, id: "sons-odus" },
        { name: "Misturador Natural", icon: Music, id: "misturador" }
      ]
    },
    {
      title: "GESTÃO",
      items: [
        { name: "Inventário", icon: Package, id: "inventario" },
        { name: "Financeiro", icon: Coins, id: "financeiro" },
        { name: "Agenda", icon: Calendar, id: "agenda" },
        { name: "Fornecedores", icon: User, id: "fornecedores" },
        { name: "Relatórios", icon: LineChart, id: "analytics" },
        { name: "Árvore de Axé", icon: GitFork, id: "linhagem" }
      ]
    },
    {
      title: "INTERATIVOS",
      items: [
        { name: "Modo História (RPG)", icon: Sparkles, id: "rpg" },
        { name: "Jogos & Desafios", icon: Flame, id: "jogos" },
        { name: "Jardim de Osányìn", icon: Leaf, id: "jardim" },
        { name: "Ebó Interativo", icon: Binary, id: "ebo-interativo" },
        { name: "Mapa Yorubaland", icon: Map, id: "mapa" }
      ]
    },
    {
      title: "SISTEMA",
      items: [
        { name: "Configurações", icon: Settings, id: "configuracoes" },
        { name: "Perfil", icon: User, id: "perfil" },
        { name: "Assinatura", icon: Heart, id: "assinatura" },
        { name: "Ajuda & Suporte", icon: HelpCircle, id: "ajuda" },
        { name: "Sair", icon: LogOut, id: "sair" }
      ]
    }
  ];

  return (
    <aside
      id="sidebar"
      className={`bg-[#0a0907] border-r border-[#c19a4d]/20 transition-all duration-300 flex flex-col shrink-0 h-screen sticky top-0 z-40 select-none ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-[#c19a4d]/15 flex items-center justify-between gap-2">
        {!collapsed && (
          <div className="flex items-center gap-2">
             <img src="/logo.png" alt="IFÁ OLUWO" className="object-contain h-10 drop-shadow-[0_0_8px_rgba(193,154,77,0.5)]" />
             <span className="font-serif font-bold text-lg text-[#C49E30] tracking-wider drop-shadow-[0_0_8px_rgba(193,154,77,0.3)]">
               IFÁ OLUWO
             </span>
          </div>
        )}
        {collapsed && (
          <img 
            src="/logo_tree.jpg" 
            alt="Ifá Oluwo Logo" 
            className="w-10 h-10 object-cover object-left rounded-full border border-[#c19a4d]/30 mx-auto drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#a88e5d] hover:text-[#e2b963] p-1 rounded hover:bg-[#c19a4d]/10 transition-colors shrink-0"
          title={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
      </div>

      {/* Navigation Links Scrollable */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Painel Principal (Hero Active Link) */}
        <div className="px-2">
          <button
            onClick={() => setActiveTab("painel")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "painel"
                ? "bg-gradient-to-r from-[#dca34b]/20 to-transparent text-[#f7e2af] border-l-2 border-[#dca34b]"
                : "text-[#a88e5d] hover:bg-[#c19a4d]/5 hover:text-[#f7e2af]"
            }`}
          >
            <LayoutDashboard size={18} className="shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">Painel Principal</span>}
          </button>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[9px] tracking-wider font-semibold text-[#8b754e] uppercase mb-1 font-cinzel">
                {section.title}
              </h3>
            )}
            <div className="space-y-[2px]">
              {section.items.map((item) => {
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#c19a4d]/15 text-[#f7e2af] border-l-2 border-[#dca34b]"
                        : "text-[#9d8964] hover:bg-[#c19a4d]/5 hover:text-[#f3eee3]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={14} className="shrink-0 text-[#c19a4d]/70" />
                      {!collapsed && <span className="truncate">{item.name}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-bold leading-none shrink-0 bg-[#251f16] text-[#e2b963] border border-[#c19a4d]/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {!collapsed && idx < menuSections.length - 1 && (
              <div className="h-[1px] bg-[#c19a4d]/10 my-2 mx-3" />
            )}
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-[#c19a4d]/15 space-y-2 bg-[#080705]">
        <div className="flex items-center justify-between px-3 py-1.5 text-xs text-[#9d8964]">
          <div className="flex items-center gap-3">
            <Moon size={14} className="text-[#dca34b]" />
            {!collapsed && <span>Tema: Escuro</span>}
          </div>
          {!collapsed && (
            <div className="w-8 h-4 bg-[#251f16] border border-[#c19a4d]/30 rounded-full p-0.5 flex items-center justify-start cursor-pointer">
              <div className="w-2.5 h-2.5 bg-[#dca34b] rounded-full" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
