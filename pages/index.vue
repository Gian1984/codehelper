<template>
  <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <NuxtImg
      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
      alt="Developers collaborating with laptops and code on screens"
      width="2830"
      height="1500"
      loading="eager"
      fetchpriority="high"
      class="absolute inset-0 -z-10 size-full object-cover"
    />

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
    <div class="mx-auto max-w-3xl text-center">
      <NuxtImg
        class="aspect-square w-36 rounded-2xl mx-auto mb-6"
        src="/images/codehelper_logo_500_500_no_bg.webp"
        alt="CodeHelper logo"
        width="500"
        height="500"
        loading="lazy"
        format="webp"
      />
      <h1 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
        CodeHelper
      </h1>
      <p class="mt-4 text-2xl font-medium text-indigo-400">
        Your Complete Developer Toolkit
      </p>
      <p class="mt-6 text-lg text-gray-300 sm:text-xl max-w-2xl mx-auto">
        <strong class="text-white">100+ privacy-first tools</strong>,
        <strong class="text-white">800+ curated resources</strong>, and
        <strong class="text-white">400+ public APIs</strong>.
        All fast, free, and built for developers who value their privacy.
      </p>

      <!-- Quick Stats -->
      <div class="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div class="rounded-lg bg-gray-800/80 backdrop-blur p-4">
          <div class="text-3xl font-bold text-indigo-400">{{ toolsCount }}+</div>
          <div class="text-sm text-gray-300 mt-1">Tools</div>
        </div>
        <div class="rounded-lg bg-gray-800/80 backdrop-blur p-4">
          <div class="text-3xl font-bold text-purple-400">{{ resourcesCount }}+</div>
          <div class="text-sm text-gray-300 mt-1">Resources</div>
        </div>
        <div class="rounded-lg bg-gray-800/80 backdrop-blur p-4">
          <div class="text-3xl font-bold text-pink-400">{{ apisCount }}+</div>
          <div class="text-sm text-gray-300 mt-1">APIs</div>
        </div>
      </div>
    </div>
  </div>

  <!-- What's Inside Section -->
  <div class="bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-12 text-center">
        Everything You Need in One Place
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- CodeHelper Tools -->
        <NuxtLink to="/tools" class="block rounded-lg bg-gradient-to-br from-indigo-900/30 to-indigo-800/20 border border-indigo-500/30 p-8 hover:border-indigo-500 hover:shadow-lg transition">
          <div class="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-white mb-3">CodeHelper Tools</h3>
          <p class="text-gray-300 mb-6">
            100+ privacy-first utilities that run entirely in your browser. Format, convert, generate, and optimize—no account required.
          </p>
          <ul class="text-sm text-gray-300 space-y-2 mb-6">
            <li class="flex items-start gap-2">
              <span class="text-indigo-400 mt-0.5">•</span>
              <span>Client-side processing only</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400 mt-0.5">•</span>
              <span>No data leaves your device</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-indigo-400 mt-0.5">•</span>
              <span>Lightning-fast performance</span>
            </li>
          </ul>
          <span class="inline-block text-indigo-400 font-medium text-sm">
            Browse Tools →
          </span>
        </NuxtLink>

        <!-- External Resources -->
        <NuxtLink to="/resources" class="block rounded-lg bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 p-8 hover:border-purple-500 hover:shadow-lg transition">
          <div class="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-white mb-3">External Resources</h3>
          <p class="text-gray-300 mb-6">
            800+ curated developer resources across 31 categories. Find the perfect tools for colors, icons, fonts, UI libraries, and more.
          </p>
          <ul class="text-sm text-gray-300 space-y-2 mb-6">
            <li class="flex items-start gap-2">
              <span class="text-purple-400 mt-0.5">•</span>
              <span>Hand-picked quality resources</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-400 mt-0.5">•</span>
              <span>Organized by category</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-purple-400 mt-0.5">•</span>
              <span>Free and open-source focused</span>
            </li>
          </ul>
          <span class="inline-block text-purple-400 font-medium text-sm">
            Browse Resources →
          </span>
        </NuxtLink>

        <!-- Public APIs -->
        <NuxtLink to="/resources/apis" class="block rounded-lg bg-gradient-to-br from-pink-900/30 to-pink-800/20 border border-pink-500/30 p-8 hover:border-pink-500 hover:shadow-lg transition">
          <div class="w-12 h-12 rounded-lg bg-pink-600 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-white mb-3">Public APIs</h3>
          <p class="text-gray-300 mb-6">
            400+ free public APIs across 40 categories. Filter by authentication, HTTPS support, and CORS availability.
          </p>
          <ul class="text-sm text-gray-300 space-y-2 mb-6">
            <li class="flex items-start gap-2">
              <span class="text-pink-400 mt-0.5">•</span>
              <span>Development, music, finance & more</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-pink-400 mt-0.5">•</span>
              <span>Advanced filtering options</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-pink-400 mt-0.5">•</span>
              <span>Detailed API specifications</span>
            </li>
          </ul>
          <span class="inline-block text-pink-400 font-medium text-sm">
            Browse APIs →
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Popular Tools -->
  <div class="bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Popular Developer Tools
        </h2>
        <NuxtLink to="/tools" class="text-indigo-400 hover:text-indigo-300 text-sm font-medium hidden sm:block">
          View all →
        </NuxtLink>
      </div>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" aria-label="Popular tools">
        <li v-for="([slug, tool]) in topTools" :key="slug" class="rounded-lg bg-gray-800 border border-gray-700 p-5 hover:border-indigo-500 hover:shadow-lg transition">
          <NuxtLink :to="`/tools/${slug}/`" class="block" :aria-label="`Open ${tool.title}`">
            <h3 class="text-xl font-semibold text-white">{{ tool.title }}</h3>
            <p class="text-gray-400 text-sm mt-2">{{ tool.description }}</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="text-center mt-10 sm:hidden">
        <NuxtLink to="/tools" class="bg-indigo-600 px-5 py-3 rounded-lg hover:bg-indigo-500 text-white font-medium inline-block" aria-label="Explore all developer tools">
          Explore all tools
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Featured Resources Preview -->
  <div class="bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Featured Resources
        </h2>
        <NuxtLink to="/resources" class="text-purple-400 hover:text-purple-300 text-sm font-medium hidden sm:block">
          View all →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <NuxtLink
          v-for="category in featuredResourceCategories"
          :key="category.slug"
          :to="`/resources/${category.slug}`"
          class="rounded-lg bg-gray-800 border border-gray-700 p-6 hover:border-purple-500 hover:shadow-lg transition"
        >
          <h3 class="text-xl font-semibold text-white mb-2">{{ category.title }}</h3>
          <p class="text-gray-400 text-sm mb-3">{{ category.description }}</p>
          <span class="text-purple-400 text-sm font-medium">{{ category.count }} resources</span>
        </NuxtLink>
      </div>
      <div class="text-center mt-10 sm:hidden">
        <NuxtLink to="/resources" class="bg-purple-600 px-5 py-3 rounded-lg hover:bg-purple-500 text-white font-medium inline-block">
          Explore all resources
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Latest Articles -->
  <div class="bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-2">
            Latest Articles & Tutorials
          </h2>
          <p class="text-gray-400">Insights, guides, and best practices for developers</p>
        </div>
        <NuxtLink to="/articles" class="text-indigo-400 hover:text-indigo-300 text-sm font-medium hidden sm:block">
          View all →
        </NuxtLink>
      </div>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" aria-label="Latest articles">
        <li v-for="article in latestArticles" :key="article.slug" class="rounded-lg bg-gray-800 border border-gray-700 p-6 hover:border-indigo-500 hover:shadow-lg transition">
          <NuxtLink :to="`/articles/${article.slug}/`" class="block" :aria-label="`Read ${article.title}`">
            <h3 class="text-xl font-semibold text-white mb-3">{{ article.title }}</h3>
            <p class="text-gray-400 text-sm">{{ article.description }}</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="text-center mt-10 sm:hidden">
        <NuxtLink to="/articles" class="bg-indigo-600 px-5 py-3 rounded-lg hover:bg-indigo-500 text-white font-medium inline-block" aria-label="Explore articles and tutorials">
          Explore Articles
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Philosophy & Community -->
  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Philosophy -->
        <div class="rounded-lg bg-gray-800 p-8 border border-gray-700">
          <h2 class="text-2xl font-semibold text-white mb-4">Privacy-First Philosophy</h2>
          <p class="text-gray-300 mb-4">
            CodeHelper is built around <strong class="text-white">client-side, privacy-friendly utilities</strong>
            that run directly in your browser. No accounts, no tracking, no data collection.
          </p>
          <p class="text-gray-300">
            Every tool processes your data locally, ensuring <strong class="text-white">complete privacy</strong>
            while delivering <strong class="text-white">instant results</strong>.
          </p>
        </div>

        <!-- Community -->
        <div class="rounded-lg bg-gray-800 p-8 border border-gray-700">
          <h2 class="text-2xl font-semibold text-white mb-4">Open Source & Community-Powered</h2>
          <p class="text-gray-300 mb-4">
            CodeHelper is <strong class="text-white">open source</strong> and welcomes contributions.
            Help us refine existing tools, suggest new ones, or improve documentation.
          </p>
          <p class="text-gray-300 mb-4">
            Start with a pull request or open an issue on{' '}
            <a href="https://github.com/Gian1984/codehelper" class="text-indigo-400 hover:text-indigo-300 transition-colors" target="_blank" rel="noopener">
              GitHub
            </a>.
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { tools } from '~/utils/toolRegistry'
import { articles } from '~/utils/articlesRegistry'
import { resourceCategoryMeta, externalResources, getTotalResourcesCount } from '~/utils/externalRegistry'
import { getTotalAPIsCount } from '~/utils/apiRegistry'
import { useSeoMeta, useHead } from '#imports'

