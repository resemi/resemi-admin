import semiZhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import semiEnUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import type { IntlFormatters } from 'react-intl';
import type { Props as ReactIntlFormattedMessageProps } from 'react-intl/src/components/message';
import { useIntl as useReactIntl, FormattedMessage as ReactIntlFormattedMessage } from 'react-intl';
import { ReactNode } from 'react';
import zhMessages from './source/zh_CN.json';
import enMessages from './source/en_US.json';

export enum Locales {
  ZH_CN = 'zh-CN',
  EN_US = 'en-US',
}

export const messages = {
  [Locales.ZH_CN]: {
    semi: semiZhCN,
    app: zhMessages,
  },
  [Locales.EN_US]: {
    semi: semiEnUS,
    app: enMessages,
  },
};

// Our union type of all available message IDs
export type IntlMessageKeys = keyof typeof enMessages;

// The arguments to the original formatMessage function
export type FormatMessageArgs = Parameters<IntlFormatters['formatMessage']>;

export const useIntl = () => {
  // Pull out the original formatMessage function
  const { formatMessage, ...args } = useReactIntl();

  // Re-write the formatMessage function but with an enhanced id type
  const typedFormatMessage = (
    descriptor: FormatMessageArgs[0] & {
      id: IntlMessageKeys;
    },
    values?: FormatMessageArgs[1],
    options?: FormatMessageArgs[2],
  ) => {
    return formatMessage(descriptor, values, options);
  };

  return {
    ...args,
    formatMessage: typedFormatMessage,
  };
};

// Extend the original FormattedMessage props
export type FormattedMessageProps = ReactIntlFormattedMessageProps<Record<string, ReactNode>> & {
  id: IntlMessageKeys;
};

export function FormattedMessage({ id, ...props }: FormattedMessageProps) {
  return <ReactIntlFormattedMessage id={id} {...props} />;
}
