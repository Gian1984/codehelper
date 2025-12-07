<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <!-- Header -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <h2 class="text-2xl font-semibold">🌗 Color Shades Generator</h2>
        <div class="flex items-center gap-2">
          <button class="btn" @click="reset">↺ reset</button>
        </div>
      </div>
    </div>

    <!-- Controls Grid -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Base Color -->
      <div class="card space-y-3">
        <label class="label">🎨 Base Color (HEX)</label>
        <div class="flex items-center gap-3">
          <input v-model="hex" type="color" class="w-12 h-12 p-1 border-2 border-gray-700 rounded-lg bg-black cursor-pointer" />
          <input
              v-model.trim="hex"
              @blur="normalizeHex"
              maxlength="7"
              class="input font-mono w-full"
              placeholder="#0099ff"
          />
        </div>
        <p class="text-xs text-gray-400">Paste any 6-digit hex (#RRGGBB).</p>
      </div>

      <!-- Generation Settings -->
      <div class="card space-y-3">
        <label class="label">⚙️ Generation Settings</label>
        
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-400">Hue Lock</span>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="lockHue" class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500" />
            <span class="text-sm text-gray-300">Lock base hue</span>
          </label>
        </div>

        <div>
          <div class="flex justify-between mb-1">
            <span class="text-xs text-gray-400">Saturation Bias</span>
            <span class="text-xs font-mono text-indigo-400">{{ satBias >= 0 ? '+' : ''}}{{ satBias }}</span>
          </div>
          <input type="range" min="-40" max="40" step="1" v-model.number="satBias" class="w-full accent-indigo-500" />
        </div>

        <div>
          <label class="text-xs text-gray-400 block mb-1">Lightness Range (50 → 900)</label>
          <div class="flex items-center gap-2">
            <input type="number" class="input flex-1 !py-1 !text-xs" v-model.number="lightMin" min="85" max="99" placeholder="Lightest" />
            <span class="text-gray-500">→</span>
            <input type="number" class="input flex-1 !py-1 !text-xs" v-model.number="lightMax" min="5" max="30" placeholder="Darkest" />
          </div>
        </div>
      </div>

      <!-- Export -->
      <div class="card space-y-3 lg:col-span-2">
        <label class="label">📦 Output Export</label>
        <div class="grid md:grid-cols-2 gap-4">
          <!-- JSON Export -->
          <div class="relative">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-gray-400">JSON</span>
              <button class="text-[10px] text-indigo-400 hover:text-indigo-300 uppercase tracking-wide font-bold" @click="copy(jsonExport)">Copy</button>
            </div>
            <pre class="bg-black border border-gray-700 rounded p-2 text-[10px] text-green-300 font-mono h-32 overflow-y-auto">{{ jsonExport }}</pre>
          </div>
          
          <!-- Tailwind Export -->
          <div class="relative">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-gray-400">Tailwind Config</span>
              <button class="text-[10px] text-indigo-400 hover:text-indigo-300 uppercase tracking-wide font-bold" @click="copy(twExport)">Copy</button>
            </div>
            <pre class="bg-black border border-gray-700 rounded p-2 text-[10px] text-blue-300 font-mono h-32 overflow-y-auto">{{ twExport }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Info Bar -->
    <div class="flex flex-wrap items-center gap-4 text-xs text-gray-400 bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-700/50">
      <span>Base HSL: <span class="font-mono text-white">{{ Math.round(hsl.h) }}°, {{ Math.round(hsl.s) }}%, {{ Math.round(hsl.l) }}%</span></span>
      <span class="hidden sm:inline text-gray-600">|</span>
      <span>Strategy: Interpolated Ramp</span>
      <span class="ml-auto text-green-400 font-medium transition-opacity duration-300" :class="copiedMsg ? 'opacity-100' : 'opacity-0'">✓ {{ copiedMsg }}</span>
    </div>

    <!-- Palette Display -->
    <div class="card space-y-4">
      <h3 class="font-semibold text-indigo-400">🎨 Generated Palette</h3>
      <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        <div
            v-for="t in TONES"
            :key="t"
            class="group cursor-pointer flex flex-col"
            @click="copy(palette[t])"
        >
          <div
              class="h-24 w-full rounded-t-lg flex items-center justify-center transition-transform group-hover:-translate-y-1 relative overflow-hidden ring-1 ring-white/10"
              :style="{ backgroundColor: palette[t], color: swatchTextColor[t] }"
          >
            <span class="text-sm font-bold opacity-90">{{ t }}</span>
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span class="bg-black/50 px-2 py-1 rounded text-xs text-white backdrop-blur-sm">Copy</span>
            </div>
          </div>
          
          <div class="bg-gray-900 border-x border-b border-gray-700 rounded-b-lg p-2 space-y-1">
            <code class="block text-[10px] text-center font-mono text-white">{{ palette[t] }}</code>
            <div class="flex justify-between items-center text-[9px] text-gray-500">
              <span>Contrast</span>
              <span :class="contrastScore(t) >= 4.5 ? 'text-green-400' : 'text-yellow-500'">{{ contrastRatioText(t) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

/** ------------ state ------------ */
const hex = ref('#0099FF')
const lockHue = ref(true)
const satBias = ref(0)             // -40 .. +40
const lightMin = ref(95)           // tone 50 lightness
const lightMax = ref(16)           // tone 900 lightness (lower = darker)
const copiedMsg = ref('')

/** ------------ helpers: color math ------------ */
type HSL = { h: number; s: number; l: number }

function clamp(n: number, min: number, max: number) { return Math.min(max, Math.max(min, n)) }

function normalizeHex() {
  const v = hex.value.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(v)) { hex.value = v.toUpperCase(); return }
  // try to expand #RGB
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    const r = v[1], g = v[2], b = v[3]
    hex.value = ('#' + r + r + g + g + b + b).toUpperCase()
    return
  }
  hex.value = '#0099FF'
}

function hexToRgb(h: string) {
  const m = h.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return { r: 0, g: 0, b: 0 }
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}
function rgbToHex(r: number, g: number, b: number) {
  return ('#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')).toUpperCase()
}
function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  const d = max - min
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h *= 60
  }
  return { h, s: s * 100, l: l * 100 }
}
function hslToRgb(h: number, s: number, l: number) {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  }
}
function hslToHex(h: number, s: number, l: number) {
  const { r, g, b } = hslToRgb(h, s, l)
  return rgbToHex(r, g, b)
}

