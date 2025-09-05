<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-xl shadow space-y-6 text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Byte Size Converter</h2>
      <span v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</span>
    </div>

    <!-- Options -->
    <div class="grid sm:grid-cols-3 gap-4">
      <div class="card p-3">
        <label class="label mb-1">System</label>
        <div class="flex gap-2">
          <button
              class="px-3 py-1.5 rounded text-sm"
              :class="system==='IEC' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
              @click="setSystem('IEC')"
          >IEC (KiB)</button>
          <button
              class="px-3 py-1.5 rounded text-sm"
              :class="system==='SI' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
              @click="setSystem('SI')"
          >SI (KB)</button>
        </div>
        <p class="note mt-2">IEC = ×1024 • SI = ×1000</p>
      </div>
      <div class="card p-3">
        <label class="label mb-1">Decimals</label>
        <input type="number" min="0" max="6" v-model.number="decimals" class="input w-28" />
        <p class="note mt-2">Used for derived units &amp; humanize.</p>
      </div>
      <div class="card p-3">
        <label class="label mb-1">Humanized</label>
        <div class="flex items-center justify-between gap-2">
          <p class="mono text-lg">{{ humanized }}</p>
          <button class="btn" :disabled="!humanized" @click="copy(humanized)">Copy</button>
        </div>
      </div>
    </div>

    <!-- Inputs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="card p-3 space-y-2">
        <div class="flex items-center justify-between">
          <label class="label">Bytes</label>
          <button class="btn" :disabled="!bytesStr" @click="copy(bytesStr)">Copy</button>
        </div>
        <input
            v-model.trim="bytesStr"
            @input="updateFrom('bytes')"
            class="input mono"
            placeholder="e.g. 1048576 or 1 MiB or 1,048,576"
        />
        <p v-if="errors.bytes" class="text-red-400 text-xs">{{ errors.bytes }}</p>
      </div>

      <div class="card p-3 space-y-2">
        <div class="flex items-center justify-between">
          <label class="label">{{ unitLabel('KB') }}</label>
          <button class="btn" :disabled="!kbStr" @click="copy(kbStr)">Copy</button>
        </div>
        <input
            v-model.trim="kbStr"
            @input="updateFrom('kb')"
            class="input mono"
            :placeholder="`e.g. 1024`"
        />
        <p v-if="errors.kb" class="text-red-400 text-xs">{{ errors.kb }}</p>
      </div>

      <div class="card p-3 space-y-2">
        <div class="flex items-center justify-between">
          <label class="label">{{ unitLabel('MB') }}</label>
          <button class="btn" :disabled="!mbStr" @click="copy(mbStr)">Copy</button>
        </div>
        <input
            v-model.trim="mbStr"
            @input="updateFrom('mb')"
            class="input mono"
            :placeholder="`e.g. 1.5`"
        />
        <p v-if="errors.mb" class="text-red-400 text-xs">{{ errors.mb }}</p>
      </div>

      <div class="card p-3 space-y-2">
        <div class="flex items-center justify-between">
          <label class="label">{{ unitLabel('GB') }}</label>
          <button class="btn" :disabled="!gbStr" @click="copy(gbStr)">Copy</button>
        </div>
        <input
            v-model.trim="gbStr"
            @input="updateFrom('gb')"
            class="input mono"
            :placeholder="`e.g. 0.25`"
        />
        <p v-if="errors.gb" class="text-red-400 text-xs">{{ errors.gb }}</p>
      </div>

      <div class="card p-3 space-y-2 sm:col-span-2">
        <div class="flex items-center justify-between">
          <label class="label">{{ unitLabel('TB') }}</label>
          <button class="btn" :disabled="!tbStr" @click="copy(tbStr)">Copy</button>
        </div>
        <input
            v-model.trim="tbStr"
            @input="updateFrom('tb')"
            class="input mono"
            :placeholder="`e.g. 0.001`"
        />
        <p v-if="errors.tb" class="text-red-400 text-xs">{{ errors.tb }}</p>
      </div>
    </div>

    <div class="pt-2 flex flex-wrap gap-2">
      <button @click="clearAll" class="btn">Clear All</button>
      <button @click="preset(1024**2)" class="btn">Preset: 1 MiB</button>
      <button @click="preset(1_000_000)" class="btn">Preset: 1 MB</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

type System = 'IEC' | 'SI'
type Field = 'bytes' | 'kb' | 'mb' | 'gb' | 'tb'

/* ---------- state ---------- */
const system = ref<System>('IEC')    // IEC: 1024 • SI: 1000
const decimals = ref<number>(2)

const bytesStr = ref('')             // canonical source (parsed to bytesNum)
const kbStr = ref('')
const mbStr = ref('')
const gbStr = ref('')
const tbStr = ref('')

const errors = reactive<Record<Field, string | undefined>>({
  bytes: undefined, kb: undefined, mb: undefined, gb: undefined, tb: undefined
})

const copiedMsg = ref('')

/* ---------- helpers ---------- */
const base = computed(() => (system.value === 'IEC' ? 1024 : 1000))
const labels = computed(() => system.value === 'IEC'
    ? { KB: 'KiB', MB: 'MiB', GB: 'GiB', TB: 'TiB' }
    : { KB: 'KB',  MB: 'MB',  GB: 'GB',  TB: 'TB' }
)

function unitLabel(k: keyof typeof labels.value) { return labels.value[k] }

