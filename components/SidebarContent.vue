<template>
  <div
    ref="scrollContainer"
    class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 mb-8"
    role="complementary"
    aria-label="Sidebar: resources"
    @scroll="handleScroll">
    <div class="flex h-16 shrink-0 items-center">
      <NuxtLink
        :to="sectionLink"
        class="flex items-center gap-x-1 text-white font-semibold hover:text-indigo-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md px-2 py-1 -ml-2"
        :title="`Go to ${sectionTitle}`"
      >
        {{ sectionTitle }}
        <component :is="sectionIcon" class="size-5 transition-colors" aria-hidden="true" />
      </NuxtLink>
    </div>

    <!-- Search Input -->
    <div class="px-2">
      <div class="relative">
        <input
          ref="searchInputRef"
          type="text"
          :value="searchQuery"
          @input="setSearchQuery(($event.target as HTMLInputElement).value)"
          placeholder="Search tools, articles & games..."
          class="w-full rounded-md bg-gray-800 border-2 border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          aria-label="Search tools, articles and games"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          aria-label="Clear search"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <kbd v-if="!searchQuery" class="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-500 bg-gray-700 rounded border border-gray-600">⌘K</kbd>
      </div>
    </div>

    <!-- No results message -->
    <div v-if="searchQuery && !hasSearchResults" class="px-4 py-3 text-sm text-gray-400 text-center">
      No results found for "<span class="text-white font-semibold">{{ searchQuery }}</span>"
    </div>

    <!-- Mark as navigation & SiteNavigationElement for crawlers -->
    <nav class="flex flex-1 flex-col space-y-6"
         role="navigation"
         aria-label="Sidebar navigation"
         itemscope
         itemtype="https://schema.org/SiteNavigationElement">

      <!-- Tools Section -->
      <div v-if="(currentSection === 'tools' || currentSection === 'all') && filteredToolCategories.length > 0">
        <h2 v-if="currentSection === 'all'" class="text-gray-200 text-xs font-semibold uppercase tracking-wider mb-2">Tools</h2>
        <ul role="list" class="flex flex-col gap-y-2">
          <li v-for="category in filteredToolCategories" :key="'tool-' + category">
            <Disclosure v-slot="{ open }" :defaultOpen="isCategoryOpen(`tool-${category}`) || !!searchQuery">
              <!-- Add aria-controls + id to link button with panel -->
              <DisclosureButton
                  class="flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold text-gray-200 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  :aria-controls="`tools-panel-${category}`"
                  :aria-expanded="open ? 'true' : 'false'"
                  :title="`Toggle ${category} tools`"
                  @click="toggleCategory(`tool-${category}`)">
                <FolderIcon class="size-6 shrink-0" aria-hidden="true" />
                <span class="capitalize">{{ category }}</span>
                <ChevronRightIcon
                    :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-400', 'ml-auto size-5 shrink-0 transition-transform']"
                    aria-hidden="true" />
              </DisclosureButton>

              <DisclosurePanel :id="`tools-panel-${category}`">
                <ul role="list" class="ml-4 mt-2 space-y-1">
                  <li v-for="tool in filteredTools[category]" :key="tool.slug">
                    <NuxtLink
                        :to="`/tools/${tool.slug}/`"
                        :class="[
                          'group flex gap-x-3 rounded-md p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-colors',
                          currentPath === `/tools/${tool.slug}/` || currentPath === `/tools/${tool.slug}`
                            ? 'bg-indigo-500/20 text-indigo-400 font-semibold border-l-2 border-indigo-500'
                            : 'text-gray-200 hover:bg-gray-800 hover:text-white'
                        ]"
                        :title="`${tool.title} – open tool`"
                        itemprop="url"
                        :prefetch="true"
                        @click="handleLinkClick">
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
      <div v-if="(currentSection === 'articles' || currentSection === 'all') && filteredArticleCategories.length > 0">
        <h2 v-if="currentSection === 'all'" class="text-gray-200 text-xs font-semibold uppercase tracking-wider mb-2">Articles</h2>
        <ul role="list" class="flex flex-col gap-y-2">
          <li v-for="category in filteredArticleCategories" :key="'article-' + category">
            <Disclosure v-slot="{ open }" :defaultOpen="isCategoryOpen(`article-${category}`) || !!searchQuery">
              <DisclosureButton
                  class="flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold text-gray-200 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  :aria-controls="`articles-panel-${category}`"
                  :aria-expanded="open ? 'true' : 'false'"
                  :title="`Toggle ${category} articles`"
                  @click="toggleCategory(`article-${category}`)">
                <FolderIcon class="size-6 shrink-0" aria-hidden="true" />
                <span class="capitalize">{{ category }}</span>
                <ChevronRightIcon
                    :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-400', 'ml-auto size-5 shrink-0 transition-transform']"
                    aria-hidden="true" />
              </DisclosureButton>

              <DisclosurePanel :id="`articles-panel-${category}`">
                <ul role="list" class="ml-4 mt-2 space-y-1">
                  <li v-for="article in filteredArticles[category]" :key="article.slug">
                    <NuxtLink
                        :to="`/articles/${article.slug}/`"
                        :class="[
                          'group flex gap-x-3 rounded-md p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-colors',
                          currentPath === `/articles/${article.slug}/` || currentPath === `/articles/${article.slug}`
                            ? 'bg-indigo-500/20 text-indigo-400 font-semibold border-l-2 border-indigo-500'
                            : 'text-gray-200 hover:bg-gray-800 hover:text-white'
                        ]"
                        :title="`${article.title} – read article`"
                        itemprop="url"
                        :prefetch="true"
                        @click="handleLinkClick">
                      <span class="truncate">{{ article.title }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </li>
        </ul>
      </div>

      <!-- Games Section -->
      <div v-if="(currentSection === 'games' || currentSection === 'all') && filteredGameCategories.length > 0">
        <h2 v-if="currentSection === 'all'" class="text-gray-200 text-xs font-semibold uppercase tracking-wider mb-2">Games</h2>
        <ul role="list" class="flex flex-col gap-y-2">
          <li v-for="category in filteredGameCategories" :key="'game-' + category">
            <Disclosure v-slot="{ open }" :defaultOpen="isCategoryOpen(`game-${category}`) || !!searchQuery">
              <DisclosureButton
                  class="flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold text-gray-200 hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  :aria-controls="`games-panel-${category}`"
                  :aria-expanded="open ? 'true' : 'false'"
                  :title="`Toggle ${category} games`"
                  @click="toggleCategory(`game-${category}`)">
                <FolderIcon class="size-6 shrink-0" aria-hidden="true" />
                <span class="capitalize">{{ category }}</span>
                <ChevronRightIcon
                    :class="[open ? 'rotate-90 text-gray-400' : 'text-gray-400', 'ml-auto size-5 shrink-0 transition-transform']"
                    aria-hidden="true" />
              </DisclosureButton>

              <DisclosurePanel :id="`games-panel-${category}`">
                <ul role="list" class="ml-4 mt-2 space-y-1">
                  <li v-for="game in filteredGames[category]" :key="game.slug">
                    <NuxtLink
                        :to="`/games/${game.slug}/`"
                        :class="[
                          'group flex gap-x-3 rounded-md p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 transition-colors',
                          currentPath === `/games/${game.slug}/` || currentPath === `/games/${game.slug}`
                            ? 'bg-indigo-500/20 text-indigo-400 font-semibold border-l-2 border-indigo-500'
                            : 'text-gray-200 hover:bg-gray-800 hover:text-white'
                        ]"
                        :title="`${game.title} – play game`"
                        itemprop="url"
                        :prefetch="true"
                        @click="handleLinkClick">
                      <span class="truncate">{{ game.title }}</span>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { FolderIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { WrenchScrewdriverIcon, NewspaperIcon, LinkIcon, PuzzlePieceIcon } from '@heroicons/vue/24/outline'
import { tools } from '~/utils/toolRegistry'
import { articles } from '~/utils/articlesRegistry'
import { games } from '~/utils/gamesRegistry'

const route = useRoute()
const {
  toggleCategory,
  isCategoryOpen,
  saveScrollPosition,
  restoreScrollPosition,
  searchQuery,
  setSearchQuery,
  clearSearch,
  isOpen,
  isDesktopCollapsed,
  close
} = useSidebarState()

// Auto-close sidebar on link click (mobile or desktop when collapsed)
const handleLinkClick = () => {
  // Check if we're on mobile viewport or desktop collapsed
  if (typeof window !== 'undefined') {
    const isDesktop = window.innerWidth >= 1280 // xl breakpoint

    // Close if: mobile OR (desktop AND collapsed)
    if (!isDesktop || (isDesktop && isDesktopCollapsed.value)) {
      close()
    }
  }
}

// Get current route path for active link highlighting
const currentPath = computed(() => route.path)

// Determine current section (tools or articles) based on route
const currentSection = computed(() => {
  if (currentPath.value.startsWith('/tools')) return 'tools'
  if (currentPath.value.startsWith('/articles')) return 'articles'
  if (currentPath.value.startsWith('/games')) return 'games'
  return 'all'
})

// Section title based on context
const sectionTitle = computed(() => {
  if (currentSection.value === 'tools') return 'Tools'
  if (currentSection.value === 'articles') return 'Articles'
  if (currentSection.value === 'games') return 'Games'
  return 'Resources'
})

// Section icon based on context
const sectionIcon = computed(() => {
  if (currentSection.value === 'tools') return WrenchScrewdriverIcon
  if (currentSection.value === 'articles') return NewspaperIcon
  if (currentSection.value === 'games') return PuzzlePieceIcon
  return LinkIcon // default - represents external resources
})

// Section link based on context
const sectionLink = computed(() => {
  if (currentSection.value === 'tools') return '/tools'
  if (currentSection.value === 'articles') return '/articles'
  if (currentSection.value === 'games') return '/games'
  return '/resources' // default to resources page
})

// Search input ref for focus management
const searchInputRef = ref<HTMLInputElement | null>(null)

// --- Tools by category (memoized for performance)
const categorizedTools = computed(() => {
  const result = Object.entries(tools).reduce((acc, [slug, tool]) => {
    const category = tool.category || slug.split('-')[0] || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push({ ...tool, slug })
    return acc
  }, {} as Record<string, any[]>)

  // Sort tools within each category
  for (const cat in result) {
    result[cat].sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

const sortedToolCategories = computed(() => Object.keys(categorizedTools.value).sort())

// --- Articles by category (memoized for performance)
const categorizedArticles = computed(() => {
  const result = Object.entries(articles).reduce((acc, [slug, article]) => {
    const category = article.category || 'general'
    if (!acc[category]) acc[category] = []
    acc[category].push({ ...article, slug })
    return acc
  }, {} as Record<string, any[]>)

  // Sort articles by date within each category
  for (const cat in result) {
    result[cat].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime()
      const dateB = new Date(b.publishedAt).getTime()
      return dateB - dateA // Newest first
    })
  }

  return result
})

const sortedArticleCategories = computed(() => Object.keys(categorizedArticles.value).sort())

// --- Games by category (memoized for performance)
const categorizedGames = computed(() => {
  const result = Object.entries(games).reduce((acc, [slug, game]) => {
    const category = game.category || 'general'
    if (!acc[category]) acc[category] = []
    acc[category].push({ ...game, slug })
    return acc
  }, {} as Record<string, any[]>)

  // Sort games by date within each category
  for (const cat in result) {
    result[cat].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime()
      const dateB = new Date(b.publishedAt).getTime()
      return dateB - dateA // Newest first
    })
  }

  return result
})

