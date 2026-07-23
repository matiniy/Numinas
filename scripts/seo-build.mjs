import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function getProjectPaths() {
  const projectsSource = readFileSync(resolve(rootDir, 'src/lib/projects.ts'), 'utf8')
  const slugs = [...projectsSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])
  return ['/', '/privacy', ...slugs.map((slug) => `/work/${slug}`)]
}

function generateRobotsTxt(siteUrl) {
  return `User-agent: *
Allow: /

# Primary sitemap for Numinas (Vancouver motion studio)
Sitemap: ${siteUrl}/sitemap.xml
`
}

function generateSitemapXml(siteUrl, paths) {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = paths
    .map((path) => {
      const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
      const priority = path === '/' ? '1.0' : path === '/privacy' ? '0.5' : '0.8'
      const changefreq = path === '/' ? 'weekly' : path === '/privacy' ? 'monthly' : 'monthly'

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function writeSeoArtifacts({ siteUrl, publicDir, distDir }) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')
  const paths = getProjectPaths()
  const sitemap = generateSitemapXml(normalizedSiteUrl, paths)
  const robots = generateRobotsTxt(normalizedSiteUrl)

  writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8')
  writeFileSync(resolve(publicDir, 'robots.txt'), robots, 'utf8')

  if (distDir) {
    writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap, 'utf8')
    writeFileSync(resolve(distDir, 'robots.txt'), robots, 'utf8')
  }

  return {
    siteUrl: normalizedSiteUrl,
    pathCount: paths.length,
  }
}

const siteUrl = (process.env.VITE_SITE_URL || 'https://www.numinas.com').trim()
const result = writeSeoArtifacts({
  siteUrl,
  publicDir: resolve(rootDir, 'public'),
  distDir: process.argv.includes('--dist-only') ? resolve(rootDir, 'dist') : undefined,
})

console.log(`SEO artifacts generated for ${result.siteUrl} (${result.pathCount} URLs).`)

export { writeSeoArtifacts }
