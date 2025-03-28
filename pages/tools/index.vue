<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 xl:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <Sidebar class="bg-gray-900 ring-1 ring-white/10" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden xl:fixed xl:top-16 xl:bottom-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <Sidebar />
    </div>

    <div class="xl:pl-72">
      <div class="sticky top-0 z-40 flex h-16 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-5" aria-hidden="true" />
        </button>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="grid flex-1 grid-cols-1" action="#" method="GET">
            <input type="search" name="search" aria-label="Search" class="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-white placeholder:text-gray-500 sm:text-sm" placeholder="Search" />
            <MagnifyingGlassIcon class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-500" aria-hidden="true" />
          </form>
        </div>
      </div>

      <main class="lg:pr-96 p-8">
        <header class="flex items-center justify-between border-b border-white/5 pb-4">
          <h1 class="text-base font-semibold text-white">All Tools</h1>
        </header>

        <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
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
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import { tools } from '~/utils/toolRegistry'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/vue/20/solid'

const sidebarOpen = ref(false)

// Create a computed array of tools sorted alphabetically by title
const sortedTools = computed(() =>
    Object.entries(tools)
        .sort(([, a], [, b]) => a.title.localeCompare(b.title))
)
</script>


