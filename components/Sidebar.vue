<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
    <div class="flex h-16 shrink-0 items-center">
      <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <a
                  :href="item.href"
                  :class="[
                  item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                  'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                ]"
              >
                <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </li>

        <li v-for="(tools, category) in categorizedTools" :key="category">
          <div class="text-xs/6 font-semibold text-gray-400 capitalize">{{ category }}</div>
          <ul role="list" class="-mx-2 mt-2 space-y-1">
            <li v-for="tool in tools" :key="tool.slug">
              <NuxtLink
                  :to="`/tools/${tool.slug}`"
                  class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <span class="truncate">{{ tool.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </li>

        <li class="-mx-6 mt-auto">
          <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800">
            <img
                class="size-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
            />
            <span class="sr-only">Your profile</span>
            <span aria-hidden="true">Tom Cook</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
import { tools } from '~/utils/toolRegistry'

const navigation = [
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Deployments', href: '#', icon: ServerIcon, current: true },
  { name: 'Activity', href: '#', icon: SignalIcon, current: false },
  { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]

// Dynamically categorize tools
const categorizedTools = Object.entries(tools).reduce((acc, [slug, tool]) => {
  const parts = slug.split('-')
  const category = tool.category || parts[0] || 'other'
  if (!acc[category]) acc[category] = []
  acc[category].push({ ...tool, slug })
  return acc
}, {} as Record<string, any[]>)
</script>