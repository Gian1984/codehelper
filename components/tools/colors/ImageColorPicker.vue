<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <!-- Header -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <h2 class="text-2xl font-semibold">🎨 Image Color Picker</h2>
        <div class="flex items-center gap-2">
          <button class="btn" :disabled="!imageSrc" @click="clearImage">clear</button>
          <button class="btn-primary" :disabled="!pickedColor && !dominantColors.length" @click="exportColors">export</button>
        </div>
      </div>
    </div>

    <!-- Upload & Controls -->
    <div class="card space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <label class="relative cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow transition-colors">
          <span>📁 Upload Image</span>
          <input type="file" accept="image/*" @change="handleFileChange" class="absolute inset-0 opacity-0 cursor-pointer" />
        </label>

        <button
            v-if="canUseEyeDropper"
            @click="openEyeDropper"
            class="btn"
            title="Use system eyedropper (if supported)"
        >
          💧 Eyedropper
        </button>

        <button
            v-if="imageSrc"
            @click="extractDominantColors"
            :disabled="isExtracting"
            class="btn-primary"
        >
          {{ isExtracting ? '⏳ Extracting...' : '🎨 Extract Palette' }}
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-4 text-sm" v-if="imageSrc">
        <div class="flex items-center gap-2">
          <label class="text-gray-300">🔍 Zoom</label>
          <input type="range" min="3" max="12" step="1" v-model.number="zoom" class="slider" />
          <span class="text-xs text-gray-400 w-8">{{ zoom }}×</span>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-gray-300">📏 Sample</label>
          <input type="range" min="3" max="25" step="2" v-model.number="sampleSize" class="slider" />
          <span class="text-xs text-gray-400 w-12">{{ sampleSize }}px</span>
        </div>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="averageMode" class="w-4 h-4" />
          <span class="text-gray-300">Average mode</span>
        </label>
      </div>

      <p class="text-xs text-gray-400" v-if="!imageSrc">
        💡 Drag and drop an image or click Upload to get started
      </p>
    </div>

    <!-- Canvas -->
    <div
        v-if="imageSrc"
        class="relative w-full overflow-auto border border-gray-700 rounded bg-gray-900"
    >
      <canvas
          ref="canvasRef"
          @mousemove="onMove"
          @mouseleave="hideMagnifier"
          @click="pickColor"
          class="block w-full h-auto"
      />
      <div class="absolute top-2 left-2 bg-black/60 text-white text-xs px-3 py-1 rounded shadow">
        Hover to preview • Click to pick a color
      </div>

      <!-- Magnifier (draws from source canvas; crisp) -->
      <canvas
          v-show="magnifier.visible"
          ref="magnifierRef"
          class="absolute pointer-events-none rounded-full border-2 border-white shadow-lg"
          :style="{ top: magnifier.y + 'px', left: magnifier.x + 'px' }"
          :width="magPx"
          :height="magPx"
      />
    </div>

    <!-- Dominant Colors Palette -->
    <div v-if="dominantColors.length" class="card space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-indigo-400">🎨 Dominant Colors Palette</h3>
        <button class="btn" @click="clearPalette">clear</button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <div
            v-for="(color, i) in dominantColors"
            :key="i"
            class="group relative cursor-pointer"
            @click="copyDominantColor(color)"
        >
          <div
              :style="{ backgroundColor: color.hex }"
              class="h-24 rounded-lg border-2 border-gray-700 hover:border-indigo-500 transition-all hover:scale-105"
          ></div>
          <div class="mt-2 text-center space-y-1">
            <p class="font-mono text-xs text-gray-300">{{ color.hex }}</p>
            <p class="text-xs text-gray-500">{{ color.percentage }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Picked Color Output -->
    <div v-if="pickedColor" class="card space-y-4">
      <h3 class="font-semibold text-indigo-400">🎯 Picked Color</h3>
      <div class="flex items-center gap-4">
        <div
            :style="{ backgroundColor: pickedColor.hex }"
            class="w-20 h-20 rounded-lg border-2 border-gray-700 shadow-lg"
        ></div>
        <div class="grid sm:grid-cols-2 gap-2 w-full">
          <ColorRow label="HEX" :value="pickedColor.hex" @copy="copy" />
          <ColorRow label="RGB" :value="pickedColor.rgb" @copy="copy" />
          <ColorRow label="RGBA" :value="pickedColor.rgba" @copy="copy" />
          <ColorRow label="HSL" :value="pickedColor.hsl" @copy="copy" />
        </div>
      </div>
    </div>

    <!-- Picked Colors History -->
    <div v-if="recent.length" class="card space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-indigo-400">🕒 Picked Colors History</h3>
        <button class="btn" @click="clearRecent">clear</button>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
        <div
            v-for="c in recent"
            :key="c"
            class="group cursor-pointer"
            @click="copy(c)"
            :title="c"
        >
          <div
              :style="{ backgroundColor: c }"
              class="w-full aspect-square rounded-lg border-2 border-gray-700 hover:border-indigo-500 transition-all hover:scale-110"
          ></div>
          <p class="mt-1 font-mono text-[10px] text-center text-gray-400 truncate">{{ c }}</p>
        </div>
      </div>
    </div>

    <!-- Export Modal -->
    <div v-if="showExportModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="showExportModal = false">
      <div class="bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl" @click.stop>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-indigo-400">📦 Export Colors</h3>
            <button class="btn" @click="showExportModal = false">✕ close</button>
          </div>

          <!-- Export Format Tabs -->
          <div class="flex gap-2 border-b border-gray-700 pb-2">
            <button
                v-for="format in exportFormats"
                :key="format"
                @click="exportFormat = format"
                class="px-4 py-2 rounded-t transition-colors text-sm"
                :class="exportFormat === format ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
            >
              {{ format }}
            </button>
          </div>

          <!-- Export Output -->
          <div class="relative">
            <pre class="bg-black border border-gray-700 rounded-lg p-4 overflow-auto max-h-96 text-sm text-green-300 font-mono">{{ exportOutput }}</pre>
            <button class="absolute top-2 right-2 btn-primary" @click="copyExport">
              {{ exportCopied ? '✓ Copied!' : '📋 Copy' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'

/* ---------- state ---------- */
const canvasRef = ref<HTMLCanvasElement | null>(null)
const magnifierRef = ref<HTMLCanvasElement | null>(null)
const imageSrc = ref<string | null>(null)

const zoom = ref(6)               // magnifier zoom
const sampleSize = ref(11)        // odd number (area side)
const averageMode = ref(true)     // average area or single pixel
const pickedColor = ref<{ hex: string; rgb: string; rgba: string; hsl: string } | null>(null)
const copiedMsg = ref('')
const recent = ref<string[]>([])

const magPx = 120 // magnifier canvas square size in px
const magnifier = ref({ visible: false, x: 0, y: 0 })

/* ---------- dominant colors ---------- */
type DominantColor = { hex: string; rgb: { r: number; g: number; b: number }; percentage: number }
const dominantColors = ref<DominantColor[]>([])
const isExtracting = ref(false)

/* ---------- export ---------- */
const showExportModal = ref(false)
const exportFormat = ref<'CSS' | 'JSON' | 'Tailwind' | 'SCSS'>('CSS')
const exportFormats: ('CSS' | 'JSON' | 'Tailwind' | 'SCSS')[] = ['CSS', 'JSON', 'Tailwind', 'SCSS']
const exportCopied = ref(false)

/* ---------- feature detection ---------- */
const canUseEyeDropper = typeof (globalThis as any).EyeDropper === 'function'

/* ---------- file handling ---------- */
function handleFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    imageSrc.value = URL.createObjectURL(file)
    nextTick(drawImage)
  }
}
function onDrop(ev: DragEvent) {
  const file = ev.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    imageSrc.value = URL.createObjectURL(file)
    nextTick(drawImage)
  }
}

