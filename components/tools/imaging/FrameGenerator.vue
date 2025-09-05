<template>
  <div class="bg-gray-800 text-gray-100 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h2 class="text-2xl font-semibold">Aspect Ratio Matte Generator</h2>
      </div>
      <div class="flex items-center gap-2">
        <button
            class="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
            @click="swapWH"
            aria-label="swap width and height"
        >
          swap w/h
        </button>
        <button
            class="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
            @click="resetDefaults"
        >
          reset
        </button>
      </div>
    </div>

    <!-- grid inputs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <!-- width -->
      <label class="block">
        <span class="text-gray-300">width (px)</span>
        <input
            v-model.number="width"
            type="number"
            :min="MIN_W"
            :max="MAX_W"
            step="1"
            class="mt-1 text-black w-full px-3 py-2 rounded-md border border-gray-300"
            @blur="clampDims"
        />
      </label>

      <!-- height -->
      <label class="block">
        <span class="text-gray-300">height (px)</span>
        <input
            v-model.number="height"
            type="number"
            :min="MIN_H"
            :max="MAX_H"
            step="1"
            class="mt-1 text-black w-full px-3 py-2 rounded-md border border-gray-300"
            @blur="clampDims"
        />
      </label>

      <!-- ratio preset + custom -->
      <div class="sm:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <label class="block">
          <span class="text-gray-300">target aspect ratio</span>
          <div class="mt-1 grid grid-cols-[1fr,auto] gap-2">
            <input
                v-model.number="targetRatio"
                type="number"
                step="0.01"
                class="text-black w-full px-3 py-2 rounded-md border border-gray-300"
                @blur="clampRatio"
            />
            <select
                class="text-black px-3 py-2 rounded-md border border-gray-300"
                v-model="presetKey"
                @change="applyPreset"
            >
              <option disabled value="">presets</option>
              <option v-for="p in ratioPresets" :key="p.key" :value="p.key">
                {{ p.label }} ({{ p.value }})
              </option>
            </select>
          </div>
        </label>

        <!-- mode -->
        <label class="block">
          <span class="text-gray-300">render mode</span>
          <select
              v-model="renderMode"
              class="mt-1 text-black w-full px-3 py-2 rounded-md border border-gray-300"
          >
            <option value="hole">transparent center + opaque bars</option>
            <option value="solid">opaque full frame</option>
          </select>
        </label>
      </div>

      <!-- bg color -->
      <label class="block">
        <span class="text-gray-300">bar/background color</span>
        <div class="mt-1 flex items-center gap-2">
          <input v-model="bgColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
          <input
              v-model="bgColor"
              type="text"
              maxlength="7"
              class="text-black px-3 py-2 rounded-md border border-gray-300 w-36"
              @blur="normalizeHex('bg')"
          />
        </div>
      </label>

      <!-- text color -->
      <label class="block">
        <span class="text-gray-300">text color</span>
        <div class="mt-1 flex items-center gap-2">
          <input v-model="textColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
          <input
              v-model="textColor"
              type="text"
              maxlength="7"
              class="text-black px-3 py-2 rounded-md border border-gray-300 w-36"
              @blur="normalizeHex('text')"
          />
        </div>
      </label>

      <!-- watermark & filename -->
      <div class="sm:col-span-2 grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 items-end">
        <label class="block">
          <span class="text-gray-300">center label (optional)</span>
          <input
              v-model="centerLabel"
              type="text"
              placeholder="es. 1920x1080 • 2.35:1"
              class="mt-1 text-black w-full px-3 py-2 rounded-md border border-gray-300"
          />
        </label>

        <div class="flex items-center gap-3">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="showLabel" class="w-4 h-4" />
            <span class="text-gray-300">show label</span>
          </label>
          <button
              class="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
              @click="copyLabel"
          >
            copy label
          </button>
        </div>
      </div>
    </div>

    <!-- live facts -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
      <div class="bg-gray-800/70 rounded-xl p-3">
        <div class="text-gray-400">computed ratio</div>
        <div class="font-medium">{{ computedRatio.toFixed(3) }} : 1</div>
      </div>
      <div class="bg-gray-800/70 rounded-xl p-3">
        <div class="text-gray-400">usable (transparent) height</div>
        <div class="font-medium">{{ targetHeight | 0 }} px</div>
      </div>
      <div class="bg-gray-800/70 rounded-xl p-3">
        <div class="text-gray-400">bar thickness (each)</div>
        <div class="font-medium">{{ topBar | 0 }} px</div>
      </div>
    </div>

    <!-- preview -->
    <section>
      <h3 class="text-lg font-medium mb-2">preview</h3>
      <div class="relative rounded-xl overflow-hidden ring-1 ring-gray-800 bg-[conic-gradient(at_0_0,transparent_25%,#111_0)_,conic-gradient(at_10px_10px,transparent_25%,#111_0)] [background-position:0_0,10px_10px] [background-size:20px_20px] p-4">
        <img
            v-if="preview"
            :src="preview"
            :alt="`matte ${width}x${height}`"
            class="mx-auto block max-h-[60vh] rounded-lg shadow"
        />
        <div v-else class="text-center text-gray-400 py-10">nessuna anteprima ancora…</div>
      </div>
    </section>

    <!-- actions -->
    <div class="flex flex-wrap items-center gap-3">
      <button
          class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white"
          @click="downloadImage"
      >
        download png
      </button>
      <button
          class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white"
          @click="renderNow"
      >
        refresh preview
      </button>
      <span class="text-xs text-gray-400">filename: {{ suggestedFilename }}</span>
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
  { key: 'academy', label: 'academy (4:3)', value: 4/3 },
  { key: 'europe',  label: '1.66:1',        value: 1.66 },
  { key: 'flat',    label: 'flat (1.85:1)', value: 1.85 },
  { key: 'hdtv',    label: '16:9',          value: 16/9 },
  { key: '2.00',    label: 'univisium (2.00:1)', value: 2.0 },
  { key: 'scope',   label: 'scope (2.35:1)', value: 2.35 },
  { key: '239',     label: 'scope (2.39:1)', value: 2.39 },
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
canvas.hidden { display: none; }

/* checkerboard bg handled inline; no extra styles here */
</style>

