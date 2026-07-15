import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { Pillars } from '@/components/sections/Pillars'
import { Projects } from '@/components/sections/Projects'
import { Testimonials } from '@/components/sections/Testimonials'
import { Services } from '@/components/sections/Services'
import { Contact } from '@/components/sections/Contact'

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Testimonials />
        <Pillars />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
