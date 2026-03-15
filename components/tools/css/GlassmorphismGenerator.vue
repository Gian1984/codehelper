<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">🪟 Glassmorphism Generator</h2>
        <p class="text-sm text-gray-400 mt-1">Create frosted glass CSS effects with live preview and code generation</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button class="btn" @click="resetDefaults" title="Reset">🔄 Reset</button>
        <button class="btn" @click="copyCSS" title="Copy CSS">📋 Copy CSS</button>
      </div>
    </div>

    <!-- Controls + Preview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Controls -->
      <div class="card space-y-5">
        <label class="label font-semibold">⚙️ Controls</label>

        <!-- Transparency -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="label !mb-0">Opacity</label>
            <span class="text-sm text-indigo-400 font-mono">{{ opacity }}</span>
          </div>
          <input type="range" v-model.number="opacity" min="0" max="1" step="0.05" class="slider" />
        </div>

        <!-- Blur -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="label !mb-0">Blur</label>
            <span class="text-sm text-indigo-400 font-mono">{{ blur }}px</span>
          </div>
          <input type="range" v-model.number="blur" min="0" max="40" step="1" class="slider" />
        </div>

        <!-- Border Radius -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="label !mb-0">Border Radius</label>
            <span class="text-sm text-indigo-400 font-mono">{{ borderRadius }}px</span>
          </div>
          <input type="range" v-model.number="borderRadius" min="0" max="50" step="1" class="slider" />
        </div>

        <!-- Border Width -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="label !mb-0">Border Width</label>
            <span class="text-sm text-indigo-400 font-mono">{{ borderWidth }}px</span>
          </div>
          <input type="range" v-model.number="borderWidth" min="0" max="5" step="0.5" class="slider" />
        </div>

        <!-- Shadow -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="label !mb-0">Shadow Intensity</label>
            <span class="text-sm text-indigo-400 font-mono">{{ shadowIntensity }}</span>
          </div>
          <input type="range" v-model.number="shadowIntensity" min="0" max="1" step="0.05" class="slider" />
        </div>

        <!-- Color -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="label">Glass Color</label>
            <div class="flex items-center gap-2">
              <input type="color" v-model="glassColor" class="w-10 h-10 rounded border border-gray-600 cursor-pointer bg-transparent" />
              <input v-model="glassColor" class="input text-sm font-mono" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="label">Background</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="bg in backgrounds" :key="bg.id"
                  :class="['w-8 h-8 rounded-lg border-2 cursor-pointer', selectedBg === bg.id ? 'border-indigo-400' : 'border-gray-600']"
                  :style="{ background: bg.preview }"
                  @click="selectedBg = bg.id"
                  :title="bg.label">
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="card">
        <label class="label font-semibold mb-3">👁️ Live Preview</label>
        <div class="preview-container rounded-xl overflow-hidden" :style="{ background: currentBgStyle }">
          <div class="w-full h-80 flex items-center justify-center p-8">
            <div class="glass-card w-full max-w-xs p-6 text-center" :style="glassStyle">
              <div class="text-4xl mb-3">🪟</div>
              <div class="text-lg font-semibold mb-2" :style="{ color: textColor }">Glass Card</div>
              <p class="text-sm" :style="{ color: textColor, opacity: 0.8 }">This is a glassmorphism effect created with CSS backdrop-filter and transparency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CSS Output -->
    <div class="card">
      <div class="flex items-center justify-between mb-2">
        <label class="label !mb-0">📄 CSS Code</label>
        <div class="flex gap-2">
          <button class="btn" @click="copyCSS">📋 Copy</button>
        </div>
      </div>
      <span v-if="copied" class="text-green-400 text-xs font-medium">✅ Copied!</span>
      <pre class="mono-box whitespace-pre-wrap">{{ cssOutput }}</pre>
    </div>

    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const opacity = ref(0.25)
const blur = ref(16)
const borderRadius = ref(16)
const borderWidth = ref(1)
const shadowIntensity = ref(0.25)
const glassColor = ref('#ffffff')
const selectedBg = ref('gradient1')
const copied = ref(false)

const backgrounds = [
  { id: 'gradient1', label: 'Purple-Blue', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'gradient2', label: 'Sunset', preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 'gradient3', label: 'Ocean', preview: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'gradient4', label: 'Forest', preview: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', style: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 'gradient5', label: 'Dark', preview: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)', style: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)' },
  { id: 'gradient6', label: 'Warm', preview: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', style: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
]

const currentBgStyle = computed(() => {
  const bg = backgrounds.find(b => b.id === selectedBg.value)
  return bg ? bg.style : backgrounds[0].style
})

const textColor = computed(() => {
  const hex = glassColor.value.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1a1a2e' : '#ffffff'
})

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
}

const glassStyle = computed(() => {
  const { r, g, b } = hexToRgb(glassColor.value)
  return {
    background: `rgba(${r}, ${g}, ${b}, ${opacity.value})`,
    backdropFilter: `blur(${blur.value}px)`,
    WebkitBackdropFilter: `blur(${blur.value}px)`,
    borderRadius: `${borderRadius.value}px`,
    border: `${borderWidth.value}px solid rgba(${r}, ${g}, ${b}, ${Math.min(1, opacity.value + 0.15)})`,
    boxShadow: `0 8px 32px rgba(0, 0, 0, ${shadowIntensity.value})`,
  }
})

const cssOutput = computed(() => {
  const { r, g, b } = hexToRgb(glassColor.value)
  const lines = [
    `.glass {`,
    `  background: rgba(${r}, ${g}, ${b}, ${opacity.value});`,
    `  backdrop-filter: blur(${blur.value}px);`,
    `  -webkit-backdrop-filter: blur(${blur.value}px);`,
    `  border-radius: ${borderRadius.value}px;`,
  ]
  if (borderWidth.value > 0) {
    lines.push(`  border: ${borderWidth.value}px solid rgba(${r}, ${g}, ${b}, ${Math.min(1, opacity.value + 0.15).toFixed(2)});`)
  }
  if (shadowIntensity.value > 0) {
    lines.push(`  box-shadow: 0 8px 32px rgba(0, 0, 0, ${shadowIntensity.value});`)
  }
  lines.push(`}`)
  return lines.join('\n')
})

function resetDefaults() {
  opacity.value = 0.25
  blur.value = 16
  borderRadius.value = 16
  borderWidth.value = 1
  shadowIntensity.value = 0.25
  glassColor.value = '#ffffff'
  selectedBg.value = 'gradient1'
  copied.value = false
}

async function copyCSS() {
  await navigator.clipboard.writeText(cssOutput.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
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
.slider {
  @apply w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer;
}
.slider::-webkit-slider-thumb {
  @apply appearance-none w-5 h-5 bg-indigo-500 rounded-full shadow-lg;
}
.preview-container {
  min-height: 320px;
}
</style>
