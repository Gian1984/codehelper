<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-2xl font-semibold">📝 Lorem Ipsum Generator</h2>
          <p class="text-sm text-gray-400 mt-1">Generate placeholder text in multiple variants and formats</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn" @click="randomizeSeed">🔀 randomize</button>
          <button class="btn-danger" @click="clearAll">🗑️ clear</button>
        </div>
      </div>
    </div>

    <!-- controls -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card space-y-3">
        <label class="block">
          <span class="label">type</span>
          <select v-model="unit" class="input">
            <option value="characters">characters</option>
            <option value="words">words</option>
            <option value="sentences">sentences</option>
            <option value="paragraphs">paragraphs</option>
          </select>
        </label>

        <label class="block">
          <span class="label">amount</span>
          <input v-model.number="amount" type="number" min="1" class="input" />
        </label>

        <label class="block">
          <span class="label">variant</span>
          <select v-model="variant" class="input">
            <option value="classic">classic</option>
            <option value="tech">tech</option>
            <option value="startup">startup</option>
            <option value="bacon">bacon</option>
          </select>
        </label>

        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="startWithLorem" class="w-4 h-4" />
          <span class="text-sm">start with “lorem ipsum…”</span>
        </label>
      </div>

      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="label">avg sentence length</span>
            <input v-model.number="avgLen" type="range" min="6" max="18" step="1" class="w-full" />
          </label>
          <label class="block">
            <span class="label">variability</span>
            <input v-model.number="variability" type="range" min="0" max="1" step="0.05" class="w-full" />
          </label>
        </div>

        <label class="block">
          <span class="label">sentences per paragraph</span>
          <input v-model.number="sentencesPerParagraph" type="number" min="1" class="input" />
        </label>

        <div v-if="unit==='words'" class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="label">word separator</span>
            <input v-model="wordSeparator" type="text" class="input" placeholder="space, comma, •, etc." />
          </label>
          <label class="block">
            <span class="label">capitalize words</span>
            <select v-model="wordCasing" class="input">
              <option value="none">none</option>
              <option value="sentence">sentence</option>
              <option value="title">title</option>
              <option value="upper">upper</option>
              <option value="lower">lower</option>
            </select>
          </label>
        </div>
      </div>

      <div class="card space-y-3">
        <label class="block">
          <span class="label">output format</span>
          <select v-model="format" class="input">
            <option value="text">plain text</option>
            <option value="html">html-wrapped</option>
          </select>
        </label>

        <div v-if="format==='html'" class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="label">wrapper tag</span>
            <select v-model="htmlTag" class="input">
              <option value="p">&lt;p&gt;</option>
              <option value="div">&lt;div&gt;</option>
              <option value="li">&lt;li&gt;</option>
            </select>
          </label>
          <label class="block">
            <span class="label">paragraph spacing</span>
            <select v-model.number="paraSpacing" class="input">
              <option v-for="n in [0,1,2]" :key="n" :value="n">{{ n }} blank line(s)</option>
            </select>
          </label>
        </div>

        <label class="block">
          <span class="label">filename</span>
          <input v-model="filename" type="text" class="input" placeholder="lorem.txt / lorem.html" />
        </label>
      </div>
    </div>

    <!-- actions -->
    <div class="flex flex-wrap gap-3">
      <button class="btn-primary" @click="generate">generate</button>
      <button class="btn" @click="copyToClipboard" :disabled="!output">copy</button>
      <button class="btn" @click="downloadTxt" :disabled="!output">download .txt</button>
      <button class="btn" @click="downloadHtml" :disabled="!output">download .html</button>
      <span v-if="message" class="text-green-400 text-sm self-center">{{ message }}</span>
    </div>

    <!-- output -->
    <div v-if="output" class="card">
      <h3 class="font-semibold text-indigo-400 mb-3">📄 Generated Text</h3>
      <div class="mono-box">
        <pre class="whitespace-pre-wrap break-words">{{ output }}</pre>
      </div>
      <div class="text-right text-xs text-gray-400 mt-3">
        {{ stats.chars }} chars • {{ stats.words }} words • {{ stats.sentences }} sentences • {{ stats.paragraphs }} paragraphs
      </div>
    </div>
    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

/* ---------- types ---------- */
type Unit = 'characters' | 'words' | 'sentences' | 'paragraphs'
type Variant = 'classic' | 'tech' | 'startup' | 'bacon'
type Format = 'text' | 'html'
type HtmlTag = 'p' | 'div' | 'li'
type Casing = 'none' | 'sentence' | 'title' | 'upper' | 'lower'

