import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { HeroVideo } from './HeroVideo'

const offerings = ['Launch Films', 'Motion Brand Systems', 'Social Loops']

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end"
    >
      <HeroVideo />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--n-void)] via-[var(--n-void)]/50 to-transparent"
        aria-hidden="true"
      />

      <div className="wire-container relative z-10 pb-16 pt-24 md:pb-20 lg:pb-24">
        <h1 className="type-display max-w-4xl">
          Crafting Scroll-Stopping Motion That{' '}
          <span className="type-display-accent">Clarifies</span> And{' '}
          <span className="type-display-accent">Converts</span>
        </h1>

        <p className="type-body mt-5 max-w-2xl text-[var(--n-mist)] md:max-w-3xl">
          We build visuals that travel across every channel, from concept and styleframes to 2D/3D
          animation, sound, and delivery kits.
        </p>
        <ul className="wire-chip-list" aria-label="Core offerings">
          {offerings.map((item) => (
            <li key={item}>
              <span className="wire-chip">{item}</span>
            </li>
          ))}
        </ul>
        <CreativeCallButton className="mt-8" />
      </div>
    </section>
  )
}
