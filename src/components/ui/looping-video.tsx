import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface LoopingVideoProps {
  src: string
  poster?: string
  className?: string
  preload?: 'none' | 'metadata' | 'auto'
}

export function LoopingVideo({
  src,
  poster,
  className,
  preload = 'metadata',
}: LoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const restart = useCallback((video: HTMLVideoElement) => {
    video.currentTime = 0
    void video.play().catch(() => {
      // Autoplay policies may block replay until user interaction.
    })
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.loop = true

    const onEnded = () => restart(video)

    video.addEventListener('ended', onEnded)

    void video.play().catch(() => {
      // Ignore autoplay rejection; video still loops once started.
    })

    return () => {
      video.removeEventListener('ended', onEnded)
    }
  }, [restart, src])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={cn(className)}
      muted
      loop
      playsInline
      autoPlay
      preload={preload}
    />
  )
}
