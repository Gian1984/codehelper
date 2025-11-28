<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">🔲 Border Radius Generator</h2>
      <div class="flex flex-wrap items-center gap-2">
        <button class="btn" @click="preset('pill')">Pill</button>
        <button class="btn" @click="preset('circle')">Circle</button>
        <button class="btn" @click="randomBlob">Random Blob</button>
        <button class="btn" @click="resetAll">Reset</button>
        <button class="btn-primary" @click="copy(cssLine)">Copy CSS</button>
        <button class="btn" @click="downloadCss">Download</button>
      </div>
    </div>

    <!-- Mode + Unit -->
    <div class="card flex flex-wrap items-center gap-3">
      <div class="flex gap-2">
        <button
            class="btn"
            :class="mode==='simple' ? '!bg-indigo-600' : ''"
            @click="mode='simple'">Simple Mode</button>
        <button
            class="btn"
            :class="mode==='advanced' ? '!bg-indigo-600' : ''"
            @click="mode='advanced'">Advanced Mode</button>
      </div>

      <div class="ml-auto flex items-center gap-2">
        <label class="label !mb-0 !block">Unit</label>
        <select v-model="unit" class="input w-24">
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
      </div>
    </div>

    <!-- SIMPLE -->
    <div v-if="mode==='simple'" class="grid md:grid-cols-2 gap-4">
      <div class="card space-y-4">
        <label class="label">Radius</label>
        <input type="range" :min="0" :max="unitMax" step="1" v-model.number="simple.radius" class="w-full slider" />
        <p class="font-mono text-sm text-gray-300 mt-1">{{ simple.radius }}{{ unit }}</p>

        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="simple.ellipse" class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500" />
          <span class="text-sm text-gray-300">Elliptical (different horizontal/vertical)</span>
        </label>

        <div v-if="simple.ellipse" class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Horizontal</label>
            <input type="range" :min="0" :max="unitMax" step="1" v-model.number="simple.h" class="w-full slider" />
            <p class="font-mono text-sm text-gray-300 mt-1">{{ simple.h }}{{ unit }}</p>
          </div>
          <div>
            <label class="label">Vertical</label>
            <input type="range" :min="0" :max="unitMax" step="1" v-model.number="simple.v" class="w-full slider" />
            <p class="font-mono text-sm text-gray-300 mt-1">{{ simple.v }}{{ unit }}</p>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between mb-3">
          <label class="label !mb-0 !block">Preview</label>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-300">Size</span>
            <input type="number" min="50" v-model.number="preview.w" class="input w-20" />
            <span class="text-gray-400">×</span>
            <input type="number" min="50" v-model.number="preview.h" class="input w-20" />
            <label class="inline-flex items-center gap-2 ml-2 cursor-pointer">
              <input type="checkbox" v-model="checker" class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500" />
              <span class="text-sm text-gray-300">Checkerboard</span>
            </label>
          </div>
        </div>

        <div class="preview" :style="{ background: checker ? checkerCss : 'transparent' }">
          <div class="box" :style="previewStyle"></div>
        </div>
      </div>
    </div>

    <!-- ADVANCED -->
    <div v-else class="grid xl:grid-cols-2 gap-4">
      <div class="card space-y-4">
        <div class="flex flex-wrap items-center gap-4">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="linkAllCorners" class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500" />
            <span class="text-sm text-gray-300">Link all corners</span>
          </label>
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="linkHV" :disabled="linkAllCorners" class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500" />
            <span class="text-sm text-gray-300">Link H/V per corner</span>
          </label>
        </div>

        <!-- all corners linked -->
        <div v-if="linkAllCorners" class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="label">Radius (all corners)</label>
            <input type="range" :min="0" :max="unitMax" v-model.number="all.h" class="w-full slider" />
            <input type="number" :min="0" :max="unitMax" v-model.number="all.h" class="input mt-1" />
          </div>
          <div v-if="!linkHV" class="space-y-2">
            <label class="label">Vertical (all corners)</label>
            <input type="range" :min="0" :max="unitMax" v-model.number="all.v" class="w-full slider" />
            <input type="number" :min="0" :max="unitMax" v-model.number="all.v" class="input mt-1" />
          </div>
        </div>

        <!-- per-corner -->
        <div v-else class="grid sm:grid-cols-2 gap-4">
          <div v-for="(c, key) in corners" :key="key" class="card !p-3 space-y-2">
            <p class="text-sm font-medium text-indigo-400 mb-2">{{ labelMap[key] }}</p>
            <div class="space-y-2">
              <div>
                <label class="label">Horizontal</label>
                <input type="range" :min="0" :max="unitMax" v-model.number="c.h" class="w-full slider" />
                <input type="number" :min="0" :max="unitMax" v-model.number="c.h" class="input mt-1" />
              </div>
              <div v-if="!linkHV">
                <label class="label">Vertical</label>
                <input type="range" :min="0" :max="unitMax" v-model.number="c.v" class="w-full slider" />
                <input type="number" :min="0" :max="unitMax" v-model.number="c.v" class="input mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview + Code -->
      <div class="space-y-4">
        <div class="card space-y-3">
          <div class="flex items-center justify-between mb-3">
            <label class="label !mb-0 !block">Preview</label>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-300">Size</span>
              <input type="number" min="50" v-model.number="preview.w" class="input w-20" />
              <span class="text-gray-400">×</span>
              <input type="number" min="50" v-model.number="preview.h" class="input w-20" />
              <label class="inline-flex items-center gap-2 ml-2 cursor-pointer">
                <input type="checkbox" v-model="checker" class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500" />
                <span class="text-sm text-gray-300">Checkerboard</span>
              </label>
            </div>
          </div>

          <div class="preview" :style="{ background: checker ? checkerCss : 'transparent' }">
            <div class="box" :style="previewStyle"></div>
          </div>
        </div>

        <div class="card space-y-3">
          <div class="flex items-center justify-between">
            <label class="label !mb-0 !block">Output</label>
            <div class="flex gap-2">
              <button class="btn text-xs" @click="copy(cssLine)">Copy CSS</button>
              <button class="btn text-xs" @click="copy(twLine)">Copy Tailwind</button>
            </div>
          </div>
          <pre class="mono">border-radius: {{ borderRadiusValue }};</pre>
          <p class="text-xs text-gray-400 mt-2">Tailwind (arbitrary): <code class="bg-gray-800 px-1 py-0.5 rounded">{{ twLine }}</code></p>
        </div>
      </div>
    </div>

    <!-- Simple mode output mirrored below -->
    <div v-if="mode==='simple'" class="card space-y-3">
      <div class="flex items-center justify-between">
        <label class="label !mb-0 !block">Output</label>
        <button class="btn text-xs" @click="copy(cssLine)">Copy CSS</button>
      </div>
      <pre class="mono">border-radius: {{ borderRadiusValue }};</pre>
      <p class="text-xs text-gray-400 mt-2">Tailwind: <code class="bg-gray-800 px-1 py-0.5 rounded">{{ twLine }}</code></p>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm text-center font-medium">✓ {{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

