// Import only the type, not the actual components
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

// Manually define articles metadata (without importing components)
const articlesData: Record<string, Omit<Article, 'component'>> = {
  'how-to-use-json': {
    title: 'How to Use JSON in JavaScript',
    description: 'A practical guide to understanding and using JSON for data exchange in modern web development.',
    category: 'javascript',
    seo: {
      structuredData: {
        datePublished: '2025-09-03',
        dateModified: '2025-09-03'
      }
    }
  },
  'clipboard-snippets': {
    title: '10 JavaScript Snippets Every Developer Should Keep in Their Clipboard Manager',
    description: 'Boost your productivity with these reusable snippets. Copy-paste ready for every dev.',
    category: 'javascript',
    seo: {
      structuredData: {
        datePublished: '2025-09-04',
        dateModified: '2025-09-04'
      }
    }
  },
  'ai-hacking': {
    title: 'Can AI Be Hacked? Real-World Attacks and Defenses',
    description: 'Explore how attackers compromise AI-powered apps and how to defend them. A must-read for anyone building with AI in 2025.',
    category: 'hacking',
    seo: {
      structuredData: {
        datePublished: '2025-09-02',
        dateModified: '2025-09-02'
      }
    }
  },
  'ai-cyberattacks-rising': {
    title: 'AI-powered cyberattacks: how AI is fueling a new wave of hacking',
    description: 'AI is scaling cybercrime: ransomware automation, deepfake fraud, spear phishing at scale, and adaptive malware. Data-backed analysis with practical defenses.',
    category: 'security',
    seo: {
      structuredData: {
        datePublished: '2025-09-16',
        dateModified: '2025-09-16'
      }
    }
  },
  'hacker-dropbox': {
    title: 'Building a Hacker Dropbox with Raspberry Pi and Twingate',
    description: 'Learn how to build a remote access dropbox using Raspberry Pi and Twingate (ZTNA). Ideal for IT support and ethical hacking.',
    category: 'hacking',
    seo: {
      structuredData: {
        datePublished: '2025-09-01',
        dateModified: '2025-09-01'
      }
    }
  },
  'polar-night-sand-battery': {
    title: 'Polar Night Energy Builds Industrial-Scale Sand Battery in Pornainen',
    description: "Discover how Polar Night Energy's new Sand Battery in Pornainen delivers 1 MW thermal power, stores 100 MWh, and cuts emissions by 70% in district heating.",
    category: 'energy',
    seo: {
      structuredData: {
        datePublished: '2025-09-07',
        dateModified: '2025-09-07'
      }
    }
  },
  'co2-battery': {
    title: 'CO₂ Battery: Closed Thermo-Mechanical Energy Storage Explained',
    description: 'Learn how the CO₂ Battery stores and generates electricity using closed thermo-mechanical cycles with carbon dioxide—offering long-duration energy storage with zero emissions.',
    category: 'energy',
    seo: {
      structuredData: {
        datePublished: '2025-09-08',
        dateModified: '2025-09-08'
      }
    }
  },
  'samsung-9100-pro-nvme': {
    title: 'Samsung 9100 Pro NVMe — 14 GB/s Gen5 Storage & LLM Workflow Acceleration',
    description: "Explore Samsung's 9100 Pro PCIe 5.0 NVMe SSD with up to 14.8 GB/s read/write. Its ultra-fast storage reshapes GPU offloading for large model workflows and data-heavy tasks.",
    category: 'hardware',
    seo: {
      structuredData: {
        datePublished: '2025-09-08',
        dateModified: '2025-09-08'
      }
    }
  },
  'github-student-pack': {
    title: 'GitHub Student Developer Pack — Free Tools & Resources for Students',
    description: "A complete overview of GitHub's Student Developer Pack: free IDEs, cloud credits, domains, and pro tools to help students learn and ship real projects.",
    category: 'education',
    seo: {
      structuredData: {
        datePublished: '2025-09-08',
        dateModified: '2025-09-08'
      }
    }
  },
  'mlx-terminal-code': {
    title: 'MLX-CODE: 100% Local AI Coding Assistant for macOS',
    description: 'Discover MLX-CODE, a privacy-focused local AI coding assistant that runs entirely on your Mac using Apple\'s MLX framework. Free, offline, and powerful with 20+ AI models.',
    category: 'ai',
    seo: {
      structuredData: {
        datePublished: '2025-12-07',
        dateModified: '2025-12-07'
      }
    }
  },
  'codehelper-resources-apis-update': {
    title: 'CodeHelper Expands: 800+ Resources & 400+ Public APIs Now Available',
    description: 'CodeHelper adds two major features: 800+ curated developer resources across 31 categories and 400+ public APIs with advanced filtering. Discover the complete developer hub.',
    category: 'updates',
    seo: {
      structuredData: {
        datePublished: '2025-12-10',
        dateModified: '2025-12-10'
      }
    }
  },
  'claude-code-self-coding': {
    title: 'Can an AI Really Code Itself? Inside Anthropic\'s Claude Code Phenomenon',
    description: 'Explore the bold claim that Claude Code wrote 80% of its own code. Understand what it really means, how the agentic AI tool works, and its implications for software development.',
    category: 'ai',
    seo: {
      structuredData: {
        datePublished: '2026-01-25',
        dateModified: '2026-01-25'
      }
    }
  },
  'ram-prices-surge-2026': {
    title: 'Why RAM Prices Are Surging in 2026',
    description: 'Understand why DDR4 and DDR5 memory prices have skyrocketed: AI demand, wafer shortages, HBM production shifts, and what consumers and businesses can do about it.',
    category: 'hardware',
    seo: {
      structuredData: {
        datePublished: '2026-01-25',
        dateModified: '2026-01-25'
      }
    }
  },
  'intel-core-ultra-series-3': {
    title: 'Intel Core Ultra Series 3: First Processors Built on Intel 18A in the United States',
    description: 'Intel unveils the Core Ultra Series 3 at CES 2026, the first computing platform manufactured using Intel 18A process entirely in the United States. Featuring up to 16 cores, 50 TOPS NPU, and Arc B390 integrated graphics.',
    category: 'hardware',
    seo: {
      structuredData: {
        datePublished: '2026-01-27',
        dateModified: '2026-01-27'
      }
    }
  },
  'nft-market-2026': {
    title: 'NFT Market in 2026: Signs of Recovery or Final Gasps?',
    description: 'The NFT market shows unexpected signs of recovery in early 2026, but liquidity remains critically low. Analysis of where capital is moving and which NFT categories still attract investment.',
    category: 'crypto',
    seo: {
      structuredData: {
        datePublished: '2026-01-27',
        dateModified: '2026-01-27'
      }
    }
  },
  'ai-energy-nexus': {
    title: 'The AI Energy Nexus: Are We Building the Future or Burning It?',
    description: 'AI spending will exceed $2 trillion by 2026, but at what environmental cost? A developer perspective on the AI-energy nexus, resource consumption, and the problem of frivolous AI usage.',
    category: 'sustainability',
    seo: {
      structuredData: {
        datePublished: '2026-01-28',
        dateModified: '2026-01-28'
      }
    }
  },
  'ai-jobs-tsunami-youth': {
    title: 'AI and the Future of Work: What Young People Must Understand Now',
    description: 'IMF warns AI will hit labor markets like a tsunami, with 60% of jobs affected and entry-level roles at highest risk. A reflection on human adaptability, education reform, and why imagination remains irreplaceable.',
    category: 'ai',
    seo: {
      structuredData: {
        datePublished: '2026-01-29',
        dateModified: '2026-01-29'
      }
    }
  },
  'space-data-centers-hype': {
    title: 'AI Data Centers in Space: Sustainability Vision or Financial Engineering?',
    description: 'SpaceX and Blue Origin promote space-based AI data centers as sustainable. But with 165 rocket launches per year, 9,400 Starlink satellites, and daily debris reentries, is this green tech or green marketing?',
    category: 'sustainability',
    seo: {
      structuredData: {
        datePublished: '2026-01-30',
        dateModified: '2026-01-30'
      }
    }
  },
  'big-bang-echo-discovery': {
    title: 'The Echo of the Big Bang: How a Mysterious Noise Proved the Origin of the Universe',
    description: 'The remarkable story of how Penzias and Wilson accidentally discovered the Cosmic Microwave Background radiation while trying to eliminate noise from their antenna—proving the Big Bang theory.',
    category: 'science',
    seo: {
      structuredData: {
        datePublished: '2026-02-08',
        dateModified: '2026-02-08'
      }
    }
  },
  'ollama-opencode-setup': {
    title: 'Local AI Coding Setup: Ollama + OpenCode on macOS Terminal',
    description: 'Step-by-step guide to setting up a fully local AI coding agent with Ollama and OpenCode on macOS. Agentic tool use, multi-model support, zero cloud dependencies — all running on Apple Silicon.',
    category: 'ai',
    seo: {
      structuredData: {
        datePublished: '2026-02-12',
        dateModified: '2026-02-12'
      }
    }
  },
  'osmotic-power-coastal-cities': {
    title: 'Blue Energy: Why Coastal Cities Are Betting on Osmotic Power',
    description: 'Osmotic power harvests electricity from the natural mixing of freshwater and saltwater. With 15,000 TWh of untapped potential yearly, coastal cities and desalination plants are turning waste into energy.',
    category: 'energy',
    seo: {
      structuredData: {
        datePublished: '2026-02-09',
        dateModified: '2026-02-09'
      }
    }
  }
}

