import { defineNuxtPlugin } from '#app'

/**
 * Web Vitals Monitoring Plugin
 * Tracks Core Web Vitals (CLS, LCP, FID/INP, TTFB, FCP) and sends to GTM/GA4
 */

export default defineNuxtPlugin(() => {
  // Type for Web Vitals metric
  interface Metric {
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
    delta: number
    id: string
  }

  // Send metric to GTM via dataLayer
  function sendToAnalytics(metric: Metric) {
    // Push to dataLayer for GTM
    window.dataLayer?.push({
      event: 'web_vitals',
      metric_name: metric.name,
      metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      metric_id: metric.id
    })

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('[Web Vitals]', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id
      })
    }
  }

  // Track all Core Web Vitals
  // Dynamically import to avoid SSR issues
    import('web-vitals').then((webVitals) => {
        const { onCLS, onFCP, onINP, onLCP, onTTFB } = webVitals
        const onFID = (webVitals as any).onFID // may be undefined in v3+

        try {
            onCLS(sendToAnalytics)
            onLCP(sendToAnalytics)
            if (typeof onFID === 'function') onFID(sendToAnalytics)
            onINP(sendToAnalytics)
            onFCP(sendToAnalytics)
            onTTFB(sendToAnalytics)
        } catch (error) {
            console.error('[Web Vitals] Error tracking metrics:', error)
        }
    }).catch(error => {
        console.error('[Web Vitals] Failed to load module:', error)
    })
})
