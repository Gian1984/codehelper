import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY_SIDEBAR = 'codehelper-sidebar-open'
const STORAGE_KEY_CATEGORIES = 'codehelper-sidebar-categories'
const STORAGE_KEY_SCROLL = 'codehelper-sidebar-scroll'
const STORAGE_KEY_DESKTOP_COLLAPSED = 'codehelper-sidebar-desktop-collapsed'

/**
 * Composable for managing persistent sidebar state across navigation
 * Stores state in localStorage and provides reactive global state via Nuxt's useState
 */
export const useSidebarState = () => {
  // Global reactive state (shared across all components)
  const isOpen = useState<boolean>('sidebar-open', () => false)
  const isDesktopCollapsed = useState<boolean>('sidebar-desktop-collapsed', () => false)
  const openCategories = useState<Set<string>>('sidebar-categories', () => new Set())
  const scrollPosition = useState<number>('sidebar-scroll', () => 0)
  const searchQuery = useState<string>('sidebar-search', () => '')

  // Restore state from localStorage on mount
  const restoreState = () => {
    if (typeof window === 'undefined') return

    // Restore sidebar open/closed state
    const savedOpen = localStorage.getItem(STORAGE_KEY_SIDEBAR)
    if (savedOpen !== null) {
      isOpen.value = savedOpen === 'true'
    }

    // Restore desktop collapsed state
    const savedDesktopCollapsed = localStorage.getItem(STORAGE_KEY_DESKTOP_COLLAPSED)
    if (savedDesktopCollapsed !== null) {
      isDesktopCollapsed.value = savedDesktopCollapsed === 'true'
    }

    // Restore open categories
    const savedCategories = localStorage.getItem(STORAGE_KEY_CATEGORIES)
    if (savedCategories) {
      try {
        const categoriesArray = JSON.parse(savedCategories)
        openCategories.value = new Set(categoriesArray)
      } catch (e) {
        console.warn('Failed to restore sidebar categories:', e)
      }
    }

    // Restore scroll position
    const savedScroll = localStorage.getItem(STORAGE_KEY_SCROLL)
    if (savedScroll !== null) {
      scrollPosition.value = parseInt(savedScroll, 10) || 0
    }
  }

  // Watch and persist sidebar open state
  watch(isOpen, (newValue) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY_SIDEBAR, String(newValue))
  })

  // Watch and persist desktop collapsed state
  watch(isDesktopCollapsed, (newValue) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY_DESKTOP_COLLAPSED, String(newValue))
  })

  // Watch and persist open categories
  watch(
    openCategories,
    (newValue) => {
      if (typeof window === 'undefined') return
      const categoriesArray = Array.from(newValue)
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categoriesArray))
    },
    { deep: true }
  )

  // Watch and persist scroll position
  watch(scrollPosition, (newValue) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY_SCROLL, String(newValue))
  })

  // Sidebar control functions
  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  // Category accordion functions
  const toggleCategory = (category: string) => {
    const categories = new Set(openCategories.value)
    if (categories.has(category)) {
      categories.delete(category)
    } else {
      categories.add(category)
    }
    openCategories.value = categories
  }

  const isCategoryOpen = (category: string): boolean => {
    return openCategories.value.has(category)
  }

  const openAllCategories = () => {
    // This will be called with all category names
    openCategories.value = new Set()
  }

  const closeAllCategories = () => {
    openCategories.value = new Set()
  }

  // Scroll position functions
  const saveScrollPosition = (position: number) => {
    scrollPosition.value = position
  }

  const restoreScrollPosition = () => {
    return scrollPosition.value
  }

  // Search functions
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const clearSearch = () => {
    searchQuery.value = ''
  }

  // Desktop collapse controls
  const toggleDesktopCollapse = () => {
    isDesktopCollapsed.value = !isDesktopCollapsed.value
  }

  const collapseDesktop = () => {
    isDesktopCollapsed.value = true
  }

  const expandDesktop = () => {
    isDesktopCollapsed.value = false
  }

  return {
    // State
    isOpen,
    isDesktopCollapsed,
    openCategories,
    scrollPosition,
    searchQuery,

    // Sidebar controls
    toggle,
    open,
    close,

    // Desktop collapse controls
    toggleDesktopCollapse,
    collapseDesktop,
    expandDesktop,

    // Category controls
    toggleCategory,
    isCategoryOpen,
    openAllCategories,
    closeAllCategories,

    // Scroll controls
    saveScrollPosition,
    restoreScrollPosition,

    // Search controls
    setSearchQuery,
    clearSearch,

    // Restore from localStorage
    restoreState,
  }
}
