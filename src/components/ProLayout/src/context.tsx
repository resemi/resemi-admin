import { createContext, ReactNode, useContext } from 'react';
import { NavItems, OnSelectedData } from '@douyinfe/semi-ui/navigation';

export interface Menu {
  defaultSelectedKeys: string[];
  items: NavItems;
  onSelect: (data: OnSelectedData) => void;
}

export interface Header {
  rightContent: ReactNode;
}

export interface LayoutContextValue {
  prefixCls: string;
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