/* ---------- draw image with scaling ---------- */
function drawImage() {
  if (!canvasRef.value || !imageSrc.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return
  const img = new Image()
  img.onload = () => {
    const maxW = 1400, maxH = 900
    let { width, height } = img
    const scale = Math.min(1, maxW / width, maxH / height)
    width = Math.max(1, Math.floor(width * scale))
    height = Math.max(1, Math.floor(height * scale))
    canvasRef.value!.width = width
    canvasRef.value!.height = height
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)
  }
  img.src = imageSrc.value
}

/* ---------- magnifier ---------- */
function onMove(e: MouseEvent) {
  drawMagnifier(e)
}
function hideMagnifier() {
  magnifier.value.visible = false
}
function drawMagnifier(e: MouseEvent) {
  if (!canvasRef.value || !magnifierRef.value) return
  const src = canvasRef.value
  const m = magnifierRef.value
  const sctx = src.getContext('2d')
  const mctx = m.getContext('2d')
  if (!sctx || !mctx) return

  const rect = src.getBoundingClientRect()
  const sx = Math.floor((e.clientX - rect.left) * (src.width / rect.width))
  const sy = Math.floor((e.clientY - rect.top) * (src.height / rect.height))
  const half = Math.floor(sampleSize.value / 2)

  // Clamp source rect
  const rx = Math.max(0, Math.min(src.width - sampleSize.value, sx - half))
  const ry = Math.max(0, Math.min(src.height - sampleSize.value, sy - half))

  // Draw scaled source region into magnifier
  mctx.save()
  mctx.clearRect(0, 0, magPx, magPx)
  // circular clip
  mctx.beginPath()
  mctx.arc(magPx / 2, magPx / 2, magPx / 2 - 1, 0, Math.PI * 2)
  mctx.closePath()
  mctx.clip()
  mctx.imageSmoothingEnabled = false
  mctx.drawImage(src, rx, ry, sampleSize.value, sampleSize.value, 0, 0, magPx, magPx)
  // crosshair
  mctx.strokeStyle = 'rgba(255,255,255,.6)'
  mctx.lineWidth = 1
  mctx.beginPath()
  mctx.moveTo(magPx / 2, 0); mctx.lineTo(magPx / 2, magPx)
  mctx.moveTo(0, magPx / 2); mctx.lineTo(magPx, magPx / 2)
  mctx.stroke()
  mctx.restore()

  magnifier.value = {
    visible: true,
    x: e.clientX - rect.left + 20,
    y: e.clientY - rect.top + 20
  }
}

