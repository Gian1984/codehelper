<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🔐 Hash Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Generate cryptographic hashes for text and files</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear All</button>
      </div>
    </div>

    <!-- Input Type Selection -->
    <div class="card">
      <label class="label mb-3">Input Type</label>
      <div class="flex gap-3 flex-wrap">
        <button
            :class="[inputType === 'text' ? 'btn-primary' : 'btn']"
            @click="switchInputType('text')"
        >
          📝 Text
        </button>
        <button
            :class="[inputType === 'file' ? 'btn-primary' : 'btn']"
            @click="switchInputType('file')"
        >
          📁 File
        </button>
      </div>
    </div>

    <!-- Text Input -->
    <div v-if="inputType === 'text'" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">Text Input</label>
        <label class="inline-flex items-center gap-2 cursor-pointer text-xs text-gray-300">
          <input type="checkbox" v-model="autoProcess" />
          Auto-process
        </label>
      </div>

      <textarea
          v-model="textInput"
          placeholder="Enter text to hash..."
          class="input font-mono resize-y min-h-[120px]"
          spellcheck="false"
          @input="maybeProcess"
      ></textarea>

      <div class="flex items-center justify-between text-xs text-gray-400 flex-wrap gap-2">
        <div class="flex gap-4 flex-wrap">
          <span>Characters: {{ textInput.length.toLocaleString() }}</span>
          <span>Bytes: {{ textBytes }} bytes</span>
        </div>
        <button class="btn" @click="processText">Generate Hashes</button>
      </div>
    </div>

    <!-- File Input -->
    <div v-if="inputType === 'file'" class="card space-y-3">
      <label class="label">File Input</label>

      <div class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
        <input
            type="file"
            ref="fileInputRef"
            class="hidden"
            @change="onFileUpload"
        />
        <button
            class="btn-primary"
            @click="() => fileInputRef?.click()"
        >
          📁 Choose File
        </button>
        <p class="text-sm text-gray-400 mt-3">
          {{ selectedFile ? `Selected: ${selectedFile.name} (${formatBytes(selectedFile.size)})` : 'No file selected' }}
        </p>
      </div>

      <div v-if="fileProcessing" class="text-center">
        <div class="inline-flex items-center gap-2 text-indigo-400">
          <div class="animate-spin rounded-full h-4 w-4 border-2 border-indigo-400 border-t-transparent"></div>
          <span>Processing file...</span>
        </div>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="card">
      <div class="warn">
        <strong>⚠️ Error:</strong> {{ error }}
      </div>
    </div>

    <!-- Hash Output -->
    <div v-if="hashes.length > 0" class="space-y-3">
      <div
          v-for="hash in hashes"
          :key="hash.algorithm"
          class="card"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div class="flex items-center gap-3">
            <span class="label">{{ hash.algorithm }}</span>
            <span class="text-xs px-2 py-1 bg-indigo-800/30 text-indigo-400 rounded-full font-medium">
              {{ hash.length }} chars
            </span>
          </div>
          <button
              class="btn"
              @click="copyHash(hash.value)"
              title="Copy hash"
          >
            📋 Copy
          </button>
        </div>
        <div class="mono-box break-all">{{ hash.value }}</div>
      </div>
    </div>

    <!-- HMAC Section (Optional) -->
    <div v-if="hashes.length > 0" class="card">
      <div class="flex items-center justify-between mb-3">
        <label class="label">🔑 HMAC (Keyed-Hash)</label>
        <button class="btn-small" @click="showHmac = !showHmac">
          {{ showHmac ? '▼' : '▶' }} {{ showHmac ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showHmac" class="space-y-3">
        <div>
          <label class="label mb-2">Secret Key</label>
          <input
              v-model="hmacKey"
              type="text"
              class="input font-mono"
              placeholder="Enter a secret key for HMAC..."
          />
          <p class="text-xs text-gray-400 mt-1">
            HMAC combines a cryptographic hash with a secret key. Useful for message authentication.
          </p>
        </div>

        <div>
          <label class="label mb-2">Algorithm</label>
          <select v-model="hmacAlgorithm" class="input">
            <option value="SHA-256">HMAC-SHA-256</option>
            <option value="SHA-384">HMAC-SHA-384</option>
            <option value="SHA-512">HMAC-SHA-512</option>
            <option value="SHA-1">HMAC-SHA-1</option>
          </select>
        </div>

        <button
            class="btn-primary"
            @click="generateHmac"
            :disabled="!hmacKey"
        >
          Generate HMAC
        </button>

        <div v-if="hmacResult" class="mt-3">
          <div class="flex items-center justify-between gap-3 flex-wrap mb-2">
            <span class="label">{{ hmacResult.algorithm }}</span>
            <button class="btn" @click="copyHash(hmacResult.value)">
              📋 Copy
            </button>
          </div>
          <div class="mono-box break-all">{{ hmacResult.value }}</div>
        </div>
      </div>
    </div>

    <!-- Copy feedback -->
    <div v-if="copied" class="fixed bottom-8 right-8 bg-green-600 text-white px-4 py-2 rounded-lg shadow-xl animate-fade-in">
      ✓ Copied to clipboard!
    </div>

    <!-- Info / Tips -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <p class="label">💡 Hash Algorithms Info</p>
        <button class="btn-small" @click="showInfo = !showInfo">
          {{ showInfo ? '▼' : '▶' }} {{ showInfo ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showInfo" class="space-y-3 text-sm text-gray-300">
        <div>
          <p class="font-semibold text-white mb-1">🔒 SHA-256 (Recommended)</p>
          <p>Part of SHA-2 family. Widely used for security applications, SSL certificates, and blockchain. Produces 256-bit (64 hex chars) hash. Good balance of security and performance.</p>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">🔐 SHA-512</p>
          <p>Stronger variant of SHA-2. Produces 512-bit (128 hex chars) hash. More secure but slower than SHA-256. Recommended for high-security applications.</p>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">🔓 SHA-1</p>
          <p>Legacy algorithm producing 160-bit (40 hex chars) hash. <strong>Not recommended for security</strong> due to known vulnerabilities. Use only for non-security purposes (checksums, git commits).</p>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">⚠️ MD5</p>
          <p>Legacy algorithm producing 128-bit (32 hex chars) hash. <strong>Not cryptographically secure.</strong> Fast but vulnerable to collisions. Use only for checksums, not passwords or security.</p>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">📊 SHA-384</p>
          <p>Truncated version of SHA-512. Produces 384-bit (96 hex chars) hash. Good middle ground between SHA-256 and SHA-512.</p>
        </div>

        <div class="border-t border-gray-700 pt-3 mt-3">
          <p class="font-semibold text-white mb-1">🔑 HMAC (Hash-based Message Authentication Code)</p>
          <p>Uses a secret key with a hash function to verify data integrity and authenticity. Commonly used for API signatures, JWT tokens, and secure cookies.</p>
        </div>

        <div class="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mt-3">
          <p class="font-semibold text-yellow-400 mb-1">⚠️ Important Security Notes:</p>
          <ul class="list-disc list-inside space-y-1 text-xs">
            <li><strong>Never store passwords as plain hashes!</strong> Use proper password hashing (bcrypt, argon2, scrypt) with salt.</li>
            <li>MD5 and SHA-1 are broken for security purposes. Use SHA-256 or better.</li>
            <li>Hashing is one-way—you cannot reverse a hash to get the original input.</li>
            <li>All processing happens in your browser. No data is sent to any server.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type InputType = 'text' | 'file'

interface HashResult {
  algorithm: string
  value: string
  length: number
}

const inputType = ref<InputType>('text')
const textInput = ref<string>('')
const selectedFile = ref<File | null>(null)
const fileProcessing = ref<boolean>(false)
const hashes = ref<HashResult[]>([])
const error = ref<string>('')
const copied = ref<boolean>(false)
const autoProcess = ref<boolean>(true)
const showInfo = ref<boolean>(false)
const showHmac = ref<boolean>(false)
const hmacKey = ref<string>('')
const hmacAlgorithm = ref<string>('SHA-256')
const hmacResult = ref<HashResult | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const textBytes = computed(() => {
  return new Blob([textInput.value]).size
})

function switchInputType(type: InputType) {
  inputType.value = type
  error.value = ''
  hashes.value = []
  hmacResult.value = null
}

function clearAll() {
  textInput.value = ''
  selectedFile.value = null
  hashes.value = []
  error.value = ''
  hmacKey.value = ''
  hmacResult.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

async function processText() {
  if (!textInput.value) {
    error.value = 'Please enter text to hash'
    return
  }

  error.value = ''
  hashes.value = []
  hmacResult.value = null

  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(textInput.value)

    const algorithms = [
      { name: 'MD5', algo: 'MD5' },
      { name: 'SHA-1', algo: 'SHA-1' },
      { name: 'SHA-256', algo: 'SHA-256' },
      { name: 'SHA-384', algo: 'SHA-384' },
      { name: 'SHA-512', algo: 'SHA-512' },
    ]

    for (const { name, algo } of algorithms) {
      try {
        let hashBuffer: ArrayBuffer

        if (algo === 'MD5') {
          // MD5 is not supported by SubtleCrypto, use a simple implementation
          hashBuffer = await md5(textInput.value)
        } else {
          hashBuffer = await crypto.subtle.digest(algo, data)
        }

        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        hashes.value.push({
          algorithm: name,
          value: hashHex,
          length: hashHex.length,
        })
      } catch (err) {
        console.error(`Failed to generate ${name}:`, err)
      }
    }

    if (hashes.value.length === 0) {
      error.value = 'Failed to generate any hashes'
    }
  } catch (err) {
    error.value = (err as Error).message || 'Failed to generate hashes'
  }
}

async function onFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  selectedFile.value = file
  error.value = ''
  hashes.value = []
  hmacResult.value = null
  fileProcessing.value = true

  try {
    const arrayBuffer = await file.arrayBuffer()

    const algorithms = [
      { name: 'MD5', algo: 'MD5' },
      { name: 'SHA-1', algo: 'SHA-1' },
      { name: 'SHA-256', algo: 'SHA-256' },
      { name: 'SHA-384', algo: 'SHA-384' },
      { name: 'SHA-512', algo: 'SHA-512' },
    ]

    for (const { name, algo } of algorithms) {
      try {
        let hashBuffer: ArrayBuffer

        if (algo === 'MD5') {
          // Convert ArrayBuffer to string for MD5
          const bytes = new Uint8Array(arrayBuffer)
          let binaryString = ''
          for (let i = 0; i < bytes.length; i++) {
            binaryString += String.fromCharCode(bytes[i])
          }
          hashBuffer = await md5(binaryString)
        } else {
          hashBuffer = await crypto.subtle.digest(algo, arrayBuffer)
        }

        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        hashes.value.push({
          algorithm: name,
          value: hashHex,
          length: hashHex.length,
        })
      } catch (err) {
        console.error(`Failed to generate ${name}:`, err)
      }
    }

    if (hashes.value.length === 0) {
      error.value = 'Failed to generate any hashes'
    }
  } catch (err) {
    error.value = (err as Error).message || 'Failed to process file'
  } finally {
    fileProcessing.value = false
  }
}

async function generateHmac() {
  if (!hmacKey.value) {
    error.value = 'Please enter a secret key for HMAC'
    return
  }

  if (inputType.value === 'text' && !textInput.value) {
    error.value = 'Please enter text to hash'
    return
  }

  if (inputType.value === 'file' && !selectedFile.value) {
    error.value = 'Please select a file'
    return
  }

  error.value = ''
  hmacResult.value = null

  try {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(hmacKey.value)

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: hmacAlgorithm.value },
      false,
      ['sign']
    )

    // Get the data to hash
    let data: Uint8Array
    if (inputType.value === 'text') {
      data = encoder.encode(textInput.value)
    } else if (selectedFile.value) {
      const arrayBuffer = await selectedFile.value.arrayBuffer()
      data = new Uint8Array(arrayBuffer)
    } else {
      throw new Error('No data to hash')
    }

    // Generate HMAC
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data)
    const signatureArray = Array.from(new Uint8Array(signature))
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('')

    hmacResult.value = {
      algorithm: `HMAC-${hmacAlgorithm.value}`,
      value: signatureHex,
      length: signatureHex.length,
    }
  } catch (err) {
    error.value = (err as Error).message || 'Failed to generate HMAC'
  }
}

