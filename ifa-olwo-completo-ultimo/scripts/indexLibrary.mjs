import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Configuração ──────────────────────────────────────────────
const LIBRARY_PATH = `C:\\Users\\Sérgio França\\Desktop\\ifa`;
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'library-index.json');
const CHUNK_SIZE = 600; // palavras por chunk
const MAX_CHUNKS_PER_ODU = 20;

// ── Nomes dos 16 Odus Meji e variações comuns ─────────────────
const ODU_NAMES = [
  'ogbe', 'oyeku', 'iwori', 'odi', 'irosun', 'owonrin',
  'obara', 'okanran', 'ogunda', 'osa', 'ika', 'oturupon',
  'otura', 'irete', 'ose', 'ofun',
  // Combinações frequentes nos PDFs
  'ogbe meji','oyeku meji','iwori meji','odi meji','irosun meji',
  'owonrin meji','obara meji','okanran meji','ogunda meji','osa meji',
  'ika meji','oturupon meji','otura meji','irete meji','ose meji','ofun meji',
  // Variações graficas brasileiras
  'ejiogbe','oyeku','ejilasebora','odi ogbe','ogbe odi',
  'ose ogunda','ogunda ose','irete ogunda','ogunda irete',
  'odi irete','irete odi','obara ogunda','ogunda obara',
  'irosun ogunda','ogunda irosun','osa ogunda','ogunda osa',
  'otura ogunda','ogunda otura','otura osa','osa otura',
];

// ── Lista Negra (Anti-Sincretismo) ────────────────────────────
const BLACKLIST_WORDS = [
  'vela', 'velas', 'candomble', 'candomblé', 'umbanda', 'kimbanda', 'quimbanda',
  'pomba gira', 'pombagira', 'terreiro', 'padê', 'exu caveira', 'tranca rua', 'marabô',
  'caboclo', 'preto velho', 'preto-velho', 'despacho', 'encruzilhada', 'zepelintra', 'falange',
  'entidade', 'azeite de oliva', 'cigarro', 'charuto', 'fumo', 'tabaco', 'sincretismo',
  'incorporação', 'transe', 'dar santo', 'fazer santo',
  'porcelana', 'ágata', 'quartinha', 'louça',
  'cachaça', 'uísque', 'gim', 'rum', 'rumpi', 'lê', 'atabaque',
  'santo antônio', 'são jorge'
];

// ── Palavras-chave temáticas ──────────────────────────────────
const TOPIC_KEYWORDS = {
  ebo: ['ebo', 'ebó', 'sacrifício', 'oferta', 'oferenda', 'eje', 'akuko', 'adie', 'ewure', 'agbo', 'eyele'],
  itan: ['itan', 'itans', 'narrativa', 'história', 'mito', 'lenda', 'ese', 'verso'],
  akose: ['akose', 'akoses', 'remédio', 'magia', 'magias', 'feitiço', 'trabalho', 'ogun', 'oogun giga'],
  ervas: ['ewe', 'erva', 'folha', 'planta', 'banho', 'ewé'],
  ofo: ['ofo', 'ofos', 'encantamento', 'reza'],
  iwosan: ['iwosan', 'cura'],
  imule: ['imule', 'pacto', 'sociedade secreta'],
  idefa: ['idefa', 'idefá', 'pulseira'],
  assentamento: ['assentamento', 'assentamentos', 'igba', 'igbá'],
  ajogun: ['ajogun', 'iku', 'arun'],
  amuleto: ['amuleto', 'amuletos', 'talisma', 'isoye']
};

// ── Utilitários ───────────────────────────────────────────────
function chunkText(text, size) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(' '));
  }
  return chunks;
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findOduMentions(normalizedText) {
  const found = new Set();
  for (const odu of ODU_NAMES) {
    if (normalizedText.includes(odu)) {
      found.add(odu);
    }
  }
  return found;
}

