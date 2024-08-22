import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'buffer';
import process from 'process';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },

  build: {
    rollupOptions: {
      external: [
        'crypto', 'buffer'
      ],
    },
  },
  define: {
    'process.env': {},
    'global': {},
    'Buffer': Buffer,
    'process': process,
  },
  resolve: {
    alias: {
      'buffer': 'buffer',
      'process': 'process/browser',
      'util': 'util',
    },
  }
})
