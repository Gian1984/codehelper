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

    <div class="flex flex-wrap items-center gap-2">
      <button @click="convert" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
        Convert
      </button>

      <button
          v-if="vhResult"
          @click="copyToClipboard"
          class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
      >
        Copy
      </button>

      <button
          @click="clearAll"
          class="bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
      >
        Clear
      </button>

      <span v-if="copied" class="text-green-400 text-sm ml-2">Copied!</span>
    </div>

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
const copied = ref(false)

function convert() {
  if (!windowHeight.value || !objectHeight.value) {
    vhResult.value = ''
    return
  }

  const result = (objectHeight.value / windowHeight.value) * 100
  vhResult.value = result.toFixed(2)
  copied.value = false
}

async function copyToClipboard() {
  if (vhResult.value) {
    await navigator.clipboard.writeText(`height: ${vhResult.value}vh;`)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}

function clearAll() {
  windowHeight.value = 0
  objectHeight.value = 0
  vhResult.value = ''
  copied.value = false
}
</script>


