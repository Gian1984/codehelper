<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold text-white">XML Formatter</h2>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-secondary" @click="clearAll">Clear</button>
        <button class="btn-primary" @click="formatXml">Format XML</button>
        <button class="btn-primary" @click="copyToClipboard" :disabled="!formatted">
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
        <button class="btn-secondary" @click="downloadXml" :disabled="!formatted">Download</button>
      </div>
    </div>

    <!-- input section -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="text-sm font-medium text-gray-300">📝 XML Input</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="btn-secondary cursor-pointer text-sm">
            Import .xml
            <input type="file" class="hidden" accept=".xml,text/xml,application/xml" @change="onFile" />
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="autoFormatOnPaste" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-400">Auto-format on paste</span>
          </label>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your XML here…"
          class="w-full min-h-48 p-4 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm resize-y transition-all"
          @paste="onPaste"
          spellcheck="false"
      ></textarea>

      <div class="flex items-center justify-between gap-3 text-xs">
        <span class="text-gray-400">{{ input.length.toLocaleString() }} characters</span>
        <div class="flex gap-3">
          <span v-if="error" class="text-red-400">❌ {{ error }}</span>
          <span v-if="copied && !error" class="text-green-400">✓ Copied to clipboard!</span>
        </div>
      </div>
    </div>

    <!-- options -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <h3 class="text-sm font-medium text-gray-300 mb-4">⚙️ Formatting Options</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Indentation -->
        <div class="space-y-3">
          <label class="block">
            <span class="text-xs font-medium text-gray-400 mb-1.5 block">Indent Type</span>
            <select v-model="indentKind" class="select-input">
              <option value="spaces">Spaces</option>
              <option value="tabs">Tabs</option>
            </select>
          </label>
          <label v-if="indentKind === 'spaces'" class="block">
            <span class="text-xs font-medium text-gray-400 mb-1.5 block">Indent Width</span>
            <select v-model.number="indentWidth" class="select-input">
              <option v-for="n in [2, 3, 4, 6, 8]" :key="n" :value="n">{{ n }} spaces</option>
            </select>
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="stripWhitespaceText" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Strip whitespace-only text nodes</span>
          </label>
        </div>

        <!-- XML Declaration -->
        <div class="space-y-3">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="includeXmlDecl" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs font-medium text-gray-300">Include XML declaration</span>
          </label>

          <div class="grid grid-cols-2 gap-2">
            <label class="block">
              <span class="text-xs font-medium text-gray-400 mb-1.5 block">Version</span>
              <input v-model="xmlVersion" class="text-input" />
            </label>
            <label class="block">
              <span class="text-xs font-medium text-gray-400 mb-1.5 block">Encoding</span>
              <input v-model="xmlEncoding" class="text-input" />
            </label>
          </div>

          <label class="block">
            <span class="text-xs font-medium text-gray-400 mb-1.5 block">Line Endings</span>
            <select v-model="lineEndings" class="select-input">
              <option value="lf">LF (\n)</option>
              <option value="crlf">CRLF (\r\n)</option>
            </select>
          </label>
        </div>

        <!-- Output Options -->
        <div class="space-y-3">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="minify" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs font-medium text-gray-300">Minify (no indentation)</span>
          </label>
          <label class="block">
            <span class="text-xs font-medium text-gray-400 mb-1.5 block">Download Filename</span>
            <input v-model="filename" class="text-input" placeholder="formatted.xml" />
          </label>
        </div>
      </div>
    </div>

    <!-- output -->
    <div v-if="formatted" class="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      <!-- Tab Header -->
      <div class="bg-gray-800/50 border-b border-gray-700 px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div class="flex gap-2">
          <button
            @click="activeTab = 'xml'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === 'xml'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
            ]"
          >
            📄 XML Output
          </button>
          <button
            @click="activeTab = 'json'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === 'json'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
            ]"
          >
            🔄 JSON Output
          </button>
        </div>
        <span class="text-xs text-gray-400">{{ activeTab === 'xml' ? 'Formatted XML' : 'Converted to JSON' }}</span>
      </div>

      <!-- Tab Content -->
      <div class="p-5">
        <!-- XML Output -->
        <div v-if="activeTab === 'xml'">
          <pre class="bg-black p-4 rounded-lg border border-gray-700 overflow-auto max-h-[600px] text-sm font-mono"><code class="language-markup" v-html="highlightedXml"></code></pre>
        </div>

        <!-- JSON Output -->
        <div v-if="activeTab === 'json'">
          <pre class="bg-black p-4 rounded-lg border border-gray-700 overflow-auto max-h-[600px] text-sm font-mono"><code class="language-json" v-html="highlightedJson"></code></pre>
        </div>
      </div>
    </div>

    <!-- statistics -->
    <div v-if="stats" class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <h3 class="text-sm font-medium text-gray-300 mb-4">📊 XML Statistics</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-black rounded-lg p-4 text-center border border-gray-800">
          <div class="text-3xl font-bold text-indigo-400 mb-1">{{ stats.elements }}</div>
          <div class="text-xs text-gray-400 uppercase tracking-wider">Elements</div>
        </div>
        <div class="bg-black rounded-lg p-4 text-center border border-gray-800">
          <div class="text-3xl font-bold text-green-400 mb-1">{{ stats.attributes }}</div>
          <div class="text-xs text-gray-400 uppercase tracking-wider">Attributes</div>
        </div>
        <div class="bg-black rounded-lg p-4 text-center border border-gray-800">
          <div class="text-3xl font-bold text-yellow-400 mb-1">{{ stats.maxDepth }}</div>
          <div class="text-xs text-gray-400 uppercase tracking-wider">Max Depth</div>
        </div>
        <div class="bg-black rounded-lg p-4 text-center border border-gray-800">
          <div class="text-3xl font-bold text-blue-400 mb-1">{{ stats.textNodes }}</div>
          <div class="text-xs text-gray-400 uppercase tracking-wider">Text Nodes</div>
        </div>
      </div>
    </div>

    <!-- xpath tester -->
    <div v-if="formatted" class="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      <button
        @click="showXpathTester = !showXpathTester"
        class="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-800 transition-colors"
      >
        <span class="text-sm font-medium text-gray-300">🔍 XPath Query Tester</span>
        <span class="text-gray-400 text-sm">{{ showXpathTester ? '▼ Hide' : '▶ Show' }}</span>
      </button>

      <div v-if="showXpathTester" class="p-5 space-y-4 border-t border-gray-700 bg-gray-900">
        <!-- Common XPath examples -->
        <div class="space-y-2">
          <label class="text-xs font-medium text-gray-400 uppercase tracking-wider">Quick Examples:</label>
          <div class="flex flex-wrap gap-2">
            <button @click="insertXPathExample('//*')" class="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors">All elements</button>
            <button @click="insertXPathExample('//@*')" class="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors">All attributes</button>
            <button @click="insertXPathExample('//text()')" class="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors">All text</button>
            <button @click="insertXPathExample('//*[@id]')" class="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors">Elements with @id</button>
            <button @click="insertXPathExample('//*/text()[normalize-space()]')" class="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors">Non-empty text</button>
          </div>
        </div>

        <!-- XPath input -->
        <div class="space-y-2">
          <label class="text-xs font-medium text-gray-400 uppercase tracking-wider">XPath Query:</label>
          <div class="flex gap-2">
            <input
              v-model="xpathQuery"
              type="text"
              placeholder="Enter XPath query (e.g., //book/title)"
              class="flex-1 px-4 py-2.5 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm transition-all"
              @keyup.enter="evaluateXPath"
            />
            <button @click="evaluateXPath" class="btn-primary whitespace-nowrap">Run Query</button>
          </div>
          <div v-if="xpathError" class="text-xs text-red-400 flex items-center gap-1.5">
            <span>❌</span>
            <span>{{ xpathError }}</span>
          </div>
        </div>

        <!-- Results -->
        <div v-if="xpathResults" class="space-y-2">
          <label class="text-xs font-medium text-gray-400 uppercase tracking-wider">Results:</label>
          <pre class="bg-black p-4 rounded-lg border border-gray-700 text-xs text-green-300 font-mono whitespace-pre-wrap overflow-auto max-h-64">{{ xpathResults }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-json'
import 'prismjs/themes/prism-tomorrow.css'

/** state */
const input = ref<string>('')
const formatted = ref<string>('')
const error = ref<string>('')

const copied = ref<boolean>(false)
const autoFormatOnPaste = ref<boolean>(false)

interface XmlStats {
  elements: number
  attributes: number
  maxDepth: number
  textNodes: number
}
const stats = ref<XmlStats | null>(null)

type OutputTab = 'xml' | 'json'
const activeTab = ref<OutputTab>('xml')
const jsonOutput = ref<string>('')

// XPath tester
const xpathQuery = ref<string>('')
const xpathResults = ref<string>('')
const xpathError = ref<string>('')
const showXpathTester = ref<boolean>(false)

type IndentKind = 'spaces' | 'tabs'
type LineEndings = 'lf' | 'crlf'

const indentKind = ref<IndentKind>('spaces')
const indentWidth = ref<number>(2)
const stripWhitespaceText = ref<boolean>(true)

const includeXmlDecl = ref<boolean>(true)
const xmlVersion = ref<string>('1.0')
const xmlEncoding = ref<string>('UTF-8')

const lineEndings = ref<LineEndings>('lf')
const minify = ref<boolean>(false)
const filename = ref<string>('formatted.xml')

/** computed */
const highlightedXml = computed<string>(() => {
  if (!formatted.value) return ''
  return Prism.highlight(formatted.value, Prism.languages.markup, 'markup')
})

const highlightedJson = computed<string>(() => {
  if (!jsonOutput.value) return ''
  return Prism.highlight(jsonOutput.value, Prism.languages.json, 'json')
})

/** actions */
function clearAll(): void {
  input.value = ''
  formatted.value = ''
  jsonOutput.value = ''
  error.value = ''
  copied.value = false
  stats.value = null
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
  // let v-model update first
  setTimeout(() => formatXml(), 0)
}

async function copyToClipboard(): Promise<void> {
  const textToCopy = activeTab.value === 'json' ? jsonOutput.value : formatted.value
  if (!textToCopy) return
  await navigator.clipboard.writeText(textToCopy)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1200)
}

