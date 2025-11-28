<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <!-- Header -->
    <div class="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <h2 class="text-2xl font-semibold">🖼️ Aspect Frame Generator</h2>
        <div class="flex items-center gap-2">
          <button class="btn" @click="swapWH">🔄 swap w/h</button>
          <button class="btn" @click="resetDefaults">↺ reset</button>
          <button class="btn-primary" @click="downloadImage">⬇ download png</button>
        </div>
      </div>
    </div>

    <!-- Controls Grid -->
    <div class="grid md:grid-cols-3 gap-4">
      
      <!-- Dimensions -->
      <div class="card space-y-3">
        <label class="label">📏 Dimensions (px)</label>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Width</label>
            <input
              v-model.number="width"
              type="number"
              :min="MIN_W"
              :max="MAX_W"
              step="1"
              class="input"
              @blur="clampDims"
            />
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Height</label>
            <input
              v-model.number="height"
              type="number"
              :min="MIN_H"
              :max="MAX_H"
              step="1"
              class="input"
              @blur="clampDims"
            />
          </div>
        </div>
      </div>

      <!-- Aspect Ratio -->
      <div class="card space-y-3">
        <label class="label">⚖️ Target Ratio</label>
        <div class="space-y-2">
          <input
            v-model.number="targetRatio"
            type="number"
            step="0.01"
            class="input"
            placeholder="2.35"
            @blur="clampRatio"
          />
          <select
            class="input"
            v-model="presetKey"
            @change="applyPreset"
          >
            <option disabled value="">Select a preset...</option>
            <option v-for="p in ratioPresets" :key="p.key" :value="p.key">
              {{ p.label }} ({{ p.value }})
            </option>
          </select>
        </div>
      </div>

      <!-- Appearance -->
      <div class="card space-y-3">
        <label class="label">🎨 Style & Colors</label>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Mode</label>
            <select v-model="renderMode" class="input">
              <option value="hole">Hole (Matte)</option>
              <option value="solid">Solid Frame</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Background</label>
            <div class="flex items-center gap-2">
              <input v-model="bgColor" type="color" class="w-8 h-8 p-0 border border-gray-600 rounded bg-black cursor-pointer" />
              <input
                v-model="bgColor"
                type="text"
                maxlength="7"
                class="input !px-2"
                @blur="normalizeHex('bg')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Labeling & Stats -->
    <div class="grid md:grid-cols-3 gap-4">
      <!-- Labeling -->
      <div class="card space-y-3 md:col-span-2">
        <div class="flex items-center justify-between">
          <label class="label">🏷️ Overlay Label</label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="showLabel" class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500" />
            <span class="text-sm text-gray-400">Show Label</span>
          </label>
        </div>
        <div class="flex gap-2">
          <div class="relative flex-1">
             <input
              v-model="centerLabel"
              type="text"
              placeholder="Optional custom text (e.g. 2.35:1)"
              class="input"
            />
          </div>
          <div class="flex items-center gap-2">
            <input v-model="textColor" type="color" class="w-10 h-10 p-1 border border-gray-600 rounded bg-black cursor-pointer" title="Text Color" />
             <button class="btn" @click="copyLabel" title="Copy label text">📋</button>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="card space-y-2 text-sm">
        <label class="label">📊 Stats</label>
        <div class="flex justify-between border-b border-gray-800 pb-1">
          <span class="text-gray-400">Current Ratio</span>
          <span class="font-mono text-indigo-400">{{ computedRatio.toFixed(3) }}:1</span>
        </div>
        <div class="flex justify-between border-b border-gray-800 pb-1">
          <span class="text-gray-400">Transparent H</span>
          <span class="font-mono text-indigo-400">{{ targetHeight | 0 }}px</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-400">Bar Height</span>
          <span class="font-mono text-indigo-400">{{ topBar | 0 }}px</span>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-indigo-400">👁️ Preview</h3>
        <span class="text-xs text-gray-500 font-mono">{{ suggestedFilename }}</span>
      </div>
      
      <div class="relative rounded-lg overflow-hidden ring-1 ring-gray-700 bg-[conic-gradient(at_0_0,transparent_25%,#111_0)_,conic-gradient(at_10px_10px,transparent_25%,#111_0)] [background-position:0_0,10px_10px] [background-size:20px_20px] p-4 sm:p-8 min-h-[200px] flex items-center justify-center">
        <img
            v-if="preview"
            :src="preview"
            :alt="`matte ${width}x${height}`"
            class="block max-h-[60vh] max-w-full rounded shadow-2xl ring-1 ring-white/10"
            loading="lazy"
            decoding="async"
        />
        <div v-else class="text-gray-500 italic">Generating preview...</div>
      </div>
    </div>

    <canvas ref="canvas" class="hidden"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

/* ---- state ---- */
const MIN_W = 16, MAX_W = 10000
const MIN_H = 16, MAX_H = 10000

const width = ref(1920)
const height = ref(1080)
const targetRatio = ref(2.35)
const bgColor = ref('#333333')
const textColor = ref('#ffffff')
const renderMode = ref('hole') // 'hole' | 'solid'
const centerLabel = ref('')
const showLabel = ref(true)

