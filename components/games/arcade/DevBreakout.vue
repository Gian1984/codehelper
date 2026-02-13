<template>
  <div class="w-full flex flex-col items-center select-none gap-5" ref="wrapperRef">

    <!-- ============ LEGEND ============ -->
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Bricks — break them!</h3>
        <ul class="space-y-1.5">
          <li v-for="b in BRICK_META" :key="b.label" class="flex items-center gap-2">
            <span class="inline-block w-4 h-3 rounded-sm" :style="{ background: b.color }" />
            <span class="text-xs text-white font-medium">{{ b.emoji }} {{ b.label }}</span>
            <span class="text-xs text-gray-500 ml-auto">{{ b.hint }}</span>
          </li>
        </ul>
      </div>
      <div class="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Powerups — catch them!</h3>
        <ul class="space-y-1.5">
          <li v-for="p in POWERUP_META" :key="p.label" class="flex items-center gap-2">
            <span class="text-sm leading-none">{{ p.emoji }}</span>
            <span class="text-xs text-white font-medium">{{ p.label }}</span>
            <span class="text-xs text-gray-500 ml-auto">{{ p.hint }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- ============ CANVAS ============ -->
    <div class="relative mx-auto" style="width:480px;max-width:100%">
      <canvas
        ref="canvasRef"
        class="block w-full rounded-lg border border-gray-700 touch-none"
        width="480"
        height="640"
      />

      <!-- MENU -->
      <div v-if="state === 'MENU'" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/85 rounded-lg px-4">
        <p class="text-4xl mb-2">🧱</p>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-1 text-center">DevBreakout</h2>
        <p class="text-gray-400 text-sm mb-5 text-center">Break bugs. Deploy to production.</p>
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          <button v-for="m in modeList" :key="m.id" @click="startGame(m.id)"
            class="px-3 py-2 text-xs font-semibold rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            :class="m.id === 'classic'
              ? 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500'
              : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'"
          >{{ m.label }}</button>
        </div>
        <p v-if="bestScores.classic > 0" class="text-indigo-400 text-xs mb-1">Best (Classic): {{ bestScores.classic }}</p>
        <p class="text-gray-500 text-xs">← → / A D / Touch to move · Space to launch</p>
      </div>

      <!-- GAME OVER -->
      <div v-if="state === 'GAME_OVER'" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/85 rounded-lg px-4">
        <p class="text-3xl mb-1 font-mono text-red-400">segmentation fault</p>
        <p class="text-sm text-gray-500 mb-3 font-mono">(core dumped)</p>
        <p class="text-3xl font-bold text-indigo-400 mb-1">{{ score }}</p>
        <p v-if="isNewBest" class="text-yellow-400 text-xs font-semibold mb-3">New best score!</p>
        <p v-else class="text-gray-400 text-xs mb-3">Best: {{ bestScores[currentMode] || 0 }}</p>
        <button @click="startGame(currentMode)"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition mb-3 focus:outline-none">
          Play Again
        </button>
        <button @click="state = 'MENU'"
          class="px-4 py-1.5 text-xs text-gray-400 hover:text-white transition focus:outline-none">
          Menu
        </button>
        <p class="text-gray-500 text-xs mt-3 mb-2">Share your score</p>
        <GameShareButtons game-title="DevBreakout" game-url="https://codehelper.me/games/dev-breakout" :score="score" />
      </div>

      <!-- WIN -->
      <div v-if="state === 'WIN'" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/85 rounded-lg px-4">
        <p class="text-4xl mb-2">🚀</p>
        <h2 class="text-2xl font-extrabold text-green-400 mb-1 font-mono">DEPLOYED TO PRODUCTION</h2>
        <p class="text-3xl font-bold text-indigo-400 mb-1">{{ score }}</p>
        <p v-if="isNewBest" class="text-yellow-400 text-xs font-semibold mb-3">New best score!</p>
        <button @click="startGame(currentMode)"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition mb-3 focus:outline-none">
          Play Again
        </button>
        <button @click="state = 'MENU'"
          class="px-4 py-1.5 text-xs text-gray-400 hover:text-white transition focus:outline-none">
          Menu
        </button>
        <p class="text-gray-500 text-xs mt-3 mb-2">Share your score</p>
        <GameShareButtons game-title="DevBreakout" game-url="https://codehelper.me/games/dev-breakout" :score="score" />
      </div>

      <!-- LEVEL TITLE (brief overlay) -->
      <div v-if="showLevelTitle" class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p class="text-lg font-bold font-mono text-green-400 bg-gray-900/70 px-4 py-2 rounded">{{ levelTitleText }}</p>
      </div>
    </div>

    <!-- ============ BEST SCORE ============ -->
    <div class="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-700 bg-gray-800/50 px-5 py-3">
      <span class="text-sm text-gray-400">Your best score</span>
      <span class="text-lg font-bold" :class="bestScores.classic > 0 ? 'text-indigo-400' : 'text-gray-600'">
        {{ bestScores.classic > 0 ? bestScores.classic : '—' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import GameShareButtons from '~/components/GameShareButtons.vue'

// ===== CONSTANTS =====
const GW = 480, GH = 640
const COLS = 8, BRICK_W = 54, BRICK_H = 20, BRICK_GAP = 4
const BRICK_OX = (GW - COLS * BRICK_W - (COLS - 1) * BRICK_GAP) / 2
const BRICK_OY = 55
const PADDLE_H = 12, PADDLE_BASE_W = 80, PADDLE_Y = GH - 40
const BALL_R = 6
const LS_KEY = 'devbreakout_best'

// ===== BRICK / POWERUP META (for legend + logic) =====
const BRICK_DEFS: Record<number, { color: string; hp: number; emoji: string; label: string; hint: string }> = {
  1: { color: '#22c55e', hp: 1, emoji: '🐛', label: 'Bug',        hint: '1 hit' },
  2: { color: '#ef4444', hp: 2, emoji: '🔥', label: 'Critical',   hint: '2 hits' },
  3: { color: '#78716c', hp: 3, emoji: '🧱', label: 'Legacy',     hint: '3 hits' },
  4: { color: '#3b82f6', hp: 1, emoji: '🔒', label: 'Auth Error', hint: 'speeds ball' },
  5: { color: '#a855f7', hp: 1, emoji: '💾', label: 'Mem Leak',   hint: 'slows paddle' },
  6: { color: '#eab308', hp: 1, emoji: '⚡', label: 'Cache Hit',  hint: 'bonus pts' },
}
const BRICK_META = Object.values(BRICK_DEFS)

const POWERUP_DEFS = [
  { emoji: '☕', kind: 'coffee'  as const, label: 'Coffee',        hint: 'fast paddle 8s' },
  { emoji: '🧠', kind: 'so'     as const, label: 'StackOverflow', hint: 'auto-aim 5s' },
  { emoji: '🐞', kind: 'debug'  as const, label: 'Debugger',      hint: 'slow-mo 5s' },
  { emoji: '🚀', kind: 'deploy' as const, label: 'Deploy',        hint: 'pierce 5s' },
  { emoji: '💥', kind: 'chaos'  as const, label: 'Prod Bug',      hint: 'chaos! 5s' },
]
const POWERUP_META = POWERUP_DEFS

type PUKind = typeof POWERUP_DEFS[number]['kind']

// ===== LEVELS =====
const LEVEL_NAMES = ['HTML', 'CSS', 'JavaScript', 'Backend', 'Production']
const LEVELS: number[][][] = [
  [[1,1,1,1,1,1,1,1],[0,1,6,1,1,6,1,0],[1,1,1,1,1,1,1,1],[0,1,1,0,0,1,1,0],[1,1,1,1,1,1,1,1]],
  [[1,2,1,1,1,1,2,1],[1,1,1,2,2,1,1,1],[6,1,1,1,1,1,1,6],[1,1,2,1,1,2,1,1],[0,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1]],
  [[2,1,3,1,1,3,1,2],[1,4,1,2,2,1,4,1],[1,1,1,1,1,1,1,1],[6,5,1,3,3,1,5,6],[1,1,2,1,1,2,1,1],[0,1,1,1,1,1,1,0],[1,1,1,2,2,1,1,1]],
  [[3,3,4,2,2,4,3,3],[4,1,1,3,3,1,1,4],[1,5,2,1,1,2,5,1],[2,1,1,4,4,1,1,2],[1,3,1,1,1,1,3,1],[6,1,2,1,1,2,1,6],[1,1,1,2,2,1,1,1]],
  [[3,2,4,3,3,4,2,3],[2,5,2,4,4,2,5,2],[4,1,3,2,2,3,1,4],[1,2,1,5,5,1,2,1],[3,1,2,1,1,2,1,3],[1,4,1,3,3,1,4,1],[2,1,1,2,2,1,1,2],[6,1,2,1,1,2,1,6]],
]

// ===== MODES =====
const modeList = [
  { id: 'classic'  as const, label: 'Classic' },
  { id: 'sprint'   as const, label: 'Sprint 60s' },
  { id: 'survival' as const, label: 'Survival' },
  { id: 'zen'      as const, label: 'Zen' },
  { id: 'hardcore' as const, label: 'Hardcore' },
]
type ModeId = typeof modeList[number]['id']
const MODE_CFG: Record<ModeId, { lives: number; speed: number; powerups: boolean; timer: number }> = {
  classic:  { lives: 3,    speed: 4,   powerups: true,  timer: 0 },
  sprint:   { lives: 999,  speed: 4,   powerups: true,  timer: 60 },
  survival: { lives: 3,    speed: 3.5, powerups: true,  timer: 0 },
  zen:      { lives: 999,  speed: 3.5, powerups: true,  timer: 0 },
  hardcore: { lives: 1,    speed: 5.5, powerups: false, timer: 0 },
}

// ===== COMBO MESSAGES =====
const COMBOS = [
  'hotfix applied!', 'tests passed ✓', 'build success', 'it works on my machine',
  'git push --force', 'npm install', 'LGTM', 'ship it!',
  'merge conflict resolved', '404 bug not found', "console.log('here')",
  'PR approved', 'works in staging', 'docker pull', 'lint passed',
]

// ===== TYPES =====
type Brick = { x: number; y: number; w: number; h: number; type: number; hp: number; active: boolean }
type Ball = { x: number; y: number; dx: number; dy: number; speed: number; active: boolean; trail: { x: number; y: number }[] }
type FallingPU = { x: number; y: number; kind: PUKind; emoji: string; active: boolean }
type Effect = { kind: PUKind; timer: number }
type ComboMsg = { text: string; x: number; y: number; timer: number }

// ===== REACTIVE STATE =====
const canvasRef = ref<HTMLCanvasElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const state = ref<'MENU' | 'READY' | 'PLAYING' | 'GAME_OVER' | 'WIN'>('MENU')
const score = ref(0)
const isNewBest = ref(false)
const currentMode = ref<ModeId>('classic')
const showLevelTitle = ref(false)
const levelTitleText = ref('')
const bestScores = reactive<Record<ModeId, number>>({ classic: 0, sprint: 0, survival: 0, zen: 0, hardcore: 0 })

// ===== GAME STATE (non-reactive for perf) =====
let ctx: CanvasRenderingContext2D | null = null
let rafId = 0, lastTime = 0
let lives = 3, levelIdx = 0
let modeTimer = 0 // for sprint
let survivalSpeedMul = 1
let survivalElapsed = 0

const paddle = { x: GW / 2, w: PADDLE_BASE_W, speed: 5 }
let balls: Ball[] = []
let bricks: Brick[] = []
let fallingPUs: FallingPU[] = []
let effects: Effect[] = []
let comboMsgs: ComboMsg[] = []

const keys: Record<string, boolean> = {}
let touchX: number | null = null

// ===== LIFECYCLE =====
onMounted(() => {
  ctx = canvasRef.value!.getContext('2d')!
  loadBestScores()
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  canvasRef.value!.addEventListener('touchstart', onTouchStart, { passive: false })
  canvasRef.value!.addEventListener('touchmove', onTouchMove, { passive: false })
  canvasRef.value!.addEventListener('touchend', onTouchEnd)
  // Draw initial frame
  renderMenu()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  const c = canvasRef.value
  if (c) { c.removeEventListener('touchstart', onTouchStart); c.removeEventListener('touchmove', onTouchMove); c.removeEventListener('touchend', onTouchEnd) }
})

// ===== INPUT =====
function onKeyDown(e: KeyboardEvent) {
  keys[e.key] = true
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    if (state.value === 'READY') launchBall()
  }
}
function onKeyUp(e: KeyboardEvent) { keys[e.key] = false }

function onTouchStart(e: TouchEvent) {
  e.preventDefault()
  const rect = canvasRef.value!.getBoundingClientRect()
  touchX = ((e.touches[0].clientX - rect.left) / rect.width) * GW
  if (state.value === 'READY') launchBall()
}
function onTouchMove(e: TouchEvent) {
  e.preventDefault()
  const rect = canvasRef.value!.getBoundingClientRect()
  touchX = ((e.touches[0].clientX - rect.left) / rect.width) * GW
}
function onTouchEnd() { touchX = null }

// ===== GAME CONTROL =====
function startGame(mode: ModeId) {
  currentMode.value = mode
  const cfg = MODE_CFG[mode]
  lives = cfg.lives
  score.value = 0
  levelIdx = 0
  modeTimer = cfg.timer
  survivalSpeedMul = 1
  survivalElapsed = 0
  isNewBest.value = false
  effects = []
  comboMsgs = []
  fallingPUs = []
  paddle.x = GW / 2
  paddle.w = PADDLE_BASE_W
  paddle.speed = 5

  if (mode === 'sprint' || mode === 'survival') {
    loadRandomLevel()
  } else {
    loadLevel(0)
  }

  state.value = 'READY'
  resetBallOnPaddle()
  showLevelBanner()
  lastTime = performance.now()
  rafId = requestAnimationFrame(loop)
}

function loadLevel(idx: number) {
  levelIdx = idx
  bricks = []
  const layout = LEVELS[Math.min(idx, LEVELS.length - 1)]
  for (let r = 0; r < layout.length; r++) {
    for (let c = 0; c < layout[r].length; c++) {
      const t = layout[r][c]
      if (t === 0) continue
      const def = BRICK_DEFS[t]
      bricks.push({
        x: BRICK_OX + c * (BRICK_W + BRICK_GAP),
        y: BRICK_OY + r * (BRICK_H + BRICK_GAP),
        w: BRICK_W, h: BRICK_H,
        type: t, hp: def.hp, active: true,
      })
    }
  }
}

function loadRandomLevel() {
  bricks = []
  const rows = 4 + Math.floor(Math.random() * 3)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < COLS; c++) {
      if (Math.random() < 0.12) continue
      const rand = Math.random()
      const t = rand < 0.35 ? 1 : rand < 0.55 ? 2 : rand < 0.7 ? 3 : rand < 0.8 ? 4 : rand < 0.9 ? 5 : 6
      const def = BRICK_DEFS[t]
      bricks.push({
        x: BRICK_OX + c * (BRICK_W + BRICK_GAP),
        y: BRICK_OY + r * (BRICK_H + BRICK_GAP),
        w: BRICK_W, h: BRICK_H,
        type: t, hp: def.hp, active: true,
      })
    }
  }
}

