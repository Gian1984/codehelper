<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🔑 Password Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Generate secure passwords with customizable options</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear All</button>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="card">
      <label class="label mb-3">⚡ Quick Presets</label>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button class="btn text-left" @click="applyPreset('strong')">
          <div class="flex items-center gap-2">
            <span>🔐</span>
            <div>
              <div class="font-medium">Strong Password</div>
              <div class="text-xs text-gray-400">16 chars, all types</div>
            </div>
          </div>
        </button>
        <button class="btn text-left" @click="applyPreset('memorable')">
          <div class="flex items-center gap-2">
            <span>💭</span>
            <div>
              <div class="font-medium">Memorable</div>
              <div class="text-xs text-gray-400">No similar chars</div>
            </div>
          </div>
        </button>
        <button class="btn text-left" @click="applyPreset('pin')">
          <div class="flex items-center gap-2">
            <span>🔢</span>
            <div>
              <div class="font-medium">PIN Code</div>
              <div class="text-xs text-gray-400">6-digit number</div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Password Options -->
    <div class="card space-y-4">
      <label class="label">Password Options</label>

      <!-- Length -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="label">Length: {{ length }}</label>
          <span class="text-xs text-gray-400">{{ lengthDescription }}</span>
        </div>
        <input
            v-model.number="length"
            type="range"
            min="4"
            max="128"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            @input="generatePasswords"
        />
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>4</span>
          <span>128</span>
        </div>
      </div>

      <!-- Character Types -->
      <div class="space-y-2">
        <label class="inline-flex items-center gap-2 cursor-pointer bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors w-full">
          <input type="checkbox" v-model="options.uppercase" @change="generatePasswords" />
          <div class="flex-1">
            <span class="text-sm text-white font-medium">Uppercase Letters</span>
            <p class="text-xs text-gray-400 mt-0.5">A-Z (26 characters)</p>
          </div>
        </label>

        <label class="inline-flex items-center gap-2 cursor-pointer bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors w-full">
          <input type="checkbox" v-model="options.lowercase" @change="generatePasswords" />
          <div class="flex-1">
            <span class="text-sm text-white font-medium">Lowercase Letters</span>
            <p class="text-xs text-gray-400 mt-0.5">a-z (26 characters)</p>
          </div>
        </label>

        <label class="inline-flex items-center gap-2 cursor-pointer bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors w-full">
          <input type="checkbox" v-model="options.numbers" @change="generatePasswords" />
          <div class="flex-1">
            <span class="text-sm text-white font-medium">Numbers</span>
            <p class="text-xs text-gray-400 mt-0.5">0-9 (10 characters)</p>
          </div>
        </label>

        <label class="inline-flex items-center gap-2 cursor-pointer bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors w-full">
          <input type="checkbox" v-model="options.symbols" @change="generatePasswords" />
          <div class="flex-1">
            <span class="text-sm text-white font-medium">Symbols</span>
            <p class="text-xs text-gray-400 mt-0.5">!@#$%^&* etc. (32 characters)</p>
          </div>
        </label>
      </div>

      <!-- Advanced Options -->
      <div class="border-t border-gray-700 pt-3">
        <label class="inline-flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" v-model="options.excludeSimilar" @change="generatePasswords" />
          <span>Exclude similar characters (i, l, 1, L, o, 0, O)</span>
        </label>
      </div>

      <!-- Bulk Generation -->
      <div class="border-t border-gray-700 pt-3">
        <label class="label mb-2">Number of Passwords</label>
        <div class="flex items-center gap-3">
          <input
              v-model.number="count"
              type="number"
              min="1"
              max="50"
              class="input w-24"
          />
          <span class="text-xs text-gray-400">Generate 1-50 passwords at once</span>
        </div>
      </div>
    </div>

    <!-- Generate Button -->
    <div class="card">
      <button class="btn-primary w-full" @click="generatePasswords">
        🎲 Generate {{ count > 1 ? `${count} Passwords` : 'Password' }}
      </button>
    </div>

    <!-- Error message -->
    <div v-if="error" class="card">
      <div class="warn">
        <strong>⚠️ Error:</strong> {{ error }}
      </div>
    </div>

    <!-- Generated Passwords -->
    <div v-if="passwords.length > 0" class="space-y-3">
      <div
          v-for="(pwd, index) in passwords"
          :key="index"
          class="card"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div class="flex items-center gap-3">
            <span v-if="count > 1" class="text-gray-500 font-mono text-xs">#{{ index + 1 }}</span>
            <div
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="strengthClass(pwd.strength)"
            >
              {{ pwd.strength.label }}
            </div>
            <div class="flex gap-1">
              <div
                  v-for="i in 5"
                  :key="i"
                  class="w-2 h-2 rounded-full"
                  :class="i <= pwd.strength.score ? strengthColor(pwd.strength.score) : 'bg-gray-700'"
              ></div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
                class="btn-small"
                @click="copyPassword(pwd.value)"
                title="Copy password"
            >
              📋
            </button>
          </div>
        </div>

        <div class="mono-box text-lg break-all select-all">{{ pwd.value }}</div>

        <!-- Strength Details -->
        <div class="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div class="bg-gray-800 p-2 rounded">
            <span class="text-gray-400">Length:</span>
            <span class="text-white ml-1 font-medium">{{ pwd.value.length }}</span>
          </div>
          <div class="bg-gray-800 p-2 rounded">
            <span class="text-gray-400">Entropy:</span>
            <span class="text-white ml-1 font-medium">{{ pwd.strength.entropy.toFixed(1)} bits</span>
          </div>
          <div class="bg-gray-800 p-2 rounded">
            <span class="text-gray-400">Charset:</span>
            <span class="text-white ml-1 font-medium">{{ pwd.strength.charsetSize }}</span>
          </div>
          <div class="bg-gray-800 p-2 rounded">
            <span class="text-gray-400">Time to crack:</span>
            <span class="text-white ml-1 font-medium">{{ pwd.strength.crackTime }}</span>
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
        <p class="label">💡 Password Security Tips</p>
        <button class="btn-small" @click="showInfo = !showInfo">
          {{ showInfo ? '▼' : '▶' }} {{ showInfo ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showInfo" class="space-y-3 text-sm text-gray-300">
        <div>
          <p class="font-semibold text-white mb-1">Password Strength Guide:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2">
            <li><strong class="text-red-400">Weak (0-20%):</strong> Avoid. Can be cracked in seconds.</li>
            <li><strong class="text-orange-400">Fair (21-40%):</strong> Not recommended. Vulnerable to attacks.</li>
            <li><strong class="text-yellow-400">Good (41-60%):</strong> Acceptable for low-security accounts.</li>
            <li><strong class="text-blue-400">Strong (61-80%):</strong> Recommended for most accounts.</li>
            <li><strong class="text-green-400">Very Strong (81-100%):</strong> Excellent. Use for critical accounts.</li>
          </ul>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">Best Practices:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2">
            <li>Use at least <strong>12 characters</strong> for most accounts, 16+ for critical ones</li>
            <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>Avoid dictionary words, names, dates, and common patterns</li>
            <li>Never reuse passwords across different accounts</li>
            <li>Use a password manager to store passwords securely</li>
            <li>Enable two-factor authentication (2FA) whenever possible</li>
            <li>Change passwords if you suspect a breach</li>
          </ul>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">Entropy Explained:</p>
          <p class="text-xs">Entropy measures password randomness in bits. Higher entropy = more secure:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2 mt-1">
            <li><strong>28 bits:</strong> Weak (millions of combinations)</li>
            <li><strong>36 bits:</strong> Fair (billions of combinations)</li>
            <li><strong>60 bits:</strong> Good (quintillions of combinations)</li>
            <li><strong>77+ bits:</strong> Strong (effectively unbreakable with current technology)</li>
          </ul>
        </div>

        <div class="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mt-3">
          <p class="font-semibold text-blue-400 mb-1">🔒 Security Note:</p>
          <p class="text-xs">All passwords are generated locally in your browser using cryptographically secure random numbers. No data is sent to any server.</p>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface PasswordStrength {
  score: number // 0-5
  label: string
  entropy: number
  charsetSize: number
  crackTime: string
}

interface GeneratedPassword {
  value: string
  strength: PasswordStrength
}

const length = ref<number>(16)
const count = ref<number>(1)
const options = ref({
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: false,
})
const passwords = ref<GeneratedPassword[]>([])
const error = ref<string>('')
const copied = ref<boolean>(false)
const showInfo = ref<boolean>(false)

const lengthDescription = computed(() => {
  if (length.value < 8) return 'Too short'
  if (length.value < 12) return 'Weak'
  if (length.value < 16) return 'Good'
  if (length.value < 20) return 'Strong'
  return 'Very Strong'
})

function applyPreset(preset: string) {
  if (preset === 'strong') {
    length.value = 16
    options.value = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeSimilar: false,
    }
    count.value = 1
  } else if (preset === 'memorable') {
    length.value = 14
    options.value = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      excludeSimilar: true,
    }
    count.value = 1
  } else if (preset === 'pin') {
    length.value = 6
    options.value = {
      uppercase: false,
      lowercase: false,
      numbers: true,
      symbols: false,
      excludeSimilar: false,
    }
    count.value = 1
  }
  generatePasswords()
}

function generatePasswords() {
  error.value = ''
  passwords.value = []

  // Validate options
  if (!options.value.uppercase && !options.value.lowercase && !options.value.numbers && !options.value.symbols) {
    error.value = 'Please select at least one character type'
    return
  }

  // Build charset
  const charset = buildCharset()
  if (charset.length === 0) {
    error.value = 'No characters available with current options'
    return
  }

  // Generate passwords
  const results: GeneratedPassword[] = []
  for (let i = 0; i < count.value; i++) {
    const password = generatePassword(charset, length.value)
    const strength = calculateStrength(password, charset.length)
    results.push({ value: password, strength })
  }

  passwords.value = results
}

function buildCharset(): string {
  let chars = ''

  if (options.value.uppercase) {
    chars += options.value.excludeSimilar
      ? 'ABCDEFGHJKMNPQRSTUVWXYZ' // Exclude I, L, O
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }

  if (options.value.lowercase) {
    chars += options.value.excludeSimilar
      ? 'abcdefghjkmnpqrstuvwxyz' // Exclude i, l, o
      : 'abcdefghijklmnopqrstuvwxyz'
  }

  if (options.value.numbers) {
    chars += options.value.excludeSimilar
      ? '23456789' // Exclude 0, 1
      : '0123456789'
  }

  if (options.value.symbols) {
    chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  }

  return chars
}

function generatePassword(charset: string, len: number): string {
  const array = new Uint32Array(len)
  crypto.getRandomValues(array)

  let password = ''
  for (let i = 0; i < len; i++) {
    password += charset[array[i] % charset.length]
  }

  return password
}

function calculateStrength(password: string, charsetSize: number): PasswordStrength {
  // Calculate entropy: log2(charsetSize^length)
  const entropy = password.length * Math.log2(charsetSize)

  // Estimate crack time (assuming 10 billion guesses per second)
  const combinations = Math.pow(charsetSize, password.length)
  const guessesPerSecond = 10_000_000_000
  const seconds = combinations / guessesPerSecond

  let crackTime = ''
  if (seconds < 1) crackTime = 'instant'
  else if (seconds < 60) crackTime = `${seconds.toFixed(0)}s`
  else if (seconds < 3600) crackTime = `${(seconds / 60).toFixed(0)}min`
  else if (seconds < 86400) crackTime = `${(seconds / 3600).toFixed(0)}h`
  else if (seconds < 31536000) crackTime = `${(seconds / 86400).toFixed(0)}d`
  else if (seconds < 31536000000) crackTime = `${(seconds / 31536000).toFixed(0)}y`
  else crackTime = '∞ (centuries+)'

  // Calculate score (0-5)
  let score = 0
  if (entropy < 28) score = 0
  else if (entropy < 36) score = 1
  else if (entropy < 60) score = 2
  else if (entropy < 77) score = 3
  else if (entropy < 100) score = 4
  else score = 5

  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']

  return {
    score,
    label: labels[score],
    entropy,
    charsetSize,
    crackTime,
  }
}

function strengthClass(strength: PasswordStrength): string {
  const classes = [
    'bg-red-900/30 text-red-400 border border-red-700',
    'bg-red-900/30 text-red-400 border border-red-700',
    'bg-yellow-900/30 text-yellow-400 border border-yellow-700',
    'bg-blue-900/30 text-blue-400 border border-blue-700',
    'bg-green-900/30 text-green-400 border border-green-700',
    'bg-green-900/30 text-green-400 border border-green-700',
  ]
  return classes[strength.score]
}

function strengthColor(score: number): string {
  const colors = ['bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-green-500']
  return colors[score]
}

function copyPassword(password: string) {
  navigator.clipboard.writeText(password)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function clearAll() {
  passwords.value = []
  error.value = ''
}

/* ---------------------------------- persistence ---------------------------------- */
const STORAGE_KEY = 'password-generator-state'

watch([length, count, options], () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      length: length.value,
      count: count.value,
      options: { ...options.value },
    }))
  } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const state = JSON.parse(raw)
      if (typeof state.length === 'number' && state.length >= 4 && state.length <= 128) {
        length.value = state.length
      }
      if (typeof state.count === 'number' && state.count >= 1 && state.count <= 50) {
        count.value = state.count
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

/* Range slider styling */
.slider::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-indigo-600 rounded-full cursor-pointer;
}
.slider::-moz-range-thumb {
  @apply w-4 h-4 bg-indigo-600 rounded-full cursor-pointer border-0;
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
