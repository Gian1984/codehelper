<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-xl shadow space-y-6 text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Number Base Converter</h2>
      <span v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</span>
    </div>

    <!-- Options -->
    <div class="grid sm:grid-cols-3 gap-4">
      <label class="flex items-center gap-2 card p-3">
        <input type="checkbox" v-model="opts.showPrefix" />
        <span class="text-sm text-gray-300">Show prefixes (0b / 0o / 0x)</span>
      </label>
      <label class="flex items-center gap-2 card p-3">
        <input type="checkbox" v-model="opts.upperHex" />
        <span class="text-sm text-gray-300">Uppercase hex</span>
      </label>
      <div class="card p-3">
        <label class="label">Group digits</label>
        <select v-model.number="opts.groupSize" class="input">
          <option :value="0">None</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
        </select>
        <p class="note mt-1">Applied per-base (bin/hex usually 4, oct 3, dec 3).</p>
      </div>
      <div class="card p-3 sm:col-span-2">
        <label class="label">Pad to bit width</label>
        <div class="flex flex-wrap gap-2">
          <button
              v-for="b in bitOptions"
              :key="b"
              class="px-2 py-1 rounded text-sm"
              :class="opts.padBits === b ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'"
              @click="opts.padBits = (opts.padBits === b ? 0 : b)"
          >
            {{ b }}-bit
          </button>
          <button
              class="px-2 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600"
              @click="opts.padBits = 0"
          >
            No pad
          </button>
        </div>
        <p class="note mt-1">Padding applies to non-negative values.</p>
      </div>
      <div class="card p-3">
        <label class="label">Quick examples</label>
        <div class="flex flex-wrap gap-2">
          <button class="btn" @click="setFromDecimal('255')">255</button>
          <button class="btn" @click="setFromDecimal('1024')">1024</button>
          <button class="btn" @click="setFromDecimal('18446744073709551615')">2^64-1</button>
          <button class="btn" @click="setFromDecimal('-42')">-42</button>
        </div>
      </div>
    </div>

    <!-- Inputs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="card space-y-2">
        <div class="flex items-center justify-between">
          <label class="label">Binary</label>
          <button class="btn" @click="copy(binary)">Copy</button>
        </div>
        <input
            v-model.trim="binary"
            @input="onEdit('bin')"
            class="input mono"
            placeholder="0b1010 or 1010"
        />
        <p v-if="errors.bin" class="text-red-400 text-xs">{{ errors.bin }}</p>
      </div>

      <div class="card space-y-2">
        <div class="flex items-center justify-between">
          <label class="label">Octal</label>
          <button class="btn" @click="copy(octal)">Copy</button>
        </div>
        <input
            v-model.trim="octal"
            @input="onEdit('oct')"
            class="input mono"
            placeholder="0o755 or 755"
        />
        <p v-if="errors.oct" class="text-red-400 text-xs">{{ errors.oct }}</p>
      </div>

      <div class="card space-y-2">
        <div class="flex items-center justify-between">
          <label class="label">Decimal</label>
          <button class="btn" @click="copy(decimal)">Copy</button>
        </div>
        <input
            v-model.trim="decimal"
            @input="onEdit('dec')"
            class="input mono"
            placeholder="e.g. 123456 or -42"
        />
        <p v-if="errors.dec" class="text-red-400 text-xs">{{ errors.dec }}</p>
      </div>

      <div class="card space-y-2">
        <div class="flex items-center justify-between">
          <label class="label">Hexadecimal</label>
          <button class="btn" @click="copy(hex)">Copy</button>
        </div>
        <input
            v-model.trim="hex"
            @input="onEdit('hex')"
            class="input mono"
            placeholder="0xFF or ff"
        />
        <p v-if="errors.hex" class="text-red-400 text-xs">{{ errors.hex }}</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="pt-2 flex flex-wrap gap-2">
      <button @click="clearAll" class="btn">Clear All</button>
      <button @click="negate" class="btn">Toggle Sign (±)</button>
    </div>

    <!-- Info -->
    <div class="card">
      <p class="note">Tips: inputs accept underscores (<code class="mono">1_000_000</code>) and optional prefixes
        (<code class="mono">0b</code>, <code class="mono">0o</code>, <code class="mono">0x</code>). Conversion uses <code class="mono">BigInt</code> for virtually unlimited size.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

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

const copiedMsg = ref('')

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
function copy(text: string) {
  if (!text) return
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1200)
}

/* keep other fields in sync when options change and we have a value */
watch([() => opts.showPrefix, () => opts.upperHex, () => opts.groupSize, () => opts.padBits], () => {
  if (value.value !== null) formatAll(value.value)
})
</script>

<style scoped>
.label { @apply block text-sm text-gray-300 mb-1; }
.note  { @apply text-xs text-gray-400; }
.input { @apply bg-gray-950 text-white border border-gray-700 rounded px-3 py-2 w-full; }
.btn   { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm; }
.card  { @apply bg-gray-800/60 rounded-lg border border-gray-700; }
.mono  { @apply font-mono; }
</style>



