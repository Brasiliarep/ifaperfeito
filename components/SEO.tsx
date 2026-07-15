import React, { useEffect } from 'react';

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

export default function SEO({ 
  title, 
  description, 
  image = 'https://ifaoluwo.com/logo.png', 
  url = 'https://ifaoluwo.com',
  type = 'website',
  keywords = [],
  jsonLd,
  canonical,
  hreflang = [],
  article,
  noindex = false
}: SEOProps) {
  
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // 3. Meta Keywords
    if (keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords.join(', '));
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', keywords.join(', '));
        document.head.appendChild(metaKeywords);
      }
    }

    // 4. Canonical URL
    const canonicalUrl = canonical || url;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalUrl);
    } else {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalTag);
    }

    // 5. Robots
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (robotsTag) {
        robotsTag.setAttribute('content', 'noindex, nofollow');
      } else {
        robotsTag = document.createElement('meta');
        robotsTag.setAttribute('name', 'robots');
        robotsTag.setAttribute('content', 'noindex, nofollow');
        document.head.appendChild(robotsTag);
      }
    } else {
      if (robotsTag) {
        robotsTag.setAttribute('content', 'index, follow');
      }
    }

    // 6. Open Graph
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:url', url, true);
    setMeta('og:type', article ? 'article' : type, true);
    setMeta('og:site_name', 'Ifá Oluwo - Enciclopédia Sagrada', true);
    setMeta('og:locale', 'pt_BR', true);

    // 7. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setMeta('twitter:site', '@ifaluwo');
    setMeta('twitter:creator', '@ifaluwo');

    // 8. Article meta (if article)
    if (article) {
      if (article.publishedTime) setMeta('article:published_time', article.publishedTime, true);
      if (article.modifiedTime) setMeta('article:modified_time', article.modifiedTime, true);
      if (article.author) setMeta('article:author', article.author, true);
      if (article.section) setMeta('article:section', article.section, true);
      if (article.tags) {
        article.tags.forEach(tag => setMeta('article:tag', tag, true));
      }
    }

    // 9. JSON-LD
    let jsonLdScript = document.getElementById('page-json-ld');
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
