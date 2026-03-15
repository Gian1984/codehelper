<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🤖 AI Token Counter</h2>
        <p class="text-sm text-gray-400 mt-1">Estimate token count and cost for GPT-4, Claude, and other AI models</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="count" title="Count tokens">
          ⚡ Count
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Model Selection -->
    <div class="card">
      <label class="label mb-3">🧠 Model</label>
      <div class="flex flex-wrap gap-2">
        <button v-for="m in models" :key="m.id"
            :class="['btn', selectedModel === m.id && 'bg-indigo-600 hover:bg-indigo-500']"
            @click="selectModel(m.id)">
          {{ m.label }}
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-2">{{ currentModel.note }}</p>
    </div>

    <!-- Input Section -->
    <div class="card space-y-3">
      <label class="label">📝 Text Input</label>
      <textarea
          v-model="input"
          placeholder="Paste your prompt, system message, or any text to count tokens..."
          class="input font-mono resize-y min-h-[200px]"
          spellcheck="false"
          @input="autoCount"
      ></textarea>
    </div>

    <!-- Results -->
    <div v-if="result" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card text-center">
        <div class="text-3xl font-bold text-indigo-400">{{ result.tokens.toLocaleString() }}</div>
        <div class="text-xs text-gray-400 mt-1">Estimated Tokens</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-green-400">{{ result.words.toLocaleString() }}</div>
        <div class="text-xs text-gray-400 mt-1">Words</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-yellow-400">{{ result.chars.toLocaleString() }}</div>
        <div class="text-xs text-gray-400 mt-1">Characters</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-purple-400">{{ result.lines.toLocaleString() }}</div>
        <div class="text-xs text-gray-400 mt-1">Lines</div>
      </div>
    </div>

    <!-- Cost Estimation -->
    <div v-if="result && result.tokens > 0" class="card">
      <label class="label mb-3">💰 Estimated Cost</label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div class="text-sm text-gray-400 mb-1">As Input (prompt)</div>
          <div class="text-xl font-bold text-green-400">${{ formatCost(result.tokens * currentModel.inputCost) }}</div>
          <div class="text-xs text-gray-500 mt-1">${{ currentModel.inputCost * 1000000 }} per 1M tokens</div>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div class="text-sm text-gray-400 mb-1">As Output (completion)</div>
          <div class="text-xl font-bold text-yellow-400">${{ formatCost(result.tokens * currentModel.outputCost) }}</div>
          <div class="text-xs text-gray-500 mt-1">${{ currentModel.outputCost * 1000000 }} per 1M tokens</div>
        </div>
      </div>
    </div>

    <!-- Token Breakdown -->
    <div v-if="result && result.tokens > 0" class="card">
      <label class="label mb-3">📊 Token Breakdown</label>
      <div class="space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Ratio</span>
          <span class="text-white font-mono">~{{ result.ratio }} chars/token</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Context window usage</span>
          <span class="text-white font-mono">{{ ((result.tokens / currentModel.contextWindow) * 100).toFixed(2) }}% of {{ (currentModel.contextWindow / 1000).toFixed(0) }}K</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2">
          <div class="bg-indigo-500 h-2 rounded-full transition-all" :style="{ width: Math.min(100, (result.tokens / currentModel.contextWindow) * 100) + '%' }"></div>
        </div>
        <div class="text-xs text-gray-500">
          Remaining: ~{{ (currentModel.contextWindow - result.tokens).toLocaleString() }} tokens
        </div>
      </div>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Model {
  id: string
  label: string
  note: string
  charsPerToken: number
  inputCost: number   // per token
  outputCost: number  // per token
  contextWindow: number
}

const models: Model[] = [
  { id: 'gpt4o', label: 'GPT-4o', note: 'OpenAI GPT-4o — ~4 chars/token, 128K context', charsPerToken: 4, inputCost: 2.5 / 1e6, outputCost: 10 / 1e6, contextWindow: 128000 },
  { id: 'gpt4', label: 'GPT-4 Turbo', note: 'OpenAI GPT-4 Turbo — ~4 chars/token, 128K context', charsPerToken: 4, inputCost: 10 / 1e6, outputCost: 30 / 1e6, contextWindow: 128000 },
  { id: 'gpt35', label: 'GPT-3.5', note: 'OpenAI GPT-3.5 Turbo — ~4 chars/token, 16K context', charsPerToken: 4, inputCost: 0.5 / 1e6, outputCost: 1.5 / 1e6, contextWindow: 16384 },
  { id: 'claude-opus', label: 'Claude Opus', note: 'Anthropic Claude Opus — ~3.5 chars/token, 200K context', charsPerToken: 3.5, inputCost: 15 / 1e6, outputCost: 75 / 1e6, contextWindow: 200000 },
  { id: 'claude-sonnet', label: 'Claude Sonnet', note: 'Anthropic Claude Sonnet — ~3.5 chars/token, 200K context', charsPerToken: 3.5, inputCost: 3 / 1e6, outputCost: 15 / 1e6, contextWindow: 200000 },
  { id: 'claude-haiku', label: 'Claude Haiku', note: 'Anthropic Claude Haiku — ~3.5 chars/token, 200K context', charsPerToken: 3.5, inputCost: 0.25 / 1e6, outputCost: 1.25 / 1e6, contextWindow: 200000 },
  { id: 'gemini-pro', label: 'Gemini 1.5 Pro', note: 'Google Gemini 1.5 Pro — ~4 chars/token, 1M context', charsPerToken: 4, inputCost: 1.25 / 1e6, outputCost: 5 / 1e6, contextWindow: 1000000 },
  { id: 'llama3', label: 'Llama 3', note: 'Meta Llama 3 — ~4 chars/token, 8K context (open-source)', charsPerToken: 4, inputCost: 0, outputCost: 0, contextWindow: 8192 },
]

const selectedModel = ref('gpt4o')
const input = ref('')
const copied = ref(false)

interface CountResult {
  tokens: number
  words: number
  chars: number
  lines: number
  ratio: string
}

const result = ref<CountResult | null>(null)

const currentModel = computed(() => models.find(m => m.id === selectedModel.value) || models[0])

function selectModel(id: string) {
  selectedModel.value = id
  if (input.value.trim()) count()
}

function clearAll() {
  input.value = ''
  result.value = null
  copied.value = false
}

function autoCount() {
  if (input.value.trim()) count()
  else result.value = null
}

function count() {
  const text = input.value
  if (!text.trim()) {
    result.value = null
    return
  }

  const chars = text.length
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length
  const lines = text.split('\n').length
  const cpt = currentModel.value.charsPerToken
  const tokens = Math.ceil(chars / cpt)
  const ratio = tokens > 0 ? (chars / tokens).toFixed(1) : '0'

  result.value = { tokens, words, chars, lines, ratio }
}

function formatCost(cost: number): string {
  if (cost === 0) return '0.00 (free)'
  if (cost < 0.01) return cost.toFixed(6)
  if (cost < 1) return cost.toFixed(4)
  return cost.toFixed(2)
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
.warn {
  @apply text-sm text-red-400 bg-red-900/20 p-2 rounded-lg border border-red-700;
}
</style>
