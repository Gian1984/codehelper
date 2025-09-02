<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Time Converter</h2>

    <!-- Mode switch -->
    <div class="flex gap-2">
      <button
          class="px-3 py-1 rounded text-white"
          :class="mode === 'ts2date' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'"
          @click="mode = 'ts2date'"
      >
        Timestamp → Date
      </button>
      <button
          class="px-3 py-1 rounded text-white"
          :class="mode === 'date2ts' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'"
          @click="mode = 'date2ts'"
      >
        Date → Timestamp
      </button>
    </div>

    <!-- TS -> DATE -->
    <div v-if="mode === 'ts2date'" class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label class="block text-white text-sm mb-1">UNIX Timestamp</label>
          <input
              type="text"
              v-model.trim="tsInput"
              placeholder="e.g. 1717171717 or 1717171717000"
              class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full"
          />
          <div class="flex items-center gap-4 mt-2 text-sm text-gray-300">
            <label class="flex items-center gap-2">
              <input type="radio" value="auto" v-model="unit" /> Auto
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="s" v-model="unit" /> Seconds
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="ms" v-model="unit" /> Milliseconds
            </label>
            <button class="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white"
                    @click="setNowTs">
              Use now
            </button>
          </div>
        </div>

        <div>
          <label class="block text-white text-sm mb-1">Output Time Zone</label>
          <select v-model="outTz"
                  class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full">
            <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
          </select>
        </div>
      </div>

      <div class="space-y-4">
        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <p class="text-gray-300 text-sm mb-1">UTC</p>
          <p class="text-white font-mono">{{ out.utc }}</p>
        </div>
        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <p class="text-gray-300 text-sm mb-1">Selected TZ ({{ outTz }})</p>
          <p class="text-white font-mono">{{ out.selected }}</p>
        </div>
        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <p class="text-gray-300 text-sm mb-1">Local ({{ localTz }})</p>
          <p class="text-white font-mono">{{ out.local }}</p>
        </div>
        <div class="bg-gray-900 rounded border border-gray-700 p-4 flex items-center justify-between">
          <div>
            <p class="text-gray-300 text-sm mb-1">ISO 8601 (UTC)</p>
            <p class="text-white font-mono break-all">{{ out.iso }}</p>
          </div>
          <button @click="copy(out.iso)" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">
            Copy
          </button>
        </div>
      </div>
    </div>

    <!-- DATE -> TS -->
    <div v-else class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label class="block text-white text-sm mb-1">Date &amp; Time</label>
          <input
              type="datetime-local"
              step="1"
              v-model="dateInput"
              class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full"
          />
          <div class="flex items-center gap-3 mt-2">
            <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white" @click="setNowDate">
              Use now
            </button>
            <span class="text-xs text-gray-400">Format: YYYY-MM-DDTHH:mm:ss</span>
          </div>
        </div>

        <div>
          <label class="block text-white text-sm mb-1">Input Time Zone</label>
          <select v-model="inTz"
                  class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full">
            <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
          </select>
        </div>
      </div>

      <div class="space-y-4">
        <div class="bg-gray-900 rounded border border-gray-700 p-4 flex items-center justify-between">
          <div>
            <p class="text-gray-300 text-sm mb-1">UNIX (seconds)</p>
            <p class="text-white font-mono">{{ result.seconds }}</p>
          </div>
          <button @click="copy(String(result.seconds))" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">
            Copy
          </button>
        </div>

        <div class="bg-gray-900 rounded border border-gray-700 p-4 flex items-center justify-between">
          <div>
            <p class="text-gray-300 text-sm mb-1">UNIX (milliseconds)</p>
            <p class="text-white font-mono">{{ result.millis }}</p>
          </div>
          <button @click="copy(String(result.millis))" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">
            Copy
          </button>
        </div>

        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <p class="text-gray-300 text-sm mb-1">As UTC ISO</p>
          <p class="text-white font-mono break-all">{{ result.iso }}</p>
        </div>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

type Mode = 'ts2date' | 'date2ts'
const mode = ref<Mode>('ts2date')

const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
const timeZones = ref<string[]>(
    // Modern browsers
    (Intl as any).supportedValuesOf?.('timeZone') ??
    // Fallback shortlist
    ['UTC', 'Europe/Brussels', 'Europe/Rome', 'Europe/Paris', 'Europe/London',
      'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
      'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney']
)

