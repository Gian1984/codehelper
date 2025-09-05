<template>
  <div class="space-y-5 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-gray-100">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">CSS Clip-Path Maker</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="undo" :disabled="!canUndo" title="Undo (Ctrl/⌘+Z)">undo</button>
        <button class="btn" @click="redo" :disabled="!canRedo" title="Redo (Ctrl/⌘+Y)">redo</button>
        <button class="btn-warning" @click="resetAll">reset</button>
      </div>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- shape / points -->
      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="label">preset</span>
            <select v-model="presetKey" @change="applyPreset" class="input">
              <option value="custom">custom</option>
              <option v-for="p in presets" :key="p.key" :value="p.key">{{ p.label }}</option>
            </select>
          </label>
          <label class="block">
            <span class="label">points</span>
            <input v-model.number="pointCount" @change="generateRegular(pointCount)" type="number" min="3" max="20" class="input" />
          </label>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="btn" @click="addPointMid">add point</button>
          <button class="btn" @click="removeSelected" :disabled="selectedIndex===null">remove selected</button>
          <button class="btn" @click="reversePoints" :disabled="points.length<3">reverse order</button>
        </div>

        <label class="block">
          <span class="label">roundness</span>
          <input v-model.number="roundness" type="range" min="0" max="20" step="1" class="w-full" />
          <div class="text-xs text-gray-400">{{ roundness }}%</div>
        </label>
      </div>

      <!-- canvas options -->
      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="label">image url</span>
            <input v-model="imageUrl" class="input" placeholder="https://…" />
          </label>
          <label class="block">
            <span class="label">upload</span>
            <input type="file" accept="image/*" class="input" @change="onFile" />
          </label>
        </div>

        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="label">fit</span>
            <select v-model="objectFit" class="input">
              <option value="cover">cover</option>
              <option value="contain">contain</option>
            </select>
          </label>
          <label class="block">
            <span class="label">canvas size</span>
            <select v-model="canvasSize" class="input">
              <option v-for="s in ['sm','md','lg']" :key="s" :value="s">{{ s }}</option>
            </select>
          </label>
        </div>

        <div class="flex flex-wrap gap-3">
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="showGrid" class="w-4 h-4" /><span class="text-sm">grid</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="snapToGrid" class="w-4 h-4" /><span class="text-sm">snap</span></label>
          <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="showMask" class="w-4 h-4" /><span class="text-sm">darken outside</span></label>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-300">step</span>
            <select v-model.number="gridStep" class="input w-24">
              <option v-for="n in [2,4,5,10]" :key="n" :value="n">{{ n }}%</option>
            </select>
          </div>
        </div>
      </div>

      <!-- export / import -->
      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="label">units</span>
            <select v-model="exportUnit" class="input">
              <option value="%">%</option>
              <option value="px">px</option>
            </select>
          </label>
          <label class="block">
            <span class="label">copy</span>
            <button class="btn-primary w-full" @click="copyCss">copy css</button>
          </label>
        </div>

        <div class="text-xs text-gray-400">
          <div class="font-mono bg-gray-950 border border-gray-800 rounded p-2 overflow-x-auto">
            <div>clip-path: {{ cssValue }};</div>
            <div>-webkit-clip-path: {{ cssValue }};</div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block">
            <span class="label">import clip-path</span>
            <input v-model="importString" class="input" placeholder="clip-path: polygon(…);" />
          </label>
          <div class="flex gap-2">
            <button class="btn" @click="importClipPath">import</button>
            <span v-if="copiedMessage" class="text-green-400 text-xs self-center">{{ copiedMessage }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Canvas -->
    <div
        ref="stage"
        class="relative mx-auto border border-gray-800 rounded overflow-hidden bg-black/50"
        :class="canvasClass"
        @pointerdown="onStagePointerDown"
        @pointerup="onStagePointerUp"
        @pointermove="onStagePointerMove"
    >
      <!-- overlay (outside area) -->
      <div
          v-if="showMask"
          class="absolute inset-0 pointer-events-none"
          :style="{ clipPath: polygonCss(true), backgroundColor: 'rgba(0,0,0,0.45)' }"
      ></div>

      <!-- image -->
      <img
          :src="imageUrl"
          alt="preview"
          class="w-full h-full select-none"
          :style="{ objectFit, clipPath: polygonCss(false) }"
          draggable="false"
      />

      <!-- grid -->
      <svg v-if="showGrid" class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" :width="gridPx" :height="gridPx" patternUnits="userSpaceOnUse">
            <path :d="`M ${gridPx} 0 L 0 0 0 ${gridPx}`" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <!-- segments -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <polyline :points="pointsSvg" fill="none" stroke="rgba(16,185,129,0.65)" stroke-width="2" />
      </svg>

      <!-- draggable points -->
      <button
          v-for="(p, i) in points"
          :key="i"
          class="handle"
          :class="i===selectedIndex ? 'ring-2 ring-white scale-110' : 'opacity-90'"
          :style="handleStyle(p)"
          @pointerdown.stop="onHandlePointerDown(i, $event)"
          aria-label="handle"
      />
    </div>

    <!-- Points table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-gray-400">
          <tr><th class="text-left p-2">#</th><th class="text-left p-2">x (%)</th><th class="text-left p-2">y (%)</th><th class="p-2">actions</th></tr>
          </thead>
          <tbody>
          <tr v-for="(p,i) in points" :key="`row-${i}`" :class="i===selectedIndex ? 'bg-gray-800/60' : ''">
            <td class="p-2">{{ i+1 }}</td>
            <td class="p-2"><input class="input w-24" type="number" step="0.1" min="0" max="100" v-model.number="points[i].x" @change="commit()" /></td>
            <td class="p-2"><input class="input w-24" type="number" step="0.1" min="0" max="100" v-model.number="points[i].y" @change="commit()" /></td>
            <td class="p-2">
              <button class="btn" @click="selectPoint(i)">select</button>
              <button class="btn" @click="movePoint(i, -1)" :disabled="i===0">↑</button>
              <button class="btn" @click="movePoint(i, +1)" :disabled="i===points.length-1">↓</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p class="text-xs text-gray-500">
      tips: drag points, use arrows to nudge (hold Shift = ×10), Delete removes selected. polygon supports <code>round &lt;length-percentage&gt;</code> in modern browsers.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'

/* ---------- stage & geometry ---------- */
const stage = ref<HTMLDivElement | null>(null)
const objectFit = ref<'cover' | 'contain'>('cover')
const canvasSize = ref<'sm'|'md'|'lg'>('md')

const canvasClass = computed(() => ({
  'h-72': canvasSize.value === 'sm',
  'h-96': canvasSize.value === 'md',
  'h-[36rem]': canvasSize.value === 'lg',
  'max-w-4xl': true,
}))

/* grid & snapping */
const showGrid = ref<boolean>(true)
const snapToGrid = ref<boolean>(true)
const gridStep = ref<number>(5) // percent
const gridPx = computed(() => {
  // grid in pixels — approximate: stage width / (100 / step)
  const w = stage.value?.clientWidth ?? 800
  const cols = 100 / gridStep.value
  return Math.max(8, Math.round(w / cols))
})

/* ---------- points ---------- */
type Pt = { x:number; y:number } // stored in %
const points = reactive<Pt[]>([])
const pointCount = ref<number>(6)
const selectedIndex = ref<number|null>(null)
const roundness = ref<number>(0) // percentage for polygon(... round <r>%)

/* presets */
const presets = [
  { key: 'rect', label: 'rectangle' },
  { key: 'tri', label: 'triangle' },
  { key: 'pent', label: 'pentagon' },
  { key: 'hex', label: 'hexagon' },
  { key: 'star', label: 'star (5)' },
  { key: 'blob', label: 'random blob' },
] as const
const presetKey = ref<'custom' | typeof presets[number]['key']>('custom')

function applyPreset(){
  const k = presetKey.value
  if (k === 'custom') return
  if (k === 'rect') { setPoints([{x:5,y:5},{x:95,y:5},{x:95,y:95},{x:5,y:95}]); return }
  if (k === 'tri')  { setPoints(regularPolygon(3)); return }
  if (k === 'pent') { setPoints(regularPolygon(5)); return }
  if (k === 'hex')  { setPoints(regularPolygon(6)); return }
  if (k === 'star') { setPoints(starPoints(5)); return }
  if (k === 'blob') { setPoints(randomBlob(8)); return }
}

function setPoints(arr: Pt[]){
  points.splice(0, points.length, ...arr.map(p=>({x:clamp(p.x,0,100), y:clamp(p.y,0,100)})))
  pointCount.value = points.length
  selectedIndex.value = 0
  pushHistory()
}

function generateRegular(n: number){
  setPoints(regularPolygon(n))
  presetKey.value = 'custom'
}
function regularPolygon(n:number): Pt[]{
  const cx=50, cy=50, r=40
  const out: Pt[] = []
  for(let i=0;i<n;i++){
    const ang = -Math.PI/2 + (i*2*Math.PI)/n
    out.push({ x: cx + r*Math.cos(ang), y: cy + r*Math.sin(ang) })
  }
  return out.map(p=>({x:Math.round(p.x*10)/10, y:Math.round(p.y*10)/10}))
}
function starPoints(n:number): Pt[]{
  const outer = 45, inner = 18, cx=50, cy=50
  const pts: Pt[] = []
  for(let i=0;i<n*2;i++){
    const r = (i%2===0)? outer:inner
    const a = -Math.PI/2 + (i*Math.PI)/n
    pts.push({ x: cx + r*Math.cos(a), y: cy + r*Math.sin(a) })
  }
  return pts
}
function randomBlob(n:number): Pt[]{
  const cx=50, cy=50
  const pts: Pt[]=[]
  const rnd = mulberry32(1234 + Math.floor(Math.random()*1e6))
  for (let i=0;i<n;i++){
    const a = (i/n)*2*Math.PI
    const r = 30 + rnd()*20
    pts.push({ x: cx + r*Math.cos(a), y: cy + r*Math.sin(a) })
  }
  return pts
}
function reversePoints(){
  points.reverse()
  pushHistory()
}

/* reordering / select */
function selectPoint(i:number){ selectedIndex.value = i }
function movePoint(i:number, dir:-1|1){
  const j = i + dir; if (j<0 || j>=points.length) return
  const tmp = points[i]; points[i] = points[j]; points[j] = tmp
  selectedIndex.value = j
  pushHistory()
}

/* add / remove */
function addPointMid(){
  // add a point between selected and next (or between last and first)
  if (points.length < 2) return
  const i = selectedIndex.value ?? 0
  const j = (i + 1) % points.length
  const mid = { x: (points[i].x + points[j].x)/2, y: (points[i].y + points[j].y)/2 }
  points.splice(j, 0, snap(mid))
  selectedIndex.value = j
  pointCount.value = points.length
  pushHistory()
}
function removeSelected(){
  if (selectedIndex.value===null || points.length<=3) return
  points.splice(selectedIndex.value,1)
  selectedIndex.value = Math.min(points.length-1, selectedIndex.value)
  pointCount.value = points.length
  pushHistory()
}

/* ---------- image ---------- */
const defaultImage = 'https://picsum.photos/id/1015/800/500'
const imageUrl = ref<string>(defaultImage)
function onFile(e: Event){
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const url = URL.createObjectURL(file)
  imageUrl.value = url
}

/* ---------- pointer interactions ---------- */
let dragging = false
function onHandlePointerDown(i:number, ev: PointerEvent){
  (ev.target as Element).setPointerCapture?.(ev.pointerId)
  selectPoint(i)
  dragging = true
}
function onStagePointerDown(ev: PointerEvent){
  // stage drag starts only if not on a handle
  if ((ev.target as HTMLElement).classList.contains('handle')) return
  dragging = false
}
function onStagePointerUp(){
  if (dragging) { pushHistory(); dragging=false }
}
function onStagePointerMove(ev: PointerEvent){
  if (!dragging || selectedIndex.value === null || !stage.value) return
  const rect = stage.value.getBoundingClientRect()
  const x = ((ev.clientX - rect.left) / rect.width) * 100
  const y = ((ev.clientY - rect.top) / rect.height) * 100
  const next = snap({ x: clamp(x,0,100), y: clamp(y,0,100) })
  points[selectedIndex.value] = next
}

/* keyboard nudges */
function onKey(ev: KeyboardEvent){
  if (selectedIndex.value===null) return
  const step = (ev.shiftKey ? 10 : 1) * (snapToGrid.value ? gridStep.value : 1)
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Delete','Backspace'].includes(ev.key)) ev.preventDefault()
  if (ev.key === 'ArrowLeft')  points[selectedIndex.value].x = clamp(points[selectedIndex.value].x - step, 0, 100)
  if (ev.key === 'ArrowRight') points[selectedIndex.value].x = clamp(points[selectedIndex.value].x + step, 0, 100)
  if (ev.key === 'ArrowUp')    points[selectedIndex.value].y = clamp(points[selectedIndex.value].y - step, 0, 100)
  if (ev.key === 'ArrowDown')  points[selectedIndex.value].y = clamp(points[selectedIndex.value].y + step, 0, 100)
  if (ev.key === 'Delete' || ev.key === 'Backspace') removeSelected()
}

/* snapping */
function snap(p: Pt): Pt{
  if (!snapToGrid.value) return { x: round1(p.x), y: round1(p.y) }
  const s = gridStep.value
  return { x: Math.round(p.x / s) * s, y: Math.round(p.y / s) * s }
}

/* ---------- export / import ---------- */
const exportUnit = ref<'%'|'px'>('%')

const polygonCss = (invertMask: boolean) => {
  // Main polygon string with optional roundness
  const poly = `${formattedPoints.value}${roundness.value>0 ? ` round ${roundness.value}%` : ''}`
  if (!invertMask) return `polygon(${poly})`
  // For mask overlay: show outside area by inverting with even-odd winding (via two polygons)
  // Not all browsers support evenodd on clip-path; we mimic with full rect minus polygon using "path()" where supported.
  // Fallback: just apply same polygon (no true invert). Here we keep it simple:
  return `polygon(${poly})`
}

const formattedPoints = computed(() => {
  if (exportUnit.value === '%') return points.map(p => `${round1(p.x)}% ${round1(p.y)}%`).join(', ')
  // px export
  const rect = stage.value?.getBoundingClientRect()
  const w = rect?.width ?? 800
  const h = rect?.height ?? 400
  return points.map(p => `${round1((p.x/100)*w)}px ${round1((p.y/100)*h)}px`).join(', ')
})

const cssValue = computed(() => `polygon(${formattedPoints.value}${roundness.value>0 ? `, round ${roundness.value}%` : ''})`)

async function copyCss(){
  const css = `clip-path: ${cssValue.value};\n-webkit-clip-path: ${cssValue.value};`
  await navigator.clipboard.writeText(css)
  flash('copied css')
}

const importString = ref<string>('')
function importClipPath(){
  const m = importString.value.match(/polygon\s*\((.*)\)/i)
  if (!m) { flash('no polygon() found'); return }
  const inside = m[1]
  let round = 0
  const roundMatch = inside.match(/round\s+([0-9.]+)%/i)
  if (roundMatch) {
    round = parseFloat(roundMatch[1]) || 0
  }
  // extract "x y" pairs before "round"
  const pairs = inside.replace(/round\s+[^(,]+$/i,'').split(/\s*,\s*/)
  const arr: Pt[] = []
  for (const pair of pairs) {
    const mm = pair.trim().match(/^([0-9.]+)(%|px)\s+([0-9.]+)(%|px)$/i)
    if (!mm) continue
    const xNum = parseFloat(mm[1]); const xUnit = mm[2]
    const yNum = parseFloat(mm[3]); const yUnit = mm[4]
    // normalize to %
    if (xUnit !== yUnit) { flash('mixed units; normalized to %'); }
    arr.push({
      x: xUnit === '%' ? xNum : clamp((xNum / (stage.value?.clientWidth ?? 800))*100, 0, 100),
      y: yUnit === '%' ? yNum : clamp((yNum / (stage.value?.clientHeight ?? 400))*100, 0, 100),
    })
  }
  if (arr.length>=3) {
    roundness.value = round
    setPoints(arr)
    presetKey.value = 'custom'
    flash('imported')
  } else {
    flash('could not parse points')
  }
}

/* ---------- live code & helpers ---------- */
const pointsSvg = computed(() => points.map(p => `${p.x}%,${p.y}%`).join(' '))
function handleStyle(p: Pt){
  return {
    left: `calc(${p.x}% - 8px)`,
    top: `calc(${p.y}% - 8px)`,
  }
}
function round1(n:number){ return Math.round(n*10)/10 }
function clamp(n:number,a:number,b:number){ return Math.min(b, Math.max(a, n)) }

/* ---------- history (undo/redo) ---------- */
const history: Pt[][] = []
let histIndex = -1
const canUndo = computed(()=> histIndex > 0)
const canRedo = computed(()=> histIndex >= 0 && histIndex < history.length-1)

function pushHistory(){
  // deep copy
  const snapshot = points.map(p => ({...p}))
  history.splice(histIndex+1)
  history.push(snapshot)
  histIndex = history.length - 1
}
function restore(i:number){
  points.splice(0, points.length, ...history[i].map(p=>({...p})))
}
function undo(){ if (!canUndo.value) return; histIndex--; restore(histIndex) }
function redo(){ if (!canRedo.value) return; histIndex++; restore(histIndex) }
function commit(){ pushHistory() }

/* ---------- messaging ---------- */
const copiedMessage = ref<string>('')

function flash(msg:string){
  copiedMessage.value = msg
  window.clearTimeout((flash as any)._t)
  ;(flash as any)._t = window.setTimeout(()=> copiedMessage.value='', 1200)
}

/* ---------- lifecycle ---------- */
onMounted(() => {
  setPoints(regularPolygon(pointCount.value))
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(()=> window.removeEventListener('keydown', onKey))

/* ---------- simple PRNG ---------- */
function mulberry32(s:number){ return ()=>{ let t=(s+=0x6D2B79F5); t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296 } }

/* ---------- reset ---------- */
function resetAll(){
  imageUrl.value = defaultImage
  objectFit.value = 'cover'
  canvasSize.value = 'md'
  showGrid.value = true
  snapToGrid.value = true
  gridStep.value = 5
  roundness.value = 0
  presetKey.value = 'custom'
  setPoints(regularPolygon(6))
  history.splice(0); histIndex = -1; pushHistory()
}
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-2.5 rounded text-white text-sm; }
.btn-warning { @apply bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded text-white text-sm; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
select{padding: 10px !important;}
.handle {
  @apply absolute w-4 h-4 rounded-full border-2 border-white bg-emerald-500 cursor-grab active:cursor-grabbing transition-transform;
}
</style>

