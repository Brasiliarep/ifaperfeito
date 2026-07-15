import type { EncyclopediaEntity, CategoriaEntidade } from './types';

const categoryCache: Record<string, EncyclopediaEntity[]> = {};

export async function loadCategory(category: CategoriaEntidade): Promise<EncyclopediaEntity[]> {
  if (categoryCache[category]) return categoryCache[category];

  const all = await import('./index');
  categoryCache[category] = all.ENCYCLOPEDIA_DATA.filter(e => e.categoria === category);
  return categoryCache[category];
}

export async function searchEntities(query: string): Promise<EncyclopediaEntity[]> {
  const all = await import('./index');
  const q = query.toLowerCase();
  return all.ENCYCLOPEDIA_DATA.filter(e =>
    e.nome.toLowerCase().includes(q) ||
    e.historiaTradicional.toLowerCase().includes(q)
  );
}

export async function getEntityById(id: string): Promise<EncyclopediaEntity | undefined> {
  const all = await import('./index');
  return all.ENCYCLOPEDIA_DATA.find(e => e.id === id);
}

export async function getEntityCount(): Promise<number> {
  const all = await import('./index');
  return all.ENCYCLOPEDIA_DATA.length;
}
