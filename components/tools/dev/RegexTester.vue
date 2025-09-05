<template>
  <div class="p-8 bg-gray-800 rounded-2xl shadow-xl space-y-6 text-gray-100">
    <h2 class="text-2xl font-semibold">Regex Tester</h2>

    <!-- Pattern + Flags -->
    <div class="grid md:grid-cols-3 gap-4">
      <div class="md:col-span-2 space-y-2">
        <label class="block text-sm text-gray-300">pattern</label>
        <div class="flex gap-2">
          <input
              v-model="pattern"
              spellcheck="false"
              placeholder="e.g. ^\\w+@\\w+\\.\\w+$"
              class="input font-mono flex-1"
              @keydown.tab.prevent="insertAtCursor('\\t')"
          />
          <button class="btn" @click="run">run</button>
          <button class="btn" @click="clearAll">clear</button>
        </div>
        <p class="text-xs text-gray-400">JavaScript (ECMAScript) regular expressions.</p>

        <!-- Quick tokens -->
        <div class="flex flex-wrap gap-2">
          <button v-for="t in TOKENS" :key="t.label" class="chip" @click="insertAtCursor(t.snippet)" :title="t.title">{{ t.label }}</button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm text-gray-300">flags</label>
        <div class="flex flex-wrap gap-2 text-white">
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.g" /> g</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.i" /> i</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.m" /> m</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.s" /> s</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.u" /> u</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.y" /> y</label>
        </div>

        <label class="block text-sm text-gray-300 mt-2">highlight</label>
        <select v-model="highlightMode" class="input">
          <option value="all">All matches</option>
          <option value="first">First match only</option>
        </select>
      </div>
    </div>

    <!-- Sample + Examples + Replace -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-sm text-gray-300">sample input</label>
          <div class="flex items-center gap-2">
            <select class="input" v-model="exampleKey" @change="applyExample">
              <option value="">— examples —</option>
              <option v-for="ex in EXAMPLES" :key="ex.key" :value="ex.key">{{ ex.label }}</option>
            </select>
            <label class="inline-flex items-center gap-2 text-xs text-gray-300">
              <input type="checkbox" v-model="autoRun" />
              auto-run
            </label>
          </div>
        </div>

        <textarea
            ref="sampleArea"
            v-model="sample"
            spellcheck="false"
            rows="10"
            class="input font-mono"
            placeholder="Paste the text to test…"
            @input="maybeRun"
        ></textarea>

        <p class="text-xs text-gray-400">
          Max processed: {{ MAX_INPUT.toLocaleString() }} characters. Matches capped at {{ MAX_MATCHES.toLocaleString() }}.
        </p>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-sm text-gray-300 mb-1">replacement (optional)</label>
          <input
              v-model="replacement"
              spellcheck="false"
              placeholder="e.g. $1 or $& or $<name>"
              class="input font-mono"
              @input="maybeRun"
          />
          <p class="text-xs text-gray-400">
            Use <code>$1, $2…</code> for numbered groups, <code>$&</code> full match, <code>$&lt;name&gt;</code> for named groups.
          </p>
        </div>

        <div class="bg-gray-950 rounded border border-gray-800 p-4">
          <div class="flex items-center justify-between mb-2">
            <p class="text-gray-300 text-sm">replace output</p>
            <button class="btn" @click="copy(replaceOutput)" :disabled="!replaceOutput">copy</button>
          </div>
          <pre class="text-white font-mono whitespace-pre-wrap break-words">{{ replaceOutput || '—' }}</pre>
        </div>
      </div>
    </div>

    <!-- Errors / Info -->
    <div>
      <div v-if="error" class="bg-red-900/40 border border-red-700 text-red-200 rounded p-3">
        <strong>error:</strong> {{ error }}
      </div>
      <div v-else class="text-gray-300 text-sm">
        flags: <span class="font-mono text-white">/{{ flagsString }}/</span>
        • matches: <span class="font-mono text-white">{{ matches.length }}</span>
        <span v-if="trimmed" class="ml-2">• input truncated</span>
        <span v-if="timedOut" class="ml-2 text-yellow-400">• stopped early (time limit)</span>
        <span v-if="durationMs !== null" class="ml-2">• time: {{ durationMs }} ms</span>
      </div>
    </div>

    <!-- Highlighted preview -->
    <div class="space-y-2">
      <p class="text-sm text-gray-300">highlight</p>
      <div class="bg-gray-950 rounded border border-gray-800 p-4 min-h-24">
        <div class="text-white font-mono whitespace-pre-wrap break-words" v-html="highlightHtml"></div>
      </div>
    </div>

    <!-- Matches detail -->
    <div class="space-y-2">
      <p class="text-sm text-gray-300">matches & groups</p>
      <div class="bg-gray-950 rounded border border-gray-800 p-4">
        <div v-if="matches.length === 0" class="text-gray-400 text-sm">no match.</div>

        <div v-for="(m, idx) in matches" :key="idx" class="mb-4">
          <div class="flex items-center justify-between">
            <p class="text-white font-mono">
              #{{ idx + 1 }} [{{ m.index }}–{{ m.index + m[0].length }}): <span class="bg-yellow-600/30 px-1 rounded">{{ m[0] }}</span>
            </p>
            <button class="btn" @click="copy(m[0])">copy</button>
          </div>
          <div class="mt-2 grid sm:grid-cols-2 gap-3">
            <div>
              <p class="text-gray-300 text-xs mb-1">positional groups</p>
              <ul class="text-white font-mono text-sm space-y-1">
                <li v-if="m.length === 1" class="text-gray-400">—</li>
                <li v-for="(g,gIdx) in m.slice(1)" :key="gIdx">
                  ${{ gIdx+1 }} = <span class="bg-blue-600/30 px-1 rounded">{{ g ?? 'null' }}</span>
                </li>
              </ul>
            </div>
            <div>
              <p class="text-gray-300 text-xs mb-1">named groups</p>
              <ul class="text-white font-mono text-sm space-y-1">
                <li v-if="!m.groups || Object.keys(m.groups).length===0" class="text-gray-400">—</li>
                <li v-for="(val, name) in (m.groups || {})" :key="name">
                  &lt;{{ name }}&gt; = <span class="bg-green-600/30 px-1 rounded">{{ val }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="matches.length">
          <div class="flex items-center justify-between mt-4">
            <p class="text-gray-300 text-sm">matches (JSON)</p>
            <button class="btn" @click="copy(matchesJson)">copy</button>
          </div>
          <pre class="text-white font-mono whitespace-pre-wrap break-words">{{ matchesJson }}</pre>
        </div>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

/** Limits to keep the UI snappy and safe */
const MAX_INPUT = 100_000
const MAX_MATCHES = 1_000
const TIME_LIMIT_MS = 120 /* soft time cap for global scans */

const pattern = ref<string>('')
const flags = reactive({ g: true, i: false, m: false, s: false, u: false, y: false })
const sample = ref<string>('')
const replacement = ref<string>('')

const error = ref<string>('')
const copiedMsg = ref<string>('')
const exampleKey = ref<string>('')

const highlightMode = ref<'all' | 'first'>('all')
const autoRun = ref<boolean>(true)

const durationMs = ref<number | null>(null)
const timedOut = ref<boolean>(false)

/** Quick tokens toolbar */
const TOKENS = [
  { label: '\\d', snippet: '\\\\d', title: 'digit' },
  { label: '\\w', snippet: '\\\\w', title: 'word char' },
  { label: '\\s', snippet: '\\\\s', title: 'whitespace' },
  { label: '.', snippet: '.', title: 'any char' },
  { label: '^ $', snippet: '^$' , title: 'start & end anchors' },
  { label: '[]', snippet: '[]', title: 'character class' },
  { label: '()', snippet: '()', title: 'capturing group' },
  { label: '(?:)', snippet: '(?:)', title: 'non-capturing group' },
  { label: '(?=)', snippet: '(?=)', title: 'lookahead' },
  { label: '(?<=)', snippet: '(?<=)', title: 'lookbehind (needs u flag in some engines)' },
  { label: '{m,n}', snippet: '{m,n}', title: 'quantifier' },
  { label: '|', snippet: '|', title: 'alternation' },
] as const

/** Examples */
const EXAMPLES = [
  {
    key: 'email',
    label: 'Email (simple)',
    pattern: String.raw`\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`,
    flags: { g: true, i: true, m: false, s: false, u: false, y: false },
    sample: `contacts: mario.rossi@example.com, test@domain.io — NOT: foo@bar`,
  },
  {
    key: 'url',
    label: 'URL (http/https)',
    pattern: String.raw`https?:\/\/[^\s/$.?#].[^\s]*`,
    flags: { g: true, i: true, m: false, s: false, u: false, y: false },
    sample: `see https://codehelper.me and http://example.org/page?q=1`,
  },
  {
    key: 'ipv4',
    label: 'IPv4',
    pattern: String.raw`\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `ok: 192.168.0.1, 8.8.8.8 — no: 999.999.0.1`,
  },
  {
    key: 'hashtag',
    label: 'Hashtag',
    pattern: String.raw`#(?<tag>[A-Za-z0-9_]{2,})`,
    flags: { g: true, i: false, m: false, s: false, u: true, y: false },
    sample: `try #regex #Dev_Tools`,
  },
] as const

/* ---------------------------------- helpers ---------------------------------- */
const sampleArea = ref<HTMLTextAreaElement | null>(null)

function insertAtCursor(text: string) {
  const el = sampleArea.value ? null : null /* keep for pattern input instead */
  // insert into PATTERN input (more useful)
  const inputEl = document.querySelector<HTMLInputElement>('input.input.font-mono')
  if (!inputEl) { pattern.value += text; return }
  const start = inputEl.selectionStart ?? pattern.value.length
  const end = inputEl.selectionEnd ?? pattern.value.length
  pattern.value = pattern.value.slice(0, start) + text + pattern.value.slice(end)
  nextTickMicro(() => {
    inputEl.selectionStart = inputEl.selectionEnd = start + text.length
    inputEl.focus()
    if (autoRun.value) run()
  })
}

function nextTickMicro(cb: () => void) { Promise.resolve().then(cb) }

const flagsString = computed(() => Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join(''))

function buildRegex(): RegExp | null {
  error.value = ''
  try {
    return new RegExp(pattern.value, flagsString.value)
  } catch (e: any) {
    error.value = e?.message ?? String(e)
    return null
  }
}

function copy(text: string) {
  if (!text) return
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'copied!'
  setTimeout(() => (copiedMsg.value = ''), 1200)
}

const trimmedSample = computed(() => sample.value.length > MAX_INPUT ? sample.value.slice(0, MAX_INPUT) : sample.value)
const trimmed = computed(() => sample.value.length > MAX_INPUT)

/* ---------------------------------- core ---------------------------------- */
type ExecMatch = RegExpExecArray & { groups?: Record<string, string>; index: number }

const matches = computed<ExecMatch[]>(() => {
  durationMs.value = null
  timedOut.value = false
  const re = buildRegex()
  if (!re) return []
  const text = trimmedSample.value
  const start = performance.now()

  const out: ExecMatch[] = []
  let count = 0

  if (re.global || re.sticky) {
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      out.push(m as ExecMatch)
      count++
      if (count >= MAX_MATCHES) break
      if (m[0] === '') re.lastIndex++ // avoid infinite loop on zero-length matches
      if (performance.now() - start > TIME_LIMIT_MS) { timedOut.value = true; break }
      if (highlightMode.value === 'first') break
    }
  } else {
    const m = re.exec(text)
    if (m) out.push(m as ExecMatch)
  }

  durationMs.value = Math.round(performance.now() - start)
  return out
})

