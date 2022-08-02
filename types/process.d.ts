declare namespace NodeJS {
  export interface ProcessEnv {
    APP_ENV: 'development' | 'production' | 'staging';
    NEXT_PUBLIC_BASE_API: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
