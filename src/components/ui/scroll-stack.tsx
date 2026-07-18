import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import './scroll-stack.css'

type ScrollStackItemProps = {
  children: ReactNode
  itemClassName?: string
}

export function ScrollStackItem({ children, itemClassName = '' }: ScrollStackItemProps) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
}

export type ScrollStackProps = {
  children: ReactNode
  className?: string
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  /** One mouse-wheel notch / gesture step moves to the next or previous card. */
  snapOnWheel?: boolean
  onStackComplete?: () => void
}

function parsePercentage(value: string | number, containerHeight: number) {
  if (typeof value === 'string' && value.includes('%')) {
    return (parseFloat(value) / 100) * containerHeight
  }
  return typeof value === 'number' ? value : parseFloat(value)
}

function calculateProgress(scrollTop: number, start: number, end: number) {
  if (end <= start) return scrollTop >= end ? 1 : 0
  if (scrollTop < start) return 0
  if (scrollTop > end) return 1
  return (scrollTop - start) / (end - start)
}

function smootherstep(t: number) {
  const x = Math.min(1, Math.max(0, t))
  return x * x * x * (x * (x * 6 - 15) + 10)
}

/** Layout offset in document coords — ignores CSS transforms (critical for smooth pinning). */
function getDocumentOffsetTop(element: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = element
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

function nearestIndex(value: number, points: number[]) {
  let best = 0
  let bestDist = Infinity
  for (let i = 0; i < points.length; i++) {
    const dist = Math.abs(points[i] - value)
    if (dist < bestDist) {
      bestDist = dist
      best = i
    }
  }
  return best
}

export function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  snapOnWheel = false,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const cardOffsetsRef = useRef<number[]>([])
  const endOffsetRef = useRef(0)
  const configRef = useRef({
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    snapOnWheel,
    onStackComplete,
  })

  configRef.current = {
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    snapOnWheel,
    onStackComplete,
  }

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('.scroll-stack-card'))
    cardsRef.current = cards
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointerQuery = window.matchMedia('(pointer: coarse), (hover: none)')
    const mobileWidthQuery = window.matchMedia('(max-width: 767px)')

    const isTouchLayout = () => coarsePointerQuery.matches || mobileWidthQuery.matches

    const getResponsiveDistance = () => (isTouchLayout() ? Math.min(itemDistance, 120) : itemDistance)

    const getResponsiveStackPosition = () => {
      const { stackPosition: stackPos } = configRef.current
      if (!isTouchLayout()) return stackPos
      // Keep cards clearer of the mobile top chrome.
      return '28%'
    }

    const applyCardSpacing = () => {
      const gap = getResponsiveDistance()
      cards.forEach((card, i) => {
        card.style.marginBottom = i < cards.length - 1 ? `${gap}px` : '0px'
      })
    }

    cards.forEach((card) => {
      card.style.willChange = 'transform'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform = 'translate3d(0, 0, 0) scale(1)'
      card.style.filter = 'none'
    })
    applyCardSpacing()

    const measureOffsets = () => {
      applyCardSpacing()
      cardOffsetsRef.current = cards.map((card) =>
        useWindowScroll ? getDocumentOffsetTop(card) : card.offsetTop,
      )

      const endElement = scroller.querySelector<HTMLElement>('.scroll-stack-end')
      endOffsetRef.current = endElement
        ? useWindowScroll
          ? getDocumentOffsetTop(endElement)
          : endElement.offsetTop
        : 0
    }

    const getRawScrollTop = () => (useWindowScroll ? window.scrollY : scroller.scrollTop)
    const getContainerHeight = () =>
      useWindowScroll ? window.innerHeight : scroller.clientHeight

    const getSnapPoints = () => {
      const { itemStackDistance: stackGap } = configRef.current
      const stackPositionPx = parsePercentage(getResponsiveStackPosition(), getContainerHeight())
      const softStackGap = stackGap * 0.55
      return cardOffsetsRef.current.map(
        (cardTop, i) => cardTop - stackPositionPx - softStackGap * i,
      )
    }

    const computeAndApply = (scrollTop: number) => {
      const {
        itemScale: scaleStep,
        itemStackDistance: stackGap,
        scaleEndPosition: scaleEndPos,
        baseScale: minScale,
        rotationAmount: rotAmount,
        blurAmount: blurStep,
        onStackComplete: complete,
      } = configRef.current

      const containerHeight = getContainerHeight()
      const stackPositionPx = parsePercentage(getResponsiveStackPosition(), containerHeight)
      const scaleEndPositionPx = parsePercentage(
        isTouchLayout() ? '18%' : scaleEndPos,
        containerHeight,
      )
      const endElementTop = endOffsetRef.current
      const softStackGap = stackGap * 0.55

      let topCardIndex = 0
      cards.forEach((_, i) => {
        const cardTop = cardOffsetsRef.current[i] ?? 0
        const triggerStart = cardTop - stackPositionPx - softStackGap * i
        if (scrollTop >= triggerStart) topCardIndex = i
      })

      cards.forEach((card, i) => {
        const cardTop = cardOffsetsRef.current[i] ?? 0
        const triggerStart = cardTop - stackPositionPx - softStackGap * i
        const triggerEnd = cardTop - scaleEndPositionPx
        const pinStart = triggerStart
        const pinEnd = endElementTop - containerHeight / 2

        const scaleProgress = smootherstep(calculateProgress(scrollTop, triggerStart, triggerEnd))
        const targetScale = minScale + i * scaleStep
        const scale = 1 - scaleProgress * (1 - targetScale)
        const rotation = rotAmount ? i * rotAmount * scaleProgress : 0

        let blur = 0
        if (blurStep && i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurStep)
        }

        const stackOffset = softStackGap * i
        let translateY = 0
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx + stackOffset
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + stackOffset
        }

        card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`
        card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'

        if (i === cards.length - 1) {
          const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
          if (isInView && !stackCompletedRef.current) {
            stackCompletedRef.current = true
            complete?.()
          } else if (!isInView && stackCompletedRef.current) {
            stackCompletedRef.current = false
          }
        }
      })
    }

    const requestTick = () => {
      if (animationFrameRef.current != null) return
      animationFrameRef.current = requestAnimationFrame(() => {
        animationFrameRef.current = null
        computeAndApply(getRawScrollTop())
      })
    }

    measureOffsets()
    computeAndApply(getRawScrollTop())

    if (useWindowScroll) {
      let snapLocked = false
      let wheelAccum = 0
      let snapRaf: number | null = null

      const isInSnapZone = () => {
        const snaps = getSnapPoints()
        if (!snaps.length) return false
        const y = getRawScrollTop()
        const pad = getContainerHeight() * 0.2
        return y >= snaps[0] - pad && y <= snaps[snaps.length - 1] + pad
      }

      const animateScrollTo = (targetY: number, onDone: () => void) => {
        if (snapRaf != null) {
          cancelAnimationFrame(snapRaf)
          snapRaf = null
        }

        const startY = getRawScrollTop()
        const distance = targetY - startY
        if (Math.abs(distance) < 1 || reducedMotion) {
          window.scrollTo(0, targetY)
          computeAndApply(targetY)
          onDone()
          return
        }

        const duration = 280
        const startTime = performance.now()

        const step = (now: number) => {
          const t = Math.min(1, (now - startTime) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          const y = startY + distance * eased
          window.scrollTo(0, y)
          computeAndApply(y)
          if (t < 1) {
            snapRaf = requestAnimationFrame(step)
          } else {
            snapRaf = null
            window.scrollTo(0, targetY)
            computeAndApply(targetY)
            onDone()
          }
        }

        snapRaf = requestAnimationFrame(step)
      }

      const snapBy = (direction: 1 | -1) => {
        const snaps = getSnapPoints()
        if (!snaps.length || snapLocked) return false

        const current = nearestIndex(getRawScrollTop(), snaps)
        const next = current + direction
        if (next < 0 || next >= snaps.length) return false

        snapLocked = true
        wheelAccum = 0
        animateScrollTo(snaps[next], () => {
          snapLocked = false
        })
        return true
      }

      const onScroll = () => {
        if (!snapLocked) requestTick()
      }

      const onWheel = (event: WheelEvent) => {
        // Touch / phone layouts keep native free scrolling — no wheel hijack.
        if (
          !configRef.current.snapOnWheel ||
          isTouchLayout() ||
          !isInSnapZone()
        ) {
          wheelAccum = 0
          return
        }

        if (snapLocked) {
          event.preventDefault()
          return
        }

        wheelAccum += event.deltaY
        const threshold = 40
        if (Math.abs(wheelAccum) < threshold) {
          event.preventDefault()
          return
        }

        const direction: 1 | -1 = wheelAccum > 0 ? 1 : -1
        const didSnap = snapBy(direction)
        if (didSnap) {
          event.preventDefault()
        } else {
          wheelAccum = 0
        }
      }

      const onResize = () => {
        measureOffsets()
        requestTick()
      }

      const onMediaChange = () => {
        measureOffsets()
        requestTick()
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('resize', onResize)
      coarsePointerQuery.addEventListener('change', onMediaChange)
      mobileWidthQuery.addEventListener('change', onMediaChange)
      requestTick()

      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('resize', onResize)
        coarsePointerQuery.removeEventListener('change', onMediaChange)
        mobileWidthQuery.removeEventListener('change', onMediaChange)
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        if (snapRaf != null) cancelAnimationFrame(snapRaf)
        stackCompletedRef.current = false
        cardsRef.current = []
      }
    }

    if (reducedMotion) {
      requestTick()
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        stackCompletedRef.current = false
        cardsRef.current = []
      }
    }

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 0.95,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    })

    lenis.on('scroll', requestTick)
    lenisRef.current = lenis

    let lenisFrame: number | null = null
    const lenisRaf = (time: number) => {
      lenis.raf(time)
      lenisFrame = requestAnimationFrame(lenisRaf)
    }
    lenisFrame = requestAnimationFrame(lenisRaf)
    requestTick()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (lenisFrame) cancelAnimationFrame(lenisFrame)
      lenisRef.current?.destroy()
      lenisRef.current = null
      stackCompletedRef.current = false
      cardsRef.current = []
    }
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    snapOnWheel,
    onStackComplete,
  ])

  const scrollerStyle: CSSProperties | undefined = useWindowScroll
    ? { height: 'auto', overflow: 'visible' }
    : undefined

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-scroller--window' : ''} ${className}`.trim()}
      ref={scrollerRef}
      style={scrollerStyle}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}

export default ScrollStack