/** Highlight with <mark> (first or all). Escapes the rest safely. */
const highlightHtml = computed(() => {
  const text = trimmedSample.value
  const re = buildRegex()
  if (!text) return ''
  if (!re) return escapeHtml(text)

  if (!(re.global || re.sticky) || highlightMode.value === 'first') {
    const m = re.exec(text)
    if (!m) return escapeHtml(text)
    const s = m.index, e = s + m[0].length
    return escapeHtml(text.slice(0, s))
        + mark(m[0])
        + escapeHtml(text.slice(e))
  }

  let last = 0, html = ''
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const s = m.index, e = s + m[0].length
    html += escapeHtml(text.slice(last, s)) + mark(m[0])
    last = e
    if (m[0] === '') re.lastIndex++
    if (performance.now() - (durationMs.value ?? 0) > TIME_LIMIT_MS || html.length > 2_000_000) break
  }
  html += escapeHtml(text.slice(last))
  return html
})

/** Replacement preview */
const replaceOutput = computed(() => {
  const re = buildRegex()
  if (!re || !replacement.value) return ''
  try {
    return trimmedSample.value.replace(re, replacement.value)
  } catch (e: any) {
    error.value = e?.message ?? String(e)
    return ''
  }
})

/** Matches JSON */
const matchesJson = computed(() => {
  const simple = matches.value.map(m => ({
    match: m[0],
    index: m.index,
    groups: m.groups || {},
    captures: Array.from(m).slice(1),
  }))
  return JSON.stringify(simple, null, 2)
})