function showLevelBanner() {
  const mode = currentMode.value
  if (mode === 'sprint') levelTitleText.value = 'SPRINT — 60s GO!'
  else if (mode === 'survival') levelTitleText.value = 'SURVIVAL — GOOD LUCK'
  else if (mode === 'zen') levelTitleText.value = `ZEN — ${LEVEL_NAMES[levelIdx] || 'RELAX'}`
  else if (mode === 'hardcore') levelTitleText.value = `HARDCORE — ${LEVEL_NAMES[levelIdx] || '???'}`
  else levelTitleText.value = `LEVEL ${levelIdx + 1}: ${LEVEL_NAMES[levelIdx] || '???'}`
  showLevelTitle.value = true
  setTimeout(() => { showLevelTitle.value = false }, 1800)
}

function resetBallOnPaddle() {
  balls = [{ x: paddle.x, y: PADDLE_Y - BALL_R - 1, dx: 0, dy: 0, speed: 0, active: true, trail: [] }]
}

function launchBall() {
  if (state.value !== 'READY') return
  const cfg = MODE_CFG[currentMode.value]
  const spd = cfg.speed * survivalSpeedMul
  const angle = (Math.random() - 0.5) * 0.8 // slight random
  balls[0].dx = Math.sin(angle) * spd
  balls[0].dy = -Math.cos(angle) * spd
  balls[0].speed = spd
  state.value = 'PLAYING'
}

