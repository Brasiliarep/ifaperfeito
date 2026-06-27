
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    base: './',
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false
    },
    define: {
      'process.env': {},
    },
    server: {
      proxy: {
        '/groq-api': {
          target: 'https://api.groq.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/groq-api/, ''),
          secure: true,
        }
      }
    }
  }
})
