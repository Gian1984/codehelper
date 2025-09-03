// plugins/gtm.client.ts
import { defineNuxtPlugin, useRouter } from '#app'

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return

    const GTM_ID = 'GTM-5W8Q4TK9'

    // Prevent double injection
    if (document.getElementById('gtm-loader')) return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []

    // Load GTM script
    const script = document.createElement('script')
    script.id = 'gtm-loader'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
    document.head.appendChild(script)

    // Track route changes
    const router = useRouter()
    router.afterEach((to) => {
        window.dataLayer?.push({
            event: 'nuxt.route_change',
            page_path: to.fullPath,
            page_location: window.location.href,
            page_title: document.title
        })
    })
})



