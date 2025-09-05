<template>
  <div class="bg-gray-800 text-gray-100 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 mx-auto">
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <h2 class="text-2xl font-semibold">SVG Icon Generator</h2>
      <div class="flex items-center gap-2">
        <button class="btn" @click="undo" :disabled="!canUndo" title="Undo (Ctrl/⌘+Z)">undo</button>
        <button class="btn" @click="redo" :disabled="!canRedo" title="Redo (Ctrl/⌘+Y)">redo</button>
        <button class="btn-warning" @click="clearCanvas" title="Clear canvas">clear</button>
      </div>
    </div>

    <!-- controls -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- size/grid -->
      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="text-sm text-gray-300">viewBox</span>
            <select v-model.number="box" class="input">
              <option v-for="n in [24,32,48,64,96,128]" :key="n" :value="n">{{ n }} x {{ n }}</option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm text-gray-300">snap</span>
            <select v-model.number="snapSize" class="input">
              <option v-for="n in [1,2,4,8]" :key="n" :value="n">{{ n }} px</option>
            </select>
          </label>
        </div>

        <div class="flex items-center gap-3">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="showGrid" class="w-4 h-4" />
            <span class="text-sm">grid</span>
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="text-sm text-gray-300">color</span>
            <input v-model="gridColor" type="color" class="w-9 h-7 p-0 border border-gray-500 rounded" />
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="text-sm text-gray-300">opacity</span>
            <input v-model.number="gridOpacity" type="range" min="0" max="1" step="0.05" class="w-28" />
          </label>
        </div>
      </div>

      <!-- paint -->
      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="text-sm text-gray-300">fill</span>
            <div class="flex items-center gap-2 mt-1">
              <input v-model="fillColor" type="color" class="w-10 h-8 p-0 border border-gray-500 rounded" />
              <input v-model="fillColor" maxlength="7" class="input" @blur="normalizeHex('fill')" />
            </div>
          </label>

          <label class="block">
            <span class="text-sm text-gray-300">stroke</span>
            <div class="flex items-center gap-2 mt-1">
              <input v-model="strokeColor" type="color" class="w-10 h-8 p-0 border border-gray-500 rounded" />
              <input v-model="strokeColor" maxlength="7" class="input" @blur="normalizeHex('stroke')" />
            </div>
          </label>
        </div>

        <div class="grid grid-cols-3 gap-2 items-end">
          <label class="block">
            <span class="text-sm text-gray-300">width</span>
            <input v-model.number="strokeWidth" type="number" min="0" step="0.5" class="input" />
          </label>
          <label class="block">
            <span class="text-sm text-gray-300">linecap</span>
            <select v-model="linecap" class="input">
              <option>butt</option><option>round</option><option>square</option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm text-gray-300">linejoin</span>
            <select v-model="linejoin" class="input">
              <option>miter</option><option>round</option><option>bevel</option>
            </select>
          </label>
        </div>

        <label class="inline-flex items-center gap-2">
          <input type="checkbox" v-model="strokeOnly" class="w-4 h-4" />
          <span class="text-sm">stroke only</span>
        </label>
      </div>

      <!-- export -->
      <div class="card space-y-3">
        <div class="grid grid-cols-2 gap-2 items-end">
          <label class="block">
            <span class="text-sm text-gray-300">PNG size</span>
            <select v-model.number="exportPx" class="input">
              <option v-for="n in [64,128,256,512,1024]" :key="n" :value="n">{{ n }} px</option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm text-gray-300">filename</span>
            <input v-model="filename" class="input" />
          </label>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="btn-primary" @click="exportSvg" title="Scarica .svg">download svg</button>
          <button class="btn" @click="copySvg" title="Copia codice SVG">copy svg</button>
          <button class="btn" @click="exportPng" title="Scarica .png">export png</button>
        </div>
      </div>
    </div>

    <!-- toolbar -->
    <section class="card">
      <div class="flex flex-wrap gap-2">
        <!-- base shapes -->
        <button class="icon-btn" @click="drawCircle" title="Circle">●</button>
        <button class="icon-btn" @click="drawRect" title="Square">■</button>
        <button class="icon-btn" @click="drawSmallCircle" title="Small Dot">◦</button>
        <button class="icon-btn" @click="drawSmallRect" title="Small Square">▫︎</button>

        <!-- chevrons / angles -->
        <button class="icon-btn" @click="drawChevronRight" title="Chevron Right">›</button>
        <button class="icon-btn" @click="drawChevronLeft" title="Chevron Left">‹</button>
        <button class="icon-btn" @click="drawChevronUp" title="Chevron Up">˄</button>
        <button class="icon-btn" @click="drawChevronDown" title="Chevron Down">˅</button>
        <button class="icon-btn" @click="drawAngleRight" title="Angle Right">&gt;</button>
        <button class="icon-btn" @click="drawAngleLeft" title="Angle Left">&lt;</button>
        <button class="icon-btn" @click="drawDoubleAngleRight" title="Double Right">»</button>
        <button class="icon-btn" @click="drawDoubleAngleLeft" title="Double Left">«</button>

        <!-- dots / burgers -->
        <button class="icon-btn" @click="drawVerticalDots" title="Dots Vertical">⋮</button>
        <button class="icon-btn" @click="drawHorizontalDots" title="Dots Horizontal">⋯</button>
        <button class="icon-btn" @click="drawBurgerClassic" title="Burger">☰</button>
        <button class="icon-btn" @click="drawBurgerThin" title="Burger Thin">≡</button>
        <button class="icon-btn" @click="drawBurgerOffset" title="Burger Offset">☱</button>

        <!-- ui -->
        <button class="icon-btn" @click="drawCloseIcon" title="Close">✕</button>
        <button class="icon-btn" @click="drawTrashIcon" title="Trash">🗑</button>
        <button class="icon-btn" @click="drawSearchIcon" title="Search">🔍</button>
        <button class="icon-btn" @click="drawCheckIcon" title="Check">✔︎</button>

        <!-- selection tools -->
        <div class="ml-auto flex gap-2">
          <button class="btn" @click="centerH" title="Align Horizontal Center">align H</button>
          <button class="btn" @click="centerV" title="Align Vertical Center">align V</button>
          <button class="btn" @click="bringToFront" title="Bring to Front">front</button>
          <button class="btn" @click="sendToBack" title="Send to Back">back</button>
          <button class="btn" @click="duplicateSelected" title="Duplicate (Ctrl/⌘+D)">duplicate</button>
          <button class="btn-danger" @click="deleteSelected" :disabled="!selectedShape" title="Delete (Backspace)">delete</button>
        </div>
      </div>
    </section>

    <!-- canvas -->
    <section class="grid grid-cols-1 md:grid-cols-[auto,220px] gap-4">
      <div class="border border-gray-700 rounded bg-white overflow-hidden">
        <svg
            id="svgCanvas"
            :viewBox="`0 0 ${box} ${box}`"
            :width="Math.min(384, box*4)"
            :height="Math.min(384, box*4)"
            class="block mx-auto"
            xmlns="http://www.w3.org/2000/svg"
        />
        <div class="text-xs text-center text-gray-400 py-1">Output: {{ box }}x{{ box }} viewBox</div>
      </div>

      <div class="space-y-2">
        <h3 class="font-medium">preview (1:1)</h3>
        <div class="border bg-white rounded p-2 w-[220px]">
          <svg id="svgPreview" :viewBox="`0 0 ${box} ${box}`" :width="box" :height="box" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, onBeforeUnmount } from 'vue'

