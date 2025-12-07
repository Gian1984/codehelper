<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">✨ XML Formatter</h2>
        <p class="text-sm text-gray-400 mt-1">Format, validate, and convert XML with advanced tools</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="formatXml" title="Format XML">
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
        <label class="label">📝 XML Input</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="btn cursor-pointer">
            📁 Import File
            <input type="file" class="hidden" accept=".xml,text/xml,application/xml" @change="onFile" />
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="autoFormatOnPaste" />
            <span class="text-sm text-gray-300">Auto-format on paste</span>
          </label>
        </div>
      </div>

      <textarea
        v-model="input"
        placeholder="Paste your XML here…"
        class="input font-mono resize-y min-h-[120px]"
        @paste="onPaste"
        spellcheck="false"
      ></textarea>

      <div class="flex items-center justify-between text-xs">
        <div class="flex gap-4 text-gray-400">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
        </div>
        <div class="flex gap-4">
          <span v-if="error" class="warn">❌ {{ error }}</span>
          <span v-if="copiedMsg" class="text-green-400 font-medium">✅ {{ copiedMsg }}</span>
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
          <label v-if="indentKind === 'spaces'" class="label mt-3">Width</label>
          <select v-if="indentKind === 'spaces'" v-model.number="indentWidth" class="input">
            <option v-for="n in [2, 3, 4, 6, 8]" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <!-- Processing Options -->
        <div class="space-y-2">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="stripWhitespace" />
            <span class="text-sm text-gray-300">Strip whitespace-only text</span>
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="includeDeclaration" />
            <span class="text-sm text-gray-300">Include XML declaration</span>
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="minify" />
            <span class="text-sm text-gray-300">Minify (no indentation)</span>
          </label>
        </div>

        <!-- Download -->
        <div class="space-y-2">
          <label class="label">Download Filename</label>
          <input v-model="filename" class="input" placeholder="formatted.xml" />
        </div>
      </div>
    </details>

    <!-- Statistics -->
    <div v-if="stats" class="card">
      <h3 class="label !mb-3">📊 XML Statistics</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="mono-box !p-3 text-center">
          <div class="text-2xl font-bold text-indigo-400 mb-1">{{ stats.elements }}</div>
          <div class="text-[10px] text-gray-400 uppercase tracking-wider">Elements</div>
        </div>
        <div class="mono-box !p-3 text-center">
          <div class="text-2xl font-bold text-green-400 mb-1">{{ stats.attributes }}</div>
          <div class="text-[10px] text-gray-400 uppercase tracking-wider">Attributes</div>
        </div>
        <div class="mono-box !p-3 text-center">
          <div class="text-2xl font-bold text-yellow-400 mb-1">{{ stats.maxDepth }}</div>
          <div class="text-[10px] text-gray-400 uppercase tracking-wider">Max Depth</div>
        </div>
        <div class="mono-box !p-3 text-center">
          <div class="text-2xl font-bold text-blue-400 mb-1">{{ stats.textNodes }}</div>
          <div class="text-[10px] text-gray-400 uppercase tracking-wider">Text Nodes</div>
        </div>
      </div>
    </div>

    <!-- Output Tabs -->
    <div class="flex items-center justify-between gap-3 border-b border-gray-700 pb-2">
      <div class="flex gap-2">
        <button
          @click="activeTab = 'xml'"
          :class="['btn', activeTab === 'xml' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
        >
          📄 XML Output
        </button>
        <button
          @click="activeTab = 'json'"
          :class="['btn', activeTab === 'json' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
          :disabled="!jsonOutput"
        >
          🔄 JSON Output
        </button>
      </div>

      <!-- Actions for formatted output -->
      <div v-if="formatted" class="flex items-center gap-2">
        <button class="btn" @click="copyFormatted" title="Copy formatted">
          📋 Copy
        </button>
        <button class="btn" @click="downloadFile" title="Download">
          💾 Download
        </button>
      </div>
    </div>

    <!-- Output Content -->
    <div class="card">
      <!-- XML Output -->
      <div v-if="activeTab === 'xml'">
        <div v-if="formatted" class="space-y-2">
          <label class="label">📄 Formatted XML</label>
          <pre class="mono-box max-h-[600px]"><code class="language-markup" v-html="highlightedXml"></code></pre>
        </div>
        <div v-else class="text-center py-16 text-gray-500">
          <div class="text-4xl mb-4">📝</div>
          <p>Paste XML above and click "Format" to see the output here</p>
        </div>
      </div>

      <!-- JSON Output -->
      <div v-if="activeTab === 'json'">
        <div v-if="jsonOutput" class="space-y-2">
          <label class="label">🔄 XML Converted to JSON</label>
          <pre class="mono-box max-h-[600px]"><code class="language-json" v-html="highlightedJson"></code></pre>
        </div>
        <div v-else class="text-center py-16 text-gray-500">
          <div class="text-4xl mb-4">🔄</div>
          <p>Format XML first to see JSON conversion</p>
        </div>
      </div>
    </div>

    <!-- XPath Tester -->
    <div class="card space-y-3">
      <button
        @click="showXPath = !showXPath"
        class="btn flex items-center gap-2"
      >
        <span>{{ showXPath ? '▼' : '▶' }}</span>
        🔍 XPath Query Tester
      </button>

      <div v-if="showXPath" class="card">
        <!-- Quick Examples -->
        <div class="space-y-2 mb-4">
          <label class="label">Quick Examples:</label>
          <div class="flex flex-wrap gap-2">
            <button @click="xpathQuery = '//*'" class="btn">All elements</button>
            <button @click="xpathQuery = '//@*'" class="btn">All attributes</button>
            <button @click="xpathQuery = '//text()'" class="btn">All text</button>
            <button @click="xpathQuery = '//*[@id]'" class="btn">Elements with @id</button>
          </div>
        </div>

        <!-- XPath Input -->
        <div class="space-y-2">
          <label class="label">XPath Query:</label>
          <div class="flex gap-2">
            <input
              v-model="xpathQuery"
              type="text"
              placeholder="Enter XPath query (e.g., //book/title)"
              class="input font-mono"
              @keyup.enter="evaluateXPath"
            />
            <button @click="evaluateXPath" class="btn-primary whitespace-nowrap">Run Query</button>
          </div>
        </div>

        <!-- XPath Error -->
        <div v-if="xpathError" class="warn mt-2">
          ❌ {{ xpathError }}
        </div>

        <!-- XPath Results -->
        <div v-if="xpathResults" class="space-y-2 mt-4">
          <label class="label">Results:</label>
          <pre class="mono-box whitespace-pre-wrap max-h-64">{{ xpathResults }}</pre>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-json'
