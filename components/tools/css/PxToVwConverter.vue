<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">PX ↔︎ Viewport Unit Converter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="resetAll">reset</button>
        <button class="btn-primary" @click="copyPrimary" :disabled="!primarySnippet">copy</button>
      </div>
    </div>

    <!-- Mode + Unit -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="card space-y-2">
        <label class="label">mode</label>
        <select v-model="mode" class="input">
          <option value="px-to-vu">px → viewport unit</option>
          <option value="vu-to-px">viewport unit → px</option>
        </select>
      </div>

      <div class="card space-y-2">
        <label class="label">unit</label>
        <select v-model="unit" class="input">
          <option value="vw">vw (width-based)</option>
          <option value="vh">vh (height-based)</option>
          <option value="vmin">vmin (smaller of vw/vh)</option>
          <option value="vmax">vmax (larger of vw/vh)</option>
        </select>
      </div>

      <div class="card space-y-2">
        <label class="label">decimals</label>
        <input type="number" min="0" max="6" v-model.number="decimals" class="input" />
      </div>
    </div>

    <!-- Inputs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="card space-y-4">
        <div class="flex items-center justify-between gap-2">
          <label class="label">design viewport (width × height)</label>
          <div class="flex gap-2">
            <select v-model="preset" class="input w-40" @change="applyPreset">
              <option value="">— presets —</option>
              <option v-for="p in PRESETS" :key="p.w+'x'+p.h" :value="p.w+'x'+p.h">{{ p.label }}</option>
            </select>
            <button class="btn" @click="swap">swap w/h</button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class="sub">viewport width (px)</span>
            <input type="number" min="1" v-model.number="vpW" class="input" />
          </div>
          <div>
            <span class="sub">viewport height (px)</span>
            <input type="number" min="1" v-model.number="vpH" class="input" />
          </div>
        </div>

        <div v-if="mode==='px-to-vu'">
          <span class="sub">size in px</span>
          <input type="number" min="0" v-model.number="px" class="input" />
        </div>
        <div v-else class="grid grid-cols-2 gap-3">
          <div>
            <span class="sub">size in viewport unit</span>
            <input type="number" min="0" v-model.number="vu" class="input" />
          </div>
          <div>
            <span class="sub">unit (readonly)</span>
            <input :value="unit" class="input bg-gray-800 text-gray-300" readonly />
          </div>
        </div>

        <div class="text-xs text-gray-400">
          Tip: Use vw for widths, vh for heights, vmin/vmax for responsive square-ish elements.
        </div>
      </div>

      <!-- Results + CSS snippets -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between">
          <p class="label">result</p>
          <div class="flex gap-2">
            <button class="btn" @click="copyPrimary" :disabled="!primarySnippet">copy</button>
            <button class="btn" @click="copyNumber" :disabled="!primaryNumber">copy number</button>
          </div>
        </div>

        <div v-if="mode==='px-to-vu'">
          <div v-if="validBase" class="mono-box">
            {{ cssProp }}: {{ primaryNumber }}{{ unit }};
          </div>
          <div v-else class="warn">Enter a valid viewport and px value.</div>
        </div>

        <div v-else>
          <div v-if="validBase" class="mono-box">
            {{ pxComputed }}px
          </div>
          <div v-else class="warn">Enter a valid viewport and unit value.</div>
        </div>

        <details class="mt-2">
          <summary class="cursor-pointer text-sm text-gray-300">more CSS snippets</summary>
          <div class="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div class="mono-box">width: {{ primaryNumber }}{{ unit }};</div>
            <div class="mono-box">height: {{ primaryNumber }}{{ unit }};</div>
            <div class="mono-box">margin-left: {{ primaryNumber }}{{ unit }};</div>
            <div class="mono-box">padding: {{ primaryNumber }}{{ unit }};</div>
          </div>
        </details>
      </div>
    </div>

    <!-- Fluid clamp() generator -->
    <div class="card space-y-4">
      <h3 class="text-lg font-semibold">Fluid clamp() between breakpoints</h3>
      <div class="grid sm:grid-cols-5 gap-3">
        <div>
          <span class="sub">min viewport (px)</span>
          <input type="number" min="1" v-model.number="minW" class="input" />
        </div>
        <div>
          <span class="sub">max viewport (px)</span>
          <input type="number" min="1" v-model.number="maxW" class="input" />
        </div>
        <div>
          <span class="sub">min size (px)</span>
          <input type="number" min="0" v-model.number="minPx" class="input" />
        </div>
        <div>
          <span class="sub">max size (px)</span>
          <input type="number" min="0" v-model.number="maxPx" class="input" />
        </div>
        <div>
          <span class="sub">property</span>
          <select v-model="cssProp" class="input">
            <option>width</option>
            <option>height</option>
            <option>font-size</option>
            <option>margin-left</option>
            <option>padding</option>
          </select>
        </div>
      </div>

      <div class="mono-box" v-if="clampSnippet">
        {{ cssProp }}: {{ clampSnippet }};
      </div>

      <div class="flex gap-2">
        <button class="btn" @click="copyClamp" :disabled="!clampSnippet">copy clamp</button>
        <button class="btn" @click="useCurrentAsClamp">use current as max size</button>
      </div>

      <p class="text-xs text-gray-400">
        Formula: <code>clamp(min, calc(slope * 100vw + intercept), max)</code>, where slope = (maxPx - minPx)/(maxW - minW).
      </p>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

