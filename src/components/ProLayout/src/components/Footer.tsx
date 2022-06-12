import { IconGithubLogo } from '@douyinfe/semi-icons';
import { Layout } from '@douyinfe/semi-ui';
import { FunctionComponent } from 'react';
import styles from '../Layout.module.scss';

export type FooterProps = {};

export const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <Layout.Footer className={styles.footer}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <IconGithubLogo size="large" style={{ marginRight: '8px' }} />
        <span>Copyright © 2022 Anguer. All Rights Reserved. </span>
      </div>
    </Layout.Footer>
  );
};