type SnapType = any
let SnapLib: SnapType
let snap: SnapType
let previewSnap: SnapType

/* ---------- state ---------- */
const box = ref(64)
const snapSize = ref(4)

const fillColor = ref('#000000')
const strokeColor = ref('#000000')
const strokeWidth = ref(2)
const linecap = ref<'butt'|'round'|'square'>('round')
const linejoin = ref<'miter'|'round'|'bevel'>('round')
const strokeOnly = ref(false)

const showGrid = ref(true)
const gridColor = ref('#eeeeee')
const gridOpacity = ref(0.4)

const exportPx = ref(256)
const filename = ref('icon')

const selectedShape = ref<any>(null)

/* history */
const history: string[] = []
let historyIndex = -1
const canUndo = computed(() => historyIndex > 0)
const canRedo = computed(() => historyIndex >= 0 && historyIndex < history.length - 1)

/* ---------- utils ---------- */
const snapTo = (v: number) => Math.round(v / snapSize.value) * snapSize.value

function normalizeHex(which: 'fill'|'stroke'){
  const re = /^#?[0-9a-fA-F]{6}$/
  const refVal = which === 'fill' ? fillColor : strokeColor
  if (!re.test(refVal.value)) refVal.value = which === 'fill' ? '#000000' : '#000000'
  if (refVal.value[0] !== '#') refVal.value = '#' + refVal.value
}

