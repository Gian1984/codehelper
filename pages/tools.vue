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

    <!-- Static sidebar for desktop -->
    <div class="hidden xl:fixed xl:top-16 xl:bottom-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <Sidebar />
    </div>

    <div class="xl:pl-72">
      <!-- Sticky search header -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-xs sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-5" aria-hidden="true" />
        </button>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="grid flex-1 grid-cols-1" action="#" method="GET">
            <input type="search" name="search" aria-label="Search" class="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-white outline-hidden placeholder:text-gray-500 sm:text-sm/6" placeholder="Search" />
            <MagnifyingGlassIcon class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-500" aria-hidden="true" />
          </form>
        </div>
      </div>

      <main class="lg:pr-96">
        <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h1 class="text-base/7 font-semibold text-white">Deployments</h1>
          <!-- Sort dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="flex items-center gap-x-1 text-sm/6 font-medium text-white">
              Sort by
              <ChevronUpDownIcon class="size-5 text-gray-500" aria-hidden="true" />
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 focus:outline-hidden">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-50 outline-hidden' : '', 'block px-3 py-1 text-sm/6 text-gray-900']">Name</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-50 outline-hidden' : '', 'block px-3 py-1 text-sm/6 text-gray-900']">Date updated</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-50 outline-hidden' : '', 'block px-3 py-1 text-sm/6 text-gray-900']">Environment</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </header>

        <!-- Deployment list -->
        <ul role="list" class="divide-y divide-white/5">
          <li v-for="deployment in deployments" :key="deployment.id" class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
            <div class="min-w-0 flex-auto">
              <div class="flex items-center gap-x-3">
                <div :class="[statuses[deployment.status], 'flex-none rounded-full p-1']">
                  <div class="size-2 rounded-full bg-current" />
                </div>
                <h2 class="min-w-0 text-sm/6 font-semibold text-white">
                  <a :href="deployment.href" class="flex gap-x-2">
                    <span class="truncate">{{ deployment.teamName }}</span>
                    <span class="text-gray-400">/</span>
                    <span class="whitespace-nowrap">{{ deployment.projectName }}</span>
                    <span class="absolute inset-0" />
                  </a>
                </h2>
              </div>
              <div class="mt-3 flex items-center gap-x-2.5 text-xs/5 text-gray-400">
                <p class="truncate">{{ deployment.description }}</p>
                <svg viewBox="0 0 2 2" class="size-0.5 flex-none fill-gray-300">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <p class="whitespace-nowrap">{{ deployment.statusText }}</p>
              </div>
            </div>
            <div :class="[environments[deployment.environment], 'flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset']">{{ deployment.environment }}</div>
            <ChevronRightIcon class="size-5 flex-none text-gray-400" aria-hidden="true" />
          </li>
        </ul>
      </main>

      <!-- Activity feed -->
      <aside class="bg-black/10 lg:fixed lg:top-16 lg:right-0 lg:bottom-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
        <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h2 class="text-base/7 font-semibold text-white">Activity feed</h2>
          <a href="#" class="text-sm/6 font-semibold text-indigo-400">View all</a>
        </header>
        <ul role="list" class="divide-y divide-white/5">
          <li v-for="item in activityItems" :key="item.commit" class="px-4 py-4 sm:px-6 lg:px-8">
            <div class="flex items-center gap-x-3">
              <img :src="item.user.imageUrl" alt="" class="size-6 flex-none rounded-full bg-gray-800" />
              <h3 class="flex-auto truncate text-sm/6 font-semibold text-white">{{ item.user.name }}</h3>
              <time :datetime="item.dateTime" class="flex-none text-xs text-gray-600">{{ item.date }}</time>
            </div>
            <p class="mt-3 truncate text-sm text-gray-500">
              Pushed to <span class="text-gray-400">{{ item.projectName }}</span>
              (<span class="font-mono text-gray-400">{{ item.commit }}</span> on <span class="text-gray-400">{{ item.branch }}</span>)
            </p>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid'

const sidebarOpen = ref(false)

const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}

const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}

const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
]

const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
]
</script>
