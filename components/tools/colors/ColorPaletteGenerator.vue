<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <!-- Header -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <div class="flex items-center justify-between gap-3 flex-wrap mb-4">
        <h2 class="text-2xl font-semibold">🎨 Color Palette Generator</h2>
        <div class="flex items-center gap-2 flex-wrap">
          <button class="btn" @click="undo" :disabled="!canUndo">↶ undo</button>
          <button class="btn" @click="redo" :disabled="!canRedo">↷ redo</button>
          <button class="btn" @click="shuffle">🔀 shuffle</button>
          <button class="btn" @click="unlockAll" :disabled="!locks.some(Boolean)">🔓 unlock all</button>
          <button class="btn" @click="resetAll">🔄 reset</button>
          <button class="btn-primary" @click="showExportModal = true" :disabled="!resolvedPalette.length">📦 export</button>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="grid md:grid-cols-3 gap-4">
      <div class="card space-y-3">
        <label class="label">🎨 Base Color</label>
        <div class="flex items-center gap-2">
          <input v-model="base" type="color" class="w-12 h-12 p-1 border-2 border-gray-700 rounded-lg bg-black cursor-pointer" />
          <input
              v-model.trim="base"
              @blur="validateBase"
              maxlength="7"
              placeholder="#3498db"
              class="input font-mono w-full"
          />
        </div>
      </div>

      <div class="card space-y-3">
        <label class="label">🔧 Color Scheme</label>
        <select v-model="scheme" class="input">
          <option value="mono">Monochrome (Tailwind-like)</option>
          <option value="material">Material Design</option>
          <option value="analogous">Analogous</option>
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
          <option value="split-complementary">Split Complementary</option>
        </select>
        <p class="text-xs text-gray-400" v-if="scheme === 'mono'">
          📊 10 shades from 50 to 900
        </p>
        <p class="text-xs text-gray-400" v-else-if="scheme === 'material'">
          🎨 Material Design color scale
        </p>
        <p class="text-xs text-gray-400" v-else>
          🔢 {{ steps }} colors with {{ scheme }} harmony
        </p>
      </div>

      <div class="card space-y-3" v-if="!['mono', 'material'].includes(scheme)">
        <label class="label">🔢 Number of Steps</label>
        <input type="number" min="3" max="8" v-model.number="steps" class="input" />
        <p class="text-xs text-gray-400">Palette size for this scheme</p>
      </div>

      <div class="card space-y-3" v-else>
        <label class="label">ℹ️ Palette Info</label>
        <div class="text-sm text-gray-300">
          <p v-if="scheme === 'mono'">
            <strong class="text-indigo-400">10 shades</strong><br/>
            From lightest (50) to darkest (900)
          </p>
          <p v-else>
            <strong class="text-indigo-400">14 colors</strong><br/>
            50-900 + 4 accent shades (A100-A700)
          </p>
        </div>
      </div>
    </div>

    <!-- Palette -->
    <div class="card space-y-4">
      <h3 class="font-semibold text-indigo-400">🎨 Color Palette</h3>
      <div
          v-if="['mono', 'material'].includes(scheme)"
          class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 gap-3"
      >
        <Swatch
            v-for="(c, i) in resolvedPalette"
            :key="'m-'+i"
            :hex="c.hex"
            :label="c.label"
            :locked="locks[i]"
            @toggle-lock="toggleLock(i)"
            @copy="copy"
        />
      </div>

      <div
          v-else
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
      >
        <Swatch
            v-for="(c, i) in resolvedPalette"
            :key="'p-'+i"
            :hex="c.hex"
            :label="c.label"
            :locked="locks[i]"
            @toggle-lock="toggleLock(i)"
            @copy="copy"
        />
      </div>
    </div>

    <!-- Accessibility Checker -->
    <div class="card space-y-4" v-if="resolvedPalette.length > 1">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-indigo-400">♿ Accessibility Check</h3>
        <button class="btn-small" @click="showAccessibility = !showAccessibility">
          {{ showAccessibility ? '▼ hide' : '▶ show' }}
        </button>
      </div>

      <div v-if="showAccessibility" class="space-y-3">
        <p class="text-sm text-gray-400">
          WCAG 2.1 contrast ratios for all color pairs in the palette. Green = AA compliant, Yellow = AAA compliant.
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full text-xs">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left p-2 text-gray-400">Pair</th>
                <th class="text-center p-2 text-gray-400">Contrast</th>
                <th class="text-center p-2 text-gray-400">AA</th>
                <th class="text-center p-2 text-gray-400">AAA</th>
                <th class="text-left p-2 text-gray-400">Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pair, i) in accessibilityPairs" :key="i" class="border-b border-gray-800">
                <td class="p-2 font-mono text-gray-300">{{ pair.label }}</td>
                <td class="p-2 text-center font-mono">{{ pair.ratio.toFixed(2) }}</td>
                <td class="p-2 text-center">
                  <span v-if="pair.passAA" class="text-green-400">✓</span>
                  <span v-else class="text-red-400">✗</span>
                </td>
                <td class="p-2 text-center">
                  <span v-if="pair.passAAA" class="text-yellow-400">✓</span>
                  <span v-else class="text-gray-600">✗</span>
                </td>
                <td class="p-2">
                  <div class="flex gap-1">
                    <div :style="{ backgroundColor: pair.color1, color: pair.color2 }" class="px-2 py-1 rounded text-xs">Aa</div>
                    <div :style="{ backgroundColor: pair.color2, color: pair.color1 }" class="px-2 py-1 rounded text-xs">Aa</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Export Modal -->
    <div v-if="showExportModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" @click.self="showExportModal = false">
      <div class="bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl" @click.stop>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-indigo-400">📦 Export Palette</h3>
            <button class="btn" @click="showExportModal = false">✕ close</button>
          </div>

          <!-- Export Format Tabs -->
          <div class="flex gap-2 border-b border-gray-700 pb-2 flex-wrap">
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
            <pre class="bg-black border border-gray-700 rounded-lg p-4 overflow-auto max-h-96 text-sm text-green-300 font-mono whitespace-pre">{{ exportOutput }}</pre>
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
import { ref, computed, watch, onMounted } from 'vue'

