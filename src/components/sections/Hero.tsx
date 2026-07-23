import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GlassChip, GlassChipList } from '@/components/ui/glass-chip'
import { SplitText } from '@/components/ui/split-text'
import { HERO_OFFERINGS } from '@/lib/glass-chips'
import { cn } from '@/lib/utils'
import { HeroVideo } from './HeroVideo'

/** Wheel/touch delta that must accumulate before hero copy begins loading. */
const INTRO_SCROLL_THRESHOLD = 260

export function Hero() {
  const [contentVisible, setContentVisible] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  const contentVisibleRef = useRef(false)
  const introCompleteRef = useRef(false)
  const progressRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const chipsRef = useRef<HTMLUListElement>(null)
  const extrasAnimatedRef = useRef(false)

  const getChipTargets = useCallback(() => {
    const chips = chipsRef.current
    return chips ? Array.from(chips.querySelectorAll('li')) : []
  }, [])

  const finishIntro = useCallback(() => {
    if (introCompleteRef.current) return
    introCompleteRef.current = true
    setIntroComplete(true)
  }, [])

  const showContent = useCallback(() => {
    if (contentVisibleRef.current) return
    contentVisibleRef.current = true
    setContentVisible(true)
    // Unlock page scroll once copy starts loading — don't wait out the full intro animation.
    finishIntro()
  }, [finishIntro])

  useLayoutEffect(() => {
    if (!contentVisible) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const chipItems = getChipTargets()
    if (chipItems.length) gsap.set(chipItems, { opacity: 0, y: 9 })
  }, [contentVisible, getChipTargets])

  const animateHeroExtras = useCallback(() => {
    if (extrasAnimatedRef.current) return
    extrasAnimatedRef.current = true

    const chipItems = getChipTargets()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      gsap.set(chipItems, { clearProps: 'opacity,transform' })
      return
    }

    if (chipItems.length) {
      gsap.fromTo(
        chipItems,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.04,
        },
      )
    }
  }, [getChipTargets])

  useEffect(() => {
    if (!contentVisible) return

    const timer = window.setTimeout(() => {
      animateHeroExtras()
    }, 180)

    return () => window.clearTimeout(timer)
  }, [animateHeroExtras, contentVisible])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || window.scrollY > 8) {
      progressRef.current = INTRO_SCROLL_THRESHOLD
      showContent()
      finishIntro()
      return
    }

    const applyDelta = (delta: number) => {
      if (introCompleteRef.current) return false

      if (delta > 0) {
        progressRef.current = Math.min(INTRO_SCROLL_THRESHOLD, progressRef.current + delta)
        if (progressRef.current >= INTRO_SCROLL_THRESHOLD) {
          showContent()
        }
        return true
      }

      if (!contentVisibleRef.current) {
        progressRef.current = Math.max(0, progressRef.current + delta)
        return true
      }

      return true
    }

    const onWheel = (event: WheelEvent) => {
      if (introCompleteRef.current) return
      if (window.scrollY > 0) return

      const locked = applyDelta(event.deltaY)
      if (locked) event.preventDefault()
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (introCompleteRef.current) return
      if (window.scrollY > 0) return

      const startY = touchStartYRef.current
      const currentY = event.touches[0]?.clientY
      if (startY == null || currentY == null) return

      const delta = startY - currentY
      touchStartYRef.current = currentY
      const locked = applyDelta(delta)
      if (locked) event.preventDefault()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (introCompleteRef.current) return
      if (window.scrollY > 0) return
      if (!['ArrowDown', 'PageDown', ' ', 'Spacebar', 'ArrowUp', 'PageUp'].includes(event.key)) return

      const down = ['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(event.key)
      const locked = applyDelta(down ? 140 : -140)
      if (locked) event.preventDefault()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [finishIntro, showContent])

  return (
    <section id="top" className="hero-section relative flex min-h-[100svh] flex-col">
      <HeroVideo />

      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-[var(--n-void)] via-[var(--n-void)]/50 to-transparent transition-opacity duration-700',
          contentVisible ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          'hero-section__content wire-container relative z-10 flex min-h-[100svh] min-h-[100dvh] flex-col justify-end',
          contentVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!contentVisible}
      >
        {contentVisible ? (
          <>
            <GlassChipList ref={chipsRef} className="hero-chip-list" aria-label="Core offerings">
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
              className="hero-section__title type-display max-w-4xl text-balance"
              accentWords={['Clarifies', 'Converts']}
              accentClassName="type-display-accent"
              duration={0.45}
              delay={45}
              startDelay={0}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
              playOnMount
            />

            <SplitText
              text="We build visuals that travel across every channel, from concept and styleframes to 2D/3D animation, sound, and delivery kits."
              tag="p"
              className="hero-section__body type-body max-w-2xl text-[var(--n-mist)] md:max-w-3xl"
              splitType="lines"
              duration={0.45}
              delay={60}
              startDelay={0.2}
              ease="power3.out"
              from={{ opacity: 0, y: 16 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
              playOnMount
            />
          </>
        ) : (
          <h1 className="sr-only">Crafting Scroll-Stopping Motion That Clarifies And Converts</h1>
        )}
      </div>

      <span className="sr-only" aria-live="polite">
        {introComplete
          ? 'Hero loaded. Page scrolling unlocked.'
          : contentVisible
            ? 'Loading hero content.'
            : 'Scroll down to load the hero.'}
      </span>
    </section>
  )
}
