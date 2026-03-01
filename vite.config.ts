import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['.vm-provider.internal', 'hrcdn.net'],
  },
})
