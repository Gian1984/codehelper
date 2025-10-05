<template>
  <div>
    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 xl:hidden" @close="sidebarOpen = false">
        <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                  as="template"
                  enter="ease-in-out duration-300"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-300"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
              >
                <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
                  <button
                      type="button"
                      class="-m-2.5 p-2.5"
                      @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <SidebarContent class="custom-scrollbar" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Desktop Sidebar -->
    <div class="hidden xl:fixed xl:top-16 xl:bottom-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <button
          type="button"
          class="-m-2.5 p-2.5 text-white xl:hidden"
          @click="sidebarOpen = true"
      >
        <span class="flex items-center gap-x-1 font-semibold">
          Resources
          <BookmarkIcon class="size-5" aria-hidden="true" />
          <ChevronRightIcon
              class="size-5 text-gray-400 animate-wiggle"
              aria-hidden="true"
          />
        </span>
      </button>

      <SidebarContent class="custom-scrollbar" />
    </div>

    <!-- Topbar -->
    <div
        class="xl:hidden flex sticky top-0 z-40 h-16 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 sm:px-6 lg:px-8"
    >
      <button
          type="button"
          class="-m-2.5 p-2.5 text-white xl:hidden"
          @click="sidebarOpen = true"
      >
        <span class="flex items-center gap-x-1 font-semibold">
          Resources
          <BookmarkIcon class="size-5" aria-hidden="true" />
          <ChevronRightIcon
              class="size-5 text-gray-400 animate-wiggle"
              aria-hidden="true"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarContent from './SidebarContent.vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, BookmarkIcon, XMarkIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const sidebarOpen = ref(false)
</script>

<style scoped>
@keyframes wiggle {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
}

.animate-wiggle {
  animation: wiggle 0.6s ease-in-out infinite;
}

/* Custom scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgb(17 24 39); /* bg-gray-900 */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgb(55 65 81); /* bg-gray-700 */
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgb(75 85 99); /* bg-gray-600 */
}

/* Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgb(55 65 81) rgb(17 24 39);
}
</style>


