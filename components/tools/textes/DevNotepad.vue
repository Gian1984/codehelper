<template>
  <div class="p-6 sm:p-8 bg-gray-800 rounded-2xl shadow-xl space-y-5 text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Dev notepad</h2>
      <div class="text-xs text-gray-400">stored locally (browser). download to keep a copy.</div>
    </div>

    <!-- toolbar -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="text-sm text-gray-300 mr-1">font size</label>
      <select v-model.number="fontPx" class="input w-28">
        <option v-for="n in [12,14,16,18,20,24,28]" :key="n" :value="n">{{ n }} px</option>
      </select>

      <div class="h-6 w-px bg-gray-700 mx-2" />

      <button class="btn" title="bold (ctrl/⌘+b)" @click="wrap('b')"><strong>B</strong></button>
      <button class="btn" title="italic (ctrl/⌘+i)" @click="wrap('i')"><em>I</em></button>
      <button class="btn" title="underline (ctrl/⌘+u)" @click="wrap('u')"><u>U</u></button>
      <button class="btn" title="inline code" @click="wrap('code')"><span class="font-mono">code</span></button>

      <div class="h-6 w-px bg-gray-700 mx-2" />

      <button class="btn" @click="block('h1')">h1</button>
      <button class="btn" @click="block('h2')">h2</button>
      <button class="btn" @click="block('h3')">h3</button>
      <button class="btn" @click="block('p')">p</button>

      <div class="h-6 w-px bg-gray-700 mx-2" />

      <button class="btn" @click="insertList('ul')">• list</button>
      <button class="btn" @click="insertList('ol')">1. list</button>
      <button class="btn" @click="insertLink">link</button>

      <div class="h-6 w-px bg-gray-700 mx-2" />

      <label class="inline-flex items-center gap-2">
        <input type="checkbox" v-model="pastePlain" class="w-4 h-4" />
        <span class="text-sm">paste as plain text</span>
      </label>

      <div class="ml-auto flex flex-wrap gap-2">
        <button class="btn" @click="manualSave" title="save (ctrl/⌘+s)">save</button>
        <button class="btn-warning" @click="clearNotes">clear</button>
      </div>
    </div>

    <!-- editor -->
    <div
        ref="editor"
        class="w-full min-h-64 bg-gray-950 text-white p-4 rounded border border-gray-800 outline-none prose prose-invert max-w-none overflow-auto"
        :style="{ fontSize: fontPx + 'px' }"
        contenteditable="true"
        spellcheck="false"
        @input="onInput"
        @keydown="onKey"
        @paste="onPaste"
    ></div>

    <!-- actions -->
    <div class="flex flex-wrap gap-3">
      <button class="btn-primary" @click="copyPlain">copy plain</button>
      <button class="btn" @click="copyHTML">copy html</button>
      <button class="btn" @click="downloadTxt">download .txt</button>
      <button class="btn" @click="downloadHtml">download .html</button>

      <label class="ml-auto btn cursor-pointer">
        import…
        <input type="file" class="hidden" accept=".txt,.html,.htm,text/plain,text/html" @change="importFile" />
      </label>
    </div>

    <!-- info -->
    <div class="flex flex-wrap items-center gap-4 text-xs text-gray-400">
      <span>words: {{ stats.words }}</span>
      <span>chars: {{ stats.chars }}</span>
      <span>lines: {{ stats.lines }}</span>
      <span v-if="message" class="text-green-400">{{ message }}</span>
    </div>

    <div class="bg-yellow-100/10 border border-yellow-500/30 text-yellow-200 p-3 text-xs rounded">
      ⚠ notes are stored in your browser (localStorage). clearing site data will erase them.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

/* ---------- storage ---------- */
const STORAGE_KEY = 'codehelper-dev-notes-html'
const STORAGE_META = 'codehelper-dev-notes-meta'

/* ---------- refs ---------- */
const editor = ref<HTMLDivElement | null>(null)
const message = ref<string>('')
const pastePlain = ref<boolean>(true)
const fontPx = ref<number>(16)

/* ---------- load ---------- */
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  const meta = localStorage.getItem(STORAGE_META)
  if (editor.value && saved) editor.value.innerHTML = sanitize(saved)
  if (meta) {
    try {
      const m = JSON.parse(meta) as { fontPx?: number }
      if (m.fontPx) fontPx.value = m.fontPx
    } catch {}
  }
  // ensure at least one paragraph for a11y
  if (editor.value && editor.value.innerHTML.trim() === '') {
    editor.value.innerHTML = '<p></p>'
  }
})

