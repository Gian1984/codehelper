import type { DefineComponent } from 'vue'

type Game = {
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

const OG = 'https://codehelper.me/images/Codehelper_og_articles-optimized.webp'
const BRAND = 'CodeHelper'

export const games: Record<string, Game> = {
    'stack-overflow-survivor': {
        title: 'Stack Overflow Survivor',
        description:
            'Dodge bugs, errors, and exceptions falling from the sky. How long can you survive? A browser-based arcade game for developers.',
        category: 'arcade',
        component: () =>
            import('~/components/games/arcade/StackOverflowSurvivor.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Stack Overflow Survivor — Dodge Bugs Arcade Game – ${BRAND}`,
            description:
                'Play Stack Overflow Survivor: dodge SyntaxErrors, TypeErrors, RuntimeBugs and DeprecatedWarnings falling from the sky. Collect powerups, beat your high score, and share with friends.',
            ogImage: OG,
            keywords:
                'stack overflow survivor, developer game, coding game, browser game, arcade game, dodge bugs, javascript game, canvas game, developer fun',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'VideoGame',
                name: 'Stack Overflow Survivor',
                description:
                    'A browser-based arcade game where you dodge falling bugs, errors, and exceptions. Built with Canvas 2D and zero dependencies.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-12',
                dateModified: '2026-02-12',
                gamePlatform: 'Web Browser',
                applicationCategory: 'Game',
                genre: 'Arcade',
                playMode: 'SinglePlayer',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/games/stack-overflow-survivor'
                },
                keywords: [
                    'developer game',
                    'coding arcade',
                    'dodge bugs',
                    'browser game',
                    'canvas game',
                    'Stack Overflow'
                ]
            }
        }
    },
}
