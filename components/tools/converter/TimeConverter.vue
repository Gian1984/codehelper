<template>
  <div class="p-6 sm:p-8 bg-gray-800 rounded-xl shadow space-y-6 text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Time Converter</h2>
      <span v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</span>
    </div>

    <!-- Mode switch -->
    <div class="flex gap-2">
      <button
          class="px-3 py-1.5 rounded text-white"
          :class="mode === 'ts2date' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
          @click="mode = 'ts2date'"
      >Timestamp → Date</button>
      <button
          class="px-3 py-1.5 rounded text-white"
          :class="mode === 'date2ts' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
          @click="mode = 'date2ts'"
      >Date → Timestamp</button>
    </div>

    <!-- TS → DATE -->
    <div v-if="mode === 'ts2date'" class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label class="label">UNIX Timestamp</label>
          <input
              type="text"
              v-model.trim="tsInput"
              placeholder="e.g. 1717171717 (s), 1717171717000 (ms), 1717171717000000000 (ns)"
              class="input"
          />
          <div class="flex items-center gap-4 mt-2 text-sm text-gray-300 flex-wrap">
            <label class="flex items-center gap-2"><input type="radio" value="auto" v-model="unit" /> Auto</label>
            <label class="flex items-center gap-2"><input type="radio" value="s" v-model="unit" /> Seconds</label>
            <label class="flex items-center gap-2"><input type="radio" value="ms" v-model="unit" /> Milliseconds</label>
            <label class="flex items-center gap-2"><input type="radio" value="ns" v-model="unit" /> Nanoseconds</label>
            <button class="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white" @click="setNowTs">
              Use now
            </button>
          </div>
          <p v-if="tsError" class="text-red-400 text-xs mt-2">{{ tsError }}</p>
        </div>

        <div>
          <label class="label">Output Time Zone</label>
          <select v-model="outTz" class="input">
            <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
          </select>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card">
          <p class="label mb-1">UTC</p>
          <p class="mono">{{ out.utc }}</p>
        </div>
        <div class="card">
          <p class="label mb-1">Selected TZ ({{ outTz }})</p>
          <p class="mono">{{ out.selected }}</p>
        </div>
        <div class="card">
          <p class="label mb-1">Local ({{ localTz }})</p>
          <p class="mono">{{ out.local }}</p>
        </div>
        <div class="card flex items-center justify-between gap-3">
          <div>
            <p class="label mb-1">ISO 8601 (UTC)</p>
            <p class="mono break-all">{{ out.iso }}</p>
            <p v-if="out.rel" class="text-xs text-gray-400 mt-1">{{ out.rel }}</p>
          </div>
          <button @click="copy(out.iso)" class="btn-primary">Copy</button>
        </div>
      </div>
    </div>

    <!-- DATE → TS -->
    <div v-else class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label class="label">Date &amp; Time</label>
          <input
              type="datetime-local"
              step="1"
              v-model="dateInput"
              class="input"
          />
          <div class="flex items-center gap-3 mt-2">
            <button class="btn" @click="setNowDate">Use now</button>
            <span class="note">Format: YYYY-MM-DDTHH:mm:ss</span>
          </div>
          <p v-if="dateError" class="text-red-400 text-xs mt-2">{{ dateError }}</p>
        </div>

        <div>
          <label class="label">Input Time Zone</label>
          <select v-model="inTz" class="input">
            <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
          </select>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card flex items-center justify-between">
          <div>
            <p class="label mb-1">UNIX (seconds)</p>
            <p class="mono">{{ result.seconds }}</p>
          </div>
          <button @click="copy(String(result.seconds))" class="btn-primary">Copy</button>
        </div>

        <div class="card flex items-center justify-between">
          <div>
            <p class="label mb-1">UNIX (milliseconds)</p>
            <p class="mono">{{ result.millis }}</p>
          </div>
          <button @click="copy(String(result.millis))" class="btn-primary">Copy</button>
        </div>

        <div class="card">
          <p class="label mb-1">As UTC ISO</p>
          <p class="mono break-all">{{ result.iso }}</p>
          <p v-if="result.rel" class="text-xs text-gray-400 mt-1">{{ result.rel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

/* ----------------- State ----------------- */
type Mode = 'ts2date' | 'date2ts'
const mode = ref<Mode>('ts2date')

const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
const timeZones = ref<string[]>(
    (Intl as any).supportedValuesOf?.('timeZone') ??
    ['UTC','Europe/Brussels','Europe/Rome','Europe/Paris','Europe/London',
      'America/New_York','America/Chicago','America/Denver','America/Los_Angeles',
      'Asia/Tokyo','Asia/Shanghai','Asia/Kolkata','Australia/Sydney']
)

const inTz = ref<string>(localTz)
const outTz = ref<string>(localTz)
const copiedMsg = ref('')

/* ----------------- Timestamp → Date ----------------- */
const tsInput = ref<string>('')
const unit = ref<'auto'|'s'|'ms'|'ns'>('auto')
const tsError = ref('')

function setNowTs() {
  tsInput.value = String(Date.now())
  unit.value = 'ms'
}

const tsMs = computed<number | null>(() => {
  tsError.value = ''
  const raw = tsInput.value.trim()
  if (!raw) return null
  if (!/^-?\d+(\.\d+)?$/.test(raw)) { tsError.value = 'Invalid number'; return null }
  let n = Number(raw)

  if (unit.value === 'auto') {
    // Decide by magnitude / digits
    const abs = Math.abs(n)
    const digits = raw.replace('-', '').split('.')[0].length
    if (digits >= 18 || abs >= 1e15) { // ns
      n = Math.round(n / 1e6)
    } else if (digits >= 13 || abs >= 1e12) { // ms
      // already ms
    } else { // seconds
      n *= 1000
    }
  } else if (unit.value === 's') {
    n *= 1000
  } else if (unit.value === 'ns') {
    n = Math.round(n / 1e6)
  } // ms -> as is

  if (!Number.isFinite(n)) { tsError.value = 'Number overflow'; return null }
  return Math.round(n)
})

const out = computed(() => {
  if (tsMs.value == null) {
    return { utc: '—', selected: '—', local: '—', iso: '—', rel: '' }
  }
  const ms = tsMs.value
  return {
    utc: formatInTZ(ms, 'UTC'),
    selected: formatInTZ(ms, outTz.value),
    local: formatInTZ(ms, localTz),
    iso: new Date(ms).toISOString(),
    rel: relativeFromNow(ms)
  }
})

/* ----------------- Date → Timestamp ----------------- */
const dateInput = ref<string>('') // "YYYY-MM-DDTHH:mm[:ss]"
const dateError = ref('')

function setNowDate() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  dateInput.value =
      `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}` +
      `T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

const result = computed(() => {
  dateError.value = ''
  const parts = parseDateTimeLocal(dateInput.value)
  if (!parts) { dateError.value = 'Invalid datetime format'; return { seconds: '—', millis: '—', iso: '—', rel: '' } }
  try {
    const ms = wallTimeToEpochMs(parts, inTz.value)
    return {
      seconds: Math.floor(ms / 1000),
      millis: ms,
      iso: new Date(ms).toISOString(),
      rel: relativeFromNow(ms)
    }
  } catch (e: any) {
    dateError.value = e?.message ?? 'Conversion error'
    return { seconds: '—', millis: '—', iso: '—', rel: '' }
  }
})

/* ----------------- Helpers ----------------- */
function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1500)
}

function formatInTZ(ms: number, timeZone: string) {
  const dtf = new Intl.DateTimeFormat('en-GB', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  })
  const p = partsToObj(dtf.formatToParts(new Date(ms)))
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`
}
function partsToObj(parts: Intl.DateTimeFormatPart[]) {
  const o: Record<string, string> = {}
  for (const part of parts) if (part.type !== 'literal') o[part.type] = part.value
  return o as { [k in 'year'|'month'|'day'|'hour'|'minute'|'second']: string }
}

function parseDateTimeLocal(v: string) {
  if (!v) return null
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/)
  if (!m) return null
  const [_, Y, M, D, h, mnt, s] = m
  return { year: +Y, month: +M, day: +D, hour: +h, minute: +mnt, second: +(s ?? '0') }
}

