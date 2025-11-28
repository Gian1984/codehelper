<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">📐 Aspect Ratio Calculator</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="swap">swap</button>
        <button class="btn" @click="resetAll">reset</button>
        <button class="btn-primary" :disabled="!cssLine" @click="copy(cssLine)">copy CSS</button>
      </div>
    </div>

    <!-- Base inputs -->
    <div class="grid md:grid-cols-3 gap-4">
      <div class="card space-y-2">
        <label class="label">width (px)</label>
        <input type="number" min="1" v-model.number="width" class="input" />
      </div>
      <div class="card space-y-2">
        <label class="label">height (px)</label>
        <input type="number" min="1" v-model.number="height" class="input" />
      </div>
      <div class="card space-y-2">
        <label class="label">decimals</label>
        <input type="number" min="0" max="6" v-model.number="decimals" class="input" />
        <select v-model="presetKey" class="input mt-2" @change="applyPreset">
          <option value="">— presets —</option>
          <option v-for="p in PRESETS" :key="p.key" :value="p.key">{{ p.label }}</option>
        </select>
      </div>
    </div>

    <!-- Results -->
    <div class="card space-y-3">
      <div class="flex items-center justify-between">
        <p class="label">Result</p>
        <div class="flex gap-2">
          <button class="btn" :disabled="!cssLine" @click="copy(cssLine)">copy CSS</button>
          <button class="btn" :disabled="!reduced" @click="copy(reduced)">copy W:H</button>
        </div>
      </div>

      <div v-if="valid" class="grid md:grid-cols-3 gap-3 text-sm">
        <div class="mono-box">reduced: {{ reduced }}</div>
        <div class="mono-box">decimal: {{ decimal }} : 1</div>
        <div class="mono-box">CSS: {{ cssLine }}</div>
      </div>
      <p v-else class="warn">Enter positive, non-zero width & height.</p>

      <div v-if="closest" class="text-xs text-gray-300">
        nearest preset: <span class="font-mono text-white">{{ closest.label }}</span>
        <span class="opacity-60"> ({{ closest.rw }}:{{ closest.rh }})</span>
        <button class="btn ml-2" @click="applyPresetKey(closest.key)">use</button>
      </div>

      <div class="text-xs text-gray-400">
        orientation: <span class="font-mono text-white">{{ orientation }}</span>
        • pixel count: <span class="font-mono text-white">{{ pixelCount.toLocaleString() }}</span>
      </div>
    </div>

    <!-- Solve missing side from ratio -->
    <div class="card space-y-4">
      <h3 class="label text-lg">🧮 Solve size from ratio</h3>
      <div class="grid md:grid-cols-5 gap-3">
        <div class="md:col-span-2">
          <span class="sub">ratio (W:H)</span>
          <div class="flex gap-2">
            <input type="number" min="1" v-model.number="ratioW" class="input" />
            <span class="self-center">:</span>
            <input type="number" min="1" v-model.number="ratioH" class="input" />
          </div>
        </div>
        <div>
          <span class="sub">given side</span>
          <select v-model="solveSide" class="input">
            <option value="width">width</option>
            <option value="height">height</option>
          </select>
        </div>
        <div>
          <span class="sub">value (px)</span>
          <input type="number" min="1" v-model.number="givenValue" class="input" />
        </div>
        <div class="flex items-end">
          <button class="btn w-full" @click="solve">solve</button>
        </div>
      </div>

      <div v-if="solved" class="mono-box">
        {{ solved.width }} × {{ solved.height }} px • aspect-ratio: {{ ratioW }} / {{ ratioH }}
      </div>
    </div>

    <!-- Fit in a box (Cover removed) -->
    <div class="card space-y-4">
      <h3 class="label text-lg">📦 Fit calculator</h3>
      <div class="grid md:grid-cols-5 gap-3">
        <div>
          <span class="sub">box width (px)</span>
          <input type="number" min="1" v-model.number="boxW" class="input" />
        </div>
        <div>
          <span class="sub">box height (px)</span>
          <input type="number" min="1" v-model.number="boxH" class="input" />
        </div>
        <div class="md:col-span-3 grid grid-cols-1 gap-3">
          <div class="mono-box">fit → {{ fitSize.w }} × {{ fitSize.h }}</div>
        </div>
      </div>

      <div class="card !p-3 space-y-2">
        <p class="text-sm text-gray-300 mb-1">Fit preview</p>
        <div class="preview" :style="previewStyles">
          <div class="preview-item bg-blue-500/70" :style="{ width: (fitSize.w / boxW * 100) + '%', height: (fitSize.h / boxH * 100) + '%' }"></div>
        </div>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm font-semibold">✓ {{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type Preset = { key: string; label: string; rw: number; rh: number }
