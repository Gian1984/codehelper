<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">SVG Wave Generator</h2>

    <!-- Color Picker -->
    <label class="block">
      <span class="text-gray-300">Wave Color (HEX)</span>
      <div class="flex items-center space-x-2">
        <input v-model="waveColor" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="waveColor"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateHex"
        />
      </div>
    </label>

    <!-- Controls -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label class="block">
        <span class="text-gray-300">Wave Height</span>
        <input type="range" v-model="waveHeight" min="5" max="60" step="1" class="w-full" />
      </label>
      <label class="block">
        <span class="text-gray-300">Wave Width</span>
        <input type="number" v-model="svgWidth" min="200" step="100" class="w-full p-2 rounded bg-gray-900 text-white border border-gray-700" />
      </label>
      <label class="block">
        <span class="text-gray-300">Filename</span>
        <input
            v-model="filename"
            type="text"
            class="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
            placeholder="codehelper.me-wave.svg"
        />
      </label>
      <label class="block">
        <span class="text-gray-300">Wave Frequency</span>
        <input type="range" v-model="waveFrequency" min="1" max="8" step="1" class="w-full" />
      </label>
      <label class="block">
        <span class="text-gray-300">Wave Sharpness</span>
        <input type="range" v-model="waveSharpness" min="0.2" max="2" step="0.1" class="w-full" />
      </label>
      <label class="block">
        <span class="text-gray-300">Wave Offset</span>
        <input type="range" v-model="waveOffset" min="0" max="1" step="0.1" class="w-full" />
      </label>
      <label class="block">
        <span class="text-gray-300">Mirror Wave</span>
        <input type="checkbox" v-model="mirrorWave" class="ml-2 align-middle" />
      </label>
      <label class="block">
        <span class="text-gray-300">Invert Vertically</span>
        <input type="checkbox" v-model="invertWave" class="ml-2 align-middle" />
      </label>
    </div>

    <!-- SVG Canvas -->
    <div class="border border-gray-700 rounded bg-gray-900 overflow-hidden">
      <svg id="waveSvg" :width="svgWidth" :height="svgHeight" :viewBox="`0 0 ${svgWidth} ${svgHeight}`" preserveAspectRatio="none"></svg>
    </div>

    <!-- Buttons -->
    <div class="flex flex-wrap gap-4 mt-4">
      <button @click="downloadSvg" class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500">Download SVG</button>
      <button @click="copyToClipboard" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Copy SVG</button>
      <span v-if="copied" class="text-sm text-green-400 self-center">Copied!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

const waveColor = ref('#0099ff')
const waveHeight = ref(20)
const waveFrequency = ref(2)
const waveSharpness = ref(1)
const waveOffset = ref(0)
const mirrorWave = ref(false)
const invertWave = ref(false)
const filename = ref('codehelper.me-wave.svg')
const copied = ref(false)
const svgWidth = ref(1000)
const svgHeight = computed(() => 300)

let snap: any = null

function validateHex() {
  if (!/^#[0-9A-Fa-f]{6}$/.test(waveColor.value)) {
    waveColor.value = '#0099ff'
  }
}

function drawWave() {
  if (!snap) return

  snap.clear()

  const width = svgWidth.value
  const height = svgHeight.value
  const centerY = height / 2
  const amplitude = waveHeight.value
  const freq = waveFrequency.value
  const sharp = waveSharpness.value
  const offset = waveOffset.value * amplitude

  const step = width / freq
  let path = `M 0 ${centerY + offset}`

  for (let i = 0; i < freq; i++) {
    const randomFactor = 0.8 + Math.random() * 0.4 // randomness between 0.8 and 1.2
    const randomSharp = sharp * randomFactor
    const randomAmp = amplitude * randomFactor

    const x1 = i * step + step / 4
    const y1 = centerY - randomAmp * randomSharp + offset
    const x2 = i * step + (3 * step) / 4
    const y2 = centerY + randomAmp * randomSharp + offset
    const x = (i + 1) * step
    path += ` C ${x1} ${y1}, ${x2} ${y2}, ${x} ${centerY + offset}`
  }

  path += ` L ${width} ${height} L 0 ${height} Z`

  const wave = snap.path(path).attr({
    fill: waveColor.value,
    stroke: 'none'
  })

  if (invertWave.value) {
    wave.transform(`scale(1,-1) translate(0,-${svgHeight.value})`)
  }

  if (mirrorWave.value) {
    const mirrorCenterY = invertWave.value ? (height - centerY) : centerY
    const mirroredPath = path.replaceAll(`${centerY + offset}`, `${mirrorCenterY - offset}`)

    const mirrored = snap.path(mirroredPath).attr({
      fill: waveColor.value,
      stroke: 'none',
      opacity: 0.3
    })

    if (invertWave.value) {
      mirrored.transform(`scale(1,-1) translate(0,-${svgHeight.value})`)
    }
  }
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    await import('eve')
    const SnapModule = await import('snapsvg')
    const Snap = SnapModule.default
    snap = Snap('#waveSvg')
    drawWave()
  }
})

watch([waveColor, waveHeight, waveFrequency, waveSharpness, waveOffset, mirrorWave, svgWidth, invertWave], () => {
  drawWave()
})

function downloadSvg() {
  if (!snap) return

  const svgContent = snap.toString()
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.value || 'codehelper.me-wave.svg'
  a.click()
  URL.revokeObjectURL(url)
}

function copyToClipboard() {
  if (!snap) return

  const svgContent = snap.toString()
  navigator.clipboard.writeText(svgContent).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}
</script>







