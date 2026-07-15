export const SITE = {
  name: 'Numinas',
  tagline: 'Motion Studio',
  description:
    'Numinas is a creative motion studio building scroll-stopping visuals that clarify, captivate, and convert across launch films, brand systems, social content, and explainers.',
  locale: 'en',
  defaultOgImage: '/logo/favicon.svg',
} as const

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
  return configured || 'https://www.numinas.com'
}

export function getAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalizedPath}`
}
