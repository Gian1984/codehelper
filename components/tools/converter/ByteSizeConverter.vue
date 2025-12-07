<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">💾 Byte Size Converter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">🗑️ Clear</button>
      </div>
    </div>

    <!-- Unit Type & Decimals -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card space-y-2">
        <h3 class="label">📊 Unit Type</h3>
        <div class="flex gap-2">
          <button
            class="flex-1 px-3 py-2 rounded-lg text-sm transition-colors border border-transparent"
            :class="unitType === 'byte' ? 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500' : 'bg-gray-700 hover:bg-gray-600 border-gray-600'"
            @click="unitType = 'byte'"
          >
            📦 Bytes (B, KB, MB...)
          </button>
          <button
            class="flex-1 px-3 py-2 rounded-lg text-sm transition-colors border border-transparent"
            :class="unitType === 'bit' ? 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500' : 'bg-gray-700 hover:bg-gray-600 border-gray-600'"
            @click="unitType = 'bit'"
          >
            ⚡ Bits (b, Kb, Mb...)
          </button>
        </div>
        <p class="text-xs text-gray-400">1 Byte = 8 bits</p>
      </div>

      <div class="card space-y-2">
        <h3 class="label">🔢 Decimals</h3>
        <input type="number" min="0" max="6" v-model.number="decimals" class="input" />
        <p class="text-xs text-gray-400">Precision for converted values</p>
      </div>
    </div>

    <!-- Input -->
    <div class="card space-y-3">
      <h3 class="label">📝 Input</h3>
      <div>
        <span class="text-xs text-gray-400 block mb-1">Enter value (supports: 1024, 1.5 GB, 2 MiB, 1_000_000)</span>
        <input
          v-model.trim="inputStr"
          @input="parseInput"
          class="input font-mono"
          :placeholder="unitType === 'byte' ? 'e.g. 1048576 or 1 MiB or 1.5 GB' : 'e.g. 8388608 or 8 Mibit or 12 Gbit'"
        />
        <p v-if="parseError" class="text-red-400 text-xs mt-1">{{ parseError }}</p>
      </div>
      <div v-if="humanized" class="bg-gray-800 border border-indigo-500/30 rounded-lg p-3">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs text-gray-400">Best Representation:</span>
            <div class="text-green-300 font-mono text-lg">{{ humanized }}</div>
          </div>
          <button class="btn text-xs" @click="copy(humanized)">📋 Copy</button>
        </div>
      </div>
    </div>

    <!-- Conversions Tabs -->
    <div class="space-y-3">
      <div class="flex gap-2 border-b border-gray-700">
        <button
          class="px-4 py-2 text-sm font-medium transition-colors border-b-2"
          :class="activeTab === 'iec' ? 'text-indigo-400 border-indigo-400' : 'text-gray-400 border-transparent hover:text-white'"
          @click="activeTab = 'iec'"
        >
          🔷 IEC (Binary × 1024)
        </button>
        <button
          class="px-4 py-2 text-sm font-medium transition-colors border-b-2"
          :class="activeTab === 'si' ? 'text-indigo-400 border-indigo-400' : 'text-gray-400 border-transparent hover:text-white'"
          @click="activeTab = 'si'"
        >
          🔶 SI (Decimal × 1000)
        </button>
        <button
          class="px-4 py-2 text-sm font-medium transition-colors border-b-2"
          :class="activeTab === 'both' ? 'text-indigo-400 border-indigo-400' : 'text-gray-400 border-transparent hover:text-white'"
          @click="activeTab = 'both'"
        >
          ⚖️ Both Systems
        </button>
      </div>

      <!-- IEC Tab -->
      <div v-if="activeTab === 'iec' || activeTab === 'both'" class="card">
        <h3 class="label mb-3">🔷 IEC Binary (1024-based)</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div v-for="unit in iecUnits" :key="unit.key" class="bg-black border border-gray-700 rounded-lg p-3">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-gray-400">{{ unit.label }}</span>
              <button class="text-xs text-indigo-400 hover:text-indigo-300 opacity-70 hover:opacity-100" @click="copy(unit.value)" :disabled="!unit.value">📋</button>
            </div>
            <div class="font-mono text-sm text-white">{{ unit.value || '—' }}</div>
          </div>
        </div>
      </div>

      <!-- SI Tab -->
      <div v-if="activeTab === 'si' || activeTab === 'both'" class="card">
        <h3 class="label mb-3">🔶 SI Decimal (1000-based)</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div v-for="unit in siUnits" :key="unit.key" class="bg-black border border-gray-700 rounded-lg p-3">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-gray-400">{{ unit.label }}</span>
              <button class="text-xs text-indigo-400 hover:text-indigo-300 opacity-70 hover:opacity-100" @click="copy(unit.value)" :disabled="!unit.value">📋</button>
            </div>
            <div class="font-mono text-sm text-white">{{ unit.value || '—' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Common File Size Presets -->
    <div class="card space-y-3">
      <h3 class="label">🎯 Common File Sizes</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <button v-for="p in presets" :key="p.label" @click="setPreset(p.bytes)" class="btn text-xs py-2">
          {{ p.icon }} {{ p.label }}
        </button>
      </div>
    </div>

    <!-- Network Speed Calculator -->
    <div class="card space-y-4">
      <div>
        <h3 class="label">🌐 Network Speed Calculator</h3>
        <p class="text-xs text-gray-400">Calculate download/upload time based on size & speed.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <span class="text-xs text-gray-400 block mb-1">File Size ({{ unitType === 'byte' ? 'MB' : 'Mbit' }})</span>
          <input type="number" v-model.number="netFileSize" min="0" step="0.1" class="input" />
        </div>
        <div>
          <span class="text-xs text-gray-400 block mb-1">Connection Speed ({{ unitType === 'byte' ? 'MB/s' : 'Mbit/s' }})</span>
          <input type="number" v-model.number="netSpeed" min="0" step="0.1" class="input" />
        </div>
        <div>
          <span class="text-xs text-gray-400 block mb-1">Estimated Time</span>
          <div class="bg-black border border-gray-700 rounded-lg px-3 py-2 font-mono text-sm text-green-300 h-[42px] flex items-center">
            {{ downloadTime }}
          </div>
        </div>
      </div>

      <div class="flex gap-2 flex-wrap">
        <button class="btn text-xs" @click="loadNetPreset('fiber')">🚀 Fiber (100 MB/s)</button>
        <button class="btn text-xs" @click="loadNetPreset('cable')">📡 Cable (10 MB/s)</button>
        <button class="btn text-xs" @click="loadNetPreset('dsl')">📞 DSL (1 MB/s)</button>
        <button class="btn text-xs" @click="loadNetPreset('4g')">📱 4G (5 MB/s)</button>
        <button class="btn text-xs" @click="loadNetPreset('5g')">📡 5G (50 MB/s)</button>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm text-center font-medium">✅ {{ copiedMsg }}</p>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type UnitType = 'byte' | 'bit'
type Tab = 'iec' | 'si' | 'both'

/* -------------------- State -------------------- */
const unitType = ref<UnitType>('byte')
const decimals = ref<number>(2)
const activeTab = ref<Tab>('iec')

const inputStr = ref<string>('')
const baseValue = ref<number>(NaN) // in bytes or bits depending on unitType
const parseError = ref<string>('')

const copiedMsg = ref<string>('')

// Network calculator
const netFileSize = ref<number>(100)
const netSpeed = ref<number>(10)

/* -------------------- Presets -------------------- */
const presets = [
  { icon: '💾', label: 'Floppy', bytes: 1_440_000 },
  { icon: '💿', label: 'CD (700MB)', bytes: 700_000_000 },
  { icon: '📀', label: 'DVD', bytes: 4_700_000_000 },
  { icon: '💿', label: 'Blu-ray', bytes: 25_000_000_000 },
  { icon: '🖼️', label: 'HD Photo', bytes: 5_000_000 },
  { icon: '🎵', label: 'MP3 (3min)', bytes: 3_000_000 },
  { icon: '🎬', label: '4K/min', bytes: 100_000_000 },
  { icon: '📱', label: 'App (~50MB)', bytes: 50_000_000 },
  { icon: '🎮', label: 'Game (50GB)', bytes: 50_000_000_000 },
  { icon: '📚', label: 'eBook', bytes: 1_000_000 },
  { icon: '📄', label: 'PDF (10pg)', bytes: 500_000 },
  { icon: '🗂️', label: 'ZIP (10MB)', bytes: 10_000_000 },
]

/* -------------------- Helpers -------------------- */
function fmt(n: number, d = decimals.value): string {
  if (!Number.isFinite(n)) return ''
  const fixed = n.toFixed(d)
  // Strip trailing zeros
  return fixed.indexOf('.') >= 0 ? fixed.replace(/\.?0+$/, '') : fixed
}

function formatInt(n: number): string {
  if (!Number.isFinite(n)) return ''
  return Math.round(n).toLocaleString()
}

/* -------------------- Parsing -------------------- */
function parseFlexible(input: string): { value: number; suffix?: string } {
  const s = input.replace(/_/g, '').replace(/,/g, '').trim()
  if (!s) return { value: NaN }

  // Match: number + optional unit suffix
  const m = s.match(/^([-+]?\d+(\.\d+)?)(?:\s*([a-zA-Z]+))?$/)
  if (!m) return { value: NaN }

  const num = Number(m[1])
  const suf = m[3]?.toLowerCase()
  return { value: num, suffix: suf }
}

function suffixToMultiplier(suffix: string | undefined, type: UnitType): number {
  if (!suffix) return 1

  const base1000 = 1000
  const base1024 = 1024

  if (type === 'byte') {
    const byteMap: Record<string, number> = {
      b: 1,
      kb: base1000, mb: base1000 ** 2, gb: base1000 ** 3, tb: base1000 ** 4, pb: base1000 ** 5,
      kib: base1024, mib: base1024 ** 2, gib: base1024 ** 3, tib: base1024 ** 4, pib: base1024 ** 5,
    }
    return byteMap[suffix] ?? NaN
  } else {
    const bitMap: Record<string, number> = {
      b: 1, bit: 1, bits: 1,
      kb: base1000, kbit: base1000, mb: base1000 ** 2, mbit: base1000 ** 2,
      gb: base1000 ** 3, gbit: base1000 ** 3, tb: base1000 ** 4, tbit: base1000 ** 4,
      kib: base1024, kibit: base1024, mib: base1024 ** 2, mibit: base1024 ** 2,
      gib: base1024 ** 3, gibit: base1024 ** 3, tib: base1024 ** 4, tibit: base1024 ** 4,
    }
    return bitMap[suffix] ?? NaN
  }
}

function parseInput() {
  parseError.value = ''

  try {
    const { value, suffix } = parseFlexible(inputStr.value)
    if (!Number.isFinite(value)) {
      throw new Error('Invalid number format')
    }

    const multiplier = suffixToMultiplier(suffix, unitType.value)
    if (!Number.isFinite(multiplier)) {
      throw new Error(`Unknown unit "${suffix}"`)
    }

    baseValue.value = value * multiplier
  } catch (e: any) {
    parseError.value = e?.message ?? 'Parse error'
    baseValue.value = NaN
  }
}

/* -------------------- Conversions -------------------- */
const iecUnits = computed(() => {
  const base = baseValue.value
  if (!Number.isFinite(base)) return getEmptyUnits('iec')

  const factor = unitType.value === 'bit' ? 1 : 1
  const suffix = unitType.value === 'bit' ? 'ibit' : 'iB'
  const baseName = unitType.value === 'bit' ? 'bits' : 'Bytes'

  const k = 1024
  return [
    { key: 'base', label: baseName, value: formatInt(base) },
    { key: 'ki', label: `K${suffix}`, value: fmt(base / k) },
    { key: 'mi', label: `M${suffix}`, value: fmt(base / k ** 2) },
    { key: 'gi', label: `G${suffix}`, value: fmt(base / k ** 3) },
    { key: 'ti', label: `T${suffix}`, value: fmt(base / k ** 4) },
    { key: 'pi', label: `P${suffix}`, value: fmt(base / k ** 5) },
  ]
})

const siUnits = computed(() => {
  const base = baseValue.value
  if (!Number.isFinite(base)) return getEmptyUnits('si')

  const suffix = unitType.value === 'bit' ? 'bit' : 'B'
  const baseName = unitType.value === 'bit' ? 'bits' : 'Bytes'

  const k = 1000
  return [
    { key: 'base', label: baseName, value: formatInt(base) },
    { key: 'k', label: `K${suffix}`, value: fmt(base / k) },
    { key: 'm', label: `M${suffix}`, value: fmt(base / k ** 2) },
    { key: 'g', label: `G${suffix}`, value: fmt(base / k ** 3) },
    { key: 't', label: `T${suffix}`, value: fmt(base / k ** 4) },
    { key: 'p', label: `P${suffix}`, value: fmt(base / k ** 5) },
  ]
})

function getEmptyUnits(system: 'iec' | 'si') {
  const suffix = system === 'iec'
    ? (unitType.value === 'bit' ? 'ibit' : 'iB')
    : (unitType.value === 'bit' ? 'bit' : 'B')
  const baseName = unitType.value === 'bit' ? 'bits' : 'Bytes'

  return [
    { key: 'base', label: baseName, value: '' },
    { key: 'k', label: `K${suffix}`, value: '' },
    { key: 'm', label: `M${suffix}`, value: '' },
    { key: 'g', label: `G${suffix}`, value: '' },
    { key: 't', label: `T${suffix}`, value: '' },
    { key: 'p', label: `P${suffix}`, value: '' },
  ]
}

/* -------------------- Humanized -------------------- */
const humanized = computed(() => {
  const base = baseValue.value
  if (!Number.isFinite(base)) return ''

  // Auto-select best unit (IEC preferred)
  const k = 1024
  const suffix = unitType.value === 'bit' ? 'ibit' : 'iB'
  const baseName = unitType.value === 'bit' ? 'bits' : 'B'
  const units = [baseName, `K${suffix}`, `M${suffix}`, `G${suffix}`, `T${suffix}`, `P${suffix}`]

  if (Math.abs(base) < k) return `${formatInt(base)} ${baseName}`

  let idx = Math.floor(Math.log(Math.abs(base)) / Math.log(k))
  idx = Math.min(idx, units.length - 1)
  const val = base / Math.pow(k, idx)

  return `${fmt(val)} ${units[idx]}`
})

/* -------------------- Network Speed Calculator -------------------- */
const downloadTime = computed(() => {
  if (!Number.isFinite(netFileSize.value) || !Number.isFinite(netSpeed.value) || netSpeed.value <= 0) {
    return '—'
  }

  const seconds = netFileSize.value / netSpeed.value

  if (seconds < 60) return `${fmt(seconds, 1)}s`
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    return `${mins}m ${secs}s`
  }

  const hours = Math.floor(seconds / 3600)
  const mins = Math.round((seconds % 3600) / 60)
  return `${hours}h ${mins}m`
})

function loadNetPreset(type: 'fiber' | 'cable' | 'dsl' | '4g' | '5g') {
  const speeds: Record<typeof type, number> = {
    fiber: 100,
    cable: 10,
    dsl: 1,
    '4g': 5,
    '5g': 50,
  }
  netSpeed.value = speeds[type]
}

/* -------------------- Actions -------------------- */
function setPreset(bytes: number) {
  if (unitType.value === 'bit') {
    baseValue.value = bytes * 8
  } else {
    baseValue.value = bytes
  }
  inputStr.value = formatInt(baseValue.value)
  parseError.value = ''
}

function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1500)
}

function clearAll() {
  inputStr.value = ''
  baseValue.value = NaN
  parseError.value = ''
  netFileSize.value = 100
  netSpeed.value = 10
}

/* -------------------- Watchers -------------------- */
watch(unitType, () => {
  // Re-parse when switching between byte/bit
  if (inputStr.value) {
    parseInput()
  }
})

watch(decimals, () => {
  // Trigger re-render of conversions
  if (Number.isFinite(baseValue.value)) {
    baseValue.value = baseValue.value
  }
})
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 font-semibold block mb-2;
}
.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}
.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
</style>