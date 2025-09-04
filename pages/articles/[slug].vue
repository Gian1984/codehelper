<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Sidebar />

    <div class="xl:pl-72">
      <div class="p-8 min-h-screen">
        <h1 class="text-3xl font-bold mb-4">{{ articleData.title }}</h1>
        <p class="text-gray-400 mb-6">{{ articleData.description }}</p>
        <component :is="ArticleComponent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent, onMounted } from 'vue'
import { useHead, createError } from '#imports'
import Sidebar from '~/components/Sidebar.vue'
import { articles } from '~/utils/articlesRegistry'

const route = useRoute()
const slug = route.params.slug as string
const articleData = articles[slug]

// 404 if not found
if (!articleData) {
  throw createError({ statusCode: 404, message: 'Article not found' })
}

// Dynamically load the article component
const ArticleComponent = defineAsyncComponent(articleData.component)

// SEO Meta
useHead({
  title: articleData.seo?.title || `${articleData.title} – CodeHelper`,
  meta: [
    {
      name: 'description',
      content: articleData.seo?.description || articleData.description
    },
    {
      name: 'keywords',
      content: articleData.seo?.keywords || ''
    },
    {
      property: 'og:title',
      content: articleData.seo?.title || articleData.title
    },
    {
      property: 'og:description',
      content: articleData.seo?.description || articleData.description
    },
    {
      property: 'og:image',
      content: articleData.seo?.ogImage || '/images/codehelper_blog_OG.webp'
    },
    {
      property: 'og:url',
      content: `https://codehelper.me/articles/${slug}`
    },
    {
      property: 'og:type',
      content: 'article'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://codehelper.me/articles/${slug}`
    }
  ],
  script: articleData.seo?.structuredData
      ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            ...articleData.seo.structuredData
          })
        }
      ]
      : []
})

// Tracking
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'article_view',
      page_title: articleData.seo?.title || articleData.title,
      page_type: 'article',
      article_title: articleData.title,
      article_slug: slug,
      article_category: articleData.category || 'general'
    })

    if (typeof window.gtag === 'function') {
      window.gtag('config', 'GTM-5W8Q4TK9', {
        page_title: articleData.seo?.title || articleData.title,
        page_path: `/articles/${slug}`,
        page_location: `https://codehelper.me/articles/${slug}`
      })
    }
  }
})

// Global typing
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}
</script>
