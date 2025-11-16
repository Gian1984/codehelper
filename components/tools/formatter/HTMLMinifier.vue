<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">HTML Optimizer</h2>
        <p class="text-sm text-gray-400 mt-1">Minify, beautify, and optimize your HTML code</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear</button>
        <button class="btn-secondary" @click="beautifyHtml" :disabled="loading || !input.trim()">
          <span v-if="loading && mode === 'beautify'">Beautifying...</span>
          <span v-else>Beautify</span>
        </button>
        <button class="btn-primary" @click="minifyHtml" :disabled="loading || !input.trim()">
          <span v-if="loading && mode === 'minify'">Minifying...</span>
          <span v-else>Minify</span>
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label font-medium">Input HTML</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="btn-file cursor-pointer">
            Import File
            <input type="file" class="hidden" accept=".html,text/html,text/plain" @change="onFile" />
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="autoProcessOnPaste" class="w-4 h-4 accent-indigo-500" />
            <span class="text-sm text-gray-300">Auto-process on paste</span>
          </label>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your HTML code here..."
          class="w-full min-h-48 p-4 rounded-lg border-2 border-gray-700 bg-gray-950 text-white focus:outline-none focus:border-indigo-500 font-mono resize-y transition-colors"
          @paste="onPaste"
          spellcheck="false"
      ></textarea>

      <div class="flex items-center justify-between text-xs text-gray-400">
        <div class="flex gap-4">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
          <span v-if="stats">Size: {{ stats.before }}</span>
        </div>
        <div class="flex gap-4">
          <span v-if="error" class="text-red-400 font-medium">{{ error }}</span>
          <span v-if="copied" class="text-green-400 font-medium">✓ Copied!</span>
        </div>
      </div>
    </div>

    <!-- Options -->
    <div class="card">
      <h3 class="label font-medium mb-3">Options</h3>
      <div class="flex flex-wrap gap-4">
        <label class="checkbox-label">
          <input type="checkbox" v-model="opts.removeComments" class="checkbox" />
          <span>Remove HTML comments</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="opts.collapseWhitespace" class="checkbox" />
          <span>Collapse whitespace</span>
        </label>
      </div>
    </div>

    <!-- Output Section -->
    <div v-if="minified" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-3">
          <label class="label font-medium">Output</label>
          <span v-if="stats" class="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full font-medium">
            Saved {{ stats.saved }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn-icon" @click="copyToClipboard" title="Copy to clipboard">
            📋 Copy
          </button>
          <button class="btn-icon" @click="downloadHtml" title="Download file">
            💾 Download
          </button>
        </div>
      </div>

      <div class="relative">
        <pre class="bg-gray-950 p-4 rounded-lg border-2 border-gray-700 overflow-auto max-h-96 text-sm text-emerald-300 font-mono whitespace-pre-wrap">{{ minified }}</pre>
      </div>

      <div class="flex items-center justify-between text-xs text-gray-400">
        <div class="flex gap-4">
          <span>Characters: {{ minified.length.toLocaleString() }}</span>
          <span v-if="stats">{{ stats.before }} → {{ stats.after }}</span>
        </div>
        <div>
          <label class="inline-flex items-center gap-2">
            <span class="text-gray-400">Filename:</span>
            <input v-model="filename" class="input-sm" placeholder="optimized.html" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

/* ---------- html-minifier-terser ---------- */
// Lazy load html-minifier-terser only on client side
let htmlMinifier: any = null

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const module = await import('html-minifier-terser')
    htmlMinifier = module
  }
})

/* ---------- state ---------- */
const input = ref<string>('')
const minified = ref<string>('')

const error = ref<string>('')
const copied = ref<boolean>(false)
const loading = ref<boolean>(false)
const mode = ref<'minify' | 'beautify' | null>(null)
const autoProcessOnPaste = ref<boolean>(false)
const filename = ref<string>('optimized.html')

