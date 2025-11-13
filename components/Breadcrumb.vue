<template>
  <nav aria-label="Breadcrumb" class="mb-6">
    <ol
      class="flex flex-wrap items-center gap-2 text-sm text-gray-400"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
        class="flex items-center gap-2"
      >
        <NuxtLink
          v-if="index < items.length - 1"
          :to="item.url"
          itemprop="item"
          class="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm px-1"
        >
          <span itemprop="name">{{ item.title }}</span>
        </NuxtLink>
        <span v-else itemprop="name" class="text-white font-medium">
          {{ item.title }}
        </span>
        <meta itemprop="position" :content="String(index + 1)" />
        <span v-if="index < items.length - 1" class="text-gray-600" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  title: string
  url: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>
