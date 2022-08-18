declare namespace NodeJS {
  export type ENV = 'development' | 'production' | 'staging';

  export interface ProcessEnv {
    NODE_ENV: string;
    APP_ENV: ENV;
    NEXT_PUBLIC_BASE_API: string;
    NEXT_PUBLIC_APP_SHORT_NAME: string;
    NEXT_PUBLIC_APP_ENV: ENV;
    NEXT_PUBLIC_APP_URL: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
