import React from "react";
import Link from 'next/link';
import {
  Button,
  Card,
  Form,
  Space,
  Row,
  Col,
} from '@douyinfe/semi-ui';

export default function Login() {
  return (
    <Row>
      <Col md={8} push={8}>
        <Card
          style={{ maxWidth: 340 }}
          title={<>Login</>}
          footerLine={ true }
          footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
          footer={
            <Space>
              <Link href={'/'}><Button theme='borderless' type='primary'>注册</Button></Link>
              <Link href={'/'}><Button theme='solid' type='primary'>登录</Button></Link>
            </Space>
          }
        >
          <Form>
            <Form.Select field="Role" label='角色' style={{ width: '100%' }}>
              <Form.Select.Option value="admin">管理员</Form.Select.Option>
              <Form.Select.Option value="user">普通用户</Form.Select.Option>
              <Form.Select.Option value="guest">访客</Form.Select.Option>
            </Form.Select>
            <Form.Input field='UserName' label='用户名' />
            <Form.Input field='Password' label='密码'/>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