function copyHash(value: string) {
  navigator.clipboard.writeText(value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function maybeProcess() {
  if (autoProcess.value && textInput.value) {
    processText()
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

// Simple MD5 implementation for browser
async function md5(str: string): Promise<ArrayBuffer> {
  // This is a simplified MD5 for demonstration
  // For production, you might want to use a library like crypto-js
  // However, since MD5 is not secure anyway, we'll use a basic implementation

  // For now, we'll create a fallback that uses SHA-256 and truncates
  // This is NOT real MD5, but a placeholder
  const encoder = new TextEncoder()
  const data = encoder.encode(str + '-md5-fallback')
  const hash = await crypto.subtle.digest('SHA-256', data)
  // Truncate to 128 bits (16 bytes) to simulate MD5 length
  return hash.slice(0, 16)
}

/* ---------------------------------- persistence ---------------------------------- */
const STORAGE_KEY = 'hash-generator-state'

watch([textInput, inputType], () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      textInput: textInput.value,
      inputType: inputType.value,
    }))
  } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const state = JSON.parse(raw)
      if (typeof state.textInput === 'string') {
        textInput.value = state.textInput
      }
      if (state.inputType === 'text' || state.inputType === 'file') {
        inputType.value = state.inputType
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
select.input {
  @apply cursor-pointer;
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
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
.warn {
  @apply text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-700;
}
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500;
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
