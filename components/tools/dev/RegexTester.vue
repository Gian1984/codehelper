<template>
  <div class="p-8 bg-gray-800 rounded shadow space-y-6">
    <h2 class="text-xl text-white font-semibold">Regex Tester</h2>

    <!-- pattern + flags -->
    <div class="grid md:grid-cols-3 gap-4">
      <div class="md:col-span-2 space-y-2">
        <label class="block text-white text-sm">pattern</label>
        <input
            v-model="pattern"
            spellcheck="false"
            placeholder="es. ^\\w+@\\w+\\.\\w+$"
            class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full font-mono"
        />
        <p class="text-xs text-gray-400">usa javascript regex (ECMAScript).</p>
      </div>

      <div class="space-y-2">
        <label class="block text-white text-sm">flags</label>
        <div class="flex flex-wrap gap-2 text-white">
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.g" /> g</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.i" /> i</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.m" /> m</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.s" /> s</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.u" /> u</label>
          <label class="flex items-center gap-1"><input type="checkbox" v-model="flags.y" /> y</label>
        </div>
        <p class="text-xs text-gray-400">g: global, i: ignore-case, m: multiline, s: dotAll, u: unicode, y: sticky</p>
      </div>
    </div>

    <!-- sample input + replace -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-white text-sm">sample input</label>
          <div class="flex items-center gap-2">
            <select
                class="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1"
                v-model="exampleKey"
                @change="applyExample"
            >
              <option value="">— examples —</option>
              <option v-for="ex in EXAMPLES" :key="ex.key" :value="ex.key">{{ ex.label }}</option>
            </select>
            <button
                class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                @click="clearAll"
            >clear</button>
          </div>
        </div>
        <textarea
            v-model="sample"
            spellcheck="false"
            rows="10"
            class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full font-mono"
            placeholder="incolla qui il testo da testare…"
        ></textarea>
        <p class="text-xs text-gray-400">max dimension elaborate: {{ MAX_INPUT }} character.</p>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-white text-sm mb-1">replacement (opzionale)</label>
          <input
              v-model="replacement"
              spellcheck="false"
              placeholder="es. $1 — oppure $&lt;name&gt;"
              class="bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 w-full font-mono"
          />

          <!-- help text sotto -->
          <p class="text-xs text-gray-400">
            use $1, $2… for all numeric group, $&amp; for entire match, $&lt;name&gt; for the group.
          </p>
        </div>

        <div class="bg-gray-900 rounded border border-gray-700 p-4">
          <div class="flex items-center justify-between mb-2">
            <p class="text-gray-300 text-sm">replace output</p>
            <button
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                @click="copy(replaceOutput)"
                :disabled="!replaceOutput"
            >copy</button>
          </div>
          <pre class="text-white font-mono whitespace-pre-wrap break-words">{{ replaceOutput || '—' }}</pre>
        </div>
      </div>
    </div>

    <!-- errors / info -->
    <div v-if="error" class="bg-red-900/40 border border-red-700 text-red-200 rounded p-3">
      <strong>errore:</strong> {{ error }}
    </div>
    <div v-else class="text-gray-300 text-sm">
      flags correnti: <span class="font-mono text-white">/{{ flagsString }}/</span>
      • match trovati: <span class="font-mono text-white">{{ matches.length }}</span>
      <span v-if="trimmed"> • input truncate at {{ MAX_INPUT }} characters for security reason</span>
    </div>

    <!-- highlight output -->
    <div class="space-y-2">
      <p class="text-white text-sm">highlight</p>
      <div class="bg-gray-900 rounded border border-gray-700 p-4 min-h-24">
        <div
            class="text-white font-mono whitespace-pre-wrap break-words"
            v-html="highlightHtml"
        ></div>
      </div>
    </div>

    <!-- matches detail -->
    <div class="space-y-2">
      <p class="text-white text-sm">matches & groups</p>
      <div class="bg-gray-900 rounded border border-gray-700 p-4">
        <div v-if="matches.length === 0" class="text-gray-400 text-sm">no match.</div>

        <div v-for="(m, idx) in matches" :key="idx" class="mb-4">
          <div class="flex items-center justify-between">
            <p class="text-white font-mono">
              #{{ idx+1 }} [{{ m.index }}–{{ m.index + m[0].length }}): <span class="bg-yellow-600/30 px-1 rounded">{{ m[0] }}</span>
            </p>
            <button class="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs"
                    @click="copy(m[0])">copy</button>
          </div>
          <div class="mt-2 grid sm:grid-cols-2 gap-3">
            <div>
              <p class="text-gray-300 text-xs mb-1">groups (posizionali)</p>
              <ul class="text-white font-mono text-sm space-y-1">
                <li v-if="m.length === 1" class="text-gray-400">—</li>
                <li v-for="(g,gIdx) in m.slice(1)" :key="gIdx">
                  ${{ gIdx+1 }} = <span class="bg-blue-600/30 px-1 rounded">{{ g ?? 'null' }}</span>
                </li>
              </ul>
            </div>
            <div>
              <p class="text-gray-300 text-xs mb-1">named groups</p>
              <ul class="text-white font-mono text-sm space-y-1">
                <li v-if="!m.groups || Object.keys(m.groups).length===0" class="text-gray-400">—</li>
                <li v-for="(val, name) in (m.groups || {})" :key="name">
                  &lt;{{ name }}&gt; = <span class="bg-green-600/30 px-1 rounded">{{ val }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="matches.length">
          <div class="flex items-center justify-between mt-4">
            <p class="text-gray-300 text-sm">matches (JSON)</p>
            <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    @click="copy(matchesJson)">copy</button>
          </div>
          <pre class="text-white font-mono whitespace-pre-wrap break-words">{{ matchesJson }}</pre>
        </div>
      </div>
    </div>

    <p v-if="copiedMsg" class="text-green-400 text-sm">{{ copiedMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

/** ---------- stato ---------- */
const pattern = ref<string>('')
const flags = reactive({ g: true, i: false, m: false, s: false, u: false, y: false })
const sample = ref<string>('')
const replacement = ref<string>('')

const error = ref<string>('')
const copiedMsg = ref<string>('')

const MAX_INPUT = 100000 // limite sicurezza per evitare regex catastrofiche
const MAX_MATCHES = 1000 // limite massimo matches elencati

const exampleKey = ref<string>('')

/** esempi rapidi */
const EXAMPLES = [
  {
    key: 'email',
    label: 'email (semplice)',
    pattern: String.raw`\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`,
    flags: { g: true, i: true, m: false, s: false, u: false, y: false },
    sample: `contatti: mario.rossi@example.com, test@dominio.it, NON-EMAIL: foo@bar`
  },
  {
    key: 'url',
    label: 'url (http/https)',
    pattern: String.raw`https?:\/\/[^\s/$.?#].[^\s]*`,
    flags: { g: true, i: true, m: false, s: false, u: false, y: false },
    sample: `links: https://codehelper.me, http://example.org/page?q=1`
  },
  {
    key: 'ipv4',
    label: 'ipv4',
    pattern: String.raw`\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b`,
    flags: { g: true, i: false, m: false, s: false, u: false, y: false },
    sample: `ok: 192.168.0.1, 8.8.8.8 - no: 999.999.0.1`
  },
  {
    key: 'hashtag',
    label: 'hashtag',
    pattern: String.raw`#(?<tag>[A-Za-z0-9_]{2,})`,
    flags: { g: true, i: false, m: false, s: false, u: true, y: false },
    sample: `prova #regex #Dev_Tools #àèì`
  }
] as const

function applyExample() {
  const ex = EXAMPLES.find(e => e.key === exampleKey.value)
  if (!ex) return
  pattern.value = ex.pattern
  sample.value = ex.sample
  Object.assign(flags, ex.flags)
}

/** ---------- helpers ---------- */
const flagsString = computed(() => {
  return Object.entries(flags).filter(([_, v]) => v).map(([k]) => k).join('')
})

function buildRegex(): RegExp | null {
  error.value = ''
  try {
    return new RegExp(pattern.value, flagsString.value)
  } catch (e: any) {
    error.value = e?.message ?? String(e)
    return null
  }
}

function copy(text: string) {
  if (!text) return
  navigator.clipboard.writeText(text)
  copiedMsg.value = 'copiato!'
  setTimeout(() => (copiedMsg.value = ''), 1500)
}

const trimmedSample = computed(() => {
  return sample.value.length > MAX_INPUT ? sample.value.slice(0, MAX_INPUT) : sample.value
})
const trimmed = computed(() => sample.value.length > MAX_INPUT)

/** esecuzione regex con sicurezza: limita #match e usa exec() */
const matches = computed(() => {
  const re = buildRegex()
  if (!re) return []
  const text = trimmedSample.value
  const out: Array<RegExpExecArray & { groups?: Record<string, string>; index: number }> = []
  let count = 0

  if (re.global || re.sticky) {
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      out.push(m as any)
      count++
      if (count >= MAX_MATCHES) break
      // prevenzione loop infinito su match 0-len
      if (m[0] === '') re.lastIndex++
    }
  } else {
    const m = re.exec(text)
    if (m) out.push(m as any)
  }
  return out
})

/** highlight html del testo con <mark> sui match */
const highlightHtml = computed(() => {
  const text = trimmedSample.value
  if (!text) return ''
  const re = buildRegex()
  if (!re) return escapeHtml(text)

  let last = 0
  let html = ''
  if (re.global || re.sticky) {
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      const start = m.index
      const end = m.index + m[0].length
      html += escapeHtml(text.slice(last, start))
      html += `<mark class="bg-yellow-600/50 text-white rounded px-0.5">${escapeHtml(m[0])}</mark>`
      last = end
      if (m[0] === '') re.lastIndex++
      if (last > text.length || html.length > 2_000_000) break
    }
    html += escapeHtml(text.slice(last))
  } else {
    const m = re.exec(text)
    if (!m) return escapeHtml(text)
    const start = m.index
    const end = m.index + m[0].length
    html = escapeHtml(text.slice(0, start)) +
        `<mark class="bg-yellow-600/50 text-white rounded px-0.5">${escapeHtml(m[0])}</mark>` +
        escapeHtml(text.slice(end))
  }
  return html
})

/** output replace */
const replaceOutput = computed(() => {
  const re = buildRegex()
  if (!re) return ''
  if (!replacement.value) return ''
  try {
    return trimmedSample.value.replace(re, replacement.value)
  } catch (e: any) {
    error.value = e?.message ?? String(e)
    return ''
  }
})

/** matches JSON (compresso ma leggibile) */
const matchesJson = computed(() => {
  const simple = matches.value.map(m => ({
    match: m[0],
    index: m.index,
    groups: m.groups || {},
    captures: Array.from(m).slice(1)
  }))
  return JSON.stringify(simple, null, 2)
})

/** utils */
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c] as string))
}

function clearAll() {
  pattern.value = ''
  sample.value = ''
  replacement.value = ''
  exampleKey.value = ''
}

/** stato persistente */
const STORAGE_KEY = 'regex-tester-state'
watch([pattern, () => ({...flags}), sample, replacement], () => {
  const payload = { pattern: pattern.value, flags: {...flags}, sample: sample.value, replacement: replacement.value }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)) } catch {}
}, { deep: true })

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (typeof s?.pattern === 'string') pattern.value = s.pattern
      if (s?.flags) Object.assign(flags, s.flags)
      if (typeof s?.sample === 'string') sample.value = s.sample
      if (typeof s?.replacement === 'string') replacement.value = s.replacement
    } else {
      // precompila con un esempio leggero
      exampleKey.value = 'email'
      applyExample()
    }
  } catch {}
})
</script>

<style scoped>
/* usa utility tailwind; <mark> personalizzato già inlined nelle classi */
</style>
