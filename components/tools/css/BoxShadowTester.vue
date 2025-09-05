<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow text-white">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">Box Shadow Designer</h2>
      <div class="flex gap-2">
        <button class="btn" @click="addLayer()">+ layer</button>
        <button class="btn" @click="applyPreset('soft')">soft preset</button>
        <button class="btn" @click="applyPreset('material-3')">material 3</button>
        <button class="btn" @click="resetAll">reset</button>
        <button class="btn-primary" :disabled="!boxShadowValue" @click="copyCss">copy CSS</button>
      </div>
    </div>

    <!-- Global preview controls -->
    <div class="grid md:grid-cols-3 gap-4">
      <div class="card space-y-2">
        <label class="label">preview background</label>
        <div class="flex items-center gap-2">
          <input type="color" v-model="previewBackground" class="color" />
          <input class="input text-black" v-model="previewBackground" @blur="previewBackground = normalizeHex(previewBackground, '#ffffff')" maxlength="7" />
        </div>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="checker" /> checkerboard
        </label>
      </div>

      <div class="card space-y-2">
        <label class="label">preview size</label>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <span class="sub">box (px)</span>
            <input type="number" min="32" v-model.number="boxSize" class="input" />
          </div>
          <div>
            <span class="sub">radius (px)</span>
            <input type="number" min="0" v-model.number="radius" class="input" />
          </div>
        </div>
      </div>

      <div class="card space-y-2">
        <label class="label">output format</label>
        <select v-model="format" class="input">
          <option value="css">CSS</option>
          <option value="tailwind">Tailwind (arbitrary)</option>
        </select>
        <label class="label mt-2">filename</label>
        <input v-model="filename" class="input" placeholder="shadow.css" />
        <button class="btn mt-2" :disabled="!boxShadowValue" @click="downloadCss">download</button>
      </div>
    </div>

    <!-- Layers -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Layers</h3>
        <span class="text-xs text-gray-400">order matters (top = first)</span>
      </div>

      <div v-if="layers.length === 0" class="text-gray-400 text-sm">No layers. Add one with “+ layer”.</div>

      <div v-for="(l, idx) in layers" :key="l.id" class="layer">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-2">
            <button class="icon" title="move up" :disabled="idx===0" @click="move(idx, -1)">▲</button>
            <button class="icon" title="move down" :disabled="idx===layers.length-1" @click="move(idx, +1)">▼</button>
            <label class="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="l.inset" /> inset
            </label>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn" @click="duplicate(idx)">duplicate</button>
            <button class="btn danger" @click="remove(idx)">delete</button>
          </div>
        </div>

        <div class="grid md:grid-cols-5 gap-4 mt-3">
          <label class="block">
            <span class="sub">X offset</span>
            <input type="range" min="-100" max="100" step="1" v-model.number="l.x" class="w-full" />
            <span class="value">{{ l.x }}px</span>
          </label>
          <label class="block">
            <span class="sub">Y offset</span>
            <input type="range" min="-100" max="100" step="1" v-model.number="l.y" class="w-full" />
            <span class="value">{{ l.y }}px</span>
          </label>
          <label class="block">
            <span class="sub">Blur</span>
            <input type="range" min="0" max="200" step="1" v-model.number="l.blur" class="w-full" />
            <span class="value">{{ l.blur }}px</span>
          </label>
          <label class="block">
            <span class="sub">Spread</span>
            <input type="range" min="-100" max="100" step="1" v-model.number="l.spread" class="w-full" />
            <span class="value">{{ l.spread }}px</span>
          </label>

          <div class="space-y-1">
            <span class="sub">Color</span>
            <div class="flex items-center gap-2">
              <input type="color" v-model="l.hex" class="color" />
              <input class="input text-black" v-model="l.hex" @blur="l.hex = normalizeHex(l.hex, '#000000')" maxlength="7" />
            </div>
            <div class="flex items-center gap-2">
              <span class="sub">Opacity</span>
              <input type="range" min="0" max="1" step="0.01" v-model.number="l.alpha" class="w-full" />
              <span class="value">{{ (l.alpha*100).toFixed(0) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="text-xs text-gray-400">Tip: big blur + small spread gives soft elevation; negative spread creates tighter, darker edges.</div>
    </div>

    <!-- Preview -->
    <div class="card space-y-3">
      <p class="label">Preview</p>
      <div
          class="preview"
          :style="{
          background: checker ? checkerCss : previewBackground,
        }"
      >
        <div
            class="box"
            :style="{
            width: boxSize + 'px',
            height: boxSize + 'px',
            borderRadius: radius + 'px',
            boxShadow: boxShadowValue,
            background: '#fff'
          }"
        />
      </div>
    </div>

    <!-- Output -->
    <div class="card space-y-2">
      <p class="label">Generated</p>

      <div v-if="format==='css'">
        <pre class="mono">.shadow-box { box-shadow: {{ boxShadowValue }}; }</pre>
      </div>

      <div v-else>
        <pre class="mono">class="shadow-[{{ tailwindShadow }}]"</pre>
        <p class="text-xs text-gray-400">Tailwind arbitrary value escapes handled.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Layer = {
  id: string
  x: number
  y: number
  blur: number
  spread: number
  hex: string
  alpha: number
  inset: boolean
}

const uid = () => Math.random().toString(36).slice(2, 9)

