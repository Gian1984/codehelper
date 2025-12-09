<template>
  <div class="p-8 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Articles
        <span v-if="selectedCategory" class="text-indigo-400 text-2xl ml-2">
          /&nbsp;&nbsp;&nbsp;{{ capitalize(selectedCategory) }}
        </span>
      </h1>

      <NuxtLink
          v-if="selectedCategory"
          to="/articles"
          class="inline-block text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
      >
        Reset Filter
      </NuxtLink>
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <li
          v-for="[slug, article] in filteredArticles"
          :key="slug"
          class="rounded-lg bg-gray-800 border border-gray-700 p-4 hover:border-indigo-500 hover:shadow-lg transition"
      >
        <NuxtLink :to="`/articles/${slug}/`" class="block">
          <h2 class="text-xl font-semibold text-white">{{ article.title }}</h2>
          <p class="text-gray-400 text-sm mt-1">{{ article.description }}</p>
          <div class="mt-2 text-gray-500 text-xs">
            <p v-if="article.seo?.structuredData?.datePublished">📅 {{ formatDate(article.seo.structuredData.datePublished) }}</p>
            <p v-if="article.seo?.structuredData?.author?.name">✍️ {{ article.seo.structuredData.author.name }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { articles } from '~/utils/articlesRegistry'
import { useSeoMeta, useHead } from '#imports'
import { useRoute } from 'vue-router'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

// SEO Meta
useSeoMeta({
  title: 'CodeHelper — Articles for Developers',
  description: 'Read high-quality developer articles on performance, SEO, best practices, and modern frontend tooling.',
  ogTitle: 'CodeHelper — Articles for Developers',
  ogDescription: 'Browse articles written for developers. Learn about web performance, accessibility, SEO, and more.',
  ogImage: '/images/codehelper_blog_OG.webp',
  ogUrl: 'https://codehelper.me/articles',
  twitterCard: 'summary_large_image',
  twitterTitle: 'CodeHelper — Developer Articles',
  twitterDescription: 'Expert-written articles for frontend developers. Learn and grow with CodeHelper.',
  twitterImage: '/images/codehelper_blog_OG.webp'
})

// Structured Data
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'CodeHelper Articles',
        url: 'https://codehelper.me/articles',
        description: 'Helpful blog articles for modern frontend and fullstack developers.',
        image: 'https://codehelper.me/images/codehelper_blog_OG.webp',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://codehelper.me/articles?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})

const route = useRoute()
const selectedCategory = computed(() => route.query.category || null)

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const filteredArticles = computed(() => {
  const all = Object.entries(articles)

  // Se è filtrato per categoria
  const filtered = selectedCategory.value
      ? all.filter(([, article]) =>
          article.category?.toLowerCase() === selectedCategory.value?.toString().toLowerCase()
      )
      : all

  // Ordina per data di pubblicazione (decrescente)
  return filtered.sort(([, a], [, b]) => {
    const dateA = new Date(a.seo?.structuredData?.datePublished || 0).getTime()
    const dateB = new Date(b.seo?.structuredData?.datePublished || 0).getTime()
    return dateB - dateA
  })
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

