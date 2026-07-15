import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface LazyLoopingVideoProps {
  src: string
  poster?: string
  className?: string
  /** When false, video is not mounted — poster/image only. */
  active?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  onReady?: () => void
  onError?: () => void
}

export function LazyLoopingVideo({
  src,
  poster,
  className,
  active = true,
  preload = 'metadata',
  onReady,
  onError,
}: LazyLoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const tryPlay = useCallback((video: HTMLVideoElement) => {
    void video.play().catch(() => {
      // Autoplay may be blocked until enough data is buffered.
    })
  }, [])

  useEffect(() => {
    if (!active) {
      setReady(false)
      setFailed(false)
      return
    }

    const video = videoRef.current
    if (!video) return

    setReady(false)
    setFailed(false)
    video.loop = true

    const markReady = () => {
      setReady(true)
      onReady?.()
      tryPlay(video)
    }

    const onCanPlay = () => markReady()
    const onLoadedData = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        markReady()
      }
    }

    const onVideoError = () => {
      setFailed(true)
      onError?.()
    }

    const onEnded = () => {
      video.currentTime = 0
      tryPlay(video)
    }

    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('error', onVideoError)
    video.addEventListener('ended', onEnded)

    video.load()
    tryPlay(video)

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('error', onVideoError)
      video.removeEventListener('ended', onEnded)
      video.pause()
    }
  }, [active, onError, onReady, src, tryPlay])

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

  const showPoster = Boolean(poster) && (!ready || failed)

  return (
    <div className={cn('relative h-full w-full', className)}>
      {showPoster ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          aria-hidden="true"
        />
      ) : null}
      {!failed ? (
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
      ) : null}
    </div>
  )
}
