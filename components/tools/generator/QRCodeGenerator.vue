<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">📱 QR Code Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Create QR codes for URLs, text, WiFi, vCards, and more</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn" @click="clearAll">Clear All</button>
      </div>
    </div>

    <!-- Quick Templates -->
    <div class="card">
      <label class="label mb-3">⚡ Quick Templates</label>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button class="btn text-sm" @click="applyTemplate('url')">
          🔗 URL
        </button>
        <button class="btn text-sm" @click="applyTemplate('text')">
          📝 Text
        </button>
        <button class="btn text-sm" @click="applyTemplate('wifi')">
          📶 WiFi
        </button>
        <button class="btn text-sm" @click="applyTemplate('vcard')">
          👤 vCard
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <label class="label">Content</label>
      <textarea
          v-model="content"
          placeholder="Enter URL, text, or data to encode in QR code..."
          class="input font-mono resize-y min-h-[120px]"
          spellcheck="false"
          @input="debouncedGenerate"
      ></textarea>
      <div class="text-xs text-gray-400">
        <span>Characters: {{ content.length }}</span>
        <span v-if="content.length > 0" class="ml-3">
          {{ content.length > 2953 ? '⚠️ Too long (max 2953)' : '✓ Valid length' }}
        </span>
      </div>
    </div>

    <!-- Options -->
    <div class="card space-y-4">
      <label class="label">QR Code Options</label>

      <!-- Size -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="label">Size: {{ size }}px</label>
        </div>
        <input
            v-model.number="size"
            type="range"
            min="128"
            max="1024"
            step="32"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            @input="debouncedGenerate"
        />
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>128px</span>
          <span>1024px</span>
        </div>
      </div>

      <!-- Error Correction Level -->
      <div>
        <label class="label mb-2">Error Correction Level</label>
        <select v-model="errorCorrectionLevel" class="input" @change="generateQRCode">
          <option value="L">Low (7% recovery)</option>
          <option value="M">Medium (15% recovery) - Recommended</option>
          <option value="Q">Quartile (25% recovery)</option>
          <option value="H">High (30% recovery)</option>
        </select>
        <p class="text-xs text-gray-400 mt-1">
          Higher levels allow the QR code to be read even if partially damaged or obscured.
        </p>
      </div>

      <!-- Colors -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label mb-2">Foreground Color</label>
          <div class="flex items-center gap-2">
            <input
                v-model="foregroundColor"
                type="color"
                class="w-12 h-10 rounded cursor-pointer bg-gray-900 border-2 border-gray-700"
                @input="debouncedGenerate"
            />
            <input
                v-model="foregroundColor"
                type="text"
                class="input font-mono text-sm flex-1"
                @input="debouncedGenerate"
            />
          </div>
        </div>
        <div>
          <label class="label mb-2">Background Color</label>
          <div class="flex items-center gap-2">
            <input
                v-model="backgroundColor"
                type="color"
                class="w-12 h-10 rounded cursor-pointer bg-gray-900 border-2 border-gray-700"
                @input="debouncedGenerate"
            />
            <input
                v-model="backgroundColor"
                type="text"
                class="input font-mono text-sm flex-1"
                @input="debouncedGenerate"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="card">
      <div class="warn">
        <strong>⚠️ Error:</strong> {{ error }}
      </div>
    </div>

    <!-- Generated QR Code -->
    <div v-if="qrDataURL" class="card space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <label class="label">Generated QR Code</label>
        <div class="flex items-center gap-2">
          <button class="btn" @click="downloadQR('png')" title="Download as PNG">
            💾 PNG
          </button>
          <button class="btn" @click="downloadQR('svg')" title="Download as SVG">
            💾 SVG
          </button>
        </div>
      </div>

      <!-- QR Code Display -->
      <div class="flex justify-center bg-white p-8 rounded-lg">
        <img :src="qrDataURL" :alt="content" class="max-w-full" :style="{ width: `${Math.min(size, 512)}px` }" />
      </div>

      <!-- Info -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        <div class="bg-gray-800 p-2 rounded">
          <span class="text-gray-400">Size:</span>
          <span class="text-white ml-1 font-medium">{{ size }}×{{ size }}px</span>
        </div>
        <div class="bg-gray-800 p-2 rounded">
          <span class="text-gray-400">Data length:</span>
          <span class="text-white ml-1 font-medium">{{ content.length }} chars</span>
        </div>
        <div class="bg-gray-800 p-2 rounded">
          <span class="text-gray-400">Error correction:</span>
          <span class="text-white ml-1 font-medium">{{ errorCorrectionLevel }}</span>
        </div>
      </div>
    </div>

    <!-- Example Templates Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <label class="label">📋 Example Templates</label>
        <button class="btn-small" @click="showExamples = !showExamples">
          {{ showExamples ? '▼' : '▶' }} {{ showExamples ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showExamples" class="space-y-3 text-sm">
        <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p class="font-semibold text-white mb-1">📱 URL / Website</p>
          <code class="text-xs text-gray-300 block">https://example.com</code>
        </div>

        <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p class="font-semibold text-white mb-1">📶 WiFi Network</p>
          <code class="text-xs text-gray-300 block">WIFI:T:WPA;S:NetworkName;P:Password123;;</code>
          <p class="text-xs text-gray-400 mt-1">Format: WIFI:T:[WPA|WEP|];S:[SSID];P:[password];;</p>
        </div>

        <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p class="font-semibold text-white mb-1">👤 vCard (Contact)</p>
          <code class="text-xs text-gray-300 block whitespace-pre-wrap">BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1234567890
EMAIL:john@example.com
END:VCARD</code>
        </div>

        <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p class="font-semibold text-white mb-1">✉️ Email</p>
          <code class="text-xs text-gray-300 block">mailto:example@email.com?subject=Hello&body=Message</code>
        </div>

        <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p class="font-semibold text-white mb-1">📞 Phone Number</p>
          <code class="text-xs text-gray-300 block">tel:+1234567890</code>
        </div>

        <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p class="font-semibold text-white mb-1">💬 SMS</p>
          <code class="text-xs text-gray-300 block">sms:+1234567890?body=Hello</code>
        </div>

        <div class="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p class="font-semibold text-white mb-1">📍 Geo Location</p>
          <code class="text-xs text-gray-300 block">geo:37.7749,-122.4194</code>
        </div>
      </div>
    </div>

    <!-- Info / Tips -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <p class="label">💡 About QR Codes</p>
        <button class="btn-small" @click="showInfo = !showInfo">
          {{ showInfo ? '▼' : '▶' }} {{ showInfo ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showInfo" class="space-y-3 text-sm text-gray-300">
        <div>
          <p class="font-semibold text-white mb-1">What is a QR Code?</p>
          <p>QR (Quick Response) Code is a 2D barcode that stores information readable by smartphones and QR scanners. Invented by Denso Wave in 1994.</p>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">Error Correction Levels:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2">
            <li><strong>L (Low):</strong> 7% recovery - Suitable for clean environments</li>
            <li><strong>M (Medium):</strong> 15% recovery - Recommended for most uses</li>
            <li><strong>Q (Quartile):</strong> 25% recovery - For industrial environments</li>
            <li><strong>H (High):</strong> 30% recovery - Maximum durability, larger code</li>
          </ul>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">Capacity:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2">
            <li><strong>Numeric:</strong> Up to 7,089 characters</li>
            <li><strong>Alphanumeric:</strong> Up to 4,296 characters</li>
            <li><strong>Binary:</strong> Up to 2,953 bytes</li>
            <li><strong>Kanji:</strong> Up to 1,817 characters</li>
          </ul>
        </div>

        <div>
          <p class="font-semibold text-white mb-1">Best Practices:</p>
          <ul class="list-disc list-inside space-y-1 text-xs ml-2">
            <li>Keep data concise—shorter content = simpler QR code = faster scanning</li>
            <li>Use high contrast colors (dark on light background)</li>
            <li>Leave quiet zone (white border) around QR code</li>
            <li>Test scanning from different distances and devices</li>
            <li>For URLs, use URL shorteners to reduce code complexity</li>
            <li>Print at minimum 2×2 cm (0.8×0.8 inch) for reliable scanning</li>
          </ul>
        </div>

        <div class="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mt-3">
          <p class="font-semibold text-blue-400 mb-1">🔒 Privacy Note:</p>
          <p class="text-xs">QR codes are generated locally in your browser. No data is sent to any server.</p>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import QRCode from 'qrcode'

const content = ref<string>('')
const size = ref<number>(512)
const errorCorrectionLevel = ref<'L' | 'M' | 'Q' | 'H'>('M')
const foregroundColor = ref<string>('#000000')
const backgroundColor = ref<string>('#ffffff')
const qrDataURL = ref<string>('')
const error = ref<string>('')
const showInfo = ref<boolean>(false)
const showExamples = ref<boolean>(false)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

function applyTemplate(type: string) {
  if (type === 'url') {
    content.value = 'https://codehelper.me'
  } else if (type === 'text') {
    content.value = 'Hello World! This is a QR code.'
  } else if (type === 'wifi') {
    content.value = 'WIFI:T:WPA;S:MyNetwork;P:MyPassword123;;'
  } else if (type === 'vcard') {
    content.value = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1234567890
EMAIL:john@example.com
END:VCARD`
  }
  generateQRCode()
}

function debouncedGenerate() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    generateQRCode()
  }, 300)
}

async function generateQRCode() {
  error.value = ''
  qrDataURL.value = ''

  if (!content.value.trim()) {
    return
  }

  if (content.value.length > 2953) {
    error.value = 'Content is too long. Maximum 2953 bytes for binary data.'
    return
  }

  try {
    const dataURL = await QRCode.toDataURL(content.value, {
      width: size.value,
      errorCorrectionLevel: errorCorrectionLevel.value,
      color: {
        dark: foregroundColor.value,
        light: backgroundColor.value,
      },
      margin: 1,
    })

    qrDataURL.value = dataURL
  } catch (err) {
    error.value = (err as Error).message || 'Failed to generate QR code'
  }
}

async function downloadQR(format: 'png' | 'svg') {
  if (!content.value.trim()) {
    error.value = 'Please enter content first'
    return
  }

  try {
    if (format === 'png') {
      // Use existing dataURL
      const link = document.createElement('a')
      link.href = qrDataURL.value
      link.download = 'qrcode.png'
      link.click()
    } else if (format === 'svg') {
      // Generate SVG
      const svg = await QRCode.toString(content.value, {
        type: 'svg',
        errorCorrectionLevel: errorCorrectionLevel.value,
        color: {
          dark: foregroundColor.value,
          light: backgroundColor.value,
        },
        margin: 1,
      })

      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'qrcode.svg'
      link.click()
      URL.revokeObjectURL(url)
    }
  } catch (err) {
    error.value = (err as Error).message || 'Failed to download QR code'
  }
}

function clearAll() {
  content.value = ''
  qrDataURL.value = ''
  error.value = ''
}

/* ---------------------------------- persistence ---------------------------------- */
const STORAGE_KEY = 'qr-generator-state'

watch([size, errorCorrectionLevel, foregroundColor, backgroundColor], () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      size: size.value,
      errorCorrectionLevel: errorCorrectionLevel.value,
      foregroundColor: foregroundColor.value,
      backgroundColor: backgroundColor.value,
    }))
  } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const state = JSON.parse(raw)
      if (typeof state.size === 'number' && state.size >= 128 && state.size <= 1024) {
        size.value = state.size
      }
      if (['L', 'M', 'Q', 'H'].includes(state.errorCorrectionLevel)) {
        errorCorrectionLevel.value = state.errorCorrectionLevel
      }
      if (typeof state.foregroundColor === 'string') {
        foregroundColor.value = state.foregroundColor
      }
      if (typeof state.backgroundColor === 'string') {
        backgroundColor.value = state.backgroundColor
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
.warn {
  @apply text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-700;
}
code {
  @apply bg-gray-800 px-1 py-0.5 rounded text-xs font-mono;
}

/* Range slider styling */
.slider::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-indigo-600 rounded-full cursor-pointer;
}
.slider::-moz-range-thumb {
  @apply w-4 h-4 bg-indigo-600 rounded-full cursor-pointer border-0;
}
</style>
