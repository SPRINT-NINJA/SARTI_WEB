import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/assets/', // Asegura que los archivos se sirvan desde /assets/
  plugins: [vue2()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist/assets', // Opcional: organiza el output dentro de una subcarpeta assets
  },
});