import 'prismjs/themes/prism-tomorrow.css'

/* -------------------- State -------------------- */
const input = ref<string>('')
const formatted = ref<string>('')
const jsonOutput = ref<string>('')
const error = ref<string>('')
const copiedMsg = ref<string>('')

type IndentKind = 'spaces' | 'tabs'
const indentKind = ref<IndentKind>('spaces')
const indentWidth = ref<number>(2)
const stripWhitespace = ref<boolean>(true)
const includeDeclaration = ref<boolean>(true)
const minify = ref<boolean>(false)

const autoFormatOnPaste = ref<boolean>(false)
const filename = ref<string>('formatted.xml')

interface XmlStats {
  elements: number
  attributes: number
  maxDepth: number
  textNodes: number
}
const stats = ref<XmlStats | null>(null)

type Tab = 'xml' | 'json'
const activeTab = ref<Tab>('xml')

// XPath
const showXPath = ref<boolean>(false)
const xpathQuery = ref<string>('')
const xpathResults = ref<string>('')
const xpathError = ref<string>('')

let parsedDoc: Document | null = null

/* -------------------- Computed -------------------- */
const highlightedXml = computed<string>(() => {
  if (!formatted.value) return ''
  return Prism.highlight(formatted.value, Prism.languages.markup, 'markup')
})

const highlightedJson = computed<string>(() => {
  if (!jsonOutput.value) return ''
  return Prism.highlight(jsonOutput.value, Prism.languages.json, 'json')
})

/* -------------------- Actions -------------------- */
function clearAll(): void {
  input.value = ''
  formatted.value = ''
  jsonOutput.value = ''
  error.value = ''
  copiedMsg.value = ''
  stats.value = null
  parsedDoc = null
  xpathQuery.value = ''
  xpathResults.value = ''
  xpathError.value = ''
}

