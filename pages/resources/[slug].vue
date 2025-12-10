<template>
  <div class="p-8 min-h-screen">
    <!-- 404 State -->
    <div v-if="!categoryMeta" class="text-center py-12">
      <h1 class="text-3xl font-semibold text-white mb-4">Category Not Found</h1>
      <p class="text-gray-400 mb-6">The resource category you're looking for doesn't exist.</p>
      <NuxtLink
        to="/resources"
        class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
      >
        ← Back to Resources
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
          {{ resources.length }} tools in this category
        </div>
      </div>

      <!-- Quick Guide -->
      <div class="mb-8 p-6 rounded-lg bg-gray-800/50 border border-gray-700">
        <h2 class="text-xl font-semibold text-white mb-4">Quick Guide</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-sm font-medium text-indigo-400 mb-3">Use CodeHelper's tools when you need:</h3>
            <ul class="text-sm text-gray-300 space-y-2">
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 mt-1">•</span>
                <span>Privacy & offline processing</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 mt-1">•</span>
                <span>No account or signup required</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-indigo-400 mt-1">•</span>
                <span>Fast, client-side operations</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-medium text-purple-400 mb-3">Use external tools when you need:</h3>
            <ul class="text-sm text-gray-300 space-y-2">
              <li class="flex items-start gap-2">
                <span class="text-purple-400 mt-1">•</span>
                <span>Team collaboration features</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-400 mt-1">•</span>
                <span>Cloud storage & synchronization</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-400 mt-1">•</span>
                <span>Extensive template libraries</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Search within category -->
      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search within this category..."
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <!-- Resources Grid -->
      <div v-if="filteredResources.length > 0" class="mb-8">
        <h2 class="text-2xl font-semibold text-white mb-4">
          {{ searchQuery ? `Search Results (${filteredResources.length})` : 'All Tools' }}
        </h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <li
            v-for="resource in filteredResources"
            :key="resource.href"
            class="rounded-lg bg-gray-800 border border-gray-700 p-5 hover:border-indigo-500 hover:shadow-lg transition"
          >
            <a
              :href="resource.href"
              target="_blank"
              rel="noopener noreferrer"
              class="block"
            >
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-semibold text-white">
                  {{ resource.name }}
                </h3>
                <svg class="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p class="text-gray-400 text-sm">{{ resource.desc }}</p>
            </a>
          </li>
        </ul>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-12">
        <p class="text-gray-400">No tools found matching "{{ searchQuery }}"</p>
      </div>

      <!-- You might be interested in -->
      <div v-if="relatedCategories.length > 0" class="mt-12">
        <h3 class="text-xl font-semibold text-white mb-4">You might be interested in</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink
            v-for="cat in relatedCategories"
            :key="cat.slug"
            :to="`/resources/${cat.slug}`"
            class="block p-4 rounded-lg bg-gray-800 border border-gray-700 hover:border-indigo-500 hover:shadow-lg transition"
          >
            <h4 class="text-white font-medium mb-1">{{ cat.title }}</h4>
            <p class="text-gray-400 text-sm">{{ cat.count }} tools</p>
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
  externalResources,
  resourceCategoryMeta,
  getResourcesByCategory,
  type ResourceCategory
} from '~/utils/externalRegistry'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

const route = useRoute()
const slug = route.params.slug as string

// Get category data
const categoryMeta = computed(() => resourceCategoryMeta[slug as ResourceCategory])
const resources = computed(() => getResourcesByCategory(slug as ResourceCategory))

// SEO Meta - Use registry SEO data if available
useSeoMeta({
  title: () => {
    if (!categoryMeta.value) return 'Category Not Found'
    return categoryMeta.value.seo?.title || `${categoryMeta.value.title} - External Resources - CodeHelper`
  },
  description: () => {
    if (!categoryMeta.value) return 'Category not found'
    return categoryMeta.value.seo?.description || `${categoryMeta.value.description}. Browse ${resources.value.length} curated tools and resources.`
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
  ogUrl: () => `https://codehelper.me/resources/${slug}`,
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
          url: `https://codehelper.me/resources/${slug}`,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: resources.value.length,
            itemListElement: resources.value.slice(0, 10).map((resource, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: resource.name,
              description: resource.desc,
              url: resource.href
            }))
          }
        })
      }
    }
  ],
  __dangerouslyDisableSanitizers: ['script']
} as any)

// Search within category
const searchQuery = ref('')

const filteredResources = computed(() => {
  if (!searchQuery.value) return resources.value

  const query = searchQuery.value.toLowerCase()
  return resources.value.filter(resource =>
    resource.name.toLowerCase().includes(query) ||
    resource.desc.toLowerCase().includes(query)
  )
})

// Related categories - intelligent grouping
const relatedCategories = computed(() => {
  // Group categories by type for smarter suggestions
  const categoryGroups: Record<string, ResourceCategory[]> = {
    design: ['colors', 'icons', 'fonts', 'logos', 'favicons', 'ui-graphics'],
    assets: ['stock-photos', 'stock-videos', 'vectors-clip', 'image-compression', 'image-mockups'],
    css: ['css-frameworks', 'css-animations', 'css-methodologies'],
    uiLibraries: ['react-ui-libraries', 'vue-ui-libraries', 'angular-ui-libraries', 'svelte-ui-libraries', 'react-native-ui-libraries'],
    components: ['ui-components', 'chart-libraries', 'animation-js-libraries'],
    designTools: ['design-systems', 'design-inspiration', 'design-software', 'online-design-tools'],
    devTools: ['chrome-extensions', 'icon-fonts'],
    templates: ['html-css-templates', 'sound-effects', 'others']
  }

  // Find which group the current category belongs to
  let currentGroup: ResourceCategory[] = []
  for (const group of Object.values(categoryGroups)) {
    if (group.includes(slug as ResourceCategory)) {
      currentGroup = group
      break
    }
  }

  // Get categories from the same group (excluding current)
  const sameGroupCategories = currentGroup.filter(cat => cat !== slug)

  // Get all other categories
  const otherCategories = Object.keys(resourceCategoryMeta)
    .filter(cat => !currentGroup.includes(cat as ResourceCategory) && cat !== slug) as ResourceCategory[]

  // Combine same group categories first, then others (deterministic for SSR)
  const combined = [...sameGroupCategories, ...otherCategories]

  // Take first 3
  return combined.slice(0, 3).map(catSlug => ({
    slug: catSlug,
    title: resourceCategoryMeta[catSlug].title,
    count: externalResources[catSlug]?.length || 0
  }))
})
</script>
