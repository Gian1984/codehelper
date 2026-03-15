<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">⏰ Cron Expression Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Build, visualize, and understand cron expressions with a simple visual builder</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Presets -->
    <div class="card space-y-3">
      <label class="label">⚡ Quick Presets</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="preset in presets"
          :key="preset.label"
          class="btn"
          @click="applyPreset(preset)"
        >
          {{ preset.label }}
        </button>
      </div>
    </div>

    <!-- Builder -->
    <div class="card space-y-4">
      <label class="label">🔧 Visual Builder</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Minute -->
        <div class="space-y-2">
          <label class="label">Minute</label>
          <select v-model="fields.minute.mode" class="input">
            <option value="every">Every minute (*)</option>
            <option value="specific">Specific value</option>
            <option value="interval">Every N minutes</option>
          </select>
          <select v-if="fields.minute.mode === 'specific'" v-model.number="fields.minute.value" class="input">
            <option v-for="n in 60" :key="n - 1" :value="n - 1">{{ n - 1 }}</option>
          </select>
          <select v-if="fields.minute.mode === 'interval'" v-model.number="fields.minute.interval" class="input">
            <option v-for="n in [2, 3, 5, 10, 15, 20, 30]" :key="n" :value="n">Every {{ n }} minutes</option>
          </select>
        </div>

        <!-- Hour -->
        <div class="space-y-2">
          <label class="label">Hour</label>
          <select v-model="fields.hour.mode" class="input">
            <option value="every">Every hour (*)</option>
            <option value="specific">Specific value</option>
            <option value="interval">Every N hours</option>
          </select>
          <select v-if="fields.hour.mode === 'specific'" v-model.number="fields.hour.value" class="input">
            <option v-for="n in 24" :key="n - 1" :value="n - 1">{{ (n - 1).toString().padStart(2, '0') }}:00</option>
          </select>
          <select v-if="fields.hour.mode === 'interval'" v-model.number="fields.hour.interval" class="input">
            <option v-for="n in [2, 3, 4, 6, 8, 12]" :key="n" :value="n">Every {{ n }} hours</option>
          </select>
        </div>

        <!-- Day of Month -->
        <div class="space-y-2">
          <label class="label">Day of Month</label>
          <select v-model="fields.dom.mode" class="input">
            <option value="every">Every day (*)</option>
            <option value="specific">Specific day</option>
          </select>
          <select v-if="fields.dom.mode === 'specific'" v-model.number="fields.dom.value" class="input">
            <option v-for="n in 31" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <!-- Month -->
        <div class="space-y-2">
          <label class="label">Month</label>
          <select v-model="fields.month.mode" class="input">
            <option value="every">Every month (*)</option>
            <option value="specific">Specific month</option>
          </select>
          <select v-if="fields.month.mode === 'specific'" v-model.number="fields.month.value" class="input">
            <option v-for="(name, idx) in monthNames" :key="idx" :value="idx + 1">{{ name }}</option>
          </select>
        </div>

        <!-- Day of Week -->
        <div class="space-y-2">
          <label class="label">Day of Week</label>
          <select v-model="fields.dow.mode" class="input">
            <option value="every">Every day (*)</option>
            <option value="specific">Specific day</option>
          </select>
          <select v-if="fields.dow.mode === 'specific'" v-model.number="fields.dow.value" class="input">
            <option v-for="(name, idx) in dayNames" :key="idx" :value="idx">{{ name }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Output -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📋 Generated Expression</label>
        <div class="flex items-center gap-2">
          <span v-if="copied" class="text-green-400 text-sm font-medium">✅ Copied!</span>
          <button class="btn-primary" @click="copyExpression" title="Copy cron expression">
            📋 Copy
          </button>
        </div>
      </div>

      <!-- Cron expression -->
      <div class="mono-box text-center">
        <span class="text-2xl sm:text-3xl font-bold tracking-wider">{{ cronExpression }}</span>
      </div>

      <!-- Field labels -->
      <div class="grid grid-cols-5 gap-2 text-center text-xs text-gray-500">
        <span>Minute</span>
        <span>Hour</span>
        <span>Day (Month)</span>
        <span>Month</span>
        <span>Day (Week)</span>
      </div>

      <!-- Human-readable description -->
      <div class="bg-gray-800 rounded-lg border border-gray-700 p-3">
        <p class="text-sm text-gray-300">
          <span class="text-indigo-400 font-medium">Description:</span> {{ humanDescription }}
        </p>
      </div>

      <!-- Next 5 execution times -->
      <div class="space-y-2">
        <label class="label">📅 Next 5 Execution Times</label>
        <div class="mono-box space-y-1">
          <div v-for="(time, idx) in nextExecutions" :key="idx" class="flex items-center gap-2">
            <span class="text-gray-500 text-xs w-4 text-right">{{ idx + 1 }}.</span>
            <span>{{ time }}</span>
          </div>
          <div v-if="nextExecutions.length === 0" class="text-gray-500">
            No upcoming executions found within the next year.
          </div>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

/* ---------- constants ---------- */
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

/* ---------- types ---------- */
interface CronField {
  mode: 'every' | 'specific' | 'interval'
  value: number
  interval: number
}

interface Preset {
  label: string
  minute: Partial<CronField>
  hour: Partial<CronField>
  dom: Partial<CronField>
  month: Partial<CronField>
  dow: Partial<CronField>
}

/* ---------- state ---------- */
const copied = ref(false)

const fields = reactive({
  minute: { mode: 'every', value: 0, interval: 5 } as CronField,
  hour: { mode: 'every', value: 0, interval: 2 } as CronField,
  dom: { mode: 'every', value: 1, interval: 1 } as CronField,
  month: { mode: 'every', value: 1, interval: 1 } as CronField,
  dow: { mode: 'every', value: 0, interval: 1 } as CronField,
})

/* ---------- presets ---------- */
const presets: Preset[] = [
  {
    label: 'Every minute',
    minute: { mode: 'every' },
    hour: { mode: 'every' },
    dom: { mode: 'every' },
    month: { mode: 'every' },
    dow: { mode: 'every' },
  },
  {
    label: 'Every 5 minutes',
    minute: { mode: 'interval', interval: 5 },
    hour: { mode: 'every' },
    dom: { mode: 'every' },
    month: { mode: 'every' },
    dow: { mode: 'every' },
  },
  {
    label: 'Every 15 minutes',
    minute: { mode: 'interval', interval: 15 },
    hour: { mode: 'every' },
    dom: { mode: 'every' },
    month: { mode: 'every' },
    dow: { mode: 'every' },
  },
  {
    label: 'Every hour',
    minute: { mode: 'specific', value: 0 },
    hour: { mode: 'every' },
    dom: { mode: 'every' },
    month: { mode: 'every' },
    dow: { mode: 'every' },
  },
  {
    label: 'Every day at midnight',
    minute: { mode: 'specific', value: 0 },
    hour: { mode: 'specific', value: 0 },
    dom: { mode: 'every' },
    month: { mode: 'every' },
    dow: { mode: 'every' },
  },
  {
    label: 'Every day at noon',
    minute: { mode: 'specific', value: 0 },
    hour: { mode: 'specific', value: 12 },
    dom: { mode: 'every' },
    month: { mode: 'every' },
    dow: { mode: 'every' },
  },
  {
    label: 'Every Monday at 9 AM',
    minute: { mode: 'specific', value: 0 },
    hour: { mode: 'specific', value: 9 },
    dom: { mode: 'every' },
    month: { mode: 'every' },
    dow: { mode: 'specific', value: 1 },
  },
  {
    label: 'Every month 1st at midnight',
    minute: { mode: 'specific', value: 0 },
    hour: { mode: 'specific', value: 0 },
    dom: { mode: 'specific', value: 1 },
    month: { mode: 'every' },
    dow: { mode: 'every' },
  },
  {
    label: 'Every Sunday at 3 AM',
    minute: { mode: 'specific', value: 0 },
    hour: { mode: 'specific', value: 3 },
    dom: { mode: 'every' },
    month: { mode: 'every' },
    dow: { mode: 'specific', value: 0 },
  },
]

/* ---------- actions ---------- */
function clearAll(): void {
  fields.minute = { mode: 'every', value: 0, interval: 5 }
  fields.hour = { mode: 'every', value: 0, interval: 2 }
  fields.dom = { mode: 'every', value: 1, interval: 1 }
  fields.month = { mode: 'every', value: 1, interval: 1 }
  fields.dow = { mode: 'every', value: 0, interval: 1 }
  copied.value = false
}

function applyPreset(preset: Preset): void {
  const fieldKeys = ['minute', 'hour', 'dom', 'month', 'dow'] as const
  for (const key of fieldKeys) {
    const p = preset[key]
    if (p) {
      if (p.mode !== undefined) fields[key].mode = p.mode
      if (p.value !== undefined) fields[key].value = p.value
      if (p.interval !== undefined) fields[key].interval = p.interval
    }
  }
}

async function copyExpression(): Promise<void> {
  await navigator.clipboard.writeText(cronExpression.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

/* ---------- cron expression builder ---------- */
function fieldToString(field: CronField): string {
  switch (field.mode) {
    case 'every':
      return '*'
    case 'specific':
      return String(field.value)
    case 'interval':
      return `*/${field.interval}`
    default:
      return '*'
  }
}

const cronExpression = computed(() => {
  return [
    fieldToString(fields.minute),
    fieldToString(fields.hour),
    fieldToString(fields.dom),
    fieldToString(fields.month),
    fieldToString(fields.dow),
  ].join(' ')
})

/* ---------- human-readable description ---------- */
const humanDescription = computed(() => {
  const parts: string[] = []

  if (fields.hour.mode === 'specific') {
    const h = fields.hour.value
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
    const min = fields.minute.mode === 'specific' ? String(fields.minute.value).padStart(2, '0') : '00'
    parts.push(`at ${h12}:${min} ${ampm}`)
  } else if (fields.hour.mode === 'interval') {
    parts.push(`every ${fields.hour.interval} hours`)
    if (fields.minute.mode === 'specific') {
      parts.push(`at minute ${fields.minute.value}`)
    }
  } else {
    if (fields.minute.mode === 'every') {
      parts.push('every minute')
    } else if (fields.minute.mode === 'interval') {
      parts.push(`every ${fields.minute.interval} minutes`)
    } else {
      parts.push(`at minute ${fields.minute.value} of every hour`)
    }
  }

  if (fields.dom.mode === 'specific') {
    parts.push(`on day ${fields.dom.value} of the month`)
  }

  if (fields.month.mode === 'specific') {
    parts.push(`in ${monthNames[fields.month.value - 1]}`)
  }

  if (fields.dow.mode === 'specific') {
    parts.push(`on ${dayNames[fields.dow.value]}s`)
  }

  const description = parts.join(', ')
  return 'Runs ' + description
})

/* ---------- next execution times ---------- */
const nextExecutions = computed(() => {
  const results: string[] = []
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0)
  const maxDate = new Date(start)
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  const cursor = new Date(start)

  const maxIterations = 525960
  let iterations = 0

  while (results.length < 5 && cursor < maxDate && iterations < maxIterations) {
    if (matchesCron(cursor)) {
      results.push(formatDate(cursor))
    }
    cursor.setMinutes(cursor.getMinutes() + 1)
    iterations++
  }

  return results
})

function matchesCron(date: Date): boolean {
  const minute = date.getMinutes()
  const hour = date.getHours()
  const dom = date.getDate()
  const month = date.getMonth() + 1
  const dow = date.getDay()

  if (!matchField(fields.minute, minute)) return false
  if (!matchField(fields.hour, hour)) return false
  if (!matchField(fields.dom, dom)) return false
  if (!matchField(fields.month, month)) return false
  if (!matchField(fields.dow, dow)) return false

  return true
}

function matchField(field: CronField, value: number): boolean {
  switch (field.mode) {
    case 'every':
      return true
    case 'specific':
      return value === field.value
    case 'interval':
      return field.interval > 0 && value % field.interval === 0
    default:
      return true
  }
}

function formatDate(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const dayName = days[date.getDay()]
  const monthName = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${dayName}, ${day} ${monthName} ${year} ${hours}:${minutes}`
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
select.input {
  @apply appearance-none;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}
textarea.input {
  @apply resize-y;
}
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500;
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
