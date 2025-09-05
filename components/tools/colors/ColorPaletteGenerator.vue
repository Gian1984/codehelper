<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Color Palette Generator</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="shuffle">shuffle</button>
        <button class="btn" @click="unlockAll" :disabled="!locks.some(Boolean)">unlock all</button>
        <button class="btn" @click="resetAll">reset</button>
        <button class="btn-primary" @click="copy(cssVars)" :disabled="!palette.length">copy CSS vars</button>
        <button class="btn" @click="downloadJson" :disabled="!palette.length">download JSON</button>
      </div>
    </div>

    <!-- Controls -->
    <div class="grid md:grid-cols-3 gap-4">
      <div class="card space-y-2">
        <label class="label">base color</label>
        <div class="flex items-center gap-2">
          <input v-model="base" type="color" class="w-12 h-10 p-0 border border-gray-500 rounded" />
          <input
              v-model.trim="base"
              @blur="validateBase"
              maxlength="7"
              placeholder="#3498db"
              class="input font-mono w-full"
          />
        </div>
      </div>

      <div class="card space-y-2">
        <label class="label">scheme</label>
        <select v-model="scheme" class="input">
          <option value="mono">Monochrome (50→900)</option>
          <option value="analogous">Analogous</option>
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
        </select>
        <p class="text-xs text-gray-400">Monochrome follows Tailwind-like stops.</p>
      </div>

      <div class="card space-y-2">
        <label class="label">steps (non-mono)</label>
        <input type="number" min="3" max="8" v-model.number="steps" class="input" />
        <p class="text-xs text-gray-400">Used for Analogous, Complementary, Triadic.</p>
      </div>
    </div>

    <!-- Palette -->
    <div class="card p-4">
      <div
          v-if="scheme === 'mono'"
          class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3"
      >
        <Swatch
            v-for="(c, i) in palette"
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
          class="grid grid-cols-2 sm:grid-cols-5 gap-3"
      >
        <Swatch
            v-for="(c, i) in palette"
            :key="'p-'+i"
            :hex="c.hex"
            :label="c.label"
            :locked="locks[i]"
            @toggle-lock="toggleLock(i)"
            @copy="copy"
        />
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type Scheme = 'mono' | 'analogous' | 'complementary' | 'triadic'

/* ---------- state ---------- */
const base = ref('#3498DB')                    // normalized to uppercase
const scheme = ref<Scheme>('mono')
const steps = ref(5)                           // for non-mono
const copiedMsg = ref('')
const locks = ref<boolean[]>([])               // parallels palette length

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

/* ---------- palette & locks ---------- */
const palette = computed<Swatch[]>(() => {
  const b = normalizedBase.value
  let arr: Swatch[] = []
  if (scheme.value === 'mono') arr = buildMono(b)
  else if (scheme.value === 'analogous') arr = buildAnalogous(b, steps.value)
  else if (scheme.value === 'complementary') arr = buildComplementary(b, steps.value)
  else arr = buildTriadic(b, steps.value)

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
  // re-generate only unlocked swatches (non-mono: rotate hues slightly)
  if (scheme.value === 'mono') {
    // jitter lightness by +/- 2 points for unlocked
    const jittered = buildMono(normalizedBase.value).map((s, i) => {
      if (locks.value[i]) return s
      // small random tweak via lightness set
      const l = clamp(monoStops[i].l + (Math.random()*4 - 2), 10, 98)
      return { hex: setLightness(normalizedBase.value, l), label: s.label }
    })
    applyPalette(jittered)
  } else {
    const deg = (Math.random()*20 - 10) // -10..+10°
    const gen = scheme.value === 'analogous'
        ? buildAnalogous(shiftHue(normalizedBase.value, deg), steps.value)
        : scheme.value === 'complementary'
            ? buildComplementary(shiftHue(normalizedBase.value, deg), steps.value)
            : buildTriadic(shiftHue(normalizedBase.value, deg), steps.value)
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
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('palette-settings')
    if (raw) {
      const s = JSON.parse(raw)
      if (typeof s?.base === 'string') base.value = s.base
      if (['mono','analogous','complementary','triadic'].includes(s?.scheme)) scheme.value = s.scheme
      if (Number.isFinite(s?.steps)) steps.value = clamp(s.steps, 3, 8)
    }
  } catch {}
}

/* ---------- helpers ---------- */
function resetAll() {
  base.value = '#3498DB'
  scheme.value = 'mono'
  steps.value = 5
  locks.value = []
  internalOverride.value = null
}
</script>

<script lang="ts">
/* compact swatch subcomponent (inline) */
export default {
  components: {
    Swatch: {
      props: {
        hex: { type: String, required: true },
        label: { type: String, required: true },
        locked: { type: Boolean, default: false }
      },
      emits: ['copy', 'toggle-lock'],
      computed: {
        textColor(): string {
          // minimal luminance check for contrast
          const hex = (this.hex || '#000000').toUpperCase()
          const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
          const lum = (v:number)=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}
          const L = 0.2126*lum(r)+0.7152*lum(g)+0.0722*lum(b)
          return L > 0.45 ? '#111111' : '#FFFFFF'
        }
      },
      template: `
        <div class="rounded overflow-hidden border border-gray-700 group">
          <div :style="{ backgroundColor: hex, color: textColor }"
               class="h-20 flex items-center justify-between px-2 transition">
            <span class="text-xs opacity-90 font-mono">{{ label }}</span>
            <button
              class="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-black/20 hover:bg-black/30"
              @click="$emit('toggle-lock')"
              :title="locked ? 'Unlock' : 'Lock'"
            >{{ locked ? 'locked' : 'lock' }}</button>
          </div>
          <div class="bg-gray-900 px-2 py-2 flex items-center justify-between">
            <code class="text-xs font-mono text-white">{{ hex }}</code>
            <button class="btn !px-2 !py-1 text-xs" @click="$emit('copy', hex)">copy</button>
          </div>
        </div>
      `
    }
  }
}
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.input { @apply bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 w-full; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
</style>

