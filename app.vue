<template>
  <NuxtLayout />
  <CookieConsent />
</template>


<script setup>
import { useHead } from '#imports'

useHead({
  script: [
    {
      hid: 'gtag-lib',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-9TDCZ9V398',
      async: true
    },
    {
      hid: 'gtag-init',
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

        gtag('js', new Date());
        gtag('config', 'G-9TDCZ9V398', {
          anonymize_ip: true
        });
      `
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'gtag-init': ['innerHTML']
  }
})
</script>