<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Mini Image Editor</h2>

    <!-- Uploader / Dropzone -->
    <div
        class="border-2 border-dashed border-gray-600 rounded p-6 text-center bg-gray-900 text-gray-300 cursor-pointer"
        @dragover.prevent
        @drop.prevent="onDrop"
        @click="fileInput?.click()"
    >
      <p class="mb-2">Drag & drop an image here, or click to select.</p>
      <p class="text-xs text-gray-400">PNG / JPEG / WebP, up to ~20MB.</p>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
    </div>

    <!-- keep canvases mounted to avoid null refs -->
    <div v-show="img.loaded" class="grid lg:grid-cols-2 gap-6">
      <!-- Canvas workspace -->
      <div class="space-y-3">
        <div ref="stageRef" class="relative inline-block border border-gray-700 rounded bg-black/30 overflow-hidden">
          <canvas ref="canvasRef" class="block"></canvas>

          <!-- Crop overlay (CSS pixels) -->
          <div
              v-show="crop.visible"
              class="absolute border-2 border-blue-500/90"
              :style="cropBoxStyle"
              @mousedown.stop="startDrag($event, 'move')"
          >
            <div
                v-for="h in handles"
                :key="h.key"
                class="absolute bg-blue-500 border border-white rounded-sm"
                :style="handleStyle(h)"
                @mousedown.stop="startDrag($event, h.key as any)"
            />
            <div class="absolute inset-0 pointer-events-none" style="box-shadow:0 0 0 9999px rgba(0,0,0,.45)"></div>
          </div>
        </div>

        <!-- quick controls -->
        <div class="flex flex-wrap gap-3">
          <button class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
                  :disabled="!crop.visible" @click="applyCrop">apply crop</button>
          <button class="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded" @click="download">download</button>
          <button class="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded disabled:opacity-50"
                  :disabled="!history.length" @click="undo">undo</button>
          <button class="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded" @click="resetAll">reset</button>
          <button class="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded" @click="toggleCrop">
            {{ crop.visible ? 'hide crop' : 'show crop' }}
          </button>
        </div>
      </div>

      <!-- Controls + Preview -->
      <div class="space-y-5">
        <!-- transform controls -->
        <div class="bg-gray-900 border border-gray-700 rounded p-4 space-y-3">
          <p class="text-white font-medium text-sm">transform</p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-xs mb-1">rotate (°)</label>
              <input type="number" v-model.number="state.rotate"
                     class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1" />
            </div>
            <div class="flex items-end gap-2">
              <label class="text-white text-xs">flip</label>
              <button class="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                      @click="state.flipX = !state.flipX">H</button>
              <button class="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                      @click="state.flipY = !state.flipY">V</button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white text-xs mb-1">output width (px)</label>
              <input type="number" min="1" v-model.number="state.outW"
                     class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1" />
            </div>
            <div>
              <label class="block text-white text-xs mb-1">output height (px)</label>
              <input type="number" min="1" v-model.number="state.outH"
                     class="w-full bg-gray-800 text-white border border-gray-600 rounded px-2 py-1" />
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input id="lockRatio" type="checkbox" v-model="state.lockRatio" />
            <label for="lockRatio" class="text-white text-xs">lock aspect ratio (output)</label>
          </div>
        </div>

        <!-- filters (inlined, no subcomponent) -->
        <div class="bg-gray-900 border border-gray-700 rounded p-4 space-y-3">
          <p class="text-white font-medium text-sm">filters</p>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-white text-xs">grayscale</label>
              <span class="text-gray-300 text-xs">{{ Math.round(filters.grayscale) }}</span>
            </div>
            <input type="range" min="0" max="100" step="1" v-model.number="filters.grayscale" class="w-full" />
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-white text-xs">brightness</label>
              <span class="text-gray-300 text-xs">{{ Math.round(filters.brightness) }}</span>
            </div>
            <input type="range" min="0" max="200" step="1" v-model.number="filters.brightness" class="w-full" />
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-white text-xs">contrast</label>
              <span class="text-gray-300 text-xs">{{ Math.round(filters.contrast) }}</span>
            </div>
            <input type="range" min="0" max="200" step="1" v-model.number="filters.contrast" class="w-full" />
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-white text-xs">saturation</label>
              <span class="text-gray-300 text-xs">{{ Math.round(filters.saturate) }}</span>
            </div>
            <input type="range" min="0" max="200" step="1" v-model.number="filters.saturate" class="w-full" />
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-white text-xs">sepia</label>
              <span class="text-gray-300 text-xs">{{ Math.round(filters.sepia) }}</span>
            </div>
            <input type="range" min="0" max="100" step="1" v-model.number="filters.sepia" class="w-full" />
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-white text-xs">hue</label>
              <span class="text-gray-300 text-xs">{{ Math.round(filters.hue) }}</span>
            </div>
            <input type="range" min="0" max="360" step="1" v-model.number="filters.hue" class="w-full" />
          </div>

          <div class="flex flex-wrap gap-2">
            <button class="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded" @click="preset('none')">none</button>
            <button class="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded" @click="preset('bw')">b&w</button>
            <button class="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded" @click="preset('punch')">punch</button>
            <button class="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded" @click="preset('warm')">warm</button>
            <button class="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded" @click="preset('cool')">cool</button>
          </div>
        </div>

        <!-- crop + result preview -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-white text-sm mb-2">crop preview</p>
            <div class="border border-gray-700 rounded overflow-hidden bg-black/30">
              <canvas ref="cropPreviewRef" class="block"></canvas>
            </div>
          </div>
          <div>
            <p class="text-white text-sm mb-2">final output preview</p>
            <div class="border border-gray-700 rounded overflow-hidden bg-black/30">
              <canvas ref="outputRef" class="block"></canvas>
            </div>
            <p class="text-xs text-gray-400 mt-2">
              {{ state.outW }}×{{ state.outH }} • {{ estimatedSizePretty }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <p v-show="!img.loaded" class="text-xs text-gray-400">tip: draw a marquee to start a crop (click-drag on the image).</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

type ImgData = { el: HTMLImageElement | null; loaded: boolean; naturalW: number; naturalH: number; url: string | null }
const img = reactive<ImgData>({ el: null, loaded: false, naturalW: 0, naturalH: 0, url: null })

const fileInput = ref<HTMLInputElement | null>(null)
const stageRef   = ref<HTMLDivElement | null>(null)
const canvasRef  = ref<HTMLCanvasElement | null>(null)
const cropPreviewRef = ref<HTMLCanvasElement | null>(null)
const outputRef  = ref<HTMLCanvasElement | null>(null)

const MAX_W = 1200
const MAX_H = 800

const state = reactive({ rotate: 0, flipX: false, flipY: false, lockRatio: true, outW: 0, outH: 0 })
const filters = reactive({ grayscale: 0, brightness: 100, contrast: 100, saturate: 100, sepia: 0, hue: 0 })

/* undo history */
const history = reactive<string[]>([])
function pushHistory() { const c = canvasRef.value; if (!c) return; try { history.push(c.toDataURL('image/png')); if (history.length > 10) history.shift() } catch {} }
function undo() { if (!history.length) return; const last = history.pop()!; loadFromDataURL(last, true) }

/* crop state (CSS px) */
const crop = reactive({ visible: false, x: 0, y: 0, w: 0, h: 0 })
let dragging = false as boolean
let dragMode: 'move' | 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null = null
let dragStart = { x: 0, y: 0, cx: 0, cy: 0, cw: 0, ch: 0 }

const handles = [
  { key: 'nw', x: 0, y: 0, cursor: 'nwse-resize' },
  { key: 'n',  x: .5, y: 0, cursor: 'ns-resize' },
  { key: 'ne', x: 1, y: 0, cursor: 'nesw-resize' },
  { key: 'w',  x: 0, y: .5, cursor: 'ew-resize' },
  { key: 'e',  x: 1, y: .5, cursor: 'ew-resize' },
  { key: 'sw', x: 0, y: 1, cursor: 'nesw-resize' },
  { key: 's',  x: .5, y: 1, cursor: 'ns-resize' },
  { key: 'se', x: 1, y: 1, cursor: 'nwse-resize' },
] as const

const cropBoxStyle = computed(() => ({
  left: crop.x + 'px',
  top: crop.y + 'px',
  width: Math.max(1, crop.w) + 'px',
  height: Math.max(1, crop.h) + 'px',
  cursor: 'move',
}))
function handleStyle(h: any) {
  const size = 10
  const left = crop.x + h.x * crop.w - size / 2
  const top  = crop.y + h.y * crop.h - size / 2
  return { left: left + 'px', top: top + 'px', width: size + 'px', height: size + 'px', cursor: h.cursor }
}

/* DPR helper (SSR-safe) */
function dpr() { return typeof window === 'undefined' ? 1 : Math.max(1, window.devicePixelRatio || 1) }

/* set canvas CSS size + backing resolution */
function setCanvasSize(naturalW: number, naturalH: number) {
  const c = canvasRef.value!
  const stage = stageRef.value!
  const scale = Math.min(MAX_W / naturalW, MAX_H / naturalH, 1)
  const cssW = Math.round(naturalW * scale)
  const cssH = Math.round(naturalH * scale)

  stage.style.width = cssW + 'px'
  stage.style.height = cssH + 'px'
  c.style.width = cssW + 'px'
  c.style.height = cssH + 'px'

  const ratio = dpr()
  c.width  = Math.round(cssW * ratio)
  c.height = Math.round(cssH * ratio)
}

/* load file */
async function loadFile(file: File) {
  const url = URL.createObjectURL(file)
  const el = new Image()
  el.onload = async () => {
    img.el = el; img.loaded = true; img.naturalW = el.naturalWidth; img.naturalH = el.naturalHeight; img.url = url
    await nextTick()
    setCanvasSize(img.naturalW, img.naturalH)
    state.outW = img.naturalW; state.outH = img.naturalH
    draw(); drawOutputPreview()
  }
  el.onerror = () => { URL.revokeObjectURL(url); alert('could not load image') }
  el.src = url
}

/* draw main canvas */
function draw() {
  const c = canvasRef.value, ctx = c?.getContext('2d')
  if (!c || !ctx || !img.el) return
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, c.width, c.height)

  const ratio = dpr()
  ctx.scale(ratio, ratio)

  ctx.filter = cssFilterString.value

  const cssW = c.width / ratio, cssH = c.height / ratio
  ctx.save()
  ctx.translate(cssW / 2, cssH / 2)
  ctx.rotate((state.rotate * Math.PI) / 180)
  ctx.scale(state.flipX ? -1 : 1, state.flipY ? -1 : 1)
  ctx.drawImage(img.el, -cssW / 2, -cssH / 2, cssW, cssH)
  ctx.restore()
}

