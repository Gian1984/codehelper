<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-10">
    <h1 class="text-3xl font-bold text-white">🧠 10 JavaScript Snippets Every Developer Should Keep in Their Clipboard Manager</h1>
    <p class="text-gray-300">
      If you're like most developers, you reuse the same snippets over and over. This list contains 10 practical, high-value code blocks
      every JavaScript developer should have at their fingertips.
    </p>

    <div v-for="(snippet, i) in snippets" :key="i" class="space-y-4">
      <h2 class="text-xl font-semibold text-white">{{ i + 1 }}. {{ snippet.title }}</h2>
      <p class="text-gray-300 text-base leading-relaxed">{{ snippet.description }}</p>
      <div class="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
        <pre class="text-sm font-mono text-green-400 whitespace-pre">{{ snippet.code }}</pre>
      </div>
    </div>

    <div class="mt-12 text-gray-300">
      <h2 class="text-xl font-semibold text-white">📌 Final Tip</h2>
      <p class="mt-2">
        Use a clipboard manager like <a class="text-indigo-400 underline" href="https://espanso.org" target="_blank">Espanso</a>,
        <a class="text-indigo-400 underline" href="https://clipy-app.com" target="_blank">Clipy</a>, or
        <a class="text-indigo-400 underline" href="https://raycast.com" target="_blank">Raycast</a> to store and organize your snippets.
        It’ll save you hours every week.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const snippets = [
  {
    title: 'Debounce Function',
    description: 'Limits how often a function is executed. Useful for input, scroll or resize events.',
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
    description: 'Safely clones nested objects and arrays using JSON (works for most cases).',
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
    description: 'Simple utility to validate if an object has no keys.',
    code: `function isEmpty(obj) {
  return Object.keys(obj).length === 0
}`
  },
  {
    title: 'Generate Random ID',
    description: 'Handy for generating unique IDs (not UUIDs, but good enough for UI use).',
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
    description: 'Quick string formatter for capitalizing the first character.',
    code: `function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}`
  },
  {
    title: 'Clamp a Number Between Two Values',
    description: 'Make sure a number stays within bounds.',
    code: `function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}`
  }
]
</script>
