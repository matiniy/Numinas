import { useState } from 'react'
import { HERO_MEDIA } from '../../lib/hero-media'
import { getDeliverableVideoUrl } from '@/lib/video-delivery'

export function HeroVideo() {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const videoSrc = getDeliverableVideoUrl(HERO_MEDIA.video.mp4)

  if (failed) {
    return (
      <div
        className="hero-video hero-video--failed absolute inset-0 wire-box flex items-center justify-center"
        aria-hidden="true"
      >
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--n-mist)]">
          [ Hero reel failed to load ]
        </p>
      </div>
    )
  }

  return (
    <div className="hero-video" aria-hidden="true">
      {!ready ? <div className="hero-video__placeholder" /> : null}
      <video
        className="hero-video__media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_MEDIA.poster}
        onCanPlay={() => setReady(true)}
        onError={() => setFailed(true)}
        src={videoSrc}
      />
    </div>
  )
}
