<template>
  <div class="bg-gray-800 p-8 rounded-lg shadow space-y-4">
    <h2 class="text-2xl font-semibold text-white">Number Base Converter</h2>

    <input
        v-model="decimal"
        @input="convertFromDecimal"
        type="number"
        placeholder="Enter decimal number"
        class="w-full p-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-300 text-sm mb-1">Binary</label>
        <input v-model="binary" @input="convertToDecimal('binary')" class="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 font-mono" />
      </div>
      <div>
        <label class="block text-gray-300 text-sm mb-1">Octal</label>
        <input v-model="octal" @input="convertToDecimal('octal')" class="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 font-mono" />
      </div>
      <div>
        <label class="block text-gray-300 text-sm mb-1">Decimal</label>
        <input v-model="decimal" @input="convertFromDecimal" class="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 font-mono" />
      </div>
      <div>
        <label class="block text-gray-300 text-sm mb-1">Hexadecimal</label>
        <input v-model="hex" @input="convertToDecimal('hex')" class="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 font-mono" />
      </div>
    </div>

    <div class="pt-4">
      <button
          @click="clearAll"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-medium transition"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const decimal = ref('')
const binary = ref('')
const octal = ref('')
const hex = ref('')

function convertFromDecimal() {
  const num = parseInt(decimal.value, 10)
  if (!isNaN(num)) {
    binary.value = num.toString(2)
    octal.value = num.toString(8)
    hex.value = num.toString(16).toUpperCase()
  } else {
    binary.value = octal.value = hex.value = ''
  }
}

function convertToDecimal(base: 'binary' | 'octal' | 'hex') {
  let num = 0
  try {
    if (base === 'binary') num = parseInt(binary.value, 2)
    if (base === 'octal') num = parseInt(octal.value, 8)
    if (base === 'hex') num = parseInt(hex.value, 16)
    if (!isNaN(num)) {
      decimal.value = num.toString(10)
      convertFromDecimal()
    }
  } catch (e) {
    // Silent fail
  }
}

function clearAll() {
  decimal.value = ''
  binary.value = ''
  octal.value = ''
  hex.value = ''
}
</script>



