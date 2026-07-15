import { BRAND_LOGO } from '@/lib/brand-logo'
import { CONTACT_MARQUEE_ITEMS, CONTACT_MARQUEE_LABEL } from '@/lib/contact-marquee'

const REPEAT_COUNT = 3

function MarqueeLogoSeparator() {
  return (
    <span className="contact-marquee__logo" aria-hidden="true">
      <img src={BRAND_LOGO.mark} alt="" loading="lazy" decoding="async" />
    </span>
  )
}

function MarqueePhraseSet() {
  return (
    <>
      {CONTACT_MARQUEE_ITEMS.map((item, index) => (
        <span key={item} className="contact-marquee__segment">
          <span className="contact-marquee__text">{item}</span>
          {index < CONTACT_MARQUEE_ITEMS.length - 1 ? <MarqueeLogoSeparator /> : null}
        </span>
      ))}
    </>
  )
}

function MarqueeGroup({ copy }: { copy: number }) {
  return (
    <div className="contact-marquee__group" aria-hidden={copy === 1 ? true : undefined}>
      {Array.from({ length: REPEAT_COUNT }).map((_, index) => (
        <span key={index} className="contact-marquee__set">
          <MarqueePhraseSet />
          <MarqueeLogoSeparator />
        </span>
      ))}
    </div>
  )
}

export function ContactMarquee() {
  return (
    <section className="contact-marquee-section" aria-label={CONTACT_MARQUEE_LABEL}>
      <div className="contact-marquee">
        <div className="contact-marquee__viewport">
          <div className="contact-marquee__track">
            <MarqueeGroup copy={0} />
            <MarqueeGroup copy={1} />
          </div>
        </div>
      </div>
    </section>
  )
}
