import { CSSProperties, FunctionComponent, useState } from 'react';
import css from 'styled-jsx/css';
import { Header, Sidebar, Footer, Main } from './components';
import { useLayoutContext } from './context';

export type MainLayoutProps = {
  style?: CSSProperties;
};

export const MainLayout: FunctionComponent<MainLayoutProps> = ({ children, style }) => {
  const state = useLayoutContext();

  const { className, styles } = css.resolve`
    .${state.prefixCls}-layout {
      position: relative;
      display: flex;
      flex: auto;
      flex-direction: column;
      min-height: auto;
      margin-left: 0;
      color: var(--semi-color-text-0);
      transition: margin-left 200ms cubic-bezier(0.62, 0.05, 0.36, 0.95);
    }
  `;

  return (
    <section className={`${state.prefixCls}-layout ${className}`} style={style}>
      {styles}
      {children}
    </section>
  );
};

export type BasicLayoutProps = {};

export const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children }) => {
  const state = useLayoutContext();
  const [theState, setTheState] = useState({
    isSideSheetVisible: false,
  });

  function onSideSheetCollapse(visible) {
    setTheState((oldValue) => {
      return {
        ...oldValue,
        isSideSheetVisible: visible,
      };
    });
  }

  const renderTop = () => {
    switch (state.layout) {
      case 'top': {
        return <Header showLogo />;
      }
      case 'mix': {
        return <Header showLogo onSideSheetCollapse={onSideSheetCollapse} />;
      }
      case 'side':
      default: {
        return (
          <Sidebar
            showLogo
            isSideSheetVisible={theState.isSideSheetVisible}
            onSideSheetCollapse={onSideSheetCollapse}
          />
        );
      }
    }
  };

  const renderMain = () => {
    const style = {
      ...(!state.isMobile && {
        marginLeft: `${state.isSideCollapsed ? 60 : state.sidebar.width}px`,
      }),
    };

    switch (state.layout) {
      case 'top': {
        return (
          <>
            <MainLayout>
              <Main>{children}</Main>
            </MainLayout>
            <Footer />
          </>
        );
      }
      case 'mix': {
        return (
          <MainLayout style={style}>
            <Sidebar
              showLogo={state.isMobile}
              top={state.isMobile ? 0 : 60}
              isSideSheetVisible={theState.isSideSheetVisible}
              onSideSheetCollapse={onSideSheetCollapse}
            />
            <Main>{children}</Main>
            <Footer />
          </MainLayout>
        );
      }
      case 'side':
      default: {
        return (
          <MainLayout style={style}>
            <Header showLogo={state.isMobile} style={style} onSideSheetCollapse={onSideSheetCollapse} />
            <Main>{children}</Main>
            <Footer />
          </MainLayout>
        );
      }
    }
  };

  return (
    <MainLayout>
      {renderTop()}
      {renderMain()}
    </MainLayout>
  );
};
