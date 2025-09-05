<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 text-gray-100">
    <div  class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">XML Formatter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">clear</button>
        <button class="btn" @click="formatXml">format</button>
        <button class="btn-primary" @click="copyToClipboard" :disabled="!formatted">copy</button>
        <button class="btn" @click="downloadXml" :disabled="!formatted">download</button>
      </div>
    </div >

    <!-- input + import -->
    <div  class="space-y-2">
      <div class="flex items-center gap-3 flex-wrap">
        <label class="label">input</label>
        <label class="btn cursor-pointer">
          import .xml
          <input type="file" class="hidden" accept=".xml,text/xml,application/xml" @change="onFile" />
        </label>
        <label class="inline-flex items-center gap-2 ml-auto">
          <input type="checkbox" v-model="autoFormatOnPaste" class="w-4 h-4" />
          <span class="text-sm">auto-format on paste</span>
        </label>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your XML here…"
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
    <div  class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card space-y-3">
        <label class="block">
          <span class="label">indent type</span>
          <select v-model="indentKind" class="input">
            <option value="spaces">spaces</option>
            <option value="tabs">tabs</option>
          </select>
        </label>
        <label v-if="indentKind === 'spaces'" class="block">
          <span class="label">indent width</span>
          <select v-model.number="indentWidth" class="input">
            <option v-for="n in [2, 3, 4, 6, 8]" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="stripWhitespaceText" class="w-4 h-4" />
          <span class="text-sm">strip whitespace-only text nodes</span>
        </label>
      </div>

      <div class="card space-y-3">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="includeXmlDecl" class="w-4 h-4" />
          <span class="text-sm">include XML declaration</span>
        </label>

        <div class="grid grid-cols-2 gap-2">
          <label class="block">
            <span class="label">version</span>
            <input v-model="xmlVersion" class="input" />
          </label>
          <label class="block">
            <span class="label">encoding</span>
            <input v-model="xmlEncoding" class="input" />
          </label>
        </div>

        <label class="block">
          <span class="label">line endings</span>
          <select v-model="lineEndings" class="input">
            <option value="lf">LF (\n)</option>
            <option value="crlf">CRLF (\r\n)</option>
          </select>
        </label>
      </div>

      <div class="card space-y-3">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="minify" class="w-4 h-4" />
          <span class="text-sm">minify (no pretty indent)</span>
        </label>
        <label class="block">
          <span class="label">download filename</span>
          <input v-model="filename" class="input" placeholder="formatted.xml" />
        </label>
        <button class="btn" @click="formatXml">apply formatting</button>
      </div>
    </div>

    <!-- output -->
    <div v-if="formatted" class="space-y-2">
      <label class="label">output</label>
      <pre class="bg-gray-950 p-4 rounded border border-gray-800 overflow-auto text-sm text-green-300 font-mono whitespace-pre-wrap">{{ formatted }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/** state */
const input = ref<string>('')
const formatted = ref<string>('')
const error = ref<string>('')

const copied = ref<boolean>(false)
const autoFormatOnPaste = ref<boolean>(false)

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

/** actions */
function clearAll(): void {
  input.value = ''
  formatted.value = ''
  error.value = ''
  copied.value = false
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
  if (!formatted.value) return
  await navigator.clipboard.writeText(formatted.value)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1200)
}

function downloadXml(): void {
  if (!formatted.value) return
  const blob = new Blob([formatted.value], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName(filename.value || 'formatted.xml')
  a.click()
  URL.revokeObjectURL(url)
}

/** main formatter */
function formatXml(): void {
  error.value = ''
  formatted.value = ''
  try {
    const doc = parseXml(input.value)
    const eol = lineEndings.value === 'lf' ? '\n' : '\r\n'
    const indentUnit = indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value)

    const body = minify.value
        ? serializeMin(doc, stripWhitespaceText.value)
        : serializePretty(doc, indentUnit, eol, stripWhitespaceText.value)

    const decl = includeXmlDecl.value ? `<?xml version="${xmlVersion.value}" encoding="${xmlEncoding.value}"?>${eol}` : ''
    formatted.value = normalizeEol(decl + body, eol)
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
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
</style>
