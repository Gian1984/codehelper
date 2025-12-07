<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🔐 Base64 Encoder/Decoder</h2>
        <p class="text-sm text-gray-400 mt-1">Encode and decode Base64 text, files, and data URLs</p>
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
      <p class="text-xs text-gray-400 mt-2">
        <span v-if="mode === 'encode'">Convert text/files to Base64 format</span>
        <span v-else>Convert Base64 strings back to original content (supports data URLs)</span>
      </p>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">{{ mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode' }}</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label v-if="mode === 'encode'" class="btn cursor-pointer">
            📁 Upload File
            <input type="file" class="hidden" @change="onFileUpload" />
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer text-xs text-gray-300">
            <input type="checkbox" v-model="autoProcess" />
            Auto-process
          </label>
        </div>
      </div>

      <textarea
          v-model="input"
          :placeholder="mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'"
          class="input font-mono resize-y min-h-[120px]"
          spellcheck="false"
          @input="maybeProcess"
      ></textarea>

      <div class="flex items-center justify-between text-xs text-gray-400">
        <div class="flex gap-4">
          <span>Characters: {{ input.length.toLocaleString() }}</span>
          <span v-if="inputBytes">Size: {{ formatBytes(inputBytes) }}</span>
        </div>
        <div class="flex gap-2">
          <button class="btn" @click="process">
            {{ mode === 'encode' ? 'Encode' : 'Decode' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Options (Encode only) -->
    <div v-if="mode === 'encode'" class="card">
      <label class="label mb-3">⚙️ Encoding Options</label>
      <div class="space-y-3">
        <label class="inline-flex items-center gap-2 cursor-pointer bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors">
          <input type="checkbox" v-model="options.dataUrl" @change="maybeProcess" />
          <div>
            <span class="text-sm text-white font-medium">Generate Data URL</span>
            <p class="text-xs text-gray-400 mt-0.5">Add data URL prefix (e.g., data:image/png;base64,...)</p>
          </div>
        </label>

        <div v-if="options.dataUrl" class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <label class="label mb-2">MIME Type</label>
          <input
              v-model="options.mimeType"
              class="input"
              placeholder="e.g. image/png, text/plain, application/pdf"
              @input="maybeProcess"
          />
          <p class="text-xs text-gray-400 mt-1">
            Specify the MIME type for the data URL. Auto-detected for uploaded files.
          </p>
        </div>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="card">
      <div class="warn">
        <strong>Error:</strong> {{ error }}
      </div>
    </div>

    <!-- Output Section -->
    <div v-if="output" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-3">
          <label class="label">{{ mode === 'encode' ? 'Encoded Base64' : 'Decoded Text' }}</label>
          <span v-if="outputBytes" class="text-xs px-2 py-1 bg-indigo-800/30 text-indigo-400 rounded-full font-medium">
            {{ formatBytes(outputBytes) }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn" @click="copyOutput" title="Copy to clipboard">
            📋 Copy
          </button>
          <button
              v-if="mode === 'decode' && canDownload"
              class="btn"
              @click="downloadDecoded"
              title="Download decoded file"
          >
            💾 Download
          </button>
        </div>
      </div>

      <!-- Image Preview (if decoded image) -->
      <div v-if="mode === 'decode' && decodedImagePreview" class="bg-gray-900 rounded-lg border border-gray-700 p-4">
        <p class="text-gray-300 text-sm mb-2">🖼️ Image Preview</p>
        <img :src="decodedImagePreview" alt="Decoded image" class="max-w-full max-h-96 rounded border border-gray-600" />
      </div>

      <!-- Text Output -->
      <div class="relative">
        <pre class="mono-box max-h-96 break-all whitespace-pre-wrap">{{ output }}</pre>
      </div>

      <div class="flex items-center justify-between text-xs text-gray-400">
        <div class="flex gap-4">
          <span>Characters: {{ output.length.toLocaleString() }}</span>
          <span v-if="mode === 'encode' && inputBytes && outputBytes">
            Overhead: +{{ Math.round(((outputBytes - inputBytes) / inputBytes) * 100) }}%
          </span>
        </div>
        <div>
          <span v-if="copied" class="text-green-400 font-medium">✓ Copied!</span>
        </div>
      </div>
    </div>

    <!-- Info / Tips -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <p class="label">💡 Tips & Info</p>
        <button class="btn-small" @click="showInfo = !showInfo">
          {{ showInfo ? '▼' : '▶' }} {{ showInfo ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showInfo" class="space-y-2 text-sm text-gray-300">
        <p><strong>What is Base64?</strong></p>
        <p>Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used for:</p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>Embedding images in HTML/CSS (data URLs)</li>
          <li>Encoding binary data in JSON/XML</li>
          <li>Email attachments (MIME)</li>
          <li>Storing binary data in text-based formats</li>
        </ul>
        <p class="mt-3"><strong>Data URLs:</strong></p>
        <p>Enable "Generate Data URL" when encoding files to create inline data URLs like:</p>
        <code class="block bg-gray-800 p-2 rounded mt-1 text-xs break-all">
          data:image/png;base64,iVBORw0KGgoAAAANS...
        </code>
        <p class="mt-3"><strong>Note:</strong> Base64 encoding increases size by ~33% compared to the original binary data.</p>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type Mode = 'encode' | 'decode'

const mode = ref<Mode>('encode')
const input = ref<string>('')
const output = ref<string>('')
const error = ref<string>('')
const copied = ref<boolean>(false)
const autoProcess = ref<boolean>(true)
const showInfo = ref<boolean>(false)

const uploadedFile = ref<File | null>(null)
const decodedImagePreview = ref<string>('')

const options = ref({
  dataUrl: false,
  mimeType: 'text/plain',
})

const inputBytes = computed(() => {
  if (!input.value) return 0
  return new Blob([input.value]).size
})

const outputBytes = computed(() => {
  if (!output.value) return 0
  return new Blob([output.value]).size
})

const canDownload = computed(() => {
  return mode.value === 'decode' && output.value.length > 0
})

function switchMode(newMode: Mode) {
  mode.value = newMode
  error.value = ''
  output.value = ''
  decodedImagePreview.value = ''
  if (autoProcess.value && input.value) {
    process()
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
  uploadedFile.value = null
  decodedImagePreview.value = ''
  options.value.dataUrl = false
  options.value.mimeType = 'text/plain'
}

async function onFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadedFile.value = file
  error.value = ''

  // Auto-detect MIME type
  options.value.mimeType = file.type || 'application/octet-stream'

  try {
    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      const bytes = new Uint8Array(arrayBuffer)

      // Convert to binary string
      let binary = ''
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i])
      }

      input.value = binary
      if (autoProcess.value) {
        process()
      }
    }
    reader.onerror = () => {
      error.value = 'Failed to read file'
    }
    reader.readAsArrayBuffer(file)
  } catch (err) {
    error.value = (err as Error).message || 'Failed to read file'
  }

  // Reset input
  target.value = ''
}

function process() {
  error.value = ''
  output.value = ''
  decodedImagePreview.value = ''

  if (!input.value.trim()) {
    error.value = 'Input is empty'
    return
  }

  try {
    if (mode.value === 'encode') {
      encodeBase64()
    } else {
      decodeBase64()
    }
  } catch (err) {
    error.value = (err as Error).message || 'Processing failed'
    output.value = ''
  }
}

function encodeBase64() {
  const text = input.value

  // Use btoa for encoding
  let encoded: string
  try {
    encoded = btoa(text)
  } catch (err) {
    // Handle non-Latin1 characters
    const utf8Bytes = new TextEncoder().encode(text)
    let binary = ''
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i])
    }
    encoded = btoa(binary)
  }

  // Add data URL prefix if requested
  if (options.value.dataUrl && uploadedFile.value) {
    output.value = `data:${options.value.mimeType};base64,${encoded}`
  } else if (options.value.dataUrl) {
    output.value = `data:${options.value.mimeType};base64,${encoded}`
  } else {
    output.value = encoded
  }
}

