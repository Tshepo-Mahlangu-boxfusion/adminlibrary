'use client'

import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { useStyles } from './styles/style';
import { IShelf } from '../../../providers/BookProvider/context';
import { useBook } from '../../../providers/BookProvider';

type FieldType = {
  name?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Shelves = () => {
const { createShelf } = useBook();
const {styles}=useStyles();

const onFinish = (values:IShelf) => {
  console.log('Success:', values);
  if(createShelf){
    createShelf(values);
  }
};
  return (
    <div className={styles.main}>
        <h1>Manage Shelves</h1>
        <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input the name of the shelf!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default Shelves