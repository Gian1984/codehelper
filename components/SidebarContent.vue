<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
    <div class="flex h-16 shrink-0 items-center">
        <span class="flex items-center gap-x-1 text-white font-semibold">
          Toolbar
          <WrenchIcon class="size-5" aria-hidden="true" />
        </span>
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-2">
        <li v-for="category in sortedCategories" :key="category">
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
              <FolderIcon class="size-6 shrink-0" />
              <span class="capitalize">{{ category }}</span>
              <ChevronRightIcon :class="[open ? 'rotate-90 text-gray-500' : 'text-gray-400', 'ml-auto size-5 shrink-0 transition-transform']" aria-hidden="true" />
            </DisclosureButton>
            <DisclosurePanel>
              <ul role="list" class="ml-4 mt-2 space-y-1">
                <li v-for="tool in categorizedTools[category]" :key="tool.slug">
                  <NuxtLink
                      :to="`/tools/${tool.slug}`"
                      class="group flex gap-x-3 rounded-md p-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <span class="truncate">{{ tool.title }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </DisclosurePanel>
          </Disclosure>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  FolderIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { tools } from '~/utils/toolRegistry'
import {WrenchIcon} from "@heroicons/vue/20/solid";

const categorizedTools = Object.entries(tools).reduce((acc, [slug, tool]) => {
  const category = tool.category || slug.split('-')[0] || 'other'
  if (!acc[category]) acc[category] = []
  acc[category].push({ ...tool, slug })
  return acc
}, {} as Record<string, any[]>)

for (const cat in categorizedTools) {
  categorizedTools[cat].sort((a, b) => a.title.localeCompare(b.title))
}

const sortedCategories = Object.keys(categorizedTools).sort()
</script>