/* ---------- color picking ---------- */
function pickColor(e: MouseEvent) {
  if (!canvasRef.value) return
  const { r, g, b, a } = getPixelOrAverage(e)
  setPicked(r, g, b, a)
}
function getPixelOrAverage(e: MouseEvent) {
  const src = canvasRef.value!
  const ctx = src.getContext('2d')!
  const rect = src.getBoundingClientRect()
  const px = Math.floor((e.clientX - rect.left) * (src.width / rect.width))
  const py = Math.floor((e.clientY - rect.top) * (src.height / rect.height))
  if (!averageMode.value) {
    const [r,g,b,a] = ctx.getImageData(px, py, 1, 1).data
    return { r, g, b, a }
  }
  const half = Math.floor(sampleSize.value / 2)
  const sx = Math.max(0, Math.min(src.width - sampleSize.value, px - half))
  const sy = Math.max(0, Math.min(src.height - sampleSize.value, py - half))
  const data = ctx.getImageData(sx, sy, sampleSize.value, sampleSize.value).data
  let r=0,g=0,b=0,a=0, count = sampleSize.value * sampleSize.value
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]; g += data[i+1]; b += data[i+2]; a += data[i+3]
  }
  r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count); a = Math.round(a / count)
  return { r, g, b, a }
}
function setPicked(r: number, g: number, b: number, a: number) {
  const hex = rgbToHex(r, g, b)
  pickedColor.value = {
    hex,
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, ${(a/255).toFixed(2)})`,
    hsl: rgbToHslString(r, g, b)
  }
  pushRecent(hex)
}

/* ---------- eyedropper ---------- */
async function openEyeDropper() {
  try {
    // @ts-ignore
    const ed = new EyeDropper()
    const res = await ed.open()
    const hex = res?.sRGBHex?.toUpperCase?.() ?? ''
    if (hex) {
      const { r, g, b } = hexToRgb(hex)
      setPicked(r, g, b, 255)
    }
  } catch { /* user cancelled */ }
}

/* ---------- utils / formats ---------- */
function rgbToHex(r: number, g: number, b: number) {
  return ('#' + [r,g,b].map(v => v.toString(16).padStart(2, '0')).join('')).toUpperCase()
}
function hexToRgb(h: string) {
  const m = h.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : { r:0,g:0,b:0 }
}
function rgbToHslString(r: number, g: number, b: number) {
  r/=255; g/=255; b/=255
  const max=Math.max(r,g,b), min=Math.min(r,g,b)
  let h=0, s=0, l=(max+min)/2
  const d = max - min
  if (d) {
    s = l > .5 ? d/(2-max-min) : d/(max+min)
    switch(max){
      case r: h = (g-b)/d + (g<b?6:0); break
      case g: h = (b-r)/d + 2; break
      case b: h = (r-g)/d + 4; break
    }
    h /= 6
  }
  return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`
}

