/**
 * Web Vitals Monitoring Plugin
 * Tracks Core Web Vitals (CLS, LCP, FID/INP, TTFB, FCP) and sends to Google Analytics
 */

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  // Type for Web Vitals metric
  interface Metric {
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
    delta: number
    id: string
  }

  // Send metric to Google Analytics
  function sendToAnalytics(metric: Metric) {
    // Check if gtag is available
    if (typeof window.gtag === 'function') {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating
      })
    }

    // Also log to console in development
    if (process.dev) {
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

// Type augmentation for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}
