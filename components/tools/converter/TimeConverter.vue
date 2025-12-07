<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-2xl font-semibold">⏰ Time Converter</h2>
          <p class="text-sm text-gray-400 mt-1">Convert between timestamps and dates, calculate durations across time zones</p>
        </div>
        <button @click="setAllNow" class="btn-primary">🕐 Set All to Now</button>
      </div>
    </div>

    <!-- Quick Examples -->
    <div class="card">
      <h3 class="text-sm font-medium text-gray-300 mb-3">⏱️ Quick Examples</h3>
      <div class="flex flex-wrap gap-2">
        <button class="btn-example" @click="setExample('now')">Now</button>
        <button class="btn-example" @click="setExample('1hour')">1 Hour Ago</button>
        <button class="btn-example" @click="setExample('1day')">1 Day Ago</button>
        <button class="btn-example" @click="setExample('1week')">1 Week Ago</button>
        <button class="btn-example" @click="setExample('epoch')">Unix Epoch (1970)</button>
        <button class="btn-example" @click="setExample('y2k')">Y2K (2000)</button>
      </div>
    </div>

    <!-- Mode Tabs -->
    <div class="bg-gray-900 rounded-xl p-1 border border-gray-700 inline-flex gap-1">
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        :class="mode === 'ts2date' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-gray-300 hover:text-white hover:bg-gray-800'"
        @click="mode = 'ts2date'"
      >
        Timestamp → Date
      </button>
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        :class="mode === 'date2ts' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-gray-300 hover:text-white hover:bg-gray-800'"
        @click="mode = 'date2ts'"
      >
        Date → Timestamp
      </button>
      <button
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        :class="mode === 'duration' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-gray-300 hover:text-white hover:bg-gray-800'"
        @click="mode = 'duration'"
      >
        Duration Calculator
      </button>
    </div>

    <!-- TS → DATE -->
    <div v-if="mode === 'ts2date'" class="grid md:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div class="space-y-4">
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">UNIX Timestamp</label>
          <input
            type="text"
            v-model.trim="tsInput"
            placeholder="e.g. 1717171717 (s), 1717171717000 (ms)"
            class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm transition-all"
          />
          <div class="flex items-center gap-3 flex-wrap text-xs">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="auto" v-model="unit" class="accent-indigo-500" />
              <span class="text-gray-300">Auto</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="s" v-model="unit" class="accent-indigo-500" />
              <span class="text-gray-300">Seconds</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="ms" v-model="unit" class="accent-indigo-500" />
              <span class="text-gray-300">Milliseconds</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" value="ns" v-model="unit" class="accent-indigo-500" />
              <span class="text-gray-300">Nanoseconds</span>
            </label>
          </div>
          <p v-if="tsError" class="text-red-400 text-xs flex items-center gap-1">
            <span>⚠️</span>
            <span>{{ tsError }}</span>
          </p>
        </div>

        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">Output Time Zone</label>
          <select v-model="outTz" class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all">
            <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
          </select>
        </div>
      </div>

      <!-- Output Section -->
      <div class="space-y-4">
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-2">
          <p class="text-sm font-medium text-gray-300">UTC</p>
          <p class="font-mono text-green-400">{{ out.utc }}</p>
        </div>
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-2">
          <p class="text-sm font-medium text-gray-300">Selected TZ ({{ outTz }})</p>
          <p class="font-mono text-green-400">{{ out.selected }}</p>
        </div>
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-2">
          <p class="text-sm font-medium text-gray-300">Local ({{ localTz }})</p>
          <p class="font-mono text-green-400">{{ out.local }}</p>
        </div>
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 space-y-2">
              <p class="text-sm font-medium text-gray-300">ISO 8601 (UTC)</p>
              <p class="font-mono text-green-400 break-all text-sm">{{ out.iso }}</p>
              <p v-if="out.human" class="text-xs text-indigo-400">{{ out.human }}</p>
            </div>
            <button
              @click="copyField(out.iso, 'ts-iso')"
              class="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all"
              :disabled="!out.iso || out.iso === '—'"
            >
              {{ copiedField === 'ts-iso' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DATE → TS -->
    <div v-else-if="mode === 'date2ts'" class="grid md:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div class="space-y-4">
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">Date & Time</label>
          <input
            type="datetime-local"
            step="1"
            v-model="dateInput"
            class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm transition-all"
          />
          <p class="text-xs text-gray-400">Format: YYYY-MM-DD HH:mm:ss</p>
          <p v-if="dateError" class="text-red-400 text-xs flex items-center gap-1">
            <span>⚠️</span>
            <span>{{ dateError }}</span>
          </p>
        </div>

        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">Input Time Zone</label>
          <select v-model="inTz" class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all">
            <option v-for="tz in timeZones" :key="tz" :value="tz">{{ tz }}</option>
          </select>
        </div>
      </div>

      <!-- Output Section -->
      <div class="space-y-4">
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
          <div class="flex items-center justify-between gap-3">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-300">UNIX (seconds)</p>
              <p class="font-mono text-green-400">{{ result.seconds }}</p>
            </div>
            <button
              @click="copyField(String(result.seconds), 'date-sec')"
              class="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all"
              :disabled="result.seconds === '—'"
            >
              {{ copiedField === 'date-sec' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>

        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
          <div class="flex items-center justify-between gap-3">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-300">UNIX (milliseconds)</p>
              <p class="font-mono text-green-400">{{ result.millis }}</p>
            </div>
            <button
              @click="copyField(String(result.millis), 'date-ms')"
              class="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all"
              :disabled="result.millis === '—'"
            >
              {{ copiedField === 'date-ms' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>

        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-2">
          <p class="text-sm font-medium text-gray-300">As UTC ISO</p>
          <p class="font-mono text-green-400 break-all text-sm">{{ result.iso }}</p>
          <p v-if="result.human" class="text-xs text-indigo-400">{{ result.human }}</p>
        </div>
      </div>
    </div>

    <!-- DURATION CALCULATOR -->
    <div v-else-if="mode === 'duration'" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Start Date/Time -->
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">Start Date & Time</label>
          <input
            type="datetime-local"
            step="1"
            v-model="durationStart"
            class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm transition-all"
          />
          <button @click="setDurationStartNow" class="text-xs text-indigo-400 hover:text-indigo-300">Set to now</button>
        </div>

        <!-- End Date/Time -->
        <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
          <label class="text-sm font-medium text-gray-300">End Date & Time</label>
          <input
            type="datetime-local"
            step="1"
            v-model="durationEnd"
            class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm transition-all"
          />
          <button @click="setDurationEndNow" class="text-xs text-indigo-400 hover:text-indigo-300">Set to now</button>
        </div>
      </div>

      <!-- Duration Results -->
      <div v-if="duration.valid" class="bg-gray-900 rounded-xl p-6 border border-gray-700 space-y-4">
        <h3 class="text-sm font-medium text-gray-300 mb-3">📊 Duration</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="text-center">
            <p class="text-2xl font-bold text-indigo-400">{{ duration.days }}</p>
            <p class="text-xs text-gray-400 mt-1">Days</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-indigo-400">{{ duration.hours }}</p>
            <p class="text-xs text-gray-400 mt-1">Hours</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-indigo-400">{{ duration.minutes }}</p>
            <p class="text-xs text-gray-400 mt-1">Minutes</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-indigo-400">{{ duration.seconds }}</p>
            <p class="text-xs text-gray-400 mt-1">Seconds</p>
          </div>
        </div>
        <div class="pt-4 border-t border-gray-700 space-y-2">
          <p class="text-sm text-gray-300">
            <span class="font-medium text-white">Human-readable:</span>
            <span class="text-indigo-400 ml-2">{{ duration.human }}</span>
          </p>
          <p class="text-sm text-gray-300">
            <span class="font-medium text-white">Total milliseconds:</span>
            <span class="text-green-400 ml-2 font-mono">{{ duration.totalMs.toLocaleString() }}</span>
          </p>
          <p class="text-sm text-gray-300">
            <span class="font-medium text-white">Total seconds:</span>
            <span class="text-green-400 ml-2 font-mono">{{ Math.floor(duration.totalMs / 1000).toLocaleString() }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

/* ----------------- State ----------------- */
type Mode = 'ts2date' | 'date2ts' | 'duration'
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
const copiedField = ref<string>('')

/* ----------------- Duration Calculator State ----------------- */
const durationStart = ref<string>('')
const durationEnd = ref<string>('')

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
    return { utc: '—', selected: '—', local: '—', iso: '—', human: '' }
  }
  const ms = tsMs.value
  return {
    utc: formatInTZ(ms, 'UTC'),
    selected: formatInTZ(ms, outTz.value),
    local: formatInTZ(ms, localTz),
    iso: new Date(ms).toISOString(),
    human: humanReadableFromNow(ms)
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
  if (!parts) { dateError.value = 'Invalid datetime format'; return { seconds: '—', millis: '—', iso: '—', human: '' } }
  try {
    const ms = wallTimeToEpochMs(parts, inTz.value)
    return {
      seconds: Math.floor(ms / 1000),
      millis: ms,
      iso: new Date(ms).toISOString(),
      human: humanReadableFromNow(ms)
    }
  } catch (e: any) {
    dateError.value = e?.message ?? 'Conversion error'
    return { seconds: '—', millis: '—', iso: '—', human: '' }
  }
})

/* ----------------- Duration Calculator ----------------- */
const duration = computed(() => {
  if (!durationStart.value || !durationEnd.value) {
    return { valid: false, days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, human: '' }
  }

  const startParts = parseDateTimeLocal(durationStart.value)
  const endParts = parseDateTimeLocal(durationEnd.value)

  if (!startParts || !endParts) {
    return { valid: false, days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, human: '' }
  }

  try {
    const startMs = new Date(
      startParts.year, startParts.month - 1, startParts.day,
      startParts.hour, startParts.minute, startParts.second
    ).getTime()
    const endMs = new Date(
      endParts.year, endParts.month - 1, endParts.day,
      endParts.hour, endParts.minute, endParts.second
    ).getTime()

    const diffMs = Math.abs(endMs - startMs)
    const totalSeconds = Math.floor(diffMs / 1000)
    const totalMinutes = Math.floor(totalSeconds / 60)
    const totalHours = Math.floor(totalMinutes / 60)
    const totalDays = Math.floor(totalHours / 24)

    const days = totalDays
    const hours = totalHours % 24
    const minutes = totalMinutes % 60
    const seconds = totalSeconds % 60

    return {
      valid: true,
      days,
      hours,
      minutes,
      seconds,
      totalMs: diffMs,
      human: humanReadableDuration(diffMs)
    }
  } catch {
    return { valid: false, days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, human: '' }
  }
})

/* ----------------- Helpers ----------------- */
function copyField(text: string, field: string) {
  if (!text || text === '—') return
  navigator.clipboard.writeText(text)
  copiedField.value = field
  setTimeout(() => {
    copiedField.value = ''
  }, 1500)
}

function setAllNow() {
  setNowTs()
  setNowDate()
  setDurationEndNow()
  const now = new Date()
  now.setHours(now.getHours() - 1)
  const pad = (n: number) => String(n).padStart(2, '0')
  durationStart.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

function setExample(example: string) {
  mode.value = 'ts2date'
  const now = Date.now()
  switch (example) {
    case 'now':
      tsInput.value = String(now)
      unit.value = 'ms'
      break
    case '1hour':
      tsInput.value = String(now - 3600000)
      unit.value = 'ms'
      break
    case '1day':
      tsInput.value = String(now - 86400000)
      unit.value = 'ms'
      break
    case '1week':
      tsInput.value = String(now - 604800000)
      unit.value = 'ms'
      break
    case 'epoch':
      tsInput.value = '0'
      unit.value = 's'
      break
    case 'y2k':
      tsInput.value = '946684800'
      unit.value = 's'
      break
  }
}

function setDurationStartNow() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  durationStart.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

function setDurationEndNow() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  durationEnd.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
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

function humanReadableFromNow(ms: number): string {
  const now = Date.now()
  const diff = ms - now
  const abs = Math.abs(diff)

  const seconds = Math.floor(abs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  let result = ''
  if (years > 0) {
    result = `${years} year${years > 1 ? 's' : ''}`
    const remainingMonths = months % 12
    if (remainingMonths > 0) result += `, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
  } else if (months > 0) {
    result = `${months} month${months > 1 ? 's' : ''}`
    const remainingDays = days % 30
    if (remainingDays > 0) result += `, ${remainingDays} day${remainingDays > 1 ? 's' : ''}`
  } else if (days > 0) {
    result = `${days} day${days > 1 ? 's' : ''}`
    const remainingHours = hours % 24
    if (remainingHours > 0) result += `, ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`
  } else if (hours > 0) {
    result = `${hours} hour${hours > 1 ? 's' : ''}`
    const remainingMinutes = minutes % 60
    if (remainingMinutes > 0) result += `, ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`
  } else if (minutes > 0) {
    result = `${minutes} minute${minutes > 1 ? 's' : ''}`
    const remainingSeconds = seconds % 60
    if (remainingSeconds > 0) result += `, ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`
  } else {
    result = `${seconds} second${seconds !== 1 ? 's' : ''}`
  }

  return diff >= 0 ? `in ${result}` : `${result} ago`
}

function humanReadableDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  const parts: string[] = []

  if (years > 0) {
    parts.push(`${years} year${years > 1 ? 's' : ''}`)
    const remainingMonths = months % 12
    if (remainingMonths > 0) parts.push(`${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`)
  } else if (months > 0) {
    parts.push(`${months} month${months > 1 ? 's' : ''}`)
    const remainingDays = days % 30
    if (remainingDays > 0) parts.push(`${remainingDays} day${remainingDays > 1 ? 's' : ''}`)
  } else if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`)
    const remainingHours = hours % 24
    if (remainingHours > 0) parts.push(`${remainingHours} hour${remainingHours > 1 ? 's' : ''}`)
  } else if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
    const remainingMinutes = minutes % 60
    if (remainingMinutes > 0) parts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`)
  } else if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
    const remainingSeconds = seconds % 60
    if (remainingSeconds > 0) parts.push(`${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`)
  } else {
    parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`)
  }

  return parts.join(', ')
}

onMounted(() => {
  // prefill convenience
  setNowTs()
  setNowDate()
  setDurationEndNow()
  // Set duration start to 1 hour ago
  const now = new Date()
  now.setHours(now.getHours() - 1)
  const pad = (n: number) => String(n).padStart(2, '0')
  durationStart.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
})
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block mb-2;
}

.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}

.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-example {
  @apply px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white;
  @apply transition-all;
}

.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}

.output-box {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
</style>
