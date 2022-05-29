declare namespace NodeJS {
  export interface ProcessEnv {
    APP_ENV: 'development' | 'production' | 'staging';
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_DESCRIPTION: string;
    NEXT_PUBLIC_APP_KEYWORDS: string;
    NEXT_PUBLIC_BASE_API: string;
    SITE_URL: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
