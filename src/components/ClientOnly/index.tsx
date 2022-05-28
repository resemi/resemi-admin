import { useEffect, useState } from 'react';

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function ClientOnly({ children, ...delegated }) {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
