<template>
  <!-- Banner -->
  <div
      v-if="mounted && !decision"
      class="fixed inset-x-0 bottom-0 z-50 bg-gray-900 text-white border-t border-gray-700"
  >
    <div class="max-w-7xl mx-auto p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="text-sm">
        <p class="font-semibold">Cookies & Privacy</p>
        <p class="text-gray-300">
          We use essential cookies and, with your consent, analytics and advertising cookies.
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
        <button class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium" @click="rejectAll">Reject</button>
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium" @click="save">Save</button>
        <button class="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-medium rounded" @click="acceptAll">Accept all</button>
      </div>
    </div>
  </div>

  <!-- Floating button to reopen -->
  <button
      v-if="mounted && decision"
      @click="resetConsent"
      class="fixed bottom-4 right-4 z-50 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg"
      title="Change cookie preferences"
  >
    ⚙️
  </button>
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
        applyConsent(prefs)
      }
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

function resetConsent() {
  decision.value = null
  localStorage.removeItem(STORAGE_KEY)
}

function applyConsent(p: ConsentPrefs) {
  if (typeof window === 'undefined') return

  const gtag = (window as any).gtag || ((...args: any[]) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(args)
  })

  gtag('consent', 'update', {
    analytics_storage: p.analytics ? 'granted' : 'denied',
    ad_storage: p.ads ? 'granted' : 'denied',
    ad_user_data: p.ads ? 'granted' : 'denied',
    ad_personalization: p.ads ? 'granted' : 'denied'
  })

  // opzionale: trigger page_view se l'utente ha appena accettato
  if (p.analytics) {
    const payload = {
      page_path: location.pathname + location.search + location.hash,
      page_location: location.href,
      page_title: document.title
    }
    window.dataLayer?.push({ event: 'page_view', ...payload })
    gtag('event', 'page_view', payload)
  }
}

function pushChoiceEvent(action: 'accept_all' | 'reject_all' | 'custom') {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'consent_choice',
    consent_action: action,
    consent_analytics: prefs.analytics,
    consent_ads: prefs.ads
  })
}
</script>


