<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Sidebar />

    <div class="xl:pl-72">
      <div class="p-8 min-h-screen">
        <h1 class="text-3xl font-bold mb-4">{{ toolData.title }}</h1>
        <p class="text-gray-400 mb-6">{{ toolData.description }}</p>
        <component :is="ToolComponent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { createError, useHead } from '#imports'
import { tools } from '~/utils/toolRegistry'
import Sidebar from '~/components/Sidebar.vue'

const route = useRoute()
const slug = route.params.slug as string
const toolData = tools[slug]

if (!toolData) {
  throw createError({ statusCode: 404, message: 'Tool not found' })
}

const ToolComponent = defineAsyncComponent(toolData.component)

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
      content: `https://codehelper.me/tools/${slug}`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://codehelper.me/tools/${slug}`
    }
  ],
  script: toolData.seo?.structuredData
      ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            ...toolData.seo.structuredData
          })
        } as any
      ]
      : []
})


</script>


