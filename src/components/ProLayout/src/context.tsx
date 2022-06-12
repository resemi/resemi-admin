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

export interface Header {
  rightContent: ReactNode;
}

export interface LayoutContextValue {
  prefixCls?: string;
  layout?: 'side' | 'top' | 'mix';
  isMobile?: boolean;
  isSideCollapsed?: boolean;
  isSideSheetVisible?: boolean;
  onSideCollapse?: (collapsed: boolean) => void;
  onSideSheetCollapse?: (collapsed: boolean) => void;
  menu?: Menu;
  header?: Header;
}

export const defaultValue: LayoutContextValue = {
  prefixCls: 'pot',
  isMobile: false,
  isSideCollapsed: false,
  isSideSheetVisible: false,
};

export const LayoutContext = createContext<LayoutContextValue>(defaultValue);

export const useLayoutContext = () => useContext(LayoutContext);
