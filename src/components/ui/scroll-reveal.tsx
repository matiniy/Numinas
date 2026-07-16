import { useMemo, useRef, type ElementType, type ReactNode, type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import './scroll-reveal.css'

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealTag = 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span'

interface ScrollRevealProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement | null>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
  as?: ScrollRevealTag
  id?: string
}

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  as: Tag = 'h2',
  id,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word
      return (
        <span className="word" key={`${word}-${index}`}>
          {word}
        </span>
      )
    })
  }, [children])

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      const scroller = scrollContainerRef?.current ?? window
      const wordElements = el.querySelectorAll<HTMLElement>('.word')
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reducedMotion) {
        gsap.set(el, { rotate: 0 })
        if (wordElements.length) {
          gsap.set(wordElements, { opacity: 1, filter: 'blur(0px)' })
        }
        return
      }

      const tweens: gsap.core.Tween[] = []

      tweens.push(
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom',
              end: rotationEnd,
              scrub: true,
            },
          },
        ),
      )

      if (wordElements.length) {
        tweens.push(
          gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: 'opacity' },
            {
              ease: 'none',
              opacity: 1,
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top bottom-=20%',
                end: wordAnimationEnd,
                scrub: true,
              },
            },
          ),
        )

        if (enableBlur) {
          tweens.push(
            gsap.fromTo(
              wordElements,
              { filter: `blur(${blurStrength}px)` },
              {
                ease: 'none',
                filter: 'blur(0px)',
                stagger: 0.05,
                scrollTrigger: {
                  trigger: el,
                  scroller,
                  start: 'top bottom-=20%',
                  end: wordAnimationEnd,
                  scrub: true,
                },
              },
            ),
          )
        }
      }

      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill()
          tween.kill()
        })
      }
    },
    {
      dependencies: [
        scrollContainerRef,
        enableBlur,
        baseRotation,
        baseOpacity,
        rotationEnd,
        wordAnimationEnd,
        blurStrength,
        children,
      ],
    },
  )

  const Component = Tag as ElementType

  return (
    <Component ref={containerRef} id={id} className={cn('scroll-reveal', containerClassName)}>
      <span className={cn('scroll-reveal-text', textClassName)}>{splitText}</span>
    </Component>
  )
}

export default ScrollReveal
