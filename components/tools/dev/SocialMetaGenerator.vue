<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🏷️ Social Meta Tag Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Generate Open Graph, Twitter Card, and SEO meta tags with live preview</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn-primary" @click="generateTags" title="Generate meta tags">
          ⚡ Generate
        </button>
        <button class="btn" @click="clearAll" title="Clear all">
          🗑️ Clear
        </button>
      </div>
    </div>

    <!-- Input Fields -->
    <div class="card space-y-4">
      <label class="label font-semibold">📝 Page Details</label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="label">Page Title <span class="text-gray-500 text-xs">(max 60 chars)</span></label>
          <input v-model="title" class="input" placeholder="My Awesome Page" maxlength="70" />
          <div class="text-xs" :class="title.length > 60 ? 'text-yellow-400' : 'text-gray-500'">{{ title.length }}/60</div>
        </div>
        <div class="space-y-2">
          <label class="label">Site Name</label>
          <input v-model="siteName" class="input" placeholder="MySite" />
        </div>
      </div>
      <div class="space-y-2">
        <label class="label">Description <span class="text-gray-500 text-xs">(max 160 chars)</span></label>
        <textarea v-model="description" class="input resize-y min-h-[80px]" placeholder="A brief description of this page..." maxlength="200"></textarea>
        <div class="text-xs" :class="description.length > 160 ? 'text-yellow-400' : 'text-gray-500'">{{ description.length }}/160</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="label">Page URL</label>
          <input v-model="url" class="input" placeholder="https://example.com/page" />
        </div>
        <div class="space-y-2">
          <label class="label">Image URL <span class="text-gray-500 text-xs">(1200x630 recommended)</span></label>
          <input v-model="image" class="input" placeholder="https://example.com/og-image.png" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="label">OG Type</label>
          <select v-model="ogType" class="input">
            <option value="website">website</option>
            <option value="article">article</option>
            <option value="product">product</option>
            <option value="profile">profile</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="label">Twitter Card</label>
          <select v-model="twitterCard" class="input">
            <option value="summary_large_image">summary_large_image</option>
            <option value="summary">summary</option>
          </select>
        </div>
      </div>
      <div class="space-y-2">
        <label class="label">Twitter Handle <span class="text-gray-500 text-xs">(optional)</span></label>
        <input v-model="twitterHandle" class="input" placeholder="@myhandle" />
      </div>
    </div>

    <!-- Previews -->
    <div v-if="output" class="card">
      <label class="label font-semibold mb-4">👁️ Social Preview</label>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Google Preview -->
        <div class="space-y-2">
          <div class="text-xs text-gray-500 uppercase tracking-wider">Google</div>
          <div class="bg-white rounded-lg p-4 text-black">
            <div class="text-xs text-green-700 mb-1">{{ url || 'https://example.com' }}</div>
            <div class="text-blue-700 text-lg font-medium leading-tight hover:underline cursor-pointer">{{ title || 'Page Title' }}</div>
            <div class="text-sm text-gray-600 mt-1 line-clamp-2">{{ description || 'Page description will appear here...' }}</div>
          </div>
        </div>

        <!-- Facebook/LinkedIn Preview -->
        <div class="space-y-2">
          <div class="text-xs text-gray-500 uppercase tracking-wider">Facebook / LinkedIn</div>
          <div class="bg-gray-100 rounded-lg overflow-hidden max-w-sm">
            <div class="h-40 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
              <img v-if="image" :src="image" class="w-full h-full object-cover" @error="($event.target as HTMLImageElement).style.display='none'" />
              <span v-if="!image">1200 x 630 Image</span>
            </div>
            <div class="p-3">
              <div class="text-xs text-gray-500 uppercase">{{ extractDomain }}</div>
              <div class="text-black font-semibold text-sm mt-1 line-clamp-2">{{ title || 'Page Title' }}</div>
              <div class="text-gray-500 text-xs mt-1 line-clamp-2">{{ description || 'Description...' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Output -->
    <div v-if="output" class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 Generated Meta Tags</label>
        <div class="flex gap-2">
          <button class="btn" @click="copyTags">📋 Copy</button>
        </div>
      </div>
      <span v-if="copied" class="text-green-400 text-xs font-medium">✅ Copied!</span>
      <pre class="mono-box max-h-[400px] whitespace-pre-wrap">{{ output }}</pre>
    </div>

    <div v-if="!output" class="card text-center py-16 text-gray-500">
      <div class="text-4xl mb-4">🏷️</div>
      <p>Fill in the page details above and click "Generate"</p>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const title = ref('')
const description = ref('')
const url = ref('')
const image = ref('')
const siteName = ref('')
const ogType = ref('website')
const twitterCard = ref('summary_large_image')
const twitterHandle = ref('')
const output = ref('')
const copied = ref(false)

const extractDomain = computed(() => {
  try {
    return new URL(url.value).hostname
  } catch {
    return 'example.com'
  }
})

function clearAll() {
  title.value = ''
  description.value = ''
  url.value = ''
  image.value = ''
  siteName.value = ''
  ogType.value = 'website'
  twitterCard.value = 'summary_large_image'
  twitterHandle.value = ''
  output.value = ''
  copied.value = false
}

async function copyTags() {
  if (!output.value) return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function generateTags() {
  copied.value = false
  const lines: string[] = []

  lines.push('<!-- Primary Meta Tags -->')
  if (title.value) lines.push(`<title>${esc(title.value)}</title>`)
  if (title.value) lines.push(`<meta name="title" content="${esc(title.value)}" />`)
  if (description.value) lines.push(`<meta name="description" content="${esc(description.value)}" />`)

  lines.push('')
  lines.push('<!-- Open Graph / Facebook -->')
  lines.push(`<meta property="og:type" content="${ogType.value}" />`)
  if (url.value) lines.push(`<meta property="og:url" content="${esc(url.value)}" />`)
  if (title.value) lines.push(`<meta property="og:title" content="${esc(title.value)}" />`)
  if (description.value) lines.push(`<meta property="og:description" content="${esc(description.value)}" />`)
  if (image.value) lines.push(`<meta property="og:image" content="${esc(image.value)}" />`)
  if (siteName.value) lines.push(`<meta property="og:site_name" content="${esc(siteName.value)}" />`)

  lines.push('')
  lines.push('<!-- Twitter -->')
  lines.push(`<meta property="twitter:card" content="${twitterCard.value}" />`)
  if (url.value) lines.push(`<meta property="twitter:url" content="${esc(url.value)}" />`)
  if (title.value) lines.push(`<meta property="twitter:title" content="${esc(title.value)}" />`)
  if (description.value) lines.push(`<meta property="twitter:description" content="${esc(description.value)}" />`)
  if (image.value) lines.push(`<meta property="twitter:image" content="${esc(image.value)}" />`)
  if (twitterHandle.value) {
    const handle = twitterHandle.value.startsWith('@') ? twitterHandle.value : '@' + twitterHandle.value
    lines.push(`<meta property="twitter:site" content="${esc(handle)}" />`)
    lines.push(`<meta property="twitter:creator" content="${esc(handle)}" />`)
  }

  output.value = lines.join('\n')
}

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
