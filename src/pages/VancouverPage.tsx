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
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { buildVancouverSeo } from '@/lib/seo'
import { VANCOUVER_CTA, VANCOUVER_HERO } from '@/lib/vancouver-content'

const vancouverSeo = buildVancouverSeo()

export function VancouverPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <PageSeo {...vancouverSeo} />
      <Nav revealDelayMs={5000} />
      <main>
        <Hero
          title={VANCOUVER_HERO.title}
          body={VANCOUVER_HERO.body}
          accentWords={[...VANCOUVER_HERO.accentWords]}
        />
        <TrustedBy />
        <Testimonials />
        <Pillars />
        <Projects />
        <Services intro="Animated content that clarifies, captivates, and connects — for Vancouver brands and teams worldwide." />
        <HowIdeas />
        <ContactMarquee />
        <section
          className="wire-section"
          aria-labelledby="vancouver-cta-heading"
          style={{
            borderTop: '1px solid rgba(244, 244, 245, 0.12)',
            background:
              'radial-gradient(ellipse 80% 70% at 15% 100%, rgba(250, 96, 25, 0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 0%, rgba(238, 46, 90, 0.08), transparent 50%)',
          }}
        >
          <div className="wire-container max-w-3xl">
            <p className="type-eyebrow mb-3 text-[var(--n-mist)]">{VANCOUVER_CTA.eyebrow}</p>
            <h2 id="vancouver-cta-heading" className="type-h2 mb-4 max-w-[18ch] text-balance">
              {VANCOUVER_CTA.title}
            </h2>
            <p className="type-body mb-8 max-w-xl text-[var(--n-mist)]">{VANCOUVER_CTA.body}</p>
            <CreativeCallButton href="#contact" tone="light" plain>
              Book a creative call
            </CreativeCallButton>
          </div>
        </section>
        <Contact />
      </main>
    </div>
  )
}
