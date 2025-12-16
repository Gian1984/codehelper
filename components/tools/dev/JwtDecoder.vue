<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🔑 JWT Decoder & Validator</h2>
        <p class="text-sm text-gray-400 mt-1">Decode, validate, and inspect JSON Web Tokens</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear All</button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">JWT Token</label>
        <div class="flex items-center gap-2 flex-wrap">
          <label class="inline-flex items-center gap-2 cursor-pointer text-xs text-gray-300">
            <input type="checkbox" v-model="autoDecode" />
            Auto-decode
          </label>
        </div>
      </div>

      <textarea
          v-model="jwtInput"
          placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
          class="input font-mono resize-y min-h-[120px]"
          spellcheck="false"
          @input="maybeDecode"
      ></textarea>

      <div class="flex items-center justify-between text-xs text-gray-400 flex-wrap gap-2">
        <div class="flex gap-4 flex-wrap">
          <span>Length: {{ jwtInput.length.toLocaleString() }}</span>
          <span v-if="tokenStats.parts">Parts: {{ tokenStats.parts }}</span>
        </div>
        <div class="flex gap-2">
          <button class="btn" @click="loadExample">Load Example</button>
          <button class="btn" @click="decode">Decode</button>
        </div>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="card">
      <div class="warn">
        <strong>⚠️ Error:</strong> {{ error }}
      </div>
    </div>

    <!-- Decoded Sections -->
    <div v-if="decoded.header || decoded.payload" class="space-y-4">
      <!-- Header -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-3">
            <label class="label">🔒 Header</label>
            <span v-if="decoded.header?.alg" class="text-xs px-2 py-1 bg-blue-800/30 text-blue-400 rounded-full font-medium">
              {{ decoded.header.alg }}
            </span>
            <span v-if="decoded.header?.typ" class="text-xs px-2 py-1 bg-purple-800/30 text-purple-400 rounded-full font-medium">
              {{ decoded.header.typ }}
            </span>
          </div>
          <button class="btn" @click="copyHeader" title="Copy header">
            📋 Copy
          </button>
        </div>
        <pre class="mono-box max-h-64 overflow-y-auto">{{ formatJson(decoded.header) }}</pre>
      </div>

      <!-- Payload -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-3">
            <label class="label">📦 Payload</label>
            <span v-if="claimsCount > 0" class="text-xs px-2 py-1 bg-indigo-800/30 text-indigo-400 rounded-full font-medium">
              {{ claimsCount }} claims
            </span>
          </div>
          <button class="btn" @click="copyPayload" title="Copy payload">
            📋 Copy
          </button>
        </div>
        <pre class="mono-box max-h-96 overflow-y-auto">{{ formatJson(decoded.payload) }}</pre>

        <!-- Claims Info -->
        <div v-if="claimsInfo.length > 0" class="space-y-2 text-sm">
          <p class="label">📋 Standard Claims</p>
          <div class="grid gap-2">
            <div
                v-for="claim in claimsInfo"
                :key="claim.key"
                class="flex items-start gap-3 bg-gray-800 p-3 rounded-lg border"
                :class="claim.expired ? 'border-red-600' : 'border-gray-700'"
            >
              <span class="text-gray-400 font-mono text-xs min-w-[60px]">{{ claim.key }}:</span>
              <div class="flex-1">
                <p class="text-white">{{ claim.label }}</p>
                <p class="text-xs text-gray-400 mt-0.5" v-html="claim.value"></p>
                <p v-if="claim.expired" class="text-xs text-red-400 mt-1">⚠️ Token has expired</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Signature -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <label class="label">✍️ Signature</label>
          <button class="btn" @click="copySignature" title="Copy signature">
            📋 Copy
          </button>
        </div>
        <pre class="mono-box break-all">{{ decoded.signature || 'No signature' }}</pre>
      </div>
    </div>

    <!-- Signature Verification (Optional) -->
    <div v-if="decoded.header" class="card">
      <div class="flex items-center justify-between mb-3">
        <label class="label">🔐 Signature Verification (Optional)</label>
        <button class="btn-small" @click="showVerify = !showVerify">
          {{ showVerify ? '▼' : '▶' }} {{ showVerify ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showVerify" class="space-y-3">
        <div>
          <label class="label mb-2">Secret Key</label>
          <input
              v-model="secretKey"
              type="text"
              class="input font-mono"
              placeholder="Enter your secret key for HMAC algorithms (HS256, HS384, HS512)"
          />
          <p class="text-xs text-gray-400 mt-1">
            ⚠️ Only HMAC algorithms (HS256, HS384, HS512) are supported. Your secret never leaves your browser.
          </p>
        </div>

        <button
            class="btn-primary"
            @click="verifySignature"
            :disabled="!secretKey || !decoded.header"
        >
          🔍 Verify Signature
        </button>

        <div v-if="verificationResult" class="mt-3">
          <div
              class="p-3 rounded-lg border"
              :class="verificationResult.valid
                ? 'bg-green-900/20 border-green-600 text-green-400'
                : 'bg-red-900/20 border-red-600 text-red-400'
              "
          >
            <p class="font-medium">
              {{ verificationResult.valid ? '✅ Signature Valid' : '❌ Signature Invalid' }}
            </p>
            <p class="text-xs mt-1 opacity-90">{{ verificationResult.message }}</p>
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
        <p class="label">💡 About JWT</p>
        <button class="btn-small" @click="showInfo = !showInfo">
          {{ showInfo ? '▼' : '▶' }} {{ showInfo ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showInfo" class="space-y-2 text-sm text-gray-300">
        <p><strong>What is a JWT?</strong></p>
        <p>JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. JWTs are commonly used for:</p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>Authentication and authorization</li>
          <li>Information exchange between services</li>
          <li>Stateless session management</li>
          <li>API access tokens</li>
        </ul>

        <p class="mt-3"><strong>JWT Structure:</strong></p>
        <p>A JWT consists of three Base64URL-encoded parts separated by dots (.):</p>
        <ul class="list-decimal list-inside ml-4 space-y-1">
          <li><strong>Header:</strong> Contains the token type (typ) and signing algorithm (alg)</li>
          <li><strong>Payload:</strong> Contains the claims (statements about an entity and metadata)</li>
          <li><strong>Signature:</strong> Ensures the token hasn't been altered</li>
        </ul>

        <p class="mt-3"><strong>Standard Claims:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li><code>iss</code> (Issuer): Who created the token</li>
          <li><code>sub</code> (Subject): Who the token is about</li>
          <li><code>aud</code> (Audience): Who should accept the token</li>
          <li><code>exp</code> (Expiration Time): When the token expires</li>
          <li><code>nbf</code> (Not Before): When the token becomes valid</li>
          <li><code>iat</code> (Issued At): When the token was created</li>
          <li><code>jti</code> (JWT ID): Unique identifier for the token</li>
        </ul>

        <p class="mt-3"><strong>Security Note:</strong></p>
        <p>⚠️ JWTs are <strong>signed</strong>, not <strong>encrypted</strong>. Anyone can decode and read the contents. Never put sensitive data in a JWT unless it's also encrypted.</p>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface DecodedJWT {
  header: Record<string, any> | null
  payload: Record<string, any> | null
  signature: string | null
}

interface ClaimInfo {
  key: string
  label: string
  value: string
  expired?: boolean
}

const jwtInput = ref<string>('')
const decoded = ref<DecodedJWT>({
  header: null,
  payload: null,
  signature: null,
})
const error = ref<string>('')
const copied = ref<boolean>(false)
const autoDecode = ref<boolean>(true)
const showInfo = ref<boolean>(false)
const showVerify = ref<boolean>(false)
const secretKey = ref<string>('')
const verificationResult = ref<{ valid: boolean; message: string } | null>(null)

const tokenStats = computed(() => {
  const parts = jwtInput.value.split('.').filter(p => p.length > 0).length
  return { parts: parts > 0 ? parts : null }
})

const claimsCount = computed(() => {
  if (!decoded.value.payload) return 0
  return Object.keys(decoded.value.payload).length
})

const claimsInfo = computed<ClaimInfo[]>(() => {
  if (!decoded.value.payload) return []

  const payload = decoded.value.payload
  const claims: ClaimInfo[] = []
  const now = Math.floor(Date.now() / 1000)

  if (payload.iss) {
    claims.push({ key: 'iss', label: 'Issuer', value: payload.iss })
  }
  if (payload.sub) {
    claims.push({ key: 'sub', label: 'Subject', value: payload.sub })
  }
  if (payload.aud) {
    const aud = Array.isArray(payload.aud) ? payload.aud.join(', ') : payload.aud
    claims.push({ key: 'aud', label: 'Audience', value: aud })
  }
  if (payload.exp) {
    const date = new Date(payload.exp * 1000)
    const expired = payload.exp < now
    const timeLeft = expired ? null : formatDuration(payload.exp - now)
    claims.push({
      key: 'exp',
      label: 'Expiration Time',
      value: `${date.toLocaleString()} ${timeLeft ? `(${timeLeft} remaining)` : '(expired)'}`,
      expired,
    })
  }
  if (payload.nbf) {
    const date = new Date(payload.nbf * 1000)
    const valid = payload.nbf <= now
    claims.push({
      key: 'nbf',
      label: 'Not Before',
      value: `${date.toLocaleString()} ${valid ? '(valid now)' : '(not yet valid)'}`,
    })
  }
  if (payload.iat) {
    const date = new Date(payload.iat * 1000)
    const ago = formatDuration(now - payload.iat)
    claims.push({
      key: 'iat',
      label: 'Issued At',
      value: `${date.toLocaleString()} (${ago} ago)`,
    })
  }
  if (payload.jti) {
    claims.push({ key: 'jti', label: 'JWT ID', value: payload.jti })
  }

  return claims
})

function decode() {
  error.value = ''
  verificationResult.value = null
  decoded.value = { header: null, payload: null, signature: null }

  const token = jwtInput.value.trim()
  if (!token) {
    error.value = 'Please enter a JWT token'
    return
  }

  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format. Expected 3 parts separated by dots.')
    }

    // Decode header
    try {
      decoded.value.header = JSON.parse(base64UrlDecode(parts[0]))
    } catch {
      throw new Error('Failed to decode header. Invalid Base64URL encoding.')
    }

    // Decode payload
    try {
      decoded.value.payload = JSON.parse(base64UrlDecode(parts[1]))
    } catch {
      throw new Error('Failed to decode payload. Invalid Base64URL encoding.')
    }

    // Store signature (Base64URL encoded)
    decoded.value.signature = parts[2]
  } catch (err) {
    error.value = (err as Error).message || 'Failed to decode JWT'
    decoded.value = { header: null, payload: null, signature: null }
  }
}

function base64UrlDecode(str: string): string {
  // Convert Base64URL to Base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')

  // Add padding if needed
  const pad = base64.length % 4
  if (pad) {
    base64 += '='.repeat(4 - pad)
  }

  // Decode Base64
  try {
    const decoded = atob(base64)
    // Try UTF-8 decode
    const bytes = new Uint8Array(decoded.length)
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i)
    }
    return new TextDecoder('utf-8').decode(bytes)
  } catch {
    throw new Error('Invalid Base64URL string')
  }
}

