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

type TransformState = {
  translateY: number
  scale: number
  rotation: number
  blur: number
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
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const cardOffsetsRef = useRef<number[]>([])
  const endOffsetRef = useRef(0)
  const targetTransformsRef = useRef(new Map<number, TransformState>())
  const currentTransformsRef = useRef(new Map<number, TransformState>())
  const needsRenderRef = useRef(true)
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
    onStackComplete,
  }

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('.scroll-stack-card'))
    cardsRef.current = cards
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = 'transform'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform = 'translate3d(0, 0, 0) scale(1)'
      card.style.filter = 'none'
      currentTransformsRef.current.set(i, { translateY: 0, scale: 1, rotation: 0, blur: 0 })
      targetTransformsRef.current.set(i, { translateY: 0, scale: 1, rotation: 0, blur: 0 })
    })

    const measureOffsets = () => {
      cardOffsetsRef.current = cards.map((card) =>
        useWindowScroll ? getDocumentOffsetTop(card) : card.offsetTop,
      )

      const endElement = scroller.querySelector<HTMLElement>('.scroll-stack-end')
      if (!endElement) {
        endOffsetRef.current = 0
        return
      }

      endOffsetRef.current = useWindowScroll
        ? getDocumentOffsetTop(endElement)
        : endElement.offsetTop
    }

    const getRawScrollTop = () => (useWindowScroll ? window.scrollY : scroller.scrollTop)
    const getContainerHeight = () =>
      useWindowScroll ? window.innerHeight : scroller.clientHeight

    const computeAndApply = (scrollTop: number) => {
      const {
        itemScale: scaleStep,
        itemStackDistance: stackGap,
        stackPosition: stackPos,
        scaleEndPosition: scaleEndPos,
        baseScale: minScale,
        rotationAmount: rotAmount,
        blurAmount: blurStep,
        onStackComplete: complete,
      } = configRef.current

      const containerHeight = getContainerHeight()
      const stackPositionPx = parsePercentage(stackPos, containerHeight)
      const scaleEndPositionPx = parsePercentage(scaleEndPos, containerHeight)
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

        // Constant stack gap keeps up/down motion symmetrical (progress-linked gap jumps on scroll-up).
        const stackOffset = softStackGap * i

        let translateY = 0
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx + stackOffset
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + stackOffset
        }

        // Apply immediately — matching down-scroll feel in both directions.
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

    const tick = () => {
      computeAndApply(getRawScrollTop())
      needsRenderRef.current = false
      animationFrameRef.current = null
    }

    const requestTick = () => {
      if (animationFrameRef.current != null) return
      animationFrameRef.current = requestAnimationFrame(tick)
    }

    measureOffsets()
    computeAndApply(getRawScrollTop())

    if (useWindowScroll) {
      const onScroll = () => requestTick()
      const onResize = () => {
        measureOffsets()
        requestTick()
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      requestTick()

      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        stackCompletedRef.current = false
        cardsRef.current = []
        targetTransformsRef.current.clear()
        currentTransformsRef.current.clear()
      }
    }

    if (reducedMotion) {
      requestTick()
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        stackCompletedRef.current = false
        cardsRef.current = []
        targetTransformsRef.current.clear()
        currentTransformsRef.current.clear()
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
      targetTransformsRef.current.clear()
      currentTransformsRef.current.clear()
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
