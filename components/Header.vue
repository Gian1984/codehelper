<template>
  <header>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="flex items-center px-2 lg:px-0">
            <div class="shrink-0">
              <img class="h-8 w-auto" src="/images/logo_nav.webp" alt="Codehelper.me" />
            </div>
            <div class="hidden lg:ml-6 lg:block">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
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

                <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>

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
          <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div class="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
              <input type="search" name="search" aria-label="Search" class="col-start-1 row-start-1 block w-full rounded-md bg-gray-700 py-1.5 pr-3 pl-10 text-base text-white outline-hidden placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 sm:text-sm/6" placeholder="Search" />
              <MagnifyingGlassIcon class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400" aria-hidden="true" />
            </div>
          </div>
          <div class="flex lg:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
              <XMarkIcon v-else class="block size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="lg:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <DisclosureButton
              as="NuxtLink"
              to="/"
              :class="[
                'block rounded-md px-3 py-2 text-base font-medium',
                route.path === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]"
          >
            Home
          </DisclosureButton>

          <DisclosureButton
              as="NuxtLink"
              to="/tools"
              :class="[
                'block rounded-md px-3 py-2 text-base font-medium',
                route.path === '/tools' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]"
          >
            Tools
          </DisclosureButton>

          <DisclosureButton
              as="a"
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Projects
          </DisclosureButton>

          <DisclosureButton
              as="NuxtLink"
              to="/about"
              :class="[
                'block rounded-md px-3 py-2 text-base font-medium',
                route.path === '/about' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              ]"
          >
            About
          </DisclosureButton>

        </div>
      </DisclosurePanel>
    </Disclosure>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'

import {
  MagnifyingGlassIcon
} from '@heroicons/vue/20/solid'

import {
  Bars3Icon,
  BellIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
</script>
