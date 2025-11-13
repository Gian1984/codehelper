<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Image Compressor</h2>

    <!-- Uploader / Dropzone -->
    <div
        class="border-2 border-dashed border-gray-600 rounded p-6 text-center bg-gray-900 text-gray-300 cursor-pointer"
        @dragover.prevent
        @drop.prevent="onDrop"
        @click="fileInput?.click()"
    >
      <p class="mb-2">Drag & drop an image here, or click to select.</p>
      <p class="text-xs text-gray-400">PNG / JPEG (WebP output supported), up to ~20MB.</p>
      <input ref="fileInput" type="file" accept="image/png,image/jpeg" class="hidden" @change="onFileChange" />
    </div>

    <!-- Controls + Preview -->
    <div v-if="original.file" class="grid md:grid-cols-2 gap-6">
      <!-- Controls -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-white text-sm">Output format</label>
          <select
              v-model="options.format"
              class="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1"
          >
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp" :disabled="!webpSupported">WebP</option>
          </select>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-white text-sm">Quality (JPEG/WebP)</label>
            <span class="text-gray-300 text-sm">{{ Math.round(options.quality*100) }}</span>
          </div>
          <input
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              v-model.number="options.quality"
              class="w-full"
              :disabled="options.format === 'image/png'"
          />
          <p v-if="options.format === 'image/png'" class="text-xs text-gray-400">
            PNG ignores quality (lossless). Try WebP or JPEG for smaller files.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white text-sm mb-1">Max width (px)</label>
            <input type="number" min="1" v-model.number="options.maxWidth"
                   class="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label class="block text-white text-sm mb-1">Max height (px)</label>
            <input type="number" min="1" v-model.number="options.maxHeight"
                   class="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full" />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input id="keepRatio" type="checkbox" v-model="options.keepAspectRatio" />
          <label for="keepRatio" class="text-white text-sm">Keep aspect ratio</label>
        </div>

        <div class="flex flex-wrap gap-3">
          <button
              @click="compress"
              :disabled="!original.file || processing"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded shadow"
          >
            {{ processing ? 'Processing…' : 'Compress' }}
          </button>

          <button v-if="optimized.blobUrl" @click="download"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow">
            Download
          </button>

          <button v-if="original.file" @click="reset"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow">
            Reset
          </button>
        </div>
      </div>

      <!-- Preview -->
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-white text-sm mb-2">Original</p>
            <div class="border border-gray-700 rounded overflow-hidden bg-black/30">
              <img v-if="original.previewUrl" :src="original.previewUrl" class="w-full h-60 object-contain" alt="original" loading="lazy" decoding="async" />
            </div>
            <p class="text-xs text-gray-400 mt-2">
              {{ original.width }}×{{ original.height }} • {{ prettySize(original.size) }}
            </p>
          </div>
          <div>
            <p class="text-white text-sm mb-2">Optimized</p>
            <div class="border border-gray-700 rounded overflow-hidden bg-black/30">
              <img v-if="optimized.blobUrl" :src="optimized.blobUrl" class="w-full h-60 object-contain" alt="optimized" loading="lazy" decoding="async" />
            </div>
            <p class="text-xs text-gray-400 mt-2" v-if="optimized.size">
              {{ optimized.width }}×{{ optimized.height }} • {{ prettySize(optimized.size) }}
              <span v-if="optimized.size && original.size" class="text-green-400">
                (−{{ savedPercent }}%)
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <p class="text-xs text-gray-400" v-if="!original.file">
      Tip: WebP or JPEG with lower quality yields the best size reduction for photos.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

type LoadedImage = { file: File | null; previewUrl: string | null; width: number; height: number; size: number }
type OptimizedImage = { blob: Blob | null; blobUrl: string | null; width: number; height: number; size: number }

const fileInput = ref<HTMLInputElement | null>(null)
const processing = ref(false)
const webpSupported = ref(true) // assume true; verify on mount

const original = reactive<LoadedImage>({ file: null, previewUrl: null, width: 0, height: 0, size: 0 })
const optimized = reactive<OptimizedImage>({ blob: null, blobUrl: null, width: 0, height: 0, size: 0 })

