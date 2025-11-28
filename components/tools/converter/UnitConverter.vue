<template>
  <div class="p-6 sm:p-8 bg-gray-800 rounded-xl shadow-xl space-y-6 text-white">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold text-white">Unit Converter</h2>
    </div>

    <!-- Category Tabs -->
    <div class="bg-gray-900 rounded-xl p-3 border border-gray-700">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="px-3 py-2 rounded-lg text-xs font-medium transition-all"
          :class="activeTab === tab.key ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'"
          @click="activeTab = tab.key"
        >
          <span class="mr-1">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Recent Conversions (if any) -->
    <div v-if="recentConversions.length > 0 && activeTab !== 'css'" class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <h3 class="text-sm font-medium text-gray-300 mb-3">🕒 Recent Conversions</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(conv, idx) in recentConversions.filter(c => c.category === activeTab)"
          :key="idx"
          class="px-3 py-1.5 rounded-lg text-xs bg-gray-700 hover:bg-gray-600 text-white transition-all"
          @click="generic.from = conv.from; generic.to = conv.to"
        >
          {{ conv.from }} → {{ conv.to }}
        </button>
      </div>
    </div>

    <!-- GENERIC CATEGORIES -->
    <div
      v-if="['length','weight','speed','temperature','area','volume','pressure','energy','power'].includes(activeTab)"
      class="grid md:grid-cols-2 gap-6"
    >
      <!-- Input Section -->
      <div class="space-y-4">
        <!-- Value Input -->
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">Value</label>
          <input
            type="number"
            v-model.number="generic.value"
            class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm transition-all"
            placeholder="Enter value..."
          />
        </div>

        <!-- Search Units -->
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">🔍 Search Units</label>
          <input
            type="text"
            v-model="searchQuery"
            class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
            placeholder="Type to filter units..."
          />
        </div>

        <!-- From Unit -->
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">From</label>
          <select
            v-model="generic.from"
            class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          >
            <option v-for="u in filteredUnits" :key="u" :value="u">
              {{ isFavorite(u) ? '⭐ ' : '' }}{{ u }}
            </option>
          </select>
          <button
            @click="toggleFavorite(generic.from)"
            class="text-xs text-indigo-400 hover:text-indigo-300"
          >
            {{ isFavorite(generic.from) ? '★ Remove from favorites' : '☆ Add to favorites' }}
          </button>
        </div>

        <!-- To Unit -->
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">To</label>
          <select
            v-model="generic.to"
            class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          >
            <option v-for="u in filteredUnits" :key="u" :value="u">
              {{ isFavorite(u) ? '⭐ ' : '' }}{{ u }}
            </option>
          </select>
          <button
            @click="toggleFavorite(generic.to)"
            class="text-xs text-indigo-400 hover:text-indigo-300"
          >
            {{ isFavorite(generic.to) ? '★ Remove from favorites' : '☆ Add to favorites' }}
          </button>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button @click="swapUnits" class="btn-secondary flex-1">↕️ Swap</button>
          <button
            @click="copy(`${formatNumber(convertedValue)} ${generic.to}`, 'result')"
            class="btn-primary flex-1"
          >
            {{ copiedField === 'result' ? 'Copied!' : 'Copy Result' }}
          </button>
        </div>
      </div>

      <!-- Output Section -->
      <div class="space-y-4">
        <!-- Result -->
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-2">
          <p class="text-sm font-medium text-gray-300">Result</p>
          <p class="font-mono text-green-400 text-2xl font-bold">
            {{ formatNumber(convertedValue) }} {{ generic.to }}
          </p>
        </div>

        <!-- All Conversions -->
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3 max-h-96 overflow-y-auto">
          <p class="text-sm font-medium text-gray-300 mb-3">📊 All Conversions</p>
          <div class="space-y-2">
            <div
              v-for="u in filteredUnits"
              :key="u"
              class="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
            >
              <span class="text-sm text-gray-300 flex items-center gap-2">
                <button
                  @click="toggleFavorite(u)"
                  class="text-yellow-500 hover:text-yellow-400 text-xs"
                >
                  {{ isFavorite(u) ? '★' : '☆' }}
                </button>
                {{ u }}
              </span>
              <span class="font-mono text-green-400 text-sm">{{ formatNumber(convertToAll[u]) }}</span>
            </div>
          </div>
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
import { ref, reactive, computed, watch, onMounted } from 'vue'

/* ---------- Tabs ---------- */
type TabKey = 'length' | 'weight' | 'temperature' | 'speed' | 'area' | 'volume' | 'pressure' | 'energy' | 'power' | 'css'
const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'length', label: 'Length', icon: '📏' },
  { key: 'area', label: 'Area', icon: '⬛' },
  { key: 'volume', label: 'Volume', icon: '🧊' },
  { key: 'weight', label: 'Weight', icon: '⚖️' },
  { key: 'speed', label: 'Speed', icon: '🚀' },
  { key: 'temperature', label: 'Temperature', icon: '🌡️' },
  { key: 'pressure', label: 'Pressure', icon: '💨' },
  { key: 'energy', label: 'Energy', icon: '⚡' },
  { key: 'power', label: 'Power', icon: '💡' },
  { key: 'css', label: 'CSS Units', icon: '🎨' }
]
const activeTab = ref<TabKey>('length')

