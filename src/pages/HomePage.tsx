import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { Pillars } from '@/components/sections/Pillars'
import { Projects } from '@/components/sections/Projects'
import { Testimonials } from '@/components/sections/Testimonials'
import { Services } from '@/components/sections/Services'
import { HowIdeas } from '@/components/sections/HowIdeas'
import { ContactMarquee } from '@/components/sections/ContactMarquee'
import { Contact } from '@/components/sections/Contact'
import { PageSeo } from '@/components/seo/PageSeo'
import { buildHomeSeo } from '@/lib/seo'

const homeSeo = buildHomeSeo()

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <PageSeo {...homeSeo} />
      <Nav revealDelayMs={5000} />
      <main>
        <Hero />
        <TrustedBy />
        <Testimonials />
        <Pillars />
        <Projects />
        <Services />
        <HowIdeas />
        <ContactMarquee />
        <Contact />
      </main>
    </div>
  )
}
