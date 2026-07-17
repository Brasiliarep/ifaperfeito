import React, { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Music, Share2, Tag, Star, Users, Map, Flame, ShieldAlert, Globe } from 'lucide-react';
import { ENCYCLOPEDIA_DATA } from '../src/data/encyclopedia';
import SEO from './SEO';
import { BreadcrumbNav } from './BreadcrumbNav';

interface Props {
  entityId: string;
  onBack: () => void;
}

type TabType = 'visao-geral' | 'historia-sagrada' | 'fundamentos' | 'culto' | 'academico';

export function EntityViewer({ entityId, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('visao-geral');
  const entity = useMemo(() => ENCYCLOPEDIA_DATA.find(e => e.id === entityId), [entityId]);

  if (!entity) {
    return (
      <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center bg-[#0a0a0a]">
        <h2 className="text-xl text-white mb-4">Entidade não encontrada</h2>
        <button onClick={onBack} className="text-[#C49E30] flex items-center gap-2">
          <ArrowLeft size={16} /> Voltar para a Enciclopédia
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    const text = `Dossiê Completo: ${entity.nome} (${entity.categoria})\n\nDescubra na Enciclopédia Sagrada do Ifá Oluwo!`;
    if (navigator.share) {
      await navigator.share({ title: entity.nome, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      alert('Link copiado!');
    }
  };

  const faqSchema = entity.perguntasFrequentes.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": entity.perguntasFrequentes.map(faq => ({
      "@type": "Question",
      "name": faq.pergunta,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.resposta
      }
    }))
  } : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${entity.nome} - Dossiê Completo | ${entity.categoria}`,
    "description": entity.historiaTradicional.substring(0, 300),
    "image": "https://ifaoluwo.com/logo.png",
    "author": {
      "@type": "Organization",
      "name": "Ifá Oluwo",
      "url": "https://ifaoluwo.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ifá Oluwo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ifaoluwo.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ifaoluwo.com/enciclopedia/${entity.id}`
    },
    "about": {
      "@type": "Thing",
      "name": entity.nome,
      "alternateName": [entity.nomeYoruba, entity.nomeLucumi, entity.nomeIngles, entity.nomeEspanhol].filter(Boolean),
      "description": entity.historiaTradicional.substring(0, 200)
    },
    "inLanguage": ["pt", "en", "es", "yo"],
    "keywords": (entity.palavrasChaveSEO || []).slice(0, 20).join(', ')
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://ifaoluwo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Enciclopédia Sagrada",
        "item": "https://ifaoluwo.com/enciclopedia"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": entity.nome,
        "item": `https://ifaoluwo.com/enciclopedia/${entity.id}`
      }
    ]
  };

  const combinedJsonLd = faqSchema 
    ? { "@context": "https://schema.org", "@graph": [articleSchema, breadcrumbSchema, faqSchema] }
    : { "@context": "https://schema.org", "@graph": [articleSchema, breadcrumbSchema] };

  const allKeywords = useMemo(() => {
    let kw = [...(entity.palavrasChaveSEO || [])];
    if (entity.palavrasChaveMultiIdiomas) {
      kw = [
        ...kw,
        ...(entity.palavrasChaveMultiIdiomas.pt || []),
        ...(entity.palavrasChaveMultiIdiomas.en || []),
        ...(entity.palavrasChaveMultiIdiomas.es || []),
        ...(entity.palavrasChaveMultiIdiomas.yo || []),
      ];
    }
    return Array.from(new Set(kw));
  }, [entity]);

  return (
    <div className="min-h-screen pt-20 px-4 pb-24 bg-[#0a0a0a]">
      <SEO 
        title={`${entity.nome} | Dossiê Enciclopédia Ifá Oluwo — ${entity.categoria}`}
        description={`${entity.nome} (${entity.nomeYoruba || ''}): dossiê completo com história, mitos, símbolos, cores, culto e tradições. Enciclopédia Sagrada do Ifá Oluwo.`}
        keywords={allKeywords}
        jsonLd={combinedJsonLd}
        canonical={`https://ifaoluwo.com/enciclopedia/${entity.id}`}
        hreflang={[
          { lang: 'pt', url: `https://ifaoluwo.com/enciclopedia/${entity.id}?lang=pt` },
          { lang: 'en', url: `https://ifaoluwo.com/encyclopedia/${entity.id}?lang=en` },
          { lang: 'es', url: `https://ifaoluwo.com/enciclopedia/${entity.id}?lang=es` },
          { lang: 'yo', url: `https://ifaoluwo.com/encyclopedia/${entity.id}?lang=yo` },
        ]}
        article={{
          section: entity.categoria,
          tags: allKeywords.slice(0, 10),
          author: 'Ifá Oluwo'
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <BreadcrumbNav items={[
          { label: 'Enciclopédia', onClick: onBack },
          { label: entity.categoria },
          { label: entity.nome }
        ]} />
        
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#C49E30] transition-colors">
            <ArrowLeft size={16} /> Voltar
          </button>
          <button onClick={handleShare} className="p-2 rounded-full bg-[#111] text-[#C49E30] hover:bg-[#C49E30] hover:text-black transition-colors">
            <Share2 size={16} />
          </button>
        </div>

        {/* Header Content */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded bg-[#222] text-[#C49E30] text-xs font-bold uppercase tracking-wider">
              {entity.categoria}
            </span>
            {entity.linha && (
              <span className="px-3 py-1 rounded border border-[#222] text-gray-400 text-xs uppercase tracking-wider">
                {entity.linha}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-[#E8DCC2] mb-2 leading-tight">
            {entity.nome}
          </h1>
          {entity.nomeYoruba && (
            <p className="text-lg text-gray-500 mb-6 font-serif">
              Yorùbá: <span className="text-gray-300">{entity.nomeYoruba}</span>
              {entity.nomeLucumi && ` | Lucumí: ${entity.nomeLucumi}`}
            </p>
          )}
          
          {entity.saudacao && (
            <p className="text-xl text-[#C49E30] font-light italic mb-8">
              "{entity.saudacao}"
            </p>
          )}

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
              <div className="text-xs text-gray-500 mb-1">Dia Tradicional</div>
              <div className="text-sm text-gray-200 font-medium">{entity.diaTradicional || 'Varia conforme nação'}</div>
            </div>
            {entity.elementosNaturais && (
              <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                <div className="text-xs text-gray-500 mb-1">Elementos</div>
                <div className="text-sm text-gray-200 font-medium">{entity.elementosNaturais.join(', ')}</div>
              </div>
            )}
            {entity.reino && (
              <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                <div className="text-xs text-gray-500 mb-1">Reino</div>
                <div className="text-sm text-gray-200 font-medium">{entity.reino}</div>
              </div>
            )}
            {entity.falange && (
              <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                <div className="text-xs text-gray-500 mb-1">Falange</div>
                <div className="text-sm text-gray-200 font-medium">{entity.falange}</div>
              </div>
            )}
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-8 border-b border-[#222] pb-4">
          {[
            { id: 'visao-geral', label: 'Visão Geral', icon: Star },
            { id: 'historia-sagrada', label: 'História & Mitos', icon: BookOpen },
            { id: 'fundamentos', label: 'Fundamentos', icon: Flame },
            { id: 'culto', label: 'Culto & Devoção', icon: Music },
            { id: 'academico', label: 'Acadêmico & FAQ', icon: Globe }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#C49E30] text-black shadow-[0_0_15px_rgba(196,158,48,0.3)]' 
                  : 'bg-[#111] text-gray-400 border border-[#222] hover:border-[#C49E30]'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="space-y-12">
          
          {/* TAB: VISÃO GERAL */}
          {activeTab === 'visao-geral' && (
            <div className="space-y-8 animate-fade-in">
              <section>
                <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Resumo Tradicional</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">{entity.historiaTradicional}</p>
                  {entity.quemFoi && (
                    <div className="mt-4 p-4 bg-[#111] rounded-lg border-l-2 border-[#C49E30]">
                      <strong className="text-[#C49E30] block mb-1">Quem Foi?</strong>
                      <span className="text-gray-300">{entity.quemFoi}</span>
                    </div>
                  )}
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-[#111] p-6 rounded-2xl border border-[#222]">
                  <h3 className="text-lg font-bold text-[#C49E30] mb-4">Características</h3>
                  <ul className="space-y-3">
                    {(entity.caracteristicas || entity.personalidade || []).map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <Star size={16} className="mt-1 flex-shrink-0 text-[#C49E30]/50" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="bg-[#111] p-6 rounded-2xl border border-[#222]">
                  <h3 className="text-lg font-bold text-[#C49E30] mb-4">Símbolos & Cores</h3>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Cores Tradicionais</div>
                    <div className="flex flex-wrap gap-2">
                      {entity.cores.map((cor, i) => (
                        <span key={i} className="px-3 py-1 bg-[#222] text-gray-300 rounded text-sm">{cor}</span>
                      ))}
                    </div>
                  </div>
                  {entity.simbolos && (
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Símbolos e Ferramentas</div>
                      <div className="flex flex-wrap gap-2">
                        {entity.simbolos.map((s, i) => (
                          <span key={i} className="px-3 py-1 bg-[#222] text-gray-300 rounded text-sm">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}

          {/* TAB: HISTÓRIA SAGRADA */}
          {activeTab === 'historia-sagrada' && (
            <div className="space-y-12 animate-fade-in">
              {entity.biografia && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Biografia Mítica</h2>
                  <div className="bg-[#111] p-6 rounded-2xl border border-[#222] space-y-4 text-gray-300">
                    {entity.biografia.nascimento && (
                      <p><strong className="text-[#C49E30]">Nascimento/Origem:</strong> {entity.biografia.nascimento}</p>
                    )}
                    {entity.biografia.feitos && entity.biografia.feitos.length > 0 && (
                      <div>
                        <strong className="text-[#C49E30] block mb-2">Grandes Feitos:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          {entity.biografia.feitos.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {entity.genealogia && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4 flex items-center gap-2">
                    <Users size={24} className="text-[#C49E30]" /> Genealogia
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {entity.genealogia.pai && (
                      <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                        <div className="text-xs text-gray-500 mb-1">Pai</div>
                        <div className="text-gray-200">{entity.genealogia.pai}</div>
                      </div>
                    )}
                    {entity.genealogia.mae && (
                      <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                        <div className="text-xs text-gray-500 mb-1">Mãe</div>
                        <div className="text-gray-200">{entity.genealogia.mae}</div>
                      </div>
                    )}
                    {entity.genealogia.esposasMaridos && (
                      <div className="bg-[#111] p-4 rounded-xl border border-[#222] col-span-2">
                        <div className="text-xs text-gray-500 mb-1">Cônjuges / Aliados</div>
                        <div className="text-gray-200">{entity.genealogia.esposasMaridos.join(', ')}</div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {entity.linhaDoTempoMitica && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Linha do Tempo Mítica</h2>
                  <div className="space-y-4">
                    {entity.linhaDoTempoMitica.map((evento, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-2 h-2 mt-2 rounded-full bg-[#C49E30] flex-shrink-0" />
                        <p className="text-gray-300">{evento}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {entity.itans && entity.itans.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-6">Ìtàn (Mitos e Lendas)</h2>
                  <div className="space-y-6">
                    {entity.itans.map((itan, i) => (
                      <div key={i} className="bg-[#111] p-6 rounded-2xl border border-[#222]">
                        <h3 className="text-xl font-serif text-[#C49E30] mb-3">{itan.titulo}</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">{itan.historia}</p>
                        {itan.licao && (
                          <div className="bg-[#1a1a1a] p-3 rounded-lg border-l-2 border-gray-500">
                            <strong className="text-gray-400 text-sm">Lição Oculta:</strong>
                            <p className="text-gray-400 text-sm italic mt-1">{itan.licao}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* TAB: FUNDAMENTOS */}
          {activeTab === 'fundamentos' && (
            <div className="space-y-8 animate-fade-in">
              
              {entity.dominios && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Domínios Espirituais</h2>
                  <div className="flex flex-wrap gap-2">
                    {entity.dominios.map((d, i) => (
                      <span key={i} className="px-4 py-2 bg-[#111] border border-[#222] text-[#C49E30] rounded-lg font-medium">{d}</span>
                    ))}
                  </div>
                </section>
              )}

              {entity.correspondencias && (
                <section className="bg-[#111] p-6 rounded-2xl border border-[#222]">
                  <h2 className="text-xl font-serif text-[#E8DCC2] mb-4">Correspondências Naturais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {entity.correspondencias.locaisNatureza && (
                      <div>
                        <strong className="text-gray-500 text-sm block mb-2">Locais de Força</strong>
                        <ul className="text-gray-300 space-y-1">
                          {entity.correspondencias.locaisNatureza.map((l, i) => <li key={i}>{l}</li>)}
                        </ul>
                      </div>
                    )}
                    {entity.correspondencias.metaisPedras && (
                      <div>
                        <strong className="text-gray-500 text-sm block mb-2">Metais e Pedras</strong>
                        <ul className="text-gray-300 space-y-1">
                          {entity.correspondencias.metaisPedras.map((m, i) => <li key={i}>{m}</li>)}
                        </ul>
                      </div>
                    )}
                    {entity.correspondencias.animais && (
                      <div>
                        <strong className="text-gray-500 text-sm block mb-2">Animais Sagrados</strong>
                        <ul className="text-gray-300 space-y-1">
                          {entity.correspondencias.animais.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {entity.ervas && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Ervas Sagradas (Ewé)</h2>
                  <div className="bg-[#111] p-6 rounded-2xl border border-[#222]">
                    {entity.ervas.liturgicas && (
                      <div className="mb-4">
                        <strong className="text-[#C49E30] block mb-2">Ervas Litúrgicas:</strong>
                        <p className="text-gray-300">{entity.ervas.liturgicas.join(', ')}</p>
                      </div>
                    )}
                    {entity.ervas.medicinais && (
                      <div>
                        <strong className="text-[#C49E30] block mb-2">Ervas Medicinais:</strong>
                        <p className="text-gray-300">{entity.ervas.medicinais.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {entity.ewoTabus && entity.ewoTabus.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-red-400 mb-4 flex items-center gap-2">
                    <ShieldAlert size={24} /> Ewó (Tabus Sagrados)
                  </h2>
                  <div className="space-y-4">
                    {entity.ewoTabus.map((ewo, i) => (
                      <div key={i} className="bg-red-950/20 p-4 rounded-xl border border-red-900/30">
                        <strong className="text-red-400 block mb-1">O que é proibido: {ewo.tabu}</strong>
                        <p className="text-gray-300 text-sm">{ewo.motivo}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* TAB: CULTO & DEVOÇÃO */}
          {activeTab === 'culto' && (
            <div className="space-y-12 animate-fade-in">
              
              {entity.qualidades && entity.qualidades.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Qualidades / Caminhos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {entity.qualidades.map((q, i) => (
                      <div key={i} className="bg-[#111] p-4 rounded-xl border border-[#222]">
                        <strong className="text-[#C49E30] block mb-1">{q.nome}</strong>
                        <p className="text-gray-400 text-sm">{q.descricao}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {entity.orikis && entity.orikis.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Oríkì (Louvações Sagradas)</h2>
                  <div className="space-y-4">
                    {entity.orikis.map((oriki, i) => (
                      <div key={i} className="bg-[#111] p-6 rounded-2xl border-l-4 border-[#C49E30]">
                        <p className="text-gray-200 font-serif text-lg italic mb-3">"{oriki.yoruba}"</p>
                        <p className="text-gray-400 text-sm">Tradução: {oriki.traducao}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {entity.cultos && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Cultos Regionais</h2>
                  <div className="space-y-4">
                    {entity.cultos.tradicionalAfricano && (
                      <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                        <strong className="text-gray-300 block mb-1">Na África (Tradição Yorùbá):</strong>
                        <p className="text-gray-400 text-sm">{entity.cultos.tradicionalAfricano}</p>
                      </div>
                    )}
                    {entity.cultos.brasil && (
                      <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                        <strong className="text-gray-300 block mb-1">No Brasil (Candomblé / Umbanda):</strong>
                        <p className="text-gray-400 text-sm">{entity.cultos.brasil}</p>
                      </div>
                    )}
                    {entity.cultos.cuba && (
                      <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                        <strong className="text-gray-300 block mb-1">Em Cuba (Santería / Regla de Ocha):</strong>
                        <p className="text-gray-400 text-sm">{entity.cultos.cuba}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {entity.pontosCantados && entity.pontosCantados.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4 flex items-center gap-2">
                    <Music size={24} className="text-[#C49E30]" /> Pontos Cantados
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {entity.pontosCantados.map((ponto, i) => (
                      <div key={i} className="bg-gradient-to-r from-[#111] to-[#1a1a1a] p-4 rounded-xl border border-[#222]">
                        <p className="text-gray-300 text-sm italic">"{ponto}"</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* TAB: ACADÊMICO */}
          {activeTab === 'academico' && (
            <div className="space-y-12 animate-fade-in">
              
              {entity.perguntasFrequentes.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-6">Dúvidas Frequentes (FAQ)</h2>
                  <div className="space-y-4">
                    {entity.perguntasFrequentes.map((faq, i) => (
                      <div key={i} className="bg-[#111] p-5 rounded-xl border border-[#222]">
                        <h4 className="text-[#C49E30] font-medium mb-2">{faq.pergunta}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{faq.resposta}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {entity.referencias && entity.referencias.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Referências Bibliográficas</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    {entity.referencias.map((ref, i) => (
                      <li key={i}>{ref}</li>
                    ))}
                  </ul>
                </section>
              )}

              {(() => {
                const related = ENCYCLOPEDIA_DATA
                  .filter(e => {
                    const eNome = e.nome || (e as any).name || '';
                    return e.id !== entity.id && (
                      (e.categoria || (e as any).category) === (entity.categoria || (entity as any).category) ||
                      (entity.pesquisasRelacionadas && entity.pesquisasRelacionadas.some(p => eNome.toLowerCase().includes(p.toLowerCase()))) ||
                      (entity.correspondencias?.animais && e.correspondencias?.animais?.some(a => entity.correspondencias!.animais!.includes(a))) ||
                      (entity.dominios && e.dominios && entity.dominios.some(d => e.dominios!.includes(d)))
                    );
                  })
                  .slice(0, 6);
                
                if (related.length === 0) return null;
                
                return (
                  <section>
                    <h2 className="text-2xl font-serif text-[#E8DCC2] mb-4">Entidades Relacionadas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {related.map(rel => (
                        <button
                          key={rel.id}
                          onClick={() => {
                            window.history.pushState({}, '', `/enciclopedia/${rel.id}`);
                            window.dispatchEvent(new CustomEvent('open-entity', { detail: rel.id }));
                          }}
                          className="text-left p-4 bg-[#111] rounded-xl border border-[#222] hover:border-[#C49E30]/50 transition-all group"
                        >
                          <h4 className="text-sm font-bold text-white group-hover:text-[#C49E30] transition-colors">{rel.nome}</h4>
                          <p className="text-xs text-gray-500 mt-1">{rel.categoria}</p>
                          <p className="text-xs text-gray-400 mt-2 line-clamp-2">{rel.historiaTradicional.substring(0, 100)}...</p>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })()}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

