<template>
  <div class="p-8 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Games
        <span v-if="selectedCategory" class="text-indigo-400 text-2xl ml-2">
          /&nbsp;&nbsp;&nbsp;{{ capitalize(selectedCategory) }}
        </span>
      </h1>

      <NuxtLink
          v-if="selectedCategory"
          to="/games"
          class="inline-block text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
      >
        Reset Filter
      </NuxtLink>
    </div>

    <!-- Filtered view: show all games in selected category -->
    <ul v-if="selectedCategory" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <li
          v-for="[slug, game] in filteredGames"
          :key="slug"
          class="rounded-lg bg-gray-800 border border-gray-700 p-4 hover:border-indigo-500 hover:shadow-lg transition"
      >
        <NuxtLink :to="`/games/${slug}/`" class="block">
          <h2 class="text-xl font-semibold text-white">{{ game.title }}</h2>
          <p class="text-gray-400 text-sm mt-1">{{ game.description }}</p>
          <div class="mt-2 text-gray-500 text-xs">
            <p v-if="game.seo?.structuredData?.datePublished">{{ formatDate(game.seo.structuredData.datePublished) }}</p>
            <p v-if="game.seo?.structuredData?.author?.name">{{ game.seo.structuredData.author.name }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <!-- Default view: Latest games + Categories -->
    <template v-else>
      <!-- Latest Games Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-white mb-6">Latest Games</h2>
        <ul v-if="latestGames.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <li
              v-for="[slug, game] in latestGames"
              :key="slug"
              class="rounded-lg bg-gray-800 border border-gray-700 p-4 hover:border-indigo-500 hover:shadow-lg transition"
          >
            <NuxtLink :to="`/games/${slug}/`" class="block">
              <h3 class="text-xl font-semibold text-white">{{ game.title }}</h3>
              <p class="text-gray-400 text-sm mt-1">{{ game.description }}</p>
              <div class="mt-2 text-gray-500 text-xs">
                <p v-if="game.seo?.structuredData?.datePublished">{{ formatDate(game.seo.structuredData.datePublished) }}</p>
                <p v-if="game.seo?.structuredData?.author?.name">{{ game.seo.structuredData.author.name }}</p>
              </div>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="text-gray-400 text-sm">No games available yet. Check back soon!</p>
      </section>

      <!-- Browse by Category Section -->
      <section v-if="categories.length">
        <h2 class="text-2xl font-semibold text-white mb-6">Browse by Category</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <li
              v-for="cat in categories"
              :key="cat.name"
              class="rounded-lg bg-gray-800 border border-gray-700 p-4 hover:border-indigo-500 hover:shadow-lg transition"
          >
            <NuxtLink :to="`/games?category=${cat.name}`" class="block">
              <h3 class="text-lg font-semibold text-white">{{ capitalize(cat.name) }}</h3>
              <p class="text-gray-500 text-sm mt-1">{{ cat.count }} {{ cat.count === 1 ? 'game' : 'games' }}</p>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { games } from '~/utils/gamesRegistry'
import { useSeoMeta, useHead } from '#imports'
import { useRoute } from 'vue-router'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

// SEO Meta
useSeoMeta({
  title: 'CodeHelper — Games for Developers',
  description: 'Play browser-based games designed for developers. Have fun while sharpening your coding skills.',
  ogTitle: 'CodeHelper — Games for Developers',
  ogDescription: 'Browser-based games for developers. Learn and have fun with CodeHelper.',
  ogImage: '/images/codehelper_blog_OG.webp',
  ogUrl: 'https://codehelper.me/games',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CodeHelper — Developer Games',
  twitterDescription: 'Browser-based games for developers. Learn and have fun with CodeHelper.',
  twitterImage: '/images/codehelper_blog_OG.webp'
})

// Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CodeHelper Games',
        url: 'https://codehelper.me/games',
        description: 'Browser-based games for developers.',
        image: 'https://codehelper.me/images/codehelper_blog_OG.webp',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://codehelper.me/games?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})

const route = useRoute()
const selectedCategory = computed(() => route.query.category || null)

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

// All games sorted by date (newest first)
const sortedGames = computed(() => {
  return Object.entries(games).sort(([, a], [, b]) => {
    const dateA = new Date(a.seo?.structuredData?.datePublished || 0).getTime()
    const dateB = new Date(b.seo?.structuredData?.datePublished || 0).getTime()
    return dateB - dateA
  })
})

// Filtered games for category view
const filteredGames = computed(() => {
  if (!selectedCategory.value) return sortedGames.value

  return sortedGames.value.filter(([, game]) =>
      game.category?.toLowerCase() === selectedCategory.value?.toString().toLowerCase()
  )
})

// Latest 3 games for homepage view
const latestGames = computed(() => sortedGames.value.slice(0, 3))

// Extract unique categories with game count
const categories = computed(() => {
  const categoryMap = new Map<string, number>()

  for (const [, game] of Object.entries(games)) {
    const cat = game.category?.toLowerCase()
    if (cat) {
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1)
    }
  }

  return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
})

const formatDate = (dateStr: string): string => {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}
</script>