type Mode = 'simple' | 'advanced'
const mode = ref<Mode>('simple')

const unit = ref<'px' | '%'>('px')
const unitMax = computed(() => (unit.value === '%' ? 100 : 300))

// preview box
const preview = reactive({ w: 280, h: 220 })
const checker = ref(true)
const checkerCss = `repeating-conic-gradient(#1e2532 0% 25%, #0b1220 0% 50%) 0 / 16px 16px` /* Darkened checker */

/** SIMPLE */
const simple = reactive({ radius: 16, ellipse: false, h: 32, v: 20 })

/** ADVANCED */
const linkAllCorners = ref(true)
const linkHV = ref(true)
const all = reactive({ h: 24, v: 24 })
const corners = reactive({
  tl: { h: 24, v: 24 },
  tr: { h: 24, v: 24 },
  br: { h: 24, v: 24 },
  bl: { h: 24, v: 24 }
})
const labelMap: Record<'tl'|'tr'|'br'|'bl', string> = {
  tl: 'top-left', tr: 'top-right', br: 'bottom-right', bl: 'bottom-left'
}

// sync when linking all
watch([() => all.h, () => all.v, linkAllCorners, linkHV], () => {
  if (!linkAllCorners.value) return
  for (const k of ['tl', 'tr', 'br', 'bl'] as const) {
    corners[k].h = all.h
    corners[k].v = linkHV.value ? all.h : all.v
  }
}, { immediate: true })

/** shortest valid border-radius syntax */
const borderRadiusValue = computed(() => {
  const u = unit.value

  if (mode.value === 'simple') {
    if (!simple.ellipse) return `${simple.radius}${u}`
    const h = [simple.h, simple.h, simple.h, simple.h]
    const v = [simple.v, simple.v, simple.v, simple.v]
    return compressRadius(h, v, u)
  }

  const hArr = [corners.tl.h, corners.tr.h, corners.br.h, corners.bl.h]
  const vArr = [corners.tl.v, corners.tr.v, corners.br.v, corners.bl.v]
  return compressRadius(hArr, vArr, u)
})

