import { useEffect, useRef, useState, type MouseEvent } from 'react'
import gsap from 'gsap'
import './flowing-menu.css'

export interface FlowingMenuItem {
  text: string
  subtext: string
  image?: string
  index?: string
}

interface FlowingMenuProps {
  items?: FlowingMenuItem[]
  speed?: number
  textColor?: string
  bgColor?: string
  marqueeBgColor?: string
  marqueeTextColor?: string
  borderColor?: string
}

const animationDefaults = { duration: 0.6, ease: 'expo' }

function distMetric(x: number, y: number, x2: number, y2: number) {
  const xDiff = x - x2
  const yDiff = y - y2
  return xDiff * xDiff + yDiff * yDiff
}

function findClosestEdge(mouseX: number, mouseY: number, width: number, height: number) {
  const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0)
  const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height)
  return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
}

interface MenuItemProps extends FlowingMenuItem {
  speed: number
  textColor: string
  marqueeBgColor: string
  marqueeTextColor: string
  borderColor: string
  isOpen: boolean
  onToggle: () => void
  reducedMotion: boolean
}

function MenuItem({
  text,
  subtext,
  image,
  index,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isOpen,
  onToggle,
  reducedMotion,
}: MenuItemProps) {
  const itemRef = useRef<HTMLLIElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const [repetitions, setRepetitions] = useState(4)
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return
      const marqueeContent = marqueeInnerRef.current.querySelector('.flowing-menu__marquee-part')
      if (!marqueeContent) return

      const contentWidth = marqueeContent.getBoundingClientRect().width
      const viewportWidth = window.innerWidth
      const needed = Math.ceil(viewportWidth / contentWidth) + 2
      setRepetitions(Math.max(4, needed))
    }

    calculateRepetitions()
    window.addEventListener('resize', calculateRepetitions)
    return () => window.removeEventListener('resize', calculateRepetitions)
  }, [subtext, image])

  useEffect(() => {
    if (reducedMotion) return

    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return
      const marqueeContent = marqueeInnerRef.current.querySelector('.flowing-menu__marquee-part')
      if (!marqueeContent) return

      const contentWidth = marqueeContent.getBoundingClientRect().width
      if (contentWidth === 0) return

      animationRef.current?.kill()
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      })
    }

    const timer = window.setTimeout(setupMarquee, 50)
    return () => {
      window.clearTimeout(timer)
      animationRef.current?.kill()
    }
  }, [subtext, image, repetitions, speed, reducedMotion])

  const openMarquee = (edge: 'top' | 'bottom') => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return
    if (reducedMotion) return

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
  }

  const closeMarquee = (edge: 'top' | 'bottom') => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return
    if (reducedMotion) return

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  useEffect(() => {
    if (canHover) return
    if (isOpen) openMarquee('bottom')
    else closeMarquee('bottom')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, canHover, reducedMotion])

  const handlePointerEnter = (ev: MouseEvent<HTMLButtonElement>) => {
    if (!canHover || !itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    )
    openMarquee(edge)
  }

  const handlePointerLeave = (ev: MouseEvent<HTMLButtonElement>) => {
    if (!canHover || !itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    )
    closeMarquee(edge)
  }

  return (
    <li
      ref={itemRef}
      className={`flowing-menu__item${isOpen ? ' flowing-menu__item--open' : ''}`}
      style={{ borderColor }}
    >
      <button
        type="button"
        className="flowing-menu__item-link"
        style={{ color: textColor }}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        onClick={canHover ? undefined : onToggle}
        aria-expanded={isOpen}
      >
        {index ? <span className="flowing-menu__item-index">{index}</span> : null}
        {text}
      </button>
      <div
        ref={marqueeRef}
        className="flowing-menu__marquee"
        style={{
          backgroundColor: marqueeBgColor,
          ...(reducedMotion && isOpen ? { transform: 'translate3d(0, 0, 0)' } : {}),
        }}
      >
        <div className="flowing-menu__marquee-inner-wrap">
          <div ref={marqueeInnerRef} className="flowing-menu__marquee-inner" aria-hidden="true">
            {Array.from({ length: repetitions }).map((_, idx) => (
              <div
                key={idx}
                className="flowing-menu__marquee-part"
                style={{ color: marqueeTextColor }}
              >
                <span className="flowing-menu__marquee-text">{subtext}</span>
                <div
                  className="flowing-menu__marquee-img"
                  style={image ? { backgroundImage: `url(${image})` } : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}

export function FlowingMenu({
  items = [],
  speed = 18,
  textColor = 'var(--n-paper)',
  bgColor = 'var(--n-void)',
  marqueeBgColor = 'var(--n-paper)',
  marqueeTextColor = 'var(--n-void)',
  borderColor = 'var(--n-fog)',
}: FlowingMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className="flowing-menu-wrap" style={{ backgroundColor: bgColor }}>
      <ul className="flowing-menu">
        {items.map((item, idx) => (
          <MenuItem
            key={item.text}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex((current) => (current === idx ? null : idx))}
            reducedMotion={reducedMotion}
          />
        ))}
      </ul>
    </div>
  )
}
