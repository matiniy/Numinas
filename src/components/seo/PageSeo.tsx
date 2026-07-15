import { useEffect } from 'react'
import type { PageSeoConfig } from '@/lib/seo'
import { getAbsoluteUrl } from '@/lib/site'

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

function upsertLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"]`
  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
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
    const imageUrl = config.image ? getAbsoluteUrl(config.image) : undefined
    const robots = config.noindex ? 'noindex, nofollow' : 'index, follow'

    document.title = config.title

    upsertMeta('name', 'description', config.description)
    upsertMeta('name', 'robots', robots)
    upsertLink('canonical', canonicalUrl)

    upsertMeta('property', 'og:title', config.title)
    upsertMeta('property', 'og:description', config.description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:type', config.type ?? 'website')
    upsertMeta('property', 'og:site_name', 'Numinas')
    upsertMeta('property', 'og:locale', 'en_US')

    upsertMeta('name', 'twitter:card', imageUrl ? 'summary_large_image' : 'summary')
    upsertMeta('name', 'twitter:title', config.title)
    upsertMeta('name', 'twitter:description', config.description)

    if (imageUrl) {
      upsertMeta('property', 'og:image', imageUrl)
      upsertMeta('name', 'twitter:image', imageUrl)
    } else {
      removeMeta('property', 'og:image')
      removeMeta('name', 'twitter:image')
    }

    upsertJsonLd(config.jsonLd)
  }, [
    config.description,
    config.image,
    config.jsonLd,
    config.noindex,
    config.path,
    config.title,
    config.type,
  ])

  return null
}
