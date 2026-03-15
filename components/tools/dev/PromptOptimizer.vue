<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">✨ Prompt Optimizer</h2>
        <p class="text-sm text-gray-400 mt-1">Structure and optimize AI prompts with role, context, constraints, and output format</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="buildPrompt" title="Build prompt">
          ⚡ Build Prompt
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Template Selection -->
    <div class="card">
      <label class="label mb-3">🔖 Templates</label>
      <div class="flex flex-wrap gap-2">
        <button v-for="t in templates" :key="t.name" class="btn text-xs" @click="loadTemplate(t)">
          {{ t.icon }} {{ t.name }}
        </button>
      </div>
    </div>

    <!-- Prompt Builder -->
    <div class="card space-y-4">
      <label class="label font-semibold">📝 Prompt Builder</label>

      <div class="space-y-2">
        <label class="label">🎭 Role <span class="text-gray-500 text-xs">(who should the AI be?)</span></label>
        <input v-model="role" class="input" placeholder="e.g. You are a senior software engineer specializing in TypeScript" />
      </div>

      <div class="space-y-2">
        <label class="label">🎯 Task <span class="text-gray-500 text-xs">(what should it do?)</span></label>
        <textarea v-model="task" class="input resize-y min-h-[100px]" placeholder="e.g. Review this pull request and suggest improvements for performance and readability"></textarea>
      </div>

      <div class="space-y-2">
        <label class="label">📋 Context <span class="text-gray-500 text-xs">(background info, optional)</span></label>
        <textarea v-model="context" class="input resize-y min-h-[80px]" placeholder="e.g. This is a Node.js REST API using Express and PostgreSQL. The team follows conventional commits."></textarea>
      </div>

      <div class="space-y-2">
        <label class="label">⚠️ Constraints <span class="text-gray-500 text-xs">(rules and limits)</span></label>
        <div class="space-y-2">
          <div v-for="(c, i) in constraints" :key="i" class="flex items-center gap-2">
            <input v-model="constraints[i]" class="input text-sm" placeholder="e.g. Keep response under 500 words" />
            <button class="text-red-400 text-xs hover:text-red-300" @click="constraints.splice(i, 1)">✕</button>
          </div>
          <button class="btn text-xs" @click="constraints.push('')">+ Add Constraint</button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="label">📤 Output Format <span class="text-gray-500 text-xs">(how to structure the answer)</span></label>
        <select v-model="outputFormat" class="input">
          <option value="">None (free form)</option>
          <option value="markdown">Markdown with headers</option>
          <option value="json">JSON object</option>
          <option value="bullets">Bullet point list</option>
          <option value="numbered">Numbered list</option>
          <option value="table">Markdown table</option>
          <option value="code">Code block only</option>
          <option value="custom">Custom format</option>
        </select>
        <textarea v-if="outputFormat === 'custom'" v-model="customFormat" class="input resize-y min-h-[60px] mt-2"
            placeholder="Describe your desired output format..."></textarea>
      </div>

      <div class="space-y-2">
        <label class="label">💡 Examples <span class="text-gray-500 text-xs">(few-shot, optional)</span></label>
        <div class="space-y-2">
          <div v-for="(ex, i) in examples" :key="i" class="bg-gray-800 rounded-lg p-3 border border-gray-700 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-400">Example {{ i + 1 }}</span>
              <button class="text-red-400 text-xs hover:text-red-300" @click="examples.splice(i, 1)">✕</button>
            </div>
            <input v-model="ex.input" class="input text-sm" placeholder="Input example" />
            <input v-model="ex.output" class="input text-sm" placeholder="Expected output" />
          </div>
          <button class="btn text-xs" @click="examples.push({ input: '', output: '' })">+ Add Example</button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="label">🌡️ Tone</label>
        <div class="flex flex-wrap gap-2">
          <button v-for="t in tones" :key="t"
              :class="['btn text-xs', tone === t && 'bg-indigo-600']"
              @click="tone = t">{{ t }}</button>
        </div>
      </div>
    </div>

    <!-- Output -->
    <div v-if="output" class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 Optimized Prompt</label>
        <div class="flex gap-2 items-center">
          <span class="text-xs text-gray-500">~{{ estimatedTokens }} tokens</span>
          <button class="btn" @click="copyPrompt">📋 Copy</button>
        </div>
      </div>
      <span v-if="copied" class="text-green-400 text-xs font-medium">✅ Copied!</span>
      <pre class="mono-box max-h-[500px] whitespace-pre-wrap">{{ output }}</pre>
    </div>

    <div v-if="!output" class="card text-center py-16 text-gray-500">
      <div class="text-4xl mb-4">✨</div>
      <p>Fill in the sections above and click "Build Prompt"</p>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const role = ref('')
const task = ref('')
const context = ref('')
const constraints = ref<string[]>([''])
const outputFormat = ref('')
const customFormat = ref('')
const examples = ref<{ input: string; output: string }[]>([])
const tone = ref('')
const output = ref('')
const copied = ref(false)

