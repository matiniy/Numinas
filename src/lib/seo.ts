import type { Project } from '@/lib/projects'
import { PROJECTS } from '@/lib/projects'
import { SITE_FAQS } from '@/lib/privacy-faq'
import { SERVICE_AREA_LABELS, toSchemaPlaces } from '@/lib/service-areas'
import { getAbsoluteUrl, SITE } from '@/lib/site'
import { SOCIAL_LINKS } from '@/lib/social-links'

export type PageSeoConfig = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  keywords?: string[]
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

export function truncateDescription(text: string, maxLength = 160) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`
}

export function getProjectOgImage(project: Project) {
  return (
    project.thumbnail ??
    project.heroImage ??
    project.media.find((item) => item.type === 'image' && item.src)?.src
  )
}

function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: SITE.name,
    alternateName: 'Numinas Canada',
    url: getAbsoluteUrl('/'),
    logo: getAbsoluteUrl(SITE.defaultOgImage),
    image: getAbsoluteUrl(SITE.defaultOgImage),
    description: SITE.description,
    email: 'collab@numinas.studio',
    foundingDate: '2018',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vancouver',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    areaServed: toSchemaPlaces(),
    knowsAbout: [
      'Motion graphics',
      '2D animation',
      '3D animation',
      'Explainer videos',
      'Brand films',
      'Social content',
      'Brand motion systems',
    ],
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'collab@numinas.studio',
      availableLanguage: ['English'],
      areaServed: SERVICE_AREA_LABELS,
    },
  }
}

function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: getAbsoluteUrl('/'),
    description: SITE.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: getAbsoluteUrl('/'),
    },
  }
}

function buildServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Motion design and animation',
    serviceType: 'Creative motion studio',
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: getAbsoluteUrl('/'),
    },
    areaServed: toSchemaPlaces(),
    description: SITE.description,
    url: getAbsoluteUrl('/#services'),
  }
}

export function buildHomeSeo(): PageSeoConfig {
  const title = `${SITE.name} — ${SITE.tagline} | Vancouver & Global`
  const description = SITE.description

  return {
    title,
    description,
    path: '/',
    image: SITE.defaultOgImage,
    type: 'website',
    keywords: [
      'motion studio Vancouver',
      'motion graphics Toronto',
      'animation studio Seattle',
      'explainer video Los Angeles',
      'brand film New York',
      'motion design San Francisco',
      'animation Tokyo',
      'motion graphics London',
      'creative studio Dubai',
      'motion design Brazil',
      'California motion studio',
      ...SITE.keywords,
    ],
    jsonLd: [buildOrganizationJsonLd(), buildWebsiteJsonLd(), buildServiceJsonLd()],
  }
}

export function buildProjectSeo(project: Project): PageSeoConfig {
  const title = `${project.title} — ${project.client} | ${SITE.name}`
  const description = truncateDescription(project.tagline || project.overview)
  const path = `/work/${project.slug}`
  const image = getProjectOgImage(project)

  return {
    title,
    description,
    path,
    image,
    type: 'article',
    keywords: [
      project.title,
      project.client,
      'motion graphics',
      'case study',
      'Numinas',
      'Vancouver motion studio',
      ...project.services,
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.title,
        description,
        url: getAbsoluteUrl(path),
        image: image ? getAbsoluteUrl(image) : undefined,
        dateCreated: project.year,
        creator: {
          '@type': 'Organization',
          name: SITE.name,
          url: getAbsoluteUrl('/'),
        },
        about: project.services,
        locationCreated: {
          '@type': 'Place',
          name: 'Vancouver',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Vancouver',
            addressRegion: 'BC',
            addressCountry: 'CA',
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getAbsoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: project.title,
            item: getAbsoluteUrl(path),
          },
        ],
      },
    ],
  }
}

export function buildNotFoundSeo(path = '/404'): PageSeoConfig {
  return {
    title: `Page not found | ${SITE.name}`,
    description: 'The requested project could not be found.',
    path,
    noindex: true,
  }
}

export function buildPrivacySeo(): PageSeoConfig {
  const description = truncateDescription(
    'Numinas Privacy Policy plus FAQ on our Vancouver motion studio, services, process, and how we work with brands worldwide.',
  )

  return {
    title: `Privacy Policy & FAQ | ${SITE.name}`,
    description,
    path: '/privacy',
    type: 'website',
    keywords: [
      'Numinas privacy policy',
      'motion studio FAQ',
      'Numinas services',
      'Vancouver motion studio',
      'explainer video studio',
      'brand film studio',
      ...SITE.keywords,
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy',
        description,
        url: getAbsoluteUrl('/privacy'),
        isPartOf: {
          '@type': 'WebSite',
          name: SITE.name,
          url: getAbsoluteUrl('/'),
        },
        about: {
          '@type': 'Organization',
          name: SITE.name,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: SITE_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getAbsoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Privacy Policy',
            item: getAbsoluteUrl('/privacy'),
          },
        ],
      },
    ],
  }
}

export function getIndexablePaths() {
  return ['/', '/privacy', ...PROJECTS.map((project) => `/work/${project.slug}`)]
}