function loseLife() {
  const mode = currentMode.value
  if (mode === 'zen' || mode === 'sprint') {
    // just respawn
    state.value = 'READY'
    resetBallOnPaddle()
    return
  }
  lives--
  if (lives <= 0) {
    endGame()
    return
  }
  state.value = 'READY'
  resetBallOnPaddle()
}

function endGame() {
  cancelAnimationFrame(rafId)
  state.value = 'GAME_OVER'
  saveBest()
}

function winGame() {
  cancelAnimationFrame(rafId)
  state.value = 'WIN'
  saveBest()
}

function saveBest() {
  const mode = currentMode.value
  if (score.value > bestScores[mode]) {
    bestScores[mode] = score.value
    isNewBest.value = true
    localStorage.setItem(LS_KEY, JSON.stringify(bestScores))
  }
}

function loadBestScores() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) Object.assign(bestScores, JSON.parse(raw))
  } catch { /* ignore */ }
}

// ===== MAIN LOOP =====
function loop(now: number) {
  const dt = Math.min(now - lastTime, 50)
  lastTime = now

  if (state.value === 'PLAYING') update(dt)
  else if (state.value === 'READY') updateReady()

  render()

  if (state.value === 'PLAYING' || state.value === 'READY') {
    rafId = requestAnimationFrame(loop)
  }
}

