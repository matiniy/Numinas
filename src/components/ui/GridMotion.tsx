import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import './GridMotion.css'

export type GridMotionItem = string | ReactNode

type GridLayout = {
  rows: number
  cols: number
  mode: 'desktop' | 'tablet' | 'mobile'
}

interface GridMotionProps {
  items?: GridMotionItem[]
  gradientColor?: string
  className?: string
  stageClassName?: string
}

function useGridLayout(): GridLayout {
  const [layout, setLayout] = useState<GridLayout>({
    rows: 5,
    cols: 7,
    mode: 'desktop',
  })

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)')
    const mqTablet = window.matchMedia('(max-width: 1023px)')

    const sync = () => {
      if (mqMobile.matches) {
        setLayout({ rows: 3, cols: 2, mode: 'mobile' })
      } else if (mqTablet.matches) {
        setLayout({ rows: 4, cols: 4, mode: 'tablet' })
      } else {
        setLayout({ rows: 5, cols: 7, mode: 'desktop' })
      }
    }

    sync()
    mqMobile.addEventListener('change', sync)
    mqTablet.addEventListener('change', sync)
    return () => {
      mqMobile.removeEventListener('change', sync)
      mqTablet.removeEventListener('change', sync)
    }
  }, [])

  return layout
}

export function GridMotion({
  items = [],
  gradientColor = 'black',
  className,
  stageClassName,
}: GridMotionProps) {
  const layout = useGridLayout()
  const totalItems = layout.rows * layout.cols
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseXRef = useRef(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  )

  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`)
  const source = items.length > 0 ? items : defaultItems
  const combinedItems = Array.from(
    { length: totalItems },
    (_, index) => source[index % source.length],
  )

  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, layout.rows)
  }, [layout.rows])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reducedMotion || coarsePointer || layout.mode === 'mobile') return

    gsap.ticker.lagSmoothing(0)

    const handleMouseMove = (event: MouseEvent) => {
      mouseXRef.current = event.clientX
    }

    const maxMoveAmount = layout.mode === 'tablet' ? 120 : 300

    const updateMotion = () => {
      const baseDuration = 0.8
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]

      rowRefs.current.forEach((row, index) => {
        if (!row) return

        const direction = index % 2 === 0 ? 1 : -1
        const moveAmount =
          ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) *
          direction

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
      rowRefs.current.forEach((row) => {
        if (row) gsap.set(row, { clearProps: 'x' })
      })
    }
  }, [layout.mode])

  return (
    <div
      className={cn(
        'grid-motion',
        `grid-motion--${layout.mode}`,
        className,
      )}
      style={
        {
          '--gm-rows': layout.rows,
          '--gm-cols': layout.cols,
        } as CSSProperties
      }
    >
      <section
        className={cn('grid-motion__stage', stageClassName)}
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 72%)`,
        }}
      >
        <div className="grid-motion__container">
          {Array.from({ length: layout.rows }, (_, rowIndex) => (
            <div
              key={`${layout.mode}-${rowIndex}`}
              className="grid-motion__row"
              ref={(element) => {
                rowRefs.current[rowIndex] = element
              }}
            >
              {Array.from({ length: layout.cols }, (_, itemIndex) => {
                const content = combinedItems[rowIndex * layout.cols + itemIndex]

                return (
                  <div key={itemIndex} className="grid-motion__item">
                    <div className="grid-motion__item-inner">
                      {typeof content === 'string' &&
                      (content.startsWith('http') || content.startsWith('/')) ? (
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
