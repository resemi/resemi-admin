import {
  Pagination,
  DatePicker,
  TimePicker,
  Popconfirm,
  Table,
  Modal,
  Button,
  Select,
  Transfer,
} from 'antd';
import React, { useState } from 'react';

const {Option} = Select;
const {RangePicker} = DatePicker;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

export default function Page() {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const info = () => {
    Modal.info({
      title: 'some info',
      content: 'some info',
    });
  };
  const confirm = () => {
    Modal.confirm({
      title: 'some info',
      content: 'some info',
    });
  };

  return (
    <div className="locale-components">
      <div className="example">
        <Pagination defaultCurrent={1} total={50} showSizeChanger/>
      </div>
      <div className="example">
        <Select showSearch style={{width: 200}}>
          <Option value="jack">jack</Option>
          <Option value="lucy">lucy</Option>
        </Select>
        <DatePicker/>
        <TimePicker/>
        <RangePicker style={{width: 200}}/>
      </div>
      <div className="example">
        <Button type="primary" onClick={showModal}>
          Show Modal
        </Button>
        <Button onClick={info}>Show info</Button>
        <Button onClick={confirm}>Show confirm</Button>
        <Popconfirm title="Question?">
          <a href="#">Click to confirm</a>
        </Popconfirm>
      </div>
      <div className="example">
        <Transfer dataSource={[]} showSearch targetKeys={[]} render={item => item.title}/>
      </div>
      <div className="example">
        <Table dataSource={[]} columns={columns}/>
      </div>
      <Modal title="Locale Modal" visible={visible} onCancel={hideModal}>
        <p>Locale Modal</p>
      </Modal>
    </div>
  );
}
