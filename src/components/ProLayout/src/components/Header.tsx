import { Button, Layout, Nav } from '@douyinfe/semi-ui';
import { IconSidebar } from '@douyinfe/semi-icons';
import { FunctionComponent } from 'react';
import styles from '../Layout.module.scss';
import { useLayoutContext } from '../context';

export type HeaderProps = {};

export const Header: FunctionComponent<HeaderProps> = () => {
  const state = useLayoutContext();

  function onSideShow() {
    state.onSideSheetCollapse(true);
  }

  return (
    <Layout.Header className={styles.header}>
      <Nav
        mode="horizontal"
        header={
          state.isMobile && (
            <Button
              icon={<IconSidebar size="large" />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
              onClick={onSideShow}
            />
          )
        }
        footer={state.header?.rightContent}
      />
    </Layout.Header>
  );
};
