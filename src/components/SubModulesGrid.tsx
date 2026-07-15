import React, { useState } from "react";
import sacredWheelImg from '../assets/images/opon_ifa_imponente_1782601626008.jpg';
import { 
  BookOpen, 
  Scroll,
  ChevronDown,
  ChevronUp, 
  Book, 
  FileText, 
  Flame, 
  HelpCircle, 
  Sparkles, 
  Eye, 
  Compass, 
  Layers, 
  Shield, 
  Binary, 
  Leaf, 
  Boxes, 
  Mic, 
  Music, 
  PlusCircle,
  Video,
  ClipboardList,
  Printer,
  Share2,
  Package,
  Coins,
  Calendar,
  User,
  LineChart,
  GitFork,
  Settings,
  Heart,
  Activity,
  History,
  Database,
  LogOut
} from "lucide-react";

interface SubModulesGridProps {
  onSelectAction: (id: string) => void;
}

export default function SubModulesGrid({ onSelectAction }: SubModulesGridProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // 5 quick actions in the row
  const fastActions = [
    { id: "opele", title: "Nova Consulta", desc: "Iniciar agora", icon: PlusCircle },
    { id: "sala-virtual", title: "Atendimento Online", desc: "Sala Virtual", icon: Video },
    { id: "ebo-sim", title: "Ebó Recomendado", desc: "Níveis de Ebó", icon: ClipboardList },
    { id: "imprimir", title: "Imprimir Consulta", desc: "Completa ou resumida", icon: Printer },
    { id: "compartilhar", title: "Compartilhar", desc: "WhatsApp, E-mail", icon: Share2 }
  ];

  // 8 columns representing the robust Priest Control Center
  const colConhecimento = [
    { id: "biblioteca-odus", title: "Biblioteca de Odus", desc: "256 Odus", icon: BookOpen },
    { id: "tratados", title: "Tratados & Textos", desc: "Mais de 50 textos", icon: Scroll },
    { id: "oracoes", title: "Orikis & Orações", desc: "Rezas e cânticos", icon: Book },
    { id: "dicionario", title: "Dicionário Yoruba", desc: "Mais de 70 verbetes", icon: FileText },
    { id: "study", title: "Modo de Estudo", desc: "Jogo educativo", icon: Flame },
    { id: "manual", title: "Manual do App", desc: "Guia completo", icon: HelpCircle }
  ];

  const colEsoterico = [
    { id: "oraculos", title: "Central Esotérica", desc: "14 ferramentas", icon: Sparkles },
    { id: "detector-iyami", title: "Detector Iyami", desc: "Energia das mães", icon: Eye },
    { id: "pressagios", title: "Leitor de Presságios", desc: "Base de presságios", icon: Compass },
    { id: "constelacao", title: "Mandala do Odu", desc: "Geometria sagrada", icon: Layers },
    { id: "bussola", title: "Bússola Sagrada", desc: "Direções espirituais", icon: Compass },
    { id: "lampadas", title: "Lâmpadas de Ifá", desc: "Velas de intenção", icon: Flame }
  ];

  const colMagiaRituais = [
    { id: "casa-ogun", title: "Casa de Ogún", desc: "Akósé, Òfò, Ìwòsàn...", icon: Shield },
    { id: "biblioteca-akose", title: "Biblioteca de Akose", desc: "Estudo de remédios", icon: BookOpen },
    { id: "ebo-sim", title: "Simulador de Ebós", desc: "Jogo de seleção", icon: Binary },
    { id: "ervas", title: "Ervas & Remédios", desc: "Identificador por IA", icon: Leaf },
    { id: "assentamentos", title: "Assentamentos", desc: "Guia & Catálogo", icon: Boxes },
    { id: "rpg", title: "Julgamento de Sàngó", desc: "Veredito divino", icon: Flame }
  ];

  const colVozSom = [
    { id: "voz", title: "Comandante de Voz", desc: "Assistente de voz", icon: Mic },
    { id: "sons", title: "Central de Sons", desc: "Todos os sons", icon: Music },
    { id: "canticos", title: "Cânticos de Ifá", desc: "Cânticos com síntese", icon: Scroll },
    { id: "sons-odus", title: "Sons dos Odus", desc: "Frequência 432Hz", icon: Music },
    { id: "misturador", title: "Misturador Natural", desc: "Chuva, vento, rio, fogo", icon: Music },
    { id: "pronuncia", title: "Guia de Pronúncia", desc: "Áudios de Odus e rezas", icon: Mic }
  ];

  const colGestao = [
    { id: "inventario", title: "Inventário de Insumos", desc: "Controle de materiais", icon: Package },
    { id: "financeiro", title: "Fluxo de Caixa", desc: "Entradas e despesas", icon: Coins },
    { id: "agenda", title: "Agenda Litúrgica", desc: "Festas e obrigações", icon: Calendar },
    { id: "fornecedores", title: "Fornecedores", desc: "Ervas, búzios e velas", icon: User },
    { id: "analytics", title: "Relatório de Atividades", desc: "Estatísticas do templo", icon: LineChart },
    { id: "linhagem", title: "Árvore de Axé", desc: "Linhagem e descendência", icon: GitFork }
  ];

  const colInterativos = [
    { id: "rpg", title: "História RPG Ifá", desc: "Jornada narrativa", icon: Sparkles },
    { id: "jogos", title: "Jogos & Desafios", desc: "Treino de Odu e búzios", icon: Flame },
    { id: "jardim", title: "Jardim de Osányìn", desc: "Cultivo virtual de ervas", icon: Leaf },
    { id: "ebo-interativo", title: "Ebó Interativo", desc: "Simulação de rituais", icon: Binary },
    { id: "mapa", title: "Mapa Yorubaland", desc: "Cidades sagradas", icon: Compass },
    { id: "oraculo-animal", title: "Oráculo Animal", desc: "Animais de poder Ifá", icon: Activity }
  ];

  const colOutras = [
    { id: "ebo-obi", title: "Ebó Obi", desc: "Consulta rápida com Obi", icon: Flame },
    { id: "oraculo-ibo", title: "Oráculo Ibo", desc: "Respostas diretas", icon: HelpCircle },
    { id: "preparacao", title: "Preparação de Banhos", desc: "Banhos de axé e ervas", icon: Activity },
    { id: "consulentes", title: "Consulentes", desc: "Cadastro e fichas de axé", icon: User },
    { id: "interpretacoes", title: "Interpretações Salvas", desc: "Diário de conselhos", icon: FileText },
    { id: "historico", title: "Histórico de Consultas", desc: "Consultas anteriores", icon: History }
  ];

  const colSistema = [
    { id: "configuracoes", title: "Configurações", desc: "Preferências e idioma", icon: Settings },
    { id: "perfil", title: "Perfil Sacerdotal", desc: "Seus dados de Olorixá", icon: User },
    { id: "assinatura", title: "Plano Premium", desc: "Acesso total ilimitado", icon: Heart },
    { id: "ajuda", title: "Ajuda & Suporte", desc: "Manual e central de ajuda", icon: HelpCircle },
    { id: "backup", title: "Exportar & Backup", desc: "Backup completo em nuvem", icon: Database },
    { id: "sair", title: "Sair do Sistema", desc: "Desconectar sessão", icon: LogOut }
  ];

  const modules = [
    { title: "Conhecimento", list: colConhecimento },
    { title: "Esotérico", list: colEsoterico },
    { title: "Magia e Rituais", list: colMagiaRituais },
    { title: "Voz & Som", list: colVozSom },
    { title: "Gestão do Templo", list: colGestao },
    { title: "Módulos Interativos", list: colInterativos },
    { title: "Outras Consultas", list: colOutras },
    { title: "Sistema & Suporte", list: colSistema }
  ];

  return (
    <div className="space-y-6 w-full">
      
      {/* 1. Header: CONSULTAS E AÇÕES RÁPIDAS */}
      <div className="flex items-center justify-between gap-4 py-2 my-1">
        <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
        <h3 className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#e2b963] uppercase text-center shrink-0">
          Painel de Ferramentas e Módulos do Sacerdote
        </h3>
        <span className="h-[1px] bg-[#c19a4d]/25 flex-1" />
      </div>

      {/* 2. Horizontal Fast Actions Bar */}
      <div className="bg-[#0c0a08]/90 border border-[#c19a4d]/20 rounded-2xl p-3.5 shadow-xl flex flex-wrap md:flex-nowrap items-center justify-around gap-4">
        {fastActions.map((act) => (
          <button
            key={act.id}
            onClick={() => onSelectAction(act.id)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl border border-[#c19a4d]/10 hover:border-[#dca34b]/40 bg-[#12100e]/60 hover:bg-[#1a1714] text-left transition-all group shrink-0"
          >
            <act.icon size={15} className="text-[#c19a4d] group-hover:text-[#dca34b] transition-colors" />
            <div className="leading-tight">
              <h4 className="text-[10px] font-bold text-[#f7e2af] font-cinzel tracking-wider group-hover:text-white transition-colors">
                {act.title}
              </h4>
              <p className="text-[8px] text-[#8b754e] group-hover:text-[#b49d79] transition-colors mt-0.5">
                {act.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Toggle Button for Advanced Modules */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#c19a4d]/30 bg-[#12100e] hover:bg-[#1a1714] hover:border-[#dca34b]/60 transition-all text-[#e2b963] group shadow-[0_0_15px_rgba(212,175,55,0.05)] relative z-20"
        >
          <Layers size={16} className="group-hover:text-[#f7e2af] transition-colors" />
          <span className="font-cinzel text-xs font-bold tracking-[0.1em] uppercase group-hover:text-white transition-colors">
            {showAdvanced ? "Ocultar Módulos Avançados" : "Explorar Módulos Avançados"}
          </span>
          {showAdvanced ? (
            <ChevronUp size={16} className="group-hover:text-[#f7e2af] transition-colors" />
          ) : (
            <ChevronDown size={16} className="group-hover:text-[#f7e2af] transition-colors" />
          )}
        </button>
      </div>

      {/* Dynamic Content Area: Video or Grid */}
      <div className="relative w-full">
        
        {/* Ambient Animated Logo (Visible when Grid is hidden) */}
        <div 
          className={`w-full overflow-hidden transition-all duration-1000 ease-in-out flex justify-center ${
            !showAdvanced ? "opacity-100 max-h-[800px] mt-8" : "opacity-0 max-h-0 mt-0"
          }`}
        >
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-square rounded-full relative flex items-center justify-center group animate-float">
             {/* Efeito de brilho pulsante no fundo */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_70%)] animate-pulse" />
             
             {/* Imagem com animação suave (respirar) */}
             <img 
                src={sacredWheelImg} 
                alt="Roda Sagrada de Ifá" 
                className="w-full h-full object-cover rounded-full transition-all duration-700 animate-breathe shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-[#c19a4d]/20 hover:shadow-[0_0_80px_rgba(212,175,55,0.4)] group-hover:scale-105"
             />
          </div>
        </div>

        {/* 3. 8-Column Grid of Modules - Responsive Layout (Toggled) */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 ease-in-out overflow-hidden ${
            showAdvanced ? "max-h-[3000px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
          }`}
        >
        {modules.map((mod, idx) => (
          <div 
            key={idx} 
            className="bg-[#0c0a08]/90 border border-[#c19a4d]/25 p-4 rounded-2xl shadow-xl space-y-3.5 relative group hover:border-[#dca34b]/40 transition-colors flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#c19a4d]/2 to-transparent pointer-events-none rounded-2xl" />
            <div className="relative z-10">
              <h4 className="text-[10px] tracking-widest font-bold text-[#dca34b] uppercase px-1 border-b border-[#c19a4d]/15 pb-2 flex items-center justify-between font-cinzel">
                <span>{mod.title}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#dca34b]" />
              </h4>
              <div className="space-y-1.5 mt-3.5">
                {mod.list.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectAction(item.id)}
                    className="w-full bg-[#12100e]/40 border border-[#c19a4d]/10 hover:border-[#dca34b]/40 p-2.5 rounded-xl text-left transition-all hover:bg-[#1a1714] flex items-center gap-3 group/btn"
                  >
                    <div className="w-6.5 h-6.5 rounded-lg bg-[#1c1611] border border-[#c19a4d]/15 flex items-center justify-center shrink-0 group-hover/btn:border-[#dca34b]/40 group-hover/btn:bg-[#251f16] transition-colors">
                      <item.icon size={12} className="text-[#c19a4d] group-hover/btn:text-[#dca34b] transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1 leading-tight">
                      <h5 className="text-[10px] font-bold text-[#f7e2af] group-hover/btn:text-white transition-colors truncate font-cinzel">
                        {item.title}
                      </h5>
                      <p className="text-[8px] text-[#8b754e] group-hover/btn:text-[#b49d79] transition-colors truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

    </div>
  );
}
