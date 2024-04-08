'use client'
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useTransactionActions, useTransactionState } from '../providers/TransactionProvider';
import { ITransaction } from '../providers/TransactionProvider/context';



const columns = [
  { title: 'Book', dataIndex: 'book',key:'id',width: '25%',render:(_:any,record:ITransaction)=>(record.book?.title)},
  {
    title: 'User',
    dataIndex: 'userId',
    key: 'user',
    width: '25%',
  },
  {
    title: 'Due',
    dataIndex: 'overDue',
    key: 'due',
    width: '25%'
  },
];

const BorrowedBooksTable = () => {
  useEffect(() => {
    if (fetchtransaction) {
      fetchtransaction();
      
      
    }
    
  }, []); 
const status=useTransactionState();
const {fetchtransaction}=useTransactionActions();

  return (

      <Table
        dataSource={status.items}
        columns={columns}
        pagination={{ pageSize: 2 }}
        style={{width:500}}
      />

  );
};

export default BorrowedBooksTable;
