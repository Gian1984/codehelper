// plugins/gtm.client.ts
import { defineNuxtPlugin, useRouter } from '#app'

// Type augmentation for dataLayer
declare global {
    interface Window {
        dataLayer?: any[]
    }
}

export default defineNuxtPlugin(() => {
    if (!import.meta.client) return

    const GTM_ID = 'GTM-5W8Q4TK9'

    if (document.getElementById('gtm-loader')) return

    window.dataLayer = window.dataLayer || []

    const script = document.createElement('script')
    script.id = 'gtm-loader'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(script)

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





