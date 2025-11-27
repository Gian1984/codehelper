<template>
  <div class="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl text-white">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-2xl font-semibold">Color Converter & Analyzer</h2>
        <p class="text-sm text-gray-400 mt-1">Professional color conversion, accessibility checker, and harmony generator</p>
      </div>
      <div class="flex items-center gap-2">
        <button v-if="supportsEyeDropper" class="btn-icon" @click="pickColor" title="Pick color from screen">
          👁️ Eyedropper
        </button>
        <button class="btn" @click="randomize">🎲 Random</button>
        <button class="btn" @click="resetAll">Reset</button>
      </div>
    </div>

    <!-- Main Preview with WCAG -->
    <div class="card p-6 space-y-4">
      <div class="flex items-start gap-6 flex-wrap">
        <!-- Color Square -->
        <div class="relative">
          <div :style="{ backgroundColor: previewCss }"
               class="w-32 h-32 rounded-xl border-2 border-white/20 shadow-lg relative overflow-hidden">
            <div class="checker"></div>
          </div>
          <div class="mt-2 text-center">
            <p class="text-xs text-gray-400">{{ closestColorName }}</p>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="flex-1 space-y-3">
          <!-- Current Color -->
          <div class="bg-gray-900/60 rounded-lg p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Current Color</p>
            <div class="grid sm:grid-cols-2 gap-2 text-sm font-mono">
              <div class="flex items-center gap-2">
                <span class="text-gray-400">HEX:</span>
                <span class="text-white">{{ hexUpper }}</span>
                <button @click="copy(hexUpper)" class="copy-btn">📋</button>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-400">RGB:</span>
                <span class="text-white">{{ rgbCss }}</span>
                <button @click="copy(rgbCss)" class="copy-btn">📋</button>
              </div>
            </div>
          </div>

          <!-- WCAG Contrast Badges -->
          <div class="bg-gray-900/60 rounded-lg p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">WCAG Accessibility</p>
            <div class="grid sm:grid-cols-2 gap-3">
              <!-- Against White -->
              <div>
                <p class="text-xs text-gray-400 mb-2">On White Background</p>
                <div class="flex items-center gap-2">
                  <div :style="{ backgroundColor: '#FFFFFF', color: previewCss }"
                       class="px-3 py-1.5 rounded font-semibold text-sm">
                    Aa
                  </div>
                  <div class="text-xs">
                    <div class="flex items-center gap-1">
                      <span :class="wcagWhite.aa ? 'badge-success' : 'badge-fail'">AA {{ wcagWhite.aa ? '✓' : '✗' }}</span>
                      <span :class="wcagWhite.aaa ? 'badge-success' : 'badge-fail'">AAA {{ wcagWhite.aaa ? '✓' : '✗' }}</span>
                    </div>
                    <p class="text-gray-400 mt-1">Ratio: {{ contrastWhite.toFixed(2) }}:1</p>
                  </div>
                </div>
              </div>

              <!-- Against Black -->
              <div>
                <p class="text-xs text-gray-400 mb-2">On Black Background</p>
                <div class="flex items-center gap-2">
                  <div :style="{ backgroundColor: '#111111', color: previewCss }"
                       class="px-3 py-1.5 rounded font-semibold text-sm">
                    Aa
                  </div>
                  <div class="text-xs">
                    <div class="flex items-center gap-1">
                      <span :class="wcagBlack.aa ? 'badge-success' : 'badge-fail'">AA {{ wcagBlack.aa ? '✓' : '✗' }}</span>
                      <span :class="wcagBlack.aaa ? 'badge-success' : 'badge-fail'">AAA {{ wcagBlack.aaa ? '✓' : '✗' }}</span>
                    </div>
                    <p class="text-gray-400 mt-1">Ratio: {{ contrastBlack.toFixed(2) }}:1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Alpha Slider -->
          <div class="bg-gray-900/60 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs text-gray-400 uppercase tracking-wide">Opacity</label>
              <span class="text-sm text-white font-mono">{{ (alpha * 100).toFixed(0) }}%</span>
            </div>
            <input type="range" min="0" max="1" step="0.01" v-model.number="alpha"
                   class="w-full slider" />
          </div>
        </div>
      </div>
    </div>

    <!-- Format Inputs -->
    <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      <!-- HEX -->
      <div class="card space-y-2">
        <label class="label font-semibold">HEX</label>
        <div class="flex items-center gap-2">
          <input v-model="hex" type="color" class="color-picker" @input="onHexInput" />
          <input v-model.trim="hex" maxlength="9" placeholder="#3498DB"
                 class="input font-mono text-sm" @blur="onHexInput" />
        </div>
        <button class="btn-sm w-full" @click="copy(hexUpper)">Copy</button>
        <p v-if="hexError" class="text-xs text-red-400">{{ hexError }}</p>
      </div>

      <!-- RGB(A) -->
      <div class="card space-y-2">
        <label class="label font-semibold">RGB(A)</label>
        <input v-model.trim="rgbText" class="input font-mono text-sm"
               placeholder="52, 152, 219" @blur="onRgbInput" />
        <div class="grid grid-cols-4 gap-1 text-xs">
          <div><span class="sub">R</span><input type="number" min="0" max="255" v-model.number="r" class="mini-input" /></div>
          <div><span class="sub">G</span><input type="number" min="0" max="255" v-model.number="g" class="mini-input" /></div>
          <div><span class="sub">B</span><input type="number" min="0" max="255" v-model.number="b" class="mini-input" /></div>
          <div><span class="sub">A</span><input type="number" min="0" max="1" step="0.01" v-model.number="alpha" class="mini-input" /></div>
        </div>
        <button class="btn-sm w-full" @click="copy(rgbCss)">Copy</button>
      </div>

      <!-- HSL(A) -->
      <div class="card space-y-2">
        <label class="label font-semibold">HSL(A)</label>
        <input v-model.trim="hslText" class="input font-mono text-sm"
               placeholder="204, 70%, 53%" @blur="onHslInput" />
        <div class="grid grid-cols-4 gap-1 text-xs">
          <div><span class="sub">H</span><input type="number" min="0" max="360" v-model.number="h" class="mini-input" /></div>
          <div><span class="sub">S%</span><input type="number" min="0" max="100" v-model.number="s" class="mini-input" /></div>
          <div><span class="sub">L%</span><input type="number" min="0" max="100" v-model.number="l" class="mini-input" /></div>
          <div><span class="sub">A</span><input type="number" min="0" max="1" step="0.01" v-model.number="alpha" class="mini-input" /></div>
        </div>
        <button class="btn-sm w-full" @click="copy(hslCss)">Copy</button>
      </div>

      <!-- CMYK -->
      <div class="card space-y-2">
        <label class="label font-semibold">CMYK</label>
        <input v-model.trim="cmykText" class="input font-mono text-sm"
               placeholder="76, 31, 0, 14" @blur="onCmykInput" />
        <div class="grid grid-cols-4 gap-1 text-xs">
          <div><span class="sub">C%</span><input type="number" min="0" max="100" v-model.number="c" class="mini-input" /></div>
          <div><span class="sub">M%</span><input type="number" min="0" max="100" v-model.number="m" class="mini-input" /></div>
          <div><span class="sub">Y%</span><input type="number" min="0" max="100" v-model.number="y" class="mini-input" /></div>
          <div><span class="sub">K%</span><input type="number" min="0" max="100" v-model.number="k" class="mini-input" /></div>
        </div>
        <button class="btn-sm w-full" @click="applyCmykFields">Apply</button>
      </div>
    </div>

    <!-- Advanced Sections -->
    <div class="space-y-4">
      <!-- Color Harmony Generator -->
      <div class="card">
        <button @click="showHarmony = !showHarmony" class="w-full flex items-center justify-between text-left">
          <span class="font-semibold">🎨 Color Harmony Generator</span>
          <span class="text-gray-400">{{ showHarmony ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showHarmony" class="mt-4 space-y-4">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div v-for="(harmony, idx) in colorHarmonies" :key="idx" class="bg-gray-900/60 rounded-lg p-3">
              <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">{{ harmony.name }}</p>
              <div class="flex gap-2 mb-2">
                <div v-for="(color, cidx) in harmony.colors" :key="cidx"
                     :style="{ backgroundColor: color }"
                     class="flex-1 h-12 rounded border border-white/10"
                     :title="color">
                </div>
              </div>
              <div class="flex gap-1">
                <button v-for="(color, cidx) in harmony.colors" :key="cidx"
                        @click="setColor(color)"
                        class="flex-1 text-xs btn-sm">
                  Use
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Color Blindness Simulator -->
      <div class="card">
        <button @click="showBlindness = !showBlindness" class="w-full flex items-center justify-between text-left">
          <span class="font-semibold">👁️ Color Blindness Simulator</span>
          <span class="text-gray-400">{{ showBlindness ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showBlindness" class="mt-4">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="bg-gray-900/60 rounded-lg p-3">
              <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Normal Vision</p>
              <div :style="{ backgroundColor: previewCss }"
                   class="h-20 rounded border border-white/10 mb-2"></div>
              <p class="text-xs text-center font-mono text-white">{{ hexUpper }}</p>
            </div>
            <div v-for="sim in colorBlindnessSimulations" :key="sim.name" class="bg-gray-900/60 rounded-lg p-3">
              <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">
                {{ sim.name }}
                <span class="text-[10px]">({{ sim.type }})</span>
              </p>
              <div :style="{ backgroundColor: sim.color }"
                   class="h-20 rounded border border-white/10 mb-2"></div>
              <p class="text-xs text-center font-mono text-white">{{ sim.hex }}</p>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-3 italic">
            💡 These simulations approximate how people with different types of color blindness perceive your color.
          </p>
        </div>
      </div>

      <!-- Export Options -->
      <div class="card">
        <button @click="showExport = !showExport" class="w-full flex items-center justify-between text-left">
          <span class="font-semibold">💾 Export & Code</span>
          <span class="text-gray-400">{{ showExport ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showExport" class="mt-4 space-y-3">
          <div class="bg-gray-900/60 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs text-gray-400 uppercase tracking-wide">CSS Custom Properties</p>
              <button @click="copy(cssVariables)" class="btn-sm">Copy</button>
            </div>
            <pre class="text-xs font-mono text-green-300 whitespace-pre-wrap">{{ cssVariables }}</pre>
          </div>

          <div class="grid sm:grid-cols-2 gap-3">
            <div class="bg-gray-900/60 rounded-lg p-3">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs text-gray-400 uppercase tracking-wide">Tailwind Config</p>
                <button @click="copy(tailwindConfig)" class="btn-sm">Copy</button>
              </div>
              <pre class="text-xs font-mono text-blue-300">{{ tailwindConfig }}</pre>
            </div>

            <div class="bg-gray-900/60 rounded-lg p-3">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs text-gray-400 uppercase tracking-wide">SCSS Variable</p>
                <button @click="copy(scssVariable)" class="btn-sm">Copy</button>
              </div>
              <pre class="text-xs font-mono text-pink-300">{{ scssVariable }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm font-semibold">✓ {{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

/* ==================== COLOR SPACE CONVERSION HELPERS ==================== */

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))
const pad2 = (n: number) => n.toString(16).padStart(2, '0')
const isShortHex = (s: string) => /^#([0-9A-Fa-f]{3,4})$/.test(s)
const isLongHex  = (s: string) => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(s)

function normalizeHex(input: string): { hex: string, a: number } | null {
  let v = (input || '').trim()
  if (!v.startsWith('#')) v = '#' + v
  if (isShortHex(v)) {
    const body = v.slice(1)
    const r = body[0], g = body[1], b = body[2], a = body[3] ?? 'F'
    v = '#' + r + r + g + g + b + b + a + a
  }
  if (!isLongHex(v)) return null
  const body = v.slice(1)
  const hasAlpha = body.length === 8
  const r = parseInt(body.slice(0,2), 16)
  const g = parseInt(body.slice(2,4), 16)
  const b = parseInt(body.slice(4,6), 16)
  const a = hasAlpha ? parseInt(body.slice(6,8), 16) / 255 : 1
  return { hex: '#' + body.slice(0,6).toUpperCase(), a }
}

function hexToRgb(hex: string) {
  const n = normalizeHex(hex)
  if (!n) return { r: 0, g: 0, b: 0, a: 1 }
  const body = n.hex.slice(1)
  return {
    r: parseInt(body.slice(0,2),16),
    g: parseInt(body.slice(2,4),16),
    b: parseInt(body.slice(4,6),16),
    a: n.a
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return ('#' + pad2(clamp(Math.round(r),0,255)) + pad2(clamp(Math.round(g),0,255)) + pad2(clamp(Math.round(b),0,255))).toUpperCase()
}

function rgbToHexWithAlpha(r: number, g: number, b: number, a: number): string {
  return (rgbToHex(r,g,b) + pad2(Math.round(clamp(a,0,1)*255))).toUpperCase()
}

function rgbToHsl(r: number, g: number, b: number) {
  r/=255; g/=255; b/=255
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  let h=0, s=0, l=(max+min)/2
  const d = max-min
  if (d) {
    s = l>0.5 ? d/(2-max-min) : d/(max+min)
    switch (max) {
      case r: h = (g-b)/d + (g<b?6:0); break
      case g: h = (b-r)/d + 2; break
      default: h = (r-g)/d + 4
    }
    h/=6
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) }
}

function hslToRgb(h: number, s: number, l: number) {
  s/=100; l/=100
  const k = (n:number) => (n + h/30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n:number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return { r: Math.round(f(0)*255), g: Math.round(f(8)*255), b: Math.round(f(4)*255) }
}

// RGB to CMYK
function rgbToCmyk(r: number, g: number, b: number) {
  const R = r / 255, G = g / 255, B = b / 255
  const K = 1 - Math.max(R, G, B)
  if (K === 1) return { c: 0, m: 0, y: 0, k: 100 }
  const C = (1 - R - K) / (1 - K)
  const M = (1 - G - K) / (1 - K)
  const Y = (1 - B - K) / (1 - K)
  return { c: Math.round(C * 100), m: Math.round(M * 100), y: Math.round(Y * 100), k: Math.round(K * 100) }
}

// CMYK to RGB
function cmykToRgb(c: number, m: number, y: number, k: number) {
  const C = c / 100, M = m / 100, Y = y / 100, K = k / 100
  const r = 255 * (1 - C) * (1 - K)
  const g = 255 * (1 - M) * (1 - K)
  const b = 255 * (1 - Y) * (1 - K)
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) }
}

/* ==================== WCAG CONTRAST ==================== */

function luminance(r:number,g:number,b:number) {
  const t = (v:number)=>{ v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4) }
  const [R,G,B] = [t(r), t(g), t(b)]
  return 0.2126*R + 0.7152*G + 0.0722*B
}

function contrastRatio(fg:[number,number,number], bg:[number,number,number]) {
  const L1 = luminance(...fg), L2 = luminance(...bg)
  const [a,b] = [Math.max(L1,L2), Math.min(L1,L2)]
  return (a+0.05)/(b+0.05)
}

/* ==================== COLOR BLINDNESS SIMULATION ==================== */

function simulateColorBlindness(r: number, g: number, b: number, type: 'protanopia' | 'deuteranopia' | 'tritanopia') {
  // Transformation matrices for color blindness simulation
  const matrices = {
    protanopia: [
      [0.567, 0.433, 0.000],
      [0.558, 0.442, 0.000],
      [0.000, 0.242, 0.758]
    ],
    deuteranopia: [
      [0.625, 0.375, 0.000],
      [0.700, 0.300, 0.000],
      [0.000, 0.300, 0.700]
    ],
    tritanopia: [
      [0.950, 0.050, 0.000],
      [0.000, 0.433, 0.567],
      [0.000, 0.475, 0.525]
    ]
  }

  const matrix = matrices[type]
  const nr = clamp(matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b, 0, 255)
  const ng = clamp(matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b, 0, 255)
  const nb = clamp(matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b, 0, 255)

  return { r: Math.round(nr), g: Math.round(ng), b: Math.round(nb) }
}

/* ==================== COLOR NAMING ==================== */

const CSS_COLORS = [
  { name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' },
  { name: 'Red', hex: '#FF0000' }, { name: 'Lime', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' }, { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Cyan', hex: '#00FFFF' }, { name: 'Magenta', hex: '#FF00FF' },
  { name: 'Silver', hex: '#C0C0C0' }, { name: 'Gray', hex: '#808080' },
  { name: 'Maroon', hex: '#800000' }, { name: 'Olive', hex: '#808000' },
  { name: 'Green', hex: '#008000' }, { name: 'Purple', hex: '#800080' },
  { name: 'Teal', hex: '#008080' }, { name: 'Navy', hex: '#000080' },
  { name: 'Orange', hex: '#FFA500' }, { name: 'AliceBlue', hex: '#F0F8FF' },
  { name: 'AntiqueWhite', hex: '#FAEBD7' }, { name: 'Aqua', hex: '#00FFFF' },
  { name: 'Aquamarine', hex: '#7FFFD4' }, { name: 'Azure', hex: '#F0FFFF' },
  { name: 'Beige', hex: '#F5F5DC' }, { name: 'Bisque', hex: '#FFE4C4' },
  { name: 'BlanchedAlmond', hex: '#FFEBCD' }, { name: 'BlueViolet', hex: '#8A2BE2' },
  { name: 'Brown', hex: '#A52A2A' }, { name: 'BurlyWood', hex: '#DEB887' },
  { name: 'CadetBlue', hex: '#5F9EA0' }, { name: 'Chartreuse', hex: '#7FFF00' },
  { name: 'Chocolate', hex: '#D2691E' }, { name: 'Coral', hex: '#FF7F50' },
  { name: 'CornflowerBlue', hex: '#6495ED' }, { name: 'Cornsilk', hex: '#FFF8DC' },
  { name: 'Crimson', hex: '#DC143C' }, { name: 'DarkBlue', hex: '#00008B' },
  { name: 'DarkCyan', hex: '#008B8B' }, { name: 'DarkGoldenRod', hex: '#B8860B' },
  { name: 'DarkGray', hex: '#A9A9A9' }, { name: 'DarkGreen', hex: '#006400' },
  { name: 'DarkKhaki', hex: '#BDB76B' }, { name: 'DarkMagenta', hex: '#8B008B' },
  { name: 'DarkOliveGreen', hex: '#556B2F' }, { name: 'DarkOrange', hex: '#FF8C00' },
  { name: 'DarkOrchid', hex: '#9932CC' }, { name: 'DarkRed', hex: '#8B0000' },
  { name: 'DarkSalmon', hex: '#E9967A' }, { name: 'DarkSeaGreen', hex: '#8FBC8F' },
  { name: 'DarkSlateBlue', hex: '#483D8B' }, { name: 'DarkSlateGray', hex: '#2F4F4F' },
  { name: 'DarkTurquoise', hex: '#00CED1' }, { name: 'DarkViolet', hex: '#9400D3' },
  { name: 'DeepPink', hex: '#FF1493' }, { name: 'DeepSkyBlue', hex: '#00BFFF' },
  { name: 'DimGray', hex: '#696969' }, { name: 'DodgerBlue', hex: '#1E90FF' },
  { name: 'FireBrick', hex: '#B22222' }, { name: 'FloralWhite', hex: '#FFFAF0' },
  { name: 'ForestGreen', hex: '#228B22' }, { name: 'Fuchsia', hex: '#FF00FF' },
  { name: 'Gainsboro', hex: '#DCDCDC' }, { name: 'GhostWhite', hex: '#F8F8FF' },
  { name: 'Gold', hex: '#FFD700' }, { name: 'GoldenRod', hex: '#DAA520' },
  { name: 'GreenYellow', hex: '#ADFF2F' }, { name: 'HoneyDew', hex: '#F0FFF0' },
  { name: 'HotPink', hex: '#FF69B4' }, { name: 'IndianRed', hex: '#CD5C5C' },
  { name: 'Indigo', hex: '#4B0082' }, { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Khaki', hex: '#F0E68C' }, { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'LavenderBlush', hex: '#FFF0F5' }, { name: 'LawnGreen', hex: '#7CFC00' },
  { name: 'LemonChiffon', hex: '#FFFACD' }, { name: 'LightBlue', hex: '#ADD8E6' },
  { name: 'LightCoral', hex: '#F08080' }, { name: 'LightCyan', hex: '#E0FFFF' },
  { name: 'LightGoldenRodYellow', hex: '#FAFAD2' }, { name: 'LightGray', hex: '#D3D3D3' },
  { name: 'LightGreen', hex: '#90EE90' }, { name: 'LightPink', hex: '#FFB6C1' },
  { name: 'LightSalmon', hex: '#FFA07A' }, { name: 'LightSeaGreen', hex: '#20B2AA' },
  { name: 'LightSkyBlue', hex: '#87CEFA' }, { name: 'LightSlateGray', hex: '#778899' },
  { name: 'LightSteelBlue', hex: '#B0C4DE' }, { name: 'LightYellow', hex: '#FFFFE0' },
  { name: 'LimeGreen', hex: '#32CD32' }, { name: 'Linen', hex: '#FAF0E6' },
  { name: 'MediumAquaMarine', hex: '#66CDAA' }, { name: 'MediumBlue', hex: '#0000CD' },
  { name: 'MediumOrchid', hex: '#BA55D3' }, { name: 'MediumPurple', hex: '#9370DB' },
  { name: 'MediumSeaGreen', hex: '#3CB371' }, { name: 'MediumSlateBlue', hex: '#7B68EE' },
  { name: 'MediumSpringGreen', hex: '#00FA9A' }, { name: 'MediumTurquoise', hex: '#48D1CC' },
  { name: 'MediumVioletRed', hex: '#C71585' }, { name: 'MidnightBlue', hex: '#191970' },
  { name: 'MintCream', hex: '#F5FFFA' }, { name: 'MistyRose', hex: '#FFE4E1' },
  { name: 'Moccasin', hex: '#FFE4B5' }, { name: 'NavajoWhite', hex: '#FFDEAD' },
  { name: 'OldLace', hex: '#FDF5E6' }, { name: 'OliveDrab', hex: '#6B8E23' },
  { name: 'OrangeRed', hex: '#FF4500' }, { name: 'Orchid', hex: '#DA70D6' },
  { name: 'PaleGoldenRod', hex: '#EEE8AA' }, { name: 'PaleGreen', hex: '#98FB98' },
  { name: 'PaleTurquoise', hex: '#AFEEEE' }, { name: 'PaleVioletRed', hex: '#DB7093' },
  { name: 'PapayaWhip', hex: '#FFEFD5' }, { name: 'PeachPuff', hex: '#FFDAB9' },
  { name: 'Peru', hex: '#CD853F' }, { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Plum', hex: '#DDA0DD' }, { name: 'PowderBlue', hex: '#B0E0E6' },
  { name: 'RebeccaPurple', hex: '#663399' }, { name: 'RosyBrown', hex: '#BC8F8F' },
  { name: 'RoyalBlue', hex: '#4169E1' }, { name: 'SaddleBrown', hex: '#8B4513' },
  { name: 'Salmon', hex: '#FA8072' }, { name: 'SandyBrown', hex: '#F4A460' },
  { name: 'SeaGreen', hex: '#2E8B57' }, { name: 'SeaShell', hex: '#FFF5EE' },
  { name: 'Sienna', hex: '#A0522D' }, { name: 'SkyBlue', hex: '#87CEEB' },
  { name: 'SlateBlue', hex: '#6A5ACD' }, { name: 'SlateGray', hex: '#708090' },
  { name: 'Snow', hex: '#FFFAFA' }, { name: 'SpringGreen', hex: '#00FF7F' },
  { name: 'SteelBlue', hex: '#4682B4' }, { name: 'Tan', hex: '#D2B48C' },
  { name: 'Thistle', hex: '#D8BFD8' }, { name: 'Tomato', hex: '#FF6347' },
  { name: 'Turquoise', hex: '#40E0D0' }, { name: 'Violet', hex: '#EE82EE' },
  { name: 'Wheat', hex: '#F5DEB3' }, { name: 'WhiteSmoke', hex: '#F5F5F5' },
  { name: 'YellowGreen', hex: '#9ACD32' }
]

function getClosestColorName(r: number, g: number, b: number): string {
  let minDist = Infinity
  let closest = 'Custom'

  for (const color of CSS_COLORS) {
    const rgb = hexToRgb(color.hex)
    const dist = Math.sqrt(
      Math.pow(r - rgb.r, 2) +
      Math.pow(g - rgb.g, 2) +
      Math.pow(b - rgb.b, 2)
    )
    if (dist < minDist) {
      minDist = dist
      closest = color.name
    }
  }

  return minDist < 30 ? closest : `~${closest}`
}

/* ==================== STATE ==================== */

const hex = ref('#3498DB')
const hexError = ref('')
const rgbText = ref('')
const hslText = ref('')
const cmykText = ref('')

const r = ref(52), g = ref(152), b = ref(219)
const h = ref(204), s = ref(70), l = ref(53)
const c = ref(76), m = ref(31), y = ref(0), k = ref(14)
const alpha = ref(1)

const copiedMsg = ref('')
const showHarmony = ref(false)
const showBlindness = ref(false)
const showExport = ref(false)

const supportsEyeDropper = ref(false)

/* ==================== COMPUTED ==================== */

const hexUpper = computed(() => {
  return alpha.value < 1 ? rgbToHexWithAlpha(r.value,g.value,b.value,alpha.value) : rgbToHex(r.value,g.value,b.value)
})

const rgbCss = computed(() => alpha.value < 1
    ? `rgba(${r.value}, ${g.value}, ${b.value}, ${alpha.value.toFixed(2)})`
    : `rgb(${r.value}, ${g.value}, ${b.value})`)

const hslCss = computed(() => alpha.value < 1
    ? `hsla(${h.value}, ${s.value}%, ${l.value}%, ${alpha.value.toFixed(2)})`
    : `hsl(${h.value}, ${s.value}%, ${l.value}%)`)

const cmykCss = computed(() => `cmyk(${c.value}%, ${m.value}%, ${y.value}%, ${k.value}%)`)

const previewCss = computed(() => rgbCss.value)

const contrastWhite = computed(() => contrastRatio([255,255,255],[r.value,g.value,b.value]))
const contrastBlack = computed(() => contrastRatio([0,0,0],[r.value,g.value,b.value]))

const wcagWhite = computed(() => ({
  aa: contrastWhite.value >= 4.5,
  aaa: contrastWhite.value >= 7
}))

const wcagBlack = computed(() => ({
  aa: contrastBlack.value >= 4.5,
  aaa: contrastBlack.value >= 7
}))

const closestColorName = computed(() => getClosestColorName(r.value, g.value, b.value))

// Color Harmony
const colorHarmonies = computed(() => {
  const hue = h.value

  const getColorAtHue = (h: number) => {
    const rgb = hslToRgb(h % 360, s.value, l.value)
    return rgbToHex(rgb.r, rgb.g, rgb.b)
  }

  return [
    {
      name: 'Complementary',
      colors: [hexUpper.value, getColorAtHue(hue + 180)]
    },
    {
      name: 'Triadic',
      colors: [hexUpper.value, getColorAtHue(hue + 120), getColorAtHue(hue + 240)]
    },
    {
      name: 'Analogous',
      colors: [getColorAtHue(hue - 30), hexUpper.value, getColorAtHue(hue + 30)]
    },
    {
      name: 'Split Complementary',
      colors: [hexUpper.value, getColorAtHue(hue + 150), getColorAtHue(hue + 210)]
    }
  ]
})

// Color Blindness
const colorBlindnessSimulations = computed(() => {
  const types: Array<{ name: string; type: 'protanopia' | 'deuteranopia' | 'tritanopia' }> = [
    { name: 'Protanopia', type: 'protanopia' },
    { name: 'Deuteranopia', type: 'deuteranopia' },
    { name: 'Tritanopia', type: 'tritanopia' }
  ]

  return types.map(t => {
    const sim = simulateColorBlindness(r.value, g.value, b.value, t.type)
    return {
      name: t.name,
      type: t.type === 'protanopia' ? 'Red-Blind' : t.type === 'deuteranopia' ? 'Green-Blind' : 'Blue-Blind',
      color: rgbToHex(sim.r, sim.g, sim.b),
      hex: rgbToHex(sim.r, sim.g, sim.b)
    }
  })
})

// Export formats
const cssVariables = computed(() => {
  const name = 'primary'
  return `:root {
  --color-${name}: ${hexUpper.value};
  --color-${name}-rgb: ${r.value}, ${g.value}, ${b.value};
  --color-${name}-h: ${h.value};
  --color-${name}-s: ${s.value}%;
  --color-${name}-l: ${l.value}%;
}`
})

const tailwindConfig = computed(() => {
  return `colors: {
  primary: '${hexUpper.value}',
}`
})

const scssVariable = computed(() => {
  return `$primary-color: ${hexUpper.value};`
})

/* ==================== INPUT HANDLERS ==================== */

function onHexInput() {
  const parsed = normalizeHex(hex.value)
  if (!parsed) {
    hexError.value = 'Invalid HEX'
    return
  }
  hexError.value = ''
  hex.value = parsed.hex
  alpha.value = parsed.a
  const col = hexToRgb(parsed.hex)
  r.value = col.r; g.value = col.g; b.value = col.b
  const hsl = rgbToHsl(r.value,g.value,b.value)
  h.value = hsl.h; s.value = hsl.s; l.value = hsl.l
  const cmyk = rgbToCmyk(r.value,g.value,b.value)
  c.value = cmyk.c; m.value = cmyk.m; y.value = cmyk.y; k.value = cmyk.k
  updateTextFields()
}

function onRgbInput() {
  const match = rgbText.value.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*$/)
  if (!match) return
  const R = clamp(+match[1],0,255), G = clamp(+match[2],0,255), B = clamp(+match[3],0,255)
  const A = match[4] != null ? clamp(+match[4],0,1) : alpha.value
  r.value = R; g.value = G; b.value = B; alpha.value = A
  const hsl = rgbToHsl(R,G,B)
  h.value = hsl.h; s.value = hsl.s; l.value = hsl.l
  const cmyk = rgbToCmyk(R,G,B)
  c.value = cmyk.c; m.value = cmyk.m; y.value = cmyk.y; k.value = cmyk.k
  hex.value = A < 1 ? rgbToHexWithAlpha(R,G,B,A) : rgbToHex(R,G,B)
}

function onHslInput() {
  const match = hslText.value.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?(?:\s*,\s*(\d*\.?\d+))?\s*$/)
  if (!match) return
  const H = clamp(+match[1],0,360)
  const S = clamp(+match[2],0,100)
  const L = clamp(+match[3],0,100)
  const A = match[4] != null ? clamp(+match[4],0,1) : alpha.value
  h.value = H; s.value = S; l.value = L; alpha.value = A
  const rgb = hslToRgb(H,S,L)
  r.value = rgb.r; g.value = rgb.g; b.value = rgb.b
  const cmyk = rgbToCmyk(rgb.r,rgb.g,rgb.b)
  c.value = cmyk.c; m.value = cmyk.m; y.value = cmyk.y; k.value = cmyk.k
  hex.value = A < 1 ? rgbToHexWithAlpha(rgb.r,rgb.g,rgb.b,A) : rgbToHex(rgb.r,rgb.g,rgb.b)
}

function onCmykInput() {
  const match = cmykText.value.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/)
  if (!match) return
  const C = clamp(+match[1],0,100)
  const M = clamp(+match[2],0,100)
  const Y = clamp(+match[3],0,100)
  const K = clamp(+match[4],0,100)
  c.value = C; m.value = M; y.value = Y; k.value = K
  const rgb = cmykToRgb(C,M,Y,K)
  r.value = rgb.r; g.value = rgb.g; b.value = rgb.b
  const hsl = rgbToHsl(rgb.r,rgb.g,rgb.b)
  h.value = hsl.h; s.value = hsl.s; l.value = hsl.l
  hex.value = alpha.value < 1 ? rgbToHexWithAlpha(rgb.r,rgb.g,rgb.b,alpha.value) : rgbToHex(rgb.r,rgb.g,rgb.b)
  updateTextFields()
}

function applyCmykFields() {
  cmykText.value = `${c.value}, ${m.value}, ${y.value}, ${k.value}`
  onCmykInput()
}

function updateTextFields() {
  rgbText.value = `${r.value}, ${g.value}, ${b.value}${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
  hslText.value = `${h.value}, ${s.value}%, ${l.value}%${alpha.value<1?`, ${alpha.value.toFixed(2)}`:''}`
  cmykText.value = `${c.value}, ${m.value}, ${y.value}, ${k.value}`
}

/* ==================== WATCHERS ==================== */

watch([r,g,b], () => {
  const hsl = rgbToHsl(r.value,g.value,b.value)
  h.value = hsl.h; s.value = hsl.s; l.value = hsl.l
  const cmyk = rgbToCmyk(r.value,g.value,b.value)
  c.value = cmyk.c; m.value = cmyk.m; y.value = cmyk.y; k.value = cmyk.k
  hex.value = alpha.value < 1 ? rgbToHexWithAlpha(r.value,g.value,b.value,alpha.value) : rgbToHex(r.value,g.value,b.value)
  updateTextFields()
})

watch([h,s,l], () => {
  const rgb = hslToRgb(h.value,s.value,l.value)
  r.value = rgb.r; g.value = rgb.g; b.value = rgb.b
}, { flush: 'post' })

watch([c,m,y,k], () => {
  const rgb = cmykToRgb(c.value,m.value,y.value,k.value)
  r.value = rgb.r; g.value = rgb.g; b.value = rgb.b
}, { flush: 'post' })

watch(alpha, () => {
  hex.value = alpha.value < 1 ? rgbToHexWithAlpha(r.value,g.value,b.value,alpha.value) : rgbToHex(r.value,g.value,b.value)
  updateTextFields()
})

/* ==================== ACTIONS ==================== */

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedMsg.value = 'Copied to clipboard!'
    setTimeout(() => (copiedMsg.value = ''), 2000)
  } catch {
    copiedMsg.value = 'Failed to copy'
    setTimeout(() => (copiedMsg.value = ''), 2000)
  }
}

function randomize() {
  const R = Math.floor(Math.random()*256)
  const G = Math.floor(Math.random()*256)
  const B = Math.floor(Math.random()*256)
  const A = Math.random() < 0.3 ? Number((Math.random()*0.9+0.1).toFixed(2)) : 1
  r.value = R; g.value = G; b.value = B; alpha.value = A
}

function resetAll() {
  hex.value = '#3498DB'
  hexError.value = ''
  r.value = 52; g.value = 152; b.value = 219
  const hsl = rgbToHsl(r.value,g.value,b.value)
  h.value = hsl.h; s.value = hsl.s; l.value = hsl.l
  const cmyk = rgbToCmyk(r.value,g.value,b.value)
  c.value = cmyk.c; m.value = cmyk.m; y.value = cmyk.y; k.value = cmyk.k
  alpha.value = 1
  updateTextFields()
}

function setColor(hexColor: string) {
  hex.value = hexColor
  onHexInput()
}

async function pickColor() {
  if (!('EyeDropper' in window)) {
    copiedMsg.value = 'EyeDropper not supported in this browser'
    setTimeout(() => (copiedMsg.value = ''), 3000)
    return
  }

  try {
    // @ts-ignore - EyeDropper API
    const eyeDropper = new window.EyeDropper()
    const result = await eyeDropper.open()
    hex.value = result.sRGBHex
    onHexInput()
  } catch (e) {
    // User cancelled
  }
}

/* ==================== LIFECYCLE ==================== */

onMounted(() => {
  // @ts-ignore
  supportsEyeDropper.value = 'EyeDropper' in window
  resetAll()
})
</script>

<style scoped>
.label { @apply text-sm text-gray-300; }
.sub { @apply block text-[10px] text-gray-400 mb-1 uppercase tracking-wide; }
.input { @apply bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-indigo-500 transition-colors; }
.mini-input { @apply bg-gray-900 text-white border border-gray-700 rounded px-2 py-1 w-full text-xs focus:outline-none focus:border-indigo-500 transition-colors; }
.btn { @apply bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors; }
.btn-sm { @apply bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-white text-xs font-medium transition-colors; }
.btn-icon { @apply bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors; }
.card { @apply bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 shadow-lg; }
.copy-btn { @apply text-xs hover:bg-gray-700 px-1.5 py-0.5 rounded transition-colors; }

.color-picker {
  @apply w-12 h-10 p-0 border-2 border-gray-600 rounded-lg cursor-pointer;
}

.slider {
  @apply appearance-none h-2 rounded-full bg-gray-700;
}
.slider::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 rounded-full bg-indigo-500 cursor-pointer;
}
.slider::-moz-range-thumb {
  @apply w-4 h-4 rounded-full bg-indigo-500 cursor-pointer border-0;
}

.badge-success {
  @apply inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-900/40 text-green-400 border border-green-700;
}

.badge-fail {
  @apply inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-900/40 text-red-400 border border-red-700;
}

.checker {
  position: absolute; inset: 0;
  background-image:
      linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(255,255,255,.15) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(255,255,255,.15) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.15) 75%);
  background-size: 16px 16px;
  mix-blend-mode: normal;
  pointer-events: none;
  z-index: 0;
}
</style>
