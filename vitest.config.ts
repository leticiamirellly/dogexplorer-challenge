import { defineConfig, mergeConfig } from 'vitest/config';
import viteBase from './vite.config';

const baseConfig =
  typeof viteBase === 'function'
    ? viteBase({ mode: 'test', command: 'serve' })
    : viteBase;

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      coverage: {
        provider: 'istanbul',
        reportsDirectory: 'coverage',
        all: true,
        exclude: [
          'src/components/icons/**',
          'src/components/**',
          'dist/**',
          'cypress/**',
          'src/views/**',
          'src/layouts/**',
          'src/*.vue',
          '*.config.ts'
        ],
      },
    },
  }),
);
