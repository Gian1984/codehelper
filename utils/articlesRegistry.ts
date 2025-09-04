import type { DefineComponent } from 'vue'

type Article = {
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

export const articles: Record<string, Article> = {
    'how-to-use-json': {
        title: 'How to Use JSON in JavaScript',
        description: 'A practical guide to understanding and using JSON for data exchange in modern web development.',
        category: 'javascript',
        component: () => import('~/components/articles/tutorials/HowToUseJson.vue') as Promise<{
            default: DefineComponent
        }>,
        seo: {
            title: 'How to Use JSON in JavaScript – CodeHelper',
            description: 'Learn how to use JSON in JavaScript to store, exchange, and manipulate structured data. Includes examples for beginners.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'json, javascript, how to, json.stringify, json.parse, web development, api',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "How to Use JSON in JavaScript",
                "author": { "@type": "Person", "name": "Gianluca" },
                "publisher": {
                    "@type": "Organization",
                    "name": "CodeHelper",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://codehelper.me/images/codehelper_OGIMAGE.webp"
                    }
                },
                "datePublished": "2025-09-04",
                "image": "https://codehelper.me/images/codehelper_OGIMAGE.webp"
            }
        }
    },


}
