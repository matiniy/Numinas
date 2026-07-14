import { type ReactNode, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import './GridMotion.css'

const TOTAL_ITEMS = 35
const ROW_COUNT = 5
const COL_COUNT = 7

export type GridMotionItem = string | ReactNode

interface GridMotionProps {
  items?: GridMotionItem[]
  gradientColor?: string
  className?: string
  stageClassName?: string
}

export function GridMotion({
  items = [],
  gradientColor = 'black',
  className,
  stageClassName,
}: GridMotionProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseXRef = useRef(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  )

  const defaultItems = Array.from({ length: TOTAL_ITEMS }, (_, index) => `Item ${index + 1}`)
  const source = items.length > 0 ? items : defaultItems
  const combinedItems = Array.from({ length: TOTAL_ITEMS }, (_, index) => source[index % source.length])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    gsap.ticker.lagSmoothing(0)

    const handleMouseMove = (event: MouseEvent) => {
      mouseXRef.current = event.clientX
    }

    const updateMotion = () => {
      const maxMoveAmount = 300
      const baseDuration = 0.8
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]

      rowRefs.current.forEach((row, index) => {
        if (!row) return

        const direction = index % 2 === 0 ? 1 : -1
        const moveAmount =
          ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction

        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    }

    gsap.ticker.add(updateMotion)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(updateMotion)
    }
  }, [])

  return (
    <div className={cn('grid-motion', className)}>
      <section
        className={cn('grid-motion__stage', stageClassName)}
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 72%)`,
        }}
      >
        <div className="grid-motion__container">
          {Array.from({ length: ROW_COUNT }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid-motion__row"
              ref={(element) => {
                rowRefs.current[rowIndex] = element
              }}
            >
              {Array.from({ length: COL_COUNT }, (_, itemIndex) => {
                const content = combinedItems[rowIndex * COL_COUNT + itemIndex]

                return (
                  <div key={itemIndex} className="grid-motion__item">
                    <div className="grid-motion__item-inner">
                      {typeof content === 'string' && content.startsWith('http') ? (
                        <div
                          className="grid-motion__item-img"
                          style={{ backgroundImage: `url(${content})` }}
                          role="img"
                          aria-hidden="true"
                        />
                      ) : (
                        <div className="grid-motion__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="grid-motion__overlay" aria-hidden="true" />
      </section>
    </div>
  )
}
