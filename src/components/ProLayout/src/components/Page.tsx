import { FunctionComponent } from 'react';
import styles from '../Layout.module.scss';

export type PageProps = {};

export const Page: FunctionComponent<PageProps> = ({ children }) => {
  return <div className={styles['content-inner']}>{children}</div>;
};