/* ------- state ------- */
const previewBackground = ref('#ffffff')
const checker = ref(true)
const boxSize = ref(96)
const radius = ref(12)
const format = ref<'css'|'tailwind'>('css')
const filename = ref('shadow.css')

const layers = ref<Layer[]>([
  { id: uid(), x: 10, y: 10, blur: 30, spread: 0, hex: '#000000', alpha: 0.25, inset: false },
])

/* ------- computed ------- */
const rgba = (hex: string, a: number) => {
  const h = normalizeHex(hex, '#000000')
  const r = parseInt(h.slice(1,3), 16)
  const g = parseInt(h.slice(3,5), 16)
  const b = parseInt(h.slice(5,7), 16)
  return `rgba(${r}, ${g}, ${b}, ${clamp(a,0,1)})`
}

const layerToCss = (l: Layer) =>
    `${l.inset ? 'inset ' : ''}${px(l.x)} ${px(l.y)} ${px(l.blur)} ${px(l.spread)} ${rgba(l.hex, l.alpha)}`

const boxShadowValue = computed(() => layers.value.map(layerToCss).join(', '))

const tailwindShadow = computed(() =>
    // escape commas and spaces for arbitrary shadows: shadow-[<value>]
    boxShadowValue.value
        .replaceAll(' ', '_')
        .replaceAll(',', '%2c')
        .replaceAll('#', '%23')
)

/* checkerboard background */
const checkerCss = `repeating-conic-gradient(#e5e7eb 0% 25%, #d1d5db 0% 50%) 0 / 16px 16px`

/* ------- actions ------- */
function addLayer() {
  layers.value.unshift({ id: uid(), x: 0, y: 8, blur: 20, spread: -2, hex: '#000000', alpha: 0.20, inset: false })
}
function remove(i: number) {
  layers.value.splice(i, 1)
}
function duplicate(i: number) {
  const l = layers.value[i]
  layers.value.splice(i, 0, { ...l, id: uid() })
}
function move(i: number, dir: -1 | 1) {
  const j = i + dir
  if (j < 0 || j >= layers.value.length) return
  const arr = layers.value
  const [el] = arr.splice(i, 1)
  arr.splice(j, 0, el)
}

function px(v: number) { return `${v}px` }
function clamp(n: number, a: number, b: number) { return Math.max(a, Math.min(b, n)) }

/* safe hex normalizer */
function normalizeHex(value: string, fallback: string): string {
  const m = /^#([0-9A-Fa-f]{6})$/.exec(value || '')
  return m ? `#${m[1].toLowerCase()}` : fallback
}

/* presets */
function applyPreset(kind: 'soft' | 'material-3') {
  if (kind === 'soft') {
    layers.value = [
      { id: uid(), x: 0, y: 6, blur: 12, spread: -2, hex: '#000000', alpha: 0.18, inset: false },
      { id: uid(), x: 0, y: 2, blur: 4,  spread: 0,  hex: '#000000', alpha: 0.10, inset: false },
    ]
  } else {
    // “Material-like” 3 layers
    layers.value = [
      { id: uid(), x: 0,  y: 1,  blur: 3,  spread: 0,  hex: '#000000', alpha: 0.20, inset: false },
      { id: uid(), x: 0,  y: 1,  blur: 2,  spread: 0,  hex: '#000000', alpha: 0.12, inset: false },
      { id: uid(), x: 0,  y: 2,  blur: 1,  spread: -1, hex: '#000000', alpha: 0.10, inset: false },
    ]
  }
}

/* copy / download */
async function copyCss() {
  const css = `.shadow-box { box-shadow: ${boxShadowValue.value}; }`
  await navigator.clipboard.writeText(css)
}

function downloadCss() {
  const css = `.shadow-box {\n  box-shadow: ${boxShadowValue.value};\n}\n`
  const blob = new Blob([css], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = (filename.value || 'shadow.css').replace(/[^\w.\-]+/g, '_')
  a.click()
  URL.revokeObjectURL(url)
}

function resetAll() {
  previewBackground.value = '#ffffff'
  checker.value = true
  boxSize.value = 96
  radius.value = 12
  format.value = 'css'
  filename.value = 'shadow.css'
  layers.value = [
    { id: uid(), x: 10, y: 10, blur: 30, spread: 0, hex: '#000000', alpha: 0.25, inset: false },
  ]
}
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.sub { @apply block text-xs text-gray-400 mb-1; }
.input { @apply bg-gray-100 text-gray-900 border border-gray-300 rounded px-2 py-1 w-full; }
.color { @apply w-12 h-10 p-0 border border-gray-400 rounded; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white text-sm; }
.btn.danger { @apply bg-red-600 hover:bg-red-500; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
.icon { @apply bg-gray-700 hover:bg-gray-600 text-white text-xs rounded px-2 py-1 disabled:opacity-50; }

.layer { @apply bg-gray-800/40 rounded-lg p-3 border border-gray-800; }
.value { @apply text-xs text-gray-300; }
.preview {
  @apply rounded-lg p-8 border border-gray-800;
  min-height: 220px;
  display: grid;
  place-items: center;
}
.box { @apply rounded; }
.mono { @apply bg-gray-950 text-green-300 font-mono text-sm p-3 rounded border border-gray-800 overflow-x-auto; }
</style>