type Scheme = 'mono' | 'material' | 'analogous' | 'complementary' | 'triadic' | 'split-complementary'

/* ---------- state ---------- */
const base = ref('#3498DB')                    // normalized to uppercase
const scheme = ref<Scheme>('mono')
const steps = ref(5)                           // for non-mono/non-material
const copiedMsg = ref('')
const locks = ref<boolean[]>([])               // parallels palette length

/* ---------- export ---------- */
const showExportModal = ref(false)
const exportFormat = ref<'CSS' | 'SCSS' | 'JSON' | 'Tailwind'>('CSS')
const exportFormats: ('CSS' | 'SCSS' | 'JSON' | 'Tailwind')[] = ['CSS', 'SCSS', 'JSON', 'Tailwind']
const exportCopied = ref(false)

/* ---------- accessibility ---------- */
const showAccessibility = ref(false)

/* ---------- history for undo/redo ---------- */
type PaletteState = { base: string; scheme: Scheme; steps: number; locks: boolean[]; palette: Swatch[] | null }
const history = ref<PaletteState[]>([])
const historyIndex = ref(-1)
const maxHistory = 20

/* ---------- utils: color ---------- */
function clamp(n: number, a=0, b=1) { return Math.min(b, Math.max(a, n)) }
function isHex(s: string) { return /^#[0-9A-F]{6}$/i.test(s) }

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return { r: 0, g: 0, b: 0 }
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) }
}
function rgbToHex(r: number, g: number, b: number) {
  return ('#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')).toUpperCase()
}
function rgbToHsl(r: number, g: number, b: number) {
  r/=255; g/=255; b/=255
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  let h=0, s=0, l=(max+min)/2
  const d = max-min
  if (d) {
    s = l>0.5 ? d/(2-max-min) : d/(max+min)
    switch (max) {
      case r: h = (g-b)/d + (g<b?6:0); break
      case g: h = (b-r)/d + 2; break
      case b: h = (r-g)/d + 4; break
    }
    h/=6
  }
  return { h, s, l }
}
function hslToRgb(h: number, s: number, l: number) {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t<0) t+=1; if (t>1) t-=1
    if (t<1/6) return p+(q-p)*6*t
    if (t<1/2) return q
    if (t<2/3) return p+(q-p)*(2/3 - t)*6
    return p
  }
  let r: number, g: number, b: number
  if (s === 0) { r=g=b=l }
  else {
    const q = l < .5 ? l*(1+s) : l + s - l*s
    const p = 2*l - q
    r = hue2rgb(p,q,h + 1/3)
    g = hue2rgb(p,q,h)
    b = hue2rgb(p,q,h - 1/3)
  }
  return { r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255) }
}
function shiftHue(hex: string, deg: number) {
  const { r,g,b } = hexToRgb(hex)
  const { h,s,l } = rgbToHsl(r,g,b)
  const nh = (h + deg/360 + 10) % 1 - 10%1 // safe mod
  const { r: R, g: G, b: B } = hslToRgb(nh<0?nh+1:nh, s, l)
  return rgbToHex(R,G,B)
}
function setLightness(hex: string, lPct: number) {
  const { r,g,b } = hexToRgb(hex)
  const { h,s } = rgbToHsl(r,g,b)
  const { r: R, g: G, b: B } = hslToRgb(h, s, clamp(lPct/100))
  return rgbToHex(R,G,B)
}
function relativeLuminance(hex: string) {
  const { r,g,b } = hexToRgb(hex)
  const srgb = [r,g,b].map(v => v/255).map(v => v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4))
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2]
}
function textOn(hex: string) { return relativeLuminance(hex) > 0.45 ? '#111111' : '#FFFFFF' }