/* ---------- k-means clustering for dominant colors ---------- */
async function extractDominantColors() {
  if (!canvasRef.value || isExtracting.value) return
  isExtracting.value = true

  try {
    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    // Sample pixels (every 10th pixel for performance)
    const samples: Array<{ r: number; g: number; b: number }> = []
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]
      // Skip transparent pixels
      if (a > 128) {
        samples.push({ r, g, b })
      }
    }

    // K-means clustering with k=6 colors
    const k = 6
    const clusters = kMeans(samples, k)

    // Sort by cluster size (most dominant first)
    clusters.sort((a, b) => b.count - a.count)

    // Calculate percentages
    const total = samples.length
    dominantColors.value = clusters.map(cluster => ({
      hex: rgbToHex(cluster.r, cluster.g, cluster.b),
      rgb: { r: cluster.r, g: cluster.g, b: cluster.b },
      percentage: Math.round((cluster.count / total) * 100)
    }))
  } finally {
    isExtracting.value = false
  }
}

function kMeans(samples: Array<{ r: number; g: number; b: number }>, k: number) {
  if (samples.length === 0) return []

  // Initialize centroids randomly from samples
  const centroids = samples.slice(0, k).map(s => ({ ...s }))
  const maxIterations = 20

  for (let iter = 0; iter < maxIterations; iter++) {
    // Assign each sample to nearest centroid
    const assignments: number[] = []
    for (const sample of samples) {
      let minDist = Infinity
      let nearest = 0
      for (let i = 0; i < k; i++) {
        const dist = colorDistance(sample, centroids[i])
        if (dist < minDist) {
          minDist = dist
          nearest = i
        }
      }
      assignments.push(nearest)
    }

    // Update centroids
    const newCentroids: Array<{ r: number; g: number; b: number; count: number }> = []
    for (let i = 0; i < k; i++) {
      const members = samples.filter((_, idx) => assignments[idx] === i)
      if (members.length === 0) {
        newCentroids.push({ ...centroids[i], count: 0 })
        continue
      }
      const sum = members.reduce((acc, m) => ({
        r: acc.r + m.r,
        g: acc.g + m.g,
        b: acc.b + m.b
      }), { r: 0, g: 0, b: 0 })
      newCentroids.push({
        r: Math.round(sum.r / members.length),
        g: Math.round(sum.g / members.length),
        b: Math.round(sum.b / members.length),
        count: members.length
      })
    }

    // Check convergence
    let converged = true
    for (let i = 0; i < k; i++) {
      if (colorDistance(centroids[i], newCentroids[i]) > 1) {
        converged = false
        break
      }
    }

    centroids.splice(0, k, ...newCentroids)
    if (converged) break
  }

  return centroids.filter(c => c.count > 0)
}

