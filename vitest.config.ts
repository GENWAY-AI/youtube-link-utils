import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    setupFiles: ['tests/setup.ts'],
  },
});
