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
  imageAlt?: string
  type?: 'website' | 'article'
  noindex?: boolean
  keywords?: string[]
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

const GEO_KEYWORDS = [
  'motion studio Vancouver',
  'motion graphics Toronto',
  'animation studio Seattle',
  'explainer video Los Angeles',
  'brand film New York',
  'motion design San Francisco',
  'California motion studio',
  'animation Tokyo',
  'motion design Brazil',
  'motion graphics London',
  'creative studio Dubai',
]

export function truncateDescription(text: string, maxLength = 160) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`
}

export function getProjectOgImage(project: Project) {
  return (
    project.thumbnail ??
    project.heroImage ??
    project.media.find((item) => item.type === 'image' && item.src)?.src ??
    SITE.defaultOgImage
  )
}

function buildOrganizationJsonLd() {
  return {
    '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
    '@id': `${getAbsoluteUrl('/')}#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: ['Numinas Studio', 'Numinas Canada'],
    url: getAbsoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: getAbsoluteUrl(SITE.defaultOgImage),
    },
    image: getAbsoluteUrl(SITE.defaultOgImage),
    description: SITE.description,
    email: SITE.email,
    foundingDate: SITE.foundingDate,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.geo.addressLocality,
      addressRegion: SITE.geo.addressRegion,
      addressCountry: SITE.geo.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
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
      'Experiential and AR',
    ],
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.email,
        availableLanguage: ['English'],
        areaServed: SERVICE_AREA_LABELS,
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE.privacyEmail,
        availableLanguage: ['English'],
      },
    ],
  }
}

function buildWebsiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${getAbsoluteUrl('/')}#website`,
    name: SITE.name,
    url: getAbsoluteUrl('/'),
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { '@id': `${getAbsoluteUrl('/')}#organization` },
  }
}

function buildServiceJsonLd() {
  return {
    '@type': 'Service',
    '@id': `${getAbsoluteUrl('/#services')}#service`,
    name: 'Motion design and animation',
    serviceType: 'Creative motion studio',
    provider: { '@id': `${getAbsoluteUrl('/')}#organization` },
    areaServed: toSchemaPlaces(),
    description: SITE.description,
    url: getAbsoluteUrl('/#services'),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Numinas motion services',
      itemListElement: [
        'Brand Films',
        'Explainer Videos',
        'Social Content',
        'Motion Systems',
        'Experiential & AR',
        'Custom & R&D',
      ].map((name, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          position: index + 1,
        },
      })),
    },
  }
}

export function buildHomeSeo(): PageSeoConfig {
  const title = `${SITE.name} - ${SITE.tagline} | Vancouver & Global`
  const description = SITE.description

  return {
    title,
    description,
    path: '/',
    image: SITE.defaultOgImage,
    imageAlt: `${SITE.name} motion studio logo`,
    type: 'website',
    keywords: [...GEO_KEYWORDS, ...SITE.keywords],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [buildOrganizationJsonLd(), buildWebsiteJsonLd(), buildServiceJsonLd()],
    },
  }
}

export function buildProjectSeo(project: Project): PageSeoConfig {
  const title = `${project.title} - ${project.client} | ${SITE.name} Case Study`
  const baseDescription = truncateDescription(project.tagline || project.overview, 120)
  const description = truncateDescription(
    `${baseDescription} Case study by Numinas, a Vancouver motion studio serving global brands.`,
  )
  const path = `/work/${project.slug}`
  const image = getProjectOgImage(project)

  return {
    title,
    description,
    path,
    image,
    imageAlt: `${project.title} by ${project.client} - Numinas case study`,
    type: 'article',
    keywords: [
      project.title,
      project.client,
      'motion graphics case study',
      'Numinas',
      'Vancouver motion studio',
      ...GEO_KEYWORDS.slice(0, 4),
      ...project.services,
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['CreativeWork', 'Article'],
          '@id': `${getAbsoluteUrl(path)}#work`,
          name: project.title,
          headline: project.title,
          description,
          url: getAbsoluteUrl(path),
          image: getAbsoluteUrl(image),
          dateCreated: project.year,
          datePublished: `${project.year}-01-01`,
          author: { '@id': `${getAbsoluteUrl('/')}#organization` },
          creator: { '@id': `${getAbsoluteUrl('/')}#organization` },
          publisher: { '@id': `${getAbsoluteUrl('/')}#organization` },
          about: project.services,
          keywords: project.services.join(', '),
          inLanguage: SITE.language,
          locationCreated: {
            '@type': 'Place',
            name: SITE.geo.placename,
            address: {
              '@type': 'PostalAddress',
              addressLocality: SITE.geo.addressLocality,
              addressRegion: SITE.geo.addressRegion,
              addressCountry: SITE.geo.country,
            },
          },
          isPartOf: { '@id': `${getAbsoluteUrl('/')}#website` },
        },
        {
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
              name: 'Work',
              item: getAbsoluteUrl('/#projects'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: project.title,
              item: getAbsoluteUrl(path),
            },
          ],
        },
        buildOrganizationJsonLd(),
      ],
    },
  }
}

export function buildNotFoundSeo(path = '/404'): PageSeoConfig {
  return {
    title: `Page not found | ${SITE.name}`,
    description: 'The requested page could not be found on the Numinas site.',
    path,
    image: SITE.defaultOgImage,
    imageAlt: `${SITE.name} logo`,
    noindex: true,
  }
}

export function buildPrivacySeo(): PageSeoConfig {
  const description = truncateDescription(
    'Numinas Privacy Policy and FAQ covering our Vancouver motion studio services, process, and how we work with brands worldwide.',
  )

  return {
    title: `Privacy Policy & FAQ | ${SITE.name}`,
    description,
    path: '/privacy',
    image: SITE.defaultOgImage,
    imageAlt: `${SITE.name} privacy policy`,
    type: 'website',
    keywords: [
      'Numinas privacy policy',
      'motion studio FAQ',
      'Numinas services',
      'Vancouver motion studio',
      'explainer video studio',
      'brand film studio',
      ...GEO_KEYWORDS,
      ...SITE.keywords,
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${getAbsoluteUrl('/privacy')}#webpage`,
          name: 'Privacy Policy & FAQ',
          description,
          url: getAbsoluteUrl('/privacy'),
          inLanguage: SITE.language,
          isPartOf: { '@id': `${getAbsoluteUrl('/')}#website` },
          about: { '@id': `${getAbsoluteUrl('/')}#organization` },
          primaryImageOfPage: getAbsoluteUrl(SITE.defaultOgImage),
        },
        {
          '@type': 'FAQPage',
          '@id': `${getAbsoluteUrl('/privacy')}#faq`,
          url: getAbsoluteUrl('/privacy#faq'),
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
        buildOrganizationJsonLd(),
        buildWebsiteJsonLd(),
      ],
    },
  }
}

export function getIndexablePaths() {
  return ['/', '/privacy', ...PROJECTS.map((project) => `/work/${project.slug}`)]
}
