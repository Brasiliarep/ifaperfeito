import React from 'react';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { getArticleBySlug, ARTICLES } from '../src/data/articles';
import SEO from './SEO';

interface Props {
  slug: string;
  onBack: () => void;
}

export function ArticleViewer({ slug, onBack }: Props) {
  const article = getArticleBySlug(slug);
  const allArticles = ARTICLES;

  if (!article) {
    return (
      <div className="min-h-screen pt-20 px-4" style={{ maxWidth: 800, margin: '0 auto' }}>
        <button onClick={onBack} className="flex items-center gap-2 text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <ArrowLeft size={16} /> Voltar
        </button>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Artigo não encontrado.</p>
      </div>
    );
  }

  const currentIdx = allArticles.findIndex(a => a.slug === slug);
  const prev = currentIdx > 0 ? allArticles[currentIdx - 1] : null;
  const next = currentIdx < allArticles.length - 1 ? allArticles[currentIdx + 1] : null;

  return (
    <div className="min-h-screen pt-20 px-4 pb-16" style={{ maxWidth: 800, margin: '0 auto' }}>
      <SEO
        title={`${article.title} | Ifá Oluwo`}
        description={article.description}
        keywords={[...article.tags, 'Ifá', 'Yorubá', 'Ifá Oluwo', article.title]}
        canonical={`https://ifaoluwo.com/artigos/${article.slug}`}
        url={`https://ifaoluwo.com/artigos/${article.slug}`}
        image={article.image || 'https://ifaoluwo.com/logo.png'}
        hreflang={[
          { lang: 'pt', url: `https://ifaoluwo.com/artigos/${article.slug}?lang=pt` },
          { lang: 'x-default', url: `https://ifaoluwo.com/artigos/${article.slug}` }
        ]}
        article={{
          publishedTime: article.publishedAt,
          modifiedTime: article.updatedAt || article.publishedAt,
          author: 'Ifá Oluwo',
          section: article.tags[0] || 'Ifá',
          tags: article.tags
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.title,
          "description": article.description,
          "image": article.image || 'https://ifaoluwo.com/logo.png',
          "author": {
            "@type": "Organization",
            "name": "Ifá Oluwo",
            "url": "https://ifaoluwo.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Ifá Oluwo",
            "url": "https://ifaoluwo.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://ifaoluwo.com/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://ifaoluwo.com/artigos/${article.slug}`
          },
          "datePublished": article.publishedAt,
          "dateModified": article.updatedAt || article.publishedAt,
          "keywords": article.tags.join(', '),
          "inLanguage": "pt-BR",
          "wordCount": article.content.replace(/<[^>]+>/g, '').split(/\s+/).length
        }}
      />
      <button onClick={onBack} className="flex items-center gap-2 text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <ArrowLeft size={16} /> Todos os Artigos
      </button>

      <article>
        <h1 className="text-xl font-serif mb-4 leading-snug" style={{ color: '#E8DCC2' }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'rgba(196,158,48,0.5)' }}>
            <Clock size={13} /> {article.publishedAt}
          </div>
          {article.tags.map(tag => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
              style={{ background: 'rgba(196,158,48,0.08)', color: '#C49E30', border: '1px solid rgba(196,158,48,0.12)' }}
            >
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <div
          className="article-content"
          style={{ lineHeight: 1.8, fontSize: 14 }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(196,158,48,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          {prev ? (
            <button
              onClick={() => { window.history.pushState({}, '', `/artigos/${prev.slug}`); window.dispatchEvent(new CustomEvent('open-article', { detail: prev.slug })); }}
              className="text-sm text-left flex flex-col gap-1 p-3 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,158,48,0.1)', flex: 1 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1 }}>Anterior</span>
              <span style={{ color: '#C49E30' }}>{prev.title}</span>
            </button>
          ) : <div style={{ flex: 1 }} />}
          {next ? (
            <button
              onClick={() => { window.history.pushState({}, '', `/artigos/${next.slug}`); window.dispatchEvent(new CustomEvent('open-article', { detail: next.slug })); }}
              className="text-sm text-right flex flex-col gap-1 p-3 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,158,48,0.1)', flex: 1 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1 }}>Próximo</span>
              <span style={{ color: '#C49E30' }}>{next.title}</span>
            </button>
          ) : <div style={{ flex: 1 }} />}
        </div>
      </div>
    </div>
  );
}
