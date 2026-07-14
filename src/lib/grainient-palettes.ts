import type { Project } from '@/lib/projects'

const GRAINIENT_PALETTES = [
  { color1: '#FF9FFC', color2: '#5227FF', color3: '#B497CF' },
  { color1: '#ede9fe', color2: '#8b5cf6', color3: '#5b21b6' },
  { color1: '#ffedd5', color2: '#fb923c', color3: '#ea580c' },
  { color1: '#d1fae5', color2: '#34d399', color3: '#047857' },
  { color1: '#e0f2fe', color2: '#38bdf8', color3: '#0369a1' },
  { color1: '#fce7f3', color2: '#f472b6', color3: '#be185d' },
  { color1: '#fef3c7', color2: '#fbbf24', color3: '#b45309' },
  { color1: '#e9d5ff', color2: '#c084fc', color3: '#7e22ce' },
] as const

function hashSlug(slug: string) {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % GRAINIENT_PALETTES.length
  }
  return hash
}

export function getProjectGrainientColors(project: Project) {
  const palette = GRAINIENT_PALETTES[hashSlug(project.slug)]

  return {
    color1: project.accentSoft || palette.color1,
    color2: project.accent || palette.color2,
    color3: palette.color3,
  }
}
