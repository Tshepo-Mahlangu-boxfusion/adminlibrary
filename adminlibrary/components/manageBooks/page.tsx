'use client'
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Select, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined,UploadOutlined } from '@ant-design/icons';
import { IBook, IBookStateContext } from '../../providers/BookProvider/context';
import { useBook, useBookState } from '../../providers/BookProvider';

interface Book {
  id: string;
  isbn: string;
  title: string;
  description: string;
  authors: string[];
  quantity: number;
  file?:string;
  image?:string;
  url: string;
  categoryId: string;
}

const { Column } = Table;
const { confirm } = Modal;
const { Option } = Select;

const BookTable: React.FC<IBookStateContext> = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<IBook>({} as IBook);
  const [form] = Form.useForm();
  const { createBook, fetchBooks, deleteBook, fetchCategory, updateBook } = useBook();
  const state = useBookState();

  useEffect(() => {
    if (fetchBooks) fetchBooks();

    if (fetchCategory) fetchCategory();
  }, []);

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
        const formData = new FormData();
        console.log(values?.imageUrl.file.originFileObj)
        formData.append('imageUrl',values?.imageUrl.file.originFileObj)
        const authorsArray = values.authors.split(',').map((author: string) => author.trim());
        const bookData: IBook = { ...values, authors: authorsArray };
        if(createBook){createBook({...bookData,file:values?.imageUrl.file.originFileObj})}
        setFormData(bookData)
        form.resetFields();
        setVisible(false);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  }; 

  const handleEdit = (record: IBook) => {
    setVisible(true);
    form.setFieldsValue(record); // Set form fields with current record's data
    form
      .validateFields()
      .then((values) => {
        // Split authors only if it's defined
        const authorsArray = values.authors ? values.authors.split(',').map((author: string) => author.trim()) : [];
        const bookData: IBook = { ...record, ...values, authors: authorsArray }; // Merge record with form values
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
      <Modal title="Edit Book" visible={visible} onCancel={handleCancel} onOk={form.submit}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
          onValuesChange={(changedValues, allValues) => setFormData(allValues as IBook)}
        >
          <Form.Item name="isbn" label="ISBN" rules={[{ required: true, message: 'Please enter the ISBN' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the book title' }]}>
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
                      label="Upload Image:"
                      name='imageUrl'
                      >
                      <Upload style={{marginLeft:10}}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: 'Please select the category' }]}
          >
            <Select placeholder="Please select a category">
              {state.BookCategory?.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
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
            const category = state.BookCategory?.find((item) => item.id === categoryId);
            return category ? category.name : '';
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(text: any, record: IBook) => (
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

