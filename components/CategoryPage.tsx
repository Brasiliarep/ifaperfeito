import React, { useMemo } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { ENCYCLOPEDIA_DATA, EncyclopediaEntity, CategoriaEntidade } from '../src/data/encyclopedia';
import SEO from './SEO';

interface Props {
  category: CategoriaEntidade;
  onBack: () => void;
  onSelectEntity: (id: string) => void;
}

const CATEGORY_DESCRIPTIONS: Record<string, { pt: string; en: string; icon: string }> = {
  'Orixá': { pt: 'Conheça todos os Orixás do panteão Yorubá — suas histórias, símbolos, cores, cantigas e tradições de culto.', en: 'Discover all Orishas of the Yoruba pantheon — their stories, symbols, colors, songs and worship traditions.', icon: '⚡' },
  'Exu': { pt: 'Dossiês completos dos Exus — guardiães das encruzilhadas, mensageiros entre os mundos.', en: 'Complete dossiers on Exus — guardians of crossroads, messengers between worlds.', icon: '🔥' },
  'Pombagira': { pt: 'Enciclopédia das Pombagiras — entidades femininas de poder, sedução e transformação.', en: 'Encyclopedia of Pombagiras — feminine entities of power, seduction and transformation.', icon: '🌹' },
  'Vodun': { pt: 'Os Voduns da tradição Fon/Dahomey — divindades da criação, natureza e destino.', en: 'The Voduns of the Fon/Dahomey tradition — deities of creation, nature and destiny.', icon: '🐍' },
  'Nkisi': { pt: 'Os Nkisis do Congo/Bantu — espíritos de poder, cura e justiça.', en: 'The Nkisis of the Kongo/Bantu tradition — spirits of power, healing and justice.', icon: '🪨' },
  'Loa': { pt: 'Os Loa do Vodu Haitiano — Baron Samedi, Papa Legba, Erzulie e mais.', en: 'The Loa of Haitian Vodou — Baron Samedi, Papa Legba, Erzulie and more.', icon: '🎭' },
  'Caboclo': { pt: 'Caboclos da Umbanda — espíritos indígenas brasileiros de caça, cura e natureza.', en: 'Caboclos of Umbanda — Brazilian indigenous spirits of hunting, healing and nature.', icon: '🏹' },
  'Pretovelho': { pt: 'Pretos Velhos — ancestrais sábios e protetores da Umbanda.', en: 'Pretos Velhos — wise and protective ancestors of Umbanda.', icon: '👴' },
  'Guerreiro': { pt: 'Guerreiros — espíritos de batalha, coragem e proteção.', en: 'Warriors — spirits of battle, courage and protection.', icon: '⚔️' },
  'Ancestral': { pt: 'Ancestrais e Eguns — espíritos dos que partiram, guias espirituais.', en: 'Ancestors and Eguns — spirits of the departed, spiritual guides.', icon: '👻' },
  'Divindade Suprema': { pt: 'As divindades supremas — Olódùmarè e as forças criadoras.', en: 'Supreme deities — Olódùmarè and the creative forces.', icon: '👑' },
};

export function CategoryPage({ category, onBack, onSelectEntity }: Props) {
  const entities = useMemo(() => ENCYCLOPEDIA_DATA.filter(e => e.categoria === category), [category]);
  const catInfo = CATEGORY_DESCRIPTIONS[category] || { pt: `Entidades da categoria ${category}`, en: `Entities of category ${category}`, icon: '✨' };
  const [search, setSearch] = React.useState('');

  const filtered = useMemo(() => {
    if (!search) return entities;
    const s = search.toLowerCase();
    return entities.filter(e => 
      e.nome.toLowerCase().includes(s) || 
      (e.nomeYoruba && e.nomeYoruba.toLowerCase().includes(s)) ||
      e.historiaTradicional.toLowerCase().includes(s)
    );
  }, [entities, search]);

  const baseUrl = 'https://ifaoluwo.com';

  return (
    <div className="min-h-screen pt-20 px-4 pb-24 bg-[#0a0a0a]">
      <SEO
        title={`${catInfo.icon} ${category}s | Enciclopédia Sagrada Ifá Oluwo`}
        description={catInfo.pt}
        canonical={`${baseUrl}/enciclopedia/${category.toLowerCase()}s`}
        hreflang={[
          { lang: 'pt', url: `${baseUrl}/enciclopedia/${category.toLowerCase()}s?lang=pt` },
          { lang: 'en', url: `${baseUrl}/encyclopedia/${category.toLowerCase()}s?lang=en` },
          { lang: 'es', url: `${baseUrl}/enciclopedia/${category.toLowerCase()}s?lang=es` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${category}s — Enciclopédia Sagrada`,
          "description": catInfo.pt,
          "url": `${baseUrl}/enciclopedia/${category.toLowerCase()}s`,
          "numberOfItems": entities.length,
          "provider": { "@type": "Organization", "name": "Ifá Oluwo", "url": baseUrl }
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="p-2 rounded-full bg-[#111] text-[#C49E30] hover:bg-[#C49E30] hover:text-black transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-serif text-[#C49E30]">{catInfo.icon} {category}s</h1>
            <p className="text-sm text-gray-400 mt-1">{catInfo.pt}</p>
            <p className="text-xs text-gray-500 mt-1">{entities.length} entidades documentadas</p>
          </div>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder={`Buscar ${category.toLowerCase()}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#C49E30] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(entity => (
            <button
              key={entity.id}
              onClick={() => onSelectEntity(entity.id)}
              className="flex flex-col text-left p-5 rounded-xl border border-[#222] bg-gradient-to-br from-[#111] to-[#0a0a0a] hover:border-[#C49E30]/50 transition-all group"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-white group-hover:text-[#C49E30] transition-colors">{entity.nome}</h3>
                {entity.nomeYoruba && <p className="text-xs text-gray-500 mt-1">Yorùbá: {entity.nomeYoruba}</p>}
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
                {entity.historiaTradicional.substring(0, 150)}...
              </p>
              <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                <span>{entity.reino || entity.linha || category}</span>
                <span className="text-[#C49E30] group-hover:translate-x-1 transition-transform">Ler mais →</span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">Nenhuma entidade encontrada.</div>
        )}
      </div>
    </div>
  );
}
