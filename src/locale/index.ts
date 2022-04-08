export type { Locale } from '@douyinfe/semi-ui/locale/interface';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';

export const locales = {
  zh_CN,
  en_US,
}

export type LocaleKey = keyof typeof locales;
