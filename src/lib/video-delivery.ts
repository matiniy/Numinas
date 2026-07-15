/**
 * Video delivery — local public/ paths or CDN base URL.
 *
 * Set `VITE_VIDEO_CDN_URL` to serve from Bunny, Cloudflare R2, Mux, etc.
 * Set `VITE_VIDEO_USE_WEB_VARIANT=true` after running `npm run encode-videos`
 * to prefer `*-web.mp4` encodes (smaller, faststart).
 */

function stripTrailingSlash(value: string) {
  return value.replace(/\/$/, '')
}

export function toWebVideoPath(localPath: string) {
  if (/\-web\.mp4$/i.test(localPath)) return localPath
  return localPath.replace(/\.mp4$/i, '-web.mp4')
}

export function getVideoCdnBase() {
  return import.meta.env.VITE_VIDEO_CDN_URL?.trim()
}

export function useWebVideoVariant() {
  return import.meta.env.VITE_VIDEO_USE_WEB_VARIANT === 'true'
}

/** Resolve a `/media/...` path to CDN or local URL, optionally swapping in `-web.mp4`. */
export function getDeliverableVideoUrl(localPath: string) {
  const path = useWebVideoVariant() ? toWebVideoPath(localPath) : localPath
  const cdnBase = getVideoCdnBase()

  if (!cdnBase) return encodeURI(path)

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  const encodedPath = normalizedPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `${stripTrailingSlash(cdnBase)}/${encodedPath}`
}