function onFile(e: Event): void {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    input.value = String(reader.result ?? '')
  }
  reader.readAsText(file)
}

function onPaste(): void {
  if (!autoFormatOnPaste.value) return
  setTimeout(() => formatXml(), 0)
}

function toast(msg: string): void {
  copiedMsg.value = msg
  window.setTimeout(() => (copiedMsg.value = ''), 1200)
}

async function copyFormatted(): Promise<void> {
  const text = activeTab.value === 'json' ? jsonOutput.value : formatted.value
  if (!text) return
  await navigator.clipboard.writeText(text)
  toast('copied!')
}

function downloadFile(): void {
  if (activeTab.value === 'json') {
    if (!jsonOutput.value) return
    const blob = new Blob([jsonOutput.value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = safeName(filename.value.replace(/\.xml$/, '') + '.json')
    a.click()
    URL.revokeObjectURL(url)
  } else {
    if (!formatted.value) return
    const blob = new Blob([formatted.value], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = safeName(filename.value || 'formatted.xml')
    a.click()
    URL.revokeObjectURL(url)
  }
}

/* -------------------- Formatter -------------------- */
function formatXml(): void {
  error.value = ''
  formatted.value = ''
  jsonOutput.value = ''
  stats.value = null
  parsedDoc = null

  if (!input.value.trim()) return

  try {
    // Parse XML
    const parser = new DOMParser()
    const doc = parser.parseFromString(input.value, 'application/xml')

    // Check for parse errors
    const parseError = doc.getElementsByTagName('parsererror')
    if (parseError.length > 0) {
      const msg = parseError[0].textContent || 'XML parse error'
      throw new Error(msg.replace(/\s+/g, ' ').trim())
    }

    parsedDoc = doc

    // Format XML
    const indent = indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value)
    const declaration = includeDeclaration.value ? '<?xml version="1.0" encoding="UTF-8"?>\n' : ''

    let body: string
    if (minify.value) {
      body = serializeMinified(doc)
    } else {
      body = serializePretty(doc, indent)
    }

    formatted.value = declaration + body

    // Calculate stats
    stats.value = calculateStats(doc)

    // Convert to JSON
    if (doc.documentElement) {
      const jsonObj = xmlToJson(doc.documentElement)
      jsonOutput.value = JSON.stringify(jsonObj, null, 2)
    }
  } catch (err) {
    error.value = (err as Error).message || 'Invalid XML'
  }
}

/* -------------------- Serializers -------------------- */
function serializePretty(doc: Document, indent: string): string {
  const lines: string[] = []

  const walk = (node: Node, depth: number): void => {
    const pad = indent.repeat(depth)

    if (node.nodeType === 1) { // Element
      const el = node as Element
      const tagName = el.tagName
      const attrs = Array.from(el.attributes)
        .map(a => `${a.name}="${escapeAttr(a.value)}"`)
        .join(' ')

      const openTag = attrs ? `<${tagName} ${attrs}>` : `<${tagName}>`

      const children = Array.from(el.childNodes).filter(n => {
        if (stripWhitespace.value && n.nodeType === 3) {
          return (n.nodeValue || '').trim() !== ''
        }
        return true
      })

      if (children.length === 0) {
        lines.push(`${pad}<${tagName}${attrs ? ' ' + attrs : ''}/>`)
      } else if (children.length === 1 && children[0].nodeType === 3) {
        // Inline text
        const text = escapeText(children[0].nodeValue || '')
        lines.push(`${pad}<${tagName}${attrs ? ' ' + attrs : ''}>${text}</${tagName}>`)
      } else {
        lines.push(`${pad}${openTag}`)
        children.forEach(child => walk(child, depth + 1))
        lines.push(`${pad}</${tagName}>`)
      }
    } else if (node.nodeType === 3) { // Text
      const text = (node.nodeValue || '').trim()
      if (text) {
        lines.push(`${pad}${escapeText(text)}`)
      }
    } else if (node.nodeType === 4) { // CDATA
      lines.push(`${pad}<![CDATA[${(node as CDATASection).data}]]>`)
    } else if (node.nodeType === 8) { // Comment
      lines.push(`${pad}<!-- ${(node as Comment).data} -->`)
    }
  }

  if (doc.documentElement) {
    walk(doc.documentElement, 0)
  }

  return lines.join('\n')
}

function serializeMinified(doc: Document): string {
  const serializer = new XMLSerializer()
  let xml = serializer.serializeToString(doc)

  // Remove whitespace between tags
  xml = xml.replace(/>\s+</g, '><')

  // Strip declaration if present (we add it separately)
  xml = xml.replace(/<\?xml[^?]*\?>\s*/, '')

  return xml.trim()
}

/* -------------------- XML to JSON -------------------- */
function xmlToJson(el: Element): any {
  const obj: any = {}

  // Add attributes
  if (el.attributes.length > 0) {
    obj['@attributes'] = {}
    Array.from(el.attributes).forEach(attr => {
      obj['@attributes'][attr.name] = attr.value
    })
  }

  // Process children
  const children = Array.from(el.childNodes)

  if (children.length === 1 && children[0].nodeType === 3) {
    // Text-only node
    return children[0].nodeValue?.trim() || ''
  }

  children.forEach(child => {
    if (child.nodeType === 1) {
      const childEl = child as Element
      const childObj = xmlToJson(childEl)

      if (obj[childEl.tagName]) {
        // Multiple children with same name - make array
        if (!Array.isArray(obj[childEl.tagName])) {
          obj[childEl.tagName] = [obj[childEl.tagName]]
        }
        obj[childEl.tagName].push(childObj)
      } else {
        obj[childEl.tagName] = childObj
      }
    } else if (child.nodeType === 3) {
      const text = child.nodeValue?.trim()
      if (text) {
        obj['#text'] = text
      }
    }
  })

  return obj
}

/* -------------------- Statistics -------------------- */
function calculateStats(doc: Document): XmlStats {
  let elements = 0
  let attributes = 0
  let maxDepth = 0
  let textNodes = 0

  const walk = (node: Node, depth: number): void => {
    maxDepth = Math.max(maxDepth, depth)

    if (node.nodeType === 1) {
      elements++
      const el = node as Element
      attributes += el.attributes.length
      Array.from(el.childNodes).forEach(child => walk(child, depth + 1))
    } else if (node.nodeType === 3) {
      if ((node.nodeValue || '').trim()) {
        textNodes++
      }
    }
  }

  if (doc.documentElement) {
    walk(doc.documentElement, 0)
  }

  return { elements, attributes, maxDepth, textNodes }
}

/* -------------------- XPath Evaluator -------------------- */
function evaluateXPath(): void {
  xpathResults.value = ''
  xpathError.value = ''

  if (!parsedDoc) {
    xpathError.value = 'Please format XML first'
    return
  }

  if (!xpathQuery.value.trim()) {
    xpathError.value = 'Enter an XPath query'
    return
  }

  try {
    const result = parsedDoc.evaluate(
      xpathQuery.value,
      parsedDoc.documentElement!,
      null,
      XPathResult.ANY_TYPE,
      null
    )

    const results: string[] = []
    let node = result.iterateNext()

    while (node) {
      if (node.nodeType === 1) {
        // Element node
        results.push((node as Element).outerHTML)
      } else if (node.nodeType === 2) {
        // Attribute node
        results.push(`${(node as Attr).name}="${(node as Attr).value}"`)
      } else if (node.nodeType === 3) {
        // Text node
        results.push((node as Text).nodeValue || '')
      } else {
        results.push(node.toString())
      }

      node = result.iterateNext()
    }

    if (results.length === 0) {
      xpathResults.value = 'No results found'
    } else {
      xpathResults.value = `Found ${results.length} result(s):\n\n${results.join('\n\n')}`
    }
  } catch (err) {
    xpathError.value = (err as Error).message || 'XPath evaluation failed'
  }
}

/* -------------------- Helpers -------------------- */
function escapeText(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function safeName(n: string): string {
  let x = n.trim()
  if (!/\.(xml|json)$/i.test(x)) x += '.xml'
  return x.replace(/[^\w.\-]+/g, '_')
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
