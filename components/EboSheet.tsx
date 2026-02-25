
/**
 * EboSheet — Modal de Ebó Completo com Orçamento Editável
 *
 * MODO VIEW: Mostra materiais, passos, Ofó, orçamento total, botões de ação.
 * MODO ORÇAMENTO: Edita qtd, preço unitário e visibilidade de cada item/seção.
 * PRINT/SHARE: Só inclui itens/seções marcados como visíveis.
 */

import React, { useState, useEffect } from 'react';
import {
    X, ShoppingCart, ListOrdered, BookOpen, DollarSign,
    MessageCircle, Mail, Printer, Loader2, Info,
    Edit3, Save, Eye, EyeOff, ChevronLeft, Package, Lock
} from 'lucide-react';
import type { FullEbo } from '../services/geminiService';

// ─── TIPOS ───────────────────────────────────────────────────────────────────

interface MaterialItem {
    label: string;
    qty: number;
    unitPrice: number;
    visible: boolean; // se false → não aparece em print/share
}

interface SectionVisibility {
    passos: boolean;
    ofo: boolean;
    observacoes: boolean;
    orcamento: boolean;
}

interface EboSheetProps {
    ebo: FullEbo;
    isLoading?: boolean;
    onClose: () => void;
    clientName?: string;
    initialPreset?: 'babalawo' | 'consulente';
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const EboSheet: React.FC<EboSheetProps> = ({ ebo, isLoading, onClose, clientName, initialPreset }) => {

    const [mode, setMode] = useState<'view' | 'orcamento'>('view');

    // Material rows with price/qty/visibility
    const [items, setItems] = useState<MaterialItem[]>([]);
    const [secVis, setSecVis] = useState<SectionVisibility>({
        passos: true, ofo: true, observacoes: true, orcamento: true
    });

    // Apply preset if provided
    useEffect(() => {
        if (initialPreset === 'consulente') {
            setSecVis({ passos: false, ofo: false, observacoes: false, orcamento: true });
        } else if (initialPreset === 'babalawo') {
            setSecVis({ passos: true, ofo: true, observacoes: true, orcamento: true });
        }
    }, [initialPreset]);

    // Initialize items from ebo when ebo loads
    useEffect(() => {
        if (ebo && ebo.materiais.length > 0) {
            setItems(ebo.materiais.map(m => ({
                label: m,
                qty: 1,
                unitPrice: Math.round(ebo.orcamento_estimado / Math.max(ebo.materiais.length, 1)),
                visible: true,
            })));
        }
    }, [ebo]);

    // ─── TOTALS ─────────────────────────────────────────────────────────────
    const total = items.reduce((acc, itm) => acc + itm.qty * itm.unitPrice, 0);
    const visibleItems = items.filter(i => i.visible);

    // ─── SHARE BUILDERS ─────────────────────────────────────────────────────
    const buildShareText = () => {
        const lines: string[] = [
            `🌿 *${ebo.titulo}*`,
            `Orixá: ${ebo.orixaRegente}`,
            clientName ? `👤 Cliente: ${clientName}` : '',
            '',
            '📦 *MATERIAIS:*',
            ...visibleItems.map((m, i) => `${i + 1}. ${m.label}${m.qty > 1 ? ` (x${m.qty})` : ''}`),
        ];
        if (secVis.passos) {
            lines.push('', '📋 *PREPARO:*', ...ebo.passos);
        }
        if (secVis.ofo) {
            lines.push('', `🔊 *OFÓ (Iorubá):* ${ebo.ofo}`, `📖 *(Tradução):* ${ebo.ofo_traducao}`);
        }
        if (secVis.observacoes && ebo.observacoes) {
            lines.push('', `ℹ️ ${ebo.observacoes}`);
        }
        if (secVis.orcamento) {
            lines.push('', `💰 *Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*`);
        }
        lines.push('', `🕐 ${new Date().toLocaleString('pt-BR')}`);
        return lines.filter(Boolean).join('\n');
    };

    const handleWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(buildShareText())}`, '_blank');
    const handleEmail = () => {
        const body = encodeURIComponent(buildShareText());
        window.open(`mailto:?subject=${encodeURIComponent(ebo.titulo)}&body=${body}`, '_blank');
    };

    const handlePrint = () => {
        const materiaisHTML = visibleItems.map((m, i) =>
            `<div class="material"><span class="num">${i + 1}.</span> ${m.label}${m.qty > 1 ? ` <em>(x${m.qty})</em>` : ''}</div>`
        ).join('');

        const content = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${ebo.titulo}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital@0;1&display=swap');
    body { font-family: 'Crimson Text', Georgia, serif; max-width: 720px; margin: 0 auto; padding: 28px 32px; color: #1a1a1a; }
    h1 { font-size: 24px; border-bottom: 2px solid #8B6914; padding-bottom: 10px; color: #3d2b00; margin-bottom: 4px; }
    .subtitle { font-size: 13px; color: #8B6914; margin-bottom: 16px; }
    h2 { font-size: 15px; color: #5a3e00; margin-top: 20px; margin-bottom: 8px; letter-spacing: .5px; }
    .material { padding: 4px 0 4px 16px; border-bottom: 1px dotted #ddd; font-size: 14px; }
    .material .num { font-weight: bold; color: #8B6914; }
    .passo { padding: 5px 0 5px 16px; border-bottom: 1px solid #eee; font-size: 14px; line-height: 1.5; }
    .ofo { background: #fef9e7; border-left: 4px solid #c9a227; padding: 14px 16px; margin: 12px 0; border-radius: 4px; }
    .ofo p { margin: 4px 0; font-size: 14px; }
    .ofo .yoruba { font-style: italic; font-weight: bold; }
    .orcamento { background: #f0fdf4; border: 1px solid #22c55e; padding: 12px 16px; border-radius: 6px; font-weight: bold; font-size: 20px; color: #166534; text-align: center; }
    .obs { background: #fef2f2; border: 1px solid #fca5a5; padding: 10px 14px; border-radius: 6px; font-size: 13px; }
    footer { margin-top: 28px; font-size: 11px; color: #888; border-top: 1px solid #ddd; padding-top: 8px; text-align: center; }
  </style>
</head>
<body>
  <h1>🌿 ${ebo.titulo}</h1>
  <p class="subtitle">Orixá Regente: <strong>${ebo.orixaRegente}</strong>${clientName ? ` &nbsp;|&nbsp; Cliente: <strong>${clientName}</strong>` : ''}</p>
  <h2>📦 Materiais</h2>
  ${materiaisHTML || '<p><em>(oculto)</em></p>'}
  ${secVis.passos ? `<h2>📋 Modo de Preparo</h2>${ebo.passos.map(p => `<div class="passo">${p}</div>`).join('')}` : ''}
  ${secVis.ofo ? `<h2>🔊 Ofó</h2><div class="ofo"><p class="yoruba">${ebo.ofo}</p><p>${ebo.ofo_traducao}</p></div>` : ''}
  ${secVis.observacoes && ebo.observacoes ? `<h2>ℹ️ Observações</h2><div class="obs">${ebo.observacoes}</div>` : ''}
  ${secVis.orcamento ? `<h2>💰 Total</h2><div class="orcamento">R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>` : ''}
  <footer>IFÁ OLUWO · Gerado em ${new Date().toLocaleString('pt-BR')}</footer>
</body></html>`;
        const win = window.open('', '_blank');
        if (win) { win.document.write(content); win.document.close(); win.print(); }
    };

    // ─── ITEM EDIT HELPERS ───────────────────────────────────────────────────
    const updateItem = (index: number, field: keyof MaterialItem, value: any) => {
        setItems(prev => prev.map((itm, i) => i === index ? { ...itm, [field]: value } : itm));
    };

    // ─── VIEW MODE ───────────────────────────────────────────────────────────
    const renderView = () => (
        <>
            {/* Materiais */}
            <section>
                <h3 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    <ShoppingCart size={13} /> Materiais ({visibleItems.length})
                </h3>
                <div className="bg-black/30 border border-gray-800 rounded-xl divide-y divide-gray-800">
                    {visibleItems.map((m, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-2.5">
                            <span className="text-ifa-gold font-bold text-sm w-5 flex-shrink-0">{i + 1}.</span>
                            <span className="text-gray-200 text-sm flex-1">{m.label}</span>
                            {m.qty > 1 && <span className="text-gray-500 text-xs self-center">×{m.qty}</span>}
                        </div>
                    ))}
                    {visibleItems.length === 0 && (
                        <p className="text-gray-600 text-xs text-center py-4 italic">(todos os materiais marcados como sigilosos)</p>
                    )}
                </div>
            </section>

            {/* Passos */}
            {secVis.passos && (
                <section>
                    <h3 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        <ListOrdered size={13} /> Modo de Preparo
                    </h3>
                    <div className="space-y-2">
                        {ebo.passos.map((p, i) => (
                            <div key={i} className="bg-gradient-to-r from-amber-950/30 to-transparent border border-amber-900/30 rounded-lg px-4 py-3">
                                <p className="text-gray-200 text-sm leading-relaxed">{p}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Ofó */}
            {secVis.ofo && (
                <section>
                    <h3 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        <BookOpen size={13} /> Ofó (Reza Sagrada)
                    </h3>
                    <div className="bg-yellow-950/30 border border-yellow-700/40 rounded-xl p-4 space-y-2">
                        <p className="text-yellow-200 font-semibold text-sm italic">{ebo.ofo}</p>
                        <p className="text-gray-400 text-xs leading-relaxed border-t border-yellow-800/30 pt-2">{ebo.ofo_traducao}</p>
                    </div>
                </section>
            )}

            {/* Observações */}
            {secVis.observacoes && ebo.observacoes && (
                <section>
                    <div className="bg-blue-950/20 border border-blue-700/30 rounded-xl p-4 flex gap-3">
                        <Info size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm leading-relaxed">{ebo.observacoes}</p>
                    </div>
                </section>
            )}

            {/* Total */}
            {secVis.orcamento && (
                <section>
                    <div className="bg-green-950/30 border border-green-700/40 rounded-xl p-4 text-center">
                        <p className="text-gray-400 text-xs uppercase mb-1">Total dos Materiais</p>
                        <p className="text-green-300 text-3xl font-bold">
                            R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-gray-600 text-[10px] mt-1">* Honorários do Babalawo à parte</p>
                    </div>
                </section>
            )}
        </>
    );

    // ─── ORÇAMENTO EDIT MODE ─────────────────────────────────────────────────
    const renderOrcamento = () => (
        <>
            <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-3 mb-4 flex gap-2">
                <Lock size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-200 text-xs leading-relaxed">
                    Itens desmarcados (<EyeOff size={11} className="inline" />) <strong>não aparecem</strong> no print, WhatsApp ou e-mail — são segredos do Babalawo.
                </p>
            </div>

            {/* Seções visíveis toggle */}
            <section className="mb-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Seções visíveis no print/share</h3>
                <div className="grid grid-cols-2 gap-2">
                    {([
                        { key: 'passos', label: 'Modo de Preparo' },
                        { key: 'ofo', label: 'Ofó (Reza)' },
                        { key: 'observacoes', label: 'Observações' },
                        { key: 'orcamento', label: 'Total / Orçamento' },
                    ] as { key: keyof SectionVisibility; label: string }[]).map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setSecVis(prev => ({ ...prev, [key]: !prev[key] }))}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${secVis[key]
                                ? 'bg-green-900/30 border-green-600/40 text-green-300'
                                : 'bg-gray-900/40 border-gray-700 text-gray-500'
                                }`}
                        >
                            {secVis[key] ? <Eye size={12} /> : <EyeOff size={12} />}
                            {label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Items table */}
            <section>
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Materiais — Qtd · Preço Unit. · Visível
                </h3>
                <div className="space-y-2">
                    {items.map((itm, i) => (
                        <div key={i} className={`rounded-lg border px-3 py-2.5 transition-colors ${itm.visible ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-950/30 border-gray-800 opacity-60'
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <button
                                    onClick={() => updateItem(i, 'visible', !itm.visible)}
                                    className={`flex-shrink-0 p-1 rounded transition-colors ${itm.visible ? 'text-green-400' : 'text-gray-600'}`}
                                >
                                    {itm.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                                </button>
                                <span className={`text-xs flex-1 leading-tight ${itm.visible ? 'text-gray-200' : 'text-gray-600 line-through'}`}>
                                    {itm.label}
                                </span>
                            </div>
                            {itm.visible && (
                                <div className="flex gap-2 ml-6">
                                    <div className="flex-1">
                                        <label className="text-[9px] text-gray-600 uppercase">Qtd</label>
                                        <input
                                            type="number" min={1} max={99}
                                            value={itm.qty}
                                            onChange={e => updateItem(i, 'qty', Math.max(1, Number(e.target.value)))}
                                            className="w-full bg-black/40 border border-gray-700 rounded px-2 py-1 text-white text-xs text-center"
                                        />
                                    </div>
                                    <div className="flex-[2]">
                                        <label className="text-[9px] text-gray-600 uppercase">Preço unit. (R$)</label>
                                        <input
                                            type="number" min={0} step={0.5}
                                            value={itm.unitPrice}
                                            onChange={e => updateItem(i, 'unitPrice', Math.max(0, Number(e.target.value)))}
                                            className="w-full bg-black/40 border border-gray-700 rounded px-2 py-1 text-white text-xs text-center"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <label className="text-[9px] text-gray-600 uppercase">Subtotal</label>
                                        <div className="flex items-center h-[26px] px-1 text-ifa-gold text-xs font-bold">
                                            R${(itm.qty * itm.unitPrice).toFixed(0)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Running total */}
            <div className="bg-green-950/30 border border-green-700/40 rounded-xl p-3 text-center mt-4">
                <p className="text-gray-400 text-xs">Total calculado</p>
                <p className="text-green-300 text-2xl font-bold">
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
            </div>

            {/* Salvar */}
            <button
                onClick={() => setMode('view')}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-ifa-gold text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
                <Save size={16} /> Salvar e Voltar
            </button>
        </>
    );

    // ─── RENDER ──────────────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="bg-[#0f0a05] border border-ifa-gold/30 rounded-t-3xl md:rounded-2xl w-full md:max-w-2xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-ifa-gold/20 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {mode === 'orcamento' && (
                            <button onClick={() => setMode('view')} className="text-gray-400 hover:text-white">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                {mode === 'view' ? 'Ebó Completo' : '✏️ Editar Orçamento'}
                            </p>
                            <h2 className="text-ifa-gold font-serif font-bold text-base leading-tight">{ebo.titulo}</h2>
                            {mode === 'view' && (
                                <p className="text-xs text-gray-400 mt-0.5">Orixá: <span className="text-amber-400">{ebo.orixaRegente}</span></p>
                            )}
                        </div>
                    </div>
                    {mode === 'view' && (
                        <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors">
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Loader2 className="animate-spin text-ifa-gold mb-4" size={40} />
                            <p className="text-ifa-gold font-bold animate-pulse">Orunmila está prescrevendo o Ebó...</p>
                            <p className="text-gray-500 text-xs mt-2">Consultando a tradição de Ifá</p>
                        </div>
                    ) : mode === 'view' ? renderView() : renderOrcamento()}
                </div>

                {/* Footer Action Buttons — only in view mode */}
                {!isLoading && mode === 'view' && (
                    <div className="flex-shrink-0 border-t border-gray-800 px-5 py-4 space-y-3">
                        {/* Orçamento button */}
                        <button
                            onClick={() => setMode('orcamento')}
                            className="w-full flex items-center justify-center gap-2 bg-amber-900/30 hover:bg-amber-900/50 border border-amber-700/50 rounded-xl py-2.5 transition-colors"
                        >
                            <Package size={16} className="text-amber-400" />
                            <span className="text-amber-300 text-sm font-bold">Orçamento</span>
                            <span className="text-amber-600 text-xs ml-1">(editar preços, qtd e privacidade)</span>
                        </button>
                        {/* Share buttons */}
                        <div className="grid grid-cols-3 gap-3">
                            <button onClick={handleWhatsApp} className="flex flex-col items-center gap-1 bg-green-900/40 hover:bg-green-900/70 border border-green-700/50 rounded-xl py-3 transition-colors">
                                <MessageCircle size={20} className="text-green-400" />
                                <span className="text-green-300 text-xs font-bold">WhatsApp</span>
                            </button>
                            <button onClick={handleEmail} className="flex flex-col items-center gap-1 bg-blue-900/40 hover:bg-blue-900/70 border border-blue-700/50 rounded-xl py-3 transition-colors">
                                <Mail size={20} className="text-blue-400" />
                                <span className="text-blue-300 text-xs font-bold">E-mail</span>
                            </button>
                            <button onClick={handlePrint} className="flex flex-col items-center gap-1 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-600/50 rounded-xl py-3 transition-colors">
                                <Printer size={20} className="text-gray-300" />
                                <span className="text-gray-300 text-xs font-bold">Imprimir</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EboSheet;
