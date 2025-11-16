<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 mb-8" role="complementary" aria-label="Sidebar: resources">
    <div class="flex h-16 shrink-0 items-center">
      <span class="flex items-center gap-x-1 text-white font-semibold">
        Resources
        <BookmarkIcon class="size-5" aria-hidden="true" />
      </span>
    </div>

    <!-- Mark as navigation & SiteNavigationElement for crawlers -->
    <nav class="flex flex-1 flex-col space-y-6"
         role="navigation"
         aria-label="Sidebar navigation"
         itemscope
         itemtype="https://schema.org/SiteNavigationElement">

      <!-- Tools Section -->
      <div>
        <h2 class="text-gray-200 text-xs font-semibold uppercase tracking-wider mb-2">Tools</h2>
        <ul role="list" class="flex flex-col gap-y-2">
          <li v-for="category in sortedToolCategories" :key="'tool-' + category">
            <Disclosure v-slot="{ open }">
              <!-- Add aria-controls + id to link button with panel -->
              <DisclosureButton
                  class="flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold text-gray-200 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  :aria-controls="`tools-panel-${category}`"
                  :aria-expanded="open ? 'true' : 'false'"
                  :title="`Toggle ${category} tools`">
                <FolderIcon class="size-6 shrink-0" aria-hidden="true" />
                <span class="capitalize">{{ category }}</span>
                <ChevronRightIcon
                    :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-400', 'ml-auto size-5 shrink-0 transition-transform']"
                    aria-hidden="true" />
              </DisclosureButton>

              <DisclosurePanel :id="`tools-panel-${category}`">
                <ul role="list" class="ml-4 mt-2 space-y-1">
                  <li v-for="tool in categorizedTools[category]" :key="tool.slug">
                    <NuxtLink
                        :to="`/tools/${tool.slug}/`"
                        class="group flex gap-x-3 rounded-md p-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                        :title="`${tool.title} – open tool`"
                        itemprop="url"
                        :prefetch="true">
                      <span class="truncate">{{ tool.title }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </li>
        </ul>
      </div>

      <!-- Articles Section -->
      <div>
        <h2 class="text-gray-200 text-xs font-semibold uppercase tracking-wider mb-2">Articles</h2>
        <ul role="list" class="flex flex-col gap-y-2">
          <li v-for="category in sortedArticleCategories" :key="'article-' + category">
            <Disclosure v-slot="{ open }">
              <DisclosureButton
                  class="flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold text-gray-200 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  :aria-controls="`articles-panel-${category}`"
                  :aria-expanded="open ? 'true' : 'false'"
                  :title="`Toggle ${category} articles`">
                <FolderIcon class="size-6 shrink-0" aria-hidden="true" />
                <span class="capitalize">{{ category }}</span>
                <ChevronRightIcon
                    :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-400', 'ml-auto size-5 shrink-0 transition-transform']"
                    aria-hidden="true" />
              </DisclosureButton>

              <DisclosurePanel :id="`articles-panel-${category}`">
                <ul role="list" class="ml-4 mt-2 space-y-1">
                  <li v-for="article in categorizedArticles[category]" :key="article.slug">
                    <NuxtLink
                        :to="`/articles/${article.slug}/`"
                        class="group flex gap-x-3 rounded-md p-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                        :title="`${article.title} – read article`"
                        itemprop="url"
                        :prefetch="true">
                      <span class="truncate">{{ article.title }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </li>
        </ul>
      </div>

    </nav>
  </div>
</template>


<script setup lang="ts">
import { FolderIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { BookmarkIcon } from '@heroicons/vue/20/solid'
import { tools } from '~/utils/toolRegistry'
import { articles } from '~/utils/articlesRegistry'

// --- Tools by category
const categorizedTools = Object.entries(tools).reduce((acc, [slug, tool]) => {
  const category = tool.category || slug.split('-')[0] || 'other'
  if (!acc[category]) acc[category] = []
  acc[category].push({ ...tool, slug })
  return acc
}, {} as Record<string, any[]>)

for (const cat in categorizedTools) {
  categorizedTools[cat].sort((a, b) => a.title.localeCompare(b.title))
}

const sortedToolCategories = Object.keys(categorizedTools).sort()

// --- Articles by category
const categorizedArticles = Object.entries(articles).reduce((acc, [slug, article]) => {
  const category = article.category || 'general'
  if (!acc[category]) acc[category] = []
  acc[category].push({ ...article, slug })
  return acc
}, {} as Record<string, any[]>)

for (const cat in categorizedArticles) {
  categorizedArticles[cat].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime()
    const dateB = new Date(b.publishedAt).getTime()
    return dateB - dateA // Newest first
  })
}

const sortedArticleCategories = Object.keys(categorizedArticles).sort()
</script>


