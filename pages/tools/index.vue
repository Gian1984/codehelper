<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Sidebar />

    <div class="xl:pl-72 p-8">
      <h1 class="text-3xl font-bold mb-4">Welcome to DevTools</h1>
      <p class="text-gray-400 mb-6">Select a tool from the sidebar to get started.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        <div
            v-for="(tool, slug) in tools"
            :key="slug"
            class="rounded-lg bg-gray-800 p-4 shadow hover:shadow-md transition"
        >
          <NuxtLink :to="`/tools/${slug}`" class="block">
            <h2 class="text-xl font-semibold">{{ tool.title }}</h2>
            <p class="text-gray-400 text-sm mt-1">{{ tool.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import { tools } from '~/utils/toolRegistry'
</script>
