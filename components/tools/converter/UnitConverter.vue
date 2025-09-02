<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Unit Converter</h2>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-2">
      <button
          v-for="tab in tabs"
          :key="tab.key"
          class="px-3 py-1 rounded text-white"
          :class="activeTab === tab.key ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'"
          @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- GENERIC CATEGORIES (length / weight / speed / temperature) -->
    <div v-if="['length','weight','speed','temperature'].includes(activeTab)" class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label class="block text-white text-sm mb-1">Value</label>
          <input
              type="number"
              v-model.number="generic.value"
              class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label class="block text-white text-sm mb-1">From</label>
          <select v-model="generic.from" class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full">
            <option v-for="u in unitsFor(activeTab)" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>
        <div>
          <label class="block text-white text-sm mb-1">To</label>
          <select v-model="generic.to" class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full">
            <option v-for="u in unitsFor(activeTab)" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>

        <div>
          <button @click="swapUnits" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded">Swap</button>
        </div>
      </div>

      <div class="space-y-4">
        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <p class="text-gray-300 text-sm mb-1">Result</p>
          <p class="text-white font-mono text-lg">
            {{ formatNumber(convertedValue) }} {{ generic.to }}
          </p>
        </div>

        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <p class="text-gray-300 text-sm mb-2">All conversions</p>
          <ul class="grid sm:grid-cols-2 gap-2 text-white font-mono text-sm">
            <li v-for="u in unitsFor(activeTab)" :key="u">
              {{ u }}: {{ formatNumber(convertToAll[u]) }}
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
            <label class="block text-white text-sm mb-1">Value</label>
            <input
                type="number"
                v-model.number="css.value"
                class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label class="block text-white text-sm mb-1">From</label>
            <select v-model="css.from" class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full">
              <option value="px">px</option>
              <option value="rem">rem</option>
              <option value="em">em</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="swapCss" class="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded w-full">
              Swap
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white text-sm mb-1">Root font-size (for rem)</label>
            <input
                type="number"
                v-model.number="css.root"
                min="1"
                class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full"
            />
            <p class="text-xs text-gray-400 mt-1">Default browser root is 16px</p>
          </div>
          <div>
            <label class="block text-white text-sm mb-1">Context font-size (for em)</label>
            <input
                type="number"
                v-model.number="css.context"
                min="1"
                class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full"
            />
            <p class="text-xs text-gray-400 mt-1">Parent element font-size (px)</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <p class="text-gray-300 text-sm mb-2">Conversions</p>
          <ul class="grid sm:grid-cols-3 gap-2 text-white font-mono text-sm">
            <li>px: {{ formatNumber(cssAll.px) }}</li>
            <li>rem: {{ formatNumber(cssAll.rem) }}</li>
            <li>em: {{ formatNumber(cssAll.em) }}</li>
          </ul>
        </div>

        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <p class="text-gray-300 text-sm mb-1">Quick CSS</p>
          <p class="text-white font-mono">font-size: {{ formatNumber(cssAll.rem) }}rem;</p>
          <p class="text-white font-mono">padding: {{ formatNumber(cssAll.em) }}em;</p>
        </div>
      </div>
    </div>

    <p class="text-xs text-gray-400">
      Note: temperature uses exact formulas; others use factors to a base unit (SI).
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

type TabKey = 'length' | 'weight' | 'temperature' | 'speed' | 'css'
const tabs: { key: TabKey; label: string }[] = [
  { key: 'length', label: 'Length' },
  { key: 'weight', label: 'Weight' },
  { key: 'temperature', label: 'Temperature' },
  { key: 'speed', label: 'Speed' },
  { key: 'css', label: 'CSS Units' }
]
const activeTab = ref<TabKey>('length')

