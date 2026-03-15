<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🎨 Mesh Gradient Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Create beautiful multi-color mesh gradients for backgrounds and hero sections</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="randomize" title="Randomize">
          🎲 Randomize
        </button>
        <button class="btn" @click="copyCSS" title="Copy CSS">📋 Copy CSS</button>
      </div>
    </div>

    <!-- Color Points -->
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <label class="label !mb-0 font-semibold">🎨 Color Points</label>
        <button v-if="points.length < 6" class="btn text-xs" @click="addPoint">+ Add Point</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div v-for="(point, i) in points" :key="i" class="bg-gray-800 rounded-lg p-3 border border-gray-700 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-400">Point {{ i + 1 }}</span>
            <button v-if="points.length > 2" class="text-red-400 text-xs hover:text-red-300" @click="removePoint(i)">✕</button>
          </div>
          <div class="flex items-center gap-2">
            <input type="color" v-model="point.color" class="w-8 h-8 rounded border border-gray-600 cursor-pointer bg-transparent" />
            <input v-model="point.color" class="input text-xs font-mono" />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs text-gray-500">X %</label>
              <input type="range" v-model.number="point.x" min="0" max="100" class="slider w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Y %</label>
              <input type="range" v-model.number="point.y" min="0" max="100" class="slider w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Options -->
    <div class="card">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="space-y-2">
          <label class="label">Background Base Color</label>
          <div class="flex items-center gap-2">
            <input type="color" v-model="bgColor" class="w-8 h-8 rounded border border-gray-600 cursor-pointer bg-transparent" />
            <input v-model="bgColor" class="input text-sm font-mono" />
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="label !mb-0">Intensity</label>
            <span class="text-sm text-indigo-400 font-mono">{{ intensity }}%</span>
          </div>
          <input type="range" v-model.number="intensity" min="20" max="100" step="5" class="slider w-full mt-2" />
        </div>
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="label !mb-0">Grain</label>
            <span class="text-sm text-indigo-400 font-mono">{{ grain }}%</span>
          </div>
          <input type="range" v-model.number="grain" min="0" max="30" step="1" class="slider w-full mt-2" />
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="card">
      <label class="label font-semibold mb-3">👁️ Preview</label>
      <div class="rounded-xl overflow-hidden" :style="previewStyle" style="height: 400px; position: relative;">
        <div v-if="grain > 0" class="absolute inset-0 rounded-xl" :style="grainStyle"></div>
      </div>
    </div>

    <!-- Presets -->
    <div class="card">
      <label class="label font-semibold mb-3">✨ Presets</label>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
        <button v-for="preset in presets" :key="preset.name"
            class="rounded-lg h-16 border-2 border-gray-700 hover:border-indigo-400 transition-colors cursor-pointer overflow-hidden"
            :style="presetStyle(preset)"
            :title="preset.name"
            @click="loadPreset(preset)">
        </button>
      </div>
    </div>

    <!-- CSS Output -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 CSS Code</label>
        <button class="btn" @click="copyCSS">📋 Copy</button>
      </div>
      <span v-if="copied" class="text-green-400 text-xs font-medium">✅ Copied!</span>
      <pre class="mono-box whitespace-pre-wrap">{{ cssOutput }}</pre>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Point {
  color: string
  x: number
  y: number
}

interface Preset {
  name: string
  bg: string
  points: Point[]
}

const points = ref<Point[]>([
  { color: '#ff6b6b', x: 20, y: 20 },
  { color: '#4ecdc4', x: 80, y: 30 },
  { color: '#45b7d1', x: 50, y: 80 },
  { color: '#f7dc6f', x: 10, y: 70 },
])

const bgColor = ref('#0a0a1a')
const intensity = ref(70)
const grain = ref(0)
const copied = ref(false)