const opts = ref({
  removeComments: true,
  collapseWhitespace: true,
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
  if (!autoProcessOnPaste.value) return
  // Auto-minify by default on paste
  setTimeout(() => minifyHtml(), 100)
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
async function minifyHtml(): Promise<void> {
  error.value = ''
  minified.value = ''
  stats.value = null
  loading.value = true
  mode.value = 'minify'

  // Check if html-minifier-terser is loaded
  if (!htmlMinifier) {
    error.value = '⚠️ HTML Optimizer not initialized. Please refresh the page.'
    loading.value = false
    mode.value = null
    return
  }

  // Check if input is empty
  if (!input.value.trim()) {
    error.value = '❌ Input is empty. Please paste HTML in the input field above.'
    loading.value = false
    mode.value = null
    return
  }

  const src = input.value
  const beforeBytes = bytes(src.length)

  try {
    // Simple minification options that work reliably
    const minifierOptions: any = {
      removeComments: opts.value.removeComments,
      collapseWhitespace: opts.value.collapseWhitespace,

      // Safe defaults
      removeAttributeQuotes: false,
      minifyCSS: false,
      minifyJS: false,
      caseSensitive: false,
    }

    // Minify using html-minifier-terser
    // Note: htmlMinifier.minify can be sync or async depending on options
    // Always await to handle both cases safely
    const result = await Promise.resolve(htmlMinifier.minify(src, minifierOptions))

    minified.value = result
    const afterBytes = bytes(result.length)
    stats.value = {
      before: beforeBytes,
      after: afterBytes,
      saved: savedBytes(src.length, result.length)
    }
  } catch (err) {
    const errorMsg = (err as Error).message || 'Unknown error'

    // Provide helpful error messages
    if (errorMsg.includes('Parse Error')) {
      error.value = `❌ HTML Parse Error: ${errorMsg}. Please check your HTML syntax.`
    } else if (errorMsg.includes('Unexpected token')) {
      error.value = `❌ Syntax Error: ${errorMsg}. There may be an issue with inline JS/CSS.`
    } else {
      error.value = `❌ Error while minifying: ${errorMsg}`
    }
  } finally {
    loading.value = false
    mode.value = null
  }
}

/* ---------- beautifier ---------- */
async function beautifyHtml(): Promise<void> {
  error.value = ''
  minified.value = ''
  stats.value = null
  loading.value = true
  mode.value = 'beautify'

  // Check if html-minifier-terser is loaded
  if (!htmlMinifier) {
    error.value = '⚠️ HTML Optimizer not initialized. Please refresh the page.'
    loading.value = false
    mode.value = null
    return
  }

  // Check if input is empty
  if (!input.value.trim()) {
    error.value = '❌ Input is empty. Please paste HTML in the input field above.'
    loading.value = false
    mode.value = null
    return
  }

  const src = input.value
  const beforeBytes = bytes(src.length)

  try {
    // Beautify: keep everything, just normalize and format
    const beautifyOptions: any = {
      collapseWhitespace: false,
      removeComments: opts.value.removeComments,

      // Safe defaults
      removeAttributeQuotes: false,
      minifyCSS: false,
      minifyJS: false,
      caseSensitive: false,
    }

    // Use html-minifier-terser for basic normalization
    const result = await Promise.resolve(htmlMinifier.minify(src, beautifyOptions))

    // Add indentation for better readability
    const formatted = formatHtml(result)

    minified.value = formatted
    const afterBytes = bytes(formatted.length)
    stats.value = {
      before: beforeBytes,
      after: afterBytes,
      saved: savedBytes(src.length, formatted.length)
    }
  } catch (err) {
    const errorMsg = (err as Error).message || 'Unknown error'

    if (errorMsg.includes('Parse Error')) {
      error.value = `❌ HTML Parse Error: ${errorMsg}. Please check your HTML syntax.`
    } else if (errorMsg.includes('Unexpected token')) {
      error.value = `❌ Syntax Error: ${errorMsg}. There may be an issue with inline JS/CSS.`
    } else {
      error.value = `❌ Error while beautifying: ${errorMsg}`
    }
  } finally {
    loading.value = false
    mode.value = null
  }
}

/* ---------- format html with indentation ---------- */
function formatHtml(html: string): string {
  let formatted = ''
  let indent = 0
  const tab = '  '

  // Simple HTML formatter
  html.split(/(<[^>]+>)/g).forEach(part => {
    if (!part.trim()) return

    // Check if it's a tag
    if (part.startsWith('<')) {
      // Closing tag
      if (part.startsWith('</')) {
        indent = Math.max(0, indent - 1)
        formatted += tab.repeat(indent) + part + '\n'
      }
      // Self-closing or single tag
      else if (part.endsWith('/>') || part.match(/<(img|br|hr|input|meta|link|area|base|col|embed|param|source|track|wbr)/i)) {
        formatted += tab.repeat(indent) + part + '\n'
      }
      // Opening tag
      else {
        formatted += tab.repeat(indent) + part + '\n'
        if (!part.match(/<(script|style|pre|code|textarea)/i)) {
          indent++
        }
      }
    }
    // Text content
    else {
      const trimmed = part.trim()
      if (trimmed) {
        formatted += tab.repeat(indent) + trimmed + '\n'
      }
    }
  })

  return formatted.trim()
}

/* ---------- helpers ---------- */
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
.input { @apply text-white w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-900; }
.input-sm { @apply text-white px-2 py-1 rounded border border-gray-700 bg-gray-900 text-sm; }

.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-secondary {
  @apply bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
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
</style>
