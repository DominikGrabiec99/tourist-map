// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'UTF-8',
      title: 'Tourist app',
      viewport: 'width=device-width, initial-scale=1.0',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./assets/scss/variables.scss" as *;',
        },
      },
    },
  },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-icon'],
  css: [
    '@/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
