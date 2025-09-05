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
                "datePublished": "2025-09-03",
                "image": "https://codehelper.me/images/codehelper_OGIMAGE.webp"
            }
        }
    },
    'clipboard-snippets': {
        title: '10 JavaScript Snippets Every Developer Should Keep in Their Clipboard Manager',
        description: 'Boost your productivity with these reusable snippets. Copy-paste ready for every dev.',
        category: 'javascript',
        component: () => import('~/components/articles/snippet/ClipboardSnippets.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: '10 JavaScript Snippets Every Developer Should Keep – CodeHelper',
            description: 'Boost your productivity with these 10 reusable JavaScript snippets. Copy-paste ready and perfect for every modern developer.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'javascript, snippets, tips, tricks, clipboard, productivity, copy paste, code helper',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "10 JavaScript Snippets Every Developer Should Keep in Their Clipboard Manager",
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
    'ai-hacking': {
        title: 'Can AI Be Hacked? Real-World Attacks and Defenses',
        description: 'Explore how attackers compromise AI-powered apps and how to defend them. A must-read for anyone building with AI in 2025.',
        category: 'hacking',
        component: () => import('~/components/articles/hacking/AiHacking.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'Can AI Be Hacked? Real-World Attacks and Defenses – CodeHelper',
            description: 'Learn how attackers exploit AI systems using prompt injection, tool abuse, and data exfiltration—and how to defend your apps.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'ai security, ai hacking, prompt injection, jason haddix, ethical hacking, ai firewall, gpt attack, pentest ai, gandalf game',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Can AI Be Hacked? Real-World Attacks and Defenses",
                "author": { "@type": "Person", "name": "Gianluca" },
                "publisher": {
                    "@type": "Organization",
                    "name": "CodeHelper",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://codehelper.me/images/codehelper_OGIMAGE.webp"
                    }
                },
                "datePublished": "2025-09-02",
                "image": "https://codehelper.me/images/codehelper_OGIMAGE.webp"
            }
        }
    },
    'hacker-dropbox': {
        title: 'Building a Hacker Dropbox with Raspberry Pi and Twingate',
        description: 'Learn how to build a remote access dropbox using Raspberry Pi and Twingate (ZTNA). Ideal for IT support and ethical hacking.',
        category: 'hacking',
        component: () => import('~/components/articles/hacking/BuildingHackerDropboxDevice.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: 'Build a Hacker Dropbox with Raspberry Pi – CodeHelper',
            description: 'Create a secure remote access device using Raspberry Pi and Twingate. Perfect for IT support, ethical hacking, and pentesting.',
            ogImage: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
            keywords: 'raspberry pi, hacker dropbox, ztna, twingate, remote access, hacking tools, pentesting, raspberry pi hacking, ethical hacking',
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Build a Hacker Dropbox with Raspberry Pi and Twingate",
                "author": { "@type": "Person", "name": "Gianluca" },
                "publisher": {
                    "@type": "Organization",
                    "name": "CodeHelper",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://codehelper.me/images/codehelper_OGIMAGE.webp"
                    }
                },
                "datePublished": "2025-09-01",
                "image": "https://codehelper.me/images/codehelper_OGIMAGE.webp"
            }
        }
    }
}
