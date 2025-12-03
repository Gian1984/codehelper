<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Header />
    <Sidebar />

    <div :class="[
      'transition-all duration-300',
      isDesktopCollapsed ? 'xl:pl-20' : 'xl:pl-72'
    ]">
      <main>
        <NuxtPage />
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
import Footer from '~/components/Footer.vue'

const { isDesktopCollapsed } = useSidebarState()
</script>
