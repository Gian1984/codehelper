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

const OG = 'https://codehelper.me/images/codehelper_OGIMAGE.webp'
const BRAND = 'CodeHelper'

export const articles: Record<string, Article> = {
    'how-to-use-json': {
        title: 'How to Use JSON in JavaScript',
        description:
            'A practical guide to understanding and using JSON for data exchange in modern web development.',
        category: 'javascript',
        component: () =>
            import('~/components/articles/tutorials/HowToUseJson.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `How to Use JSON in JavaScript (parse/stringify) – ${BRAND}`,
            description:
                'Learn JSON fundamentals in JS: parse(), stringify(), safe error handling, and common patterns for APIs, localStorage, and form data.',
            ogImage: OG,
            keywords:
                'how to use json in javascript, JSON.parse, JSON.stringify, json tutorial, javascript json examples, handle json errors, web api json, localStorage json',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'How to Use JSON in JavaScript',
                description:
                    'Step-by-step JSON guide covering parsing, serialization, validation, and practical usage in modern JavaScript apps.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-03',
                dateModified: '2025-09-03',
                mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://codehelper.me/articles/how-to-use-json' },
                articleSection: 'JavaScript',
                keywords: [
                    'JSON.parse',
                    'JSON.stringify',
                    'JavaScript JSON',
                    'API responses',
                    'form data',
                    'localStorage'
                ],
                proficiencyLevel: 'Beginner'
            }
        }
    },

    'clipboard-snippets': {
        title:
            '10 JavaScript Snippets Every Developer Should Keep in Their Clipboard Manager',
        description:
            'Boost your productivity with these reusable snippets. Copy-paste ready for every dev.',
        category: 'javascript',
        component: () =>
            import('~/components/articles/snippet/ClipboardSnippets.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `10 Must-Have JavaScript Snippets (Copy-Paste) – ${BRAND}`,
            description:
                'Ten production-ready JS snippets for everyday tasks: debounce, throttle, deep clone, unique IDs, copy to clipboard, and more.',
            ogImage: OG,
            keywords:
                'javascript snippets, copy paste javascript, debounce throttle snippet, deep clone object, copy to clipboard js, utility functions js, productivity tips',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline:
                    '10 JavaScript Snippets Every Developer Should Keep in Their Clipboard Manager',
                description:
                    'A curated list of reusable JavaScript utilities with copy-ready code and usage notes.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-04',
                dateModified: '2025-09-04',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/clipboard-snippets'
                },
                articleSection: 'JavaScript',
                keywords: [
                    'debounce',
                    'throttle',
                    'deep clone',
                    'unique ID',
                    'clipboard',
                    'date format',
                    'query params'
                ],
                proficiencyLevel: 'Intermediate'
            }
        }
    },

    'ai-hacking': {
        title: 'Can AI Be Hacked? Real-World Attacks and Defenses',
        description:
            'Explore how attackers compromise AI-powered apps and how to defend them. A must-read for anyone building with AI in 2025.',
        category: 'hacking',
        component: () =>
            import('~/components/articles/hacking/AiHacking.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Can AI Be Hacked? Real-World Attacks & Defenses – ${BRAND}`,
            description:
                'Understand AI attack vectors—prompt injection, data exfiltration, tool abuse—and practical defenses: policy hardening, sandboxes, allowlists, and logging.',
            ogImage: OG,
            keywords:
                'ai security, prompt injection defense, jailbreak prompts, model exploitation, llm security best practices, ai red teaming, data exfiltration llm',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Can AI Be Hacked? Real-World Attacks and Defenses',
                description:
                    'Threat modeling for LLM apps with concrete attack paths and mitigation strategies.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-02',
                dateModified: '2025-09-02',
                mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://codehelper.me/articles/ai-hacking' },
                articleSection: 'Security',
                about: ['Prompt Injection', 'Model Safety', 'Data Exfiltration'],
                keywords: [
                    'LLM security',
                    'prompt injection',
                    'tool abuse',
                    'guardrails',
                    'sandbox',
                    'allowlist',
                    'audit logs'
                ],
                proficiencyLevel: 'Intermediate'
            }
        }
    },

    'hacker-dropbox': {
        title: 'Building a Hacker Dropbox with Raspberry Pi and Twingate',
        description:
            'Learn how to build a remote access dropbox using Raspberry Pi and Twingate (ZTNA). Ideal for IT support and ethical hacking.',
        category: 'hacking',
        component: () =>
            import('~/components/articles/hacking/BuildingHackerDropboxDevice.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Build a “Hacker Dropbox” (Raspberry Pi + Twingate) – ${BRAND}`,
            description:
                'Step-by-step guide to create a remote access dropbox using Raspberry Pi and Twingate ZTNA. Includes secure hardening tips and deployment notes.',
            ogImage: OG,
            keywords:
                'raspberry pi dropbox device, twingate ztna tutorial, remote access box, red team dropbox, ethical hacking lab, pentest dropbox setup',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Build a Hacker Dropbox with Raspberry Pi and Twingate',
                description:
                    'A practical build for remote administration and testing using ZTNA with security considerations.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-01',
                dateModified: '2025-09-01',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/hacker-dropbox'
                },
                articleSection: 'Security',
                about: ['Raspberry Pi', 'ZTNA', 'Remote Access'],
                keywords: [
                    'Raspberry Pi',
                    'Twingate',
                    'Zero Trust',
                    'remote management',
                    'headless device',
                    'port knocking',
                    'hardening'
                ],
                proficiencyLevel: 'Intermediate'
            }
        }
    },
    'polar-night-sand-battery': {
        title: 'Polar Night Energy Builds Industrial-Scale Sand Battery in Pornainen',
        description:
            'Discover how Polar Night Energy’s new Sand Battery in Pornainen delivers 1 MW thermal power, stores 100 MWh, and cuts emissions by 70% in district heating.',
        category: 'energy',
        component: () =>
            import('~/components/articles/energy/PolarNightSandBattery.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Polar Night Energy Sand Battery in Pornainen – ${BRAND}`,
            description:
                'Loviisan Lämpö’s Sand Battery delivers 1 MW thermal output and 100 MWh storage. It eliminates oil, cuts CO₂ emissions by 160 tons annually, and advances Finland’s climate neutrality goals.',
            ogImage: OG,
            keywords:
                'Polar Night Energy, sand battery Finland, thermal energy storage, district heating decarbonization, Loviisan Lämpö, renewable energy storage, circular economy soapstone',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Polar Night Energy Builds Industrial-Scale Sand Battery in Pornainen',
                description:
                    'How Polar Night Energy’s Sand Battery in Pornainen provides 1 MW power, 100 MWh storage, and cuts emissions by 70% while phasing out oil.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-07',
                dateModified: '2025-09-07',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/polar-night-sand-battery'
                },
                articleSection: 'Energy',
                about: [
                    'Thermal Energy Storage',
                    'Sand Battery',
                    'Renewable Heating',
                    'Circular Economy'
                ],
                keywords: [
                    'Polar Night Energy',
                    'Sand Battery',
                    'District Heating',
                    'Energy Storage',
                    'Soapstone reuse',
                    'Finland climate goals'
                ],
                proficiencyLevel: 'General'
            }
        }
    }

}
