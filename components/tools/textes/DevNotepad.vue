<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white" :class="{ 'fixed inset-4 z-50': distractionFree }">
    <!-- Header -->
    <div class="card">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-2xl font-semibold">📝 Dev Notepad</h2>
          <p class="text-sm text-gray-400 mt-1">Advanced notepad with Markdown & HTML support, multi-tabs, version history, and search</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn text-xs" @click="showHistory = !showHistory" title="Version History">
            🕒 {{ snapshots.length }}
          </button>
          <button class="btn text-xs" @click="showSearch = !showSearch" title="Search & Replace">
            🔍 search
          </button>
          <button class="btn text-xs" @click="distractionFree = !distractionFree" title="Distraction-free Mode">
            {{ distractionFree ? '📐' : '🎯' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div v-if="!distractionFree" class="flex items-center gap-2 overflow-x-auto pb-2">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.id"
        class="px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors"
        :class="activeTabId === tab.id ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
        @click="switchTab(tab.id)"
      >
        {{ tab.name }}
      </button>
      <button class="btn text-xs" @click="newTab" title="New Tab">➕ new</button>
      <button class="btn text-xs" @click="renameTab" v-if="tabs.length > 0" title="Rename Tab">✏️</button>
      <button class="btn-warning text-xs" @click="closeTab" v-if="tabs.length > 1" title="Close Tab">✕</button>
    </div>

    <!-- Mode Toggle & Settings -->
    <div v-if="!distractionFree" class="flex flex-wrap items-center gap-3">
      <div class="flex gap-2">
        <button
          class="px-3 py-1.5 rounded text-sm transition-colors"
          :class="mode === 'html' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
          @click="mode = 'html'"
        >
          📄 HTML
        </button>
        <button
          class="px-3 py-1.5 rounded text-sm transition-colors"
          :class="mode === 'markdown' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
          @click="mode = 'markdown'"
        >
          📝 Markdown
        </button>
      </div>

      <div class="h-6 w-px bg-gray-700"></div>

      <label class="inline-flex items-center gap-2">
        <input type="checkbox" v-model="wordWrap" class="w-4 h-4" />
        <span class="text-sm">Word Wrap</span>
      </label>

      <label class="inline-flex items-center gap-2">
        <input type="checkbox" v-model="showPreview" v-if="mode === 'markdown'" class="w-4 h-4" />
        <span class="text-sm" v-if="mode === 'markdown'">Live Preview</span>
      </label>

      <div class="h-6 w-px bg-gray-700"></div>

      <label class="text-sm text-gray-300">Font Size</label>
      <select v-model.number="fontSize" class="input w-24">
        <option v-for="n in [12, 14, 16, 18, 20, 24]" :key="n" :value="n">{{ n }}px</option>
      </select>

      <div class="ml-auto text-xs text-gray-400">
        Auto-saved {{ lastSaved }}
      </div>
    </div>

    <!-- Search & Replace Modal -->
    <div v-if="showSearch" class="card space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-indigo-400">🔍 Search & Replace</h3>
        <button @click="showSearch = false" class="text-gray-400 hover:text-white">✕</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="label">Search for</label>
          <input v-model="searchTerm" class="input" placeholder="Enter search term..." @input="highlightMatches" />
        </div>
        <div>
          <label class="label">Replace with</label>
          <input v-model="replaceTerm" class="input" placeholder="Replace with..." />
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn" @click="replaceNext">Replace Next</button>
        <button class="btn" @click="replaceAll">Replace All</button>
        <span class="text-sm text-gray-400 self-center" v-if="searchTerm">{{ matchCount }} matches</span>
      </div>
    </div>

    <!-- Version History Modal -->
    <div v-if="showHistory" class="card space-y-3 max-h-64 overflow-y-auto">
      <div class="flex items-center justify-between sticky top-0 bg-black pb-2">
        <h3 class="text-sm font-semibold text-indigo-400">🕒 Version History ({{ snapshots.length }})</h3>
        <button @click="showHistory = false" class="text-gray-400 hover:text-white">✕</button>
      </div>
      <div v-if="snapshots.length === 0" class="text-sm text-gray-400 text-center py-4">
        No snapshots yet. Changes are auto-saved every 2 minutes.
      </div>
      <div v-for="(snap, i) in snapshots" :key="i" class="bg-gray-800 border border-gray-700 rounded p-3 hover:border-indigo-500 cursor-pointer transition-colors" @click="restoreSnapshot(i)">
        <div class="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>{{ formatDate(snap.timestamp) }}</span>
          <span>{{ snap.content.length }} chars</span>
        </div>
        <div class="text-sm text-white truncate font-mono">{{ snap.content.substring(0, 100) }}...</div>
      </div>
    </div>

    <!-- Editor Area -->
    <div class="grid gap-4" :class="mode === 'markdown' && showPreview ? 'md:grid-cols-2' : 'grid-cols-1'">
      <!-- HTML Editor -->
      <div v-if="mode === 'html'" class="space-y-2">
        <div v-if="!distractionFree" class="flex flex-wrap gap-1">
          <button class="btn-sm" @click="format('bold')" title="Bold"><strong>B</strong></button>
          <button class="btn-sm" @click="format('italic')" title="Italic"><em>I</em></button>
          <button class="btn-sm" @click="format('underline')" title="Underline"><u>U</u></button>
          <button class="btn-sm" @click="format('code')" title="Code"><code>C</code></button>
          <div class="w-px bg-gray-700"></div>
          <button class="btn-sm" @click="format('h1')">H1</button>
          <button class="btn-sm" @click="format('h2')">H2</button>
          <button class="btn-sm" @click="format('h3')">H3</button>
          <div class="w-px bg-gray-700"></div>
          <button class="btn-sm" @click="format('ul')">• List</button>
          <button class="btn-sm" @click="format('ol')">1. List</button>
          <button class="btn-sm" @click="insertLink">🔗 Link</button>
        </div>
        <div
          ref="htmlEditor"
          class="editor-content bg-black border border-gray-700 rounded p-4 outline-none prose prose-invert max-w-none"
          :class="{ 'min-h-96': !distractionFree, 'min-h-screen': distractionFree, 'whitespace-pre-wrap': wordWrap }"
          :style="{ fontSize: fontSize + 'px' }"
          contenteditable="true"
          spellcheck="true"
          @input="onHtmlInput"
          @keydown="onKeydown"
        ></div>
      </div>

      <!-- Markdown Editor -->
      <div v-if="mode === 'markdown' && currentTab" class="space-y-2">
        <div class="flex gap-x-3 text-sm text-gray-400 font-semibold">
          <span>Words: {{ stats.words }}</span>
          <span>Chars: {{ stats.chars }}</span>
          <span>Lines: {{ stats.lines }}</span>
        </div>
        <textarea
          ref="mdEditor"
          v-model="currentTab.content"
          class="editor-content bg-black border border-gray-700 rounded p-4 outline-none font-mono resize-none"
          :class="{ 'min-h-96': !distractionFree, 'min-h-screen': distractionFree, 'whitespace-pre-wrap': wordWrap, 'whitespace-pre': !wordWrap }"
          :style="{ fontSize: fontSize + 'px' }"
          spellcheck="true"
          @input="onMarkdownInput"
          @keydown="onKeydown"
          placeholder="# Start writing markdown...

Use **bold**, *italic*, `code`, etc.

## Headings
### Subheading

- List item 1
- List item 2

```javascript
const code = 'with syntax highlighting';
```"
        ></textarea>
      </div>

      <!-- Markdown Preview -->
      <div v-if="mode === 'markdown' && showPreview" class="space-y-2">
        <div class="text-sm font-semibold text-indigo-400">👁️ Live Preview</div>
        <div
          class="editor-content bg-black border border-indigo-500/30 rounded p-4 prose prose-invert max-w-none overflow-auto"
          :class="{ 'min-h-96': !distractionFree, 'min-h-screen': distractionFree }"
          :style="{ fontSize: fontSize + 'px' }"
          v-html="markdownPreview"
        ></div>
      </div>
    </div>

    <!-- Stats & Actions -->
    <div v-if="!distractionFree" class="flex flex-wrap items-center gap-3 text-xs text-gray-400">
      <div class="ml-auto flex gap-2">
        <button class="btn text-xs" @click="copyContent">📋 Copy</button>
        <button class="btn text-xs" @click="downloadFile">💾 Download</button>
        <label class="btn text-xs cursor-pointer">
          📂 Import
          <input type="file" class="hidden" @change="importFile" accept=".txt,.md,.html,.htm" />
        </label>
        <button class="btn-warning text-xs" @click="clearContent">🗑️ Clear</button>
      </div>
    </div>

    <div v-if="message" class="text-center text-sm text-green-400">{{ message }}</div>
    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-bash'

/* -------------------- Types -------------------- */
interface Tab {
  id: string
  name: string
  content: string
  mode: 'html' | 'markdown'
}

interface Snapshot {
  timestamp: number
  content: string
}

/* -------------------- State -------------------- */
const mode = ref<'html' | 'markdown'>('markdown')
const tabs = ref<Tab[]>([])
const activeTabId = ref<string>('')
const wordWrap = ref<boolean>(true)
const showPreview = ref<boolean>(true)
const fontSize = ref<number>(16)
const distractionFree = ref<boolean>(false)
const showSearch = ref<boolean>(false)
const showHistory = ref<boolean>(false)

const searchTerm = ref<string>('')
const replaceTerm = ref<string>('')
const matchCount = ref<number>(0)

const snapshots = ref<Snapshot[]>([])
const message = ref<string>('')
const lastSaved = ref<string>('just now')

const htmlEditor = ref<HTMLDivElement | null>(null)
const mdEditor = ref<HTMLTextAreaElement | null>(null)

/* -------------------- Computed -------------------- */
const currentTab = computed(() => tabs.value.find(t => t.id === activeTabId.value) || tabs.value[0])

const stats = computed(() => {
  const content = currentTab.value?.content || ''
  const text = mode.value === 'html'
    ? (htmlEditor.value?.innerText || '')
    : content

  return {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    lines: text.split('\n').length,
  }
})

const markdownPreview = computed(() => {
  if (mode.value !== 'markdown' || !currentTab.value) return ''
  return renderMarkdown(currentTab.value.content)
})

/* -------------------- Markdown Renderer -------------------- */
function renderMarkdown(md: string): string {
  let html = md

  // Code blocks with syntax highlighting
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'javascript'
    try {
      const highlighted = Prism.languages[language]
        ? Prism.highlight(code, Prism.languages[language], language)
        : escapeHtml(code)
      return `<pre class="language-${language}"><code>${highlighted}</code></pre>`
    } catch {
      return `<pre><code>${escapeHtml(code)}</code></pre>`
    }
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold & Italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

  // Lists (simple)
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>')
  html = `<p>${html}</p>`

  return html
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

/* -------------------- Tab Management -------------------- */
function newTab() {
  const id = Date.now().toString()
  const tab: Tab = {
    id,
    name: `Note ${tabs.value.length + 1}`,
    content: mode.value === 'markdown' ? '# New Note\n\nStart writing...' : '<h1>New Note</h1><p>Start writing...</p>',
    mode: mode.value,
  }
  tabs.value.push(tab)
  activeTabId.value = id
  saveTabs()
  flash('New tab created')
}

function switchTab(id: string) {
  // Save current tab content first
  if (currentTab.value) {
    if (mode.value === 'html' && htmlEditor.value) {
      currentTab.value.content = htmlEditor.value.innerHTML
    }
  }

  activeTabId.value = id
  const tab = tabs.value.find(t => t.id === id)
  if (tab) {
    mode.value = tab.mode
    nextTick(() => {
      if (mode.value === 'html' && htmlEditor.value) {
        htmlEditor.value.innerHTML = tab.content
      }
    })
  }
}

function renameTab() {
  if (!currentTab.value) return
  const newName = prompt('Enter new name:', currentTab.value.name)
  if (newName && newName.trim()) {
    currentTab.value.name = newName.trim()
    saveTabs()
    flash('Tab renamed')
  }
}

function closeTab() {
  if (tabs.value.length <= 1) return
  if (!confirm('Close this tab?')) return

  const index = tabs.value.findIndex(t => t.id === activeTabId.value)
  tabs.value.splice(index, 1)

  activeTabId.value = tabs.value[Math.max(0, index - 1)].id
  saveTabs()
  flash('Tab closed')
}

/* -------------------- Auto-save -------------------- */
let saveTimer: number | undefined
let snapshotTimer: number | undefined

function onHtmlInput() {
  if (!htmlEditor.value || !currentTab.value) return
  currentTab.value.content = htmlEditor.value.innerHTML
  scheduleAutoSave()
}

function onMarkdownInput() {
  scheduleAutoSave()
}

function scheduleAutoSave() {
  clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    saveTabs()
    lastSaved.value = 'just now'
  }, 500)
}

function saveTabs() {
  try {
    localStorage.setItem('devnotepad-tabs', JSON.stringify(tabs.value))
    localStorage.setItem('devnotepad-active', activeTabId.value)
    localStorage.setItem('devnotepad-settings', JSON.stringify({
      fontSize: fontSize.value,
      wordWrap: wordWrap.value,
      showPreview: showPreview.value,
    }))
  } catch (e) {
    console.error('Failed to save:', e)
  }
}

function loadTabs() {
  try {
    const saved = localStorage.getItem('devnotepad-tabs')
    const active = localStorage.getItem('devnotepad-active')
    const settings = localStorage.getItem('devnotepad-settings')

    if (saved) {
      tabs.value = JSON.parse(saved)
    }
    if (active && tabs.value.find(t => t.id === active)) {
      activeTabId.value = active
    }
    if (settings) {
      const s = JSON.parse(settings)
      if (s.fontSize) fontSize.value = s.fontSize
      if (typeof s.wordWrap === 'boolean') wordWrap.value = s.wordWrap
      if (typeof s.showPreview === 'boolean') showPreview.value = s.showPreview
    }

    // Create default tab if none exist
    if (tabs.value.length === 0) {
      newTab()
    } else {
      if (!activeTabId.value) activeTabId.value = tabs.value[0].id
    }
  } catch (e) {
    console.error('Failed to load:', e)
    newTab()
  }
}

/* -------------------- Snapshots -------------------- */
function createSnapshot() {
  if (!currentTab.value || !currentTab.value.content.trim()) return

  snapshots.value.unshift({
    timestamp: Date.now(),
    content: currentTab.value.content,
  })

  // Keep last 20 snapshots
  if (snapshots.value.length > 20) {
    snapshots.value = snapshots.value.slice(0, 20)
  }

  saveSnapshots()
}

function restoreSnapshot(index: number) {
  if (!confirm('Restore this version? Current content will be replaced.')) return

  const snapshot = snapshots.value[index]
  if (snapshot && currentTab.value) {
    currentTab.value.content = snapshot.content
    if (mode.value === 'html' && htmlEditor.value) {
      htmlEditor.value.innerHTML = snapshot.content
    }
    saveTabs()
    flash('Snapshot restored')
    showHistory.value = false
  }
}

function saveSnapshots() {
  try {
    localStorage.setItem('devnotepad-snapshots', JSON.stringify(snapshots.value.slice(0, 20)))
  } catch {}
}

function loadSnapshots() {
  try {
    const saved = localStorage.getItem('devnotepad-snapshots')
    if (saved) {
      snapshots.value = JSON.parse(saved)
    }
  } catch {}
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`

  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/* -------------------- Search & Replace -------------------- */
function highlightMatches() {
  if (!searchTerm.value) {
    matchCount.value = 0
    return
  }

  const content = currentTab.value?.content || ''
  const regex = new RegExp(searchTerm.value, 'gi')
  const matches = content.match(regex)
  matchCount.value = matches ? matches.length : 0
}

function replaceNext() {
  if (!searchTerm.value || !currentTab.value) return

  const content = currentTab.value.content
  const index = content.indexOf(searchTerm.value)

  if (index !== -1) {
    currentTab.value.content = content.substring(0, index) + replaceTerm.value + content.substring(index + searchTerm.value.length)
    saveTabs()
    highlightMatches()
    flash('Replaced 1 occurrence')
  } else {
    flash('No more matches')
  }
}

function replaceAll() {
  if (!searchTerm.value || !currentTab.value) return

  const count = matchCount.value
  if (count === 0) {
    flash('No matches found')
    return
  }

  if (!confirm(`Replace all ${count} occurrences?`)) return

  currentTab.value.content = currentTab.value.content.replace(new RegExp(searchTerm.value, 'g'), replaceTerm.value)
  saveTabs()
  highlightMatches()
  flash(`Replaced ${count} occurrences`)
}

/* -------------------- HTML Formatting -------------------- */
function format(cmd: string) {
  if (!htmlEditor.value) return

  htmlEditor.value.focus()
  const sel = window.getSelection()
  if (!sel) return

  if (['bold', 'italic', 'underline'].includes(cmd)) {
    document.execCommand(cmd)
  } else if (cmd === 'code') {
    const range = sel.getRangeAt(0)
    const code = document.createElement('code')
    code.appendChild(range.extractContents())
    range.insertNode(code)
  } else if (['h1', 'h2', 'h3'].includes(cmd)) {
    document.execCommand('formatBlock', false, cmd)
  } else if (cmd === 'ul') {
    document.execCommand('insertUnorderedList')
  } else if (cmd === 'ol') {
    document.execCommand('insertOrderedList')
  }

  onHtmlInput()
}

function insertLink() {
  const url = prompt('Enter URL:')
  if (!url) return
  document.execCommand('createLink', false, url)
  onHtmlInput()
}

/* -------------------- Actions -------------------- */
async function copyContent() {
  const content = mode.value === 'html' && htmlEditor.value
    ? htmlEditor.value.innerText
    : currentTab.value?.content || ''

  await navigator.clipboard.writeText(content)
  flash('Copied to clipboard')
}

function downloadFile() {
  if (!currentTab.value) return

  const content = currentTab.value.content
  const ext = mode.value === 'markdown' ? 'md' : 'html'
  const filename = `${currentTab.value.name}.${ext}`
  const mimeType = mode.value === 'markdown' ? 'text/markdown' : 'text/html'

  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)

  flash('Downloaded')
}

function importFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    const text = String(reader.result || '')
    if (currentTab.value) {
      currentTab.value.content = text
      if (mode.value === 'html' && htmlEditor.value) {
        htmlEditor.value.innerHTML = text
      }
      saveTabs()
      flash('File imported')
    }
    input.value = ''
  }
  reader.readAsText(file)
}

function clearContent() {
  if (!confirm('Clear current note?')) return

  if (currentTab.value) {
    currentTab.value.content = mode.value === 'markdown' ? '# New Note\n' : '<p></p>'
    if (mode.value === 'html' && htmlEditor.value) {
      htmlEditor.value.innerHTML = currentTab.value.content
    }
    saveTabs()
    flash('Cleared')
  }
}

/* -------------------- Keyboard Shortcuts -------------------- */
function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    saveTabs()
    flash('Saved')
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault()
    showSearch.value = !showSearch.value
  }
  if (e.key === 'Escape' && distractionFree.value) {
    distractionFree.value = false
  }
}

/* -------------------- Helpers -------------------- */
function flash(msg: string) {
  message.value = msg
  clearTimeout((flash as any)._t)
  ;(flash as any)._t = setTimeout(() => (message.value = ''), 1500)
}

/* -------------------- Lifecycle -------------------- */
onMounted(() => {
  loadTabs()
  loadSnapshots()

  // Restore HTML editor content
  if (currentTab.value && mode.value === 'html') {
    nextTick(() => {
      if (htmlEditor.value) {
        htmlEditor.value.innerHTML = currentTab.value.content
      }
    })
  }

  // Auto-snapshot every 2 minutes
  snapshotTimer = window.setInterval(createSnapshot, 120000)

  // Update "last saved" time
  setInterval(() => {
    const diff = Date.now() - (parseInt(localStorage.getItem('devnotepad-lastsave') || '0') || Date.now())
    if (diff < 60000) lastSaved.value = 'just now'
    else if (diff < 3600000) lastSaved.value = `${Math.floor(diff / 60000)}m ago`
    else lastSaved.value = `${Math.floor(diff / 3600000)}h ago`
  }, 30000)
})

onBeforeUnmount(() => {
  clearInterval(snapshotTimer)
})

watch(mode, () => {
  if (currentTab.value) {
    currentTab.value.mode = mode.value
    saveTabs()
  }
})
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block mb-2;
}

.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}

.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-sm {
  @apply bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-lg text-white text-xs transition-colors;
}

.btn-warning {
  @apply bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}

.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}

.editor-content {
  @apply w-full transition-all;
}

.editor-content:focus {
  @apply ring-2 ring-indigo-500 border-indigo-500;
}

.prose :where(code):not(:where([class~="not-prose"] *)) {
  @apply bg-gray-800 px-1.5 py-0.5 rounded text-sm;
}

.prose :where(pre):not(:where([class~="not-prose"] *)) {
  @apply bg-gray-900 p-4 rounded overflow-x-auto;
}

.prose :where(pre code):not(:where([class~="not-prose"] *)) {
  @apply bg-transparent p-0;
}

.prose :where(blockquote):not(:where([class~="not-prose"] *)) {
  @apply border-l-4 border-indigo-500 pl-4 italic text-gray-300;
}

.prose :where(a):not(:where([class~="not-prose"] *)) {
  @apply text-indigo-400 hover:text-indigo-300 underline;
}
</style>
