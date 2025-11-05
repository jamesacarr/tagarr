import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitest.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        '**/types.ts',
        '**/index.ts',
        'src/components/ui',
        'src/db/migrations',
      ],
      include: ['src/**'],
    },
    environment: 'happy-dom',
    mockReset: true,
    setupFiles: ['vitest/setup.ts'],
  },
});
