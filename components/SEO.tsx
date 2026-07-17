import React, { useEffect } from 'react';

const SITE = 'https://ifaoluwo.com';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  jsonLd?: Record<string, any>;
  canonical?: string;
  hreflang?: { lang: string; url: string }[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (tag) {
    tag.setAttribute('content', content);
  } else {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  }
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra
    ? `link[rel="${rel}"][${Object.keys(extra)[0]}="${Object.values(extra)[0]}"]`
    : `link[rel="${rel}"]`;
  let tag = document.querySelector(selector) as HTMLLinkElement;
  if (tag) {
    tag.setAttribute('href', href);
    if (extra) Object.entries(extra).forEach(([k, v]) => tag.setAttribute(k, v));
  } else {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    tag.setAttribute('href', href);
    if (extra) Object.entries(extra).forEach(([k, v]) => tag.setAttribute(k, v));
    document.head.appendChild(tag);
  }
}

export default function SEO({
  title,
  description,
  image = `${SITE}/logo.png`,
  url = SITE,
  type = 'website',
  keywords = [],
  jsonLd,
  canonical,
  hreflang = [],
  article,
  noindex = false
}: SEOProps) {

  useEffect(() => {
    document.title = title;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDesc) metaDesc.setAttribute('content', description);
    else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }

    // Meta Keywords
    if (keywords.length > 0) setMeta('keywords', keywords.join(', '));

    // Canonical
    const canonicalUrl = canonical || url;
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalTag) canonicalTag.setAttribute('href', canonicalUrl);
    else {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalTag);
    }

    // Robots
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:url', url, true);
    setMeta('og:type', article ? 'article' : type, true);
    setMeta('og:site_name', 'Ifá Oluwo - Enciclopédia Sagrada', true);
    setMeta('og:locale', 'pt_BR', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setMeta('twitter:site', '@ifaluwo');
    setMeta('twitter:creator', '@ifaluwo');

    // Article meta
    if (article) {
      if (article.publishedTime) setMeta('article:published_time', article.publishedTime, true);
      if (article.modifiedTime) setMeta('article:modified_time', article.modifiedTime, true);
      if (article.author) setMeta('article:author', article.author, true);
      if (article.section) setMeta('article:section', article.section, true);
      if (article.tags) article.tags.forEach(tag => setMeta('article:tag', tag, true));
    }

    // Hreflang
    hreflang.forEach(h => {
      setLink('alternate', h.url, { hreflang: h.lang });
    });

    // JSON-LD
    let jsonLdScript = document.getElementById('page-json-ld') as HTMLScriptElement;
    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'page-json-ld';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }

  }, [title, description, image, url, type, keywords, jsonLd, canonical, hreflang, article, noindex]);

  return null;
}
