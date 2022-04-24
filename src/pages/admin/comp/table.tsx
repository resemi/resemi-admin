import { useState, useMemo, useEffect } from 'react';
import { Table, Avatar } from '@douyinfe/semi-ui';
import dayjs from 'dayjs';

const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png';
const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    width: 400,
    render: (text) => {
      return (
        <div>
          <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: 12 }} />
          {text}
        </div>
      );
    },
    filters: [
      {
        text: 'Semi Design 设计稿',
        value: 'Semi Design 设计稿',
      },
      {
        text: 'Semi Pro 设计稿',
        value: 'Semi Pro 设计稿',
      },
    ],
    onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: '大小',
    dataIndex: 'size',
    width: 200,
    sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: (text) => `${text} KB`,
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    width: 200,
    render: (text, record) => {
      return (
        <div>
          <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
            {typeof text === 'string' && text.slice(0, 1)}
          </Avatar>
          {text}
        </div>
      );
    },
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    width: 200,
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: (value) => {
      return dayjs(new Date(value)).format('YYYY-MM-DD');
    },
  },
];

const DAY = 24 * 60 * 60 * 1000;

export default function TablePage() {
  const [dataSource, setData] = useState([]);

  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys, selectedRows) => {
        // eslint-disable-next-line no-console
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Michael James', // Column configuration not to be checked
        name: record.name,
      }),
    }),
    [],
  );
  const scroll = useMemo(() => ({ y: 500 }), []);

  const getData = () => {
    const data = [];
    for (let i = 0; i < 46; i += 1) {
      const isSemiDesign = i % 2 === 0;
      const randomNumber = (i * 1000) % 199;
      data.push({
        key: `${i}`,
        name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
        owner: isSemiDesign ? '姜鹏志' : '郝宣',
        size: randomNumber,
        updateTime: new Date().valueOf() + randomNumber * DAY,
        avatarBg: isSemiDesign ? 'grey' : 'red',
      });
    }
    return data;
  };

  useEffect(() => {
    const data = getData();
    setData(data);
  }, []);

  return <Table columns={columns} resizable dataSource={dataSource} rowSelection={rowSelection} scroll={scroll} />;
}