/** Robust wall-clock → epoch conversion for an IANA time zone (DST-safe, no libs). */
function wallTimeToEpochMs(
    d: { year: number; month: number; day: number; hour: number; minute: number; second: number },
    timeZone: string
): number {
  let t = Date.UTC(d.year, d.month - 1, d.day, d.hour, d.minute, d.second) // initial guess
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  })
  const toUTC = (Y: number, M: number, D: number, h: number, m: number, s: number) => Date.UTC(Y, M - 1, D, h, m, s)
  for (let i = 0; i < 5; i++) {
    const p = partsToObj(dtf.formatToParts(new Date(t))) as any
    const zonedUTC = toUTC(+p.year, +p.month, +p.day, +p.hour, +p.minute, +p.second)
    const desiredUTC = toUTC(d.year, d.month, d.day, d.hour, d.minute, d.second)
    const diff = desiredUTC - zonedUTC
    if (diff === 0) break
    t += diff
  }
  return t
}

function relativeFromNow(ms: number) {
  const now = Date.now()
  const diff = ms - now
  const abs = Math.abs(diff)
  const sec = Math.round(abs / 1000)
  const min = Math.round(sec / 60)
  const hr = Math.round(min / 60)
  const day = Math.round(hr / 24)
  let s =
      abs < 60_000 ? `${sec}s` :
          abs < 3_600_000 ? `${min}m` :
              abs < 86_400_000 ? `${hr}h` : `${day}d`
  return diff >= 0 ? `in ${s}` : `${s} ago`
}

onMounted(() => {
  // prefill convenience
  setNowTs()
  setNowDate()
})
</script>

<style scoped>
.label { @apply block text-sm text-gray-300 mb-1; }
.note { @apply text-xs text-gray-400; }
.input { @apply bg-gray-950 text-white border border-gray-700 rounded px-3 py-2 w-full; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-lg p-4 border border-gray-700; }
.mono { @apply font-mono text-green-300; }
</style>