/* ---------- state ---------- */
const unit = ref<Unit>('characters')
const amount = ref<number>(200)
const variant = ref<Variant>('classic')
const startWithLorem = ref<boolean>(true)

const avgLen = ref<number>(12)              // average sentence length (words)
const variability = ref<number>(0.25)       // 0..1
const sentencesPerParagraph = ref<number>(4)

const format = ref<Format>('text')
const htmlTag = ref<HtmlTag>('p')
const paraSpacing = ref<number>(1)          // blank lines between paragraphs (text mode or when joining HTML as text preview)

const wordSeparator = ref<string>(' ')
const wordCasing = ref<Casing>('none')

const filename = ref<string>('lorem.txt')
const seed = ref<number>(12345)
const message = ref<string>('')

/* ---------- corpora ---------- */
const classicWords = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor',
  'incididunt','ut','labore','et','dolore','magna','aliqua','ut','enim','ad','minim','veniam',
  'quis','nostrud','exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea','commodo','consequat',
  'duis','aute','irure','dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla','pariatur'
]
const techWords = [
  'api','sdk','async','component','nuxt','vue','typescript','tailwind','websocket','jwt','graphql','edge',
  'serverless','lambda','microservice','deno','bun','vite','webpack','cache','render','ssr','csr','hydration',
  'latency','throughput','debounce','throttle','state','reactivity','schema','orm','sql','index','shard'
]
const startupWords = [
  'pivot','iterate','mvp','northstar','retention','activation','cohort','virality','freemium','burn','runway',
  'moat','flywheel','roadmap','stakeholder','leverage','synergy','disrupt','scale','churn','lifecycle','pricing',
  'onboarding','conversion','lifetime','value','nps','experimental','abtest','segmentation','persona','funnel'
]
const baconWords = [
  'bacon','pancetta','prosciutto','salami','ham','jowl','drumstick','sirloin','brisket','ribeye','tenderloin',
  'shank','flank','sausage','meatball','porchetta','biltong','kevin','capicola','bresaola','pastrami'
]

function wordsFor(v: Variant): string[] {
  if (v === 'tech') return techWords
  if (v === 'startup') return startupWords
  if (v === 'bacon') return baconWords
  return classicWords
}

