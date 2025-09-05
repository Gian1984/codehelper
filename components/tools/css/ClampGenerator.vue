<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Fluid Typography clamp() Generator</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="resetAll">reset</button>
        <button class="btn-primary" @click="copyDeclaration" :disabled="!clampStr">copy CSS</button>
        <button class="btn" @click="copyClamp" :disabled="!clampStr">copy clamp()</button>
      </div>
    </div>

    <!-- Inputs -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="card space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class="sub">min size (px)</span>
            <input type="number" min="0" v-model.number="minPx" class="input" />
          </div>
          <div>
            <span class="sub">max size (px)</span>
            <input type="number" min="0" v-model.number="maxPx" class="input" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class="sub">viewport min (px)</span>
            <input type="number" min="1" v-model.number="vpMin" class="input" />
          </div>
          <div>
            <span class="sub">viewport max (px)</span>
            <input type="number" min="1" v-model.number="vpMax" class="input" />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <span class="sub">unit</span>
            <select v-model="unit" class="input">
              <option value="vw">vw</option>
              <option value="vh">vh</option>
              <option value="vmin">vmin</option>
              <option value="vmax">vmax</option>
            </select>
          </div>
          <div>
            <span class="sub">decimals</span>
            <input type="number" min="0" max="6" v-model.number="decimals" class="input" />
          </div>
          <div>
            <span class="sub">property</span>
            <select v-model="cssProp" class="input">
              <option>font-size</option>
              <option>line-height</option>
              <option>letter-spacing</option>
              <option>margin-top</option>
              <option>padding</option>
              <option>width</option>
              <option>height</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class="sub">presets</span>
            <select v-model="preset" class="input" @change="applyPreset">
              <option value="">— common —</option>
              <option v-for="p in PRESETS" :key="p.key" :value="p.key">{{ p.label }}</option>
            </select>
          </div>
          <div>
            <span class="sub">helpers</span>
            <div class="flex gap-2">
              <button class="btn" @click="useCurrentWidth">use current width</button>
              <button class="btn" @click="useCurrentHeight" :disabled="unit==='vw'">use current height</button>
            </div>
          </div>
        </div>

        <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
        <p class="text-xs text-gray-400">
          Formula: <code>clamp(min, calc(slope * 100{{unit}} + intercept), max)</code>
        </p>
      </div>

      <!-- Output -->
      <div class="card space-y-3">
        <p class="label">result</p>
        <div v-if="clampStr" class="mono-box">{{ cssProp }}: {{ clampStr }};</div>
        <div v-else class="warn">Enter valid values to generate clamp().</div>

        <details v-if="clampStr" class="mt-1">
          <summary class="cursor-pointer text-sm text-gray-300">show pieces</summary>
          <div class="mt-2 text-sm grid sm:grid-cols-2 gap-2">
            <div class="mono-box">min: {{ fmt(minPx) }}px</div>
            <div class="mono-box">max: {{ fmt(maxPx) }}px</div>
            <div class="mono-box">slope: {{ fmt(slopeUnit) }}{{ unit }}</div>
            <div class="mono-box">intercept: {{ fmt(interceptPx) }}px</div>
          </div>
        </details>
      </div>
    </div>

    <!-- Preview (auto-fit) -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-lg font-semibold">Live preview</h3>
        <div class="flex items-center gap-3">
          <label class="inline-flex items-center gap-2 text-xs text-gray-300">
            <input type="checkbox" v-model="simulateHeight" />
            simulate height (for vh/vmin/vmax)
          </label>
          <div class="text-sm text-gray-400">W: {{ simW }}px • H: {{ simH }}px</div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <span class="sub">simulate width (px)</span>
          <input type="range" :min="100" :max="2400" v-model.number="simW" class="w-full" />
        </div>
        <div v-if="simulateHeight">
          <span class="sub">simulate height (px)</span>
          <input type="range" :min="200" :max="1600" v-model.number="simH" class="w-full" />
        </div>
      </div>

      <!-- Wrapper that auto-scales the simulator to fit -->
      <div ref="previewWrap" class="preview-wrap">
        <!-- ghost placeholder keeps layout height when scaled down -->
        <div
            class="preview-ghost"
            :style="{
            width: simW + 'px',
            height: simulateHeight ? simH + 'px' : 'auto',
            paddingBottom: simulateHeight ? '0' : '0',
            transform: 'scale(' + scale + ')',
          }"
        ></div>

        <!-- actual simulator -->
        <div
            class="preview-sim border border-gray-800 bg-gray-950"
            :style="{
            width: simW + 'px',
            height: simulateHeight ? simH + 'px' : 'auto',
            transform: 'scale(' + scale + ')',
          }"
        >
          <div class="p-5">
            <p class="text-gray-300 text-sm mb-2">Try resizing with the sliders above.</p>
            <div class="bg-gray-800/50 rounded p-4 leading-snug" :style="previewInlineStyle">
              <strong>Fluid sample:</strong>
              <span class="block mt-2">
                The quick brown fox jumps over the lazy dog 0123456789 — AàÂБвÇçÊêĞğÎîÑñÖöŞşÜüŸ.
              </span>
            </div>
          </div>
        </div>
      </div>

      <p class="text-xs text-gray-400 mt-1">
        The simulator scales down to fit the panel; CSS values still use the exact simulated width/height in calculations.
      </p>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

