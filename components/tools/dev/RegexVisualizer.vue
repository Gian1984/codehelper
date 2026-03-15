<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🔍 Regex Visualizer</h2>
        <p class="text-sm text-gray-400 mt-1">Visualize, explain, and test regular expressions interactively</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="analyze" title="Analyze regex">
          ⚡ Analyze
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Pattern Input -->
    <div class="card space-y-3">
      <label class="label">📝 Regular Expression</label>
      <input
          v-model="pattern"
          placeholder="e.g. ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          class="input font-mono text-lg"
          spellcheck="false"
          @keyup.enter="analyze"
      />
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <label v-for="f in flagOptions" :key="f.flag" class="inline-flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" v-model="f.active" />
            <span class="text-sm text-gray-300 font-mono">{{ f.flag }}</span>
            <span class="text-xs text-gray-500">{{ f.label }}</span>
          </label>
        </div>
        <div class="flex gap-4">
          <span v-if="error" class="warn text-xs">❌ {{ error }}</span>
          <span v-if="copied" class="text-green-400 font-medium text-xs">✅ Copied!</span>
        </div>
      </div>
    </div>

    <!-- Quick Examples -->
    <div class="card">
      <label class="label mb-3">🔖 Common Patterns</label>
      <div class="flex flex-wrap gap-2">
        <button v-for="ex in examples" :key="ex.label" class="btn text-xs" @click="loadExample(ex)">
          {{ ex.label }}
        </button>
      </div>
    </div>

    <!-- Token Breakdown -->
    <div v-if="tokens.length > 0" class="card">
      <div class="flex items-center justify-between mb-3">
        <label class="label !mb-0">🧩 Pattern Breakdown</label>
        <button class="btn" @click="copyExplanation">📋 Copy Explanation</button>
      </div>
      <div class="space-y-1">
        <div v-for="(token, i) in tokens" :key="i"
            class="flex items-start gap-3 py-2 px-3 rounded-lg bg-gray-800 border border-gray-700">
          <span class="font-mono font-bold min-w-[80px] text-right" :class="tokenColor(token.type)">{{ token.pattern }}</span>
          <span class="text-sm text-gray-300">{{ token.description }}</span>
        </div>
      </div>
    </div>

    <!-- Test Section -->
    <div v-if="tokens.length > 0" class="card space-y-3">
      <label class="label">🧪 Test String</label>
      <textarea
          v-model="testString"
          placeholder="Type a string to test against the regex..."
          class="input font-mono resize-y min-h-[80px]"
          spellcheck="false"
      ></textarea>
      <div v-if="testString" class="space-y-3">
        <div class="flex items-center gap-4 text-sm">
          <span :class="matchCount > 0 ? 'text-green-400' : 'text-red-400'" class="font-medium">
            {{ matchCount > 0 ? `✅ ${matchCount} match${matchCount > 1 ? 'es' : ''}` : '❌ No matches' }}
          </span>
        </div>
        <div v-if="highlightedHtml" class="mono-box text-base" v-html="highlightedHtml"></div>
      </div>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const pattern = ref('')
const testString = ref('')
const error = ref('')
const copied = ref(false)
const tokens = ref<{ pattern: string; type: string; description: string }[]>([])

const flagOptions = reactive([
  { flag: 'g', label: 'global', active: true },
  { flag: 'i', label: 'case insensitive', active: false },
  { flag: 'm', label: 'multiline', active: false },
  { flag: 's', label: 'dotAll', active: false },
])

