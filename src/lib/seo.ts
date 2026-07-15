import type { Project } from '@/lib/projects'
import { PROJECTS } from '@/lib/projects'
import { getAbsoluteUrl, SITE } from '@/lib/site'

export type PageSeoConfig = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
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

export function buildHomeSeo(): PageSeoConfig {
  const title = `${SITE.name} — ${SITE.tagline}`
  const description = SITE.description

  return {
    title,
    description,
    path: '/',
    image: SITE.defaultOgImage,
    type: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE.name,
        url: getAbsoluteUrl('/'),
        logo: getAbsoluteUrl(SITE.defaultOgImage),
        description,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE.name,
        url: getAbsoluteUrl('/'),
        description,
      },
    ],
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

export function getIndexablePaths() {
  return ['/', ...PROJECTS.map((project) => `/work/${project.slug}`)]
}
