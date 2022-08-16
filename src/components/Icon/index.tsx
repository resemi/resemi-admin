import { FunctionComponent, useEffect, useState } from 'react';
import { Icon as BaseIcon, loadIcons, getIcon, IconProps as BaseIconProps } from '@iconify/react';
import { IconSpin } from '@douyinfe/semi-icons';

export type IconProps = {
  prefix?: string;
  name: string;
  size?: number | string;
} & Omit<BaseIconProps, 'icon' | 'height' | 'width'>;

const getName = (prefix, name) => {
  const colon = name.split(':');
  if (colon.length === 2) {
    return name;
  }
  return [prefix, name].join(':');
};

// Icons form the https://fonts.google.com/icons or https://icon-sets.iconify.design/
export const Icon: FunctionComponent<IconProps> = ({
  prefix = 'material-symbols',
  name,
  inline = true,
  size,
  ...delegated
}) => {
  const [data, setData] = useState(null);
  const iconSize = parseInt(`${size}`, 10) || 20;

  useEffect(() => {
    const iconName = getName(prefix, name);

    loadIcons([iconName], () => {
      const icon = getIcon(iconName);
      if (icon) {
        setData(icon);
      }
    });
  }, [prefix, name]);

  if (!data) {
    return <IconSpin spin style={{ fontSize: `${iconSize}px` }} />;
  }

  return <BaseIcon style={{}} icon={data} inline={inline} height={iconSize} width={iconSize} {...delegated} />;
};
