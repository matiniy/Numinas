import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import './OptionWheel.css'

const DEFAULT_ITEMS = [
  'Ambient',
  'House',
  'Techno',
  'Jazz',
  'Lo-Fi',
  'Synthwave',
  'Trance',
  'Funk',
  'Disco',
  'Hip-Hop',
  'Chillwave',
  'Drum & Bass',
]

type WheelConfig = {
  count: number
  items: string[]
  rowH: number
  curve: number
  tilt: number
  blur: number
  fade: number
  minOpacity: number
  side: 'left' | 'right' | 'top' | 'bottom'
  orientation: 'vertical' | 'horizontal'
  labelRotate: number
  itemAlign: 'center' | 'inner'
  loop: boolean
  smoothing: number
  draggable: boolean
  soundUrl: string
  soundVolume: number
}

export interface OptionWheelProps {
  items?: string[]
  defaultSelected?: number
  value?: number
  onChange?: (index: number, item: string) => void
  textColor?: string
  activeColor?: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  orientation?: 'vertical' | 'horizontal'
  labelRotate?: number
  itemAlign?: 'center' | 'inner'
  fontSize?: number
  spacing?: number
  curve?: number
  tilt?: number
  blur?: number
  fade?: number
  minOpacity?: number
  smoothing?: number
  inset?: number
  loop?: boolean
  draggable?: boolean
  soundUrl?: string
  soundVolume?: number
  className?: string
}

