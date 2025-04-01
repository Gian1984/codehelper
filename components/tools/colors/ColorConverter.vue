<template>
  <div class="space-y-4 bg-gray-800 p-8 rounded-lg shadow">
    <h2 class="text-2xl font-semibold text-white">Color Converter</h2>

    <!-- HEX Input -->
    <label class="block">
      <span class="text-gray-300">HEX</span>
      <div class="flex items-center space-x-2">
        <input v-model="hex" type="color" class="w-12 h-10 p-0 border border-gray-400 rounded" />
        <input
            v-model="hex"
            type="text"
            maxlength="7"
            class="text-black px-2 py-1 rounded w-32"
            @blur="validateHex"
        />
      </div>
    </label>

    <!-- RGB Input -->
    <label class="block">
      <span class="text-gray-300">RGB</span>
      <input v-model="rgbInput" @blur="updateFromRgb" placeholder="e.g. 52, 152, 219" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <!-- HSL Input -->
    <label class="block">
      <span class="text-gray-300">HSL</span>
      <input v-model="hslInput" @blur="updateFromHsl" placeholder="e.g. 204, 70%, 53%" class="text-black w-full px-2 py-1 rounded" />
    </label>

    <!-- Display -->
    <div class="text-white">
      <p><strong>HEX:</strong> {{ hex }}</p>
      <p><strong>RGB:</strong> {{ rgb }}</p>
      <p><strong>HSL:</strong> {{ hsl }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const hex = ref('#3498db')
const rgbInput = ref('')
const hslInput = ref('')

const validateHex = () => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex.value)) {
    hex.value = '#000000'
  }
}

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const hslToRgb = (h, s, l) => {
  s /= 100; l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255)
  }
}

const rgb = computed(() => {
  const { r, g, b } = hexToRgb(hex.value)
  rgbInput.value = `${r}, ${g}, ${b}`
  return `rgb(${r}, ${g}, ${b})`
})

const hsl = computed(() => {
  const { r, g, b } = hexToRgb(hex.value)
  const { h, s, l } = rgbToHsl(r, g, b)
  hslInput.value = `${h}, ${s}%, ${l}%`
  return `hsl(${h}, ${s}%, ${l}%)`
})

const updateFromRgb = () => {
  const match = rgbInput.value.match(/(\d+),\s*(\d+),\s*(\d+)/)
  if (match) {
    const [_, r, g, b] = match.map(Number)
    hex.value = rgbToHex(r, g, b)
  }
}

const updateFromHsl = () => {
  const match = hslInput.value.match(/(\d+),\s*(\d+)%?,\s*(\d+)%?/)
  if (match) {
    const [_, h, s, l] = match.map(Number)
    const { r, g, b } = hslToRgb(h, s, l)
    hex.value = rgbToHex(r, g, b)
  }
}
</script>

<style scoped>
input[type="text"] {
  @apply bg-white;
}
</style>