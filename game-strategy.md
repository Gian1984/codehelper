# Stack Overflow Survivor — Game Strategy

## Concept
Sei uno sviluppatore al centro dello schermo. Dal cielo cadono errori, exceptions, bugs e deprecated warnings. Devi schivarli il più a lungo possibile.

---

## Tech Stack

### Rendering: Canvas 2D + requestAnimationFrame
- **Zero dipendenze esterne** — niente Phaser, PixiJS, p5.js
- Un singolo `<canvas>` element dentro un componente Vue SFC
- Game loop via `requestAnimationFrame` per 60fps smooth
- Tutto il rendering con `ctx.fillText()` per emoji e `ctx.fillRect()` / `ctx.drawImage()` per il resto
- Nessun DOM manipulation durante il gameplay (performance)

### Perché solo Canvas nativo
| Opzione | Pro | Contro |
|---------|-----|--------|
| **Canvas nativo** | 0 KB bundle, full control, fast | Più codice manuale |
| Phaser | Game engine completo | ~1 MB bundle, overkill |
| PixiJS | WebGL renderer potente | ~500 KB, troppo per un minigioco |
| CSS animations | Semplice | Non scalabile, janky con 50+ elementi |

**Scelta: Canvas nativo** — il gioco è semplice, non serve un engine. Mantiene il bundle leggero e il controllo totale.

---

## Architettura File

```
components/games/arcade/StackOverflowSurvivor.vue   ← componente Vue (canvas + UI overlay)
```

**Un singolo file SFC** che contiene:
- `<template>` — canvas + overlay UI (score, start screen, game over)
- `<script setup>` — game logic completa
- `<style scoped>` — styling minimale per l'overlay

Nessun file separato per engine/utils — tutto self-contained per semplicità.

---

## Game Design Detail

### Player
- Emoji `🧑‍💻` (o sprite semplice) — ~40x40px
- Posizione iniziale: centro-basso dello schermo
- Movimento: WASD / Arrow keys / Touch drag
- Velocità: ~5px/frame (tunable)
- Hitbox: rettangolo leggermente più piccolo dello sprite (forgiving)

### Falling Objects (Hazards)
| Emoji | Tipo | Velocità base | Spawn rate |
|-------|------|--------------|------------|
| ❌ | `SyntaxError` | 2px/f | Alta |
| 💥 | `TypeError` | 3px/f | Media |
| 🔥 | `RuntimeBug` | 2.5px/f | Media |
| 🧱 | `DeprecatedWarning` | 1.5px/f | Bassa (lento ma grosso) |

- Spawn random sulla X, cadono verso il basso
- Hitbox basata su dimensione emoji (~30x30px)
- Rotation leggera per effetto visivo (opzionale)

### Powerups
| Emoji | Nome | Effetto | Durata |
|-------|------|---------|--------|
| ☕ | Coffee | Slow motion (hazards a 50% speed) | 5 sec |
| 🧠 | StackOverflow Answer | Shield (1 hit immunity) | 8 sec |
| 🐛 | Debugger | Elimina tutti gli hazard on screen | Instant |

- Spawn rate: molto più bassa degli hazard (~1 ogni 8-12 sec)
- Colore di background glow per distinguerli (es. cerchio verde dietro)

### Difficulty Scaling
```
level = floor(timeAlive / 15)  // ogni 15 sec sale di livello

spawnInterval = max(300, 1000 - level * 80)   // ms tra spawn (min 300ms)
fallSpeed     = baseSpeed + level * 0.3         // accelerazione graduale
maxHazards    = 5 + level * 2                   // più roba sullo schermo
```

### Scoring
- +1 punto per ogni hazard che esce dallo schermo (schivato)
- +5 bonus per ogni powerup raccolto
- +10 bonus ogni 15 secondi sopravvissuti
- High score salvato in `localStorage`

---

## Game States

```
MENU → PLAYING → GAME_OVER
  ↑                   |
  └───────────────────┘
```

