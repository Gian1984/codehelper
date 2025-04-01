<template>
  <div class="bg-gray-800 p-8 rounded-lg shadow space-y-4">
    <h2 class="text-2xl font-semibold text-white">JSON ↔ YAML Converter</h2>

    <textarea
        v-model="input"
        placeholder="Paste JSON or YAML here..."
        class="w-full h-48 p-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
    ></textarea>

    <div class="flex flex-wrap gap-4">
      <button
          @click="convertToJson"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium transition"
      >
        Convert to JSON
      </button>
      <button
          @click="convertToYaml"
          class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-white font-medium transition"
      >
        Convert to YAML
      </button>
      <button
          @click="clearAll"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-medium transition"
      >
        Clear
      </button>
      <button
          v-if="output"
          @click="copyToClipboard"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium transition"
      >
        Copy
      </button>
    </div>

    <span v-if="error" class="text-sm text-red-400">{{ error }}</span>
    <span v-if="copied" class="text-sm text-green-400">Copied!</span>

    <div v-if="output" class="bg-gray-900 p-4 rounded overflow-auto border border-gray-700">
      <pre class="whitespace-pre-wrap text-green-300 font-mono text-sm">{{ output }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import yaml from 'js-yaml'

const input = ref('')
const output = ref('')
const error = ref('')
const copied = ref(false)

function convertToJson() {
  error.value = ''
  copied.value = false
  try {
    const parsed = yaml.load(input.value)
    output.value = JSON.stringify(parsed, null, 2)
  } catch (e: any) {
    output.value = ''
    error.value = 'YAML to JSON failed: ' + e.message
  }
}

function convertToYaml() {
  error.value = ''
  copied.value = false
  try {
    const parsed = JSON.parse(input.value)
    output.value = yaml.dump(parsed)
  } catch (e: any) {
    output.value = ''
    error.value = 'JSON to YAML failed: ' + e.message
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
  copied.value = false
}

function copyToClipboard() {
  navigator.clipboard.writeText(output.value).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}
</script>

<style scoped>
textarea::placeholder {
  color: #94a3b8;
}
</style>
