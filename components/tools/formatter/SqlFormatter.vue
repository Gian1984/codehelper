<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🗃️ SQL Formatter</h2>
        <p class="text-sm text-gray-400 mt-1">Format, beautify, and minify SQL queries</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="formatSql" title="Format SQL">
          ✨ Format
        </button>
        <button class="btn" @click="minifySql" title="Minify SQL">
          📦 Minify
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">📝 Input SQL</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="btn cursor-pointer">
            📁 Import File
            <input type="file" class="hidden" accept=".sql,.txt,text/plain" @change="onFile" />
          </label>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste your SQL query here…"
          class="input font-mono resize-y min-h-[120px]"
          spellcheck="false"
      ></textarea>

      <div class="flex items-center justify-between text-xs">
        <div class="flex gap-4 text-gray-400">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
        </div>
        <div class="flex gap-4">
          <span v-if="error" class="warn">❌ {{ error }}</span>
          <span v-if="copied" class="text-green-400 font-medium">✅ Copied!</span>
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

        <!-- Toggles -->
        <div class="space-y-2">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="uppercaseKeywords" />
            <span class="text-sm text-gray-300">Uppercase keywords</span>
          </label>
        </div>

        <!-- Download -->
        <div class="space-y-2">
          <label class="label">Download Filename</label>
          <input v-model="filename" class="input" placeholder="query.sql" />
        </div>
      </div>

      <div class="mt-4 text-xs text-gray-500 border-t border-gray-800 pt-2">
        ℹ️ Formats standard SQL queries. Handles <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, subqueries, joins, and more.
      </div>
    </details>

    <!-- Output Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 Formatted Output</label>
        <div v-if="output" class="flex items-center gap-2">
          <button class="btn" @click="copyToClipboard" title="Copy formatted">
            📋 Copy
          </button>
          <button class="btn" @click="downloadResult" title="Download result">
            💾 Download
          </button>
        </div>
      </div>

      <div v-if="output">
        <pre class="mono-box max-h-[600px]">{{ output }}</pre>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">📝</div>
        <p>Paste a SQL query above and click "Format" to see the output here</p>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* ---------- state ---------- */
const input = ref<string>('')
const output = ref<string>('')

const error = ref<string>('')
const copied = ref<boolean>(false)

type IndentKind = 'spaces' | 'tabs'
const indentKind = ref<IndentKind>('spaces')
const indentWidth = ref<number>(2)
const uppercaseKeywords = ref<boolean>(true)
const filename = ref<string>('query.sql')

/* ---------- SQL keywords ---------- */
const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'JOIN',
  'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'CROSS', 'ON', 'AS',
  'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET',
  'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
  'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX',
  'UNION', 'ALL', 'DISTINCT', 'BETWEEN', 'LIKE', 'IS', 'NULL',
  'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
  'ASC', 'DESC', 'WITH', 'RECURSIVE',
])

const NEWLINE_BEFORE = new Set([
  'SELECT', 'FROM', 'WHERE', 'ORDER', 'GROUP', 'HAVING', 'LIMIT',
  'UNION', 'INSERT', 'UPDATE', 'DELETE', 'SET', 'VALUES',
  'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'CROSS',
  'ON',
])

/* ---------- tokenizer ---------- */
interface Token {
  type: 'keyword' | 'string' | 'number' | 'operator' | 'identifier' |
        'comment_line' | 'comment_block' | 'comma' | 'open_paren' |
        'close_paren' | 'semicolon' | 'whitespace' | 'dot' | 'wildcard'
  value: string
  upperValue: string
}

