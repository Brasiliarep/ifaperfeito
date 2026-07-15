import React from 'react';
import { ARTICLES, Article } from '../data/articles';
import { ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpen: (slug: string) => void;
}

export function ArticlesList({ onBack, onOpen }: Props) {
  return (
    <div className="min-h-screen pt-20 px-4 pb-12" style={{ maxWidth: 800, margin: '0 auto' }}>
      <button onClick={onBack} className="flex items-center gap-2 text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <ArrowLeft size={16} /> Voltar
      </button>

      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={22} style={{ color: '#C49E30' }} />
        <h1 className="text-2xl font-serif" style={{ color: '#E8DCC2' }}>Artigos</h1>
      </div>

      <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Conhecimento aprofundado sobre Ifá, Odus, rituais e a tradição Yorubá.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ARTICLES.map(article => (
          <ArticleCard key={article.id} article={article} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({ article, onOpen }: { article: Article; onOpen: (slug: string) => void }) {
  return (
    <button
      onClick={() => onOpen(article.slug)}
      className="text-left w-full p-5 rounded-xl transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(196,158,48,0.12)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,158,48,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(196,158,48,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.035)'; }}
    >
      <h2 className="text-base font-serif mb-2" style={{ color: '#E8DCC2', lineHeight: 1.3 }}>
        {article.title}
      </h2>
      <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
        {article.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: 'rgba(196,158,48,0.5)' }}>
          <Clock size={12} /> {article.publishedAt}
        </div>
        {article.tags.slice(0, 4).map(tag => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
            style={{ background: 'rgba(196,158,48,0.08)', color: '#C49E30', border: '1px solid rgba(196,158,48,0.12)' }}
          >
            <Tag size={10} /> {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
