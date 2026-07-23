import { useEffect } from 'react'
import type { PageSeoConfig } from '@/lib/seo'
import { getAbsoluteUrl, SITE } from '@/lib/site'

const JSON_LD_ID = 'page-seo-json-ld'

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

function upsertLink(rel: string, href: string, attributes?: Record<string, string>) {
  let selector = `link[rel="${rel}"]`
  if (attributes?.hreflang) selector += `[hreflang="${attributes.hreflang}"]`

  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value)
    }
  }
}

function removeMeta(attribute: 'name' | 'property', key: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)?.remove()
}

function upsertJsonLd(data: PageSeoConfig['jsonLd']) {
  const existing = document.getElementById(JSON_LD_ID)

  if (!data) {
    existing?.remove()
    return
  }

  const script = (existing as HTMLScriptElement | null) ?? document.createElement('script')
  script.id = JSON_LD_ID
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  if (!existing) document.head.appendChild(script)
}

export function PageSeo(config: PageSeoConfig) {
  useEffect(() => {
    const canonicalUrl = getAbsoluteUrl(config.path)
    const imagePath = config.image || SITE.defaultOgImage
    const imageUrl = getAbsoluteUrl(imagePath)
    const imageAlt = config.imageAlt || `${SITE.name} - ${SITE.tagline}`
    const robots = config.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    const keywords = config.keywords?.length ? config.keywords.join(', ') : SITE.keywords.join(', ')

    document.title = config.title
    document.documentElement.lang = SITE.language

    upsertMeta('name', 'description', config.description)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'googlebot', robots)
    upsertMeta('name', 'keywords', keywords)
    upsertMeta('name', 'author', SITE.name)
    upsertMeta('name', 'application-name', SITE.name)
    upsertMeta('name', 'theme-color', '#0a0a0b')
    upsertMeta('name', 'format-detection', 'telephone=no')

    // Geo / local SEO signals (HQ: Vancouver, BC)
    upsertMeta('name', 'geo.region', SITE.geo.region)
    upsertMeta('name', 'geo.placename', SITE.geo.placename)
    upsertMeta('name', 'geo.position', `${SITE.geo.latitude};${SITE.geo.longitude}`)
    upsertMeta('name', 'ICBM', `${SITE.geo.latitude}, ${SITE.geo.longitude}`)

    upsertLink('canonical', canonicalUrl)
    upsertLink('alternate', canonicalUrl, { hreflang: 'en' })
    upsertLink('alternate', canonicalUrl, { hreflang: 'en-CA' })
    upsertLink('alternate', canonicalUrl, { hreflang: 'en-US' })
    upsertLink('alternate', canonicalUrl, { hreflang: 'en-GB' })
    upsertLink('alternate', canonicalUrl, { hreflang: 'x-default' })

    upsertMeta('property', 'og:title', config.title)
    upsertMeta('property', 'og:description', config.description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:type', config.type ?? 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:locale', SITE.locale)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', imageAlt)
    upsertMeta('property', 'og:image:type', imagePath.endsWith('.png') ? 'image/png' : 'image/svg+xml')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', config.title)
    upsertMeta('name', 'twitter:description', config.description)
    upsertMeta('name', 'twitter:image', imageUrl)
    upsertMeta('name', 'twitter:image:alt', imageAlt)

    if (config.noindex) {
      removeMeta('name', 'googlebot')
      upsertMeta('name', 'googlebot', 'noindex, nofollow')
    }

    upsertJsonLd(config.jsonLd)
  }, [
    config.description,
    config.image,
    config.imageAlt,
    config.jsonLd,
    config.keywords,
    config.noindex,
    config.path,
    config.title,
    config.type,
  ])

  return null
}
