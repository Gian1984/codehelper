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
          <div class="aspect-1108/632 w-[69.25rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-20" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
        </div>
        <div class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div class="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
            <img class="h-36" src="/images/codehelper_logo_500_500_no_bg.webp" alt="CodeHelper Logo" />
            <h1 class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">Tools & Articles for Developers</h1>
            <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Discover efficient tools and practical guides to boost your coding productivity fast, free, and in your browser.</p>
            <div class="mt-10 flex items-center gap-x-6">
              <NuxtLink to="/tools" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Get started</NuxtLink>
              <NuxtLink to="/about" class="text-sm/6 font-semibold text-white">Learn more <span aria-hidden="true">→</span></NuxtLink>
            </div>
          </div>
        </div>
      </div>


    <!-- Category list -->
    <div class="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
      <h2 class="text-base/7 font-semibold text-indigo-400 text-center">Browse by Category</h2>
      <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance text-center">
        Discover tools tailored to your workflow
      </p>
      <p class="mt-6 text-lg/8 text-gray-300 text-center">
        Quickly find the right tool for the job organized by category to boost your productivity.
      </p>
      <ul class="mx-auto mt-10 grid max-w-6xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
        <li
            v-for="([category, toolsInCategory], i) in toolsByCategory"
            :key="category"
            class="rounded-lg bg-gray-800 p-6 shadow hover:shadow-md transition text-center"
        >
          <NuxtLink
              :to="`/tools?category=${category}`"
              class="block text-lg font-semibold capitalize text-white hover:text-indigo-400"
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
          <h2 class="text-base/7 font-semibold text-indigo-400">Smart and powerful</h2>
          <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">Discover developer tools that save time</p>
          <p class="mt-6 text-lg/8 text-gray-300">Here are a few handpicked tools. Refresh the page to discover new ones!</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div  v-for="([slug, tool], i) in randomTools" :key="slug"class="flex flex-col">
              <dt class="text-base/7 font-semibold text-white">
                <div class="mb-6 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                  <span class="text-lg font-bold text-white">{{ i + 1 }}</span>
                </div>
                {{ tool.title }}
              </dt>
              <dd class="mt-1 flex flex-auto flex-col text-base/7 text-gray-300">
                <p class="flex-auto">{{ tool.description }}</p>
                <p class="mt-6">
                  <NuxtLink :to="`/tools/${slug}`" class="text-sm/6 font-semibold text-indigo-400">Try tool <span aria-hidden="true">→</span></NuxtLink>
                </p>
              </dd>
            </div>
          </dl>

          <!-- CTA buttons -->
          <div class="mt-20 flex items-center justify-center gap-x-6">
            <NuxtLink to="/tools" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</NuxtLink>
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
          Read in-depth guides, best practices, and tips to enhance your development workflow.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li v-for="([slug, article], i) in latestArticles" :key="slug" class="rounded-lg bg-gray-800 p-6 shadow hover:shadow-md transition">
            <NuxtLink :to="`/articles/${slug}`" class="block">
              <h3 class="text-xl font-semibold text-white hover:text-indigo-400">
                {{ article.title }}
              </h3>
              <p class="mt-2 text-gray-400 text-sm">
                {{ article.description }}
              </p>
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

// Define the Tool type
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

useSeoMeta({
  title: 'Projects – CodeHelper',
  description: 'Explore how CodeHelper empowers developers with modern tools to build, test, and deploy efficiently.',
  ogTitle: 'Projects – CodeHelper',
  ogDescription: 'Learn how developers use CodeHelper’s toolbox to streamline workflows and ship faster.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogUrl: 'https://codehelper.me/project',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Projects – CodeHelper',
  twitterDescription: 'Real-world applications powered by CodeHelper’s free developer tools.',
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
        name: 'CodeHelper Projects',
        url: 'https://codehelper.me/project',
        description: 'Discover practical examples of tools made with CodeHelper. Browse by category and get inspired.',
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

const latestArticles = computed<[string, Article][]>(() => {
  return Object.entries(articles).slice(0, 6)
})

onMounted(() => {
  const shuffled = Object.entries(tools).sort(() => 0.5 - Math.random())
  randomTools.value = shuffled.slice(0, 6)
})
</script>
