import React, { useState } from 'react';
import { Spin } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import useProgress from '@/hooks/web/useProgress';
import { useLayoutContext } from '../context';

export default function PageLoading() {
  const state = useLayoutContext();
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
    <div className={loading ? `${state.prefixCls}-layout-loading` : 'hidden'}>
      <style jsx>{`
        .${state.prefixCls}-layout-loading {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          height: calc(100vh - ${state.header.height}px);
          width: 100%;
          background-color: var(--semi-color-bg-0);
          z-index: 999;
        }
      `}</style>
      <Spin size="large" />
    </div>
  );
}