function colorDistance(c1: { r: number; g: number; b: number }, c2: { r: number; g: number; b: number }) {
  // Euclidean distance in RGB space
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  )
}

function copyDominantColor(color: DominantColor) {
  copy(color.hex)
  pushRecent(color.hex)
}

function clearPalette() {
  dominantColors.value = []
}

/* ---------- export functionality ---------- */
function exportColors() {
  showExportModal.value = true
}

const exportOutput = computed(() => {
  const colors = dominantColors.value.length ? dominantColors.value : (pickedColor.value ? [{ hex: pickedColor.value.hex, percentage: 100 }] : [])
  if (colors.length === 0) return 'No colors to export'

  if (exportFormat.value === 'CSS') {
    return `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`
  } else if (exportFormat.value === 'SCSS') {
    return colors.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n')
  } else if (exportFormat.value === 'JSON') {
    return JSON.stringify(
      colors.map((c, i) => ({ name: `color-${i + 1}`, hex: c.hex, percentage: c.percentage || 0 })),
      null,
      2
    )
  } else if (exportFormat.value === 'Tailwind') {
    const obj = colors.reduce((acc, c, i) => {
      acc[`color-${i + 1}`] = c.hex
      return acc
    }, {} as Record<string, string>)
    return `module.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(obj, null, 8).replace(/^/gm, '        ').trim()}\n    }\n  }\n}`
  }
  return ''
})

function copyExport() {
  navigator.clipboard.writeText(exportOutput.value)
  exportCopied.value = true
  setTimeout(() => (exportCopied.value = false), 1500)
}

/* ---------- clipboard & recent ---------- */
function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1200)
}
function copyAll() {
  if (!pickedColor.value) return
  const p = pickedColor.value
  copy(`HEX ${p.hex}\nRGB ${p.rgb}\nRGBA ${p.rgba}\nHSL ${p.hsl}`)
}
function pushRecent(hex: string) {
  const arr = [hex, ...recent.value.filter(c => c !== hex)].slice(0, 10)
  recent.value = arr
  try { localStorage.setItem('img-picker-recent', JSON.stringify(arr)) } catch {}
}
function clearRecent() {
  recent.value = []
  try { localStorage.removeItem('img-picker-recent') } catch {}
}

/* ---------- lifecycle helpers ---------- */
function clearImage() {
  imageSrc.value = null
  pickedColor.value = null
  dominantColors.value = []
  const c = canvasRef.value
  if (c) {
    const ctx = c.getContext('2d')
    if (ctx) ctx.clearRect(0, 0, c.width, c.height)
  }
}
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('img-picker-recent')
    if (raw) recent.value = JSON.parse(raw)
  } catch {}
}
</script>

<script lang="ts">
/* inline subcomponent for compact rows */
export default {
  components: {
    ColorRow: {
      props: { label: String, value: String },
      emits: ['copy'],
      template: `
        <div class="flex items-center gap-2">
          <span class="text-gray-300 text-sm w-14">{{ label }}</span>
          <input readonly :value="value"
                 class="bg-black text-white px-3 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 w-full font-mono text-xs"/>
          <button class="btn" @click="$emit('copy', value)">📋</button>
        </div>
      `
    }
  }
}
</script>

<style scoped>
.card {
  @apply bg-gray-900 rounded-xl border border-gray-700 p-5;
}
.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.btn-primary:disabled {
  @apply opacity-50 cursor-not-allowed;
}
.slider {
  @apply accent-indigo-500;
}
</style>

