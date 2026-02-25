
/**
 * Normaliza textos removendo acentos latinos e convertendo caracteres
 * especiais Yorubá para caracteres ASCII padrão para facilitar a busca.
 * Ex: 'Ṣàngó' -> 'sango', 'Ẹbọ' -> 'ebo'
 */
export const normalizeText = (text: string | undefined | null): string => {
  if (!text) return "";
  
  return text
    .normalize('NFD') // Separa os acentos das letras (ex: é -> e + ´)
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos comuns
    .replace(/[ḍẹọṣṢẸỌ]/g, (c) => { // Trata caracteres especiais Yorubá
        const map: Record<string, string> = { 
            'ḍ': 'd', 
            'ẹ': 'e', 
            'ọ': 'o', 
            'ṣ': 's', 
            'Ṣ': 'S', 
            'Ẹ': 'E', 
            'Ọ': 'O' 
        };
        return map[c] || c;
    })
    .toLowerCase()
    .trim();
};
