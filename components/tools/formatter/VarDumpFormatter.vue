<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🐘 Var Dump Formatter</h2>
        <p class="text-sm text-gray-400 mt-1">Format, beautify, and analyze PHP var_dump and print_r outputs</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="formatDump" title="Format Output">
          ✨ Format
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">📝 Input Dump</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="btn cursor-pointer">
            📁 Import File
            <input type="file" class="hidden" accept=".txt,text/plain" @change="onFile" />
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="autoFormatOnPaste" />
            <span class="text-sm text-gray-300">Auto-format on paste</span>
          </label>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your var_dump()/print_r() or JSON here…"
          class="input font-mono resize-y min-h-[120px]"
          spellcheck="false"
          @paste="onPaste"
      ></textarea>

      <div class="flex items-center justify-between text-xs">
        <div class="flex gap-4 text-gray-400">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
          <span v-if="detected">Detected: <span class="text-indigo-400 uppercase">{{ detected }}</span></span>
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
        ⚙️ Format Options
      </summary>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Indentation -->
        <div class="space-y-2">
          <label class="label">Indent Type</label>
          <select v-model="indentKind" class="input">
            <option value="spaces">Spaces</option>
            <option value="tabs">Tabs</option>
          </select>
          <label v-if="indentKind==='spaces'" class="label mt-3">Width</label>
          <select v-if="indentKind==='spaces'" v-model.number="indentWidth" class="input">
            <option v-for="n in [2,3,4,6,8]" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <!-- Toggles -->
        <div class="space-y-2">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="collapseBlankLines" />
            <span class="text-sm text-gray-300">Collapse blank lines</span>
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="lineNumbers" />
            <span class="text-sm text-gray-300">Show line numbers</span>
          </label>
        </div>

        <!-- Download -->
        <div class="space-y-2">
          <label class="label">Download Filename</label>
          <input v-model="filename" class="input" placeholder="vardump.txt" />
        </div>
      </div>
      
      <div class="mt-4 text-xs text-gray-500 border-t border-gray-800 pt-2">
        ℹ️ Supports common <code>var_dump</code>, <code>print_r</code>, and JSON formats. It adjusts whitespace/indentation without altering data.
      </div>
    </details>

    <!-- Output Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 Formatted Output</label>
        <div v-if="formatted" class="flex items-center gap-2">
          <button class="btn" @click="copyToClipboard" title="Copy formatted">
            📋 Copy
          </button>
          <button class="btn" @click="downloadDump" title="Download result">
            💾 Download
          </button>
        </div>
      </div>

      <div v-if="formatted">
        <pre class="mono-box max-h-[600px]">{{ numbered }}</pre>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">📝</div>
        <p>Paste a dump above and click "Format" to see the output here</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/* ---------- state ---------- */
const input = ref<string>('')
const formatted = ref<string>('')

const error = ref<string>('')
const copied = ref<boolean>(false)
const detected = ref<'var_dump'|'print_r'|'json'|''>('')

type IndentKind = 'spaces' | 'tabs'
const indentKind = ref<IndentKind>('spaces')
const indentWidth = ref<number>(2)
const collapseBlankLines = ref<boolean>(true)
const lineNumbers = ref<boolean>(false)
const autoFormatOnPaste = ref<boolean>(false)
const filename = ref<string>('vardump.txt')

/* ---------- actions ---------- */
function clearAll(): void {
  input.value = ''
  formatted.value = ''
  error.value = ''
  detected.value = ''
  copied.value = false
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
  setTimeout(() => formatDump(), 0)
}

