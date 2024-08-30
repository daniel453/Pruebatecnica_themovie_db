import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      // Configura las rutas aquí si lo necesitas, por ejemplo, para excluir ciertas carpetas
    }),
  ],
  
})
