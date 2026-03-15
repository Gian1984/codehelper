<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">⏱️ Cron Expression Parser</h2>
        <p class="text-sm text-gray-400 mt-1">Parse cron expressions into human-readable descriptions with next run times</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="parse" title="Parse expression">
          ⚡ Parse
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <label class="label">📝 Cron Expression</label>
      <input
          v-model="input"
          placeholder="*/5 * * * *"
          class="input font-mono text-lg"
          spellcheck="false"
          @keyup.enter="parse"
      />
      <div class="flex items-center justify-between text-xs">
        <span class="text-gray-500">Format: minute hour day-of-month month day-of-week</span>
        <div class="flex gap-4">
          <span v-if="error" class="warn">❌ {{ error }}</span>
          <span v-if="copied" class="text-green-400 font-medium">✅ Copied!</span>
        </div>
      </div>
    </div>

    <!-- Quick Examples -->
    <div class="card">
      <label class="label mb-3">🔖 Quick Examples</label>
      <div class="flex flex-wrap gap-2">
        <button v-for="ex in examples" :key="ex.cron" class="btn text-xs font-mono" @click="loadExample(ex.cron)">
          {{ ex.cron }} <span class="text-gray-400 ml-1 font-sans">{{ ex.label }}</span>
        </button>
      </div>
    </div>

    <!-- Field Breakdown -->
    <div v-if="fields" class="card">
      <label class="label mb-3">🧩 Field Breakdown</label>
      <div class="grid grid-cols-5 gap-2">
        <div v-for="f in fields" :key="f.name" class="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
          <div class="text-indigo-400 font-mono text-lg font-bold">{{ f.value }}</div>
          <div class="text-xs text-gray-400 mt-1">{{ f.name }}</div>
          <div class="text-xs text-gray-300 mt-1">{{ f.description }}</div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div v-if="description" class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">💬 Human-Readable Description</label>
        <button class="btn" @click="copyDescription">📋 Copy</button>
      </div>
      <div class="mono-box text-base">{{ description }}</div>
    </div>

    <!-- Next Runs -->
    <div v-if="nextRuns.length > 0" class="card">
      <label class="label mb-3">🕐 Next 10 Execution Times</label>
      <div class="space-y-1">
        <div v-for="(run, i) in nextRuns" :key="i" class="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-gray-800 border border-gray-700 text-sm font-mono">
          <span class="text-indigo-400 w-6 text-right">{{ i + 1 }}.</span>
          <span class="text-green-300">{{ run }}</span>
        </div>
      </div>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const error = ref('')
const copied = ref(false)
const description = ref('')
const fields = ref<{ name: string; value: string; description: string }[] | null>(null)
const nextRuns = ref<string[]>([])

const examples = [
  { cron: '* * * * *', label: 'Every minute' },
  { cron: '*/5 * * * *', label: 'Every 5 min' },
  { cron: '*/15 * * * *', label: 'Every 15 min' },
  { cron: '0 * * * *', label: 'Every hour' },
  { cron: '0 0 * * *', label: 'Daily midnight' },
  { cron: '0 9 * * 1-5', label: 'Weekdays 9am' },
  { cron: '0 0 1 * *', label: 'Monthly 1st' },
  { cron: '0 0 * * 0', label: 'Weekly Sunday' },
  { cron: '30 2 * * *', label: 'Daily 2:30am' },
  { cron: '0 0 1 1 *', label: 'Yearly Jan 1' },
]

const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function clearAll() {
  input.value = ''
  error.value = ''
  description.value = ''
  fields.value = null
  nextRuns.value = []
  copied.value = false
}

function loadExample(cron: string) {
  input.value = cron
  parse()
}

