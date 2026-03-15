<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">📋 CSV to JSON</h2>
        <p class="text-sm text-gray-400 mt-1">Convert CSV data into JSON arrays with auto-detection and quoted field support</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="convert" title="Convert to JSON">
          ⚡ Convert
        </button>
        <label class="btn cursor-pointer">
          📁 Upload .csv
          <input type="file" class="hidden" accept=".csv,.tsv,.txt,text/plain" @change="onFile" />
        </label>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <label class="label">📝 CSV Input</label>
      <textarea
          v-model="input"
          placeholder="name,age,city&#10;Alice,30,Rome&#10;Bob,25,Milan"
          class="input font-mono resize-y min-h-[160px]"
          spellcheck="false"
      ></textarea>
      <div class="flex items-center justify-between text-xs">
        <div class="flex gap-4 text-gray-400">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
          <span v-if="detectedDelimiter">Detected: <span class="text-indigo-400 font-medium">{{ delimiterLabel }}</span></span>
        </div>
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
          <select v-model="delimiterChoice" class="input">
            <option value="auto">Auto-detect</option>
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="&#9;">Tab (\t)</option>
          </select>
        </div>
        <div class="space-y-3 pt-6">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="firstRowHeaders" />
            <span class="text-sm text-gray-300">First row as headers</span>
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="trimWhitespace" />
            <span class="text-sm text-gray-300">Trim whitespace</span>
          </label>
        </div>
      </div>
    </details>

    <!-- Stats -->
    <div v-if="stats" class="card">
      <div class="flex gap-6 text-sm">
        <span class="text-gray-400">Rows: <span class="text-white font-medium">{{ stats.rows }}</span></span>
        <span class="text-gray-400">Keys: <span class="text-white font-medium">{{ stats.keys }}</span></span>
      </div>
    </div>

    <!-- Output Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 JSON Output</label>
        <div v-if="output" class="flex items-center gap-2">
          <button class="btn" @click="copyToClipboard" title="Copy">📋 Copy</button>
          <button class="btn" @click="downloadJson" title="Download">💾 Download .json</button>
        </div>
      </div>
      <div v-if="output">
        <pre class="mono-box max-h-[500px] whitespace-pre-wrap">{{ output }}</pre>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">📋</div>
        <p>Paste CSV data above or upload a file, then click "Convert"</p>
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
const delimiterChoice = ref('auto')
const firstRowHeaders = ref(true)
const trimWhitespace = ref(true)
const stats = ref<{ rows: number; keys: number } | null>(null)
const detectedDelimiter = ref('')

const delimiterLabel = computed(() => {
  if (detectedDelimiter.value === ',') return 'Comma'
  if (detectedDelimiter.value === ';') return 'Semicolon'
  if (detectedDelimiter.value === '\t') return 'Tab'
  return detectedDelimiter.value
})

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
  stats.value = null
  detectedDelimiter.value = ''
  copied.value = false
}

function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    input.value = reader.result as string
    convert()
  }
  reader.readAsText(file)
}

async function copyToClipboard() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadJson() {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.json'
  a.click()
  URL.revokeObjectURL(url)
}

function autoDetectDelimiter(text: string): string {
  const firstLine = text.split('\n')[0] || ''
  const counts: Record<string, number> = { ',': 0, ';': 0, '\t': 0 }
  for (const ch of firstLine) {
    if (ch in counts) counts[ch]++
  }
  let best = ','
  let max = 0
  for (const [d, c] of Object.entries(counts)) {
    if (c > max) { max = c; best = d }
  }
  return best
}

function parseCsvLine(line: string, delim: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false
  let i = 0

  while (i < line.length) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i += 2
        } else {
          inQuotes = false
          i++
        }
      } else {
        current += ch
        i++
      }
    } else {
      if (ch === '"') {
        inQuotes = true
        i++
      } else if (ch === delim) {
        fields.push(current)
        current = ''
        i++
      } else {
        current += ch
        i++
      }
    }
  }
  fields.push(current)
  return fields
}

function parseCsv(text: string, delim: string): string[][] {
  const rows: string[][] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && i + 1 < text.length && text[i + 1] === '\n') i++
        if (current.trim() || rows.length > 0) {
          rows.push(parseCsvLine(current, delim))
        }
        current = ''
      } else {
        current += ch
      }
    }
  }
  if (current.trim()) {
    rows.push(parseCsvLine(current, delim))
  }
  return rows
}

function convert() {
  error.value = ''
  output.value = ''
  stats.value = null
  copied.value = false

  const raw = input.value.trim()
  if (!raw) return

  const delim = delimiterChoice.value === 'auto' ? autoDetectDelimiter(raw) : delimiterChoice.value
  detectedDelimiter.value = delim

  const rows = parseCsv(raw, delim)
  if (rows.length === 0) {
    error.value = 'No data found'
    return
  }

  let result: Record<string, unknown>[]

  if (firstRowHeaders.value) {
    if (rows.length < 2) {
      error.value = 'Need at least 2 rows when using first row as headers'
      return
    }
    const headers = rows[0].map(h => trimWhitespace.value ? h.trim() : h)
    result = rows.slice(1).map(row => {
      const obj: Record<string, unknown> = {}
      for (let i = 0; i < headers.length; i++) {
        let val: unknown = row[i] ?? ''
        if (trimWhitespace.value && typeof val === 'string') val = val.trim()
        if (val === '') {
          obj[headers[i]] = null
        } else if (!isNaN(Number(val)) && val !== '') {
          obj[headers[i]] = Number(val)
        } else if (val === 'true') {
          obj[headers[i]] = true
        } else if (val === 'false') {
          obj[headers[i]] = false
        } else {
          obj[headers[i]] = val
        }
      }
      return obj
    })
    stats.value = { rows: result.length, keys: headers.length }
  } else {
    result = rows.map(row => {
      const obj: Record<string, unknown> = {}
      row.forEach((val, i) => {
        const v = trimWhitespace.value ? val.trim() : val
        obj[`col${i + 1}`] = v || null
      })
      return obj
    })
    stats.value = { rows: result.length, keys: rows[0]?.length || 0 }
  }

  output.value = JSON.stringify(result, null, 2)
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