const preview = ref('')
const canvas = ref(null)

/* presets */
const ratioPresets = [
  { key: 'academy', label: 'Academy (4:3)', value: 4/3 },
  { key: 'europe',  label: 'European (1.66:1)', value: 1.66 },
  { key: 'flat',    label: 'Flat (1.85:1)', value: 1.85 },
  { key: 'hdtv',    label: 'HDTV (16:9)',   value: 16/9 },
  { key: '2.00',    label: 'Univisium (2.00:1)', value: 2.0 },
  { key: 'scope',   label: 'Scope (2.35:1)', value: 2.35 },
  { key: '239',     label: 'Scope (2.39:1)', value: 2.39 },
]
const presetKey = ref('')

/* ---- computed helpers ---- */
const computedRatio = computed(() => width.value / height.value)
const targetHeight = computed(() => width.value / targetRatio.value)
const topBar = computed(() => Math.max(0, (height.value - targetHeight.value) / 2))

const defaultLabel = computed(() => `${width.value}x${height.value} • ${targetRatio.value.toFixed(2)}:1`)
const effectiveLabel = computed(() => (centerLabel.value?.trim() || defaultLabel.value))

const suggestedFilename = computed(() => {
  const w = width.value, h = height.value
  const r = targetRatio.value.toFixed(2).replace('.', '_')
  const mode = renderMode.value === 'hole' ? 'matte' : 'solid'
  return `codehelper-${mode}-${w}x${h}-ratio-${r}.png`
})

/* ---- input guards ---- */
const clampDims = () => {
  width.value = clamp(width.value, MIN_W, MAX_W)
  height.value = clamp(height.value, MIN_H, MAX_H)
}
const clampRatio = () => {
  if (!isFiniteNumber(targetRatio.value) || targetRatio.value <= 0) {
    targetRatio.value = 2.35
  }
}
function clamp(n, a, b){ return Math.min(b, Math.max(a, Number(n) || a)) }
function isFiniteNumber(n){ return typeof n === 'number' && isFinite(n) }

/* hex normalization */
function normalizeHex(which){
  const re = /^#?[0-9a-fA-F]{6}$/
  if (which === 'bg') {
    if (!re.test(bgColor.value)) bgColor.value = '#333333'
  } else {
    if (!re.test(textColor.value)) textColor.value = '#ffffff'
  }
  if (bgColor.value[0] !== '#') bgColor.value = '#' + bgColor.value
  if (textColor.value[0] !== '#') textColor.value = '#' + textColor.value
}

/* presets */
function applyPreset(){
  const p = ratioPresets.find(x => x.key === presetKey.value)
  if (p) targetRatio.value = p.value
}

/* QoL */
function swapWH(){
  const w = width.value
  width.value = height.value
  height.value = w
}
function resetDefaults(){
  width.value = 1920
  height.value = 1080
  targetRatio.value = 2.35
  bgColor.value = '#333333'
  textColor.value = '#ffffff'
  renderMode.value = 'hole'
  centerLabel.value = ''
  showLabel.value = true
  presetKey.value = ''
  renderNow()
}
async function copyLabel(){
  try {
    await navigator.clipboard.writeText(effectiveLabel.value)
  } catch {}
}

/* ---- rendering ---- */
function renderToCanvas(){
  const cvs = canvas.value
  const ctx = cvs.getContext('2d')

  cvs.width = Math.round(width.value)
  cvs.height = Math.round(height.value)

  // fill full frame first
  ctx.clearRect(0, 0, cvs.width, cvs.height)
  ctx.fillStyle = bgColor.value
  ctx.fillRect(0, 0, cvs.width, cvs.height)

  const th = Math.max(0, targetHeight.value)
  const tb = Math.max(0, topBar.value)

  if (renderMode.value === 'hole') {
    // punch a transparent hole for the usable area
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillRect(0, tb, cvs.width, th)
    ctx.restore()
  }
  // center label (always drawn on top)
  if (showLabel.value && effectiveLabel.value) {
    ctx.fillStyle = textColor.value
    ctx.font = 'bold 20px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(0,0,0,0.35)'
    ctx.shadowBlur = 3
    ctx.fillText(effectiveLabel.value, cvs.width/2, cvs.height/2)
    ctx.shadowBlur = 0
  }

  preview.value = cvs.toDataURL('image/png')
}

function renderNow(){
  clampDims(); clampRatio()
  normalizeHex('bg'); normalizeHex('text')
  renderToCanvas()
}

function downloadImage(){
  if (!preview.value) renderNow()
  const a = document.createElement('a')
  a.href = preview.value
  a.download = suggestedFilename.value
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/* ---- live preview (debounced) ---- */
let t = null
function scheduleRender(){
  clearTimeout(t)
  t = setTimeout(renderNow, 120)
}
watch([width, height, targetRatio, bgColor, textColor, renderMode, centerLabel, showLabel], scheduleRender)

onMounted(() => {
  renderNow()
})
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block;
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
canvas.hidden { display: none; }
</style>