import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backend = env.VITE_BACKEND_URL?.trim();

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    server: {
      proxy: backend
        ? {
          '/api': {
            target: backend,
            changeOrigin: true,
            secure: false,
          },
        }
        : undefined,
    },
    test: {
      environment: 'happy-dom',
      coverage: {
        enabled: true,
        provider: 'istanbul',
        reportsDirectory: 'coverage',
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
});