import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        cadastro: resolve(__dirname, 'cadastro.html'),
        listagem: resolve(__dirname, 'listagem.html'),
      },
    },
  },
})
