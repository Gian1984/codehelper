<template>
  <div class="space-y-4 bg-gray-800 p-8 rounded-lg shadow">
    <h2 class="text-2xl font-semibold text-white">Text Case Converter</h2>

    <label class="block">
      <span class="text-gray-300">Paste your text</span>
      <textarea v-model="inputText" rows="6" class="w-full px-2 py-1 rounded text-black"></textarea>
    </label>

    <div class="flex flex-wrap gap-2">
      <button @click="toUpperCase" class="bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-500 text-white">
        UPPERCASE
      </button>
      <button @click="toCapitalize" class="bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-500 text-white">
        Capitalize Case
      </button>
      <button @click="toSentenceCase" class="bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-500 text-white">
        Sentence case
      </button>
      <button @click="copyOutput" class="bg-green-600 px-3 py-2 rounded hover:bg-green-500 text-white">
        Copy
      </button>
      <button @click="clearAll" class="bg-red-600 px-3 py-2 rounded hover:bg-red-500 text-white">
        Clear All
      </button>
    </div>

    <div v-if="outputText" class="mt-4 bg-gray-700 text-white p-4 rounded whitespace-pre-wrap">
      {{ outputText }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputText = ref('')
const outputText = ref('')

const toUpperCase = () => {
  outputText.value = inputText.value.toUpperCase()
}

const toCapitalize = () => {
  outputText.value = inputText.value.replace(/\b\w/g, char => char.toUpperCase())
}

const toSentenceCase = () => {
  outputText.value = inputText.value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
}

const copyOutput = async () => {
  if (outputText.value) {
    await navigator.clipboard.writeText(outputText.value)
    alert('Copied to clipboard!')
  }
}

const clearAll = () => {
  inputText.value = ''
  outputText.value = ''
}
</script>

<style scoped>
textarea {
  @apply bg-white;
}
</style>
