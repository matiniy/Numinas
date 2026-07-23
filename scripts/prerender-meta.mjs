/**
 * After Vite build, write route-specific HTML shells with correct
 * <title>, description, and canonical so crawlers that do not run JS
 * (e.g. Bing) do not treat /work/* as alternates of /.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const distDir = resolve(rootDir, 'dist')
const siteUrl = (process.env.VITE_SITE_URL || 'https://www.numinas.studio').trim().replace(/\/$/, '')

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function truncateDescription(text, maxLength = 160) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`
}

function parseProjects(source) {
  const blocks = source.split(/\{\s*\n\s*slug:/).slice(1)
  return blocks
    .map((block) => {
      const slug = block.match(/^\s*'([^']+)'/)?.[1]
      const client = block.match(/client:\s*'([^']+)'/)?.[1]
      const title = block.match(/title:\s*'([^']+)'/)?.[1]
      const tagline = block.match(/tagline:\s*'([^']+)'/)?.[1]
      if (!slug || !client || !title || !tagline) return null
      return { slug, client, title, tagline }
    })
    .filter(Boolean)
}

function getPages() {
  const projectsSource = readFileSync(resolve(rootDir, 'src/lib/projects.ts'), 'utf8')
  const projects = parseProjects(projectsSource)

  const homeDescription =
    'Vancouver-based motion studio creating scroll-stopping launch films, brand systems, social content, and explainers for brands in Toronto, Seattle, Los Angeles, New York, San Francisco, Tokyo, Brazil, London, Dubai, and worldwide.'

  const pages = [
    {
      path: '/',
      title: 'Numinas - Motion Studio | Vancouver & Global',
      description: homeDescription,
      type: 'website',
      imageAlt: 'Numinas motion studio logo',
    },
    {
      path: '/privacy',
      title: 'Privacy Policy & FAQ | Numinas',
      description:
        'Numinas Privacy Policy and FAQ covering our Vancouver motion studio services, process, and how we work with brands worldwide.',
      type: 'website',
      imageAlt: 'Numinas privacy policy',
    },
    ...projects.map((project) => {
      const baseDescription = truncateDescription(project.tagline, 120)
      const description = truncateDescription(
        `${baseDescription} Case study by Numinas, a Vancouver motion studio serving global brands.`,
      )
      return {
        path: `/work/${project.slug}`,
        title: `${project.title} - ${project.client} | Numinas Case Study`,
        description,
        type: 'article',
        imageAlt: `${project.title} by ${project.client} - Numinas case study`,
      }
    }),
  ]

  return pages
}

function setMetaByName(html, name, content) {
  const re = new RegExp(
    `<meta\\s+[^>]*name="${name}"[^>]*>`,
    'i',
  )
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function setMetaByProperty(html, property, content) {
  const re = new RegExp(
    `<meta\\s+[^>]*property="${property}"[^>]*>`,
    'i',
  )
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function setLinkHref(html, rel, href, hreflang) {
  if (hreflang) {
    const re = new RegExp(
      `<link\\s+[^>]*rel="${rel}"[^>]*hreflang="${hreflang}"[^>]*>|<link\\s+[^>]*hreflang="${hreflang}"[^>]*rel="${rel}"[^>]*>`,
      'i',
    )
    const tag = `<link rel="${rel}" hreflang="${hreflang}" href="${escapeHtml(href)}" />`
    if (re.test(html)) return html.replace(re, tag)
    return html.replace('</head>', `    ${tag}\n  </head>`)
  }

  // Prefer the bare canonical link (no hreflang)
  const re = new RegExp(`<link\\s+rel="${rel}"\\s+href="[^"]*"\\s*/?>`, 'i')
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function applyPageSeo(html, page) {
  const canonicalUrl = page.path === '/' ? `${siteUrl}/` : `${siteUrl}${page.path}`
  const imageUrl = `${siteUrl}/logo/og-share.png`
  const imageAlt = page.imageAlt || 'Numinas motion studio logo'

  let out = html
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
  out = setMetaByName(out, 'description', page.description)
  out = setLinkHref(out, 'canonical', canonicalUrl)
  for (const lang of ['en', 'en-CA', 'en-US', 'en-GB', 'x-default']) {
    out = setLinkHref(out, 'alternate', canonicalUrl, lang)
  }
  out = setMetaByProperty(out, 'og:title', page.title)
  out = setMetaByProperty(out, 'og:description', page.description)
  out = setMetaByProperty(out, 'og:url', canonicalUrl)
  out = setMetaByProperty(out, 'og:type', page.type || 'website')
  out = setMetaByProperty(out, 'og:image', imageUrl)
  out = setMetaByProperty(out, 'og:image:secure_url', imageUrl)
  out = setMetaByProperty(out, 'og:image:alt', imageAlt)
  out = setMetaByName(out, 'twitter:title', page.title)
  out = setMetaByName(out, 'twitter:description', page.description)
  out = setMetaByName(out, 'twitter:image', imageUrl)
  out = setMetaByName(out, 'twitter:image:alt', imageAlt)
  return out
}

function writePageHtml(page, template) {
  const html = applyPageSeo(template, page)
  if (page.path === '/') {
    writeFileSync(resolve(distDir, 'index.html'), html, 'utf8')
    return resolve(distDir, 'index.html')
  }

  const outPath = resolve(distDir, `.${page.path}`, 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html, 'utf8')
  return outPath
}

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8')
const pages = getPages()
const written = pages.map((page) => writePageHtml(page, template))

console.log(`Prerendered SEO meta for ${written.length} routes → ${distDir}`)
