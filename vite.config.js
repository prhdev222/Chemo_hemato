import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // local `vercel dev` by default; set API_PROXY=https://chemo-hemato.vercel.app to read live data
      '/api': { target: process.env.API_PROXY || 'http://localhost:3000', changeOrigin: true }
    }
  }
})
