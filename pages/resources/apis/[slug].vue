<template>
  <div class="p-8 min-h-screen">
    <!-- 404 State -->
    <div v-if="!categoryMeta" class="text-center py-12">
      <h1 class="text-3xl font-semibold text-white mb-4">Category Not Found</h1>
      <p class="text-gray-400 mb-6">The API category you're looking for doesn't exist.</p>
      <NuxtLink
        to="/resources/apis"
        class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
      >
        ← Back to APIs
      </NuxtLink>
    </div>

    <!-- Category Content -->
    <div v-else>
      <!-- Breadcrumbs -->
      <nav class="mb-6 flex items-center text-sm text-gray-400">
        <NuxtLink to="/resources" class="hover:text-white transition">Resources</NuxtLink>
        <svg class="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <NuxtLink to="/resources/apis" class="hover:text-white transition">APIs</NuxtLink>
        <svg class="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-white">{{ categoryMeta.title }}</span>
      </nav>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl mb-3">
          {{ categoryMeta.title }}
        </h1>
        <p class="text-gray-400 text-lg">
          {{ categoryMeta.description }}
        </p>
        <div class="mt-3 text-sm text-gray-500">
          {{ apis.length }} APIs in this category
        </div>
      </div>

      <!-- Quick Filters -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="toggleFilter(filter.id)"
            :class="[
              'px-3 py-1.5 rounded-lg text-sm font-medium transition',
              activeFilters.includes(filter.id)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Search within category -->
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search within this category..."
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <!-- API Table -->
      <div v-if="filteredAPIs.length > 0" class="mb-8">
        <div class="mb-4 text-sm text-gray-400">
          Showing {{ filteredAPIs.length }} of {{ apis.length }} APIs
        </div>

        <!-- Mobile Cards (< md) -->
        <div class="md:hidden space-y-3">
          <div
            v-for="api in filteredAPIs"
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
                  HTTPS
                </span>
                <span :class="getCORSBadgeClass(api.cors)" class="px-2 py-1 rounded">
                  CORS: {{ api.cors }}
                </span>
              </div>
            </a>
          </div>
        </div>

        <!-- Desktop Table (≥ md) -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left py-3 px-4 text-gray-300 font-medium">API</th>
                <th class="text-left py-3 px-4 text-gray-300 font-medium">Description</th>
                <th class="text-center py-3 px-4 text-gray-300 font-medium">Auth</th>
                <th class="text-center py-3 px-4 text-gray-300 font-medium">HTTPS</th>
                <th class="text-center py-3 px-4 text-gray-300 font-medium">CORS</th>
                <th class="text-center py-3 px-4 text-gray-300 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="api in filteredAPIs"
                :key="api.href"
                class="border-b border-gray-800 hover:bg-gray-800/50 transition"
              >
                <td class="py-3 px-4">
                  <span class="font-medium text-white">{{ api.api }}</span>
                </td>
                <td class="py-3 px-4 text-gray-400">{{ api.desc }}</td>
                <td class="py-3 px-4 text-center">
                  <span :class="getAuthBadgeClass(api.auth)" class="px-2 py-1 rounded text-xs">
                    {{ api.auth }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="api.https === 'Yes' ? 'text-green-400' : 'text-red-400'">
                    {{ api.https === 'Yes' ? '✓' : '✗' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="getCORSClass(api.cors)">
                    {{ api.cors === 'Yes' ? '✓' : api.cors === 'No' ? '✗' : '?' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <a
                    :href="api.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-indigo-400 hover:text-indigo-300 transition"
                  >
                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-12">
        <p class="text-gray-400">No APIs found matching your criteria</p>
        <button
          @click="clearFilters"
          class="mt-4 text-indigo-400 hover:text-indigo-300 text-sm"
        >
          Clear filters
        </button>
      </div>

      <!-- You might be interested in -->
      <div v-if="relatedCategories.length > 0" class="mt-12">
        <h3 class="text-xl font-semibold text-white mb-4">You might be interested in</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink
            v-for="cat in relatedCategories"
            :key="cat.slug"
            :to="`/resources/apis/${cat.slug}`"
            class="block p-4 rounded-lg bg-gray-800 border border-gray-700 hover:border-indigo-500 hover:shadow-lg transition"
          >
            <h4 class="text-white font-medium mb-1">{{ cat.title }}</h4>
            <p class="text-gray-400 text-sm">{{ cat.count }} APIs</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta, useHead } from '#imports'
import {
  externalAPIs,
  apiCategoryMeta,
  getAPIsByCategory,
  type APICategory
} from '~/utils/apiRegistry'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

const route = useRoute()
const slug = route.params.slug as string

// Get category data
const categoryMeta = computed(() => apiCategoryMeta[slug as APICategory])
const apis = computed(() => getAPIsByCategory(slug as APICategory))

// SEO Meta - Use registry SEO data if available
useSeoMeta({
  title: () => {
    if (!categoryMeta.value) return 'Category Not Found'
    return categoryMeta.value.seo?.title || `${categoryMeta.value.title} - Public APIs - CodeHelper`
  },
  description: () => {
    if (!categoryMeta.value) return 'Category not found'
    return categoryMeta.value.seo?.description || `${categoryMeta.value.description}. Browse ${apis.value.length} curated public APIs.`
  },
  ogTitle: () => {
    if (!categoryMeta.value) return 'Category Not Found'
    return categoryMeta.value.seo?.title || `${categoryMeta.value.title} - CodeHelper`
  },
  ogDescription: () => {
    if (!categoryMeta.value) return 'Category not found'
    return categoryMeta.value.seo?.description || categoryMeta.value.description
  },
  ogImage: () => categoryMeta.value?.seo?.ogImage || '/images/codehelper_OGIMAGE.webp',
  ogUrl: () => `https://codehelper.me/resources/apis/${slug}`,
  twitterCard: 'summary_large_image',
  keywords: () => categoryMeta.value?.seo?.keywords
})

// Structured Data - Use registry structured data if available
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => {
        if (categoryMeta.value?.seo?.structuredData) {
          return JSON.stringify(categoryMeta.value.seo.structuredData)
        }
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: categoryMeta.value?.title,
          description: categoryMeta.value?.description,
          url: `https://codehelper.me/resources/apis/${slug}`,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: apis.value.length,
            itemListElement: apis.value.slice(0, 10).map((api, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: api.api,
              description: api.desc,
              url: api.href
            }))
          }
        })
      }
    }
  ],
  __dangerouslyDisableSanitizers: ['script']
} as any)

