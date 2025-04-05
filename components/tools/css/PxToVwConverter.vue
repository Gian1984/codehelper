<template>
  <div class="space-y-4 bg-gray-800 p-8 rounded-lg shadow text-white">
    <h2 class="text-2xl font-semibold">PX to VW Converter</h2>

    <label class="block">
      <span class="text-gray-300">Viewport Width (px)</span>
      <input v-model.number="viewportWidth" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Object Width (px)</span>
      <input v-model.number="objectWidth" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <div class="flex flex-wrap items-center gap-2">
      <button @click="convertToVw" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
        Convert
      </button>

      <button
          v-if="vwResult !== null"
          @click="copyToClipboard"
          class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
      >
        Copy
      </button>

      <button @click="clearAll" class="bg-red-600 hover:bg-red-500 px-4 py-2 rounded">
        Clear
      </button>

      <span v-if="copied" class="text-green-400 text-sm ml-2">Copied!</span>
    </div>

    <div v-if="vwResult !== null" class="bg-gray-900 p-4 rounded mt-4 font-mono text-green-300">
      width: {{ vwResult }}vw;
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const viewportWidth = ref(1920)
const objectWidth = ref(192)
const vwResult = ref<number | null>(null)
const copied = ref(false)

const convertToVw = () => {
  if (viewportWidth.value && objectWidth.value) {
    vwResult.value = parseFloat(((objectWidth.value / viewportWidth.value) * 100).toFixed(4))
    copied.value = false
  }
}

const copyToClipboard = async () => {
  if (vwResult.value !== null) {
    await navigator.clipboard.writeText(`width: ${vwResult.value}vw;`)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}

const clearAll = () => {
  viewportWidth.value = 0
  objectWidth.value = 0
  vwResult.value = null
  copied.value = false
}
</script>
