<template>
  <div class="p-8 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl mb-3">
        External Resources
      </h1>
      <p class="text-gray-400 text-lg max-w-3xl">
        Curated collection of {{ totalCount }}+ free developer tools, libraries, and resources.
        Discover the best external tools to complement your workflow.
      </p>
    </div>

    <!-- Search Bar -->
    <div class="mb-8">
      <label for="search" class="block text-sm font-medium text-gray-300 mb-2">
        Search resources
      </label>
      <input
        id="search"
        v-model="searchQuery"
        type="search"
        placeholder="Search by name or description..."
        class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery && searchResults.length > 0" class="mb-8">
      <h2 class="text-xl font-semibold text-white mb-4">
        Search Results ({{ searchResults.length }})
      </h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <li
          v-for="resource in searchResults"
          :key="resource.href"
          class="rounded-lg bg-gray-800 border border-gray-700 p-4 hover:border-indigo-500 hover:shadow-lg transition"
        >
          <a
            :href="resource.href"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            <div class="flex items-start justify-between">
              <h3 class="text-lg font-semibold text-white">
                {{ resource.name }}
              </h3>
              <svg class="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p class="text-gray-400 text-sm mt-2">{{ resource.desc }}</p>
            <span class="inline-block mt-2 text-xs text-indigo-400 capitalize">
              {{ formatCategory(resource.category) }}
            </span>
          </a>
        </li>
      </ul>
    </div>

    <!-- No Results -->
    <div v-else-if="searchQuery && searchResults.length === 0" class="text-center py-12">
      <p class="text-gray-400">No resources found for "{{ searchQuery }}"</p>
    </div>

    <!-- Categories Grid -->
    <div v-else>
      <h2 class="text-2xl font-semibold text-white mb-6">Browse by Category</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(meta, category) in resourceCategoryMeta"
          :key="category"
          :to="`/resources/${category}`"
          class="block rounded-lg bg-gray-800 border border-gray-700 p-6 hover:border-indigo-500 hover:shadow-lg transition"
        >
          <h3 class="text-xl font-semibold text-white mb-2">{{ meta.title }}</h3>
          <p class="text-gray-400 text-sm mb-3">{{ meta.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-indigo-400 text-sm font-medium">
              {{ getCategoryCount(category as ResourceCategory) }} tools
            </span>
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- API Directory Link -->
      <div class="mt-12 p-8 rounded-lg bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/30">
        <h3 class="text-2xl font-semibold text-white mb-2">Looking for APIs?</h3>
        <p class="text-gray-300 mb-4">
          Browse our collection of 400+ public APIs for developers
        </p>
        <NuxtLink
          to="/resources/apis"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
        >
          Browse APIs
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeoMeta, useHead } from '#imports'
import {
  externalResources,
  resourceCategoryMeta,
  getTotalResourcesCount,
  searchResources,
  type ResourceCategory
} from '~/utils/externalRegistry'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

// SEO Meta
useSeoMeta({
  title: 'External Developer Resources - CodeHelper',
  description: 'Discover 800+ curated free developer tools, libraries, and resources. Browse by category: colors, icons, fonts, CSS frameworks, UI libraries, and more.',
  ogTitle: 'External Developer Resources - CodeHelper',
  ogDescription: 'Curated collection of 800+ free developer tools and resources for designers and developers.',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogUrl: 'https://codehelper.me/resources',
  twitterCard: 'summary_large_image',
  twitterTitle: 'External Developer Resources - CodeHelper',
  twitterDescription: '800+ curated free developer tools and resources',
  twitterImage: '/images/codehelper_OGIMAGE.webp'
})

// Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'External Developer Resources',
        description: 'Curated collection of free developer tools, libraries, and resources',
        url: 'https://codehelper.me/resources',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: getTotalResourcesCount(),
          itemListElement: Object.entries(resourceCategoryMeta).map(([category, meta], index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: meta.title,
            description: meta.description,
            url: `https://codehelper.me/resources/${category}`
          }))
        }
      })
    }
  ],
  __dangerouslyDisableSanitizers: ['script']
} as any)

// State
const searchQuery = ref('')
const totalCount = getTotalResourcesCount()

// Computed
const searchResults = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []
  return searchResources(searchQuery.value)
})

// Helpers
function getCategoryCount(category: ResourceCategory) {
  return externalResources[category]?.length || 0
}

function formatCategory(category: string) {
  return category.replace(/-/g, ' ')
}
</script>
