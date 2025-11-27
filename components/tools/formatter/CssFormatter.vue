<template>
  <div class="p-6 sm:p-8 bg-gray-800 rounded-2xl shadow-xl space-y-6 text-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold text-white">CSS Formatter</h2>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-secondary" @click="clearAll">Clear</button>
        <button class="btn-primary" @click="processCss">Format CSS</button>
        <button class="btn-primary" @click="copyOut" :disabled="!output">
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
        <button class="btn-secondary" @click="downloadOutput" :disabled="!output">Download</button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="text-sm font-medium text-gray-300">🎨 CSS Input</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="text-xs font-medium text-gray-400 uppercase tracking-wider">Mode:</label>
          <select v-model="mode" class="select-input-sm">
            <option value="minify">Minify</option>
            <option value="beautify">Beautify</option>
          </select>
          <label class="btn-secondary cursor-pointer text-sm ml-2">
            Import .css
            <input type="file" class="hidden" accept=".css,text/css,text/plain" @change="onFile" />
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="autoRunOnPaste" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-400">Auto-run on paste</span>
          </label>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your CSS here…"
          class="w-full min-h-48 p-4 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm resize-y transition-all"
          spellcheck="false"
          @paste="onPaste"
      ></textarea>

      <div class="flex items-center justify-between gap-3 text-xs">
        <span class="text-gray-400">{{ input.length.toLocaleString() }} characters</span>
        <div class="flex gap-3">
          <span v-if="error" class="text-red-400">❌ {{ error }}</span>
          <span v-if="copied && !error" class="text-green-400">✓ Copied to clipboard!</span>
        </div>
      </div>
    </div>

    <!-- Options -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <h3 class="text-sm font-medium text-gray-300 mb-4">⚙️ Formatting Options</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Minify Options -->
        <div v-if="mode === 'minify'" class="space-y-3">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Minify Options</p>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="min.keepComments" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Keep comments</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="min.hexShorten" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Shorten hex colors</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="min.zeroUnits" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Drop units on zero</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="min.leadingZero" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Trim leading zero</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="min.shortenZeroLists" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Collapse zero shorthands</span>
          </label>
        </div>

        <!-- Beautify Options -->
        <div v-else class="space-y-3">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Beautify Options</p>
          <label class="block">
            <span class="text-xs font-medium text-gray-400 mb-1.5 block">Indent Type</span>
            <select v-model="beaut.indentKind" class="select-input">
              <option value="spaces">Spaces</option>
              <option value="tabs">Tabs</option>
            </select>
          </label>
          <label v-if="beaut.indentKind === 'spaces'" class="block">
            <span class="text-xs font-medium text-gray-400 mb-1.5 block">Indent Width</span>
            <select v-model.number="beaut.indentWidth" class="select-input">
              <option v-for="n in [2, 3, 4, 6, 8]" :key="n" :value="n">{{ n }} spaces</option>
            </select>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="beaut.keepComments" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Keep comments</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="beaut.sortProperties" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Sort properties alphabetically</span>
          </label>
        </div>

        <!-- Output Settings -->
        <div class="space-y-3">
          <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Output Settings</p>
          <label class="block">
            <span class="text-xs font-medium text-gray-400 mb-1.5 block">Download Filename</span>
            <input v-model="filename" class="text-input" placeholder="style.css" />
          </label>
        </div>
      </div>
    </div>

    <!-- Output -->
    <div v-if="output" class="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      <div class="bg-gray-800/50 border-b border-gray-700 px-5 py-3 flex items-center justify-between gap-3">
        <span class="text-sm font-medium text-gray-300">📄 CSS Output</span>
        <span class="text-xs text-gray-400">{{ mode === 'minify' ? 'Minified' : 'Beautified' }}</span>
      </div>
      <div class="p-5">
        <pre class="bg-black p-4 rounded-lg border border-gray-700 overflow-auto max-h-[600px] text-sm font-mono"><code class="language-css" v-html="highlightedOutput"></code></pre>
      </div>
    </div>

    <!-- Statistics -->
    <div v-if="stats" class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <h3 class="text-sm font-medium text-gray-300 mb-4">📊 Statistics</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-black rounded-lg p-4 text-center border border-gray-800">
          <div class="text-2xl font-bold text-blue-400 mb-1">{{ stats.before }}</div>
          <div class="text-xs text-gray-400 uppercase tracking-wider">Original Size</div>
        </div>
        <div class="bg-black rounded-lg p-4 text-center border border-gray-800">
          <div class="text-2xl font-bold text-green-400 mb-1">{{ stats.after }}</div>
          <div class="text-xs text-gray-400 uppercase tracking-wider">Output Size</div>
        </div>
        <div class="bg-black rounded-lg p-4 text-center border border-gray-800">
          <div class="text-2xl font-bold text-yellow-400 mb-1">{{ stats.saved }}</div>
          <div class="text-xs text-gray-400 uppercase tracking-wider">Saved</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-css'
import 'prismjs/themes/prism-tomorrow.css'

type Mode = 'minify' | 'beautify'

/* ---------- state ---------- */
const input = ref<string>('')
const output = ref<string>('')
const mode = ref<Mode>('minify')

