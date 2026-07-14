import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader'
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero'
import { CaseStudyNext } from '@/components/case-study/CaseStudyNext'
import { CaseStudyStory } from '@/components/case-study/CaseStudyStory'
import { ParallaxMediaGrid } from '@/components/case-study/ParallaxMediaGrid'
import { getAdjacentProjects, getProjectBySlug } from '@/lib/projects'
import '@/styles/case-study.css'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const { next } = project ? getAdjacentProjects(project.slug) : { next: undefined }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="case-study flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1
            className="text-3xl"
            style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
          >
            Project not found
          </h1>
          <Link to="/" className="type-body mt-4 inline-block text-[var(--cs-muted)] hover:text-[var(--cs-ink)]">
            ← Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="case-study">
      <CaseStudyHeader project={project} />
      <main>
        <CaseStudyHero project={project} />
        <CaseStudyStory project={project} />
        <ParallaxMediaGrid project={project} />
        <CaseStudyNext next={next} />
      </main>
    </div>
  )
}
