import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
    },
    server: {
        port: 3000,
        proxy: {
            '/Person': {
                target: 'https://localhost:7204',
                changeOrigin: true,
                secure: false
            }
        }
    },
})
