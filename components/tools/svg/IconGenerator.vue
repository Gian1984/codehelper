<template>
  <div class="space-y-4 bg-gray-800 p-6 rounded-lg shadow p-8 mx-auto">
    <h2 class="text-2xl font-semibold text-white">SVG Icon Generator</h2>

    <!-- Colore -->
    <label class="block">
      <span class="text-gray-300">Colore</span>
      <div class="flex items-center space-x-2">
        <input v-model="fillColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="fillColor"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateColor"
        />
      </div>
    </label>

    <!-- Toolbar -->
    <div class="flex flex-wrap gap-2">
      <button @click="drawCircle" class="bg-indigo-600 px-4 py-2 rounded text-white">Circle</button>
      <button @click="drawRect" class="bg-indigo-600 px-4 py-2 rounded text-white">Rectangle</button>
      <button @click="drawChevronRight" class="bg-indigo-600 px-4 py-2 rounded text-white">Chevron →</button>
      <button @click="drawChevronLeft" class="bg-indigo-600 px-4 py-2 rounded text-white">Chevron ←</button>
      <button @click="drawChevronUp" class="bg-indigo-600 px-4 py-2 rounded text-white">Chevron ↑</button>
      <button @click="drawChevronDown" class="bg-indigo-600 px-4 py-2 rounded text-white">Chevron ↓</button>
      <button @click="drawArrowUp" class="bg-gray-700 px-4 py-2 rounded text-white">↑</button>
      <button @click="drawArrowDown" class="bg-gray-700 px-4 py-2 rounded text-white">↓</button>
      <button @click="drawArrowLeft" class="bg-gray-700 px-4 py-2 rounded text-white">←</button>
      <button @click="drawArrowRight" class="bg-gray-700 px-4 py-2 rounded text-white">→</button>
      <button @click="drawFacebookF" class="bg-blue-600 px-4 py-2 rounded text-white">Facebook</button>
      <button @click="drawInstagram" class="bg-pink-600 px-4 py-2 rounded text-white">Instagram</button>
      <button @click="drawTwitter" class="bg-sky-500 px-4 py-2 rounded text-white">Twitter</button>
      <button @click="drawLinkedIn" class="bg-blue-700 px-4 py-2 rounded text-white">LinkedIn</button>
      <button @click="drawYoutube" class="bg-red-700 px-4 py-2 rounded text-white">YouTube</button>
      <button @click="deleteSelected" class="bg-red-600 px-4 py-2 rounded text-white">Delete</button>
      <button @click="clearCanvas" class="bg-yellow-600 px-4 py-2 rounded text-white">Clear</button>
    </div>

    <!-- Toggle Grid -->
    <div class="pt-2">
      <label class="inline-flex items-center space-x-2">
        <input type="checkbox" v-model="showGrid" class="form-checkbox rounded text-indigo-600" />
        <span class="text-white">Mostra griglia</span>
      </label>
    </div>

    <!-- SVG Canvas -->
    <div class="border border-gray-500 rounded bg-white overflow-hidden">
      <svg
          id="svgCanvas"
          viewBox="0 0 64 64"
          width="256"
          height="256"
          class="block mx-auto"
          xmlns="http://www.w3.org/2000/svg"
      ></svg>
    </div>

    <!-- Anteprima -->
    <div class="pt-4 text-center">
      <h3 class="text-white mb-2">Anteprima (1:1)</h3>
      <div class="inline-block border bg-white rounded p-2">
        <svg id="svgPreview" viewBox="0 0 64 64" width="64" height="64"></svg>
      </div>
    </div>

    <!-- Download Button -->
    <div class="pt-4 text-right">
      <button @click="exportSvg" class="bg-green-600 px-4 py-2 rounded text-white">Download SVG</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const fillColor = ref('#ff0000')
const showGrid = ref(true)
let Snap: any
let snap: any
let previewSnap: any
let selectedShape: any = null
let gridLayer: any = null
const CANVAS_SIZE = 64
const GRID_SIZE = 4

const validateColor = () => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(fillColor.value)) {
    fillColor.value = '#000000'
  }
}

const snapToGrid = (value: number, gridSize = GRID_SIZE) => Math.floor(value / gridSize) * gridSize

onMounted(async () => {
  await import('eve')
  const snapModule = await import('snapsvg')
  Snap = snapModule.default

  snap = Snap('#svgCanvas')
  previewSnap = Snap('#svgPreview')

  if (showGrid.value) drawGrid()
})

watch(showGrid, (val) => {
  if (val) drawGrid()
  else snap.select('#grid')?.remove()
})

