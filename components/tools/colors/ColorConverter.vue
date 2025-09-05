<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Color Converter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="randomize">random</button>
        <button class="btn" @click="resetAll">reset</button>
      </div>
    </div>

    <!-- Preview -->
    <div class="card p-4">
      <div class="flex items-center gap-4">
        <div :style="{ backgroundColor: previewCss }"
             class="w-20 h-20 rounded-lg border border-white/20 relative overflow-hidden">
          <div class="checker"></div>
        </div>
        <div class="flex-1 grid sm:grid-cols-2 gap-3">
          <div class="mono-box">Preview: <span :style="{ color: textOnColor }">{{ previewCss }}</span></div>
          <div class="mono-box">Contrast vs white: {{ contrastWhite.toFixed(2) }} • vs black: {{ contrastBlack.toFixed(2) }}</div>
        </div>
      </div>
      <div class="mt-4">
        <label class="label">alpha</label>
        <input type="range" min="0" max="1" step="0.01" v-model.number="alpha" class="w-full" />
        <p class="text-xs text-gray-400 mt-1">α = {{ alpha.toFixed(2) }}</p>
      </div>
    </div>

    <!-- Inputs -->
    <div class="grid md:grid-cols-3 gap-4">
      <!-- HEX -->
      <div class="card space-y-2">
        <label class="label">HEX</label>
        <div class="flex items-center gap-2">
          <input v-model="hex" type="color" class="w-12 h-10 p-0 border border-gray-600 rounded" @input="onHexInput" />
          <input v-model.trim="hex" maxlength="9" placeholder="#3498DB or #3498DB80"
                 class="input font-mono" @blur="onHexInput" />
          <button class="btn" @click="copy(hexUpper)">copy</button>
        </div>
        <p v-if="hexError" class="text-xs text-red-400">{{ hexError }}</p>
      </div>

      <!-- RGB(A) -->
      <div class="card space-y-2">
        <label class="label">RGB(A)</label>
        <input v-model.trim="rgbText" class="input font-mono" placeholder="e.g. 52, 152, 219 or 52,152,219,0.75" @blur="onRgbInput" />
        <div class="flex gap-2">
          <button class="btn" @click="applyRgbFields">apply</button>
          <button class="btn" @click="copy(rgbCss)">copy</button>
        </div>
        <div class="grid grid-cols-4 gap-2 text-xs text-gray-300">
          <div><span class="sub">R</span><input type="number" min="0" max="255" v-model.number="r" class="mini-input" /></div>
          <div><span class="sub">G</span><input type="number" min="0" max="255" v-model.number="g" class="mini-input" /></div>
          <div><span class="sub">B</span><input type="number" min="0" max="255" v-model.number="b" class="mini-input" /></div>
          <div><span class="sub">A</span><input type="number" min="0" max="1" step="0.01" v-model.number="alpha" class="mini-input" /></div>
        </div>
      </div>

      <!-- HSL(A) -->
      <div class="card space-y-2">
        <label class="label">HSL(A)</label>
        <input v-model.trim="hslText" class="input font-mono" placeholder="e.g. 204, 70%, 53% or 204,70%,53%,0.75" @blur="onHslInput" />
        <div class="flex gap-2">
          <button class="btn" @click="applyHslFields">apply</button>
          <button class="btn" @click="copy(hslCss)">copy</button>
        </div>
        <div class="grid grid-cols-4 gap-2 text-xs text-gray-300">
          <div><span class="sub">H</span><input type="number" min="0" max="360" v-model.number="h" class="mini-input" /></div>
          <div><span class="sub">S%</span><input type="number" min="0" max="100" v-model.number="s" class="mini-input" /></div>
          <div><span class="sub">L%</span><input type="number" min="0" max="100" v-model.number="l" class="mini-input" /></div>
          <div><span class="sub">A</span><input type="number" min="0" max="1" step="0.01" v-model.number="alpha" class="mini-input" /></div>
        </div>
      </div>
    </div>

    <!-- Outputs -->
    <div class="card p-4 grid md:grid-cols-3 gap-3">
      <div class="mono-box">HEX: {{ hexUpper }}</div>
      <div class="mono-box">RGB: {{ rgbCss }}</div>
      <div class="mono-box">HSL: {{ hslCss }}</div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

/* ---------- helpers ---------- */
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))
const pad2 = (n: number) => n.toString(16).padStart(2, '0')
const isShortHex = (s: string) => /^#([0-9A-Fa-f]{3,4})$/.test(s)
const isLongHex  = (s: string) => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(s)

