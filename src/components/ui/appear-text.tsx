import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

function splitWords(text: string) {
  return text.split(/(\s+)/).filter((part) => part.length > 0)
}

function splitChars(text: string) {
  return Array.from(text)
}

interface AppearTextProps {
  text: string
  className?: string
  as?: 'span' | 'p'
  /** Wait until the text enters the viewport before animating once. */
  onView?: boolean
  /** Tie progress to scroll so the animation reverses when scrolling up/down. */
  scrub?: boolean
  scrubStart?: string
  scrubEnd?: string
  /**
   * When false, units rise from below the line without a clipping mask
   * (full glyphs stay visible the whole time).
   */
  clip?: boolean
  /** Animate by words (default) or individual characters. */
  by?: 'words' | 'chars'
  stagger?: number
}

export function AppearText({
  text,
  className,
  as: Tag = 'span',
  onView = false,
  scrub = false,
  scrubStart = 'top bottom-=15%',
  scrubEnd = 'top 45%',
  clip = true,
  by = 'words',
  stagger = 0.04,
}: AppearTextProps) {
  const rootRef = useRef<HTMLSpanElement | HTMLParagraphElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const units = root.querySelectorAll<HTMLElement>('[data-appear-word]')
    if (!units.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      gsap.set(units, { y: 0, opacity: 1 })
      return
    }

    const fromY = clip ? '110%' : '0.75em'
    const scrubStagger = by === 'chars' ? Math.max(stagger, 0.03) : Math.max(stagger, 0.05)

    gsap.set(units, { y: fromY, opacity: 0 })

    let tween: gsap.core.Tween | null = null
    let observer: IntersectionObserver | null = null

    const play = () => {
      tween = gsap.to(units, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
        stagger,
      })
    }

    if (scrub) {
      tween = gsap.fromTo(
        units,
        { y: fromY, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          stagger: scrubStagger,
          scrollTrigger: {
            trigger: root,
            start: scrubStart,
            end: scrubEnd,
            scrub: true,
          },
        },
      )
    } else if (!onView) {
      play()
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          observer?.disconnect()
          observer = null
          play()
        },
        { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
      )
      observer.observe(root)
    }

    return () => {
      observer?.disconnect()
      tween?.scrollTrigger?.kill()
      tween?.kill()
    }
  }, [text, onView, scrub, scrubStart, scrubEnd, clip, by, stagger])

  const parts = by === 'chars' ? splitChars(text) : splitWords(text)

  return (
    <Tag ref={rootRef as never} className={cn('appear-text', by === 'chars' && 'appear-text--chars', className)}>
      {parts.map((part, index) => {
        if (by === 'words' && /^\s+$/.test(part)) {
          return <span key={`space-${index}`}>{part}</span>
        }

        if (by === 'chars' && part === ' ') {
          return <span key={`space-${index}`} className="appear-text__space"> </span>
        }

        return (
          <span
            key={`${part}-${index}`}
            className={cn('appear-text__mask', !clip && 'appear-text__mask--open')}
          >
            <span data-appear-word className="appear-text__word">
              {part === ' ' ? '\u00A0' : part}
            </span>
          </span>
        )
      })}
    </Tag>
  )
}
