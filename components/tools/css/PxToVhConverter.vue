<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">PX ↔︎ VH Converter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="resetAll">reset</button>
        <button class="btn" @click="copyPrimary" :disabled="!primarySnippet">copy</button>
      </div>
    </div>

    <!-- Mode • Unit • Precision -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="card space-y-2">
        <label class="label">mode</label>
        <select v-model="mode" class="input">
          <option value="px-to-vh">px → viewport height unit</option>
          <option value="vh-to-px">viewport height unit → px</option>
        </select>
      </div>

      <div class="card space-y-2">
        <label class="label">unit</label>
        <select v-model="unit" class="input">
          <option value="vh">vh (classic)</option>
          <option value="svh">svh (small viewport)</option>
          <option value="lvh">lvh (large viewport)</option>
          <option value="dvh">dvh (dynamic viewport)</option>
        </select>
        <p class="hint">Tip: on mobile, <code>dvh</code> reflects browser UI changes.</p>
      </div>

      <div class="card space-y-2">
        <label class="label">decimals</label>
        <input type="number" min="0" max="6" v-model.number="decimals" class="input" />
        <label class="inline-flex items-center gap-2 mt-1">
          <input type="checkbox" v-model="autoFromWindow" class="w-4 h-4" />
          <span class="text-sm">auto-use current window height</span>
        </label>
      </div>
    </div>

    <!-- Inputs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="card space-y-4">
        <div class="flex items-center justify-between gap-2">
          <label class="label">design window height (px)</label>
          <div class="flex gap-2">
            <select v-model="preset" class="input w-44" @change="applyPreset">
              <option value="">— presets —</option>
              <option v-for="p in PRESETS" :key="p.h" :value="p.h">{{ p.label }}</option>
            </select>
            <button class="btn" @click="useCurrent">use current</button>
          </div>
        </div>
        <input type="number" min="1" v-model.number="vpH" class="input" />

        <div v-if="mode==='px-to-vh'">
          <span class="sub">size in px</span>
          <input type="number" min="0" v-model.number="px" class="input" />
        </div>
        <div v-else class="grid grid-cols-2 gap-3">
          <div>
            <span class="sub">size in {{ unit }}</span>
            <input type="number" min="0" v-model.number="vhVal" class="input" />
          </div>
          <div>
            <span class="sub">unit (readonly)</span>
            <input :value="unit" readonly class="input bg-gray-800 text-gray-300" />
          </div>
        </div>
      </div>

      <!-- Result + snippets -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between">
          <p class="label">result</p>
          <div class="flex gap-2">
            <button class="btn" @click="copyPrimary" :disabled="!primarySnippet">copy</button>
            <button class="btn" @click="copyNumber" :disabled="!primaryNumber">copy number</button>
          </div>
        </div>

        <template v-if="mode==='px-to-vh'">
          <div v-if="validBase" class="mono-box">{{ cssProp }}: {{ primaryNumber }}{{ unit }};</div>
          <div v-else class="warn">Enter a valid window height and px value.</div>
        </template>
        <template v-else>
          <div v-if="validBase" class="mono-box">{{ pxComputed }}px</div>
          <div v-else class="warn">Enter a valid window height and unit value.</div>
        </template>

        <details class="mt-2">
          <summary class="cursor-pointer text-sm text-gray-300">more CSS snippets</summary>
          <div class="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div class="mono-box">height: {{ primaryNumber }}{{ unit }};</div>
            <div class="mono-box">margin-top: {{ primaryNumber }}{{ unit }};</div>
            <div class="mono-box">padding-top: {{ primaryNumber }}{{ unit }};</div>
            <div class="mono-box">min-height: {{ primaryNumber }}{{ unit }};</div>
          </div>
        </details>
      </div>
    </div>

    <!-- Fluid clamp() generator (vertical) -->
    <div class="card space-y-4">
      <h3 class="text-lg font-semibold">Fluid clamp() between heights</h3>
      <div class="grid sm:grid-cols-5 gap-3">
        <div>
          <span class="sub">min window (px)</span>
          <input type="number" min="1" v-model.number="minH" class="input" />
        </div>
        <div>
          <span class="sub">max window (px)</span>
          <input type="number" min="1" v-model.number="maxH" class="input" />
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
            <option>height</option>
            <option>min-height</option>
            <option>max-height</option>
            <option>margin-top</option>
            <option>padding-top</option>
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

      <p class="hint">
        Formula: <code>clamp(min, calc(slope * 100vh + intercept), max)</code>, slope = (maxPx − minPx)/(maxH − minH).
      </p>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

/* Presets (heights) */
const PRESETS = [
  { label: 'Mobile 812', h: 812 },
  { label: 'iPhone 14 Pro 852', h: 852 },
  { label: 'Tablet 1024', h: 1024 },
  { label: 'Laptop 768', h: 768 },
  { label: 'Desktop 900', h: 900 },
  { label: 'HD 1080', h: 1080 },
] as const

type Mode = 'px-to-vh' | 'vh-to-px'
type VUnit = 'vh' | 'svh' | 'lvh' | 'dvh'

/* State */
const mode = ref<Mode>('px-to-vh')
const unit = ref<VUnit>('vh')
const decimals = ref<number>(4)

const vpH = ref<number>(768)
const preset = ref<string>('')