/* ---------- palette builders ---------- */
type Swatch = { hex: string; label: string }

// Tailwind-like stops (lighter→darker)
const monoStops = [
  { label: '50',  l: 97 },
  { label: '100', l: 93 },
  { label: '200', l: 86 },
  { label: '300', l: 77 },
  { label: '400', l: 66 },
  { label: '500', l: 56 },
  { label: '600', l: 46 },
  { label: '700', l: 36 },
  { label: '800', l: 26 },
  { label: '900', l: 17 }
]

function buildMono(baseHex: string): Swatch[] {
  // keep hue/sat of base; distribute lightness by stops
  const { r,g,b } = hexToRgb(baseHex)
  const { h, s } = rgbToHsl(r,g,b)
  return monoStops.map(({ label, l }) => {
    const { r: R, g: G, b: B } = hslToRgb(h, s, l/100)
    return { hex: rgbToHex(R,G,B), label }
  })
}

function buildAnalogous(baseHex: string, n: number): Swatch[] {
  const spread = 60 // total degrees spread
  const step = spread / Math.max(1, n-1)
  const start = -spread/2
  return Array.from({ length: n }, (_, i) => {
    const h = shiftHue(baseHex, start + i*step)
    return { hex: setLightness(h, 50), label: `${Math.round(start + i*step)}°` }
  })
}

function buildComplementary(baseHex: string, n: number): Swatch[] {
  // pair around complements
  const baseComp = shiftHue(baseHex, 180)
  const list = [baseHex, baseComp]
  while (list.length < n) {
    list.push(shiftHue(baseHex, 30*(list.length-1)))
  }
  return list.slice(0, n).map((h, i) => ({ hex: setLightness(h, 50), label: i===0?'base':i===1?'comp':'var' }))
}

function buildTriadic(baseHex: string, n: number): Swatch[] {
  const thirds = [0, 120, -120].map(d => shiftHue(baseHex, d))
  const out: string[] = []
  for (let i=0; i<n; i++) out.push(thirds[i % 3])
  return out.map((h,i)=>({ hex: setLightness(h, 50), label: ['A','B','C'][i%3] }))
}

function buildSplitComplementary(baseHex: string, n: number): Swatch[] {
  // Base + 2 colors on either side of complement (150° and 210°)
  const colors = [
    baseHex,
    shiftHue(baseHex, 150),
    shiftHue(baseHex, 210)
  ]
  const out: string[] = []
  for (let i = 0; i < n; i++) out.push(colors[i % 3])
  return out.map((h, i) => ({ hex: setLightness(h, 50), label: ['Base', 'Split1', 'Split2'][i % 3] }))
}

