import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    // Configuración del plugin PWA
    VitePWA({
      registerType: 'autoUpdate', // Autoactualiza el Service Worker cuando detecta cambios
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50, // Máximo de 50 recursos almacenados en caché
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
              },
            },
          },
          {
            urlPattern: /.*/, // Caché de fallback
            handler: 'NetworkFirst',
            options: {
              cacheName: 'fallback',
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
      manifest: {
        name: 'SARTI-PWA', // Nombre de tu aplicación
        short_name: 'SARTI', // Nombre corto para pantallas pequeñas
        description: 'SARTI DELIVERY - Aplicación Progresiva SARTI ',
        theme_color: '#ffa446',
        background_color: '#ffa446',
        icons: [
          {
            src: '/producto_deleted_or_inactive.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: "any",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    https: true, // Habilita HTTPS en el servidor local
  },
});
