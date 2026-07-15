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

function decodePathSegment(segment: string) {
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

/** Encode each path segment once (paths in projects.ts may already be partially encoded). */
export function encodeMediaPath(path: string) {
  const normalized = path.startsWith('/') ? path.slice(1) : path

  return (
    '/' +
    normalized
      .split('/')
      .map(decodePathSegment)
      .map((segment) => encodeURIComponent(segment))
      .join('/')
  )
}

export function toWebVideoPath(localPath: string) {
  if (/\-web\.mp4$/i.test(localPath)) return localPath

  const parts = localPath.split('/')
  const filename = parts.pop()
  if (!filename) return localPath

  const decoded = decodePathSegment(filename)
  if (!/\.mp4$/i.test(decoded)) return localPath

  parts.push(decoded.replace(/\.mp4$/i, '-web.mp4'))
  return parts.join('/')
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
  const encodedPath = encodeMediaPath(path)
  const cdnBase = getVideoCdnBase()

  if (!cdnBase) return encodedPath

  return `${stripTrailingSlash(cdnBase)}${encodedPath}`
}
