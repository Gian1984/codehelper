<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 text-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">JSON Formatter</h2>
        <p class="text-sm text-gray-400 mt-1">Format, validate, and analyze JSON with advanced tools</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-action" @click="formatJson" title="Format JSON">
          <span class="text-lg">✨</span> Format
        </button>
        <button class="btn-action" @click="clearAll" title="Clear all">
          <span class="text-lg">🗑️</span> Clear
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label font-medium">📝 Input JSON</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="btn-file cursor-pointer">
            📁 Import File
            <input type="file" class="hidden" accept=".json,application/json,text/plain" @change="onFile" />
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="autoFormatOnPaste" class="w-4 h-4 accent-indigo-500" />
            <span class="text-sm text-gray-300">Auto-format on paste</span>
          </label>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your JSON here... (supports comments and trailing commas)"
          class="w-full min-h-56 p-4 rounded-lg border-2 border-gray-700 bg-gray-950 text-white focus:outline-none focus:border-indigo-500 font-mono resize-y text-sm transition-colors"
          spellcheck="false"
          @paste="onPaste"
      ></textarea>

      <div class="flex items-center justify-between text-xs">
        <div class="flex gap-4 text-gray-400">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
          <span v-if="stats">Lines: {{ stats.lines }}</span>
        </div>
        <div class="flex gap-4">
          <span v-if="error" class="text-red-400 font-medium">❌ {{ error }}</span>
          <span v-if="copiedMsg" class="text-green-400 font-medium">✅ {{ copiedMsg }}</span>
        </div>
      </div>
    </div>

    <!-- Options -->
    <details class="card" open>
      <summary class="label font-medium cursor-pointer select-none hover:text-white transition-colors mb-4">
        ⚙️ Format Options
      </summary>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Indentation -->
        <div class="space-y-2">
          <label class="block">
            <span class="label text-xs">Indent Type</span>
            <select v-model="indentKind" class="input-sm">
              <option value="spaces">Spaces</option>
              <option value="tabs">Tabs</option>
            </select>
          </label>
          <label v-if="indentKind==='spaces'" class="block">
            <span class="label text-xs">Width</span>
            <select v-model.number="indentWidth" class="input-sm">
              <option v-for="n in [2,3,4,6,8]" :key="n" :value="n">{{ n }}</option>
            </select>
          </label>
        </div>

        <!-- Processing Options -->
        <div class="space-y-2">
          <label class="checkbox-label">
            <input type="checkbox" v-model="sortKeys" class="checkbox" />
            <span>Sort keys (deep)</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="allowComments" class="checkbox" />
            <span>Accept comments (JSONC)</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="stripTrailingCommas" class="checkbox" />
            <span>Strip trailing commas</span>
          </label>
        </div>

        <!-- Download -->
        <div class="space-y-2">
          <label class="block">
            <span class="label text-xs">Download Filename</span>
            <input v-model="filename" class="input-sm" placeholder="formatted.json" />
          </label>
        </div>

        <!-- Stats -->
        <div v-if="stats" class="space-y-1 text-xs text-gray-400">
          <div class="font-semibold text-gray-300 mb-2">📊 Statistics</div>
          <div>Size: {{ stats.pretty }} → {{ stats.min }}</div>
          <div>Saved: {{ stats.ratio }}</div>
          <div>Lines: {{ stats.lines }}</div>
          <div>Objects: {{ stats.objects }} • Arrays: {{ stats.arrays }}</div>
        </div>
      </div>
    </details>

    <!-- schema validation section -->
    <div class="space-y-3">
      <button
        @click="showSchemaValidator = !showSchemaValidator"
        class="btn flex items-center gap-2"
      >
        <span>{{ showSchemaValidator ? '▼' : '▶' }}</span>
        🔍 JSON Schema Validation
      </button>

      <div v-if="showSchemaValidator" class="space-y-3 bg-gray-800/60 rounded-xl p-4 border border-gray-800">
        <div class="space-y-2">
          <label class="label">JSON Schema</label>
          <textarea
            v-model="schemaInput"
            placeholder='Paste JSON Schema here (e.g., {"type": "object", "properties": {...}})'
            class="w-full min-h-32 p-4 rounded border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y text-sm"
            spellcheck="false"
          ></textarea>
        </div>

        <button
          @click="validateAgainstSchema"
          class="btn-primary"
          :disabled="isValidating"
        >
          <span v-if="isValidating">⏳ Validating...</span>
          <span v-else>Validate against Schema</span>
        </button>

        <!-- Validation Error (parsing/schema errors) -->
        <div v-if="validationError" class="bg-orange-900/20 border border-orange-700 rounded p-4">
          <p class="text-orange-300 text-sm whitespace-pre-wrap">{{ validationError }}</p>
        </div>

        <!-- Validation Results -->
        <div v-if="isValid === true" class="bg-green-900/20 border border-green-700 rounded p-4">
          <p class="text-green-400 font-semibold">✅ Valid! JSON matches the schema.</p>
        </div>

        <div v-if="isValid === false && validationErrors.length > 0" class="space-y-2">
          <div class="bg-red-900/20 border border-red-700 rounded p-4">
            <h3 class="text-red-400 font-semibold mb-3">❌ Validation Errors ({{ validationErrors.length }})</h3>
            <div class="space-y-3">
              <div
                v-for="(err, idx) in validationErrors"
                :key="idx"
                class="bg-gray-900/50 rounded p-3 text-sm space-y-1"
              >
                <div class="text-yellow-300">
                  <span class="font-mono">{{ err.path }}</span>
                  <span class="text-gray-400 ml-2">{{ err.message }}</span>
                </div>
                <div class="text-xs text-gray-500">
                  Keyword: <span class="text-gray-400">{{ err.keyword }}</span>
                  <span v-if="err.params" class="ml-2">
                    Params: <span class="text-gray-400">{{ JSON.stringify(err.params) }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View Mode Tabs -->
    <div class="flex items-center justify-between gap-3 border-b border-gray-700 pb-2">
      <div class="flex gap-2">
        <button
          @click="viewMode = 'text'"
          :class="['px-4 py-2 rounded-t text-sm font-medium transition-colors', viewMode === 'text' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
          :disabled="!formatted && viewMode !== 'text'"
        >
          📝 Text
        </button>
        <button
          @click="viewMode = 'tree'"
          :class="['px-4 py-2 rounded-t text-sm font-medium transition-colors', viewMode === 'tree' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
          :disabled="!parsedObject"
        >
          🌳 Tree
        </button>
        <button
          @click="viewMode = 'diff'"
          :class="['px-4 py-2 rounded-t text-sm font-medium transition-colors', viewMode === 'diff' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
        >
          🔀 Diff
        </button>
      </div>

      <!-- Actions for formatted output -->
      <div v-if="formatted && viewMode !== 'diff'" class="flex items-center gap-2">
        <button class="btn-icon" @click="copyPretty" title="Copy formatted">
          📋 Copy
        </button>
        <button class="btn-icon" @click="copyMinified" title="Copy minified">
          🗜️ Minified
        </button>
        <button class="btn-icon" @click="downloadJson" title="Download JSON">
          💾 Download
        </button>
      </div>
    </div>

    <!-- Text View -->
    <div v-if="viewMode === 'text'" class="card">
      <div v-if="formatted" class="space-y-2">
        <label class="label font-medium">📄 Formatted Output</label>
        <pre class="bg-gray-950 p-4 rounded-lg border-2 border-gray-700 overflow-auto text-sm font-mono max-h-[600px]"><code class="language-json" v-html="highlightedCode"></code></pre>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">📝</div>
        <p>Paste JSON above and click "Format" to see the output here</p>
      </div>
    </div>

    <!-- Tree View -->
    <div v-if="viewMode === 'tree'" class="card">
      <div v-if="parsedObject" class="space-y-2">
        <label class="label font-medium">🌳 Tree View</label>
        <div class="bg-gray-950 p-4 rounded-lg border-2 border-gray-700 overflow-auto max-h-[600px]">
          <ClientOnly>
            <JsonViewer
              :value="parsedObject"
              :expand-depth="3"
              copyable
              theme="dark"
            />
            <template #fallback>
              <div class="text-gray-400">Loading tree view...</div>
            </template>
          </ClientOnly>
        </div>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">🌳</div>
        <p>Format JSON first to explore it as an interactive tree</p>
      </div>
    </div>

    <!-- Diff View -->
    <div v-if="viewMode === 'diff'" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- JSON A -->
        <div class="space-y-2">
          <label class="label">JSON A (original)</label>
          <textarea
            v-model="input"
            placeholder="Paste first JSON here…"
            class="w-full min-h-48 p-4 rounded border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
            spellcheck="false"
          ></textarea>
        </div>

        <!-- JSON B -->
        <div class="space-y-2">
          <label class="label">JSON B (compare to)</label>
          <textarea
            v-model="inputB"
            placeholder="Paste second JSON here…"
            class="w-full min-h-48 p-4 rounded border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
            spellcheck="false"
          ></textarea>
        </div>
      </div>

      <button class="btn-primary" @click="compareDiff">Compare JSONs</button>

      <!-- Diff Results -->
      <div v-if="diffResult" class="space-y-4">
        <ClientOnly>
          <div v-if="Object.keys(diffResult.added).length > 0" class="bg-green-900/20 border border-green-700 rounded p-4">
            <h3 class="text-green-400 font-semibold mb-2">✅ Added</h3>
            <JsonViewer :value="diffResult.added" :expand-depth="5" theme="dark" copyable />
          </div>

          <div v-if="Object.keys(diffResult.deleted).length > 0" class="bg-red-900/20 border border-red-700 rounded p-4">
            <h3 class="text-red-400 font-semibold mb-2">❌ Deleted</h3>
            <JsonViewer :value="diffResult.deleted" :expand-depth="5" theme="dark" copyable />
          </div>

          <div v-if="Object.keys(diffResult.updated).length > 0" class="bg-yellow-900/20 border border-yellow-700 rounded p-4">
            <h3 class="text-yellow-400 font-semibold mb-2">📝 Modified</h3>
            <JsonViewer :value="diffResult.updated" :expand-depth="5" theme="dark" copyable />
          </div>

          <div v-if="Object.keys(diffResult.added).length === 0 && Object.keys(diffResult.deleted).length === 0 && Object.keys(diffResult.updated).length === 0" class="bg-blue-900/20 border border-blue-700 rounded p-4">
            <p class="text-blue-400">✨ JSONs are identical!</p>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/themes/prism-tomorrow.css'
import { detailedDiff } from 'deep-object-diff'

// Lazy load JsonViewer only on client side (named export)
const JsonViewer = defineAsyncComponent(() =>
  import('vue3-json-viewer').then((m) => m.JsonViewer)
)

// Ajv instance (initialized on client only)
let ajv: any = null

/* ---------- state ---------- */
const input = ref<string>('')
const inputB = ref<string>('')  // for diff mode

const formatted = ref<string>('')     // pretty
const minified = ref<string>('')      // compact
const parsedObject = ref<any>(null)   // for tree view
const error = ref<string>('')

const copiedMsg = ref<string>('')

type ViewMode = 'text' | 'tree' | 'diff'
const viewMode = ref<ViewMode>('text')

/* ---------- schema validation state ---------- */
const showSchemaValidator = ref<boolean>(false)
const schemaInput = ref<string>('')
const validationErrors = ref<any[]>([])
const isValid = ref<boolean | null>(null)
const validationError = ref<string>('') // Separate error for validation section
const isValidating = ref<boolean>(false)

/* ---------- lifecycle ---------- */
onMounted(async () => {
  // Initialize Ajv only on client side
  if (typeof window !== 'undefined') {
    const Ajv = (await import('ajv')).default
    const addFormats = (await import('ajv-formats')).default
    ajv = new Ajv({ allErrors: true, verbose: true })
    addFormats(ajv)
  }
})

type IndentKind = 'spaces' | 'tabs'
const indentKind = ref<IndentKind>('spaces')
const indentWidth = ref<number>(2)
const sortKeys = ref<boolean>(false)

const allowComments = ref<boolean>(true)
const stripTrailingCommas = ref<boolean>(true)

const autoFormatOnPaste = ref<boolean>(false)
const filename = ref<string>('formatted.json')

interface Stats {
  pretty: string
  min: string
  ratio: string
  lines: number
  objects: number
  arrays: number
}

const stats = ref<Stats | null>(null)

/* ---------- diff state ---------- */
const diffResult = ref<any>(null)
const parsedA = ref<any>(null)
const parsedB = ref<any>(null)

/* ---------- syntax highlighting ---------- */
const highlightedCode = computed(() => {
  if (!formatted.value) return ''
  return Prism.highlight(formatted.value, Prism.languages.json, 'json')
})

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
  parsedObject.value = null
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

    // store for tree view
    parsedObject.value = normalized

    // make outputs
    const indent = indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value)
    formatted.value = JSON.stringify(normalized, null, indent)
    minified.value = JSON.stringify(normalized)

    // calculate enhanced stats
    const prettySize = formatted.value.length
    const minSize = minified.value.length
    const compressionRatio = ((1 - minSize / prettySize) * 100).toFixed(1)
    const lineCount = formatted.value.split('\n').length

    stats.value = {
      pretty: bytes(prettySize),
      min: bytes(minSize),
      ratio: `${compressionRatio}%`,
      lines: lineCount,
      objects: countObjects(normalized),
      arrays: countArrays(normalized),
    }
  } catch (err) {
    error.value = friendlyJsonError(err, input.value)
  }
}

