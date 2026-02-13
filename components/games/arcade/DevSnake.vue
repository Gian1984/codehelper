<template>
  <div>
    <!-- Legend cards -->
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      <div class="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Food — eat them!</h3>
        <ul class="space-y-1.5">
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none font-mono text-green-300">x</span>
            <span class="text-xs text-white font-medium">variable</span>
            <span class="text-xs text-gray-500 ml-auto">+1 segment</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none font-mono text-blue-300">fn()</span>
            <span class="text-xs text-white font-medium">function</span>
            <span class="text-xs text-gray-500 ml-auto">+2 segments</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none font-mono text-purple-300">[]</span>
            <span class="text-xs text-white font-medium">array</span>
            <span class="text-xs text-gray-500 ml-auto">+3 segments</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none">☕</span>
            <span class="text-xs text-white font-medium">coffee</span>
            <span class="text-xs text-gray-500 ml-auto">speed boost 4s</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none">💡</span>
            <span class="text-xs text-white font-medium">stackoverflow</span>
            <span class="text-xs text-gray-500 ml-auto">invincible 3s</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none">✅</span>
            <span class="text-xs text-white font-medium">test passed</span>
            <span class="text-xs text-gray-500 ml-auto">score x2</span>
          </li>
        </ul>
      </div>
      <div class="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Hazards — avoid them!</h3>
        <ul class="space-y-1.5">
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none">🐛</span>
            <span class="text-xs text-white font-medium">bug</span>
            <span class="text-xs text-gray-500 ml-auto">game over</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none">💧</span>
            <span class="text-xs text-white font-medium">memory leak</span>
            <span class="text-xs text-gray-500 ml-auto">lose segments</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none">🔄</span>
            <span class="text-xs text-white font-medium">infinite loop</span>
            <span class="text-xs text-gray-500 ml-auto">slow down</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none">⚠️</span>
            <span class="text-xs text-white font-medium">deprecated</span>
            <span class="text-xs text-gray-500 ml-auto">invert controls</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="text-sm leading-none">💥</span>
            <span class="text-xs text-white font-medium">500 error</span>
            <span class="text-xs text-gray-500 ml-auto">freeze 1s</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Canvas -->
    <div class="relative mx-auto" style="width:480px;max-width:100%">
      <canvas
        ref="cvs"
        class="block w-full rounded-lg border border-gray-700 touch-none"
        width="480"
        height="480"
      />
    </div>

    <!-- Share buttons (game over) -->
    <div v-if="gameOver && score > 0" class="mt-5">
      <GameShareButtons
        :score="score"
        :game-title="'Code Eater'"
        :game-url="`https://codehelper.me/games/dev-snake/`"
      />
    </div>

    <!-- Best score -->
    <div class="mt-5 w-full flex items-center justify-center gap-3 rounded-lg border border-gray-700 bg-gray-800/50 px-5 py-3">
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

/* ───── constants ───── */
const COLS = 24
const ROWS = 24
const W = 480
const H = 480
const CELL = W / COLS          // 20px

const BASE_TICK = 120          // ms per move
const FAST_TICK = 70           // coffee speed
const SLOW_TICK = 200          // infinite-loop slow

const INVINCIBLE_MS = 3000
const SCORE_X2_MS = 5000
const COFFEE_MS = 4000
const SLOW_MS = 4000
const INVERT_MS = 4000
const FREEZE_MS = 1000
const LEAK_MS = 3000
const LEAK_INTERVAL = 800      // lose 1 segment every N ms

/* ───── types ───── */
type Dir = 'up' | 'down' | 'left' | 'right'
type Pos = { x: number; y: number }

type FoodKind = 'variable' | 'function' | 'array' | 'coffee' | 'stackoverflow' | 'test'
type HazardKind = 'bug' | 'memoryleak' | 'infiniteloop' | 'deprecated' | '500error'

interface FoodItem { pos: Pos; kind: FoodKind }
interface HazardItem { pos: Pos; kind: HazardKind }

