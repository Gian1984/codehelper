<template>
  <div class="p-6 sm:p-8 bg-gray-800 rounded-2xl shadow-xl space-y-6 text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">svg wave generator</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="randomizeSeed">randomize</button>
        <button class="btn-warning" @click="resetAll">reset</button>
      </div>
    </div>

    <!-- controls -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- geometry -->
      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-2">
          <label class="block">
            <span class="label">width (px)</span>
            <input v-model.number="svgWidth" type="number" min="200" step="50" class="input" />
          </label>
          <label class="block">
            <span class="label">height (px)</span>
            <input v-model.number="svgHeight" type="number" min="60" step="10" class="input" />
          </label>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <label class="block">
            <span class="label">amplitude</span>
            <input v-model.number="amp" type="range" min="5" :max="Math.floor(svgHeight/2)" step="1" class="w-full" />
          </label>
          <label class="block">
            <span class="label">frequency</span>
            <input v-model.number="freq" type="range" min="1" max="12" step="1" class="w-full" />
          </label>
          <label class="block">
            <span class="label">phase (°)</span>
            <input v-model.number="phaseDeg" type="range" min="0" max="360" step="1" class="w-full" />
          </label>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <label class="block">
            <span class="label">roughness</span>
            <input v-model.number="roughness" type="range" min="0" max="1" step="0.05" class="w-full" />
          </label>
          <label class="block">
            <span class="label">offset (%)</span>
            <input v-model.number="offsetPct" type="range" min="-100" max="100" step="1" class="w-full" />
          </label>
          <label class="block">
            <span class="label">seed</span>
            <input v-model.number="seed" type="number" min="0" max="999999" step="1" class="input" />
          </label>
        </div>

        <div class="flex flex-wrap gap-3">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="invert" class="w-4 h-4" />
            <span class="text-sm">invert vertically</span>
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="mirror" class="w-4 h-4" />
            <span class="text-sm">mirror/reflection</span>
          </label>
        </div>
      </div>

      <!-- paint -->
      <div class="card space-y-3">
        <label class="block">
          <span class="label">mode</span>
          <select v-model="fillMode" class="input">
            <option value="solid">solid</option>
            <option value="gradient">linear gradient</option>
          </select>
        </label>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class="label">color a</span>
            <div class="flex items-center gap-2 mt-1">
              <input v-model="colorA" type="color" class="swatch" />
              <input v-model="colorA" maxlength="7" class="input" @blur="colorA = normalizeHex(colorA)" />
            </div>
          </div>
          <div v-if="fillMode==='gradient'">
            <span class="label">color b</span>
            <div class="flex items-center gap-2 mt-1">
              <input v-model="colorB" type="color" class="swatch" />
              <input v-model="colorB" maxlength="7" class="input" @blur="colorB = normalizeHex(colorB)" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="label">opacity</span>
            <input v-model.number="fillOpacity" type="range" min="0.1" max="1" step="0.05" class="w-full" />
          </label>
          <label v-if="fillMode==='gradient'" class="block">
            <span class="label">angle (°)</span>
            <input v-model.number="gradAngle" type="range" min="0" max="360" step="1" class="w-full" />
          </label>
        </div>

        <div class="flex items-center gap-3">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="showBg" class="w-4 h-4" />
            <span class="text-sm">background</span>
          </label>
          <input v-model="bgColor" type="color" class="swatch" />
          <input v-model="bgColor" maxlength="7" class="input w-32" @blur="bgColor = normalizeHex(bgColor)" />
        </div>

        <div v-if="mirror" class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="label">mirror gap (px)</span>
            <input v-model.number="mirrorGap" type="number" min="0" step="1" class="input" />
          </label>
          <label class="block">
            <span class="label">mirror opacity</span>
            <input v-model.number="mirrorOpacity" type="range" min="0.05" max="1" step="0.05" class="w-full" />
          </label>
        </div>
      </div>

      <!-- export -->
      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="label">filename</span>
            <input v-model="filename" class="input" placeholder="wave.svg" />
          </label>
          <label class="block">
            <span class="label">png size</span>
            <select v-model.number="pngSize" class="input">
              <option v-for="n in [512,1024,2048,4096]" :key="n" :value="n">{{ n }} px</option>
            </select>
          </label>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="btn-primary" @click="downloadSvg">download svg</button>
          <button class="btn" @click="copySvg">copy svg</button>
          <button class="btn" @click="downloadPng">export png</button>
          <span v-if="copied" class="text-xs text-green-400 self-center">copied!</span>
        </div>
      </div>
    </div>

    <!-- canvas -->
    <div class="border border-gray-800 rounded-xl overflow-hidden bg-gray-950">
      <svg
          :width="svgWidth"
          :height="svgHeightWithMirror"
          :viewBox="`0 0 ${svgWidth} ${svgHeightWithMirror}`"
          xmlns="http://www.w3.org/2000/svg"
          class="block mx-auto"
          preserveAspectRatio="none"
      >
        <defs>
          <linearGradient :id="gradId" :x1="gradXY.x1" :y1="gradXY.y1" :x2="gradXY.x2" :y2="gradXY.y2">
            <stop offset="0%" :stop-color="colorA" :stop-opacity="fillOpacity" />
            <stop offset="100%" :stop-color="colorB" :stop-opacity="fillOpacity" />
          </linearGradient>
        </defs>

        <rect v-if="showBg" x="0" y="0" :width="svgWidth" :height="svgHeightWithMirror" :fill="bgColor" />

        <!-- main wave -->
        <path :d="mainPath" :fill="fillPaint" :opacity="fillOpacity" />

        <!-- mirrored wave -->
        <g v-if="mirror" :opacity="mirrorOpacity" :transform="mirrorTransform">
          <path :d="mirrorPath" :fill="fillPaint" />
        </g>
      </svg>
      <div class="text-center text-xs text-gray-400 py-1">viewBox: {{ svgWidth }} × {{ svgHeightWithMirror }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/* ---------- state ---------- */
const svgWidth = ref<number>(1000)
const svgHeight = ref<number>(300)

const amp = ref<number>(60)           // amplitude in px
const freq = ref<number>(3)           // integer wave count across width
const phaseDeg = ref<number>(0)       // 0..360
const roughness = ref<number>(0.15)   // 0..1 random wobble
const offsetPct = ref<number>(0)      // -100..100 (% of H/2)
const seed = ref<number>(1234)        // deterministic

const invert = ref<boolean>(false)
const mirror = ref<boolean>(false)
const mirrorGap = ref<number>(0)
const mirrorOpacity = ref<number>(0.35)

type FillMode = 'solid' | 'gradient'
const fillMode = ref<FillMode>('solid')
const colorA = ref<string>('#0099ff')
const colorB = ref<string>('#88ccff')
const fillOpacity = ref<number>(1)
const gradAngle = ref<number>(0)

const showBg = ref<boolean>(false)
const bgColor = ref<string>('#111827')

const filename = ref<string>('wave.svg')
const pngSize = ref<number>(1024)
const copied = ref<boolean>(false)

/* ---------- computed ---------- */
const baseY = computed<number>(() => svgHeight.value / 2 + (offsetPct.value / 100) * (svgHeight.value / 2))
const phaseRad = computed<number>(() => (phaseDeg.value * Math.PI) / 180)
const samples = 200 // smoothness

const mainPath = computed<string>(() => buildWavePath(false))
const mirrorPath = computed<string>(() => buildWavePath(true))

const gradId = computed<string>(() => `grad-${hashKey([colorA.value, colorB.value, gradAngle.value])}`)
const gradXY = computed(() => {
  const a = (gradAngle.value * Math.PI) / 180
  const vx = Math.cos(a), vy = Math.sin(a)
  const x1 = 0.5 - vx / 2, y1 = 0.5 - vy / 2
  const x2 = 0.5 + vx / 2, y2 = 0.5 + vy / 2
  return { x1, y1, x2, y2 }
})
const fillPaint = computed<string>(() => (fillMode.value === 'gradient' ? `url(#${gradId.value})` : colorA.value))

const svgHeightWithMirror = computed<number>(() => svgHeight.value + (mirror.value ? mirrorGap.value + Math.abs(amp.value) : 0))
const mirrorTransform = computed<string>(() => {
  const flipY = svgHeight.value + mirrorGap.value
  return `translate(0, ${flipY}) scale(1, -1)`
})

/* ---------- wave builder ---------- */
function buildWavePath(isMirror: boolean): string {
  const W = svgWidth.value
  const H = svgHeight.value
  const f = Math.max(1, Math.round(freq.value)) // enforce integer for clean tiling
  const A = Math.min(Math.abs(amp.value), H) * (invert.value ? -1 : 1)
  const prng = mulberry32((seed.value + (isMirror ? 99991 : 0)) >>> 0)
  const rough = Math.max(0, Math.min(1, roughness.value))
  const phase = phaseRad.value

  const center = baseY.value
  const mirrorBase = isMirror ? center + (invert.value ? -mirrorGap.value : mirrorGap.value) : center

  const pts: Array<{ x: number; y: number }> = []
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    const x = t * W
    const sine = Math.sin(2 * Math.PI * f * t + phase)
    const noise = (prng() - 0.5) * 2 * rough // -rough..+rough
    const y = mirrorBase + A * (sine + noise * 0.35)
    pts.push({ x, y })
  }

  const edgeY = A >= 0 ? H : 0
  let d = `M 0 ${edgeY} L ${pts[0].x} ${pts[0].y}`

  // quadratic smoothing via midpoint technique
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const mx = (prev.x + curr.x) / 2
    const my = (prev.y + curr.y) / 2
    d += ` Q ${prev.x} ${prev.y} ${mx} ${my}`
  }
  const last = pts[pts.length - 1]
  d += ` T ${last.x} ${last.y}`
  d += ` L ${W} ${edgeY} Z`
  return d
}