function buildMaterial(baseHex: string): Swatch[] {
  // Material Design palette: 50, 100, 200...900 + A100, A200, A400, A700
  const { r, g, b } = hexToRgb(baseHex)
  const { h, s } = rgbToHsl(r, g, b)

  const mainStops = [
    { label: '50', l: 95, s: s * 0.9 },
    { label: '100', l: 90, s: s * 0.95 },
    { label: '200', l: 80, s: s },
    { label: '300', l: 70, s: s },
    { label: '400', l: 60, s: s },
    { label: '500', l: 50, s: s },
    { label: '600', l: 40, s: s },
    { label: '700', l: 33, s: s * 1.05 },
    { label: '800', l: 26, s: s * 1.1 },
    { label: '900', l: 19, s: s * 1.15 }
  ]

  const accentStops = [
    { label: 'A100', l: 82, s: s * 1.2 },
    { label: 'A200', l: 68, s: s * 1.3 },
    { label: 'A400', l: 55, s: s * 1.4 },
    { label: 'A700', l: 42, s: s * 1.5 }
  ]

  const main = mainStops.map(({ label, l, s: sat }) => {
    const { r: R, g: G, b: B } = hslToRgb(h, Math.min(1, sat), l / 100)
    return { hex: rgbToHex(R, G, B), label }
  })

  const accent = accentStops.map(({ label, l, s: sat }) => {
    const { r: R, g: G, b: B } = hslToRgb(h, Math.min(1, sat), l / 100)
    return { hex: rgbToHex(R, G, B), label }
  })

  return [...main, ...accent]
}

/* ---------- palette & locks ---------- */
const palette = computed<Swatch[]>(() => {
  const b = normalizedBase.value
  let arr: Swatch[] = []
  if (scheme.value === 'mono') arr = buildMono(b)
  else if (scheme.value === 'material') arr = buildMaterial(b)
  else if (scheme.value === 'analogous') arr = buildAnalogous(b, steps.value)
  else if (scheme.value === 'complementary') arr = buildComplementary(b, steps.value)
  else if (scheme.value === 'triadic') arr = buildTriadic(b, steps.value)
  else arr = buildSplitComplementary(b, steps.value)

  // sync locks length
  if (locks.value.length !== arr.length) {
    const prev = locks.value
    locks.value = Array.from({ length: arr.length }, (_, i) => prev[i] ?? false)
  }
  return arr
})

const normalizedBase = computed(() => {
  const v = base.value.trim().toUpperCase()
  return isHex(v) ? v : '#3498DB'
})

function validateBase() {
  if (!isHex(base.value.trim())) base.value = '#3498DB'
  else base.value = base.value.trim().toUpperCase()
}

function toggleLock(i: number) { locks.value[i] = !locks.value[i] }
function unlockAll() { locks.value = locks.value.map(() => false) }

function shuffle() {
  saveToHistory()

  // re-generate only unlocked swatches
  if (scheme.value === 'mono' || scheme.value === 'material') {
    // jitter lightness by +/- 2 points for unlocked
    const current = scheme.value === 'mono' ? buildMono(normalizedBase.value) : buildMaterial(normalizedBase.value)
    const stops = scheme.value === 'mono' ? monoStops : []
    const jittered = current.map((s, i) => {
      if (locks.value[i]) return s
      // small random tweak via lightness set
      const l = stops[i] ? clamp(stops[i].l + (Math.random()*4 - 2), 10, 98) : 50
      return { hex: setLightness(normalizedBase.value, l), label: s.label }
    })
    applyPalette(jittered)
  } else {
    const deg = (Math.random()*20 - 10) // -10..+10°
    let gen: Swatch[]
    if (scheme.value === 'analogous') gen = buildAnalogous(shiftHue(normalizedBase.value, deg), steps.value)
    else if (scheme.value === 'complementary') gen = buildComplementary(shiftHue(normalizedBase.value, deg), steps.value)
    else if (scheme.value === 'triadic') gen = buildTriadic(shiftHue(normalizedBase.value, deg), steps.value)
    else gen = buildSplitComplementary(shiftHue(normalizedBase.value, deg), steps.value)
    applyPalette(gen)
  }
}
function applyPalette(newP: Swatch[]) {
  const merged = newP.map((sw, i) => (locks.value[i] ? palette.value[i] : sw))
  // quick replace via base/steps tweak not needed; just reconstruct via local copy:
  internalOverride.value = merged
  // sync locks length just in case
  if (locks.value.length !== merged.length) locks.value = Array.from({ length: merged.length }, (_, i) => locks.value[i] ?? false)
}
const internalOverride = ref<Swatch[]|null>(null)
const resolvedPalette = computed(() => internalOverride.value ?? palette.value)
watch([() => palette.value, scheme, steps], () => { internalOverride.value = null })