/* crop preview */
function drawCropPreview() {
  const cp = cropPreviewRef.value, ctx = cp?.getContext('2d')
  const c = canvasRef.value
  if (!cp || !ctx || !c) return

  const ratio = dpr()
  const sw = Math.max(1, Math.round(crop.w * ratio))
  const sh = Math.max(1, Math.round(crop.h * ratio))
  cp.width = sw; cp.height = sh
  cp.style.width = Math.round(crop.w) + 'px'
  cp.style.height = Math.round(crop.h) + 'px'
  ctx.clearRect(0, 0, sw, sh)

  if (!crop.visible || !img.el) return
  const mctx = c.getContext('2d')!
  const sx = Math.round(crop.x * ratio)
  const sy = Math.round(crop.y * ratio)
  const data = mctx.getImageData(sx, sy, sw, sh)
  ctx.putImageData(data, 0, 0)
}

/* apply crop */
function applyCrop() {
  if (!crop.visible || !img.el) return
  pushHistory()

  const c = canvasRef.value!, mctx = c.getContext('2d')!
  const ratio = dpr()
  const sx = Math.round(crop.x * ratio), sy = Math.round(crop.y * ratio)
  const sw = Math.round(crop.w * ratio), sh = Math.round(crop.h * ratio)
  const sub = mctx.getImageData(sx, sy, sw, sh)

  const out = document.createElement('canvas')
  out.width = sw; out.height = sh
  out.getContext('2d')!.putImageData(sub, 0, 0)
  const url = out.toDataURL('image/png')
  loadFromDataURL(url)
  crop.visible = false
}

