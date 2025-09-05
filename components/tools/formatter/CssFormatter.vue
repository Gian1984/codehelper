<template>
  <div class="p-6 sm:p-8 bg-gray-800 rounded-2xl shadow-xl space-y-6 text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">CSS Minifier & Beautifier</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">clear</button>
        <button class="btn" @click="processCss">run</button>
        <button class="btn-primary" @click="copyOut" :disabled="!output">copy</button>
        <button class="btn" @click="downloadOutput" :disabled="!output">download</button>
      </div>
    </div>

    <!-- mode -->
    <div class="flex items-center gap-4 flex-wrap">
      <label class="label">mode</label>
      <select v-model="mode" class="input w-40">
        <option value="minify">Minify</option>
        <option value="beautify">Beautify</option>
      </select>

      <label class="btn cursor-pointer ml-auto">
        import .css
        <input type="file" class="hidden" accept=".css,text/css,text/plain" @change="onFile" />
      </label>

      <label class="inline-flex items-center gap-2">
        <input type="checkbox" v-model="autoRunOnPaste" class="w-4 h-4" />
        <span class="text-sm">auto-run on paste</span>
      </label>
    </div>

    <!-- input -->
    <div class="space-y-2">
      <textarea
          v-model="input"
          placeholder="Paste your CSS here…"
          class="w-full min-h-48 bg-gray-950 text-white p-4 rounded border border-gray-800 resize-y font-mono"
          spellcheck="false"
          @paste="onPaste"
      ></textarea>
      <div class="text-xs text-gray-400 flex gap-4">
        <span>chars: {{ input.length }}</span>
        <span v-if="stats">size: {{ stats.before }} → {{ stats.after }} (saved {{ stats.saved }})</span>
        <span v-if="error" class="text-red-400">{{ error }}</span>
        <span v-if="copied" class="text-green-400">copied!</span>
      </div>
    </div>

    <!-- options -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- minify options -->
      <div v-if="mode==='minify'" class="card space-y-2">
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="min.keepComments" class="w-4 h-4" /><span class="text-sm">keep comments</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="min.hexShorten" class="w-4 h-4" /><span class="text-sm">shorten hex colors</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="min.zeroUnits" class="w-4 h-4" /><span class="text-sm">drop units on zero</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="min.leadingZero" class="w-4 h-4" /><span class="text-sm">trim leading zero</span></label>
        <label class="inline-flex items-center gap-2 mr-2"><input type="checkbox" v-model="min.shortenZeroLists" class="w-4 h-4" /><span class="text-sm">collapse zero shorthands</span></label>
      </div>

      <!-- beautify options -->
      <div v-else class="card space-y-3">
        <label class="block">
          <span class="label">indent type</span>
          <select v-model="beaut.indentKind" class="input">
            <option value="spaces">spaces</option>
            <option value="tabs">tabs</option>
          </select>
        </label>
        <label v-if="beaut.indentKind==='spaces'" class="block">
          <span class="label">indent width</span>
          <select v-model.number="beaut.indentWidth" class="input">
            <option v-for="n in [2,3,4,6,8]" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>
        <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="beaut.keepComments" class="w-4 h-4" /><span class="text-sm">keep comments</span></label>
      </div>

      <!-- filename -->
      <div class="card space-y-2">
        <label class="block">
          <span class="label">download filename</span>
          <input v-model="filename" class="input" placeholder="style.css" />
        </label>
        <button class="btn" @click="processCss">apply</button>
      </div>
    </div>

    <!-- output -->
    <div v-if="output" class="space-y-2">
      <label class="label">result</label>
      <textarea
          readonly
          :value="output"
          class="w-full min-h-48 bg-gray-950 text-white p-4 rounded border border-gray-800 resize-y font-mono"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
type BeautifyOpts = { indent: string; keepComments: boolean }

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
      pushLine(cleaned)
    }
    if (j < css.length && css[j] === ';') {
      pushLine(';')
      j++
    }
    i = j
  }

  return out.trim()
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
.label { @apply text-sm text-gray-300; }
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
</style>

