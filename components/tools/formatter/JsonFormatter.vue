<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">JSON Formatter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">clear</button>
        <button class="btn" @click="formatJson">format</button>
        <button class="btn-primary" @click="copyPretty" :disabled="!formatted">copy</button>
        <button class="btn" @click="copyMinified" :disabled="!formatted">copy minified</button>
        <button class="btn" @click="downloadJson" :disabled="!formatted">download</button>
      </div>
    </div>

    <!-- input -->
    <div class="space-y-2">
      <div class="flex items-center gap-3 flex-wrap">
        <label class="label">input</label>
        <label class="btn cursor-pointer">
          import .json
          <input type="file" class="hidden" accept=".json,application/json,text/plain" @change="onFile" />
        </label>
        <label class="inline-flex items-center gap-2 ml-auto">
          <input type="checkbox" v-model="autoFormatOnPaste" class="w-4 h-4" />
          <span class="text-sm">auto-format on paste</span>
        </label>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste JSON (or JSON with comments) here…"
          class="w-full min-h-48 p-4 rounded border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
          spellcheck="false"
          @paste="onPaste"
      ></textarea>

      <div class="text-xs text-gray-400 flex gap-4">
        <span>chars: {{ input.length }}</span>
        <span v-if="error" class="text-red-400">{{ error }}</span>
        <span v-if="copiedMsg" class="text-green-400">{{ copiedMsg }}</span>
      </div>
    </div>

    <!-- options -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card space-y-3">
        <label class="block">
          <span class="label">indent type</span>
          <select v-model="indentKind" class="input">
            <option value="spaces">spaces</option>
            <option value="tabs">tabs</option>
          </select>
        </label>
        <label v-if="indentKind==='spaces'" class="block">
          <span class="label">indent width</span>
          <select v-model.number="indentWidth" class="input">
            <option v-for="n in [2,3,4,6,8]" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="sortKeys" class="w-4 h-4" />
          <span class="text-sm">sort keys (deep)</span>
        </label>
      </div>

      <div class="card space-y-3">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="allowComments" class="w-4 h-4" />
          <span class="text-sm">accept comments (JSONC)</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="stripTrailingCommas" class="w-4 h-4" />
          <span class="text-sm">strip trailing commas</span>
        </label>
        <label class="block">
          <span class="label">download filename</span>
          <input v-model="filename" class="input" placeholder="formatted.json" />
        </label>
      </div>

      <div class="card space-y-2">
        <button class="btn" @click="formatJson">apply formatting</button>
        <div class="text-xs text-gray-400">
          accepts <code>// line</code> and <code>/* block */</code> comments when enabled; also cleans trailing commas.
        </div>
        <div class="text-xs text-gray-400" v-if="stats">
          size: {{ stats.pretty }} • min: {{ stats.min }}
        </div>
      </div>
    </div>

    <!-- output -->
    <div v-if="formatted" class="space-y-2">
      <label class="label">output</label>
      <pre class="bg-gray-950 p-4 rounded border border-gray-800 overflow-auto text-sm text-green-300 font-mono whitespace-pre-wrap">{{ formatted }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* ---------- state ---------- */
const input = ref<string>('')

const formatted = ref<string>('')     // pretty
const minified = ref<string>('')      // compact
const error = ref<string>('')

const copiedMsg = ref<string>('')

type IndentKind = 'spaces' | 'tabs'
const indentKind = ref<IndentKind>('spaces')
const indentWidth = ref<number>(2)
const sortKeys = ref<boolean>(false)

const allowComments = ref<boolean>(true)
const stripTrailingCommas = ref<boolean>(true)

const autoFormatOnPaste = ref<boolean>(false)
const filename = ref<string>('formatted.json')

const stats = ref<{ pretty: string; min: string } | null>(null)

/* ---------- actions ---------- */
function clearAll(): void {
  input.value = ''
  formatted.value = ''
  minified.value = ''
  error.value = ''
  copiedMsg.value = ''
  stats.value = null
}

function onFile(e: Event): void {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => (input.value = String(reader.result ?? ''))
  reader.readAsText(file)
}

function onPaste(): void {
  if (!autoFormatOnPaste.value) return
  setTimeout(() => formatJson(), 0)
}

function toast(msg: string): void {
  copiedMsg.value = msg
  window.setTimeout(() => (copiedMsg.value = ''), 1200)
}

async function copyPretty(): Promise<void> {
  if (!formatted.value) return
  await navigator.clipboard.writeText(formatted.value)
  toast('copied!')
}
async function copyMinified(): Promise<void> {
  if (!minified.value) return
  await navigator.clipboard.writeText(minified.value)
  toast('copied (minified)!')
}

function downloadJson(): void {
  if (!formatted.value) return
  const blob = new Blob([formatted.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName(filename.value || 'formatted.json')
  a.click()
  URL.revokeObjectURL(url)
}

/* ---------- formatter ---------- */
function formatJson(): void {
  error.value = ''
  formatted.value = ''
  minified.value = ''
  stats.value = null

  const raw = input.value
  if (!raw.trim()) return

  try {
    // prepare source if needed
    let src = raw
    if (allowComments.value) src = stripComments(src)
    if (stripTrailingCommas.value) src = removeTrailingCommas(src)

    // parse
    const obj = JSON.parse(src)

    // sort keys (deep) if requested
    const normalized = sortKeys.value ? deepSort(obj) : obj

    // make outputs
    const indent = indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value)
    formatted.value = JSON.stringify(normalized, null, indent)
    minified.value = JSON.stringify(normalized)

    stats.value = {
      pretty: bytes(formatted.value.length),
      min: bytes(minified.value.length),
    }
  } catch (err) {
    error.value = friendlyJsonError(err, input.value)
  }
}

/* ---------- helpers: JSONC + trailing commas ---------- */
// Safely strip // and /* */ comments without touching strings
function stripComments(s: string): string {
  let out = ''
  let i = 0
  let inStr = false
  let quote: '"' | "'" | '`' | '' = ''
  while (i < s.length) {
    const ch = s[i]
    const next = s[i + 1]

    if (!inStr && ch === '/' && next === '/') {
      // line comment
      i += 2
      while (i < s.length && s[i] !== '\n') i++
      continue
    }
    if (!inStr && ch === '/' && next === '*') {
      // block comment
      i += 2
      while (i < s.length && !(s[i] === '*' && s[i + 1] === '/')) i++
      i += 2
      continue
    }

    if (!inStr && (ch === '"' || ch === "'" || ch === '`')) {
      inStr = true
      quote = ch as typeof quote
      out += ch
      i++
      continue
    }

    if (inStr) {
      out += ch
      if (ch === '\\') {
        // escape next char
        out += s[i + 1] ?? ''
        i += 2
        continue
      }
      if (ch === quote) {
        inStr = false
        quote = ''
      }
      i++
      continue
    }

    out += ch
    i++
  }
  return out
}

// Remove trailing commas in objects/arrays (… , ] or … , })
function removeTrailingCommas(s: string): string {
  let out = ''
  let i = 0
  let inStr = false
  let quote: '"' | "'" | '`' | '' = ''
  while (i < s.length) {
    const ch = s[i]
    if (!inStr && (ch === '"' || ch === "'" || ch === '`')) {
      inStr = true; quote = ch as typeof quote; out += ch; i++; continue
    }
    if (inStr) {
      out += ch
      if (ch === '\\') { out += s[i + 1] ?? ''; i += 2; continue }
      if (ch === quote) { inStr = false; quote = '' }
      i++; continue
    }
    // detect comma followed only by whitespace + closing ] or }
    if (ch === ',') {
      let j = i + 1
      while (j < s.length && /\s/.test(s[j])) j++
      const closer = s[j]
      if (closer === ']' || closer === '}') {
        // skip this comma
        i++ // don't append comma
        continue
      }
    }
    out += ch
    i++
  }
  return out
}

/* ---------- helpers: sorting & errors ---------- */
function deepSort<T>(val: T): T {
  if (Array.isArray(val)) {
    return val.map(deepSort) as unknown as T
  }
  if (val && typeof val === 'object') {
    const obj = val as Record<string, unknown>
    const sorted: Record<string, unknown> = {}
    Object.keys(obj).sort((a, b) => a.localeCompare(b)).forEach(k => {
      sorted[k] = deepSort(obj[k])
    })
    return sorted as unknown as T
  }
  return val
}

function friendlyJsonError(err: unknown, src: string): string {
  const msg = (err as Error)?.message || 'Invalid JSON'
  // Look for "position X" to compute line/col
  const m = /position\s+(\d+)/i.exec(msg)
  if (!m) return 'Invalid JSON: ' + msg
  const pos = parseInt(m[1], 10)
  const before = src.slice(0, pos)
  const line = (before.match(/\n/g) || []).length + 1
  const col = pos - (before.lastIndexOf('\n') + 1) + 1
  return `Invalid JSON at ${line}:${col} — ${msg}`
}

function bytes(n: number): string {
  if (n < 1024) return `${n} B`
  const kb = n / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

function safeName(n: string): string {
  let x = n.trim()
  if (!/\.json$/i.test(x)) x += '.json'
  return x.replace(/[^\w.\-]+/g, '_')
}
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
</style>