export default defineEventHandler((event) => {
  const siteUrl = 'https://codehelper.me'
  const feedUrl = `${siteUrl}/feed.json`

  // Sort articles by date (newest first)
  const sortedArticles = Object.entries(articlesData)
    .map(([slug, article]) => ({
      slug,
      ...article,
      datePublished: article.seo?.structuredData?.datePublished || new Date().toISOString(),
      dateModified: article.seo?.structuredData?.dateModified || article.seo?.structuredData?.datePublished || new Date().toISOString()
    }))
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 20) // Latest 20 articles

  // Generate JSON Feed 1.1 format
  // Spec: https://www.jsonfeed.org/version/1.1/
  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'CodeHelper – Developer Articles & Tutorials',
    home_page_url: `${siteUrl}/articles`,
    feed_url: feedUrl,
    description: 'Free tutorials, guides, and insights for developers. Learn JavaScript, security, hacking, and more.',
    icon: `${siteUrl}/images/codehelper_logo_500_500_no_bg.webp`,
    favicon: `${siteUrl}/favicon.ico`,
    language: 'en',
    authors: [
      {
        name: 'CodeHelper Team',
        url: siteUrl,
        avatar: `${siteUrl}/images/codehelper_logo_500_500_no_bg.webp`
      }
    ],
    items: sortedArticles.map((article) => {
      const articleUrl = `${siteUrl}/articles/${article.slug}`
      const author = article.seo?.structuredData?.author?.name || 'CodeHelper Team'
      const keywords = article.seo?.keywords?.split(',').map(k => k.trim()) || []

      return {
        id: articleUrl,
        url: articleUrl,
        title: article.title,
        content_html: `<p>${article.description}</p>`,
        summary: article.description,
        image: article.seo?.ogImage || `${siteUrl}/images/Codehelper_og_articles-optimized.webp`,
        date_published: article.datePublished,
        date_modified: article.dateModified,
        authors: [
          {
            name: author
          }
        ],
        tags: [article.category, ...keywords].filter(Boolean)
      }
    })
  }

  event.node.res.setHeader('Content-Type', 'application/json; charset=utf-8')
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600') // Cache for 1 hour
  return jsonFeed
})