const filename = ref<string>('style.css')
const error = ref<string>('')
const copied = ref<boolean>(false)
const autoRunOnPaste = ref<boolean>(false)

const stats = ref<{ before: string; after: string; saved: string } | null>(null)

/* minify options */
const min = ref({
  keepComments: false,
  hexShorten: true,
  zeroUnits: true,
  leadingZero: true,
  shortenZeroLists: true,
})

/* beautify options */
type IndentKind = 'spaces' | 'tabs'
const beaut = ref({
  indentKind: 'spaces' as IndentKind,
  indentWidth: 2,
  keepComments: true,
  sortProperties: false,
})

/* computed */
const highlightedOutput = computed<string>(() => {
  if (!output.value) return ''
  return Prism.highlight(output.value, Prism.languages.css, 'css')
})

/* ---------- actions ---------- */
function onFile(e: Event): void {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => (input.value = String(reader.result ?? ''))
  reader.readAsText(file)
}

function onPaste(): void {
  if (autoRunOnPaste.value) setTimeout(() => processCss(), 0)
}

async function copyOut(): Promise<void> {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadOutput(): void {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName(filename.value || 'style.css')
  a.click()
  URL.revokeObjectURL(url)
}

function clearAll(): void {
  input.value = ''
  output.value = ''
  error.value = ''
  stats.value = null
}

/* ---------- core ---------- */
function processCss(): void {
  error.value = ''
  output.value = ''
  stats.value = null
  const src = input.value
  const before = src.length

  try {
    let result = ''

    if (mode.value === 'minify') {
      result = minifyCss(src, {
        keepComments: min.value.keepComments,
        hexShorten: min.value.hexShorten,
        zeroUnits: min.value.zeroUnits,
        leadingZero: min.value.leadingZero,
        shortenZeroLists: min.value.shortenZeroLists,
      })
    } else {
      result = beautifyCss(src, {
        indent: beaut.value.indentKind === 'tabs' ? '\t' : ' '.repeat(beaut.value.indentWidth),
        keepComments: beaut.value.keepComments,
        sortProperties: beaut.value.sortProperties,
      })
    }

    output.value = result
    const after = result.length
    stats.value = { before: bytes(before), after: bytes(after), saved: savings(before, after) }
  } catch (err) {
    error.value = (err as Error).message || 'Formatting error'
  }
}

/* ---------- minifier (tokenizer; safe for strings/urls/calc) ---------- */
type MinifyOpts = {
  keepComments: boolean
  hexShorten: boolean
  zeroUnits: boolean
  leadingZero: boolean
  shortenZeroLists: boolean
}

function minifyCss(css: string, opts: MinifyOpts): string {
  let out = ''
  let i = 0
  let inStr: false | '"' | "'" = false
  let inComment = false
  let lastNonWs = ''

  const isWs = (c: string) => c === ' ' || c === '\n' || c === '\t' || c === '\r' || c === '\f'
  const isIdent = (c: string) => /[A-Za-z0-9_\-]/.test(c)

  while (i < css.length) {
    const ch = css[i]
    const next = css[i + 1]

    // comments
    if (!inStr && !inComment && ch === '/' && next === '*') {
      // read the comment
      let j = i + 2
      while (j < css.length && !(css[j] === '*' && css[j + 1] === '/')) j++
      const comment = css.slice(i, j + 2)
      i = j + 2
      if (opts.keepComments) out += comment
      continue
    }

    // strings
    if (!inStr && (ch === '"' || ch === "'")) {
      inStr = ch as '"' | "'"
      out += ch
      i++
      continue
    }
    if (inStr) {
      out += ch
      if (ch === '\\') { out += css[i + 1] ?? ''; i += 2; continue }
      if (ch === inStr) inStr = false
      i++
      continue
    }

    // whitespace
    if (isWs(ch)) {
      // keep a single space only when needed (identifier-next to identifier)
      let j = i + 1
      while (j < css.length && isWs(css[j])) j++
      const prevId = isIdent(lastNonWs.slice(-1))
      const nextId = isIdent(css[j] || '')
      if (prevId && nextId) out += ' '
      i = j
      continue
    }

    // punctuation tightening
    if (/[:;{},>~+()\[\]=]/.test(ch)) {
      // remove any space before
      if (out.endsWith(' ')) out = out.slice(0, -1)
      out += ch
      lastNonWs = ch
      i++
      continue
    }

    out += ch
    lastNonWs = ch
    i++
  }

  // remove trailing semicolons before }
  out = out.replace(/;}/g, '}')

  // color: #AABBCC -> #abc
  if (opts.hexShorten) {
    out = out.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3\b/g, (_, r, g, b) =>
        '#' + String(r).toLowerCase() + String(g).toLowerCase() + String(b).toLowerCase()
    )
  }

  // 0px -> 0 (and similar units)
  if (opts.zeroUnits) {
    out = out.replace(/(\s|[:(,])0(?:px|em|rem|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc|ex|ch)\b/g, '$10')
  }

  // 0.5 -> .5
  if (opts.leadingZero) {
    out = out.replace(/\b0\.(\d+)/g, '.$1')
  }

  // margin:0 0 0 0 -> margin:0
  if (opts.shortenZeroLists) {
    out = out.replace(/:(?:\s*0)(?:\s+0){1,3}(?=;|})/g, ':0')
  }

  return out.trim()
}

