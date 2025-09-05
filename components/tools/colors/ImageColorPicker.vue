<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Image Color Picker</h2>
      <div class="flex items-center gap-2">
        <button class="btn" :disabled="!imageSrc" @click="clearImage">clear</button>
        <button class="btn" :disabled="!pickedColor" @click="copyAll">copy all</button>
      </div>
    </div>

    <!-- Upload -->
    <div
        class="card p-4 flex flex-wrap items-center gap-3"
        @dragover.prevent
        @drop.prevent="onDrop"
    >
      <label
          class="relative cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded shadow"
      >
        <span>Upload image</span>
        <input type="file" accept="image/*" @change="handleFileChange" class="absolute inset-0 opacity-0 cursor-pointer" />
      </label>

      <button
          v-if="canUseEyeDropper"
          @click="openEyeDropper"
          class="btn"
          title="Use system eyedropper (if supported)"
      >
        Eyedropper
      </button>

      <div class="ml-auto flex items-center gap-4">
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-300">Zoom</label>
          <input type="range" min="3" max="12" step="1" v-model.number="zoom" />
          <span class="text-xs text-gray-400">{{ zoom }}×</span>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-300">Sample</label>
          <input type="range" min="3" max="25" step="2" v-model.number="sampleSize" />
          <span class="text-xs text-gray-400">{{ sampleSize }} px</span>
        </div>
        <label class="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="averageMode" />
          average
        </label>
      </div>
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

    <!-- Output -->
    <div v-if="pickedColor" class="card p-4 space-y-3">
      <div class="flex items-center gap-4">
        <div :style="{ backgroundColor: pickedColor.hex }" class="w-12 h-12 rounded border border-white"></div>
        <div class="grid sm:grid-cols-2 gap-2 w-full">
          <ColorRow label="HEX" :value="pickedColor.hex" @copy="copy" />
          <ColorRow label="RGB" :value="pickedColor.rgb" @copy="copy" />
          <ColorRow label="RGBA" :value="pickedColor.rgba" @copy="copy" />
          <ColorRow label="HSL" :value="pickedColor.hsl" @copy="copy" />
        </div>
      </div>
    </div>

    <!-- Recent swatches -->
    <div v-if="recent.length" class="card p-4 space-y-3">
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-300">Recent colors</p>
        <button class="btn" @click="clearRecent">clear</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
            v-for="c in recent"
            :key="c"
            class="flex items-center gap-2 px-2 py-1 rounded border border-gray-700 bg-gray-900 hover:bg-gray-800"
            @click="copy(c)"
        >
          <span :style="{ backgroundColor: c }" class="w-5 h-5 rounded border border-white/60"></span>
          <span class="font-mono text-xs">{{ c }}</span>
        </button>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
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
                 class="bg-gray-900 text-white px-2 py-1 rounded border border-gray-700 w-full font-mono text-xs"/>
          <button class="btn" @click="$emit('copy', value)">copy</button>
        </div>
      `
    }
  }
}
</script>

<style scoped>
.card { @apply bg-gray-800/60 rounded-xl border border-gray-800; }
.btn  { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
</style>