/* ---------- small utils ---------- */
function mulberry32(s: number) {
  return () => {
    let t = (s += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashKey(parts: Array<string | number>): string {
  const str = parts.join('|')
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }
  return (h >>> 0).toString(36)
}

function normalizeHex(v: string): string {
  const s = v.trim()
  const short = /^#?[0-9a-fA-F]{3}$/
  const full = /^#?[0-9a-fA-F]{6}$/
  if (short.test(s)) {
    const no = s.replace(/^#?/, '')
    return '#' + no.split('').map((ch) => ch + ch).join('')
  }
  if (full.test(s)) return '#' + s.replace(/^#?/, '')
  return '#0099ff'
}

function randomizeSeed() { seed.value = Math.floor(Math.random() * 1_000_000) }

function resetAll() {
  svgWidth.value = 1000
  svgHeight.value = 300
  amp.value = 60
  freq.value = 3
  phaseDeg.value = 0
  roughness.value = 0.15
  offsetPct.value = 0
  seed.value = 1234
  invert.value = false
  mirror.value = false
  mirrorGap.value = 0
  mirrorOpacity.value = 0.35
  fillMode.value = 'solid'
  colorA.value = '#0099ff'
  colorB.value = '#88ccff'
  fillOpacity.value = 1
  gradAngle.value = 0
  showBg.value = false
  bgColor.value = '#111827'
  filename.value = 'wave.svg'
  pngSize.value = 1024
}

async function copySvg() {
  const svg = buildOuterSvg()
  try {
    await navigator.clipboard.writeText(svg)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch {
    copied.value = false
  }
}

function downloadSvg() {
  const svg = buildOuterSvg()
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName(filename.value || 'wave.svg', 'svg')
  a.click()
  URL.revokeObjectURL(url)
}

function downloadPng() {
  const svg = buildOuterSvg()
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(svgBlob)
  const img = new Image()
  img.onload = () => {
    const c = document.createElement('canvas')
    c.width = pngSize.value
    c.height = Math.round(pngSize.value * (svgHeightWithMirror.value / svgWidth.value))
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.drawImage(img, 0, 0, c.width, c.height)
    URL.revokeObjectURL(url)
    const a = document.createElement('a')
    a.href = c.toDataURL('image/png')
    a.download = safeName(filename.value.replace(/\.svg$/i, '') || 'wave', 'png')
    a.click()
  }
  img.src = url
}

function buildOuterSvg(): string {
  const width = svgWidth.value
  const height = svgHeightWithMirror.value
  const defs =
      fillMode.value === 'gradient'
          ? `<defs><linearGradient id="${gradId.value}" x1="${gradXY.value.x1}" y1="${gradXY.value.y1}" x2="${gradXY.value.x2}" y2="${gradXY.value.y2}">
           <stop offset="0%" stop-color="${colorA.value}" stop-opacity="${fillOpacity.value}"/>
           <stop offset="100%" stop-color="${colorB.value}" stop-opacity="${fillOpacity.value}"/>
         </linearGradient></defs>`
          : ''
  const bg = showBg.value ? `<rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor.value}"/>` : ''
  const main = `<path d="${mainPath.value}" fill="${
      fillMode.value === 'gradient' ? `url(#${gradId.value})` : colorA.value
  }" opacity="${fillOpacity.value}"/>`
  const mirrorSvg = mirror.value
      ? `<g opacity="${mirrorOpacity.value}" transform="${mirrorTransform.value}">
         <path d="${mirrorPath.value}" fill="${fillMode.value === 'gradient' ? `url(#${gradId.value})` : colorA.value}"/>
       </g>`
      : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="none">${defs}${bg}${main}${mirrorSvg}</svg>`
}

function safeName(name: string, ext: 'svg' | 'png'): string {
  let n = name.trim()
  n = n.replace(/\.(svg|png)$/i, '')
  n = n.replace(/[^a-z0-9\-_]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
  return `${n || 'wave'}.${ext}`
}
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.swatch { @apply w-10 h-8 p-0 border border-gray-500 rounded; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white; }
.btn-warning { @apply bg-yellow-600 hover:bg-yellow-500 px-3 py-1.5 rounded text-white; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
</style>








