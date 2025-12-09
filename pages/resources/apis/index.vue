<template>
  <div class="p-8 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl mb-3">
        Public APIs
      </h1>
      <p class="text-gray-400 text-lg max-w-3xl">
        Discover {{ totalCount }}+ free public APIs for developers. Browse by category, filter by auth type, HTTPS support, and CORS availability.
      </p>
    </div>

    <!-- Search & Filters -->
    <div class="mb-8 space-y-4">
      <!-- Search Bar -->
      <div>
        <label for="search" class="block text-sm font-medium text-gray-300 mb-2">
          Search APIs
        </label>
        <input
          id="search"
          v-model="searchQuery"
          type="search"
          placeholder="Search by API name or description..."
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <!-- Quick Filters -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="filter in quickFilters"
          :key="filter.id"
          @click="toggleFilter(filter.id)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition',
            activeFilters.includes(filter.id)
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery && searchResults.length > 0" class="mb-8">
      <h2 class="text-xl font-semibold text-white mb-4">
        Search Results ({{ searchResults.length }})
      </h2>
      <div class="space-y-3">
        <div
          v-for="api in searchResults"
          :key="api.href"
          class="rounded-lg bg-gray-800 border border-gray-700 p-4 hover:border-indigo-500 hover:shadow-lg transition"
        >
          <a
            :href="api.href"
            target="_blank"
            rel="noopener noreferrer"
            class="block"
          >
            <div class="flex items-start justify-between mb-2">
              <h3 class="text-lg font-semibold text-white">
                {{ api.api }}
              </h3>
              <svg class="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p class="text-gray-400 text-sm mb-3">{{ api.desc }}</p>
            <div class="flex flex-wrap gap-2 text-xs">
              <span :class="getAuthBadgeClass(api.auth)" class="px-2 py-1 rounded">
                Auth: {{ api.auth }}
              </span>
              <span :class="api.https === 'Yes' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'" class="px-2 py-1 rounded">
                HTTPS: {{ api.https }}
              </span>
              <span :class="getCORSBadgeClass(api.cors)" class="px-2 py-1 rounded">
                CORS: {{ api.cors }}
              </span>
              <span class="px-2 py-1 rounded bg-gray-700 text-gray-300 capitalize">
                {{ formatCategory(api.category) }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="searchQuery && searchResults.length === 0" class="text-center py-12">
      <p class="text-gray-400">No APIs found for "{{ searchQuery }}"</p>
    </div>

    <!-- Categories Grid -->
    <div v-else>
      <h2 class="text-2xl font-semibold text-white mb-6">Browse by Category</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(meta, category) in apiCategoryMeta"
          :key="category"
          :to="`/resources/apis/${category}`"
          class="block rounded-lg bg-gray-800 border border-gray-700 p-6 hover:border-indigo-500 hover:shadow-lg transition"
        >
          <h3 class="text-xl font-semibold text-white mb-2">{{ meta.title }}</h3>
          <p class="text-gray-400 text-sm mb-3">{{ meta.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-indigo-400 text-sm font-medium">
              {{ getCategoryCount(category as APICategory) }} APIs
            </span>
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- Resources Link -->
      <div class="mt-12 p-8 rounded-lg bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30">
        <h3 class="text-2xl font-semibold text-white mb-2">Looking for Developer Tools?</h3>
        <p class="text-gray-300 mb-4">
          Browse our collection of 800+ external developer resources and tools
        </p>
        <NuxtLink
          to="/resources"
          class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
        >
          Browse Resources
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
  externalAPIs,
  apiCategoryMeta,
  getTotalAPIsCount,
  searchAPIs,
  type APICategory
} from '~/utils/apiRegistry'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

// SEO Meta
useSeoMeta({
  title: 'Public APIs Directory - CodeHelper',
  description: 'Discover 400+ free public APIs for developers. Browse by category, filter by auth type, HTTPS support, and CORS availability.',
  ogTitle: 'Public APIs Directory - CodeHelper',
  ogDescription: 'Curated collection of 400+ free public APIs for developers across 40 categories',
  ogImage: '/images/codehelper_OGIMAGE.webp',
  ogUrl: 'https://codehelper.me/resources/apis',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Public APIs Directory - CodeHelper',
  twitterDescription: '400+ free public APIs for developers',
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
        name: 'Public APIs Directory',
        description: 'Curated collection of free public APIs for developers',
        url: 'https://codehelper.me/resources/apis',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: getTotalAPIsCount(),
          itemListElement: Object.entries(apiCategoryMeta).map(([category, meta], index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: meta.title,
            description: meta.description,
            url: `https://codehelper.me/resources/apis/${category}`
          }))
        }
      })
    }
  ],
  __dangerouslyDisableSanitizers: ['script']
} as any)

// State
const searchQuery = ref('')
const activeFilters = ref<string[]>([])
const totalCount = getTotalAPIsCount()

// Quick Filters
const quickFilters = [
  { id: 'no-auth', label: 'No Auth Required' },
  { id: 'https', label: 'HTTPS Only' },
  { id: 'cors', label: 'CORS Enabled' },
  { id: 'free', label: 'Free' }
]

// Computed
const searchResults = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []

  let results = searchAPIs(searchQuery.value)

  // Apply filters
  if (activeFilters.value.includes('no-auth')) {
    results = results.filter(api => api.auth === 'No')
  }
  if (activeFilters.value.includes('https')) {
    results = results.filter(api => api.https === 'Yes')
  }
  if (activeFilters.value.includes('cors')) {
    results = results.filter(api => api.cors === 'Yes')
  }

  return results
})

// Methods
function toggleFilter(filterId: string) {
  const index = activeFilters.value.indexOf(filterId)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(filterId)
  }
}

function getCategoryCount(category: APICategory) {
  return externalAPIs[category]?.length || 0
}

function formatCategory(category: string) {
  return category.replace(/-/g, ' ')
}

function getAuthBadgeClass(auth: string) {
  if (auth === 'No') return 'bg-green-900/30 text-green-400'
  if (auth === 'apiKey') return 'bg-blue-900/30 text-blue-400'
  if (auth === 'OAuth') return 'bg-orange-900/30 text-orange-400'
  return 'bg-gray-700 text-gray-300'
}

function getCORSBadgeClass(cors: string) {
  if (cors === 'Yes') return 'bg-green-900/30 text-green-400'
  if (cors === 'No') return 'bg-red-900/30 text-red-400'
  return 'bg-gray-700 text-gray-300'
}
</script>