const PRESETS: Preset[] = [
  { key: '1-1', label: 'Square 1:1', rw: 1, rh: 1 },
  { key: '3-2', label: 'Photo 3:2', rw: 3, rh: 2 },
  { key: '4-3', label: 'Standard 4:3', rw: 4, rh: 3 },
  { key: '16-10', label: 'Widescreen 16:10', rw: 16, rh: 10 },
  { key: '16-9', label: 'HD/4K 16:9', rw: 16, rh: 9 },
  { key: '21-9', label: 'Ultrawide 21:9', rw: 21, rh: 9 },
  { key: '235-100', label: 'CinemaScope 2.35:1', rw: 235, rh: 100 },
  { key: '239-100', label: 'Scope 2.39:1', rw: 239, rh: 100 },
  { key: '9-16', label: 'Vertical 9:16', rw: 9, rh: 16 },
]

/* base inputs */
const width = ref<number>(720)
const height = ref<number>(480)
const decimals = ref<number>(2)
const presetKey = ref<string>('')

/* helpers */
function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a || 1
}
function round(n: number, d: number): number {
  const f = Math.pow(10, d); return Math.round(n * f) / f
}
const valid = computed(() => Number.isFinite(width.value) && Number.isFinite(height.value) && width.value > 0 && height.value > 0)

/* results */
const reduced = computed(() => {
  if (!valid.value) return ''
  const g = gcd(width.value, height.value)
  return `${width.value / g}:${height.value / g}`
})
const decimal = computed(() => valid.value ? String(round(width.value / height.value, decimals.value)) : '')
const cssLine = computed(() => valid.value ? `aspect-ratio: ${width.value} / ${height.value};` : '')
const pixelCount = computed(() => valid.value ? width.value * height.value : 0)
const orientation = computed(() => !valid.value ? '—' : width.value > height.value ? 'landscape' : width.value < height.value ? 'portrait' : 'square')

/* nearest preset */
const closest = computed(() => {
  if (!valid.value) return null
  const r = width.value / height.value
  let best: { key: string; label: string; rw: number; rh: number; diff: number } | null = null
  for (const p of PRESETS) {
    const pr = p.rw / p.rh
    const diff = Math.abs(pr - r) / pr
    if (!best || diff < best.diff) best = { ...p, diff }
  }
  return best && best.diff <= 0.01 ? best : null
})

/* actions */
function applyPreset() {
  const p = PRESETS.find(x => x.key === presetKey.value)
  if (!p) return
  width.value = Math.max(1, width.value)
  height.value = Math.round(width.value * (p.rh / p.rw))
}
function applyPresetKey(key: string) { presetKey.value = key; applyPreset() }
function swap() { [width.value, height.value] = [height.value, width.value] }
const copiedMsg = ref<string>('')
function copy(text: string) { navigator.clipboard.writeText(text); copiedMsg.value = 'Copied!'; setTimeout(() => (copiedMsg.value = ''), 1500) }
function resetAll() {
  width.value = 720; height.value = 480; decimals.value = 2; presetKey.value = ''
  ratioW.value = 16; ratioH.value = 9; givenValue.value = 1080; solveSide.value = 'height'
  boxW.value = 1280; boxH.value = 720
}

