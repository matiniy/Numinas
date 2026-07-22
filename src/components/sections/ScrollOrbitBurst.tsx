import { useEffect, useRef, type RefObject } from 'react'
import { cn } from '@/lib/utils'

/**
 * Scroll Orbit — adjustable dials (edit these values).
 *
 * | Key                | Now  | What it does                                      |
 * |--------------------|------|---------------------------------------------------|
 * | particleCount      | 14   | Number of spheres                                 |
 * | baseSize           | 3.5  | Minimum sphere size                               |
 * | sizeVariance       | 8    | Extra random size                                 |
 * | verticalSpread     | 100  | Random Y spread around center                     |
 * | organicWobble      | 28   | Soft idle wobble amount                           |
 * | animateInRange     | 0.1  | Scroll % window where spheres first appear (0–1)  |
 * | appearDuration     | 0.16 | How long each sphere takes to fade/scale in      |
 * | scrollLerp         | 0.22 | Progress smoothing (higher = snappier)            |
 * | velLerp            | 0.28 | Scroll-velocity smoothing                         |
 * | scrollThreshold    | 0.04 | |vel| above this counts as “scrolling”           |
 * | posLerpIdle        | 0.12 | Position follow when still                        |
 * | posLerpScroll      | 0.42 | Position follow while scrolling                   |
 * | globalOrbitRadius  | 26   | Main orbit radius                                 |
 * | localOrbitRadius   | 20   | Epicycle / local orbit radius                     |
 * | scrollSpin         | 9.5  | Orbit spin strength from scroll                   |
 * | reverseGain        | 1.25 | Extra strength when scrolling up (reverse)        |
 * | spinBoostMax       | 3.5  | Max speed multiplier while scrolling fast         |
 * | idleSpin           | 0.55 | Soft spin when page is still                      |
 * | yDrift             | 5.5  | Vertical drift tied to scroll velocity            |
 * | parallaxAmount     | 0.1  | Depth parallax while scrolling                    |
 * | burstAt            | 0.97 | Progress (0–1) when burst triggers                |
 * | burstExpansion     | 3.5  | Burst outward force                               |
 * | burstChaos         | 5    | Burst randomness                                  |
 * | burstGravity       | 0    | Burst downward pull                               |
 * | fadeSpeed          | 10   | How fast spheres fade after burst                 |
 * | glowIntensity      | 4    | Sphere glow (keep low for subtle)                 |
 */
export const SCROLL_FX = {
  particleCount: 14,
  baseSize: 3.5,
  sizeVariance: 8,
  verticalSpread: 100,
  organicWobble: 28,
  animateInRange: 0.1,
  appearDuration: 0.16,
  scrollLerp: 0.22,
  velLerp: 0.28,
  scrollThreshold: 0.04,
  posLerpIdle: 0.12,
  posLerpScroll: 0.42,
  globalOrbitRadius: 26,
  localOrbitRadius: 20,
  scrollSpin: 9.5,
  reverseGain: 1.25,
  spinBoostMax: 3.5,
  idleSpin: 0.55,
  yDrift: 5.5,
  parallaxAmount: 0.1,
  burstAt: 0.97,
  burstExpansion: 3.5,
  burstChaos: 5,
  burstGravity: 0,
  fadeSpeed: 10,
  glowIntensity: 4,
  primary: { r: 255, g: 255, b: 255 },
  secondary: { r: 7, g: 7, b: 7 },
  mist: { r: 160, g: 160, b: 170 },
} as const

type OrbitState = 'orbit' | 'burst'

type Particle = {
  spawnThreshold: number
  yJitter: number
  size: number
  usePrimary: boolean
  globalR: number
  localR: number
  globalPhase0: number
  localPhase0: number
  globalDir: number
  localDir: number
  globalSpeed: number
  localSpeed: number
  wobblePhase: number
  wobbleSpeed: number
  fadeRate: number
  opacityPeak: number
  depthBias: number
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  tx: number
  ty: number
  tz: number
  tScale: number
  tOpacity: number
  vx: number
  vy: number
  alive: boolean
}

