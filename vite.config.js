import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteRestart from 'vite-plugin-restart';

export default defineConfig({
  plugins: [
    react(),
    ViteRestart({
      restart: ['.env', '.env.local'],
    }),
  ],
});
