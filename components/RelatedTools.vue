<template>
  <div v-if="relatedTools.length > 0" class="mt-8 card">
    <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
      <span>🔧</span>
      <span>Related {{ categoryLabel }} Tools</span>
    </h3>
    <div :class="gridClass">
      <NuxtLink
        v-for="tool in relatedTools"
        :key="tool.slug"
        :to="`/tools/${tool.slug}`"
        class="group p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-indigo-500 hover:bg-gray-750 transition-all"
      >
        <div class="font-medium text-white group-hover:text-indigo-400 transition-colors">
          {{ tool.title }}
        </div>
        <div class="text-sm text-gray-400 mt-1 line-clamp-2">
          {{ tool.description }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tools } from '~/utils/toolRegistry'

const route = useRoute()

// Get current tool slug from URL
const currentToolSlug = computed(() => {
  return route.params.slug as string
})

// Find current tool in registry
const currentTool = computed(() => {
  return tools[currentToolSlug.value]
})

// Get category of current tool
const currentCategory = computed(() => {
  return currentTool.value?.category || ''
})

// Category labels for better display
const categoryLabels: Record<string, string> = {
  'dev': 'Developer',
  'formatter': 'Formatter',
  'converter': 'Converter',
  'css': 'CSS',
  'colors': 'Color',
  'imaging': 'Image',
  'svg': 'SVG',
  'textes': 'Text',
  'generator': 'Generator',
}

const categoryLabel = computed(() => {
  return categoryLabels[currentCategory.value] || currentCategory.value
})

// Get related tools from the same category, excluding current tool
const relatedTools = computed(() => {
  if (!currentCategory.value) return []

  // Get all tools from the same category
  const toolsInCategory = Object.entries(tools)
    .filter(([slug, tool]) => {
      return tool.category === currentCategory.value && slug !== currentToolSlug.value
    })
    .map(([slug, tool]) => ({
      slug,
      title: tool.title,
      description: tool.description,
    }))

  // Shuffle array for randomness (different order on each render)
  const shuffled = [...toolsInCategory].sort(() => Math.random() - 0.5)

  // Return 1-3 tools based on availability
  // If only 1 available, show 1
  // If 2 available, show 2
  // If 3+ available, show 3
  const maxToShow = Math.min(toolsInCategory.length, 3)
  return shuffled.slice(0, maxToShow)
})

// Dynamic grid class based on number of tools
const gridClass = computed(() => {
  const count = relatedTools.value.length
  if (count === 1) return 'grid grid-cols-1 gap-4'
  if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-4'
  return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
})
</script>

<style scoped>
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}

/* Line clamp utility for description */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
