<template>
  <div class="space-y-4 bg-gray-800 p-6 rounded-lg shadow">
    <h2 class="text-2xl font-semibold">PX to VW Converter</h2>

    <label class="block">
      <span class="text-gray-300">Viewport Width (px)</span>
      <input v-model.number="viewportWidth" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Object Width (px)</span>
      <input v-model.number="objectWidth" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <button @click="convertToVw" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
      Convert
    </button>

    <div v-if="vwResult !== null" class="bg-gray-900 p-4 rounded mt-4 font-mono text-green-300">
      {{ vwResult }}vw
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const viewportWidth = ref(1920)
const objectWidth = ref(192)
const vwResult = ref<number | null>(null)

const convertToVw = () => {
  if (viewportWidth.value && objectWidth.value) {
    vwResult.value = parseFloat(((objectWidth.value / viewportWidth.value) * 100).toFixed(4))
  }
}
</script>

