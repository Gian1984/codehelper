<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Border Radius Generator</h2>

    <!-- mode + unit -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex gap-2">
        <button
            class="px-3 py-1 rounded text-white"
            :class="mode === 'simple' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'"
            @click="mode = 'simple'"
        >Simple</button>
        <button
            class="px-3 py-1 rounded text-white"
            :class="mode === 'advanced' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'"
            @click="mode = 'advanced'"
        >Advanced</button>
      </div>

      <div class="ml-auto flex items-center gap-2">
        <span class="text-white text-sm">Unit</span>
        <select v-model="unit" class="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1">
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
      </div>
    </div>

    <!-- simple mode -->
    <div v-if="mode==='simple'" class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div>
          <label class="block text-white text-sm mb-1">radius</label>
          <input type="range" min="0" :max="unit==='%'?100:300" step="1" v-model.number="simple.radius" class="w-full" />
          <p class="text-gray-300 text-sm mt-1 font-mono">{{ simple.radius }}{{ unit }}</p>
        </div>

        <div class="flex items-center gap-2">
          <input id="simpleEllipse" type="checkbox" v-model="simple.ellipse" />
          <label for="simpleEllipse" class="text-white text-sm">elliptical (different horizontal/vertical)</label>
        </div>

        <div v-if="simple.ellipse" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white text-sm mb-1">horizontal</label>
            <input type="range" min="0" :max="unit==='%'?100:300" step="1" v-model.number="simple.h" class="w-full" />
            <p class="text-gray-300 text-sm mt-1 font-mono">{{ simple.h }}{{ unit }}</p>
          </div>
          <div>
            <label class="block text-white text-sm mb-1">vertical</label>
            <input type="range" min="0" :max="unit==='%'?100:300" step="1" v-model.number="simple.v" class="w-full" />
            <p class="text-gray-300 text-sm mt-1 font-mono">{{ simple.v }}{{ unit }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <button @click="preset('pill')" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded">pill</button>
          <button @click="preset('circle')" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded">circle</button>
          <button @click="randomBlob" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded">random blob</button>
          <button @click="resetAll" class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded">reset</button>
        </div>
      </div>

      <!-- preview -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-white text-sm">preview</p>
          <div class="flex items-center gap-2">
            <label class="text-white text-sm">size</label>
            <input type="number" min="50" v-model.number="preview.w" class="w-20 bg-gray-900 text-white border border-gray-600 rounded px-2 py-1" />
            <span class="text-white">×</span>
            <input type="number" min="50" v-model.number="preview.h" class="w-20 bg-gray-900 text-white border border-gray-600 rounded px-2 py-1" />
          </div>
        </div>

        <div class="relative border border-gray-700 bg-gradient-to-br from-gray-700 to-gray-900 rounded p-6">
          <div class="mx-auto" :style="previewStyle"></div>
          <div class="absolute inset-0 pointer-events-none rounded ring-1 ring-white/5"></div>
        </div>
      </div>
    </div>

    <!-- advanced mode -->
    <div v-else class="grid xl:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <input id="linkCorners" type="checkbox" v-model="linkAllCorners" />
          <label for="linkCorners" class="text-white text-sm">link all corners</label>
          <input id="linkHV" type="checkbox" v-model="linkHV" />
          <label for="linkHV" class="text-white text-sm">link horizontal/vertical for each corner</label>
        </div>

        <!-- all corners linked -->
        <div v-if="linkAllCorners" class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-white text-sm mb-1">radius (all corners)</label>
            <input type="range" min="0" :max="unitMax" step="1" v-model.number="all.h" class="w-full" />
            <p class="text-gray-300 text-sm mt-1 font-mono">{{ all.h }}{{ unit }}</p>
          </div>
          <div v-if="!linkHV">
            <label class="block text-white text-sm mb-1">vertical (all corners)</label>
            <input type="range" min="0" :max="unitMax" step="1" v-model.number="all.v" class="w-full" />
            <p class="text-gray-300 text-sm mt-1 font-mono">{{ all.v }}{{ unit }}</p>
          </div>
        </div>

        <!-- per-corner controls -->
        <div v-else class="grid sm:grid-cols-2 gap-4">
          <div class="border border-gray-700 rounded p-3 bg-gray-900" v-for="(c, key) in corners" :key="key">
            <p class="text-white text-sm mb-2">{{ labelMap[key] }}</p>
            <div class="space-y-3">
              <div>
                <label class="block text-white text-xs mb-1">horizontal</label>
                <input type="range" min="0" :max="unitMax" step="1" v-model.number="c.h" class="w-full" />
                <input type="number" min="0" :max="unitMax" v-model.number="c.h"
                       class="mt-1 w-full bg-gray-900 text-white border border-gray-600 rounded px-2 py-1" />
              </div>
              <div v-if="!linkHV">
                <label class="block text-white text-xs mb-1">vertical</label>
                <input type="range" min="0" :max="unitMax" step="1" v-model.number="c.v" class="w-full" />
                <input type="number" min="0" :max="unitMax" v-model.number="c.v"
                       class="mt-1 w-full bg-gray-900 text-white border border-gray-600 rounded px-2 py-1" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <button @click="randomBlob" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded">random blob</button>
          <button @click="resetAll" class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded">reset</button>
        </div>
      </div>

      <!-- preview + code -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-white text-sm">preview</p>
          <div class="flex items-center gap-2">
            <label class="text-white text-sm">size</label>
            <input type="number" min="50" v-model.number="preview.w" class="w-20 bg-gray-900 text-white border border-gray-600 rounded px-2 py-1" />
            <span class="text-white">×</span>
            <input type="number" min="50" v-model.number="preview.h" class="w-20 bg-gray-900 text-white border border-gray-600 rounded px-2 py-1" />
          </div>
        </div>

        <div class="relative border border-gray-700 bg-gradient-to-br from-gray-700 to-gray-900 rounded p-6">
          <div class="mx-auto" :style="previewStyle"></div>
          <div class="absolute inset-0 pointer-events-none rounded ring-1 ring-white/5"></div>
        </div>

        <!-- css output -->
        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <div class="flex items-center justify-between mb-2">
            <p class="text-gray-300 text-sm">CSS</p>
            <div class="flex gap-2">
              <button @click="copy(cssLine)" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Copy CSS</button>
              <button @click="copy(twLine)" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded">Copy Tailwind</button>
            </div>
          </div>
          <pre class="text-white font-mono whitespace-pre-wrap break-words">border-radius: {{ borderRadiusValue }};</pre>
          <p class="text-xs text-gray-400 mt-2">Tailwind (arbitrary values): {{ twLine }}</p>
        </div>
      </div>
    </div>

    <!-- code output in simple mode -->
    <div v-if="mode==='simple'" class="bg-gray-900 rounded border border-gray-700 p-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-gray-300 text-sm">CSS</p>
        <button @click="copy(cssLine)" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Copy CSS</button>
      </div>
      <pre class="text-white font-mono whitespace-pre-wrap break-words">border-radius: {{ borderRadiusValue }};</pre>
      <p class="text-xs text-gray-400 mt-2">Tailwind: {{ twLine }}</p>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

type Mode = 'simple' | 'advanced'
const mode = ref<Mode>('simple')

const unit = ref<'px' | '%'>('px')
const unitMax = computed(() => (unit.value === '%' ? 100 : 300))

// preview box
const preview = reactive({ w: 280, h: 220 })

/** -------- simple mode -------- */
const simple = reactive({
  radius: 16,
  ellipse: false,
  h: 32,
  v: 20
})

/** -------- advanced mode -------- */
const linkAllCorners = ref(true)
const linkHV = ref(true)

const all = reactive({ h: 24, v: 24 })
const corners = reactive({
  tl: { h: 24, v: 24 },
  tr: { h: 24, v: 24 },
  br: { h: 24, v: 24 },
  bl: { h: 24, v: 24 }
})
const labelMap: Record<string, string> = {
  tl: 'top-left', tr: 'top-right', br: 'bottom-right', bl: 'bottom-left'
}

// keep corners in sync when linking all
watch([() => all.h, () => all.v, linkAllCorners, linkHV], () => {
  if (!linkAllCorners.value) return
  for (const k of ['tl', 'tr', 'br', 'bl'] as const) {
    corners[k].h = all.h
    corners[k].v = linkHV.value ? all.h : all.v
  }
}, { immediate: true })

/** -------- computed border-radius string -------- */
const borderRadiusValue = computed(() => {
  const u = unit.value
  if (mode.value === 'simple') {
    if (!simple.ellipse) return `${simple.radius}${u}`

    const h = `${simple.h}${u} ${simple.h}${u} ${simple.h}${u} ${simple.h}${u}`
    const v = `${simple.v}${u} ${simple.v}${u} ${simple.v}${u} ${simple.v}${u}`
    return `${h} / ${v}`
  }

  const hArr = [corners.tl.h, corners.tr.h, corners.br.h, corners.bl.h]
  const vArr = [corners.tl.v, corners.tr.v, corners.br.v, corners.bl.v]
  const sameHV = hArr.every((n, i) => n === vArr[i])
  const allEqualH = hArr.every(n => n === hArr[0])

  if (sameHV) {
    // 1 or 4 values without slash
    if (allEqualH) return `${hArr[0]}${u}`
    return hArr.map(n => `${n}${u}`).join(' ')
  }
  // elliptical with slash
  const hStr = hArr.map(n => `${n}${u}`).join(' ')
  const vStr = vArr.map(n => `${n}${u}`).join(' ')
  return `${hStr} / ${vStr}`
})

/** preview style */
const previewStyle = computed(() => ({
  width: `${preview.w}px`,
  height: `${preview.h}px`,
  background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(16,185,129,0.5))',
  borderRadius: borderRadiusValue.value,
  boxShadow: '0 10px 25px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.04)'
} as Record<string, string>))

