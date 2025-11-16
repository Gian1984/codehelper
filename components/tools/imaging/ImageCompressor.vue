<template>
  <div class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 text-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">Image Compressor</h2>
        <p class="text-sm text-gray-400 mt-1">Compress and optimize images with modern formats (JPEG, PNG, WebP, AVIF)</p>
      </div>
      <div v-if="images.length > 0" class="flex items-center gap-2">
        <button class="btn" @click="reset">🗑️ Clear All</button>
      </div>
    </div>

    <!-- Uploader / Dropzone -->
    <div
        class="card border-2 border-dashed border-gray-600 hover:border-indigo-500 transition-colors p-8 text-center cursor-pointer"
        :class="{ 'border-indigo-500': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="onDrop"
        @click="fileInput?.click()"
    >
      <div class="text-6xl mb-4">🖼️</div>
      <p class="text-lg mb-2 text-gray-200">Drag & drop images here, or click to select</p>
      <p class="text-sm text-gray-400">Supports: PNG, JPEG • Output: PNG, JPEG, WebP, AVIF • Max ~20MB</p>
      <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/jpg" multiple class="hidden" @change="onFileChange" />
    </div>

    <!-- Options -->
    <div v-if="images.length > 0" class="card space-y-4">
      <h3 class="text-white text-sm font-semibold">Compression Options</h3>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="text-white text-sm font-medium mb-2 block">Output Format</label>
          <select v-model="options.format" class="input-sm w-full">
            <option value="image/jpeg">JPEG (universal)</option>
            <option value="image/png">PNG (lossless)</option>
            <option value="image/webp" :disabled="!webpSupported">WebP{{ !webpSupported ? ' (not supported)' : ' (recommended)' }}</option>
            <option value="image/avif" :disabled="!avifSupported">AVIF{{ !avifSupported ? ' (not supported)' : ' (best compression)' }}</option>
          </select>
        </div>

        <div>
          <label class="text-white text-sm font-medium mb-2 block">Quality: {{ Math.round(options.quality*100) }}%</label>
          <input
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              v-model.number="options.quality"
              class="w-full mt-2"
              :disabled="options.format === 'image/png'"
          />
        </div>

        <div>
          <label class="text-white text-sm font-medium mb-2 block">Max Width (px)</label>
          <input type="number" min="1" v-model.number="options.maxWidth"
                 class="input-sm w-full" />
        </div>

        <div>
          <label class="text-white text-sm font-medium mb-2 block">Max Height (px)</label>
          <input type="number" min="1" v-model.number="options.maxHeight"
                 class="input-sm w-full" />
        </div>
      </div>

      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex flex-wrap gap-4">
          <label class="flex items-center gap-2">
            <input id="keepRatio" type="checkbox" v-model="options.keepAspectRatio" class="w-4 h-4 accent-indigo-500" />
            <span class="text-white text-sm">Keep aspect ratio</span>
          </label>
          <label class="flex items-center gap-2">
            <input id="showExif" type="checkbox" v-model="options.showExif" class="w-4 h-4 accent-indigo-500" />
            <span class="text-white text-sm">Show EXIF data</span>
          </label>
          <label class="flex items-center gap-2">
            <input id="smartCompression" type="checkbox" v-model="options.smartCompression" class="w-4 h-4 accent-indigo-500" />
            <span class="text-white text-sm">Smart compression</span>
          </label>
        </div>

        <div class="flex gap-2">
          <button
              @click="compress"
              :disabled="processing"
              class="btn-action"
          >
            <span v-if="processing">⏳ Compressing...</span>
            <span v-else>✨ Compress All ({{ images.length }})</span>
          </button>
          <button
              v-if="images.some(img => img.optimized)"
              @click="downloadAll"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            💾 Download All
          </button>
        </div>
      </div>

      <!-- Target File Size -->
      <div v-if="options.targetFileSize > 0 || images.length > 0" class="flex items-center gap-3">
        <label class="text-white text-sm font-medium">Target file size (KB):</label>
        <input
            type="number"
            v-model.number="options.targetFileSize"
            min="0"
            placeholder="0 = disabled"
            class="input-sm w-32"
        />
        <span class="text-xs text-gray-400">(0 = disabled, auto-adjusts quality)</span>
      </div>
    </div>

    <!-- Progress Bar -->
    <div v-if="processing && processingProgress.total > 0" class="card">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-white font-medium">
            Processing {{ processingProgress.current + 1 }} of {{ processingProgress.total }}
          </span>
          <span class="text-gray-400">{{ progressPercent }}%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
              class="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              :style="{ width: `${progressPercent}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Images Grid -->
    <div v-if="images.length > 0" class="space-y-4">
      <h3 class="text-white text-sm font-semibold">Images ({{ images.length }})</h3>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(image, index) in images" :key="image.id" class="card space-y-3">
          <!-- Image Header -->
          <div class="flex items-center justify-between">
            <p class="text-white text-sm font-medium truncate">{{ image.file.name }}</p>
            <button @click="removeImage(image.id)" class="text-red-400 hover:text-red-300 text-xs">
              🗑️
            </button>
          </div>

          <!-- Original Preview -->
          <div>
            <p class="text-gray-400 text-xs mb-1">Original</p>
            <div class="border border-gray-700 rounded overflow-hidden bg-black/30">
              <img :src="image.previewUrl" class="w-full h-40 object-contain" :alt="image.file.name" loading="lazy" decoding="async" />
            </div>
            <p class="text-xs text-gray-400 mt-1">
              {{ image.width }}×{{ image.height }} • {{ prettySize(image.size) }}
            </p>

            <!-- EXIF Data -->
            <div v-if="options.showExif && image.exif" class="mt-2 p-2 bg-gray-900/50 rounded text-xs text-gray-300 space-y-1">
              <p class="font-semibold text-gray-200 mb-1">📷 EXIF Data</p>
              <p v-if="image.exif.make || image.exif.model">
                <span class="text-gray-500">Camera:</span> {{ image.exif.make }} {{ image.exif.model }}
              </p>
              <p v-if="image.exif.dateTime">
                <span class="text-gray-500">Date:</span> {{ new Date(image.exif.dateTime).toLocaleDateString() }}
              </p>
              <p v-if="image.exif.fNumber">
                <span class="text-gray-500">Aperture:</span> f/{{ image.exif.fNumber }}
              </p>
              <p v-if="image.exif.exposureTime">
                <span class="text-gray-500">Shutter:</span> 1/{{ Math.round(1 / image.exif.exposureTime) }}s
              </p>
              <p v-if="image.exif.iso">
                <span class="text-gray-500">ISO:</span> {{ image.exif.iso }}
              </p>
              <p v-if="image.exif.focalLength">
                <span class="text-gray-500">Focal:</span> {{ image.exif.focalLength }}mm
              </p>
              <p v-if="image.exif.latitude && image.exif.longitude" class="text-blue-400">
                <span class="text-gray-500">GPS:</span> {{ image.exif.latitude.toFixed(4) }}, {{ image.exif.longitude.toFixed(4) }}
              </p>
            </div>
            <p v-if="options.showExif && !image.exif" class="text-xs text-gray-500 mt-2 italic">No EXIF data available</p>
          </div>

          <!-- Optimized Preview (if exists) -->
          <div v-if="image.optimized">
            <p class="text-gray-400 text-xs mb-1">Optimized</p>
            <div class="border border-gray-700 rounded overflow-hidden bg-black/30">
              <img :src="image.optimized.blobUrl" class="w-full h-40 object-contain" :alt="`${image.file.name} optimized`" loading="lazy" decoding="async" />
            </div>
            <p class="text-xs text-gray-400 mt-1">
              {{ image.optimized.width }}×{{ image.optimized.height }} • {{ prettySize(image.optimized.size) }}
              <span class="text-green-400">
                (−{{ Math.max(0, Math.round((1 - image.optimized.size / image.size) * 100)) }}%)
              </span>
            </p>
          </div>

          <!-- Processing Indicator -->
          <div v-else-if="image.processing" class="flex items-center justify-center py-8 text-gray-400 text-sm">
            <span>⏳ Compressing...</span>
          </div>

          <!-- Empty State -->
          <div v-else class="flex items-center justify-center py-8 text-gray-500 text-sm">
            <span>Not compressed yet</span>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <button
                v-if="image.optimized"
                @click="currentImageIndex = index; download()"
                class="flex-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
            >
              💾 Download
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips & Features -->
    <div v-if="images.length === 0" class="card bg-gray-800/40">
      <h3 class="text-white text-sm font-semibold mb-3">✨ Advanced Features</h3>
      <ul class="text-xs text-gray-300 space-y-2">
        <li><strong class="text-indigo-400">📷 EXIF Data Viewer:</strong> Enable "Show EXIF data" to view camera settings, GPS coordinates, and metadata from your photos</li>
        <li><strong class="text-indigo-400">🧠 Smart Compression:</strong> Automatically selects the best format and quality settings based on image type (photos → AVIF/WebP, graphics → PNG)</li>
        <li><strong class="text-indigo-400">🎯 Target File Size:</strong> Set a target size in KB and the compressor will automatically adjust quality to meet it (uses binary search)</li>
        <li><strong class="text-indigo-400">📦 Batch Processing:</strong> Upload multiple images, compress all at once, and download as a ZIP archive</li>
      </ul>
      <p class="text-xs text-gray-400 mt-3 italic">
        💡 Tip: WebP or JPEG with 80-85% quality yields the best size reduction for photos while maintaining visual quality.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import JSZip from 'jszip'
import * as exifr from 'exifr'

type ExifData = {
  make?: string
  model?: string
  dateTime?: string
  exposureTime?: number
  fNumber?: number
  iso?: number
  focalLength?: number
  latitude?: number
  longitude?: number
}

type ImageItem = {
  id: string
  file: File
  previewUrl: string
  width: number
  height: number
  size: number
  exif?: ExifData | null
  optimized?: {
    blob: Blob
    blobUrl: string
    width: number
    height: number
    size: number
  }
  processing?: boolean
}

const fileInput = ref<HTMLInputElement | null>(null)
const processing = ref(false)
const isDragging = ref(false)
const webpSupported = ref(true)
const avifSupported = ref(false)

const images = ref<ImageItem[]>([])
const currentImageIndex = ref<number>(0)
const processingProgress = ref({ current: 0, total: 0 })

const options = reactive({
  format: 'image/jpeg' as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif',
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080,
  keepAspectRatio: true,
  showExif: false,
  smartCompression: false,
  targetFileSize: 0 // 0 = disabled, otherwise in KB
})

// Computed properties for backward compatibility with single-image template
const original = computed(() => {
  if (images.value.length === 0) {
    return { file: null, previewUrl: null, width: 0, height: 0, size: 0 }
  }
  const img = images.value[currentImageIndex.value]
  return {
    file: img.file,
    previewUrl: img.previewUrl,
    width: img.width,
    height: img.height,
    size: img.size
  }
})

const optimized = computed(() => {
  if (images.value.length === 0 || !images.value[currentImageIndex.value]?.optimized) {
    return { blob: null, blobUrl: null, width: 0, height: 0, size: 0 }
  }
  return images.value[currentImageIndex.value].optimized!
})

onMounted(() => {
  webpSupported.value = canEncodeType('image/webp')
  avifSupported.value = canEncodeType('image/avif')

  // Fallback if selected format not supported
  if (!webpSupported.value && options.format === 'image/webp') {
    options.format = 'image/jpeg'
  }
  if (!avifSupported.value && options.format === 'image/avif') {
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
  const files = Array.from(input.files || [])
  files.forEach(file => loadFile(file))
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  files.forEach(file => loadFile(file))
}

async function loadFile(file: File) {
  const id = Math.random().toString(36).substring(7)
  const url = URL.createObjectURL(file)

  // Read EXIF data if image supports it
  let exifData: ExifData | null = null
  try {
    const exif = await exifr.parse(file, {
      pick: ['Make', 'Model', 'DateTime', 'ExposureTime', 'FNumber', 'ISO', 'FocalLength', 'latitude', 'longitude']
    })
    if (exif) {
      exifData = {
        make: exif.Make,
        model: exif.Model,
        dateTime: exif.DateTime,
        exposureTime: exif.ExposureTime,
        fNumber: exif.FNumber,
        iso: exif.ISO,
        focalLength: exif.FocalLength,
        latitude: exif.latitude,
        longitude: exif.longitude
      }
    }
  } catch (e) {
    // EXIF not available or error reading it
    console.debug('No EXIF data available for', file.name)
  }

  const img = new Image()
  img.onload = () => {
    images.value.push({
      id,
      file,
      previewUrl: url,
      width: img.width,
      height: img.height,
      size: file.size,
      exif: exifData
    })
  }
  img.src = url
}

function removeImage(id: string) {
  const index = images.value.findIndex(img => img.id === id)
  if (index !== -1) {
    const img = images.value[index]
    URL.revokeObjectURL(img.previewUrl)
    if (img.optimized) URL.revokeObjectURL(img.optimized.blobUrl)
    images.value.splice(index, 1)
  }
}

function prettySize(bytes: number) {
  if (!bytes && bytes !== 0) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0, n = bytes
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++ }
  return `${n.toFixed(2)} ${units[i]}`
}

const savedPercent = computed(() => {
  if (!original.value.size || !optimized.value.size) return 0
  return Math.max(0, Math.round((1 - optimized.value.size / original.value.size) * 100))
})

const progressPercent = computed(() => {
  if (processingProgress.value.total === 0) return 0
  return Math.round((processingProgress.value.current / processingProgress.value.total) * 100)
})

// Smart compression: auto-detect best format and quality
function getSmartSettings(image: ImageItem): { format: typeof options.format, quality: number } {
  const isPNG = image.file.type === 'image/png'
  const isJPEG = image.file.type === 'image/jpeg' || image.file.type === 'image/jpg'
  const isLarge = image.size > 500 * 1024 // > 500KB
  const isHighRes = image.width > 1920 || image.height > 1080

  // Prefer AVIF for large photos if supported
  if (isLarge && isJPEG && avifSupported.value) {
    return { format: 'image/avif', quality: 0.75 }
  }

  // Prefer WebP for photos if supported
  if (isJPEG && webpSupported.value) {
    return { format: 'image/webp', quality: 0.82 }
  }

  // Keep PNG for small graphics
  if (isPNG && !isLarge && !isHighRes) {
    return { format: 'image/png', quality: 1 }
  }

  // Convert large PNG to WebP
  if (isPNG && isLarge && webpSupported.value) {
    return { format: 'image/webp', quality: 0.88 }
  }

  // Default: keep original format with good quality
  return {
    format: isJPEG ? 'image/jpeg' : isPNG ? 'image/png' : 'image/jpeg',
    quality: 0.85
  }
}

// Find optimal quality to match target file size using binary search
async function findQualityForTargetSize(
    canvas: HTMLCanvasElement,
    format: string,
    targetSizeKB: number,
    maxAttempts: number = 8
): Promise<number> {
  const targetBytes = targetSizeKB * 1024
  let minQuality = 0.1
  let maxQuality = 1.0
  let bestQuality = 0.8
  let bestBlob: Blob | null = null

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const testQuality = (minQuality + maxQuality) / 2

    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
          b => (b ? resolve(b) : reject(new Error('toBlob failed'))),
          format,
          format === 'image/png' ? 1 : testQuality
      )
    })

    if (!blob) break

    // If we're within 5% of target, that's good enough
    const sizeDiff = Math.abs(blob.size - targetBytes)
    if (sizeDiff < targetBytes * 0.05) {
      bestQuality = testQuality
      bestBlob = blob
      break
    }

    // Binary search adjustment
    if (blob.size > targetBytes) {
      maxQuality = testQuality
    } else {
      minQuality = testQuality
      bestQuality = testQuality
      bestBlob = blob
    }
  }

  return bestQuality
}

async function compress() {
  if (images.value.length === 0) return
  processing.value = true
  processingProgress.value = { current: 0, total: images.value.length }

  try {
    // Process all images in batch
    for (let i = 0; i < images.value.length; i++) {
      const imageItem = images.value[i]
      imageItem.processing = true
      processingProgress.value.current = i

      try {
        // Use smart settings if enabled, otherwise use manual settings
        let format = options.format
        let quality = options.quality

        if (options.smartCompression) {
          const smartSettings = getSmartSettings(imageItem)
          format = smartSettings.format
          quality = smartSettings.quality
        }

        const imgBitmap = await createImageBitmap(imageItem.file)
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
        const ctx = canvas.getContext('2d', { alpha: format !== 'image/jpeg' })!
        ctx.drawImage(imgBitmap, 0, 0, targetW, targetH)

        const desiredType = format === 'image/webp' && !webpSupported.value ? 'image/jpeg' : format
        let finalQuality = desiredType === 'image/png' ? 1 : quality

        // If target file size is specified, find optimal quality
        if (options.targetFileSize > 0 && desiredType !== 'image/png') {
          finalQuality = await findQualityForTargetSize(canvas, desiredType, options.targetFileSize)
        }

        const blob: Blob = await new Promise((resolve, reject) => {
          canvas.toBlob(
              b => (b ? resolve(b) : reject(new Error('toBlob failed or unsupported type'))),
              desiredType,
              finalQuality
          )
        })

        // Clear previous optimized version if exists
        if (imageItem.optimized?.blobUrl) {
          URL.revokeObjectURL(imageItem.optimized.blobUrl)
        }

        // Store optimized version
        imageItem.optimized = {
          blob,
          blobUrl: URL.createObjectURL(blob),
          size: blob.size,
          width: targetW,
          height: targetH
        }
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : 'Unknown error'
        console.error(`Failed to compress image ${imageItem.file.name}:`, errorMsg)
      } finally {
        imageItem.processing = false
      }
    }

    // Mark progress as complete
    processingProgress.value.current = processingProgress.value.total
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown error'
    alert(`Compression failed: ${errorMsg}. Try switching format or using a different image.`)
  } finally {
    processing.value = false
    // Reset progress after a delay
    setTimeout(() => {
      processingProgress.value = { current: 0, total: 0 }
    }, 1000)
  }
}

function download() {
  if (!optimized.value.blob) return
  const a = document.createElement('a')
  let ext = 'jpg'
  if (options.format === 'image/png') ext = 'png'
  if (options.format === 'image/webp' && webpSupported.value) ext = 'webp'
  if (options.format === 'image/avif' && avifSupported.value) ext = 'avif'
  const base = original.value.file?.name.replace(/\.(png|jpe?g|webp|avif)$/i, '') || 'image'
  a.href = optimized.value.blobUrl!
  a.download = `${base}-optimized.${ext}`
  a.click()
}

async function downloadAll() {
  const optimizedImages = images.value.filter(img => img.optimized)
  if (optimizedImages.length === 0) return

  // If only one image, download directly
  if (optimizedImages.length === 1) {
    currentImageIndex.value = images.value.indexOf(optimizedImages[0])
    download()
    return
  }

  // Create ZIP file for multiple images
  try {
    const zip = new JSZip()
    let ext = 'jpg'
    if (options.format === 'image/png') ext = 'png'
    if (options.format === 'image/webp' && webpSupported.value) ext = 'webp'
    if (options.format === 'image/avif' && avifSupported.value) ext = 'avif'

    // Add each optimized image to the ZIP
    optimizedImages.forEach((img, index) => {
      const base = img.file.name.replace(/\.(png|jpe?g|webp|avif)$/i, '') || `image-${index + 1}`
      const filename = `${base}-optimized.${ext}`
      zip.file(filename, img.optimized!.blob)
    })

    // Generate ZIP file
    const zipBlob = await zip.generateAsync({ type: 'blob' })

    // Download ZIP
    const url = URL.createObjectURL(zipBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed-images-${Date.now()}.zip`
    a.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    alert(`Failed to create ZIP: ${errorMsg}`)
  }
}

function resetOptimized() {
  const currentImage = images.value[currentImageIndex.value]
  if (currentImage?.optimized?.blobUrl) {
    URL.revokeObjectURL(currentImage.optimized.blobUrl)
    currentImage.optimized = undefined
  }
}

function reset() {
  // Clean up all blob URLs
  images.value.forEach(img => {
    if (img.previewUrl) URL.revokeObjectURL(img.previewUrl)
    if (img.optimized?.blobUrl) URL.revokeObjectURL(img.optimized.blobUrl)
  })

  // Clear array
  images.value = []
  currentImageIndex.value = 0

  // Reset file input
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<style scoped>
.card {
  @apply bg-gray-800/60 rounded-xl p-5 border border-gray-700/50 shadow-lg;
}

.btn {
  @apply bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-action {
  @apply bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed;
}

.input-sm {
  @apply text-white px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-sm;
}
</style>
