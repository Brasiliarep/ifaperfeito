import React, { useState, useEffect } from 'react';
import { AIInterpretation, OduInfo, SelectionMap } from '../types';
import { Printer, FileText, CheckSquare, Square, ChevronDown, ChevronUp, Share2, Mail, MessageCircle, X, Download, Copy, ShieldAlert, Users } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface PrintSettings {
  babalawo: {
    id: boolean;
    question: boolean;
    ibo: boolean;
    odu: boolean;
    itan: boolean;
    ewo: boolean;
    advice: boolean;
    orisha: boolean;
    ofo: boolean;
    ebo: boolean;
    areas: boolean; // Amor/Dinheiro/Saúde
    baths: boolean;
    obstacles: boolean;
    diet: boolean;
    summary: boolean;
    notes: boolean;
    checklist: boolean;
    interactive: boolean;
  };
  consulente: {
    date: boolean;
    question: boolean;
    ibo: boolean;
    odu: boolean;
    ewo: boolean;
    ebo: boolean;
    baths: boolean;
    summary: boolean;
    interactive: boolean;
  };
}

interface Props {
  data: AIInterpretation;
  oduInfo: OduInfo;
  selections: SelectionMap;
  notes: string;
  onClose: () => void;
  clientName?: string;
  interactiveQA?: { question: string, answer: string };
}

