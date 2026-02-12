<template>
  <!-- contenitore più leggibile: riga max 72ch -->
  <div class="p-5 sm:p-8 min-h-screen mx-auto w-full max-w-[72ch]">
    <!-- Breadcrumb navigation -->
    <Breadcrumb
      :items="[
        { title: 'Home', url: '/' },
        { title: 'Games', url: '/games' },
        { title: gameData.title, url: `/games/${slug}/` }
      ]"
    />

    <h1 class="text-[26px] leading-[1.2] sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 [text-wrap:balance]">
      {{ gameData.title }}
    </h1>

    <p class="text-gray-400 mb-6 text-[15.5px] sm:text-base leading-7">
      {{ gameData.description }}
    </p>

    <!-- byline -->
    <div class="mt-2 mb-8 text-gray-400 text-xs sm:text-sm flex flex-wrap items-center gap-x-3 gap-y-1">
      <p v-if="publishedISO">
        📅
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

    <!-- Share buttons -->
    <div class="mb-8">
      <ShareButtons
        :url="`https://codehelper.me/games/${slug}/`"
        :title="gameData.title"
        :description="gameData.description"
        :hashtags="gameHashtags"
        type="game"
        variant="full"
      />
    </div>

    <component :is="GameComponent" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent, computed } from 'vue'
import { useHead, createError } from '#imports'
import Breadcrumb from '~/components/Breadcrumb.vue'
import DateBadge from '~/components/DateBadge.vue'
import ShareButtons from '~/components/ShareButtons.vue'
import { games } from '~/utils/gamesRegistry'
import { useBreadcrumb } from '~/composables/useBreadcrumb'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

// slug sanificato (evita () o altri char)
const route = useRoute()
const rawSlug = route.params.slug as string
const slug = rawSlug.toLowerCase().replace(/[^a-z0-9-]/g, '')

const gameData = games[slug]
if (!gameData) {
  throw createError({ statusCode: 404, message: 'Game not found' })
}

// carica il componente game
const GameComponent = defineAsyncComponent(gameData.component)

// Generate breadcrumb schema for SEO
const breadcrumbSchema = useBreadcrumb(
  gameData.title,
  `https://codehelper.me/games/${slug}/`,
  {
    parentTitle: 'Games',
    parentUrl: 'https://codehelper.me/games/'
  }
)

// structured data helper
const sd = (gameData.seo && gameData.seo.structuredData) || {}

// ISO pubblicazione (stringa o vuoto)
const publishedISO = computed<string | ''>(() =>
    (gameData as any).publishedAt || sd?.datePublished || ''
)

// autore
const authorName = computed<string | ''>(() => {
  const topAuthor = (gameData as any).author
  if (typeof topAuthor === 'string') return topAuthor
  if (topAuthor && typeof topAuthor === 'object' && topAuthor.name) return topAuthor.name
  if (sd?.author?.name) return sd.author.name
  return ''
})

const authorUrl = computed<string | ''>(() => {
  const topAuthor = (gameData as any).author
  if (topAuthor && typeof topAuthor === 'object' && topAuthor.url) return topAuthor.url
  if (sd?.author?.url) return sd.author.url
  if (Array.isArray(sd?.sameAs) && sd.sameAs.length) return sd.sameAs[0]
  return ''
})

// Generate hashtags for social sharing
const gameHashtags = computed<string[]>(() => {
  const tags: string[] = []

  // Add category as hashtag
  if (gameData.category) {
    tags.push(gameData.category)
  }

  // Extract first 2-3 keywords from SEO keywords
  if (gameData.seo?.keywords) {
    const keywords = gameData.seo.keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0 && k.length < 20)
      .slice(0, 2)
      .map(k => k.replace(/\s+/g, ''))

    tags.push(...keywords)
  }

  // Always add CodeHelper
  tags.push('CodeHelper')

  return tags
})

// SEO
useHead({
  title: gameData.seo?.title || `${gameData.title} – CodeHelper`,
  meta: [
    { name: 'description', content: gameData.seo?.description || gameData.description },
    { name: 'keywords', content: gameData.seo?.keywords || '' },
    { property: 'og:title', content: gameData.seo?.title || gameData.title },
    { property: 'og:description', content: gameData.seo?.description || gameData.description },
    { property: 'og:image', content: gameData.seo?.ogImage || '/images/codehelper_blog_OG.webp' },
    { property: 'og:url', content: `https://codehelper.me/games/${slug}/` },
    { property: 'og:type', content: 'website' },
    ...(publishedISO.value ? [{ property: 'article:published_time', content: publishedISO.value }] : []),
    ...(authorName.value ? [{ property: 'article:author', content: authorName.value }] : [])
  ],
  link: [{ rel: 'canonical', href: `https://codehelper.me/games/${slug}/` }],
  script: [
    // Existing game structured data
    ...(gameData.seo?.structuredData
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...gameData.seo.structuredData }) }]
      : []),
    // Breadcrumb structured data
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema)
    }
  ]
})

// tracking
if (process.client) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'game_view',
    page_title: gameData.seo?.title || gameData.title,
    page_type: 'game',
    game_title: gameData.title,
    game_slug: slug,
    game_category: gameData.category || 'general',
    game_published_at: publishedISO.value || null,
    game_author: authorName.value || null
  })

  if (typeof window.gtag === 'function') {
    window.gtag('config', 'GTM-5W8Q4TK9', {
      page_title: gameData.seo?.title || gameData.title,
      page_path: `/games/${slug}`,
      page_location: `https://codehelper.me/games/${slug}/`
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
