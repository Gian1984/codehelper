<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 text-white">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <h2 class="text-2xl font-semibold text-white">JSON ↔ YAML Converter</h2>
      <div class="flex items-center gap-2 flex-wrap">
        <button @click="clearAll" class="btn-secondary">Clear</button>
        <button @click="autoConvert" class="btn-primary">Auto Convert</button>
        <button v-if="output" @click="copy(output)" class="btn-primary">
          {{ copiedMsg ? 'Copied!' : 'Copy Output' }}
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700 space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="text-sm font-medium text-gray-300">📝 Input (JSON or YAML)</label>
        <div class="flex items-center gap-3 flex-wrap">
          <button @click="convertToYaml" class="px-3 py-1.5 text-xs bg-yellow-600 hover:bg-yellow-500 rounded-lg text-white transition-colors">
            To YAML
          </button>
          <button @click="convertToJson" class="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
            To JSON
          </button>
        </div>
      </div>

      <textarea
          v-model="input"
          placeholder="Paste JSON or YAML here..."
          class="w-full min-h-48 p-4 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm resize-y transition-all"
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
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <h3 class="text-sm font-medium text-gray-300 mb-4">⚙️ Conversion Options</h3>
      <div class="flex flex-wrap items-center gap-4">
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="prettyJson" class="w-4 h-4 accent-indigo-500" />
          <span class="text-xs text-gray-300">Prettify JSON output</span>
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="sortKeys" class="w-4 h-4 accent-indigo-500" />
          <span class="text-xs text-gray-300">Sort keys alphabetically</span>
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
    <div v-if="output" class="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      <!-- Header with direction indicator -->
      <div class="bg-gray-800/50 border-b border-gray-700 px-5 py-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-300">📄 Output</span>
          <span v-if="conversionDirection !== 'none'" class="text-xs px-2 py-1 rounded bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
            {{ conversionDirection === 'json-to-yaml' ? 'JSON → YAML' : 'YAML → JSON' }}
          </span>
        </div>
        <span class="text-xs text-gray-400">
          {{ conversionDirection === 'json-to-yaml' ? 'YAML Format' : 'JSON Format' }}
        </span>
      </div>

      <div class="p-5">
        <pre class="bg-black p-4 rounded-lg border border-gray-700 overflow-auto max-h-[600px] text-sm font-mono"><code :class="`language-${conversionDirection === 'json-to-yaml' ? 'yaml' : 'json'}`" v-html="highlightedOutput"></code></pre>
      </div>
    </div>
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
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm font-medium;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40;
}

.btn-secondary {
  @apply bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm font-medium;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply transition-all;
}
</style>
