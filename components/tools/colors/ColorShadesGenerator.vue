<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow space-y-6 text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Color Shades Generator</h2>
      <span v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</span>
    </div>

    <!-- Base color + controls -->
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="card p-4 space-y-3">
        <label class="block text-sm text-gray-300">Base color (HEX)</label>
        <div class="flex items-center gap-3">
          <input v-model="hex" type="color" class="w-12 h-10 p-0 rounded border border-gray-600" />
          <input
              v-model.trim="hex"
              @blur="normalizeHex"
              maxlength="7"
              class="input mono w-36"
              placeholder="#0099ff"
          />
        </div>
        <p class="text-xs text-gray-400">Tip: you can paste any 6-digit hex (#RRGGBB).</p>
      </div>

      <div class="card p-4 space-y-3">
        <div class="flex items-center justify-between">
          <label class="block text-sm text-gray-300">Hue lock</label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" v-model="lockHue" />
            Lock base hue
          </label>
        </div>
        <div>
          <label class="block text-sm text-gray-300 mb-1">Saturation bias</label>
          <input type="range" min="-40" max="40" step="1" v-model.number="satBias" class="w-full" />
          <div class="text-xs text-gray-400">Adjust saturation across the ramp (− desaturate · + saturate)</div>
        </div>
        <div>
          <label class="block text-sm text-gray-300 mb-1">Lightness range</label>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <span class="text-xs text-gray-400">Lightest (tone 50)</span>
              <input type="number" class="input w-full" v-model.number="lightMin" min="85" max="99" />
            </div>
            <div>
              <span class="text-xs text-gray-400">Darkest (tone 900)</span>
              <input type="number" class="input w-full" v-model.number="lightMax" min="5" max="30" />
            </div>
          </div>
          <div class="text-xs text-gray-400 mt-1">Higher Lightest = brighter 50; lower Darkest = deeper 900.</div>
        </div>
      </div>

      <div class="card p-4 space-y-3">
        <label class="block text-sm text-gray-300">Output</label>
        <div class="bg-gray-950 rounded border border-gray-800 p-3 space-y-2 text-sm">
          <div class="flex items-center justify-between gap-2">
            <span class="text-gray-300">JSON palette</span>
            <button class="btn" @click="copy(jsonExport)">Copy</button>
          </div>
          <pre class="text-green-300 font-mono whitespace-pre-wrap break-words text-xs">{{ jsonExport }}</pre>
        </div>
        <div class="bg-gray-950 rounded border border-gray-800 p-3 space-y-2 text-sm">
          <div class="flex items-center justify-between gap-2">
            <span class="text-gray-300">Tailwind config</span>
            <button class="btn" @click="copy(twExport)">Copy</button>
          </div>
          <pre class="text-blue-300 font-mono whitespace-pre-wrap break-words text-xs">{{ twExport }}</pre>
        </div>
      </div>
    </div>

    <!-- Palette -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div
          v-for="t in TONES"
          :key="t"
          class="rounded-lg overflow-hidden border border-gray-800 group cursor-pointer"
          @click="copy(palette[t])"
      >
        <div
            class="h-20 sm:h-24 grid place-items-center"
            :style="{ backgroundColor: palette[t], color: swatchTextColor[t] }"
        >
          <span class="text-sm font-medium opacity-90">{{ t }}</span>
        </div>
        <div class="bg-gray-950 px-3 py-2 flex items-center justify-between">
          <code class="text-xs font-mono text-white">{{ palette[t] }}</code>
          <span class="text-[10px] text-gray-400">contrast {{ contrastRatioText(t) }}</span>
        </div>
      </div>
    </div>

    <!-- Current numeric HSL -->
    <div class="text-xs text-gray-400">
      Base HSL: <span class="font-mono text-white">{{ Math.round(hsl.h) }}°, {{ Math.round(hsl.s) }}%, {{ Math.round(hsl.l) }}%</span>
      • Strategy: HSL ramp with hue {{ lockHue ? 'locked' : 'kept' }} and saturation bias {{ satBias >= 0 ? '+' : ''}}{{ satBias }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

/** ------------ state ------------ */
const hex = ref('#0099ff')
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

function contrastRatioText(tone: number) {
  const ratio = contrastRatio(swatchTextColor.value[tone], palette.value[tone])
  return ratio.toFixed(2) + ':1'
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
</script>

<style scoped>
.card { @apply bg-gray-800/60 rounded-xl border border-gray-800; }
.input { @apply bg-gray-950 text-white border border-gray-700 rounded px-3 py-2; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.mono { @apply font-mono; }
</style>
