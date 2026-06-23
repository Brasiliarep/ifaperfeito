import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');

const version = Date.now().toString(36);
const cacheName = `ifa-guia-${version}`;

const swPath = resolve(root, 'public', 'service-worker.js');
let sw = readFileSync(swPath, 'utf-8');
sw = sw.replace(/(const CACHE_NAME = ')(ifa-guia-)(v?\w+)(')/, `$1${cacheName}$4`);
writeFileSync(swPath, sw);

const htmlPath = resolve(root, 'index.html');
let html = readFileSync(htmlPath, 'utf-8');
html = html.replace(/(service-worker\.js\?v=)(\w+)/, `$1${version}`);
writeFileSync(htmlPath, html);

console.log(`SW version: ${version} | cache: ${cacheName}`);