/* ---------- debounce autosave ---------- */
let t: number | undefined
function onInput() {
  window.clearTimeout(t)
  t = window.setTimeout(saveNotes, 250)
}
function saveNotes() {
  if (!editor.value) return
  const clean = sanitize(editor.value.innerHTML)
  localStorage.setItem(STORAGE_KEY, clean)
  localStorage.setItem(STORAGE_META, JSON.stringify({ fontPx: fontPx.value }))
  flash('saved')
}
function manualSave() {
  saveNotes()
}

/* ---------- clear ---------- */
function clearNotes() {
  if (!confirm('clear all notes?')) return
  if (editor.value) editor.value.innerHTML = '<p></p>'
  localStorage.removeItem(STORAGE_KEY)
  flash('cleared')
}

/* ---------- copy / download ---------- */
async function copyPlain() {
  if (!editor.value) return
  await navigator.clipboard.writeText(editor.value.innerText)
  flash('copied plain text')
}
async function copyHTML() {
  if (!editor.value) return
  await navigator.clipboard.writeText(sanitize(editor.value.innerHTML))
  flash('copied html')
}
function downloadTxt() {
  if (!editor.value) return
  const blob = new Blob([editor.value.innerText], { type: 'text/plain' })
  downloadBlob(blob, 'notes.txt')
}
function downloadHtml() {
  if (!editor.value) return
  const html = wrapHTML(sanitize(editor.value.innerHTML), fontPx.value)
  const blob = new Blob([html], { type: 'text/html' })
  downloadBlob(blob, 'notes.html')
}
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/* ---------- import ---------- */
function importFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const text = String(reader.result || '')
    const isHTML = /\.html?$/i.test(file.name) || /<\s*\/?\s*(p|div|br|h1|h2|h3|ul|ol|li|b|i|u|code)/i.test(text)
    const content = isHTML ? sanitize(text) : `<pre>${escapeHtml(text)}</pre>`
    if (editor.value) {
      editor.value.innerHTML = content
      saveNotes()
      flash('imported')
    }
    input.value = ''
  }
  reader.readAsText(file)
}

/* ---------- formatting (Selection/Range) ---------- */
/** wrap selection in a tag; if collapsed, inserts the tag and places caret inside */
function wrap(tag: 'b'|'i'|'u'|'code') {
  if (!editor.value) return
  editor.value.focus()
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  if (!editor.value.contains(range.commonAncestorContainer)) return

  const el = document.createElement(tag)
  if (range.collapsed) {
    el.appendChild(document.createTextNode(''))
    range.insertNode(el)
    // move caret inside
    const r = document.createRange()
    r.setStart(el, 0)
    r.collapse(true)
    sel.removeAllRanges()
    sel.addRange(r)
  } else {
    try {
      el.appendChild(range.extractContents())
      range.insertNode(el)
    } catch {
      // fallback if extract fails
      document.execCommand(tag === 'b' ? 'bold' : tag === 'i' ? 'italic' : tag === 'u' ? 'underline' : 'insertText', false)
    }
  }
  onInput()
}

/** turn current block into specified tag (h1/h2/h3/p) */
function block(tag: 'h1'|'h2'|'h3'|'p') {
  if (!editor.value) return
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  let node = sel.anchorNode as Node | null
  while (node && node !== editor.value && !(node instanceof HTMLElement && /^(P|H1|H2|H3)$/i.test(node.tagName))) {
    node = node.parentNode
  }
  if (!node || !(node instanceof HTMLElement)) return
  if (node.tagName.toLowerCase() === tag) return
  const newEl = document.createElement(tag)
  // move children
  while (node.firstChild) newEl.appendChild(node.firstChild)
  node.replaceWith(newEl)
  onInput()
}