function tokenize(sql: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  const len = sql.length

  while (i < len) {
    const ch = sql[i]

    if (/\s/.test(ch)) {
      const start = i
      while (i < len && /\s/.test(sql[i])) i++
      tokens.push({ type: 'whitespace', value: sql.slice(start, i), upperValue: '' })
      continue
    }

    if (ch === '-' && i + 1 < len && sql[i + 1] === '-') {
      const start = i
      while (i < len && sql[i] !== '\n') i++
      tokens.push({ type: 'comment_line', value: sql.slice(start, i), upperValue: '' })
      continue
    }

    if (ch === '/' && i + 1 < len && sql[i + 1] === '*') {
      const start = i
      i += 2
      while (i < len && !(sql[i - 1] === '*' && sql[i] === '/')) i++
      if (i < len) i++
      tokens.push({ type: 'comment_block', value: sql.slice(start, i), upperValue: '' })
      continue
    }

    if (ch === '\'') {
      const start = i
      i++
      while (i < len) {
        if (sql[i] === '\'' && i + 1 < len && sql[i + 1] === '\'') {
          i += 2
        } else if (sql[i] === '\'') {
          i++
          break
        } else {
          i++
        }
      }
      tokens.push({ type: 'string', value: sql.slice(start, i), upperValue: '' })
      continue
    }

    if (ch === '"') {
      const start = i
      i++
      while (i < len && sql[i] !== '"') i++
      if (i < len) i++
      tokens.push({ type: 'identifier', value: sql.slice(start, i), upperValue: '' })
      continue
    }

    if (ch === '`') {
      const start = i
      i++
      while (i < len && sql[i] !== '`') i++
      if (i < len) i++
      tokens.push({ type: 'identifier', value: sql.slice(start, i), upperValue: '' })
      continue
    }

    if (/\d/.test(ch)) {
      const start = i
      while (i < len && /[\d.eE]/.test(sql[i])) i++
      tokens.push({ type: 'number', value: sql.slice(start, i), upperValue: '' })
      continue
    }

    if (ch === '(') {
      tokens.push({ type: 'open_paren', value: '(', upperValue: '(' })
      i++
      continue
    }
    if (ch === ')') {
      tokens.push({ type: 'close_paren', value: ')', upperValue: ')' })
      i++
      continue
    }

    if (ch === ',') {
      tokens.push({ type: 'comma', value: ',', upperValue: ',' })
      i++
      continue
    }

    if (ch === ';') {
      tokens.push({ type: 'semicolon', value: ';', upperValue: ';' })
      i++
      continue
    }

    if (ch === '.') {
      tokens.push({ type: 'dot', value: '.', upperValue: '.' })
      i++
      continue
    }

    if (ch === '*') {
      const prev = lastSignificantToken(tokens)
      if (!prev || prev.type === 'keyword' || prev.type === 'dot' ||
          prev.type === 'open_paren' || prev.type === 'comma') {
        tokens.push({ type: 'wildcard', value: '*', upperValue: '*' })
        i++
        continue
      }
    }

    if (i + 1 < len) {
      const two = sql.slice(i, i + 2)
      if (['!=', '<>', '<=', '>=', '||', '::'].includes(two)) {
        tokens.push({ type: 'operator', value: two, upperValue: two })
        i += 2
        continue
      }
    }

    if (['=', '<', '>', '+', '-', '*', '/', '%', '&', '|', '^', '~'].includes(ch)) {
      tokens.push({ type: 'operator', value: ch, upperValue: ch })
      i++
      continue
    }

    if (/[a-zA-Z_]/.test(ch)) {
      const start = i
      while (i < len && /[a-zA-Z0-9_]/.test(sql[i])) i++
      const word = sql.slice(start, i)
      const upper = word.toUpperCase()
      if (SQL_KEYWORDS.has(upper)) {
        tokens.push({ type: 'keyword', value: word, upperValue: upper })
      } else {
        tokens.push({ type: 'identifier', value: word, upperValue: upper })
      }
      continue
    }

    tokens.push({ type: 'operator', value: ch, upperValue: ch })
    i++
  }

  return tokens
}

function lastSignificantToken(tokens: Token[]): Token | null {
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i].type !== 'whitespace') return tokens[i]
  }
  return null
}