async function copyToClipboard(): Promise<void> {
  if (!formatted.value) return
  await navigator.clipboard.writeText(formatted.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadDump(): void {
  if (!formatted.value) return
  const blob = new Blob([formatted.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName(filename.value || 'vardump.txt')
  a.click()
  URL.revokeObjectURL(url)
}

/* ---------- formatting ---------- */
function formatDump(): void {
  error.value = ''
  formatted.value = ''
  detected.value = ''

  const raw = normalizeEol(input.value)
  if (!raw.trim()) return

  try {
    // JSON?
    const j = tryFormatJson(raw)
    if (j) {
      detected.value = 'json'
      formatted.value = j
      return
    }

    // Heuristics to choose var_dump vs print_r
    if (/=>\s*/.test(raw) || /\}\s*$/.test(raw) || /object\(/i.test(raw)) {
      detected.value = 'var_dump'
      formatted.value = formatVarDump(raw)
    } else {
      detected.value = 'print_r'
      formatted.value = formatPrintR(raw)
    }
  } catch (err) {
    const msg = (err as Error).message || 'formatting error'
    error.value = msg
  }
}

function tryFormatJson(src: string): string | null {
  const t = src.trim()
  if (!(t.startsWith('{') || t.startsWith('['))) return null
  try {
    const obj = JSON.parse(t)
    return JSON.stringify(obj, null, indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value))
  } catch {
    return null
  }
}

/* ----- var_dump style formatter (brace-based) ----- */
function formatVarDump(src: string): string {
  const unit = indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value)
  const lines = normalizeEol(src).split('\n')
  const out: string[] = []
  let depth = 0

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\s+$/g, '') // trim right

    // normalize spacing around =>
    line = line.replace(/\s*=>\s*/g, ' => ')

    const trimmed = line.trim()

    // decrement depth if line is a closing brace alone
    if (/^\}$/.test(trimmed)) {
      depth = Math.max(0, depth - 1)
    }

    // indent this line
    out.push(unit.repeat(depth) + trimmed)

    // increment after openers
    if (/\{\s*$/.test(trimmed)) {
      depth++
      continue
    }

    // some dumps show key => type(...) { on same line (rare); handle it
    const openInline = trimmed.match(/\{\s*$/)
    if (openInline) depth++
  }

  let result = out.join('\n')
  if (collapseBlankLines.value) {
    result = result.replace(/\n{3,}/g, '\n\n')
  }
  return result.trim() + '\n'
}

/* ----- print_r style (parentheses-based) ----- */
function formatPrintR(src: string): string {
  const unit = indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value)
  const lines = normalizeEol(src).split('\n')
  const out: string[] = []
  let depth = 0

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\s+$/g, '') // rtrim
    // normalize "=>" spacing
    line = line.replace(/\s*=>\s*/g, ' => ')
    const trimmed = line.trim()

    // closing parenthesis on its own line
    if (/^\)$/.test(trimmed)) {
      depth = Math.max(0, depth - 1)
      out.push(unit.repeat(depth) + trimmed)
      continue
    }

    // lines that are just "(" increase depth after printing
    if (/^\($/.test(trimmed)) {
      out.push(unit.repeat(depth) + trimmed)
      depth++
      continue
    }

    // "Array" line stays at current depth
    if (/^Array\b/.test(trimmed)) {
      out.push(unit.repeat(depth) + trimmed)
      continue
    }

    // regular key/value lines
    out.push(unit.repeat(depth) + trimmed)
  }

  let result = out.join('\n')
  if (collapseBlankLines.value) result = result.replace(/\n{3,}/g, '\n\n')
  return result.trim() + '\n'
}

/* ---------- presentation helpers ---------- */
const numbered = computed(() => {
  if (!formatted.value || !lineNumbers.value) return formatted.value
  const lines = formatted.value.replace(/\n$/,'').split('\n')
  const pad = String(lines.length).length
  return lines.map((l, i) => String(i + 1).padStart(pad, ' ') + '  ' + l).join('\n') + '\n'
})

/* ---------- tiny utils ---------- */
function normalizeEol(s: string): string {
  return s.replace(/\r\n/g, '\n')
}
function safeName(n: string): string {
  const base = (n.trim() || 'vardump.txt').replace(/[^\w.\-]+/g, '_')
  return base.endsWith('.txt') ? base : base + '.txt'
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
/* Checkbox styles */
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