type Props = {
  sectionRef: RefObject<HTMLElement | null>
  className?: string
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function easeOutCubic(t: number) {
  const u = 1 - clamp(t, 0, 1)
  return 1 - u * u * u
}

function easeInOutSoft(t: number) {
  const x = clamp(t, 0, 1)
  return x * x * (3 - 2 * x)
}

function rgba(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${clamp(a, 0, 1)})`
}

function createParticles(): Particle[] {
  const fx = SCROLL_FX
  const particles: Particle[] = []
  for (let i = 0; i < fx.particleCount; i++) {
    const spawnThreshold = Math.pow(Math.random(), 1.35) * fx.animateInRange
    const sizeBias = Math.random()
    particles.push({
      spawnThreshold,
      yJitter:
        (Math.random() - 0.5) * fx.verticalSpread * (0.85 + Math.random() * 1.35) +
        (Math.random() - 0.5) * 24,
      size:
        fx.baseSize +
        Math.pow(sizeBias, 0.7) * fx.sizeVariance +
        (Math.random() < 0.2 ? Math.random() * 4 : 0),
      usePrimary: Math.random() > 0.38,
      globalR: fx.globalOrbitRadius * (0.35 + Math.random() * 1.15),
      localR: fx.localOrbitRadius * (0.2 + Math.random() * 1.2),
      globalPhase0: Math.random() * Math.PI * 2,
      localPhase0: Math.random() * Math.PI * 2,
      globalDir: Math.random() > 0.5 ? 1 : -1,
      localDir: Math.random() > 0.5 ? 1 : -1,
      globalSpeed: 0.55 + Math.random() * 1.45,
      localSpeed: 0.9 + Math.random() * 2.1,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.4 + Math.random() * 1.6,
      fadeRate: 0.45 + Math.random() * 1.1,
      opacityPeak: 0.5 + Math.random() * 0.5,
      depthBias: 0.65 + Math.random() * 0.7,
      x: 0,
      y: 0,
      z: 0,
      scale: 0,
      opacity: 0,
      tx: 0,
      ty: 0,
      tz: 0,
      tScale: 0,
      tOpacity: 0,
      vx: 0,
      vy: 0,
      alive: true,
    })
  }
  return particles
}

function sectionProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect()
  const viewH = window.innerHeight
  const travel = Math.max(rect.height - viewH * 0.35, 1)
  return clamp((-rect.top + viewH * 0.1) / travel, 0, 1)
}

export function ScrollOrbitBurst({ sectionRef, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const section = sectionRef.current
    if (!canvas || !wrap || !section) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fx = SCROLL_FX
    let particles = createParticles()
    let state: OrbitState = 'orbit'
    let raf = 0
    let lastTs = 0
    let dpr = 1
    let width = 0
    let height = 0
    let smoothProgress = 0
    let prevProgress = 0
    let progressReady = false
    let scrollVel = 0
    /** Shared orbit angle — decreases when scrolling up so the cluster rewinds. */
    let orbitAngle = 0
    let idleAngle = 0
    let burstAge = 0

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const reset = () => {
      particles = createParticles()
      state = 'orbit'
      burstAge = 0
      smoothProgress = 0
      prevProgress = 0
      progressReady = false
      scrollVel = 0
      orbitAngle = 0
      idleAngle = 0
    }

    const drawParticle = (p: Particle, ax: number) => {
      if (p.opacity <= 0.01 || p.scale <= 0.01) return

      const depth = clamp((p.z + 55) / 110, 0, 1)
      const size = p.size * p.scale * lerp(0.62, 1.18, depth)
      const alpha = p.opacity * lerp(0.4, 1, depth) * 0.85
      const glow = size * (1.15 + fx.glowIntensity * 0.08)
      const gx = ax + p.x
      const gy = p.y

      const core = p.usePrimary ? fx.primary : fx.secondary

      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, glow)
      grad.addColorStop(0, rgba(core, alpha * 0.75))
      grad.addColorStop(0.45, rgba(core, alpha * 0.22))
      grad.addColorStop(0.8, rgba(fx.mist, alpha * 0.06))
      grad.addColorStop(1, rgba(fx.mist, 0))

      ctx.beginPath()
      ctx.fillStyle = grad
      ctx.arc(gx, gy, glow, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.fillStyle = rgba(core, alpha * 0.7)
      ctx.arc(gx, gy, Math.max(0.65, size * 0.38), 0, Math.PI * 2)
      ctx.fill()
    }

    const tick = (ts: number) => {
      const dt = Math.min((ts - (lastTs || ts)) / 1000, 0.05)
      lastTs = ts

      const progress = sectionProgress(section)
      const scrollBlend = 1 - Math.pow(1 - fx.scrollLerp, dt * 60)
      smoothProgress = lerp(smoothProgress, progress, scrollBlend)

      if (!progressReady) {
        prevProgress = smoothProgress
        progressReady = true
      }

      const rawDelta = smoothProgress - prevProgress
      prevProgress = smoothProgress

      const instantVel = rawDelta / Math.max(dt, 0.001)
      const velBlend = 1 - Math.pow(1 - fx.velLerp, dt * 60)
      scrollVel = lerp(scrollVel, instantVel, velBlend)

      const speed = Math.abs(scrollVel)
      const scrolling = speed > fx.scrollThreshold
      const dirGain = scrollVel < 0 ? fx.reverseGain : 1
      const spinBoost = 1 + clamp(speed * 0.55, 0, fx.spinBoostMax)

      if (state === 'burst' && progress < 0.08) {
        reset()
      } else if (progress < 0.02 && smoothProgress < 0.04 && state === 'orbit') {
        particles = createParticles()
        orbitAngle = 0
        idleAngle = 0
      }

      const ax = width * 0.5
      const cy = height * 0.5
      const orbitStrength = easeInOutSoft(clamp(smoothProgress / 0.7, 0, 1))

      if (state === 'orbit' && smoothProgress >= fx.burstAt) {
        state = 'burst'
        burstAge = 0
        for (const p of particles) {
          if (p.scale < 0.05) continue
          const phase =
            p.globalPhase0 + orbitAngle * p.globalSpeed * p.globalDir
          const tangX = -Math.sin(phase) * p.globalR * 0.15
          const chaos = fx.burstChaos * (0.4 + Math.random() * 0.9)
          p.vx =
            (tangX + (Math.random() - 0.5) * 40) *
            fx.burstExpansion *
            0.35 *
            chaos
          p.vy =
            (Math.random() - 0.5) * 36 * fx.burstExpansion * 0.25 * chaos
          p.alive = true
        }
      }

      const posLerp = scrolling ? fx.posLerpScroll : fx.posLerpIdle
      const posBlend = 1 - Math.pow(1 - posLerp, dt * 60)

      if (state === 'orbit') {
        // Signed scroll drives shared orbit — scroll up rewinds (reverseGain boosts it)
        orbitAngle +=
          rawDelta * fx.scrollSpin * 0.9 * dirGain +
          scrollVel * fx.scrollSpin * dt * spinBoost * dirGain * 0.55

        if (!scrolling) {
          idleAngle += fx.idleSpin * dt
        }

        for (const p of particles) {
          const spawnT = clamp(
            (smoothProgress - p.spawnThreshold) / fx.appearDuration,
            0,
            1,
          )
          const appear = easeOutCubic(spawnT)

          const gPhase =
            p.globalPhase0 +
            (orbitAngle * p.globalSpeed + idleAngle * p.globalSpeed * 0.35) *
              p.globalDir
          const lPhase =
            p.localPhase0 +
            (orbitAngle * p.localSpeed * 1.35 +
              idleAngle * p.localSpeed * 0.55) *
              p.localDir

          p.wobblePhase += dt * p.wobbleSpeed
          const wobble =
            Math.sin(p.wobblePhase) * (fx.organicWobble * 0.09) * appear

          const xg = Math.cos(gPhase) * p.globalR
          const zg = Math.sin(gPhase) * p.globalR
          const xl = Math.cos(lPhase) * p.localR
          const zl = Math.sin(lPhase) * p.localR

          const parallax =
            1 +
            (1 - p.depthBias) *
              clamp(scrollVel * fx.parallaxAmount, -0.28, 0.28)

          p.tx = (xg + xl) * (0.2 + orbitStrength * 0.8) * parallax + wobble
          p.tz = (zg + zl) * p.depthBias
          p.ty =
            cy +
            p.yJitter +
            Math.sin(p.wobblePhase * 0.55) * (fx.organicWobble * 0.1) +
            Math.cos(p.wobblePhase * 1.05) * (fx.verticalSpread * 0.06) +
            scrollVel * p.depthBias * fx.yDrift
          p.tScale = appear * (1 + clamp(speed * 0.02, 0, 0.08))
          p.tOpacity = appear * p.opacityPeak * (0.55 + orbitStrength * 0.45)

          p.x = lerp(p.x, p.tx, posBlend)
          p.y = lerp(p.y, p.ty, posBlend)
          p.z = lerp(p.z, p.tz, posBlend)
          p.scale = lerp(p.scale, p.tScale, posBlend)
          p.opacity = lerp(p.opacity, p.tOpacity, posBlend)
          p.alive = true
        }
      } else {
        burstAge += dt
        for (const p of particles) {
          if (!p.alive) continue
          p.vy += fx.burstGravity * 60 * dt
          p.x += p.vx * dt * fx.burstExpansion
          p.y += p.vy * dt * fx.burstExpansion
          p.z *= 0.99
          p.opacity = Math.max(
            0,
            p.opacity - dt * (fx.fadeSpeed * 0.08) * p.fadeRate,
          )
          p.scale = Math.max(0, p.scale - dt * 0.28)
          if (p.opacity <= 0.01) {
            p.alive = false
            p.opacity = 0
          }
        }
      }

      ctx.clearRect(0, 0, width, height)

      const sorted = particles.slice().sort((a, b) => a.z - b.z)
      for (const p of sorted) {
        drawParticle(p, ax)
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    raf = requestAnimationFrame(tick)

    const onReduce = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(raf)
        ctx.clearRect(0, 0, width, height)
      }
    }
    reduced.addEventListener('change', onReduce)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      reduced.removeEventListener('change', onReduce)
    }
  }, [sectionRef])

  return (
    <div
      ref={wrapRef}
      className={cn('approach-orbit', className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="approach-orbit__canvas" />
    </div>
  )
}
