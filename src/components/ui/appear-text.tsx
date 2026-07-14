import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

function splitWords(text: string) {
  return text.split(/(\s+)/).filter((part) => part.length > 0)
}

interface AppearTextProps {
  text: string
  className?: string
  as?: 'span' | 'p'
}

export function AppearText({ text, className, as: Tag = 'span' }: AppearTextProps) {
  const rootRef = useRef<HTMLSpanElement | HTMLParagraphElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const words = root.querySelectorAll<HTMLElement>('[data-appear-word]')
    if (!words.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      gsap.set(words, { y: 0, opacity: 1 })
      return
    }

    gsap.set(words, { y: '110%', opacity: 0 })
    const tween = gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.04,
    })

    return () => {
      tween.kill()
    }
  }, [text])

  const parts = splitWords(text)

  return (
    <Tag ref={rootRef as never} className={cn('appear-text', className)}>
      {parts.map((part, index) =>
        /^\s+$/.test(part) ? (
          <span key={`space-${index}`}>{part}</span>
        ) : (
          <span key={`${part}-${index}`} className="appear-text__mask">
            <span data-appear-word className="appear-text__word">
              {part}
            </span>
          </span>
        ),
      )}
    </Tag>
  )
}
