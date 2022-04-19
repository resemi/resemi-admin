import React from 'react';
import { Spin } from '@douyinfe/semi-ui';
import styles from './Layout.module.scss';

type LoadingProps = {
  loading: boolean;
};

export default function Loading({ loading }: LoadingProps) {
  return (
    <div className={loading ? styles.loading : styles.none}>
      <Spin size="large" />
    </div>
  );
}
