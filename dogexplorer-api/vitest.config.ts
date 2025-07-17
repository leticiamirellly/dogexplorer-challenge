import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		setupFiles: ['src/tests/setup.ts'],
		coverage: { provider: 'c8', lines: 100, branches: 100 },
	},
});