const sortedGameCategories = computed(() => Object.keys(categorizedGames.value).sort())

// --- Search filtering
const filteredTools = computed(() => {
  if (!searchQuery.value.trim()) return categorizedTools.value

  const query = searchQuery.value.toLowerCase()
  const result: Record<string, any[]> = {}

  for (const [category, toolsList] of Object.entries(categorizedTools.value)) {
    const filtered = toolsList.filter(tool =>
      tool.title.toLowerCase().includes(query) ||
      tool.description?.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query)
    )
    if (filtered.length > 0) {
      result[category] = filtered
    }
  }

  return result
})

const filteredArticles = computed(() => {
  if (!searchQuery.value.trim()) return categorizedArticles.value

  const query = searchQuery.value.toLowerCase()
  const result: Record<string, any[]> = {}

  for (const [category, articlesList] of Object.entries(categorizedArticles.value)) {
    const filtered = articlesList.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.description?.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query)
    )
    if (filtered.length > 0) {
      result[category] = filtered
    }
  }

  return result
})

const filteredToolCategories = computed(() => Object.keys(filteredTools.value).sort())
const filteredArticleCategories = computed(() => Object.keys(filteredArticles.value).sort())

const filteredGames = computed(() => {
  if (!searchQuery.value.trim()) return categorizedGames.value

  const query = searchQuery.value.toLowerCase()
  const result: Record<string, any[]> = {}

  for (const [category, gamesList] of Object.entries(categorizedGames.value)) {
    const filtered = gamesList.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.description?.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query)
    )
    if (filtered.length > 0) {
      result[category] = filtered
    }
  }

  return result
})

