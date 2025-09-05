<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">HTML Minifier</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">clear</button>
        <button class="btn" @click="minifyHtml">minify</button>
        <button class="btn-primary" @click="copyToClipboard" :disabled="!minified">copy</button>
        <button class="btn" @click="downloadHtml" :disabled="!minified">download</button>
      </div>
    </div>

    <!-- input & import -->
    <div class="space-y-2">
      <div class="flex items-center gap-3 flex-wrap">
        <label class="label">input</label>
        <label class="btn cursor-pointer">
          import .html
          <input type="file" class="hidden" accept=".html,text/html,text/plain" @change="onFile" />
        </label>
        <label class="inline-flex items-center gap-2 ml-auto">
          <input type="checkbox" v-model="autoMinifyOnPaste" class="w-4 h-4" />
          <span class="text-sm">auto-minify on paste</span>
        </label>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your HTML here…"
          class="w-full min-h-48 p-4 rounded border border-gray-800 bg-gray-950 text-white focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
          @paste="onPaste"
          spellcheck="false"
      ></textarea>

      <div class="text-xs text-gray-400 flex gap-4">
        <span>chars: {{ input.length }}</span>
        <span v-if="error" class="text-red-400">{{ error }}</span>
        <span v-if="copied" class="text-green-400">copied!</span>
      </div>
    </div>

    <!-- options -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card space-y-2">
        <label class="inline-flex items-center gap-2 mr-2">
          <input type="checkbox" v-model="opts.removeComments" class="w-4 h-4" />
          <span class="text-sm">remove comments</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.collapseWhitespace" class="w-4 h-4" />
          <span class="text-sm">collapse whitespace</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.removeBetweenTags" class="w-4 h-4" />
          <span class="text-sm">remove whitespace between tags</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.preservePreCodeTextarea" class="w-4 h-4" />
          <span class="text-sm">preserve pre/code/textarea</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.preserveScriptStyle" class="w-4 h-4" />
          <span class="text-sm">preserve script/style content</span>
        </label>
      </div>

      <div class="card space-y-2">
        <label class="inline-flex items-center gap-2 mr-2">
          <input type="checkbox" v-model="opts.minifyCss" class="w-4 h-4" />
          <span class="text-sm">minify CSS (basic)</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.minifyJs" class="w-4 h-4" />
          <span class="text-sm">minify JS (conservative)</span>
        </label>
        <label class="inline-flex items-center gap-2 mr-2">
          <input type="checkbox" v-model="opts.normalizeBooleanAttrs" class="w-4 h-4" />
          <span class="text-sm">normalize boolean attrs</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.removeDefaultTypes" class="w-4 h-4" />
          <span class="text-sm">remove default <code>type</code></span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.removeEmptyAttrs" class="w-4 h-4" />
          <span class="text-sm">remove empty attributes</span>
        </label>
      </div>

      <div class="card space-y-2">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.removeOptionalEndTags" class="w-4 h-4" />
          <span class="text-sm">remove optional end tags (safe)</span>
        </label>
        <label class="block">
          <span class="label">download filename</span>
          <input v-model="filename" class="input" placeholder="minified.html" />
        </label>
        <div class="text-xs text-gray-400" v-if="stats">
          size: {{ stats.before }} → {{ stats.after }} (saved {{ stats.saved }})
        </div>
      </div>
    </div>

    <!-- output -->
    <div v-if="minified" class="space-y-2">
      <label class="label">output</label>
      <pre class="bg-gray-950 p-4 rounded border border-gray-800 overflow-auto text-sm text-pink-300 font-mono whitespace-pre-wrap">{{ minified }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* ---------- state ---------- */
const input = ref<string>('')
const minified = ref<string>('')

const error = ref<string>('')
const copied = ref<boolean>(false)
const autoMinifyOnPaste = ref<boolean>(false)
const filename = ref<string>('minified.html')

const opts = ref({
  removeComments: true,
  collapseWhitespace: true,
  removeBetweenTags: true,
  preservePreCodeTextarea: true,
  preserveScriptStyle: true,
  minifyCss: true,
  minifyJs: false, // conservative; off by default
  normalizeBooleanAttrs: true,
  removeDefaultTypes: true,
  removeEmptyAttrs: true,
  removeOptionalEndTags: true,
})

const stats = ref<{ before: string; after: string; saved: string } | null>(null)

/* ---------- actions ---------- */
function clearAll(): void {
  input.value = ''
  minified.value = ''
  error.value = ''
  copied.value = false
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
  if (!autoMinifyOnPaste.value) return
  setTimeout(() => minifyHtml(), 0)
}

async function copyToClipboard(): Promise<void> {
  if (!minified.value) return
  await navigator.clipboard.writeText(minified.value)
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1200)
}

