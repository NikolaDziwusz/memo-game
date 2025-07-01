import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  base: '/memo-game/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // No additionalData needed; all SCSS files use @use
      },
    },
  },
})

