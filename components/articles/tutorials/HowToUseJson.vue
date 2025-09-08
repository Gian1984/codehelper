<template>
  <div class="p-8 bg-gray-800 rounded-lg shadow-xl space-y-8">
    <h2 class="text-3xl font-bold text-white">📘 How to Use JSON</h2>

    <p class="text-gray-300 text-base leading-relaxed">
      JSON (JavaScript Object Notation) is a lightweight data format that is easy for both humans and machines to understand.
      It has become the <strong class="text-white">standard for exchanging data</strong> between frontend and backend applications.
    </p>

    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <p class="text-sm text-gray-400 mb-2">Example JSON:</p>
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap">{
  "name": "Gianluca",
  "age": 30,
  "skills": ["JavaScript", "Vue", "Nuxt"]
}</pre>
    </div>

    <h2 class="text-xl font-semibold text-white">🔍 Why JSON is Useful</h2>
    <ul class="list-disc list-inside text-gray-300 space-y-1">
      <li>Works across all programming languages</li>
      <li>Readable and writable by both developers and tools</li>
      <li>Perfect for APIs, config files, and local storage</li>
    </ul>

    <h2 class="text-xl font-semibold text-white">🛠 Recommended Tools</h2>
    <ul class="grid md:grid-cols-2 gap-4 text-gray-300">
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">1. <a class="text-indigo-400 hover:underline" href="https://jsonlint.com" target="_blank">JSONLint</a></p>
        <p class="text-sm mt-1">A powerful online validator to check if your JSON is correct.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">2. <a class="text-indigo-400 hover:underline" href="https://codebeautify.org/jsonviewer" target="_blank">Code Beautify JSON Viewer</a></p>
        <p class="text-sm mt-1">Visualize, edit and format JSON in a structured way.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">3. <a class="text-indigo-400 hover:underline" href="https://www.postman.com/" target="_blank">Postman</a></p>
        <p class="text-sm mt-1">Send and test JSON APIs with ease, great for developers.</p>
      </li>
      <li class="bg-gray-700 p-4 rounded shadow">
        <p class="font-semibold text-white">4. <a class="text-indigo-400 hover:underline" href="https://jqplay.org/" target="_blank">JQ Playground</a></p>
        <p class="text-sm mt-1">Filter and manipulate JSON using the jq command-line language.</p>
      </li>
    </ul>

    <h2 class="text-xl font-semibold text-white">📤 Sending JSON via JavaScript</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap">fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Gianluca', age: 30 })
})</pre>
    </div>

    <h2 class="text-xl font-semibold text-white">📥 Reading JSON in JavaScript</h2>
    <div class="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <pre class="text-sm font-mono text-green-400 whitespace-pre-wrap">const json = '{"name":"Gianluca","age":30}';
const obj = JSON.parse(json);
console.log(obj.name); // "Gianluca"</pre>
    </div>

    <h2 class="text-xl font-semibold text-white">✅ Conclusion</h2>
    <p class="text-gray-300">
      Mastering JSON is fundamental in modern web development. Whether you're working on frontend or backend,
      knowing how to structure and handle JSON can dramatically improve your efficiency and data quality.
    </p>
  </div>
</template>

<script setup lang="ts">
// Purely presentational
</script>

<style scoped>
/* No custom styles needed — Tailwind all the way */
</style>

