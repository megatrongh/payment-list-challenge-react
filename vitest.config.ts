import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    reporters: ['junit', 'verbose'],
    environment: 'jsdom',
    globals: true,
    outputFile: {
      junit: './junit.xml',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: './setupTests.ts',
    include: ['**/*.test.{ts,tsx}'],
  },
})