/* --- your existing state/computed/helpers above this line remain unchanged --- */
/* Only showing the parts that are added for fitting the simulator */

const previewWrap = ref<HTMLDivElement | null>(null)
const wrapW = ref<number>(0)
const wrapH = ref<number>(0)
let ro: ResizeObserver | null = null

// Auto-fit scale so simulator never overflows
const scale = computed(() => {
  if (!wrapW.value) return 1
  const targetW = simW.value
  const targetH = simulateHeight.value ? simH.value : Number.POSITIVE_INFINITY
  const byW = wrapW.value / targetW
  const byH = simulateHeight.value ? wrapH.value / targetH : 1
  const s = Math.min(1, byW, byH)
  // clamp just-in-case
  return Math.max(0.05, Math.min(1, Number.isFinite(s) ? s : 1))
})

// Preview inline style (unchanged math)
const previewInlineStyle = computed(() => {
  const val = evaluateAt(simW.value, simH.value)
  return { [cssProp.value as any]: val }
})

onMounted(() => {
  if (!previewWrap.value) return
  ro = new ResizeObserver(entries => {
    for (const e of entries) {
      const cr = e.contentRect
      // subtract a little padding to avoid touching edges
      wrapW.value = Math.max(0, cr.width - 8)
      wrapH.value = Math.max(0, cr.height - 8)
    }
  })
  ro.observe(previewWrap.value)
})

onBeforeUnmount(() => {
  if (ro && previewWrap.value) {
    ro.unobserve(previewWrap.value)
    ro = null
  }
})


/* Presets for common ranges */
const PRESETS = [
  { key: 'mobile',  label: 'Mobile 320 → 480',    vpMin: 320, vpMax: 480,  minPx: 14, maxPx: 18 },
  { key: 'tablet',  label: 'Tablet 768 → 1024',   vpMin: 768, vpMax: 1024, minPx: 16, maxPx: 22 },
  { key: 'desktop', label: 'Desktop 1024 → 1440', vpMin: 1024, vpMax: 1440, minPx: 18, maxPx: 28 },
] as const

type Unit = 'vw' | 'vh' | 'vmin' | 'vmax'
const unit = ref<Unit>('vw')

/* Inputs */
const minPx = ref<number>(16)
const maxPx = ref<number>(24)
const vpMin = ref<number>(320)
const vpMax = ref<number>(1280)
const decimals = ref<number>(3)
const cssProp = ref<string>('font-size')
const preset = ref<string>('')

/* Error/UI */
const error = ref<string>('')
const copiedMsg = ref<string>('')

/* Live preview simulation */
const simW = ref<number>(1440)
const simH = ref<number>(900)
const simulateHeight = ref<boolean>(false)

/* Validation */
const valid = computed(() => {
  if (![minPx.value, maxPx.value, vpMin.value, vpMax.value].every(n => Number.isFinite(n))) return false
  if (minPx.value < 0 || maxPx.value < 0) return false
  if (vpMin.value <= 0 || vpMax.value <= 0) return false
  if (vpMax.value <= vpMin.value) return false
  if (maxPx.value <= minPx.value) return false
  return true
})

/* Math */
const slope = computed(() => (maxPx.value - minPx.value) / (vpMax.value - vpMin.value)) // px per px of viewport
const slopeUnit = computed(() => round(slope.value * 100)) // px per 1 unit (vw/vh/vmin/vmax)
const interceptPx = computed(() => round(minPx.value - slope.value * vpMin.value))

