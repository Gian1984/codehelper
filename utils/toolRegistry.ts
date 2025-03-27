import type { DefineComponent } from 'vue'

type Tool = {
    title: string
    description: string
    component: () => Promise<{ default: DefineComponent }>
    seo?: {
        title?: string
        description?: string
        ogImage?: string
        keywords?: string
        structuredData?: Record<string, any>
    }
}

export const tools: Record<string, Tool> = {
    'json-formatter': {
        title: 'JSON Formatter',
        description: 'Beautify and validate your JSON.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/JsonFormatter.vue'),
        seo: {
            title: 'JSON Formatter – CodeHelper',
            description: 'Beautify, format, and validate JSON instantly in the browser.',
            ogImage: 'https://codehelper.me/og-images/json-formatter.png',
            keywords: 'json, formatter, beautify, validator, online tool',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "JSON Formatter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "38"
                }
            }
        }
    },

    'clamp-generator': {
        title: 'Clamp Generator',
        description: 'Generate responsive font-size clamp() CSS.',
        category: 'css',
        component: () => import('~/components/tools/css/ClampGenerator.vue'),
        seo: {
            title: 'CSS Clamp Generator – CodeHelper',
            description: 'Build fluid font-sizes with CSS clamp() utility.',
            ogImage: 'https://codehelper.me/og-images/clamp-generator.png',
            keywords: 'clamp, css, font-size, generator, responsive design',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "CSS Clamp Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "22"
                }
            }
        }
    }
}