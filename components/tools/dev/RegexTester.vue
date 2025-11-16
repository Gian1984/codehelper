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
              :class="['input font-mono flex-1', { 'border-red-500 border-2': error && pattern }]"
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
      <div v-else class="text-gray-300 text-sm flex items-center justify-between flex-wrap gap-2">
        <div>
          flags: <span class="font-mono text-white">/{{ flagsString }}/</span>
          • matches: <span class="font-mono text-white">{{ matches.length }}</span>
          <span v-if="trimmed" class="ml-2">• input truncated</span>
          <span v-if="timedOut" class="ml-2 text-yellow-400">• stopped early (time limit)</span>
          <span v-if="durationMs !== null" class="ml-2">• time: {{ durationMs }} ms</span>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button class="chip" @click="showExplainer = !showExplainer">
            {{ showExplainer ? '▼' : '▶' }} Pattern Explainer
          </button>
          <button class="chip" @click="showComplexity = !showComplexity">
            {{ showComplexity ? '▼' : '▶' }} Complexity
          </button>
          <button class="chip" @click="showCheatSheet = !showCheatSheet">
            {{ showCheatSheet ? '▼' : '▶' }} Cheat Sheet
          </button>
          <button class="chip" @click="showCodeGen = !showCodeGen">
            {{ showCodeGen ? '▼' : '▶' }} Code Generator
          </button>
        </div>
      </div>
    </div>

    <!-- Pattern Explainer -->
    <div v-if="showExplainer && pattern" class="bg-gray-900 border border-gray-700 rounded p-4 space-y-3">
      <h3 class="text-white font-semibold text-sm mb-3">🔍 Pattern Breakdown</h3>
      <div class="space-y-2">
        <div v-for="(part, idx) in explainedPattern" :key="idx"
             class="bg-gray-800 border border-gray-700 rounded p-2 flex items-start gap-3">
          <code class="text-yellow-300 font-mono text-sm font-bold min-w-[80px]">{{ part.text }}</code>
          <span class="text-gray-300 text-sm">{{ part.explanation }}</span>
        </div>
      </div>
      <p class="text-xs text-gray-400 mt-3 italic">
        💡 Tip: This is a simplified breakdown. Complex patterns may need manual interpretation.
      </p>
    </div>

    <!-- Complexity Analysis -->
    <div v-if="showComplexity && pattern" class="bg-gray-900 border border-gray-700 rounded p-4 space-y-2">
      <h3 class="text-white font-semibold text-sm mb-3">⚡ Complexity Analysis</h3>
      <div v-if="complexityAnalysis.length === 0" class="text-green-400 text-sm">
        ✓ No major issues detected - pattern looks good!
      </div>
      <div v-else class="space-y-2">
        <div v-for="(issue, idx) in complexityAnalysis" :key="idx"
             :class="{
               'bg-red-900/30 border-red-700 text-red-200': issue.level === 'danger',
               'bg-yellow-900/30 border-yellow-700 text-yellow-200': issue.level === 'warning',
               'bg-blue-900/30 border-blue-700 text-blue-200': issue.level === 'info'
             }"
             class="border rounded p-2 text-sm">
          <span v-if="issue.level === 'danger'">🔴</span>
          <span v-else-if="issue.level === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
          {{ issue.message }}
        </div>
      </div>
    </div>

    <!-- Regex Cheat Sheet -->
    <div v-if="showCheatSheet" class="bg-gray-900 border border-gray-700 rounded p-4">
      <h3 class="text-white font-semibold text-sm mb-3">📖 Regex Cheat Sheet</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div>
          <p class="text-gray-400 font-semibold mb-2">Character Classes</p>
          <ul class="space-y-1 text-gray-300 font-mono">
            <li><code class="text-yellow-400">\d</code> - digit [0-9]</li>
            <li><code class="text-yellow-400">\D</code> - not digit</li>
            <li><code class="text-yellow-400">\w</code> - word [A-Za-z0-9_]</li>
            <li><code class="text-yellow-400">\W</code> - not word</li>
            <li><code class="text-yellow-400">\s</code> - whitespace</li>
            <li><code class="text-yellow-400">\S</code> - not whitespace</li>
            <li><code class="text-yellow-400">.</code> - any char (except \n)</li>
            <li><code class="text-yellow-400">[abc]</code> - a, b, or c</li>
            <li><code class="text-yellow-400">[^abc]</code> - not a, b, or c</li>
          </ul>
        </div>
        <div>
          <p class="text-gray-400 font-semibold mb-2">Quantifiers</p>
          <ul class="space-y-1 text-gray-300 font-mono">
            <li><code class="text-green-400">*</code> - 0 or more</li>
            <li><code class="text-green-400">+</code> - 1 or more</li>
            <li><code class="text-green-400">?</code> - 0 or 1</li>
            <li><code class="text-green-400">{n}</code> - exactly n</li>
            <li><code class="text-green-400">{n,}</code> - n or more</li>
            <li><code class="text-green-400">{n,m}</code> - between n and m</li>
            <li><code class="text-green-400">*?</code> - lazy (non-greedy)</li>
            <li><code class="text-green-400">+?</code> - lazy</li>
          </ul>
        </div>
        <div>
          <p class="text-gray-400 font-semibold mb-2">Anchors & Boundaries</p>
          <ul class="space-y-1 text-gray-300 font-mono">
            <li><code class="text-blue-400">^</code> - start of string/line</li>
            <li><code class="text-blue-400">$</code> - end of string/line</li>
            <li><code class="text-blue-400">\b</code> - word boundary</li>
            <li><code class="text-blue-400">\B</code> - not word boundary</li>
          </ul>
        </div>
        <div>
          <p class="text-gray-400 font-semibold mb-2">Groups & References</p>
          <ul class="space-y-1 text-gray-300 font-mono">
            <li><code class="text-purple-400">(abc)</code> - capturing group</li>
            <li><code class="text-purple-400">(?:abc)</code> - non-capturing</li>
            <li><code class="text-purple-400">(?&lt;name&gt;abc)</code> - named group</li>
            <li><code class="text-purple-400">\1</code> - backreference to group 1</li>
            <li><code class="text-purple-400">\k&lt;name&gt;</code> - named backreference</li>
          </ul>
        </div>
        <div>
          <p class="text-gray-400 font-semibold mb-2">Lookaround</p>
          <ul class="space-y-1 text-gray-300 font-mono">
            <li><code class="text-pink-400">(?=abc)</code> - positive lookahead</li>
            <li><code class="text-pink-400">(?!abc)</code> - negative lookahead</li>
            <li><code class="text-pink-400">(?&lt;=abc)</code> - positive lookbehind</li>
            <li><code class="text-pink-400">(?&lt;!abc)</code> - negative lookbehind</li>
          </ul>
        </div>
        <div>
          <p class="text-gray-400 font-semibold mb-2">Flags</p>
          <ul class="space-y-1 text-gray-300 font-mono">
            <li><code class="text-orange-400">g</code> - global (all matches)</li>
            <li><code class="text-orange-400">i</code> - case insensitive</li>
            <li><code class="text-orange-400">m</code> - multiline (^ $ per line)</li>
            <li><code class="text-orange-400">s</code> - dotall (. matches \n)</li>
            <li><code class="text-orange-400">u</code> - unicode</li>
            <li><code class="text-orange-400">y</code> - sticky</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Code Generator -->
    <div v-if="showCodeGen" class="bg-gray-900 border border-gray-700 rounded p-4 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-white font-semibold text-sm">💻 Code Generator</h3>
        <div class="flex items-center gap-2">
          <select v-model="codeGenLang" class="input text-sm">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="php">PHP</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
          <button class="btn" @click="copy(generatedCode)">Copy Code</button>
        </div>
      </div>
      <pre class="bg-gray-950 rounded p-4 text-sm text-gray-100 font-mono overflow-x-auto border border-gray-800">{{ generatedCode }}</pre>
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
const showCheatSheet = ref<boolean>(false)
const showComplexity = ref<boolean>(false)
const showCodeGen = ref<boolean>(false)
const showExplainer = ref<boolean>(false)
const codeGenLang = ref<'javascript' | 'python' | 'php' | 'go' | 'rust'>('javascript')

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
    key: 'phone-us',
    label: 'Phone (US)',
    pattern: String.raw`\b(?:\+1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `+1-555-123-4567, (555) 987-6543, 5551234567`,
  },
  {
    key: 'phone-intl',
    label: 'Phone (International)',
    pattern: String.raw`\+(?:[0-9] ?){6,14}[0-9]`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `+1 555 123 4567, +44 20 7946 0958, +39 06 12345678`,
  },
  {
    key: 'creditcard',
    label: 'Credit Card',
    pattern: String.raw`\b(?:\d{4}[-\s]?){3}\d{4}\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `4532-1234-5678-9010, 5425 2334 3010 9903, 6011123456789012`,
  },
  {
    key: 'date-iso',
    label: 'Date (ISO 8601)',
    pattern: String.raw`\b\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `2025-11-16, 2024-01-01, 2023-12-31`,
  },
  {
    key: 'hex-color',
    label: 'Hex Color',
    pattern: String.raw`#(?:[0-9a-fA-F]{3}){1,2}\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `#fff, #FFFFFF, #a1b2c3, #123`,
  },
  {
    key: 'ipv4',
    label: 'IPv4',
    pattern: String.raw`\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `ok: 192.168.0.1, 8.8.8.8 — no: 999.999.0.1`,
  },
  {
    key: 'ipv6',
    label: 'IPv6 (simple)',
    pattern: String.raw`\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`,
  },
  {
    key: 'hashtag',
    label: 'Hashtag',
    pattern: String.raw`#(?<tag>[A-Za-z0-9_]{2,})`,
    flags: { g: true, i: false, m: false, s: false, u: true, y: false },
    sample: `try #regex #Dev_Tools`,
  },
  {
    key: 'uuid',
    label: 'UUID',
    pattern: String.raw`\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `550e8400-e29b-41d4-a716-446655440000, 123e4567-e89b-12d3-a456-426614174000`,
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

// Code generation for different languages
const generatedCode = computed(() => {
  const p = pattern.value || '(.*)'
  const f = flagsString.value
  const lang = codeGenLang.value

  const escapeForLang = (s: string, lang: string) => {
    if (lang === 'python' || lang === 'php') {
      return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    }
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  }

  const escaped = escapeForLang(p, lang)

  switch (lang) {
    case 'javascript':
      return `// JavaScript (ECMAScript)
const pattern = /${p}/${f};
const text = "your text here";

// Test if pattern matches
if (pattern.test(text)) {
  console.log("Match found!");
}

// Find all matches
const matches = text.match(pattern);
console.log(matches);

// Replace
const replaced = text.replace(pattern, "replacement");`

    case 'python':
      const pyFlags = []
      if (f.includes('i')) pyFlags.push('re.IGNORECASE')
      if (f.includes('m')) pyFlags.push('re.MULTILINE')
      if (f.includes('s')) pyFlags.push('re.DOTALL')
      const pyFlagsStr = pyFlags.length > 0 ? `, ${pyFlags.join(' | ')}` : ''

      return `# Python
import re

pattern = r'${escaped}'
text = "your text here"

# Compile pattern (optional, for reuse)
regex = re.compile(pattern${pyFlagsStr})

# Test if pattern matches
if regex.search(text):
    print("Match found!")

# Find all matches
matches = regex.findall(text)
print(matches)

# Replace
replaced = regex.sub("replacement", text)`

    case 'php':
      const phpMods = f.replace('g', '') // PHP doesn't have 'g', all are global
      return `<?php
// PHP (PCRE)
$pattern = '/${escaped}/${phpMods}';
$text = "your text here";

// Test if pattern matches
if (preg_match($pattern, $text)) {
    echo "Match found!\\n";
}

// Find all matches
preg_match_all($pattern, $text, $matches);
print_r($matches);

// Replace
$replaced = preg_replace($pattern, "replacement", $text);
?>`

    case 'go':
      return `// Go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := \`${p}\`
    text := "your text here"

    // Compile regex
    re := regexp.MustCompile(pattern)

    // Test if pattern matches
    if re.MatchString(text) {
        fmt.Println("Match found!")
    }

    // Find all matches
    matches := re.FindAllString(text, -1)
    fmt.Println(matches)

    // Replace
    replaced := re.ReplaceAllString(text, "replacement")
    fmt.Println(replaced)
}`

    case 'rust':
      return `// Rust
