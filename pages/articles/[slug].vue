<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Sidebar />

    <div class="xl:pl-72">
      <div class="p-8 min-h-screen">
        <h1 class="text-3xl font-bold mb-4">{{ articleData.title }}</h1>
        <p class="text-gray-400 mb-6">{{ articleData.description }}</p>
        <!-- Byline (same place) -->
        <div class="mt-2 mb-8 text-gray-500 text-xs">
          <p v-if="publishedISO">
            📅 <time :datetime="publishedISO">{{ formatDate(publishedISO) }}</time>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent, onMounted, computed } from 'vue'
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

// ---- Lightweight helpers / fallbacks (no structure changes)
const sd = (articleData.seo && articleData.seo.structuredData) || {}

const publishedISO = computed<string | ''>(() => {
  // Prefer top-level publishedAt if you add it later; otherwise use SD
  return (articleData as any).publishedAt || sd?.datePublished || ''
})

const authorName = computed<string | ''>(() => {
  const topAuthor = (articleData as any).author
  if (typeof topAuthor === 'string') return topAuthor
  if (topAuthor && typeof topAuthor === 'object' && topAuthor.name) return topAuthor.name
  if (sd?.author?.name) return sd.author.name
  return '' // no fallback text to avoid wrong attribution
})

const authorUrl = computed<string | ''>(() => {
  const topAuthor = (articleData as any).author
  if (topAuthor && typeof topAuthor === 'object' && topAuthor.url) return topAuthor.url
  if (sd?.author?.url) return sd.author.url
  // try sameAs array if present
  if (Array.isArray(sd?.sameAs) && sd.sameAs.length) return sd.sameAs[0]
  return ''
})

// Small, safe date formatter for display
function formatDate(iso: string) {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO Meta (unchanged structure; added conditional og tags when available)
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
    },
    ...(publishedISO.value ? [{ property: 'article:published_time', content: publishedISO.value }] : []),
    ...(authorName.value ? [{ property: 'article:author', content: authorName.value }] : [])
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

// Tracking (unchanged)
onMounted(() => {
  if (typeof window !== 'undefined') {
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