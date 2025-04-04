<template>
  <div class="bg-gray-800 p-8 rounded-lg shadow space-y-4">
    <h2 class="text-2xl font-semibold text-white">Var Dump Formatter</h2>

    <textarea
        v-model="input"
        placeholder="Paste your var_dump() output here..."
        class="w-full h-48 p-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
    ></textarea>

    <div class="flex items-center gap-4 flex-wrap">
      <button
          @click="formatDump"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium transition"
      >
        Format
      </button>

      <button
          @click="clearAll"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-medium transition"
      >
        Clear
      </button>

      <button
          v-if="formatted"
          @click="copyToClipboard"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium transition"
      >
        Copy
      </button>

      <button
          v-if="formatted"
          @click="downloadDump"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition"
      >
        Download
      </button>

      <span v-if="error" class="text-sm text-red-400">{{ error }}</span>
      <span v-if="copied" class="text-sm text-green-400">Copied!</span>
    </div>

    <div v-if="formatted" class="bg-gray-900 p-4 rounded overflow-auto border border-gray-700">
      <pre class="whitespace-pre-wrap text-green-300 font-mono text-sm">{{ formatted }}</pre>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const formatted = ref('')
const error = ref('')
const copied = ref(false)

function formatDump() {
  error.value = ''
  copied.value = false

  try {
    const formattedOutput = input.value
        .replace(/(array|object)\([^\)]*\)/g, '\n$&')     // line before array/object
        .replace(/\[/g, '\n  [')                          // indent keys
        .replace(/=>/g, ' => ')                           // space around =>
        .replace(/\}\s*$/gm, '\n}')                       // close braces on newline
        .replace(/(\n\s*){2,}/g, '\n')                    // collapse double newlines

    formatted.value = formattedOutput.trim()
  } catch (e: any) {
    formatted.value = ''
    error.value = 'Error while formatting: ' + e.message
  }
}

function clearAll() {
  input.value = ''
  formatted.value = ''
  error.value = ''
  copied.value = false
}

function copyToClipboard() {
  navigator.clipboard.writeText(formatted.value).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}

function downloadDump() {
  const blob = new Blob([formatted.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'vardump.txt'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
