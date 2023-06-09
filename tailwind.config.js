module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'black-rgba-06': 'rgba(0, 0, 0, 0.6)',
      },
      listStyleType: {
        square: 'square',
      },
    },
  },
  plugins: [],
};
