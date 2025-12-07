<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-2xl font-semibold">🔢 Number Base Converter</h2>
          <p class="text-sm text-gray-400 mt-1">Convert between binary, octal, decimal, and hexadecimal with BigInt support</p>
        </div>
        <div class="flex items-center gap-2">
          <button @click="clearAll" class="btn">🗑️ Clear All</button>
          <button @click="negate" class="btn">± Toggle Sign</button>
        </div>
      </div>
    </div>

    <!-- Quick Examples -->
    <div class="card">
      <h3 class="text-sm font-medium text-gray-300 mb-3">🔢 Quick Examples</h3>
      <div class="flex flex-wrap gap-2">
        <button class="btn-example" @click="setFromDecimal('255')">255</button>
        <button class="btn-example" @click="setFromDecimal('1024')">1024</button>
        <button class="btn-example" @click="setFromDecimal('65535')">65535 (2^16-1)</button>
        <button class="btn-example" @click="setFromDecimal('-42')">-42</button>
        <button class="btn-example" @click="setFromDecimal('18446744073709551615')">2^64-1</button>
      </div>
    </div>

    <!-- Options -->
    <div class="card">
      <h3 class="text-sm font-medium text-gray-300 mb-4">⚙️ Display Options</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Checkboxes -->
        <div class="space-y-3">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="opts.showPrefix" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Show prefixes (0b / 0o / 0x)</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="opts.upperHex" class="w-4 h-4 accent-indigo-500" />
            <span class="text-xs text-gray-300">Uppercase hex</span>
          </label>
        </div>

        <!-- Group Size -->
        <div>
          <label class="text-xs font-medium text-gray-400 mb-2 block">Group Digits</label>
          <select v-model.number="opts.groupSize" class="input text-sm">
            <option :value="0">None</option>
            <option :value="2">2 digits</option>
            <option :value="3">3 digits</option>
            <option :value="4">4 digits</option>
          </select>
          <p class="text-xs text-gray-400 mt-1">Per-base grouping</p>
        </div>

        <!-- Bit Width Padding -->
        <div class="sm:col-span-2 lg:col-span-1">
          <label class="text-xs font-medium text-gray-400 mb-2 block">Pad to Bit Width</label>
          <div class="flex flex-wrap gap-2">
            <button
                v-for="b in bitOptions"
                :key="b"
                class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                :class="opts.padBits === b ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
                @click="opts.padBits = (opts.padBits === b ? 0 : b)"
            >
              {{ b }}-bit
            </button>
            <button
                class="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
                @click="opts.padBits = 0"
            >
              No pad
            </button>
          </div>
          <p class="text-xs text-gray-400 mt-1">For non-negative values</p>
        </div>
      </div>
    </div>

    <!-- Inputs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Binary -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between">
          <label class="label">Binary</label>
          <button
            @click="copy(binary, 'bin')"
            class="btn text-xs"
            :disabled="!binary"
          >
            {{ copiedMsg && lastCopied === 'bin' ? '✓ Copied!' : '📋 Copy' }}
          </button>
        </div>
        <input
          v-model.trim="binary"
          @input="onEdit('bin')"
          class="input font-mono"
          placeholder="0b1010 or 1010"
        />
        <p v-if="errors.bin" class="text-red-400 text-xs flex items-center gap-1">
          <span>⚠️</span>
          <span>{{ errors.bin }}</span>
        </p>
      </div>

      <!-- Octal -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between">
          <label class="label">Octal</label>
          <button
            @click="copy(octal, 'oct')"
            class="btn text-xs"
            :disabled="!octal"
          >
            {{ copiedMsg && lastCopied === 'oct' ? '✓ Copied!' : '📋 Copy' }}
          </button>
        </div>
        <input
          v-model.trim="octal"
          @input="onEdit('oct')"
          class="input font-mono"
          placeholder="0o755 or 755"
        />
        <p v-if="errors.oct" class="text-red-400 text-xs flex items-center gap-1">
          <span>⚠️</span>
          <span>{{ errors.oct }}</span>
        </p>
      </div>

      <!-- Decimal -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between">
          <label class="label">Decimal</label>
          <button
            @click="copy(decimal, 'dec')"
            class="btn text-xs"
            :disabled="!decimal"
          >
            {{ copiedMsg && lastCopied === 'dec' ? '✓ Copied!' : '📋 Copy' }}
          </button>
        </div>
        <input
          v-model.trim="decimal"
          @input="onEdit('dec')"
          class="input font-mono"
          placeholder="e.g. 123456 or -42"
        />
        <p v-if="errors.dec" class="text-red-400 text-xs flex items-center gap-1">
          <span>⚠️</span>
          <span>{{ errors.dec }}</span>
        </p>
      </div>

      <!-- Hexadecimal -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between">
          <label class="label">Hexadecimal</label>
          <button
            @click="copy(hex, 'hex')"
            class="btn text-xs"
            :disabled="!hex"
          >
            {{ copiedMsg && lastCopied === 'hex' ? '✓ Copied!' : '📋 Copy' }}
          </button>
        </div>
        <input
          v-model.trim="hex"
          @input="onEdit('hex')"
          class="input font-mono"
          placeholder="0xFF or ff"
        />
        <p v-if="errors.hex" class="text-red-400 text-xs flex items-center gap-1">
          <span>⚠️</span>
          <span>{{ errors.hex }}</span>
        </p>
      </div>
    </div>

    <!-- Visual Binary Representation -->
    <div v-if="value !== null && !errors.bin" class="card space-y-3">
      <h3 class="text-sm font-medium text-gray-300">🔍 Binary Visualization</h3>
      <div class="mono-box overflow-x-auto">
        <div class="flex flex-wrap gap-2 font-mono text-xs">
          <div v-for="(byte, idx) in visualBytes" :key="idx" class="flex gap-1">
            <div v-for="(nibble, nidx) in byte" :key="nidx" class="flex gap-0.5">
              <span
                v-for="(bit, bidx) in nibble"
                :key="bidx"
                :class="[
                  'px-2 py-1 rounded',
                  bit === '1' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'
                ]"
              >
                {{ bit }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 text-xs text-gray-400">
        <span>📊 Bits: {{ binaryDigits }}</span>
        <span>📦 Bytes: {{ Math.ceil(binaryDigits / 8) }}</span>
        <span v-if="value < 0n">⚠️ Negative values shown in magnitude</span>
      </div>
    </div>

    <!-- Info -->
    <div class="card">
      <p class="text-sm text-gray-400">
        💡 <strong class="text-gray-300">Tips:</strong> Inputs accept underscores
        (<code class="font-mono text-indigo-400">1_000_000</code>) and optional prefixes
        (<code class="font-mono text-indigo-400">0b</code>,
        <code class="font-mono text-indigo-400">0o</code>,
        <code class="font-mono text-indigo-400">0x</code>).
        Conversion uses <code class="font-mono text-indigo-400">BigInt</code> for virtually unlimited size.
      </p>
    </div>

    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'

type Edited = 'bin' | 'oct' | 'dec' | 'hex'

/* ---------------- State ---------------- */
const binary = ref('')
const octal = ref('')
const decimal = ref('')
const hex = ref('')

const errors = reactive<{ bin?: string; oct?: string; dec?: string; hex?: string }>({})
const lastEdited = ref<Edited>('dec')
const value = ref<bigint | null>(null)

const opts = reactive({
  showPrefix: true,
  upperHex: true,
  groupSize: 4 as 0 | 2 | 3 | 4,
  padBits: 0 as 0 | 8 | 16 | 32 | 64
})
const bitOptions: Array<0 | 8 | 16 | 32 | 64> = [8, 16, 32, 64]

const copiedMsg = ref(false)
const lastCopied = ref<'bin' | 'oct' | 'dec' | 'hex' | ''>('')

/* ---------------- Computed Properties ---------------- */
const binaryDigits = computed(() => {
  if (value.value === null) return 0
  const abs = value.value < 0n ? -value.value : value.value
  return abs.toString(2).length
})

const visualBytes = computed<string[][][]>(() => {
  if (value.value === null) return []
  const abs = value.value < 0n ? -value.value : value.value
  let bin = abs.toString(2)

  // Pad to nearest nibble (4 bits)
  const remainder = bin.length % 4
  if (remainder !== 0) {
    bin = '0'.repeat(4 - remainder) + bin
  }

  const bytes: string[][][] = []
  // Process in groups of 8 bits (1 byte = 2 nibbles)
  for (let i = 0; i < bin.length; i += 8) {
    const byte = bin.slice(i, i + 8)
    const nibbles: string[][] = []

    // Split byte into two nibbles (4 bits each)
    for (let j = 0; j < byte.length; j += 4) {
      const nibble = byte.slice(j, j + 4)
      nibbles.push(nibble.split(''))
    }

    bytes.push(nibbles)
  }

  return bytes
})

/* ---------------- Parsing & Formatting ---------------- */
function normalize(str: string) {
  return str.replace(/_/g, '').trim()
}

function parseAsBigInt(input: string, edited: Edited): bigint {
  const raw = normalize(input)
  if (!raw) throw new Error('Empty input')

  // detect sign
  let sign = 1n
  let s = raw
  if (s.startsWith('+')) s = s.slice(1)
  if (s.startsWith('-')) { sign = -1n; s = s.slice(1) }
  if (!s) throw new Error('Missing digits')

  // Allow prefixes 0b/0o/0x, otherwise use edited base
  let base = edited === 'bin' ? 2 : edited === 'oct' ? 8 : edited === 'hex' ? 16 : 10
  const m = s.match(/^0([box])(.+)$/i)
  if (m) {
    const kind = m[1].toLowerCase()
    s = m[2]
    base = kind === 'b' ? 2 : kind === 'o' ? 8 : 16
  }

  // Validate per base
  const re = base === 2
      ? /^[01]+$/i
      : base === 8
          ? /^[0-7]+$/i
          : base === 10
              ? /^\d+$/i
              : /^[0-9a-f]+$/i
  if (!re.test(s)) throw new Error(`Invalid ${base}-base digits`)

  return sign * BigInt(`0x${base === 16 ? s : base === 10 ? BigInt(s).toString(16) : convertRadixToHex(s, base)}`)
}

/**
 * Convert string in arbitrary radix (2 or 8) to hex string using BigInt math.
 * (Avoids incremental BigInt pow for long strings via base multiply-accumulate)
 */
function convertRadixToHex(s: string, base: 2 | 8): string {
  let acc = 0n
  const b = BigInt(base)
  for (const ch of s) acc = acc * b + BigInt(parseInt(ch, base))
  return acc.toString(16)
}

/* format helpers */
function addPrefix(out: string, base: number, negative: boolean) {
  const pre = opts.showPrefix
      ? base === 2 ? '0b' : base === 8 ? '0o' : base === 16 ? '0x' : ''
      : ''
  return negative ? '-' + pre + out : pre + out
}

function groupDigits(s: string, size: number) {
  if (opts.groupSize === 0 || size <= 0) return s
  const re = new RegExp(`(.{1,${size}})(?=(?:.{${size}})+$)`, 'g')
  return s.replace(re, '$1 ').trim()
}

function padBinary(bin: string, bits: number) {
  if (!bits) return bin
  if (bin.length >= bits) return bin
  return bin.padStart(bits, '0')
}

function formatAll(n: bigint) {
  const neg = n < 0n
  const abs = neg ? -n : n

  // core strings
  let bin = abs.toString(2)
  let oct = abs.toString(8)
  let dec = abs.toString(10)
  let hx = abs.toString(16)
  if (opts.upperHex) hx = hx.toUpperCase()

  // padding (non-negative only)
  if (!neg && opts.padBits) {
    bin = padBinary(bin, opts.padBits)
    // derive oct/hex from padded binary to keep exact block grouping
    const padded = bin
    // oct: groups of 3
    const octLen = Math.ceil(padded.length / 3)
    oct = BigInt('0b' + padded).toString(8).padStart(octLen, '0')
    // hex: groups of 4
    const hexLen = Math.ceil(padded.length / 4)
    hx = BigInt('0b' + padded).toString(16).padStart(hexLen, '0')
    if (opts.upperHex) hx = hx.toUpperCase()
  }

  // grouping (per-base friendly defaults if custom size not set)
  const g2 = opts.groupSize || 4
  const g8 = opts.groupSize || 3
  const g16 = opts.groupSize || 4
  const g10 = opts.groupSize || 3

  bin = groupDigits(bin, g2)
  oct = groupDigits(oct, g8)
  dec = groupDigits(dec, g10)
  hx  = groupDigits(hx, g16)

  binary.value = addPrefix(bin, 2, neg)
  octal.value  = addPrefix(oct, 8, neg)
  decimal.value= (neg ? '-' : '') + dec
  hex.value    = addPrefix(hx, 16, neg)
}

/* ---------------- Events ---------------- */
function onEdit(which: Edited) {
  lastEdited.value = which
  errors.bin = errors.oct = errors.dec = errors.hex = undefined
  try {
    const v = parseAsBigInt(
        which === 'bin' ? binary.value :
            which === 'oct' ? octal.value :
                which === 'hex' ? hex.value : decimal.value,
        which
    )
    value.value = v
    formatAll(v)
  } catch (e: any) {
    const msg = e?.message ?? 'Invalid input'
    errors[which === 'bin' ? 'bin' : which === 'oct' ? 'oct' : which === 'hex' ? 'hex' : 'dec'] = msg
  }
}

/* external helpers for quick examples */
function setFromDecimal(str: string) {
  decimal.value = str
  onEdit('dec')
}

/* actions */
function clearAll() {
  value.value = null
  binary.value = octal.value = decimal.value = hex.value = ''
  errors.bin = errors.oct = errors.dec = errors.hex = undefined
}
function negate() {
  if (value.value === null) {
    // try to parse current edited first
    onEdit(lastEdited.value)
    if (value.value === null) return
  }
  value.value = -value.value
  formatAll(value.value)
}
function copy(text: string, field?: 'bin' | 'oct' | 'dec' | 'hex') {
  if (!text) return
  navigator.clipboard.writeText(text)
  if (field) lastCopied.value = field
  copiedMsg.value = true
  setTimeout(() => {
    copiedMsg.value = false
    lastCopied.value = ''
  }, 1500)
}

/* keep other fields in sync when options change and we have a value */
watch([() => opts.showPrefix, () => opts.upperHex, () => opts.groupSize, () => opts.padBits], () => {
  if (value.value !== null) formatAll(value.value)
})
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block mb-2;
}

.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}

.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-example {
  @apply px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white;
  @apply transition-all;
}

.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}

.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
</style>