/* -------------------- presets -------------------- */
const PRESETS = [
  { label: 'Mobile 375×812', w: 375, h: 812 },
  { label: 'iPhone 14 Pro 393×852', w: 393, h: 852 },
  { label: 'Tablet 768×1024', w: 768, h: 1024 },
  { label: 'Laptop 1366×768', w: 1366, h: 768 },
  { label: 'Desktop 1440×900', w: 1440, h: 900 },
  { label: 'HD 1920×1080', w: 1920, h: 1080 },
] as const

/* -------------------- state -------------------- */
type Mode = 'px-to-vu' | 'vu-to-px'
type Unit = 'vw' | 'vh' | 'vmin' | 'vmax'

const mode = ref<Mode>('px-to-vu')
const unit = ref<Unit>('vw')
const decimals = ref<number>(4)

const vpW = ref<number>(1920)
const vpH = ref<number>(1080)
const preset = ref<string>('')

const px = ref<number>(192)            // for px → vu
const vu = ref<number>(10)             // for vu → px
const cssProp = ref<string>('width')

/* clamp inputs */
const minW = ref<number>(375)
const maxW = ref<number>(1440)
const minPx = ref<number>(16)
const maxPx = ref<number>(64)

const copiedMsg = ref<string>('')

/* -------------------- derived -------------------- */
const validBase = computed(() => {
  const wOk = Number.isFinite(vpW.value) && vpW.value > 0
  const hOk = Number.isFinite(vpH.value) && vpH.value > 0
  const valueOk = mode.value === 'px-to-vu'
      ? Number.isFinite(px.value) && px.value >= 0
      : Number.isFinite(vu.value) && vu.value >= 0
  return wOk && hOk && valueOk
})

/* px -> vu */
const vuNumber = computed(() => {
  if (!validBase.value) return null
  const d = denom(unit.value, vpW.value, vpH.value)
  const out = d === 0 ? 0 : (px.value / d) * 100
  return round(out, decimals.value)
})

/* vu -> px */
const pxComputed = computed(() => {
  if (!validBase.value) return null
  const d = denom(unit.value, vpW.value, vpH.value)
  const out = (vu.value / 100) * d
  return round(out, decimals.value)
})

/* main snippet / numbers */
const primaryNumber = computed(() => {
  if (!validBase.value) return ''
  return mode.value === 'px-to-vu'
      ? String(vuNumber.value)
      : String(pxComputed.value)
})

const primarySnippet = computed(() => {
  if (!validBase.value) return ''
  return mode.value === 'px-to-vu'
      ? `${cssProp.value}: ${primaryNumber.value}${unit.value};`
      : `${pxComputed.value}px`
})

/* clamp() snippet */
const clampSnippet = computed(() => {
  if (![minW.value, maxW.value].every(n => Number.isFinite(n) && n > 0)) return ''
  if (![minPx.value, maxPx.value].every(n => Number.isFinite(n) && n >= 0)) return ''
  if (maxW.value === minW.value) return ''
  const slope = (maxPx.value - minPx.value) / (maxW.value - minW.value) // px per px
  const slopeVw = slope * 100 // px per vw
  const intercept = minPx.value - slope * minW.value // px
  const s = `clamp(${fmt(minPx.value)}px, calc(${fmt(slopeVw)}vw + ${fmt(intercept)}px), ${fmt(maxPx.value)}px)`
  return s
})

