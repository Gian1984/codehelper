<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 class="text-2xl font-semibold">🔄 JSON ↔ YAML Converter</h2>
          <p class="text-sm text-gray-400 mt-1">Convert between JSON and YAML formats with syntax highlighting</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button @click="clearAll" class="btn">🗑️ Clear</button>
          <button @click="autoConvert" class="btn-primary">✨ Auto Convert</button>
          <button v-if="output" @click="copy(output)" class="btn-success">
            {{ copiedMsg ? '✓ Copied!' : '📋 Copy Output' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">📝 Input (JSON or YAML)</label>
        <div class="flex items-center gap-3 flex-wrap">
          <button @click="convertToYaml" class="btn-warning text-xs">
            → YAML
          </button>
          <button @click="convertToJson" class="btn-info text-xs">
            → JSON
          </button>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste JSON or YAML here..."
          class="input min-h-48 resize-y font-mono"
          spellcheck="false"
      ></textarea>

      <div class="flex items-center justify-between gap-3 text-xs">
        <span class="text-gray-400">{{ input.split(/\n/).length }} lines · {{ input.length.toLocaleString() }} characters</span>
        <span v-if="detectedFormat !== 'unknown'" class="text-indigo-400">
          Detected: {{ detectedFormat.toUpperCase() }}
        </span>
      </div>
    </div>

    <!-- Options -->
    <div class="card">
      <h3 class="text-sm font-medium text-gray-300 mb-4">⚙️ Conversion Options</h3>
      <div class="flex flex-wrap items-center gap-4">
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="prettyJson" class="w-4 h-4 accent-indigo-500" />
          <span class="text-sm text-gray-300">Prettify JSON output</span>
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="sortKeys" class="w-4 h-4 accent-indigo-500" />
          <span class="text-sm text-gray-300">Sort keys alphabetically</span>
        </label>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="bg-red-950/40 border border-red-500/40 rounded-lg p-4">
      <p class="text-sm text-red-400 flex items-center gap-2">
        <span>❌</span>
        <span>{{ error }}</span>
      </p>
    </div>

    <!-- Output -->
    <div v-if="output" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-2">
          <span class="label">📄 Output</span>
          <span v-if="conversionDirection !== 'none'" class="text-xs px-2 py-1 rounded bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
            {{ conversionDirection === 'json-to-yaml' ? 'JSON → YAML' : 'YAML → JSON' }}
          </span>
        </div>
        <span class="text-xs text-gray-400">
          {{ conversionDirection === 'json-to-yaml' ? 'YAML Format' : 'JSON Format' }}
        </span>
      </div>

      <div class="mono-box max-h-[600px] overflow-auto">
        <pre><code :class="`language-${conversionDirection === 'json-to-yaml' ? 'yaml' : 'json'}`" v-html="highlightedOutput"></code></pre>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import yaml from 'js-yaml'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/themes/prism-tomorrow.css'

const input = ref('')
const output = ref('')
const error = ref('')
const copiedMsg = ref('')
const prettyJson = ref(true)
const sortKeys = ref(false)

type DetectedFormat = 'json' | 'yaml' | 'unknown'
type ConversionDirection = 'json-to-yaml' | 'yaml-to-json' | 'none'

const detectedFormat = ref<DetectedFormat>('unknown')
const conversionDirection = ref<ConversionDirection>('none')

const highlightedOutput = computed<string>(() => {
  if (!output.value) return ''
  const language = conversionDirection.value === 'json-to-yaml' ? 'yaml' : 'json'
  const grammar = language === 'yaml' ? Prism.languages.yaml : Prism.languages.json
  return Prism.highlight(output.value, grammar, language)
})

function autoConvert() {
  error.value = ''
  output.value = ''
  detectedFormat.value = 'unknown'
  conversionDirection.value = 'none'

  if (!input.value.trim()) return

  try {
    // Try JSON first
    const parsed = JSON.parse(input.value)
    detectedFormat.value = 'json'
    conversionDirection.value = 'json-to-yaml'
    output.value = yaml.dump(sortKeys.value ? sortObject(parsed) : parsed)
  } catch {
    try {
      const parsed = yaml.load(input.value)
      detectedFormat.value = 'yaml'
      conversionDirection.value = 'yaml-to-json'
      output.value = JSON.stringify(
          sortKeys.value ? sortObject(parsed) : parsed,
          null,
          prettyJson.value ? 2 : 0
      )
    } catch (e: any) {
      error.value = 'Auto detect failed: ' + e.message
    }
  }
}

function convertToJson() {
  error.value = ''
  conversionDirection.value = 'yaml-to-json'
  try {
    const parsed = yaml.load(input.value)
    output.value = JSON.stringify(
        sortKeys.value ? sortObject(parsed) : parsed,
        null,
        prettyJson.value ? 2 : 0
    )
  } catch (e: any) {
    output.value = ''
    error.value = 'YAML to JSON failed: ' + e.message
  }
}

function convertToYaml() {
  error.value = ''
  conversionDirection.value = 'json-to-yaml'
  try {
    const parsed = JSON.parse(input.value)
    output.value = yaml.dump(sortKeys.value ? sortObject(parsed) : parsed)
  } catch (e: any) {
    output.value = ''
    error.value = 'JSON to YAML failed: ' + e.message
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
  detectedFormat.value = 'unknown'
  conversionDirection.value = 'none'
}

function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1500)
}

function sortObject(obj: any): any {
  if (Array.isArray(obj)) return obj.map(sortObject)
  if (obj && typeof obj === 'object') {
    return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
          acc[key] = sortObject(obj[key])
          return acc
        }, {} as Record<string, any>)
  }
  return obj
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

.btn-success {
  @apply bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-colors;
}

.btn-warning {
  @apply bg-yellow-600 hover:bg-yellow-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}

.btn-info {
  @apply bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}

.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}

.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
</style>
