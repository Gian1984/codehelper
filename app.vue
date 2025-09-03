<template>
  <NuxtLayout />
  <CookieConsent />
</template>

<script setup>
import { useHead } from '#imports'

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
  noscript: [
    {
      key: 'gtm-noscript',
      innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5W8Q4TK9"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    }
  ]
}, {
  __dangerouslyDisableSanitizersByTagID: {
    'consent-default': ['innerHTML'],
    'gtm-noscript': ['innerHTML']
  }
})
</script>
