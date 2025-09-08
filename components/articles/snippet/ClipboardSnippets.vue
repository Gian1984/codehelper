<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-10">
    <h1 class="text-3xl font-bold text-white">
      🧠 10 JavaScript Snippets Every Developer Should Keep in Their Clipboard Manager
    </h1>

    <p class="text-gray-300">
      As developers, we often rewrite the same utilities over and over. To boost productivity, here’s a curated list of
      <strong class="text-white">10 high-value JavaScript snippets</strong> you can copy and paste directly into your next project.
      These cover everyday needs like debouncing, throttling, string formatting, and array manipulation.
    </p>

    <div
        v-for="(snippet, i) in snippets"
        :key="i"
        class="space-y-4"
    >
      <h2 class="text-xl font-semibold text-white">
        {{ i + 1 }}. {{ snippet.title }}
      </h2>
      <p class="text-gray-300 text-base leading-relaxed">
        {{ snippet.description }}
      </p>
      <div class="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm font-mono text-green-400 whitespace-pre">
<code>{{ snippet.code }}</code>
        </pre>
      </div>
    </div>

    <div class="mt-12 text-gray-300">
      <h2 class="text-xl font-semibold text-white">📌 Final Tip</h2>
      <p class="mt-2">
        Supercharge your workflow with a clipboard manager like
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400"
            href="https://espanso.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Espanso clipboard manager (opens in a new tab)"
        >Espanso</a>,
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400"
            href="https://clipy-app.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Clipy clipboard manager (opens in a new tab)"
        >Clipy</a>, or
        <a
            class="underline underline-offset-2 decoration-indigo-400 hover:decoration-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400"
            href="https://raycast.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Raycast clipboard manager (opens in a new tab)"
        >Raycast</a>.
        Keeping snippets ready-to-go will save you <strong class="text-white">hours every week</strong>.
      </p>
    </div>
  </div>
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
      setTimeout(() => inThrottle = false, limit)
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
    code: `function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
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
  return Math.random().toString(36).substring(2, 2 + length)
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
    acc[val] = acc[val] || []
    acc[val].push(obj)
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
/* Tailwind only, improved hover/focus for links */
</style>

