<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Color Shades Generator</h2>

    <!-- Color Picker -->
    <label class="block">
      <span class="text-gray-300">Base Color (HEX)</span>
      <div class="flex items-center space-x-2">
        <input v-model="baseColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="baseColor"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateHex"
        />
      </div>
    </label>

    <!-- Shades Output -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="(shade, i) in shades" :key="i" class="rounded shadow text-center">
        <div :style="{ backgroundColor: shade }" class="h-16 rounded-t"></div>
        <div class="bg-gray-900 text-white text-xs py-1 px-2 rounded-b">{{ shade }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const baseColor = ref('#0099ff')

function validateHex() {
  if (!/^#[0-9A-Fa-f]{6}$/.test(baseColor.value)) {
    baseColor.value = '#0099ff'
  }
}

function shadeColor(hex: string, percent: number): string {
  const num = parseInt(hex.slice(1), 16)
  let r = (num >> 16) + percent
  let g = ((num >> 8) & 0x00FF) + percent
  let b = (num & 0x0000FF) + percent
  r = Math.max(0, Math.min(255, r))
  g = Math.max(0, Math.min(255, g))
  b = Math.max(0, Math.min(255, b))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

const shades = computed(() => {
  const steps = [-60, -40, -20, 0, 20, 40, 60, 80]
  return steps.map(step => shadeColor(baseColor.value, step))
})
</script>

<style scoped>
input[type="text"] {
  font-family: monospace;
}
</style>