/* ---------- Factors (base units: m, m², m³, g, m/s, Pa, J, W) ---------- */
const lengthFactors = { km: 1000, m: 1, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 }
const areaFactors = { 'km²': 1e6, 'm²': 1, 'cm²': 1e-4, 'mm²': 1e-6, 'ft²': 0.092903, 'in²': 0.00064516, acre: 4046.8564224, hectare: 10000 }
const volumeFactors = { 'm³': 1, L: 0.001, mL: 1e-6, 'ft³': 0.0283168, 'in³': 1.6387e-5, gal: 0.00378541, 'US gal': 0.00378541, 'UK gal': 0.00454609 }
const weightFactors = { t: 1_000_000, kg: 1000, g: 1, mg: 0.001, lb: 453.59237, oz: 28.349523125, stone: 6350.29318 }
const speedFactors = { 'm/s': 1, 'km/h': 1000 / 3600, mph: 1609.344 / 3600, knot: 1852 / 3600, 'ft/s': 0.3048 }
const pressureFactors = { Pa: 1, kPa: 1000, MPa: 1e6, bar: 1e5, atm: 101325, psi: 6894.76, mmHg: 133.322, inHg: 3386.39 }
const energyFactors = { J: 1, kJ: 1000, MJ: 1e6, Wh: 3600, kWh: 3.6e6, cal: 4.184, kcal: 4184, BTU: 1055.06, eV: 1.60218e-19 }
const powerFactors = { W: 1, kW: 1000, MW: 1e6, hp: 745.7, 'BTU/h': 0.293071 }

/* ---------- Generic ---------- */
const generic = reactive({ value: 1, from: 'm', to: 'km' })
const searchQuery = ref('')
const favorites = ref<string[]>([])
const recentConversions = ref<Array<{ from: string; to: string; category: TabKey }>>([])

watch(activeTab, () => {
  searchQuery.value = ''
  if (activeTab.value === 'length') Object.assign(generic, { from: 'm', to: 'km', value: 1 })
  if (activeTab.value === 'area') Object.assign(generic, { from: 'm²', to: 'km²', value: 1 })
  if (activeTab.value === 'volume') Object.assign(generic, { from: 'L', to: 'm³', value: 1 })
  if (activeTab.value === 'weight') Object.assign(generic, { from: 'kg', to: 'lb', value: 1 })
  if (activeTab.value === 'speed') Object.assign(generic, { from: 'm/s', to: 'km/h', value: 10 })
  if (activeTab.value === 'temperature') Object.assign(generic, { from: 'C', to: 'F', value: 0 })
  if (activeTab.value === 'pressure') Object.assign(generic, { from: 'Pa', to: 'bar', value: 100000 })
  if (activeTab.value === 'energy') Object.assign(generic, { from: 'J', to: 'kJ', value: 1000 })
  if (activeTab.value === 'power') Object.assign(generic, { from: 'W', to: 'kW', value: 1000 })
})

function unitsFor(tab: TabKey): string[] {
  if (tab === 'length') return Object.keys(lengthFactors)
  if (tab === 'area') return Object.keys(areaFactors)
  if (tab === 'volume') return Object.keys(volumeFactors)
  if (tab === 'weight') return Object.keys(weightFactors)
  if (tab === 'speed') return Object.keys(speedFactors)
  if (tab === 'pressure') return Object.keys(pressureFactors)
  if (tab === 'energy') return Object.keys(energyFactors)
  if (tab === 'power') return Object.keys(powerFactors)
  if (tab === 'temperature') return ['C', 'F', 'K']
  return []
}

const filteredUnits = computed(() => {
  const units = unitsFor(activeTab.value)
  if (!searchQuery.value) return units
  const query = searchQuery.value.toLowerCase()
  return units.filter(u => u.toLowerCase().includes(query))
})

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
  if (tab === 'pressure') return (v * pressureFactors[from]) / pressureFactors[to]
  if (tab === 'energy') return (v * energyFactors[from]) / energyFactors[to]
  if (tab === 'power') return (v * powerFactors[from]) / powerFactors[to]
  if (tab === 'temperature') return convertTemp(v, from, to)
  return v
}

function trackConversion() {
  // Add to recent conversions
  const conversion = { from: generic.from, to: generic.to, category: activeTab.value }
  recentConversions.value = [
    conversion,
    ...recentConversions.value.filter(c => !(c.from === conversion.from && c.to === conversion.to && c.category === conversion.category))
  ].slice(0, 5)

  // Save to localStorage
  localStorage.setItem('unit-converter-recent', JSON.stringify(recentConversions.value))
}

function toggleFavorite(unit: string) {
  const key = `${activeTab.value}:${unit}`
  const index = favorites.value.indexOf(key)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(key)
  }
  localStorage.setItem('unit-converter-favorites', JSON.stringify(favorites.value))
}

function isFavorite(unit: string): boolean {
  return favorites.value.includes(`${activeTab.value}:${unit}`)
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
const copiedField = ref('')
function copy(text: string, field: string = 'result') {
  navigator.clipboard.writeText(text)
  copiedField.value = field
  setTimeout(() => copiedField.value = '', 1500)
  trackConversion()
}
function formatNumber(n: number) {
  if (!Number.isFinite(n)) return '—'
  const abs = Math.abs(n)
  const digits = abs !== 0 && (abs < 0.01 || abs > 10000) ? 6 : 3
  return Number(n.toFixed(digits)).toString()
}

/* ---------- Initialize ---------- */
onMounted(() => {
  // Load favorites from localStorage
  const savedFavorites = localStorage.getItem('unit-converter-favorites')
  if (savedFavorites) {
    try {
      favorites.value = JSON.parse(savedFavorites)
    } catch {}
  }

  // Load recent conversions from localStorage
  const savedRecent = localStorage.getItem('unit-converter-recent')
  if (savedRecent) {
    try {
      recentConversions.value = JSON.parse(savedRecent)
    } catch {}
  }
})
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm font-medium;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40;
}

.btn-secondary {
  @apply bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm font-medium;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply transition-all;
}
</style>

