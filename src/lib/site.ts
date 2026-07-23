import { SERVICE_AREA_LABELS } from '@/lib/service-areas'

export const SITE = {
  name: 'Numinas',
  legalName: 'Numinas Canada',
  tagline: 'Motion Studio',
  description:
    'Vancouver-based motion studio creating scroll-stopping launch films, brand systems, social content, and explainers for brands in Toronto, Seattle, Los Angeles, New York, San Francisco, Tokyo, Brazil, London, Dubai, and worldwide.',
  locale: 'en_CA',
  language: 'en',
  email: 'collab@numinas.studio',
  privacyEmail: 'info@numinas.studio',
  foundingDate: '2018',
  /** Prefer a 1200x630 raster for Open Graph / Discord / iMessage previews. */
  defaultOgImage: '/logo/og-share.png',
  favicon: '/logo/favicon.svg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  geo: {
    placename: 'Vancouver',
    region: 'CA-BC',
    latitude: 49.2827,
    longitude: -123.1207,
    country: 'CA',
    addressLocality: 'Vancouver',
    addressRegion: 'BC',
  },
  keywords: [
    'Numinas',
    'motion studio',
    'motion graphics',
    'animation studio',
    'explainer videos',
    'brand films',
    'Vancouver motion studio',
    ...SERVICE_AREA_LABELS,
  ],
} as const

export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
  return configured || 'https://www.numinas.studio'
}

export function getAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalizedPath}`
}
