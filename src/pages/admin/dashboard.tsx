import { Space, Card, Button, Avatar, Typography, Rating } from '@douyinfe/semi-ui';
import { BasicLayout } from '@/layouts/default';

export default function Dashboard() {
  const { Meta } = Card;
  const { Text } = Typography;
  return (
    <BasicLayout title="Dashboard">
      <Space align="start">
        <Card
          style={{ maxWidth: 300 }}
          cover={
            <img
              alt="example"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg"
            />
          }
        >
          <Meta title="卡片封面" />
        </Card>

        <Card
          style={{ maxWidth: 340 }}
          title={
            <Meta
              title="Semi Doc"
              description="全面、易用、优质"
              avatar={
                <Avatar
                  alt="Card meta img"
                  size="default"
                  src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg"
                />
              }
            />
          }
          headerExtraContent={<Text link>More</Text>}
          cover={
            <img
              alt="example"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
            />
          }
          footerLine
          footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
          footer={
            <Space>
              <Button theme="borderless" type="primary">
                精选案例
              </Button>
              <Button theme="solid" type="primary">
                开始使用
              </Button>
            </Space>
          }
        >
          Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。
        </Card>
        <Card
          style={{ maxWidth: 300 }}
          actions={[
            // eslint-disable-next-line react/jsx-key
            <Rating size="small" defaultValue={4} />,
          ]}
          headerLine={false}
          cover={
            <img
              alt="example"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
            />
          }
        >
          <Meta title="Semi Doc" description="全面、易用、优质" />
        </Card>
      </Space>
    </BasicLayout>
  );
}
