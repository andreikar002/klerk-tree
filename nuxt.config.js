// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/postcss8"],
  tailwindcss: {
    exposeConfig: false,
    viewer: false,
  },
});
