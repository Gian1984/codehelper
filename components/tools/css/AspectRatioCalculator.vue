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

    <div class="flex flex-wrap items-center gap-2">
      <button @click="calculateAspectRatio" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 text-white">
        Calculate
      </button>

      <button
          v-if="aspectRatio"
          @click="copyToClipboard"
          class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
      >
        Copy
      </button>

      <button
          @click="clearAll"
          class="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
      >
        Clear
      </button>

      <span v-if="copied" class="text-green-400 text-sm ml-2">Copied!</span>
    </div>

    <div v-if="aspectRatio" class="bg-gray-900 p-4 rounded mt-4 font-mono text-green-300">
      Aspect ratio: {{ aspectRatio }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const width = ref(720)
const height = ref(480)
const aspectRatio = ref('')
const copied = ref(false)

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))

const calculateAspectRatio = () => {
  if (!width.value || !height.value) {
    aspectRatio.value = ''
    return
  }

  const divisor = gcd(width.value, height.value)
  const ratio = (width.value / height.value).toFixed(2)
  aspectRatio.value = `${ratio}:1 (${width.value / divisor}:${height.value / divisor})`
  copied.value = false
}

const copyToClipboard = async () => {
  if (aspectRatio.value) {
    await navigator.clipboard.writeText(aspectRatio.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}

const clearAll = () => {
  width.value = 0
  height.value = 0
  aspectRatio.value = ''
  copied.value = false
}
</script>

