// composables/useDateLabel.ts
// render the SAME label on ssr and client
export function useDateLabel(iso: string, locale = 'en-GB') {
    // pin to the same calendar day across ssr/csr
    const dt = new Date(`${iso}T00:00:00Z`)
    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(dt)
}
