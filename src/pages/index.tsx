import { List, Empty, Button, Divider } from '@douyinfe/semi-ui';
import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';
import { Icon } from '@/components/Icon';

export default function Home() {
  const data = [
    { title: '最新技术栈', icon: 'star', description: '基于最新的NextJS 12，React 18，TypeScript等技术栈' },
    { title: '主题配置', icon: 'star', description: '内置暗黑模式的支持，以及可定制化主题' },
    { title: '丰富的组件', icon: 'star', description: '丰富的高阶组件和对常用组件的二次封装' },
    { title: '丰富的示例', icon: 'star', description: '常见的功能/插件代码实现' },
    { title: '权限管理', icon: 'star', description: '敬请期待' },
    { title: '敬请期待', icon: 'star', description: '敬请期待' },
  ];

  function renderItem(item) {
    return (
      <List.Item
        header={<Icon name={item.icon} size={24} />}
        main={
          <div>
            <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500, fontSize: '16px' }}>{item.title}</span>
            <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0 24px' }}>{item.description}</p>
          </div>
        }
      />
    );
  }

  return (
    <div className="container mx-auto max-w-screen-lg">
      <Empty
        image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
        darkModeImage={<IllustrationConstructionDark style={{ width: 150, height: 150 }} />}
        title="Resemi Admin"
        description="🎉 A beautiful react admin, using NextJS, TypeScript and SemiDesign."
      >
        <div className="text-center">
          <a className="inline-block" href="//github.com/resemi/resemi-admin" target="_blank" rel="noreferrer">
            <Button
              size="large"
              theme="solid"
              type="primary"
              iconPosition="right"
              icon={<Icon name="arrow-forward" size={24} />}
            >
              开始使用
            </Button>
          </a>
          <a className="inline-block" href="/login" target="_blank" style={{ marginLeft: 24 }}>
            <Button type="primary" size="large" iconPosition="right" icon={<Icon name="open-in-new" size={24} />}>
              在线预览
            </Button>
          </a>
        </div>
      </Empty>
      <Divider margin={50} />
      <div>
        <List
          grid={{
            gutter: 24,
            xs: 0,
            sm: 0,
            md: 12,
            lg: 8,
            xl: 8,
            xxl: 6,
          }}
          dataSource={data}
          renderItem={renderItem}
        />
      </div>
      <Divider margin={50} />
    </div>
  );
}
