import type { ReactNode, MouseEvent } from 'react';
import { createContext, useContext } from 'react';

export interface MenuItem {
  itemKey: string;
  text: string;
  icon: ReactNode | string;
  items: MenuItem[];
}

export interface OnSelectedData {
  itemKey: string;
  selectedKeys: string[];
  selectedItems: MenuItem[];
  domEvent: MouseEvent;
  isOpen: boolean;
}

export interface Menu {
  defaultSelectedKeys: string[];
  items: MenuItem[];
  onSelect: (data: OnSelectedData) => void;
}

export interface IHeader {
  height?: number;
  rightContent?: ReactNode;
}

export interface ISidebar {
  width?: number;
}

export interface IFooter {
  height?: number;
}

export interface LayoutContextValue {
  prefixCls?: string;
  spacing?: number;
  layout?: 'side' | 'top' | 'mix';
  isMobile?: boolean;
  isSideCollapsed?: boolean;
  onSideCollapse?: (collapsed: boolean) => void;
  breadcrumb?: boolean;
  page?: boolean;
  menu?: Menu;
  header?: IHeader;
  sidebar?: ISidebar;
  footer?: IFooter;
  logo?: { href: string; logo: string; text?: string };
}

export const defaultValue: LayoutContextValue = {
  prefixCls: 'resemi',
  spacing: 24,
  isMobile: false,
  isSideCollapsed: false,
  header: {
    height: 60,
  },
  sidebar: {
    width: 240,
  },
  footer: {
    height: 60,
  },
};

export const LayoutContext = createContext<LayoutContextValue>(defaultValue);

export const useLayoutContext = () => useContext(LayoutContext);
