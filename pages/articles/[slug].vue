<template>
  <!-- contenitore più leggibile: riga max 72ch -->
  <div class="p-5 sm:p-8 min-h-screen mx-auto w-full max-w-[72ch]">
    <!-- Breadcrumb navigation -->
    <Breadcrumb
      :items="[
        { title: 'Home', url: '/' },
        { title: 'Articles', url: '/articles' },
        { title: articleData.title, url: `/articles/${slug}/` }
      ]"
    />

    <h1 class="text-[26px] leading-[1.2] sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 [text-wrap:balance]">
      {{ articleData.title }}
    </h1>

    <p class="text-gray-400 mb-6 text-[15.5px] sm:text-base leading-7">
      {{ articleData.description }}
    </p>

    <!-- byline -->
    <div class="mt-2 mb-8 text-gray-400 text-xs sm:text-sm flex flex-wrap items-center gap-x-3 gap-y-1">
      <p v-if="publishedISO">
        📅
        <!-- usa il componente stabile SSR/CSR -->
        <DateBadge :iso="publishedISO" />
      </p>

      <p v-if="authorName">
        ✍️
        <a
            v-if="authorUrl"
            :href="authorUrl"
            target="_blank"
            rel="author noopener noreferrer"
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm"
        >
          {{ authorName }}
        </a>
        <span v-else>{{ authorName }}</span>
      </p>
    </div>

    <component :is="ArticleComponent" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent, computed } from 'vue'
import { useHead, createError } from '#imports'
import Breadcrumb from '~/components/Breadcrumb.vue'
import DateBadge from '~/components/DateBadge.vue'
import { articles } from '~/utils/articlesRegistry'
import { useBreadcrumb } from '~/composables/useBreadcrumb'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

// slug sanificato (evita () o altri char)
const route = useRoute()
const rawSlug = route.params.slug as string
const slug = rawSlug.toLowerCase().replace(/[^a-z0-9-]/g, '')

const articleData = articles[slug]
if (!articleData) {
  throw createError({ statusCode: 404, message: 'Article not found' })
}

// carica il componente articolo
const ArticleComponent = defineAsyncComponent(articleData.component)

// Generate breadcrumb schema for SEO
const breadcrumbSchema = useBreadcrumb(
  articleData.title,
  `https://codehelper.me/articles/${slug}/`,
  {
    parentTitle: 'Articles',
    parentUrl: 'https://codehelper.me/articles/'
  }
)

// structured data helper
const sd = (articleData.seo && articleData.seo.structuredData) || {}

// ISO pubblicazione (stringa o vuoto)
const publishedISO = computed<string | ''>(() =>
    (articleData as any).publishedAt || sd?.datePublished || ''
)

// autore
const authorName = computed<string | ''>(() => {
  const topAuthor = (articleData as any).author
  if (typeof topAuthor === 'string') return topAuthor
  if (topAuthor && typeof topAuthor === 'object' && topAuthor.name) return topAuthor.name
  if (sd?.author?.name) return sd.author.name
  return ''
})

const authorUrl = computed<string | ''>(() => {
  const topAuthor = (articleData as any).author
  if (topAuthor && typeof topAuthor === 'object' && topAuthor.url) return topAuthor.url
  if (sd?.author?.url) return sd.author.url
  if (Array.isArray(sd?.sameAs) && sd.sameAs.length) return sd.sameAs[0]
  return ''
})

// SEO
useHead({
  title: articleData.seo?.title || `${articleData.title} – CodeHelper`,
  meta: [
    { name: 'description', content: articleData.seo?.description || articleData.description },
    { name: 'keywords', content: articleData.seo?.keywords || '' },
    { property: 'og:title', content: articleData.seo?.title || articleData.title },
    { property: 'og:description', content: articleData.seo?.description || articleData.description },
    { property: 'og:image', content: articleData.seo?.ogImage || '/images/codehelper_blog_OG.webp' },
    { property: 'og:url', content: `https://codehelper.me/articles/${slug}/` },
    { property: 'og:type', content: 'article' },
    ...(publishedISO.value ? [{ property: 'article:published_time', content: publishedISO.value }] : []),
    ...(authorName.value ? [{ property: 'article:author', content: authorName.value }] : [])
  ],
  link: [{ rel: 'canonical', href: `https://codehelper.me/articles/${slug}/` }],
  script: [
    // Existing article structured data
    ...(articleData.seo?.structuredData
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...articleData.seo.structuredData }) }]
      : []),
    // Breadcrumb structured data
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema)
    }
  ]
})

// tracking (immutato)
if (process.client) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'article_view',
    page_title: articleData.seo?.title || articleData.title,
    page_type: 'article',
    article_title: articleData.title,
    article_slug: slug,
    article_category: articleData.category || 'general',
    article_published_at: publishedISO.value || null,
    article_author: authorName.value || null
  })

  if (typeof window.gtag === 'function') {
    window.gtag('config', 'GTM-5W8Q4TK9', {
      page_title: articleData.seo?.title || articleData.title,
      page_path: `/articles/${slug}`,
      page_location: `https://codehelper.me/articles/${slug}/`
    })
  }
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}
</script>