function decodeBase64() {
  let base64 = input.value.trim()

  // Strip data URL prefix if present
  const dataUrlMatch = base64.match(/^data:([^;,]+);base64,(.+)$/s)
  if (dataUrlMatch) {
    const mimeType = dataUrlMatch[1]
    base64 = dataUrlMatch[2]

    // If it's an image, show preview
    if (mimeType.startsWith('image/')) {
      decodedImagePreview.value = input.value.trim()
    }
  }

  // Remove all whitespace (spaces, newlines, tabs) from base64 string
  base64 = base64.replace(/\s+/g, '')

  // Validate base64 format
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
    throw new Error('Invalid Base64 string. Contains invalid characters.')
  }

  if (base64.length === 0) {
    throw new Error('Base64 string is empty')
  }

  try {
    // Decode using atob
    const decoded = atob(base64)

    // Try to interpret as UTF-8 text
    try {
      const bytes = new Uint8Array(decoded.length)
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i)
      }
      const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
      output.value = text
    } catch {
      // Not valid UTF-8, show as binary string (truncate if too long)
      if (decoded.length > 10000) {
        output.value = decoded.substring(0, 10000) + '\n\n... (truncated, use Download to get full content)'
      } else {
        output.value = decoded
      }
    }
  } catch (err) {
    throw new Error('Invalid Base64 string. Failed to decode.')
  }
}

function copyOutput() {
  if (!output.value) return
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function downloadDecoded() {
  if (!output.value) return

  let blob: Blob
  let filename = 'decoded.txt'

  // Check if input is a data URL
  const dataUrlMatch = input.value.match(/^data:([^;]+);base64,(.+)$/)
  if (dataUrlMatch) {
    const mimeType = dataUrlMatch[1]
    const base64 = dataUrlMatch[2]

    // Decode base64 to binary
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    blob = new Blob([bytes], { type: mimeType })

    // Set filename based on MIME type
    const ext = mimeType.split('/')[1] || 'bin'
    filename = `decoded.${ext}`
  } else {
    // Plain text
    blob = new Blob([output.value], { type: 'text/plain' })
    filename = 'decoded.txt'
  }

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function maybeProcess() {
  if (autoProcess.value) {
    process()
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/* ---------------------------------- persistence ---------------------------------- */
const STORAGE_KEY = 'base64-encoder-state'

watch([mode, input, options], () => {
  const payload = {
    mode: mode.value,
    input: input.value,
    options: { ...options.value },
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
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
      if (state.options) {
        Object.assign(options.value, state.options)
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
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
}
.btn-small {
  @apply bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-lg text-xs text-white transition-colors;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
.warn {
  @apply text-sm text-red-400 bg-red-900/20 p-2 rounded-lg border border-red-700;
}
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500;
}
code {
  @apply bg-gray-800 px-1 py-0.5 rounded text-xs;
}
</style>