const FOOD_DEFS: Record<FoodKind, { symbol: string; grow: number; color: string }> = {
  variable:      { symbol: 'x',   grow: 1, color: '#86efac' },
  function:      { symbol: 'fn()', grow: 2, color: '#93c5fd' },
  array:         { symbol: '[]',  grow: 3, color: '#c4b5fd' },
  coffee:        { symbol: '☕',   grow: 0, color: '#fbbf24' },
  stackoverflow: { symbol: '💡',   grow: 0, color: '#fef08a' },
  test:          { symbol: '✅',   grow: 0, color: '#86efac' },
}

const HAZARD_DEFS: Record<HazardKind, { symbol: string; color: string }> = {
  bug:          { symbol: '🐛', color: '#f87171' },
  memoryleak:   { symbol: '💧', color: '#fb923c' },
  infiniteloop: { symbol: '🔄', color: '#facc15' },
  deprecated:   { symbol: '⚠️', color: '#9ca3af' },
  '500error':   { symbol: '💥', color: '#fca5a5' },
}

/* ───── state ───── */
const cvs = ref<HTMLCanvasElement | null>(null)
const score = ref(0)
const bestScore = ref(0)
const gameOver = ref(false)

let snake: Pos[] = []
let dir: Dir = 'right'
let nextDir: Dir = 'right'
let growQueue = 0

let foods: FoodItem[] = []
let hazards: HazardItem[] = []

// timers / effects
let tickInterval = BASE_TICK
let invincibleUntil = 0
let scoreX2Until = 0
let coffeeUntil = 0
let slowUntil = 0
let invertUntil = 0
let freezeUntil = 0
let leakUntil = 0
let leakLastDrain = 0

let lastTick = 0
let animId = 0
let running = false
let started = false

/* ───── helpers ───── */
function loadBest(): number {
  try { return parseInt(localStorage.getItem('devsnake_best') || '0', 10) || 0 } catch { return 0 }
}
function saveBest(v: number) {
  try { localStorage.setItem('devsnake_best', String(v)) } catch {}
}