// ===== UPDATE (READY) =====
function updateReady() {
  movePaddle()
  // ball follows paddle
  if (balls[0]) {
    balls[0].x = paddle.x
    balls[0].y = PADDLE_Y - BALL_R - 1
  }
}

// ===== UPDATE (PLAYING) =====
function update(dt: number) {
  const dtS = dt / 1000
  const mode = currentMode.value

  // sprint timer
  if (mode === 'sprint') {
    modeTimer -= dtS
    if (modeTimer <= 0) { winGame(); return }
  }

  // survival speed
  if (mode === 'survival') {
    survivalElapsed += dt
    survivalSpeedMul = 1 + Math.floor(survivalElapsed / 10000) * 0.15
  }

  // effects timers
  for (let i = effects.length - 1; i >= 0; i--) {
    effects[i].timer -= dt
    if (effects[i].timer <= 0) {
      removeEffect(effects[i].kind)
      effects.splice(i, 1)
    }
  }

  // combo messages
  for (let i = comboMsgs.length - 1; i >= 0; i--) {
    comboMsgs[i].y -= 0.5
    comboMsgs[i].timer -= dt
    if (comboMsgs[i].timer <= 0) comboMsgs.splice(i, 1)
  }

  movePaddle()

  // debug slowmo
  const timeMul = hasEffect('debug') ? 0.5 : 1

  // move balls
  for (const ball of balls) {
    if (!ball.active) continue

    // trail
    ball.trail.push({ x: ball.x, y: ball.y })
    if (ball.trail.length > 5) ball.trail.shift()

    // auto-aim (StackOverflow)
    if (hasEffect('so')) {
      const nearest = findNearestBrick(ball)
      if (nearest) {
        const tx = nearest.x + nearest.w / 2 - ball.x
        const ty = nearest.y + nearest.h / 2 - ball.y
        const ta = Math.atan2(ty, tx)
        const ca = Math.atan2(ball.dy, ball.dx)
        const na = ca + (ta - ca) * 0.04
        const sp = Math.sqrt(ball.dx ** 2 + ball.dy ** 2)
        ball.dx = Math.cos(na) * sp
        ball.dy = Math.sin(na) * sp
      }
    }

    ball.x += ball.dx * timeMul
    ball.y += ball.dy * timeMul

    // walls
    if (ball.x - BALL_R < 0) { ball.x = BALL_R; ball.dx = Math.abs(ball.dx) }
    if (ball.x + BALL_R > GW) { ball.x = GW - BALL_R; ball.dx = -Math.abs(ball.dx) }
    if (ball.y - BALL_R < 0) { ball.y = BALL_R; ball.dy = Math.abs(ball.dy) }

    // bottom → lose ball
    if (ball.y - BALL_R > GH) {
      ball.active = false
      if (!balls.some(b => b.active)) loseLife()
      continue
    }

    // paddle collision
    if (ball.dy > 0 &&
        ball.y + BALL_R >= PADDLE_Y &&
        ball.y + BALL_R <= PADDLE_Y + PADDLE_H + 4 &&
        ball.x >= paddle.x - paddle.w / 2 - BALL_R &&
        ball.x <= paddle.x + paddle.w / 2 + BALL_R) {
      const hitPos = (ball.x - paddle.x) / (paddle.w / 2)
      const angle = clamp(hitPos, -0.9, 0.9) * (Math.PI / 3)
      const sp = ball.speed * survivalSpeedMul
      ball.dx = Math.sin(angle) * sp
      ball.dy = -Math.cos(angle) * sp
      ball.y = PADDLE_Y - BALL_R
    }

    // brick collision
    for (const brick of bricks) {
      if (!brick.active) continue
      if (!ballBrickOverlap(ball, brick)) continue

      brick.hp--
      if (brick.hp <= 0) {
        brick.active = false
        onBrickDestroyed(brick, ball)
      }

      // reflect (unless deploy piercing)
      if (!hasEffect('deploy')) {
        reflectBall(ball, brick)
      }

      // special brick effects
      if (brick.type === 4) { // auth → speed boost
        ball.dx *= 1.15; ball.dy *= 1.15
        ball.speed *= 1.05
      }
      if (brick.type === 5) { // memory leak → slow paddle
        paddle.speed = 3
        setTimeout(() => { paddle.speed = hasEffect('coffee') ? 7.5 : 5 }, 3000)
      }

      if (!hasEffect('deploy')) break // only one brick per frame unless piercing
    }
  }

  // falling powerups
  for (const pu of fallingPUs) {
    if (!pu.active) continue
    pu.y += 2.5
    if (pu.y > GH) { pu.active = false; continue }
    // catch with paddle
    if (pu.y + 10 >= PADDLE_Y && pu.y - 10 <= PADDLE_Y + PADDLE_H &&
        pu.x >= paddle.x - paddle.w / 2 - 10 && pu.x <= paddle.x + paddle.w / 2 + 10) {
      pu.active = false
      applyPowerup(pu.kind)
    }
  }

  // check level clear (classic/zen/hardcore)
  if ((mode === 'classic' || mode === 'zen' || mode === 'hardcore') && bricks.every(b => !b.active)) {
    if (levelIdx >= LEVELS.length - 1) {
      winGame()
    } else {
      levelIdx++
      effects = []
      fallingPUs = []
      paddle.w = PADDLE_BASE_W
      paddle.speed = 5
      loadLevel(levelIdx)
      state.value = 'READY'
      resetBallOnPaddle()
      showLevelBanner()
    }
  }

  // survival/sprint: respawn bricks if too few
  if ((mode === 'sprint' || mode === 'survival') && bricks.filter(b => b.active).length < 4) {
    loadRandomLevel()
  }
}