/** insert list wrapping selection lines */
function insertList(kind: 'ul'|'ol') {
  if (!editor.value) return
  editor.value.focus()
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  // gather selected blocks
  const blocks: HTMLElement[] = []
  let start = range.startContainer as Node
  let end = range.endContainer as Node
  while (start && start.parentNode !== editor.value) start = start.parentNode as Node
  while (end && end.parentNode !== editor.value) end = end.parentNode as Node
  let collecting = false
  editor.value.childNodes.forEach((n) => {
    if (n === start) collecting = true
    if (collecting && n instanceof HTMLElement) blocks.push(n)
    if (n === end) collecting = false
  })
  if (blocks.length === 0 && editor.value.firstElementChild) {
    blocks.push(editor.value.firstElementChild as HTMLElement)
  }
  const list = document.createElement(kind)
  blocks.forEach((b) => {
    const li = document.createElement('li')
    while (b.firstChild) li.appendChild(b.firstChild)
    b.replaceWith(li)
    list.appendChild(li)
  })
  editor.value.insertBefore(list, editor.value.childNodes[0] || null)
  onInput()
}

/** insert/edit link */
function insertLink() {
  if (!editor.value) return
  const url = prompt('url (https://...)')
  if (!url) return
  wrap('u') // temporary to get a node
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  const node = range.startContainer.parentElement
  if (node && node.tagName === 'U') {
    const a = document.createElement('a')
    a.href = url
    a.textContent = node.textContent || url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    node.replaceWith(a)
    onInput()
  }
}

/* ---------- paste handling ---------- */
function onPaste(e: ClipboardEvent) {
  if (!pastePlain.value) return
  const data = e.clipboardData?.getData('text/plain')
  if (!data) return
  e.preventDefault()
  document.execCommand('insertText', false, data)
}

/* ---------- keyboard shortcuts ---------- */
function onKey(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
    e.preventDefault(); wrap('b')
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
    e.preventDefault(); wrap('i')
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
    e.preventDefault(); wrap('u')
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault(); manualSave()
  }
}

/* ---------- stats ---------- */
const stats = computed(() => {
  const text = (editor.value?.innerText || '').replace(/\s+/g, ' ').trim()
  return {
    words: text ? text.split(' ').length : 0,
    chars: text.length,
    lines: (editor.value?.innerText || '').split(/\n/).length,
  }
})

/* ---------- helpers ---------- */
function flash(text: string) {
  message.value = text
  window.clearTimeout((flash as any)._t)
  ;(flash as any)._t = window.setTimeout(() => (message.value = ''), 1200)
}

function wrapHTML(inner: string, px: number) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>notes</title>
<style>
  :root { color-scheme: dark; }
  body { background:#111827; color:#fff; font: ${px}px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; }
  a { color:#93c5fd; }
  code { background:#0b1220; padding:2px 4px; border-radius:4px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
</style>
</head><body>${inner}</body></html>`
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c] as string))
}

/** allow only a safe subset of tags/attributes */
function sanitize(html: string): string {
  const ALLOWED = new Set(['P','BR','DIV','SPAN','B','I','U','CODE','H1','H2','H3','UL','OL','LI','A','PRE'])
  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html')
  const root = doc.body.firstElementChild as HTMLElement
  ;(function walk(node: Element){
    // remove disallowed elements
    if (!ALLOWED.has(node.tagName)) {
      const parent = node.parentElement
      while (node.firstChild) parent?.insertBefore(node.firstChild, node)
      parent?.removeChild(node)
      return
    }
    // scrub attributes
    for (const attr of Array.from(node.attributes)) {
      const name = attr.name.toLowerCase()
      if (node.tagName === 'A' && (name === 'href' || name === 'target' || name === 'rel')) continue
      if (node.tagName === 'SPAN' && name === 'style') continue
      if (node.tagName === 'DIV' && name === 'style') continue
      node.removeAttribute(attr.name)
    }
    // enforce safe link attrs
    if (node.tagName === 'A') {
      const a = node as HTMLAnchorElement
      if (!/^https?:\/\//i.test(a.href)) a.removeAttribute('href')
      a.target = '_blank'; a.rel = 'noopener noreferrer'
    }
    Array.from(node.children).forEach(walk)
  })(root)
  return root.innerHTML
}
</script>

<style scoped>
.input { @apply text-black px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.btn-warning { @apply bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded text-white text-sm; }
.prose :where(code) { background: #0b1220; padding: 0.15rem 0.35rem; border-radius: 0.25rem; }
.prose :where(pre) { background: #0b1220; padding: 0.75rem; border-radius: 0.5rem; overflow: auto; }
</style>



