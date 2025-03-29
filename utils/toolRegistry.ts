import type { DefineComponent } from 'vue'

type Tool = {
    title: string
    description: string
    component: () => Promise<{ default: DefineComponent }>
    category?: string
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
    },

    'var-dump-formatter': {
        title: 'Var Dump Formatter',
        description: 'Beautify and format PHP var_dump() output.',
        category: 'formatter',
        component: () => import('~/components/tools/formatter/VarDumpFormatter.vue'),
        seo: {
            title: 'Var Dump Formatter – CodeHelper',
            description: 'Format messy var_dump() output into readable structure instantly.',
            ogImage: 'https://codehelper.me/og-images/var-dump-formatter.png',
            keywords: 'php, var_dump, formatter, beautifier, code formatter, dump viewer',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Var Dump Formatter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "12"
                }
            }
        }
    },

    'px-to-vh-converter': {
        title: 'PX to VH Converter',
        description: 'Convert pixel values to responsive vh units based on viewport height.',
        category: 'css',
        component: () => import('~/components/tools/css/PxToVhConverter.vue'),
        seo: {
            title: 'PX to VH Converter – CodeHelper',
            description: 'Convert pixel (px) values into responsive viewport height (vh) units easily.',
            ogImage: 'https://codehelper.me/og-images/px-to-vh-converter.png',
            keywords: 'px, vh, converter, responsive, css, unit converter, viewport height',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "PX to VH Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "17"
                }
            }
        }
    },

    'px-to-vw-converter': {
        title: 'PX to VW Converter',
        description: 'Convert pixel values to responsive vw units based on viewport width.',
        category: 'css',
        component: () => import('~/components/tools/css/PxToVwConverter.vue'),
        seo: {
            title: 'PX to VW Converter – CodeHelper',
            description: 'Convert pixel (px) values into responsive viewport width (vw) units easily.',
            ogImage: 'https://codehelper.me/og-images/px-to-vw-converter.png',
            keywords: 'px, vw, converter, responsive, css, unit converter, viewport width',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "PX to VW Converter",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "19"
                }
            }
        }
    },

    'svg-icon-generator': {
        title: 'SVG Icon Generator',
        description: 'Create and customize SVG icons for the web directly in your browser.',
        category: 'svg',
        component: () => import('~/components/tools/svg/IconGenerator.vue'),
        seo: {
            title: 'SVG Icon Generator – CodeHelper',
            description: 'Design, customize and export scalable vector icons directly in your browser.',
            ogImage: 'https://codehelper.me/og-images/svg-icon-generator.png',
            keywords: 'svg, icon, generator, design, web icon, svg builder, icon editor',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "SVG Icon Generator",
                "operatingSystem": "All",
                "applicationCategory": "DeveloperApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "9"
                }
            }
        }
    }



}

