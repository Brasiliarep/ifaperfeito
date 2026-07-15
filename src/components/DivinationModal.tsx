import React, { useState } from "react";
import { X, Sparkles, Compass, HelpCircle, ArrowRight, Loader2, Play } from "lucide-react";
import { DivinationResult } from "../types";

interface DivinationModalProps {
  method: string | null;
  onClose: () => void;
}

export default function DivinationModal({ method, onClose }: DivinationModalProps) {
  const [question, setQuestion] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(method || "opele");
  const [loading, setLoading] = useState(false);
  const [castingStage, setCastingStage] = useState<string | null>(null);
  const [result, setResult] = useState<DivinationResult | null>(null);

  const handleCast = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Dynamic animation stages to build anticipation!
    const stages = [
      "Concentrando energias no Ori...",
      "Invocando os Oris e os Orixás...",
      "Soprando o pó sagrado de Ierosun...",
      "Lançando os oráculos sagrados..."
    ];

    for (let i = 0; i < stages.length; i++) {
      setCastingStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const response = await fetch("/api/divinate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: selectedMethod, question })
      });

      if (!response.ok) {
        throw new Error("Falha na consulta divina.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setResult({
        success: true,
        odu: { name: "Èjì Ogbè", description: "O Odu do começo, da sabedoria pura e do progresso espiritual." },
        resultDetails: { name: "Opelé Ifá" },
        interpretation: "As correntes cósmicas se movem em harmonia com os seus desejos legítimos. Mantenha os pensamentos alinhados com o bem."
      });
    } finally {
      setLoading(false);
      setCastingStage(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        id="divination-modal"
        className="bg-[#0e0c0a] border border-[#c19a4d]/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="border-b border-[#c19a4d]/20 px-6 py-4 flex items-center justify-between bg-[#15120e]">
          <div className="flex items-center gap-2.5">
            <Sparkles size={18} className="text-[#dca34b]" />
            <div>
              <h3 className="font-cinzel text-md font-bold tracking-widest text-[#f7e2af]">
                Divinação Sagrada
              </h3>
              <p className="text-[10px] text-[#8b754e] font-sans uppercase tracking-wider mt-0.5">
                Consulta Espiritual & Conexão Cósmica
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#a88e5d] hover:text-[#f3eee3] p-1 rounded-full hover:bg-[#c19a4d]/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!result && !loading && (
            <form onSubmit={handleCast} className="space-y-6">
              {/* Method Selector Tabs */}
              <div>
                <label className="block text-xs font-semibold text-[#8b754e] uppercase tracking-wider mb-2.5">
                  Selecione o Instrumento Divinatório
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "opele", name: "Opelé Ifá", desc: "Corrente de 8 sementes" },
                    { id: "opon", name: "Opon Ifá", desc: "Tabuleiro Sagrado" },
                    { id: "ikin", name: "Ikin Ifá", desc: "16 Sementes de Dendê" },
                    { id: "merindilogun", name: "Búzios", desc: "16 Conchas Sagradas" }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedMethod === m.id
                          ? "bg-[#c19a4d]/15 border-[#dca34b] shadow-[0_0_15px_rgba(212,175,55,0.08)]"
                          : "bg-[#12100e] border-[#c19a4d]/10 hover:border-[#c19a4d]/30"
                      }`}
                    >
                      <h4 className={`text-xs font-bold ${selectedMethod === m.id ? "text-[#f7e2af]" : "text-[#a88e5d]"}`}>
                        {m.name}
                      </h4>
                      <p className="text-[9px] text-[#8b754e] mt-1 leading-tight">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Input */}
              <div>
                <label className="block text-xs font-semibold text-[#8b754e] uppercase tracking-wider mb-2.5">
                  Mentalize sua pergunta ou dilema
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex: Como posso me alinhar melhor com a minha prosperidade financeira e caminhos profissionais?"
                  required
                  rows={4}
                  className="w-full bg-[#12100e] border border-[#c19a4d]/20 rounded-xl px-4 py-3 text-sm text-[#f3eee3] placeholder-[#8b754e]/60 focus:outline-none focus:border-[#dca34b] transition-all resize-none"
                />
                <p className="text-[10px] text-[#8b754e]/80 mt-2 leading-relaxed">
                  * A consulta exige silêncio interior, sinceridade e respeito aos ensinamentos sagrados dos Odus.
                </p>
              </div>

              {/* Submit Cast */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#b46b1f] via-[#dca34b] to-[#b46b1f] text-black font-cinzel font-bold text-xs tracking-widest py-3.5 px-6 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(220,163,75,0.2)]"
              >
                <span>Realizar Lançamento Sagrado</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* Casting / Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <Loader2 size={48} className="text-[#dca34b] animate-spin" />
                <Sparkles size={16} className="text-[#f7e2af] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
              </div>
              <div className="text-center space-y-1.5">
                <h4 className="text-sm font-bold text-[#f7e2af] font-cinzel tracking-wider uppercase animate-pulse">
                  {castingStage}
                </h4>
                <p className="text-[10px] text-[#8b754e] uppercase tracking-widest">
                  Processando vibrações energéticas
                </p>
              </div>
            </div>
          )}

          {/* Results State */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Odu Title Card */}
              <div className="bg-gradient-to-r from-[#201912] to-[#12100e] border border-[#dca34b]/35 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-5 justify-between">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[9px] font-bold text-[#dca34b] uppercase tracking-widest bg-[#3a2c16] px-2 py-0.5 rounded border border-[#c19a4d]/20">
                    Odu Revelado
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-[#f7e2af] tracking-widest mt-1">
                    {result.odu.name}
                  </h3>
                  <p className="text-xs text-[#b49d79] max-w-md">{result.odu.description}</p>
                </div>

                {/* Opelé Binary Seeds visual if Opelé was cast */}
                {result.resultDetails && result.resultDetails.left && result.resultDetails.right && (
                  <div className="flex items-center gap-4 bg-[#0a0807] p-3 rounded-xl border border-[#c19a4d]/10 shrink-0">
                    {/* Left chain */}
                    <div className="flex flex-col gap-1.5">
                      {result.resultDetails.left.map((val, idx) => (
                        <div 
                          key={`l-${idx}`}
                          className={`w-3.5 h-3.5 rounded-full border-2 ${
                            val === 1 
                              ? "bg-gradient-to-tr from-[#96501a] to-[#f7e2af] border-[#f7e2af] shadow-[0_0_8px_rgba(247,226,175,0.4)]" 
                              : "bg-[#181614] border-[#8b754e]/50"
                          }`}
                        />
                      ))}
                    </div>
                    {/* Chain line divider */}
                    <div className="w-[1px] h-16 bg-[#c19a4d]/20" />
                    {/* Right chain */}
                    <div className="flex flex-col gap-1.5">
                      {result.resultDetails.right.map((val, idx) => (
                        <div 
                          key={`r-${idx}`}
                          className={`w-3.5 h-3.5 rounded-full border-2 ${
                            val === 1 
                              ? "bg-gradient-to-tr from-[#96501a] to-[#f7e2af] border-[#f7e2af] shadow-[0_0_8px_rgba(247,226,175,0.4)]" 
                              : "bg-[#181614] border-[#8b754e]/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Búzios visual */}
                {result.resultDetails && result.resultDetails.shells && (
                  <div className="flex flex-wrap gap-1.5 w-32 items-center justify-center p-3 bg-[#0a0807] rounded-xl border border-[#c19a4d]/10 shrink-0">
                    {result.resultDetails.shells.map((val, idx) => (
                      <div 
                        key={idx}
                        className={`w-3.5 h-5 rounded-md border transform rotate-12 flex items-center justify-center ${
                          val === 1
                            ? "bg-[#ecc67d] border-[#f7e2af] shadow-[0_0_5px_rgba(236,198,125,0.3)]"
                            : "bg-[#1e1b18] border-[#8b754e]/30"
                        }`}
                      >
                        <div className="w-[2px] h-3 bg-[#3a3225] rounded-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Interpretation Output */}
              <div className="bg-[#12100e] border border-[#c19a4d]/15 p-5 rounded-xl space-y-4 text-sm leading-relaxed text-[#f3eee3] font-sans max-h-80 overflow-y-auto pr-2">
                {result.interpretation.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("###") || paragraph.startsWith("##")) {
                    const cleanTitle = paragraph.replace(/^###?\s*/, "");
                    return (
                      <h4 key={index} className="text-xs font-bold text-[#dca34b] font-cinzel tracking-wider uppercase border-b border-[#c19a4d]/15 pb-1.5 mt-4">
                        {cleanTitle}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith("*") || paragraph.startsWith("-")) {
                    const items = paragraph.split("\n");
                    return (
                      <ul key={index} className="list-disc list-inside space-y-1.5 text-xs text-[#b49d79]">
                        {items.map((item, key) => (
                          <li key={key} className="pl-1">
                            {item.replace(/^[\*\-]\s*/, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-xs text-[#b49d79] tracking-normal leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Consultation Question recall footer */}
              <div className="text-[10px] text-[#8b754e] italic px-1">
                Consulta mentalizada: &ldquo;{question || "Direcionamento espiritual geral"}&rdquo;
              </div>

              {/* Reset to cast again */}
              <button
                onClick={() => {
                  setResult(null);
                  setQuestion("");
                }}
                className="w-full bg-[#1a1714] border border-[#c19a4d]/30 text-[#f7e2af] font-cinzel font-bold text-[10px] tracking-widest py-3 rounded-xl hover:bg-[#c19a4d]/10 transition-colors"
              >
                Efetuar Novo Lançamento Espiritual
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
