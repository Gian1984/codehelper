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
        seoContent?: string
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
            title: `Stack Overflow Survivor :  Dodge Bugs Arcade Game – ${BRAND}`,
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
                  '@id': 'https://codehelper.me/games/stack-overflow-survivor/'
                },                keywords: [
                    'developer game',
                    'coding arcade',
                    'dodge bugs',
                    'browser game',
                    'canvas game',
                    'Stack Overflow'
                ]
            },
            seoContent: `
                <section>
                    <h2>What is Stack Overflow Survivor?</h2>
                    <p><strong>Stack Overflow Survivor</strong> is a browser-based arcade game built for developers who live and breathe code. Falling from the sky are the bugs, errors, and exceptions every programmer dreads: <code>SyntaxError</code>, <code>TypeError</code>, <code>RuntimeBug</code>, <code>DeprecatedWarning</code>, and more. Your mission? Dodge them all and survive as long as possible.</p>
                    <p>Built entirely with the HTML5 Canvas API and zero external dependencies, the game runs instantly in any modern browser: no install, no signup needed.</p>

                    <h3>Game features</h3>
                    <ul>
                        <li><strong>Developer-themed enemies</strong>: Recognizable error types straight from your console.</li>
                        <li><strong>Powerups</strong>: Collect helpful items to gain temporary advantages and extend your survival streak.</li>
                        <li><strong>High Score tracking</strong>: Beat your personal record and challenge fellow developers.</li>
                        <li><strong>Smooth Canvas 2D rendering</strong>: Fluid 60fps gameplay with no dependencies.</li>
                    </ul>

                    <h3>How to play</h3>
                    <ol>
                        <li>Click <strong>Play</strong> to start the game.</li>
                        <li>Move your character left and right to dodge falling bugs and errors.</li>
                        <li>Collect powerups to gain bonuses and survive longer.</li>
                        <li>The game speeds up over time: stay sharp!</li>
                        <li>Share your high score with your dev team.</li>
                    </ol>

                    <p>Whether you need a quick break between deploys or want to procrastinate on that open PR, Stack Overflow Survivor is the perfect coding-themed stress reliever for every developer.</p>
                </section>
            `
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
                  '@id': 'https://codehelper.me/games/dev-breakout/'
                },                keywords: [
                    'developer game',
                    'breakout',
                    'arkanoid',
                    'bug fixing',
                    'browser game',
                    'canvas game',
                    'coding arcade'
                ]
            },
            seoContent: `
                <section>
                    <h2>What is Bug Breaker?</h2>
                    <p><strong>Bug Breaker</strong> (DevBreakout) is a developer-themed take on the classic Breakout/Arkanoid genre. Instead of ordinary bricks, you're smashing through layers of bugs, errors, and broken code on your way to a successful production deploy. It's the most satisfying debugging session you'll ever have.</p>
                    <p>With 5 game modes and themed levels from <em>HTML</em> all the way to <em>Production</em>, Bug Breaker captures the full lifecycle of shipping software: one brick at a time.</p>

                    <h3>Game modes</h3>
                    <ul>
                        <li><strong>Classic</strong>: The traditional Breakout experience with a developer twist.</li>
                        <li><strong>Sprint</strong>: Clear levels as fast as possible: time is your enemy.</li>
                        <li><strong>Survival</strong>: How many levels can you clear before losing all your lives?</li>
                        <li><strong>Zen</strong>: Relaxed, no-pressure mode to unwind after a long coding session.</li>
                        <li><strong>Hardcore</strong>: One life, maximum speed, no mercy.</li>
                    </ul>

                    <h3>How to play Bug Breaker</h3>
                    <ol>
                        <li>Select a game mode and start your session.</li>
                        <li>Move the paddle left and right to keep the ball in play.</li>
                        <li>Break all the bug-bricks to advance to the next level.</li>
                        <li>Catch powerups like <em>Coffee</em> and <em>Stack Overflow Answer</em> for bonuses.</li>
                        <li>Reach Production to win the run.</li>
                    </ol>

                    <p>Whether you're a fan of retro arcade games or just need to vent some frustration at your codebase, Bug Breaker is the ultimate browser-based game for developers.</p>
                </section>
            `
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
                  '@id': 'https://codehelper.me/games/dev-snake/'
                },                keywords: [
                    'developer game',
                    'snake',
                    'eat code',
                    'avoid bugs',
                    'browser game',
                    'canvas game',
                    'coding arcade'
                ]
            },
            seoContent: `
                <section>
                    <h2>What is Code Eater?</h2>
                    <p><strong>Code Eater</strong> (DevSnake) is a developer-themed reimagining of the classic Snake game. Instead of eating dots, you grow your codebase by consuming variables, functions, and arrays. But watch out: bugs, memory leaks, infinite loops, and deprecated warnings lurk around every corner, ready to crash your program.</p>
                    <p>Built with the HTML5 Canvas API and running entirely in the browser, Code Eater needs no install or signup. Just open it and start coding… or eating code.</p>

                    <h3>What to eat, what to avoid</h3>
                    <ul>
                        <li><strong>Eat</strong>: <code>variables</code>, <code>functions</code>, <code>arrays</code>, <code>objects</code>: each one grows your snake and boosts your score.</li>
                        <li><strong>Avoid</strong>: <code>bugs</code>, <code>memory leaks</code>, <code>infinite loops</code>, <code>deprecated warnings</code>: any collision ends your session.</li>
                        <li><strong>Speed scaling</strong>: The more code you consume, the faster your snake moves: keeping experienced players challenged.</li>
                    </ul>

                    <h3>How to play Code Eater</h3>
                    <ol>
                        <li>Press <strong>Start</strong> to begin your coding session.</li>
                        <li>Use arrow keys or WASD to navigate the snake.</li>
                        <li>Eat code items to grow your snake and increase your score.</li>
                        <li>Avoid crashing into walls, yourself, or the lurking bugs.</li>
                        <li>Beat your high score and challenge other developers.</li>
                    </ol>

                    <p>Whether you're taking a break from a refactor or just want to relive the nostalgia of classic Snake with a developer twist, Code Eater is the perfect in-browser game for programmers of all levels.</p>
                </section>
            `
        }
    },
}