/* ---------- outputs ---------- */
const cssVars = computed(() => {
  const lines = resolvedPalette.value.map((s, i) => `  --color-${s.label.toLowerCase()}: ${s.hex};`)
  return `:root{\n${lines.join('\n')}\n}`
})

/* ---------- accessibility checker ---------- */
function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = relativeLuminance(hex1)
  const lum2 = relativeLuminance(hex2)
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

const accessibilityPairs = computed(() => {
  const palette = resolvedPalette.value
  if (palette.length < 2) return []

  // Check first 5 colors against each other (to avoid too many pairs)
  const limit = Math.min(palette.length, 5)
  const pairs: Array<{ label: string; color1: string; color2: string; ratio: number; passAA: boolean; passAAA: boolean }> = []

  for (let i = 0; i < limit; i++) {
    for (let j = i + 1; j < limit; j++) {
      const c1 = palette[i]
      const c2 = palette[j]
      const ratio = contrastRatio(c1.hex, c2.hex)
      pairs.push({
        label: `${c1.label} / ${c2.label}`,
        color1: c1.hex,
        color2: c2.hex,
        ratio,
        passAA: ratio >= 4.5,
        passAAA: ratio >= 7
      })
    }
  }

  return pairs.sort((a, b) => b.ratio - a.ratio)
})