/** WCAG contrast & text color */
function srgbToLin(c: number) {
  c /= 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
function relLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b)
}
function contrastRatio(fg: string, bg: string) {
  const L1 = relLuminance(fg)
  const L2 = relLuminance(bg)
  const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1]
  return (hi + 0.05) / (lo + 0.05)
}
function bestTextOn(bg: string) {
  const cBlack = contrastRatio('#000000', bg)
  const cWhite = contrastRatio('#FFFFFF', bg)
  return cWhite >= cBlack ? '#FFFFFF' : '#000000'
}

/** ------------ palette generation ------------ */
const TONES = [50,100,200,300,400,500,600,700,800,900] as const

const hsl = computed(() => {
  const { r, g, b } = hexToRgb(hex.value)
  return rgbToHsl(r, g, b)
})

function toneLightness(tone: number) {
  // Interpolate between lightMin (tone 50) and lightMax (tone 900)
  const idx = TONES.indexOf(tone)
  const t = idx / (TONES.length - 1) // 0..1
  // ease a bit to give more mid contrast
  const ease = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * x)
  const l = lightMin.value + (lightMax.value - lightMin.value) * ease(t)
  return clamp(l, 0, 100)
}

function toneSaturation(tone: number) {
  // keep base saturation, bias slightly as tones darken/lighten
  const baseS = clamp(hsl.value.s + satBias.value, 0, 100)
  const idx = TONES.indexOf(tone)
  const t = idx / (TONES.length - 1) // 0..1
  // less saturation at very light end; more towards darks for vibrancy
  const mod = (1 - Math.abs(0.5 - t) * 1.4) // 0..1 emphasis
  const s = clamp(baseS * (0.85 + 0.3 * mod), 0, 100)
  return s
}

const palette = computed<Record<number, string>>(() => {
  const out: Record<number, string> = {} as any
  for (const tone of TONES) {
    const l = toneLightness(tone)
    const s = toneSaturation(tone)
    const h = lockHue.value ? hsl.value.h : hsl.value.h // (hook to shift hue per tone if desired)
    out[tone] = hslToHex(h, s, l)
  }
  return out
})

const swatchTextColor = computed<Record<number, string>>(() =>
    Object.fromEntries(TONES.map(t => [t, bestTextOn(palette.value[t])])) as Record<number, string>
)

function contrastScore(tone: number) {
  return contrastRatio(swatchTextColor.value[tone], palette.value[tone])
}

function contrastRatioText(tone: number) {
  return contrastScore(tone).toFixed(2) + ':1'
}

/** ------------ exports + utils ------------ */
const jsonExport = computed(() =>
    JSON.stringify(
        Object.fromEntries(TONES.map(t => [t, palette.value[t]])),
        null,
        2
    )
)

const twExport = computed(() => {
  const lines = TONES.map(t => `      ${t}: '${palette.value[t]}',`).join('\n')
  return `theme: {\n  extend: {\n    colors: {\n      primary: {\n${lines}\n      }\n    }\n  }\n}`
})

function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1200)
}

function reset() {
  hex.value = '#0099FF'
  lockHue.value = true
  satBias.value = 0
  lightMin.value = 95
  lightMax.value = 16
}
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block;
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
</style>