<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white mx-auto">
    <!-- Header -->
    <div class="card">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 class="text-2xl font-semibold">✨ SVG Icon Generator</h2>
          <p class="text-sm text-gray-400 mt-1">Create custom SVG icons with 33+ shapes and export as multi-size icon packs</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn" @click="undo" :disabled="!canUndo" title="Undo (Ctrl/⌘+Z)">↶ undo</button>
          <button class="btn" @click="redo" :disabled="!canRedo" title="Redo (Ctrl/⌘+Y)">↷ redo</button>
          <button class="btn-warning" @click="clearCanvas" title="Clear canvas">🗑️ clear</button>
        </div>
      </div>
    </div>

    <!-- toolbar -->
    <section class="card">
      <h3 class="text-sm font-semibold text-indigo-400 mb-3">🔧 Shapes</h3>
      <div class="space-y-3">
        <!-- base shapes -->
        <div class="flex flex-wrap gap-2">
          <div class="text-xs text-gray-400 w-full">basic</div>
          <button class="icon-btn" @click="drawCircle" title="Circle">●</button>
          <button class="icon-btn" @click="drawRect" title="Square">■</button>
          <button class="icon-btn" @click="drawSmallCircle" title="Small Dot">◦</button>
          <button class="icon-btn" @click="drawSmallRect" title="Small Square">▫︎</button>
          <button class="icon-btn" @click="drawTriangle" title="Triangle">▲</button>
          <button class="icon-btn" @click="drawStar" title="Star">★</button>
          <button class="icon-btn" @click="drawHeart" title="Heart">♥</button>
          <button class="icon-btn" @click="drawDiamond" title="Diamond">◆</button>
          <button class="icon-btn" @click="drawPentagon" title="Pentagon">⬟</button>
          <button class="icon-btn" @click="drawHexagon" title="Hexagon">⬡</button>
          <button class="icon-btn" @click="drawOctagon" title="Octagon">⯄</button>
          <button class="icon-btn" @click="drawCross" title="Cross">✚</button>
          <button class="icon-btn" @click="drawMoon" title="Moon">☾</button>
          <button class="icon-btn" @click="drawCloud" title="Cloud">☁</button>
        </div>

        <!-- arrows -->
        <div class="flex flex-wrap gap-2">
          <div class="text-xs text-gray-400 w-full">arrows</div>
          <button class="icon-btn" @click="drawArrowRight" title="Arrow Right">→</button>
          <button class="icon-btn" @click="drawArrowLeft" title="Arrow Left">←</button>
          <button class="icon-btn" @click="drawArrowUp" title="Arrow Up">↑</button>
          <button class="icon-btn" @click="drawArrowDown" title="Arrow Down">↓</button>
          <button class="icon-btn" @click="drawChevronRight" title="Chevron Right">›</button>
          <button class="icon-btn" @click="drawChevronLeft" title="Chevron Left">‹</button>
          <button class="icon-btn" @click="drawChevronUp" title="Chevron Up">˄</button>
          <button class="icon-btn" @click="drawChevronDown" title="Chevron Down">˅</button>
          <button class="icon-btn" @click="drawAngleRight" title="Angle Right">&gt;</button>
          <button class="icon-btn" @click="drawAngleLeft" title="Angle Left">&lt;</button>
          <button class="icon-btn" @click="drawDoubleAngleRight" title="Double Right">»</button>
          <button class="icon-btn" @click="drawDoubleAngleLeft" title="Double Left">«</button>
        </div>

        <!-- menu / dots -->
        <div class="flex flex-wrap gap-2">
          <div class="text-xs text-gray-400 w-full">menu</div>
          <button class="icon-btn" @click="drawVerticalDots" title="Dots Vertical">⋮</button>
          <button class="icon-btn" @click="drawHorizontalDots" title="Dots Horizontal">⋯</button>
          <button class="icon-btn" @click="drawBurgerClassic" title="Burger">☰</button>
          <button class="icon-btn" @click="drawBurgerThin" title="Burger Thin">≡</button>
          <button class="icon-btn" @click="drawBurgerOffset" title="Burger Offset">☱</button>
        </div>

        <!-- ui icons -->
        <div class="flex flex-wrap gap-2">
          <div class="text-xs text-gray-400 w-full">ui basic</div>
          <button class="icon-btn" @click="drawCloseIcon" title="Close">✕</button>
          <button class="icon-btn" @click="drawCheckIcon" title="Check">✔︎</button>
          <button class="icon-btn" @click="drawTrashIcon" title="Trash">🗑</button>
          <button class="icon-btn" @click="drawSearchIcon" title="Search">🔍</button>
          <button class="icon-btn" @click="drawHomeIcon" title="Home">🏠</button>
          <button class="icon-btn" @click="drawUserIcon" title="User">👤</button>
          <button class="icon-btn" @click="drawSettingsIcon" title="Settings">⚙</button>
          <button class="icon-btn" @click="drawBellIcon" title="Bell">🔔</button>
          <button class="icon-btn" @click="drawPlusIcon" title="Plus">+</button>
          <button class="icon-btn" @click="drawMinusIcon" title="Minus">−</button>
          <button class="icon-btn" @click="drawMailIcon" title="Mail">✉</button>
          <button class="icon-btn" @click="drawLinkIcon" title="Link">🔗</button>
          <button class="icon-btn" @click="drawDownloadIcon" title="Download">⬇</button>
          <button class="icon-btn" @click="drawUploadIcon" title="Upload">⬆</button>
        </div>

        <!-- arrow variations -->
        <div class="flex flex-wrap gap-2">
          <div class="text-xs text-gray-400 w-full">arrow variations</div>
          <button class="icon-btn" @click="drawArrowCircleUp" title="Arrow Circle Up">⇧</button>
          <button class="icon-btn" @click="drawArrowCircleDown" title="Arrow Circle Down">⇩</button>
          <button class="icon-btn" @click="drawArrowCircleLeft" title="Arrow Circle Left">⇦</button>
          <button class="icon-btn" @click="drawArrowCircleRight" title="Arrow Circle Right">⇨</button>
          <button class="icon-btn" @click="drawCaretUp" title="Caret Up">▴</button>
          <button class="icon-btn" @click="drawCaretDown" title="Caret Down">▾</button>
          <button class="icon-btn" @click="drawCaretLeft" title="Caret Left">◂</button>
          <button class="icon-btn" @click="drawCaretRight" title="Caret Right">▸</button>
          <button class="icon-btn" @click="drawRefresh" title="Refresh">↻</button>
          <button class="icon-btn" @click="drawSync" title="Sync">⟳</button>
          <button class="icon-btn" @click="drawExpand" title="Expand">⤢</button>
          <button class="icon-btn" @click="drawCompress" title="Compress">⤡</button>
        </div>

        <!-- status & info -->
        <div class="flex flex-wrap gap-2">
          <div class="text-xs text-gray-400 w-full">status & info</div>
          <button class="icon-btn" @click="drawInfoCircle" title="Info">ⓘ</button>
          <button class="icon-btn" @click="drawWarning" title="Warning">⚠</button>
          <button class="icon-btn" @click="drawError" title="Error">⊗</button>
          <button class="icon-btn" @click="drawSuccess" title="Success">✓</button>
          <button class="icon-btn" @click="drawQuestion" title="Question">?</button>
          <button class="icon-btn" @click="drawExclamation" title="Exclamation">!</button>
        </div>

        <!-- files & folders -->
        <div class="flex flex-wrap gap-2">
          <div class="text-xs text-gray-400 w-full">files & folders</div>
          <button class="icon-btn" @click="drawFile" title="File">📄</button>
          <button class="icon-btn" @click="drawFolder" title="Folder">📁</button>
          <button class="icon-btn" @click="drawFolderOpen" title="Folder Open">📂</button>
          <button class="icon-btn" @click="drawEdit" title="Edit">✎</button>
          <button class="icon-btn" @click="drawCopy" title="Copy">⎘</button>
          <button class="icon-btn" @click="drawSave" title="Save">💾</button>
        </div>

        <!-- media & time -->
        <div class="flex flex-wrap gap-2">
          <div class="text-xs text-gray-400 w-full">media & time</div>
          <button class="icon-btn" @click="drawPlay" title="Play">▶</button>
          <button class="icon-btn" @click="drawPause" title="Pause">⏸</button>
          <button class="icon-btn" @click="drawStop" title="Stop">⏹</button>
          <button class="icon-btn" @click="drawClock" title="Clock">🕐</button>
          <button class="icon-btn" @click="drawCalendar" title="Calendar">📅</button>
          <button class="icon-btn" @click="drawBookmark" title="Bookmark">🔖</button>
          <button class="icon-btn" @click="drawTag" title="Tag">🏷</button>
          <button class="icon-btn" @click="drawLock" title="Lock">🔒</button>
          <button class="icon-btn" @click="drawUnlock" title="Unlock">🔓</button>
        </div>

        <!-- selection tools -->
        <div class="flex flex-wrap gap-2 pt-2 border-t border-gray-700">
          <div class="text-xs text-gray-400 w-full">tools</div>
          <button class="btn" @click="centerH" title="Align Horizontal Center">⬌ align H</button>
          <button class="btn" @click="centerV" title="Align Vertical Center">⬍ align V</button>
          <button class="btn" @click="bringToFront" title="Bring to Front">⬆ front</button>
          <button class="btn" @click="sendToBack" title="Send to Back">⬇ back</button>
          <button class="btn" @click="duplicateSelected" title="Duplicate (Ctrl/⌘+D)">⎘ duplicate</button>
          <button class="btn-danger" @click="deleteSelected" :disabled="!selectedShape" title="Delete (Backspace)">🗑️ delete</button>
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
        <div class="text-xs text-center text-gray-400 py-1 bg-black">Output: {{ box }}x{{ box }} viewBox</div>
      </div>

      <div class="space-y-2">
        <h3 class="font-medium text-indigo-400">👁️ preview (1:1)</h3>
        <div class="border border-gray-700 bg-white rounded p-2 w-[220px]">
          <svg id="svgPreview" :viewBox="`0 0 ${box} ${box}`" :width="box" :height="box" />
        </div>
      </div>
    </section>

    <!-- controls -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- size/grid -->
      <div class="card space-y-3">
        <h3 class="text-sm font-semibold text-indigo-400 mb-2">📐 Canvas</h3>
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
            <input v-model="gridColor" type="color" class="w-9 h-7 p-0 border border-gray-700 bg-black rounded" />
          </label>
          <label class="inline-flex items-center gap-2">
            <span class="text-sm text-gray-300">opacity</span>
            <input v-model.number="gridOpacity" type="range" min="0" max="1" step="0.05" class="w-28" />
          </label>
        </div>
      </div>

      <!-- paint -->
      <div class="card space-y-3">
        <h3 class="text-sm font-semibold text-indigo-400 mb-2">🎨 Paint</h3>
        <div class="grid grid-cols-2 gap-3">
          <label class="block">
            <span class="text-sm text-gray-300">fill</span>
            <div class="flex items-center gap-2 mt-1">
              <input v-model="fillColor" type="color" class="w-10 h-8 p-0 border border-gray-700 bg-black rounded" />
              <input v-model="fillColor" maxlength="7" class="input" @blur="normalizeHex('fill')" />
            </div>
          </label>

          <label class="block">
            <span class="text-sm text-gray-300">stroke</span>
            <div class="flex items-center gap-2 mt-1">
              <input v-model="strokeColor" type="color" class="w-10 h-8 p-0 border border-gray-700 bg-black rounded" />
              <input v-model="strokeColor" maxlength="7" class="input" @blur="normalizeHex('stroke')" />
            </div>
          </label>
        </div>

        <!-- color presets -->
        <div class="space-y-2">
          <div class="text-xs text-gray-400">quick colors</div>
          <div class="flex flex-wrap gap-1">
            <button v-for="c in colorPresets" :key="c"
              @click="applyColorPreset(c)"
              :style="{backgroundColor: c}"
              class="w-7 h-7 rounded border border-gray-700 hover:scale-110 transition-transform"
              :title="c"
            />
          </div>
        </div>

        <!-- recent colors -->
        <div v-if="recentColors.length" class="space-y-2">
          <div class="text-xs text-gray-400">recent</div>
          <div class="flex flex-wrap gap-1">
            <button v-for="(c, i) in recentColors" :key="i"
              @click="applyColorPreset(c)"
              :style="{backgroundColor: c}"
              class="w-7 h-7 rounded border border-gray-700 hover:scale-110 transition-transform"
              :title="c"
            />
          </div>
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
        <h3 class="text-sm font-semibold text-indigo-400 mb-2">📦 Export</h3>
        <label class="block">
          <span class="text-sm text-gray-300">filename</span>
          <input v-model="filename" class="input" />
        </label>
        <div class="flex flex-wrap gap-2">
          <button class="btn-primary" @click="exportSvg" title="Download .svg">⬇️ SVG</button>
          <button class="btn" @click="copySvg" title="Copy SVG code">📋 copy</button>
          <button class="btn" @click="showExportModal = true" title="Export icon pack">📦 icon pack</button>
          <label class="btn cursor-pointer" title="Import SVG">
            📥 import
            <input type="file" accept=".svg,image/svg+xml" @change="importSvg" class="hidden" ref="importInput" />
          </label>
        </div>
      </div>
    </div>

    <!-- Export Modal -->
    <div v-if="showExportModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" @click.self="showExportModal = false">
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">📦 Export Icon Pack</h3>
          <button @click="showExportModal = false" class="text-gray-400 hover:text-white">✕</button>
        </div>

        <p class="text-sm text-gray-400">Export your icon in multiple sizes as PNG files in a ZIP archive.</p>

        <div class="space-y-3">
          <label class="block">
            <span class="text-sm text-gray-300">Select sizes</span>
            <div class="grid grid-cols-3 gap-2 mt-2">
              <label v-for="size in [16, 24, 32, 48, 64, 96, 128, 256, 512]" :key="size"
                class="flex items-center gap-2 text-sm">
                <input type="checkbox" :value="size" v-model="selectedSizes" class="w-4 h-4" />
                <span>{{ size }}px</span>
              </label>
            </div>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" v-model="includeSvgInPack" class="w-4 h-4" />
            <span>Include SVG file</span>
          </label>
        </div>

        <div class="flex gap-2">
          <button @click="exportIconPack" class="btn-primary flex-1">⬇️ Download Pack</button>
          <button @click="showExportModal = false" class="btn">cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, onBeforeUnmount } from 'vue'
