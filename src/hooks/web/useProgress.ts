import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Fn = (...args: any[]) => void;

export default function useProgress(start: Fn, end: Fn) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (...args) => {
      start(...args);
    };
    const handleStop = () => {
      end();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router, start, end]);
}
