// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { tools } from './utils/toolRegistry'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: true, // site will be pre-rendered as static using Nitro
  nitro: {
    preset: 'static' // full static output in /dist
  },
  // @ts-expect-error: used by @nuxtjs/sitemap and nuxt-seo
  site: {
    url: 'https://codehelper.me'
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    sitemapName: 'sitemap.xml',
    hostname: 'https://codehelper.me',
    gzip: true,
    routes: () => {
      const staticRoutes = ['/', '/about', '/tools', '/project']
      const dynamicToolRoutes = Object.keys(tools).map(slug => `/tools/${slug}`)
      return [...staticRoutes, ...dynamicToolRoutes]
    }
  }
})

