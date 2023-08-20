import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VitePWA をインポート
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: '/have-passed/',
        name: 'have passed',
        short_name: 'passed',
        description: '最後にやってから何日経った？',
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#fff',
        background_color: '#fff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512-mask.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'docs',
  },
  server: {
    host: true,
  },
});
