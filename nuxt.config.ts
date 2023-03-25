// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "UTF-8",
      title: "Tourist app",
      viewport: "width=device-width, initial-scale=1.0",
    },
  },
  modules: ["@pinia/nuxt", "@vueuse/nuxt"],
});
