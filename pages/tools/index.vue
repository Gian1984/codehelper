<template>
  <div class=" bg-gray-900 text-white">
    <Sidebar />

    <div class="xl:pl-72">
      <div class="p-8 min-h-screen">
        <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl mb-6">Tools</h1>
        <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <li
              v-for="[slug, tool] in sortedTools"
              :key="slug"
              class="rounded-lg bg-gray-800 p-4 shadow hover:shadow-md transition"
          >
            <NuxtLink :to="`/tools/${slug}`" class="block">
              <h2 class="text-xl font-semibold">{{ tool.title }}</h2>
              <p class="text-gray-400 text-sm mt-1">{{ tool.description }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import { tools } from '~/utils/toolRegistry'
import { useSeoMeta, useHead } from '#imports'

// SEO Meta
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

// Structured Data
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

// Sorted tools
const sortedTools = computed(() =>
    Object.entries(tools).sort(([, a], [, b]) => a.title.localeCompare(b.title))
)
</script>



