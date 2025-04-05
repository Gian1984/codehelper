<template>
  <div class="space-y-4 bg-gray-800 p-8 rounded-lg shadow">
    <label class="block">
      <span class="text-gray-300">Min Font Size (px)</span>
      <input v-model="min" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Max Font Size (px)</span>
      <input v-model="max" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Viewport Min (px)</span>
      <input v-model="vwMin" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Viewport Max (px)</span>
      <input v-model="vwMax" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <div class="flex flex-wrap items-center gap-2">
      <button @click="generate" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 text-white">
        Generate
      </button>

      <button
          v-if="clamp"
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

    <div v-if="clamp" class="bg-gray-900 p-4 rounded mt-4 font-mono text-green-300">
      {{ clamp }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const min = ref(16)
const max = ref(24)
const vwMin = ref(320)
const vwMax = ref(1280)

const clamp = ref('')
const copied = ref(false)

const generate = () => {
  const slope = (max.value - min.value) / (vwMax.value - vwMin.value) * 100
  const base = min.value - (slope * vwMin.value) / 100
  clamp.value = `clamp(${min.value}px, ${slope.toFixed(4)}vw + ${base.toFixed(2)}px, ${max.value}px);`
  copied.value = false
}

const copyToClipboard = async () => {
  if (clamp.value) {
    await navigator.clipboard.writeText(clamp.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  }
}

const clearAll = () => {
  min.value = 0
  max.value = 0
  vwMin.value = 0
  vwMax.value = 0
  clamp.value = ''
  copied.value = false
}
</script>

