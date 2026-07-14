import { useState } from 'react'
import { HERO_MEDIA } from '../../lib/hero-media'

export function HeroVideo() {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  const videoSrc = encodeURI(HERO_MEDIA.video.mp4)

  if (failed) {
    return (
      <div
        className="absolute inset-0 wire-box flex items-center justify-center"
        aria-hidden="true"
      >
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--n-mist)]">
          [ Hero reel failed to load ]
        </p>
      </div>
    )
  }

  return (
    <>
      {!ready ? (
        <div
          className="absolute inset-0 bg-[var(--n-void)]"
          aria-hidden="true"
        />
      ) : null}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_MEDIA.poster}
        aria-hidden="true"
        onCanPlay={() => setReady(true)}
        onError={() => setFailed(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </>
  )
}