useSeoMeta({
  title: 'CodeHelper — Free Developer Tools, Resources & APIs',
  description: '100+ privacy-first tools, 800+ curated resources, and 400+ public APIs. Format JSON, browse UI libraries, discover APIs—all fast, free, and built for developers.',
  ogTitle: 'CodeHelper — Complete Developer Toolkit',
  ogDescription: 'Privacy-first tools, curated resources, and public APIs directory. Everything developers need in one place.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogUrl: 'https://codehelper.me',
  ogSiteName: 'CodeHelper',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CodeHelper — Free Developer Tools, Resources & APIs',
  twitterDescription: '100+ tools, 800+ resources, 400+ APIs. All free, fast, and privacy-focused.',
  twitterImage: '/images/codehelper_OGIMAGE.webp',
  robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  author: 'CodeHelper',
  themeColor: '#111827',
  canonical: 'https://codehelper.me',
  keywords: 'developer tools, online code tools, json formatter, css minifier, ui libraries, public apis, free resources, open source'
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
          description: 'Free developer tools, curated resources, and public APIs directory',
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

// Stats
const toolsCount = computed(() => Object.keys(tools).length)
const resourcesCount = computed(() => getTotalResourcesCount())
const apisCount = computed(() => getTotalAPIsCount())

// Popular Tools
type ToolEntry = [string, typeof tools[string]]
const topTools = ref<ToolEntry[]>([])

onMounted(() => {
  const shuffled = Object.entries(tools)
      .map((tool) => ({ sort: Math.random(), value: tool }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

  topTools.value = shuffled.slice(0, 8)
})

// Featured Resource Categories
const featuredResourceCategories = computed(() => {
  const featured = ['colors', 'icons', 'react-ui-libraries', 'css-frameworks']
  return featured.map(slug => ({
    slug,
    title: resourceCategoryMeta[slug as keyof typeof resourceCategoryMeta].title,
    description: resourceCategoryMeta[slug as keyof typeof resourceCategoryMeta].description,
    count: externalResources[slug as keyof typeof externalResources]?.length || 0
  }))
})

// Latest Articles - sorted by datePublished
const latestArticles = computed(() => {
  return Object.entries(articles)
      .sort(([, a], [, b]) => {
        const dateA = (a as any).seo?.structuredData?.datePublished || '2025-01-01'
        const dateB = (b as any).seo?.structuredData?.datePublished || '2025-01-01'
        return new Date(dateB).getTime() - new Date(dateA).getTime()
      })
      .slice(0, 6)
      .map(([slug, article]) => ({ slug, ...article }))
})
</script>