const PrintCenter: React.FC<Props> = ({ data, oduInfo, selections, notes, onClose, clientName, interactiveQA }) => {
  const [activeTab, setActiveTab] = useState<'babalawo' | 'consulente'>('babalawo');
  const [settings, setSettings] = useState<PrintSettings>({
    babalawo: {
      id: true, question: true, ibo: true, odu: true, itan: true, ewo: true,
      advice: true, orisha: true, ofo: true, ebo: true, areas: true,
      baths: true, obstacles: true, diet: true, summary: true, notes: true, checklist: true, interactive: true
    },
    consulente: {
      date: true, question: false, ibo: true, odu: true, ewo: true,
      ebo: true, baths: true, summary: true, interactive: true
    }
  });

  // Load settings from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('ifa_print_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load print settings", e);
      }
    }
  }, []);

  // Save settings when changed
  useEffect(() => {
    localStorage.setItem('ifa_print_settings', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (section: 'babalawo' | 'consulente', key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key as keyof typeof prev[typeof section]]
      }
    }));
  };

  const applyPreset = (section: 'babalawo' | 'consulente', type: 'full' | 'ebo' | 'budget') => {
    setSettings(prev => {
      const newSection: any = { ...prev[section] };
      
      // Reset all to false first
      Object.keys(newSection).forEach(k => {
        newSection[k] = false;
      });

      if (type === 'full') {
        Object.keys(newSection).forEach(k => {
           // Notes and checklist only for babalawo
           if (section === 'consulente' && (k === 'notes' || k === 'checklist')) return;
           newSection[k] = true;
        });
      } else if (type === 'ebo') {
        if (section === 'babalawo') {
           newSection.ebo = true;
           newSection.baths = true;
           newSection.ofo = true;
           newSection.diet = true;
        } else {
           newSection.ebo = true;
           newSection.baths = true;
           newSection.ewo = true;
        }
      } else if (type === 'budget') {
         // Budget logic would typically involve pricing, here we just select relevant sections for a proposal
         newSection.ebo = true;
         newSection.baths = true;
         if (section === 'babalawo') newSection.checklist = true;
      }

      return { ...prev, [section]: newSection };
    });
  };

  const generatePrintContent = () => {
    const isBabalawo = activeTab === 'babalawo';
    const cfg = isBabalawo ? settings.babalawo : settings.consulente;
    const dateStr = new Date().toLocaleString();

    let content = `
      <html>
      <head>
        <title>Impressão Ifá - ${oduInfo.name}</title>
        <style>
          body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1, h2, h3 { color: #8B4513; border-bottom: 1px solid #eee; padding-bottom: 10px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 25px; page-break-inside: avoid; }
          .label { font-weight: bold; color: #555; font-size: 0.9em; text-transform: uppercase; }
          .value { margin-top: 5px; }
          .warning { color: #d32f2f; font-weight: bold; }
          .success { color: #388e3c; font-weight: bold; }
          .yoruba { font-style: italic; color: #444; }
          .footer { margin-top: 50px; font-size: 0.8em; text-align: center; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
          .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 100px; color: rgba(0,0,0,0.03); z-index: -1; pointer-events: none; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="watermark">IFÁ OLUWO</div>
        
        <div class="header">
          <h1>${oduInfo.name}</h1>
          <p>${isBabalawo ? 'Registro Sacerdotal (Privado)' : 'Orientação ao Consulente'}</p>
          <p style="font-size: 0.9em;">${dateStr} • ${clientName || 'Consulente'}</p>
        </div>
    `;

    // --- SECTIONS ---

    if ((cfg as any).id || (cfg as any).date) {
      content += `
        <div class="section">
          <div class="label">Identificação</div>
          <div class="value">
            <strong>ID:</strong> ${crypto.randomUUID().slice(0, 8).toUpperCase()}<br>
            <strong>Data:</strong> ${dateStr}<br>
            <strong>Assinatura Digital:</strong> Ifá Oluwo System
          </div>
        </div>
      `;
    }

    if ((cfg as any).question) {
      content += `
        <div class="section">
          <div class="label">Pergunta / Questão</div>
          <div class="value">${data.summary || 'Consulta Geral'}</div>
        </div>
      `;
    }

    if ((cfg as any).ibo) {
      const isIre = data.ireOrOsogbo?.toLowerCase().includes('ire');
      content += `
        <div class="section">
          <div class="label">Ibó (Resultado do Oráculo)</div>
          <div class="value ${isIre ? 'success' : 'warning'}">
            ${data.ireOrOsogbo || 'Não especificado'}
          </div>
        </div>
      `;
    }

    if ((cfg as any).odu) {
      content += `
        <div class="section">
          <div class="label">Odu Revelado</div>
          <div class="value">
            <h3>${oduInfo.name}</h3>
            <p>${data.ireOsogboDescription || data.generalAdvice}</p>
          </div>
        </div>
      `;
    }

    if ((cfg as any).itan && isBabalawo) {
      content += `
        <div class="section">
          <div class="label">Itan (Lenda Sagrada)</div>
          <div class="value">${data.itan}</div>
        </div>
      `;
    }

    if ((cfg as any).orisha && isBabalawo) {
      content += `
        <div class="section">
          <div class="label">Orixá Regente</div>
          <div class="value">${data.rulingOrishas}</div>
        </div>
      `;
    }

    if ((cfg as any).ewo) {
      content += `
        <div class="section">
          <div class="label">Ewo (Interdições)</div>
          <div class="value">
            <p><strong>Dieta:</strong> ${data.diet.negative}</p>
            <p><strong>Vestuário:</strong> ${data.clothing.negative}</p>
            ${isBabalawo ? `<p><em>Motivo Espiritual: ${data.dangers}</em></p>` : ''}
          </div>
        </div>
      `;
    }

    if ((cfg as any).advice) {
      content += `
        <div class="section">
          <div class="label">Conselhos de Ifá</div>
          <div class="value">${data.generalAdvice}</div>
        </div>
      `;
    }

    if ((cfg as any).ofo && isBabalawo) {
      content += `
        <div class="section">
          <div class="label">Ofó (Encantamento)</div>
          <div class="value">
            <p class="yoruba">${data.chant.yoruba}</p>
            <p>${data.chant.translation}</p>
          </div>
        </div>
      `;
    }

    if ((cfg as any).ebo) {
      content += `
        <div class="section">
          <div class="label">Ebó e Soluções</div>
          <div class="value">
            <h4>Ebó Principal</h4>
            <ul>
              ${data.solutionsAndEbos.basic.ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
            <p><strong>Instruções:</strong> ${data.solutionsAndEbos.basic.instructions}</p>
          </div>
        </div>
      `;
    }

    if ((cfg as any).areas && isBabalawo) {
      content += `
        <div class="section">
          <div class="label">Áreas da Vida</div>
          <div class="value">
            <p><strong>Amor:</strong> ${data.love.analysis}</p>
            <p><strong>Dinheiro:</strong> ${data.finance.analysis}</p>
            <p><strong>Saúde:</strong> ${data.health.analysis}</p>
          </div>
        </div>
      `;
    }

    if ((cfg as any).baths) {
      content += `
        <div class="section">
          <div class="label">Banhos de Ervas</div>
          <div class="value">
            <p><strong>${data.herbalBaths.name}</strong></p>
            <p>${data.herbalBaths.preparation}</p>
            <ul>
              ${data.herbalBaths.ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    if ((cfg as any).obstacles && isBabalawo) {
      content += `
        <div class="section">
          <div class="label">Obstáculos e Perigos</div>
          <div class="value">${data.obstaclesAndEnemies}</div>
        </div>
      `;
    }

    if ((cfg as any).summary) {
      content += `
        <div class="section">
          <div class="label">Resumo Final</div>
          <div class="value">${data.summary}</div>
        </div>
      `;
    }

    if ((cfg as any).interactive && interactiveQA) {
      content += `
        <div class="section">
          <div class="label">Pergunta Específica (Oráculo Interativo)</div>
          <div class="value">
            <p><strong>P:</strong> ${interactiveQA.question}</p>
            <p><strong>R:</strong> ${interactiveQA.answer}</p>
          </div>
        </div>
      `;
    }

    if ((cfg as any).notes && isBabalawo && notes) {
      content += `
        <div class="section">
          <div class="label">Notas Internas (Privado)</div>
          <div class="value" style="background: #f9f9f9; padding: 10px; border-left: 3px solid #333;">${notes}</div>
        </div>
      `;
    }

    if ((cfg as any).checklist && isBabalawo) {
      content += `
        <div class="section">
          <div class="label">Checklist de Execução</div>
          <div class="value">
            <ul style="list-style-type: square;">
              <li>[ ] Materiais providenciados</li>
              <li>[ ] Ebó realizado</li>
              <li>[ ] Banhos entregues</li>
              <li>[ ] Retorno agendado</li>
            </ul>
          </div>
        </div>
      `;
    }

    content += `
        <div class="footer">
          Gerado por Ifá Oluwo System • ${new Date().getFullYear()}
        </div>
      </body>
      </html>
    `;

    return content;
  };

  const handlePrint = () => {
    const content = generatePrintContent();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleDownload = () => {
    const content = generatePrintContent();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ifa-Consulta-${oduInfo.name}-${new Date().toISOString().slice(0,10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = (method: 'whatsapp' | 'email') => {
    const text = `Consulta Ifá - ${oduInfo.name}\n\nResumo: ${data.summary}\n\nConselho: ${data.generalAdvice}`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      window.open(`mailto:?subject=Consulta Ifá - ${oduInfo.name}&body=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const renderCheckbox = (section: 'babalawo' | 'consulente', key: string, label: string) => (
    <div 
      onClick={() => toggleSetting(section, key)}
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
        (settings[section] as any)[key] 
          ? 'bg-ifa-gold/10 border-ifa-gold text-ifa-gold' 
          : 'bg-ifa-base-dark border-ifa-border text-ifa-neutral hover:border-ifa-neutral'
      }`}
    >
      {(settings[section] as any)[key] ? <CheckSquare size={18} /> : <Square size={18} />}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col animate-fade-in overflow-hidden">
      {/* HEADER */}
      <div className="bg-ifa-base border-b border-ifa-gold/30 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-ifa-gold text-black p-2 rounded-lg">
            <Printer size={24} />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-ifa-gold">Central de Impressão Oracular</h2>
            <p className="text-xs text-ifa-neutral uppercase tracking-widest">Gerenciamento de Documentos</p>
          </div>
        </div>
        <button onClick={onClose} className="text-ifa-neutral hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        
        {/* SIDEBAR / TABS */}
        <div className="w-full md:w-64 bg-ifa-base-dark border-r border-ifa-border flex flex-row md:flex-col">
          <button 
            onClick={() => setActiveTab('babalawo')}
            className={`flex-1 p-6 flex flex-col items-center gap-2 border-b md:border-b-0 md:border-r-4 transition-all ${
              activeTab === 'babalawo' 
                ? 'bg-ifa-gold/10 border-ifa-gold text-ifa-gold' 
                : 'border-transparent text-ifa-neutral hover:bg-white/5'
            }`}
          >
            <ShieldAlert size={24} />
            <span className="font-bold uppercase text-xs tracking-widest">Babalawo (Privado)</span>
          </button>
          <button 
            onClick={() => setActiveTab('consulente')}
            className={`flex-1 p-6 flex flex-col items-center gap-2 border-b md:border-b-0 md:border-r-4 transition-all ${
              activeTab === 'consulente' 
                ? 'bg-ifa-gold/10 border-ifa-gold text-ifa-gold' 
                : 'border-transparent text-ifa-neutral hover:bg-white/5'
            }`}
          >
            <Users size={24} />
            <span className="font-bold uppercase text-xs tracking-widest">Consulente (Público)</span>
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-grow p-6 overflow-y-auto bg-ifa-base">
          
          {/* ACTIONS TOOLBAR */}
          <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-ifa-border">
            <button onClick={handlePrint} className="bg-ifa-gold text-black px-6 py-3 rounded-lg font-bold uppercase text-sm flex items-center gap-2 hover:brightness-110 shadow-lg">
              <Printer size={18} /> Imprimir / PDF
            </button>
            <button onClick={handleDownload} className="bg-ifa-base-dark border border-ifa-gold text-ifa-gold px-6 py-3 rounded-lg font-bold uppercase text-sm flex items-center gap-2 hover:bg-ifa-gold/10 shadow-lg">
              <Download size={18} /> Baixar HTML
            </button>
            <div className="h-10 w-[1px] bg-ifa-border mx-2 hidden md:block"></div>
            <button onClick={() => applyPreset(activeTab, 'full')} className="bg-ifa-wood text-white px-4 py-3 rounded-lg font-bold text-xs uppercase hover:bg-ifa-wood/80">
              Completo
            </button>
            <button onClick={() => applyPreset(activeTab, 'ebo')} className="bg-ifa-wood text-white px-4 py-3 rounded-lg font-bold text-xs uppercase hover:bg-ifa-wood/80">
              Só Ebós
            </button>
            <button onClick={() => applyPreset(activeTab, 'budget')} className="bg-ifa-wood text-white px-4 py-3 rounded-lg font-bold text-xs uppercase hover:bg-ifa-wood/80">
              Orçamento
            </button>
            <div className="flex-grow"></div>
            <button onClick={() => handleShare('whatsapp')} className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-500"><MessageCircle size={18} /></button>
            <button onClick={() => handleShare('email')} className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-500"><Mail size={18} /></button>
          </div>

          {/* CHECKBOXES GRID */}
          <h3 className="text-ifa-gold font-serif font-bold text-lg mb-4 flex items-center gap-2">
            <CheckSquare size={20} /> Seções do Documento ({activeTab === 'babalawo' ? 'Uso Interno' : 'Para Entrega'})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeTab === 'babalawo' ? (
              <>
                {renderCheckbox('babalawo', 'id', 'Identificação (ID/Data)')}
                {renderCheckbox('babalawo', 'question', 'Pergunta Completa')}
                {renderCheckbox('babalawo', 'ibo', 'Ibó (Resultado Técnico)')}
                {renderCheckbox('babalawo', 'odu', 'Odù Detalhado')}
                {renderCheckbox('babalawo', 'itan', 'Itan (Lenda)')}
                {renderCheckbox('babalawo', 'ewo', 'Ewo + Motivos')}
                {renderCheckbox('babalawo', 'advice', 'Conselhos')}
                {renderCheckbox('babalawo', 'orisha', 'Orixá Regente')}
                {renderCheckbox('babalawo', 'ofo', 'Ofó (Reza + Tradução)')}
                {renderCheckbox('babalawo', 'ebo', 'Ebó Principal (Completo)')}
                {renderCheckbox('babalawo', 'areas', 'Amor / Dinheiro / Saúde')}
                {renderCheckbox('babalawo', 'baths', 'Banhos')}
                {renderCheckbox('babalawo', 'obstacles', 'Obstáculos e Perigos')}
                {renderCheckbox('babalawo', 'diet', 'Dieta e Roupas')}
                {renderCheckbox('babalawo', 'summary', 'Resumo Final')}
                {renderCheckbox('babalawo', 'notes', 'Notas Internas (Privado)')}
                {renderCheckbox('babalawo', 'interactive', 'Pergunta Específica (Oráculo)')}
                {renderCheckbox('babalawo', 'checklist', 'Checklist de Execução')}
              </>
            ) : (
              <>
                {renderCheckbox('consulente', 'date', 'Data e Hora')}
                {renderCheckbox('consulente', 'question', 'Pergunta (Opcional)')}
                {renderCheckbox('consulente', 'ibo', 'Resultado do Ibó (Simples)')}
                {renderCheckbox('consulente', 'odu', 'Odù + Interpretação')}
                {renderCheckbox('consulente', 'ewo', 'Ewo + Recomendações')}
                {renderCheckbox('consulente', 'ebo', 'Ebó/Solução (Instruções)')}
                {renderCheckbox('consulente', 'baths', 'Banhos')}
                {renderCheckbox('consulente', 'interactive', 'Pergunta Específica (Oráculo)')}
                {renderCheckbox('consulente', 'summary', 'Resumo e Próximos Passos')}
              </>
            )}
          </div>

          <div className="mt-8 p-4 bg-ifa-gold/5 border border-ifa-gold/20 rounded-lg text-xs text-ifa-neutral italic text-center">
            * As configurações de impressão são salvas automaticamente para futuras consultas.
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrintCenter;