function randomFreeCell(): Pos {
  for (let tries = 0; tries < 200; tries++) {
    const x = Math.floor(Math.random() * COLS)
    const y = Math.floor(Math.random() * ROWS)
    if (snake.some(s => s.x === x && s.y === y)) continue
    if (foods.some(f => f.pos.x === x && f.pos.y === y)) continue
    if (hazards.some(h => h.pos.x === x && h.pos.y === y)) continue
    return { x, y }
  }
  return { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
}

function pickFoodKind(): FoodKind {
  const r = Math.random()
  if (r < 0.35) return 'variable'
  if (r < 0.55) return 'function'
  if (r < 0.70) return 'array'
  if (r < 0.80) return 'coffee'
  if (r < 0.90) return 'stackoverflow'
  return 'test'
}

function pickHazardKind(): HazardKind {
  const r = Math.random()
  if (r < 0.30) return 'bug'
  if (r < 0.50) return 'memoryleak'
  if (r < 0.70) return 'infiniteloop'
  if (r < 0.85) return 'deprecated'
  return '500error'
}

function spawnFood() {
  while (foods.length < 3) {
    foods.push({ pos: randomFreeCell(), kind: pickFoodKind() })
  }
}

function maybeSpawnHazard() {
  const maxH = Math.min(4, Math.floor(score.value / 30) + 1)
  if (hazards.length < maxH && Math.random() < 0.4) {
    hazards.push({ pos: randomFreeCell(), kind: pickHazardKind() })
  }
}

/* ───── init ───── */
function resetGame() {
  const cx = Math.floor(COLS / 2)
  const cy = Math.floor(ROWS / 2)
  snake = [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ]
  dir = 'right'
  nextDir = 'right'
  growQueue = 0
  foods = []
  hazards = []
  score.value = 0
  gameOver.value = false
  tickInterval = BASE_TICK
  invincibleUntil = 0
  scoreX2Until = 0
  coffeeUntil = 0
  slowUntil = 0
  invertUntil = 0
  freezeUntil = 0
  leakUntil = 0
  leakLastDrain = 0
  lastTick = 0
  started = false

  spawnFood()
}

/* ───── game logic ───── */
function tick(now: number) {
  // freeze effect
  if (now < freezeUntil) return

  // memory leak: drain segments
  if (now < leakUntil && now - leakLastDrain > LEAK_INTERVAL) {
    leakLastDrain = now
    if (snake.length > 3) snake.pop()
  }

  // effective tick speed
  let speed = BASE_TICK
  if (now < coffeeUntil) speed = FAST_TICK
  else if (now < slowUntil) speed = SLOW_TICK

  if (now - lastTick < speed) return
  lastTick = now

  // apply direction
  dir = nextDir

  // move head
  const head = snake[0]
  let nx = head.x
  let ny = head.y

  switch (dir) {
    case 'up':    ny--; break
    case 'down':  ny++; break
    case 'left':  nx--; break
    case 'right': nx++; break
  }

  const isInvincible = now < invincibleUntil

  // wall collision — game over (no wrap-around)
  if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
    if (!isInvincible) { endGame(); return }
    // clamp if invincible
    nx = Math.max(0, Math.min(COLS - 1, nx))
    ny = Math.max(0, Math.min(ROWS - 1, ny))
  }

  // self collision
  if (!isInvincible && snake.some(s => s.x === nx && s.y === ny)) {
    endGame()
    return
  }

  // add new head
  snake.unshift({ x: nx, y: ny })

  // grow or remove tail
  if (growQueue > 0) {
    growQueue--
  } else {
    snake.pop()
  }

  // check food
  for (let i = foods.length - 1; i >= 0; i--) {
    const f = foods[i]
    if (f.pos.x === nx && f.pos.y === ny) {
      const def = FOOD_DEFS[f.kind]
      if (def.grow > 0) {
        growQueue += def.grow
        const pts = def.grow * 10
        score.value += now < scoreX2Until ? pts * 2 : pts
      }
      // apply effects
      if (f.kind === 'coffee') coffeeUntil = now + COFFEE_MS
      if (f.kind === 'stackoverflow') invincibleUntil = now + INVINCIBLE_MS
      if (f.kind === 'test') { scoreX2Until = now + SCORE_X2_MS; score.value += 20 }

      foods.splice(i, 1)
      spawnFood()
      maybeSpawnHazard()
    }
  }

  // check hazards
  for (let i = hazards.length - 1; i >= 0; i--) {
    const h = hazards[i]
    if (h.pos.x === nx && h.pos.y === ny) {
      if (isInvincible) {
        // destroy hazard, bonus points
        hazards.splice(i, 1)
        score.value += 15
        continue
      }
      switch (h.kind) {
        case 'bug':
          endGame()
          return
        case 'memoryleak':
          leakUntil = now + LEAK_MS
          leakLastDrain = now
          break
        case 'infiniteloop':
          slowUntil = now + SLOW_MS
          break
        case 'deprecated':
          invertUntil = now + INVERT_MS
          break
        case '500error':
          freezeUntil = now + FREEZE_MS
          break
      }
      hazards.splice(i, 1)
    }
  }
}

function endGame() {
  gameOver.value = true
  running = false
  if (score.value > bestScore.value) {
    bestScore.value = score.value
    saveBest(score.value)
  }
}

