<template>
  <div class="space-y-4 bg-gray-800 p-6 rounded-lg shadow max-w-3xl mx-auto">
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
      <!-- Basic shapes -->
      <button @click="drawCircle" class="icon-btn">●</button>
      <button @click="drawRect" class="icon-btn">■</button>

      <!-- Directional -->
      <button @click="drawChevronRight" class="icon-btn">›</button>
      <button @click="drawChevronLeft" class="icon-btn">‹</button>
      <button @click="drawChevronUp" class="icon-btn">˄</button>
      <button @click="drawChevronDown" class="icon-btn">˅</button>
      <button @click="drawArrowRight" class="icon-btn">→</button>
      <button @click="drawArrowLeft" class="icon-btn">←</button>
      <button @click="drawArrowUp" class="icon-btn">↑</button>
      <button @click="drawArrowDown" class="icon-btn">↓</button>
      <button @click="drawAngleRight" class="icon-btn">&gt;</button>
      <button @click="drawAngleLeft" class="icon-btn">&lt;</button>
      <button @click="drawDoubleAngleRight" class="icon-btn">»</button>
      <button @click="drawDoubleAngleLeft" class="icon-btn">«</button>

      <!-- Dots -->
      <button @click="drawVerticalDots" class="icon-btn">⋮</button>
      <button @click="drawHorizontalDots" class="icon-btn">⋯</button>


      <!-- Controls -->
      <button @click="deleteSelected" class="icon-btn bg-red-600 hover:bg-red-500">Delete</button>
      <button @click="clearCanvas" class="icon-btn bg-yellow-600 hover:bg-yellow-500">Clear</button>
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
      <div class="text-sm text-center text-gray-400 pt-1">Output: 64x64 px</div>
    </div>

    <!-- Anteprima -->
    <div class="pt-4 text-center">
      <h3 class="text-white mb-2">Preview (1:1)</h3>
      <div class="inline-block border bg-white rounded p-2">
        <svg id="svgPreview" viewBox="0 0 64 64" width="64" height="64"></svg>
      </div>
    </div>

    <!-- Download Button -->
    <div class="pt-4 text-right">
      <button @click="exportSvg" class="bg-green-600 px-4 py-2 rounded hover:bg-green-500 text-white">Download SVG</button>
    </div>
  </div>
</template>

<style scoped>
.icon-btn {
  @apply bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-500 text-white;
}
</style>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const fillColor = ref('#000000')
const showGrid = ref(true)
let Snap: any
let snap: any
let previewSnap: any
let selectedShape: any = null

const validateColor = () => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(fillColor.value)) {
    fillColor.value = '#000000'
  }
}

const snapToGrid = (value: number, gridSize = 4) => Math.floor(value / gridSize) * gridSize

onMounted(async () => {
  await import('eve')
  const snapModule = await import('snapsvg')
  Snap = snapModule.default

  snap = Snap('#svgCanvas')
  previewSnap = Snap('#svgPreview')
  if (showGrid.value) drawGrid()
})

watch(showGrid, (val) => {
  if (val) {
    drawGrid()
  } else {
    const grid = snap.select('#grid')
    grid?.remove()
  }
})

const drawGrid = () => {
  const gridSize = 4
  const total = 64
  const grid = snap.group().attr({ id: 'grid' })
  for (let x = 0; x <= total; x += gridSize) {
    grid.add(snap.line(x, 0, x, total).attr({ stroke: '#eee', strokeWidth: 0.3 }))
  }
  for (let y = 0; y <= total; y += gridSize) {
    grid.add(snap.line(0, y, total, y).attr({ stroke: '#eee', strokeWidth: 0.3 }))
  }
  snap.append(grid)
}

const refreshPreview = () => {
  const elements = snap.selectAll('*').items.filter((el: any) => el.node.id !== 'grid')
  previewSnap.clear()
  elements.forEach((el: any) => previewSnap.append(el.clone()))
}

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

  el.drag(
      function (dx, dy) {
        const type = el.type
        if (type === 'circle') {
          const originX = parseFloat(el.data('originX')) || 0
          const originY = parseFloat(el.data('originY')) || 0
          el.attr({
            cx: snapToGrid(originX + dx),
            cy: snapToGrid(originY + dy)
          })
        } else if (type === 'rect') {
          const originX = parseFloat(el.data('originX')) || 0
          const originY = parseFloat(el.data('originY')) || 0
          el.attr({
            x: snapToGrid(originX + dx),
            y: snapToGrid(originY + dy)
          })
        }
      },
      function () {
        const type = el.type
        if (type === 'circle') {
          el.data('originX', el.attr('cx'))
          el.data('originY', el.attr('cy'))
        } else if (type === 'rect') {
          el.data('originX', el.attr('x'))
          el.data('originY', el.attr('y'))
        }
      },
      () => {}
  )
}

const drawCircle = () => {
  const circle = snap.circle(32, 32, 4)
  setupElement(circle)
  refreshPreview()
}

const drawRect = () => {
  const rect = snap.rect(28, 28, 8, 8)
  setupElement(rect)
  refreshPreview()
}

const drawPath = (d: string) => {
  const path = snap.path(d)
  setupElement(path)
  refreshPreview()
}

const drawChevronRight = () => drawPath('M26 20 L38 32 L26 44')
const drawChevronLeft = () => drawPath('M38 20 L26 32 L38 44')
const drawChevronUp = () => drawPath('M20 38 L32 26 L44 38')
const drawChevronDown = () => drawPath('M20 26 L32 38 L44 26')

const drawArrowRight = () => drawPath('M20 32 H44 M36 24 L44 32 L36 40')
const drawArrowLeft = () => drawPath('M44 32 H20 M28 24 L20 32 L28 40')
const drawArrowUp = () => drawPath('M32 44 V20 M24 28 L32 20 L40 28')
const drawArrowDown = () => drawPath('M32 20 V44 M24 36 L32 44 L40 36')

const drawAngleRight = () => drawPath('M24 16 L40 32 L24 48')
const drawAngleLeft = () => drawPath('M40 16 L24 32 L40 48')
const drawDoubleAngleRight = () => drawPath('M22 16 L34 32 L22 48 M34 16 L46 32 L34 48')
const drawDoubleAngleLeft = () => drawPath('M42 16 L30 32 L42 48 M30 16 L18 32 L30 48')

const drawVerticalDots = () => drawPath('M32 20 a2 2 0 1 0 0.1 0 M32 32 a2 2 0 1 0 0.1 0 M32 44 a2 2 0 1 0 0.1 0')
const drawHorizontalDots = () => drawPath('M20 32 a2 2 0 1 0 0.1 0 M32 32 a2 2 0 1 0 0.1 0 M44 32 a2 2 0 1 0 0.1 0')




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

