import zhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import enUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';

export type { Locale } from '@douyinfe/semi-ui/locale/interface';

export const locales = {
  zhCN,
  enUS,
};

export type LocaleKey = keyof typeof locales;
