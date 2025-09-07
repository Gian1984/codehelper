<template>
  <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
         alt="Developers collaborating with laptops and code on screens"
         class="absolute inset-0 -z-10 size-full object-cover" />

    <!-- Gradient background shapes -->
    <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
      <div class="aspect-1097/845 w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
           style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
      <div class="aspect-1097/845 w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
           style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>

    <!-- Hero Content -->
    <div class="mx-auto max-w-2xl text-center">
      <img
          class="aspect-square w-36 rounded-2xl mx-auto mb-4"
          src="/images/codehelper_logo_500_500_no_bg.webp"
          alt="CodeHelper logo"
      />
      <h1 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
        CodeHelper <br> Free Online Tools for Developers
      </h1>
      <p class="mt-6 text-lg font-medium text-gray-300 sm:text-xl">
        Supercharge your workflow with <strong class="text-white">lightweight, browser-based utilities</strong> for coding, design, and productivity.
        Format JSON, convert units, generate colors, and optimize code. All <strong class="text-white">fast, free, and private</strong>.
        No sign-up. No clutter. Just the tools you need.
      </p>
    </div>
  </div>


  <!-- Philosophy Section -->
  <div class="bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12 ">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">
        Build Smarter with Lightweight, Sustainable Tools
      </h2>
      <div class="rounded-lg bg-gray-800 p-8 shadow hover:shadow-md transition">
        <p class="text-lg text-gray-300">
          CodeHelper is built around <strong>focused, single-purpose utilities</strong> that run
          directly in your browser. Instead of relying on bloated frameworks or cloud APIs,
          you get instant results for tasks like <strong>formatting JSON</strong>, <strong>converting units</strong>,
          or <strong>generating a README</strong>—all with <strong>zero setup</strong>.
        </p>
        <p class="mt-4 text-lg text-gray-300">
          This approach makes every tool <strong>fast, privacy-friendly, and energy-efficient</strong>.
          No unnecessary dependencies, no tracking, just clean output and a smoother workflow
          that helps you <strong>ship faster while keeping things sustainable</strong>.
        </p>
      </div>
    </div>
  </div>


  <!-- Popular Tools -->
  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">
        Popular Developer Tools
      </h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" aria-label="Popular tools">
        <li v-for="([slug, tool], i) in topTools" :key="slug" class="rounded-lg bg-gray-800 p-4 shadow hover:shadow-md transition">
          <NuxtLink :to="`/tools/${slug}`" class="block" :aria-label="`Open ${tool.title}`">
            <h3 class="text-xl font-semibold hover:text-indigo-400">{{ tool.title }}</h3>
            <p class="text-gray-400 text-sm mt-1">{{ tool.description }}</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="text-center mt-10">
        <NuxtLink to="/tools" class="bg-indigo-600 px-5 py-3 rounded hover:bg-indigo-500 text-white text-lg" aria-label="Explore all developer tools">
          Explore all tools
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Tool Categories -->
  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">Tool Categories</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" aria-label="Tool categories">
        <li v-for="(toolsInCategory, category) in toolsByCategory" :key="category" class="rounded-lg bg-gray-800 p-6 shadow hover:shadow-md transition text-center">
          <NuxtLink :to="`/tools?category=${category}`" class="block text-lg font-semibold capitalize text-white hover:text-indigo-400" :aria-label="`View ${category} tools`">
            {{ category }}
          </NuxtLink>
          <p class="mt-2 text-gray-400 text-sm">{{ toolsInCategory.length }} tool{{ toolsInCategory.length > 1 ? 's' : '' }}</p>
        </li>
      </ul>
    </div>
  </div>


  <!-- Articles Intro Section -->
  <div class="bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">
        Insights, Tutorials, and Developer Guides
      </h2>
      <div class="rounded-lg bg-gray-800 p-8 shadow hover:shadow-md transition">
        <p class="text-lg text-gray-300">
          CodeHelper isn’t just about tools, it’s also about <strong>sharing knowledge</strong>.
          Our articles cover <strong>JavaScript tips</strong>, <strong>AI security</strong>, <strong>ethical hacking</strong>,
          and practical <strong>how-to guides</strong> to help you level up as a developer.
        </p>
        <p class="mt-4 text-lg text-gray-300">
          Whether you’re exploring <strong>new coding techniques</strong>, looking for
          <strong>productivity hacks</strong>, or diving into <strong>real-world security challenges</strong>,
          the Articles section is designed to give you actionable insights you can use right away.
        </p>
      </div>
    </div>
  </div>


  <!-- Latest Articles -->
  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">Latest Articles & Tutorials</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" aria-label="Latest articles">
        <li v-for="article in latestArticles" :key="article.slug" class="rounded-lg bg-gray-800 p-6 shadow hover:shadow-md transition">
          <NuxtLink :to="`/articles/${article.slug}`" class="block" :aria-label="`Read ${article.title}`">
            <h3 class="text-xl font-semibold hover:text-indigo-400">{{ article.title }}</h3>
            <p class="text-gray-400 text-sm mt-2">{{ article.description }}</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="text-center mt-10">
        <NuxtLink to="/articles" class="bg-indigo-600 px-5 py-3 rounded hover:bg-indigo-500 text-white text-lg" aria-label="Explore articles and tutorials">
          Explore Articles
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Community Section -->
  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">
        Open Source, Performance-First, Community-Powered
      </h2>
      <div class="rounded-lg bg-gray-800 p-8 shadow hover:shadow-md transition">
        <p class="text-lg text-gray-300">
          CodeHelper is a collection of <strong>client-side, privacy-friendly developer tools</strong>.
           No accounts, no servers, just fast utilities that run in your browser. If you care about
          <strong>speed</strong>, <strong>accessibility</strong>, and <strong>sustainable engineering</strong>,
          you’re in the right place. Help us refine existing tools, suggest new ones, or improve docs and UX.
        </p>
        <p class="mt-4 text-lg text-gray-300">
          Start with a pull request or open an issue on
          <a href="https://github.com/Gian1984/codehelper" class="text-white hover:text-indigo-300 transition-colors" target="_blank" rel="noopener">
            GitHub
          </a>.
          Whether it’s adding a formatter, polishing a converter, fixing an edge case, or proposing a brand-new idea,
          your contributions make this <strong>privacy-first developer toolbox</strong> better for everyone.
        </p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { tools } from '~/utils/toolRegistry'
