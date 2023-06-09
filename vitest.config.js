import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['@amcharts/amcharts5'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
      '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./assets/scss/variables.scss" as *;',
      },
    },
  },
});
