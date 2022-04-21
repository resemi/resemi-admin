import { FunctionComponent } from 'react';
import styles from '@/layouts/default/Layout.module.scss';

export type PageProps = {};

export const Page: FunctionComponent<PageProps> = ({ children }) => {
  return <div className={styles['content-inner']}>{children}</div>;
};
