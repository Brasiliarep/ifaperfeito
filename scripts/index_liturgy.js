import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

const PDF_DIR = './LITURGIA_PDF';
const OUTPUT_FILE = './public/library_index.json';

async function indexPDFs() {
    console.log('🚀 Iniciando indexação do Acervo de Liturgia...');

    if (!fs.existsSync(PDF_DIR)) {
        console.error('❌ Pasta LITURGIA_PDF não encontrada.');
        return;
    }

    const files = fs.readdirSync(PDF_DIR).filter(file => file.toLowerCase().endsWith('.pdf'));

    if (files.length === 0) {
        console.warn('⚠️ Nenhum PDF encontrado para indexar.');
        return;
    }

    const index = [];

    for (const file of files) {
        const filePath = path.join(PDF_DIR, file);
        console.log(`📑 Indexando: ${file}...`);

        try {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);

            // Extrair metadados e fragmentos de texto úteis
            const content = data.text.replace(/\r?\n|\r/g, ' ').substring(0, 10000); // Primeiros 10k caracteres para busca

            index.push({
                id: file.replace(/\s+/g, '_'),
                filename: file,
                title: file.replace('.pdf', ''),
                pages: data.numpages,
                summary: content.substring(0, 300) + '...', // Pequeno resumo
                keywords: extractKeywords(content),
                // Em um sistema real, poderíamos salvar o texto completo em um banco de vetores
                // Mas para esse app comercial "light", manteremos um índice de palavras-chave
            });
        } catch (error) {
            console.error(`❌ Erro ao ler ${file}:`, error.message);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
        lastUpdate: new Date().toISOString(),
        totalFiles: index.length,
        items: index
    }, null, 2));

    console.log(`✅ Indexação concluída! ${index.length} arquivos processados.`);
    console.log(`📂 Índice salvo em: ${OUTPUT_FILE}`);
}

function extractKeywords(text) {
    // Simples extrator de palavras-chave baseada em frequência ou termos de Ifá
    const commonIFA = ['odu', 'ebo', 'akose', 'ofo', 'orixá', 'esu', 'ogum', 'oxum', 'xango', 'iyami', 'ori', 'ifa', 'ikin', 'opele', 'itan', 'osanyin', 'ewé'];
    const words = text.toLowerCase().match(/\b\w{3,}\b/g) || [];
    const keywords = new Set();

    words.forEach(w => {
        if (commonIFA.includes(w)) keywords.add(w);
    });

    return Array.from(keywords);
}

indexPDFs();
