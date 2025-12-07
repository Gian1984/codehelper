<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card">
      <h2 class="text-2xl font-semibold">🖼️ Mini Image Editor</h2>
      <p class="text-sm text-gray-400 mt-1">Edit images with filters, crop, rotate, and export in multiple formats</p>
    </div>

    <!-- Dropzone -->
    <div
        class="card border-2 border-dashed border-gray-600 hover:border-indigo-500 transition-colors text-center cursor-pointer"
        @dragover.prevent
        @drop.prevent="onDrop"
        @click="fileInput?.click()"
    >
      <div class="text-6xl mb-4">🖼️</div>
      <p class="mb-2 text-lg text-gray-200">Drag & drop an image here, or click to select</p>
      <p class="text-sm text-gray-400">PNG / JPEG / WebP, up to ~20MB</p>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
    </div>

    <!-- Workspace + Controls -->
    <div v-show="img.loaded" class="space-y-6">

      <!-- TOP ROW: Editing Controls (Filters & Presets) -->
      <div class="card">
        <p class="text-white font-medium text-sm mb-4">✨ Editing Controls</p>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Filter Intensity & Presets -->
          <div class="space-y-4">
            <div>
              <p class="text-white text-xs font-medium mb-2">Filter Intensity</p>
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-gray-400 text-xs">Global strength</span>
                  <span class="text-indigo-400 text-xs font-medium">{{ filterIntensity }}%</span>
                </div>
                <input type="range" min="0" max="100" step="1" v-model.number="filterIntensity" class="w-full" />
                <p class="text-xs text-gray-500 italic">0% = original, 100% = full filters</p>
              </div>
            </div>

            <div>
              <p class="text-white text-xs font-medium mb-2">Quick Presets</p>
              <div class="space-y-2">
                <!-- Basic Presets -->
                <div class="flex flex-wrap gap-1.5">
                  <button class="btn btn-xs" @click="preset('none')">none</button>
                  <button class="btn btn-xs" @click="preset('bw')">b&w</button>
                  <button class="btn btn-xs" @click="preset('punch')">punch</button>
                  <button class="btn btn-xs" @click="preset('warm')">warm</button>
                  <button class="btn btn-xs" @click="preset('cool')">cool</button>
                </div>
                <!-- Instagram-style Presets -->
                <div class="pt-1 border-t border-gray-700">
                  <p class="text-gray-500 text-xs mb-1.5 italic">Instagram-inspired</p>
                  <div class="flex flex-wrap gap-1.5">
                    <button class="btn-preset" @click="preset('clarendon')">clarendon</button>
                    <button class="btn-preset" @click="preset('gingham')">gingham</button>
                    <button class="btn-preset" @click="preset('juno')">juno</button>
                    <button class="btn-preset" @click="preset('lark')">lark</button>
                    <button class="btn-preset" @click="preset('ludwig')">ludwig</button>
                    <button class="btn-preset" @click="preset('valencia')">valencia</button>
                    <button class="btn-preset" @click="preset('hudson')">hudson</button>
                    <button class="btn-preset" @click="preset('toaster')">toaster</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Individual Filters -->
          <div class="space-y-2">
            <p class="text-white text-xs font-medium mb-2">Individual Filters</p>
            <div class="space-y-1" v-for="row in sliderRows" :key="row.key">
              <div class="flex items-center justify-between">
                <label class="text-gray-400 text-xs">{{ row.label }}</label>
                <span class="text-gray-300 text-xs font-mono">{{ Math.round(filters[row.key]) }}</span>
              </div>
              <input type="range" :min="row.min" :max="row.max" step="1" v-model.number="filters[row.key]" class="w-full" />
            </div>
          </div>
        </div>
      </div>

      <!-- MIDDLE: Image Viewer -->
      <div class="space-y-3">
        <div class="relative overflow-auto rounded border border-gray-700 bg-black/20" style="max-height:70vh">
          <div
              ref="stageRef"
              class="relative inline-block bg-black/30 overflow-hidden"
              :style="stageStyle"
          >
            <!-- Main canvas -->
            <canvas ref="canvasRef" class="block"></canvas>

            <!-- Crop overlay -->
            <div
                v-show="crop.visible"
                class="absolute pointer-events-auto border-2 border-blue-500/90"
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
        </div>

        <!-- Zoom Controls -->
        <div class="card flex flex-wrap items-center justify-center gap-3">
          <span class="text-xs text-gray-400">Zoom:</span>
          <button class="btn btn-xs" @click="nudgeZoom(-0.1)">−</button>
          <input type="range" min="0.25" max="3" step="0.05" v-model.number="zoom.value" class="w-48" />
          <button class="btn btn-xs" @click="nudgeZoom(0.1)">+</button>
          <button class="btn btn-xs" @click="setZoom(1)">100%</button>
          <span class="text-xs text-gray-300 font-mono">{{ Math.round(zoom.value * 100) }}%</span>
        </div>
      </div>

      <!-- BOTTOM ROW: Output Controls (Transform, Crop Actions, Export) -->
      <div class="card">
        <p class="text-white font-medium text-sm mb-4">💾 Output Controls</p>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Transform -->
          <div class="space-y-3">
            <p class="text-white text-xs font-medium">Transform & Size</p>
            <div class="space-y-2">
              <div>
                <label class="label">rotate (°)</label>
                <input type="number" v-model.number="state.rotate" class="input" />
              </div>
              <div class="flex items-center gap-2">
                <label class="text-gray-400 text-xs">flip</label>
                <button class="btn btn-xs" @click="state.flipX = !state.flipX">H</button>
                <button class="btn btn-xs" @click="state.flipY = !state.flipY">V</button>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="label">width</label>
                  <input type="number" min="1" v-model.number="state.outW" class="input" />
                </div>
                <div>
                  <label class="label">height</label>
                  <input type="number" min="1" v-model.number="state.outH" class="input" />
                </div>
              </div>
              <div class="flex items-center gap-2">
                <input id="lockRatio" type="checkbox" v-model="state.lockRatio" class="w-4 h-4" />
                <label for="lockRatio" class="text-gray-400 text-xs">lock aspect ratio</label>
              </div>
            </div>
          </div>

          <!-- Crop Actions & History -->
          <div class="space-y-3">
            <p class="text-white text-xs font-medium">Crop & History</p>
            <div class="flex flex-col gap-2">
              <button class="btn" @click="toggleCrop">
                {{ crop.visible ? '✕ hide crop' : '✂️ show crop' }}
              </button>
              <button class="btn-info" :disabled="!crop.visible" @click="applyCrop">
                ✓ apply crop
              </button>
              <button class="btn-warning" :disabled="!history.length" @click="undo">
                ↶ undo
              </button>
              <button class="btn-danger" @click="resetAll">
                ⟲ reset all
              </button>
            </div>
          </div>

          <!-- Export -->
          <div class="space-y-3">
            <p class="text-white text-xs font-medium">Export Settings</p>
            <div class="space-y-2">
              <div>
                <label class="label">file name</label>
                <input type="text" v-model="exp.name" placeholder="edited-image" class="input" />
              </div>
              <div>
                <label class="label">format</label>
                <select v-model="exp.format" class="input">
                  <option value="image/png">PNG (lossless)</option>
                  <option value="image/jpeg">JPEG</option>
                  <option :disabled="!exp.webpSupported" value="image/webp">WebP</option>
                </select>
              </div>
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="text-gray-400 text-xs">quality</label>
                  <span class="text-gray-300 text-xs">{{ Math.round(exp.quality * 100) }}%</span>
                </div>
                <input type="range" min="0.1" max="1" step="0.01" v-model.number="exp.quality"
                       class="w-full" :disabled="exp.format === 'image/png'" />
              </div>
              <div class="flex items-center justify-between text-xs text-gray-400 pt-1">
                <span>size:</span>
                <span class="font-mono">{{ exp.size ? prettySize(exp.size) : '—' }}</span>
              </div>
              <div class="flex gap-2 pt-2">
                <button class="flex-1 btn-success" :disabled="!exp.url" @click="download">
                  ⬇ download
                </button>
                <button class="btn" @click="refreshEncoded()">⟳</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Output Preview (full width below) -->
        <div class="mt-6 pt-4 border-t border-gray-700">
          <p class="text-gray-400 text-xs mb-2">Final Output Preview <span class="text-gray-500">({{ state.outW }}×{{ state.outH }})</span></p>
          <div class="border border-gray-700 rounded overflow-hidden bg-black/30 max-w-2xl mx-auto">
            <canvas ref="outputRef" class="block w-full"></canvas>
          </div>
        </div>
      </div>
    </div>

    <p v-show="!img.loaded" class="text-xs text-gray-400">Tip: click-drag on the image to show a crop box.</p>
    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick, type CSSProperties } from 'vue'

