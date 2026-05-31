import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'IponMo - Paluwagan App',
        short_name: 'IponMo',
        theme_color: '#f4a535',
        background_color: '#0f0e17',
        display: 'standalone',
        icons: [
          { src: '/iponmo.png', sizes: '192x192', type: 'image/png' },
          { src: '/iponmo.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
