<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-4">
    <h2 class="text-xl text-white font-semibold">Dev Notepad</h2>

    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-3 text-sm rounded">
      ⚠️ Notes are stored in your browser. Clearing cache will erase them. Use "Download" to keep a copy.
    </div>

    <!-- Controls -->
    <div class="flex flex-wrap items-center gap-3">
      <span class="text-white text-sm">Font Size:</span>
      <button
          v-for="s in fontSizes"
          :key="s.value"
          @click="applyFontSize(s.value)"
          class="px-2 py-1 bg-gray-600 text-white rounded text-xs"
      >
        {{ s.label }}
      </button>

      <button @click="format('bold')" class="px-2 py-1 bg-gray-700 text-white rounded text-xs">Bold</button>
      <button @click="format('underline')" class="px-2 py-1 bg-gray-700 text-white rounded text-xs">Underline</button>
    </div>

    <!-- Editor -->
    <div
        ref="editor"
        class="w-full h-64 bg-gray-900 text-white p-4 rounded border border-gray-700 overflow-auto"
        contenteditable="true"
        @input="saveNotes"
    ></div>

    <!-- Actions -->
    <div class="flex flex-wrap gap-4">
      <button @click="copyToClipboard" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
        Copy to Clipboard
      </button>

      <button @click="downloadPlain" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow">
        Download as .txt
      </button>

      <button @click="downloadStyled" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow">
        Download as .html
      </button>

      <button @click="clearNotes" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow">
        Clear Notes
      </button>
    </div>

    <div v-if="message" class="text-green-400 text-sm mt-2">{{ message }}</div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'

const storageKey = 'codehelper-dev-notes-rich'
const editor = ref<HTMLDivElement | null>(null)
const message = ref('')

// Load notes
onMounted(() => {
  const saved = localStorage.getItem(storageKey)
  if (editor.value && saved) {
    editor.value.innerHTML = saved
  }
})

function saveNotes() {
  if (editor.value) {
    localStorage.setItem(storageKey, editor.value.innerHTML)
  }
}

function clearNotes() {
  if (confirm('Are you sure you want to clear all notes?')) {
    if (editor.value) {
      editor.value.innerHTML = ''
      localStorage.removeItem(storageKey)
      showMessage('🧹 Cleared!')
    }
  }
}

//  Download plain .txt
function downloadPlain() {
  if (!editor.value) return
  const text = editor.value.innerText
  const blob = new Blob([text], { type: 'text/plain' })
  downloadBlob(blob, 'my-notes.txt')
}

//  Download HTML with styles
function downloadStyled() {
  if (!editor.value) return
  const content = `
    <html>
    <head>
      <meta charset="UTF-8">
      <title>My Notes</title>
      <style>
        body { background: #1f2937; color: white; font-family: sans-serif; padding: 1rem; }
        b { font-weight: bold; }
        u { text-decoration: underline; }
      </style>
    </head>
    <body>${editor.value.innerHTML}</body>
    </html>`
  const blob = new Blob([content], { type: 'text/html' })
  downloadBlob(blob, 'my-notes.html')
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// Copy formatted content
async function copyToClipboard() {
  if (editor.value) {
    await navigator.clipboard.writeText(editor.value.innerText)
    showMessage('Copied to clipboard!')
  }
}

// Font sizes
const fontSizes = [
  { label: 'S', value: '1' },
  { label: 'M', value: '3' },
  { label: 'L', value: '5' }
]

function applyFontSize(size: string) {
  document.execCommand('fontSize', false, size)
}

function format(command: string) {
  document.execCommand(command, false)
}

// Show feedback message
function showMessage(text: string) {
  message.value = text
  setTimeout(() => (message.value = ''), 2000)
}

</script>

<style scoped>
[style*="font-size: x-small;"] { font-size: 0.75rem; }
[style*="font-size: medium;"] { font-size: 1rem; }
[style*="font-size: large;"] { font-size: 1.25rem; }
</style>


