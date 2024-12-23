// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/styles.scss"],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules:[
    ['@nuxtjs/google-fonts',{
      families: {
        'Nunito': [200,400, 600,800],
        download: true,
        inject: true
      }
    }],
        '@pinia/nuxt'
  ]
})
