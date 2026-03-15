<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🔐 JWT Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Create and sign JSON Web Tokens</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="generateToken" title="Generate JWT">
          ✨ Generate
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Header Section -->
    <div class="card space-y-3">
      <label class="label">📦 Header</label>

      <div class="space-y-2">
        <label class="label">Algorithm</label>
        <select v-model="algorithm" class="input">
          <option value="HS256">HS256</option>
          <option value="HS384">HS384</option>
          <option value="HS512">HS512</option>
        </select>
      </div>

      <div>
        <label class="label">Header Preview</label>
        <pre class="mono-box">{{ headerPreview }}</pre>
      </div>
    </div>

    <!-- Payload Section -->
    <div class="card space-y-4">
      <label class="label">📋 Payload</label>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Subject -->
        <div class="space-y-2">
          <label class="label">Subject (sub)</label>
          <input v-model="sub" type="text" class="input" placeholder="e.g. 1234567890" />
        </div>

        <!-- Issuer -->
        <div class="space-y-2">
          <label class="label">Issuer (iss)</label>
          <input v-model="iss" type="text" class="input" placeholder="e.g. myapp.com" />
        </div>

        <!-- Audience -->
        <div class="space-y-2">
          <label class="label">Audience (aud)</label>
          <input v-model="aud" type="text" class="input" placeholder="e.g. api.myapp.com" />
        </div>

        <!-- Expiration -->
        <div class="space-y-2">
          <label class="label">Expiration (exp)</label>
          <select v-model="expOption" class="input">
            <option value="">None</option>
            <option value="3600">1 hour</option>
            <option value="21600">6 hours</option>
            <option value="86400">24 hours</option>
            <option value="604800">7 days</option>
            <option value="2592000">30 days</option>
            <option value="31536000">1 year</option>
            <option value="custom">Custom (seconds)</option>
          </select>
          <input
              v-if="expOption === 'custom'"
              v-model.number="expCustomSeconds"
              type="number"
              class="input mt-2"
              placeholder="Seconds from now"
              min="1"
          />
        </div>
      </div>

      <!-- Checkboxes -->
      <div class="flex items-center gap-6 flex-wrap">
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="includeIat" />
          <span class="text-sm text-gray-300">Issued At (iat)</span>
        </label>
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="includeNbf" />
          <span class="text-sm text-gray-300">Not Before (nbf)</span>
        </label>
      </div>

      <!-- Custom Claims -->
      <div class="space-y-2">
        <label class="label">Custom Claims (JSON)</label>
        <textarea
            v-model="customClaims"
            class="input font-mono resize-y min-h-[80px]"
            placeholder='{"name": "John Doe", "role": "admin"}'
            spellcheck="false"
        ></textarea>
        <p v-if="customClaimsError" class="warn">{{ customClaimsError }}</p>
      </div>
    </div>

    <!-- Secret -->
    <div class="card space-y-3">
      <label class="label">🔑 Secret / Signing Key</label>
      <div class="relative">
        <input
            v-model="secret"
            :type="showSecret ? 'text' : 'password'"
            class="input font-mono pr-20"
            placeholder="Enter your secret key"
        />
        <button
            class="absolute right-2 top-1/2 -translate-y-1/2 btn text-xs"
            @click="showSecret = !showSecret"
        >
          {{ showSecret ? 'Hide' : 'Show' }}
        </button>
      </div>
      <p class="text-xs text-gray-500">Your secret never leaves your browser. All signing is done client-side using the Web Crypto API.</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="card">
      <div class="warn">⚠️ {{ error }}</div>
    </div>

    <!-- Output -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label !mb-0">📄 Generated Token</label>
        <div v-if="generatedToken" class="flex items-center gap-2">
          <button class="btn" @click="copyToken" title="Copy token">
            📋 Copy
          </button>
        </div>
      </div>

      <div v-if="generatedToken">
        <div class="mono-box break-all whitespace-pre-wrap">
          <span class="text-red-400">{{ tokenParts.header }}</span><span class="text-gray-500">.</span><span class="text-purple-400">{{ tokenParts.payload }}</span><span class="text-gray-500">.</span><span class="text-cyan-400">{{ tokenParts.signature }}</span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-500 mt-2">
          <div class="flex gap-4">
            <span>Length: {{ generatedToken.length }} chars</span>
          </div>
          <div class="flex gap-3">
            <span class="text-red-400">Header</span>
            <span class="text-purple-400">Payload</span>
            <span class="text-cyan-400">Signature</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-16 text-gray-500">
        <div class="text-4xl mb-4">🔐</div>
        <p>Fill in the fields above and click "Generate" to create a JWT</p>
      </div>

      <span v-if="copied" class="text-green-400 font-medium text-sm">✅ Copied!</span>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/* ---------- state ---------- */
