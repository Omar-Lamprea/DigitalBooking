import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/scss/_layout.scss";
          @import "./src/styles/scss/_global.scss";
          @import "./src/styles/scss/_variables.scss";
          @import "./src/styles/scss/_mixin.scss";
        `
      }
    }
  }
})
