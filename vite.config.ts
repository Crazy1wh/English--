/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React 全家桶单独成块（长期缓存），其余第三方进 vendor
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|@remix-run)[\\/]/.test(id)) {
              return 'react-vendor';
            }
            return 'vendor';
          }
          // 题库/词库数据体量大且独立成块，更新代码不会让用户重下数据
          if (id.includes('/src/data/')) return 'data';
          if (id.includes('/src/engine/')) return 'engine';
        },
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
