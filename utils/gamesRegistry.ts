import type { DefineComponent } from 'vue'

type Game = {
    title: string
    description: string
    component: () => Promise<{ default: DefineComponent }>
    category?: string
    seo?: {
        title?: string
        description?: string
        ogImage?: string
        keywords?: string
        structuredData?: Record<string, any>
    }
}

export const games: Record<string, Game> = {
}
