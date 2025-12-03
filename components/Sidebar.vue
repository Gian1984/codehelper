<template>
  <div>
    <!-- Mobile Overlay & Backdrop (Dialog without content duplication) -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 xl:hidden" @close="close">
        <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
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
                      @click="close"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <!-- Single SidebarContent instance (rendered only on mobile when open) -->
              <SidebarContent class="custom-scrollbar" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Desktop Sidebar (toggleable on desktop, hidden on mobile) -->
    <div :class="[
      'hidden xl:fixed xl:top-16 xl:bottom-0 xl:z-50 xl:w-72 xl:flex-col',
      isDesktopCollapsed ? 'xl:hidden' : 'xl:flex'
    ]">
      <!-- Toggle collapse button (desktop only) -->
      <button
        @click="toggleDesktopCollapse"
        class="absolute top-4 right-4 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors z-10"
        title="Collapse sidebar"
        aria-label="Collapse sidebar"
      >
        <ChevronLeftIcon class="size-5" aria-hidden="true" />
      </button>

      <SidebarContent class="custom-scrollbar" />
    </div>

    <!-- Floating button to expand sidebar when collapsed (desktop only) -->
    <button
      v-if="isDesktopCollapsed"
      @click="toggleDesktopCollapse"
      class="hidden xl:block fixed left-4 top-20 z-50 p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
      title="Expand sidebar"
      aria-label="Expand sidebar"
    >
      <Bars3Icon class="size-6" aria-hidden="true" />
    </button>

    <!-- Topbar -->
    <div
        class="xl:hidden flex sticky top-0 z-40 h-16 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 sm:px-6 lg:px-8"
    >
      <button
          type="button"
          class="-m-2.5 p-2.5 text-white xl:hidden"
          @click="open"
      >
        <span class="flex items-center gap-x-1 font-semibold">
          {{ sectionTitle }}
          <component :is="sectionIcon" class="size-5" aria-hidden="true" />
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
import { onMounted, onUnmounted, computed } from 'vue'
import SidebarContent from './SidebarContent.vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, BookmarkIcon, XMarkIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid'
import { WrenchScrewdriverIcon, NewspaperIcon } from '@heroicons/vue/24/outline'

const { isOpen: sidebarOpen, isDesktopCollapsed, close, open, restoreState, searchQuery, toggleDesktopCollapse } = useSidebarState()

// Dynamic title based on current route
const route = useRoute()
const sectionTitle = computed(() => {
  const path = route.path
  if (path.startsWith('/tools')) return 'Tools'
  if (path.startsWith('/articles')) return 'Articles'
  return 'Resources'
})

// Dynamic icon based on current route
const sectionIcon = computed(() => {
  const path = route.path
  if (path.startsWith('/tools')) return WrenchScrewdriverIcon
  if (path.startsWith('/articles')) return NewspaperIcon
  return WrenchScrewdriverIcon // default
})

// Keyboard shortcut for ESC to close mobile sidebar
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && sidebarOpen.value && !searchQuery.value) {
    close()
  }
}

// Restore state from localStorage on mount and setup keyboard shortcuts
onMounted(() => {
  restoreState()
  window.addEventListener('keydown', handleKeydown)
})

// Clean up keyboard shortcuts
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
@keyframes wiggle {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
}

.animate-wiggle {
  /* Run animation 3 times instead of infinite to reduce distraction */
  animation: wiggle 0.6s ease-in-out 3;
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-wiggle {
    animation: none;
  }
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