/* ───── rendering ───── */
function render(now: number) {
  const c = cvs.value?.getContext('2d')
  if (!c) return

  const isInvincible = now < invincibleUntil
  const isFrozen = now < freezeUntil
  const isLeaking = now < leakUntil
  const isInverted = now < invertUntil
  const isSlow = now < slowUntil
  const isCoffee = now < coffeeUntil
  const isX2 = now < scoreX2Until

  // background — dark grid
  c.fillStyle = '#0f172a'
  c.fillRect(0, 0, W, H)

  // grid lines
  c.strokeStyle = '#1e293b'
  c.lineWidth = 0.5
  for (let x = 0; x <= COLS; x++) {
    c.beginPath(); c.moveTo(x * CELL, 0); c.lineTo(x * CELL, H); c.stroke()
  }
  for (let y = 0; y <= ROWS; y++) {
    c.beginPath(); c.moveTo(0, y * CELL); c.lineTo(W, y * CELL); c.stroke()
  }

  // draw food
  for (const f of foods) {
    const def = FOOD_DEFS[f.kind]
    const cx = f.pos.x * CELL + CELL / 2
    const cy = f.pos.y * CELL + CELL / 2
    if (f.kind === 'coffee' || f.kind === 'stackoverflow' || f.kind === 'test') {
      c.font = `${CELL - 4}px sans-serif`
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.fillStyle = '#ffffff'
      c.fillText(def.symbol, cx, cy)
    } else {
      c.font = `bold ${CELL - 4}px monospace`
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.fillStyle = def.color
      c.fillText(def.symbol, cx, cy)
    }
  }

  // draw hazards
  for (const h of hazards) {
    const def = HAZARD_DEFS[h.kind]
    const cx = h.pos.x * CELL + CELL / 2
    const cy = h.pos.y * CELL + CELL / 2
    c.font = `${CELL - 4}px sans-serif`
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillStyle = '#ffffff'
    c.fillText(def.symbol, cx, cy)
  }

  // draw snake
  for (let i = 0; i < snake.length; i++) {
    const s = snake[i]
    const isHead = i === 0
    const t = i / Math.max(snake.length - 1, 1)

    if (isInvincible) {
      // pulsing gold
      const pulse = 0.7 + 0.3 * Math.sin(now / 100)
      c.fillStyle = `rgba(250, 204, 21, ${pulse})`
    } else {
      // green gradient: head bright, tail darker
      const r = Math.round(34 + (134 - 34) * (1 - t))
      const g = Math.round(197 + (239 - 197) * (1 - t))
      const b = Math.round(94 + (172 - 94) * (1 - t))
      c.fillStyle = `rgb(${r},${g},${b})`
    }

    const pad = isHead ? 1 : 2
    c.fillRect(
      s.x * CELL + pad,
      s.y * CELL + pad,
      CELL - pad * 2,
      CELL - pad * 2
    )

    // head: draw { } brackets
    if (isHead) {
      c.font = `bold ${CELL - 2}px monospace`
      c.textAlign = 'center'
      c.textBaseline = 'middle'
      c.fillStyle = '#0f172a'
      c.fillText('{ }', s.x * CELL + CELL / 2, s.y * CELL + CELL / 2)
    }
  }

  // effect indicators (subtle border)
  if (isInvincible) {
    c.strokeStyle = 'rgba(250, 204, 21, 0.6)'
    c.lineWidth = 3
    c.strokeRect(1.5, 1.5, W - 3, H - 3)
  }
  if (isCoffee) {
    c.strokeStyle = 'rgba(251, 191, 36, 0.5)'
    c.lineWidth = 2
    c.strokeRect(1, 1, W - 2, H - 2)
  }
  if (isSlow) {
    c.strokeStyle = 'rgba(250, 204, 21, 0.4)'
    c.lineWidth = 2
    c.strokeRect(1, 1, W - 2, H - 2)
  }
  if (isInverted) {
    c.strokeStyle = 'rgba(156, 163, 175, 0.5)'
    c.lineWidth = 2
    c.strokeRect(1, 1, W - 2, H - 2)
  }
  if (isLeaking) {
    c.strokeStyle = 'rgba(251, 146, 60, 0.5)'
    c.lineWidth = 2
    c.strokeRect(1, 1, W - 2, H - 2)
  }

  // HUD — terminal style
  c.fillStyle = 'rgba(0, 0, 0, 0.6)'
  c.fillRect(0, 0, W, 26)
  c.font = 'bold 13px monospace'
  c.textAlign = 'left'
  c.textBaseline = 'top'
  c.fillStyle = '#22c55e'
  c.fillText(`> score: ${score.value}${isX2 ? ' (x2!)' : ''}`, 8, 6)

  c.textAlign = 'right'
  c.fillStyle = '#94a3b8'
  c.fillText(`lines: ${snake.length}`, W - 8, 6)

  // active effects text
  const effects: string[] = []
  if (isInvincible) effects.push('💡invincible')
  if (isCoffee) effects.push('☕speed')
  if (isSlow) effects.push('🔄slow')
  if (isInverted) effects.push('⚠️inverted')
  if (isLeaking) effects.push('💧leaking')
  if (isFrozen) effects.push('💥frozen')
  if (effects.length > 0) {
    c.fillStyle = 'rgba(0,0,0,0.5)'
    c.fillRect(0, H - 22, W, 22)
    c.font = '11px monospace'
    c.textAlign = 'center'
    c.textBaseline = 'bottom'
    c.fillStyle = '#fbbf24'
    c.fillText(effects.join('  '), W / 2, H - 5)
  }

  // start screen
  if (!started && !gameOver.value) {
    c.fillStyle = 'rgba(0,0,0,0.7)'
    c.fillRect(0, 0, W, H)
    c.font = 'bold 28px monospace'
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillStyle = '#22c55e'
    c.fillText('DevSnake', W / 2, H / 2 - 40)
    c.font = '16px monospace'
    c.fillStyle = '#94a3b8'
    c.fillText('Eat code. Avoid bugs.', W / 2, H / 2)
    c.font = '14px monospace'
    c.fillStyle = '#64748b'
    c.fillText('Press SPACE or tap to start', W / 2, H / 2 + 40)
    c.fillText('WASD / Arrow keys to move', W / 2, H / 2 + 62)
  }

  // game over
  if (gameOver.value) {
    c.fillStyle = 'rgba(0,0,0,0.75)'
    c.fillRect(0, 0, W, H)
    c.font = 'bold 22px monospace'
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillStyle = '#ef4444'
    c.fillText('segmentation fault', W / 2, H / 2 - 50)
    c.fillText('(core dumped)', W / 2, H / 2 - 24)
    c.font = '16px monospace'
    c.fillStyle = '#22c55e'
    c.fillText(`Score: ${score.value}`, W / 2, H / 2 + 16)
    c.fillStyle = '#94a3b8'
    c.fillText(`Lines of code: ${snake.length}`, W / 2, H / 2 + 42)
    c.font = '13px monospace'
    c.fillStyle = '#64748b'
    c.fillText('Press SPACE or tap to restart', W / 2, H / 2 + 76)
  }
}

