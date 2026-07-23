/**
 * Markets Numinas serves — used for Organization / Service schema (areaServed).
 * Structured data helps search engines understand geographic relevance without
 * stuffing city names into every on-page headline.
 */
export type ServiceArea = {
  name: string
  addressCountry: string
  addressRegion?: string
  addressLocality?: string
}

export const SERVICE_AREAS: ServiceArea[] = [
  { name: 'Vancouver', addressLocality: 'Vancouver', addressRegion: 'BC', addressCountry: 'CA' },
  { name: 'Toronto', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  { name: 'Seattle', addressLocality: 'Seattle', addressRegion: 'WA', addressCountry: 'US' },
  { name: 'Los Angeles', addressLocality: 'Los Angeles', addressRegion: 'CA', addressCountry: 'US' },
  { name: 'California', addressRegion: 'CA', addressCountry: 'US' },
  { name: 'New York', addressLocality: 'New York', addressRegion: 'NY', addressCountry: 'US' },
  { name: 'San Francisco', addressLocality: 'San Francisco', addressRegion: 'CA', addressCountry: 'US' },
  { name: 'Tokyo', addressLocality: 'Tokyo', addressCountry: 'JP' },
  { name: 'Brazil', addressCountry: 'BR' },
  { name: 'London', addressLocality: 'London', addressCountry: 'GB' },
  { name: 'Dubai', addressLocality: 'Dubai', addressCountry: 'AE' },
]

export const SERVICE_AREA_LABELS = SERVICE_AREAS.map((area) => area.name)

export function toSchemaPlaces() {
  return SERVICE_AREAS.map((area) => ({
    '@type': 'Place' as const,
    name: area.name,
    address: {
      '@type': 'PostalAddress' as const,
      addressLocality: area.addressLocality,
      addressRegion: area.addressRegion,
      addressCountry: area.addressCountry,
    },
  }))
}
