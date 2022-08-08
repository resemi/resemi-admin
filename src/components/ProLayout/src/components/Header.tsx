import { Button, Layout, Nav } from '@douyinfe/semi-ui';
import { IconSidebar } from '@douyinfe/semi-icons';
import { CSSProperties, FunctionComponent } from 'react';
import css from 'styled-jsx/css';
import { useLayoutContext } from '../context';
import { Logo } from './Logo';

export type HeaderProps = {
  showLogo: boolean;
  style?: CSSProperties;
  onSideSheetCollapse?: (visible: boolean) => void;
};

export const Header: FunctionComponent<HeaderProps> = ({ showLogo, style, onSideSheetCollapse }) => {
  const state = useLayoutContext();

  function onSideShow() {
    onSideSheetCollapse(true);
  }

  const { className, styles } = css.resolve`
    .${state.prefixCls}-layout-header {
      position: relative;
      height: ${state.header.height}px;
      min-height: ${state.header.height}px;
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

  function showSideSwitcher() {
    return state.isMobile && state.layout !== 'top';
  }

  return (
    <div className={`${state.prefixCls}-layout-header ${className}`}>
      <Layout.Header className={`${state.prefixCls}-layout-header-inner ${className}`} style={style}>
        {styles}
        <Nav
          mode="horizontal"
          header={
            <>
              {showLogo && <Logo {...state.logo} collapsed={state.isMobile} />}
              {showSideSwitcher() && (
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