import { articles } from '~/utils/articlesRegistry'
import { useSeoMeta, useHead } from '#imports'

useSeoMeta({
  title: 'CodeHelper — Free Developer Tools (Format, Convert, Generate)',
  description: 'Instant, privacy-friendly tools for developers: JSON formatter, CSS minifier, unit converters, color utilities, image tooling, and more — all client-side.',
  ogTitle: 'CodeHelper — Free Developer Tools',
  ogDescription: 'Format, convert, generate, and optimize code in your browser. Fast, free, and open source.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogUrl: 'https://codehelper.me',
  ogSiteName: 'CodeHelper',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CodeHelper — Free Developer Tools',
  twitterDescription: 'Lightweight, client-side tools for busy developers. No sign-up. No tracking.',
  twitterImage: '/images/codehelper_OGIMAGE.webp',
  robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  author: 'CodeHelper',
  themeColor: '#111827',
  canonical: 'https://codehelper.me',
  keywords: 'developer tools, online code tools, json formatter, css minifier, regex tester, unit converter, color tools, open source'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://codehelper.me' }
  ],
  script: [
    {
      type: 'application/ld+json',
      id: 'ld-json-schema',
      innerHTML: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'CodeHelper',
          url: 'https://codehelper.me',
          description: 'Free, client-side developer tools to format, convert, generate, and optimize code.',
          image: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://codehelper.me/tools?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'CodeHelper',
          url: 'https://codehelper.me',
          logo: {
            '@type': 'ImageObject',
            url: 'https://codehelper.me/images/codehelper_logo_500_500_no_bg.webp'
          },
          sameAs: ['https://github.com/Gian1984/codehelper']
        },
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'CodeHelper — Free Developer Tools',
          url: 'https://codehelper.me',
          isPartOf: { '@type': 'WebSite', name: 'CodeHelper', url: 'https://codehelper.me' },
          about: ['Developer tools', 'Code formatting', 'CSS utilities', 'Image tools', 'Regex testing'],
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: Object.entries(tools).slice(0, 8).map(([slug, tool], i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://codehelper.me/tools/${slug}`,
              name: tool.title
            }))
          }
        }
      ])
    }
  ],
  meta: [
    { name: 'application-name', content: 'CodeHelper' }
  ]
})

useHead({
  __dangerouslyDisableSanitizersByTagID: {
    'ld-json-schema': ['innerHTML']
  }
} as any)

type ToolEntry = [string, typeof tools[string]]
const topTools = ref<ToolEntry[]>([])

onMounted(() => {
  const shuffled = Object.entries(tools)
      .map((tool) => ({ sort: Math.random(), value: tool }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

  topTools.value = shuffled.slice(0, 8)
})

const toolsByCategory = computed(() => {
  const grouped: Record<string, typeof tools[string][]> = {}
  for (const [slug, tool] of Object.entries(tools)) {
    const category = tool.category || 'Uncategorized'
    if (!grouped[category]) grouped[category] = []
    grouped[category].push(tool)
  }
  const sorted = Object.keys(grouped).sort()
  const ordered: Record<string, typeof tools[string][]> = {}
  for (const category of sorted) {
    ordered[category] = grouped[category]
  }
  return ordered
})

const latestArticles = computed(() => {
  // keep your existing logic; ensure article objects expose a date field if you want stable ordering
  return Object.entries(articles)
      .sort(([, a], [, b]) => new Date((b as any).date).getTime() - new Date((a as any).date).getTime())
      .slice(0, 6)
      .map(([slug, article]) => ({ slug, ...article }))
})
</script>
