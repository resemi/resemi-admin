declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    APP_ENV: 'development' | 'production' | 'staging';
    NEXT_PUBLIC_BASE_API: string;
    NEXT_PUBLIC_APP_SHORT_NAME: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
