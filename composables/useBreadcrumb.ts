/**
 * Generate BreadcrumbList structured data for SEO
 * @param currentPageTitle - Title of the current page
 * @param currentPageUrl - Full URL of the current page
 * @param options - Optional parent breadcrumb level
 * @returns JSON-LD BreadcrumbList schema
 */
export function useBreadcrumb(
  currentPageTitle: string,
  currentPageUrl: string,
  options?: {
    parentTitle?: string
    parentUrl?: string
  }
) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://codehelper.me'
      }
    ]
  }

  // Add parent level if provided (e.g., "Tools" or "Articles")
  if (options?.parentTitle && options?.parentUrl) {
    breadcrumbSchema.itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: options.parentTitle,
      item: options.parentUrl
    })
  }

  // Add current page (position 2 if no parent, 3 if parent exists)
  breadcrumbSchema.itemListElement.push({
    '@type': 'ListItem',
    position: options?.parentTitle ? 3 : 2,
    name: currentPageTitle,
    item: currentPageUrl
  })

  return breadcrumbSchema
}
