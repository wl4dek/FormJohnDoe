import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    coverage: {
      // Provider: 'v8' (default), 'istanbul', or 'custom'
      provider: 'v8',
      enabled: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/index.{ts,tsx}',
        'src/**/*.d.ts',
        'src/**/dto/',
        'src/core/ports',
        'src/infrastructure/persistence/drizzle',
        'src/scripts',
        'src/**/*.test.ts',
        'node_modules/**',
        'dist/',
      ],

      reportsDirectory: './coverage',
      reporter: ['lcov', 'text', 'json', 'html'],

      // Thresholds to enforce minimum coverage percentages
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
        perFile: true,
      },

      // Additional options
      clean: true,           // Clean coverage results before running tests
      cleanOnRerun: true,    // Clean on watch rerun
      reportOnFailure: false // Generate report even if tests fail
    },
  },
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
    },
  },
});
