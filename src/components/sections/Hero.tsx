import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { GlassChip, GlassChipList } from '@/components/ui/glass-chip'
import { SplitText } from '@/components/ui/split-text'
import { HERO_OFFERINGS } from '@/lib/glass-chips'
import { HeroVideo } from './HeroVideo'

export function Hero() {
  const chipsRef = useRef<HTMLUListElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const extrasAnimatedRef = useRef(false)

  const getChipTargets = useCallback(() => {
    const chips = chipsRef.current
    return chips ? Array.from(chips.querySelectorAll('li')) : []
  }, [])

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const chipItems = getChipTargets()
    const cta = ctaRef.current

    if (chipItems.length) gsap.set(chipItems, { opacity: 0, y: 9 })
    if (cta) gsap.set(cta, { opacity: 0, y: 4 })
  }, [getChipTargets])

  const animateHeroExtras = useCallback(() => {
    if (extrasAnimatedRef.current) return
    extrasAnimatedRef.current = true

    const chipItems = getChipTargets()
    const cta = ctaRef.current

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      gsap.set([...chipItems, cta].filter(Boolean), { clearProps: 'opacity,transform' })
      return
    }

    const timeline = gsap.timeline({ delay: 0.12 })

    if (chipItems.length) {
      timeline.fromTo(
        chipItems,
        { opacity: 0, y: 9 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
        },
      )
    }

    if (cta) {
      timeline.fromTo(
        cta,
        { opacity: 0, y: 4 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        chipItems.length ? '+=0.25' : 0,
      )
    }
  }, [getChipTargets])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      animateHeroExtras()
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [animateHeroExtras])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col"
    >
      <HeroVideo />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--n-void)] via-[var(--n-void)]/50 to-transparent"
        aria-hidden="true"
      />

      <div className="wire-container relative z-10 flex min-h-[100svh] flex-col justify-end pb-12 pt-20 sm:pb-16 sm:pt-24 md:pb-20 md:pt-28 lg:pb-24">
        <GlassChipList ref={chipsRef} className="mb-5 md:mb-6" aria-label="Core offerings">
          {HERO_OFFERINGS.map((item) => (
            <li key={item.label} className="hero-extra hero-extra--chip">
              <GlassChip variant={item.variant} glass>
                {item.label}
              </GlassChip>
            </li>
          ))}
        </GlassChipList>

        <SplitText
          text="Crafting Scroll-Stopping Motion That Clarifies And Converts"
          tag="h1"
          className="type-display max-w-4xl text-balance"
          accentWords={['Clarifies', 'Converts']}
          accentClassName="type-display-accent"
          duration={0.7}
          delay={80}
          startDelay={0.7}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="left"
          playOnMount
          onLetterAnimationComplete={animateHeroExtras}
        />

        <SplitText
          text="We build visuals that travel across every channel, from concept and styleframes to 2D/3D animation, sound, and delivery kits."
          tag="p"
          className="type-body mt-5 max-w-2xl text-[var(--n-mist)] md:max-w-3xl"
          splitType="lines"
          duration={0.7}
          delay={120}
          startDelay={1.45}
          ease="power3.out"
          from={{ opacity: 0, y: 28 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="left"
          playOnMount
        />

        <div ref={ctaRef} className="hero-extra hero-extra--cta mt-8 max-w-full">
          <CreativeCallButton className="max-w-full" />
        </div>
      </div>
    </section>
  )
}
