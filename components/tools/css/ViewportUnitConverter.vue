<template>
  <div class="space-y-5 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">📐 Viewport Unit Converter</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="resetAll">🔄 Reset</button>
      </div>
    </div>

    <!-- Mode, Unit, Decimals -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card space-y-2">
        <h3 class="label">🔀 Conversion Mode</h3>
        <select v-model="mode" class="input">
          <option value="px-to-unit">px → viewport unit</option>
          <option value="unit-to-px">viewport unit → px</option>
        </select>
      </div>

      <div class="card space-y-2">
        <h3 class="label">📏 Unit Type</h3>
        <select v-model="unitType" class="input">
          <optgroup label="Viewport Units">
            <option value="vw">vw (viewport width)</option>
            <option value="vh">vh (viewport height)</option>
            <option value="vmin">vmin (smaller dimension)</option>
            <option value="vmax">vmax (larger dimension)</option>
          </optgroup>
          <optgroup label="Small Viewport">
            <option value="svw">svw (small viewport width)</option>
            <option value="svh">svh (small viewport height)</option>
            <option value="svmin">svmin (small vmin)</option>
            <option value="svmax">svmax (small vmax)</option>
          </optgroup>
          <optgroup label="Large Viewport">
            <option value="lvw">lvw (large viewport width)</option>
            <option value="lvh">lvh (large viewport height)</option>
            <option value="lvmin">lvmin (large vmin)</option>
            <option value="lvmax">lvmax (large vmax)</option>
          </optgroup>
          <optgroup label="Dynamic Viewport">
            <option value="dvw">dvw (dynamic viewport width)</option>
            <option value="dvh">dvh (dynamic viewport height)</option>
            <option value="dvmin">dvmin (dynamic vmin)</option>
            <option value="dvmax">dvmax (dynamic vmax)</option>
          </optgroup>
          <optgroup label="Container Query">
            <option value="cqw">cqw (container query width)</option>
            <option value="cqh">cqh (container query height)</option>
            <option value="cqi">cqi (container query inline)</option>
            <option value="cqb">cqb (container query block)</option>
            <option value="cqmin">cqmin (container query min)</option>
            <option value="cqmax">cqmax (container query max)</option>
          </optgroup>
        </select>
        <p class="text-xs text-gray-400">{{ unitDescription }}</p>
      </div>

      <div class="card space-y-2">
        <h3 class="label">🔢 Decimals</h3>
        <input type="number" min="0" max="6" v-model.number="decimals" class="input" />
        <label class="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="autoFromWindow" />
          <span class="text-sm text-gray-300">Auto-use current window</span>
        </label>
      </div>
    </div>

    <!-- Viewport Dimensions -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <h3 class="label">🖥️ {{ isContainerUnit ? 'Container' : 'Viewport' }} Dimensions</h3>
        <div class="flex gap-2 flex-wrap">
          <select v-model="preset" class="input w-56" @change="applyPreset">
            <option value="">— device presets —</option>
            <option v-for="p in PRESETS" :key="p.w+'x'+p.h" :value="p.w+'x'+p.h">{{ p.label }}</option>
          </select>
          <button class="btn" @click="swapDimensions">↔️ Swap</button>
          <button class="btn" @click="useCurrent" v-if="!isContainerUnit">📱 Use Current</button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">{{ isContainerUnit ? 'Container' : 'Viewport' }} width (px)</label>
          <input type="number" min="1" v-model.number="vpW" class="input" />
        </div>
        <div>
          <label class="label">{{ isContainerUnit ? 'Container' : 'Viewport' }} height (px)</label>
          <input type="number" min="1" v-model.number="vpH" class="input" />
        </div>
      </div>
    </div>

    <!-- Single Conversion -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Input -->
      <div class="card space-y-3">
        <h3 class="label">📝 Input Value</h3>
        <div v-if="mode === 'px-to-unit'">
          <label class="label">Size in Pixels</label>
          <input type="number" min="0" v-model.number="pxInput" class="input" />
        </div>
        <div v-else>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="label">Size in {{ unitType }}</label>
              <input type="number" min="0" v-model.number="unitInput" class="input" />
            </div>
            <div>
              <label class="label">Unit (readonly)</label>
              <input :value="unitType" readonly class="input !bg-gray-700 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label class="label">CSS Property</label>
          <select v-model="cssProp" class="input">
            <option>width</option>
            <option>height</option>
            <option>font-size</option>
            <option>margin</option>
            <option>padding</option>
            <option>gap</option>
            <option>top</option>
            <option>left</option>
          </select>
        </div>
      </div>

      <!-- Output -->
      <div class="card space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="label">✨ Result</h3>
          <div class="flex gap-2">
            <button class="btn" @click="copyResult" :disabled="!resultSnippet">📋 Copy</button>
            <button class="btn" @click="copyNumber" :disabled="!resultNumber">🔢 Copy Number</button>
          </div>
        </div>

        <div v-if="validConversion" class="mono-box">
          {{ resultSnippet }}
        </div>
        <div v-else class="warn">⚠️ Enter valid dimensions and value</div>

        <details v-if="validConversion">
          <summary class="cursor-pointer text-sm text-gray-300 hover:text-white">💡 Quick Snippets</summary>
          <div class="grid grid-cols-2 gap-2 mt-3">
            <div v-for="prop in quickProps" :key="prop" class="mono-box !p-2 !text-xs">
              {{ prop }}: {{ resultNumber }}{{ mode === 'px-to-unit' ? unitType : 'px' }};
            </div>
          </div>
        </details>
      </div>
    </div>

    <!-- Batch Conversion -->
    <div class="card space-y-4">
      <h3 class="label">📦 Batch Conversion</h3>
      <p class="text-sm text-gray-400">Enter multiple values (one per line or comma-separated)</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="label">Input values ({{ mode === 'px-to-unit' ? 'px' : unitType }})</label>
          <textarea v-model="batchInput" class="input min-h-[120px] font-mono" placeholder="16, 24, 32, 48, 64"></textarea>
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="label !mb-0 !block">Converted Output</label>
            <button class="btn text-xs" @click="copyBatchOutput" :disabled="!batchOutput">📋 Copy All</button>
          </div>
          <div class="mono-box min-h-[120px] !text-xs !p-2">
            <div v-if="batchOutput">
              <div v-for="(line, i) in batchOutputLines" :key="i">{{ line }}</div>
            </div>
            <div v-else class="text-gray-500">Results will appear here...</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fluid Clamp Generator -->
    <div class="card space-y-4">
      <h3 class="label">🎯 Fluid clamp() Generator</h3>
      <p class="text-sm text-gray-400">Create responsive values that scale between breakpoints</p>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div>
          <label class="label">Min Viewport (px)</label>
          <input type="number" min="1" v-model.number="clampMinVp" class="input" />
        </div>
        <div>
          <label class="label">Max Viewport (px)</label>
          <input type="number" min="1" v-model.number="clampMaxVp" class="input" />
        </div>
        <div>
          <label class="label">Min Size (px)</label>
          <input type="number" min="0" v-model.number="clampMinSize" class="input" />
        </div>
        <div>
          <label class="label">Max Size (px)</label>
          <input type="number" min="0" v-model.number="clampMaxSize" class="input" />
        </div>
        <div>
          <label class="label">Property</label>
          <select v-model="clampProp" class="input">
            <option>width</option>
            <option>height</option>
            <option>font-size</option>
            <option>padding</option>
            <option>margin</option>
            <option>gap</option>
          </select>
        </div>
      </div>

      <div v-if="clampSnippet" class="mono-box">
        {{ clampSnippet }}
      </div>

      <div class="flex gap-2 flex-wrap">
        <button class="btn" @click="copyClamp" :disabled="!clampSnippet">📋 Copy Clamp</button>
        <button class="btn" @click="useCurrentAsMax">📌 Use Current As Max</button>
        <button class="btn" @click="loadCommonBreakpoints('mobile-desktop')">📱 Mobile → Desktop</button>
        <button class="btn" @click="loadCommonBreakpoints('tablet-desktop')">💻 Tablet → Desktop</button>
      </div>

      <p class="text-xs text-gray-400">
        Formula: <code class="bg-gray-800 px-1 py-0.5 rounded">{{ `clamp(min, calc(slope × 100vw + intercept), max)` }}</code>
      </p>
    </div>

    <!-- Info Footer -->
    <div class="card space-y-2 text-xs text-gray-400">
      <p><strong class="text-indigo-400">💡 Tip:</strong> {{ currentTip }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <p><strong>Viewport units:</strong> Based on browser viewport (vw, vh, vmin, vmax)</p>
        <p><strong>Small viewport:</strong> Smallest possible viewport (mobile with UI visible)</p>
        <p><strong>Large viewport:</strong> Largest possible viewport (mobile with UI hidden)</p>
        <p><strong>Dynamic viewport:</strong> Adjusts as browser UI appears/disappears</p>
        <p><strong>Container query:</strong> Based on container size, not viewport</p>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm text-center font-medium">✅ {{ copiedMsg }}</p>
    <!-- Related Tools -->
    <RelatedTools />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

/* -------------------- Presets -------------------- */
const PRESETS = [
  { label: '📱 iPhone SE - 375×667', w: 375, h: 667 },
  { label: '📱 iPhone 12/13 - 390×844', w: 390, h: 844 },
  { label: '📱 iPhone 14 Pro - 393×852', w: 393, h: 852 },
  { label: '📱 iPhone 14 Pro Max - 430×932', w: 430, h: 932 },
  { label: '📱 Samsung Galaxy S21 - 360×800', w: 360, h: 800 },
  { label: '📱 Pixel 7 - 412×915', w: 412, h: 915 },
  { label: '📟 iPad Mini - 768×1024', w: 768, h: 1024 },
  { label: '📟 iPad Air - 820×1180', w: 820, h: 1180 },
  { label: '📟 iPad Pro 11" - 834×1194', w: 834, h: 1194 },
  { label: '📟 iPad Pro 12.9" - 1024×1366', w: 1024, h: 1366 },
  { label: '💻 Laptop 13" - 1280×800', w: 1280, h: 800 },
  { label: '💻 Laptop 15" - 1440×900', w: 1440, h: 900 },
  { label: '💻 MacBook Air - 1280×832', w: 1280, h: 832 },
  { label: '💻 MacBook Pro 14" - 1512×982', w: 1512, h: 982 },
  { label: '💻 MacBook Pro 16" - 1728×1117', w: 1728, h: 1117 },
  { label: '🖥️ Desktop HD - 1920×1080', w: 1920, h: 1080 },
  { label: '🖥️ Desktop 2K - 2560×1440', w: 2560, h: 1440 },
  { label: '🖥️ Desktop 4K - 3840×2160', w: 3840, h: 2160 },
] as const

type Mode = 'px-to-unit' | 'unit-to-px'
type UnitType = 'vw' | 'vh' | 'vmin' | 'vmax' | 'svw' | 'svh' | 'svmin' | 'svmax' |
                'lvw' | 'lvh' | 'lvmin' | 'lvmax' | 'dvw' | 'dvh' | 'dvmin' | 'dvmax' |
                'cqw' | 'cqh' | 'cqi' | 'cqb' | 'cqmin' | 'cqmax'

/* -------------------- State -------------------- */
const mode = ref<Mode>('px-to-unit')
const unitType = ref<UnitType>('vw')
const decimals = ref<number>(4)
const autoFromWindow = ref<boolean>(false)

const vpW = ref<number>(1920)
const vpH = ref<number>(1080)
const preset = ref<string>('')

const pxInput = ref<number>(192)
const unitInput = ref<number>(10)
const cssProp = ref<string>('width')

const batchInput = ref<string>('')

// Clamp
const clampMinVp = ref<number>(375)
const clampMaxVp = ref<number>(1920)
const clampMinSize = ref<number>(16)
const clampMaxSize = ref<number>(64)
const clampProp = ref<string>('font-size')

const copiedMsg = ref<string>('')

/* -------------------- Computed -------------------- */
const isContainerUnit = computed(() => unitType.value.startsWith('cq'))

const unitDescription = computed(() => {
  const descriptions: Record<UnitType, string> = {
    vw: 'Classic viewport width (1vw = 1% of viewport width)',
    vh: 'Classic viewport height (1vh = 1% of viewport height)',
    vmin: 'Smaller of vw or vh',
    vmax: 'Larger of vw or vh',
    svw: 'Small viewport width (mobile with UI visible)',
    svh: 'Small viewport height (mobile with UI visible)',
    svmin: 'Smaller of svw or svh',
    svmax: 'Larger of svw or svh',
    lvw: 'Large viewport width (mobile with UI hidden)',
    lvh: 'Large viewport height (mobile with UI hidden)',
    lvmin: 'Smaller of lvw or lvh',
    lvmax: 'Larger of lvw or lvh',
    dvw: 'Dynamic viewport width (adjusts with browser UI)',
    dvh: 'Dynamic viewport height (adjusts with browser UI)',
    dvmin: 'Smaller of dvw or dvh',
    dvmax: 'Larger of dvw or dvh',
    cqw: 'Container query width (1% of container width)',
    cqh: 'Container query height (1% of container height)',
    cqi: 'Container query inline size',
    cqb: 'Container query block size',
    cqmin: 'Smaller of cqi or cqb',
    cqmax: 'Larger of cqi or cqb',
  }
  return descriptions[unitType.value]
})

const currentTip = computed(() => {
  const tips = [
    'Use vw for widths, vh for heights, vmin/vmax for responsive squares',
    'dvh is perfect for mobile - it adjusts when the browser UI appears/disappears',
    'Container queries are great for component-based responsive design',
    'Fluid clamp() creates smooth responsive scaling without media queries',
    'Small viewport units (svh) ensure content fits when mobile UI is visible',
  ]
  return tips[Math.floor(Math.random() * tips.length)]
})

const quickProps = ['width', 'height', 'font-size', 'margin', 'padding', 'gap']

const validConversion = computed(() => {
  const vpOk = Number.isFinite(vpW.value) && vpW.value > 0 &&
               Number.isFinite(vpH.value) && vpH.value > 0
  const valueOk = mode.value === 'px-to-unit'
    ? Number.isFinite(pxInput.value) && pxInput.value >= 0
    : Number.isFinite(unitInput.value) && unitInput.value >= 0
  return vpOk && valueOk
})

// Get denominator for unit calculation
function getDenominator(unit: UnitType, w: number, h: number): number {
  const base = unit.replace(/^[sdlc]/, '').replace(/^cq/, '')

  switch (base) {
    case 'vw': case 'w': case 'i': return w
    case 'vh': case 'h': case 'b': return h
    case 'vmin': case 'min': return Math.min(w, h)
    case 'vmax': case 'max': return Math.max(w, h)
    default: return w
  }
}

const resultNumber = computed(() => {
  if (!validConversion.value) return ''

  const denom = getDenominator(unitType.value, vpW.value, vpH.value)

  if (mode.value === 'px-to-unit') {
    const result = (pxInput.value / denom) * 100
    return String(round(result, decimals.value))
  } else {
    const result = (unitInput.value / 100) * denom
    return String(round(result, decimals.value))
  }
})

const resultSnippet = computed(() => {
  if (!validConversion.value) return ''

  if (mode.value === 'px-to-unit') {
    return `${cssProp.value}: ${resultNumber.value}${unitType.value};`
  } else {
    return `${cssProp.value}: ${resultNumber.value}px;`
  }
})

// Batch conversion
const batchOutput = computed(() => {
  if (!validConversion.value || !batchInput.value.trim()) return ''

  const values = batchInput.value
    .split(/[\n,]/)
    .map(v => v.trim())
    .filter(v => v && !isNaN(Number(v)))
    .map(v => Number(v))

  if (values.length === 0) return ''

  const denom = getDenominator(unitType.value, vpW.value, vpH.value)

  const results = values.map(val => {
    if (mode.value === 'px-to-unit') {
      const result = (val / denom) * 100
      return `${val}px = ${round(result, decimals.value)}${unitType.value}`
    } else {
      const result = (val / 100) * denom
      return `${val}${unitType.value} = ${round(result, decimals.value)}px`
    }
  })

  return results.join('\n')
})

const batchOutputLines = computed(() => {
  return batchOutput.value ? batchOutput.value.split('\n') : []
})

// Clamp snippet
const clampSnippet = computed(() => {
  if (![clampMinVp.value, clampMaxVp.value].every(n => Number.isFinite(n) && n > 0)) return ''
  if (![clampMinSize.value, clampMaxSize.value].every(n => Number.isFinite(n) && n >= 0)) return ''
  if (clampMaxVp.value === clampMinVp.value) return ''

  const slope = (clampMaxSize.value - clampMinSize.value) / (clampMaxVp.value - clampMinVp.value)
  const slopeVw = slope * 100
  const intercept = clampMinSize.value - slope * clampMinVp.value

  const minPx = fmt(clampMinSize.value)
  const maxPx = fmt(clampMaxSize.value)
  const slopeStr = fmt(slopeVw)
  const interceptStr = fmt(intercept)

  return `${clampProp.value}: clamp(${minPx}px, calc(${slopeStr}vw + ${interceptStr}px), ${maxPx}px);`
})

/* -------------------- Actions -------------------- */
function round(n: number, d: number): number {
  const f = Math.pow(10, d)
  return Math.round(n * f) / f
}

function fmt(n: number): string {
  return String(round(n, decimals.value))
}

function toast(msg: string) {
  copiedMsg.value = msg
  setTimeout(() => (copiedMsg.value = ''), 1500)
}

async function copyResult() {
  if (!resultSnippet.value) return
  await navigator.clipboard.writeText(resultSnippet.value)
  toast('Copied result!')
}

async function copyNumber() {
  if (!resultNumber.value) return
  await navigator.clipboard.writeText(resultNumber.value)
  toast('Copied number!')
}

async function copyBatchOutput() {
  if (!batchOutput.value) return
  await navigator.clipboard.writeText(batchOutput.value)
  toast('Copied batch output!')
}

async function copyClamp() {
  if (!clampSnippet.value) return
  await navigator.clipboard.writeText(clampSnippet.value)
  toast('Copied clamp!')
}

function applyPreset() {
  if (!preset.value) return
  const [w, h] = preset.value.split('x').map(Number)
  if (Number.isFinite(w) && Number.isFinite(h)) {
    vpW.value = w
    vpH.value = h
  }
}

function swapDimensions() {
  const temp = vpW.value
  vpW.value = vpH.value
  vpH.value = temp
}

function useCurrent() {
  if (typeof window === 'undefined') return
  vpW.value = Math.max(1, Math.round(window.innerWidth))
  vpH.value = Math.max(1, Math.round(window.innerHeight))
  toast('Using current window dimensions')
}

function useCurrentAsMax() {
  if (!validConversion.value) return
  clampMaxSize.value = mode.value === 'px-to-unit'
    ? Number(pxInput.value)
    : Number(resultNumber.value)
}

function loadCommonBreakpoints(type: 'mobile-desktop' | 'tablet-desktop') {
  if (type === 'mobile-desktop') {
    clampMinVp.value = 375
    clampMaxVp.value = 1920
  } else {
    clampMinVp.value = 768
    clampMaxVp.value = 1920
  }
  toast(`Loaded ${type} breakpoints`)
}

function resetAll() {
  mode.value = 'px-to-unit'
  unitType.value = 'vw'
  decimals.value = 4
  vpW.value = 1920
  vpH.value = 1080
  pxInput.value = 192
  unitInput.value = 10
  preset.value = ''
  batchInput.value = ''
  clampMinVp.value = 375
  clampMaxVp.value = 1920
  clampMinSize.value = 16
  clampMaxSize.value = 64
  autoFromWindow.value = false
  toast('Reset to defaults')
}

/* -------------------- Persistence -------------------- */
const KEY = 'viewport-unit-converter'

watch(
  [mode, unitType, decimals, vpW, vpH, pxInput, unitInput, cssProp,
   clampMinVp, clampMaxVp, clampMinSize, clampMaxSize, clampProp, autoFromWindow],
  () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        mode: mode.value,
        unitType: unitType.value,
        decimals: decimals.value,
        vpW: vpW.value,
        vpH: vpH.value,
        pxInput: pxInput.value,
        unitInput: unitInput.value,
        cssProp: cssProp.value,
        clampMinVp: clampMinVp.value,
        clampMaxVp: clampMaxVp.value,
        clampMinSize: clampMinSize.value,
        clampMaxSize: clampMaxSize.value,
        clampProp: clampProp.value,
        autoFromWindow: autoFromWindow.value,
      }))
    } catch {}
  },
  { deep: true }
)