function formatJson(obj: any): string {
  if (!obj) return ''
  return JSON.stringify(obj, null, 2)
}

function formatDuration(seconds: number): string {
  const abs = Math.abs(seconds)
  const d = Math.floor(abs / 86400)
  const h = Math.floor((abs % 86400) / 3600)
  const m = Math.floor((abs % 3600) / 60)
  const s = Math.floor(abs % 60)

  const parts = []
  if (d > 0) parts.push(`${d}d`)
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  if (s > 0 || parts.length === 0) parts.push(`${s}s`)

  return parts.join(' ')
}

async function verifySignature() {
  verificationResult.value = null

  if (!decoded.value.header || !secretKey.value) {
    error.value = 'Please decode a token and enter a secret key first'
    return
  }

  const alg = decoded.value.header.alg
  if (!alg || !['HS256', 'HS384', 'HS512'].includes(alg)) {
    verificationResult.value = {
      valid: false,
      message: `Algorithm "${alg}" is not supported. Only HS256, HS384, and HS512 are supported in the browser.`,
    }
    return
  }

  try {
    const parts = jwtInput.value.trim().split('.')
    const message = `${parts[0]}.${parts[1]}`
    const signature = parts[2]

    // Map algorithm to Web Crypto API algorithm
    const algMap: Record<string, string> = {
      'HS256': 'SHA-256',
      'HS384': 'SHA-384',
      'HS512': 'SHA-512',
    }

    // Import secret key
    const encoder = new TextEncoder()
    const keyData = encoder.encode(secretKey.value)
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: algMap[alg] },
      false,
      ['sign']
    )

    // Sign the message
    const messageData = encoder.encode(message)
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData)

    // Convert signature to Base64URL
    const signatureArray = new Uint8Array(signatureBuffer)
    let binary = ''
    for (let i = 0; i < signatureArray.length; i++) {
      binary += String.fromCharCode(signatureArray[i])
    }
    const base64 = btoa(binary)
    const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

    // Compare signatures
    const valid = base64url === signature

    verificationResult.value = {
      valid,
      message: valid
        ? 'The signature is valid. The token has not been tampered with.'
        : 'The signature is invalid. Either the secret is wrong or the token has been modified.',
    }
  } catch (err) {
    verificationResult.value = {
      valid: false,
      message: `Verification failed: ${(err as Error).message}`,
    }
  }
}