const examples = [
  { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', test: 'test@example.com hello@world.org' },
  { label: 'URL', pattern: 'https?://[\\w.-]+(?:\\.[a-z]{2,})(?:/[\\w.-]*)*', test: 'Visit https://example.com/path and http://test.org' },
  { label: 'Phone', pattern: '\\+?\\d{1,3}[- ]?\\d{3}[- ]?\\d{3}[- ]?\\d{4}', test: '+1-555-123-4567 and 333-444-5555' },
  { label: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', test: 'IPs: 192.168.1.1 and 10.0.0.255' },
  { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])', test: 'Dates: 2024-01-15 and 2023-12-31' },
  { label: 'Hex Color', pattern: '#[0-9a-fA-F]{3,8}\\b', test: 'Colors: #ff0000 #333 #aabbccdd' },
]

const activeFlags = computed(() => flagOptions.filter(f => f.active).map(f => f.flag).join(''))

const matchCount = computed(() => {
  if (!testString.value || !pattern.value) return 0
  try {
    const flags = activeFlags.value.includes('g') ? activeFlags.value : activeFlags.value + 'g'
    const re = new RegExp(pattern.value, flags)
    const matches = testString.value.match(re)
    return matches ? matches.length : 0
  } catch {
    return 0
  }
})

const highlightedHtml = computed(() => {
  if (!testString.value || !pattern.value) return ''
  try {
    const flags = activeFlags.value.includes('g') ? activeFlags.value : activeFlags.value + 'g'
    const re = new RegExp(pattern.value, flags)
    const escaped = escapeHtml(testString.value)
    const parts: { start: number; end: number }[] = []
    let m: RegExpExecArray | null
    const re2 = new RegExp(pattern.value, flags)
    while ((m = re2.exec(testString.value)) !== null) {
      if (m[0].length === 0) { re2.lastIndex++; continue }
      parts.push({ start: m.index, end: m.index + m[0].length })
    }
    if (parts.length === 0) return escaped

    let result = ''
    let last = 0
    for (const p of parts) {
      result += escapeHtml(testString.value.slice(last, p.start))
      result += '<span class="bg-indigo-600/50 text-white rounded px-0.5">' + escapeHtml(testString.value.slice(p.start, p.end)) + '</span>'
      last = p.end
    }
    result += escapeHtml(testString.value.slice(last))
    return result
  } catch {
    return escapeHtml(testString.value)
  }
})

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function clearAll() {
  pattern.value = ''
  testString.value = ''
  error.value = ''
  tokens.value = []
  copied.value = false
}

function loadExample(ex: { pattern: string; test: string }) {
  pattern.value = ex.pattern
  testString.value = ex.test
  analyze()
}

async function copyExplanation() {
  const text = tokens.value.map(t => `${t.pattern}  →  ${t.description}`).join('\n')
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function tokenColor(type: string): string {
  const colors: Record<string, string> = {
    'char-class': 'text-blue-400',
    'quantifier': 'text-yellow-400',
    'group': 'text-purple-400',
    'anchor': 'text-cyan-400',
    'alternation': 'text-orange-400',
    'escape': 'text-pink-400',
    'literal': 'text-gray-400',
    'bracket': 'text-blue-300',
  }
  return colors[type] || 'text-gray-400'
}

function analyze() {
  error.value = ''
  tokens.value = []
  copied.value = false

  const raw = pattern.value.trim()
  if (!raw) return

  try {
    new RegExp(raw)
  } catch (e) {
    error.value = 'Invalid regex: ' + (e as Error).message
    return
  }

  tokens.value = tokenize(raw)
}

function tokenize(pat: string): { pattern: string; type: string; description: string }[] {
  const result: { pattern: string; type: string; description: string }[] = []
  let i = 0

  while (i < pat.length) {
    const ch = pat[i]

    // Escaped sequences
    if (ch === '\\' && i + 1 < pat.length) {
      const next = pat[i + 1]
      const escapes: Record<string, { type: string; desc: string }> = {
        'd': { type: 'char-class', desc: 'Any digit [0-9]' },
        'D': { type: 'char-class', desc: 'Any non-digit [^0-9]' },
        'w': { type: 'char-class', desc: 'Any word character [a-zA-Z0-9_]' },
        'W': { type: 'char-class', desc: 'Any non-word character' },
        's': { type: 'char-class', desc: 'Any whitespace character' },
        'S': { type: 'char-class', desc: 'Any non-whitespace character' },
        'b': { type: 'anchor', desc: 'Word boundary' },
        'B': { type: 'anchor', desc: 'Non-word boundary' },
        'n': { type: 'escape', desc: 'Newline character' },
        't': { type: 'escape', desc: 'Tab character' },
        'r': { type: 'escape', desc: 'Carriage return' },
      }
      if (escapes[next]) {
        result.push({ pattern: '\\' + next, ...escapes[next] })
        i += 2
        continue
      }
      result.push({ pattern: '\\' + next, type: 'escape', description: `Literal "${next}"` })
      i += 2
      continue
    }

    // Character class [...]
    if (ch === '[') {
      let end = i + 1
      if (end < pat.length && pat[end] === '^') end++
      if (end < pat.length && pat[end] === ']') end++
      while (end < pat.length && pat[end] !== ']') {
        if (pat[end] === '\\' && end + 1 < pat.length) end++
        end++
      }
      const bracket = pat.slice(i, end + 1)
      const negated = bracket[1] === '^'
      result.push({
        pattern: bracket,
        type: 'bracket',
        description: negated ? `Any character NOT in ${bracket.slice(2, -1)}` : `Any character in ${bracket.slice(1, -1)}`
      })
      i = end + 1
      continue
    }

    // Groups
    if (ch === '(') {
      if (pat.slice(i, i + 3) === '(?:') {
        result.push({ pattern: '(?:', type: 'group', description: 'Non-capturing group start' })
        i += 3
        continue
      }
      if (pat.slice(i, i + 3) === '(?=') {
        result.push({ pattern: '(?=', type: 'group', description: 'Positive lookahead start' })
        i += 3
        continue
      }
      if (pat.slice(i, i + 3) === '(?!') {
        result.push({ pattern: '(?!', type: 'group', description: 'Negative lookahead start' })
        i += 3
        continue
      }
      if (pat.slice(i, i + 4) === '(?<=') {
        result.push({ pattern: '(?<=', type: 'group', description: 'Positive lookbehind start' })
        i += 4
        continue
      }
      if (pat.slice(i, i + 4) === '(?<!') {
        result.push({ pattern: '(?<!', type: 'group', description: 'Negative lookbehind start' })
        i += 4
        continue
      }
      const nameMatch = pat.slice(i).match(/^\(\?<([^>]+)>/)
      if (nameMatch) {
        result.push({ pattern: nameMatch[0], type: 'group', description: `Named capturing group "${nameMatch[1]}" start` })
        i += nameMatch[0].length
        continue
      }
      result.push({ pattern: '(', type: 'group', description: 'Capturing group start' })
      i++
      continue
    }

    if (ch === ')') {
      result.push({ pattern: ')', type: 'group', description: 'Group end' })
      i++
      continue
    }

    // Quantifiers
    if (ch === '{') {
      const qMatch = pat.slice(i).match(/^\{(\d+)(?:,(\d*))?\}/)
      if (qMatch) {
        const n = qMatch[1]
        const m = qMatch[2]
        let desc = ''
        if (m === undefined) desc = `Exactly ${n} times`
        else if (m === '') desc = `${n} or more times`
        else desc = `Between ${n} and ${m} times`
        result.push({ pattern: qMatch[0], type: 'quantifier', description: desc })
        i += qMatch[0].length
        continue
      }
    }

    if (ch === '*') {
      const lazy = i + 1 < pat.length && pat[i + 1] === '?'
      result.push({ pattern: lazy ? '*?' : '*', type: 'quantifier', description: lazy ? 'Zero or more times (lazy)' : 'Zero or more times (greedy)' })
      i += lazy ? 2 : 1
      continue
    }

    if (ch === '+') {
      const lazy = i + 1 < pat.length && pat[i + 1] === '?'
      result.push({ pattern: lazy ? '+?' : '+', type: 'quantifier', description: lazy ? 'One or more times (lazy)' : 'One or more times (greedy)' })
      i += lazy ? 2 : 1
      continue
    }

    if (ch === '?') {
      result.push({ pattern: '?', type: 'quantifier', description: 'Zero or one time (optional)' })
      i++
      continue
    }

    // Anchors
    if (ch === '^') {
      result.push({ pattern: '^', type: 'anchor', description: 'Start of string (or line in multiline mode)' })
      i++
      continue
    }

    if (ch === '$') {
      result.push({ pattern: '$', type: 'anchor', description: 'End of string (or line in multiline mode)' })
      i++
      continue
    }

    // Dot
    if (ch === '.') {
      result.push({ pattern: '.', type: 'char-class', description: 'Any character (except newline, unless dotAll flag)' })
      i++
      continue
    }

    // Alternation
    if (ch === '|') {
      result.push({ pattern: '|', type: 'alternation', description: 'OR — matches either the left or right side' })
      i++
      continue
    }

    // Literal
    result.push({ pattern: ch, type: 'literal', description: `Literal "${ch}"` })
    i++
  }

  return result
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
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
.warn {
  @apply text-sm text-red-400 bg-red-900/20 p-2 rounded-lg border border-red-700;
}
</style>