export function OptionWheel({
  items = DEFAULT_ITEMS,
  defaultSelected = 3,
  value,
  onChange,
  textColor = '#a6a6a6',
  activeColor = '#ffffff',
  side = 'left',
  orientation = 'vertical',
  labelRotate = 0,
  itemAlign = 'center',
  fontSize = 3,
  spacing = 1.4,
  curve = 1,
  tilt = 6,
  blur = 2,
  fade = 0.25,
  minOpacity = 0.05,
  smoothing = 200,
  inset = 80,
  loop = false,
  draggable = true,
  soundUrl = '',
  soundVolume = 0.5,
  className,
}: OptionWheelProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const posRef = useRef(defaultSelected)
  const targetRef = useRef(defaultSelected)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef(0)
  const cfgRef = useRef<WheelConfig>({} as WheelConfig)
  const onChangeRef = useRef(onChange)
  const selectedRef = useRef(defaultSelected)
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragRef = useRef<{ x: number; y: number; start: number; id: number } | null>(null)
  const dragMovedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioUrlRef = useRef('')
  const lastTickRef = useRef(0)
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected)
  const [isDragging, setIsDragging] = useState(false)

  const remPx =
    typeof window !== 'undefined' ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 : 16

  onChangeRef.current = onChange
  cfgRef.current = {
    count: items.length,
    items,
    rowH: Math.max(fontSize * spacing * remPx, 1),
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    orientation,
    labelRotate,
    itemAlign,
    loop,
    smoothing,
    draggable,
    soundUrl,
    soundVolume,
  }

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05)
    lastRef.current = now
    const cfg = cfgRef.current
    const tau = Math.max(cfg.smoothing, 1) / 1000
    const k = 1 - Math.exp(-dt / tau)

    const target = targetRef.current
    const cur = posRef.current
    let next = cur + (target - cur) * k
    const settled = Math.abs(target - next) < 0.001
    if (settled) next = target
    posRef.current = next

    const els = itemRefs.current
    const n = cfg.count
    const horizontal = cfg.orientation === 'horizontal'
    const mirror = horizontal
      ? cfg.side === 'top'
        ? -1
        : 1
      : cfg.side === 'right'
        ? -1
        : 1
    const tiltRad = (cfg.tilt * Math.PI) / 180
    const R = tiltRad > 0.0005 ? cfg.rowH / tiltRad : 0

    for (let i = 0; i < n; i++) {
      const el = els[i]
      if (!el) continue

      let d = i - next
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n
        if (d > n / 2) d -= n
      }

      const dist = Math.abs(d)
      let x = 0
      let y = 0
      let rot = 0

      if (horizontal) {
        if (R > 0) {
          const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad))
          x = R * Math.sin(ang)
          y = mirror * R * (1 - Math.cos(ang)) * cfg.curve
          rot = (mirror * ang * 180) / Math.PI
        } else {
          x = d * cfg.rowH
        }

        rot += cfg.labelRotate
        const alignInner = cfg.itemAlign === 'inner'
        el.style.transform = alignInner
          ? `translate(calc(${x.toFixed(2)}px - 50%), calc(${y.toFixed(2)}px - 100%)) rotate(${rot.toFixed(3)}deg)`
          : `translate(calc(${x.toFixed(2)}px - 50%), calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`
      } else {
        if (R > 0) {
          const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad))
          y = R * Math.sin(ang)
          x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve
          rot = (mirror * ang * 180) / Math.PI
        } else {
          y = d * cfg.rowH
        }

        rot += cfg.labelRotate
        el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`
      }
      el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade))
      el.style.filter = cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : 'none'
      el.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(dist, 1)).toFixed(4))
    }

    rafRef.current = settled ? null : requestAnimationFrame(runFrame)
  }, [])

  const layoutItems = useCallback(() => {
    lastRef.current = performance.now()
    runFrame(lastRef.current)
  }, [runFrame])

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return
    lastRef.current = performance.now()
    rafRef.current = requestAnimationFrame(runFrame)
  }, [runFrame])

  const playTick = useCallback(() => {
    const { soundUrl: url, soundVolume: volume } = cfgRef.current
    if (!url) return

    const now = performance.now()
    if (now - lastTickRef.current < 70) return
    lastTickRef.current = now

    if (!audioRef.current || audioUrlRef.current !== url) {
      audioRef.current = new Audio(url)
      audioRef.current.preload = 'auto'
      audioUrlRef.current = url
    }

    const audio = audioRef.current
    audio.volume = Math.min(Math.max(volume, 0), 1)
    audio.currentTime = 0
    audio.play()?.catch(() => {})
  }, [])

  const applyTarget = useCallback(
    (value: number, snap: boolean) => {
      const cfg = cfgRef.current
      let v = value
      if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0))
      if (snap) v = Math.round(v)
      targetRef.current = v

      const idx = ((Math.round(v) % cfg.count) + cfg.count) % cfg.count
      if (idx !== selectedRef.current) {
        selectedRef.current = idx
        setSelectedIndex(idx)
        onChangeRef.current?.(idx, cfg.items[idx])
        playTick()
      }

      startLoop()
    },
    [startLoop, playTick],
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const cfg = cfgRef.current
      const horizontal = cfg.orientation === 'horizontal'
      const raw = horizontal
        ? Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.deltaY
        : e.deltaY
      const delta = e.deltaMode === 1 ? raw * 24 : raw
      const step = Math.max(-1, Math.min(1, delta / cfg.rowH))
      applyTarget(targetRef.current + step, false)

      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
      wheelTimerRef.current = setTimeout(() => applyTarget(targetRef.current, true), 140)
    }

    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      el.removeEventListener('wheel', onWheel)
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
    }
  }, [applyTarget])

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!cfgRef.current.draggable) return
    dragRef.current = { x: e.clientX, y: e.clientY, start: targetRef.current, id: e.pointerId }
    dragMovedRef.current = false
    setIsDragging(true)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      if (!drag) return

      const horizontal = cfgRef.current.orientation === 'horizontal'
      const delta = horizontal ? e.clientX - drag.x : e.clientY - drag.y
      if (!dragMovedRef.current && Math.abs(delta) > 4) {
        dragMovedRef.current = true
        rootRef.current?.setPointerCapture(drag.id)
      }

      if (dragMovedRef.current) {
        applyTarget(drag.start - delta / cfgRef.current.rowH, false)
      }
    },
    [applyTarget],
  )

  const handlePointerEnd = useCallback(() => {
    if (!dragRef.current) return
    dragRef.current = null
    setIsDragging(false)
    if (dragMovedRef.current) applyTarget(targetRef.current, true)
  }, [applyTarget])

  const handleItemClick = useCallback(
    (index: number) => {
      if (dragMovedRef.current) return

      const cfg = cfgRef.current
      const cur = targetRef.current
      let d = index - (((cur % cfg.count) + cfg.count) % cfg.count)

      if (cfg.loop && cfg.count > 1) {
        if (d > cfg.count / 2) d -= cfg.count
        else if (d < -cfg.count / 2) d += cfg.count
      }

      applyTarget(cur + d, true)
    },
    [applyTarget],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let delta: number | null = null
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') delta = -1
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') delta = 1
      if (delta == null) return

      e.preventDefault()
      applyTarget(Math.round(targetRef.current) + delta, true)
    },
    [applyTarget],
  )

  useLayoutEffect(() => {
    layoutItems()
  }, [layoutItems, items, fontSize, spacing, curve, tilt, blur, fade, minOpacity, side, orientation, labelRotate, itemAlign, loop])

  useEffect(() => {
    applyTarget(targetRef.current, false)
  }, [items, fontSize, spacing, curve, tilt, blur, fade, minOpacity, side, orientation, labelRotate, itemAlign, loop, smoothing, applyTarget])

  useEffect(() => {
    if (value == null) return

    const clamped = Math.min(Math.max(value, 0), Math.max(items.length - 1, 0))
    if (clamped === selectedRef.current && Math.abs(targetRef.current - clamped) < 0.001) return

    selectedRef.current = clamped
    setSelectedIndex(clamped)
    targetRef.current = clamped
    posRef.current = clamped
    layoutItems()
  }, [value, items.length, layoutItems])

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      audioRef.current?.pause()
    },
    [],
  )

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Option wheel"
      className={cn(
        'option-wheel',
        orientation === 'horizontal' && 'option-wheel--horizontal',
        orientation === 'horizontal' && 'option-wheel--overflow-visible',
        orientation === 'horizontal' && side === 'bottom' && 'option-wheel--bottom',
        orientation === 'horizontal' && side === 'top' && 'option-wheel--top',
        orientation === 'horizontal' && itemAlign === 'inner' && 'option-wheel--align-inner',
        orientation === 'vertical' && side === 'right' && 'option-wheel--right',
        isDragging && 'option-wheel--dragging',
        className,
      )}
      style={
        {
          '--ow-text-color': textColor,
          '--ow-active-color': activeColor,
          '--ow-font-size': `${fontSize}rem`,
          '--ow-inset': `${inset}px`,
        } as React.CSSProperties
      }
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      {items.map((label, index) => (
        <div
          key={`${label}-${index}`}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          role="option"
          aria-selected={selectedIndex === index}
          className={cn(
            'option-wheel__item',
            selectedIndex === index && 'option-wheel__item--selected',
          )}
          onClick={() => handleItemClick(index)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