function downloadXml(): void {
  if (activeTab.value === 'json') {
    if (!jsonOutput.value) return
    const blob = new Blob([jsonOutput.value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const baseName = filename.value.replace(/\.xml$/, '') || 'formatted'
    a.download = `${baseName}.json`
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

/** main formatter */
function formatXml(): void {
  error.value = ''
  formatted.value = ''
  jsonOutput.value = ''
  stats.value = null
  try {
    const doc = parseXml(input.value)
    const eol = lineEndings.value === 'lf' ? '\n' : '\r\n'
    const indentUnit = indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value)

    const body = minify.value
        ? serializeMin(doc, stripWhitespaceText.value)
        : serializePretty(doc, indentUnit, eol, stripWhitespaceText.value)

    const decl = includeXmlDecl.value ? `<?xml version="${xmlVersion.value}" encoding="${xmlEncoding.value}"?>${eol}` : ''
    formatted.value = normalizeEol(decl + body, eol)

    // Calculate statistics
    stats.value = calculateStats(doc)

    // Generate JSON output
    const jsonObj = xmlToJson(doc.documentElement)
    jsonOutput.value = JSON.stringify(jsonObj, null, 2)
  } catch (err) {
    const msg = (err as Error).message || 'Invalid XML'
    error.value = msg
  }
}

/** xml helpers */
function parseXml(src: string): Document {
  const parser = new DOMParser()
  const doc = parser.parseFromString(src, 'application/xml')
  const perr = doc.getElementsByTagName('parsererror')
  if (perr.length > 0) {
    const msg = perr[0].textContent || 'XML parse error'
    const clean = msg.replace(/\s+/g, ' ').trim()
    throw new Error(`Invalid XML: ${clean}`)
  }
  return doc
}

function serializePretty(doc: Document, indentUnit: string, eol: string, stripWS: boolean): string {
  const out: string[] = []
  if (doc.doctype) out.push(printDoctype(doc.doctype) + eol)
  const root = doc.documentElement
  if (!root) return out.join('')

  const walk = (node: Node, depth: number): void => {
    const pad = indentUnit.repeat(depth)
    switch (node.nodeType) {
      case 1: { // ELEMENT_NODE
        const el = node as Element
        const open = openTag(el)
        const kids = Array.from(el.childNodes).filter((n) => (stripWS ? !isWsText(n) : true))
        if (kids.length === 0) {
          const selfClose = el.childNodes.length === 0 || (stripWS && Array.from(el.childNodes).every(isWsText))
          out.push(`${pad}${open}${selfClose ? '/>' : `></${el.tagName}>`}${eol}`)
        } else {
          out.push(`${pad}${open}>${eol}`)
          kids.forEach((k) => walk(k, depth + 1))
          out.push(`${pad}</${el.tagName}>${eol}`)
        }
        break
      }
      case 3: { // TEXT_NODE
        const t = node.nodeValue ?? ''
        if (stripWS && t.trim() === '') return
        out.push(pad + escapeText(t) + eol)
        break
      }
      case 4: { // CDATA_SECTION_NODE
        const c = (node as CDATASection).data
        out.push(`${pad}<![CDATA[${c}]]>${eol}`)
        break
      }
      case 7: { // PROCESSING_INSTRUCTION_NODE
        const pi = node as ProcessingInstruction
        out.push(`${pad}<?${pi.target}${pi.data ? ' ' + pi.data : ''}?>${eol}`)
        break
      }
      case 8: { // COMMENT_NODE
        const c = (node as Comment).data.replace(/-->/g, '--&gt;')
        out.push(`${pad}<!-- ${c} -->${eol}`)
        break
      }
      default:
        break
    }
  }

  const openTag = (el: Element): string => {
    const attrs: string[] = []
    for (const a of Array.from(el.attributes)) {
      attrs.push(`${a.name}="${escapeAttr(a.value)}"`)
    }
    return `<${el.tagName}${attrs.length ? ' ' + attrs.join(' ') : ''}`
  }

  walk(root, 0)
  return out.join('')
}

function serializeMin(doc: Document, stripWS: boolean): string {
  const clone = doc.cloneNode(true) as Document
  if (stripWS) removeWsNodes(clone)
  const ser = new XMLSerializer()
  const raw = ser.serializeToString(clone)
  const doctype = doc.doctype ? printDoctype(doc.doctype) : ''
  return (doctype ? doctype : '') + raw.replace(/>\s+</g, '><').trim()
}

/** tiny utils */
function isWsText(n: Node): boolean {
  return n.nodeType === 3 && (n.nodeValue ?? '').trim() === ''
}
function removeWsNodes(n: Node): void {
  const children = Array.from(n.childNodes)
  for (const c of children) {
    if (isWsText(c)) n.removeChild(c)
    else removeWsNodes(c)
  }
}
function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}
function escapeText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}
function printDoctype(dt: DocumentType): string {
  const pub = dt.publicId ? ` PUBLIC "${dt.publicId}"` : (dt.systemId ? ' SYSTEM' : '')
  const sys = dt.systemId ? ` "${dt.systemId}"` : ''
  return `<!DOCTYPE ${dt.name}${pub}${sys}>`
}
function normalizeEol(s: string, eol: string): string {
  return s.replace(/\r?\n/g, eol)
}
function safeName(n: string): string {
  const base = n.trim() || 'formatted.xml'
  const name = base.endsWith('.xml') ? base : `${base}.xml`
  return name.replace(/[^\w.\-]+/g, '_')
}

/** statistics */
function calculateStats(doc: Document): XmlStats {
  let elements = 0
  let attributes = 0
  let maxDepth = 0
  let textNodes = 0

  const walk = (node: Node, depth: number): void => {
    maxDepth = Math.max(maxDepth, depth)

    if (node.nodeType === 1) { // ELEMENT_NODE
      elements++
      const el = node as Element
      attributes += el.attributes.length

      for (const child of Array.from(node.childNodes)) {
        walk(child, depth + 1)
      }
    } else if (node.nodeType === 3) { // TEXT_NODE
      const text = (node.nodeValue ?? '').trim()
      if (text) textNodes++
    }
  }

  if (doc.documentElement) {
    walk(doc.documentElement, 0)
  }

  return { elements, attributes, maxDepth, textNodes }
}

/** xml to json conversion */
function xmlToJson(element: Element | null): any {
  if (!element) return null

  const obj: any = {}

  // Add attributes with @ prefix
  if (element.attributes.length > 0) {
    obj['@attributes'] = {}
    for (const attr of Array.from(element.attributes)) {
      obj['@attributes'][attr.name] = attr.value
    }
  }

  // Process child nodes
  const children = Array.from(element.childNodes)
  let textContent = ''

  for (const child of children) {
    if (child.nodeType === 3) { // TEXT_NODE
      textContent += child.nodeValue ?? ''
    } else if (child.nodeType === 1) { // ELEMENT_NODE
      const childElement = child as Element
      const childName = childElement.tagName
      const childValue = xmlToJson(childElement)

      if (obj[childName]) {
        // If already exists, convert to array
        if (!Array.isArray(obj[childName])) {
          obj[childName] = [obj[childName]]
        }
        obj[childName].push(childValue)
      } else {
        obj[childName] = childValue
      }
    }
  }

  // If element has only text content and no children
  textContent = textContent.trim()
  if (textContent && Object.keys(obj).length === 0) {
    return textContent
  } else if (textContent && Object.keys(obj).filter(k => k !== '@attributes').length === 0) {
    obj['#text'] = textContent
  }

  return obj
}

/** xpath query tester */
function evaluateXPath(): void {
  xpathError.value = ''
  xpathResults.value = ''

  if (!xpathQuery.value.trim()) {
    xpathError.value = 'Please enter an XPath query'
    return
  }

  if (!input.value.trim()) {
    xpathError.value = 'Please provide XML input first'
    return
  }

  try {
    const doc = parseXml(input.value)
    const results = doc.evaluate(
      xpathQuery.value,
      doc.documentElement,
      null,
      XPathResult.ANY_TYPE,
      null
    )

    const matches: string[] = []
    let node = results.iterateNext()

    while (node) {
      if (node.nodeType === 1) {
        // ELEMENT_NODE
        matches.push(`<${(node as Element).tagName}>`)
      } else if (node.nodeType === 3) {
        // TEXT_NODE
        const text = (node.nodeValue ?? '').trim()
        if (text) matches.push(`"${text}"`)
      } else if (node.nodeType === 2) {
        // ATTRIBUTE_NODE
        matches.push(`@${node.nodeName}="${node.nodeValue}"`)
      }
      node = results.iterateNext()
    }

    if (matches.length === 0) {
      xpathResults.value = 'No matches found'
    } else {
      xpathResults.value = `Found ${matches.length} match${matches.length > 1 ? 'es' : ''}:\n\n${matches.join('\n')}`
    }
  } catch (err) {
    xpathError.value = `XPath error: ${(err as Error).message}`
  }
}

function insertXPathExample(example: string): void {
  xpathQuery.value = example
}
</script>

<style scoped>
.select-input {
  @apply w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white text-sm;
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
