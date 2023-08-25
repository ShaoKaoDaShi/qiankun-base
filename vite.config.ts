import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define:{
    "process.env.not_qiankun":process.env.BASE_ENV
  },
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
        target:  "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
