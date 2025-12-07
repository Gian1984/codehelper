<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="card">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-2xl font-semibold">✂️ CSS Clip-Path Maker</h2>
          <p class="text-sm text-gray-400 mt-1">Create custom clip-path shapes visually with polygon, circle, and ellipse support</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn" @click="undo" :disabled="!canUndo" title="Undo (Ctrl/⌘+Z)">↶ undo</button>
          <button class="btn" @click="redo" :disabled="!canRedo" title="Redo (Ctrl/⌘+Y)">↷ redo</button>
          <button class="btn-warning" @click="resetAll">🗑️ reset</button>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- shape / points -->
      <div class="card space-y-3">
        <h3 class="text-sm font-semibold text-indigo-400 mb-2">🔷 Shape</h3>
        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="label">type</span>
            <select v-model="shapeType" @change="onShapeTypeChange" class="input">
              <option value="polygon">polygon</option>
              <option value="circle">circle</option>
              <option value="ellipse">ellipse</option>
            </select>
          </label>
          <label class="block" v-if="shapeType === 'polygon'">
            <span class="label">preset</span>
            <select v-model="presetKey" @change="applyPreset" class="input">
              <option value="custom">custom</option>
              <option v-for="p in presets" :key="p.key" :value="p.key">{{ p.label }}</option>
            </select>
          </label>
          <label class="block" v-else-if="shapeType === 'circle'">
            <span class="label">radius</span>
            <input v-model.number="circleRadius" type="range" min="10" max="50" step="1" class="input" />
          </label>
          <label class="block" v-else>
            <span class="label">rx / ry</span>
            <div class="text-xs text-gray-400">{{ ellipseRx }}% / {{ ellipseRy }}%</div>
          </label>
        </div>

        <div v-if="shapeType === 'polygon'" class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="label">points</span>
            <input v-model.number="pointCount" @change="generateRegular(pointCount)" type="number" min="3" max="20" class="input" />
          </label>
          <label class="block">
            <span class="label">roundness</span>
            <input v-model.number="roundness" type="range" min="0" max="20" step="1" class="w-full" />
          </label>
        </div>

        <div v-if="shapeType === 'ellipse'" class="space-y-2">
          <label class="block">
            <span class="label">radius X</span>
            <input v-model.number="ellipseRx" type="range" min="10" max="50" step="1" class="w-full" />
          </label>
          <label class="block">
            <span class="label">radius Y</span>
            <input v-model.number="ellipseRy" type="range" min="10" max="50" step="1" class="w-full" />
          </label>
        </div>

        <div v-if="shapeType === 'polygon'" class="flex flex-wrap gap-2">
          <button class="btn" @click="addPointMid">➕ add point</button>
          <button class="btn" @click="removeSelected" :disabled="selectedIndex===null">➖ remove</button>
          <button class="btn" @click="reversePoints" :disabled="points.length<3">🔄 reverse</button>
        </div>
      </div>

      <!-- canvas options -->
      <div class="card space-y-3">
        <h3 class="text-sm font-semibold text-indigo-400 mb-2">🖼️ Canvas</h3>
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

        <div class="space-y-2">
          <div class="flex flex-wrap gap-3">
            <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="showGrid" class="w-4 h-4" /><span class="text-sm">grid</span></label>
            <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="snapToGrid" class="w-4 h-4" /><span class="text-sm">snap</span></label>
            <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="showMask" class="w-4 h-4" /><span class="text-sm">darken outside</span></label>
          </div>
          <div class="flex flex-wrap gap-3">
            <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="showRuleOfThirds" class="w-4 h-4" /><span class="text-sm">rule of thirds</span></label>
            <label class="inline-flex items-center gap-2"><input type="checkbox" v-model="showGoldenRatio" class="w-4 h-4" /><span class="text-sm">golden ratio</span></label>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-300">grid step</span>
            <select v-model.number="gridStep" class="input w-24">
              <option v-for="n in [2,4,5,10]" :key="n" :value="n">{{ n }}%</option>
            </select>
          </div>
        </div>
      </div>

      <!-- export / import -->
      <div class="card space-y-3">
        <h3 class="text-sm font-semibold text-indigo-400 mb-2">📦 Export</h3>
        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="label">units</span>
            <select v-model="exportUnit" class="input">
              <option value="%">%</option>
              <option value="px">px</option>
            </select>
          </label>
          <button class="btn-primary w-full" @click="copyCss">📋 copy CSS</button>
        </div>

        <div class="mono-box">
          <div>clip-path: {{ cssValue }};</div>
          <div>-webkit-clip-path: {{ cssValue }};</div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="btn" @click="showExportModal = true">📦 export formats</button>
          <button class="btn" @click="showImportModal = true">📥 import</button>
          <span v-if="copiedMessage" class="text-green-400 text-xs self-center">{{ copiedMessage }}</span>
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
          loading="lazy"
          decoding="async"
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

      <!-- rule of thirds -->
      <svg v-if="showRuleOfThirds" class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="33.33%" y1="0%" x2="33.33%" y2="100%" stroke="rgba(59,130,246,0.4)" stroke-width="1.5" stroke-dasharray="4,4"/>
        <line x1="66.67%" y1="0%" x2="66.67%" y2="100%" stroke="rgba(59,130,246,0.4)" stroke-width="1.5" stroke-dasharray="4,4"/>
        <line x1="0%" y1="33.33%" x2="100%" y2="33.33%" stroke="rgba(59,130,246,0.4)" stroke-width="1.5" stroke-dasharray="4,4"/>
        <line x1="0%" y1="66.67%" x2="100%" y2="66.67%" stroke="rgba(59,130,246,0.4)" stroke-width="1.5" stroke-dasharray="4,4"/>
      </svg>

      <!-- golden ratio -->
      <svg v-if="showGoldenRatio" class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="38.2%" y1="0%" x2="38.2%" y2="100%" stroke="rgba(251,191,36,0.4)" stroke-width="1.5" stroke-dasharray="6,3"/>
        <line x1="61.8%" y1="0%" x2="61.8%" y2="100%" stroke="rgba(251,191,36,0.4)" stroke-width="1.5" stroke-dasharray="6,3"/>
        <line x1="0%" y1="38.2%" x2="100%" y2="38.2%" stroke="rgba(251,191,36,0.4)" stroke-width="1.5" stroke-dasharray="6,3"/>
        <line x1="0%" y1="61.8%" x2="100%" y2="61.8%" stroke="rgba(251,191,36,0.4)" stroke-width="1.5" stroke-dasharray="6,3"/>
      </svg>

      <!-- segments -->
      <svg v-if="shapeType === 'polygon'" class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <polyline :points="pointsSvg" fill="none" stroke="rgba(16,185,129,0.65)" stroke-width="2" />
      </svg>

      <!-- circle preview -->
      <svg v-if="shapeType === 'circle'" class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" :r="`${circleRadius}%`" fill="none" stroke="rgba(16,185,129,0.65)" stroke-width="2" />
      </svg>

      <!-- ellipse preview -->
      <svg v-if="shapeType === 'ellipse'" class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50%" cy="50%" :rx="`${ellipseRx}%`" :ry="`${ellipseRy}%`" fill="none" stroke="rgba(16,185,129,0.65)" stroke-width="2" />
      </svg>

      <!-- draggable points (polygon mode only) -->
      <button
          v-if="shapeType === 'polygon'"
          v-for="(p, i) in points"
          :key="i"
          class="handle"
          :class="i===selectedIndex ? 'ring-2 ring-white scale-110' : 'opacity-90'"
          :style="handleStyle(p)"
          @pointerdown.stop="onHandlePointerDown(i, $event)"
          aria-label="handle"
      />
    </div>

    <!-- Points table (polygon mode only) -->
    <div v-if="shapeType === 'polygon'" class="card">
      <h3 class="text-sm font-semibold text-indigo-400 mb-3">📍 Points</h3>
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
      💡 tips: {{ shapeType === 'polygon' ? 'drag points, use arrows to nudge (hold Shift = ×10), Delete removes selected. polygon supports round &lt;length-percentage&gt; in modern browsers.' : 'adjust radius values to customize your ' + shapeType + ' shape.' }}
    </p>

    <!-- Export Modal -->
    <div v-if="showExportModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" @click.self="showExportModal = false">
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-xl w-full space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">📦 Export Clip-Path</h3>
          <button @click="showExportModal = false" class="text-gray-400 hover:text-white">✕</button>
        </div>

        <div class="space-y-3">
          <label class="block">
            <span class="text-sm text-gray-300 mb-2 block">Format</span>
            <select v-model="exportFormat" class="input">
              <option value="CSS">CSS</option>
              <option value="SCSS">SCSS</option>
              <option value="JSON">JSON</option>
              <option value="Tailwind">Tailwind Config</option>
            </select>
          </label>

          <div class="mono-box">
            <pre class="text-xs">{{ exportOutput }}</pre>
          </div>
        </div>

        <div class="flex gap-2">
          <button @click="copyExport" class="btn-primary flex-1">📋 Copy to Clipboard</button>
          <button @click="showExportModal = false" class="btn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Import Modal -->
    <div v-if="showImportModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" @click.self="showImportModal = false">
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-xl w-full space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">📥 Import Clip-Path</h3>
          <button @click="showImportModal = false" class="text-gray-400 hover:text-white">✕</button>
        </div>

        <div class="space-y-3">
          <label class="block">
            <span class="text-sm text-gray-300 mb-2 block">Paste clip-path CSS</span>
            <textarea v-model="importString" class="input min-h-[100px]" placeholder="clip-path: polygon(50% 0%, ...);" />
          </label>
        </div>

        <div class="flex gap-2">
          <button @click="importClipPath(); showImportModal = false" class="btn-primary flex-1">📥 Import</button>
          <button @click="showImportModal = false" class="btn">Cancel</button>
        </div>
      </div>
    </div>
    <!-- Related Tools -->
    <RelatedTools />
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

