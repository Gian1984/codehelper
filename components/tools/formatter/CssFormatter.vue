<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">CSS Minifier & Beautifier</h2>

    <!-- Mode Switch -->
    <div class="flex items-center gap-4">
      <label class="text-white text-sm">Mode:</label>
      <select v-model="mode" class="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1">
        <option value="minify">Minify</option>
        <option value="beautify">Beautify</option>
      </select>
    </div>

    <!-- Input Area -->
    <textarea
        v-model="input"
        placeholder="Paste your CSS here..."
        class="w-full h-48 bg-gray-900 text-white p-4 rounded border border-gray-700 resize-none font-mono"
    ></textarea>

    <!-- Action Button -->
    <button
        @click="processCss"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
    >
      {{ mode === 'minify' ? 'Minify' : 'Beautify' }}
    </button>

    <!-- Output Area -->
    <div v-if="output" class="space-y-2">
      <label class="text-white text-sm">Result:</label>
      <textarea
          readonly
          :value="output"
          class="w-full h-48 bg-gray-900 text-white p-4 rounded border border-gray-700 resize-none font-mono"
      ></textarea>
    </div>

    <!-- Download & Clear -->
    <div class="flex gap-4">
      <button
          @click="downloadOutput"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
          :disabled="!output"
      >
        Download style.css
      </button>

      <button
          @click="clearAll"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref<'minify' | 'beautify'>('minify')

function processCss() {
  if (mode.value === 'minify') {
    output.value = input.value
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
        .replace(/\s+/g, ' ') // collapse whitespace
        .replace(/\s*([{}:;,])\s*/g, '$1') // remove space around symbols
        .replace(/;}/g, '}') // remove trailing semicolons
        .trim()
  } else {
    output.value = beautifyCss(input.value)
  }
}

function beautifyCss(css: string): string {
  let formatted = ''
  const indent = '  '
  let level = 0

  css
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/}/g, '}\n')
      .replace(/{/g, '{\n')
      .replace(/;/g, ';\n')
      .split('\n')
      .forEach((line) => {
        line = line.trim()
        if (!line) return
        if (line.endsWith('}')) level--
        formatted += indent.repeat(level) + line + '\n'
        if (line.endsWith('{')) level++
      })

  return formatted.trim()
}

function downloadOutput() {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'text/css' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'style.css'
  link.click()
}

function clearAll() {
  input.value = ''
  output.value = ''
}
</script>