/* ---------- diff ---------- */
function compareDiff(): void {
  error.value = ''
  diffResult.value = null
  parsedA.value = null
  parsedB.value = null

  try {
    // Parse both inputs
    let srcA = input.value
    let srcB = inputB.value

    if (allowComments.value) {
      srcA = stripComments(srcA)
      srcB = stripComments(srcB)
    }
    if (stripTrailingCommas.value) {
      srcA = removeTrailingCommas(srcA)
      srcB = removeTrailingCommas(srcB)
    }

    parsedA.value = JSON.parse(srcA)
    parsedB.value = JSON.parse(srcB)

    // Calculate diff
    diffResult.value = detailedDiff(parsedA.value, parsedB.value)
  } catch (err) {
    error.value = 'Invalid JSON in one or both inputs: ' + ((err as Error)?.message || '')
  }
}

/* ---------- schema validation ---------- */
function validateAgainstSchema(): void {
  if (!ajv) {
    validationError.value = '⚠️ Validator not initialized. Please refresh the page.'
    return
  }

  // Reset state
  validationError.value = ''
  validationErrors.value = []
  isValid.value = null
  isValidating.value = true

  // Use setTimeout to show loading state
  setTimeout(() => {
    try {
      // Check if input is empty
      if (!input.value.trim()) {
        validationError.value = '❌ JSON Data is empty. Please paste JSON in the input field above.'
        isValid.value = false
        isValidating.value = false
        return
      }

      if (!schemaInput.value.trim()) {
        validationError.value = '❌ JSON Schema is empty. Please paste a schema.'
        isValid.value = false
        isValidating.value = false
        return
      }

      // Parse JSON data
      let srcData = input.value
      if (allowComments.value) srcData = stripComments(srcData)
      if (stripTrailingCommas.value) srcData = removeTrailingCommas(srcData)

      let data
      try {
        data = JSON.parse(srcData)
      } catch (parseErr) {
        validationError.value = `❌ Invalid JSON Data: ${(parseErr as Error).message}\n\nPlease check your JSON syntax in the main input field.`
        isValid.value = false
        isValidating.value = false
        return
      }

      // Parse JSON Schema
      let srcSchema = schemaInput.value
      if (allowComments.value) srcSchema = stripComments(srcSchema)
      if (stripTrailingCommas.value) srcSchema = removeTrailingCommas(srcSchema)

      let schema
      try {
        schema = JSON.parse(srcSchema)
      } catch (parseErr) {
        validationError.value = `❌ Invalid JSON Schema: ${(parseErr as Error).message}\n\nPlease check your schema syntax.`
        isValid.value = false
        isValidating.value = false
        return
      }

      // Validate
      let validate
      try {
        validate = ajv.compile(schema)
      } catch (compileErr) {
        validationError.value = `❌ Schema Compilation Error: ${(compileErr as Error).message}\n\nThe schema itself is not valid.`
        isValid.value = false
        isValidating.value = false
        return
      }

      const valid = validate(data)
      isValid.value = valid

      if (!valid && validate.errors) {
        validationErrors.value = validate.errors.map((err: any) => ({
          path: err.instancePath || '/',
          message: err.message || 'Validation failed',
          keyword: err.keyword,
          params: err.params,
          schemaPath: err.schemaPath,
        }))
      }

      isValidating.value = false
    } catch (err) {
      validationError.value = `❌ Unexpected error: ${(err as Error)?.message || 'Unknown error'}`
      isValid.value = false
      isValidating.value = false
    }
  }, 100)
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

function countObjects(val: unknown): number {
  let count = 0
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    count++ // count this object
    Object.values(val).forEach(v => {
      count += countObjects(v)
    })
  } else if (Array.isArray(val)) {
    val.forEach(v => {
      count += countObjects(v)
    })
  }
  return count
}

