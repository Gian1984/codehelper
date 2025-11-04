// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { tools } from './utils/toolRegistry'
import { articles } from './utils/articlesRegistry'


const staticRoutes = ['/', '/about', '/tools', '/project', '/articles', '/feed.xml', '/feed.json']


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
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'alternate', type: 'application/rss+xml', title: 'CodeHelper RSS Feed', href: '/feed.xml' },
                { rel: 'alternate', type: 'application/json', title: 'CodeHelper JSON Feed', href: '/feed.json' }
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
        routes: allRoutes,
        defaults: {
            changefreq: 'daily',
            priority: 0.8,
            lastmod: new Date().toISOString()
        },
        // Customize specific route priorities
        urls: [
            {
                loc: '/',
                priority: 1.0,
                changefreq: 'daily'
            },
            {
                loc: '/tools',
                priority: 0.9,
                changefreq: 'weekly'
            },
            {
                loc: '/articles',
                priority: 0.9,
                changefreq: 'weekly'
            }
        ]
    }
})


