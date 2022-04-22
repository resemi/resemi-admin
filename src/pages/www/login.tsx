import React, { useState } from 'react';
import { Button, Card, Form, Space, useFormApi, Avatar } from '@douyinfe/semi-ui';
import { IconLock, IconUser } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
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
        <Button onClick={onChange}>useFormApi</Button>
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

  const pause = (millis) =>
    new Promise((resolve) => {
      setTimeout(resolve, millis);
    });
  async function onSubmit(values) {
    setLoading(true);
    await pause(3000);

    setLoading(false);
    if (values.username === 'anguer' && values.password === '123456') {
      await router.push('/');
    }
  }

  return (
    <div>
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
    </div>
  );
}