// ===== HELPERS =====
function movePaddle() {
  const spd = paddle.speed * (hasEffect('coffee') ? 1.5 : 1) * (hasEffect('chaos') ? 0.7 : 1)
  if (touchX !== null) {
    const target = touchX
    const diff = target - paddle.x
    paddle.x += clamp(diff, -spd * 2, spd * 2)
  } else {
    if (keys['a'] || keys['A'] || keys['ArrowLeft']) paddle.x -= spd
    if (keys['d'] || keys['D'] || keys['ArrowRight']) paddle.x += spd
  }
  paddle.x = clamp(paddle.x, paddle.w / 2, GW - paddle.w / 2)
}

function ballBrickOverlap(ball: Ball, brick: Brick): boolean {
  const cx = clamp(ball.x, brick.x, brick.x + brick.w)
  const cy = clamp(ball.y, brick.y, brick.y + brick.h)
  const dx = ball.x - cx, dy = ball.y - cy
  return dx * dx + dy * dy < BALL_R * BALL_R
}

function reflectBall(ball: Ball, brick: Brick) {
  // determine dominant axis of penetration
  const bcx = brick.x + brick.w / 2, bcy = brick.y + brick.h / 2
  const dx = ball.x - bcx, dy = ball.y - bcy
  const wx = dx / (brick.w / 2 + BALL_R), wy = dy / (brick.h / 2 + BALL_R)
  if (Math.abs(wx) > Math.abs(wy)) ball.dx = dx > 0 ? Math.abs(ball.dx) : -Math.abs(ball.dx)
  else ball.dy = dy > 0 ? Math.abs(ball.dy) : -Math.abs(ball.dy)
}

