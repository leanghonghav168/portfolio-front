// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr'
      },
      title: 'Leang Honghav | Lead Product Designer & Full-Stack UI Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Portfolio of Leang Honghav, a Lead Product Designer & Full-Stack UI Developer with 15+ years of experience designing world-class web applications, design systems, and digital products.'
        },
        {
          name: 'keywords',
          content: 'Leang Honghav, Product Designer, UI/UX Designer, Frontend Developer, Nuxt 3, Vue 3, Figma, Design Systems, Web Developer Germany, Full-Stack UI, Portfolio'
        },
        { name: 'author', content: 'Leang Honghav' },
        { name: 'creator', content: 'Leang Honghav' },
        { name: 'publisher', content: 'Leang Honghav' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'theme-color', content: '#0c0c0e', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#ffe6cf', media: '(prefers-color-scheme: light)' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon.png' },
        { rel: 'apple-touch-icon', href: '/images/favicon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400..800&family=Manrope:wght@200..800&display=swap'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api'
    }
  }
})
