import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: { port: 5173 },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
  }
});
