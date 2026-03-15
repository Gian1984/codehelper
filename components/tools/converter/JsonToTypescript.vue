<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🔷 JSON to TypeScript</h2>
        <p class="text-sm text-gray-400 mt-1">Convert JSON objects into TypeScript interfaces instantly</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="convert" title="Convert to TypeScript">
          ⚡ Convert
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
          placeholder='Paste your JSON here, e.g. { "name": "John", "age": 30 }'
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
        <!-- Root Interface Name -->
        <div class="space-y-2">
          <label class="label">Root Interface Name</label>
          <input v-model="rootName" class="input" placeholder="Root" />
        </div>

        <!-- Toggles -->
        <div class="space-y-3">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="addExport" />
            <span class="text-sm text-gray-300">Add <code>export</code> keyword</span>
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="optionalProps" />
            <span class="text-sm text-gray-300">Make all properties optional (<code>?</code>)</span>
          </label>
        </div>
      </div>

      <div class="mt-4 text-xs text-gray-500 border-t border-gray-800 pt-2">
        ℹ️ Nested objects and arrays are automatically converted into separate interfaces. Array item types are inferred from their contents.
      </div>
    </details>

    <!-- Output Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 TypeScript Output</label>
        <div v-if="output" class="flex items-center gap-2">
          <button class="btn" @click="copyToClipboard" title="Copy TypeScript">
            📋 Copy
          </button>
          <button class="btn" @click="downloadTs" title="Download .ts file">
            💾 Download
          </button>
        </div>
      </div>

      <div v-if="output">
        <pre class="mono-box max-h-[600px]">{{ output }}</pre>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">🔷</div>
        <p>Paste JSON above and click "Convert" to generate TypeScript interfaces</p>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* ---------- state ---------- */
const input = ref<string>('')
const output = ref<string>('')
const error = ref<string>('')
const copied = ref<boolean>(false)

const rootName = ref<string>('Root')
const addExport = ref<boolean>(true)
const optionalProps = ref<boolean>(false)

/* ---------- actions ---------- */
function clearAll(): void {
  input.value = ''
  output.value = ''
  error.value = ''
  copied.value = false
}

async function copyToClipboard(): Promise<void> {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadTs(): void {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = (rootName.value || 'Root').replace(/[^\w]/g, '_') + '.ts'
  a.click()
  URL.revokeObjectURL(url)
}

/* ---------- conversion ---------- */
function convert(): void {
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

  if (typeof parsed !== 'object' || parsed === null) {
    error.value = 'JSON must be an object or array at the top level'
    return
  }

  try {
    const interfaces: InterfaceDef[] = []
    const name = capitalize(rootName.value.trim() || 'Root')

    if (Array.isArray(parsed)) {
      const itemType = resolveArrayItemType(parsed, name + 'Item', interfaces)
      const prefix = addExport.value ? 'export ' : ''
      interfaces.push({
        name,
        body: `${prefix}type ${name} = ${wrapIfUnion(itemType)}[];`,
        isTypeAlias: true,
      })
    } else {
      buildInterface(name, parsed as Record<string, unknown>, interfaces)
    }

    output.value = interfaces
      .map(i => (i.isTypeAlias ? i.body : formatInterface(i)))
      .join('\n\n')
      .trim()
      + '\n'
  } catch (e) {
    error.value = 'Conversion error: ' + (e as Error).message
  }
}

/* ---------- types ---------- */
interface InterfaceDef {
  name: string
  props?: PropDef[]
  body?: string
  isTypeAlias?: boolean
}

interface PropDef {
  key: string
  type: string
}

/* ---------- core logic ---------- */
function buildInterface(
  name: string,
  obj: Record<string, unknown>,
  interfaces: InterfaceDef[],
): void {
  const props: PropDef[] = []

  for (const [key, value] of Object.entries(obj)) {
    props.push({
      key,
      type: resolveType(value, capitalize(key), interfaces),
    })
  }

  interfaces.push({ name, props })
}

function resolveType(
  value: unknown,
  nameHint: string,
  interfaces: InterfaceDef[],
): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return resolveArrayType(value, nameHint, interfaces)

  const t = typeof value
  if (t === 'string') return 'string'
  if (t === 'number') return 'number'
  if (t === 'boolean') return 'boolean'

  if (t === 'object') {
    const iName = ensureUniqueName(nameHint, interfaces)
    buildInterface(iName, value as Record<string, unknown>, interfaces)
    return iName
  }

  return 'unknown'
}

function resolveArrayType(
  arr: unknown[],
  nameHint: string,
  interfaces: InterfaceDef[],
): string {
  const itemType = resolveArrayItemType(arr, nameHint, interfaces)
  return `${wrapIfUnion(itemType)}[]`
}

function resolveArrayItemType(
  arr: unknown[],
  nameHint: string,
  interfaces: InterfaceDef[],
): string {
  if (arr.length === 0) return 'unknown'

  const types = new Set<string>()
  let objectHandled = false

  for (const item of arr) {
    if (item === null) {
      types.add('null')
    } else if (Array.isArray(item)) {
      const inner = resolveArrayItemType(item, nameHint, interfaces)
      types.add(`${wrapIfUnion(inner)}[]`)
    } else if (typeof item === 'object') {
      if (!objectHandled) {
        const iName = ensureUniqueName(nameHint, interfaces)
        const allObjects = arr.filter(
          i => i !== null && typeof i === 'object' && !Array.isArray(i),
        ) as Record<string, unknown>[]
        const merged = mergeObjectKeys(allObjects)
        buildInterface(iName, merged, interfaces)
        types.add(iName)
        objectHandled = true
      }
    } else {
      types.add(typeof item)
    }
  }

  if (types.size === 0) return 'unknown'
  if (types.size === 1) return [...types][0]
  return [...types].join(' | ')
}

function mergeObjectKeys(objects: Record<string, unknown>[]): Record<string, unknown> {
  const merged: Record<string, unknown> = {}
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      if (!(key in merged) || merged[key] === null) {
        merged[key] = value
      }
    }
  }
  return merged
}

function ensureUniqueName(name: string, interfaces: InterfaceDef[]): string {
  const existing = new Set(interfaces.map(i => i.name))
  if (!existing.has(name)) return name
  let i = 2
  while (existing.has(name + i)) i++
  return name + i
}

function capitalize(s: string): string {
  if (!s) return 'Root'
  const cleaned = s.replace(/[^a-zA-Z0-9_]/g, '')
  if (!cleaned) return 'Root'
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

function wrapIfUnion(type: string): string {
  return type.includes('|') ? `(${type})` : type
}

function isValidKey(key: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
}

/* ---------- formatting ---------- */
function formatInterface(def: InterfaceDef): string {
  const prefix = addExport.value ? 'export ' : ''
  const opt = optionalProps.value ? '?' : ''
  const lines: string[] = []

  lines.push(`${prefix}interface ${def.name} {`)

  for (const prop of def.props || []) {
    const key = isValidKey(prop.key) ? prop.key : `'${prop.key}'`
    lines.push(`  ${key}${opt}: ${prop.type};`)
  }

  lines.push('}')
  return lines.join('\n')
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
code {
  @apply bg-gray-800 px-1 py-0.5 rounded text-xs;
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
