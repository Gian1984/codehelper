<template>
  <div class="p-6 bg-gray-800 rounded-lg shadow space-y-6">
    <h2 class="text-2xl text-white font-semibold">README.md Generator</h2>

    <!-- Project Title & Description -->
    <div>
      <label class="block text-gray-300 mb-1">Project Title</label>
      <input v-model="title" type="text" placeholder="My Project" class="w-full p-2 rounded bg-gray-900 text-white border border-gray-600" />
    </div>
    <div>
      <label class="block text-gray-300 mb-1">Description</label>
      <textarea v-model="description" rows="3" placeholder="A short description..." class="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"></textarea>
    </div>

    <!-- Section Checkboxes -->
    <div class="grid grid-cols-2 gap-4">
      <label class="text-gray-300">
        <input type="checkbox" v-model="sections.installation" class="mr-2" />
        Include Installation
      </label>
      <label class="text-gray-300">
        <input type="checkbox" v-model="sections.usage" class="mr-2" />
        Include Usage
      </label>
      <label class="text-gray-300">
        <input type="checkbox" v-model="sections.license" class="mr-2" />
        Include License
      </label>
      <label class="text-gray-300">
        <input type="checkbox" v-model="sections.contributing" class="mr-2" />
        Include Contributing
      </label>
    </div>

    <!-- Dynamic Fields -->
    <div v-if="sections.installation">
      <label class="block text-gray-300 mb-1">Installation Command</label>
      <input v-model="installation" placeholder="npm install my-project" class="w-full p-2 rounded bg-gray-900 text-white border border-gray-600" />
    </div>
    <div v-if="sections.usage">
      <label class="block text-gray-300 mb-1">Usage Example</label>
      <textarea v-model="usage" rows="2" placeholder="npm run dev" class="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"></textarea>
    </div>
    <div v-if="sections.license">
      <label class="block text-gray-300 mb-1">License</label>
      <input v-model="license" placeholder="MIT" class="w-full p-2 rounded bg-gray-900 text-white border border-gray-600" />
    </div>
    <div v-if="sections.contributing">
      <label class="block text-gray-300 mb-1">Contributing Guide</label>
      <textarea v-model="contributing" rows="2" placeholder="Pull requests welcome!" class="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"></textarea>
    </div>

    <!-- Markdown Output -->
    <div>
      <label class="block text-gray-300 mb-2">Generated README.md</label>
      <pre class="bg-gray-900 text-green-300 p-4 rounded overflow-auto whitespace-pre-wrap text-sm">{{ markdown }}</pre>
    </div>

    <!-- Buttons -->
    <div class="flex gap-4 flex-wrap">
      <button @click="copyToClipboard" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">Copy</button>
      <button @click="downloadReadme" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Download README.md</button>
      <span v-if="copied" class="text-sm text-green-400 self-center">Copied!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const title = ref('')
const description = ref('')
const installation = ref('')
const usage = ref('')
const license = ref('')
const contributing = ref('')
const copied = ref(false)

const sections = ref({
  installation: true,
  usage: true,
  license: true,
  contributing: false
})

const markdown = computed(() => {
  let md = `# ${title.value || 'Project Title'}\n\n${description.value || 'Project description.'}\n`

  if (sections.value.installation) {
    md += `\n## Installation\n\`\`\`bash\n${installation.value || 'npm install'}\n\`\`\`\n`
  }

  if (sections.value.usage) {
    md += `\n## Usage\n\`\`\`bash\n${usage.value || 'npm start'}\n\`\`\`\n`
  }

  if (sections.value.contributing) {
    md += `\n## Contributing\n${contributing.value || 'Contributions are welcome!'}\n`
  }

  if (sections.value.license) {
    md += `\n## License\n${license.value || 'MIT'}\n`
  }

  return md.trim()
})

function copyToClipboard() {
  navigator.clipboard.writeText(markdown.value).then(() => {
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  })
}

function downloadReadme() {
  const blob = new Blob([markdown.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'README.md'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
