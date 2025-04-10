<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">CSS Clip-Path Maker</h2>

    <!-- Anchor Controls -->
    <div class="flex items-center gap-4">
      <label class="text-white text-sm">Anchor Points:</label>
      <input
          type="number"
          v-model.number="pointCount"
          min="3"
          max="20"
          class="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-20"
      />
      <button @click="generatePolygonPoints" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">
        Generate
      </button>
    </div>

    <!-- Image Preview with clip-path applied -->
    <div class="relative w-full max-w-3xl mx-auto h-96 border border-gray-700 rounded overflow-hidden">
      <img
          ref="targetImage"
          src="https://picsum.photos/id/1015/800/500"
          alt="Preview"
          class="w-full h-full object-cover"
          :style="{ clipPath: polygonString }"
      />

      <!-- Draggable Points -->
      <div
          v-for="(point, index) in points"
          :key="index"
          class="w-4 h-4 rounded-full border-2 border-white absolute cursor-move"
          :style="getPointStyle(point)"
          @mousedown.prevent="startDrag(index, $event)"
      ></div>
    </div>

    <!-- Clip-path Code Output -->
    <div class="bg-gray-900 text-green-400 font-mono p-4 rounded border border-gray-700">
      <span class="text-white">clip-path:</span>
      polygon(
      {{ formattedPoints }}
      );
    </div>

    <!-- Buttons -->
    <div class="flex flex-wrap gap-4">
      <button @click="copyClipPath" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
        Copy CSS
      </button>
      <button @click="resetPoints" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow">
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

const targetImage = ref<HTMLElement | null>(null)
const draggingIndex = ref<number | null>(null)
const pointCount = ref(4) // default number of points

const points = reactive<Array<{ x: number; y: number }>>([])

function generatePolygonPoints() {
  points.splice(0, points.length)
  const center = { x: 50, y: 50 }
  const radius = 40
  for (let i = 0; i < pointCount.value; i++) {
    const angle = (i / pointCount.value) * 2 * Math.PI
    const x = center.x + radius * Math.cos(angle)
    const y = center.y + radius * Math.sin(angle)
    points.push({ x: Math.round(x), y: Math.round(y) })
  }
}

const polygonString = computed(() => {
  return `polygon(${formattedPoints.value})`
})

const formattedPoints = computed(() => {
  return points.map(p => `${p.x}% ${p.y}%`).join(', ')
})

function getPointStyle(point: { x: number; y: number }) {
  return {
    left: `calc(${point.x}% - 8px)`,
    top: `calc(${point.y}% - 8px)`,
    backgroundColor: '#10B981',
    zIndex: 10
  }
}

function startDrag(index: number, event: MouseEvent) {
  draggingIndex.value = index
  const onMouseMove = (e: MouseEvent) => {
    if (draggingIndex.value !== null && targetImage.value) {
      const rect = targetImage.value.getBoundingClientRect()
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
      points[draggingIndex.value] = { x: Math.round(x), y: Math.round(y) }
    }
  }
  const onMouseUp = () => {
    draggingIndex.value = null
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function copyClipPath() {
  navigator.clipboard.writeText(`clip-path: polygon(${formattedPoints.value});`)
  alert('Clip-path copied to clipboard!')
}

function resetPoints() {
  pointCount.value = 4
  generatePolygonPoints()
}

onMounted(() => {
  generatePolygonPoints()
})
</script>

<style scoped>
div[contenteditable="true"]:focus {
  outline: none;
}
</style>
