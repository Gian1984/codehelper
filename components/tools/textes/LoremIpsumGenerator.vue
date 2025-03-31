<template>
  <div class="space-y-4 bg-gray-800 p-8 rounded-lg shadow">
    <h2 class="text-2xl font-semibold text-white">Lorem Ipsum Generator</h2>

    <label class="block">
      <span class="text-gray-300">Type</span>
      <select v-model="mode" class="w-full px-2 py-1 rounded text-black">
        <option value="characters">Characters</option>
        <option value="words">Words</option>
        <option value="paragraphs">Paragraphs</option>
      </select>
    </label>

    <label class="block">
      <span class="text-gray-300">Amount</span>
      <input v-model.number="amount" type="number" min="1" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <button @click="generateLorem" class="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 text-white">
      Generate Text
    </button>

    <div v-if="lorem" class="bg-gray-700 p-4 rounded text-white whitespace-pre-wrap">
      <p>{{ lorem }}</p>
      <div class="text-right text-sm text-gray-300 mt-2">Length: {{ info }}</div>
      <button @click="copyToClipboard" class="mt-2 bg-green-600 px-3 py-1 rounded hover:bg-green-500 text-white">
        Copy to Clipboard
      </button>
      <button @click="downloadTxt" class="mt-2 ml-2 bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 text-white">
        Download .txt
      </button>
      <button @click="clearAll" class="mt-2 ml-2 bg-red-600 px-3 py-1 rounded hover:bg-red-500 text-white">
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const amount = ref(200)
const mode = ref('characters')
const lorem = ref('')

const baseText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`

const generateLorem = () => {
  const source = Array(100).fill(baseText).join(' ')

  if (mode.value === 'characters') {
    lorem.value = source.slice(0, amount.value).trim()
  } else if (mode.value === 'words') {
    lorem.value = source.split(' ').slice(0, amount.value).join(' ')
  } else if (mode.value === 'paragraphs') {
    lorem.value = Array(amount.value).fill(baseText).join('\n\n')
  }
}

const info = computed(() => {
  if (!lorem.value) return ''
  if (mode.value === 'characters') return `${lorem.value.length} characters`
  if (mode.value === 'words') return `${lorem.value.split(/\s+/).length} words`
  if (mode.value === 'paragraphs') return `${lorem.value.split(/\n\n/).length} paragraphs`
})

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(lorem.value)
  alert('Copied to clipboard!')
}

const downloadTxt = () => {
  const blob = new Blob([lorem.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'lorem-ipsum.txt'
  a.click()
  URL.revokeObjectURL(url)
}

const clearAll = async () => {
  lorem.value = ''
  await navigator.clipboard.writeText('')
  alert('Cleared text and clipboard!')
}
</script>

<style scoped>
select, input {
  @apply bg-white;
}
</style>
