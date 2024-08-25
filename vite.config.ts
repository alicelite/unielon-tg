import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import wasm from 'vite-plugin-wasm';
import svgr from 'vite-plugin-svgr';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  optimizeDeps: {
    include: ['bip39', 'tiny-secp256k1', 'bitcoinjs-lib'],
  },
  define: {
    'global': 'globalThis',
  },
  plugins: [react(), nodeModulesPolyfillPlugin(), wasm(), svgr()],
  resolve: {
    alias: {
      "@": "/src",
      "@/shared": "/src/shared",
      'buffer': 'buffer',
    }
  },
  build: {
    outDir: './docs',
    target: 'esnext'
  },
  base: './'
})