<template>
  <div class="p-8 min-h-screen">
    <!-- Breadcrumb navigation -->
    <Breadcrumb
      :items="[
        { title: 'Home', url: '/' },
        { title: 'Tools', url: '/tools' },
        { title: toolData.title, url: `/tools/${slug}` }
      ]"
    />

    <h1 class="text-3xl font-bold mb-4">{{ toolData.title }}</h1>
    <p class="text-gray-400 mb-6">{{ toolData.description }}</p>
    <component :is="ToolComponent" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent, onMounted } from 'vue'
import { useHead, createError } from '#imports'
import Breadcrumb from '~/components/Breadcrumb.vue'
import { tools } from '~/utils/toolRegistry'
import { useBreadcrumb } from '~/composables/useBreadcrumb'

// Use shared layout with sidebar
definePageMeta({
  layout: 'with-sidebar'
})

const route = useRoute()
const slug = route.params.slug as string
const toolData = tools[slug]

// 404 if component not found
if (!toolData) {
  throw createError({ statusCode: 404, message: 'Tool not found' })
}

// laod the tool component dynamically
const ToolComponent = defineAsyncComponent(toolData.component)

// Generate breadcrumb schema for SEO
const breadcrumbSchema = useBreadcrumb(
  toolData.title,
  `https://codehelper.me/tools/${slug}/`,
  {
    parentTitle: 'Tools',
    parentUrl: 'https://codehelper.me/tools/'
  }
)

// Meta / SEO
useHead({
  title: toolData.seo?.title || `${toolData.title} – CodeHelper`,
  meta: [
    {
      name: 'description',
      content: toolData.seo?.description || toolData.description
    },
    {
      name: 'keywords',
      content: toolData.seo?.keywords || ''
    },
    {
      property: 'og:title',
      content: toolData.seo?.title || toolData.title
    },
    {
      property: 'og:description',
      content: toolData.seo?.description || toolData.description
    },
    {
      property: 'og:image',
      content: toolData.seo?.ogImage || '/images/codehelper_logo.webp'
    },
    {
      property: 'og:url',
      content: `https://codehelper.me/tools/${slug}/`
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://codehelper.me/tools/${slug}/`
    }
  ],
  script: [
    // Existing tool structured data
    ...(toolData.seo?.structuredData
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              ...toolData.seo.structuredData
            })
          }
        ]
      : []),
    // Breadcrumb structured data
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema)
    }
  ]
})

// Tracking GTM + gtag
onMounted(() => {
  if (typeof window !== 'undefined') {
    // Invia al dataLayer
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'tool_view',
      page_title: toolData.seo?.title || toolData.title,
      page_type: 'tool',
      tool_name: toolData.title,
      tool_slug: slug,
      tool_category: toolData.category || 'general'
    })

    // Gtag if available
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'GTM-5W8Q4TK9', {
        page_title: toolData.seo?.title || toolData.title,
        page_path: `/tools/${slug}`,
        page_location: `https://codehelper.me/tools/${slug}/`
      })
    }
  }
})

// Typing global for secure access
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}
</script>



