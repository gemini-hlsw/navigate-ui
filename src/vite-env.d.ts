/// <reference types="vite/client" />

// Extra variables that will be replaced by Vite in the build process, defined in vite.config.ts
interface ImportMetaEnv {
  readonly FRONTEND_VERSION: string;
  readonly FRONTEND_COMMIT: string;
  readonly FRONTEND_BUILD_TIME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
