// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { tools } from './utils/toolRegistry'
import { articles } from './utils/articlesRegistry'


const staticRoutes = ['/', '/about', '/tools', '/project', '/articles']


const dynamicToolRoutes = Object.keys(tools).map(slug => `/tools/${slug}`)


const dynamicArticleRoutes = Object.keys(articles).map(slug => `/articles/${slug}`)


const allRoutes = [...staticRoutes, ...dynamicToolRoutes, ...dynamicArticleRoutes]

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },

    ssr: true,
    nitro: {
        preset: 'static',
        prerender: {
            routes: allRoutes
        }
    },

    // SEO settings (nuxt-seo, sitemap)
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
        routes: allRoutes // Include anche gli articoli
    }
})


