// ============================================================
// BUSCADOR NA BIBLIOTECA LOCAL DE IFÁ
// Carrega o library-index.json e busca trechos relevantes
// para enriquecer o prompt do Groq com fontes reais
// ============================================================

interface LibraryIndex {
  version: string;
  generated: string;
  totalChunks: number;
  index: Record<string, string[]>;
}

let libraryCache: LibraryIndex | null = null;
let loadingPromise: Promise<void> | null = null;

const normalizeOduName = (name: string): string =>
  name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

async function loadLibrary(): Promise<void> {
  if (libraryCache) return;
  try {
    const res = await fetch('/library-index.json');
    if (!res.ok) throw new Error('Arquivo não encontrado');
    libraryCache = await res.json();
    console.log(`📚 Biblioteca Ifá carregada: ${libraryCache?.totalChunks} chunks indexados`);
  } catch (e) {
    console.warn('⚠ library-index.json não encontrado. Rode: npm run index-library');
    libraryCache = { version: '0', generated: '', totalChunks: 0, index: {} };
  }
}

export async function searchLibrary(oduName: string, maxResults = 4): Promise<string> {
  if (!loadingPromise) {
    loadingPromise = loadLibrary();
  }
  await loadingPromise;

  if (!libraryCache || libraryCache.totalChunks === 0) return '';

  const normalized = normalizeOduName(oduName);
  const parts = normalized.split(' ');
  const results: string[] = [];

  // 1. Busca exata pelo nome do Odu
  if (libraryCache.index[normalized]) {
    results.push(...libraryCache.index[normalized].slice(0, 2));
  }

  // 2. Busca por partes do nome (ex: "odi" + "irete" separados)
  for (const part of parts) {
    if (part.length < 3) continue;
    if (libraryCache.index[part] && results.length < maxResults) {
      const toAdd = libraryCache.index[part].slice(0, 2);
      results.push(...toAdd.filter(t => !results.includes(t)));
    }
  }

  // 3. Complementa com trechos de Ebós e Itans gerais
  if (results.length < maxResults) {
    const ebo = libraryCache.index['_ebo'] || [];
    results.push(...ebo.slice(0, 1).filter(t => !results.includes(t)));
  }
  if (results.length < maxResults) {
    const itan = libraryCache.index['_itan'] || [];
    results.push(...itan.slice(0, 1).filter(t => !results.includes(t)));
  }

  const finalResults = results.slice(0, maxResults);
  if (finalResults.length === 0) return '';

  return `\n\n=== TRECHOS DA BIBLIOTECA LOCAL DE IFÁ (fonte primária) ===\n` +
    finalResults.map((t, i) => `[Trecho ${i + 1}]:\n${t.trim()}`).join('\n\n---\n') +
    `\n=== FIM DOS TRECHOS ===\n`;
}

export function isLibraryLoaded(): boolean {
  return libraryCache !== null && libraryCache.totalChunks > 0;
}

export function getLibraryStats(): { total: number; odus: number } {
  if (!libraryCache) return { total: 0, odus: 0 };
  const odus = Object.keys(libraryCache.index).filter(k => !k.startsWith('_')).length;
  return { total: libraryCache.totalChunks, odus };
}