// State
const searchQuery = ref('')
const activeFilters = ref<string[]>([])

// Filters
const filters = [
  { id: 'no-auth', label: 'No Auth' },
  { id: 'https', label: 'HTTPS Only' },
  { id: 'cors', label: 'CORS Enabled' }
]

// Computed
const filteredAPIs = computed(() => {
  let results = [...apis.value]

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    results = results.filter(api =>
      api.api.toLowerCase().includes(query) ||
      api.desc.toLowerCase().includes(query)
    )
  }

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

// Related categories - intelligent grouping
const relatedCategories = computed(() => {
  // Group API categories by type for smarter suggestions
  const categoryGroups: Record<string, APICategory[]> = {
    developer: ['development', 'programming', 'continuous-integration', 'open-source'],
    security: ['auth', 'anti-malware', 'security', 'data-validation'],
    media: ['music', 'photography', 'art-design', 'anime'],
    dataFinance: ['finance', 'cryptocurrency', 'currency-exchange', 'open-data'],
    content: ['news', 'books', 'dictionaries', 'entertainment'],
    location: ['geocoding', 'government', 'events'],
    communication: ['email', 'phone', 'calendar'],
    business: ['business', 'jobs', 'productivity', 'cloud'],
    science: ['science-math', 'health', 'environment', 'patents'],
    fun: ['animals', 'games-comics', 'food-drink', 'personality']
  }

  // Find which group the current category belongs to
  let currentGroup: APICategory[] = []
  for (const group of Object.values(categoryGroups)) {
    if (group.includes(slug as APICategory)) {
      currentGroup = group
      break
    }
  }

  // Get categories from the same group (excluding current)
  const sameGroupCategories = currentGroup.filter(cat => cat !== slug)

  // Get all other categories
  const otherCategories = Object.keys(apiCategoryMeta)
    .filter(cat => !currentGroup.includes(cat as APICategory) && cat !== slug) as APICategory[]

  // Prioritize same group, then others (deterministic for SSR)
  const combined = [...sameGroupCategories, ...otherCategories]

  // Take first 3
  return combined.slice(0, 3).map(catSlug => ({
    slug: catSlug,
    title: apiCategoryMeta[catSlug].title,
    count: externalAPIs[catSlug]?.length || 0
  }))
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

function clearFilters() {
  activeFilters.value = []
  searchQuery.value = ''
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

function getCORSClass(cors: string) {
  if (cors === 'Yes') return 'text-green-400'
  if (cors === 'No') return 'text-red-400'
  return 'text-gray-400'
}
</script>
