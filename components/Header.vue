<template>
  <header>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open, close }">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex items-center px-2 lg:px-0">
            <div class="shrink-0">
              <NuxtLink to="/">
                <img class="h-8 w-auto" src="/images/logo_nav.webp" alt="Codehelper.me" />
              </NuxtLink>
            </div>
            <div class="hidden lg:ml-6 lg:block">
              <div class="flex space-x-4">
                <NuxtLink to="/" :class="navClass('/')">Home</NuxtLink>
                <NuxtLink to="/tools" :class="navClass('/tools')">Tools</NuxtLink>
                <NuxtLink to="/articles" :class="navClass('/articles')">Articles</NuxtLink>
                <NuxtLink to="/project" :class="navClass('/project')">Project</NuxtLink>
                <NuxtLink to="/about" :class="navClass('/about')">About</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Search bar -->
          <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div class="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
              <div class="relative w-full max-w-lg">
                <input
                    v-model="query"
                    type="search"
                    @focus="showSuggestions = true"
                    @blur="() => setTimeout(() => (showSuggestions = false), 200)"
                    class="block w-full rounded-md bg-gray-700 py-1.5 pr-3 pl-10 text-base text-white outline-none placeholder:text-gray-400 focus:bg-white focus:text-gray-900 sm:text-sm"
                    placeholder="Search tools or articles..."
                />
                <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" aria-hidden="true" />

                <ul
                    v-if="showSuggestions && suggestions.length"
                    class="absolute z-10 mt-1 w-full rounded-md bg-white text-sm text-black shadow-lg max-h-64 overflow-auto"
                >
                  <li
                      v-for="entry in suggestions"
                      :key="entry.slug + entry.type"
                      class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      @click="goToEntry(entry)"
                  >
                    <span class="font-medium">{{ entry.title }}</span>
                    <span class="text-xs text-gray-500 ml-2">({{ entry.type }})</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
              <XMarkIcon v-else class="block size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <!-- Mobile nav -->
      <DisclosurePanel class="lg:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3">
          <NuxtLink to="/" @click="close()" :class="mobileNavClass('/')">Home</NuxtLink>
          <NuxtLink to="/tools" @click="close()" :class="mobileNavClass('/tools')">Tools</NuxtLink>
          <NuxtLink to="/articles" @click="close()" :class="mobileNavClass('/articles')">Articles</NuxtLink>
          <NuxtLink to="/project" @click="close()" :class="mobileNavClass('/project')">Project</NuxtLink>
          <NuxtLink to="/about" @click="close()" :class="mobileNavClass('/about')">About</NuxtLink>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { tools } from '~/utils/toolRegistry'
import { articles } from '~/utils/articlesRegistry'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

import {
  MagnifyingGlassIcon
} from '@heroicons/vue/20/solid'

import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

const query = ref('')
const showSuggestions = ref(false)

const allEntries = computed(() => {
  return [
    ...Object.entries(tools).map(([slug, data]) => ({
      slug,
      title: data.title,
      type: 'tool',
    })),
    ...Object.entries(articles).map(([slug, data]) => ({
      slug,
      title: data.title,
      type: 'article',
    }))
  ]
})

const suggestions = computed(() => {
  if (!query.value.trim()) return []
  return allEntries.value.filter(entry =>
      entry.title.toLowerCase().includes(query.value.toLowerCase())
  )
})

const goToEntry = (entry) => {
  query.value = ''
  showSuggestions.value = false
  const basePath = entry.type === 'tool' ? '/tools/' : '/articles/'
  router.push(basePath + entry.slug)
}

watch(() => route.path, () => {
  showSuggestions.value = false
})

const navClass = (path) => [
  'rounded-md px-3 py-2 text-sm font-medium',
  route.path === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
]

const mobileNavClass = (path) => [
  'block rounded-md px-3 py-2 text-base font-medium',
  route.path === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
]
</script>


