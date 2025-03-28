<template>
  <div class="space-y-4 bg-gray-800 p-6 rounded-lg shadow">
    <h2 class="text-2xl font-semibold">PX to VH Converter</h2>

    <label class="block">
      <span class="text-gray-300">Window Height (px)</span>
      <input v-model="windowHeight" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Object Height (px)</span>
      <input v-model="objectHeight" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <button @click="convertToVh" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
      Convert
    </button>

    <div v-if="vhResult !== null" class="bg-gray-900 p-4 rounded mt-4 font-mono text-green-300">
      {{ vhResult }}vh
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const windowHeight = ref(768)
const objectHeight = ref(300)
const vhResult = ref<number | null>(null)

const convertToVh = () => {
  if (windowHeight.value && objectHeight.value) {
    vhResult.value = parseFloat(((objectHeight.value / windowHeight.value) * 100).toFixed(4))
  }
}
</script>
