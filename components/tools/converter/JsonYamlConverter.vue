<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-xl shadow space-y-6 text-white">
    <div class="flex items-center justify-between flex-wrap gap-3">
      <h2 class="text-2xl font-semibold">JSON ↔ YAML Converter</h2>
      <span v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</span>
    </div>

    <!-- Input -->
    <div class="relative">
      <textarea
          v-model="input"
          placeholder="Paste JSON or YAML here..."
          class="w-full h-48 p-4 rounded-lg bg-gray-950 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 font-mono resize-y"
      ></textarea>
      <div class="absolute right-2 bottom-2 text-xs text-gray-400">
        {{ input.split(/\n/).length }} lines · {{ input.length }} chars
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex flex-wrap gap-3">
      <button @click="autoConvert" class="btn-primary">Auto Convert</button>
      <button @click="convertToJson" class="btn-indigo">To JSON</button>
      <button @click="convertToYaml" class="btn-yellow">To YAML</button>
      <button @click="clearAll" class="btn-gray">Clear</button>
      <button v-if="input" @click="copy(input)" class="btn">Copy Input</button>
      <button v-if="output" @click="copy(output)" class="btn-green">Copy Output</button>
    </div>

    <!-- Options -->
    <div class="flex flex-wrap items-center gap-3 text-sm">
      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="prettyJson" />
        Prettify JSON
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="sortKeys" />
        Sort JSON keys
      </label>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-400 border border-red-500/40 bg-red-950/40 p-2 rounded">
      {{ error }}
    </p>

    <!-- Output -->
    <div
        v-if="output"
        class="bg-gray-950 p-4 rounded-lg overflow-auto border border-gray-700 max-h-[400px]"
    >
      <pre class="whitespace-pre-wrap text-green-300 font-mono text-sm">{{ output }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import yaml from 'js-yaml'

const input = ref('')
const output = ref('')
const error = ref('')
const copiedMsg = ref('')
const prettyJson = ref(true)
const sortKeys = ref(false)

function autoConvert() {
  error.value = ''
  output.value = ''
  if (!input.value.trim()) return
  try {
    // Try JSON first
    const parsed = JSON.parse(input.value)
    output.value = yaml.dump(sortKeys.value ? sortObject(parsed) : parsed)
  } catch {
    try {
      const parsed = yaml.load(input.value)
      output.value = JSON.stringify(
          sortKeys.value ? sortObject(parsed) : parsed,
          null,
          prettyJson.value ? 2 : 0
      )
    } catch (e: any) {
      error.value = 'Auto detect failed: ' + e.message
    }
  }
}

function convertToJson() {
  error.value = ''
  try {
    const parsed = yaml.load(input.value)
    output.value = JSON.stringify(
        sortKeys.value ? sortObject(parsed) : parsed,
        null,
        prettyJson.value ? 2 : 0
    )
  } catch (e: any) {
    output.value = ''
    error.value = 'YAML to JSON failed: ' + e.message
  }
}

function convertToYaml() {
  error.value = ''
  try {
    const parsed = JSON.parse(input.value)
    output.value = yaml.dump(sortKeys.value ? sortObject(parsed) : parsed)
  } catch (e: any) {
    output.value = ''
    error.value = 'JSON to YAML failed: ' + e.message
  }
}

function clearAll() {
  input.value = ''
  output.value = ''
  error.value = ''
}

function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1500)
}

function sortObject(obj: any): any {
  if (Array.isArray(obj)) return obj.map(sortObject)
  if (obj && typeof obj === 'object') {
    return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
          acc[key] = sortObject(obj[key])
          return acc
        }, {} as Record<string, any>)
  }
  return obj
}
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded text-white text-sm bg-gray-700 hover:bg-gray-600 transition;
}
.btn-primary {
  @apply px-4 py-2 rounded text-white text-sm bg-indigo-600 hover:bg-indigo-500 transition;
}
.btn-indigo {
  @apply px-4 py-2 rounded text-white text-sm bg-blue-600 hover:bg-blue-500 transition;
}
.btn-yellow {
  @apply px-4 py-2 rounded text-white text-sm bg-yellow-600 hover:bg-yellow-500 transition;
}
.btn-gray {
  @apply px-4 py-2 rounded text-white text-sm bg-gray-600 hover:bg-gray-500 transition;
}
.btn-green {
  @apply px-4 py-2 rounded text-white text-sm bg-green-600 hover:bg-green-500 transition;
}
.mono {
  @apply font-mono;
}
</style>