/* reload from dataURL */
async function loadFromDataURL(url: string, skipHistory = false) {
  const el = new Image()
  el.onload = async () => {
    img.el = el; img.loaded = true; img.naturalW = el.naturalWidth; img.naturalH = el.naturalHeight; img.url = url
    await nextTick()
    setCanvasSize(img.naturalW, img.naturalH)
    state.rotate = 0; state.flipX = false; state.flipY = false
    state.outW = img.naturalW; state.outH = img.naturalH
    draw(); drawOutputPreview(); drawCropPreview()
  }
  el.src = url
  if (!skipHistory) pushHistory()
}

/* crop ui */
function toggleCrop() {
  const c = canvasRef.value!
  if (!crop.visible) {
    const s = Math.min(c.clientWidth, c.clientHeight) * 0.6
    crop.w = s; crop.h = s; crop.x = (c.clientWidth - s) / 2; crop.y = (c.clientHeight - s) / 2
    crop.visible = true
  } else {
    crop.visible = false
  }
  drawCropPreview()
}
function startDrag(e: MouseEvent, mode: typeof dragMode) {
  dragging = true; dragMode = mode
  dragStart = { x: e.clientX, y: e.clientY, cx: crop.x, cy: crop.y, cw: crop.w, ch: crop.h }
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', endDrag)
}
function onDrag(e: MouseEvent) {
  if (!dragging) return
  const dx = e.clientX - dragStart.x
  const dy = e.clientY - dragStart.y
  const c = canvasRef.value!
  const W = c.clientWidth, H = c.clientHeight
  const min = 10
  if (dragMode === 'move') {
    crop.x = clamp(dragStart.cx + dx, 0, W - crop.w)
    crop.y = clamp(dragStart.cy + dy, 0, H - crop.h)
  } else {
    let x = dragStart.cx, y = dragStart.cy, w = dragStart.cw, h = dragStart.ch
    if (dragMode?.includes('e')) w = clamp(dragStart.cw + dx, min, W - x)
    if (dragMode?.includes('s')) h = clamp(dragStart.ch + dy, min, H - y)
    if (dragMode?.includes('w')) { const nx = clamp(dragStart.cx + dx, 0, dragStart.cx + dragStart.cw - min); w = dragStart.cw + (dragStart.cx - nx); x = nx }
    if (dragMode?.includes('n')) { const ny = clamp(dragStart.cy + dy, 0, dragStart.cy + dragStart.ch - min); h = dragStart.ch + (dragStart.cy - ny); y = ny }
    crop.x = x; crop.y = y; crop.w = w; crop.h = h
  }
  drawCropPreview()
}
function endDrag() {
  dragging = false; dragMode = null
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', endDrag)
}

