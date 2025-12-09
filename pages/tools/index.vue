<template>
  <div class="p-8 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Tools
        <span v-if="selectedCategory" class="text-indigo-400 text-2xl ml-2">
          /&nbsp;&nbsp;&nbsp;{{ capitalize(selectedCategory) }}
        </span>
      </h1>

      <NuxtLink
          v-if="selectedCategory"
          to="/tools"
          class="inline-block text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
      >
        Reset Filter
      </NuxtLink>
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <li
          v-for="[slug, tool] in filteredTools"
          :key="slug"
          class="rounded-lg bg-gray-800 border border-gray-700 p-4 hover:border-indigo-500 hover:shadow-lg transition"
      >
        <NuxtLink :to="`/tools/${slug}/`" class="block">
          <h2 class="text-xl font-semibold text-white">{{ tool.title }}</h2>
          <p class="text-gray-400 text-sm mt-1">{{ tool.description }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tools } from '~/utils/toolRegistry'
import { useSeoMeta, useHead } from '#imports'
import { useRoute } from 'vue-router'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

// SEO Meta
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
        image: 'https://codehelper.me/images/codehelper_OGIMAGE.webp',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://codehelper.me/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})

const route = useRoute()
const selectedCategory = computed(() => route.query.category || null)

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const filteredTools = computed(() => {
  if (!selectedCategory.value) return Object.entries(tools)

  return Object.entries(tools).filter(([, tool]) => {
    return tool.category?.toLowerCase() === selectedCategory.value?.toString().toLowerCase()
  })
})

const sortedTools = computed(() =>
    Object.entries(tools).sort(([, a], [, b]) => a.title.localeCompare(b.title))
)
</script>




