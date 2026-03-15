<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🎨 Tailwind Config Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Enter your brand colors and generate a ready-to-use Tailwind CSS config</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="generate" title="Generate config">
          ⚡ Generate
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Color Entries -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <label class="label !mb-0 font-semibold">🎨 Brand Colors</label>
        <button class="btn text-xs" @click="addColor">+ Add Color</button>
      </div>

      <div class="space-y-3">
        <div v-for="(color, i) in colors" :key="i" class="flex items-center gap-3 bg-gray-800 rounded-lg p-3 border border-gray-700">
          <input type="color" v-model="color.value" class="w-10 h-10 rounded border border-gray-600 cursor-pointer bg-transparent flex-shrink-0" />
          <div class="flex-1 grid grid-cols-2 gap-2">
            <input v-model="color.name" class="input text-sm" placeholder="Color name (e.g. primary)" />
            <input v-model="color.value" class="input text-sm font-mono" placeholder="#3b82f6" />
          </div>
          <label class="inline-flex items-center gap-1 cursor-pointer flex-shrink-0">
            <input type="checkbox" v-model="color.generateShades" />
            <span class="text-xs text-gray-400">Shades</span>
          </label>
          <button v-if="colors.length > 1" class="text-red-400 hover:text-red-300 text-lg flex-shrink-0" @click="colors.splice(i, 1)">✕</button>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div v-if="colors.length > 0" class="card">
      <label class="label font-semibold mb-3">👁️ Color Preview</label>
      <div class="space-y-4">
        <div v-for="color in colors" :key="color.name" class="space-y-2">
          <div class="text-sm text-gray-400 font-mono">{{ color.name || 'unnamed' }}</div>
          <div v-if="color.generateShades" class="flex rounded-lg overflow-hidden h-12">
            <div v-for="shade in generateShades(color.value)" :key="shade.key"
                class="flex-1 flex items-end justify-center pb-1"
                :style="{ backgroundColor: shade.hex }">
              <span class="text-[9px] font-mono" :style="{ color: shade.textColor }">{{ shade.key }}</span>
            </div>
          </div>
          <div v-else class="flex gap-2">
            <div class="h-12 w-24 rounded-lg flex items-end justify-center pb-1" :style="{ backgroundColor: color.value }">
              <span class="text-[10px] font-mono" :style="{ color: getContrast(color.value) }">{{ color.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Output -->
    <div v-if="output" class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 tailwind.config.js</label>
        <button class="btn" @click="copyConfig">📋 Copy</button>
      </div>
      <span v-if="copied" class="text-green-400 text-xs font-medium">✅ Copied!</span>
      <pre class="mono-box max-h-[500px] whitespace-pre-wrap">{{ output }}</pre>
    </div>

    <div v-if="!output" class="card text-center py-16 text-gray-500">
      <div class="text-4xl mb-4">🎨</div>
      <p>Add your brand colors and click "Generate" to get a Tailwind config</p>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ColorEntry {
  name: string
  value: string
  generateShades: boolean
}

const colors = ref<ColorEntry[]>([
  { name: 'primary', value: '#3b82f6', generateShades: true },
  { name: 'secondary', value: '#8b5cf6', generateShades: true },
  { name: 'accent', value: '#f59e0b', generateShades: false },
])

const output = ref('')
const copied = ref(false)

function addColor() {
  colors.value.push({ name: '', value: '#6366f1', generateShades: false })
}

function clearAll() {
  colors.value = [{ name: 'primary', value: '#3b82f6', generateShades: true }]
  output.value = ''
  copied.value = false
}

async function copyConfig() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const h2 = hex.replace('#', '')
  const r = parseInt(h2.substring(0, 2), 16) / 255
  const g = parseInt(h2.substring(2, 4), 16) / 255
  const b = parseInt(h2.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let hue = 0
  let sat = 0
  const lig = (max + min) / 2

  if (max !== min) {
    const d = max - min
    sat = lig > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) hue = ((b - r) / d + 2) / 6
    else hue = ((r - g) / d + 4) / 6
  }

  return { h: Math.round(hue * 360), s: Math.round(sat * 100), l: Math.round(lig * 100) }
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(255 * f(x)).toString(16).padStart(2, '0')
  return '#' + toHex(0) + toHex(8) + toHex(4)
}

function generateShades(hex: string): { key: string; hex: string; textColor: string }[] {
  const { h, s } = hexToHsl(hex)
  const shadeKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
  const lightnesses = [97, 93, 86, 76, 64, 50, 40, 32, 24, 17, 10]
  return shadeKeys.map((key, i) => {
    const shadeHex = hslToHex(h, s, lightnesses[i])
    return { key, hex: shadeHex, textColor: getContrast(shadeHex) }
  })
}

function getContrast(hex: string): string {
  const h2 = hex.replace('#', '')
  const r = parseInt(h2.substring(0, 2), 16)
  const g = parseInt(h2.substring(2, 4), 16)
  const b = parseInt(h2.substring(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.5 ? '#1a1a2e' : '#ffffff'
}

function generate() {
  copied.value = false
  const colorConfig: Record<string, unknown> = {}

  for (const color of colors.value) {
    const name = (color.name || 'color').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase()
    if (!name) continue

    if (color.generateShades) {
      const shades = generateShades(color.value)
      const shadeObj: Record<string, string> = {}
      for (const shade of shades) shadeObj[shade.key] = shade.hex
      shadeObj['DEFAULT'] = color.value
      colorConfig[name] = shadeObj
    } else {
      colorConfig[name] = color.value
    }
  }

  const configStr = JSON.stringify({ theme: { extend: { colors: colorConfig } } }, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")

  output.value = `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${configStr}`
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
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500;
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
</style>
