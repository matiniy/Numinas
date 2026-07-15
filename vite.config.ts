import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { writeSeoArtifacts } from './scripts/seo-build.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://www.numinas.com').trim()

  return {
    plugins: [
      react(),
      {
        name: 'generate-seo-artifacts',
        closeBundle() {
          writeSeoArtifacts({
            siteUrl,
            publicDir: fileURLToPath(new URL('./public', import.meta.url)),
            distDir: fileURLToPath(new URL('./dist', import.meta.url)),
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
