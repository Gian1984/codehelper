<template>
  <div class="bg-gray-900">

    <!-- Hero section -->
    <div class="relative isolate overflow-hidden">
      <svg class="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
        <defs>
          <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
          <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
        </svg>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
      </svg>
      <div class="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]" aria-hidden="true">
        <div class="aspect-1108/632 w-[69.25rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-20" />
      </div>
      <div class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div class="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8 text-center lg:text-left">
          <NuxtImg
            class="h-36 mx-auto lg:mx-0"
            src="/images/codehelper_logo_500_500_no_bg.webp"
            alt="CodeHelper Logo"
            width="144"
            height="144"
            loading="lazy"
            format="webp"
          />
          <h1 class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
            The Complete Developer Toolkit
          </h1>
          <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            CodeHelper is an <strong class="text-white">open-source developer platform</strong>
            with 100+ privacy-first tools, 800+ curated resources, and 400+ public APIs.
            Everything runs in your browser — <strong class="text-white">fast, private, and free forever</strong>.
          </p>
          <div class="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
            <NuxtLink to="/tools" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
              Get started
            </NuxtLink>
            <NuxtLink to="/about" class="text-sm/6 font-semibold text-white">Learn more <span aria-hidden="true">→</span></NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            By the Numbers
          </h2>
          <p class="mt-4 text-lg text-gray-400">
            A comprehensive platform built for developers, by developers
          </p>
        </div>
        <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(stat, statIdx) in stats" :key="statIdx" class="rounded-lg bg-gray-800 border border-gray-700 p-8 text-center hover:shadow-lg transition">
            <dt class="text-sm text-gray-400 mb-3">{{ stat.label }}</dt>
            <dd class="text-4xl font-bold" :class="stat.color">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- What We Offer -->
    <div class="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 mb-12">
        <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Everything You Need in One Place
        </h2>
        <p class="mt-4 text-lg text-gray-400">
          Three powerful features working together to accelerate your development workflow
        </p>
      </div>
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Privacy-First Tools -->
        <NuxtLink to="/tools" class="block rounded-lg bg-gradient-to-br from-indigo-900/20 to-indigo-800/10 border border-indigo-500/30 p-8 hover:shadow-lg hover:border-indigo-500 transition">
          <h3 class="text-xl font-semibold text-white mb-4">Privacy-First Tools</h3>
          <p class="text-gray-300 mb-4">
            100+ developer utilities running entirely in your browser. Format code, convert data,
            generate content — all client-side with zero server uploads.
          </p>
          <ul class="space-y-2 text-sm text-gray-300 mb-6">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400 mt-1">•</span>
              <span>Code formatters & validators</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400 mt-1">•</span>
              <span>Data converters & generators</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400 mt-1">•</span>
              <span>Image & text utilities</span>
            </li>
          </ul>
          <span class="text-sm font-semibold text-indigo-400">
            Browse tools →
          </span>
        </NuxtLink>

        <!-- Curated Resources -->
        <NuxtLink to="/resources" class="block rounded-lg bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 p-8 hover:shadow-lg hover:border-purple-500 transition">
          <h3 class="text-xl font-semibold text-white mb-4">Curated Resources</h3>
          <p class="text-gray-300 mb-4">
            800+ hand-picked external tools and resources. Discover the best UI libraries,
            design tools, fonts, icons, and more — all organized by category.
          </p>
          <ul class="space-y-2 text-sm text-gray-300 mb-6">
            <li class="flex items-start gap-2">
              <span class="text-purple-400 mt-1">•</span>
              <span>UI libraries & frameworks</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-400 mt-1">•</span>
              <span>Design assets & tools</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-400 mt-1">•</span>
              <span>Developer utilities</span>
            </li>
          </ul>
          <span class="text-sm font-semibold text-purple-400">
            Explore resources →
          </span>
        </NuxtLink>

        <!-- Public APIs -->
        <NuxtLink to="/resources/apis" class="block rounded-lg bg-gradient-to-br from-pink-900/20 to-pink-800/10 border border-pink-500/30 p-8 hover:shadow-lg hover:border-pink-500 transition">
          <h3 class="text-xl font-semibold text-white mb-4">Public APIs Directory</h3>
          <p class="text-gray-300 mb-4">
            400+ public APIs across 40+ categories. Find APIs for weather, finance, AI, social media,
            and more — with filtering by auth type, HTTPS, and CORS support.
          </p>
          <ul class="space-y-2 text-sm text-gray-300 mb-6">
            <li class="flex items-start gap-2">
              <span class="text-pink-400 mt-1">•</span>
              <span>40+ categories</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-pink-400 mt-1">•</span>
              <span>Advanced filtering</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-pink-400 mt-1">•</span>
              <span>Direct documentation links</span>
            </li>
          </ul>
          <span class="text-sm font-semibold text-pink-400">
            Browse APIs →
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Category list -->
    <div class="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
      <h2 class="text-base/7 font-semibold text-indigo-400 text-center">Browse by Category</h2>
      <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl text-center">
        Discover tools tailored to your workflow
      </p>
      <p class="mt-6 text-lg/8 text-gray-300 text-center">
        Every tool is grouped by category, from <strong>code formatters</strong> to <strong>color utilities</strong>,
        so you can quickly find what you need without distractions.
      </p>
      <ul class="mx-auto mt-10 grid max-w-6xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
        <li
            v-for="([category, toolsInCategory], i) in toolsByCategory"
            :key="category"
            class="rounded-lg bg-gray-800 border border-gray-700 p-6 hover:border-indigo-500 hover:shadow-lg transition"
        >
          <NuxtLink
              :to="`/tools?category=${category}`"
              class="block text-lg font-semibold capitalize text-white"
          >
            {{ category }}
          </NuxtLink>
          <p class="mt-2 text-gray-400 text-sm">
            {{ toolsInCategory.length }} tool{{ toolsInCategory.length > 1 ? 's' : '' }}
          </p>
        </li>
      </ul>
    </div>

    <!-- Random tools -->
    <div class="mx-auto mt-32 pb-32 max-w-7xl px-6 sm:mt-56 sm:pb-56 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base/7 font-semibold text-indigo-400">Smart & Powerful</h2>
        <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Save time with the right tool</p>
        <p class="mt-6 text-lg/8 text-gray-300">
          Here are a few handpicked tools from the CodeHelper library.
          Refresh the page to discover new ones and expand your workflow inspiration.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div v-for="([slug, tool], i) in randomTools" :key="slug" class="flex flex-col">
            <dt class="text-base/7 font-semibold text-white">
              <div class="mb-6 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                <span class="text-lg font-bold text-white">{{ i + 1 }}</span>
              </div>
              {{ tool.title }}
            </dt>
            <dd class="mt-1 flex flex-auto flex-col text-base/7 text-gray-300">
              <p class="flex-auto">{{ tool.description }}</p>
              <p class="mt-6">
                <NuxtLink :to="`/tools/${slug}/`" class="text-sm/6 font-semibold text-indigo-400">Try tool <span aria-hidden="true">→</span></NuxtLink>
              </p>
            </dd>
          </div>
        </dl>
        <div class="mt-20 flex items-center justify-center gap-x-6">
          <NuxtLink to="/tools" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100">Get started</NuxtLink>
          <NuxtLink to="/about" class="text-sm/6 font-semibold text-white">Learn more <span aria-hidden="true">→</span></NuxtLink>
        </div>
      </div>
    </div>

    <!-- Articles Section -->
    <div class="mx-auto max-w-7xl px-6 pb-32 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base/7 font-semibold text-indigo-400">Knowledge Hub</h2>
        <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl text-center">
          Latest Articles & How-Tos
        </p>
        <p class="mt-6 text-lg/8 text-gray-300 text-center">
          Practical guides and in depth tutorials written by developers, for developers.
          Learn new techniques, best practices, and tips to supercharge your workflow.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li v-for="([slug, article], i) in latestArticles" :key="slug" class="rounded-lg bg-gray-800 border border-gray-700 p-6 hover:border-indigo-500 hover:shadow-lg transition">
            <NuxtLink :to="`/articles/${slug}/`" class="block">
              <h3 class="text-xl font-semibold text-white">
                {{ article.title }}
              </h3>
              <p class="mt-2 text-gray-400 text-sm">{{ article.description }}</p>
            </NuxtLink>
          </li>
        </ul>
        <div class="mt-20 flex items-center justify-center gap-x-6">
          <NuxtLink to="/articles" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100">
            Read all articles
          </NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSeoMeta, useHead } from '#imports'