/* ---------- grid ---------- */
function drawGrid(){
  removeGrid()
  const g = snap.group().attr({ id: 'grid' })
  for (let i = 0; i <= box.value; i += snapSize.value) {
    g.add(snap.line(i, 0, i, box.value).attr({ stroke: gridColor.value, strokeWidth: 0.3, opacity: gridOpacity.value }))
    g.add(snap.line(0, i, box.value, i).attr({ stroke: gridColor.value, strokeWidth: 0.3, opacity: gridOpacity.value }))
  }
  snap.prepend(g)
}
function removeGrid(){
  snap.select('#grid')?.remove()
}

/* ---------- selection helpers ---------- */
function select(el: any){
  if (!el) return
  // clear previous selection
  snap.selectAll('.selected').forEach((e:any)=> e.removeClass('selected').attr({ filter: null }))
  selectedShape.value = el
  el.addClass('selected')
  // simple blue outline via filter
  const f = snap.filter(SnapLib.filter.shadow(0,0,1,'#3b82f6',1))
  el.attr({ filter: f })
}
function deleteSelected(){
  if (!selectedShape.value) return
  pushHistory() // before change
  selectedShape.value.remove()
  selectedShape.value = null
  refreshPreview()
}
function duplicateSelected(){
  if (!selectedShape.value) return
  pushHistory()
  const clone = selectedShape.value.clone()
  snap.append(clone)
  clone.transform((selectedShape.value.transform().local || '') + ` translate(${snapSize.value},${snapSize.value})`)
  setupElement(clone, clone.data('strokeOnly') === true)
  select(clone)
  refreshPreview()
}
function centerH(){
  if (!selectedShape.value) return
  pushHistory()
  const bbox = selectedShape.value.getBBox()
  const dx = (box.value/2) - (bbox.x + bbox.width/2)
  moveEl(selectedShape.value, dx, 0)
}
function centerV(){
  if (!selectedShape.value) return
  pushHistory()
  const bbox = selectedShape.value.getBBox()
  const dy = (box.value/2) - (bbox.y + bbox.height/2)
  moveEl(selectedShape.value, 0, dy)
}
function bringToFront(){ if (selectedShape.value) selectedShape.value.toFront() }
function sendToBack(){ if (selectedShape.value) selectedShape.value.toBack(); snap.select('#grid')?.toBack() }

/* ---------- movement ---------- */
function moveEl(el:any, dx:number, dy:number){
  const t = el.transform().local || ''
  el.transform(`${t} translate(${snapTo(dx)},${snapTo(dy)})`)
  refreshPreview()
}

/* ---------- history ---------- */
function pushHistory(){
  // serialize without grid
  const g = snap.select('#grid')
  g?.remove()
  const s = snap.toString()
  if (showGrid.value) drawGrid()
  // truncate redo tail then push
  history.splice(historyIndex + 1)
  history.push(s)
  historyIndex = history.length - 1
}
function restoreFromHistory(i:number){
  snap.clear()
  snap.append(SnapLib.parse(history[i]))
  if (showGrid.value) drawGrid()
  refreshPreview()
}
function undo(){ if (canUndo.value){ historyIndex--; restoreFromHistory(historyIndex) } }
function redo(){ if (canRedo.value){ historyIndex++; restoreFromHistory(historyIndex) } }

/* ---------- element setup ---------- */
function applyPaint(el:any, strokeOnlyLocal:boolean){
  el.attr({
    fill: strokeOnlyLocal ? 'none' : fillColor.value,
    stroke: strokeOnlyLocal ? strokeColor.value : 'none',
    strokeWidth: strokeOnlyLocal ? strokeWidth.value : 0,
    'stroke-linecap': linecap.value,
    'stroke-linejoin': linejoin.value,
    cursor: 'move'
  })
}

function setupElement(el:any, strokeOnlyLocal = strokeOnly.value){
  applyPaint(el, strokeOnlyLocal)
  el.data('strokeOnly', strokeOnlyLocal)

  el.click(() => select(el))

  // drag with snapping
  el.drag(
      function (dx:number, dy:number){ moveEl(el, dx, dy) },
      function (){ select(el); pushHistory() }, // start: snapshot
      function (){}                             // end
  )
  select(el)
  refreshPreview()
}