const clampStr = computed(() => {
  error.value = ''
  if (!valid.value) {
    if (vpMax.value <= vpMin.value) error.value = 'Viewport max must be greater than viewport min.'
    else if (maxPx.value <= minPx.value) error.value = 'Max size must be greater than min size.'
    return ''
  }
  const m = fmt(minPx.value)
  const M = fmt(maxPx.value)
  const k = fmt(slopeUnit.value)
  const b = fmt(interceptPx.value)
  return `clamp(${m}px, calc(${k}${unit.value} + ${b}px), ${M}px)`
})

/* Copy helpers */
function copyDeclaration() {
  if (!clampStr.value) return
  navigator.clipboard.writeText(`${cssProp.value}: ${clampStr.value};`)
  toast('copied CSS declaration!')
}
function copyClamp() {
  if (!clampStr.value) return
  navigator.clipboard.writeText(clampStr.value)
  toast('copied clamp()!')
}

/* Presets & helpers */
function applyPreset() {
  const p = PRESETS.find(x => x.key === preset.value)
  if (!p) return
  vpMin.value = p.vpMin; vpMax.value = p.vpMax
  minPx.value = p.minPx; maxPx.value = p.maxPx
}
function useCurrentWidth() {
  if (typeof window === 'undefined') return
  const w = Math.max(1, Math.round(window.innerWidth))
  // snap to min or max based on proximity
  if (Math.abs(w - vpMin.value) < Math.abs(w - vpMax.value)) vpMin.value = w
  else vpMax.value = w
}
function useCurrentHeight() {
  if (typeof window === 'undefined') return
  const h = Math.max(1, Math.round(window.innerHeight))
  if (Math.abs(h - vpMin.value) < Math.abs(h - vpMax.value)) vpMin.value = h
  else vpMax.value = h
}

/* Preview styles */
const previewStyle = computed(() => ({
  width: simW.value + 'px',
  height: simulateHeight.value ? simH.value + 'px' : 'auto',
  overflow: 'auto',
}))


/* evaluate clamp at simulated viewport */
function evaluateAt(w: number, h: number): string {
  if (!clampStr.value) return `${minPx.value}px`
  const viewportPx = pickViewport(unit.value, w, h)
  const k = slope.value // px per px
  const raw = k * viewportPx + interceptPx.value
  const clamped = Math.min(Math.max(raw, minPx.value), maxPx.value)
  return `${fmt(clamped)}px`
}

function pickViewport(u: Unit, w: number, h: number): number {
  switch (u) {
    case 'vw': return w
    case 'vh': return h
    case 'vmin': return Math.min(w, h)
    case 'vmax': return Math.max(w, h)
  }
}

/* Utils */
function round(n: number): number {
  const f = Math.pow(10, decimals.value)
  return Math.round(n * f) / f
}
function fmt(n: number): string { return String(round(n)) }
function toast(msg: string) { copiedMsg.value = msg; setTimeout(() => (copiedMsg.value = ''), 1200) }

function resetAll() {
  minPx.value = 16
  maxPx.value = 24
  vpMin.value = 320
  vpMax.value = 1280
  unit.value = 'vw'
  decimals.value = 3
  cssProp.value = 'font-size'
  preset.value = ''
  simW.value = 1440
  simH.value = 900
  simulateHeight.value = false
}
watch(unit, u => { simulateHeight.value = (u !== 'vw') })
</script>

<style scoped>
/* existing styles… */
.label { @apply text-sm text-gray-300; }
.sub { @apply block text-xs text-gray-400 mb-1; }
.input { @apply bg-gray-950 text-white border border-gray-800 rounded px-3 py-2 w-full; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
.mono-box { @apply bg-gray-950 text-green-300 font-mono text-sm p-3 rounded border border-gray-800 overflow-x-auto; }
.warn { @apply text-sm text-yellow-400; }

/* New: auto-fit preview container */
.preview-wrap {
  position: relative;
  width: 100%;
  max-width: 100%;
  /* Give it some height so height-based scaling has a box to fit into */
  min-height: 220px;
  max-height: 70vh;
  overflow: auto;           /* allow scroll if user forces huge sim */
  background: rgba(31, 41, 55, 0.35);
  border: 1px solid rgba(31, 41, 55, 0.6);
  border-radius: 0.75rem;
  padding: 6px;
}

/* The actual simulator panel, scaled via transform */
.preview-sim {
  transform-origin: top left; /* scaling anchor */
  border-radius: 0.5rem;
  will-change: transform;
}

/* Ghost occupies the scaled size’s footprint so layout doesn’t collapse */
.preview-ghost {
  transform-origin: top left;
  visibility: hidden;
  pointer-events: none;
  margin-bottom: -6px; /* snug alignment with padding */
}
</style>
