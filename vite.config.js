import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // El backend real vive aparte (Node/Express, Laravel, etc).
      // Todo lo que empiece con /api se redirige a tu servidor local.
      '/api': 'http://localhost:4000'
    }
  }
})