/** code outputs */
const cssLine = computed(() => `border-radius: ${borderRadiusValue.value};`)
const twLine = computed(() => {
  const sanitize = (s: string) => s.replace(/\s+/g, '_')
  return `rounded-[${sanitize(borderRadiusValue.value)}]`
})

/** actions */
const copiedMsg = ref('')
function copy(text: string) {
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'Copied!'
  setTimeout(() => (copiedMsg.value = ''), 1500)
}
function resetAll() {
  unit.value = 'px'
  mode.value = 'simple'
  simple.radius = 16
  simple.ellipse = false
  simple.h = 32
  simple.v = 20
  linkAllCorners.value = true
  linkHV.value = true
  all.h = 24
  all.v = 24
  for (const k of ['tl','tr','br','bl'] as const) {
    corners[k].h = 24
    corners[k].v = 24
  }
}
/** presets */
function preset(name: 'pill' | 'circle') {
  if (name === 'pill') {
    unit.value = 'px'
    mode.value = 'simple'
    simple.ellipse = false
    simple.radius = 9999
  } else if (name === 'circle') {
    unit.value = '%'
    mode.value = 'simple'
    simple.ellipse = false
    simple.radius = 50
    const s = Math.min(preview.w, preview.h)
    preview.w = s
    preview.h = s
  }
}
/** random blob */
function randomBlob() {
  unit.value = '%'
  mode.value = 'advanced'
  linkAllCorners.value = false
  linkHV.value = false
  const rnd = (min: number, max: number) => Math.round(min + Math.random() * (max - min))
  corners.tl.h = rnd(25, 75); corners.tl.v = rnd(25, 75)
  corners.tr.h = rnd(25, 75); corners.tr.v = rnd(25, 75)
  corners.br.h = rnd(25, 75); corners.br.v = rnd(25, 75)
  corners.bl.h = rnd(25, 75); corners.bl.v = rnd(25, 75)
}
</script>

<style scoped>
/* usa le utility Tailwind del progetto */
</style>
