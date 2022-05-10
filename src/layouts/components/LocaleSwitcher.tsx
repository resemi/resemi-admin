import { IconLanguage } from '@douyinfe/semi-icons';
import { Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { Locales } from '@/locale';

export type LocaleSwitcherProps = {};

export const LocaleSwitcher: FunctionComponent<LocaleSwitcherProps> = () => {
  const { locale, push, asPath } = useRouter();

  async function onSwitchLanguage() {
    if (locale === Locales.ZH_CN) {
      await push(asPath, '', { locale: Locales.EN_US });
    } else {
      await push(asPath, '', { locale: Locales.ZH_CN });
    }
  }

  return (
    <Button
      theme="borderless"
      icon={<IconLanguage size="large" />}
      style={{
        color: 'var(--semi-color-text-2)',
      }}
      onClick={onSwitchLanguage}
    >
      {locale.slice(0, 2).toUpperCase()}
    </Button>
  );
};