1. **MENU**: titolo, best score, pulsante "Play" (o premi spazio)
2. **PLAYING**: game loop attivo, score in alto
3. **GAME_OVER**: score finale, best score, "Play Again" + "Share"

---

## Controls

### Desktop
- `W` / `ArrowUp` → su
- `A` / `ArrowLeft` → sinistra
- `S` / `ArrowDown` → giù
- `D` / `ArrowRight` → destra
- `Space` / `Enter` → Start / Restart

### Mobile (Touch)
- **Touch drag**: il player segue il dito (con offset per non coprirlo)
- **Tap**: Start / Restart nelle schermate menu/gameover
- Canvas responsive: `width = min(container, 480px)`, `height = 640px` (ratio ~3:4)

---

## Canvas Setup

```ts
// Dimensioni logiche fisse (coordinate interne)
const GAME_W = 480
const GAME_H = 640

// Il canvas viene scalato via CSS per essere responsive
// ma le coordinate di gioco restano 480x640
canvas.width = GAME_W
canvas.height = GAME_H
canvas.style.width = '100%'
canvas.style.maxWidth = `${GAME_W}px`
```

---

## Rendering Approach

- **Background**: gradiente scuro (tema dark del sito)
- **Emoji rendering**: `ctx.font = '32px serif'; ctx.fillText('🔥', x, y)`
  - Pro: zero assets da caricare
  - Contro: rendering varia tra OS (accettabile per un minigioco meme)
- **Score/text**: `ctx.fillText()` con font monospace
- **Effetti**:
  - Screen shake on hit (offset canvas per 200ms)
  - Flash rosso on hit
  - Particelle semplici on powerup (opzionale v2)

---

## Performance Notes

- Object pooling per hazards (evita GC pressure con array preallocato)
- Max ~50 oggetti simultanei sullo schermo
- `requestAnimationFrame` con delta time per frame-rate independence
- No allocazioni nel game loop (reuse objects)

---

## Vue Integration

```vue
<template>
  <div class="relative">
    <canvas ref="canvasRef" class="block mx-auto rounded-lg" />

    <!-- Overlay HTML per UI (più facile da stilare del canvas text) -->
    <div v-if="state === 'MENU'" class="absolute inset-0 flex flex-col items-center justify-center">
      <!-- Start screen -->
    </div>
    <div v-if="state === 'GAME_OVER'" class="absolute inset-0 flex flex-col items-center justify-center">
      <!-- Game over screen -->
    </div>
  </div>
</template>
```

- Le schermate MENU e GAME_OVER usano **HTML overlay** sopra il canvas (più facile da stilare, accessibile, coerente col design del sito)
- Il gameplay è **puro canvas**
- `onMounted` → setup canvas + event listeners
- `onUnmounted` → cleanup (cancelAnimationFrame, remove listeners)

---

## Registry Entry

```ts
// utils/gamesRegistry.ts
'stack-overflow-survivor': {
    title: 'Stack Overflow Survivor',
    description: 'Dodge bugs, errors, and exceptions falling from the sky. How long can you survive?',
    category: 'arcade',
    component: () => import('~/components/games/arcade/StackOverflowSurvivor.vue'),
    seo: { ... }
}
```

---

## Share Feature
- Al game over: pulsante "Share Score"
- Testo: `"I survived ${score} bugs in Stack Overflow Survivor! 🧑‍💻💥 Can you beat me? https://codehelper.me/games/stack-overflow-survivor"`
- Usa Web Share API (con fallback clipboard)

---

## MVP Scope (v1)
- [x] Canvas setup + game loop
- [x] Player movement (WASD + touch)
- [x] Falling hazards (4 tipi)
- [x] Collision detection
- [x] Difficulty scaling
- [x] Score + high score (localStorage)
- [x] Menu / Playing / Game Over states
- [x] Share score
- [x] Mobile responsive

## Future (v2)
- [ ] Sound effects (Web Audio API, opt-in)
- [ ] Particle effects
- [ ] Leaderboard (se si aggiunge backend)
- [ ] Più powerups
- [ ] Boss fight ogni 60 sec (un mega `NullPointerException`)