function normalizeHex(input: string): { hex: string, a: number } | null {
  let v = (input || '').trim()
  if (!v.startsWith('#')) v = '#' + v
  if (isShortHex(v)) {
    // #RGB[#A] → #RRGGBB[AA]
    const body = v.slice(1)
    const r = body[0], g = body[1], b = body[2], a = body[3] ?? 'F'
    v = '#' + r + r + g + g + b + b + a + a
  }
  if (!isLongHex(v)) return null
  const body = v.slice(1)
  const hasAlpha = body.length === 8
  const r = parseInt(body.slice(0,2), 16)
  const g = parseInt(body.slice(2,4), 16)
  const b = parseInt(body.slice(4,6), 16)
  const a = hasAlpha ? parseInt(body.slice(6,8), 16) / 255 : 1
  return { hex: '#' + body.slice(0,6).toUpperCase(), a }
}

function hexToRgb(hex: string) {
  const n = normalizeHex(hex)
  if (!n) return { r: 0, g: 0, b: 0, a: 1 }
  const body = n.hex.slice(1)
  return {
    r: parseInt(body.slice(0,2),16),
    g: parseInt(body.slice(2,4),16),
    b: parseInt(body.slice(4,6),16),
    a: n.a
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return ('#' + pad2(clamp(Math.round(r),0,255)) + pad2(clamp(Math.round(g),0,255)) + pad2(clamp(Math.round(b),0,255))).toUpperCase()
}
function rgbToHexWithAlpha(r: number, g: number, b: number, a: number): string {
  return (rgbToHex(r,g,b) + pad2(Math.round(clamp(a,0,1)*255))).toUpperCase()
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
      default: h = (r-g)/d + 4
    }
    h/=6
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) }
}

function hslToRgb(h: number, s: number, l: number) {
  s/=100; l/=100
  const k = (n:number) => (n + h/30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n:number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return { r: Math.round(f(0)*255), g: Math.round(f(8)*255), b: Math.round(f(4)*255) }
}

function luminance(r:number,g:number,b:number) {
  const t = (v:number)=>{ v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4) }
  const [R,G,B] = [t(r), t(g), t(b)]
  return 0.2126*R + 0.7152*G + 0.0722*B
}
function contrastRatio(fg:[number,number,number], bg:[number,number,number]) {
  const L1 = luminance(...fg), L2 = luminance(...bg)
  const [a,b] = [Math.max(L1,L2), Math.min(L1,L2)]
  return (a+0.05)/(b+0.05)
}

/* ---------- state ---------- */
const hex = ref('#3498DB')
const hexError = ref('')
const rgbText = ref('')   // "r, g, b[, a]"
const hslText = ref('')   // "h, s%, l%[, a]"
const r = ref(52), g = ref(152), b = ref(219)
const h = ref(204), s = ref(70),  l = ref(53)
const alpha = ref(1)
const copiedMsg = ref('')

/* ---------- derived ---------- */
const hexUpper = computed(() => {
  // include alpha if < 1
  return alpha.value < 1 ? rgbToHexWithAlpha(r.value,g.value,b.value,alpha.value) : rgbToHex(r.value,g.value,b.value)
})
const rgbCss = computed(() => alpha.value < 1
    ? `rgba(${r.value}, ${g.value}, ${b.value}, ${alpha.value.toFixed(2)})`
    : `rgb(${r.value}, ${g.value}, ${b.value})`)
const hslCss = computed(() => alpha.value < 1
    ? `hsla(${h.value}, ${s.value}%, ${l.value}%, ${alpha.value.toFixed(2)})`
    : `hsl(${h.value}, ${s.value}%, ${l.value}%)`)
const previewCss = computed(() => rgbCss.value)

const textOnColor = computed(() => {
  const white = contrastRatio([255,255,255],[r.value,g.value,b.value])
  const black = contrastRatio([0,0,0],[r.value,g.value,b.value])
  return white >= black ? '#FFFFFF' : '#111111'
})
const contrastWhite = computed(() => contrastRatio([255,255,255],[r.value,g.value,b.value]))
const contrastBlack = computed(() => contrastRatio([0,0,0],[r.value,g.value,b.value]))

