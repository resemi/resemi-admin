import pkg from '../../package.json';

export function getEnv() {
  return process.env.NEXT_PUBLIC_APP_ENV;
}

export function getStoragePrefix(): string {
  return `${process.env.NEXT_PUBLIC_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// Generate cache key according to version
export function getStorageShortName(key: string): string {
  return `${getStoragePrefix()}__${pkg.version}__${key}`.toUpperCase();
}
