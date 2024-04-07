'use client'
import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, InputNumber, Select } from 'antd';
import { useStyles } from './styles/style';

const { Option } = Select;

const ManageBooks = () => {
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]); // Assuming you have an array of categories

  const onFinish = (values:any) => {
    console.log('Received values:', values);
    // Handle form submission here, e.g., sending data to backend
  };

  const handleCategoryChange = (value:any) => {
    console.log(`Selected category: ${value}`);
    // Handle category selection here if needed
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Pack Your Book</h1>
      <Form
        form={form}
        name="addBookForm"
        onFinish={onFinish}
        layout="vertical"
        className={styles.form}
      >
        <Form.Item
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Category" onChange={handleCategoryChange}>
            {/* {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))} */}
          </Select>
        </Form.Item>
        <Form.Item
          name="isbn"
          rules={[{ required: true, message: 'Please input the ISBN!' }]}
        >
          <Input placeholder="ISBN" />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <InputNumber min={1} placeholder="Quantity" />
        </Form.Item>
        <Form.Item
          name="authors"
          rules={[{ required: true, message: 'Please input the authors!' }]}
        >
          <Input placeholder="Authors" />
        </Form.Item>
        <Form.Item
          name="publishedDate"
          rules={[{ required: true, message: 'Please input the published date!' }]}
        >
          <DatePicker placeholder="Published Date" />
        </Form.Item>
        <Form.Item
          name="url"
          rules={[{ required: true, message: 'Please input the URL!' }]}
        >
          <Input placeholder="URL" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.button}>
            Add Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ManageBooks;