/* ───── game loop ───── */
function loop(now: number) {
  if (running) {
    tick(now)
  }
  render(now)
  animId = requestAnimationFrame(loop)
}

/* ───── input ───── */
function opposite(d: Dir): Dir {
  const opp: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' }
  return opp[d]
}

function setDirection(d: Dir) {
  const now = performance.now()
  const inverted = now < invertUntil
  let target = d
  if (inverted) {
    target = opposite(d)
  }
  // can't reverse into yourself
  if (target !== opposite(dir)) {
    nextDir = target
  }
}

function handleKey(e: KeyboardEvent) {
  if (e.key === ' ' || e.key === 'Space') {
    e.preventDefault()
    if (!started) { started = true; running = true; lastTick = performance.now(); return }
    if (gameOver.value) { resetGame(); started = true; running = true; lastTick = performance.now(); return }
    return
  }

  if (!running) return

  switch (e.key) {
    case 'ArrowUp': case 'w': case 'W': e.preventDefault(); setDirection('up'); break
    case 'ArrowDown': case 's': case 'S': e.preventDefault(); setDirection('down'); break
    case 'ArrowLeft': case 'a': case 'A': e.preventDefault(); setDirection('left'); break
    case 'ArrowRight': case 'd': case 'D': e.preventDefault(); setDirection('right'); break
  }
}

// touch / swipe
let touchStart: { x: number; y: number } | null = null

function handleTouchStart(e: TouchEvent) {
  e.preventDefault()
  if (!started) { started = true; running = true; lastTick = performance.now(); return }
  if (gameOver.value) { resetGame(); started = true; running = true; lastTick = performance.now(); return }
  const t = e.touches[0]
  touchStart = { x: t.clientX, y: t.clientY }
}

function handleTouchEnd(e: TouchEvent) {
  if (!touchStart || !running) return
  const t = e.changedTouches[0]
  const dx = t.clientX - touchStart.x
  const dy = t.clientY - touchStart.y
  const minSwipe = 20
  if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return

  if (Math.abs(dx) > Math.abs(dy)) {
    setDirection(dx > 0 ? 'right' : 'left')
  } else {
    setDirection(dy > 0 ? 'down' : 'up')
  }
  touchStart = null
}

/* ───── lifecycle ───── */
onMounted(() => {
  bestScore.value = loadBest()
  resetGame()
  animId = requestAnimationFrame(loop)
  window.addEventListener('keydown', handleKey)
  cvs.value?.addEventListener('touchstart', handleTouchStart, { passive: false })
  cvs.value?.addEventListener('touchend', handleTouchEnd, { passive: false })
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('keydown', handleKey)
  cvs.value?.removeEventListener('touchstart', handleTouchStart)
  cvs.value?.removeEventListener('touchend', handleTouchEnd)
})
</script>
