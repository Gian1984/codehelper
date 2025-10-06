<template>
  <article
      class="mx-auto w-full max-w-[72ch] px-5 sm:px-6 py-6 sm:py-10 bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-white/5"
  >
    <!-- intro -->
    <section class="mt-6 sm:mt-8 space-y-5">
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        As developers, we often rewrite the same utilities. Here’s a curated list of
        <strong class="text-white">10 high-value JavaScript snippets</strong> you can paste into your next project:
        debouncing, throttling, string formatting, and array manipulation.
      </p>
    </section>

    <!-- snippets -->
    <section class="mt-7 sm:mt-9 space-y-7">
      <div
          v-for="(snippet, i) in snippets"
          :key="i"
          class="space-y-3"
      >
        <h2 class="text-base sm:text-lg font-semibold text-white">
          {{ i + 1 }}. {{ snippet.title }}
        </h2>

        <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
          {{ snippet.description }}
        </p>

        <div class="bg-gray-900/80 border border-gray-700/70 rounded-xl p-4 overflow-x-auto">
          <pre class="text-sm leading-6 font-mono text-green-400 whitespace-pre">
<code>{{ snippet.code }}</code>
          </pre>
        </div>
      </div>
    </section>

    <!-- final tip -->
    <section class="mt-10 sm:mt-12 space-y-3">
      <h2 class="text-base sm:text-lg font-semibold text-white">📌 Final Tip</h2>
      <p class="text-[15.5px] sm:text-base leading-7 text-gray-200">
        Supercharge your workflow with a clipboard manager like
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            href="https://espanso.org" target="_blank" rel="noopener noreferrer"
            aria-label="Espanso clipboard manager (opens in a new tab)"
        >Espanso</a>,
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            href="https://clipy-app.com" target="_blank" rel="noopener noreferrer"
            aria-label="Clipy clipboard manager (opens in a new tab)"
        >Clipy</a>, or
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            href="https://raycast.com" target="_blank" rel="noopener noreferrer"
            aria-label="Raycast clipboard manager (opens in a new tab)"
        >Raycast</a>.
        Keeping snippets ready-to-go will save you <strong class="text-white">hours every week</strong>.
      </p>
    </section>
  </article>
</template>

<script setup lang="ts">

const snippets = [
  {
    title: 'Debounce Function',
    description: 'Limits how often a function is executed. Useful for input, scroll, or resize events.',
    code: `function debounce(fn, delay) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}`
  },
  {
    title: 'Throttle Function',
    description: 'Ensures a function is only called once every X milliseconds.',
    code: `function throttle(fn, limit) {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => { inThrottle = false }, limit)
    }
  }
}`
  },
  {
    title: 'Deep Clone',
    description: 'Safely clones nested objects and arrays using JSON (works for most use cases).',
    code: `function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}`
  },
  {
    title: 'Copy to Clipboard',
    description: 'Copy any text string directly to the clipboard.',
    code: `async function copyToClipboard(text) {
  try { await navigator.clipboard.writeText(text) } catch {}
}`
  },
  {
    title: 'Check if Object is Empty',
    description: 'Utility to validate if an object has no keys.',
    code: `function isEmpty(obj) {
  return Object.keys(obj).length === 0
}`
  },
  {
    title: 'Generate Random ID',
    description: 'Generate unique IDs (not UUIDs, but useful for UI components).',
    code: `function randomID(length = 8) {
  return Math.random().toString(36).slice(2, 2 + length)
}`
  },
  {
    title: 'Sleep / Delay in Async Functions',
    description: 'Pause execution inside an async function.',
    code: `function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}`
  },
  {
    title: 'Group Array by Property',
    description: 'Group an array of objects by a shared key.',
    code: `function groupBy(arr, key) {
  return arr.reduce((acc, obj) => {
    const val = obj[key]
    ;(acc[val] ||= []).push(obj)
    return acc
  }, {})
}`
  },
  {
    title: 'Capitalize First Letter',
    description: 'Format strings by capitalizing the first character.',
    code: `function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}`
  },
  {
    title: 'Clamp a Number Between Two Values',
    description: 'Ensure a number stays within bounds.',
    code: `function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}`
  }
]
</script>

<style scoped>
:where(p, li){ word-break: break-word; hyphens: auto; }
</style>

