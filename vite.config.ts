import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/oshin-cruis-suits-booking-/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome100',
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'motion', test: /[\\/]node_modules[\\/]motion[\\/]/ },
            { name: 'lenis', test: /[\\/]node_modules[\\/]lenis[\\/]/ },
          ],
        },
      },
    },
  },
});