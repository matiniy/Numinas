import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface LazyLoopingVideoProps {
  src: string
  poster?: string
  className?: string
  /** When false, video is not mounted — poster/image only. */
  active?: boolean
  preload?: 'none' | 'metadata' | 'auto'
}

export function LazyLoopingVideo({
  src,
  poster,
  className,
  active = true,
  preload = 'metadata',
}: LazyLoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  const restart = useCallback((video: HTMLVideoElement) => {
    video.currentTime = 0
    void video.play().catch(() => {
      // Autoplay policies may block replay until user interaction.
    })
  }, [])

  useEffect(() => {
    if (!active) {
      setReady(false)
      return
    }

    const video = videoRef.current
    if (!video) return

    video.loop = true

    const onCanPlay = () => setReady(true)
    const onEnded = () => restart(video)

    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('ended', onEnded)

    void video.play().catch(() => {
      // Ignore autoplay rejection; video still loops once started.
    })

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('ended', onEnded)
    }
  }, [active, restart, src])

  if (!active) {
    if (!poster) return null

    return (
      <img
        src={poster}
        alt=""
        className={cn(className)}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
    )
  }

  return (
    <div className={cn('relative h-full w-full', className)}>
      {poster && !ready ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          aria-hidden="true"
        />
      ) : null}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        preload={preload}
        aria-hidden="true"
      />
    </div>
  )
}
