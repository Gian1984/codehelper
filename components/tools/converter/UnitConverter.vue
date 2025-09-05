<template>
  <div class="p-6 sm:p-8 bg-gray-800 rounded-xl shadow space-y-6 text-white">
    <div class="flex flex-wrap gap-2 justify-between items-center">
      <h2 class="text-2xl font-semibold">Unit Converter</h2>
      <span v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</span>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2">
      <button
          v-for="tab in tabs"
          :key="tab.key"
          class="px-3 py-1.5 rounded text-sm font-medium transition"
          :class="activeTab === tab.key ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
          @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- GENERIC CATEGORIES -->
    <div
        v-if="['length','weight','speed','temperature','area','volume'].includes(activeTab)"
        class="grid md:grid-cols-2 gap-6"
    >
      <!-- Input controls -->
      <div class="space-y-4">
        <div>
          <label class="label">Value</label>
          <input type="number" v-model.number="generic.value" class="input" />
        </div>

        <div>
          <label class="label">From</label>
          <select v-model="generic.from" class="input">
            <option v-for="u in unitsFor(activeTab)" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>

        <div>
          <label class="label">To</label>
          <select v-model="generic.to" class="input">
            <option v-for="u in unitsFor(activeTab)" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>

        <div class="flex gap-3">
          <button @click="swapUnits" class="btn">Swap</button>
          <button @click="copy(`${formatNumber(convertedValue)} ${generic.to}`)" class="btn-primary">
            Copy Result
          </button>
        </div>
      </div>

      <!-- Output -->
      <div class="space-y-4">
        <div class="card">
          <p class="label">Result</p>
          <p class="mono text-lg">{{ formatNumber(convertedValue) }} {{ generic.to }}</p>
        </div>

        <div class="card max-h-48 overflow-y-auto">
          <p class="label mb-2">All conversions</p>
          <ul class="grid sm:grid-cols-2 gap-2 text-sm">
            <li
                v-for="u in unitsFor(activeTab)"
                :key="u"
                class="flex justify-between items-center"
            >
              <span>{{ u }}</span>
              <span class="mono">{{ formatNumber(convertToAll[u]) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- CSS UNITS -->
    <div v-else-if="activeTab === 'css'" class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="label">Value</label>
            <input type="number" v-model.number="css.value" class="input" />
          </div>
          <div>
            <label class="label">From</label>
            <select v-model="css.from" class="input">
              <option value="px">px</option>
              <option value="rem">rem</option>
              <option value="em">em</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="swapCss" class="btn w-full">Cycle Unit</button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Root font-size (rem)</label>
            <input type="number" min="1" v-model.number="css.root" class="input" />
            <p class="note">Default browser root: 16px</p>
          </div>
          <div>
            <label class="label">Context font-size (em)</label>
            <input type="number" min="1" v-model.number="css.context" class="input" />
            <p class="note">Parent element font-size</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card">
          <p class="label mb-2">Conversions</p>
          <ul class="grid sm:grid-cols-3 gap-2 text-sm">
            <li>px: <span class="mono">{{ formatNumber(cssAll.px) }}</span></li>
            <li>rem: <span class="mono">{{ formatNumber(cssAll.rem) }}</span></li>
            <li>em: <span class="mono">{{ formatNumber(cssAll.em) }}</span></li>
          </ul>
        </div>

        <div class="card">
          <p class="label">Quick CSS</p>
          <div class="space-y-1 mono text-sm">
            <p>font-size: {{ formatNumber(cssAll.rem) }}rem;</p>
            <p>padding: {{ formatNumber(cssAll.em) }}em;</p>
          </div>
          <button @click="copy(`font-size:${formatNumber(cssAll.rem)}rem;`)" class="btn mt-2">
            Copy font-size
          </button>
        </div>
      </div>
    </div>

    <p class="note">
      Note: temperature uses exact formulas; other categories use SI base unit factors.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

/* ---------- Tabs ---------- */
type TabKey = 'length' | 'weight' | 'temperature' | 'speed' | 'area' | 'volume' | 'css'
const tabs: { key: TabKey; label: string }[] = [
  { key: 'length', label: 'Length' },
  { key: 'area', label: 'Area' },
  { key: 'volume', label: 'Volume' },
  { key: 'weight', label: 'Weight' },
  { key: 'speed', label: 'Speed' },
  { key: 'temperature', label: 'Temperature' },
  { key: 'css', label: 'CSS Units' }
]
const activeTab = ref<TabKey>('length')

/* ---------- Factors (base units: m, m², m³, g, m/s) ---------- */
const lengthFactors = { km: 1000, m: 1, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 }
const areaFactors = { 'km²': 1e6, 'm²': 1, 'cm²': 1e-4, 'mm²': 1e-6, 'ft²': 0.092903, 'in²': 0.00064516, acre: 4046.8564224 }
const volumeFactors = { 'm³': 1, L: 0.001, mL: 1e-6, 'ft³': 0.0283168, 'in³': 1.6387e-5, gal: 0.00378541 }
const weightFactors = { t: 1_000_000, kg: 1000, g: 1, mg: 0.001, lb: 453.59237, oz: 28.349523125 }
const speedFactors = { 'm/s': 1, 'km/h': 1000 / 3600, mph: 1609.344 / 3600, knot: 1852 / 3600 }

/* ---------- Generic ---------- */
const generic = reactive({ value: 1, from: 'm', to: 'km' })
watch(activeTab, () => {
  if (activeTab.value === 'length') Object.assign(generic, { from: 'm', to: 'km', value: 1 })
  if (activeTab.value === 'area') Object.assign(generic, { from: 'm²', to: 'cm²', value: 1 })
  if (activeTab.value === 'volume') Object.assign(generic, { from: 'L', to: 'm³', value: 1 })
  if (activeTab.value === 'weight') Object.assign(generic, { from: 'kg', to: 'lb', value: 1 })
  if (activeTab.value === 'speed') Object.assign(generic, { from: 'm/s', to: 'km/h', value: 10 })
  if (activeTab.value === 'temperature') Object.assign(generic, { from: 'C', to: 'F', value: 0 })
})

function unitsFor(tab: TabKey): string[] {
  if (tab === 'length') return Object.keys(lengthFactors)
  if (tab === 'area') return Object.keys(areaFactors)
  if (tab === 'volume') return Object.keys(volumeFactors)
  if (tab === 'weight') return Object.keys(weightFactors)
  if (tab === 'speed') return Object.keys(speedFactors)
  if (tab === 'temperature') return ['C', 'F', 'K']
  return []
}

function swapUnits() { [generic.from, generic.to] = [generic.to, generic.from] }

/* ---------- Conversion logic ---------- */
const convertedValue = computed(() => convertGeneric(generic.value, generic.from, generic.to, activeTab.value))
const convertToAll = computed<Record<string, number>>(() => {
  const out: Record<string, number> = {}
  for (const u of unitsFor(activeTab.value)) out[u] = convertGeneric(generic.value, generic.from, u, activeTab.value)
  return out
})

function convertGeneric(v: number, from: string, to: string, tab: TabKey): number {
  if (!Number.isFinite(v)) return NaN
  if (tab === 'length') return (v * lengthFactors[from]) / lengthFactors[to]
  if (tab === 'area') return (v * areaFactors[from]) / areaFactors[to]
  if (tab === 'volume') return (v * volumeFactors[from]) / volumeFactors[to]
  if (tab === 'weight') return (v * weightFactors[from]) / weightFactors[to]
  if (tab === 'speed') return (v * speedFactors[from]) / speedFactors[to]
  if (tab === 'temperature') return convertTemp(v, from, to)
  return v
}

/* Temperature */
function convertTemp(v: number, from: string, to: string): number {
  let c = v
  if (from === 'F') c = (v - 32) * 5/9
  if (from === 'K') c = v - 273.15
  if (to === 'C') return c
  if (to === 'F') return c * 9/5 + 32
  if (to === 'K') return c + 273.15
  return v
}

/* ---------- CSS ---------- */
const css = reactive({ value: 16, from: 'px' as 'px'|'rem'|'em', root: 16, context: 16 })
function swapCss() { css.from = css.from === 'px' ? 'rem' : css.from === 'rem' ? 'em' : 'px' }
const cssAll = computed(() => {
  const px = toPx(css.value, css.from, css.root, css.context)
  return { px, rem: px / css.root, em: px / css.context }
})
function toPx(v: number, u: 'px'|'rem'|'em', root: number, ctx: number) {
  if (u === 'px') return v
  if (u === 'rem') return v * root
  return v * ctx
}

/* ---------- Utils ---------- */
const copiedMsg = ref('')
function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => copiedMsg.value = '', 1500)
}
function formatNumber(n: number) {
  if (!Number.isFinite(n)) return '—'
  const abs = Math.abs(n)
  const digits = abs !== 0 && (abs < 0.01 || abs > 10000) ? 6 : 3
  return Number(n.toFixed(digits)).toString()
}
</script>

<style scoped>
.label { @apply block text-sm text-gray-300 mb-1; }
.note { @apply text-xs text-gray-400 mt-1; }
.input { @apply bg-gray-950 text-white border border-gray-700 rounded px-3 py-2 w-full; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-lg p-4 border border-gray-700; }
.mono { @apply font-mono text-green-300; }
</style>

