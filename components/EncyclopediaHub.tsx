import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { ENCYCLOPEDIA_DATA, CategoriaEntidade } from '../src/data/encyclopedia';
import SEO from './SEO';

interface Props {
  onBack: () => void;
  onSelectCategory?: (category: CategoriaEntidade) => void;
}

export function EncyclopediaHub({ onBack, onSelectCategory }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoriaEntidade | 'Todos'>('Todos');

  const categories: (CategoriaEntidade | 'Todos')[] = ['Todos', 'Divindade Suprema', 'Orixá', 'Exu', 'Pombagira', 'Vodun', 'Nkisi', 'Loa', 'Caboclo', 'Pretovelho', 'Guerreiro', 'Ancestral'];

  const filteredEntities = useMemo(() => {
    return ENCYCLOPEDIA_DATA.filter(entity => {
      const nome = entity.nome || (entity as any).name || '';
      const historia = entity.historiaTradicional || (entity as any).identification?.description || '';
      const matchesSearch = nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            historia.toLowerCase().includes(searchTerm.toLowerCase());
      const category = entity.categoria || (entity as any).category;
      const matchesCategory = selectedCategory === 'Todos' || category === selectedCategory || (entity as any).category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const hubKeywords = useMemo(() => {
    const base = [
      'enciclopédia sagrada', 'orixás', 'exu', 'pombagira', 'ifá', 'yorubá',
      'candomblé', 'umbanda', 'santería', 'vodum', 'nkisi', 'loa',
      'religiões de matriz africana', 'dossiê completo', 'enciclopedia orixás',
      'sacred encyclopedia', 'orisha', 'african diaspora religions',
      'enciclopedia sagrada orixás', 'dicionário yorubá', 'panteão africano',
      ...ENCYCLOPEDIA_DATA.flatMap(e => [
        e.nome || (e as any).name, 
        e.nomeYoruba || (e as any).metadata?.yorubaName, 
        e.nomeIngles || (e as any).metadata?.englishName, 
        e.nomeEspanhol || (e as any).metadata?.spanishName
      ].filter(Boolean))
    ];
    return Array.from(new Set(base)).slice(0, 50);
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4 pb-24" style={{ background: '#0a0a0a' }}>
      <SEO 
        title="Enciclopédia Sagrada | 300+ Orixás, Exus, Pombagiras — Ifá Oluwo"
        description="A maior enciclopédia digital de religiões de matriz africana: 300+ dossiês completos de Orixás, Exus, Pombagiras, Voduns, Nkisis e Loa. Tradição Yorubá, Candomblé, Umbanda, Santería."
        keywords={hubKeywords}
        canonical="https://ifaoluwo.com/enciclopedia"
        hreflang={[
          { lang: 'pt', url: 'https://ifaoluwo.com/enciclopedia?lang=pt' },
          { lang: 'en', url: 'https://ifaoluwo.com/encyclopedia?lang=en' },
          { lang: 'es', url: 'https://ifaoluwo.com/enciclopedia?lang=es' },
          { lang: 'yo', url: 'https://ifaoluwo.com/encyclopedia?lang=yo' },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Enciclopédia Sagrada — Ifá Oluwo",
          "description": "A maior enciclopédia digital de religiões de matriz africana com 300+ dossiês completos.",
          "url": "https://ifaoluwo.com/enciclopedia",
          "numberOfItems": ENCYCLOPEDIA_DATA.length,
          "provider": {
            "@type": "Organization",
            "name": "Ifá Oluwo",
            "url": "https://ifaoluwo.com"
          },
          "inLanguage": ["pt", "en", "es", "yo"]
        }}
      />
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={onBack}
            className="p-2 rounded-full transition-colors"
            style={{ background: 'rgba(196,158,48,0.1)', color: '#C49E30' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-serif text-[#C49E30]">Enciclopédia Sagrada</h1>
            <p className="text-sm text-gray-400">Panteão de Orixás, Exus e Pombagiras</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Buscar entidade, lenda ou característica..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-[#222] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#C49E30] transition-colors"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#222] bg-[#111] text-gray-400">
              <Filter size={14} />
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#C49E30] text-black shadow-[0_0_15px_rgba(196,158,48,0.3)]' 
                    : 'bg-[#1a1a1a] text-gray-400 border border-[#333] hover:border-[#C49E30]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Category Quick Access */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {categories.filter(c => c !== 'Todos').map(cat => {
            const count = ENCYCLOPEDIA_DATA.filter(e => e.categoria === cat || (e as any).category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory ? onSelectCategory(cat) : setSelectedCategory(cat)}
                className="p-3 rounded-xl border border-[#222] bg-[#111] hover:border-[#C49E30]/50 transition-all text-left group"
              >
                <div className="text-lg font-bold text-[#C49E30]">{count}</div>
                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{cat}s</div>
              </button>
            );
          })}
        </div>

        {/* Entity Grid */}
        {filteredEntities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhuma entidade encontrada para a sua busca.
          </div>
        ) : (
          <div className="space-y-8">
            {Array.from(new Set(filteredEntities.map(e => e.categoria || (e as any).category))).map(cat => (
              <div key={cat as string}>
                <h2 className="text-xl font-serif text-[#E8DCC2] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C49E30]"></span>
                  {cat}s
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEntities.filter(e => (e.categoria || (e as any).category) === cat).map(entity => (
                    <button
                      key={entity.id}
                      onClick={() => {
                        window.history.pushState({}, '', `/enciclopedia/${entity.id}`);
                        window.dispatchEvent(new CustomEvent('open-entity', { detail: entity.id }));
                      }}
                      className="flex flex-col text-left p-5 rounded-xl border border-[#222] bg-gradient-to-br from-[#111] to-[#0a0a0a] hover:border-[#C49E30]/50 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-[#C49E30] transition-colors">{entity.nome || (entity as any).name}</h3>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#222] text-[#C49E30]">
                            {entity.categoria || (entity as any).category}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
                        {entity.historiaTradicional || (entity as any).identification?.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                        <span>{entity.reino || entity.linha}</span>
                        <span className="text-[#C49E30] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Ler mais →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
