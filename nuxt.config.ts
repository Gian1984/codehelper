// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { tools } from './utils/toolRegistry'
import { articles } from './utils/articlesRegistry'
import { resourceCategoryMeta } from './utils/externalRegistry'
import { apiCategoryMeta } from './utils/apiRegistry'


// Static routes (Nuxt handles trailing slashes automatically)
const staticRoutes = ['/', '/about', '/tools', '/project', '/articles', '/resources', '/resources/apis', '/feed.xml', '/feed.json']

// Dynamic routes
const dynamicToolRoutes = Object.keys(tools).map(slug => `/tools/${slug}`)

const dynamicArticleRoutes = Object.keys(articles).map(slug => `/articles/${slug}`)

const dynamicResourceRoutes = Object.keys(resourceCategoryMeta).map(slug => `/resources/${slug}`)

const dynamicAPIRoutes = Object.keys(apiCategoryMeta).map(slug => `/resources/apis/${slug}`)


const allRoutes = [...staticRoutes, ...dynamicToolRoutes, ...dynamicArticleRoutes, ...dynamicResourceRoutes, ...dynamicAPIRoutes]

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },

    ssr: true,

    css: [
        'vue3-json-viewer/dist/vue3-json-viewer.css'
    ],

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
                { rel: 'alternate', type: 'application/json', title: 'CodeHelper JSON Feed', href: '/feed.json' },

                // Resource hints for external domains
                { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
                { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' }
            ]
        }
    },

    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/sitemap',
        '@nuxt/image',
    ],

    // Image optimization configuration
    image: {
        formats: ['webp', 'avif'],
        quality: 80,
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
        },
        // Enable placeholder for better UX
        placeholder: 10,
        // Disable external image providers by default for privacy
        providers: {}
    },

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
            },
            {
                loc: '/resources',
                priority: 0.9,
                changefreq: 'weekly'
            },
            {
                loc: '/resources/apis',
                priority: 0.9,
                changefreq: 'weekly'
            }
        ]
    }
})