function downloadHtml(): void {
  if (!minified.value) return
  const blob = new Blob([minified.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName(filename.value || 'minified.html')
  a.click()
  URL.revokeObjectURL(url)
}

/* ---------- minifier ---------- */
function minifyHtml(): void {
  error.value = ''
  minified.value = ''
  stats.value = null

  const src = input.value
  const beforeBytes = bytes(src.length)

  try {
    let working = src

    // 1) protect blocks we need to preserve
    const stash = new Map<string, string>()
    let counter = 0
    const protect = (html: string, tag: string, transform?: (s: string) => string) => {
      const re = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi')
      return html.replace(re, (m) => {
        const key = `§§BLOCK_${tag.toUpperCase()}_${counter++}§§`
        const content = transform ? transform(m) : m
        stash.set(key, content)
        return key
      })
    }

    // optionally minify CSS/JS while stashing
    const minCssBlock = (block: string): string => {
      // keep tag open/close, minify inside
      const m = block.match(/^<style\b[^>]*>([\s\S]*?)<\/style>$/i)
      if (!m) return block
      const head = block.slice(0, m.index! + '<style>'.length)
      const css = m[1]
      const tail = '</style>'
      return block.replace(css, minifyCss(css))
    }

    const minJsBlock = (block: string): string => {
      const m = block.match(/^<script\b[^>]*>([\s\S]*?)<\/script>$/i)
      if (!m) return block
      const js = m[1]
      return block.replace(js, minifyJs(js))
    }

    if (opts.value.preservePreCodeTextarea) {
      working = protect(working, 'pre')
      working = protect(working, 'code')
      working = protect(working, 'textarea')
    }

    if (opts.value.preserveScriptStyle) {
      working = protect(working, 'style', opts.value.minifyCss ? minCssBlock : undefined)
      working = protect(working, 'script', opts.value.minifyJs ? minJsBlock : undefined)
    } else {
      // if not preserving, still minify CSS/JS if toggled
      if (opts.value.minifyCss) working = working.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (b) => minCssBlock(b))
      if (opts.value.minifyJs)  working = working.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (b) => minJsBlock(b))
    }

    // 2) remove HTML comments (preserving conditional comments is out-of-scope)
    if (opts.value.removeComments) {
      working = working.replace(/<!--([\s\S]*?)-->/g, '')
    }

    // 3) remove whitespace between tags
    if (opts.value.removeBetweenTags) {
      working = working.replace(/>\s+</g, '><')
    }

    // 4) collapse general whitespace sequences
    if (opts.value.collapseWhitespace) {
      // collapse runs of spaces/tabs/newlines to a single space, but keep tags intact
      working = working
          .replace(/[ \t\f\v]+/g, ' ')
          .replace(/\s*\n+\s*/g, '\n') // keep single newlines where author inserted
    }

    // 5) attributes cleanups
    if (opts.value.normalizeBooleanAttrs) {
      const boolAttrs = ['disabled','checked','selected','readonly','multiple','required','autofocus','hidden','open','controls','loop','muted','playsinline','nomodule','defer']
      for (const attr of boolAttrs) {
        const re = new RegExp(`\\s${attr}="?${attr}"?`, 'gi')
        working = working.replace(re, ` ${attr}`)
      }
    }

    if (opts.value.removeDefaultTypes) {
      // script type="text/javascript"
      working = working.replace(/(<script\b[^>]*?)\s+type=("|')text\/javascript\2([^>]*>)/gi, '$1$3')
      // style type="text/css"
      working = working.replace(/(<style\b[^>]*?)\s+type=("|')text\/css\2([^>]*>)/gi, '$1$3')
    }

    if (opts.value.removeEmptyAttrs) {
      // remove empty class/id/style/data-* and empty aria-* values
      working = working.replace(/\s(?:class|id|style|data-[\w-]+|aria-[\w-]+)=("|\')\1/gi, '')
    }

    // 6) remove some optional end tags (safe subset)
    if (opts.value.removeOptionalEndTags) {
      working = working
          .replace(/<\/(li|dt|dd|tr|th|td|option)>\s*(?=<)/gi, '')
    }

    // 7) restore stashed blocks
    for (const [key, value] of stash) {
      working = working.split(key).join(value)
    }

    // 8) trim
    working = working.trim()

    minified.value = working
    const afterBytes = bytes(working.length)
    stats.value = { before: beforeBytes, after: afterBytes, saved: savedBytes(src.length, working.length) }
  } catch (err) {
    error.value = (err as Error).message || 'Error while minifying.'
  }
}

/* ---------- helpers ---------- */
function minifyCss(css: string): string {
  // remove comments
  let s = css.replace(/\/\*[\s\S]*?\*\//g, '')
  // collapse whitespace
  s = s.replace(/\s+/g, ' ')
  // remove spaces around punctuation
  s = s.replace(/\s*([{}:;,>])\s*/g, '$1')
  // trim ; before }
  s = s.replace(/;}/g, '}')
  return s.trim()
}

function minifyJs(js: string): string {
  // VERY conservative: strip comments outside strings; collapse multiple spaces.
  let out = ''
  let i = 0
  let inStr = false as false | '"' | "'" | '`'
  let inRegex = false
  while (i < js.length) {
    const ch = js[i]
    const next = js[i + 1]

    if (!inStr && !inRegex && ch === '/' && next === '/') {
      // line comment
      i += 2
      while (i < js.length && js[i] !== '\n') i++
      continue
    }
    if (!inStr && !inRegex && ch === '/' && next === '*') {
      // block comment
      i += 2
      while (i < js.length && !(js[i] === '*' && js[i + 1] === '/')) i++
      i += 2
      continue
    }

    if (!inRegex && !inStr && (ch === '"' || ch === "'" || ch === '`')) {
      inStr = ch as typeof inStr
      out += ch
      i++
      continue
    }
    if (inStr) {
      out += ch
      if (ch === '\\') { out += js[i + 1] ?? ''; i += 2; continue }
      if (ch === inStr) inStr = false
      i++
      continue
    }

    // naive regex literal detection: after certain tokens
    if (!inRegex && ch === '/' && /[({[=:\s,;!?\-+*&|^~%]/.test(out.slice(-1) || ' ')) {
      inRegex = true
      out += ch
      i++
      continue
    }
    if (inRegex) {
      out += ch
      if (ch === '\\') { out += js[i + 1] ?? ''; i += 2; continue }
      if (ch === '/' ) { inRegex = false }
      i++
      continue
    }

    out += ch
    i++
  }
  // whitespace squeeze but keep newlines
  out = out.replace(/[ \t\f\v]+/g, ' ').replace(/\s*\n+\s*/g, '\n')
  return out.trim()
}

function bytes(n: number): string {
  if (n < 1024) return `${n} B`
  const kb = n / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}
function savedBytes(a: number, b: number): string {
  const diff = a - b
  const pct = a > 0 ? ((diff / a) * 100).toFixed(1) : '0.0'
  return `${bytes(diff)} (${pct}%)`
}
function safeName(n: string): string {
  let x = n.trim()
  if (!/\.html?$/i.test(x)) x += '.html'
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