function findTopicMentions(normalizedText) {
  const found = new Set();
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some(k => normalizedText.includes(k))) {
      found.add(topic);
    }
  }
  return found;
}

function getAllPdfs(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...getAllPdfs(fullPath));
      } else if (entry.name.toLowerCase().endsWith('.pdf')) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    console.warn(`  ⚠ Não foi possível ler: ${dir}`);
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────
async function buildIndex() {
  console.log('🔍 Ifá Oluwo — Indexador de Literatura Sagrada');
  console.log('═'.repeat(50));
  console.log(`📂 Fonte: ${LIBRARY_PATH}`);
  console.log(`📄 Destino: ${OUTPUT_PATH}\n`);

  const index = {};
  const stats = { totalFiles: 0, failed: 0, totalChunks: 0 };
  const pdfs = getAllPdfs(LIBRARY_PATH);

  console.log(`📚 ${pdfs.length} PDFs encontrados. Iniciando indexação...\n`);

  for (let i = 0; i < pdfs.length; i++) {
    const pdfPath = pdfs[i];
    const filename = path.basename(pdfPath);
    process.stdout.write(`[${i + 1}/${pdfs.length}] ${filename.substring(0, 55).padEnd(55)} `);

    try {
      const buffer = fs.readFileSync(pdfPath);
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer), verbosity: 0 });
      const pdf = await loadingTask.promise;
      let rawText = '';
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        rawText += content.items.map(item => ('str' in item ? item.str : '')).join(' ') + '\n';
      }

      if (rawText.length < 100) {
        process.stdout.write('⚠ vazio\n');
        stats.failed++;
        continue;
      }

      const normalized = normalizeText(rawText);
      const chunks = chunkText(rawText, CHUNK_SIZE);
      let indexedCount = 0;

      for (const chunk of chunks) {
        const normChunk = normalizeText(chunk);
        
        // Aplica o filtro Anti-Sincretismo (Blacklist)
        if (BLACKLIST_WORDS.some(badWord => normChunk.includes(normalizeText(badWord)))) {
          continue; // Pula este chunk se contiver palavra proibida
        }

        const odus = findOduMentions(normChunk);
        const topics = findTopicMentions(normChunk);

        // Indexar por Odu
        for (const odu of odus) {
          if (!index[odu]) index[odu] = [];
          if (index[odu].length < MAX_CHUNKS_PER_ODU) {
            index[odu].push(chunk.substring(0, 1200)); // max 1200 chars por chunk
            indexedCount++;
          }
        }

        // Indexar por tópico geral
        for (const topic of topics) {
          const key = `_${topic}`;
          if (!index[key]) index[key] = [];
          if (index[key].length < 50) {
            index[key].push(chunk.substring(0, 1200));
            indexedCount++;
          }
        }
      }

      stats.totalFiles++;
      stats.totalChunks += indexedCount;
      process.stdout.write(`✅ ${indexedCount} chunks\n`);

    } catch (e) {
      process.stdout.write(`❌ ${e.message.substring(0, 30)}\n`);
      stats.failed++;
    }
  }

  // ── Salvar resultado ─────────────────────────────────────────
  const output = {
    version: '1.0',
    generated: new Date().toISOString(),
    totalFiles: stats.totalFiles,
    totalChunks: stats.totalChunks,
    libraryPath: LIBRARY_PATH,
    index,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8');

  const fileSizeMB = (fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2);

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Indexação concluída!`);
  console.log(`   PDFs processados: ${stats.totalFiles}`);
  console.log(`   PDFs com falha:   ${stats.failed}`);
  console.log(`   Total de chunks:  ${stats.totalChunks}`);
  console.log(`   Odus indexados:   ${Object.keys(index).filter(k => !k.startsWith('_')).length}`);
  console.log(`   Tamanho do index: ${fileSizeMB} MB`);
  console.log(`\n📦 Arquivo salvo em: ${OUTPUT_PATH}`);
  console.log(`\n▶ Agora rode: npm run dev`);
}

buildIndex().catch(console.error);
