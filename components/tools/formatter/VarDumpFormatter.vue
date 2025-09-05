<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Var Dump Formatter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">clear</button>
        <button class="btn" @click="formatDump">format</button>
        <button class="btn-primary" @click="copyToClipboard" :disabled="!formatted">copy</button>
        <button class="btn" @click="downloadDump" :disabled="!formatted">download</button>
      </div>
    </div>

    <!-- input -->
    <div class="space-y-2">
      <div class="flex items-center gap-3 flex-wrap">
        <label class="label">input</label>
        <label class="btn cursor-pointer">
          import .txt
          <input type="file" class="hidden" accept=".txt,text/plain" @change="onFile" />
        </label>
        <label class="inline-flex items-center gap-2 ml-auto">
          <input type="checkbox" v-model="autoFormatOnPaste" class="w-4 h-4" />
          <span class="text-sm">auto-format on paste</span>
        </label>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your var_dump()/print_r() or JSON here…"
          class="w-full min-h-48 p-4 rounded border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
          @paste="onPaste"
          spellcheck="false"
      ></textarea>

      <div class="text-xs text-gray-400 flex gap-4">
        <span>chars: {{ input.length }}</span>
        <span v-if="detected" class="text-gray-500">detected: {{ detected }}</span>
        <span v-if="error" class="text-red-400">{{ error }}</span>
        <span v-if="copied" class="text-green-400">copied!</span>
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
          <input type="checkbox" v-model="collapseBlankLines" class="w-4 h-4" />
          <span class="text-sm">collapse blank lines</span>
        </label>
      </div>

      <div class="card space-y-3">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="lineNumbers" class="w-4 h-4" />
          <span class="text-sm">show line numbers</span>
        </label>
        <label class="block">
          <span class="label">download filename</span>
          <input v-model="filename" class="input" placeholder="vardump.txt" />
        </label>
      </div>

      <div class="card space-y-2">
        <button class="btn" @click="formatDump">apply formatting</button>
        <div class="text-xs text-gray-400">
          understands common <code>var_dump</code>, <code>print_r</code>, and JSON. it won’t change your data—just whitespace/spacing.
        </div>
      </div>
    </div>

    <!-- output -->
    <div v-if="formatted" class="space-y-2">
      <label class="label">output</label>
      <pre
          class="bg-gray-950 p-4 rounded border border-gray-800 overflow-auto text-sm text-green-300 font-mono whitespace-pre"
      >{{ numbered }}</pre>
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
/*
  typical inputs:
  array(2) {
    ["foo"]=>
    string(3) "bar"
    [0]=>
    int(42)
  }
  object(Foo)#1 (2) {
    ["a"]=>
    int(1)
    ["b"]=>
    array(1) {
      [0]=>
      string(3) "x"
    }
  }
*/
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

    // collapse extra blank lines
  }

  let result = out.join('\n')
  if (collapseBlankLines.value) {
    result = result.replace(/\n{3,}/g, '\n\n')
  }
  return result.trim() + '\n'
}

/* ----- print_r style (parentheses-based) ----- */
/*
  Array
  (
      [foo] => bar
      [arr] => Array
          (
              [0] => 1
          )
  )
*/
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
.label { @apply text-sm text-gray-300; }
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
</style>

