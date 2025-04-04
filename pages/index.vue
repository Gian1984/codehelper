<template>
  <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" class="absolute inset-0 -z-10 size-full object-cover" />
    <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
      <div class="aspect-1097/845 w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
      <div class="aspect-1097/845 w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-2xl text-center">
      <img
          class="aspect-square w-36 rounded-2xl mx-auto mb-4"
          src="/images/codehelper_logo_500_500_no_bg.webp"
          alt="Gianluca Tiengo"
      />
      <h1 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">CodeHelper</h1>
      <p class="mt-6 text-lg font-medium text-gray-400 sm:text-xl">A modern toolbox for developers. Format, convert, generate, and optimize your work with simple, free tools for the web and more.</p>
    </div>
  </div>


  <div class="bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12 ">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">
        A Simpler Tool Is Often the Best Tool
      </h2>
      <div class="rounded-lg bg-gray-800 p-8 shadow hover:shadow-md transition">
        <p class="text-lg text-gray-400">
          CodeHelper is built to promote mindful, efficient development. Using a dedicated tool for a specific task is not only faster and easier, it also uses <strong>far less energy</strong> than running an AI model or large framework just to pretty-print JSON, convert units, or generate a README.
        </p>
        <p class="mt-4 text-lg text-gray-400">
          This site is designed to be fast, lightweight, and sustainable — helping developers do more while consuming less. Make every click count — for your workflow and the planet.
        </p>
      </div>
    </div>
  </div>



  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">Popular</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <li v-for="([slug, tool], i) in topTools" :key="slug" class="rounded-lg bg-gray-800 p-4 shadow hover:shadow-md transition">
          <NuxtLink :to="`/tools/${slug}`" class="block">
            <h3 class="text-xl font-semibold hover:text-indigo-400">{{ tool.title }}</h3>
            <p class="text-gray-400 text-sm mt-1">{{ tool.description }}</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="text-center mt-10">
        <NuxtLink to="/tools" class="bg-indigo-600 px-5 py-3 rounded hover:bg-indigo-500 text-white text-lg">Explore all tools</NuxtLink>
      </div>
    </div>
  </div>


  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">Category</h2>

      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <li
            v-for="(toolsInCategory, category) in toolsByCategory"
            :key="category"
            class="rounded-lg bg-gray-800 p-6 shadow hover:shadow-md transition text-center"
        >
          <NuxtLink
              :to="`/tools?category=${category}`"
              class="block text-lg font-semibold capitalize text-white hover:text-indigo-400"
          >
            {{ category }}
          </NuxtLink>
          <p class="mt-2 text-gray-400 text-sm">{{ toolsInCategory.length }} tool{{ toolsInCategory.length > 1 ? 's' : '' }}</p>
        </li>
      </ul>
    </div>
  </div>


  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">
        For Everyone
      </h2>
      <div class="rounded-lg bg-gray-800 p-8 shadow hover:shadow-md transition">
        <p class="text-lg text-gray-400">
          CodeHelper is a free and open source project built to help developers solve everyday problems quickly and cleanly.
          Whether you want to improve a tool, add a new one, or simply explore how it works, you’re welcome to dive into the code.
        </p>
        <p class="mt-4 text-lg text-gray-400">
          Anyone can fork the project on <a href="https://github.com/Gian1984/codehelper" class="text-indigo-400 hover:underline" target="_blank" rel="noopener">GitHub</a> and contribute. Community-driven, developer-first, that's what makes CodeHelper better every day.
        </p>
      </div>
    </div>
  </div>



</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { tools } from '~/utils/toolRegistry'
import { useSeoMeta, useHead } from '#imports'

useSeoMeta({
  title: 'CodeHelper — Free Tools for Developers',
  description: 'Boost your workflow with modern web tools built for developers. Format, convert, minify and optimize code — all in one place.',
  ogTitle: 'CodeHelper — Free Tools for Developers',
  ogDescription: 'All-in-one web tools for developers. Format JSON, minify CSS, convert code, and more — fast and free.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogUrl: 'https://codehelper.me',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CodeHelper — Free Tools for Developers',
  twitterDescription: 'A modern toolbox for coders: JSON formatter, CSS minifier, and more.',
  twitterImage: '/images/codehelper_OGIMAGE.webp'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CodeHelper',
        url: 'https://codehelper.me',
        description: 'Boost your workflow with modern tools for web developers. Format, convert, and minify code — fast and free.',
        image: 'https://codehelper.me/codehelper_OGIMAGE.webp',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://codehelper.me/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})

// ✅ Moved random logic into client-only onMounted
const topTools = ref([])

onMounted(() => {
  const shuffled = Object.entries(tools)
      .map((tool) => ({ sort: Math.random(), value: tool }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

  topTools.value = shuffled.slice(0, 8)
})

// ✅ Categorized tools (not affected by SSR, can stay as computed)
const toolsByCategory = computed(() => {
  const grouped: Record<string, any[]> = {}

  for (const [slug, tool] of Object.entries(tools)) {
    const category = tool.category || 'Uncategorized'
    if (!grouped[category]) grouped[category] = []
    grouped[category].push(tool)
  }

  const sorted = Object.keys(grouped).sort()
  const ordered: Record<string, any[]> = {}

  for (const category of sorted) {
    ordered[category] = grouped[category]
  }

  return ordered
})



</script>

