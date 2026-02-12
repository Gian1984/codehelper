<template>
  <div class="w-full flex flex-col items-center select-none gap-5" ref="wrapperRef">

    <!-- ============ LEGEND (above canvas) ============ -->
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4" style="max-width:480px">

      <!-- Hazards legend -->
      <div class="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Hazards — dodge them!</h3>
        <ul class="space-y-2">
          <li class="flex items-start gap-2.5">
            <span class="text-lg leading-none">❌</span>
            <div>
              <span class="text-sm font-medium text-white">SyntaxError</span>
              <p class="text-xs text-gray-500">Your code won't even parse. Classic.</p>
            </div>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="text-lg leading-none">💥</span>
            <div>
              <span class="text-sm font-medium text-white">TypeError</span>
              <p class="text-xs text-gray-500">undefined is not a function. Again.</p>
            </div>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="text-lg leading-none">🔥</span>
            <div>
              <span class="text-sm font-medium text-white">Runtime Bug</span>
              <p class="text-xs text-gray-500">Works on my machine... but not in prod.</p>
            </div>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="text-lg leading-none">🧱</span>
            <div>
              <span class="text-sm font-medium text-white">Deprecated Warning</span>
              <p class="text-xs text-gray-500">Slow but massive. Legacy code strikes back.</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Powerups legend -->
      <div class="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Powerups — grab them!</h3>
        <ul class="space-y-2">
          <li class="flex items-start gap-2.5">
            <span class="text-lg leading-none">☕</span>
            <div>
              <span class="text-sm font-medium text-white">Coffee Break</span>
              <p class="text-xs text-gray-500">Slow motion for 5s. Time to think.</p>
            </div>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="text-lg leading-none">🧠</span>
            <div>
              <span class="text-sm font-medium text-white">StackOverflow Answer</span>
              <p class="text-xs text-gray-500">Shield — survive one hit. Accepted answer.</p>
            </div>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="text-lg leading-none">🐛</span>
            <div>
              <span class="text-sm font-medium text-white">Debugger</span>
              <p class="text-xs text-gray-500">Clears all bugs on screen. console.clear()</p>
            </div>
          </li>
        </ul>
      </div>

    </div>

    <!-- ============ CANVAS + OVERLAYS ============ -->
    <div class="relative w-full" style="max-width:480px">
      <canvas
        ref="canvasRef"
        class="block w-full rounded-lg border border-gray-700 touch-none"
        :width="GAME_W"
        :height="GAME_H"
      />

      <!-- MENU overlay -->
      <div
        v-if="state === 'MENU'"
        class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 rounded-lg"
      >
        <p class="text-5xl mb-4">🧑‍💻</p>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center">Stack Overflow Survivor</h2>
        <p class="text-gray-400 text-sm sm:text-base mb-6 text-center max-w-xs px-4">
          Dodge bugs, errors &amp; exceptions.<br />How long can you survive?
        </p>
        <p v-if="bestScore > 0" class="text-indigo-400 text-sm mb-4">Best score: {{ bestScore }}</p>
        <button
          @click="startGame"
          class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          Play
        </button>
        <p class="text-gray-500 text-xs mt-3">WASD / Arrows / Touch</p>
      </div>

      <!-- GAME OVER overlay -->
      <div
        v-if="state === 'GAME_OVER'"
        class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/85 rounded-lg px-4"
      >
        <p class="text-4xl mb-2">💀</p>
        <h2 class="text-2xl font-extrabold text-white mb-1">Game Over</h2>
        <p class="text-3xl font-bold text-indigo-400 mb-1">{{ score }}</p>
        <p v-if="isNewBest" class="text-yellow-400 text-sm font-semibold mb-4">New best score!</p>
        <p v-else class="text-gray-400 text-sm mb-4">Best: {{ bestScore }}</p>

        <button
          @click="startGame"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          Play Again
        </button>

        <!-- Share buttons -->
        <p class="text-gray-500 text-xs mb-2">Share your score</p>
        <GameShareButtons
          game-title="Stack Overflow Survivor"
          game-url="https://codehelper.me/games/stack-overflow-survivor"
          :score="score"
        />
      </div>

      <!-- HUD (visible during play) -->
      <div
        v-if="state === 'PLAYING'"
        class="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 pointer-events-none"
      >
        <span class="text-white font-bold text-lg drop-shadow-md">{{ score }}</span>
        <div class="flex items-center gap-2">
          <span v-if="slowTimer > 0" class="text-amber-400 text-xs font-medium bg-amber-900/40 px-1.5 py-0.5 rounded">☕ {{ Math.ceil(slowTimer / 1000) }}s</span>
          <span v-if="shieldTimer > 0" class="text-yellow-300 text-xs font-medium bg-yellow-900/40 px-1.5 py-0.5 rounded">🧠 {{ Math.ceil(shieldTimer / 1000) }}s</span>
          <span class="text-gray-400 text-xs">Lv {{ level }}</span>
        </div>
      </div>
    </div>

    <!-- ============ BEST SCORE (below canvas) ============ -->
    <div
      class="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-700 bg-gray-800/50 px-5 py-3"
      style="max-width:480px"
    >
      <span class="text-sm text-gray-400">Your best score</span>
      <span class="text-lg font-bold" :class="bestScore > 0 ? 'text-indigo-400' : 'text-gray-600'">
        {{ bestScore > 0 ? bestScore : '—' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GameShareButtons from '~/components/GameShareButtons.vue'

// --------------- constants ---------------
const GAME_W = 480
const GAME_H = 640
const PLAYER_SIZE = 36
const PLAYER_SPEED = 5
const HITBOX_SHRINK = 8
const LS_KEY = 'sos_best'

// hazard definitions
const HAZARDS = [
  { emoji: '❌', label: 'SyntaxError',        speed: 2,   size: 30 },
  { emoji: '💥', label: 'TypeError',           speed: 3,   size: 30 },
  { emoji: '🔥', label: 'RuntimeBug',          speed: 2.5, size: 30 },
  { emoji: '🧱', label: 'DeprecatedWarning',   speed: 1.5, size: 38 },
] as const

// powerup definitions
const POWERUPS = [
  { emoji: '☕', kind: 'slow'    as const, size: 28 },
  { emoji: '🧠', kind: 'shield'  as const, size: 28 },
  { emoji: '🐛', kind: 'clear'   as const, size: 28 },
] as const

type Obj = {
  x: number; y: number; speed: number; size: number
  emoji: string; active: boolean; type: 'hazard' | 'powerup'
  kind?: 'slow' | 'shield' | 'clear'
}

// --------------- reactive state ---------------
const canvasRef = ref<HTMLCanvasElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const state = ref<'MENU' | 'PLAYING' | 'GAME_OVER'>('MENU')
const score = ref(0)
const bestScore = ref(0)
const isNewBest = ref(false)
const level = ref(0)
const shieldTimer = ref(0)
const slowTimer = ref(0)

// --------------- game internals (non-reactive for perf) ---------------
let ctx: CanvasRenderingContext2D | null = null
let rafId = 0
let lastTime = 0
let elapsed = 0
let spawnAcc = 0
let powerupAcc = 0
let scoreTickAcc = 0
let shakeTimer = 0
let flashTimer = 0

const keys: Record<string, boolean> = {}

// player
const player = { x: GAME_W / 2, y: GAME_H - 80 }

// object pool
const pool: Obj[] = []
const POOL_MAX = 80

function getFromPool(): Obj | null {
  for (let i = 0; i < pool.length; i++) {
    if (!pool[i].active) return pool[i]
  }
  if (pool.length < POOL_MAX) {
    const o: Obj = { x: 0, y: 0, speed: 0, size: 0, emoji: '', active: false, type: 'hazard' }
    pool.push(o)
    return o
  }
  return null
}

// touch
let touchActive = false
let touchOffsetX = 0
let touchOffsetY = 0

// --------------- lifecycle ---------------
onMounted(() => {
  const canvas = canvasRef.value!
  ctx = canvas.getContext('2d')!
  bestScore.value = Number(localStorage.getItem(LS_KEY)) || 0

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  canvas.addEventListener('touchstart', onTouchStart, { passive: false })
  canvas.addEventListener('touchmove', onTouchMove, { passive: false })
  canvas.addEventListener('touchend', onTouchEnd)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  const canvas = canvasRef.value
  if (canvas) {
    canvas.removeEventListener('touchstart', onTouchStart)
    canvas.removeEventListener('touchmove', onTouchMove)
    canvas.removeEventListener('touchend', onTouchEnd)
  }
})

// --------------- input handlers ---------------
function onKeyDown(e: KeyboardEvent) {
  keys[e.key] = true
  if ((e.key === ' ' || e.key === 'Enter') && state.value !== 'PLAYING') {
    e.preventDefault()
    startGame()
  }
}
function onKeyUp(e: KeyboardEvent) { keys[e.key] = false }

function canvasXY(t: Touch): { cx: number; cy: number } {
  const canvas = canvasRef.value!
  const rect = canvas.getBoundingClientRect()
  const scaleX = GAME_W / rect.width
  const scaleY = GAME_H / rect.height
  return { cx: (t.clientX - rect.left) * scaleX, cy: (t.clientY - rect.top) * scaleY }
}

function onTouchStart(e: TouchEvent) {
  e.preventDefault()
  if (state.value !== 'PLAYING') return
  const { cx, cy } = canvasXY(e.touches[0])
  touchActive = true
  touchOffsetX = player.x - cx
  touchOffsetY = player.y - cy
}
function onTouchMove(e: TouchEvent) {
  e.preventDefault()
  if (!touchActive) return
  const { cx, cy } = canvasXY(e.touches[0])
  player.x = clamp(cx + touchOffsetX, PLAYER_SIZE / 2, GAME_W - PLAYER_SIZE / 2)
  player.y = clamp(cy + touchOffsetY, PLAYER_SIZE / 2, GAME_H - PLAYER_SIZE / 2)
}
function onTouchEnd() { touchActive = false }

// --------------- game control ---------------
function startGame() {
  // reset
  player.x = GAME_W / 2
  player.y = GAME_H - 80
  score.value = 0
  level.value = 0
  shieldTimer.value = 0
  slowTimer.value = 0
  elapsed = 0
  spawnAcc = 0
  powerupAcc = 0
  scoreTickAcc = 0
  shakeTimer = 0
  flashTimer = 0
  isNewBest.value = false
  for (const o of pool) o.active = false
  Object.keys(keys).forEach(k => (keys[k] = false))

  state.value = 'PLAYING'
  lastTime = performance.now()
  rafId = requestAnimationFrame(loop)
}

function endGame() {
  cancelAnimationFrame(rafId)
  state.value = 'GAME_OVER'
  if (score.value > bestScore.value) {
    bestScore.value = score.value
    isNewBest.value = true
    localStorage.setItem(LS_KEY, String(score.value))
  }
}

// --------------- main loop ---------------
function loop(now: number) {
  const rawDt = now - lastTime
  lastTime = now
  const dt = Math.min(rawDt, 50)

  update(dt)
  render()

  if (state.value === 'PLAYING') {
    rafId = requestAnimationFrame(loop)
  }
}

// --------------- update ---------------
function update(dt: number) {
  elapsed += dt

  // level up every 15s
  level.value = Math.floor(elapsed / 15000)

  // timers
  if (shieldTimer.value > 0) shieldTimer.value = Math.max(0, shieldTimer.value - dt)
  if (slowTimer.value > 0) slowTimer.value = Math.max(0, slowTimer.value - dt)
  if (shakeTimer > 0) shakeTimer = Math.max(0, shakeTimer - dt)
  if (flashTimer > 0) flashTimer = Math.max(0, flashTimer - dt)

  // score tick +10 every 15s
  scoreTickAcc += dt
  if (scoreTickAcc >= 15000) {
    scoreTickAcc -= 15000
    score.value += 10
  }

  // --- player movement (keyboard)
  const spd = PLAYER_SPEED
  if (keys['w'] || keys['W'] || keys['ArrowUp'])    player.y -= spd
  if (keys['s'] || keys['S'] || keys['ArrowDown'])   player.y += spd
  if (keys['a'] || keys['A'] || keys['ArrowLeft'])   player.x -= spd
  if (keys['d'] || keys['D'] || keys['ArrowRight'])  player.x += spd
  player.x = clamp(player.x, PLAYER_SIZE / 2, GAME_W - PLAYER_SIZE / 2)
  player.y = clamp(player.y, PLAYER_SIZE / 2, GAME_H - PLAYER_SIZE / 2)

  // --- spawn hazards
  const spawnInterval = Math.max(300, 1000 - level.value * 80)
  spawnAcc += dt
  while (spawnAcc >= spawnInterval) {
    spawnAcc -= spawnInterval
    spawnHazard()
  }

  // --- spawn powerups (~every 8-12s)
  const puInterval = 8000 + Math.random() * 4000
  powerupAcc += dt
  if (powerupAcc >= puInterval) {
    powerupAcc = 0
    spawnPowerup()
  }

  // --- move objects & collisions
  const slowMult = slowTimer.value > 0 ? 0.5 : 1
  const px1 = player.x - PLAYER_SIZE / 2 + HITBOX_SHRINK
  const py1 = player.y - PLAYER_SIZE / 2 + HITBOX_SHRINK
  const px2 = player.x + PLAYER_SIZE / 2 - HITBOX_SHRINK
  const py2 = player.y + PLAYER_SIZE / 2 - HITBOX_SHRINK

  for (const o of pool) {
    if (!o.active) continue

    const speedMult = o.type === 'hazard' ? slowMult : 1
    o.y += (o.speed + level.value * 0.3) * speedMult

    // off screen
    if (o.y - o.size / 2 > GAME_H) {
      o.active = false
      if (o.type === 'hazard') score.value += 1
      continue
    }

    // collision check (AABB)
    const ox1 = o.x - o.size / 2
    const oy1 = o.y - o.size / 2
    const ox2 = o.x + o.size / 2
    const oy2 = o.y + o.size / 2

    if (px1 < ox2 && px2 > ox1 && py1 < oy2 && py2 > oy1) {
      o.active = false

      if (o.type === 'powerup') {
        score.value += 5
        if (o.kind === 'slow') slowTimer.value = 5000
        else if (o.kind === 'shield') shieldTimer.value = 8000
        else if (o.kind === 'clear') clearAllHazards()
      } else {
        // hazard hit
        if (shieldTimer.value > 0) {
          shieldTimer.value = 0
          shakeTimer = 150
        } else {
          flashTimer = 300
          shakeTimer = 250
          endGame()
          return
        }
      }
    }
  }
}

function spawnHazard() {
  const o = getFromPool()
  if (!o) return
  const def = HAZARDS[Math.floor(Math.random() * HAZARDS.length)]
  o.x = def.size / 2 + Math.random() * (GAME_W - def.size)
  o.y = -def.size
  o.speed = def.speed
  o.size = def.size
  o.emoji = def.emoji
  o.type = 'hazard'
  o.kind = undefined
  o.active = true
}

function spawnPowerup() {
  const o = getFromPool()
  if (!o) return
  const def = POWERUPS[Math.floor(Math.random() * POWERUPS.length)]
  o.x = def.size / 2 + Math.random() * (GAME_W - def.size)
  o.y = -def.size
  o.speed = 1.8
  o.size = def.size
  o.emoji = def.emoji
  o.type = 'powerup'
  o.kind = def.kind
  o.active = true
}

function clearAllHazards() {
  for (const o of pool) {
    if (o.active && o.type === 'hazard') {
      o.active = false
      score.value += 1
    }
  }
}

// --------------- render ---------------
function render() {
  if (!ctx) return
  const c = ctx

  c.save()

  // screen shake
  if (shakeTimer > 0) {
    const intensity = 4
    c.translate(
      (Math.random() - 0.5) * intensity * 2,
      (Math.random() - 0.5) * intensity * 2
    )
  }

  // background
  const grad = c.createLinearGradient(0, 0, 0, GAME_H)
  grad.addColorStop(0, '#0f172a')
  grad.addColorStop(1, '#1e293b')
  c.fillStyle = grad
  c.fillRect(0, 0, GAME_W, GAME_H)

  // flash on hit
  if (flashTimer > 0) {
    c.fillStyle = `rgba(239,68,68,${0.3 * (flashTimer / 300)})`
    c.fillRect(0, 0, GAME_W, GAME_H)
  }

  // slow-motion tint
  if (slowTimer.value > 0) {
    c.fillStyle = 'rgba(251,191,36,0.06)'
    c.fillRect(0, 0, GAME_W, GAME_H)
  }

  // objects
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  for (const o of pool) {
    if (!o.active) continue
    if (o.type === 'powerup') {
      c.beginPath()
      c.arc(o.x, o.y, o.size * 0.8, 0, Math.PI * 2)
      c.fillStyle = 'rgba(74,222,128,0.25)'
      c.fill()
    }
    c.font = `${o.size}px serif`
    c.fillText(o.emoji, o.x, o.y)
  }

  // player shield glow
  if (shieldTimer.value > 0) {
    c.beginPath()
    c.arc(player.x, player.y, PLAYER_SIZE * 0.75, 0, Math.PI * 2)
    c.strokeStyle = 'rgba(250,204,21,0.6)'
    c.lineWidth = 2
    c.stroke()
    c.fillStyle = 'rgba(250,204,21,0.1)'
    c.fill()
  }
  c.font = `${PLAYER_SIZE}px serif`
  c.fillText('🧑‍💻', player.x, player.y)

  c.restore()
}

// --------------- utils ---------------
function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v
}
</script>

<style scoped>
canvas {
  aspect-ratio: 480 / 640;
}
</style>