/* ---------- syncing flows ---------- */
function onHexInput() {
  const parsed = normalizeHex(hex.value)
  if (!parsed) {
    hexError.value = 'Invalid HEX. Use #RRGGBB or #RRGGBBAA (supports #RGB/#RGBA too).'
    return
  }
  hexError.value = ''
  hex.value = parsed.hex // canonical
  alpha.value = parsed.a
  const c = hexToRgb(parsed.hex)
  r.value = c.r; g.value = c.g; b.value = c.b
  const hh = rgbToHsl(r.value,g.value,b.value)
  h.value = hh.h; s.value = hh.s; l.value = hh.l
  rgbText.value = `${r.value}, ${g.value}, ${b.value}${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
  hslText.value = `${h.value}, ${s.value}%, ${l.value}%${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
}

function onRgbInput() {
  // accepts: "r,g,b" or "r,g,b,a"
  const m = rgbText.value.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*$/)
  if (!m) return
  const R = clamp(+m[1],0,255), G = clamp(+m[2],0,255), B = clamp(+m[3],0,255)
  const A = m[4] != null ? clamp(+m[4],0,1) : alpha.value
  r.value = R; g.value = G; b.value = B; alpha.value = A
  const hh = rgbToHsl(R,G,B); h.value = hh.h; s.value = hh.s; l.value = hh.l
  hex.value = A < 1 ? rgbToHexWithAlpha(R,G,B,A) : rgbToHex(R,G,B)
}

function onHslInput() {
  // accepts: "h,s%,l%" or "h,s%,l%,a"
  const m = hslText.value.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?(?:\s*,\s*(\d*\.?\d+))?\s*$/)
  if (!m) return
  const H = clamp(+m[1],0,360)
  const S = clamp(+m[2],0,100)
  const L = clamp(+m[3],0,100)
  const A = m[4] != null ? clamp(+m[4],0,1) : alpha.value
  h.value = H; s.value = S; l.value = L; alpha.value = A
  const rgb = hslToRgb(H,S,L)
  r.value = rgb.r; g.value = rgb.g; b.value = rgb.b
  hex.value = A < 1 ? rgbToHexWithAlpha(rgb.r,rgb.g,rgb.b,A) : rgbToHex(rgb.r,rgb.g,rgb.b)
}

function applyRgbFields() {
  rgbText.value = `${r.value}, ${g.value}, ${b.value}${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
  onRgbInput()
}
function applyHslFields() {
  hslText.value = `${h.value}, ${s.value}%, ${l.value}%${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
  onHslInput()
}

/* keep channels in sync when sliders/mini inputs change */
watch([r,g,b], () => {
  const hh = rgbToHsl(r.value,g.value,b.value)
  h.value = hh.h; s.value = hh.s; l.value = hh.l
  hex.value = alpha.value < 1 ? rgbToHexWithAlpha(r.value,g.value,b.value,alpha.value) : rgbToHex(r.value,g.value,b.value)
  rgbText.value = `${r.value}, ${g.value}, ${b.value}${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
  hslText.value = `${h.value}, ${s.value}%, ${l.value}%${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
})
watch([h,s,l], () => {
  const rgb = hslToRgb(h.value,s.value,l.value)
  r.value = rgb.r; g.value = rgb.g; b.value = rgb.b
}, { flush: 'post' }) // avoid feedback loops; RGB watcher updates back

watch(alpha, () => {
  hex.value = alpha.value < 1 ? rgbToHexWithAlpha(r.value,g.value,b.value,alpha.value) : rgbToHex(r.value,g.value,b.value)
  rgbText.value = `${r.value}, ${g.value}, ${b.value}${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
  hslText.value = `${h.value}, ${s.value}%, ${l.value}%${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
})

/* ---------- actions ---------- */
function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1200)
}

function randomize() {
  const R = Math.floor(Math.random()*256)
  const G = Math.floor(Math.random()*256)
  const B = Math.floor(Math.random()*256)
  const A = Math.random() < 0.3 ? Number((Math.random()*0.9+0.1).toFixed(2)) : 1
  r.value = R; g.value = G; b.value = B; alpha.value = A
  onRgbInput()
}

function resetAll() {
  hex.value = '#3498DB'
  hexError.value = ''
  r.value = 52; g.value = 152; b.value = 219
  const hh = rgbToHsl(r.value,g.value,b.value)
  h.value = hh.h; s.value = hh.s; l.value = hh.l
  alpha.value = 1
  rgbText.value = `${r.value}, ${g.value}, ${b.value}`
  hslText.value = `${h.value}, ${s.value}%, ${l.value}%`
}

/* init */
resetAll()
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.sub { @apply block text-[10px] text-gray-400 mb-1 uppercase tracking-wide; }
.input { @apply bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 w-full; }
.mini-input { @apply bg-gray-900 text-white border border-gray-700 rounded px-2 py-1 w-full; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
.mono-box { @apply bg-gray-950 text-green-300 font-mono text-sm p-3 rounded border border-gray-800 overflow-x-auto; }

.checker {
  position: absolute; inset: 0;
  background-image:
      linear-gradient(45deg, rgba(255,255,255,.2) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(255,255,255,.2) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(255,255,255,.2) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.2) 75%);
  background-size: 14px 14px;
  mix-blend-mode: normal;
  pointer-events: none;
}
</style>