const inTz = ref<string>(localTz)
const outTz = ref<string>(localTz)

const copiedMsg = ref('')

// ---------- TS → DATE ----------
const tsInput = ref<string>('')                 // raw input
const unit = ref<'auto' | 's' | 'ms'>('auto')   // how to interpret input

function setNowTs() {
  tsInput.value = String(Date.now())
  unit.value = 'ms'
}

const tsMs = computed<number | null>(() => {
  const raw = tsInput.value.trim()
  if (!raw) return null
  if (!/^-?\d+(\.\d+)?$/.test(raw)) return null
  let n = Number(raw)
  if (unit.value === 'auto') {
    // decide by magnitude (<= 1e10 -> seconds)
    if (Math.abs(n) < 1e12) n *= 1000
  } else if (unit.value === 's') {
    n *= 1000
  }
  return Math.round(n)
})

const out = computed(() => {
  if (tsMs.value == null) {
    return { utc: '—', selected: '—', local: '—', iso: '—' }
  }
  const ms = tsMs.value
  return {
    utc: formatInTZ(ms, 'UTC'),
    selected: formatInTZ(ms, outTz.value),
    local: formatInTZ(ms, localTz),
    iso: new Date(ms).toISOString()
  }
})

// ---------- DATE → TS ----------
const dateInput = ref<string>('') // "YYYY-MM-DDTHH:mm[:ss]"

function setNowDate() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const s = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`+
      `T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  dateInput.value = s
}

const result = computed(() => {
  const parts = parseDateTimeLocal(dateInput.value)
  if (!parts) return { seconds: '—', millis: '—', iso: '—' }
  const ms = wallTimeToEpochMs(parts, inTz.value)
  return {
    seconds: Math.floor(ms / 1000),
    millis: ms,
    iso: new Date(ms).toISOString()
  }
})

// ---------- helpers ----------
function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied to clipboard!'
  setTimeout(() => (copiedMsg.value = ''), 2000)
}

function formatInTZ(ms: number, timeZone: string) {
  const dtf = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  const p = partsToObj(dtf.formatToParts(new Date(ms)))
  // build "YYYY-MM-DD HH:mm:ss"
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`
}

function partsToObj(parts: Intl.DateTimeFormatPart[]) {
  const o: Record<string, string> = {}
  for (const part of parts) {
    if (part.type !== 'literal') o[part.type] = part.value
  }
  return o as { [k in 'year'|'month'|'day'|'hour'|'minute'|'second']: string }
}

function parseDateTimeLocal(v: string) {
  // Accepts "YYYY-MM-DDTHH:mm" or "...:ss"
  if (!v) return null
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/)
  if (!m) return null
  const [_, Y, M, D, h, mnt, s] = m
  return {
    year: +Y,
    month: +M,
    day: +D,
    hour: +h,
    minute: +mnt,
    second: +(s ?? '0')
  }
}

/**
 * Compute UTC epoch ms for the given "wall clock" components in a specific IANA time zone.
 * This iteratively adjusts a UTC guess until formatting in 'timeZone' matches the desired local time.
 * Works across DST transitions without external libraries.
 */
function wallTimeToEpochMs(
    d: { year: number; month: number; day: number; hour: number; minute: number; second: number },
    timeZone: string
): number {
  // initial guess: treat given components as UTC
  let t = Date.UTC(d.year, d.month - 1, d.day, d.hour, d.minute, d.second)
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  })
  const toUTC = (Y: number, M: number, D: number, h: number, m: number, s: number) =>
      Date.UTC(Y, M - 1, D, h, m, s)

  // Usually converges in ≤2 iterations (offset steps are ≥ 15 min)
  for (let i = 0; i < 4; i++) {
    const p = partsToObj(dtf.formatToParts(new Date(t))) as any
    const zonedUTC = toUTC(+p.year, +p.month, +p.day, +p.hour, +p.minute, +p.second)
    const desiredUTC = toUTC(d.year, d.month, d.day, d.hour, d.minute, d.second)
    const diff = desiredUTC - zonedUTC
    if (diff === 0) break
    t += diff
  }
  return t
}

onMounted(() => {
  // Default both fields to "now" for convenience
  setNowTs()
  setNowDate()
})
</script>

<style scoped>
/* uses Tailwind utility classes */
</style>