const drawGrid = () => {
  const total = CANVAS_SIZE
  gridLayer = snap.group()
  gridLayer.attr({ id: 'grid' })
  for (let x = 0; x <= total; x += GRID_SIZE) {
    const vLine = snap.line(x, 0, x, total).attr({ stroke: '#ddd', strokeWidth: 0.5 })
    gridLayer.add(vLine)
  }
  for (let y = 0; y <= total; y += GRID_SIZE) {
    const hLine = snap.line(0, y, total, y).attr({ stroke: '#ddd', strokeWidth: 0.5 })
    gridLayer.add(hLine)
  }
}

const refreshPreview = () => {
  const content = snap.selectAll('*').clone()
  previewSnap.clear()
  previewSnap.append(content)
}

const drawPath = (d: string) => {
  const path = snap.path(d)
  path.attr({
    fill: fillColor.value,
    transform: `scale(${CANVAS_SIZE / 64}) translate(${(64 - CANVAS_SIZE) / 2}, ${(64 - CANVAS_SIZE) / 2})`
  })
  setupElement(path)
  refreshPreview()
}

const drawCircle = () => {
  const circle = snap.circle(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 4)
  setupElement(circle)
  refreshPreview()
}

const drawRect = () => {
  const rect = snap.rect(4, 4, CANVAS_SIZE - 8, CANVAS_SIZE - 8)
  setupElement(rect)
  refreshPreview()
}

const drawChevronRight = () => drawPath("M20 16 L32 32 L20 48")
const drawChevronLeft = () => drawPath("M44 16 L32 32 L44 48")
const drawChevronUp = () => drawPath("M16 44 L32 32 L48 44")
const drawChevronDown = () => drawPath("M16 20 L32 32 L48 20")

const drawArrowUp = () => drawPath("M32 12 L20 32 H28 V52 H36 V32 H44 Z")
const drawArrowDown = () => drawPath("M32 52 L44 32 H36 V12 H28 V32 H20 Z")
const drawArrowLeft = () => drawPath("M12 32 L32 20 V28 H52 V36 H32 V44 Z")
const drawArrowRight = () => drawPath("M52 32 L32 44 V36 H12 V28 H32 V20 Z")

const drawFacebookF = () => drawPath("M36 12h-8c-6.6 0-12 5.4-12 12v8h-8v12h8v24h16V44h10l2-12h-12v-6c0-1.1.9-2 2-2h10V12z")
const drawInstagram = () => drawPath("M16 12h32a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4zm16 10a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm13-3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z")
const drawTwitter = () => drawPath("M54 16.1a20 20 0 0 1-5.8 1.6 10 10 0 0 0 4.4-5.6 20 20 0 0 1-6.3 2.4 10 10 0 0 0-17 9.1A28 28 0 0 1 12.4 14a10 10 0 0 0 3.1 13.3 10 10 0 0 1-4.6-1.3v.1a10 10 0 0 0 8 9.8 10 10 0 0 1-4.5.2 10 10 0 0 0 9.3 6.9A20 20 0 0 1 10 50a28 28 0 0 0 15.1 4.4c18.1 0 28-15 28-28v-1.3a20 20 0 0 0 4.9-5.1z")
const drawLinkedIn = () => drawPath("M16 16h10v32H16zm5-5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm11 5h9v5.3h.1a9.9 9.9 0 0 1 9-5c9.7 0 11 6.4 11 14.7V48H51V36.1c0-2.8-.1-6.5-4-6.5s-4.6 3-4.6 6.3V48H32V16z")
const drawYoutube = () => drawPath("M58 20a6 6 0 0 0-4.2-4.2C49 14 32 14 32 14s-17 0-21.8 1.8A6 6 0 0 0 6 20c-1.8 4.7-1.8 14-1.8 14s0 9.3 1.8 14a6 6 0 0 0 4.2 4.2C15 50 32 50 32 50s17 0 21.8-1.8A6 6 0 0 0 58 48c1.8-4.7 1.8-14 1.8-14s0-9.3-1.8-14zM26 40V24l16 8-16 8z")

const setupElement = (el: any) => {
  el.attr({
    fill: el.type !== 'line' ? fillColor.value : 'none',
    stroke: 'none',
    strokeWidth: 0,
    cursor: 'pointer'
  })

  el.click(() => {
    if (selectedShape) selectedShape.attr({ stroke: 'none' })
    selectedShape = el
    el.attr({ stroke: '#00f', strokeWidth: 1 })
  })
}

const deleteSelected = () => {
  if (selectedShape) {
    selectedShape.remove()
    selectedShape = null
    refreshPreview()
  }
}

const clearCanvas = () => {
  snap.selectAll('*').forEach((el: any) => el.remove())
  if (showGrid.value) drawGrid()
  refreshPreview()
}

const exportSvg = () => {
  const grid = snap.select('#grid')
  grid?.remove()
  const svgContent = snap.toString()
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'icon.svg'
  link.click()
  if (showGrid.value) drawGrid()
  refreshPreview()
}
</script>
