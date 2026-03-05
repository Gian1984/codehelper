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
        faqSchema?: Record<string, any>
    }
}

const OG = 'https://codehelper.me/images/Codehelper_og_articles-optimized.webp'
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
                mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://codehelper.me/articles/how-to-use-json/' },
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
                    '@id': 'https://codehelper.me/articles/clipboard-snippets/'
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
                mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://codehelper.me/articles/ai-hacking/' },
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

    'ai-cyberattacks-rising': {
        title: 'AI-powered cyberattacks: how AI is fueling a new wave of hacking',
        description:
            'AI is scaling cybercrime: ransomware automation, deepfake fraud, spear phishing at scale, and adaptive malware. Data-backed analysis with practical defenses.',
        category: 'security',
        component: () =>
            import('~/components/articles/security/AiCyberattacksRising.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `AI-powered cyberattacks: how AI is fueling a new wave of hacking – ${BRAND}`,
            description:
                'Data-backed analysis of AI-driven attacks in 2025 (ransomware, deepfakes, biometrics spoofing) with sources from IBM, MIT Sloan, Acronis, Reuters, and arXiv — plus a practical defense stack.',
            ogImage: OG,
            keywords:
                'ai cyberattacks, ai hacking, deepfake phishing, ai-driven ransomware, autonomous agents, spear phishing llm, biometric spoofing, xdr, zero trust, 2025 cybersecurity trends',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'AI-powered cyberattacks: how AI is fueling a new wave of hacking',
                description:
                    'An in-depth look at how artificial intelligence is accelerating cyberattacks and what defenses enterprises need now.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-16',
                dateModified: '2025-09-16',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/ai-cyberattacks-rising/'
                },
                articleSection: 'Security',
                about: ['Artificial Intelligence', 'Cybersecurity', 'Ransomware', 'Deepfakes'],
                keywords: [
                    'AI cyberattacks',
                    'phishing 2.0',
                    'voice cloning',
                    'biometric spoofing',
                    'polymorphic malware',
                    'xdr',
                    'zero trust',
                    'mfa',
                    'defense in depth'
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
                    '@id': 'https://codehelper.me/articles/hacker-dropbox/'
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
                    '@id': 'https://codehelper.me/articles/polar-night-sand-battery/'
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
    },
    'co2-battery': {
        title: 'CO₂ Battery: Closed Thermo-Mechanical Energy Storage Explained',
        description:
            'Learn how the CO₂ Battery stores and generates electricity using closed thermo-mechanical cycles with carbon dioxide—offering long-duration energy storage with zero emissions.',
        category: 'energy',
        component: () =>
            import('~/components/articles/energy/CO2Battery.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CO₂ Battery (Thermo-Mechanical Storage) – ${BRAND}`,
            description:
                'Discover the CO₂ Battery: a closed-cycle energy storage using liquid gas that delivers 75% round-trip efficiency, over 30-year life, and avoids lithium dependence.',
            ogImage: OG,
            keywords:
                'CO2 battery, carbon dioxide energy storage, long duration energy storage, thermo-mechanical storage, energy dome, carbon-neutral grid, alternative to lithium batteries',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'CO₂ Battery: Closed Thermo-Mechanical Energy Storage Explained',
                description:
                    'An in-depth look at how the CO₂ Battery uses liquid-gas cycles of CO₂ to store energy for 8–24 hours with zero emissions and low cost.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-08',
                dateModified: '2025-09-08',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/co2-battery/'
                },
                articleSection: 'Energy',
                about: [
                    'Energy Storage',
                    'CO₂ Battery',
                    'Thermo-Mechanical Cycle',
                    'Grid Services'
                ],
                keywords: [
                    'CO2 battery',
                    'energy dome',
                    'long duration storage',
                    'zero emissions',
                    'alternative energy storage'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'ram-prices-surge-2026': {
        title: 'Why RAM Prices Are Surging in 2026',
        description:
            'Understand why DDR4 and DDR5 memory prices have skyrocketed: AI demand, wafer shortages, HBM production shifts, and what consumers and businesses can do about it.',
        category: 'hardware',
        component: () =>
            import('~/components/articles/hardware/RamPricesSurge2026.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Why RAM Is So Expensive in 2026: DDR4 & DDR5 Price Analysis – ${BRAND}`,
            description:
                'RAM prices have surged 120-200% in 2026. DRAM spot prices, DDR4 vs DDR5 cost trends, reasons behind the shortage, and when prices might drop. Updated with latest DRAMeXchange data.',
            ogImage: OG,
            keywords:
                'ram prices 2026, ddr5 price increase, dram shortage, hbm memory, ai memory demand, ddr4 prices rising, memory market, semiconductor shortage, wafer supply',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Why RAM Is So Expensive in 2026: DDR4 & DDR5 Price Analysis',
                description:
                    'RAM prices have surged 120-200% in 2026. DRAM spot prices, DDR4 vs DDR5 cost trends, reasons behind the shortage, and when prices might drop. Updated with latest DRAMeXchange data.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-01-25',
                dateModified: '2026-01-25',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/ram-prices-surge-2026/'
                },
                articleSection: 'Hardware',
                about: [
                    'RAM Prices',
                    'DRAM Shortage',
                    'HBM Memory',
                    'DDR5',
                    'Semiconductor Industry'
                ],
                keywords: [
                    'RAM prices',
                    'DDR5',
                    'DDR4',
                    'HBM',
                    'AI memory demand',
                    'DRAM shortage',
                    'wafer supply',
                    'memory market 2026'
                ],
                proficiencyLevel: 'General'
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Why is RAM so expensive in 2026?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The primary driver is AI demand: data centers require High Bandwidth Memory (HBM) for training large models, and HBM production competes for the same semiconductor wafers as DDR4 and DDR5. Manufacturers are also managing supply deliberately to protect pricing, and wafer production capacity cannot scale quickly.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'How much have DDR5 prices increased in 2026?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'DDR5 modules have increased by 120% to 200% compared to early 2025. Broader DRAM pricing indexes climbed nearly 50% year to date, and contract prices for memory chips rose 30% to 60% in just a few months.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Will RAM prices drop in 2026 or 2027?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Elevated prices are expected to persist through all of 2026 and into at least early or mid-2027. New fabrication facilities are being built, but most will not reach high-volume output until late 2027 or 2028. Meaningful price corrections are not expected before then.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Are DDR4 prices also affected, or only DDR5?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Both DDR4 and DDR5 prices have risen. DDR4 is being actively phased out by manufacturers who are shifting capacity toward DDR5 and HBM, which means fewer DDR4 production lines and less availability. Owners of older systems face higher upgrade costs even though DDR4 is an older standard.'
                        }
                    }
                ]
            }
        }
    },

    'samsung-9100-pro-nvme': {
        title: 'Samsung 9100 Pro NVMe — 14 GB/s Gen5 Storage & LLM Workflow Acceleration',
        description:
            'Explore Samsung’s 9100 Pro PCIe 5.0 NVMe SSD with up to 14.8 GB/s read/write. Its ultra-fast storage reshapes GPU offloading for large model workflows and data-heavy tasks.',
        category: 'hardware',
        component: () =>
            import('~/components/articles/hardware/Samsung9100Pro.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Samsung 9100 Pro NVMe Gen5 (14 GB/s) — Hardware Deep Dive – ${BRAND}`,
            description:
                'Samsung’s 9100 Pro SSD delivers PCle 5.0 speeds—14.8 GB/s read, 13.4 GB/s write. Learn how this transforms GPU-based LLM offloading, dataset streaming, and checkpointing workflows.',
            ogImage: OG,
            keywords:
                'Samsung 9100 Pro, PCIe 5.0 SSD, NVMe Gen5, LLM offload, model swapping, GPU workflows, fast storage SSD',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Samsung 9100 Pro NVMe SSD – 14 GB/s PCIe 5.0 Storage for Next-gen Workflows',
                description:
                    'In-depth look at how the Samsung 9100 Pro NVMe unlocks ultra-fast storage to accelerate GPU-based model workflows and LLM tasks.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-08',
                dateModified: '2025-09-08',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/samsung-9100-pro-nvme/'
                },
                articleSection: 'Hardware',
                about: [
                    'PCIe 5.0 SSD',
                    'Samsung 9100 Pro',
                    'LLM Offload',
                    'Data Streaming',
                    'Hardware Acceleration'
                ],
                keywords: [
                    'Samsung 9100 Pro',
                    'NVMe Gen5',
                    'LLM workflows',
                    'GPU offload',
                    'fast storage',
                    'PCIe 5 SSD'
                ],
                proficiencyLevel: 'Advanced'
            }
        }
    },
    'github-student-pack': {
        title: 'GitHub Student Developer Pack — Free Tools & Resources for Students',
        description:
            'A complete overview of GitHub\'s Student Developer Pack: free IDEs, cloud credits, domains, and pro tools to help students learn and ship real projects.',
        category: 'education',
        component: () =>
            import('~/components/articles/education/GitHubStudentPack.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `GitHub Student Developer Pack 2026: Full List of Free Tools – ${BRAND}`,
            description:
                'Complete guide to GitHub Student Developer Pack 2026: Copilot Pro, JetBrains IDEs, DigitalOcean credits, free domains, and 20+ tools. How to apply and what you get.',
            ogImage: OG,
            keywords:
                'GitHub Student Pack, free developer tools students, GitHub Education benefits, JetBrains free student license, GitHub Copilot free, student cloud credits, github student developer pack 2026, github copilot student free, github student pack tools list',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'GitHub Student Developer Pack 2026: Full List of Free Tools',
                description:
                    'Complete guide to GitHub Student Developer Pack 2026: Copilot Pro, JetBrains IDEs, DigitalOcean credits, free domains, and 20+ tools. How to apply and what you get.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-09-08',
                dateModified: '2025-09-08',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/github-student-pack/'
                },
                articleSection: 'Education',
                about: [
                    'GitHub Student Developer Pack',
                    'Free Tools for Students',
                    'GitHub Education'
                ],
                keywords: [
                    'GitHub Copilot free student',
                    'JetBrains free IDE student',
                    'cloud credits students',
                    'student developer tools',
                    'GitHub Education benefits'
                ],
                proficiencyLevel: 'Beginner'
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Is the GitHub Student Developer Pack free?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes, the GitHub Student Developer Pack is completely free for verified students. It unlocks professional-grade developer tools at no cost, including Copilot Pro, JetBrains IDEs, cloud credits, and learning platforms.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Does the GitHub Student Pack include GitHub Copilot?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes. The pack includes Copilot Pro free for as long as you remain a verified student. Copilot Pro is GitHub\'s AI pair programming tool that assists with code suggestions directly in your editor.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'What tools are included in the GitHub Student Developer Pack?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Key benefits include GitHub Copilot Pro, JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm), $200 in DigitalOcean credits, $100 in Microsoft Azure credits, free .me/.tech domains with SSL certificates, and access to learning platforms like Educative, DataCamp, FrontendMasters, and Scrimba.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I apply for the GitHub Student Developer Pack?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'You need a GitHub account (age 13+), then verify your enrollment using a school email address or an official document. Open the GitHub Education settings, submit your application, and once approved you can unlock all benefits through the Education portal.'
                        }
                    }
                ]
            }
        }
    },

    'claude-code-self-coding': {
        title: 'Can an AI Really Code Itself? Inside Anthropic\'s Claude Code Phenomenon',
        description:
            'Explore the bold claim that Claude Code wrote 80% of its own code. Understand what it really means, how the agentic AI tool works, and its implications for software development.',
        category: 'ai',
        component: () =>
            import('~/components/articles/ai/ClaudeCodeSelfCoding.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Can AI Code Itself? Claude Code's 80% Self-Coding Claim Explained – ${BRAND}`,
            description:
                'Deep dive into Anthropic\'s Claude Code: the agentic AI that allegedly wrote 80% of its own code. Understand what this means for developers, businesses, and the future of software.',
            ogImage: OG,
            keywords:
                'claude code, anthropic ai, ai self coding, agentic ai, claude 3.7 sonnet, ai coding assistant, claude code 80 percent, ai software development, latent space podcast',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Can an AI Really Code Itself? Inside Anthropic\'s Claude Code Phenomenon',
                description:
                    'Analysis of Claude Code\'s 80% self-coding claim: what it means, how the agentic AI works, and implications for software development.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-01-25',
                dateModified: '2026-01-25',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/claude-code-self-coding/'
                },
                articleSection: 'Artificial Intelligence',
                about: [
                    'Claude Code',
                    'Anthropic',
                    'Agentic AI',
                    'AI Software Development',
                    'Self-Coding AI'
                ],
                keywords: [
                    'Claude Code',
                    'Anthropic',
                    'agentic AI',
                    'self-coding',
                    'Claude 3.7 Sonnet',
                    'AI coding assistant',
                    'software automation',
                    'Latent Space podcast'
                ],
                proficiencyLevel: 'Intermediate'
            }
        }
    },

    'mlx-terminal-code': {
        title: 'MLX-CODE: 100% Local AI Coding Assistant for macOS',
        description:
            'Discover MLX-CODE, a privacy-focused local AI coding assistant that runs entirely on your Mac using Apple\'s MLX framework. Free, offline, and powerful with 20+ AI models.',
        category: 'ai',
        component: () =>
            import('~/components/articles/ai/MlxTerminalCode.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `MLX Qwen2 1.5B Speed on M1 Mac: Benchmarks & Local AI Setup – ${BRAND}`,
            description:
                'Real speed benchmarks for Qwen2 & Qwen2.5 1.5B on M1/M1 Pro with MLX-LM. Token/s performance, model comparison, and step-by-step setup for local AI coding on Apple Silicon.',
            ogImage: OG,
            keywords:
                'mlx code, local ai coding assistant, apple silicon ai, mlx framework mac, qwen coder, deepseek coder, private ai assistant, offline coding ai, mac ai coding tool, github copilot alternative, apple mlx lm, m1 m2 m3 m4 coding ai, mlx qwen2 1.5b speed, m1 mac mlx benchmark, mlx-lm qwen2 speed, qwen2.5 1.5b mlx, apple silicon llm speed',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'MLX Qwen2 1.5B Speed on M1 Mac: Benchmarks & Local AI Setup',
                description:
                    'Real speed benchmarks for Qwen2 & Qwen2.5 1.5B on M1/M1 Pro with MLX-LM. Token/s performance, model comparison, and step-by-step setup for local AI coding on Apple Silicon.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-12-07',
                dateModified: '2025-12-07',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/mlx-terminal-code/'
                },
                articleSection: 'Artificial Intelligence',
                about: [
                    'Local AI',
                    'Coding Assistant',
                    'Apple MLX Framework',
                    'Privacy-Focused Development',
                    'Apple Silicon'
                ],
                keywords: [
                    'MLX-CODE',
                    'Apple MLX',
                    'Qwen Coder',
                    'DeepSeek V2',
                    'local AI coding',
                    'Apple Silicon',
                    'M1 M2 M3 M4',
                    'GPU acceleration',
                    'offline AI',
                    'GitHub Copilot alternative',
                    'privacy coding assistant'
                ],
                proficiencyLevel: 'Intermediate'
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'How fast is Qwen2 1.5B with MLX-LM on an M1 Mac?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'On M1/M2/M3 Macs with 16GB RAM, MLX-LM delivers around 0.8 seconds response time for the Qwen 3B model and approximately 1.5 seconds for Qwen 7B. The 1.5B variant is even lighter and is recommended for demo and testing purposes only, not daily development.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'How do I install MLX-LM on macOS?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'First install Python 3.12 via Homebrew, create a virtual environment with python3.12 -m venv ~/.mlx-env, then activate it and run pip install mlx-lm prompt-toolkit pillow. MLX-LM requires macOS 13 Ventura or later and an Apple Silicon chip (M1, M2, M3, or M4).'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Which Qwen2 model size should I use on Apple Silicon?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Qwen 7B is recommended for daily development — it requires 8GB RAM, weighs about 4.3GB, and delivers around 1.5 seconds response time on M1/M2/M3. If you have 16GB or more RAM, DeepSeek V2 (~9GB) offers the best code quality with only ~1.8 seconds response time.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Does MLX-LM with Qwen run faster on M4 than M1?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Yes. On an M4 Pro with 24GB RAM, inference is 30-40% faster than on M1/M2, with better memory bandwidth and more efficient power usage. DeepSeek V2 runs with excellent stability on the M4 Pro at that memory configuration.'
                        }
                    }
                ]
            }
        }
    },

    'codehelper-resources-apis-update': {
        title: 'CodeHelper Expands: 800+ Resources & 400+ Public APIs Now Available',
        description:
            'CodeHelper adds two major features: 800+ curated developer resources across 31 categories and 400+ public APIs with advanced filtering. Discover the complete developer hub.',
        category: 'updates',
        component: () =>
            import('~/components/articles/updates/CodehelperResourcesApis.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `CodeHelper Now Includes 800+ Resources & 400+ Public APIs – ${BRAND}`,
            description:
                'Major CodeHelper update: Browse 800+ curated developer resources (colors, icons, UI libraries, design tools) and discover 400+ public APIs across 40 categories. All with smart search and filtering.',
            ogImage: OG,
            keywords:
                'codehelper update, developer resources directory, public apis directory, ui libraries, react resources, vue resources, design tools, color tools, icon libraries, developer toolkit, free resources',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'CodeHelper Expands: 800+ Resources & 400+ Public APIs Now Available',
                description:
                    'Announcing CodeHelper\'s major expansion: 800+ curated external resources and 400+ public APIs. Complete guide to the new directories, filtering options, and smart search features.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2025-12-10',
                dateModified: '2025-12-10',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/codehelper-resources-apis-update/'
                },
                articleSection: 'Product Updates',
                about: [
                    'CodeHelper',
                    'Developer Resources',
                    'Public APIs',
                    'Developer Tools',
                    'UI Libraries'
                ],
                keywords: [
                    'CodeHelper update',
                    'external resources',
                    'public APIs',
                    'developer directory',
                    'UI libraries',
                    'design tools',
                    'React resources',
                    'Vue resources',
                    'API directory',
                    'developer hub'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'intel-core-ultra-series-3': {
        title: 'Intel Core Ultra Series 3: First Processors Built on Intel 18A in the United States',
        description:
            'Intel unveils the Core Ultra Series 3 at CES 2026, the first computing platform manufactured using Intel 18A process entirely in the United States. Featuring up to 16 cores, 50 TOPS NPU, and Arc B390 integrated graphics.',
        category: 'hardware',
        component: () =>
            import('~/components/articles/hardware/IntelCoreUltraSeries3.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Intel Core Ultra Series 3: Intel 18A Processors Made in USA – ${BRAND}`,
            description:
                'Intel Core Ultra Series 3 processors built on Intel 18A: up to 16 cores, 50 TOPS NPU, Arc B390 graphics, 27-hour battery life. First advanced semiconductors manufactured entirely in the United States.',
            ogImage: OG,
            keywords:
                'intel core ultra series 3, intel 18a, ces 2026, intel arc b390, 50 tops npu, american semiconductors, intel processors 2026, ai pc, edge computing intel',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Intel Core Ultra Series 3: First Processors Built on Intel 18A in the United States',
                description:
                    'Analysis of Intel Core Ultra Series 3 processors unveiled at CES 2026, featuring Intel 18A manufacturing process, Arc B390 integrated graphics, and expanded edge computing certification.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-01-27',
                dateModified: '2026-01-27',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/intel-core-ultra-series-3/'
                },
                articleSection: 'Hardware',
                about: [
                    'Intel Core Ultra',
                    'Intel 18A',
                    'Semiconductor Manufacturing',
                    'AI PC',
                    'Edge Computing'
                ],
                keywords: [
                    'Intel Core Ultra Series 3',
                    'Intel 18A',
                    'CES 2026',
                    'Arc B390',
                    'NPU',
                    'AI PC',
                    'American semiconductors',
                    'edge computing',
                    'x86 processors'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'nft-market-2026': {
        title: 'NFT Market in 2026: Signs of Recovery or Final Gasps?',
        description:
            'The NFT market shows unexpected signs of recovery in early 2026, but liquidity remains critically low. Analysis of where capital is moving and which NFT categories still attract investment.',
        category: 'crypto',
        component: () =>
            import('~/components/articles/crypto/NftMarket2026.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `NFT Market Trends 2026: Prices, Volume & Recovery Analysis – ${BRAND}`,
            description:
                'Is the NFT market recovering in 2026? Weekly trading volume, OpenSea trends, price analysis by category, and where smart money is moving. Data-driven market update.',
            ogImage: OG,
            keywords:
                'nft market 2026, nft liquidity, nft recovery, opensea, cryptopunks, pudgy penguins, nft airdrops, real world assets nft, utility nft, nft trading volume',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'NFT Market Trends 2026: Prices, Volume & Recovery Analysis',
                description:
                    'Is the NFT market recovering in 2026? Weekly trading volume, OpenSea trends, price analysis by category, and where smart money is moving. Data-driven market update.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-01-27',
                dateModified: '2026-01-27',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/nft-market-2026/'
                },
                articleSection: 'Crypto',
                about: [
                    'NFT Market',
                    'Cryptocurrency',
                    'Digital Collectibles',
                    'Web3',
                    'Blockchain'
                ],
                keywords: [
                    'NFT market',
                    'NFT 2026',
                    'NFT liquidity',
                    'OpenSea',
                    'CryptoPunks',
                    'utility NFT',
                    'RWA NFT',
                    'NFT trading',
                    'digital collectibles'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'ai-energy-nexus': {
        title: 'The AI Energy Nexus: Are We Building the Future or Burning It?',
        description:
            'AI spending will exceed $2 trillion by 2026, but at what environmental cost? A developer perspective on the AI-energy nexus, resource consumption, and the problem of frivolous AI usage.',
        category: 'sustainability',
        component: () =>
            import('~/components/articles/sustainability/AiEnergyNexus.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `AI Energy Nexus: Environmental Cost of AI from a Developer Perspective – ${BRAND}`,
            description:
                'Data centers will consume 945 TWh by 2030. AI demands electricity, water and critical minerals at unprecedented scale. A developer analysis of the AI-energy nexus and why model selection matters.',
            ogImage: OG,
            keywords:
                'ai energy consumption, ai environmental impact, data center electricity, ai water usage, ai carbon footprint, sustainable ai, green ai, ai infrastructure, developer sustainability',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'The AI Energy Nexus: Are We Building the Future or Burning It?',
                description:
                    'Analysis of AI environmental impact covering energy, water and mineral consumption. Includes developer perspective on sustainable AI practices and criticism of frivolous AI usage.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-01-28',
                dateModified: '2026-01-28',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/ai-energy-nexus/'
                },
                articleSection: 'Sustainability',
                about: [
                    'AI Environmental Impact',
                    'Data Center Energy',
                    'Sustainable Technology',
                    'Green Computing',
                    'Resource Consumption'
                ],
                keywords: [
                    'AI energy nexus',
                    'data center consumption',
                    'AI water usage',
                    'critical minerals',
                    'sustainable AI',
                    'green computing',
                    'carbon footprint',
                    'developer responsibility'
                ],
                proficiencyLevel: 'Intermediate'
            }
        }
    },

    'ai-jobs-tsunami-youth': {
        title: 'AI and the Future of Work: What Young People Must Understand Now',
        description:
            'IMF warns AI will hit labor markets like a tsunami, with 60% of jobs affected and entry-level roles at highest risk. A reflection on human adaptability, education reform, and why imagination remains irreplaceable.',
        category: 'ai',
        component: () =>
            import('~/components/articles/ai/AiJobsTsunamiYouth.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `AI Jobs Tsunami: What Young People Must Do to Survive the Shift – ${BRAND}`,
            description:
                'IMF predicts 60% of jobs in advanced economies will be affected by AI. Analysis of why entry-level workers face the highest risk and how education must change to prepare the next generation.',
            ogImage: OG,
            keywords:
                'ai jobs, ai employment, imf ai warning, davos 2026, ai labor market, youth unemployment ai, ai education, future of work, ai skills, human creativity ai',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'AI and the Future of Work: What Young People Must Understand Now',
                description:
                    'Reflection on the IMF warning about AI impact on employment, focusing on what young people can do to adapt, the role of education, and why human creativity and imagination remain irreplaceable.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-01-29',
                dateModified: '2026-01-29',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/ai-jobs-tsunami-youth/'
                },
                articleSection: 'Artificial Intelligence',
                about: [
                    'AI Employment Impact',
                    'Future of Work',
                    'Youth Employment',
                    'Education Reform',
                    'Human Adaptability'
                ],
                keywords: [
                    'AI jobs',
                    'IMF AI warning',
                    'Davos 2026',
                    'labor market',
                    'entry-level jobs',
                    'education AI',
                    'human creativity',
                    'adaptability',
                    'future of work'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'space-data-centers-hype': {
        title: 'AI Data Centers in Space: Sustainability Vision or Financial Engineering?',
        description:
            'SpaceX and Blue Origin promote space-based AI data centers as sustainable. But with 165 rocket launches per year, 9,400 Starlink satellites, and daily debris reentries, is this green tech or green marketing?',
        category: 'sustainability',
        component: () =>
            import('~/components/articles/sustainability/SpaceDataCentersHype.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Space AI Data Centers: Sustainability or Hype? A Critical Analysis – ${BRAND}`,
            description:
                'Critical examination of space-based AI data center proposals from SpaceX, Blue Origin and others. Analysis of launch emissions, Starlink pollution, solar panel efficiency limits, and why nuclear investments are more concrete.',
            ogImage: OG,
            keywords:
                'space data centers, spacex ai, starlink pollution, rocket emissions, space sustainability, nuclear data centers, blue origin, elon musk ai, satellite debris, space solar power',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'AI Data Centers in Space: Sustainability Vision or Financial Engineering?',
                description:
                    'Critical analysis of space-based AI data center proposals, examining launch emissions, satellite debris, solar panel efficiency, and comparing with concrete nuclear power investments by Big Tech.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-01-30',
                dateModified: '2026-01-30',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/space-data-centers-hype/'
                },
                articleSection: 'Sustainability',
                about: [
                    'Space Data Centers',
                    'SpaceX',
                    'Starlink',
                    'Launch Emissions',
                    'Nuclear Power AI',
                    'Space Debris'
                ],
                keywords: [
                    'space data centers',
                    'SpaceX xAI',
                    'Starlink satellites',
                    'rocket emissions',
                    'space sustainability',
                    'nuclear AI',
                    'satellite debris',
                    'Blue Origin',
                    'solar efficiency space'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'big-bang-echo-discovery': {
        title: 'The Echo of the Big Bang: How a Mysterious Noise Proved the Origin of the Universe',
        description:
            'The remarkable story of how Penzias and Wilson accidentally discovered the Cosmic Microwave Background radiation while trying to eliminate noise from their antenna—proving the Big Bang theory.',
        category: 'science',
        component: () =>
            import('~/components/articles/science/BigBangEchoDiscovery.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `The Echo of the Big Bang: Penzias, Wilson & the CMB Discovery – ${BRAND}`,
            description:
                'How Arno Penzias and Robert Wilson accidentally discovered the Cosmic Microwave Background radiation in 1964, proving the Big Bang theory. A story of serendipity and Nobel Prize-winning science.',
            ogImage: OG,
            keywords:
                'cosmic microwave background, cmb discovery, penzias wilson, big bang proof, bell laboratories, serendipity science, nobel prize physics 1978, radio astronomy, holmdel horn antenna',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'The Echo of the Big Bang: How a Mysterious Noise Proved the Origin of the Universe',
                description:
                    'The story of how Arno Penzias and Robert Wilson accidentally discovered the Cosmic Microwave Background radiation while trying to eliminate antenna noise, providing definitive proof of the Big Bang.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-08',
                dateModified: '2026-02-08',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/big-bang-echo-discovery/'
                },
                articleSection: 'Science',
                about: [
                    'Cosmic Microwave Background',
                    'Big Bang Theory',
                    'Radio Astronomy',
                    'History of Science',
                    'Serendipity'
                ],
                keywords: [
                    'Cosmic Microwave Background',
                    'CMB',
                    'Penzias Wilson',
                    'Big Bang proof',
                    'Bell Laboratories',
                    'serendipity',
                    'Nobel Prize 1978',
                    'radio astronomy',
                    'cosmology'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'ollama-opencode-setup': {
        title: 'Local AI Coding Setup: Ollama + OpenCode on macOS Terminal',
        description:
            'Step-by-step guide to setting up a fully local AI coding agent with Ollama and OpenCode on macOS. Agentic tool use, multi-model support, zero cloud dependencies — all running on Apple Silicon.',
        category: 'ai',
        component: () =>
            import('~/components/articles/ai/OllamaOpenCodeSetup.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `How to Connect OpenCode to Ollama: Local AI Coding Setup Guide – ${BRAND}`,
            description:
                'Step-by-step guide to connect OpenCode with Ollama for 100% local AI coding on macOS. Model configuration, context window tuning, and agentic features — no cloud required.',
            ogImage: OG,
            keywords:
                'ollama opencode, local ai coding, ollama macos, opencode cli, ai coding agent terminal, qwen coder ollama, local llm coding, apple silicon ai, ollama openai compatible, agentic coding local, opencode ollama, connect opencode ollama, opencode local model, ollama opencode setup',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'How to Connect OpenCode to Ollama: Local AI Coding Setup Guide',
                description:
                    'Step-by-step guide to connect OpenCode with Ollama for 100% local AI coding on macOS. Model configuration, context window tuning, and agentic features — no cloud required.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-12',
                dateModified: '2026-02-12',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/ollama-opencode-setup/'
                },
                articleSection: 'Artificial Intelligence',
                about: [
                    'Ollama',
                    'OpenCode',
                    'Local AI',
                    'Coding Agent',
                    'Apple Silicon',
                    'Terminal Workflow'
                ],
                keywords: [
                    'Ollama',
                    'OpenCode',
                    'local AI coding',
                    'Apple Silicon',
                    'qwen coder',
                    'agentic coding',
                    'tool use',
                    'macOS terminal',
                    'privacy-first AI',
                    'MLX alternative'
                ],
                proficiencyLevel: 'Intermediate'
            },
            faqSchema: {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'How do I connect OpenCode to Ollama?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Create a config file at ~/.config/opencode/opencode.json that points to Ollama\'s OpenAI-compatible endpoint at http://localhost:11434/v1. Set the provider to @ai-sdk/openai-compatible, list your models with "tools": true, and make sure ollama serve is running before launching OpenCode.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Which models work best with OpenCode and Ollama?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'qwen2.5-coder:7b is the recommended model for general coding due to its quality/speed balance. For PHP/WordPress work deepseek-coder:6.7b performs well, codellama:7b works on 8GB RAM machines, and qwen2.5-coder:32b provides the best quality but requires 32GB or more RAM.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are the system requirements to run Ollama with OpenCode?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'You need macOS Ventura or later, an Apple Silicon chip (M1-M4), Homebrew, Node.js/npm, and at least 8GB RAM (16GB or more is recommended for 7B models). Both Ollama and OpenCode are free and open source.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Why is my OpenCode setup not finding Ollama models?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The most common causes are: ollama serve is not running, the baseURL in your config is missing the /v1 suffix (it must be http://localhost:11434/v1), or the model name in your config does not exactly match the name shown by ollama list. Also ensure the context window is set to at least 16K.'
                        }
                    }
                ]
            }
        }
    },

    'openclaw-saga': {
        title: 'From Clawdbot to OpenClaw: Hype, Scams, and the Future of AI Agents',
        description:
            'The open-source AI agent that gained 193K GitHub stars, got hijacked by crypto scammers, exposed 42,900 control panels, and landed its creator a job at OpenAI. The full story of Clawdbot, Moltbot, and OpenClaw.',
        category: 'ai',
        component: () =>
            import('~/components/articles/ai/OpenClawSaga.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `From Clawdbot to OpenClaw: Hype, Scams, and the Future of AI Agents – ${BRAND}`,
            description:
                'The full story of Clawdbot/Moltbot/OpenClaw: 193K GitHub stars, $16M crypto scam, 42,900 exposed panels, prompt injection attacks, and Peter Steinberger joining OpenAI. A case study on autonomous AI agents.',
            ogImage: OG,
            keywords:
                'openclaw, clawdbot, moltbot, peter steinberger, ai agent, autonomous ai, prompt injection, crypto scam clawd token, openclaw security, openai, open source ai agent, github stars',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'From Clawdbot to OpenClaw: Hype, Scams, and the Future of AI Agents',
                description:
                    'The complete story of OpenClaw: from viral launch to trademark dispute, crypto fraud, massive security vulnerabilities, and acquisition by OpenAI. A case study on the promises and dangers of autonomous AI agents.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-18',
                dateModified: '2026-02-18',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/openclaw-saga/'
                },
                articleSection: 'Artificial Intelligence',
                about: [
                    'OpenClaw',
                    'Autonomous AI Agents',
                    'AI Security',
                    'Crypto Scams',
                    'Open Source'
                ],
                keywords: [
                    'OpenClaw',
                    'Clawdbot',
                    'Moltbot',
                    'Peter Steinberger',
                    'AI agent',
                    'prompt injection',
                    'crypto scam',
                    'OpenAI',
                    'autonomous AI',
                    'GitHub stars'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'osmotic-power-coastal-cities': {
        title: 'Blue Energy: Why Coastal Cities Are Betting on Osmotic Power',
        description:
            'Osmotic power harvests electricity from the natural mixing of freshwater and saltwater. With 15,000 TWh of untapped potential yearly, coastal cities and desalination plants are turning waste into energy.',
        category: 'energy',
        component: () =>
            import('~/components/articles/energy/OsmoticPowerCoastalCities.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Blue Energy: Osmotic Power Explained - The Future of Coastal Renewables – ${BRAND}`,
            description:
                'Discover how osmotic power (blue energy) generates electricity from mixing freshwater and saltwater. PRO vs ionic generators, real projects in Japan, Denmark & France, and why desalination plants are key.',
            ogImage: OG,
            keywords:
                'osmotic power, blue energy, salinity gradient energy, pressure retarded osmosis, PRO, ionic generators, desalination energy, renewable baseload, Sweetch Energy, SaltPower, coastal energy, river delta power',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Blue Energy: Why Coastal Cities Are Betting on Osmotic Power',
                description:
                    'How osmotic power works, comparing PRO and ionic generator technologies, real-world projects, global potential, and challenges. A comprehensive guide to salinity gradient energy.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-09',
                dateModified: '2026-02-09',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/osmotic-power-coastal-cities/'
                },
                articleSection: 'Energy',
                about: [
                    'Osmotic Power',
                    'Blue Energy',
                    'Renewable Energy',
                    'Desalination',
                    'Salinity Gradient'
                ],
                keywords: [
                    'osmotic power',
                    'blue energy',
                    'PRO',
                    'pressure retarded osmosis',
                    'ionic generators',
                    'desalination',
                    'baseload renewable',
                    'Sweetch Energy',
                    'SaltPower',
                    'Fukuoka'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'ai-automation-reality-check': {
        title: 'The AI Automation Paradox: Why 96% of AI Work Still Fails the Human Test',
        description:
            'The Remote Labor Index reveals a stark truth: AI models fail 96.25% of professional tasks. An analysis of economic impacts, investment billions, job market realities, and why the future remains uncertain.',
        category: 'ai',
        component: () =>
            import('~/components/articles/ai/AiAutomationRealityCheck.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `AI Fails at 96% of Jobs: What the Study Actually Says – ${BRAND}`,
            description:
                'The Remote Labor Index reveals AI models fail 96.25% of professional tasks. Deep analysis of the study, economic implications, and why the gap between AI hype and reality matters.',
            ogImage: OG,
            keywords:
                'ai automation reality, remote labor index, ai failure rate, ai job displacement, ai investment bubble, elon musk coding prediction, coldfusion ai, ai economic impact, ai hype vs reality, professional ai tasks, gpt-5 performance, claude opus performance',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'AI Fails at 96% of Jobs: What the Study Actually Says',
                description:
                    'The Remote Labor Index reveals AI models fail 96.25% of professional tasks. Deep analysis of the study, economic implications, and why the gap between AI hype and reality matters.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-16',
                dateModified: '2026-02-16',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/ai-automation-reality-check/'
                },
                articleSection: 'Artificial Intelligence',
                about: [
                    'AI Automation',
                    'Remote Labor Index',
                    'AI Economics',
                    'Job Market Impact',
                    'AI Performance Benchmarks',
                    'Investment Analysis'
                ],
                keywords: [
                    'Remote Labor Index',
                    'AI automation',
                    'AI failure rate',
                    'freelance automation',
                    'AI job displacement',
                    'economic impact',
                    'Claude Opus',
                    'GPT-5',
                    'Gemini performance',
                    'Elon Musk AI',
                    'ColdFusion',
                    'Dagogo Altraide',
                    'Yann LeCun',
                    'AI scaling problem',
                    'investment bubble'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'juan-pujol-garcia': {
        title: 'History Doesn\'t Always Choose the Most Qualified. Sometimes It Chooses the Bold.',
        description:
            'The extraordinary story of Juan Pujol García: a chicken farmer with no training who invented 27 imaginary spies, fooled Adolf Hitler, changed the outcome of D-Day, and saved tens of thousands of Allied lives.',
        category: 'history',
        component: () =>
            import('~/components/articles/history/JuanPujolGarcia.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `History Doesn't Choose the Most Qualified. Sometimes the Bold. – ${BRAND}`,
            description:
                'Juan Pujol García: rejected chicken farmer who invented 27 fake spies, deceived Hitler, earned the Iron Cross & MBE, and changed D-Day. The story of when audacity beats credentials.',
            ogImage: OG,
            keywords:
                'juan pujol garcia, agent garbo, d-day deception, operation fortitude, double agent wwii, garbo spy, iron cross mbe, fusag fake army, spanish spy, boldness vs qualifications',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: 'History Doesn\'t Always Choose the Most Qualified. Sometimes It Chooses the Bold.',
                description:
                    'The remarkable true story of Juan Pujol García (Agent GARBO), the chicken farmer who became the greatest double agent of WWII, fooled Hitler, and saved D-Day with nothing but imagination and audacity.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-17',
                dateModified: '2026-02-17',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/juan-pujol-garcia/'
                },
                articleSection: 'History',
                about: [
                    'World War II',
                    'D-Day',
                    'Espionage',
                    'Double Agents',
                    'Operation Fortitude',
                    'Boldness',
                    'Audacity'
                ],
                keywords: [
                    'Juan Pujol García',
                    'Agent GARBO',
                    'D-Day deception',
                    'Operation Fortitude',
                    'FUSAG',
                    'double agent',
                    'Iron Cross',
                    'MBE',
                    'boldness',
                    'audacity',
                    'WWII spy',
                    'Normandy invasion',
                    'Tomás Harris',
                    'MI5',
                    'Abwehr'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'mit-thermal-computing': {
        title: 'Heat as a Computer: MIT Engineers Build Silicon That Calculates Without Electricity',
        description:
            'MIT researchers designed silicon microstructures that perform matrix-vector multiplication using heat flow instead of electrical signals. No transistors, no code, the physics of heat propagation is the computation itself.',
        category: 'hardware',
        component: () =>
            import('~/components/articles/hardware/MitThermalComputing.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `MIT Thermal Computing: Silicon Structures That Calculate With Heat – ${BRAND}`,
            description:
                'MIT engineers built porous silicon microstructures that compute matrix-vector multiplications using only heat flow — 99%+ accuracy, zero active energy. A look at thermal computing, inverse design, and the future of reconfigurable analog hardware.',
            ogImage: OG,
            keywords:
                'thermal computing, mit thermal silicon, heat as computation, inverse design silicon, matrix vector multiplication heat, analog computing, phase change materials, memristor, neuromorphic chips, analog ai accelerator',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Heat as a Computer: MIT Engineers Build Silicon That Calculates Without Electricity',
                description:
                    'MIT researchers designed silicon microstructures that perform matrix-vector multiplication using heat flow instead of electrical signals. An analysis of thermal computing, inverse design, current limitations, and the path toward reconfigurable physical operators.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-02-24',
                dateModified: '2026-02-24',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/mit-thermal-computing/'
                },
                articleSection: 'Hardware',
                about: [
                    'Thermal Computing',
                    'Analog Computing',
                    'Inverse Design',
                    'Silicon Microstructures',
                    'Matrix-Vector Multiplication',
                    'Phase-Change Materials',
                    'Neuromorphic Hardware',
                    'AI Accelerators'
                ],
                keywords: [
                    'thermal computing',
                    'MIT silicon structures',
                    'heat computation',
                    'inverse design',
                    'matrix-vector multiplication',
                    'analog AI accelerator',
                    'phase-change materials GST',
                    'memristor crossbar',
                    'neuromorphic chips',
                    'computing in memory',
                    'Caio Silva',
                    'Giuseppe Romano',
                    'reconfigurable hardware',
                    'programmable metamaterials'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'hacking-ai-search-truth': {
        title: 'Hacking AI in 20 Minutes: The Slow Death of Trustworthy Search',
        description:
            'A BBC journalist tricked ChatGPT and Google into spreading lies with a single blog post. A reflection on AI manipulation, the content death spiral, model collapse, and the slow erosion of internet freedom.',
        category: 'ethics',
        component: () =>
            import('~/components/articles/ethics/HackingAiSearchTruth.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `Hacking AI in 20 Minutes: The Slow Death of Trustworthy Search – ${BRAND}`,
            description:
                'A BBC journalist hacked ChatGPT and Google with a fake blog post in 20 minutes. Analysis of AI search manipulation, model collapse, content creator starvation, and the erosion of internet freedom.',
            ogImage: OG,
            keywords:
                'ai search manipulation, hacking chatgpt, google ai overviews hack, ai misinformation, model collapse, ai content death spiral, seo ai manipulation, ai trust crisis, internet freedom, ai fake content',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'Hacking AI in 20 Minutes: The Slow Death of Trustworthy Search',
                description:
                    'Analysis of how AI chatbots can be manipulated with simple blog posts, the implications for information accuracy, the content death spiral affecting creators, and the erosion of the open internet.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-03-04',
                dateModified: '2026-03-04',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/hacking-ai-search-truth/'
                },
                articleSection: 'Ethics',
                about: [
                    'AI Search Manipulation',
                    'Misinformation',
                    'Model Collapse',
                    'Content Creator Economy',
                    'Internet Freedom',
                    'Critical Thinking'
                ],
                keywords: [
                    'AI search manipulation',
                    'ChatGPT hacking',
                    'Google AI Overviews',
                    'model collapse',
                    'content death spiral',
                    'SEO AI',
                    'misinformation',
                    'internet freedom',
                    'AI trust',
                    'Lily Ray',
                    'Thomas Germain',
                    'BBC'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

    'pentagon-ai-showdown': {
        title: 'The Pentagon AI Showdown: When OpenAI Accepted What Anthropic Refused',
        description:
            'Write an in-depth English article about the OpenAI-Pentagon deal and Anthropic\'s refusal to compromise on AI safety guardrails (Feb/March 2026).',
        category: 'ethics',
        component: () =>
            import('~/components/articles/ethics/PentagonAiShowdown.vue') as Promise<{ default: DefineComponent }>,
        seo: {
            title: `The Pentagon AI Showdown: OpenAI vs Anthropic – ${BRAND}`,
            description:
                'Inside the $200M OpenAI-Pentagon deal and Anthropic\'s refusal to compromise on AI safety. Analysis of the #QuitGPT boycott and the future of autonomous weapons.',
            ogImage: OG,
            keywords:
                'openai pentagon deal, anthropic ai safety, dario amodei interview, sam altman pentagon, quitgpt boycott, autonomous weapons ai, ai ethics showdown, maduro raid ai, supply chain risk anthropic',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'The Pentagon AI Showdown: When OpenAI Accepted What Anthropic Refused',
                description:
                    'An in-depth analysis of the ideological split between OpenAI and Anthropic regarding military contracts, autonomous weapons, and AI safety guardrails.',
                author: { '@type': 'Person', name: 'Gianluca' },
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeHelper',
                    logo: { '@type': 'ImageObject', url: OG }
                },
                image: OG,
                datePublished: '2026-03-02',
                dateModified: '2026-03-02',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://codehelper.me/articles/pentagon-ai-showdown/'
                },
                articleSection: 'Ethics',
                about: [
                    'AI Ethics',
                    'Military AI',
                    'Autonomous Weapons',
                    'Corporate Responsibility',
                    'AI Safety'
                ],
                keywords: [
                    'OpenAI',
                    'Anthropic',
                    'Pentagon',
                    'AI Safety',
                    'Red Lines',
                    '#QuitGPT',
                    'Dario Amodei',
                    'Sam Altman'
                ],
                proficiencyLevel: 'General'
            }
        }
    },

}
