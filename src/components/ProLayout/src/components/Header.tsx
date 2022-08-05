import { Button, Layout, Nav } from '@douyinfe/semi-ui';
import { IconSidebar } from '@douyinfe/semi-icons';
import { CSSProperties, FunctionComponent } from 'react';
import css from 'styled-jsx/css';
import stylesModule from '../Layout.module.scss';
import { useLayoutContext } from '../context';
import { Logo } from '@/layouts/components/Logo';

export type HeaderProps = {
  showLogo: boolean;
  style?: CSSProperties;
};

export const Header: FunctionComponent<HeaderProps> = ({ showLogo, style }) => {
  const state = useLayoutContext();

  function onSideShow() {
    state.onSideSheetCollapse(true);
  }

  const { className, styles } = css.resolve`
    .${state.prefixCls}-layout-header {
      position: relative;
      height: ${stylesModule.headerHeight};
      background-color: var(--semi-color-bg-1);
    }
    .${state.prefixCls}-layout-header-inner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: margin-left 200ms cubic-bezier(0.62, 0.05, 0.36, 0.95);
    }
  `;

  return (
    <div className={`${state.prefixCls}-layout-header ${className}`}>
      <Layout.Header className={`${state.prefixCls}-layout-header-inner ${className}`} style={style}>
        {styles}
        <Nav
          mode="horizontal"
          header={
            <>
              {showLogo && <Logo href="/" collapsed={state.isMobile} />}
              {state.isMobile && (
                <Button
                  icon={<IconSidebar size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                  }}
                  onClick={onSideShow}
                />
              )}
            </>
          }
          footer={state.header?.rightContent}
        />
      </Layout.Header>
    </div>
  );
};