const presets: Preset[] = [
  { name: 'Aurora', bg: '#0a0a2e', points: [{ color: '#00ff87', x: 20, y: 10 }, { color: '#60efff', x: 80, y: 30 }, { color: '#ff00ea', x: 50, y: 80 }] },
  { name: 'Sunset', bg: '#1a0a0a', points: [{ color: '#ff6b35', x: 15, y: 20 }, { color: '#f7c59f', x: 70, y: 15 }, { color: '#d62828', x: 40, y: 75 }, { color: '#ffd166', x: 85, y: 70 }] },
  { name: 'Ocean', bg: '#001220', points: [{ color: '#0077b6', x: 25, y: 30 }, { color: '#00b4d8', x: 75, y: 20 }, { color: '#90e0ef', x: 50, y: 80 }] },
  { name: 'Forest', bg: '#0a1a0a', points: [{ color: '#2d6a4f', x: 20, y: 25 }, { color: '#52b788', x: 80, y: 35 }, { color: '#95d5b2', x: 45, y: 75 }, { color: '#b7e4c7', x: 10, y: 70 }] },
  { name: 'Neon', bg: '#0a0a0a', points: [{ color: '#ff006e', x: 15, y: 20 }, { color: '#8338ec', x: 75, y: 25 }, { color: '#3a86ff', x: 50, y: 80 }, { color: '#ffbe0b', x: 90, y: 70 }] },
  { name: 'Pastel', bg: '#fef9ef', points: [{ color: '#ffc8dd', x: 20, y: 20 }, { color: '#bde0fe', x: 80, y: 30 }, { color: '#a2d2ff', x: 50, y: 75 }, { color: '#cdb4db', x: 10, y: 60 }] },
]

function addPoint() {
  const hue = Math.floor(Math.random() * 360)
  points.value.push({
    color: `#${hslToHex(hue, 70, 60)}`,
    x: Math.floor(Math.random() * 80) + 10,
    y: Math.floor(Math.random() * 80) + 10,
  })
}

function removePoint(i: number) {
  points.value.splice(i, 1)
}

function randomize() {
  const count = 3 + Math.floor(Math.random() * 3)
  const baseHue = Math.floor(Math.random() * 360)
  const newPoints: Point[] = []
  for (let i = 0; i < count; i++) {
    const hue = (baseHue + i * (360 / count) + Math.floor(Math.random() * 40 - 20)) % 360
    newPoints.push({
      color: `#${hslToHex(hue, 60 + Math.random() * 30, 50 + Math.random() * 20)}`,
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 80) + 10,
    })
  }
  points.value = newPoints
  bgColor.value = `#${hslToHex(baseHue, 30, 8)}`
}

function loadPreset(preset: Preset) {
  points.value = preset.points.map(p => ({ ...p }))
  bgColor.value = preset.bg
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(255 * f(x)).toString(16).padStart(2, '0')
  return toHex(0) + toHex(8) + toHex(4)
}

function buildGradients(pts: Point[], bgC: string, intens: number): string {
  const gradients = pts.map(p => {
    return `radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent ${intens}%)`
  })
  return `${bgC}; background-image: ${gradients.join(', ')}`
}

const previewStyle = computed(() => ({
  background: buildGradients(points.value, bgColor.value, intensity.value),
}))

const grainStyle = computed(() => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  opacity: grain.value / 100,
  mixBlendMode: 'overlay' as const,
}))

function presetStyle(preset: Preset): Record<string, string> {
  return { background: buildGradients(preset.points, preset.bg, 70) }
}

const cssOutput = computed(() => {
  const gradients = points.value.map(p => {
    return `  radial-gradient(at ${p.x}% ${p.y}%, ${p.color} 0px, transparent ${intensity.value}%)`
  })
  const lines = [
    `.mesh-gradient {`,
    `  background-color: ${bgColor.value};`,
    `  background-image:`,
    gradients.join(',\n') + ';',
  ]
  if (grain.value > 0) {
    lines.push(`  /* Add grain overlay with a pseudo-element or separate element */`)
  }
  lines.push(`}`)
  return lines.join('\n')
})

async function copyCSS() {
  await navigator.clipboard.writeText(cssOutput.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}
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
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
.slider {
  @apply h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer;
}
.slider::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-indigo-500 rounded-full shadow-lg;
}
</style>
