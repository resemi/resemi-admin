import React, { useState } from 'react';
import { Button, Card, Form, Space, useFormApi, Avatar, Toast } from '@douyinfe/semi-ui';
import { IconLock, IconUser } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCsrfToken, signIn } from 'next-auth/react';
import { ClientOnly } from '@/components/ClientOnly';
import { PageEnum } from '@/enums/app.enum';

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function Login({ csrfToken }) {
  const router = useRouter();
  const [initValues] = useState({
    username: 'anguer',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react/no-unstable-nested-components
  function ComponentUsingFormApi() {
    const formApi = useFormApi();
    function onChange() {
      formApi.setValue('password', '123456');
    }
    return (
      <Space>
        <Button onClick={onChange}>Set Password</Button>
        <Link href="/register">
          <Button theme="borderless" type="primary">
            注册
          </Button>
        </Link>
        <Button theme="solid" type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Space>
    );
  }

  async function onSubmit(values) {
    setLoading(true);
    const res = await signIn('credentials', {
      ...values,
      callbackUrl: router.query.callbackUrl || PageEnum.Admin,
      redirect: false,
    });
    setLoading(false);
    if (res && res.error) {
      Toast.error(res.error);
    } else if (res.ok) {
      await router.push(res.url);
    }
  }

  return (
    <ClientOnly>
      <Form initValues={initValues} onSubmit={onSubmit}>
        <Card
          style={{ width: 360 }}
          title={
            <Card.Meta
              title="Login"
              description="Username:anguer;Password:123456"
              avatar={<Avatar color="red">An</Avatar>}
            />
          }
          footerLine
          footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
          footer={<ComponentUsingFormApi />}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Form.Input
            field="username"
            label="用户名"
            rules={[{ required: true, message: '必填' }]}
            prefix={<IconUser />}
          />
          <Form.Input
            field="password"
            label="密码"
            rules={[{ required: true, message: '必填' }]}
            mode="password"
            prefix={<IconLock />}
          />
        </Card>
      </Form>
    </ClientOnly>
  );
}
