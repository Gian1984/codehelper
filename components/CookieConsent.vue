<template>
  <div
      v-if="mounted && !decision"
      class="fixed inset-x-0 bottom-0 z-50 bg-gray-900 text-white border-t border-gray-700"
  >
    <div class="max-w-7xl mx-auto p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="text-sm">
        <p class="font-semibold">Cookies & Privacy</p>
        <p class="text-gray-300">
          We use essential cookies and, with your consent, analytics and advertising cookies.
          You can change your choice at any time.
        </p>
        <div class="mt-2 flex gap-4">
          <label class="flex items-center gap-2 text-xs">
            <input type="checkbox" v-model="prefs.analytics" />
            Analytics
          </label>
          <label class="flex items-center gap-2 text-xs">
            <input type="checkbox" v-model="prefs.ads" />
            Ads & Personalization
          </label>
        </div>
      </div>

      <div class="flex gap-2">
        <button class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded" @click="rejectAll">Reject</button>
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded" @click="save">Save</button>
        <button class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded" @click="acceptAll">Accept all</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'

type ConsentPrefs = { analytics: boolean; ads: boolean }
const STORAGE_KEY = 'cookieConsent.v1'

const mounted = ref(false)
const decision = ref<null | 'accepted' | 'rejected' | 'custom'>(null)
const prefs = reactive<ConsentPrefs>({ analytics: true, ads: false })

onMounted(() => {
  mounted.value = true
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as { decision: typeof decision.value; prefs: ConsentPrefs }
      if (saved?.prefs) Object.assign(prefs, saved.prefs)
      if (saved?.decision) {
        decision.value = saved.decision
        // Re-apply consent (e.g., on subsequent navigations)
        applyConsent(prefs)
      }
    } else {
      // Optional: if the browser's Do Not Track is enabled, deny everything
      const dnt = typeof navigator !== 'undefined' && (navigator as any).doNotTrack === '1'
      if (dnt) { prefs.analytics = false; prefs.ads = false }
    }
  } catch {}
})

function saveState(kind: typeof decision.value) {
  decision.value = kind
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ decision: kind, prefs }))
}

function acceptAll() {
  prefs.analytics = true
  prefs.ads = true
  applyConsent(prefs)
  saveState('accepted')
  pushChoiceEvent('accept_all')
}

function rejectAll() {
  prefs.analytics = false
  prefs.ads = false
  applyConsent(prefs)
  saveState('rejected')
  pushChoiceEvent('reject_all')
}

function save() {
  applyConsent(prefs)
  saveState('custom')
  pushChoiceEvent('custom')
}

/** Consent Mode v2: update signals to Google */
function applyConsent(p: ConsentPrefs) {
  if (typeof window === 'undefined') return
  const gtag = (window as any).gtag || ((...args: any[]) => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(args)
  })

  gtag('consent', 'update', {
    analytics_storage: p.analytics ? 'granted' : 'denied',
    ad_storage:       p.ads ? 'granted' : 'denied',
    ad_user_data:     p.ads ? 'granted' : 'denied',
    ad_personalization: p.ads ? 'granted' : 'denied',
    // essentials already 'granted' in the default script (functionality/security)
  })
}

/** Optional event in dataLayer for GTM */
function pushChoiceEvent(action: 'accept_all' | 'reject_all' | 'custom') {
  if (typeof window === 'undefined') return
      ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push({
    event: 'consent_choice',
    consent_action: action,
    consent_analytics: prefs.analytics,
    consent_ads: prefs.ads
  })
}
</script>

<style scoped>
/* using Tailwind; nothing extra */
</style>

