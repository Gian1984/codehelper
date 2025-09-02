<template>
  <NuxtLayout />
  <CookieConsent />
</template>

<script setup>
import { useHead } from '#imports'
import CookieConsent from '~/components/CookieConsent.vue'

/**
 * Set default consent BEFORE GTM loads:
 * everything denied except functionality/security (required).
 */
useHead({
  script: [
    {
      key: 'consent-default',
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted'
        });
      `
    }
  ],
  // consenti inline script non sanitizzato
  __dangerouslyDisableSanitizersByTagID: {
    'consent-default': ['innerHTML']
  }
})
</script>