/** ---------- Generic categories (factor to base unit) ---------- */
// base units: length=m, weight=g, speed=m/s
const lengthFactors: Record<string, number> = {
  km: 1000,
  m: 1,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254
}
const weightFactors: Record<string, number> = {
  t: 1_000_000, // gram base
  kg: 1000,
  g: 1,
  mg: 0.001,
  lb: 453.59237,
  oz: 28.349523125
}
const speedFactors: Record<string, number> = {
  'm/s': 1,
  'km/h': 1000 / 3600,
  mph: 1609.344 / 3600,
  knot: 1852 / 3600
}

const generic = reactive({
  value: 1,
  from: 'm',  // default for length
  to: 'km'
})

watch(activeTab, () => {
  if (activeTab.value === 'length') { generic.from = 'm'; generic.to = 'km'; generic.value = 1 }
  if (activeTab.value === 'weight') { generic.from = 'kg'; generic.to = 'lb'; generic.value = 1 }
  if (activeTab.value === 'speed') { generic.from = 'm/s'; generic.to = 'km/h'; generic.value = 10 }
  if (activeTab.value === 'temperature') { generic.from = 'C'; generic.to = 'F'; generic.value = 0 }
})

function unitsFor(tab: TabKey): string[] {
  if (tab === 'length') return Object.keys(lengthFactors)
  if (tab === 'weight') return Object.keys(weightFactors)
  if (tab === 'speed') return Object.keys(speedFactors)
  if (tab === 'temperature') return ['C', 'F', 'K']
  return []
}

function swapUnits() {
  const t = generic.from
  generic.from = generic.to
  generic.to = t
}

const convertedValue = computed(() => {
  return convertGeneric(generic.value, generic.from, generic.to, activeTab.value)
})

const convertToAll = computed<Record<string, number>>(() => {
  const out: Record<string, number> = {}
  for (const u of unitsFor(activeTab.value)) {
    out[u] = convertGeneric(generic.value, generic.from, u, activeTab.value)
  }
  return out
})

function convertGeneric(value: number, from: string, to: string, tab: TabKey): number {
  if (!Number.isFinite(value)) return NaN
  if (tab === 'length') return (value * lengthFactors[from]) / lengthFactors[to]
  if (tab === 'weight') return (value * weightFactors[from]) / weightFactors[to]
  if (tab === 'speed') return (value * speedFactors[from]) / speedFactors[to]
  if (tab === 'temperature') return convertTemp(value, from, to)
  return value
}

/** Temperature conversions between C/F/K */
function convertTemp(v: number, from: string, to: string): number {
  let c = v
  if (from === 'F') c = (v - 32) * 5/9
  if (from === 'K') c = v - 273.15
  if (to === 'C') return c
  if (to === 'F') return c * 9/5 + 32
  if (to === 'K') return c + 273.15
  return v
}

/** ---------- CSS Units (px, rem, em) ---------- */
const css = reactive({
  value: 16,
  from: 'px' as 'px'|'rem'|'em',
  root: 16,     // px
  context: 16   // px
})

function swapCss() {
  // simple swap between from and a best-guess to value; the output is always displayed in all three
  if (css.from === 'px') css.from = 'rem'
  else if (css.from === 'rem') css.from = 'em'
  else css.from = 'px'
}

const cssAll = computed(() => {
  const px = toPx(css.value, css.from, css.root, css.context)
  return {
    px,
    rem: px / css.root,
    em: px / css.context
  }
})

function toPx(value: number, unit: 'px'|'rem'|'em', root: number, context: number): number {
  if (!Number.isFinite(value)) return NaN
  if (unit === 'px') return value
  if (unit === 'rem') return value * root
  return value * context // em
}

/** ---------- utils ---------- */
function formatNumber(n: number) {
  if (!Number.isFinite(n)) return '—'
  const abs = Math.abs(n)
  const digits = abs !== 0 && (abs < 0.01 || abs > 10000) ? 6 : 3
  return Number(n.toFixed(digits)).toString()
}
</script>

<style scoped>
/* usa le utility Tailwind del progetto */
</style>
