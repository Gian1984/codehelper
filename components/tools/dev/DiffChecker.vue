<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">📝 Diff Checker</h2>
        <p class="text-sm text-gray-400 mt-1">Compare two texts or code snippets and highlight the differences</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="compare" title="Compare texts">
          ⚡ Compare
        </button>
        <button class="btn" @click="swapInputs" title="Swap inputs">
          🔄 Swap
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Inputs -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card space-y-3">
        <label class="label">📄 Original</label>
        <textarea
            v-model="original"
            placeholder="Paste original text here…"
            class="input font-mono resize-y min-h-[200px]"
            spellcheck="false"
        ></textarea>
        <div class="text-xs text-gray-400">{{ originalStats }}</div>
      </div>
      <div class="card space-y-3">
        <label class="label">📄 Modified</label>
        <textarea
            v-model="modified"
            placeholder="Paste modified text here…"
            class="input font-mono resize-y min-h-[200px]"
            spellcheck="false"
        ></textarea>
        <div class="text-xs text-gray-400">{{ modifiedStats }}</div>
      </div>
    </div>

    <!-- Options -->
    <details class="card">
      <summary class="label font-semibold cursor-pointer select-none hover:text-indigo-400 transition-colors mb-4">
        ⚙️ Options
      </summary>
      <div class="flex flex-wrap gap-6">
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="ignoreWhitespace" />
          <span class="text-sm text-gray-300">Ignore leading/trailing whitespace</span>
        </label>
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="ignoreCase" />
          <span class="text-sm text-gray-300">Ignore case</span>
        </label>
      </div>
    </details>

    <!-- Summary -->
    <div v-if="diffResult" class="card">
      <div class="flex gap-6 text-sm flex-wrap">
        <span class="text-gray-400">Lines compared: <span class="text-white font-medium">{{ diffResult.totalLines }}</span></span>
        <span class="text-green-400">+ {{ diffResult.added }} added</span>
        <span class="text-red-400">- {{ diffResult.removed }} removed</span>
        <span class="text-gray-400">{{ diffResult.unchanged }} unchanged</span>
        <span v-if="diffResult.added === 0 && diffResult.removed === 0" class="text-green-400 font-medium">✅ Texts are identical</span>
      </div>
    </div>

    <!-- Diff Output -->
    <div v-if="diffResult" class="card">
      <div class="flex items-center justify-between mb-3">
        <label class="label !mb-0">🔍 Diff Result</label>
        <div class="flex gap-2">
          <button :class="['btn', viewMode === 'unified' && 'bg-indigo-600']" @click="viewMode = 'unified'">Unified</button>
          <button :class="['btn', viewMode === 'side' && 'bg-indigo-600']" @click="viewMode = 'side'">Side by Side</button>
          <button class="btn" @click="copyDiff">📋 Copy</button>
        </div>
      </div>
      <span v-if="copied" class="text-green-400 text-xs font-medium">✅ Copied!</span>

      <!-- Unified View -->
      <div v-if="viewMode === 'unified'" class="diff-box max-h-[600px] overflow-y-auto">
        <div v-for="(line, i) in diffResult.lines" :key="i"
            :class="['diff-line', lineClass(line.type)]">
          <span class="line-num">{{ line.lineNum || '' }}</span>
          <span class="line-prefix">{{ line.prefix }}</span>
          <span class="line-content" v-html="line.html || escapeHtml(line.text)"></span>
        </div>
      </div>

      <!-- Side by Side View -->
      <div v-if="viewMode === 'side'" class="grid grid-cols-2 gap-0 max-h-[600px] overflow-y-auto diff-box">
        <div>
          <div v-for="(line, i) in diffResult.leftLines" :key="'l'+i"
              :class="['diff-line', lineClass(line.type)]">
            <span class="line-num">{{ line.lineNum || '' }}</span>
            <span class="line-content">{{ line.text }}</span>
          </div>
        </div>
        <div class="border-l border-gray-700">
          <div v-for="(line, i) in diffResult.rightLines" :key="'r'+i"
              :class="['diff-line', lineClass(line.type)]">
            <span class="line-num">{{ line.lineNum || '' }}</span>
            <span class="line-content">{{ line.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!diffResult" class="card text-center py-16 text-gray-500">
      <div class="text-4xl mb-4">📝</div>
      <p>Paste two texts above and click "Compare" to see the differences</p>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const original = ref('')
const modified = ref('')
const ignoreWhitespace = ref(false)
const ignoreCase = ref(false)
const viewMode = ref<'unified' | 'side'>('unified')
const copied = ref(false)

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'header'
  text: string
  prefix: string
  lineNum: string
  html?: string
}

interface DiffResult {
  lines: DiffLine[]
  leftLines: DiffLine[]
  rightLines: DiffLine[]
  added: number
  removed: number
  unchanged: number
  totalLines: number
}

const diffResult = ref<DiffResult | null>(null)

const originalStats = computed(() => {
  const lines = original.value ? original.value.split('\n').length : 0
  return `${lines} lines, ${original.value.length} chars`
})

const modifiedStats = computed(() => {
  const lines = modified.value ? modified.value.split('\n').length : 0
  return `${lines} lines, ${modified.value.length} chars`
})

function clearAll() {
  original.value = ''
  modified.value = ''
  diffResult.value = null
  copied.value = false
}

function swapInputs() {
  const tmp = original.value
  original.value = modified.value
  modified.value = tmp
  if (diffResult.value) compare()
}

async function copyDiff() {
  if (!diffResult.value) return
  const text = diffResult.value.lines.map(l => l.prefix + l.text).join('\n')
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function lineClass(type: string): string {
  if (type === 'added') return 'bg-green-900/30 border-l-2 border-green-500'
  if (type === 'removed') return 'bg-red-900/30 border-l-2 border-red-500'
  if (type === 'header') return 'bg-indigo-900/20 text-indigo-400'
  return ''
}

function normalizeLine(line: string): string {
  let l = line
  if (ignoreWhitespace.value) l = l.trim()
  if (ignoreCase.value) l = l.toLowerCase()
  return l
}

function compare() {
  copied.value = false
  const aLines = original.value.split('\n')
  const bLines = modified.value.split('\n')

  const aNorm = aLines.map(normalizeLine)
  const bNorm = bLines.map(normalizeLine)

  // LCS-based diff
  const n = aNorm.length
  const m = bNorm.length
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (aNorm[i - 1] === bNorm[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // Backtrack
  const ops: { type: 'unchanged' | 'added' | 'removed'; aIdx: number; bIdx: number }[] = []
  let i = n, j = m
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aNorm[i - 1] === bNorm[j - 1]) {
      ops.push({ type: 'unchanged', aIdx: i - 1, bIdx: j - 1 })
      i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      ops.push({ type: 'added', aIdx: -1, bIdx: j - 1 })
      j--
    } else {
      ops.push({ type: 'removed', aIdx: i - 1, bIdx: -1 })
      i--
    }
  }
  ops.reverse()

  const lines: DiffLine[] = []
  const leftLines: DiffLine[] = []
  const rightLines: DiffLine[] = []
  let added = 0, removed = 0, unchanged = 0
  let aNum = 0, bNum = 0

  for (const op of ops) {
    if (op.type === 'unchanged') {
      aNum++; bNum++
      const text = aLines[op.aIdx]
      lines.push({ type: 'unchanged', text, prefix: '  ', lineNum: `${aNum}` })
      leftLines.push({ type: 'unchanged', text, prefix: '', lineNum: `${aNum}` })
      rightLines.push({ type: 'unchanged', text, prefix: '', lineNum: `${bNum}` })
      unchanged++
    } else if (op.type === 'removed') {
      aNum++
      const text = aLines[op.aIdx]
      lines.push({ type: 'removed', text, prefix: '- ', lineNum: `${aNum}` })
      leftLines.push({ type: 'removed', text, prefix: '', lineNum: `${aNum}` })
      rightLines.push({ type: 'removed', text: '', prefix: '', lineNum: '' })
      removed++
    } else {
      bNum++
      const text = bLines[op.bIdx]
      lines.push({ type: 'added', text, prefix: '+ ', lineNum: `${bNum}` })
      leftLines.push({ type: 'added', text: '', prefix: '', lineNum: '' })
      rightLines.push({ type: 'added', text, prefix: '', lineNum: `${bNum}` })
      added++
    }
  }

  diffResult.value = {
    lines,
    leftLines,
    rightLines,
    added,
    removed,
    unchanged,
    totalLines: Math.max(n, m)
  }
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
.diff-box {
  @apply bg-gray-950 rounded-lg border border-gray-700 font-mono text-sm;
}
.diff-line {
  @apply flex items-start px-2 py-0.5 min-h-[24px];
}
.line-num {
  @apply text-gray-600 w-10 text-right pr-3 select-none flex-shrink-0 text-xs leading-6;
}
.line-prefix {
  @apply w-5 flex-shrink-0 text-xs leading-6 select-none;
}
.line-content {
  @apply whitespace-pre-wrap break-all leading-6;
}
.warn {
  @apply text-sm text-red-400 bg-red-900/20 p-2 rounded-lg border border-red-700;
}
</style>
