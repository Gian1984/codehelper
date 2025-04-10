<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Image Color Picker</h2>

    <!-- Upload & Controls -->
    <div class="flex items-center flex-wrap gap-4">
      <label class="relative cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
        Upload Image
        <input type="file" accept="image/*" @change="handleFileChange" class="absolute inset-0 opacity-0 cursor-pointer" />
      </label>

      <button
          v-if="imageSrc"
          @click="clearImage"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
      >
        Clear Image
      </button>
    </div>

    <!-- Canvas Preview -->
    <div v-if="imageSrc" class="relative w-full overflow-auto border border-gray-600 rounded">
      <canvas
          ref="canvasRef"
          @click="pickColor"
          class="rounded cursor-crosshair w-full h-auto"
      ></canvas>

      <!-- Click instruction -->
      <div class="absolute top-2 left-2 bg-black/60 text-white text-xs px-3 py-1 rounded shadow">
        Click on the image to pick a color.
      </div>

      <!-- Picked Color Overlay -->
      <div
          v-if="pickedColor"
          class="absolute top-2 right-2 bg-gray-900/80 text-white text-sm px-4 py-2 rounded shadow space-y-1"
      >
        <div class="flex items-center gap-2">
          <div :style="{ backgroundColor: pickedColor.hex }" class="w-5 h-5 rounded border border-white"></div>
          <span>{{ pickedColor.hex }}</span>
          <button @click="copyToClipboard(pickedColor.hex)" class="text-blue-400 text-xs hover:underline">copy</button>
        </div>
        <div class="flex items-center gap-2">
          <span>{{ pickedColor.rgba }}</span>
          <button @click="copyToClipboard(pickedColor.rgba)" class="text-blue-400 text-xs hover:underline">copy</button>
        </div>
      </div>
    </div>

    <!-- Color Output -->
    <div v-if="pickedColor" class="space-y-4">
      <div class="flex items-center space-x-4">
        <div :style="{ backgroundColor: pickedColor.hex }" class="w-12 h-12 rounded border border-white"></div>
        <div class="text-white text-sm space-y-1">
          <div class="flex items-center gap-2">
            <strong>HEX:</strong>
            <input
                readonly
                :value="pickedColor.hex"
                class="bg-gray-900 text-white px-2 py-1 rounded border border-gray-600 w-32"
            />
            <button @click="copyToClipboard(pickedColor.hex)" class="text-blue-400 text-xs hover:underline">copy</button>
          </div>
          <div class="flex items-center gap-2">
            <strong>RGBA:</strong>
            <input
                readonly
                :value="pickedColor.rgba"
                class="bg-gray-900 text-white px-2 py-1 rounded border border-gray-600 w-48"
            />
            <button @click="copyToClipboard(pickedColor.rgba)" class="text-blue-400 text-xs hover:underline">copy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const imageSrc = ref<string | null>(null)
const pickedColor = ref<{ hex: string; rgba: string } | null>(null)

function handleFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    imageSrc.value = URL.createObjectURL(file)
    nextTick(() => drawImage())
  }
}

function drawImage() {
  if (!canvasRef.value || !imageSrc.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  const img = new Image()
  img.onload = () => {
    canvasRef.value!.width = img.width
    canvasRef.value!.height = img.height
    ctx.drawImage(img, 0, 0)
  }
  img.src = imageSrc.value
}

function pickColor(e: MouseEvent) {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = Math.floor((e.clientX - rect.left) * (canvasRef.value!.width / rect.width))
  const y = Math.floor((e.clientY - rect.top) * (canvasRef.value!.height / rect.height))
  const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data

  pickedColor.value = {
    hex: rgbToHex(r, g, b),
    rgba: `rgba(${r}, ${g}, ${b}, ${a / 255})`
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
      '#' +
      [r, g, b]
          .map((x) => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
          })
          .join('')
  ).toUpperCase()
}

function clearImage() {
  imageSrc.value = null
  pickedColor.value = null
  const canvas = canvasRef.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>

