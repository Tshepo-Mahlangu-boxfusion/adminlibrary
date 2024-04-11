import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IBookStateContext } from '../../providers/BookProvider/context';
import { useBook, useBookState } from '../../providers/BookProvider';

interface Book {
  id: string;
  isbn: string;
  title: string;
  description: string;
  authors: string[];
  quantity: number;
  url: string;
  categoryId: string;
}



const { Column } = Table;
const {confirm}=Modal;
const BookTable: React.FC<IBookStateContext> = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<Book>({} as Book);
  const [form] = Form.useForm();
  const {createBook,fetchBooks,deleteBook,fetchCategory,updateBook}=useBook();
  const state =useBookState();

  useEffect(()=>{
    if(fetchBooks)
        fetchBooks()

    if(fetchCategory)
        fetchCategory()
  },[])

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        const authorsArray = values.authors.split(',').map((author: string) => author.trim());
        const bookData: Book = { ...values, authors: authorsArray };
        createBook(bookData);
        form.resetFields();
        setVisible(false);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };
  const handleEdit = (record: Book) => {
    setVisible(true);
    form.setFieldsValue(record); // Set form fields with current record's data
    form
      .validateFields()
      .then((values) => {
        // Split authors only if it's defined
        const authorsArray = values.authors ? values.authors.split(',').map((author: string) => author.trim()) : [];
        const bookData: Book = { ...record, ...values, authors: authorsArray }; // Merge record with form values
        updateBook(bookData);
        form.resetFields();
        setVisible(false);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };
  
  const handleDelete = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete',
      onOk() {
        deleteBook(id);
      },
      onCancel() {
          return null;
      },
  });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Add Book
      </Button>
      <Modal
        title="Add/Edit Book"
        visible={visible}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
          onValuesChange={(changedValues, allValues) => setFormData(allValues as Book)}
        >
          <Form.Item
            name="isbn"
            label="ISBN"
            rules={[{ required: true, message: 'Please enter the ISBN' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the book title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="authors"
            label="Authors"
            rules={[{ required: true, message: 'Please enter at least one author' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter the quantity' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: 'Please enter the URL' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category ID"
            rules={[{ required: true, message: 'Please enter the category ID' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table pagination={{ pageSize: 8 }} dataSource={state.FetchBook} rowKey="id">
        <Column title="ISBN" dataIndex="isbn" key="isbn" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Authors" dataIndex="authors" key="authors" />
        <Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Column
        title="Category"
        dataIndex="categoryId"
        key="categoryId"
        render={(categoryId: string) => {
            const category = state.BookCategory?.find(item => item.id === categoryId);
            return category ? category.name : '';
        }}
        />
        <Column
          title="Action"
          key="action"
          render={(text: any, record: Book) => (
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button type="primary" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default BookTable;