import JSZip from 'jszip'

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

const filename = ref('icon')

const selectedShape = ref<any>(null)

/* color presets */
const colorPresets = [
  '#000000', '#FFFFFF', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
  '#6366F1', '#14B8A6', '#F97316', '#84CC16'
]
const recentColors = ref<string[]>([])

/* export modal */
const showExportModal = ref(false)
const selectedSizes = ref([16, 24, 32, 64, 128, 256])
const includeSvgInPack = ref(true)
const importInput = ref<HTMLInputElement | null>(null)

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

/* color presets */
function applyColorPreset(color: string) {
  if (strokeOnly.value) {
    strokeColor.value = color
  } else {
    fillColor.value = color
  }
  addToRecentColors(color)
}

function addToRecentColors(color: string) {
  const upper = color.toUpperCase()
  if (!recentColors.value.includes(upper)) {
    recentColors.value.unshift(upper)
    if (recentColors.value.length > 8) recentColors.value.pop()
    localStorage.setItem('iconGenRecentColors', JSON.stringify(recentColors.value))
  }
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

/* new shapes */
const drawTriangle = () => drawPath(P('M32 16 L48 48 L16 48 Z'), strokeOnly.value)
const drawStar = () => drawPath(P('M32 16 L36 28 L48 28 L38 36 L42 48 L32 40 L22 48 L26 36 L16 28 L28 28 Z'), strokeOnly.value)
const drawHeart = () => drawPath(P('M32 44 C32 44 16 32 16 24 C16 20 18 16 22 16 C26 16 32 20 32 20 C32 20 38 16 42 16 C46 16 48 20 48 24 C48 32 32 44 32 44 Z'), strokeOnly.value)

/* geometric shapes */
const drawDiamond = () => drawPath(P('M32 16 L48 32 L32 48 L16 32 Z'), strokeOnly.value)
const drawPentagon = () => drawPath(P('M32 16 L48 26 L42 46 L22 46 L16 26 Z'), strokeOnly.value)
const drawHexagon = () => drawPath(P('M32 16 L46 24 L46 40 L32 48 L18 40 L18 24 Z'), strokeOnly.value)
const drawOctagon = () => drawPath(P('M24 16 L40 16 L48 24 L48 40 L40 48 L24 48 L16 40 L16 24 Z'), strokeOnly.value)
const drawCross = () => drawPath(P('M32 16 V48 M16 32 H48'), true)
const drawMoon = () => drawPath(P('M40 16 A16 16 0 1 0 40 48 A12 12 0 1 1 40 16 Z'), strokeOnly.value)
const drawCloud = () => drawPath(P('M20 36 C16 36 14 33 14 30 C14 27 16 24 20 24 C20 20 24 16 30 16 C36 16 40 20 40 24 C44 24 48 27 48 32 C48 36 44 40 40 40 H20 C20 40 20 38 20 36 Z'), strokeOnly.value)

/* arrows */
const drawArrowRight = () => drawPath(P('M16 32 H44 M36 24 L44 32 L36 40'), true)
const drawArrowLeft  = () => drawPath(P('M48 32 H20 M28 24 L20 32 L28 40'), true)
const drawArrowUp    = () => drawPath(P('M32 48 V20 M24 28 L32 20 L40 28'), true)
const drawArrowDown  = () => drawPath(P('M32 16 V44 M24 36 L32 44 L40 36'), true)

/* more ui icons */
const drawHomeIcon     = () => drawPath(P('M16 32 L32 16 L48 32 V48 H36 V36 H28 V48 H16 Z'), strokeOnly.value)
const drawUserIcon     = () => drawPath(P('M32 28 A8 8 0 1 1 32 28.1 M44 48 C44 40 38 36 32 36 C26 36 20 40 20 48'), true)
const drawSettingsIcon = () => drawPath(P('M32 24 A8 8 0 1 0 32 40 A8 8 0 1 0 32 24 M32 16 V20 M32 44 V48 M44 32 H48 M16 32 H20 M40 40 L43 43 M21 21 L24 24 M40 24 L43 21 M21 43 L24 40'), true)
const drawBellIcon     = () => drawPath(P('M28 16 C28 16 28 14 32 14 C36 14 36 16 36 16 C36 16 42 18 42 28 V36 L44 40 H20 L22 36 V28 C22 18 28 16 28 16 M28 44 C28 46 30 48 32 48 C34 48 36 46 36 44'), true)
const drawPlusIcon     = () => drawPath(P('M32 16 V48 M16 32 H48'), true)
const drawMinusIcon    = () => drawPath(P('M16 32 H48'), true)
const drawMailIcon     = () => drawPath(P('M16 20 H48 V44 H16 Z M16 20 L32 32 L48 20'), true)
const drawLinkIcon     = () => drawPath(P('M28 36 L36 28 M24 28 L28 24 A8 8 0 0 1 40 24 L44 28 M40 36 L36 40 A8 8 0 0 1 24 40 L20 36'), true)
const drawDownloadIcon = () => drawPath(P('M32 16 V40 M24 32 L32 40 L40 32 M20 44 H44'), true)
const drawUploadIcon   = () => drawPath(P('M32 40 V16 M24 24 L32 16 L40 24 M20 44 H44'), true)

/* arrow variations */
const drawArrowCircleUp = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M32 36 V24 M28 28 L32 24 L36 28'), true)
const drawArrowCircleDown = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M32 24 V36 M28 32 L32 36 L36 32'), true)
const drawArrowCircleLeft = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M36 32 H24 M28 28 L24 32 L28 36'), true)
const drawArrowCircleRight = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M24 32 H36 M32 28 L36 32 L32 36'), true)
const drawCaretUp = () => drawPath(P('M16 36 L32 20 L48 36 Z'), false)
const drawCaretDown = () => drawPath(P('M16 28 L32 44 L48 28 Z'), false)
const drawCaretLeft = () => drawPath(P('M36 16 L20 32 L36 48 Z'), false)
const drawCaretRight = () => drawPath(P('M28 16 L44 32 L28 48 Z'), false)
const drawRefresh = () => drawPath(P('M40 20 A12 12 0 1 0 40 44 M40 20 L44 16 M40 20 L36 16 M40 44 L44 48 M40 44 L36 48'), true)
const drawSync = () => drawPath(P('M24 20 A12 12 0 0 1 40 24 M40 24 L44 20 M40 24 L40 28 M40 44 A12 12 0 0 1 24 40 M24 40 L20 44 M24 40 L24 36'), true)
const drawExpand = () => drawPath(P('M16 16 L28 16 L28 20 L20 20 L20 28 L16 28 Z M48 16 L36 16 L36 20 L44 20 L44 28 L48 28 Z M16 48 L28 48 L28 44 L20 44 L20 36 L16 36 Z M48 48 L36 48 L36 44 L44 44 L44 36 L48 36 Z'), strokeOnly.value)
const drawCompress = () => drawPath(P('M28 28 L16 16 M28 28 L28 20 M28 28 L20 28 M36 28 L48 16 M36 28 L36 20 M36 28 L44 28 M28 36 L16 48 M28 36 L28 44 M28 36 L20 36 M36 36 L48 48 M36 36 L36 44 M36 36 L44 36'), true)

/* status & info icons */
const drawInfoCircle = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M32 28 V40 M32 22 V24'), true)
const drawWarning = () => drawPath(P('M32 16 L48 46 H16 Z M32 28 V36 M32 40 V42'), true)
const drawError = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M24 24 L40 40 M40 24 L24 40'), true)
const drawSuccess = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M24 32 L30 38 L42 26'), true)
const drawQuestion = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M26 26 C26 22 28 20 32 20 C36 20 38 22 38 26 C38 30 32 30 32 34 M32 40 V42'), true)
const drawExclamation = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M32 24 V34 M32 38 V40'), true)

/* files & folders */
const drawFile = () => drawPath(P('M24 16 H36 L42 22 V48 H24 Z M36 16 V22 H42'), strokeOnly.value)
const drawFolder = () => drawPath(P('M16 22 V46 H48 V26 H32 L28 22 Z'), strokeOnly.value)
const drawFolderOpen = () => drawPath(P('M16 22 V40 L20 46 H48 L44 26 H32 L28 22 Z M16 22 H28'), strokeOnly.value)
const drawEdit = () => drawPath(P('M38 18 L42 22 L28 36 L24 38 L26 34 L40 20 M40 20 L44 24 L30 38 L26 40 L28 36 Z M20 44 H44'), true)
const drawCopy = () => drawPath(P('M28 20 H40 V32 H44 V16 H28 Z M24 24 H36 L40 28 V48 H24 Z'), strokeOnly.value)
const drawSave = () => drawPath(P('M20 16 V48 H44 V20 L40 16 Z M28 16 V24 H36 V16 M28 34 H36'), strokeOnly.value)

/* media & time */
const drawPlay = () => drawPath(P('M24 16 L24 48 L44 32 Z'), strokeOnly.value)
const drawPause = () => drawPath(P('M24 16 V48 M40 16 V48'), true)
const drawStop = () => drawPath(P('M20 20 H44 V44 H20 Z'), strokeOnly.value)
const drawClock = () => drawPath(P('M32 16 A16 16 0 1 0 32 48 A16 16 0 1 0 32 16 M32 24 V32 L38 38'), true)
const drawCalendar = () => drawPath(P('M18 22 H46 V46 H18 Z M18 28 H46 M26 18 V24 M38 18 V24'), strokeOnly.value)
const drawBookmark = () => drawPath(P('M24 16 H40 V48 L32 42 L24 48 Z'), strokeOnly.value)
const drawTag = () => drawPath(P('M16 16 V32 L32 48 L48 32 L32 16 Z M26 26 A2 2 0 1 0 26 26.1'), strokeOnly.value)
const drawLock = () => drawPath(P('M24 28 V24 C24 20 27 16 32 16 C37 16 40 20 40 24 V28 M20 28 H44 V48 H20 Z'), strokeOnly.value)
const drawUnlock = () => drawPath(P('M24 28 V24 C24 20 27 16 32 16 C37 16 40 20 40 24 M20 28 H44 V48 H20 Z'), strokeOnly.value)

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

/* export icon pack */
async function exportIconPack() {
  if (selectedSizes.value.length === 0 && !includeSvgInPack.value) {
    alert('Please select at least one size or include SVG')
    return
  }

  const zip = new JSZip()
  const grid = snap.select('#grid')
  grid?.remove()

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box.value} ${box.value}">${snap.toString().replace(/filter="[^"]*"/g,'')}</svg>`

  // Add SVG if requested
  if (includeSvgInPack.value) {
    zip.file(`${filename.value}.svg`, svgContent)
  }

  // Generate PNGs for each size
  for (const size of selectedSizes.value) {
    const pngData = await generatePng(svgContent, size)
    zip.file(`${filename.value}-${size}px.png`, pngData, { base64: true })
  }

  // Generate and download ZIP
  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename.value}-pack.zip`
  a.click()
  URL.revokeObjectURL(url)

  if (showGrid.value) drawGrid()
  showExportModal.value = false
}

