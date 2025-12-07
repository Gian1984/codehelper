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
                    '@id': 'https://codehelper.me/articles/ai-cyberattacks-rising'
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
                    '@id': 'https://codehelper.me/articles/co2-battery'
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
                    '@id': 'https://codehelper.me/articles/samsung-9100-pro-nvme'
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
            title: `GitHub Student Developer Pack — Free Tools & Resources – ${BRAND}`,
            description:
                'Discover everything included in GitHub\'s Student Developer Pack: Copilot Pro, JetBrains IDEs, cloud credits, domains, and learning platforms—all free for verified students.',
            ogImage: OG,
            keywords:
                'GitHub Student Pack, free developer tools students, GitHub Education benefits, JetBrains free student license, GitHub Copilot free, student cloud credits',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'GitHub Student Developer Pack — Free Tools & Resources for Students',
                description:
                    'Guide to GitHub\'s Student Developer Pack, including Copilot, JetBrains, cloud credits, domains, and learning resources. Learn how to apply and maximize your benefits.',
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
                    '@id': 'https://codehelper.me/articles/github-student-pack'
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
            title: `MLX-CODE: Local AI Coding Assistant for Apple Silicon (Free) – ${BRAND}`,
            description:
                'Complete guide to MLX-CODE: 100% local AI coding assistant for macOS with Apple MLX framework. Features 20+ models (Qwen, DeepSeek, Llama 3), intelligent file context, auto-backup, and GPU acceleration. Free alternative to GitHub Copilot.',
            ogImage: OG,
            keywords:
                'mlx code, local ai coding assistant, apple silicon ai, mlx framework mac, qwen coder, deepseek coder, private ai assistant, offline coding ai, mac ai coding tool, github copilot alternative, apple mlx lm, m1 m2 m3 m4 coding ai',
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'TechArticle',
                headline: 'MLX-CODE: 100% Local AI Coding Assistant for macOS',
                description:
                    'In-depth guide to MLX-CODE, a local AI coding assistant running on Apple Silicon with MLX framework. Covers installation, models (Qwen 1.5B-32B, DeepSeek V2), features, performance, and privacy.',
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
                    '@id': 'https://codehelper.me/articles/mlx-terminal-code'
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
            }
        }
    },



}