/* solve from ratio */
const ratioW = ref<number>(16)
const ratioH = ref<number>(9)
const solveSide = ref<'width' | 'height'>('height')
const givenValue = ref<number>(1080)
const solved = ref<{ width: number; height: number } | null>(null)
function solve() {
  if (!(ratioW.value > 0 && ratioH.value > 0 && givenValue.value > 0)) { solved.value = null; return }
  const g = gcd(ratioW.value, ratioH.value)
  const rw = ratioW.value / g, rh = ratioH.value / g
  if (solveSide.value === 'width') {
    const w = givenValue.value, h = Math.round(w * (rh / rw))
    solved.value = { width: w, height: h }
  } else {
    const h = givenValue.value, w = Math.round(h * (rw / rh))
    solved.value = { width: w, height: h }
  }
}

/* fit (cover removed) */
const boxW = ref<number>(1280)
const boxH = ref<number>(720)
const fitSize = computed(() => {
  if (!valid.value || boxW.value <= 0 || boxH.value <= 0) return { w: 0, h: 0 }
  const s = Math.min(boxW.value / width.value, boxH.value / height.value)
  return { w: Math.round(width.value * s), h: Math.round(height.value * s) }
})

const previewStyles = computed(() => ({
  '--box-width': `${boxW.value}`,
  '--box-height': `${boxH.value}`,
}));

/* persistence */
const KEY = 'aspect-ratio-tool'
watch([width, height, decimals, presetKey, ratioW, ratioH, solveSide, givenValue, boxW, boxH], () => {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      width: width.value, height: height.value, decimals: decimals.value, presetKey: presetKey.value,
      ratioW: ratioW.value, ratioH: ratioH.value, solveSide: solveSide.value, givenValue: givenValue.value,
      boxW: boxW.value, boxH: boxH.value
    }))
  } catch {}
}, { deep: true })
onMounted(() => {
  try {
    const raw = localStorage.getItem(KEY); if (!raw) return
    const s = JSON.parse(raw)
    if (Number.isFinite(s?.width)) width.value = s.width
    if (Number.isFinite(s?.height)) height.value = s.height
    if (Number.isFinite(s?.decimals)) decimals.value = s.decimals
    if (typeof s?.presetKey === 'string') presetKey.value = s.presetKey
    if (Number.isFinite(s?.ratioW)) ratioW.value = s.ratioW
    if (Number.isFinite(s?.ratioH)) ratioH.value = s.ratioH
    if (s?.solveSide === 'width' || s?.solveSide === 'height') solveSide.value = s.solveSide
    if (Number.isFinite(s?.givenValue)) givenValue.value = s.givenValue
    if (Number.isFinite(s?.boxW)) boxW.value = s.boxW
    if (Number.isFinite(s?.boxH)) boxH.value = s.boxH
  } catch {}
})
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block;
}
.sub {
  @apply block text-[10px] text-gray-400 mb-1 uppercase tracking-wide;
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

/* Custom styles for AspectRatioCalculator */
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
.warn {
  @apply text-sm text-yellow-300 bg-yellow-900/20 p-2 rounded-lg border border-yellow-700;
}

.preview {
  @apply relative rounded-lg border border-gray-700 bg-gray-900 grid place-items-center max-w-full h-auto;
  min-height: 140px;
  aspect-ratio: var(--box-width) / var(--box-height);
}
.preview::before,
.preview::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
      linear-gradient(45deg, rgba(255,255,255,.04) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(255,255,255,.04) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(255,255,255,.04) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.04) 75%);
  background-size: 20px 20px;
  pointer-events: none;
}
.preview-item { @apply rounded-md outline outline-1 outline-white/10; }
</style>



