<template>
  <div class="space-y-6 bg-gray-800 p-8 rounded-lg shadow">
    <h2 class="text-2xl font-semibold text-white">Color Palette Generator</h2>

    <!-- Base Color Section -->
    <label class="block">
      <span class="text-gray-300">Base Color (Monochromatic Palette)</span>
      <div class="flex items-center space-x-2">
        <input v-model="baseColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="baseColor"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateColor"
        />
      </div>
    </label>

    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div v-for="(color, index) in palette" :key="'mono-' + index" class="text-center">
        <div :style="{ backgroundColor: color }" class="h-20 rounded"></div>
        <p class="text-white text-sm mt-2">{{ color }}</p>
      </div>
    </div>

    <!-- Random Palette Section -->
    <div class="pt-6">
      <div class="flex items-center justify-between">
        <span class="text-gray-300">Random Color Palette</span>
        <button @click="generateRandomPalette" class="bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-500 text-white">
          Generate Random Palette
        </button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
        <div v-for="(color, index) in randomPalette" :key="'rand-' + index" class="text-center">
          <div :style="{ backgroundColor: color }" class="h-20 rounded"></div>
          <p class="text-white text-sm mt-2">{{ color }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const baseColor = ref('#3498db')

const validateColor = () => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(baseColor.value)) {
    baseColor.value = '#000000'
  }
}

const lightenDarkenColor = (hex, amt) => {
  let col = hex.slice(1)
  let num = parseInt(col, 16)
  let r = Math.min(255, Math.max(0, (num >> 16) + amt))
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt))
  let b = Math.min(255, Math.max(0, (num & 0x0000FF) + amt))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const palette = computed(() => {
  return [
    lightenDarkenColor(baseColor.value, -40),
    lightenDarkenColor(baseColor.value, -20),
    baseColor.value,
    lightenDarkenColor(baseColor.value, 20),
    lightenDarkenColor(baseColor.value, 40),
  ]
})

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

const randomPalette = ref([
  generateRandomColor(),
  generateRandomColor(),
  generateRandomColor(),
  generateRandomColor(),
  generateRandomColor()
])

const generateRandomPalette = () => {
  randomPalette.value = Array.from({ length: 5 }, () => generateRandomColor())
}
</script>

<style scoped>
input[type="text"] {
  @apply bg-white;
}
</style>