/* ---------- formatter ---------- */
function buildFormatted(tokens: Token[]): string {
  const indent = indentKind.value === 'tabs' ? '\t' : ' '.repeat(indentWidth.value)
  const uc = uppercaseKeywords.value
  const lines: string[] = []
  let currentLine = ''
  let depth = 0
  let inSelectClause = false

  function pushLine(): void {
    if (currentLine.trim()) {
      lines.push(indent.repeat(depth) + currentLine.trim())
    }
    currentLine = ''
  }

  const significant = tokens.filter(t => t.type !== 'whitespace')

  let baseDepth = 0
  const parenStack: { depth: number; isSubquery: boolean; wasSelect: boolean }[] = []

  for (let i = 0; i < significant.length; i++) {
    const tok = significant[i]
    const nextTok = i + 1 < significant.length ? significant[i + 1] : null

    if (tok.type === 'keyword') {
      const kw = tok.upperValue
      const kwDisplay = uc ? kw : tok.value

      if (['LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'CROSS'].includes(kw) &&
          nextTok && nextTok.type === 'keyword' && nextTok.upperValue === 'JOIN') {
        pushLine()
        depth = baseDepth
        const joinDisplay = uc ? 'JOIN' : nextTok.value
        currentLine = kwDisplay + ' ' + joinDisplay
        inSelectClause = false
        i++
        continue
      }

      if (kw === 'ORDER' && nextTok && nextTok.type === 'keyword' && nextTok.upperValue === 'BY') {
        pushLine()
        depth = baseDepth
        const byDisplay = uc ? 'BY' : nextTok.value
        currentLine = kwDisplay + ' ' + byDisplay
        inSelectClause = false
        i++
        continue
      }

      if (kw === 'GROUP' && nextTok && nextTok.type === 'keyword' && nextTok.upperValue === 'BY') {
        pushLine()
        depth = baseDepth
        const byDisplay = uc ? 'BY' : nextTok.value
        currentLine = kwDisplay + ' ' + byDisplay
        inSelectClause = false
        i++
        continue
      }

      if (kw === 'INSERT' && nextTok && nextTok.type === 'keyword' && nextTok.upperValue === 'INTO') {
        pushLine()
        depth = baseDepth
        const intoDisplay = uc ? 'INTO' : nextTok.value
        currentLine = kwDisplay + ' ' + intoDisplay
        inSelectClause = false
        i++
        continue
      }

      if (NEWLINE_BEFORE.has(kw) && !['LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'CROSS'].includes(kw)) {

        if (kw === 'SELECT') {
          pushLine()
          depth = baseDepth
          currentLine = kwDisplay
          inSelectClause = true
          continue
        }

        if (kw === 'JOIN') {
          pushLine()
          depth = baseDepth
          currentLine = kwDisplay
          inSelectClause = false
          continue
        }

        if (kw === 'ON') {
          pushLine()
          depth = baseDepth + 1
          currentLine = kwDisplay
          inSelectClause = false
          continue
        }

        if (kw === 'UNION') {
          pushLine()
          depth = baseDepth
          currentLine = kwDisplay
          if (nextTok && nextTok.type === 'keyword' && nextTok.upperValue === 'ALL') {
            const allDisplay = uc ? 'ALL' : nextTok.value
            currentLine += ' ' + allDisplay
            i++
          }
          inSelectClause = false
          continue
        }

        pushLine()
        depth = baseDepth
        currentLine = kwDisplay
        inSelectClause = false
        continue
      }

      if (kw === 'AND' || kw === 'OR') {
        pushLine()
        depth = baseDepth + 1
        currentLine = kwDisplay
        continue
      }

      if (kw === 'CASE') {
        currentLine += (currentLine ? ' ' : '') + kwDisplay
        continue
      }
      if (kw === 'WHEN' || kw === 'THEN' || kw === 'ELSE') {
        pushLine()
        depth = baseDepth + 2
        currentLine = kwDisplay
        continue
      }
      if (kw === 'END') {
        pushLine()
        depth = baseDepth + 1
        currentLine = kwDisplay
        continue
      }

      currentLine += (currentLine ? ' ' : '') + kwDisplay
      continue
    }

    if (tok.type === 'open_paren') {
      const isSubquery = nextTok && nextTok.type === 'keyword' && nextTok.upperValue === 'SELECT'
      if (isSubquery) {
        pushLine()
        currentLine = '('
        pushLine()
        baseDepth++
        depth = baseDepth
        parenStack.push({ depth: baseDepth, isSubquery: true, wasSelect: inSelectClause })
        inSelectClause = false
      } else {
        currentLine += (currentLine && !/[\s(.]$/.test(currentLine) ? ' ' : '') + '('
        baseDepth++
        parenStack.push({ depth: baseDepth, isSubquery: false, wasSelect: inSelectClause })
      }
      continue
    }

    if (tok.type === 'close_paren') {
      const frame = parenStack.pop()
      if (frame) {
        baseDepth = frame.depth - 1
        if (frame.isSubquery) {
          pushLine()
          depth = baseDepth
          currentLine = ')'
          inSelectClause = frame.wasSelect
        } else {
          currentLine += ')'
          inSelectClause = frame.wasSelect
        }
      } else {
        baseDepth = Math.max(0, baseDepth - 1)
        currentLine += ')'
      }
      continue
    }

    if (tok.type === 'comma') {
      currentLine += ','
      if (inSelectClause) {
        pushLine()
        depth = baseDepth + 1
      }
      continue
    }

    if (tok.type === 'semicolon') {
      currentLine += ';'
      pushLine()
      depth = baseDepth
      inSelectClause = false
      lines.push('')
      continue
    }

    if (tok.type === 'dot') {
      currentLine += '.'
      continue
    }

    if (tok.type === 'comment_line' || tok.type === 'comment_block') {
      pushLine()
      lines.push(indent.repeat(depth) + tok.value.trim())
      continue
    }

    const val = tok.value
    const prevChar = currentLine.length > 0 ? currentLine[currentLine.length - 1] : ''
    if (prevChar === '.' || prevChar === '(') {
      currentLine += val
    } else {
      currentLine += (currentLine ? ' ' : '') + val
    }
  }

  pushLine()

  let result = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  return result + '\n'
}

/* ---------- minifier ---------- */
function buildMinified(tokens: Token[]): string {
  const uc = uppercaseKeywords.value
  const parts: string[] = []

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i]

    if (tok.type === 'whitespace') {
      if (parts.length > 0) {
        const last = parts[parts.length - 1]
        const lastChar = last[last.length - 1]
        const nextTok = findNextNonWhitespace(tokens, i + 1)
        if (lastChar === '(' || lastChar === '.') continue
        if (nextTok && (nextTok.value === ')' || nextTok.value === '.' || nextTok.value === ',')) continue
        parts.push(' ')
      }
      continue
    }

    if (tok.type === 'comment_line' || tok.type === 'comment_block') {
      continue
    }

    if (tok.type === 'keyword') {
      parts.push(uc ? tok.upperValue : tok.value)
      continue
    }

    parts.push(tok.value)
  }

  return parts.join('').replace(/\s+/g, ' ').trim()
}

function findNextNonWhitespace(tokens: Token[], start: number): Token | null {
  for (let i = start; i < tokens.length; i++) {
    if (tokens[i].type !== 'whitespace') return tokens[i]
  }
  return null
}

/* ---------- actions ---------- */
function clearAll(): void {
  input.value = ''
  output.value = ''
  error.value = ''
  copied.value = false
}

function formatSql(): void {
  error.value = ''
  output.value = ''

  const raw = input.value.replace(/\r\n/g, '\n')
  if (!raw.trim()) {
    error.value = 'Please enter some SQL to format'
    return
  }

  try {
    const tokens = tokenize(raw)
    output.value = buildFormatted(tokens)
  } catch (err) {
    error.value = (err as Error).message || 'Formatting error'
  }
}

function minifySql(): void {
  error.value = ''
  output.value = ''

  const raw = input.value.replace(/\r\n/g, '\n')
  if (!raw.trim()) {
    error.value = 'Please enter some SQL to minify'
    return
  }

  try {
    const tokens = tokenize(raw)
    output.value = buildMinified(tokens)
  } catch (err) {
    error.value = (err as Error).message || 'Minification error'
  }
}

function onFile(e: Event): void {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => (input.value = String(reader.result ?? ''))
  reader.readAsText(file)
}

async function copyToClipboard(): Promise<void> {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadResult(): void {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = safeName(filename.value || 'query.sql')
  a.click()
  URL.revokeObjectURL(url)
}

function safeName(n: string): string {
  const base = (n.trim() || 'query.sql').replace(/[^\w.\-]+/g, '_')
  return base.endsWith('.sql') ? base : base + '.sql'
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
