import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  resolve: {
    alias: { 
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",  
      "react/jsx-runtime": "preact/jsx-runtime"
    },
  },
  server: {
    port: 8080,
  },
  plugins: [preact()]
})