function findNearestBrick(ball: Ball): Brick | null {
  let best: Brick | null = null, bestD = Infinity
  for (const b of bricks) {
    if (!b.active) continue
    const d = (b.x + b.w / 2 - ball.x) ** 2 + (b.y + b.h / 2 - ball.y) ** 2
    if (d < bestD) { bestD = d; best = b }
  }
  return best
}

function onBrickDestroyed(brick: Brick, ball: Ball) {
  // score
  const pts = brick.type === 6 ? 25 : brick.type === 3 ? 15 : brick.type === 2 ? 10 : 5
  score.value += pts

  // combo message
  if (Math.random() < 0.35) {
    comboMsgs.push({ text: COMBOS[Math.floor(Math.random() * COMBOS.length)], x: brick.x + brick.w / 2, y: brick.y, timer: 1200 })
  }

  // maybe drop powerup
  const cfg = MODE_CFG[currentMode.value]
  if (cfg.powerups && Math.random() < 0.18) {
    const def = POWERUP_DEFS[Math.floor(Math.random() * POWERUP_DEFS.length)]
    fallingPUs.push({ x: brick.x + brick.w / 2, y: brick.y + brick.h, kind: def.kind, emoji: def.emoji, active: true })
  }
}

function applyPowerup(kind: PUKind) {
  score.value += 10
  // remove existing same kind
  effects = effects.filter(e => e.kind !== kind)

  if (kind === 'coffee') effects.push({ kind, timer: 8000 })
  else if (kind === 'so') effects.push({ kind, timer: 5000 })
  else if (kind === 'debug') effects.push({ kind, timer: 5000 })
  else if (kind === 'deploy') effects.push({ kind, timer: 5000 })
  else if (kind === 'chaos') {
    effects.push({ kind, timer: 5000 })
    paddle.w = PADDLE_BASE_W * 0.6
    for (const b of balls) { b.dx *= 1.3; b.dy *= 1.3; b.speed *= 1.2 }
  }

  comboMsgs.push({ text: kind === 'chaos' ? '💥 CHAOS MODE!' : `${POWERUP_DEFS.find(p => p.kind === kind)?.emoji} ${POWERUP_DEFS.find(p => p.kind === kind)?.label}`, x: GW / 2, y: GH / 2, timer: 1500 })
}