/* ---------- Types for Volar ---------- */
type FilterKey = 'grayscale' | 'brightness' | 'contrast' | 'saturate' | 'sepia' | 'hue'
type HandleKey  = 'nw' | 'n' | 'ne' | 'w' | 'e' | 'sw' | 's' | 'se'
type DragMode   = 'move' | HandleKey
interface Handle { key: HandleKey; x: number; y: number; cursor: string }

/* ---------- Image state ---------- */
type ImgData = { el: HTMLImageElement | null; loaded: boolean; naturalW: number; naturalH: number; url: string | null }
const img = reactive<ImgData>({ el: null, loaded: false, naturalW: 0, naturalH: 0, url: null })

/* Refs */
const fileInput = ref<HTMLInputElement | null>(null)
const stageRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const outputRef = ref<HTMLCanvasElement | null>(null)

/* Stage constraints (base fit before zoom; CSS px) */
const MAX_W = 1200
const MAX_H = 800

/* Zoom */
const zoom = reactive({ value: 1 })
const baseStageW = ref(10)
const baseStageH = ref(10)
const stageW = ref(10)
const stageH = ref(10)
const stageStyle = computed<CSSProperties>(() => ({ width: `${stageW.value}px`, height: `${stageH.value}px` }))
function setZoom(v: number) { zoom.value = clamp(v, 0.25, 3) }
function nudgeZoom(d: number) { setZoom(zoom.value + d) }

