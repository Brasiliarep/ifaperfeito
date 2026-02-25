
import React, { useState } from 'react';
import { ArrowLeft, Scale, Gavel, ShieldAlert, AlertTriangle, Loader2, Quote, Zap, BookOpen, MessageCircle, Printer, Share2 } from 'lucide-react';
import EboSelector from './EboSelector';
import { EboSelectionType, SangoJusticeResult } from '../types';
import { askSangoJustice } from '../services/geminiService';

const SangoWheel = ({ onBack }: { onBack: () => void }) => {
    const [form, setForm] = useState({
        myName: '',
        opponent: '',
        caseNumber: '',
        details: '',
        motherName: '',
        birthDate: '',
        region: ''
    });
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<SangoJusticeResult | null>(null);
    const [selection, setSelection] = useState<EboSelectionType>('none');

    const handleCast = async () => {
        if (!form.myName || !form.details) return;
        setIsSpinning(true);
        setSelection('none');

        try {
            const data = await askSangoJustice(form.myName, form.opponent, form.details, {
                motherName: form.motherName,
                birthDate: form.birthDate,
                caseNumber: form.caseNumber,
                region: form.region
            });
            setResult(data);
        } catch (error) {
            alert("Erro ao consultar Xangô. Tente novamente.");
        } finally {
            setIsSpinning(false);
        }
    };

    const reset = () => {
        setResult(null);
        setForm({
            myName: '',
            opponent: '',
            caseNumber: '',
            details: '',
            motherName: '',
            birthDate: '',
            region: ''
        });
    };

    const generateSangoPrintContent = (mode: 'babalawo' | 'consulente') => {
        if (!result) return "";
        const dateStr = new Date().toLocaleString();
        const isBabalawo = mode === 'babalawo';

        return `
          <html>
          <head>
            <title>Veredito de Xangô - ${isBabalawo ? 'REGISTRO SACERDOTAL' : 'CONSULTA'}</title>
            <style>
              body { font-family: 'Georgia', serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 0 auto; padding: 40px; background: white; }
              .header { text-align: center; border-bottom: 3px double #d4af37; padding-bottom: 20px; margin-bottom: 30px; }
              .header h1 { color: #b91c1c; margin: 0; font-size: 32px; text-transform: uppercase; }
              .header p { margin: 5px 0 0; color: #666; font-size: 14px; font-weight: bold; }
              .section { margin-bottom: 30px; }
              .label { font-size: 12px; font-weight: bold; color: #7f1d1d; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; border-bottom: 1px solid #fee2e2; display: block; }
              .value { font-size: 18px; color: #000; }
              .adu-name { font-size: 48px; text-align: center; margin: 20px 0; color: #111; font-family: serif; }
              .advice-box { background: #fffcf0; border: 1px solid #d4af37; padding: 25px; border-radius: 8px; font-style: italic; font-size: 20px; text-align: center; margin: 20px 0; }
              .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; }
              .ritual-item { background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; }
              .private-tag { background: #000; color: #fff; padding: 5px 10px; font-size: 10px; font-weight: bold; border-radius: 4px; display: inline-block; margin-bottom: 10px; }
              .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
              @media print {
                body { padding: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <p>TRIBUNAL SUPREMO DE OBA KOSO</p>
              <h1>Veredito de Justiça</h1>
              <p>${dateStr}</p>
            </div>

            ${isBabalawo ? '<div class="private-tag">REGISTRO PRIVADO DO BABALAWO - SIGILO RITUALÍSTICO</div>' : ''}

            <div class="section">
              <div class="label">Partes Envolvidas</div>
              <div class="value">
                <strong>Requerente:</strong> ${form.myName}<br>
                ${form.motherName ? `<strong>Mãe:</strong> ${form.motherName}<br>` : ''}
                ${form.birthDate ? `<strong>Nascimento:</strong> ${form.birthDate}<br>` : ''}
                ${form.opponent ? `<strong>Requerido:</strong> ${form.opponent}<br>` : ''}
                ${form.caseNumber ? `<strong>Nº Processo:</strong> ${form.caseNumber}<br>` : ''}
                ${form.region ? `<strong>Região:</strong> ${form.region}<br>` : ''}
              </div>
            </div>

            <div class="adu-name">${result.name}</div>

            <div class="advice-box">
              "${result.advice}"
            </div>

            <div class="grid">
              <div class="ritual-item">
                <div class="label">Akose Sugerido</div>
                <div class="value" style="font-size: 14px;">${result.akose}</div>
              </div>
              <div class="ritual-item">
                <div class="label">Ofó (Ativação)</div>
                <div class="value" style="font-size: 14px; font-style: italic;">"${result.ofo}"</div>
              </div>
            </div>

            <div class="section" style="margin-top: 40px;">
              <div class="label">Determinação de Ebó / Solução</div>
              <div class="value" style="font-size: 14px;">
                <strong>Nível Selecionado:</strong> ${selection === 'basic' ? 'Básico' : selection === 'medium' ? 'Intermediário' : selection === 'complete' ? 'Completo (Sacerdotal)' : 'A definir'}<br>
                
                ${selection !== 'none' ? `
                  <div style="margin-top: 15px; background: #fdf2f2; padding: 15px; border-radius: 8px; border-left: 5px solid #b91c1c;">
                    <p><strong>Descrição:</strong> ${result.ebos[selection].description}</p>
                    <p><strong>Materiais:</strong> ${result.ebos[selection].ingredients.join(', ')}</p>
                    ${isBabalawo ? `
                      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #f87171;">
                        <p><strong>MODO DE PREPARO SACERDOTAL (REGRA DE OURO):</strong></p>
                        <p style="white-space: pre-line;">${result.ebos[selection].instructions}</p>
                      </div>
                    ` : `
                      <p><strong>Instruções ao Consulente:</strong> Siga as orientações do seu Babalawo para a execução deste ritual.</p>
                    `}
                  </div>
                ` : '<p>Nenhuma seleção de Ebó foi feita no momento da impressão.</p>'}
              </div>
            </div>

            <div class="footer">
              Este documento é uma transcrição oracular do Ifá Oluwo Digital.<br>
              ${isBabalawo ? '<strong>USO EXCLUSIVO DO BABALAWO.</strong>' : 'Que Xangô traga a justiça.'}<br>
              Kawo Kabiyesi Sango!
            </div>
          </body>
          </html>
        `;
    };

    const handlePrint = (mode: 'babalawo' | 'consulente') => {
        const content = generateSangoPrintContent(mode);
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(content);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    };

    const handleShare = async () => {
        if (!result) return;
        const text = `Veredito de Xangô - Tribunal de Oba Koso\n\nOdù: ${result.name}\n\nVeredito: ${result.advice}\n\nAkose: ${result.akose}\n\nOfó: ${result.ofo}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Veredito de Xangô - ${result.name}`,
                    text: text,
                    url: window.location.href
                });
            } catch (error) {
                console.error("Erro ao compartilhar", error);
            }
        } else {
            // Fallback para e-mail
            const mailto = `mailto:?subject=Veredito de Xangô - ${result.name}&body=${encodeURIComponent(text)}`;
            window.location.href = mailto;
        }
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-lg flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Scale size={20} /> Roda de Xangô (Oráculo)</h1>
                <div className="w-6"></div>
            </div>

            {!result ? (
                <div className="w-full max-w-lg bg-ifa-base border border-ifa-border rounded-xl p-6 shadow-xl">
                    <h2 className="text-lg font-bold text-red-500 mb-4 uppercase flex items-center gap-2">
                        <Gavel size={20} /> Tribunal Espiritual
                    </h2>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Seu Nome / Cliente</label>
                            <input
                                value={form.myName}
                                onChange={e => setForm({ ...form, myName: e.target.value })}
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                placeholder="Quem pede justiça?"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Parte Contrária</label>
                            <input
                                value={form.opponent}
                                onChange={e => setForm({ ...form, opponent: e.target.value })}
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                placeholder="Nome do adversário (opcional)"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Nome da Mãe</label>
                                <input
                                    value={form.motherName}
                                    onChange={e => setForm({ ...form, motherName: e.target.value })}
                                    className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-sm text-ifa-text"
                                    placeholder="(Opcional)"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Data de Nascimento</label>
                                <input
                                    type="date"
                                    value={form.birthDate}
                                    onChange={e => setForm({ ...form, birthDate: e.target.value })}
                                    className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-sm text-ifa-text"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Nº do Processo</label>
                                <input
                                    value={form.caseNumber}
                                    onChange={e => setForm({ ...form, caseNumber: e.target.value })}
                                    className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-sm text-ifa-text"
                                    placeholder="Ex: 00123/24"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Região / Local</label>
                                <input
                                    value={form.region}
                                    onChange={e => setForm({ ...form, region: e.target.value })}
                                    className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-sm text-ifa-text"
                                    placeholder="Ex: São Paulo, SP"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase font-bold text-ifa-neutral mb-1 block">Detalhes da Causa</label>
                            <textarea
                                value={form.details}
                                onChange={e => setForm({ ...form, details: e.target.value })}
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text h-24 resize-none"
                                placeholder="Descreva o problema jurídico ou disputa..."
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleCast}
                        disabled={!form.myName || !form.details || isSpinning}
                        className={`w-full py-4 rounded-xl font-bold uppercase flex items-center justify-center gap-2 transition-all ${isSpinning ? 'bg-red-900 text-red-300 cursor-wait' : 'bg-red-600 text-white hover:bg-red-700'}`}
                    >
                        {isSpinning ? <><Loader2 className="animate-spin" /> Consultando...</> : "Obter Veredito"}
                        {!isSpinning && <Scale size={20} />}
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-lg mb-20 animate-fade-in">
                    {/* Banner do Tribunal */}
                    <div className="bg-red-800 text-white py-2 px-4 rounded-t-xl border-x border-t border-red-600 flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Corte de Oba Koso</span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse delay-75"></div>
                        </div>
                    </div>

                    <div className="bg-[#1a0505] border-x border-b border-red-900/50 p-6 md:p-8 rounded-b-xl shadow-2xl relative overflow-hidden">
                        {/* Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none"></div>
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 blur-[100px] rounded-full"></div>

                        <div className="relative text-center">
                            <div className="flex justify-center mb-6">
                                <div className="p-4 bg-red-950/40 rounded-full border border-red-500/30 relative">
                                    {result.outcome === 'victory_hard' && <ShieldAlert size={60} className="text-amber-500 animate-bounce-slow" />}
                                    {result.outcome === 'peace' && <BookOpen size={60} className="text-green-500" />}
                                    {result.outcome === 'trouble' && <AlertTriangle size={60} className="text-red-500 animate-pulse" />}
                                    <div className="absolute -bottom-2 -right-2 bg-red-600 p-2 rounded-full shadow-lg">
                                        <Scale size={18} className="text-white" />
                                    </div>
                                </div>
                            </div>

                            <p className="text-ifa-gold font-bold text-xs uppercase tracking-widest mb-1">Odù de Referência</p>
                            <h2 className="text-4xl font-serif font-bold text-white mb-4 drop-shadow-md">{result.name}</h2>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 backdrop-blur-sm">
                                <Quote size={20} className="text-red-500 mb-2 mx-auto opacity-50" />
                                <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed italic">
                                    {result.advice}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
                                <div className="bg-red-950/20 border border-red-800/30 p-4 rounded-xl">
                                    <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Zap size={12} /> Akose Sugerido
                                    </h4>
                                    <p className="text-sm text-gray-300">{result.akose}</p>
                                </div>
                                <div className="bg-amber-950/20 border border-amber-800/30 p-4 rounded-xl">
                                    <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <MessageCircle size={12} /> Ofó (Reza de Ativação)
                                    </h4>
                                    <p className="text-sm text-amber-100 font-serif italic">"{result.ofo}"</p>
                                </div>
                            </div>

                            <div className="mb-8 p-1 bg-gradient-to-r from-transparent via-red-900/50 to-transparent">
                                <p className="text-[10px] font-bold text-ifa-gold uppercase tracking-[0.3em]">Prescrição de Justiça</p>
                            </div>

                            <EboSelector
                                basic={result.ebos.basic}
                                medium={result.ebos.medium}
                                complete={result.ebos.complete}
                                currentSelection={selection}
                                onSelect={setSelection}
                                oduName={result.name}
                                context="Tribunal de Xangô"
                            />

                            <div className="mt-10 p-4 bg-black/40 rounded-lg border border-red-900/30 text-xs text-red-300 italic flex items-center gap-3">
                                <Gavel size={16} className="text-red-600 flex-shrink-0" />
                                <p>"Sango, Kabiyesi! Julgue com a verdade. Que a justiça seja feita. Kawo Kabiyesi!"</p>
                            </div>

                            <div className="flex flex-col gap-3 mt-8 print:hidden">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handlePrint('consulente')}
                                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all border border-white/10"
                                    >
                                        <Printer size={14} /> Para o Consulente
                                    </button>
                                    <button
                                        onClick={() => handlePrint('babalawo')}
                                        className="flex-1 bg-ifa-gold text-black py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
                                    >
                                        <ShieldAlert size={14} /> Para o Babalawo
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all border border-white/10"
                                    >
                                        <Share2 size={14} /> Enviar Veredito
                                    </button>
                                </div>
                                <button
                                    onClick={reset}
                                    className="text-gray-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest flex items-center gap-2 mx-auto"
                                >
                                    <ArrowLeft size={10} /> Nova Consulta ao Tribunal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SangoWheel;
