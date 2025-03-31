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
      <h1 class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">CodeHelper</h1>
      <p class="mt-6 text-lg font-medium text-gray-400 sm:text-xl">A modern toolbox for developers. Format, convert, generate, and optimize your work with simple, free tools for the web.</p>
    </div>
  </div>

  <div class="bg-gray-900 text-white px-6 pb-24 sm:pb-32 lg:px-8">
    <div class="mx-auto max-w-6xl pt-12">
      <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">Popular Tools</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <li v-for="([slug, tool], i) in topTools" :key="slug" class="rounded-lg bg-gray-800 p-4 shadow hover:shadow-md transition">
          <NuxtLink :to="`/tools/${slug}`" class="block">
            <h3 class="text-xl font-semibold">{{ tool.title }}</h3>
            <p class="text-gray-400 text-sm mt-1">{{ tool.description }}</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="text-center mt-10">
        <NuxtLink to="/tools" class="bg-indigo-600 px-5 py-3 rounded hover:bg-indigo-500 text-white text-lg">Explore All Tools</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tools } from '~/utils/toolRegistry'
import { useSeoMeta, useHead } from '#imports'

useSeoMeta({
  title: 'CodeHelper — Free Tools for Developers',
  description: 'Boost your workflow with modern web tools built for developers. Format, convert, minify and optimize code — all in one place.',
  ogTitle: 'CodeHelper — Free Tools for Developers',
  ogDescription: 'All-in-one web tools for developers. Format JSON, minify CSS, convert code, and more — fast and free.',
  ogImage: '/images/codehelper_logo.webp',
  ogUrl: 'https://codehelper.me',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CodeHelper — Free Tools for Developers',
  twitterDescription: 'A modern toolbox for coders: JSON formatter, CSS minifier, and more.',
  twitterImage: '/images/codehelper_logo.webp'
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
        image: 'https://codehelper.me/images/codehelper_logo.webp',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://codehelper.me/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})

const topTools = computed(() =>
    Object.entries(tools).slice(0, 8)
)
</script>

<style scoped>
</style>