/* ---------- draw helpers ---------- */
function drawPath(d:string, strokeOnlyLocal = strokeOnly.value){
  const path = snap.path(d)
  setupElement(path, strokeOnlyLocal)
}
function drawCircle(){
  const r = Math.max(2, snapSize.value*1.5)
  const c = snap.circle(box.value/2, box.value/2, r)
  setupElement(c, strokeOnly.value === false ? false : true) // if strokeOnly true, circle as stroke
}
function drawRect(){
  const s = Math.max(6, snapSize.value*3)
  const r = snap.rect((box.value - s)/2, (box.value - s)/2, s, s)
  setupElement(r, strokeOnly.value)
}
function drawSmallCircle(){ const c = snap.circle(box.value/2, box.value/2, snapSize.value); setupElement(c, strokeOnly.value) }
function drawSmallRect(){ const s = snapSize.value*2; const r = snap.rect((box.value - s)/2, (box.value - s)/2, s, s); setupElement(r, strokeOnly.value) }

/* icons (paths scaled to current box dimensions assuming 64) */
const S = () => box.value/64
const P = (d:string) => d.replace(/(\d+(\.\d+)?)/g, (m)=> String(parseFloat(m)*S()))
const drawChevronRight = () => drawPath(P('M24 16 L40 32 L24 48'), true)
const drawChevronLeft  = () => drawPath(P('M40 16 L24 32 L40 48'), true)
const drawChevronUp    = () => drawPath(P('M16 40 L32 24 L48 40'), true)
const drawChevronDown  = () => drawPath(P('M16 24 L32 40 L48 24'), true)

const drawAngleRight = () => drawPath(P('M16 16 L40 32 L16 48'), true)
const drawAngleLeft  = () => drawPath(P('M48 16 L24 32 L48 48'), true)
const drawDoubleAngleRight = () => drawPath(P('M22 16 L34 32 L22 48 M34 16 L46 32 L34 48'), true)
const drawDoubleAngleLeft  = () => drawPath(P('M42 16 L30 32 L42 48 M30 16 L18 32 L30 48'), true)

const drawVerticalDots   = () => drawPath(P('M32 20 a2 2 0 1 0 0.1 0 M32 32 a2 2 0 1 0 0.1 0 M32 44 a2 2 0 1 0 0.1 0'), false)
const drawHorizontalDots = () => drawPath(P('M20 32 a2 2 0 1 0 0.1 0 M32 32 a2 2 0 1 0 0.1 0 M44 32 a2 2 0 1 0 0.1 0'), false)

const drawBurgerClassic = () => drawPath(P('M16 22 H48 M16 32 H48 M16 42 H48'), true)
const drawBurgerThin    = () => drawPath(P('M16 24 H48 M16 32 H48 M16 40 H48'), true)
const drawBurgerOffset  = () => drawPath(P('M16 20 H48 M24 32 H48 M32 44 H48'), true)

const drawCloseIcon  = () => drawPath(P('M20 20 L44 44 M44 20 L20 44'), true)
const drawTrashIcon  = () => drawPath(P('M20 24 H44 L40 48 H24 Z M28 24 V20 H36 V24'), true)
const drawSearchIcon = () => drawPath(P('M40 40 L48 48 M28 40 A12 12 0 1 1 40 28 12 12 0 0 1 28 40 Z'), true)
const drawCheckIcon  = () => drawPath(P('M20 34 L28 42 L44 24'), true)

/* ---------- preview & export ---------- */
function refreshPreview(){
  // clone everything except grid
  const elements = snap.selectAll('*').items.filter((el:any) => el.node.id !== 'grid')
  previewSnap.clear()
  elements.forEach((el:any) => {
    const clone = el.clone()
    clone.removeClass('selected').attr({ filter: null })
    previewSnap.append(clone)
  })
}

