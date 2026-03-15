<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🤖 Robots.txt Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Generate robots.txt files to control search engine crawling</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="generate" title="Generate">
          ⚡ Generate
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="card">
      <label class="label mb-3">🔖 Quick Presets</label>
      <div class="flex flex-wrap gap-2">
        <button class="btn text-xs" @click="presetAllowAll">Allow All</button>
        <button class="btn text-xs" @click="presetBlockAll">Block All</button>
        <button class="btn text-xs" @click="presetStandard">Standard (block admin, api)</button>
        <button class="btn text-xs" @click="presetWordpress">WordPress</button>
        <button class="btn text-xs" @click="presetNextjs">Next.js / Nuxt</button>
      </div>
    </div>

    <!-- Rules -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <label class="label !mb-0 font-semibold">📋 Rules</label>
        <button class="btn text-xs" @click="addRule">+ Add Rule Group</button>
      </div>

      <div v-for="(rule, i) in rules" :key="i" class="bg-gray-800 rounded-lg p-4 border border-gray-700 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-400">Rule Group {{ i + 1 }}</span>
          <button v-if="rules.length > 1" class="text-red-400 text-xs hover:text-red-300" @click="rules.splice(i, 1)">✕ Remove</button>
        </div>

        <div class="space-y-2">
          <label class="label">User-agent</label>
          <input v-model="rule.userAgent" class="input text-sm font-mono" placeholder="*" />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="label !mb-0">Disallow paths</label>
            <button class="btn text-xs" @click="rule.disallow.push('')">+ Add</button>
          </div>
          <div v-for="(_, j) in rule.disallow" :key="'d'+j" class="flex items-center gap-2">
            <input v-model="rule.disallow[j]" class="input text-sm font-mono" placeholder="/admin/" />
            <button class="text-red-400 text-xs hover:text-red-300" @click="rule.disallow.splice(j, 1)">✕</button>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="label !mb-0">Allow paths (overrides disallow)</label>
            <button class="btn text-xs" @click="rule.allow.push('')">+ Add</button>
          </div>
          <div v-for="(_, j) in rule.allow" :key="'a'+j" class="flex items-center gap-2">
            <input v-model="rule.allow[j]" class="input text-sm font-mono" placeholder="/admin/login" />
            <button class="text-red-400 text-xs hover:text-red-300" @click="rule.allow.splice(j, 1)">✕</button>
          </div>
        </div>

        <div class="space-y-2">
          <label class="label">Crawl-delay (seconds, optional)</label>
          <input v-model="rule.crawlDelay" class="input text-sm font-mono w-32" placeholder="e.g. 10" type="number" min="0" />
        </div>
      </div>
    </div>

    <!-- Sitemap -->
    <div class="card space-y-3">
      <label class="label font-semibold">🗺️ Sitemap URLs</label>
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-gray-500">Add sitemap URLs to help search engines discover your pages</span>
        <button class="btn text-xs" @click="sitemaps.push('')">+ Add Sitemap</button>
      </div>
      <div v-for="(_, i) in sitemaps" :key="i" class="flex items-center gap-2">
        <input v-model="sitemaps[i]" class="input text-sm font-mono" placeholder="https://example.com/sitemap.xml" />
        <button class="text-red-400 text-xs hover:text-red-300" @click="sitemaps.splice(i, 1)">✕</button>
      </div>
    </div>

    <!-- Output -->
    <div v-if="output" class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 robots.txt</label>
        <div class="flex gap-2">
          <button class="btn" @click="copyOutput">📋 Copy</button>
          <button class="btn" @click="downloadFile">💾 Download</button>
        </div>
      </div>
      <span v-if="copied" class="text-green-400 text-xs font-medium">✅ Copied!</span>
      <pre class="mono-box whitespace-pre-wrap">{{ output }}</pre>
    </div>

    <div v-if="!output" class="card text-center py-16 text-gray-500">
      <div class="text-4xl mb-4">🤖</div>
      <p>Configure rules above and click "Generate"</p>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Rule {
  userAgent: string
  disallow: string[]
  allow: string[]
  crawlDelay: string
}

const rules = ref<Rule[]>([
  { userAgent: '*', disallow: ['/admin/', '/api/'], allow: [], crawlDelay: '' }
])

const sitemaps = ref<string[]>([''])
const output = ref('')
const copied = ref(false)

function addRule() {
  rules.value.push({ userAgent: '*', disallow: [''], allow: [], crawlDelay: '' })
}

function clearAll() {
  rules.value = [{ userAgent: '*', disallow: [], allow: [], crawlDelay: '' }]
  sitemaps.value = ['']
  output.value = ''
  copied.value = false
}

function presetAllowAll() {
  rules.value = [{ userAgent: '*', disallow: [], allow: ['/'], crawlDelay: '' }]
  sitemaps.value = ['']
  generate()
}

function presetBlockAll() {
  rules.value = [{ userAgent: '*', disallow: ['/'], allow: [], crawlDelay: '' }]
  sitemaps.value = []
  generate()
}

function presetStandard() {
  rules.value = [{ userAgent: '*', disallow: ['/admin/', '/api/', '/private/', '/tmp/'], allow: [], crawlDelay: '' }]
  sitemaps.value = ['']
  generate()
}

function presetWordpress() {
  rules.value = [{ userAgent: '*', disallow: ['/wp-admin/', '/wp-includes/', '/wp-json/', '/trackback/', '/feed/', '/comments/'], allow: ['/wp-admin/admin-ajax.php'], crawlDelay: '' }]
  sitemaps.value = ['']
  generate()
}

function presetNextjs() {
  rules.value = [{ userAgent: '*', disallow: ['/_next/static/', '/api/', '/admin/'], allow: [], crawlDelay: '' }]
  sitemaps.value = ['']
  generate()
}

function generate() {
  copied.value = false
  const lines: string[] = []

  for (let i = 0; i < rules.value.length; i++) {
    const rule = rules.value[i]
    if (i > 0) lines.push('')
    lines.push(`User-agent: ${rule.userAgent || '*'}`)

    const disallowPaths = rule.disallow.filter(d => d.trim())
    const allowPaths = rule.allow.filter(a => a.trim())

    if (disallowPaths.length === 0 && allowPaths.length === 0) {
      lines.push('Disallow:')
    } else {
      for (const d of disallowPaths) lines.push(`Disallow: ${d.trim()}`)
      for (const a of allowPaths) lines.push(`Allow: ${a.trim()}`)
    }

    if (rule.crawlDelay && parseInt(rule.crawlDelay) > 0) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`)
    }
  }

  const validSitemaps = sitemaps.value.filter(s => s.trim())
  if (validSitemaps.length > 0) {
    lines.push('')
    for (const s of validSitemaps) lines.push(`Sitemap: ${s.trim()}`)
  }

  output.value = lines.join('\n')
}

async function copyOutput() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadFile() {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'robots.txt'
  a.click()
  URL.revokeObjectURL(url)
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
</style>
