<template>
  <div class="space-y-4 bg-gray-800 p-6 rounded-lg shadow text-white">
    <h2 class="text-2xl font-semibold">PX to VH Converter</h2>

    <label class="block">
      <span class="text-gray-300">Window Height (px)</span>
      <input v-model.number="windowHeight" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Object Height (px)</span>
      <input v-model.number="objectHeight" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <button @click="convert" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
      Convert
    </button>

    <div v-if="vhResult" class="bg-gray-900 p-4 rounded font-mono text-green-300 mt-4">
      height: {{ vhResult }}vh;
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const windowHeight = ref(768)
const objectHeight = ref(300)
const vhResult = ref('')

function convert() {
  if (!windowHeight.value || !objectHeight.value) {
    vhResult.value = ''
    return
  }

  const result = (objectHeight.value / windowHeight.value) * 100
  vhResult.value = result.toFixed(2)
}
</script>