const filteredGameCategories = computed(() => Object.keys(filteredGames.value).sort())

// Check if search has results
const hasSearchResults = computed(() =>
  filteredToolCategories.value.length > 0 || filteredArticleCategories.value.length > 0 || filteredGameCategories.value.length > 0
)

// Scroll position management
const scrollContainer = ref<HTMLElement | null>(null)

// Save scroll position when scrolling
const handleScroll = () => {
  if (scrollContainer.value) {
    saveScrollPosition(scrollContainer.value.scrollTop)
  }
}

// Keyboard shortcuts handler
const handleKeydown = (event: KeyboardEvent) => {
  // Cmd/Ctrl+K to focus search
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    searchInputRef.value?.focus()
  }

  // ESC to clear search or close sidebar
  if (event.key === 'Escape') {
    if (searchQuery.value) {
      clearSearch()
    }
  }
}

// Restore scroll position on mount and setup keyboard shortcuts
onMounted(() => {
  if (scrollContainer.value) {
    const savedPosition = restoreScrollPosition()
    if (savedPosition > 0) {
      // Defer scroll restoration to next tick to ensure DOM is ready
      setTimeout(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = savedPosition
        }
      }, 0)
    }
  }

  // Add keyboard shortcut listener
  window.addEventListener('keydown', handleKeydown)
})

// Clean up scroll listener and keyboard shortcuts
onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
  window.removeEventListener('keydown', handleKeydown)
})
</script>


