<template>
  <div class="bg-gray-800 p-8 rounded-lg shadow space-y-4">
    <h2 class="text-2xl font-semibold text-white">Byte Size Converter</h2>

    <input
        v-model="bytes"
        @input="convertFromBytes"
        type="number"
        placeholder="Enter size in bytes"
        class="w-full p-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-300 text-sm mb-1">Kilobytes (KB)</label>
        <input v-model="kb" @input="convertToBytes('kb')" class="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 font-mono" />
      </div>
      <div>
        <label class="block text-gray-300 text-sm mb-1">Megabytes (MB)</label>
        <input v-model="mb" @input="convertToBytes('mb')" class="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 font-mono" />
      </div>
      <div>
        <label class="block text-gray-300 text-sm mb-1">Gigabytes (GB)</label>
        <input v-model="gb" @input="convertToBytes('gb')" class="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 font-mono" />
      </div>
      <div>
        <label class="block text-gray-300 text-sm mb-1">Terabytes (TB)</label>
        <input v-model="tb" @input="convertToBytes('tb')" class="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 font-mono" />
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

const bytes = ref('')
const kb = ref('')
const mb = ref('')
const gb = ref('')
const tb = ref('')

function convertFromBytes() {
  const num = parseFloat(bytes.value)
  if (!isNaN(num)) {
    kb.value = (num / 1024).toFixed(2)
    mb.value = (num / Math.pow(1024, 2)).toFixed(2)
    gb.value = (num / Math.pow(1024, 3)).toFixed(2)
    tb.value = (num / Math.pow(1024, 4)).toFixed(4)
  } else {
    kb.value = mb.value = gb.value = tb.value = ''
  }
}

function convertToBytes(unit: 'kb' | 'mb' | 'gb' | 'tb') {
  let num = 0
  try {
    if (unit === 'kb') num = parseFloat(kb.value) * 1024
    if (unit === 'mb') num = parseFloat(mb.value) * Math.pow(1024, 2)
    if (unit === 'gb') num = parseFloat(gb.value) * Math.pow(1024, 3)
    if (unit === 'tb') num = parseFloat(tb.value) * Math.pow(1024, 4)

    if (!isNaN(num)) {
      bytes.value = Math.round(num).toString()
      convertFromBytes()
    }
  } catch (e) {
    // Silent fail
  }
}

function clearAll() {
  bytes.value = ''
  kb.value = ''
  mb.value = ''
  gb.value = ''
  tb.value = ''
}
</script>

