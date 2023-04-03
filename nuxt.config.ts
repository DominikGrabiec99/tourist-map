// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "UTF-8",
      title: "Tourist app",
      viewport: "width=device-width, initial-scale=1.0",
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    },
  },
  modules: ["@pinia/nuxt", "@vueuse/nuxt"],
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
