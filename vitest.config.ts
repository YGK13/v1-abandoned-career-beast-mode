/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Point to your setup file
    css: true, // If you have CSS imports in your components
    reporters: ['default', 'html'], // Add HTML reporter
    coverage: {
      reporter: ['text', 'json', 'html'], // Coverage reporters
      provider: 'v8', // Or 'istanbul'
    },
  },
});
