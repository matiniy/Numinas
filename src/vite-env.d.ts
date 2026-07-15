/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_VIDEO_CDN_URL?: string
  readonly VITE_VIDEO_USE_WEB_VARIANT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
