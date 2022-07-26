import { useEffect, useState } from 'react';

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function ClientOnly({ children }) {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return <> {children}</>;
}
