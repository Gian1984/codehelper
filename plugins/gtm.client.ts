// plugins/gtm.client.ts
import { defineNuxtPlugin, useRouter } from '#app'

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return

    const GTM_ID = 'GTM-5W8Q4TK9'

    // Evita doppio inserimento
    if (document.getElementById('gtm-loader')) return

        ;(window as any).dataLayer = (window as any).dataLayer || []

    // Carica GTM
    const s = document.createElement('script')
    s.id = 'gtm-loader'
    s.async = true
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
    document.head.appendChild(s)

    // Router sync
    const router = useRouter()
    router.afterEach((to) => {
        ;(window as any).dataLayer.push({
            event: 'nuxt.route_change',
            page_path: to.fullPath,
            page_location: window.location.href,
            page_title: document.title
        })
    })
})