/* ---------- beautifier ---------- */
type BeautifyOpts = { indent: string; keepComments: boolean; sortProperties: boolean }

function beautifyCss(css: string, opts: BeautifyOpts): string {
  const indent = opts.indent
  let out = ''
  let level = 0
  let i = 0
  let inStr: false | '"' | "'" = false

  const pushLine = (line: string) => {
    if (!line) return
    out += indent.repeat(Math.max(level, 0)) + line + '\n'
  }

  while (i < css.length) {
    const ch = css[i]
    const next = css[i + 1]

    // comments
    if (!inStr && ch === '/' && next === '*') {
      let j = i + 2
      while (j < css.length && !(css[j] === '*' && css[j + 1] === '/')) j++
      const comment = css.slice(i, j + 2)
      if (opts.keepComments) pushLine(comment.trim())
      i = j + 2
      continue
    }

    // strings
    if (!inStr && (ch === '"' || ch === "'")) {
      inStr = ch as '"' | "'"
      let buf = ch
      i++
      while (i < css.length) {
        const c = css[i]
        buf += c
        if (c === '\\') { buf += css[i + 1] ?? ''; i += 2; continue }
        i++
        if (c === inStr) break
      }
      pushLine(buf)
      inStr = false
      continue
    }

    if (ch === '{') {
      pushLine('{')
      level++
      i++
      continue
    }
    if (ch === '}') {
      level--
      pushLine('}')
      i++
      continue
    }

    // collect a rule or declaration until ; or { or }
    let j = i
    while (j < css.length && !/[;{}]/.test(css[j])) j++
    const seg = css.slice(i, j).trim()
    if (seg) {
      // add a space after colon in declarations (prop: value)
      const cleaned = seg.replace(/\s*:\s*/g, ': ')
          .replace(/\s*,\s*/g, ', ')
          .replace(/\s*>\s*/g, ' > ')
          .replace(/\s*\+\s*/g, ' + ')
          .replace(/\s*~\s*/g, ' ~ ')

      // Append semicolon to the line if present (don't create separate line)
      if (j < css.length && css[j] === ';') {
        pushLine(cleaned + ';')
        j++
      } else {
        pushLine(cleaned)
      }
    } else if (j < css.length && css[j] === ';') {
      // Skip standalone semicolons (empty declarations)
      j++
    }
    i = j
  }

  let result = out.trim()

  // Sort properties alphabetically if requested
  if (opts.sortProperties) {
    result = sortCssProperties(result, indent)
  }

  return result
}

/* ---------- property sorter ---------- */
function sortCssProperties(css: string, indent: string): string {
  const lines = css.split('\n')
  const result: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // If line contains {, collect properties until }
    if (line.includes('{')) {
      result.push(line)
      i++

      // Collect all property lines
      const props: string[] = []
      while (i < lines.length && !lines[i].includes('}')) {
        const propLine = lines[i].trim()
        if (propLine && !propLine.startsWith('/*') && !propLine.startsWith('//')) {
          props.push(propLine)
        } else if (propLine) {
          result.push(lines[i]) // Keep comments in place
        }
        i++
      }

      // Sort properties alphabetically
      props.sort((a, b) => {
        const aProp = a.split(':')[0].trim()
        const bProp = b.split(':')[0].trim()
        return aProp.localeCompare(bProp)
      })

      // Add sorted properties with proper indentation
      props.forEach(prop => {
        const level = (line.match(/^\s*/)?.[0].length || 0) / indent.length + 1
        result.push(indent.repeat(level) + prop)
      })

      // Add closing brace
      if (i < lines.length) {
        result.push(lines[i])
        i++
      }
    } else {
      result.push(line)
      i++
    }
  }

  return result.join('\n')
}

/* ---------- tiny utils ---------- */
function bytes(n: number): string {
  if (n < 1024) return `${n} B`
  const kb = n / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}
function savings(a: number, b: number): string {
  const diff = a - b
  const pct = a > 0 ? ((diff / a) * 100).toFixed(1) : '0.0'
  return `${bytes(diff)} (${pct}%)`
}
function safeName(n: string): string {
  const base = (n.trim() || 'style.css').replace(/[^\w.\-]+/g, '_')
  return base.endsWith('.css') ? base : base + '.css'
}
</script>

<style scoped>
.select-input {
  @apply w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white text-sm;
  @apply focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent;
  @apply transition-all;
}

.select-input-sm {
  @apply px-2.5 py-1.5 rounded-lg border border-gray-700 bg-black text-white text-xs;
  @apply focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent;
  @apply transition-all;
}

.text-input {
  @apply w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white text-sm;
  @apply focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent;
  @apply font-mono transition-all;
}

.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm font-medium;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40;
}

.btn-secondary {
  @apply bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm font-medium;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply transition-all;
}
</style>

