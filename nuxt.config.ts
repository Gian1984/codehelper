// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { tools } from './utils/toolRegistry'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: false, // disables server rendering, full static

  nitro: {
    preset: 'static' // makes sure Nuxt generates a static site
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap'
  ],

  // @ts-ignore — PhpStorm/Volar doesn't recognize this, but Nuxt will
  sitemap: {
    siteUrl: 'https://codehelper.me',
    sitemapName: 'sitemap.xml',
    gzip: true,
    routes: () => {
      const staticRoutes = ['/', '/about', '/tools','/project']
      const dynamicToolRoutes = Object.keys(tools).map(slug => `/tools/${slug}`)
      return [...staticRoutes, ...dynamicToolRoutes]
    }
  }
})