function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1200)
}

function fmt(n: number, d = decimals.value) {
  if (!Number.isFinite(n)) return '—'
  const s = n.toFixed(d)
  // strip trailing zeros
  return (s.indexOf('.') >= 0) ? s.replace(/\.?0+$/, '') : s
}

function formatInt(n: number) {
  if (!Number.isFinite(n)) return ''
  return Math.round(n).toLocaleString()
}

/**
 * Parse flexible size input:
 * - plain number => interpreted as bytes (in bytes field) or as the unit of the edited field
 * - supports underscores & commas
 * - supports suffixes: b, kb/mb/gb/tb, kib/mib/gib/tib (case-insensitive)
 *   e.g. "1.5 gb", "2MiB", "1_024", "1,024"
 */
function parseFlexible(input: string): { value: number, suffix?: string } {
  const s = input.replace(/_/g, '').replace(/,/g, '').trim()
  if (!s) return { value: NaN }
  const m = s.match(/^([-+]?\d+(\.\d+)?)(?:\s*([a-zA-Z]{1,3}))?$/)
  if (!m) return { value: NaN }
  const num = Number(m[1])
  const suf = m[3]?.toLowerCase()
  return { value: num, suffix: suf }
}

function factorForSuffix(suf?: string): { mult: number, ok: boolean } {
  if (!suf) return { mult: 1, ok: true } // default = bytes
  const b = 1000, i = 1024
  const map: Record<string, number> = {
    b: 1,
    kb: b, mb: b**2, gb: b**3, tb: b**4,
    kib: i, mib: i**2, gib: i**3, tib: i**4
  }
  const mult = map[suf]
  return { mult, ok: Number.isFinite(mult) }
}

/* ---------- core update logic ---------- */
function setSystem(next: System) {
  if (system.value === next) return
  system.value = next
  // Re-derive from current bytes
  updateFrom('bytes', false)
}

function preset(n: number) {
  bytesNum.value = n
  reflectFromBytes()
}

const bytesNum = ref<number>(NaN) // canonical numeric bytes

function updateFrom(field: Field, reparse = true) {
  // clear error
  errors[field] = undefined

  let nBytes = NaN
  const k = base.value

  try {
    if (field === 'bytes') {
      const { value, suffix } = reparse ? parseFlexible(bytesStr.value) : { value: bytesNum.value, suffix: undefined }
      if (!Number.isFinite(value)) throw new Error('Invalid number')
      let v = value
      if (suffix) {
        const { mult, ok } = factorForSuffix(suffix)
        if (!ok) throw new Error(`Unknown unit "${suffix}"`)
        v *= mult
      }
      nBytes = v
    } else {
      // other fields interpret as that unit (no suffix)
      const raw =
          field === 'kb' ? kbStr.value :
              field === 'mb' ? mbStr.value :
                  field === 'gb' ? gbStr.value : tbStr.value
      const v = Number(raw.replace(/_/g, '').replace(/,/g, ''))
      if (!Number.isFinite(v)) throw new Error('Invalid number')
      const power = field === 'kb' ? 1 : field === 'mb' ? 2 : field === 'gb' ? 3 : 4
      nBytes = v * Math.pow(k, power)
    }
  } catch (e: any) {
    errors[field] = e?.message ?? 'Invalid input'
    return
  }

  bytesNum.value = nBytes
  reflectFromBytes()
}

function reflectFromBytes() {
  const k = base.value
  const b = bytesNum.value

  if (!Number.isFinite(b)) {
    kbStr.value = mbStr.value = gbStr.value = tbStr.value = ''
    return
  }
  // bytes field: show as formatted integer (no decimals)
  bytesStr.value = formatInt(b)
  // derived
  kbStr.value = fmt(b / Math.pow(k, 1))
  mbStr.value = fmt(b / Math.pow(k, 2))
  gbStr.value = fmt(b / Math.pow(k, 3))
  tbStr.value = fmt(b / Math.pow(k, 4), Math.max(decimals.value, 4)) // TB often needs more precision
}

/* ---------- humanize ---------- */
const humanized = computed(() => {
  const b = bytesNum.value
  if (!Number.isFinite(b)) return ''
  const k = base.value
  const u = system.value === 'IEC'
      ? ['B','KiB','MiB','GiB','TiB','PiB']
      : ['B','KB','MB','GB','TB','PB']
  if (Math.abs(b) < k) return `${formatInt(b)} B`
  let idx = Math.floor(Math.log(Math.abs(b)) / Math.log(k))
  idx = Math.min(idx, u.length - 1)
  const val = b / Math.pow(k, idx)
  return `${fmt(val)} ${u[idx]}`
})

/* ---------- watchers ---------- */
watch(decimals, () => {
  if (Number.isFinite(bytesNum.value)) reflectFromBytes()
})

/* Initialize */
watch(system, () => {
  // Recompute derived values when toggling system
  if (Number.isFinite(bytesNum.value)) reflectFromBytes()
})
</script>

<style scoped>
.label { @apply block text-sm text-gray-300; }
.note  { @apply text-xs text-gray-400; }
.input { @apply bg-gray-950 text-white border border-gray-700 rounded px-3 py-2 w-full; }
.btn   { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.card  { @apply bg-gray-800/60 rounded-lg border border-gray-700; }
.mono  { @apply font-mono; }
</style>


