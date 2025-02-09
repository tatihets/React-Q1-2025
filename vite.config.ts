import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './src/setup.ts',
    environment: 'jsdom', // Use jsdom for React testing
    globals: true, // Use global functions like describe, it, expect
    include: ['src/**/*.{test,spec}.{ts,tsx}'], // Match test files
    coverage: {
      provider: 'v8', // Use v8 for coverage reporting
      reporter: ['text', 'json', 'html'], // Output formats
      include: ['**/*.tsx'], // Include only tsx files for coverage
      exclude: [
        '**/node_modules/**', // Exclude node_modules
        '**/*.test.tsx', // Exclude test files from coverage
        '**/*.spec.tsx', // Exclude spec files from coverage
        'src/__tests__/setup.ts', // Exclude setup files from coverage
        'src/app/*', // Exclude App.tsx
      ],
    },
    // alias: {
    //   '@assets': '/src/assets', // Resolve asset paths
    // },
  },
});
