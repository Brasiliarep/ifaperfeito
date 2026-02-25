
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    base: './', // Crucial for mobile apps to load assets correctly
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false
    },
    define: {
      // Passa a chave se existir, senão passa string vazia. Não quebra o build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ""),
      'process.env': {}
    }
  }
})