/* Output transform state */
const state = reactive({ rotate: 0, flipX: false, flipY: false, lockRatio: true, outW: 0, outH: 0 })

/* Filters */
const filters = reactive<Record<FilterKey, number>>({
  grayscale: 0, brightness: 100, contrast: 100, saturate: 100, sepia: 0, hue: 0
})
const filterIntensity = ref(100) // Global filter intensity: 0-100%
const sliderRows: Array<{ key: FilterKey; label: string; min: number; max: number }> = [
  { key: 'grayscale', label: 'grayscale', min: 0, max: 100 },
  { key: 'brightness', label: 'brightness', min: 0, max: 200 },
  { key: 'contrast',   label: 'contrast',   min: 0, max: 200 },
  { key: 'saturate',   label: 'saturation', min: 0, max: 200 },
  { key: 'sepia',      label: 'sepia',      min: 0, max: 100 },
  { key: 'hue',        label: 'hue',        min: 0, max: 360 },
]

/* Export options */
const exp = reactive({
  name: 'edited',
  format: 'image/png' as 'image/png' | 'image/jpeg' | 'image/webp',
  quality: 0.9,
  webpSupported: true,
  url: null as string | null,
  size: 0,
})

/* Undo history */
const history = reactive<string[]>([])
function pushHistory() { const c = canvasRef.value; if (!c) return; try { history.push(c.toDataURL('image/png')); if (history.length > 10) history.shift() } catch {} }
function undo() { if (!history.length) return; const last = history.pop()!; loadFromDataURL(last, true) }

/* Crop state (CSS px relative to stage) */
const crop = reactive({ visible: false, x: 0, y: 0, w: 0, h: 0 })
let dragging = false as boolean
let dragMode: DragMode | null = null
let dragStart = { x: 0, y: 0, cx: 0, cy: 0, cw: 0, ch: 0 }

/* Crop handles (relative to the crop box) */
const handles: Handle[] = [
  { key: 'nw', x: 0, y: 0, cursor: 'nwse-resize' },
  { key: 'n',  x: .5, y: 0, cursor: 'ns-resize' },
  { key: 'ne', x: 1, y: 0, cursor: 'nesw-resize' },
  { key: 'w',  x: 0, y: .5, cursor: 'ew-resize' },
  { key: 'e',  x: 1, y: .5, cursor: 'ew-resize' },
  { key: 'sw', x: 0, y: 1, cursor: 'nesw-resize' },
  { key: 's',  x: .5, y: 1, cursor: 'ns-resize' },
  { key: 'se', x: 1, y: 1, cursor: 'nwse-resize' },
]

