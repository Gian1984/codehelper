<template>
  <div class="bg-gray-800 p-8 rounded-lg shadow space-y-4">
    <h2 class="text-2xl font-semibold text-white">XML Formatter</h2>

    <textarea
        v-model="input"
        placeholder="Paste your XML here..."
        class="w-full h-48 p-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
    ></textarea>

    <div class="flex items-center gap-4 flex-wrap">
      <button
          @click="formatXml"
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
          @click="downloadXml"
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

function formatXml() {
  error.value = ''
  copied.value = false
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(input.value, 'application/xml')
    const parseError = xmlDoc.getElementsByTagName('parsererror')

    if (parseError.length > 0) {
      throw new Error(parseError[0].textContent || 'Invalid XML')
    }

    const serializer = new XMLSerializer()
    const raw = serializer.serializeToString(xmlDoc)
    formatted.value = vkBeautify.xml(raw) // use beautifier after validation
  } catch (e: any) {
    formatted.value = ''
    error.value = 'Invalid XML: ' + e.message
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

function downloadXml() {
  const blob = new Blob([formatted.value], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'formatted.xml'
  a.click()
  URL.revokeObjectURL(url)
}

// Optional: Use vkbeautify for pretty-printing XML
import vkBeautify from 'vkbeautify' // install with: npm i vkbeautify
</script>
