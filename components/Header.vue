<template>
  <header>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open, close }">
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex items-center px-2 lg:px-0">
            <div class="shrink-0">
              <img class="h-8 w-auto" src="/images/logo_nav.webp" alt="Codehelper.me" />
            </div>
            <div class="hidden lg:ml-6 lg:block">
              <div class="flex space-x-4">
                <NuxtLink
                    to="/"
                    :class="[
                    'rounded-md px-3 py-2 text-sm font-medium',
                    route.path === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  Home
                </NuxtLink>

                <NuxtLink
                    to="/tools"
                    :class="[
                    'rounded-md px-3 py-2 text-sm font-medium',
                    route.path === '/tools' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  Tools
                </NuxtLink>

                <NuxtLink
                    to="/project"
                    :class="[
                    'rounded-md px-3 py-2 text-sm font-medium',
                    route.path === '/project' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  Project
                </NuxtLink>

                <NuxtLink
                    to="/about"
                    :class="[
                    'rounded-md px-3 py-2 text-sm font-medium',
                    route.path === '/about' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  ]"
                >
                  About
                </NuxtLink>
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
                    placeholder="Search tools..."
                />
                <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" aria-hidden="true" />

                <ul
                    v-if="showSuggestions && suggestions.length"
                    class="absolute z-10 mt-1 w-full rounded-md bg-white text-sm text-black shadow-lg max-h-64 overflow-auto"
                >
                  <li
                      v-for="[slug, tool] in suggestions"
                      :key="slug"
                      class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      @click="goToTool(slug)"
                  >
                    {{ tool.title }}
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

      <!-- ✅ Updated mobile nav -->
      <DisclosurePanel class="lg:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3">
          <NuxtLink
              to="/"
              @click="close()"
              :class="[
                'block rounded-md px-3 py-2 text-base font-medium',
                route.path === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]">
            Home
          </NuxtLink>
          <NuxtLink
              to="/tools"
              @click="close()"
              :class="[
                'block rounded-md px-3 py-2 text-base font-medium',
                route.path === '/tools' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]">
            Tools
          </NuxtLink>
          <NuxtLink
              to="/project"
              @click="close()"
              :class="[
                'block rounded-md px-3 py-2 text-base font-medium',
                route.path === '/project' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]">
            Project
          </NuxtLink>

          <NuxtLink
              to="/about"
              @click="close()"
              :class="[
                'block rounded-md px-3 py-2 text-base font-medium',
                route.path === '/about' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]">
            About
          </NuxtLink>
        </div>
      </DisclosurePanel>

    </Disclosure>
  </header>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { tools } from '~/utils/toolRegistry'

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

// Search logic
const query = ref('')
const showSuggestions = ref(false)

const toolEntries = computed(() =>
    Object.entries(tools).sort(([, a], [, b]) => a.title.localeCompare(b.title))
)

const suggestions = computed(() => {
  if (!query.value.trim()) return []
  return toolEntries.value.filter(([slug, tool]) =>
      tool.title.toLowerCase().includes(query.value.toLowerCase())
  )
})

// Go to selected tool
const goToTool = (slug) => {
  query.value = ''
  showSuggestions.value = false
  router.push(`/tools/${slug}`)
}

// Hide suggestions on route change
watch(() => route.path, () => {
  showSuggestions.value = false
})
</script>
