<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">📐 JSON Schema Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Generate a JSON Schema (Draft 7) from any JSON object or array</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="generate" title="Generate JSON Schema">
          ⚡ Generate
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <label class="label">📝 JSON Input</label>
      <textarea
          v-model="input"
          placeholder='Paste your JSON here, e.g. { "name": "John", "age": 30, "active": true }'
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
          <label class="label">Schema Title</label>
          <input v-model="schemaTitle" class="input" placeholder="e.g. UserProfile" />
        </div>
        <div class="space-y-3 pt-6">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="markRequired" />
            <span class="text-sm text-gray-300">Mark all properties as required</span>
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="addDescriptions" />
            <span class="text-sm text-gray-300">Add description placeholders</span>
          </label>
        </div>
      </div>
    </details>

    <!-- Output Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 JSON Schema Output</label>
        <div v-if="output" class="flex items-center gap-2">
          <button class="btn" @click="copyToClipboard" title="Copy">📋 Copy</button>
          <button class="btn" @click="downloadSchema" title="Download">💾 Download</button>
        </div>
      </div>
      <div v-if="output">
        <pre class="mono-box max-h-[600px] whitespace-pre-wrap">{{ output }}</pre>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">📐</div>
        <p>Paste JSON above and click "Generate" to create a JSON Schema</p>
      </div>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const error = ref('')
const copied = ref(false)
const schemaTitle = ref('')
const markRequired = ref(true)
const addDescriptions = ref(false)

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
  copied.value = false
}

async function copyToClipboard() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadSchema() {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = (schemaTitle.value.trim() || 'schema').replace(/[^\w]/g, '_') + '.schema.json'
  a.click()
  URL.revokeObjectURL(url)
}

function generate() {
  error.value = ''
  output.value = ''
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

  const schema = buildSchema(parsed) as Record<string, unknown>
  const root: Record<string, unknown> = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    ...schema,
  }
  if (schemaTitle.value.trim()) root.title = schemaTitle.value.trim()
  output.value = JSON.stringify(root, null, 2)
}

function buildSchema(value: unknown): Record<string, unknown> {
  if (value === null) return { type: 'null' }
  if (Array.isArray(value)) return buildArraySchema(value)

  const t = typeof value
  if (t === 'string') {
    const s: Record<string, unknown> = { type: 'string' }
    if (addDescriptions.value) s.description = ''
    return s
  }
  if (t === 'number') {
    const s: Record<string, unknown> = { type: Number.isInteger(value) ? 'integer' : 'number' }
    if (addDescriptions.value) s.description = ''
    return s
  }
  if (t === 'boolean') {
    const s: Record<string, unknown> = { type: 'boolean' }
    if (addDescriptions.value) s.description = ''
    return s
  }
  if (t === 'object') return buildObjectSchema(value as Record<string, unknown>)
  return {}
}

function buildObjectSchema(obj: Record<string, unknown>): Record<string, unknown> {
  const properties: Record<string, unknown> = {}
  const keys = Object.keys(obj)
  for (const key of keys) properties[key] = buildSchema(obj[key])
  const schema: Record<string, unknown> = { type: 'object', properties }
  if (markRequired.value && keys.length > 0) schema.required = keys
  if (addDescriptions.value) schema.description = ''
  return schema
}

function buildArraySchema(arr: unknown[]): Record<string, unknown> {
  const schema: Record<string, unknown> = { type: 'array' }
  if (arr.length === 0) {
    schema.items = {}
  } else {
    const itemSchemas = arr.map(item => buildSchema(item))
    schema.items = mergeSchemas(itemSchemas)
  }
  if (addDescriptions.value) schema.description = ''
  return schema
}

function mergeSchemas(schemas: Record<string, unknown>[]): Record<string, unknown> {
  if (schemas.length === 0) return {}
  if (schemas.length === 1) return schemas[0]

  const types = new Set<string>()
  let mergedProps: Record<string, unknown> | null = null
  let mergedReq: Set<string> | null = null
  let hasObject = false

  for (const s of schemas) {
    const t = s.type as string | undefined
    if (t) types.add(t)
    if (t === 'object' && s.properties) {
      hasObject = true
      const props = s.properties as Record<string, unknown>
      if (!mergedProps) {
        mergedProps = { ...props }
      } else {
        for (const [key, val] of Object.entries(props)) {
          if (!(key in mergedProps)) mergedProps[key] = val
        }
      }
      const req = s.required as string[] | undefined
      if (req) {
        if (!mergedReq) {
          mergedReq = new Set(req)
        } else {
          for (const k of mergedReq) {
            if (!req.includes(k)) mergedReq.delete(k)
          }
        }
      }
    }
  }

  if (types.size === 1) {
    const type = [...types][0]
    if (type === 'object' && hasObject && mergedProps) {
      const result: Record<string, unknown> = { type: 'object', properties: mergedProps }
      if (markRequired.value && mergedReq && mergedReq.size > 0) result.required = [...mergedReq]
      if (addDescriptions.value) result.description = ''
      return result
    }
    return schemas[0]
  }

  if (!hasObject) {
    const result: Record<string, unknown> = { type: [...types] }
    if (addDescriptions.value) result.description = ''
    return result
  }

  const unique = new Map<string, Record<string, unknown>>()
  for (const s of schemas) {
    const key = JSON.stringify(s)
    if (!unique.has(key)) unique.set(key, s)
  }
  if (unique.size === 1) return schemas[0]
  return { anyOf: [...unique.values()] }
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
