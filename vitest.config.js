import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      setupFiles: ['./vitest.setup.js'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      pool: 'forks',
      poolOptions: {
        forks: {
          execArgv: ['--disable-warning=ExperimentalWarning'],
        },
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  }),
)