onMounted(() => {
  // Load from localStorage
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (s?.mode) mode.value = s.mode
      if (s?.unitType) unitType.value = s.unitType
      if (Number.isFinite(s?.decimals)) decimals.value = s.decimals
      if (Number.isFinite(s?.vpW)) vpW.value = s.vpW
      if (Number.isFinite(s?.vpH)) vpH.value = s.vpH
      if (Number.isFinite(s?.pxInput)) pxInput.value = s.pxInput
      if (Number.isFinite(s?.unitInput)) unitInput.value = s.unitInput
      if (s?.cssProp) cssProp.value = s.cssProp
      if (Number.isFinite(s?.clampMinVp)) clampMinVp.value = s.clampMinVp
      if (Number.isFinite(s?.clampMaxVp)) clampMaxVp.value = s.clampMaxVp
      if (Number.isFinite(s?.clampMinSize)) clampMinSize.value = s.clampMinSize
      if (Number.isFinite(s?.clampMaxSize)) clampMaxSize.value = s.clampMaxSize
      if (s?.clampProp) clampProp.value = s.clampProp
      if (typeof s?.autoFromWindow === 'boolean') autoFromWindow.value = s.autoFromWindow
    }
  } catch {}

  // Auto-use current window if enabled
  if (autoFromWindow.value) {
    useCurrent()
  }
})
</script>

<style scoped>
.label {
  @apply text-sm font-medium text-gray-300 block mb-2;
}
.sub {
  @apply block text-[10px] text-gray-400 mb-1 uppercase tracking-wide;
}
.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}
/* Specific override for select elements to ensure padding consistency */
select.input {
  @apply appearance-none;
  padding-right: 2.5rem; /* Space for custom arrow if needed, or native arrow */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
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
.warn {
  @apply text-sm text-yellow-300 bg-yellow-900/20 p-2 rounded-lg border border-yellow-700;
}
/* Checkbox styles */
input[type="checkbox"] {
  @apply w-4 h-4 rounded border-gray-600 bg-gray-900 text-indigo-600 focus:ring-indigo-500;
}
/* Textarea resize */
textarea.input {
  @apply resize-y;
}
code {
  @apply bg-gray-800 px-1 py-0.5 rounded text-xs;
}
</style>
