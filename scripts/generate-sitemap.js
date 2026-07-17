import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const IFA_ORDER = ['Ogbe','Oyeku','Iwori','Odi','Irosun','Owonrin','Obara','Okanran','Ogunda','Osa','Ika','Oturupon','Otura','Irete','Ose','Ofun'];

function getMejiName(s) {
  return s === 'Ogbe' ? 'Ejiogbe' : s === 'Oyeku' ? 'Oyeku Meji' : s + ' Meji';
}

function encodeOduName(name) {
  return encodeURIComponent(name);
}

// Dynamically extract all article slugs from articles.ts
function getArticleSlugs() {
  const articlesPath = resolve(__dirname, '..', 'src', 'data', 'articles.ts');
  const content = readFileSync(articlesPath, 'utf-8');
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

const ARTICLE_SLUGS = getArticleSlugs();
console.log(`Sitemap: found ${ARTICLE_SLUGS.length} article slugs`);

const STATIC_PAGES = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/enciclopedia', priority: '0.95', changefreq: 'daily' },
  { loc: '/enciclopedia/orixas', priority: '0.90', changefreq: 'weekly' },
  { loc: '/enciclopedia/exus', priority: '0.85', changefreq: 'weekly' },
  { loc: '/enciclopedia/pombagiras', priority: '0.85', changefreq: 'weekly' },
  { loc: '/enciclopedia/voduns', priority: '0.80', changefreq: 'monthly' },
  { loc: '/enciclopedia/nkisis', priority: '0.80', changefreq: 'monthly' },
  { loc: '/enciclopedia/loa', priority: '0.80', changefreq: 'monthly' },
  { loc: '/artigos', priority: '0.9', changefreq: 'weekly' },
  { loc: '/odu', priority: '0.95', changefreq: 'daily' },
  { loc: '/prayers', priority: '0.8', changefreq: 'monthly' },
  { loc: '/dictionary', priority: '0.7', changefreq: 'monthly' },
  { loc: '/treatise', priority: '0.8', changefreq: 'monthly' },
  { loc: '/manual', priority: '0.5', changefreq: 'monthly' },
  { loc: '/agenda', priority: '0.6', changefreq: 'weekly' },
  { loc: '/history', priority: '0.4', changefreq: 'monthly' },
  { loc: '/amutorunwa', priority: '0.6', changefreq: 'monthly' },
];

const ARTICLE_URLS = ARTICLE_SLUGS.map(s => `/artigos/${s}`);

const ODU_URLS = [];
for (const s1 of IFA_ORDER) {
  for (const s2 of IFA_ORDER) {
    const name = s1 === s2 ? getMejiName(s1) : `${s1} ${s2}`;
    ODU_URLS.push(`/odu/${encodeOduName(name)}`);
  }
}

const ENTITY_PRIORITY = {
  'Divindade Suprema': '1.0', 'Orixá Primordial': '0.95', 'Orixá': '0.90',
  'Exu': '0.85', 'Pombagira': '0.85', 'Vodun': '0.80', 'Nkisi': '0.80',
  'Loa': '0.80', 'Caboclo': '0.80', 'Pretovelho': '0.80', 'Guerreiro': '0.80',
  'Ancestral': '0.75',
};

const B = 'https://ifaoluwo.com';
const now = new Date().toISOString().split('T')[0];
const urls = [];

for (const p of STATIC_PAGES) {
  urls.push(`  <url>\n    <loc>${B}${p.loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n    <xhtml:link rel="alternate" hreflang="pt" href="${B}${p.loc}?lang=pt" />\n    <xhtml:link rel="alternate" hreflang="en" href="${B}${p.loc}?lang=en" />\n    <xhtml:link rel="alternate" hreflang="es" href="${B}${p.loc}?lang=es" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${B}${p.loc}" />\n  </url>`);
}

for (const path of ODU_URLS) {
  urls.push(`  <url>\n    <loc>${B}${path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n    <xhtml:link rel="alternate" hreflang="pt" href="${B}${path}?lang=pt" />\n    <xhtml:link rel="alternate" hreflang="en" href="${B}${path}?lang=en" />\n    <xhtml:link rel="alternate" hreflang="es" href="${B}${path}?lang=es" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${B}${path}" />\n  </url>`);
}

for (const path of ARTICLE_URLS) {
  urls.push(`  <url>\n    <loc>${B}${path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n    <xhtml:link rel="alternate" hreflang="pt" href="${B}${path}?lang=pt" />\n    <xhtml:link rel="alternate" hreflang="en" href="${B}${path}?lang=en" />\n    <xhtml:link rel="alternate" hreflang="es" href="${B}${path}?lang=es" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${B}${path}" />\n  </url>`);
}

// Try to load encyclopedia data and add entity URLs
try {
  const modPath = resolve(__dirname, '..', 'src', 'data', 'encyclopedia', 'index.js');
  const { ENCYCLOPEDIA_DATA } = await import(modPath);
  console.log(`Sitemap: adding ${ENCYCLOPEDIA_DATA.length} encyclopedia entities`);
  for (const entity of ENCYCLOPEDIA_DATA) {
    const priority = ENTITY_PRIORITY[entity.categoria] || '0.75';
    urls.push(`  <url>\n    <loc>${B}/enciclopedia/${entity.id}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n    <xhtml:link rel="alternate" hreflang="pt" href="${B}/enciclopedia/${entity.id}?lang=pt" />\n    <xhtml:link rel="alternate" hreflang="en" href="${B}/encyclopedia/${entity.id}?lang=en" />\n    <xhtml:link rel="alternate" hreflang="es" href="${B}/encyclopedia/${entity.id}?lang=es" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${B}/enciclopedia/${entity.id}" />\n  </url>`);
  }
} catch (e) {
  console.warn('Could not load encyclopedia entities for sitemap:', e.message);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>`;

const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`Sitemap generated: ${outPath} (${urls.length} URLs)`);