/* output preview */
function drawOutputPreview() {
  const out = outputRef.value, ctx = out?.getContext('2d')
  const main = canvasRef.value
  if (!out || !ctx || !main) return
  out.style.width  = '100%'
  out.width  = Math.max(1, state.outW)
  out.height = Math.max(1, state.outH)
  out.style.aspectRatio = `${state.outW}/${state.outH}`
  ctx.clearRect(0, 0, out.width, out.height)
  ctx.drawImage(main, 0, 0, out.width, out.height)
}

/* helpers */
const cssFilterString = computed(() =>
    `grayscale(${filters.grayscale}%) brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) sepia(${filters.sepia}%) hue-rotate(${filters.hue}deg)`
)
watch(
    () => [state.rotate, state.flipX, state.flipY, filters.grayscale, filters.brightness, filters.contrast, filters.saturate, filters.sepia, filters.hue],
    () => { draw(); drawCropPreview(); drawOutputPreview() }
)
watch(
    () => [state.outW, state.outH, state.lockRatio],
    ([w, h]) => {
      if (!img.el) return
      state.outW = clamp(state.outW || img.naturalW, 1, 10000)
      state.outH = clamp(state.outH || img.naturalH, 1, 10000)
      if (state.lockRatio) {
        const r = img.naturalW / img.naturalH
        if (w !== undefined) state.outH = Math.round(state.outW / r)
        else state.outW = Math.round(state.outH * r)
      }
      drawOutputPreview()
    }
)

function prettySize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB']; let i = 0, n = bytes
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++ }
  return `${n.toFixed(2)} ${units[i]}`
}
const estimatedSize = computed(() => Math.round(state.outW * state.outH * 4 * 0.35))
const estimatedSizePretty = computed(() => prettySize(estimatedSize.value))

function download() {
  const out = outputRef.value
  if (!out) return
  out.toBlob((blob) => {
    if (!blob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'edited.png'
    a.click()
    URL.revokeObjectURL(a.href)
  }, 'image/png')
}
function resetAll() {
  if (!img.url) return
  loadFromDataURL(img.url)
  Object.assign(filters, { grayscale: 0, brightness: 100, contrast: 100, saturate: 100, sepia: 0, hue: 0 })
  crop.visible = false
  history.splice(0, history.length)
}
function onFileChange(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (f) loadFile(f)
}
function onDrop(e: DragEvent) {
  const f = e.dataTransfer?.files?.[0]
  if (f) loadFile(f)
}
function onKey(e: KeyboardEvent) {
  if (!crop.visible) return
  const step = e.shiftKey ? 10 : 1
  const c = canvasRef.value!
  if (e.key === 'ArrowLeft') { crop.x = Math.max(0, crop.x - step) }
  if (e.key === 'ArrowRight'){ crop.x = Math.min(c.clientWidth - crop.w, crop.x + step) }
  if (e.key === 'ArrowUp')   { crop.y = Math.max(0, crop.y - step) }
  if (e.key === 'ArrowDown') { crop.y = Math.min(c.clientHeight - crop.h, crop.y + step) }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo() }
  drawCropPreview()
}
function clamp(n: number, a: number, b: number) { return Math.min(b, Math.max(a, n)) }

onMounted(() => {
  window.addEventListener('keydown', onKey)
  ;[canvasRef, cropPreviewRef, outputRef].forEach(r => { if (r.value) { r.value.width = 10; r.value.height = 10 } })
})
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey) })
</script>

<style scoped>
[style*="cursor:nwse-resize"], [style*="cursor:nesw-resize"],
[style*="cursor:ew-resize"], [style*="cursor:ns-resize"] {
  width: 12px !important;
  height: 12px !important;
}
</style>