/* Overlay styles (typed so Volar is happy) */
const cropBoxStyle = computed<CSSProperties>(() => ({
  left: `${crop.x}px`,
  top: `${crop.y}px`,
  width: `${Math.max(1, crop.w)}px`,
  height: `${Math.max(1, crop.h)}px`,
  cursor: 'move',
}))
function handleStyle(h: Handle): CSSProperties {
  const size = 10
  return {
    left: `${h.x * crop.w - size / 2}px`,
    top: `${h.y * crop.h - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    cursor: h.cursor,
  }
}

/* DPR helper (SSR safe) */
function dpr() { return typeof window === 'undefined' ? 1 : Math.max(1, window.devicePixelRatio || 1) }

/* Encoder support (e.g., WebP) */
function canEncodeType(type: string) {
  try { return document.createElement('canvas').toDataURL(type).startsWith(`data:${type}`) } catch { return false }
}

/* --- Stage sizing & zoom --- */
function setCanvasSize(naturalW: number, naturalH: number) {
  const fitScale = Math.min(MAX_W / naturalW, MAX_H / naturalH, 1)
  baseStageW.value = Math.max(1, Math.round(naturalW * fitScale))
  baseStageH.value = Math.max(1, Math.round(naturalH * fitScale))
  applyZoom()
}
function applyZoom() {
  const c = canvasRef.value!
  stageW.value = Math.max(1, Math.round(baseStageW.value * zoom.value))
  stageH.value = Math.max(1, Math.round(baseStageH.value * zoom.value))

  c.style.width = `${stageW.value}px`
  c.style.height = `${stageH.value}px`
  const ratio = dpr()
  c.width  = Math.round(stageW.value * ratio)
  c.height = Math.round(stageH.value * ratio)

  clampCropToStage()
  draw(); drawOutputPreview(); scheduleEncodedUpdate()
}
function clampCropToStage() {
  const W = stageW.value, H = stageH.value
  crop.w = Math.min(Math.max(10, crop.w), W)
  crop.h = Math.min(Math.max(10, crop.h), H)
  crop.x = clamp(crop.x, 0, W - crop.w)
  crop.y = clamp(crop.y, 0, H - crop.h)
}

/* Load file */
async function loadFile(file: File) {
  const url = URL.createObjectURL(file)
  const el = new Image()
  el.onload = async () => {
    img.el = el; img.loaded = true; img.naturalW = el.naturalWidth; img.naturalH = el.naturalHeight; img.url = url
    await nextTick()
    setCanvasSize(img.naturalW, img.naturalH)
    state.outW = img.naturalW; state.outH = img.naturalH
    draw(); drawOutputPreview(); scheduleEncodedUpdate()
  }
  el.onerror = () => { URL.revokeObjectURL(url); alert('could not load image') }
  el.src = url
}

/* ----- DRAW: rotation-aware contain so the image never overflows ----- */
function draw() {
  const c = canvasRef.value
  if (!c || !img.el) return
  const ctx = c.getContext('2d', { willReadFrequently: true })!
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, c.width, c.height)

  const ratio = dpr()
  ctx.scale(ratio, ratio)
  ctx.imageSmoothingEnabled = true
  ;(ctx as any).imageSmoothingQuality = 'high'
  ctx.filter = cssFilterString.value

  const cssW = stageW.value, cssH = stageH.value

  // Base "contain" ignoring rotation
  const imgRatio = img.naturalW / img.naturalH
  const boxRatio = cssW / cssH
  let w0: number, h0: number
  if (imgRatio > boxRatio) { w0 = cssW; h0 = cssW / imgRatio } else { h0 = cssH; w0 = cssH * imgRatio }

  // Rotation-aware fit
  const ang = (state.rotate * Math.PI) / 180
  const cos = Math.abs(Math.cos(ang))
  const sin = Math.abs(Math.sin(ang))
  const aabbW = w0 * cos + h0 * sin
  const aabbH = w0 * sin + h0 * cos
  const fit = Math.min(cssW / aabbW, cssH / aabbH, 1)
  const drawW = w0 * fit
  const drawH = h0 * fit

  ctx.save()
  ctx.translate(cssW / 2, cssH / 2)
  ctx.rotate(ang)
  ctx.scale(state.flipX ? -1 : 1, state.flipY ? -1 : 1)
  ctx.drawImage(img.el, -drawW / 2, -drawH / 2, drawW, drawH)
  ctx.restore()
}

/* Apply crop */
function applyCrop() {
  if (!crop.visible || !img.el) return
  pushHistory()

  const c = canvasRef.value!, mctx = c.getContext('2d', { willReadFrequently: true })!
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

/* Reload from dataURL (crop/undo) */
async function loadFromDataURL(url: string, skipHistory = false) {
  const el = new Image()
  el.onload = async () => {
    img.el = el; img.loaded = true; img.naturalW = el.naturalWidth; img.naturalH = el.naturalHeight; img.url = url
    await nextTick()
    setCanvasSize(img.naturalW, img.naturalH)
    state.rotate = 0; state.flipX = false; state.flipY = false
    state.outW = img.naturalW; state.outH = img.naturalH
    draw(); drawOutputPreview(); scheduleEncodedUpdate()
  }
  el.src = url
  if (!skipHistory) pushHistory()
}

/* Toggle crop UI */
function toggleCrop() {
  const stage = stageRef.value!
  if (!crop.visible) {
    const s = Math.min(stage.clientWidth, stage.clientHeight) * 0.6
    crop.w = s; crop.h = s; crop.x = (stage.clientWidth - s) / 2; crop.y = (stage.clientHeight - s) / 2
    crop.visible = true
  } else { crop.visible = false }
}

/* Dragging/Resizing crop */
function startDrag(e: MouseEvent, mode: DragMode) {
  dragging = true; dragMode = mode
  dragStart = { x: e.clientX, y: e.clientY, cx: crop.x, cy: crop.y, cw: crop.w, ch: crop.h }
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', endDrag)
}
function onDrag(e: MouseEvent) {
  if (!dragging) return
  const dx = e.clientX - dragStart.x
  const dy = e.clientY - dragStart.y
  const stage = stageRef.value!
  const W = stage.clientWidth, H = stage.clientHeight
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
}
function endDrag() {
  dragging = false; dragMode = null
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', endDrag)
}

/* Output preview (canvas scaled to requested export W×H) */
function drawOutputPreview() {
  const out = outputRef.value, main = canvasRef.value
  if (!out || !main) return
  const ctx = out.getContext('2d')!
  out.style.width  = '100%'
  out.width  = Math.max(1, state.outW)
  out.height = Math.max(1, state.outH)
  out.style.aspectRatio = `${state.outW}/${state.outH}`
  ctx.clearRect(0, 0, out.width, out.height)
  ctx.imageSmoothingEnabled = true
  ;(ctx as any).imageSmoothingQuality = 'high'
  ctx.drawImage(main, 0, 0, out.width, out.height)
}

/* Presets */
type PresetName = 'none' | 'bw' | 'punch' | 'warm' | 'cool' | 'clarendon' | 'gingham' | 'juno' | 'lark' | 'ludwig' | 'valencia' | 'hudson' | 'toaster'

function preset(name: PresetName) {
  // Basic presets
  if (name === 'none') {
    Object.assign(filters, { grayscale: 0, brightness: 100, contrast: 100, saturate: 100, sepia: 0, hue: 0 })
    filterIntensity.value = 100
  }
  if (name === 'bw')    Object.assign(filters, { grayscale: 100, brightness: 110, contrast: 120, saturate: 0,   sepia: 0, hue: 0 })
  if (name === 'punch') Object.assign(filters, { grayscale: 0,   brightness: 105, contrast: 125, saturate: 135, sepia: 0, hue: 0 })
  if (name === 'warm')  Object.assign(filters, { grayscale: 0,   brightness: 105, contrast: 105, saturate: 115, sepia: 10, hue: 350 })
  if (name === 'cool')  Object.assign(filters, { grayscale: 0,   brightness: 100, contrast: 110, saturate: 110, sepia: 0,  hue: 205 })

  // Instagram-inspired presets
  if (name === 'clarendon') Object.assign(filters, { grayscale: 0, brightness: 110, contrast: 135, saturate: 140, sepia: 0,  hue: 5 })   // Bright, high contrast, vivid
  if (name === 'gingham')   Object.assign(filters, { grayscale: 0, brightness: 105, contrast: 95,  saturate: 85,  sepia: 15, hue: 350 }) // Vintage, warm undertones
  if (name === 'juno')      Object.assign(filters, { grayscale: 0, brightness: 100, contrast: 110, saturate: 75,  sepia: 0,  hue: 195 }) // Cool tones, desaturated
  if (name === 'lark')      Object.assign(filters, { grayscale: 0, brightness: 115, contrast: 125, saturate: 80,  sepia: 5,  hue: 0 })   // Bright, desaturated, high contrast
  if (name === 'ludwig')    Object.assign(filters, { grayscale: 0, brightness: 105, contrast: 110, saturate: 70,  sepia: 20, hue: 10 })  // Desaturated, vintage
  if (name === 'valencia')  Object.assign(filters, { grayscale: 0, brightness: 108, contrast: 95,  saturate: 90,  sepia: 25, hue: 355 }) // Warm, faded, vintage
  if (name === 'hudson')    Object.assign(filters, { grayscale: 0, brightness: 100, contrast: 125, saturate: 65,  sepia: 0,  hue: 200 }) // Cool, desaturated, high contrast
  if (name === 'toaster')   Object.assign(filters, { grayscale: 0, brightness: 110, contrast: 130, saturate: 100, sepia: 30, hue: 345 }) // Vintage, warm, high contrast

  // Ensure full intensity for presets (except 'none')
  if (name !== 'none') filterIntensity.value = 100
  draw(); drawOutputPreview(); scheduleEncodedUpdate()
}

/* ------- Encoding (quality/format) ------- */
let lastUrl: string | null = null
function revokeUrl() { if (lastUrl) { URL.revokeObjectURL(lastUrl); lastUrl = null } }
function encodeFromOutputCanvas(): Promise<Blob | null> {
  return new Promise((resolve) => {
    const out = outputRef.value
    if (!out) return resolve(null)
    const needsBg = exp.format === 'image/jpeg'
    const enc = document.createElement('canvas')
    enc.width = out.width; enc.height = out.height
    const ectx = enc.getContext('2d')!
    if (needsBg) { ectx.fillStyle = '#ffffff'; ectx.fillRect(0, 0, enc.width, enc.height) }
    ectx.drawImage(out, 0, 0)
    enc.toBlob((blob) => {
      if (!blob && exp.format !== 'image/jpeg') {
        enc.toBlob((fb) => resolve(fb || null), 'image/jpeg', exp.quality)
      } else { resolve(blob) }
    }, exp.format, exp.format === 'image/png' ? undefined : exp.quality)
  })
}
async function refreshEncoded() {
  revokeUrl()
  const blob = await encodeFromOutputCanvas()
  if (!blob) { exp.url = null; exp.size = 0; return }
  lastUrl = URL.createObjectURL(blob)
  exp.url = lastUrl
  exp.size = blob.size
}
let encodeTimer: number | null = null
function scheduleEncodedUpdate() {
  if (encodeTimer) window.clearTimeout(encodeTimer)
  encodeTimer = window.setTimeout(() => { refreshEncoded() }, 200)
}

/* Reactive glue */
const cssFilterString = computed(() => {
  // Apply global filter intensity (0-100%)
  const intensity = filterIntensity.value / 100

  // Default values for each filter (when intensity = 0%)
  const defaults = { grayscale: 0, brightness: 100, contrast: 100, saturate: 100, sepia: 0, hue: 0 }

  // Interpolate between default and set value based on intensity
  const grayscale = defaults.grayscale + (filters.grayscale - defaults.grayscale) * intensity
  const brightness = defaults.brightness + (filters.brightness - defaults.brightness) * intensity
  const contrast = defaults.contrast + (filters.contrast - defaults.contrast) * intensity
  const saturate = defaults.saturate + (filters.saturate - defaults.saturate) * intensity
  const sepia = defaults.sepia + (filters.sepia - defaults.sepia) * intensity
  const hue = defaults.hue + (filters.hue - defaults.hue) * intensity

  return `grayscale(${grayscale}%) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) sepia(${sepia}%) hue-rotate(${hue}deg)`
})
watch(
    () => [state.rotate, state.flipX, state.flipY, filters.grayscale, filters.brightness, filters.contrast, filters.saturate, filters.sepia, filters.hue, filterIntensity.value],
    () => { draw(); drawOutputPreview(); scheduleEncodedUpdate() }
)
watch(
    () => [state.outW, state.outH, state.lockRatio],
    ([w]) => {
      if (!img.el) return
      state.outW = clamp(state.outW || img.naturalW, 1, 10000)
      state.outH = clamp(state.outH || img.naturalH, 1, 10000)
      if (state.lockRatio) {
        const r = img.naturalW / img.naturalH
        if (w !== undefined) state.outH = Math.round(state.outW / r)
        else state.outW = Math.round(state.outH * r)
      }
      drawOutputPreview(); scheduleEncodedUpdate()
    }
)
watch(() => [exp.format, exp.quality], () => { scheduleEncodedUpdate() })
watch(() => zoom.value, () => { applyZoom() })

/* Utilities */
function prettySize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB']; let i = 0, n = bytes
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++ }
  return `${n.toFixed(2)} ${units[i]}`
}
function download() {
  if (!exp.url) return
  const a = document.createElement('a')
  const ext = exp.format === 'image/png' ? 'png' : exp.format === 'image/webp' ? 'webp' : 'jpg'
  a.href = exp.url
  a.download = `${(exp.name || 'edited').replace(/[^\w\-]+/g, '_')}.${ext}`
  a.click()
}
function resetAll() {
  if (!img.url) return
  loadFromDataURL(img.url)
  Object.assign(filters, { grayscale: 0, brightness: 100, contrast: 100, saturate: 100, sepia: 0, hue: 0 })
  filterIntensity.value = 100
  crop.visible = false
  history.splice(0, history.length)
}
function onFileChange(e: Event) { const f = (e.target as HTMLInputElement).files?.[0]; if (f) loadFile(f) }
function onDrop(e: DragEvent) { const f = e.dataTransfer?.files?.[0]; if (f) loadFile(f) }
function onKey(e: KeyboardEvent) {
  if (!crop.visible) return
  const step = e.shiftKey ? 10 : 1
  const stage = stageRef.value!
  if (e.key === 'ArrowLeft')  crop.x = Math.max(0, crop.x - step)
  if (e.key === 'ArrowRight') crop.x = Math.min(stage.clientWidth - crop.w, crop.x + step)
  if (e.key === 'ArrowUp')    crop.y = Math.max(0, crop.y - step)
  if (e.key === 'ArrowDown')  crop.y = Math.min(stage.clientHeight - crop.h, crop.y + step)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo() }
}
function clamp(n: number, a: number, b: number) { return Math.min(b, Math.max(a, n)) }

/* Mount/unmount */
onMounted(() => {
  window.addEventListener('keydown', onKey)
  ;[canvasRef, outputRef].forEach(r => { if (r.value) { r.value.width = 10; r.value.height = 10 } })
  exp.webpSupported = canEncodeType('image/webp')
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (lastUrl) URL.revokeObjectURL(lastUrl)
})

/* Help Volar with template inference (optional) */
defineExpose({ stageStyle, cropBoxStyle, handleStyle })
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block mb-2;
}

.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}

.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-success {
  @apply bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-colors;
}

.btn-warning {
  @apply bg-yellow-600 hover:bg-yellow-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-danger {
  @apply bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}

.btn-info {
  @apply bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-xs {
  @apply px-2 py-1 text-xs;
}

.btn-preset {
  @apply bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500;
  @apply px-2 py-1 rounded-lg text-white text-xs transition-colors;
}

.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}

/* Bigger resize handles for easier grabbing */
[style*="cursor:nwse-resize"], [style*="cursor:nesw-resize"],
[style*="cursor:ew-resize"], [style*="cursor:ns-resize"] {
  width: 12px !important;
  height: 12px !important;
}
</style>