/* ---------- generator primitives ---------- */
function mulberry32(s: number) {
  return () => {
    let t = (s += 0x6D2B79F5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function choice<T>(arr: T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)]
}
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
function titleCase(s: string) {
  return s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
}
function applyCasing(tokens: string[], mode: Casing): string[] {
  if (mode === 'upper') return tokens.map(t => t.toUpperCase())
  if (mode === 'lower') return tokens.map(t => t.toLowerCase())
  if (mode === 'title') return tokens.map(t => titleCase(t))
  if (mode === 'sentence') {
    if (tokens.length === 0) return tokens
    const [first, ...rest] = tokens
    return [capitalize(first), ...rest]
  }
  return tokens
}

/* sentence builder */
function makeSentence(rnd: () => number, wordPool: string[], avg: number, varAmt: number): string {
  const jitter = Math.round((rnd() * 2 - 1) * avg * varAmt) // negative..positive
  const len = Math.max(3, avg + jitter)
  const words: string[] = []
  for (let i = 0; i < len; i++) words.push(choice(wordPool, rnd))
  // light punctuation
  const commas = Math.floor(len / 7)
  for (let c = 0; c < commas; c++) {
    const idx = 3 + Math.floor(rnd() * (len - 5))
    if (idx > 0 && idx < len - 1) words[idx] = words[idx] + ','
  }
  const plain = words.join(' ')
  const ending = rnd() < 0.07 ? '?' : rnd() < 0.12 ? '!' : '.'
  return capitalize(plain.replace(/\s+,/g, ',')) + ending
}

/* paragraph builder */
function makeParagraph(rnd: () => number, wordPool: string[], sentCount: number, avg: number, varAmt: number, startLorem: boolean): string {
  const sentences: string[] = []
  for (let s = 0; s < sentCount; s++) {
    const line = makeSentence(rnd, wordPool, avg, varAmt)
    sentences.push(line)
  }
  let para = sentences.join(' ')
  if (startLorem) {
    para = para.replace(/^[^.?!]+/, (m) => {
      // replace first clause with classic opener for authenticity
      return 'Lorem ipsum dolor sit amet'
    })
  }
  return para
}

/* ---------- generation ---------- */
const output = ref<string>('')

function generate() {
  const rnd = mulberry32(seed.value >>> 0)
  const pool = wordsFor(variant.value)

  if (unit.value === 'characters') {
    // generate sentences until we exceed target, then slice
    const need = Math.max(1, amount.value)
    let buf = ''
    while (buf.length < need) {
      const p = makeParagraph(rnd, pool, sentencesPerParagraph.value, avgLen.value, variability.value, startWithLorem.value)
      buf += (buf ? '\n\n' : '') + p
    }
    output.value = buf.slice(0, need)
    return
  }

  if (unit.value === 'words') {
    const words: string[] = []
    while (words.length < amount.value) {
      const s = makeSentence(rnd, pool, avgLen.value, variability.value)
      words.push(...s.replace(/[.?!,]/g, '').split(/\s+/))
    }
    const sliced = words.slice(0, amount.value)
    const transformed = applyCasing(sliced, wordCasing.value)
    const joined = transformed.join(wordSeparator.value || ' ')
    output.value = startWithLorem.value
        ? joined.replace(/^\w+/,(w)=>'Lorem') // approximate
        : joined
    return
  }

  if (unit.value === 'sentences') {
    const sentences: string[] = []
    for (let i = 0; i < amount.value; i++) {
      sentences.push(makeSentence(rnd, pool, avgLen.value, variability.value))
    }
    if (startWithLorem.value && sentences.length) {
      sentences[0] = 'Lorem ipsum dolor sit amet.'
    }
    output.value = sentences.join(' ')
    return
  }

  // paragraphs
  const paras: string[] = []
  for (let p = 0; p < amount.value; p++) {
    paras.push(makeParagraph(rnd, pool, sentencesPerParagraph.value, avgLen.value, variability.value, startWithLorem.value && p === 0))
  }

  if (format.value === 'html') {
    const tag = htmlTag.value
    const sep = paraSpacing.value
        ? '\n' + Array(paraSpacing.value).fill('').join('\n') // visual spacing in preview
        : '\n'
    output.value = paras.map(x => `<${tag}>${x}</${tag}>`).join(sep)
  } else {
    const sep = Array(paraSpacing.value + 1).fill('').join('\n') // e.g. 1 => blank line
    output.value = paras.join('\n' + sep + '\n')
  }
}

/* live stats */
const stats = computed(() => {
  const text = output.value || ''
  const paragraphs = text
      ? (format.value === 'html'
          ? (text.match(new RegExp(`<${htmlTag.value}\\b`, 'gi')) || []).length
          : text.split(/\n{2,}/).length)
      : 0
  const words = text ? text.replace(/<[^>]+>/g,'').trim().split(/\s+/).filter(Boolean).length : 0
  const sentences = text ? (text.match(/[.!?](\s|$)/g) || []).length : 0
  const chars = text.replace(/<[^>]+>/g,'').length
  return { chars, words, sentences, paragraphs }
})

/* reactions */
watch([unit, amount, variant, startWithLorem, avgLen, variability, sentencesPerParagraph, format, htmlTag, paraSpacing, wordSeparator, wordCasing], generate, { immediate: true })

/* actions */
async function copyToClipboard() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  flash('copied!')
}
function downloadTxt() {
  if (!output.value) return
  const blob = new Blob([output.value.replace(/<[^>]+>/g,'')], { type: 'text/plain' })
  downloadBlob(blob, safeName(filename.value || 'lorem.txt', 'txt'))
}
function downloadHtml() {
  if (!output.value) return
  const html = format.value === 'html'
      ? `<!doctype html><meta charset="utf-8"><title>lorem</title>${output.value}`
      : `<!doctype html><meta charset="utf-8"><title>lorem</title><pre>${escapeHtml(output.value)}</pre>`
  const blob = new Blob([html], { type: 'text/html' })
  downloadBlob(blob, safeName(filename.value || 'lorem.html', 'html'))
}
function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}
function randomizeSeed() {
  seed.value = Math.floor(Math.random() * 1_000_000)
  generate()
}
function clearAll() {
  output.value = ''
  flash('🧹 cleared')
}

/* helpers */
function flash(text: string) {
  message.value = text
  window.setTimeout(() => (message.value = ''), 1200)
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] as string))
}
function safeName(name: string, forceExt: 'txt'|'html') {
  let n = name.trim().replace(/\.(txt|html)$/i, '')
  n = n.replace(/[^a-z0-9\-_]+/gi, '-').replace(/-+/g,'-').replace(/^-|-$/g,'').toLowerCase()
  return `${n || 'lorem'}.${forceExt}`
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

.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-danger {
  @apply bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}

.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}

.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
</style>
