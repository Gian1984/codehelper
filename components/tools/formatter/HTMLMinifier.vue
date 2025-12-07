<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">⚡ HTML Optimizer</h2>
        <p class="text-sm text-gray-400 mt-1">Minify, beautify, and optimize your HTML code</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear</button>
        <button class="btn" @click="beautifyHtml" :disabled="loading || minifierLoading || !input.trim()">
          <span v-if="loading && mode === 'beautify'">Beautifying...</span>
          <span v-else-if="minifierLoading">Loading...</span>
          <span v-else>Beautify</span>
        </button>
        <button class="btn-primary" @click="minifyHtml" :disabled="loading || minifierLoading || !input.trim()">
          <span v-if="loading && mode === 'minify'">Minifying...</span>
          <span v-else-if="minifierLoading">Loading...</span>
          <span v-else>Minify</span>
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">Input HTML</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="btn cursor-pointer">
            Import File
            <input type="file" class="hidden" accept=".html,text/html,text/plain" @change="onFile" />
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="autoProcessOnPaste" />
            <span class="text-sm text-gray-300">Auto-process on paste</span>
          </label>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your HTML code here (full documents, fragments, or HTML with PHP/template tags are all supported)..."
          class="input font-mono resize-y min-h-[120px]"
          @paste="onPaste"
          spellcheck="false"
      ></textarea>

      <div class="flex items-center justify-between text-xs text-gray-400">
        <div class="flex gap-4">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
          <span v-if="stats">Size: {{ stats.before }}</span>
        </div>
        <div class="flex gap-4">
          <span v-if="minifierLoading" class="text-blue-400">⏳ Loading optimizer...</span>
          <span v-else-if="minifierError" class="warn">{{ minifierError }}</span>
          <span v-else-if="error" class="warn">{{ error }}</span>
          <span v-if="copied" class="text-green-400 font-medium">✓ Copied!</span>
        </div>
      </div>
    </div>

    <!-- Options -->
    <div class="card">
      <h3 class="label">⚙️ Options</h3>
      <div class="flex flex-wrap gap-4">
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="opts.removeComments" />
          <span class="text-sm text-gray-300">Remove HTML comments</span>
        </label>
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="opts.collapseWhitespace" />
          <span class="text-sm text-gray-300">Collapse whitespace</span>
        </label>
      </div>
    </div>

    <!-- Output Section -->
    <div v-if="minified" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-3">
          <label class="label">Output</label>
          <span v-if="stats" class="text-xs px-2 py-1 bg-green-800/30 text-green-400 rounded-full font-medium">
            Saved {{ stats.saved }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn" @click="copyToClipboard" title="Copy to clipboard">
            📋 Copy
          </button>
          <button class="btn" @click="downloadHtml" title="Download file">
            💾 Download
          </button>
        </div>
      </div>

      <div class="relative">
        <pre class="mono-box max-h-96">{{ minified }}</pre>
      </div>

      <div class="flex items-center justify-between text-xs text-gray-400">
        <div class="flex gap-4">
          <span>Characters: {{ minified.length.toLocaleString() }}</span>
          <span v-if="stats">{{ stats.before }} → {{ stats.after }}</span>
        </div>
        <div>
          <label class="inline-flex items-center gap-2">
            <span class="text-gray-400">Filename:</span>
            <input v-model="filename" class="input" placeholder="optimized.html" />
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
const minifierLoading = ref<boolean>(false)
const minifierError = ref<string>('')

onMounted(async () => {
  await loadMinifier()
})

async function loadMinifier(retryCount = 0): Promise<void> {
  if (htmlMinifier) return // Already loaded
  if (typeof window === 'undefined') return

  minifierLoading.value = true
  minifierError.value = ''

  try {
    const module = await import('html-minifier-terser')
    htmlMinifier = module
  } catch (err) {
    console.error('Failed to load html-minifier-terser:', err)

    // Retry up to 2 times
    if (retryCount < 2) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return loadMinifier(retryCount + 1)
    }

    minifierError.value = 'Failed to load HTML optimizer. Please refresh the page.'
  } finally {
    minifierLoading.value = false
  }
}

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

  // Wait for minifier to load if still loading
  if (minifierLoading.value) {
    let waited = 0
    while (minifierLoading.value && waited < 5000) {
      await new Promise(resolve => setTimeout(resolve, 100))
      waited += 100
    }
  }

  // Check if html-minifier-terser is loaded
  if (!htmlMinifier) {
    // Try to load it one more time
    await loadMinifier()

    if (!htmlMinifier) {
      error.value = minifierError.value || '⚠️ HTML Optimizer not initialized. Please refresh the page.'
      loading.value = false
      mode.value = null
      return
    }
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
    // Flexible minification options that work with HTML fragments and PHP
    const minifierOptions: any = {
      removeComments: opts.value.removeComments,
      collapseWhitespace: opts.value.collapseWhitespace,

      // More permissive settings for fragments and mixed content
      removeAttributeQuotes: false,
      minifyCSS: false,
      minifyJS: false,
      caseSensitive: false,

      // Allow fragments (no DOCTYPE required)
      html5: true,

      // Preserve PHP tags and other server-side code
      ignoreCustomFragments: [
        /<\?[\s\S]*?\?>/,  // PHP tags
        /<%[\s\S]*?%>/,     // ASP/JSP tags
        /<\{[\s\S]*?\}>/    // Template tags
      ],

      // Don't fail on invalid HTML - try to parse it anyway
      continueOnParseError: true,
    }

    // Minify using html-minifier-terser
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
      error.value = `⚠️ Parse error in HTML. The optimizer processed what it could. Check output carefully.`
      // Still try to show something if possible
      minified.value = src
    } else if (errorMsg.includes('Unexpected token')) {
      error.value = `⚠️ Unexpected token found. The HTML may contain syntax issues or server-side code.`
      minified.value = src
    } else {
      error.value = `⚠️ ${errorMsg}. Original HTML shown below.`
      minified.value = src
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

  // Wait for minifier to load if still loading
  if (minifierLoading.value) {
    let waited = 0
    while (minifierLoading.value && waited < 5000) {
      await new Promise(resolve => setTimeout(resolve, 100))
      waited += 100
    }
  }

  // Check if html-minifier-terser is loaded
  if (!htmlMinifier) {
    // Try to load it one more time
    await loadMinifier()

    if (!htmlMinifier) {
      error.value = minifierError.value || '⚠️ HTML Optimizer not initialized. Please refresh the page.'
      loading.value = false
      mode.value = null
      return
    }
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

      // Allow fragments (no DOCTYPE required)
      html5: true,

      // Preserve PHP tags and other server-side code
      ignoreCustomFragments: [
        /<\?[\s\S]*?\?>/,  // PHP tags
        /<%[\s\S]*?%>/,     // ASP/JSP tags
        /<\{[\s\S]*?\}>/    // Template tags
      ],

      // Don't fail on invalid HTML - try to parse it anyway
      continueOnParseError: true,
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

    // More graceful error handling - try to format anyway
    if (errorMsg.includes('Parse Error')) {
      error.value = `⚠️ Parse error in HTML. Attempting basic formatting...`
      minified.value = formatHtml(src)
    } else if (errorMsg.includes('Unexpected token')) {
      error.value = `⚠️ Unexpected token found. Attempting basic formatting...`
      minified.value = formatHtml(src)
    } else {
      error.value = `⚠️ ${errorMsg}. Attempting basic formatting...`
      minified.value = formatHtml(src)
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

  // Preserve PHP and server-side code blocks
  const preservedBlocks: string[] = []
  let blockIndex = 0

  // Replace PHP and server-side code with placeholders
  let processed = html
    .replace(/<\?[\s\S]*?\?>/g, (match) => {
      const placeholder = `__PRESERVED_BLOCK_${blockIndex}__`
      preservedBlocks[blockIndex] = match
      blockIndex++
      return placeholder
    })
    .replace(/<%[\s\S]*?%>/g, (match) => {
      const placeholder = `__PRESERVED_BLOCK_${blockIndex}__`
      preservedBlocks[blockIndex] = match
      blockIndex++
      return placeholder
    })

  // Simple HTML formatter
  processed.split(/(<[^>]+>)/g).forEach(part => {
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
    // Text content or preserved blocks
    else {
      const trimmed = part.trim()
      if (trimmed) {
        formatted += tab.repeat(indent) + trimmed + '\n'
      }
    }
  })

  // Restore preserved blocks
  let result = formatted.trim()
  preservedBlocks.forEach((block, index) => {
    result = result.replace(`__PRESERVED_BLOCK_${index}__`, block)
  })

  return result
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
.label {
  @apply text-sm font-medium text-gray-300 block mb-2;
}
.sub {
  @apply block text-[10px] text-gray-400 mb-1 uppercase tracking-wide;
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
