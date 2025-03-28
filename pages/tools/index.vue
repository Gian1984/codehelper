<template>
  <div class=" bg-gray-900 text-white">
    <Sidebar />

    <div class="xl:pl-72">
      <div class="p-8">
        <h1 class="text-base font-semibold text-white mb-6">All Tools</h1>

        <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <li
              v-for="[slug, tool] in sortedTools"
              :key="slug"
              class="rounded-lg bg-gray-800 p-4 shadow hover:shadow-md transition"
          >
            <NuxtLink :to="`/tools/${slug}`" class="block">
              <h2 class="text-xl font-semibold">{{ tool.title }}</h2>
              <p class="text-gray-400 text-sm mt-1">{{ tool.description }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import { tools } from '~/utils/toolRegistry'

// Create a computed array of tools sorted alphabetically by title
const sortedTools = computed(() =>
    Object.entries(tools).sort(([, a], [, b]) => a.title.localeCompare(b.title))
)
</script>


