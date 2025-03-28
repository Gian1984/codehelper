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
        <h1 class="text-3xl font-bold mb-4">{{ toolData.title }}</h1>
        <p class="text-gray-400 mb-6">{{ toolData.description }}</p>
        <component :is="ToolComponent" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { createError, useHead } from '#imports'
import { tools } from '~/utils/toolRegistry'
import Sidebar from '~/components/Sidebar.vue'
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

const route = useRoute()
const slug = route.params.slug as string
const toolData = tools[slug]

if (!toolData) {
  throw createError({ statusCode: 404, message: 'Tool not found' })
}

const ToolComponent = defineAsyncComponent(toolData.component)

useHead({
  title: toolData.seo?.title || `${toolData.title} – CodeHelper`,
  meta: [
    {
      name: 'description',
      content: toolData.seo?.description || toolData.description
    },
    {
      name: 'keywords',
      content: toolData.seo?.keywords || ''
    },
    {
      property: 'og:title',
      content: toolData.seo?.title || toolData.title
    },
    {
      property: 'og:description',
      content: toolData.seo?.description || toolData.description
    },
    {
      property: 'og:image',
      content: toolData.seo?.ogImage || '/images/codehelper_logo.webp'
    }
  ],
  script: toolData.seo?.structuredData
      ? [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            ...toolData.seo.structuredData
          })
        }
      ]
      : []
})
</script>

