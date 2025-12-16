<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🆔 UUID/GUID Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Generate unique identifiers (UUID v4, v1, Nil, Max)</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear All</button>
      </div>
    </div>

    <!-- UUID Version Selection -->
    <div class="card">
      <label class="label mb-3">UUID Version</label>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
            :class="[version === 'v4' ? 'btn-primary' : 'btn']"
            @click="version = 'v4'"
        >
          v4 (Random)
        </button>
        <button
            :class="[version === 'v1' ? 'btn-primary' : 'btn']"
            @click="version = 'v1'"
        >
          v1 (Timestamp)
        </button>
        <button
            :class="[version === 'nil' ? 'btn-primary' : 'btn']"
            @click="version = 'nil'"
        >
          Nil UUID
        </button>
        <button
            :class="[version === 'max' ? 'btn-primary' : 'btn']"
            @click="version = 'max'"
        >
          Max UUID
        </button>
      </div>
      <div class="mt-3 text-xs text-gray-400">
        <p v-if="version === 'v4'"><strong>v4:</strong> Random UUID, most commonly used. Cryptographically secure random numbers.</p>
        <p v-if="version === 'v1'"><strong>v1:</strong> Timestamp-based UUID. Includes time and MAC address (simulated in browser).</p>
        <p v-if="version === 'nil'"><strong>Nil:</strong> Special UUID with all zeros (00000000-0000-0000-0000-000000000000).</p>
        <p v-if="version === 'max'"><strong>Max:</strong> Special UUID with all ones (ffffffff-ffff-ffff-ffff-ffffffffffff).</p>
      </div>
    </div>

    <!-- Generation Options -->
    <div class="card">
      <label class="label mb-3">Generation Options</label>
      <div class="space-y-3">
        <div>
          <label class="label mb-2">Number of UUIDs</label>
          <div class="flex items-center gap-3">
            <input
                v-model.number="count"
                type="number"
                min="1"
                max="1000"
                class="input w-32"
            />
            <span class="text-sm text-gray-400">Generate 1-1000 UUIDs at once</span>
          </div>
        </div>

        <div>
          <label class="label mb-2">Format</label>
          <select v-model="format" class="input">
            <option value="standard">Standard (8-4-4-4-12)</option>
            <option value="no-hyphens">No Hyphens</option>
            <option value="uppercase">Uppercase</option>
            <option value="braces">With Braces { }</option>
            <option value="urn">URN Format</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Generate Button -->
    <div class="card">
      <button class="btn-primary w-full" @click="generate">
        🎲 Generate {{ count > 1 ? `${count} UUIDs` : 'UUID' }}
      </button>
    </div>

    <!-- Generated UUIDs -->
    <div v-if="generatedUuids.length > 0" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex items-center gap-3">
          <label class="label">Generated UUIDs</label>
          <span class="text-xs px-2 py-1 bg-indigo-800/30 text-indigo-400 rounded-full font-medium">
            {{ generatedUuids.length }} UUID{{ generatedUuids.length > 1 ? 's' : '' }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn" @click="copyAll" title="Copy all UUIDs">
            📋 Copy All
          </button>
          <button class="btn" @click="downloadTxt" title="Download as text file">
            💾 Download
          </button>
        </div>
      </div>

      <!-- UUID List -->
      <div class="space-y-2 max-h-96 overflow-y-auto">
        <div
            v-for="(uuid, index) in generatedUuids"
            :key="index"
            class="flex items-center gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors group"
        >
          <span class="text-gray-500 font-mono text-xs min-w-[40px]">#{{ index + 1 }}</span>
          <code class="flex-1 text-green-400 font-mono text-sm break-all">{{ uuid }}</code>
          <button
              class="btn-small opacity-0 group-hover:opacity-100 transition-opacity"
              @click="copySingle(uuid)"
              title="Copy this UUID"
          >
            📋
          </button>
        </div>
      </div>
    </div>

    <!-- UUID Validator -->
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <label class="label">✅ UUID Validator</label>
        <button class="btn-small" @click="showValidator = !showValidator">
          {{ showValidator ? '▼' : '▶' }} {{ showValidator ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showValidator" class="space-y-3">
        <div>
          <label class="label mb-2">UUID to Validate</label>
          <input
              v-model="validatorInput"
              type="text"
              class="input font-mono"
              placeholder="Enter UUID to validate (e.g., 550e8400-e29b-41d4-a716-446655440000)"
              @input="validateUuid"
          />
        </div>

        <div v-if="validationResult" class="mt-3">
          <div
              class="p-3 rounded-lg border"
              :class="validationResult.valid
                ? 'bg-green-900/20 border-green-600 text-green-400'
                : 'bg-red-900/20 border-red-600 text-red-400'
              "
          >
            <p class="font-medium">
              {{ validationResult.valid ? '✅ Valid UUID' : '❌ Invalid UUID' }}
            </p>
            <p class="text-xs mt-1 opacity-90">{{ validationResult.message }}</p>
            <div v-if="validationResult.details" class="mt-2 text-xs space-y-1">
              <p><strong>Version:</strong> {{ validationResult.details.version }}</p>
              <p><strong>Variant:</strong> {{ validationResult.details.variant }}</p>
            </div>
          </div>
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
        <p class="label">💡 About UUIDs</p>
        <button class="btn-small" @click="showInfo = !showInfo">
          {{ showInfo ? '▼' : '▶' }} {{ showInfo ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showInfo" class="space-y-3 text-sm text-gray-300">
        <div>
          <p class="font-semibold text-white mb-1">What is a UUID?</p>
          <p>UUID (Universally Unique Identifier) or GUID (Globally Unique Identifier) is a 128-bit number used to uniquely identify information. The probability of collision is extremely low.</p>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">UUID Format:</p>
          <code class="block bg-gray-800 p-2 rounded mt-1 text-xs">
            xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
          </code>
          <p class="mt-2">Where M indicates the version (1-5) and N indicates the variant (8, 9, A, or B).</p>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">UUID Versions:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2">
            <li><strong>v1:</strong> Timestamp + MAC address (48-bit node ID). Sortable but reveals time and location.</li>
            <li><strong>v2:</strong> DCE Security (rarely used).</li>
            <li><strong>v3:</strong> Namespace + MD5 hash.</li>
            <li><strong>v4:</strong> Random (most common). 122 random bits provide high uniqueness.</li>
            <li><strong>v5:</strong> Namespace + SHA-1 hash.</li>
          </ul>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">Common Use Cases:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2">
            <li>Database primary keys</li>
            <li>Distributed system identifiers</li>
            <li>Session tokens</li>
            <li>File names</li>
            <li>API request tracking</li>
            <li>Microservices communication</li>
          </ul>
        </div>

        <div class="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mt-3">
          <p class="font-semibold text-blue-400 mb-1">💡 Best Practices:</p>
          <ul class="list-disc list-inside space-y-1 text-xs">
            <li>Use <strong>v4</strong> (random) for most applications—secure and simple.</li>
            <li>Use <strong>v1</strong> if you need sortable IDs by time.</li>
            <li>Store UUIDs as binary (16 bytes) in databases for efficiency.</li>
            <li>Don't rely on UUIDs for security—they're identifiers, not secrets.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

type Version = 'v4' | 'v1' | 'nil' | 'max'
type Format = 'standard' | 'no-hyphens' | 'uppercase' | 'braces' | 'urn'

const version = ref<Version>('v4')
const count = ref<number>(1)
const format = ref<Format>('standard')
const generatedUuids = ref<string[]>([])
const copied = ref<boolean>(false)
const showInfo = ref<boolean>(false)
const showValidator = ref<boolean>(false)
const validatorInput = ref<string>('')
const validationResult = ref<{
  valid: boolean
  message: string
  details?: { version: string; variant: string }
} | null>(null)

function generate() {
  generatedUuids.value = []

  const uuids: string[] = []
  for (let i = 0; i < count.value; i++) {
    let uuid = ''

    if (version.value === 'v4') {
      uuid = generateV4()
    } else if (version.value === 'v1') {
      uuid = generateV1()
    } else if (version.value === 'nil') {
      uuid = '00000000-0000-0000-0000-000000000000'
    } else if (version.value === 'max') {
      uuid = 'ffffffff-ffff-ffff-ffff-ffffffffffff'
    }

    uuid = formatUuid(uuid)
    uuids.push(uuid)
  }

  generatedUuids.value = uuids
}

function generateV4(): string {
  // Use crypto.randomUUID() if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  // Fallback implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function generateV1(): string {
  // Simplified v1 implementation (timestamp-based)
  const now = Date.now()
  const timestamp = now * 10000 + 122192928000000000 // Convert to 100-nanosecond intervals since 1582-10-15

  // Split timestamp into low, mid, high
  const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0')
  const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0')
  const timeHigh = ((timestamp >> 48) & 0x0fff).toString(16).padStart(4, '0')

  // Version 1
  const timeHighVersion = (parseInt(timeHigh, 16) | 0x1000).toString(16).padStart(4, '0')

  // Clock sequence (random)
  const clockSeq = Math.floor(Math.random() * 0x3fff) | 0x8000
  const clockSeqHex = clockSeq.toString(16).padStart(4, '0')

  // Node (simulated MAC address - random)
  const node = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('')

  return `${timeLow}-${timeMid}-${timeHighVersion}-${clockSeqHex}-${node}`
}

function formatUuid(uuid: string): string {
  // Remove hyphens for manipulation
  const clean = uuid.replace(/-/g, '')

  let formatted = ''

  switch (format.value) {
    case 'standard':
      formatted = uuid.toLowerCase()
      break
    case 'no-hyphens':
      formatted = clean.toLowerCase()
      break
    case 'uppercase':
      formatted = uuid.toUpperCase()
      break
    case 'braces':
      formatted = `{${uuid.toLowerCase()}}`
      break
    case 'urn':
      formatted = `urn:uuid:${uuid.toLowerCase()}`
      break
  }

  return formatted
}

function copyAll() {
  const text = generatedUuids.value.join('\n')
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function copySingle(uuid: string) {
  navigator.clipboard.writeText(uuid)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function downloadTxt() {
  const text = generatedUuids.value.join('\n')
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'uuids.txt'
  a.click()
  URL.revokeObjectURL(url)
}

function clearAll() {
  generatedUuids.value = []
  validatorInput.value = ''
  validationResult.value = null
}

function validateUuid() {
  if (!validatorInput.value.trim()) {
    validationResult.value = null
    return
  }

  const uuid = validatorInput.value.trim().toLowerCase()

  // Remove optional braces and urn prefix
  let cleanUuid = uuid
    .replace(/^{|}$/g, '')
    .replace(/^urn:uuid:/i, '')

  // UUID regex (with or without hyphens)
  const uuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i

  if (!uuidRegex.test(cleanUuid)) {
    validationResult.value = {
      valid: false,
      message: 'Invalid UUID format. Expected format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    }
    return
  }

  // Extract version and variant
  const normalized = cleanUuid.replace(/-/g, '')
  const versionChar = normalized[12]
  const variantChar = normalized[16]

  const versionNum = parseInt(versionChar, 16)
  const variantNum = parseInt(variantChar, 16)

  let versionStr = 'Unknown'
  if (versionNum >= 1 && versionNum <= 5) {
    versionStr = `v${versionNum}`
  } else if (normalized === '00000000000000000000000000000000') {
    versionStr = 'Nil UUID'
  } else if (normalized === 'ffffffffffffffffffffffffffffffff') {
    versionStr = 'Max UUID'
  }

  let variantStr = 'Unknown'
  if ((variantNum & 0x8) === 0x8) {
    variantStr = 'RFC 4122'
  } else if ((variantNum & 0xc) === 0xc) {
    variantStr = 'Microsoft'
  } else if ((variantNum & 0xe) === 0xe) {
    variantStr = 'Reserved'
  }

  validationResult.value = {
    valid: true,
    message: 'Valid UUID format',
    details: {
      version: versionStr,
      variant: variantStr,
    },
  }
}

/* ---------------------------------- persistence ---------------------------------- */
const STORAGE_KEY = 'uuid-generator-state'

watch([version, count, format], () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: version.value,
      count: count.value,
      format: format.value,
    }))
  } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const state = JSON.parse(raw)
      if (['v4', 'v1', 'nil', 'max'].includes(state.version)) {
        version.value = state.version
      }
      if (typeof state.count === 'number' && state.count >= 1 && state.count <= 1000) {
        count.value = state.count
      }
      if (['standard', 'no-hyphens', 'uppercase', 'braces', 'urn'].includes(state.format)) {
        format.value = state.format
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
