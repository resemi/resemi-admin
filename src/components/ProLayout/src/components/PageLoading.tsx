import React, { useState } from 'react';
import { Spin } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import useProgress from '@/hooks/web/useProgress';

export type LoadingProps = {
  className: string;
};

export default function PageLoading({ className }: LoadingProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useProgress(
    (url) => {
      setLoading(url !== router.pathname);
    },
    () => {
      setLoading(false);
    },
  );
  return (
    <div className={loading ? className : 'hidden'}>
      <Spin size="large" />
    </div>
  );
}