function removeEffect(kind: PUKind) {
  if (kind === 'chaos') {
    paddle.w = PADDLE_BASE_W
    for (const b of balls) { b.speed = MODE_CFG[currentMode.value].speed * survivalSpeedMul }
  }
}

function hasEffect(kind: PUKind): boolean { return effects.some(e => e.kind === kind) }

function clamp(v: number, min: number, max: number) { return v < min ? min : v > max ? max : v }

// ===== RENDER =====
function renderMenu() {
  if (!ctx) return
  const c = ctx
  c.fillStyle = '#0f172a'
  c.fillRect(0, 0, GW, GH)
}

function render() {
  if (!ctx) return
  const c = ctx

  // bg
  c.fillStyle = '#0f172a'
  c.fillRect(0, 0, GW, GH)

  // chaos tint
  if (hasEffect('chaos')) {
    c.fillStyle = 'rgba(239,68,68,0.05)'
    c.fillRect(0, 0, GW, GH)
  }

  // slowmo indicator
  if (hasEffect('debug')) {
    c.fillStyle = 'rgba(147,51,234,0.12)'
    c.fillRect(0, 0, GW, 3)
    c.fillRect(0, GH - 3, GW, 3)
  }

  // bricks
  for (const brick of bricks) {
    if (!brick.active) continue
    const def = BRICK_DEFS[brick.type]
    // brick bg
    const alpha = brick.hp > 1 ? 1 : 0.85
    c.globalAlpha = alpha
    c.fillStyle = def.color
    c.beginPath()
    roundRect(c, brick.x, brick.y, brick.w, brick.h, 3)
    c.fill()
    // hp indicator for multi-hit
    if (brick.hp > 1) {
      c.fillStyle = 'rgba(0,0,0,0.3)'
      c.beginPath()
      roundRect(c, brick.x, brick.y, brick.w, brick.h, 3)
      c.fill()
      c.fillStyle = '#fff'
      c.font = '10px monospace'
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.fillText(`${brick.hp}`, brick.x + brick.w / 2, brick.y + brick.h / 2)
    }
    // emoji on brick
    c.globalAlpha = 0.7
    c.font = '12px serif'
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillText(def.emoji, brick.x + brick.w / 2, brick.y + brick.h / 2)
    c.globalAlpha = 1
  }

  // falling powerups
  for (const pu of fallingPUs) {
    if (!pu.active) continue
    c.beginPath()
    c.arc(pu.x, pu.y, 12, 0, Math.PI * 2)
    c.strokeStyle = 'rgba(74,222,128,0.5)'
    c.lineWidth = 2
    c.stroke()
    c.font = '16px serif'
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillText(pu.emoji, pu.x, pu.y)
  }

  // balls
  for (const ball of balls) {
    if (!ball.active) continue
    // trail
    for (let i = 0; i < ball.trail.length; i++) {
      const a = (i + 1) / (ball.trail.length + 1) * 0.3
      c.beginPath()
      c.arc(ball.trail[i].x, ball.trail[i].y, BALL_R * 0.6, 0, Math.PI * 2)
      c.fillStyle = hasEffect('deploy') ? `rgba(251,191,36,${a})` : `rgba(255,255,255,${a})`
      c.fill()
    }
    // ball
    c.beginPath()
    c.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2)
    c.fillStyle = hasEffect('deploy') ? '#fbbf24' : '#ffffff'
    c.fill()
  }

  // paddle
  const px = paddle.x - paddle.w / 2
  c.fillStyle = hasEffect('chaos') ? '#ef4444' : '#3b82f6'
  c.beginPath()
  roundRect(c, px, PADDLE_Y, paddle.w, PADDLE_H, 4)
  c.fill()
  // label
  c.font = '8px monospace'
  c.fillStyle = 'rgba(255,255,255,0.7)'
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.fillText('SERVER', paddle.x, PADDLE_Y + PADDLE_H / 2)

  // combo messages
  for (const msg of comboMsgs) {
    const a = clamp(msg.timer / 600, 0, 1)
    c.globalAlpha = a
    c.font = 'bold 11px monospace'
    c.fillStyle = '#22c55e'
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillText(msg.text, msg.x, msg.y)
    c.globalAlpha = 1
  }

  // HUD (terminal style)
  c.fillStyle = 'rgba(15,23,42,0.85)'
  c.fillRect(0, 0, GW, 40)
  c.font = '11px monospace'
  c.textBaseline = 'middle'
  c.textAlign = 'left'
  c.fillStyle = '#22c55e'

  const mode = currentMode.value
  const bugsLeft = bricks.filter(b => b.active).length
  let hudText = ''
  if (mode === 'sprint') {
    hudText = `TIME: ${Math.ceil(modeTimer)}s  SCORE: ${score.value}  BUGS: ${bugsLeft}`
  } else if (mode === 'zen') {
    hudText = `LV.${levelIdx + 1} ${LEVEL_NAMES[levelIdx] || ''}  SCORE: ${score.value}  BUGS: ${bugsLeft}`
  } else {
    hudText = `LIVES: ${lives}  SCORE: ${score.value}  BUGS: ${bugsLeft}  LV.${levelIdx + 1}`
  }
  c.fillText(hudText, 10, 20)

  // active effects indicators (right side)
  let ex = GW - 10
  c.textAlign = 'right'
  for (const eff of effects) {
    const sec = Math.ceil(eff.timer / 1000)
    const def = POWERUP_DEFS.find(p => p.kind === eff.kind)
    if (def) {
      c.fillStyle = eff.kind === 'chaos' ? '#ef4444' : '#22c55e'
      c.fillText(`${def.emoji}${sec}s`, ex, 20)
      ex -= 50
    }
  }
  c.textAlign = 'left'
}

function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.moveTo(x + r, y)
  c.lineTo(x + w - r, y)
  c.quadraticCurveTo(x + w, y, x + w, y + r)
  c.lineTo(x + w, y + h - r)
  c.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  c.lineTo(x + r, y + h)
  c.quadraticCurveTo(x, y + h, x, y + h - r)
  c.lineTo(x, y + r)
  c.quadraticCurveTo(x, y, x + r, y)
  c.closePath()
}
</script>

<style scoped>
</style>
