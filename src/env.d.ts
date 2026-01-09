interface ImportMetaEnv {
  readonly VUE_APP_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly MODE: string
  readonly BASE_URL: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}