<template>
  <div class="space-y-5 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Text case converter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="swapIO" :disabled="!outputText">swap</button>
        <button class="btn-warning" @click="clearAll">clear</button>
      </div>
    </div>

    <!-- input -->
    <div class="space-y-2">
      <label class="label">Paste your text</label>
      <textarea
          v-model="inputText"
          rows="8"
          class="w-full px-3 py-2 rounded border border-gray-800 bg-gray-950 text-white resize-y"
          placeholder="Paste or type here…"
      ></textarea>
      <div class="text-xs text-gray-400 flex gap-4">
        <span>chars: {{ stats.in.chars }}</span>
        <span>words: {{ stats.in.words }}</span>
        <span>lines: {{ stats.in.lines }}</span>
      </div>
    </div>

    <!-- controls -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card space-y-3">
        <label class="block">
          <span class="label">target case</span>
          <select v-model="mode" class="input">
            <option value="upper">UPPERCASE</option>
            <option value="lower">lowercase</option>
            <option value="sentence">Sentence case</option>
            <option value="title">Title Case (AP-ish)</option>
            <option value="capitalize">Capitalize Each Word</option>
            <option value="camel">camelCase</option>
            <option value="pascal">PascalCase</option>
            <option value="snake">snake_case</option>
            <option value="kebab">kebab-case</option>
            <option value="constant">CONSTANT_CASE</option>
            <option value="train">Train-Case</option>
          </select>
        </label>

        <label class="block">
          <span class="label">locale (for upper/lower)</span>
          <select v-model="locale" class="input">
            <option v-for="l in locales" :key="l" :value="l">{{ l }}</option>
          </select>
        </label>
      </div>

      <div class="card space-y-2">
        <label class="inline-flex items-center gap-2 mr-2">
          <input type="checkbox" v-model="opts.trim" class="w-4 h-4" />
          <span class="text-sm">trim ends</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.collapse" class="w-4 h-4" />
          <span class="text-sm">collapse whitespace</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.preserveAcronyms" class="w-4 h-4" />
          <span class="text-sm">preserve acronyms (API, HTTP)</span>
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="opts.keepPunctSpacing" class="w-4 h-4" />
          <span class="text-sm">keep punctuation spacing</span>
        </label>
      </div>

      <div class="card space-y-2">
        <div class="grid grid-cols-2 gap-2">
          <button class="btn-primary" @click="copyOutput" :disabled="!outputText">copy</button>
          <button class="btn" @click="downloadTxt" :disabled="!outputText">download .txt</button>
        </div>
        <div class="text-xs text-gray-400" v-if="copiedMessage">{{ copiedMessage }}</div>
      </div>
    </div>

    <!-- output -->
    <div v-if="outputText" class="space-y-2">
      <label class="label">result</label>
      <pre class="w-full max-h-[50vh] overflow-auto px-3 py-2 rounded border border-gray-800 bg-gray-950 text-gray-50 whitespace-pre-wrap break-words">{{ outputText }}</pre>
      <div class="text-xs text-gray-400 flex gap-4 justify-end">
        <span>chars: {{ stats.out.chars }}</span>
        <span>words: {{ stats.out.words }}</span>
        <span>lines: {{ stats.out.lines }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

/* -------- types & state -------- */
type Mode = 'upper' | 'lower' | 'sentence' | 'title' | 'capitalize' | 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant' | 'train'

const inputText = ref<string>('')
const outputText = ref<string>('')

const mode = ref<Mode>('sentence')
const locale = ref<string>('en')   // used by toLocaleLowerCase/UpperCase
const locales = ['en','it','fr','de','es','tr','nl','pt','sv','pl']

const copiedMessage = ref<string>('')

const opts = ref({
  trim: true,
  collapse: true,
  preserveAcronyms: true,
  keepPunctSpacing: true,
})

/* -------- main computed -------- */
watch([inputText, mode, locale, opts], () => {
  outputText.value = transform(inputText.value, mode.value)
}, { immediate: true, deep: true })

/* -------- transformation pipeline -------- */
function normalizeBase(s: string): string {
  let t = s
  if (opts.value.trim) t = t.trim()
  if (opts.value.collapse) {
    // collapse common whitespace but preserve single newlines
    t = t.replace(/\r\n/g, '\n').replace(/[ \t\f\v]+/g, ' ')
    // collapse >1 blank lines to a single blank line
    t = t.replace(/\n{3,}/g, '\n\n')
  }
  if (opts.value.keepPunctSpacing) {
    // normalize space around punctuation
    t = t.replace(/\s+([,.;:!?])/g, '$1').replace(/([,.;:!?])(?=\S)/g, '$1 ')
  }
  return t
}

function transform(s: string, m: Mode): string {
  const t = normalizeBase(s)
  switch (m) {
    case 'upper':     return t.toLocaleUpperCase(locale.value)
    case 'lower':     return t.toLocaleLowerCase(locale.value)
    case 'sentence':  return toSentenceCase(t, locale.value)
    case 'title':     return toTitleCase(t, locale.value, opts.value.preserveAcronyms)
    case 'capitalize':return capitalizeEachWord(t, locale.value)
    case 'camel':     return toCamelLike(t, 'camel', locale.value)
    case 'pascal':    return toCamelLike(t, 'pascal', locale.value)
    case 'snake':     return toDelimited(t, '_', 'lower', locale.value)
    case 'kebab':     return toDelimited(t, '-', 'lower', locale.value)
    case 'constant':  return toDelimited(t, '_', 'upper', locale.value)
    case 'train':     return toDelimited(t, '-', 'title', locale.value)
  }
}

/* -------- helpers: tokenization -------- */
// split words while keeping URLs/emails intact
const URL_RE = /\b(?:https?:\/\/|www\.)[^\s]+/i
const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
function tokenize(s: string): string[] {
  // replace urls/emails with sentinels
  const stash = new Map<string,string>()
  let i = 0
  const stashIt = (m:string) => { const k = `§§${i++}§§`; stash.set(k, m); return k }
  let t = s.replace(URL_RE, stashIt).replace(EMAIL_RE, stashIt)
  // split on non-letters/numbers (keep apostrophes within words)
  const parts = t.split(/([^A-Za-z0-9']+)/).filter(p => p !== '')
  // restore stashed
  return parts.map(p => (stash.has(p) ? stash.get(p)! : p))
}

/* -------- sentence case -------- */
const ABBR_RE = /\b(?:e\.g\.|i\.e\.|mr\.|mrs\.|ms\.|dr\.|prof\.|sr\.|jr\.|u\.s\.|u\.k\.)$/i
function toSentenceCase(s: string, loc: string): string {
  const lower = s.toLocaleLowerCase(loc)
  // split into sentences by punctuation followed by space/newline
  const chunks = lower.split(/([.!?]+)(\s+|\n|$)/)
  let out = ''
  for (let i = 0; i < chunks.length; i += 3) {
    const seg = chunks[i] ?? ''
    const punct = chunks[i+1] ?? ''
    const sep = chunks[i+2] ?? ''
    if (!seg) continue
    // guard abbreviations at the end of segment (don't force new sentence)
    const trimmed = seg.trimStart()
    const cap = trimmed.replace(/^\s*\S/, (c) => c.toLocaleUpperCase(loc))
    out += cap + punct + sep
  }
  return out
}

/* -------- title case (AP-ish) -------- */
const SMALL = new Set([
  'a','an','and','as','at','but','by','for','in','nor','of','on','or','per','the','to','vs','via','with','over','into','onto','from'
])
function toTitleCase(s: string, loc: string, keepAcronyms: boolean): string {
  const tokens = tokenize(s)
  const words = tokens.filter(t => /\w/.test(t))
  const firstIdx = tokens.findIndex(t => /\w/.test(t))
  const lastIdx = tokens.length - 1 - [...tokens].reverse().findIndex(t => /\w/.test(t))
  return tokens.map((tok, idx) => {
    if (!/\w/.test(tok)) return tok // punctuation/space
    // preserve acronyms like API/HTTP
    if (keepAcronyms && /^[A-Z0-9]{2,}$/.test(tok)) return tok
    const lowerTok = tok.toLocaleLowerCase(loc)
    const isSmall = SMALL.has(lowerTok)
    const shouldCap = idx === firstIdx || idx === lastIdx || !isSmall || /^[("'\[]/.test(tokens[idx - 1] || '')
    if (shouldCap) return lowerTok.replace(/\b\w/g, c => c.toLocaleUpperCase(loc))
    return lowerTok
  }).join('')
}

/* -------- capitalize each word -------- */
function capitalizeEachWord(s: string, loc: string): string {
  return tokenize(s).map(tok => /\w/.test(tok)
      ? tok.toLocaleLowerCase(loc).replace(/\b\w/g, c => c.toLocaleUpperCase(loc))
      : tok
  ).join('')
}

/* -------- camel/pascal -------- */
function toCamelLike(s: string, kind: 'camel'|'pascal', loc: string): string {
  const words = s
      // split on non-alphanum
      .split(/[^A-Za-z0-9]+/)
      .filter(Boolean)
  const norm = words.map(w => w.toLocaleLowerCase(loc))
  if (norm.length === 0) return ''
  const head = kind === 'camel' ? norm[0] : norm[0].replace(/^\w/, c => c.toLocaleUpperCase(loc))
  const tail = norm.slice(1).map(w => w.replace(/^\w/, c => c.toLocaleUpperCase(loc)))
  return [head, ...tail].join('')
}

/* -------- delimited cases (snake/kebab/constant/train) -------- */
function toDelimited(s: string, delim: '_'|'-', letterCase: 'lower'|'upper'|'title', loc: string): string {
  const words = s
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // split camel
      .split(/[^A-Za-z0-9]+/)
      .filter(Boolean)
  let mapped = words
  if (letterCase === 'lower') mapped = words.map(w => w.toLocaleLowerCase(loc))
  if (letterCase === 'upper') mapped = words.map(w => w.toLocaleUpperCase(loc))
  if (letterCase === 'title') mapped = words.map(w => w.charAt(0).toLocaleUpperCase(loc) + w.slice(1).toLocaleLowerCase(loc))
  const joined = mapped.join(delim)
  if (letterCase === 'title' && delim === '-') return joined // Train-Case
  return joined
}

/* -------- actions -------- */
async function copyOutput() {
  if (!outputText.value) return
  await navigator.clipboard.writeText(outputText.value)
  copiedMessage.value = 'copied!'
  setTimeout(() => (copiedMessage.value = ''), 1200)
}
function downloadTxt() {
  if (!outputText.value) return
  const blob = new Blob([outputText.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'converted.txt'
  a.click()
  URL.revokeObjectURL(url)
}
function clearAll() {
  inputText.value = ''
  outputText.value = ''
  copiedMessage.value = ''
}
function swapIO() {
  if (!outputText.value) return
  const tmp = inputText.value
  inputText.value = outputText.value
  outputText.value = tmp
}

/* -------- stats -------- */
const stats = computed(() => {
  const statFor = (t: string) => ({
    chars: t.length,
    words: (t.trim().match(/\S+/g) || []).length,
    lines: t === '' ? 0 : t.split(/\n/).length,
  })
  return { in: statFor(inputText.value), out: statFor(outputText.value) }
})
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.btn-warning { @apply bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
</style>