const px = ref<number>(300)  // for px → vh
const vhVal = ref<number>(39.0625) // for vh → px
const cssProp = ref<string>('height')

const autoFromWindow = ref<boolean>(false)
const copiedMsg = ref<string>('')

/* clamp inputs */
const minH = ref<number>(568)
const maxH = ref<number>(1080)
const minPx = ref<number>(80)
const maxPx = ref<number>(360)

/* Derived */
const validBase = computed(() => {
  const hOk = Number.isFinite(vpH.value) && vpH.value > 0
  const valueOk = mode.value === 'px-to-vh'
      ? Number.isFinite(px.value) && px.value >= 0
      : Number.isFinite(vhVal.value) && vhVal.value >= 0
  return hOk && valueOk
})

/* px → vhNumber; vh → pxComputed */
const vhNumber = computed(() => {
  if (!validBase.value) return null
  const out = (px.value / vpH.value) * 100
  return round(out, decimals.value)
})
const pxComputed = computed(() => {
  if (!validBase.value) return null
  const out = (vhVal.value / 100) * vpH.value
  return round(out, decimals.value)
})

const primaryNumber = computed(() => {
  if (!validBase.value) return ''
  return mode.value === 'px-to-vh' ? String(vhNumber.value) : String(pxComputed.value)
})
const primarySnippet = computed(() => {
  if (!validBase.value) return ''
  return mode.value === 'px-to-vh'
      ? `${cssProp.value}: ${primaryNumber.value}${unit.value};`
      : `${pxComputed.value}px`
})

/* Clamp */
const clampSnippet = computed(() => {
  if (![minH.value, maxH.value].every(n => Number.isFinite(n) && n > 0)) return ''
  if (![minPx.value, maxPx.value].every(n => Number.isFinite(n) && n >= 0)) return ''
  if (maxH.value === minH.value) return ''
  const slope = (maxPx.value - minPx.value) / (maxH.value - minH.value) // px/px
  const slopeVh = slope * 100 // px per 1vh
  const intercept = minPx.value - slope * minH.value
  return `clamp(${fmt(minPx.value)}px, calc(${fmt(slopeVh)}vh + ${fmt(intercept)}px), ${fmt(maxPx.value)}px)`
})

/* Actions */
function useCurrent() {
  if (typeof window === 'undefined') return
  vpH.value = Math.max(1, Math.round(window.innerHeight))
}
onMounted(() => {
  if (autoFromWindow.value) useCurrent()
})

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
  maxPx.value = mode.value === 'px-to-vh' ? Number(px.value) : Number(pxComputed.value || 0)
}

function applyPreset() {
  if (!preset.value) return
  const h = Number(preset.value)
  if (Number.isFinite(h) && h > 0) vpH.value = h
}

function resetAll() {
  mode.value = 'px-to-vh'
  unit.value = 'vh'
  decimals.value = 4
  vpH.value = 768
  px.value = 300
  vhVal.value = 39.0625
  preset.value = ''
  minH.value = 568
  maxH.value = 1080
  minPx.value = 80
  maxPx.value = 360
}

function round(n: number, d: number): number {
  const f = Math.pow(10, d); return Math.round(n * f) / f
}
function fmt(n: number): string { return String(round(n, decimals.value)) }
function toast(msg: string) { copiedMsg.value = msg; setTimeout(() => (copiedMsg.value = ''), 1200) }

/* Persistence */
const KEY = 'px-vh-converter'
watch([mode, unit, decimals, vpH, px, vhVal, cssProp, minH, maxH, minPx, maxPx, autoFromWindow], () => {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      mode: mode.value, unit: unit.value, decimals: decimals.value, vpH: vpH.value,
      px: px.value, vhVal: vhVal.value, cssProp: cssProp.value,
      minH: minH.value, maxH: maxH.value, minPx: minPx.value, maxPx: maxPx.value,
      autoFromWindow: autoFromWindow.value
    }))
  } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    const s = JSON.parse(raw)
    if (s?.mode) mode.value = s.mode
    if (s?.unit) unit.value = s.unit
    if (Number.isFinite(s?.decimals)) decimals.value = s.decimals
    if (Number.isFinite(s?.vpH)) vpH.value = s.vpH
    if (Number.isFinite(s?.px)) px.value = s.px
    if (Number.isFinite(s?.vhVal)) vhVal.value = s.vhVal
    if (s?.cssProp) cssProp.value = s.cssProp
    if (Number.isFinite(s?.minH)) minH.value = s.minH
    if (Number.isFinite(s?.maxH)) maxH.value = s.maxH
    if (Number.isFinite(s?.minPx)) minPx.value = s.minPx
    if (Number.isFinite(s?.maxPx)) maxPx.value = s.maxPx
    if (typeof s?.autoFromWindow === 'boolean') autoFromWindow.value = s.autoFromWindow
  } catch {}
})
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.sub { @apply block text-xs text-gray-400 mb-1; }
.hint { @apply text-xs text-gray-400 mt-1; }
.input { @apply bg-gray-950 text-white border border-gray-800 rounded px-3 py-2 w-full; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
.mono-box { @apply bg-gray-950 text-green-300 font-mono text-sm p-3 rounded border border-gray-800 overflow-x-auto; }
.warn { @apply text-sm text-yellow-400; }
</style>