/* ---------------------------------- utils ---------------------------------- */
function mark(s: string) {
  return `<mark class="bg-yellow-600/50 text-white rounded px-0.5">${escapeHtml(s)}</mark>`
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c] as string))
}

function clearAll() {
  pattern.value = ''
  sample.value = ''
  replacement.value = ''
  exampleKey.value = ''
}

function run() {
  // computed props react automatically; we just nudge by reading them
  void matches.value; void highlightHtml.value; void replaceOutput.value
}

function maybeRun() {
  if (autoRun.value) run()
}

/** examples */
function applyExample() {
  const ex = EXAMPLES.find(e => e.key === exampleKey.value)
  if (!ex) return
  pattern.value = ex.pattern
  sample.value = ex.sample
  Object.assign(flags, ex.flags)
  run()
}

/** persistence */
const STORAGE_KEY = 'regex-tester-state'
watch([pattern, () => ({ ...flags }), sample, replacement, highlightMode], () => {
  const payload = { pattern: pattern.value, flags: { ...flags }, sample: sample.value, replacement: replacement.value, highlightMode: highlightMode.value }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)) } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (typeof s?.pattern === 'string') pattern.value = s.pattern
      if (s?.flags) Object.assign(flags, s.flags)
      if (typeof s?.sample === 'string') sample.value = s.sample
      if (typeof s?.replacement === 'string') replacement.value = s.replacement
      if (s?.highlightMode === 'first' || s?.highlightMode === 'all') highlightMode.value = s.highlightMode
    } else {
      exampleKey.value = 'email'
      applyExample()
    }
  } catch {}
})
</script>

<style scoped>
.input { @apply bg-gray-950 text-white border border-gray-800 rounded px-3 py-2 w-full; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed; }
.chip { @apply bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded text-xs; }
</style>
