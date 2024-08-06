import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import wasm from 'vite-plugin-wasm';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

export default defineConfig({
  optimizeDeps: {
    include: ['bip39', 'tiny-secp256k1', 'bitcoinjs-lib'],
  },
  define: {
    'global': 'globalThis',
  },
  plugins: [react(), basicSsl(), nodeModulesPolyfillPlugin(), wasm()],
  resolve: {
    alias: {
      "@": "/src",
      "@/shared": "/src/shared",
      'buffer': 'buffer',
    }
  },
  build: {
    outDir: './docs'
  },
  base: './'
})