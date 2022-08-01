import { Space, Card, Avatar, Rating } from '@douyinfe/semi-ui';

export default function Index() {
  const { Meta } = Card;
  const list = Array.from(new Array(10).keys());
  return (
    <Space align="start" wrap spacing={20}>
      {list.map((t) => {
        return (
          <Card
            style={{ maxWidth: 300 }}
            key={t}
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
            actions={[<Rating size="small" defaultValue={4} />]}
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
        );
      })}
    </Space>
  );
}
