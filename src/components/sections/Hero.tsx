import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { GlassChip, GlassChipList } from '@/components/ui/glass-chip'
import { HERO_OFFERINGS } from '@/lib/glass-chips'
import { HeroVideo } from './HeroVideo'

export function Hero() {
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
        <GlassChipList className="mb-5 md:mb-6" aria-label="Core offerings">
          {HERO_OFFERINGS.map((item) => (
            <li key={item.label}>
              <GlassChip variant={item.variant} glass>
                {item.label}
              </GlassChip>
            </li>
          ))}
        </GlassChipList>

        <h1 className="type-display max-w-4xl text-balance">
          Crafting Scroll-Stopping Motion That{' '}
          <span className="type-display-accent">Clarifies</span> And{' '}
          <span className="type-display-accent">Converts</span>
        </h1>

        <p className="type-body mt-5 max-w-2xl text-[var(--n-mist)] md:max-w-3xl">
          We build visuals that travel across every channel, from concept and styleframes to 2D/3D
          animation, sound, and delivery kits.
        </p>
        <CreativeCallButton className="mt-8 max-w-full" />
      </div>
    </section>
  )
}
