
import React, { useEffect, useState, useMemo } from 'react';
import { ConsultationRecord, EboDetail, BabalawoProfile, EboLevels } from '../types';
import { Printer, ArrowLeft, List, MessageCircle, Mail, Eye, EyeOff, Lock, Unlock, AlertTriangle, BookOpen, ShoppingBag, Coins } from 'lucide-react';
import { getProfile } from '../services/storageService';
import BabalawoListModal from './BabalawoListModal';

interface Props {
  record: ConsultationRecord;
  onBack: () => void;
  onReturnToSession?: () => void;
}

export const PrintLayout = ({ record, onBack }: Props) => {
  const [profile, setProfile] = useState<BabalawoProfile | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showBabalawoList, setShowBabalawoList] = useState(false);

  // --- VISIBILITY CONTROLS ---
  const [showSecretEbos, setShowSecretEbos] = useState(false); // Default hidden for client
  const [showPriestNotes, setShowPriestNotes] = useState(false); // Default hidden
  const [showDangers, setShowDangers] = useState(true);

  // Global Price State (Local to print session)
  const [globalPrices, setGlobalPrices] = useState<Record<string, number>>({});
  const [globalLabor, setGlobalLabor] = useState<number>(0);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const generateShareText = () => {
      return `*Registro Oficial - Templo de Ifá*\n\n` +
             `*Consulente:* ${record.client?.fullName}\n` +
             `*Odu:* ${record.odu?.name}\n` +
             `*Caminho:* ${record.interpretation?.ireOrOsogbo || 'N/A'}\n\n` +
             `*Conselho:* ${record.interpretation?.generalAdvice}\n\n` +
             `Acesse o templo para receber seu Ebó completo.`;
  };

  const handleWhatsapp = () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(generateShareText())}`, '_blank');
  };

  const handleEmail = () => {
      const subject = `Registro de Consulta - ${record.client?.fullName}`;
      const body = generateShareText();
      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  // Check if Osogbo
  const isOsogbo = record.interpretation?.ireOrOsogbo?.toLowerCase().includes('osogbo');

  // --- DATA AGGREGATION FOR SHOPPING LIST ---
  const babalawoData = useMemo(() => {
      const ingredientMap = new Map<string, number>();
      
      const processIngredients = (detail?: EboDetail) => {
          if (!detail || !detail.ingredients) return;
          detail.ingredients.forEach(rawIng => {
              const name = rawIng.trim();
              ingredientMap.set(name, (ingredientMap.get(name) || 0) + 1);
          });
      };

      // Gather from all Ebos based on selection
      if (record.interpretation) {
          // GENERAL
          if (record.selections?.general !== 'none') {
              processIngredients(record.interpretation.solutionsAndEbos?.basic);
              processIngredients(record.interpretation.solutionsAndEbos?.medium);
              if (showSecretEbos || record.selections?.general === 'complete') {
                  processIngredients(record.interpretation.solutionsAndEbos?.complete);
              }
          }
          // OSOGBO (If applicable)
          if (isOsogbo && record.interpretation.osogbo?.ebo) {
              processIngredients(record.interpretation.osogbo.ebo);
          }
          // LOVE
          if (record.selections?.love !== 'none') {
              const level = record.selections.love; // basic, medium, complete
              processIngredients(record.interpretation.love?.ebos?.[level]);
          }
          // FINANCE
          if (record.selections?.finance !== 'none') {
              const level = record.selections.finance;
              processIngredients(record.interpretation.finance?.ebos?.[level]);
          }
          // HEALTH
          if (record.selections?.health !== 'none') {
              const level = record.selections.health;
              processIngredients(record.interpretation.health?.ebos?.[level]);
          }
      }

      const shoppingList = Array.from(ingredientMap.entries()).map(([name, quantity]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          quantity
      }));
      
      const mandalaPrice = record.selections?.mandala?.selected ? (record.selections.mandala.price || 0) : 0;
      
      // Calculate total materials based on prices set
      const totalMaterials = shoppingList.reduce((acc, item) => acc + (globalPrices[item.name] || 0), 0);
      
      const grandTotal = totalMaterials + globalLabor + mandalaPrice;
      
      return { shoppingList, grandTotal, mandalaPrice, totalMaterials };
  }, [record, globalPrices, globalLabor, showSecretEbos, isOsogbo]);

  // HELPER TO RENDER AN EBO BLOCK
  const renderEboBlock = (title: string, selection: string, ebos?: EboLevels) => {
      if (!selection || selection === 'none' || !ebos) return null;
      
      let detail: EboDetail | undefined;
      if (selection === 'basic') detail = ebos.basic;
      else if (selection === 'medium') detail = ebos.medium;
      else if (selection === 'complete') detail = ebos.complete;

      if (!detail) return null;

      // Ensure Correct Label
      const displaySelection = selection === 'complete' ? 'RITUAL COMPLEXO' : selection.toUpperCase();

      return (
          <div className="mb-6 break-inside-avoid">
              <h4 className="font-bold text-sm text-black uppercase mb-2 border-b border-gray-300 pb-1">{title}</h4>
              <div className="border-l-4 border-black pl-4 py-2 bg-gray-50">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">NÍVEL: {displaySelection}</p>
                  
                  <p className="text-sm italic mb-2 text-gray-700">
                      "{detail.description}"
                  </p>
                  
                  {(selection !== 'complete' || showSecretEbos) && (
                      <>
                          <div className="mb-4 mt-4">
                              <strong className="text-xs uppercase text-gray-500 block mb-1">⋮≡ MATERIAIS NECESSÁRIOS:</strong>
                              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm list-disc pl-4 text-gray-800">
                                  {detail.ingredients?.map((ing, i) => (
                                      <li key={i}>{ing}</li>
                                  ))}
                              </ul>
                          </div>

                          <div className="text-sm text-justify leading-relaxed whitespace-pre-line text-gray-800 bg-white p-3 rounded border border-gray-200">
                              <strong className="text-xs uppercase text-gray-500 block mb-2">📄 RITUAL (Passo a Passo):</strong>
                              {detail.instructions}
                          </div>
                      </>
                  )}

                  {selection === 'complete' && !showSecretEbos && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-800 text-xs italic">
                          * Detalhes do RITUAL COMPLEXO (Sacerdotal) ocultos para proteção. Consulte o Babalawo.
                      </div>
                  )}
              </div>
          </div>
      );
  };

  // Helper for Osogbo Specific Ebo (No selection, auto if Osogbo)
  const renderOsogboEbo = () => {
      if (!isOsogbo || !record.interpretation?.osogbo?.ebo) return null;
      const detail = record.interpretation.osogbo.ebo;

      return (
          <div className="mb-6 break-inside-avoid border-2 border-red-500 rounded-lg p-4 bg-red-50/50">
              <h4 className="font-bold text-sm text-red-800 uppercase mb-2 border-b border-red-200 pb-1 flex items-center gap-2">
                  <AlertTriangle size={16}/> Ebó de Descarrego (Obrigatório)
              </h4>
              <p className="text-sm italic mb-4 text-red-900">"{detail.description}"</p>
              
              <div className="mb-4">
                  <strong className="text-xs uppercase text-red-700 block mb-1">⋮≡ MATERIAIS:</strong>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm list-disc pl-4 text-red-900">
                      {detail.ingredients?.map((ing, i) => (
                          <li key={i}>{ing}</li>
                      ))}
                  </ul>
              </div>

              <div className="text-sm text-justify leading-relaxed whitespace-pre-line text-red-900 bg-white p-3 rounded border border-red-100">
                  <strong className="text-xs uppercase text-red-700 block mb-2">📄 MODO DE FAZER:</strong>
                  {detail.instructions}
              </div>
          </div>
      );
  }

  // --- DOCUMENT CONTENT (TEMPLO DE IFÁ STYLE) ---
  const DocumentContent = () => (
      <div id="printable-area" className="bg-white text-black p-8 md:p-12 max-w-[210mm] mx-auto min-h-[297mm] shadow-2xl print:shadow-none print:w-full print:max-w-none print:m-0 print:p-0 font-sans leading-relaxed">
        
        {/* HEADER */}
        <div className="text-center mb-8 pb-4 border-b-2 border-black">
            <div className="flex justify-between items-start text-[10px] text-gray-500 mb-2 font-bold uppercase">
                <span>{new Date().toLocaleString()}</span>
                <span>Ifá Oluwo - Codex Sacerdotal</span>
            </div>
            
            <h1 className="text-5xl font-serif font-bold uppercase tracking-widest mb-2 mt-4 text-black">TEMPLO DE IFÁ</h1>
            
            <div className="flex justify-between items-end mt-8 border-t border-gray-300 pt-4 text-left">
                <div className="text-sm font-bold uppercase tracking-wide text-gray-800 w-full">REGISTRO OFICIAL DE CONSULTA</div>
                <div className="text-xs font-mono text-gray-500 whitespace-nowrap">DATA: {record.timestamp}</div>
            </div>
        </div>

        {/* CONSULENTE INFO */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                    <span className="block font-bold text-gray-900 mb-1">Consulente:</span>
                    <span className="text-gray-700">{record.client?.fullName}</span>
                </div>
                <div>
                    <span className="block font-bold text-gray-900 mb-1">Data de Nascimento:</span>
                    <span className="text-gray-700">{record.client?.dateOfBirth}</span>
                </div>
                <div>
                    <span className="block font-bold text-gray-900 mb-1">Mãe:</span>
                    <span className="text-gray-700">{record.client?.mothersName}</span>
                </div>
                <div>
                    <span className="block font-bold text-gray-900 mb-1">Profissão:</span>
                    <span className="text-gray-700">{record.client?.profession}</span>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <span className="block font-bold text-gray-900 mb-1">Endereço:</span>
                    <span className="text-gray-700">{record.client?.address}</span>
                </div>
                <div>
                    <span className="block font-bold text-gray-900 mb-1">Contato:</span>
                    <span className="text-gray-700">{record.client?.phone} | {record.client?.email}</span>
                </div>
            </div>
        </div>

        {/* ODU DETECTADO */}
        <div className="flex items-center justify-between mb-6 py-6 border-b border-gray-200">
            <div className="text-left">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">ODU DETECTADO</h3>
                <div className="text-4xl md:text-5xl font-serif font-bold text-gray-900 uppercase tracking-wide">
                    {record.odu?.name}
                </div>
            </div>
            <div className="text-right border-l-2 border-gray-300 pl-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">CAMINHO</h3>
                <div className={`text-xl font-bold uppercase ${record.interpretation?.ireOrOsogbo?.includes('Irê') ? 'text-green-700' : 'text-red-700'}`}>
                    {record.interpretation?.ireOrOsogbo || 'N/A'}
                </div>
            </div>
        </div>

        {/* ALERTA DE OSOGBO */}
        {isOsogbo && (
            <div className="mb-8 p-6 bg-red-50 border-2 border-red-600 rounded-lg break-inside-avoid">
                <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-red-700 mb-2">
                    <AlertTriangle size={24} /> ORIENTAÇÃO DO CAMINHO (OSOGBO)
                </h3>
                <p className="text-red-900 font-bold mb-2 text-sm uppercase">AÇÃO NECESSÁRIA: {record.interpretation?.ireOsogboAction || "FAZER EBÓ IMEDIATAMENTE"}</p>
                <p className="text-gray-800 text-justify leading-relaxed">
                    {record.interpretation?.ireOsogboDescription}
                </p>
                <div className="mt-4 text-xs text-red-600 font-bold uppercase border-t border-red-200 pt-2">
                    * Negligenciar este aviso pode trazer consequências graves. Consulte o Ebó abaixo.
                </div>
            </div>
        )}

        {/* REZA DO ODU (COMPLETA) */}
        <section className="mb-10 break-inside-avoid bg-yellow-50 p-6 rounded border border-yellow-200">
            <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-[#8D6E63] mb-4 border-b border-yellow-300 pb-2">
                <BookOpen size={20} /> ORIKI DO ODU (REZA SAGRADA)
            </h3>
            
            <div className="mb-4">
                <strong className="text-xs font-bold uppercase text-gray-500 mb-1 block">Yoruba (Original):</strong>
                <p className="font-serif italic text-lg text-gray-900 leading-relaxed whitespace-pre-line">
                    "{record.interpretation?.oduOriki?.yoruba}"
                </p>
            </div>

            <div className="mb-4">
                <strong className="text-xs font-bold uppercase text-gray-500 mb-1 block">Tradução:</strong>
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                    {record.interpretation?.oduOriki?.translation}
                </p>
            </div>

            <div className="text-xs text-gray-600 bg-white p-2 rounded border border-yellow-200 italic">
                <strong>Modo de Rezar:</strong> {record.interpretation?.oduOriki?.instructions}
            </div>
        </section>

        {/* CONSELHO GERAL */}
        <section className="mb-10 break-inside-avoid">
            <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-[#8D6E63] mb-4">
                <span className="text-xl">⚖️</span> CONSELHO GERAL
            </h3>
            <div className="text-sm text-gray-800 leading-7 text-justify whitespace-pre-line bg-gray-50 p-4 rounded border border-gray-200">
                {record.interpretation?.generalAdvice}
            </div>
        </section>

        {/* 1. ESPIRITUALIDADE & ORIXÁS */}
        <section className="mb-10 break-inside-avoid">
            <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-[#8D6E63] mb-4">
                <span className="text-xl">☼</span> ESPIRITUALIDADE & ORIXÁS
            </h3>
            <div className="text-sm text-gray-800 leading-7 text-justify">
                <p className="mb-3"><strong className="text-black">Fundamento Espiritual:</strong> {record.interpretation?.spirituality}</p>
                <p className="mb-3"><strong className="text-black">Orixás Regentes:</strong> {record.interpretation?.rulingOrishas}</p>
            </div>
        </section>

        {/* ITAN */}
        <section className="mb-10 break-inside-avoid">
            <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-[#8D6E63] mb-4">
                <span className="text-xl">📜</span> ITAN (HISTÓRIA SAGRADA)
            </h3>
            <div className="text-sm text-gray-800 leading-7 text-justify whitespace-pre-line bg-yellow-50/50 p-6 rounded border border-yellow-100">
                {record.interpretation?.itan}
                {record.interpretation?.itanSummary && (
                    <div className="mt-6 pt-4 border-t border-yellow-200">
                        <strong className="text-xs uppercase text-yellow-800 block mb-1">Resumo para Entendimento:</strong>
                        <p className="italic text-gray-700">{record.interpretation?.itanSummary}</p>
                    </div>
                )}
            </div>
        </section>

        {/* 4. ANÁLISE PROFUNDA (IRELARA) */}
        <section className="mb-10 break-inside-avoid">
            <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-[#8D6E63] mb-6">
                <span className="text-xl">⚡</span> ANÁLISE DA VIDA (IRELARA)
            </h3>
            <div className="space-y-6">
                <div className="border-l-4 border-pink-300 pl-4">
                    <h4 className="font-bold text-sm text-[#D4AF37] uppercase mb-2">♡ AMOR & FAMÍLIA</h4>
                    <p className="text-sm text-gray-700 text-justify leading-relaxed">{record.interpretation?.love?.analysis}</p>
                </div>
                <div className="border-l-4 border-green-300 pl-4">
                    <h4 className="font-bold text-sm text-green-600 uppercase mb-2">💰 DINHEIRO & TRABALHO</h4>
                    <p className="text-sm text-gray-700 text-justify leading-relaxed">{record.interpretation?.finance?.analysis}</p>
                </div>
                <div className="border-l-4 border-blue-300 pl-4">
                    <h4 className="font-bold text-sm text-blue-600 uppercase mb-2">⚕ SAÚDE & BEM-ESTAR</h4>
                    <p className="text-sm text-gray-700 text-justify leading-relaxed">{record.interpretation?.health?.analysis}</p>
                </div>
            </div>
        </section>

        {/* 5. ANÁLISE COMPORTAMENTAL E ANCESTRAL (LONGA) */}
        <section className="mb-10 break-inside-avoid">
            <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-[#8D6E63] mb-6">
                <span className="text-xl">🧬</span> ANCESTRALIDADE & COMPORTAMENTO
            </h3>
            
            <div className="grid grid-cols-1 gap-6 text-sm text-gray-800 leading-relaxed text-justify">
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h4 className="font-bold text-gray-900 uppercase mb-2">👥 Ancestrais (Egun)</h4>
                    <p>{record.interpretation?.ancestry}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h4 className="font-bold text-gray-900 uppercase mb-2">🧠 Comportamento & Personalidade</h4>
                    <p>{record.interpretation?.personality}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h4 className="font-bold text-gray-900 uppercase mb-2">⚖️ Tomada de Decisão</h4>
                    <p>{record.interpretation?.decisionMaking}</p>
                </div>
            </div>
        </section>

        {/* 6. ALERTAS E TABUS (Condicional) */}
        {showDangers && (
            <section className="mb-10 p-6 border border-gray-300 rounded-lg break-inside-avoid">
                <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-black mb-4">
                    <span className="text-xl">🛡</span> ALERTAS, PERIGOS E TABUS (EWO)
                </h3>
                <div className="grid grid-cols-1 gap-4 text-sm leading-relaxed">
                    <div className="p-3 bg-red-50 rounded border border-red-100">
                        <h5 className="font-bold text-red-800 text-xs uppercase mb-1">PERIGOS & OBSTÁCULOS</h5>
                        <p className="text-gray-800 text-justify mb-3">
                            <span className="font-bold">Perigos:</span> {record.interpretation?.dangers}
                        </p>
                        <p className="text-gray-800 text-justify">
                            <span className="font-bold">Obstáculos Ocultos:</span> {record.interpretation?.obstaclesAndEnemies}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h5 className="font-bold text-gray-800 text-xs uppercase mb-1">Ψ COMIDAS (DIETA)</h5>
                            <p className="text-xs text-gray-600"><span className="text-green-700 font-bold">Sim:</span> {record.interpretation?.diet?.positive}</p>
                            <p className="text-xs text-gray-600 mt-1"><span className="text-red-700 font-bold">Não:</span> {record.interpretation?.diet?.negative}</p>
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-800 text-xs uppercase mb-1">👕 ROUPAS/CORES</h5>
                            <p className="text-xs text-gray-600"><span className="text-green-700 font-bold">Sim:</span> {record.interpretation?.clothing?.positive}</p>
                            <p className="text-xs text-gray-600 mt-1"><span className="text-red-700 font-bold">Não:</span> {record.interpretation?.clothing?.negative}</p>
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* 7. PRESCRIÇÕES E RITUAIS (ALL SELECTED EBOS) */}
        <section className="mb-10">
            <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-[#8D6E63] mb-4 border-b border-gray-300 pb-2">
                <span className="text-xl">🍃</span> PRESCRIÇÕES E RITUAIS
            </h3>
            
            <div className="mb-6">
                <h4 className="font-bold text-sm text-green-700 uppercase mb-2">Ervas & Banhos</h4>
                <div className="bg-green-50 p-4 rounded border border-green-100 text-sm">
                    <p className="mb-2"><strong>Nome:</strong> {record.interpretation?.herbalBaths?.name}</p>
                    <p className="mb-2"><strong>Ingredientes:</strong> {record.interpretation?.herbalBaths?.ingredients?.join(', ')}</p>
                    <p className="text-justify leading-relaxed"><strong>Preparo:</strong> {record.interpretation?.herbalBaths?.preparation}</p>
                </div>
            </div>

            {/* Renderizar TODOS os Ebós selecionados + OSOGBO se houver */}
            {renderOsogboEbo()}
            
            {renderEboBlock("Ebó Principal (Geral)", record.selections?.general, record.interpretation?.solutionsAndEbos)}
            {renderEboBlock("Trabalho para Amor", record.selections?.love, record.interpretation?.love?.ebos)}
            {renderEboBlock("Trabalho Financeiro", record.selections?.finance, record.interpretation?.finance?.ebos)}
            {renderEboBlock("Trabalho de Saúde", record.selections?.health, record.interpretation?.health?.ebos)}

        </section>

        {/* ORÇAMENTO ESTIMADO - EXIBIR SOMENTE SE HOUVER VALOR TOTAL > 0 */}
        {babalawoData.grandTotal > 0 && (
            <section className="mb-10 break-inside-avoid bg-gray-50 p-6 rounded border border-gray-300">
                <h3 className="flex items-center gap-2 text-lg font-bold uppercase text-black mb-4 border-b border-black pb-2">
                    <Coins size={20} /> Orçamento Estimado de Materiais
                </h3>
                
                <p className="text-xs text-gray-500 mb-4 italic">
                    Lista de materiais necessários para a realização dos trabalhos indicados acima.
                    O consulente pode providenciar os itens ou solicitar ao templo.
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    {babalawoData.shoppingList.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-gray-200 pb-1">
                            <span>
                                {item.quantity > 1 ? <strong>{item.quantity}x </strong> : ''}
                                {item.name}
                            </span>
                            {globalPrices[item.name] > 0 && <span>R$ {globalPrices[item.name].toFixed(2)}</span>}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-400">
                    <div className="text-right">
                        {globalLabor > 0 && <p className="text-sm">Mão de Obra / Direito: R$ {globalLabor.toFixed(2)}</p>}
                        {babalawoData.mandalaPrice > 0 && <p className="text-sm">Mandala Vibracional: R$ {babalawoData.mandalaPrice.toFixed(2)}</p>}
                        <p className="text-xl font-bold mt-2">TOTAL: R$ {babalawoData.grandTotal.toFixed(2)}</p>
                    </div>
                </div>
            </section>
        )}

        {/* NOTAS PRIVADAS DO SACERDOTE (CONDICIONAL) */}
        {showPriestNotes && record.notes && (
            <section className="mb-10 bg-yellow-50 border border-yellow-200 p-6 rounded break-inside-avoid">
                <h3 className="text-lg font-bold uppercase text-yellow-800 mb-2 flex items-center gap-2">
                    <Lock size={18}/> Notas Confidenciais do Babalawo
                </h3>
                <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed italic">
                    {record.notes}
                </p>
            </section>
        )}

        {/* FOOTER */}
        <div className="mt-20 pt-10 border-t-2 border-black flex flex-col items-center justify-center break-inside-avoid text-center">
            <p className="italic font-serif text-sm text-gray-500 mb-8">
                "A sabedoria de Ifá é a luz que guia os passos. Que este caminho seja próspero."
            </p>
            
            <div className="w-64 border-b border-black mb-2"></div>
            <p className="font-bold uppercase text-sm mb-1">ASSINATURA DO BABALAWO</p>
            <p className="text-xs uppercase text-gray-500 tracking-widest">{profile?.title || 'SACERDOTE DE IFÁ'}</p>

            {/* Informações de Contato / Ficha Técnica Opcional na Impressão */}
            <div className="mt-12 text-left w-full text-xs text-gray-400 grid grid-cols-2 gap-4">
                <div>
                    <p className="font-bold uppercase text-gray-600 mb-1">Contato</p>
                    <p>{profile?.email}</p>
                    <p>{profile?.phone}</p>
                </div>
                <div className="text-right">
                     <p className="font-bold uppercase text-gray-600 mb-1">Templo de Ifá</p>
                     <p>{profile?.address}</p>
                </div>
            </div>
        </div>

      </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-sans">
      {!isPreviewMode && (
          <div className="max-w-4xl mx-auto bg-ifa-base-dark border border-ifa-gold rounded-xl p-6 mb-8 shadow-2xl text-center">
              <h2 className="text-2xl font-serif text-ifa-gold font-bold mb-4">Documento Pronto</h2>
              <p className="text-ifa-neutral mb-8">O Registro Oficial foi gerado com sucesso seguindo os padrões do Templo.</p>
              
              <div className="bg-black/30 p-4 rounded-lg border border-ifa-border mb-8 max-w-lg mx-auto">
                  <h3 className="text-sm font-bold uppercase text-ifa-gold mb-4">Configurar Impressão / PDF</h3>
                  
                  <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between">
                          <span className="text-sm flex items-center gap-2"><Lock size={14}/> Mostrar Ebó Secreto (Matança)</span>
                          <button onClick={() => setShowSecretEbos(!showSecretEbos)} className={`w-12 h-6 rounded-full transition-colors ${showSecretEbos ? 'bg-green-600' : 'bg-gray-600'} relative`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showSecretEbos ? 'left-7' : 'left-1'}`}></div>
                          </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                          <span className="text-sm flex items-center gap-2"><Eye size={14}/> Mostrar Notas Confidenciais</span>
                          <button onClick={() => setShowPriestNotes(!showPriestNotes)} className={`w-12 h-6 rounded-full transition-colors ${showPriestNotes ? 'bg-green-600' : 'bg-gray-600'} relative`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showPriestNotes ? 'left-7' : 'left-1'}`}></div>
                          </button>
                      </div>

                      <div className="flex items-center justify-between">
                          <span className="text-sm flex items-center gap-2"><ArrowLeft size={14}/> Mostrar Seção de Perigos/Tabus</span>
                          <button onClick={() => setShowDangers(!showDangers)} className={`w-12 h-6 rounded-full transition-colors ${showDangers ? 'bg-green-600' : 'bg-gray-600'} relative`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showDangers ? 'left-7' : 'left-1'}`}></div>
                          </button>
                      </div>
                  </div>
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                  <button onClick={onBack} className="text-gray-400 hover:text-white underline py-2">Voltar</button>
                  <button onClick={() => setIsPreviewMode(true)} className="bg-ifa-gold text-black px-8 py-3 rounded-xl font-bold uppercase hover:bg-white transition-all shadow-lg flex items-center gap-2">
                      <Printer size={20} /> Visualizar & Imprimir
                  </button>
              </div>
          </div>
      )}

      {isPreviewMode && (
          <div className="flex flex-col items-center">
              <div className="fixed top-4 right-4 z-50 flex gap-2 print:hidden flex-wrap justify-end">
                  <button onClick={handleEmail} className="bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-500" title="Enviar por Email">
                      <Mail size={20} />
                  </button>
                  <button onClick={handleWhatsapp} className="bg-[#25D366] text-white p-3 rounded-full shadow-2xl hover:bg-green-500" title="Enviar por WhatsApp">
                      <MessageCircle size={20} />
                  </button>
                  <button onClick={handlePrint} className="bg-ifa-gold text-black px-6 py-3 rounded-full font-bold uppercase shadow-2xl hover:bg-white flex items-center gap-2">
                      <Printer size={20} /> Imprimir PDF
                  </button>
                  <button onClick={() => setIsPreviewMode(false)} className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold uppercase shadow-2xl hover:bg-gray-700">
                      <ArrowLeft size={20} /> Voltar
                  </button>
              </div>

              <DocumentContent />
              
              <div className="print:hidden mt-8 mb-20 w-full max-w-[210mm] flex justify-center gap-4">
                 <button onClick={() => setShowBabalawoList(true)} className="bg-ifa-wood text-white px-6 py-3 rounded-lg font-bold uppercase flex items-center gap-2 shadow-lg hover:bg-ifa-gold hover:text-black transition-colors">
                      <List size={20} /> Editar Orçamento & Lista
                  </button>
              </div>
          </div>
      )}

      {showBabalawoList && (
          <BabalawoListModal 
              title={`Lista de Materiais - ${record.odu?.name}`}
              shoppingList={babalawoData.shoppingList}
              onClose={() => setShowBabalawoList(false)}
              externalPrices={globalPrices}
              setExternalPrices={setGlobalPrices}
              externalLabor={globalLabor}
              setExternalLabor={setGlobalLabor}
          />
      )}
    </div>
  );
};