/* export svg */
function exportSvg(){
  // temporarily remove grid & selection effects
  const grid = snap.select('#grid')
  const sels = snap.selectAll('.selected')
  grid?.remove(); sels.forEach((e:any)=> e.attr({ filter: null }))
  const outer = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box.value} ${box.value}">${snap.toString()}</svg>`
  const blob = new Blob([outer], { type:'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `${filename.value || 'icon'}.svg`; a.click(); URL.revokeObjectURL(url)
  // restore
  if (showGrid.value) drawGrid()
  sels.forEach((e:any)=> e.attr({ filter: snap.filter(SnapLib.filter.shadow(0,0,1,'#3b82f6',1)) }))
  refreshPreview()
}
async function copySvg(){
  const grid = snap.select('#grid'); grid?.remove()
  const outer = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box.value} ${box.value}">${snap.toString()}</svg>`
  await navigator.clipboard.writeText(outer)
  if (showGrid.value) drawGrid()
  refreshPreview()
}
function exportPng(){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box.value} ${box.value}">${snap.toString().replace(/filter="[^"]*"/g,'')}</svg>`
  const img = new Image()
  const svgBlob = new Blob([svg], {type: 'image/svg+xml'})
  const url = URL.createObjectURL(svgBlob)
  img.onload = () => {
    const cvs = document.createElement('canvas')
    cvs.width = exportPx.value; cvs.height = exportPx.value
    const ctx = cvs.getContext('2d')!
    ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
    URL.revokeObjectURL(url)
    const a = document.createElement('a')
    a.href = cvs.toDataURL('image/png')
    a.download = `${filename.value || 'icon'}.png`
    a.click()
  }
  img.src = url
}

/* ---------- keyboard ---------- */
function onKey(e: KeyboardEvent){
  if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return
  const step = (e.shiftKey ? 2 : 1) * snapSize.value
  if (selectedShape.value){
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
      e.preventDefault()
      pushHistory()
      if (e.key==='ArrowLeft') moveEl(selectedShape.value, -step, 0)
      if (e.key==='ArrowRight') moveEl(selectedShape.value, step, 0)
      if (e.key==='ArrowUp') moveEl(selectedShape.value, 0, -step)
      if (e.key==='ArrowDown') moveEl(selectedShape.value, 0, step)
    }
    if (e.key === 'Backspace' || e.key === 'Delete'){ e.preventDefault(); deleteSelected() }
    if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='d'){ e.preventDefault(); duplicateSelected() }
  }
  if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='z'){ e.preventDefault(); undo() }
  if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='y'){ e.preventDefault(); redo() }
}

onMounted(async () => {
  await import('eve')
  const snapModule = await import('snapsvg')
  SnapLib = snapModule.default

  snap = SnapLib('#svgCanvas')
  previewSnap = SnapLib('#svgPreview')

  drawGrid()
  pushHistory()
  window.addEventListener('keydown', onKey)

  // restore prefs
  const prefs = localStorage.getItem('svgGenPrefs')
  if (prefs){
    const p = JSON.parse(prefs)
    box.value = p.box ?? box.value
    snapSize.value = p.snapSize ?? snapSize.value
    fillColor.value = p.fillColor ?? fillColor.value
    strokeColor.value = p.strokeColor ?? strokeColor.value
    strokeWidth.value = p.strokeWidth ?? strokeWidth.value
    linecap.value = p.linecap ?? linecap.value
    linejoin.value = p.linejoin ?? linejoin.value
    strokeOnly.value = p.strokeOnly ?? strokeOnly.value
    showGrid.value = p.showGrid ?? showGrid.value
    gridColor.value = p.gridColor ?? gridColor.value
    gridOpacity.value = p.gridOpacity ?? gridOpacity.value
    filename.value = p.filename ?? filename.value
  }
})
onBeforeUnmount(()=> window.removeEventListener('keydown', onKey))

/* watchers */
watch([box, snapSize, gridColor, gridOpacity, showGrid], ()=>{
  if (showGrid.value) drawGrid(); else removeGrid()
  refreshPreview()
})
watch([fillColor, strokeColor, strokeWidth, linecap, linejoin], ()=>{
  // update style of selected element live
  if (selectedShape.value){
    applyPaint(selectedShape.value, selectedShape.value.data('strokeOnly') === true)
    refreshPreview()
  }
})
watch([box, snapSize, fillColor, strokeColor, strokeWidth, linecap, linejoin, strokeOnly, showGrid, gridColor, gridOpacity, filename], ()=>{
  const prefs = {
    box: box.value, snapSize: snapSize.value, fillColor: fillColor.value,
    strokeColor: strokeColor.value, strokeWidth: strokeWidth.value,
    linecap: linecap.value, linejoin: linejoin.value, strokeOnly: strokeOnly.value,
    showGrid: showGrid.value, gridColor: gridColor.value, gridOpacity: gridOpacity.value,
    filename: filename.value
  }
  localStorage.setItem('svgGenPrefs', JSON.stringify(prefs))
}, { deep: true })

/* clear */
function clearCanvas(){
  if (!confirm('Clear the canvas?')) return
  snap.clear()
  selectedShape.value = null
  if (showGrid.value) drawGrid()
  pushHistory()
  refreshPreview()
}
</script>

<style scoped>
.input { @apply text-black w-full px-3 py-2 rounded-md border border-gray-300; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed; }
.btn-primary { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-white; }
.btn-warning { @apply bg-yellow-600 hover:bg-yellow-500 px-3 py-1.5 rounded text-white; }
.btn-danger { @apply bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded text-white disabled:opacity-50; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-800; }
.icon-btn { @apply bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-500 text-white; }
</style>


