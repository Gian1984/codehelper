<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Box Shadow Tester</h2>

    <!-- Shadow Color Picker -->
    <label class="block">
      <span class="text-gray-300">Shadow Color (HEX)</span>
      <div class="flex items-center space-x-2">
        <input v-model="shadowColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="shadowColor"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateHex(shadowColor, '#000000')"
        />
      </div>
    </label>

    <!-- Background Color Picker -->
    <label class="block">
      <span class="text-gray-300">Preview Background</span>
      <div class="flex items-center space-x-2">
        <input v-model="previewBackground" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="previewBackground"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateHex(previewBackground, '#ffffff')"
        />
      </div>
    </label>

    <!-- Controls -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <label class="block">
        <span class="text-gray-300">X Offset</span>
        <input type="range" v-model="xOffset" min="-50" max="50" step="1" class="w-full" />
        <span class="text-white text-sm">{{ xOffset }}px</span>
      </label>
      <label class="block">
        <span class="text-gray-300">Y Offset</span>
        <input type="range" v-model="yOffset" min="-50" max="50" step="1" class="w-full" />
        <span class="text-white text-sm">{{ yOffset }}px</span>
      </label>
      <label class="block">
        <span class="text-gray-300">Blur</span>
        <input type="range" v-model="blur" min="0" max="100" step="1" class="w-full" />
        <span class="text-white text-sm">{{ blur }}px</span>
      </label>
      <label class="block">
        <span class="text-gray-300">Spread</span>
        <input type="range" v-model="spread" min="-50" max="50" step="1" class="w-full" />
        <span class="text-white text-sm">{{ spread }}px</span>
      </label>
    </div>

    <!-- Preview Zone -->
    <div
        class="rounded p-8 flex justify-center items-center"
        :style="{ backgroundColor: previewBackground, height: '200px' }"
    >
      <div
          class="w-16 h-16 bg-white rounded"
          :style="{ boxShadow: boxShadowValue }"
      ></div>
    </div>

    <!-- Output CSS -->
    <div class="text-white mt-6">
      <p class="mb-2">Generated CSS:</p>
      <pre class="bg-gray-900 text-green-400 p-4 rounded text-sm">
          box-shadow: {{ boxShadowValue }};
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const shadowColor = ref('#000000')
const previewBackground = ref('#ffffff')
const xOffset = ref(10)
const yOffset = ref(10)
const blur = ref(20)
const spread = ref(10)

const boxShadowValue = computed(() => {
  return `${xOffset.value}px ${yOffset.value}px ${blur.value}px ${spread.value}px ${shadowColor.value}`
})

function validateHex(value: string, fallback: string) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {
    value = fallback
  }
}
</script>

<style scoped>
input[type="text"] {
  font-family: monospace;
}
</style>