/* ---------- export functionality ---------- */
const exportOutput = computed(() => {
  const palette = resolvedPalette.value
  if (palette.length === 0) return 'No colors to export'

  if (exportFormat.value === 'CSS') {
    return `:root {\n${palette.map(s => `  --color-${s.label.toLowerCase().replace(/\s/g, '-')}: ${s.hex};`).join('\n')}\n}`
  } else if (exportFormat.value === 'SCSS') {
    return palette.map(s => `$color-${s.label.toLowerCase().replace(/\s/g, '-')}: ${s.hex};`).join('\n')
  } else if (exportFormat.value === 'JSON') {
    return JSON.stringify(
      palette.map(s => ({ label: s.label, hex: s.hex })),
      null,
      2
    )
  } else if (exportFormat.value === 'Tailwind') {
    const colorObj = palette.reduce((acc, s) => {
      const key = s.label.toLowerCase().replace(/\s/g, '-')
      acc[key] = s.hex
      return acc
    }, {} as Record<string, string>)
    return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        'palette': ${JSON.stringify(colorObj, null, 8).replace(/^/gm, '        ').trim()}\n      }\n    }\n  }\n}`
  }
  return ''
})

function copyExport() {
  navigator.clipboard.writeText(exportOutput.value)
  exportCopied.value = true
  setTimeout(() => (exportCopied.value = false), 1500)
}

/* ---------- history & undo/redo ---------- */
const canUndo = computed(() => historyIndex.value > 0)
const canRedo = computed(() => historyIndex.value < history.value.length - 1)

function saveToHistory() {
  const state: PaletteState = {
    base: base.value,
    scheme: scheme.value,
    steps: steps.value,
    locks: [...locks.value],
    palette: internalOverride.value ? [...internalOverride.value] : null
  }

  // Remove any future history if we're not at the end
  if (historyIndex.value < history.value.length - 1) {
    history.value.splice(historyIndex.value + 1)
  }

  history.value.push(state)
  if (history.value.length > maxHistory) {
    history.value.shift()
  } else {
    historyIndex.value++
  }
}

function undo() {
  if (!canUndo.value) return
  historyIndex.value--
  const state = history.value[historyIndex.value]
  base.value = state.base
  scheme.value = state.scheme
  steps.value = state.steps
  locks.value = [...state.locks]
  internalOverride.value = state.palette ? [...state.palette] : null
}

function redo() {
  if (!canRedo.value) return
  historyIndex.value++
  const state = history.value[historyIndex.value]
  base.value = state.base
  scheme.value = state.scheme
  steps.value = state.steps
  locks.value = [...state.locks]
  internalOverride.value = state.palette ? [...state.palette] : null
}

/* ---------- clipboard / downloads ---------- */
function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1200)
}
function downloadJson() {
  const data = resolvedPalette.value.map(s => ({ label: s.label, hex: s.hex }))
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'palette.json'
  a.click()
}

/* ---------- persistence ---------- */
watch([base, scheme, steps], () => {
  try {
    localStorage.setItem('palette-settings', JSON.stringify({ base: base.value, scheme: scheme.value, steps: steps.value }))
  } catch {}
}, { deep: true })

// Watch for changes and save to history (debounced)
let historyTimeout: NodeJS.Timeout | null = null
watch([base, scheme, steps], () => {
  if (historyTimeout) clearTimeout(historyTimeout)
  historyTimeout = setTimeout(() => {
    saveToHistory()
  }, 500)
}, { deep: true })

// Load settings from localStorage on mount (client-only)
onMounted(() => {
  try {
    const raw = localStorage.getItem('palette-settings')
    if (raw) {
      const s = JSON.parse(raw)
      if (typeof s?.base === 'string') base.value = s.base
      if (['mono','material','analogous','complementary','triadic','split-complementary'].includes(s?.scheme)) scheme.value = s.scheme
      if (Number.isFinite(s?.steps)) steps.value = clamp(s.steps, 3, 8)
    }
  } catch {}

  // Initialize history with first state after loading settings
  saveToHistory()
})

/* ---------- helpers ---------- */
function resetAll() {
  saveToHistory()
  base.value = '#3498DB'
  scheme.value = 'mono'
  steps.value = 5
  locks.value = []
  internalOverride.value = null
  showAccessibility.value = false
}
</script>

<script lang="ts">
import { h, defineComponent, computed } from 'vue'

/* Swatch subcomponent using render function */
const Swatch = defineComponent({
  name: 'Swatch',
  props: {
    hex: { type: String, required: true },
    label: { type: String, required: true },
    locked: { type: Boolean, default: false }
  },
  emits: ['copy', 'toggle-lock'],
  setup(props, { emit }) {
    const textColor = computed(() => {
      const hex = (props.hex || '#000000').toUpperCase()
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
      const lum = (v:number)=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}
      const L = 0.2126*lum(r)+0.7152*lum(g)+0.0722*lum(b)
      return L > 0.45 ? '#111111' : '#FFFFFF'
    })

    return () => h('div', { class: 'rounded overflow-hidden border border-gray-700 group' }, [
      h('div', {
        style: { backgroundColor: props.hex, color: textColor.value },
        class: 'h-20 flex items-center justify-between px-2 transition'
      }, [
        h('span', { class: 'text-xs opacity-90 font-mono' }, props.label),
        h('button', {
          class: 'text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-black/20 hover:bg-black/30',
          onClick: () => emit('toggle-lock'),
          title: props.locked ? 'Unlock' : 'Lock'
        }, props.locked ? 'locked' : 'lock')
      ]),
      h('div', { class: 'bg-gray-900 px-2 py-2 flex items-center justify-between' }, [
        h('code', { class: 'text-xs font-mono text-white' }, props.hex),
        h('button', {
          class: 'btn !px-2 !py-1 text-xs',
          onClick: () => emit('copy', props.hex)
        }, 'copy')
      ])
    ])
  }
})

export default {
  components: {
    Swatch
  }
}
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300;
}
.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}
.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
}
.btn-primary:disabled {
  @apply opacity-50 cursor-not-allowed;
}
.btn-small {
  @apply bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded text-xs text-gray-300 transition-colors;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
</style>

