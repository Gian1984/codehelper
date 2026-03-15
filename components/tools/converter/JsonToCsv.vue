<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">📊 JSON to CSV</h2>
        <p class="text-sm text-gray-400 mt-1">Convert JSON arrays into CSV format with delimiter and flattening options</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="convert" title="Convert to CSV">
          ⚡ Convert
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <label class="label">📝 JSON Array Input</label>
      <textarea
          v-model="input"
          placeholder='[{ "name": "Alice", "age": 30 }, { "name": "Bob", "age": 25 }]'
          class="input font-mono resize-y min-h-[160px]"
          spellcheck="false"
      ></textarea>
      <div class="flex items-center justify-between text-xs">
        <span class="text-gray-400">Characters: {{ input.length.toLocaleString() }}</span>
        <div class="flex gap-4">
          <span v-if="error" class="warn">❌ {{ error }}</span>
          <span v-if="copied" class="text-green-400 font-medium">✅ Copied!</span>
        </div>
      </div>
    </div>

    <!-- Options -->
    <details class="card" open>
      <summary class="label font-semibold cursor-pointer select-none hover:text-indigo-400 transition-colors mb-4">
        ⚙️ Options
      </summary>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="space-y-2">
          <label class="label">Delimiter</label>
          <select v-model="delimiter" class="input">
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="&#9;">Tab (\t)</option>
          </select>
        </div>
        <div class="space-y-3 pt-6">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="includeHeader" />
            <span class="text-sm text-gray-300">Include header row</span>
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="flattenNested" />
            <span class="text-sm text-gray-300">Flatten nested objects (dot notation)</span>
          </label>
        </div>
      </div>
    </details>

    <!-- Stats -->
    <div v-if="stats" class="card">
      <div class="flex gap-6 text-sm">
        <span class="text-gray-400">Rows: <span class="text-white font-medium">{{ stats.rows }}</span></span>
        <span class="text-gray-400">Columns: <span class="text-white font-medium">{{ stats.cols }}</span></span>
      </div>
    </div>

    <!-- Output Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 CSV Output</label>
        <div v-if="output" class="flex items-center gap-2">
          <button class="btn" @click="copyToClipboard" title="Copy">📋 Copy</button>
          <button class="btn" @click="downloadCsv" title="Download">💾 Download .csv</button>
        </div>
      </div>
      <div v-if="output">
        <pre class="mono-box max-h-[400px] whitespace-pre-wrap">{{ outputPreview }}</pre>
        <p v-if="stats && stats.rows > 50" class="text-xs text-gray-500 mt-2">Showing first 50 rows. Download for full output.</p>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">📊</div>
        <p>Paste a JSON array above and click "Convert"</p>
      </div>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const input = ref('')
const output = ref('')
const error = ref('')
const copied = ref(false)
const delimiter = ref(',')
const includeHeader = ref(true)
const flattenNested = ref(true)
const stats = ref<{ rows: number; cols: number } | null>(null)

const outputPreview = computed(() => {
  if (!output.value) return ''
  const lines = output.value.split('\n')
  const limit = includeHeader.value ? 51 : 50
  return lines.slice(0, limit).join('\n')
})

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
  stats.value = null
  copied.value = false
}

async function copyToClipboard() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadCsv() {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.csv'
  a.click()
  URL.revokeObjectURL(url)
}

function convert() {
  error.value = ''
  output.value = ''
  stats.value = null
  copied.value = false

  const raw = input.value.trim()
  if (!raw) return

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (e) {
    error.value = 'Invalid JSON: ' + (e as Error).message
    return
  }

  if (!Array.isArray(parsed)) {
    error.value = 'Input must be a JSON array of objects'
    return
  }

  if (parsed.length === 0) {
    error.value = 'Array is empty'
    return
  }

  if (typeof parsed[0] !== 'object' || parsed[0] === null) {
    error.value = 'Array items must be objects'
    return
  }

  const rows = flattenNested.value
    ? parsed.map(item => flattenObject(item as Record<string, unknown>))
    : parsed as Record<string, unknown>[]

  const allKeys = new Set<string>()
  for (const row of rows) {
    for (const key of Object.keys(row)) allKeys.add(key)
  }
  const columns = [...allKeys]

  const lines: string[] = []
  if (includeHeader.value) {
    lines.push(columns.map(c => escapeCsvValue(c, delimiter.value)).join(delimiter.value))
  }

  for (const row of rows) {
    const values = columns.map(col => {
      const val = (row as Record<string, unknown>)[col]
      if (val === null || val === undefined) return ''
      return escapeCsvValue(String(val), delimiter.value)
    })
    lines.push(values.join(delimiter.value))
  }

  output.value = lines.join('\n')
  stats.value = { rows: rows.length, cols: columns.length }
}

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val as Record<string, unknown>, newKey))
    } else if (Array.isArray(val)) {
      result[newKey] = JSON.stringify(val)
    } else {
      result[newKey] = val
    }
  }
  return result
}

function escapeCsvValue(value: string, delim: string): string {
  if (value.includes(delim) || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return '"' + value.replace(/"/g, '""') + '"'
  }
  return value
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
