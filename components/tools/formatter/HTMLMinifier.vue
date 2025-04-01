<template>
  <div class="bg-gray-800 p-8 rounded-lg shadow space-y-4">
    <h2 class="text-2xl font-semibold text-white">HTML Minifier</h2>

    <textarea
        v-model="input"
        placeholder="Paste your HTML here..."
        class="w-full h-48 p-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
    ></textarea>

    <!-- Options -->
    <div class="flex flex-wrap gap-6 text-gray-300 text-sm">
      <label class="inline-flex items-center space-x-2">
        <input type="checkbox" v-model="options.removeComments" class="form-checkbox text-indigo-600 rounded" />
        <span>Remove comments</span>
      </label>
      <label class="inline-flex items-center space-x-2">
        <input type="checkbox" v-model="options.collapseWhitespace" class="form-checkbox text-indigo-600 rounded" />
        <span>Collapse whitespace</span>
      </label>
      <label class="inline-flex items-center space-x-2">
        <input type="checkbox" v-model="options.removeBetweenTags" class="form-checkbox text-indigo-600 rounded" />
        <span>Remove whitespace between tags</span>
      </label>
    </div>

    <!-- Buttons -->
    <div class="flex items-center gap-4 flex-wrap">
      <button @click="minifyHtml" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium transition">
        Minify
      </button>

      <button @click="clearAll" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-medium transition">
        Clear
      </button>

      <button v-if="minified" @click="copyToClipboard" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium transition">
        Copy
      </button>

      <button v-if="minified" @click="downloadHtml" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition">
        Download
      </button>

      <span v-if="error" class="text-sm text-red-400">{{ error }}</span>
      <span v-if="copied" class="text-sm text-green-400">Copied!</span>
    </div>

    <!-- Output -->
    <div v-if="minified" class="bg-gray-900 p-4 rounded overflow-auto border border-gray-700">
      <pre class="whitespace-pre-wrap text-pink-300 font-mono text-sm">{{ minified }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const minified = ref('')
const error = ref('')
const copied = ref(false)

const options = ref({
  removeComments: true,
  collapseWhitespace: true,
  removeBetweenTags: true
})

function minifyHtml() {
  error.value = ''
  copied.value = false

  try {
    let result = input.value

    if (options.value.removeComments) {
      result = result.replace(/<!--[\s\S]*?-->/g, '')
    }

    if (options.value.removeBetweenTags) {
      result = result.replace(/>\s+</g, '><')
    }

    if (options.value.collapseWhitespace) {
      result = result.replace(/\s{2,}/g, ' ')
    }

    minified.value = result.trim()
  } catch (e: any) {
    minified.value = ''
    error.value = 'Error while minifying: ' + e.message
  }
}

function clearAll() {
  input.value = ''
  minified.value = ''
  error.value = ''
  copied.value = false
}

function copyToClipboard() {
  navigator.clipboard.writeText(minified.value).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}

function downloadHtml() {
  const blob = new Blob([minified.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'minified.html'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
