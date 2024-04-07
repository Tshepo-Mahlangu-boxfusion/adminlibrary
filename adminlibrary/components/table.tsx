import React from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    title: 'Item 1',
    user: 'User 1',
    due: '2024-04-10',
  },
  {
    key: '2',
    title: 'Item 2',
    user: 'User 2',
    due: '2024-04-15',
  },
  {
    key: '3',
    title: 'Item 3',
    user: 'User 3',
    due: '2024-04-20',
  },
];

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Due',
    dataIndex: 'due',
    key: 'due',
  },
];

const BorrowedBooksTable = () => {
  return (

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />

  );
};

export default BorrowedBooksTable;
