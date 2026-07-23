import { SERVICE_AREA_LABELS } from '@/lib/service-areas'

export const SITE = {
  name: 'Numinas',
  tagline: 'Motion Studio',
  description:
    'Vancouver-based motion studio creating scroll-stopping launch films, brand systems, social content, and explainers for brands in Toronto, Seattle, Los Angeles, New York, San Francisco, Tokyo, Brazil, London, Dubai, and worldwide.',
  locale: 'en',
  defaultOgImage: '/logo/favicon.svg',
  keywords: [
    'Numinas',
    'motion studio',
    'motion graphics',
    'animation studio',
    'explainer videos',
    'brand films',
    ...SERVICE_AREA_LABELS,
  ],
} as const

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
  return configured || 'https://www.numinas.com'
}

export function getAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalizedPath}`
}