async function copyDescription() {
  if (!description.value) return
  await navigator.clipboard.writeText(description.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function parse() {
  error.value = ''
  description.value = ''
  fields.value = null
  nextRuns.value = []
  copied.value = false

  const raw = input.value.trim()
  if (!raw) return

  const parts = raw.split(/\s+/)
  if (parts.length !== 5) {
    error.value = 'Expected 5 fields: minute hour day-of-month month day-of-week'
    return
  }

  const [min, hour, dom, mon, dow] = parts
  const fieldNames = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week']
  const ranges = [
    { min: 0, max: 59 },
    { min: 0, max: 23 },
    { min: 1, max: 31 },
    { min: 1, max: 12 },
    { min: 0, max: 7 },
  ]

  for (let i = 0; i < 5; i++) {
    if (!validateField(parts[i], ranges[i].min, ranges[i].max)) {
      error.value = `Invalid ${fieldNames[i]} field: "${parts[i]}"`
      return
    }
  }

  fields.value = [
    { name: 'Minute', value: min, description: describeField(min, 'minute') },
    { name: 'Hour', value: hour, description: describeField(hour, 'hour') },
    { name: 'Day of Month', value: dom, description: describeField(dom, 'day') },
    { name: 'Month', value: mon, description: describeField(mon, 'month') },
    { name: 'Day of Week', value: dow, description: describeField(dow, 'weekday') },
  ]

  description.value = buildDescription(min, hour, dom, mon, dow)
  nextRuns.value = computeNextRuns(parts, 10)
}

function validateField(field: string, minVal: number, maxVal: number): boolean {
  if (field === '*') return true
  const subFields = field.split(',')
  for (const sub of subFields) {
    if (sub.includes('/')) {
      const [base, step] = sub.split('/')
      if (!step || isNaN(Number(step)) || Number(step) < 1) return false
      if (base !== '*' && !validateRange(base, minVal, maxVal)) return false
    } else if (sub.includes('-')) {
      if (!validateRange(sub, minVal, maxVal)) return false
    } else {
      const n = Number(sub)
      if (isNaN(n) || n < minVal || n > maxVal) return false
    }
  }
  return true
}

function validateRange(r: string, minVal: number, maxVal: number): boolean {
  const [a, b] = r.split('-').map(Number)
  if (isNaN(a) || a < minVal || a > maxVal) return false
  if (b !== undefined) {
    if (isNaN(b) || b < minVal || b > maxVal) return false
  }
  return true
}

function describeField(field: string, type: string): string {
  if (field === '*') return `Every ${type}`
  if (field.includes('/')) {
    const [base, step] = field.split('/')
    if (base === '*') return `Every ${step} ${type}s`
    return `Every ${step} from ${base}`
  }
  if (field.includes(',')) return `At ${field}`
  if (field.includes('-')) return `From ${field.split('-')[0]} to ${field.split('-')[1]}`
  if (type === 'month' && !isNaN(Number(field))) return MONTHS[Number(field)] || field
  if (type === 'weekday' && !isNaN(Number(field))) return DAYS[Number(field) % 7] || field
  return `At ${field}`
}

function buildDescription(min: string, hour: string, dom: string, mon: string, dow: string): string {
  const parts: string[] = []

  if (min === '*' && hour === '*' && dom === '*' && mon === '*' && dow === '*') return 'Every minute'

  if (min.includes('/')) {
    const step = min.split('/')[1]
    parts.push(`Every ${step} minute${step === '1' ? '' : 's'}`)
  } else if (min === '*') {
    parts.push('Every minute')
  } else {
    parts.push(`At minute ${min}`)
  }

  if (hour.includes('/')) {
    const step = hour.split('/')[1]
    parts.push(`of every ${step} hour${step === '1' ? '' : 's'}`)
  } else if (hour !== '*') {
    const hours = hour.split(',').map(h => {
      const n = parseInt(h)
      return `${n.toString().padStart(2, '0')}:00`
    })
    parts.push(`past hour ${hours.join(', ')}`)
  }

  if (dom !== '*') {
    parts.push(`on day ${dom} of the month`)
  }

  if (mon !== '*') {
    const months = mon.split(',').map(m => MONTHS[Number(m)] || m)
    parts.push(`in ${months.join(', ')}`)
  }

  if (dow !== '*') {
    const days = expandField(dow, 0, 7).map(d => DAYS[d % 7])
    parts.push(`on ${[...new Set(days)].join(', ')}`)
  }

  return parts.join(' ')
}

function expandField(field: string, min: number, max: number): number[] {
  const result = new Set<number>()
  for (const part of field.split(',')) {
    if (part.includes('/')) {
      const [base, step] = part.split('/')
      const stepN = parseInt(step)
      let start = min
      let end = max
      if (base !== '*') {
        if (base.includes('-')) {
          const [a, b] = base.split('-').map(Number)
          start = a
          end = b
        } else {
          start = parseInt(base)
        }
      }
      for (let i = start; i <= end; i += stepN) result.add(i)
    } else if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number)
      for (let i = a; i <= b; i++) result.add(i)
    } else if (part === '*') {
      for (let i = min; i <= max; i++) result.add(i)
    } else {
      result.add(parseInt(part))
    }
  }
  return [...result].sort((a, b) => a - b)
}

function computeNextRuns(parts: string[], count: number): string[] {
  const [minF, hourF, domF, monF, dowF] = parts
  const mins = expandField(minF, 0, 59)
  const hours = expandField(hourF, 0, 23)
  const doms = expandField(domF, 1, 31)
  const mons = expandField(monF, 1, 12)
  const dows = expandField(dowF, 0, 7).map(d => d % 7)

  const runs: string[] = []
  const now = new Date()
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0)
  const limit = new Date(now.getTime() + 366 * 24 * 60 * 60 * 1000)

  while (runs.length < count && cursor < limit) {
    const m = cursor.getMonth() + 1
    const d = cursor.getDate()
    const w = cursor.getDay()
    const h = cursor.getHours()
    const mn = cursor.getMinutes()

    if (mons.includes(m) && doms.includes(d) && dows.includes(w) && hours.includes(h) && mins.includes(mn)) {
      runs.push(cursor.toLocaleString('en-GB', {
        weekday: 'short', year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false
      }))
    }
    cursor.setMinutes(cursor.getMinutes() + 1)
  }

  return runs
}
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
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
.warn {
  @apply text-sm text-red-400 bg-red-900/20 p-2 rounded-lg border border-red-700;
}
</style>