function countArrays(val: unknown): number {
  let count = 0
  if (Array.isArray(val)) {
    count++ // count this array
    val.forEach(v => {
      count += countArrays(v)
    })
  } else if (val && typeof val === 'object') {
    Object.values(val).forEach(v => {
      count += countArrays(v)
    })
  }
  return count
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
.input-sm { @apply text-white px-2 py-1.5 rounded border border-gray-700 bg-gray-900 text-sm w-full; }

.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.btn-action {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2;
}
.btn-icon {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-colors;
}
.btn-file {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm transition-colors;
}

.card {
  @apply bg-gray-800/60 rounded-xl p-5 border border-gray-700/50 shadow-lg;
}

.checkbox {
  @apply w-4 h-4 accent-indigo-500 rounded;
}
.checkbox-label {
  @apply flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer;
}

/* JsonViewer dark theme integration */
:deep(.jv-container) {
  background: transparent !important;
}

:deep(.jv-code) {
  background: transparent !important;
  color: #e5e7eb !important;
}

:deep(.jv-key) {
  color: #60a5fa !important;
}

:deep(.jv-item.jv-string) {
  color: #34d399 !important;
}

:deep(.jv-item.jv-number) {
  color: #fbbf24 !important;
}

:deep(.jv-item.jv-boolean) {
  color: #c084fc !important;
}

:deep(.jv-button) {
  color: #9ca3af !important;
}
</style>


