<template>
  <div class="bg-gray-800 p-6 rounded-lg shadow space-y-4">
    <h2 class="text-2xl font-semibold">Var Dump Formatter</h2>

    <textarea
        v-model="input"
        placeholder="Paste your var_dump() output here..."
        class="w-full h-48 p-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
    ></textarea>

    <div class="flex items-center gap-4">
      <button
          @click="formatDump"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium transition"
      >
        Format
      </button>
      <span v-if="error" class="text-sm text-red-400">{{ error }}</span>
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

function formatDump() {
  error.value = ''
  try {
    // Naive beautifier for var_dump-like content
    const formattedOutput = input.value
        .replace(/(array|object)\([^\)]*\)/g, '\n$&') // line before array/object
        .replace(/\[/g, '\n  [')
        .replace(/=>/g, ' => ')
        .replace(/\}\s*$/gm, '\n}') // close object/array on new line
        .replace(/(\n\s*){2,}/g, '\n') // remove double newlines

    formatted.value = formattedOutput.trim()
  } catch (e: any) {
    formatted.value = ''
    error.value = 'Error while formatting: ' + e.message
  }
}
</script>
