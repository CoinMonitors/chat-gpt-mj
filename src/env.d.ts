/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_APP_NAME: string;
    readonly VITE_APP_API_BASE_URL: string;
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}