import { tools } from '~/utils/toolRegistry'
import { articles } from '~/utils/articlesRegistry'
import { getTotalResourcesCount } from '~/utils/externalRegistry'
import { getTotalAPIsCount } from '~/utils/apiRegistry'

interface Tool {
  title: string
  description: string
  category?: string
}
interface Article {
  title: string
  description: string
  category?: string
}

// Real stats from registries
const stats = computed(() => [
  {
    label: 'Developer Tools',
    value: `${Object.keys(tools).length}+`,
    color: 'text-indigo-400'
  },
  {
    label: 'External Resources',
    value: `${getTotalResourcesCount()}+`,
    color: 'text-purple-400'
  },
  {
    label: 'Public APIs',
    value: `${getTotalAPIsCount()}+`,
    color: 'text-pink-400'
  },
  {
    label: 'Articles & Guides',
    value: `${Object.keys(articles).length}+`,
    color: 'text-indigo-400'
  }
])

useSeoMeta({
  title: 'CodeHelper Project — Complete Developer Platform with Tools, Resources & APIs',
  description: 'CodeHelper is an open-source developer platform with 100+ privacy-first tools, 800+ curated resources, and 400+ public APIs. Everything runs in your browser — fast, private, and free forever.',
  ogTitle: 'CodeHelper Project — Complete Developer Platform',
  ogDescription: 'Discover CodeHelper: 100+ tools, 800+ resources, 400+ APIs. Privacy-first, open-source, and built for developers.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogUrl: 'https://codehelper.me/project',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CodeHelper Project — Your Complete Developer Toolkit',
  twitterDescription: 'Privacy-first tools, curated resources, and public APIs — all in one open-source platform for developers.',
  twitterImage: '/images/codehelper_OGIMAGE.webp'
})

