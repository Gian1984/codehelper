<template>
  <div class="space-y-4 bg-gray-800 p-8 rounded-lg shadow">
    <h2 class="text-2xl font-semibold text-white">Aspect Ratio Calculator</h2>

    <label class="block">
      <span class="text-gray-300">Width (px)</span>
      <input v-model.number="width" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Height (px)</span>
      <input v-model.number="height" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <button @click="calculateAspectRatio" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 text-white">
      Calculate
    </button>

    <div v-if="aspectRatio" class="bg-gray-800 p-4 rounded mt-4 font-mono text-green-300">
      Aspect ratio: {{ aspectRatio }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const width = ref(720)
const height = ref(480)
const aspectRatio = ref('')

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))

const calculateAspectRatio = () => {
  const divisor = gcd(width.value, height.value)
  const ratio = (width.value / height.value).toFixed(2)
  aspectRatio.value = `${ratio}:1 (${width.value / divisor}:${height.value / divisor})`
}
</script>
