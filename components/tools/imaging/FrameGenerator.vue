<template>
  <div class="space-y-4 bg-gray-800 p-8 rounded-lg shadow">
    <h2 class="text-2xl font-semibold text-white">Aspect Ratio Matte Generator</h2>

    <label class="block">
      <span class="text-gray-300">Width (px)</span>
      <input v-model.number="width" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Height (px)</span>
      <input v-model.number="height" type="number" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <label class="block">
      <span class="text-gray-300">Target Aspect Ratio (e.g., 2.35)</span>
      <input v-model.number="targetRatio" type="number" step="0.01" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <!-- Background Color -->
    <label class="block">
      <span class="text-gray-300">Background Color</span>
      <div class="flex items-center space-x-2">
        <input v-model="bgColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="bgColor"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateColors"
        />
      </div>
    </label>

    <!-- Text Color -->
    <label class="block">
      <span class="text-gray-300">Text Color</span>
      <div class="flex items-center space-x-2">
        <input v-model="textColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="textColor"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateColors"
        />
      </div>
    </label>

    <button @click="generateImage" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 text-white">Generate Matte</button>

    <canvas ref="canvas" class="hidden"></canvas>

    <div v-if="preview" class="mt-4 text-center">
      <h3 class="text-white mb-2">Preview</h3>
      <img :src="preview" :alt="`Matte ${width}x${height}`" class="mx-auto border" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const width = ref(1920)
const height = ref(1080)
const targetRatio = ref(2.35)
const bgColor = ref('#333333')
const textColor = ref('#ffffff')
const preview = ref('')
const canvas = ref()

const validateColors = () => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(bgColor.value)) bgColor.value = '#333333'
  if (!/^#[0-9A-Fa-f]{6}$/.test(textColor.value)) textColor.value = '#ffffff'
}

const generateImage = () => {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = width.value
  canvas.value.height = height.value

  ctx.fillStyle = bgColor.value
  ctx.fillRect(0, 0, width.value, height.value)

  const targetHeight = width.value / targetRatio.value
  const topBar = (height.value - targetHeight) / 2

  ctx.clearRect(0, topBar, width.value, targetHeight)

  ctx.fillStyle = textColor.value
  ctx.font = 'bold 20px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`${width.value}x${height.value}`, width.value / 2, height.value / 2)

  preview.value = canvas.value.toDataURL('image/png')

  const a = document.createElement('a')
  a.href = preview.value
  a.download = `codehelper-matte-${width.value}x${height.value}.png`
  a.click()
}
</script>

<style scoped>
canvas.hidden {
  display: none;
}
</style>


