<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🔗 URL Encoder/Decoder</h2>
        <p class="text-sm text-gray-400 mt-1">Encode and decode URLs, query strings, and URI components</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear All</button>
      </div>
    </div>

    <!-- Mode Selection -->
    <div class="card">
      <label class="label mb-3">Mode</label>
      <div class="flex gap-3 flex-wrap">
        <button
            :class="[mode === 'encode' ? 'btn-primary' : 'btn']"
            @click="switchMode('encode')"
        >
          🔒 Encode
        </button>
        <button
            :class="[mode === 'decode' ? 'btn-primary' : 'btn']"
            @click="switchMode('decode')"
        >
          🔓 Decode
        </button>
      </div>
    </div>

    <!-- Encoding Type (only for encode mode) -->
    <div v-if="mode === 'encode'" class="card">
      <label class="label mb-3">Encoding Type</label>
      <div class="flex gap-3 flex-wrap">
        <button
            :class="[encodeType === 'component' ? 'btn-primary' : 'btn']"
            @click="encodeType = 'component'; maybeProcess()"
        >
          encodeURIComponent
        </button>
        <button
            :class="[encodeType === 'uri' ? 'btn-primary' : 'btn']"
            @click="encodeType = 'uri'; maybeProcess()"
        >
          encodeURI
        </button>
      </div>
      <div class="mt-3 text-xs text-gray-400 space-y-1">
        <p><strong>encodeURIComponent:</strong> Encodes all special characters. Use for query parameters, form data.</p>
        <p><strong>encodeURI:</strong> Preserves URI structure (://?#). Use for full URLs.</p>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">{{ mode === 'encode' ? 'Text to Encode' : 'URL to Decode' }}</label>
        <label class="inline-flex items-center gap-2 cursor-pointer text-xs text-gray-300">
          <input type="checkbox" v-model="autoProcess" />
          Auto-process
        </label>
      </div>

      <textarea
          v-model="input"
          :placeholder="mode === 'encode'
            ? 'Enter text or URL to encode (e.g., hello world, special@chars.com)'
            : 'Paste encoded URL to decode (e.g., hello%20world, special%40chars.com)'"
          class="input font-mono resize-y min-h-[120px]"
          spellcheck="false"
          @input="maybeProcess"
      ></textarea>

      <div class="flex items-center justify-between text-xs text-gray-400 flex-wrap gap-2">
        <div class="flex gap-4 flex-wrap">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
        </div>
        <div class="flex gap-2">
          <button class="btn" @click="loadExample">Load Example</button>
          <button class="btn" @click="process">
            {{ mode === 'encode' ? 'Encode' : 'Decode' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="card">
      <div class="warn">
        <strong>⚠️ Error:</strong> {{ error }}
      </div>
    </div>

    <!-- Output Section -->
    <div v-if="output" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-3">
          <label class="label">{{ mode === 'encode' ? 'Encoded URL' : 'Decoded Text' }}</label>
          <span v-if="encodedChars > 0 && mode === 'encode'" class="text-xs px-2 py-1 bg-indigo-800/30 text-indigo-400 rounded-full font-medium">
            {{ encodedChars }} chars encoded
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn" @click="swapInputOutput" title="Swap input and output">
            ⇄ Swap
          </button>
          <button class="btn" @click="copyOutput" title="Copy to clipboard">
            📋 Copy
          </button>
        </div>
      </div>

      <textarea
          :value="output"
          readonly
          class="input font-mono resize-y min-h-[120px] bg-gray-800"
      ></textarea>

      <div class="flex items-center justify-between text-xs text-gray-400">
        <span>Characters: {{ output.length.toLocaleString() }}</span>
        <span v-if="copied" class="text-green-400 font-medium">✓ Copied!</span>
      </div>
    </div>

    <!-- URL Parser (if output looks like a URL) -->
    <div v-if="parsedUrl" class="card space-y-3">
      <div class="flex items-center justify-between mb-3">
        <label class="label">🔍 URL Parser</label>
        <button class="btn-small" @click="showParser = !showParser">
          {{ showParser ? '▼' : '▶' }} {{ showParser ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showParser" class="space-y-2">
        <div v-for="(value, key) in parsedUrl" :key="key" class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <div class="flex items-start gap-3">
            <span class="text-gray-400 font-mono text-xs min-w-[80px]">{{ key }}:</span>
            <div class="flex-1">
              <p class="text-white font-mono text-sm break-all">{{ value || '(empty)' }}</p>
            </div>
            <button
                v-if="value"
                class="btn-small"
                @click="copyText(value)"
                title="Copy"
            >
              📋
            </button>
          </div>
        </div>

        <!-- Query Parameters -->
        <div v-if="queryParams.length > 0" class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p class="label mb-2">Query Parameters ({{ queryParams.length }})</p>
          <div class="space-y-2">
            <div
                v-for="(param, index) in queryParams"
                :key="index"
                class="flex items-center gap-3 text-sm"
            >
              <span class="text-indigo-400 font-mono">{{ param.key }}</span>
              <span class="text-gray-500">=</span>
              <span class="text-green-400 font-mono flex-1 break-all">{{ param.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <label class="label mb-3">⚡ Quick Actions</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button class="btn text-left" @click="encodeQueryString">
          Encode Query String
          <span class="block text-xs text-gray-400 mt-1">Convert key=value pairs to encoded format</span>
        </button>
        <button class="btn text-left" @click="decodeQueryString">
          Decode Query String
          <span class="block text-xs text-gray-400 mt-1">Parse and decode query parameters</span>
        </button>
        <button class="btn text-left" @click="buildUrl">
          Build Full URL
          <span class="block text-xs text-gray-400 mt-1">Combine base URL with query params</span>
        </button>
        <button class="btn text-left" @click="extractDomain">
          Extract Domain
          <span class="block text-xs text-gray-400 mt-1">Get domain from full URL</span>
        </button>
      </div>
    </div>

    <!-- Info / Tips -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <p class="label">💡 URL Encoding Guide</p>
        <button class="btn-small" @click="showInfo = !showInfo">
          {{ showInfo ? '▼' : '▶' }} {{ showInfo ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showInfo" class="space-y-3 text-sm text-gray-300">
        <div>
          <p class="font-semibold text-white mb-1">What is URL Encoding?</p>
          <p>URL encoding (percent-encoding) converts special characters into a format that can be transmitted over the Internet. Special characters are replaced with <code>%</code> followed by two hexadecimal digits.</p>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">Common Encoded Characters:</p>
          <div class="grid grid-cols-2 gap-2 text-xs font-mono bg-gray-800 p-3 rounded-lg mt-2">
            <div><span class="text-indigo-400">space</span> → <span class="text-green-400">%20</span></div>
            <div><span class="text-indigo-400">!</span> → <span class="text-green-400">%21</span></div>
            <div><span class="text-indigo-400">#</span> → <span class="text-green-400">%23</span></div>
            <div><span class="text-indigo-400">$</span> → <span class="text-green-400">%24</span></div>
            <div><span class="text-indigo-400">%</span> → <span class="text-green-400">%25</span></div>
            <div><span class="text-indigo-400">&</span> → <span class="text-green-400">%26</span></div>
            <div><span class="text-indigo-400">'</span> → <span class="text-green-400">%27</span></div>
            <div><span class="text-indigo-400">(</span> → <span class="text-green-400">%28</span></div>
            <div><span class="text-indigo-400">)</span> → <span class="text-green-400">%29</span></div>
            <div><span class="text-indigo-400">+</span> → <span class="text-green-400">%2B</span></div>
            <div><span class="text-indigo-400">,</span> → <span class="text-green-400">%2C</span></div>
            <div><span class="text-indigo-400">/</span> → <span class="text-green-400">%2F</span></div>
            <div><span class="text-indigo-400">:</span> → <span class="text-green-400">%3A</span></div>
            <div><span class="text-indigo-400">;</span> → <span class="text-green-400">%3B</span></div>
            <div><span class="text-indigo-400">=</span> → <span class="text-green-400">%3D</span></div>
            <div><span class="text-indigo-400">?</span> → <span class="text-green-400">%3F</span></div>
            <div><span class="text-indigo-400">@</span> → <span class="text-green-400">%40</span></div>
            <div><span class="text-indigo-400">[</span> → <span class="text-green-400">%5B</span></div>
            <div><span class="text-indigo-400">]</span> → <span class="text-green-400">%5D</span></div>
          </div>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">encodeURIComponent vs encodeURI:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2">
            <li><strong>encodeURIComponent:</strong> Encodes <em>all</em> special characters including <code>:/?#[]@!$&'()*+,;=</code>. Use for encoding query parameters.</li>
            <li><strong>encodeURI:</strong> Preserves URL structure characters <code>:/?#[]@</code>. Use for encoding complete URLs.</li>
          </ul>
        </div>

        <div class="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mt-3">
          <p class="font-semibold text-blue-400 mb-1">💡 Pro Tip:</p>
          <p class="text-xs">When building query strings, always use <code>encodeURIComponent</code> for both keys and values to prevent URL parsing issues.</p>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type Mode = 'encode' | 'decode'
type EncodeType = 'component' | 'uri'

const mode = ref<Mode>('encode')
const encodeType = ref<EncodeType>('component')
const input = ref<string>('')
const output = ref<string>('')
const error = ref<string>('')
const copied = ref<boolean>(false)
const autoProcess = ref<boolean>(true)
const showInfo = ref<boolean>(false)
const showParser = ref<boolean>(true)

const encodedChars = computed(() => {
  if (mode.value !== 'encode' || !output.value) return 0
  return (output.value.match(/%[0-9A-F]{2}/gi) || []).length
})

const parsedUrl = computed(() => {
  const text = mode.value === 'decode' ? output.value : input.value
  if (!text) return null

  try {
    // Try to parse as URL
    const url = new URL(text)
    return {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      origin: url.origin,
    }
  } catch {
    // Not a valid URL
    return null
  }
})

const queryParams = computed(() => {
  if (!parsedUrl.value?.search) return []

  const params: { key: string; value: string }[] = []
  const searchParams = new URLSearchParams(parsedUrl.value.search)

  searchParams.forEach((value, key) => {
    params.push({ key, value })
  })

  return params
})

function switchMode(newMode: Mode) {
  mode.value = newMode
  error.value = ''
  output.value = ''
  if (autoProcess.value && input.value) {
    process()
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
}

function process() {
  error.value = ''
  output.value = ''

  if (!input.value.trim()) {
    error.value = 'Input is empty'
    return
  }

  try {
    if (mode.value === 'encode') {
      if (encodeType.value === 'component') {
        output.value = encodeURIComponent(input.value)
      } else {
        output.value = encodeURI(input.value)
      }
    } else {
      // Decode - try both methods
      try {
        output.value = decodeURIComponent(input.value)
      } catch {
        output.value = decodeURI(input.value)
      }
    }
  } catch (err) {
    error.value = (err as Error).message || 'Processing failed'
    output.value = ''
  }
}

function loadExample() {
  if (mode.value === 'encode') {
    input.value = 'https://example.com/search?q=hello world&category=news&filter=latest'
  } else {
    input.value = 'https://example.com/search?q=hello%20world&category=news&filter=latest'
  }
  if (autoProcess.value) {
    process()
  }
}

function swapInputOutput() {
  if (!output.value) return
  const temp = input.value
  input.value = output.value
  output.value = ''
  mode.value = mode.value === 'encode' ? 'decode' : 'encode'
  if (autoProcess.value) {
    process()
  }
}

function copyOutput() {
  if (!output.value) return
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function copyText(text: string) {
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function maybeProcess() {
  if (autoProcess.value) {
    process()
  }
}

// Quick Actions
function encodeQueryString() {
  const example = 'name=John Doe&email=john@example.com&message=Hello World!'
  input.value = example
  mode.value = 'encode'
  encodeType.value = 'component'
  if (autoProcess.value) {
    process()
  }
}

function decodeQueryString() {
  const example = 'name=John%20Doe&email=john%40example.com&message=Hello%20World%21'
  input.value = example
  mode.value = 'decode'
  if (autoProcess.value) {
    process()
  }
}

function buildUrl() {
  const base = 'https://api.example.com/search'
  const params = 'q=hello world&page=1&limit=10'
  const encoded = params.split('&').map(pair => {
    const [key, value] = pair.split('=')
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }).join('&')

  input.value = base
  output.value = `${base}?${encoded}`
}

function extractDomain() {
  if (!input.value) {
    input.value = 'https://www.example.com/path/to/page?query=value#section'
  }

  try {
    const url = new URL(input.value)
    output.value = url.hostname
  } catch {
    error.value = 'Invalid URL format'
  }
}

/* ---------------------------------- persistence ---------------------------------- */
const STORAGE_KEY = 'url-encoder-state'

watch([mode, input, encodeType], () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mode: mode.value,
      input: input.value,
      encodeType: encodeType.value,
    }))
  } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const state = JSON.parse(raw)
      if (state.mode === 'encode' || state.mode === 'decode') {
        mode.value = state.mode
      }
      if (typeof state.input === 'string') {
        input.value = state.input
      }
      if (state.encodeType === 'component' || state.encodeType === 'uri') {
        encodeType.value = state.encodeType
      }
    }
  } catch {}
})
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block;
}
.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}
textarea.input {
  @apply resize-y;
}
.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-small {
  @apply bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-lg text-xs text-white transition-colors;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
.warn {
  @apply text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-700;
}
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500;
}
code {
  @apply bg-gray-800 px-1 py-0.5 rounded text-xs font-mono;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
