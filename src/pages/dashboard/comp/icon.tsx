import React from 'react';
import { Divider, Space } from '@douyinfe/semi-ui';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Icon, icons, prefix } from '@/components/Icon';
import { Markdown } from '@/components/Markdown';

export const getStaticProps: GetStaticProps = async () => {
  const content = `
    ~~~js
    import { Icon, icons, prefix } from '@/components/Icon';

    <Space spacing={24} wrap>
      {icons.slice(0, 20).map((icon) => (
        <Icon name={icon} prefix={prefix} size={36} key={icon} />
      ))}
    </Space>

    <Icon name="material-symbols:star" size={36} />
    ~~~;
  `;

  return {
    props: {
      content,
    },
  };
};

export default function Page({ content }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Space spacing={24} wrap>
        {icons.slice(0, 20).map((icon) => (
          <Icon name={icon} prefix={prefix} size={36} key={icon} />
        ))}
      </Space>
      <Divider margin={24} />
      <Icon name="material-symbols:star" size={36} />
      <Divider margin={24} />
      <Markdown>{content}</Markdown>
    </>
  );
}