function loadExample() {
  // Example JWT with standard claims
  jwtInput.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTksImlzcyI6ImNvZGVoZWxwZXIubWUiLCJhdWQiOiJkZXZlbG9wZXJzIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  if (autoDecode.value) {
    decode()
  }
}

function copyHeader() {
  if (!decoded.value.header) return
  navigator.clipboard.writeText(formatJson(decoded.value.header))
  showCopied()
}

function copyPayload() {
  if (!decoded.value.payload) return
  navigator.clipboard.writeText(formatJson(decoded.value.payload))
  showCopied()
}

function copySignature() {
  if (!decoded.value.signature) return
  navigator.clipboard.writeText(decoded.value.signature)
  showCopied()
}

function showCopied() {
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function clearAll() {
  jwtInput.value = ''
  decoded.value = { header: null, payload: null, signature: null }
  error.value = ''
  secretKey.value = ''
  verificationResult.value = null
}

function maybeDecode() {
  if (autoDecode.value) {
    decode()
  }
}

/* ---------------------------------- persistence ---------------------------------- */
const STORAGE_KEY = 'jwt-decoder-state'

watch([jwtInput], () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ jwtInput: jwtInput.value }))
  } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const state = JSON.parse(raw)
      if (typeof state.jwtInput === 'string') {
        jwtInput.value = state.jwtInput
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