useHead({
  script: [
    {
      key: 'ld-json',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'CodeHelper Project',
        url: 'https://codehelper.me/project',
        description: 'CodeHelper is an open-source developer platform with 100+ privacy-first tools, 800+ curated resources, and 400+ public APIs. Everything runs in your browser — fast, private, and free forever.',
        image: 'https://codehelper.me/images/codehelper_OGIMAGE.webp'
      })
    }
  ],
  __dangerouslyDisableSanitizers: ['script']
})

const toolsByCategory = computed<[string, Tool[]][]>(() => {
  const grouped = new Map<string, Tool[]>()
  for (const [slug, tool] of Object.entries(tools)) {
    const category = tool.category || 'Uncategorized'
    if (!grouped.has(category)) grouped.set(category, [])
    grouped.get(category)!.push(tool)
  }
  return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))
})

const randomTools = ref<[string, Tool][]>([])

// Latest Articles - sorted by datePublished (newest first)
const latestArticles = computed<[string, Article][]>(() => {
  return Object.entries(articles)
    .sort(([, a], [, b]) => {
      const dateA = (a as any).seo?.structuredData?.datePublished || '2025-01-01'
      const dateB = (b as any).seo?.structuredData?.datePublished || '2025-01-01'
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
    .slice(0, 6)
})

onMounted(() => {
  const shuffled = Object.entries(tools).sort(() => 0.5 - Math.random())
  randomTools.value = shuffled.slice(0, 6)
})
</script>

