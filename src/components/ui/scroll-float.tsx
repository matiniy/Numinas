import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import './scroll-float.css'

gsap.registerPlugin(ScrollTrigger)

interface ScrollFloatProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement>
  containerClassName?: string
  textClassName?: string
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
  id?: string
}

export function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  id,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split('').map((char, index) => (
      <span className="char" key={`${char}-${index}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller =
      scrollContainerRef?.current ?? (typeof window !== 'undefined' ? window : undefined)
    const charElements = el.querySelectorAll('.char')
    if (!charElements.length) return

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%',
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
    children,
  ])

  return (
    <h2 ref={containerRef} id={id} className={cn('scroll-float', containerClassName)}>
      <span className={cn('scroll-float-text', textClassName)}>{splitText}</span>
    </h2>
  )
}
