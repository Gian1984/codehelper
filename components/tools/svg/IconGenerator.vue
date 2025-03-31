<template>
  <div class="space-y-4 bg-gray-800 p-8 rounded-lg shadow p-8 mx-auto">
    <h2 class="text-2xl font-semibold text-white">SVG Icon Generator</h2>

    <!-- Color -->
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
      <button @click="drawSmallCircle" class="icon-btn">◦</button>
      <button @click="drawSmallRect" class="icon-btn">▫︎</button>

      <!-- Directional -->
      <button @click="drawChevronRight" class="icon-btn">›</button>
      <button @click="drawChevronLeft" class="icon-btn">‹</button>
      <button @click="drawChevronUp" class="icon-btn">˄</button>
      <button @click="drawChevronDown" class="icon-btn">˅</button>
      <button @click="drawArrowRight" class="icon-btn">→</button>
      <button @click="drawArrowLeft" class="icon-btn">←</button>
      <button @click="drawArrowUp" class="icon-btn">↑</button>
      <button @click="drawArrowDown" class="icon-btn">↓</button>
      <button @click="drawAngleUp" class="icon-btn">˄</button>
      <button @click="drawAngleDown" class="icon-btn">˅</button>
      <button @click="drawAngleRight" class="icon-btn">&gt;</button>
      <button @click="drawAngleLeft" class="icon-btn">&lt;</button>
      <button @click="drawDoubleAngleRight" class="icon-btn">»</button>
      <button @click="drawDoubleAngleLeft" class="icon-btn">«</button>

      <!-- Dots -->
      <button @click="drawVerticalDots" class="icon-btn">⋮</button>
      <button @click="drawHorizontalDots" class="icon-btn">⋯</button>

      <!-- Burger Icons -->
      <button @click="drawBurgerClassic" class="icon-btn">☰</button>
      <button @click="drawBurgerThin" class="icon-btn">≡</button>
      <button @click="drawBurgerOffset" class="icon-btn">☱</button>

      <!-- Additional UI icons -->
      <button @click="drawCloseIcon" class="icon-btn">X</button>
      <button @click="drawTrashIcon" class="icon-btn">🗑</button>
      <button @click="drawSearchIcon" class="icon-btn">🔍</button>
      <button @click="drawCheckIcon" class="icon-btn">✔️</button>


      <!-- Controls -->
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

const setupElement = (el: any, strokeOnly = false) => {
  el.attr({
    fill: strokeOnly ? 'none' : fillColor.value,
    stroke: strokeOnly ? fillColor.value : 'none',
    strokeWidth: strokeOnly ? 2 : 0,
    cursor: 'pointer'
  });

  el.click(() => {
    if (selectedShape) {
      selectedShape.attr({
        stroke: selectedShape.data('strokeOnly') ? fillColor.value : 'none',
        strokeWidth: selectedShape.data('strokeOnly') ? 2 : 0,
      });
    }
    selectedShape = el;
    el.attr({ stroke: '#00f', strokeWidth: strokeOnly ? 2 : 1 });
  });

  el.data('strokeOnly', strokeOnly);

  el.drag(
      function (dx, dy) {
        const type = el.type;
        if (type === 'circle') {
          const originX = parseFloat(el.data('originX')) || 0;
          const originY = parseFloat(el.data('originY')) || 0;
          el.attr({
            cx: snapToGrid(originX + dx),
            cy: snapToGrid(originY + dy)
          });
        } else if (type === 'rect') {
          const originX = parseFloat(el.data('originX')) || 0;
          const originY = parseFloat(el.data('originY')) || 0;
          el.attr({
            x: snapToGrid(originX + dx),
            y: snapToGrid(originY + dy)
          });
        } else {
          el.attr({
            transform: `translate(${snapToGrid(dx)}, ${snapToGrid(dy)})`
          });
        }
      },
      function () {
        const type = el.type;
        if (type === 'circle') {
          el.data('originX', el.attr('cx'));
          el.data('originY', el.attr('cy'));
        } else if (type === 'rect') {
          el.data('originX', el.attr('x'));
          el.data('originY', el.attr('y'));
        }
      },
      () => {}
  );
};


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

const drawSmallCircle = () => {
  const circle = snap.circle(32, 32, 2);  // radius 2 for 4x4 circle
  setupElement(circle);
  refreshPreview();
}

const drawSmallRect = () => {
  const rect = snap.rect(30, 30, 4, 4);  // positioned to be centered initially
  setupElement(rect);
  refreshPreview();
}


const drawPath = (d: string, strokeOnly = false) => {
  const path = snap.path(d);
  setupElement(path, strokeOnly);
  refreshPreview();
}

const drawChevronRight = () => drawPath('M24 16 L40 32 L24 48');
const drawChevronLeft = () => drawPath('M40 16 L24 32 L40 48');
const drawChevronUp = () => drawPath('M16 40 L32 24 L48 40');
const drawChevronDown = () => drawPath('M16 24 L32 40 L48 24');



const drawArrowRight = () => drawPath('M16 32 L44 16 V28 H56 V36 H44 V48 Z');
const drawArrowLeft = () => drawPath('M48 32 L20 16 V28 H8 V36 H20 V48 Z');
const drawArrowUp = () => drawPath('M32 48 L48 20 H36 V8 H28 V20 H16 Z');
const drawArrowDown = () => drawPath('M32 16 L48 44 H36 V56 H28 V44 H16 Z');




const drawAngleRight = () => drawPath('M16 16 L40 32 L16 48');
const drawAngleLeft = () => drawPath('M48 16 L24 32 L48 48');
const drawAngleUp = () => drawPath('M16 48 L32 24 L48 48');
const drawAngleDown = () => drawPath('M16 16 L32 40 L48 16');

const drawDoubleAngleRight = () => drawPath('M22 16 L34 32 L22 48 M34 16 L46 32 L34 48')
const drawDoubleAngleLeft = () => drawPath('M42 16 L30 32 L42 48 M30 16 L18 32 L30 48')

const drawVerticalDots = () => drawPath('M32 20 a2 2 0 1 0 0.1 0 M32 32 a2 2 0 1 0 0.1 0 M32 44 a2 2 0 1 0 0.1 0')
const drawHorizontalDots = () => drawPath('M20 32 a2 2 0 1 0 0.1 0 M32 32 a2 2 0 1 0 0.1 0 M44 32 a2 2 0 1 0 0.1 0')


const drawBurgerClassic = () => drawPath('M16 22 H48 M16 32 H48 M16 42 H48', true);
const drawBurgerThin = () => drawPath('M16 24 H48 M16 32 H48 M16 40 H48', true);
const drawBurgerOffset = () => drawPath('M16 20 H48 M24 32 H48 M32 44 H48', true);

const drawCloseIcon = () => drawPath('M20 20 L44 44 M44 20 L20 44', true);

const drawTrashIcon = () => drawPath('M20 24 H44 L40 48 H24 Z M28 24 V20 H36 V24', true);

const drawSearchIcon = () => drawPath('M40 40 L48 48 M28 40 A12 12 0 1 1 40 28 12 12 0 0 1 28 40 Z', true);

const drawCheckIcon = () => drawPath('M20 34 L28 42 L44 24', true);




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