/* shape type */
const shapeType = ref<'polygon' | 'circle' | 'ellipse'>('polygon')
const circleRadius = ref<number>(40)
const ellipseRx = ref<number>(45)
const ellipseRy = ref<number>(30)

function onShapeTypeChange() {
  pushHistory()
}

/* grid & snapping */
const showGrid = ref<boolean>(true)
const snapToGrid = ref<boolean>(true)
const gridStep = ref<number>(5) // percent
const showRuleOfThirds = ref<boolean>(false)
const showGoldenRatio = ref<boolean>(false)
const showMask = ref<boolean>(false)

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
  { key: 'star', label: 'star' },
  { key: 'heart', label: 'heart' },
  { key: 'arrow-right', label: 'arrow right' },
  { key: 'arrow-left', label: 'arrow left' },
  { key: 'chevron-right', label: 'chevron right' },
  { key: 'message', label: 'speech bubble' },
  { key: 'shield', label: 'shield' },
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
  if (k === 'heart') { setPoints(heartShape()); return }
  if (k === 'arrow-right') { setPoints(arrowRight()); return }
  if (k === 'arrow-left') { setPoints(arrowLeft()); return }
  if (k === 'chevron-right') { setPoints(chevronRight()); return }
  if (k === 'message') { setPoints(messageBubble()); return }
  if (k === 'shield') { setPoints(shieldShape()); return }
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

