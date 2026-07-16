import { useEffect, useRef, useState, type CSSProperties, type ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'
import './split-text.css'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

const splitInstances = new WeakMap<HTMLElement, GSAPSplitText>()

type SplitTextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  startDelay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: CSSProperties['textAlign']
  tag?: SplitTextTag
  playOnMount?: boolean
  accentWords?: string[]
  accentClassName?: string
  onLetterAnimationComplete?: () => void
}

export function SplitText({
  text,
  className = '',
  delay = 50,
  startDelay = 0,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  playOnMount = false,
  accentWords = [],
  accentClassName = '',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const animationCompletedRef = useRef(false)
  const onCompleteRef = useRef(onLetterAnimationComplete)
  const [fontsLoaded, setFontsLoaded] = useState(
    () => typeof document !== 'undefined' && document.fonts.status === 'loaded',
  )

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete
  }, [onLetterAnimationComplete])

  useEffect(() => {
    if (fontsLoaded) return

    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true)
      return
    }

    document.fonts.ready.then(() => {
      setFontsLoaded(true)
    })
  }, [fontsLoaded])

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !text || !fontsLoaded || animationCompletedRef.current) return

      const existing = splitInstances.get(el)
      if (existing) {
        try {
          existing.revert()
        } catch {
          /* noop */
        }
        splitInstances.delete(el)
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) {
        animationCompletedRef.current = true
        onCompleteRef.current?.()
        return
      }

      const startPct = (1 - threshold) * 100
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px'
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`
      const start = `top ${startPct}%${sign}`

      let targets: Element[] = []

      const assignTargets = (self: GSAPSplitText) => {
        if (splitType === 'lines' && self.lines.length) {
          targets = self.lines
          return
        }

        if (splitType.includes('chars') && self.chars.length) targets = self.chars
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines
        if (!targets.length) targets = self.chars || self.words || self.lines
      }

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self) => {
          assignTargets(self)

          if (accentWords.length && accentClassName) {
            self.words.forEach((word) => {
              const label = word.textContent?.trim()
              if (label && accentWords.includes(label)) {
                word.classList.add(accentClassName)
              }
            })
          }

          tweenRef.current?.kill()
          tweenRef.current = null

          const tweenVars: gsap.TweenVars = {
            ...to,
            duration,
            ease,
            delay: startDelay,
            stagger: delay / 1000,
            onComplete: () => {
              animationCompletedRef.current = true
              onCompleteRef.current?.()
            },
            willChange: 'transform, opacity',
            force3D: true,
          }

          if (!playOnMount) {
            tweenVars.scrollTrigger = {
              trigger: el,
              start,
              once: true,
              fastScrollEnd: true,
              anticipatePin: 0.4,
            }
          }

          tweenRef.current = gsap.fromTo(targets, { ...from }, tweenVars)
          return tweenRef.current
        },
      })

      splitInstances.set(el, splitInstance)

      return () => {
        tweenRef.current?.kill()
        tweenRef.current = null
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill()
        })
        try {
          splitInstance.revert()
        } catch {
          /* noop */
        }
        splitInstances.delete(el)
      }
    },
    {
      dependencies: [
        text,
        delay,
        startDelay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        playOnMount,
        fontsLoaded,
        accentWords.join('|'),
        accentClassName,
      ],
      scope: ref,
    },
  )

  const Tag = tag as ElementType
  const style: CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: tag === 'span' ? 'inline-block' : 'block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
  }

  return (
    <Tag ref={ref} style={style} className={cn('split-parent', splitType === 'lines' && 'split-parent--lines', className)}>
      {text}
    </Tag>
  )
}