const algorithm = ref<'HS256' | 'HS384' | 'HS512'>('HS256')
const sub = ref<string>('')
const iss = ref<string>('')
const aud = ref<string>('')
const expOption = ref<string>('')
const expCustomSeconds = ref<number>(3600)
const includeIat = ref<boolean>(true)
const includeNbf = ref<boolean>(false)
const customClaims = ref<string>('')
const secret = ref<string>('')
const showSecret = ref<boolean>(false)

const generatedToken = ref<string>('')
const error = ref<string>('')
const copied = ref<boolean>(false)

/* ---------- computed ---------- */
const headerPreview = computed(() => {
  return JSON.stringify({ alg: algorithm.value, typ: 'JWT' }, null, 2)
})

const customClaimsError = computed(() => {
  if (!customClaims.value.trim()) return ''
  try {
    const parsed = JSON.parse(customClaims.value)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return 'Custom claims must be a JSON object'
    }
    return ''
  } catch {
    return 'Invalid JSON'
  }
})

const tokenParts = computed(() => {
  if (!generatedToken.value) return { header: '', payload: '', signature: '' }
  const parts = generatedToken.value.split('.')
  return {
    header: parts[0] || '',
    payload: parts[1] || '',
    signature: parts[2] || '',
  }
})

/* ---------- helpers ---------- */
function base64url(input: ArrayBuffer | string): string {
  const bytes = input instanceof ArrayBuffer
      ? new Uint8Array(input)
      : new TextEncoder().encode(input)
  return btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
}

/* ---------- actions ---------- */
function clearAll(): void {
  sub.value = ''
  iss.value = ''
  aud.value = ''
  expOption.value = ''
  expCustomSeconds.value = 3600
  includeIat.value = true
  includeNbf.value = false
  customClaims.value = ''
  secret.value = ''
  showSecret.value = false
  generatedToken.value = ''
  error.value = ''
  copied.value = false
}

async function generateToken(): Promise<void> {
  error.value = ''
  generatedToken.value = ''
  copied.value = false

  if (!secret.value) {
    error.value = 'Please enter a secret key'
    return
  }

  try {
    // Build header
    const header = { alg: algorithm.value, typ: 'JWT' }

    // Build payload
    const now = Math.floor(Date.now() / 1000)
    const payload: Record<string, any> = {}

    if (sub.value.trim()) payload.sub = sub.value.trim()
    if (iss.value.trim()) payload.iss = iss.value.trim()
    if (aud.value.trim()) payload.aud = aud.value.trim()

    if (includeIat.value) payload.iat = now
    if (includeNbf.value) payload.nbf = now

    if (expOption.value) {
      const seconds = expOption.value === 'custom'
          ? expCustomSeconds.value
          : parseInt(expOption.value, 10)
      if (seconds > 0) {
        payload.exp = now + seconds
      }
    }

    // Merge custom claims
    if (customClaims.value.trim()) {
      const parsed = JSON.parse(customClaims.value)
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        error.value = 'Custom claims must be a JSON object'
        return
      }
      Object.assign(payload, parsed)
    }

    // Base64url encode
    const headerB64 = base64url(JSON.stringify(header))
    const payloadB64 = base64url(JSON.stringify(payload))

    // Sign with HMAC using Web Crypto API
    const algMap: Record<string, string> = {
      HS256: 'SHA-256',
      HS384: 'SHA-384',
      HS512: 'SHA-512',
    }

    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret.value),
        { name: 'HMAC', hash: algMap[algorithm.value] },
        false,
        ['sign'],
    )
    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(headerB64 + '.' + payloadB64),
    )

    const signatureB64 = base64url(signature)

    generatedToken.value = headerB64 + '.' + payloadB64 + '.' + signatureB64
  } catch (err) {
    error.value = (err as Error).message || 'Failed to generate JWT'
  }
}

async function copyToken(): Promise<void> {
  if (!generatedToken.value) return
  await navigator.clipboard.writeText(generatedToken.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
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
select.input {
  @apply appearance-none;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}
textarea.input {
  @apply resize-y;
}
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500;
}
.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
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
</style>
