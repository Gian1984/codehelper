<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-4">
    <h2 class="text-xl text-white font-semibold">Dev Notepad</h2>

    <!-- Warning -->
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
    <div class="flex gap-4">
      <button
          @click="downloadNotes"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
      >
        Download as .txt
      </button>

      <button
          @click="clearNotes"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
      >
        Clear Notes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const storageKey = 'codehelper-dev-notes-rich'
const editor = ref<HTMLDivElement | null>(null)

// Load saved HTML
onMounted(() => {
  const saved = localStorage.getItem(storageKey)
  if (editor.value && saved) {
    editor.value.innerHTML = saved
  }
})

// Save current HTML to localStorage
function saveNotes() {
  if (editor.value) {
    localStorage.setItem(storageKey, editor.value.innerHTML)
  }
}

// Clear content
function clearNotes() {
  if (confirm('Are you sure you want to clear all notes?')) {
    if (editor.value) {
      editor.value.innerHTML = ''
      localStorage.removeItem(storageKey)
    }
  }
}

// Download as plain .txt
function downloadNotes() {
  if (!editor.value) return
  const text = editor.value.innerText
  const blob = new Blob([text], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'my-notes.txt'
  link.click()
}

// Font sizes
const fontSizes = [
  { label: 'S', value: '1' },
  { label: 'M', value: '3' },
  { label: 'L', value: '5' }
]

function applyFontSize(size: string) {
  document.execCommand('fontSize', false, size)
  // Optional: post-process to add classes instead of <font size="">
}

// Format (bold, underline, list)
function format(command: string) {
  document.execCommand(command, false)
}
</script>

<style scoped>
/* Optional styling for font sizes if you want custom looks */
[style*="font-size: x-small;"] { font-size: 0.75rem; }
[style*="font-size: medium;"] { font-size: 1rem; }
[style*="font-size: large;"] { font-size: 1.25rem; }
</style>


