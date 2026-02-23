import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/cmc': {
        target: 'https://pro-api.coinmarketcap.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cmc/, ''),
        headers: {
          'X-CMC_PRO_API_KEY': '9633ade57db24cd0bb0ba53f0ab6c24a',
        },
      },
    },
  },
})