const options = reactive({
  format: 'image/jpeg' as 'image/jpeg' | 'image/png' | 'image/webp',
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080,
  keepAspectRatio: true
})

onMounted(() => {
  webpSupported.value = canEncodeType('image/webp')
  if (!webpSupported.value && options.format === 'image/webp') {
    options.format = 'image/jpeg'
  }
})

function canEncodeType(type: string) {
  try {
    const c = document.createElement('canvas')
    return c.toDataURL(type).startsWith(`data:${type}`)
  } catch {
    return false
  }
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) loadFile(file)
}

function onDrop(e: DragEvent) {
  const file = e.dataTransfer?.files?.[0]
  if (file) loadFile(file)
}

function loadFile(file: File) {
  resetOptimized()
  original.file = file
  original.size = file.size

  const url = URL.createObjectURL(file)
  const img = new Image()
  img.onload = () => {
    original.width = img.width
    original.height = img.height
    if (original.previewUrl) URL.revokeObjectURL(original.previewUrl)
    original.previewUrl = url
  }
  img.src = url
}

function prettySize(bytes: number) {
  if (!bytes && bytes !== 0) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0, n = bytes
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++ }
  return `${n.toFixed(2)} ${units[i]}`
}

const savedPercent = computed(() => {
  if (!original.size || !optimized.size) return 0
  return Math.max(0, Math.round((1 - optimized.size / original.size) * 100))
})

async function compress() {
  if (!original.file) return
  processing.value = true
  try {
    const imgBitmap = await createImageBitmap(original.file)
    // compute target size
    let targetW = imgBitmap.width
    let targetH = imgBitmap.height

    if (options.keepAspectRatio) {
      const ratio = imgBitmap.width / imgBitmap.height
      if (options.maxWidth && targetW > options.maxWidth) {
        targetW = options.maxWidth
        targetH = Math.round(targetW / ratio)
      }
      if (options.maxHeight && targetH > options.maxHeight) {
        targetH = options.maxHeight
        targetW = Math.round(targetH * ratio)
      }
    } else {
      targetW = Math.min(targetW, options.maxWidth || targetW)
      targetH = Math.min(targetH, options.maxHeight || targetH)
    }

    const canvas = document.createElement('canvas')
    canvas.width = targetW
    canvas.height = targetH
    const ctx = canvas.getContext('2d', { alpha: options.format !== 'image/jpeg' })!
    ctx.drawImage(imgBitmap, 0, 0, targetW, targetH)

    const desiredType = options.format === 'image/webp' && !webpSupported.value ? 'image/jpeg' : options.format
    const quality = desiredType === 'image/png' ? 1 : options.quality

    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
          b => (b ? resolve(b) : reject(new Error('toBlob failed or unsupported type'))),
          desiredType,
          quality
      )
    })

    resetOptimized()
    optimized.blob = blob
    optimized.blobUrl = URL.createObjectURL(blob)
    optimized.size = blob.size
    optimized.width = targetW
    optimized.height = targetH
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown error'
    alert(`Compression failed: ${errorMsg}. Try switching format or using a different image.`)
  } finally {
    processing.value = false
  }
}

function download() {
  if (!optimized.blob) return
  const a = document.createElement('a')
  let ext = 'jpg'
  if (options.format === 'image/png') ext = 'png'
  if (options.format === 'image/webp' && webpSupported.value) ext = 'webp'
  const base = original.file?.name.replace(/\.(png|jpe?g|webp)$/i, '') || 'image'
  a.href = optimized.blobUrl!
  a.download = `${base}-optimized.${ext}`
  a.click()
}

function resetOptimized() {
  if (optimized.blobUrl) URL.revokeObjectURL(optimized.blobUrl)
  optimized.blob = null
  optimized.blobUrl = null
  optimized.size = 0
  optimized.width = 0
  optimized.height = 0
}

function reset() {
  if (original.previewUrl) URL.revokeObjectURL(original.previewUrl)
  original.file = null
  original.previewUrl = null
  original.width = 0
  original.height = 0
  original.size = 0
  resetOptimized()
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<style scoped>

</style>