use regex::Regex;

fn main() {
    let pattern = r"${escaped}";
    let text = "your text here";

    // Compile regex
    let re = Regex::new(pattern).unwrap();

    // Test if pattern matches
    if re.is_match(text) {
        println!("Match found!");
    }

    // Find all matches
    for cap in re.captures_iter(text) {
        println!("{:?}", &cap[0]);
    }

    // Replace
    let replaced = re.replace_all(text, "replacement");
    println!("{}", replaced);
}`

    default:
      return ''
  }
})

// Regex explainer - simple pattern breakdown
type ExplainedPart = { text: string; explanation: string }
const explainedPattern = computed<ExplainedPart[]>(() => {
  const p = pattern.value
  if (!p) return []

  const parts: ExplainedPart[] = []
  const rules: Array<[RegExp, string]> = [
    [/^\^/, 'Start of string/line'],
    [/\$$/, 'End of string/line'],
    [/\\d/, 'Digit (0-9)'],
    [/\\D/, 'Not a digit'],
    [/\\w/, 'Word character (A-Za-z0-9_)'],
    [/\\W/, 'Not a word character'],
    [/\\s/, 'Whitespace (space, tab, newline)'],
    [/\\S/, 'Not whitespace'],
    [/\\b/, 'Word boundary'],
    [/\\B/, 'Not word boundary'],
    [/\./, 'Any character (except newline)'],
    [/\*/, '0 or more of previous'],
    [/\+/, '1 or more of previous'],
    [/\?/, '0 or 1 of previous (optional)'],
    [/\{(\d+)\}/, 'Exactly $1 times'],
    [/\{(\d+),\}/, 'At least $1 times'],
    [/\{(\d+),(\d+)\}/, 'Between $1 and $2 times'],
    [/\[([^\]]+)\]/, 'One of: $1'],
    [/\(([^)]+)\)/, 'Capture group: $1'],
    [/\(\?:([^)]+)\)/, 'Non-capturing group: $1'],
    [/\(\?<(\w+)>([^)]+)\)/, 'Named group "$1": $2'],
    [/\(\?=([^)]+)\)/, 'Positive lookahead: $1'],
    [/\(\?!([^)]+)\)/, 'Negative lookahead: $1'],
    [/\(\?<=([^)]+)\)/, 'Positive lookbehind: $1'],
    [/\(\?<!([^)]+)\)/, 'Negative lookbehind: $1'],
    [/\|/, 'OR (alternation)'],
  ]

  let remaining = p
  let pos = 0

  while (remaining.length > 0 && pos < 100) { // safety limit
    let matched = false

    for (const [regex, explanation] of rules) {
      const match = remaining.match(regex)
      if (match && match.index === 0) {
        let exp = explanation
        // Replace placeholders
        if (match[1]) exp = exp.replace('$1', match[1])
        if (match[2]) exp = exp.replace('$2', match[2])

        parts.push({ text: match[0], explanation: exp })
        remaining = remaining.slice(match[0].length)
        matched = true
        break
      }
    }

    if (!matched) {
      // Take next character as literal
      const char = remaining[0]
      parts.push({ text: char, explanation: `Literal character: "${char}"` })
      remaining = remaining.slice(1)
    }

    pos++
  }

  return parts
})

// Complexity analysis
type ComplexityIssue = { level: 'warning' | 'danger' | 'info'; message: string }
const complexityAnalysis = computed<ComplexityIssue[]>(() => {
  const p = pattern.value
  if (!p) return []

  const issues: ComplexityIssue[] = []

  // Nested quantifiers (catastrophic backtracking risk)
  if (/((\+|\*|\{[^}]+\})[^)]*){2,}/i.test(p)) {
    issues.push({ level: 'danger', message: 'Nested quantifiers detected - risk of catastrophic backtracking!' })
  }

  // Many alternations
  const alts = (p.match(/\|/g) || []).length
  if (alts > 10) {
    issues.push({ level: 'warning', message: `${alts} alternations (|) - may be slow` })
  }

  // Very long pattern
  if (p.length > 200) {
    issues.push({ level: 'info', message: `Pattern is ${p.length} characters - consider simplifying` })
  }

  // Multiple lookaheads/lookbehinds
  const lookCount = (p.match(/\(\?[=!<]/g) || []).length
  if (lookCount > 3) {
    issues.push({ level: 'warning', message: `${lookCount} lookahead/lookbehind assertions - may impact performance` })
  }

  // Greedy quantifiers without anchors
  if (/(\.\*|\.\+)/.test(p) && !/(^|\$)/.test(p)) {
    issues.push({ level: 'info', message: 'Greedy quantifiers without anchors - consider using anchors (^ $)' })
  }

  // Capturing groups count
  const capturingGroups = (p.match(/(?<!\\)\((?!\?)/g) || []).length
  if (capturingGroups > 9) {
    issues.push({ level: 'info', message: `${capturingGroups} capturing groups - consider using non-capturing groups (?:)` })
  }

  return issues
})

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
