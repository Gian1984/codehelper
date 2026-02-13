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

    'dev-breakout': {
        title: 'Bug Breaker',
        description:
            'Break bugs, fix errors, and deploy to production in this developer-themed Breakout game. 5 modes, powerups, and terminal-style HUD.',
        category: 'arcade',
        component: () =>
            import('~/components/games/arcade/DevBreakout.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Bug Breaker – ${BRAND}`,
            description:
                'Play DevBreakout: a developer-themed Breakout/Arkanoid game. Break bugs, catch powerups like Coffee and StackOverflow answers, and deploy to production across 5 themed levels.',
            ogImage: OG,
            keywords:
                'dev breakout, arkanoid developer, breakout game, coding game, browser game, bug fixing game, developer arcade, canvas game',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'VideoGame',
                name: 'DevBreakout',
                description:
                    'A developer-themed Breakout/Arkanoid browser game with 5 modes (Classic, Sprint, Survival, Zen, Hardcore), themed levels (HTML to Production), and coding powerups.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-13',
                dateModified: '2026-02-13',
                gamePlatform: 'Web Browser',
                applicationCategory: 'Game',
                genre: 'Arcade',
                playMode: 'SinglePlayer',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/games/dev-breakout'
                },
                keywords: [
                    'developer game',
                    'breakout',
                    'arkanoid',
                    'bug fixing',
                    'browser game',
                    'canvas game',
                    'coding arcade'
                ]
            }
        }
    },

    'dev-snake': {
        title: 'Code Eater',
        description:
            'A developer-themed Snake game. Eat variables, functions, and arrays to grow your codebase. Avoid bugs, memory leaks, and infinite loops.',
        category: 'arcade',
        component: () =>
            import('~/components/games/arcade/DevSnake.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Code Eater – ${BRAND}`,
            description:
                'Play DevSnake: a developer-themed Snake game. Eat variables, functions, and arrays to grow your codebase. Dodge bugs, memory leaks, infinite loops, and deprecated warnings.',
            ogImage: OG,
            keywords:
                'dev snake, developer snake game, coding game, browser game, snake game, eat code, avoid bugs, javascript game, canvas game',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'VideoGame',
                name: 'DevSnake',
                description:
                    'A developer-themed Snake browser game where you eat code items (variables, functions, arrays) and avoid bugs, memory leaks, and infinite loops.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-13',
                dateModified: '2026-02-13',
                gamePlatform: 'Web Browser',
                applicationCategory: 'Game',
                genre: 'Arcade',
                playMode: 'SinglePlayer',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/games/dev-snake'
                },
                keywords: [
                    'developer game',
                    'snake',
                    'eat code',
                    'avoid bugs',
                    'browser game',
                    'canvas game',
                    'coding arcade'
                ]
            }
        }
    },
}