const tones = ['Professional', 'Casual', 'Academic', 'Concise', 'Detailed', 'Friendly', 'Technical']

interface Template {
  name: string
  icon: string
  role: string
  task: string
  context: string
  constraints: string[]
  outputFormat: string
  tone: string
}

const templates: Template[] = [
  {
    name: 'Code Review',
    icon: '🔍',
    role: 'You are a senior software engineer with 10+ years of experience in code review',
    task: 'Review the following code and provide actionable feedback on code quality, performance, security, and readability',
    context: '',
    constraints: ['Focus on the most impactful issues first', 'Suggest specific code improvements, not just descriptions', 'Rate severity: critical, warning, suggestion'],
    outputFormat: 'markdown',
    tone: 'Professional',
  },
  {
    name: 'Technical Writer',
    icon: '📖',
    role: 'You are a technical documentation writer who creates clear, concise developer documentation',
    task: 'Write documentation for the following API endpoint / function / feature',
    context: '',
    constraints: ['Use clear, simple language', 'Include code examples', 'Add parameter descriptions'],
    outputFormat: 'markdown',
    tone: 'Technical',
  },
  {
    name: 'Bug Fixer',
    icon: '🐛',
    role: 'You are a debugging expert who systematically identifies and fixes software bugs',
    task: 'Analyze the following code/error and identify the root cause, then provide a fix',
    context: '',
    constraints: ['Explain the root cause clearly', 'Provide the minimal fix', 'Suggest how to prevent similar bugs'],
    outputFormat: 'markdown',
    tone: 'Concise',
  },
  {
    name: 'SQL Query Builder',
    icon: '🗃️',
    role: 'You are a database expert specializing in SQL optimization',
    task: 'Write an optimized SQL query based on the following requirements',
    context: '',
    constraints: ['Optimize for performance', 'Add comments explaining complex parts', 'Use standard SQL unless a specific database is specified'],
    outputFormat: 'code',
    tone: 'Technical',
  },
  {
    name: 'Content Creator',
    icon: '✏️',
    role: 'You are a content strategist who writes engaging, SEO-friendly content',
    task: 'Write content about the following topic',
    context: '',
    constraints: ['Use active voice', 'Include relevant keywords naturally', 'Keep paragraphs short and scannable'],
    outputFormat: 'markdown',
    tone: 'Friendly',
  },
]

const estimatedTokens = computed(() => {
  if (!output.value) return 0
  return Math.ceil(output.value.length / 4)
})

function loadTemplate(t: Template) {
  role.value = t.role
  task.value = t.task
  context.value = t.context
  constraints.value = [...t.constraints]
  outputFormat.value = t.outputFormat
  tone.value = t.tone
  examples.value = []
  customFormat.value = ''
  buildPrompt()
}

function clearAll() {
  role.value = ''
  task.value = ''
  context.value = ''
  constraints.value = ['']
  outputFormat.value = ''
  customFormat.value = ''
  examples.value = []
  tone.value = ''
  output.value = ''
  copied.value = false
}

async function copyPrompt() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function buildPrompt() {
  copied.value = false
  const sections: string[] = []

  if (role.value.trim()) {
    sections.push(`# Role\n${role.value.trim()}`)
  }

  if (context.value.trim()) {
    sections.push(`# Context\n${context.value.trim()}`)
  }

  if (task.value.trim()) {
    sections.push(`# Task\n${task.value.trim()}`)
  }

  const validConstraints = constraints.value.filter(c => c.trim())
  if (validConstraints.length > 0) {
    sections.push(`# Constraints\n${validConstraints.map(c => `- ${c.trim()}`).join('\n')}`)
  }

  if (tone.value) {
    sections.push(`# Tone\nRespond in a ${tone.value.toLowerCase()} tone.`)
  }

  const validExamples = examples.value.filter(e => e.input.trim() || e.output.trim())
  if (validExamples.length > 0) {
    const exStr = validExamples.map((e, i) => {
      const parts: string[] = [`## Example ${i + 1}`]
      if (e.input.trim()) parts.push(`**Input:** ${e.input.trim()}`)
      if (e.output.trim()) parts.push(`**Output:** ${e.output.trim()}`)
      return parts.join('\n')
    }).join('\n\n')
    sections.push(`# Examples\n${exStr}`)
  }

  if (outputFormat.value) {
    const formatMap: Record<string, string> = {
      markdown: 'Respond using Markdown with clear headers (##) and bullet points.',
      json: 'Respond with a valid JSON object.',
      bullets: 'Respond using a bullet point list.',
      numbered: 'Respond using a numbered list.',
      table: 'Respond using a Markdown table.',
      code: 'Respond with code only, inside a code block. No explanation.',
      custom: customFormat.value.trim(),
    }
    const formatStr = formatMap[outputFormat.value]
    if (formatStr) {
      sections.push(`# Output Format\n${formatStr}`)
    }
  }

  output.value = sections.join('\n\n')
}
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block mb-2;
}
.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}
select.input {
  @apply appearance-none;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}
textarea.input {
  @apply resize-y;
}
.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
</style>