/* new preset shapes */
function heartShape(): Pt[]{
  return [
    {x: 50, y: 25}, {x: 30, y: 10}, {x: 10, y: 20}, {x: 5, y: 35},
    {x: 10, y: 50}, {x: 30, y: 70}, {x: 50, y: 90}, {x: 70, y: 70},
    {x: 90, y: 50}, {x: 95, y: 35}, {x: 90, y: 20}, {x: 70, y: 10}
  ]
}
function arrowRight(): Pt[]{
  return [
    {x: 5, y: 35}, {x: 60, y: 35}, {x: 60, y: 15}, {x: 95, y: 50},
    {x: 60, y: 85}, {x: 60, y: 65}, {x: 5, y: 65}
  ]
}
function arrowLeft(): Pt[]{
  return [
    {x: 95, y: 35}, {x: 40, y: 35}, {x: 40, y: 15}, {x: 5, y: 50},
    {x: 40, y: 85}, {x: 40, y: 65}, {x: 95, y: 65}
  ]
}
function chevronRight(): Pt[]{
  return [
    {x: 30, y: 10}, {x: 70, y: 50}, {x: 30, y: 90}, {x: 40, y: 90},
    {x: 80, y: 50}, {x: 40, y: 10}
  ]
}
function messageBubble(): Pt[]{
  return [
    {x: 10, y: 10}, {x: 90, y: 10}, {x: 90, y: 70}, {x: 60, y: 70},
    {x: 50, y: 90}, {x: 45, y: 70}, {x: 10, y: 70}
  ]
}
function shieldShape(): Pt[]{
  return [
    {x: 50, y: 5}, {x: 90, y: 20}, {x: 90, y: 50}, {x: 50, y: 95},
    {x: 10, y: 50}, {x: 10, y: 20}
  ]
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
const exportFormat = ref<'CSS'|'SCSS'|'JSON'|'Tailwind'>('CSS')
const showExportModal = ref(false)
const showImportModal = ref(false)

const polygonCss = (invertMask: boolean) => {
  if (shapeType.value === 'circle') {
    return `circle(${circleRadius.value}% at 50% 50%)`
  }
  if (shapeType.value === 'ellipse') {
    return `ellipse(${ellipseRx.value}% ${ellipseRy.value}% at 50% 50%)`
  }
  // polygon
  const poly = `${formattedPoints.value}${roundness.value>0 ? ` round ${roundness.value}%` : ''}`
  if (!invertMask) return `polygon(${poly})`
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

const cssValue = computed(() => {
  if (shapeType.value === 'circle') return `circle(${circleRadius.value}% at 50% 50%)`
  if (shapeType.value === 'ellipse') return `ellipse(${ellipseRx.value}% ${ellipseRy.value}% at 50% 50%)`
  return `polygon(${formattedPoints.value}${roundness.value>0 ? `, round ${roundness.value}%` : ''})`
})

const exportOutput = computed(() => {
  const val = cssValue.value
  if (exportFormat.value === 'CSS') {
    return `.element {\n  clip-path: ${val};\n  -webkit-clip-path: ${val};\n}`
  } else if (exportFormat.value === 'SCSS') {
    return `$clip-path: ${val};\n\n.element {\n  clip-path: $clip-path;\n  -webkit-clip-path: $clip-path;\n}`
  } else if (exportFormat.value === 'JSON') {
    return JSON.stringify({ clipPath: val, webkitClipPath: val }, null, 2)
  } else {
    // Tailwind
    return `module.exports = {\n  theme: {\n    extend: {\n      clipPath: {\n        'custom': '${val}',\n      }\n    }\n  }\n}`
  }
})

async function copyExport() {
  await navigator.clipboard.writeText(exportOutput.value)
  flash('copied to clipboard')
}

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
.label {
  @apply text-sm font-medium text-gray-300 block mb-2;
}
.input {
  @apply bg-black text-white border-2 border-gray-700 rounded-lg px-3 py-2 w-full;
  @apply focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all;
}
.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-primary {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-colors shadow-lg;
}
.btn-warning {
  @apply bg-yellow-600 hover:bg-yellow-500 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}
.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}
.mono-box {
  @apply bg-gray-800 text-green-300 font-mono text-sm p-3 rounded-lg border border-gray-700 overflow-x-auto;
}
select {
  padding: 10px !important;
}
textarea.input {
  @apply min-h-[100px];
}
.handle {
  @apply absolute w-4 h-4 rounded-full border-2 border-white bg-emerald-500 cursor-grab active:cursor-grabbing transition-transform;
}
</style>

