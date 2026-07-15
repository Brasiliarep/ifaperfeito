const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../NOVOS_ORIXAS');
const outputDir = path.join(__dirname, '../src/data/encyclopedia/imported');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.md'));
const importedEntities = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(inputDir, file), 'utf-8');
  
  // Extract entity ID from filename (e.g. enciclopedia_orixas_01_esu.md -> esu)
  let idMatch = file.match(/_(\w+)\.md$/);
  let id = idMatch ? idMatch[1] : file.replace('.md', '');
  
  // Extract all sections
  const sections = {};
  const sectionRegex = /##\s+([\d–\-]+)\.?\s+(.*?)\n([\s\S]*?)(?=\n##\s+|$)/g;
  let match;
  while ((match = sectionRegex.exec(content)) !== null) {
    const title = match[2].trim().toUpperCase();
    const body = match[3].trim();
    sections[title] = body;
  }
  
  // Helper to extract fields like "**Nome em Yorùbá:** valor"
  function extractField(text, fieldName) {
    const regex = new RegExp(`\\*\\*${fieldName}\\*\\*\\s*(.*)`);
    const m = text.match(regex);
    return m ? m[1].trim() : '';
  }

  // Helper to extract list items
  function extractList(text) {
    if (!text) return [];
    return text.split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-') || line.startsWith('*'))
      .map(line => line.replace(/^[-*]\s*/, '').trim());
  }
  
  function cleanCommas(text) {
    if (!text) return [];
    return text.split(/,|;/).map(s => s.trim()).filter(Boolean);
  }

  const idSection = sections['IDENTIFICAÇÃO'] || '';
  const classSection = sections['CLASSIFICAÇÃO'] || '';
  
  const nome = extractField(idSection, 'Nome principal:') || extractField(idSection, 'Nome em Yorùbá:') || id;
  const nomeYoruba = extractField(idSection, 'Nome em Yorùbá:');
  const nomePortugues = extractField(idSection, 'Nome em Português.*?');
  const nomeIngles = extractField(idSection, 'Nome em Inglês:');
  const nomeEspanhol = extractField(idSection, 'Nome em Espanhol.*?');
  const variacoes = extractField(idSection, 'Variações regionais:');
  
  const categoriaText = extractField(classSection, 'Categoria:');
  let categoria = 'Orixá';
  if (categoriaText.match(/Supremo|Transcendental/i) || nome.match(/Olódùmarè|Olorun|Olófin/i)) {
    categoria = 'Divindade Suprema';
  } else if (nome.match(/Exu|Pombagira|Legba/i)) {
    categoria = 'Exu';
  }

  const linha = extractField(classSection, 'Função cósmica:');
  const reino = extractField(classSection, 'Domínios:') || (sections['DOMÍNIOS'] ? sections['DOMÍNIOS'].substring(0, 50) : '');

  const historiaTradicional = (sections['HISTÓRIA E ORIGEM'] || sections['BIOGRAFIA SAGRADA'] || '').trim();
  
  const simbolos = extractList(sections['SÍMBOLOS']) || cleanCommas(sections['SÍMBOLOS']);
  const cores = extractList(sections['CORES']) || cleanCommas(sections['CORES']);
  const elementos = extractList(sections['ELEMENTOS DA NATUREZA']) || cleanCommas(sections['ELEMENTOS DA NATUREZA']);
  
  const saudacao = extractField(sections['ORAÇÕES'] || '', '.*'); // taking first line basically
  let saudacaoStr = '';
  if (sections['ORAÇÕES']) {
      const sMatch = sections['ORAÇÕES'].match(/"([^"]+)"|\*([^*]+)\*/);
      if (sMatch) saudacaoStr = sMatch[1] || sMatch[2];
      else saudacaoStr = sections['ORAÇÕES'].split('\n')[0];
  }

  const entity = {
    id: id.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    nome: nome,
    nomeYoruba,
    nomeIngles,
    nomeEspanhol,
    variacoesRegionais: variacoes ? [variacoes] : [],
    categoria,
    linha,
    reino,
    historiaTradicional: historiaTradicional || 'História em elaboração.',
    simbolos: simbolos.length ? simbolos : ['Símbolos sagrados não especificados'],
    cores: cores.length ? cores : ['Cores não especificadas'],
    elementosNaturais: elementos.length ? elementos : ['Elementos não especificados'],
    saudacao: saudacaoStr || 'Saudação sagrada.',
    quemFoi: sections['BIOGRAFIA SAGRADA'] || undefined,
    personalidade: cleanCommas(extractField(sections['PERSONALIDADE'] || '', 'Características psicológicas:') || sections['PERSONALIDADE']),
    dominios: cleanCommas(sections['DOMÍNIOS']),
    comidas: extractList(sections['ALIMENTOS E OFERENDAS']) || cleanCommas(sections['ALIMENTOS E OFERENDAS']),
    perguntasFrequentes: [],
    palavrasChaveSEO: []
  };

  if (sections['PERGUNTAS MAIS BUSCADAS']) {
      const qLines = extractList(sections['PERGUNTAS MAIS BUSCADAS']);
      entity.perguntasFrequentes = qLines.map(q => ({ pergunta: q, resposta: "Consulte a enciclopédia para mais detalhes." }));
  }

  // SEO
  if (sections['SEO E IA — PALAVRAS-CHAVE']) {
      const ptMatch = sections['SEO E IA — PALAVRAS-CHAVE'].match(/\*\*Português.*?\*\*\s*(.*)/);
      if (ptMatch) entity.palavrasChaveSEO = cleanCommas(ptMatch[1]);
  }

  const tsCode = `import { EncyclopediaEntity } from '../types';

export const ${id.toUpperCase()}_DATA: EncyclopediaEntity = ${JSON.stringify(entity, null, 2)};
`;

  const outFilename = `${entity.id}.ts`;
  fs.writeFileSync(path.join(outputDir, outFilename), tsCode);
  importedEntities.push({ id: id.toUpperCase(), filename: entity.id });
});

const indexCode = `
${importedEntities.map(e => `import { ${e.id}_DATA } from './${e.filename}';`).join('\n')}

export const IMPORTED_ORIXAS_DATA = [
  ${importedEntities.map(e => `${e.id}_DATA`).join(',\n  ')}
];
`;

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexCode);

console.log('Successfully imported ' + importedEntities.length + ' entities.');