/* -------------------- actions -------------------- */
function denom(u: Unit, w: number, h: number): number {
  switch (u) {
    case 'vw': return w
    case 'vh': return h
    case 'vmin': return Math.min(w, h)
    case 'vmax': return Math.max(w, h)
  }
}

function round(n: number, d: number): number {
  const f = Math.pow(10, d)
  return Math.round(n * f) / f
}
function fmt(n: number): string {
  return String(round(n, decimals.value))
}

function copyPrimary() {
  if (!primarySnippet.value) return
  navigator.clipboard.writeText(primarySnippet.value)
  toast('copied!')
}
function copyNumber() {
  if (!primaryNumber.value) return
  navigator.clipboard.writeText(primaryNumber.value)
  toast('number copied!')
}
function copyClamp() {
  if (!clampSnippet.value) return
  navigator.clipboard.writeText(`${cssProp.value}: ${clampSnippet.value};`)
  toast('clamp copied!')
}
function useCurrentAsClamp() {
  if (!validBase.value) return
  minPx.value = 0
  maxPx.value = mode.value === 'px-to-vu'
      ? Number(px.value)
      : Number(pxComputed.value || 0)
}

function toast(msg: string) {
  copiedMsg.value = msg
  setTimeout(() => (copiedMsg.value = ''), 1200)
}

function resetAll() {
  mode.value = 'px-to-vu'
  unit.value = 'vw'
  decimals.value = 4
  vpW.value = 1920
  vpH.value = 1080
  px.value = 192
  vu.value = 10
  preset.value = ''
  minW.value = 375
  maxW.value = 1440
  minPx.value = 16
  maxPx.value = 64
}

/* presets */
function applyPreset() {
  if (!preset.value) return
  const [w, h] = preset.value.split('x').map(Number)
  if (Number.isFinite(w) && Number.isFinite(h)) {
    vpW.value = w
    vpH.value = h
  }
}
function swap() {
  const w = vpW.value
  vpW.value = vpH.value
  vpH.value = w
}

/* -------------------- persistence -------------------- */
const KEY = 'px-vu-converter-state'
watch(
    [
      mode, unit, decimals, vpW, vpH, px, vu, cssProp,
      minW, maxW, minPx, maxPx
    ],
    () => {
      try {
        const data = {
          mode: mode.value, unit: unit.value, decimals: decimals.value,
          vpW: vpW.value, vpH: vpH.value, px: px.value, vu: vu.value, cssProp: cssProp.value,
          minW: minW.value, maxW: maxW.value, minPx: minPx.value, maxPx: maxPx.value
        }
        localStorage.setItem(KEY, JSON.stringify(data))
      } catch {}
    },
    { deep: true }
)

onMounted(() => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    const s = JSON.parse(raw)
    if (s?.mode) mode.value = s.mode
    if (s?.unit) unit.value = s.unit
    if (Number.isFinite(s?.decimals)) decimals.value = s.decimals
    if (Number.isFinite(s?.vpW)) vpW.value = s.vpW
    if (Number.isFinite(s?.vpH)) vpH.value = s.vpH
    if (Number.isFinite(s?.px)) px.value = s.px
    if (Number.isFinite(s?.vu)) vu.value = s.vu
    if (s?.cssProp) cssProp.value = s.cssProp
    if (Number.isFinite(s?.minW)) minW.value = s.minW
    if (Number.isFinite(s?.maxW)) maxW.value = s.maxW
    if (Number.isFinite(s?.minPx)) minPx.value = s.minPx
    if (Number.isFinite(s?.maxPx)) maxPx.value = s.maxPx
  } catch {}
})
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.sub { @apply block text-xs text-gray-400 mb-1; }
.input { @apply bg-gray-950 text-white border border-gray-800 rounded px-3 py-2 w-full; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
.mono-box { @apply bg-gray-950 text-green-300 font-mono text-sm p-3 rounded border border-gray-800 overflow-x-auto; }
.warn { @apply text-sm text-yellow-400; }
</style>