function generatePng(svgContent: string, size: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      const cvs = document.createElement('canvas')
      cvs.width = size
      cvs.height = size
      const ctx = cvs.getContext('2d')!
      ctx.drawImage(img, 0, 0, size, size)
      URL.revokeObjectURL(url)

      // Extract base64 data without prefix
      const base64 = cvs.toDataURL('image/png').split(',')[1]
      resolve(base64)
    }

    img.src = url
  })
}

/* import SVG */
async function importSvg(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const text = await file.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'image/svg+xml')
  const svgEl = doc.querySelector('svg')

  if (!svgEl) {
    alert('Invalid SVG file')
    return
  }

  pushHistory()

  // Extract inner content and append to canvas
  const children = Array.from(svgEl.children)
  children.forEach((child) => {
    if (child.tagName !== 'defs' && child.id !== 'grid') {
      const imported = SnapLib.parse(child.outerHTML)
      snap.append(imported)

      // Setup click handlers for imported elements
      if (imported.type) {
        setupElement(imported, false)
      } else if (imported.selectAll) {
        imported.selectAll('*').forEach((el: any) => setupElement(el, false))
      }
    }
  })

  refreshPreview()

  // Reset input
  input.value = ''
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

  // restore recent colors
  const colors = localStorage.getItem('iconGenRecentColors')
  if (colors) {
    try {
      recentColors.value = JSON.parse(colors)
    } catch {}
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
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-warning {
  @apply bg-yellow-600 hover:bg-yellow-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
}

.btn-danger {
  @apply bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-white text-sm transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.card {
  @apply bg-gray-900 rounded-xl p-5 border border-gray-700;
}

.icon-btn {
  @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-lg text-white transition-colors;
}
</style>