/** helper to compress to 1-4 values, with optional slash part */
function compressRadius(h: number[], v: number[], u: string): string {
  const sameHV = h.every((n, i) => n === v[i])
  const hShort = compressFour(h).map(n => `${n}${u}`).join(' ')
  if (sameHV) return hShort
  const vShort = compressFour(v).map(n => `${n}${u}`).join(' ')
  return `${hShort} / ${vShort}`
}
/** standard 4-value compression: [a,b,c,d] → 1/2/3/4 tokens */
function compressFour(arr: number[]): number[] {
  const [a,b,c,d] = arr
  if (a === b && b === c && c === d) return [a]
  if (a === c && b === d) return [a, b]
  if (b === d) return [a, b, c]
  return [a, b, c, d]
}

/** preview */
const previewStyle = computed(() => ({
  width: `${preview.w}px`,
  height: `${preview.h}px`,
  background: 'linear-gradient(135deg, rgba(79,70,229,.7), rgba(236,72,153,.7))', /* Updated gradient */
  borderRadius: borderRadiusValue.value,
  boxShadow: '0 10px 25px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.08)' /* Darker shadow, subtle inner border */
} as Record<string, string>))

/** outputs */
const cssLine = computed(() => `border-radius: ${borderRadiusValue.value};`)
const twLine = computed(() => `rounded-[${borderRadiusValue.value.replace(/\s+/g, '_')}]`)

/** actions */
const copiedMsg = ref('')
function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1500)
}
function downloadCss() {
  const css = `.demo {\n  border-radius: ${borderRadiusValue.value};\n}\n`
  const blob = new Blob([css], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'border-radius.css'
  a.click()
  URL.revokeObjectURL(url)
}
function resetAll() {
  unit.value = 'px'
  mode.value = 'simple'
  Object.assign(simple, { radius: 16, ellipse: false, h: 32, v: 20 })
  linkAllCorners.value = true
  linkHV.value = true
  all.h = 24; all.v = 24
  for (const k of ['tl','tr','br','bl'] as const) { corners[k].h = 24; corners[k].v = 24 }
  preview.w = 280; preview.h = 220
}

/** presets */
function preset(name: 'pill'|'circle') {
  if (name === 'pill') {
    unit.value = 'px'
    mode.value = 'simple'
    simple.ellipse = false
    simple.radius = 9999
  } else {
    unit.value = '%'
    mode.value = 'simple'
    simple.ellipse = false
    simple.radius = 50
    const s = Math.min(preview.w, preview.h)
    preview.w = s; preview.h = s
  }
}
function randomBlob() {
  unit.value = '%'
  mode.value = 'advanced'
  linkAllCorners.value = false
  linkHV.value = false
  const r = (min: number, max: number) => Math.round(min + Math.random() * (max - min))
  corners.tl.h = r(20, 80); corners.tl.v = r(20, 80)
  corners.tr.h = r(20, 80); corners.tr.v = r(20, 80)
  corners.br.h = r(20, 80); corners.br.v = r(20, 80)
  corners.bl.h = r(20, 80); corners.bl.v = r(20, 80)
}

/** persistence */
const KEY = 'border-radius-studio'
watch(
    [mode, unit, () => ({...simple}), () => ({...all}), () => ({...corners}), () => ({...preview}), linkAllCorners, linkHV],
    () => {
      try {
        localStorage.setItem(KEY, JSON.stringify({
          mode: mode.value, unit: unit.value, simple, all, corners, preview, linkAllCorners: linkAllCorners.value, linkHV: linkHV.value
        }))
      } catch {}
    },
    { deep: true }
)
onMounted(() => {
  try {
    const raw = localStorage.getItem(KEY); if (!raw) return
    const s = JSON.parse(raw)
    if (s?.mode) mode.value = s.mode
    if (s?.unit) unit.value = s.unit
    if (s?.simple) Object.assign(simple, s.simple)
    if (s?.all) Object.assign(all, s.all)
    if (s?.corners) Object.assign(corners, s.corners)
    if (s?.preview) Object.assign(preview, s.preview)
    if (typeof s?.linkAllCorners === 'boolean') linkAllCorners.value = s.linkAllCorners
    if (typeof s?.linkHV === 'boolean') linkHV.value = s.linkHV
  } catch {}
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

/* Custom styles for BorderRadiusGenerator */
.corner { /* Card style for individual corners in advanced mode */
  @apply bg-gray-900 rounded-xl p-4 border border-gray-700;
}
.preview {
  @apply rounded-lg p-8 border border-gray-700 grid place-items-center bg-black; /* Darkened bg */
  min-height: 220px;
}
.box {
  @apply rounded-lg; /* Rounded for consistency */
}
.mono {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto; /* New mono style */
}
.mono-small {
  @apply font-mono text-xs text-gray-400; /* New mono small style */
}
.slider {
  @apply appearance-none h-2 rounded-full bg-gray-700;
}
.slider::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 rounded-full bg-indigo-500 cursor-pointer;
}
.slider::-moz-range-thumb {
  @apply w-4 h-4 rounded-full bg-indigo-500 cursor-pointer border-0;
}

</style>