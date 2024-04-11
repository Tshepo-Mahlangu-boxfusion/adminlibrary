'use client'
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Form, Input, Table, Popconfirm } from 'antd';
import {DeleteFilled,PlusCircleFilled} from '@ant-design/icons';
import { useStyles } from './styles/style';
import { useBook, useBookState } from '../../providers/BookProvider';
import { IShelf } from '../../providers/BookProvider/context';
import { Icon } from '@material-ui/core';


type FormInstance<T> = import('antd').GetRef<typeof Form<T>>;
type InputRef = import('antd').InputRef;
type item ={
  id?:string,
  name:string
}
const EditableContext = React.createContext<FormInstance<IShelf> | null>(null);

const EditableRow: React.FC<{ index: number }> = ({ index, ...props }) => {
  const [form] = Form.useForm<item>();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `${title} is required.` }]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof IShelf;
  record: IShelf;
  handleSave: (record: IShelf) => void;
}

const ManageShelves:React.FC = () => {
  const state=useBookState();
  const {fetchShelf,deleteShelf,updateShelf,createShelf}=useBook();
  
  useEffect(() => {
    if (fetchShelf) {
      fetchShelf();
    }
  }, []); // Watch for changes in fetchShelf

  const { styles } = useStyles();

  // Update dataSource when BookShelf changes
  useEffect(() => {
    setDataSource(state?.BookShelf ?? []);
  }, [state.BookShelf]);

  const [dataSource, setDataSource] = useState<item[]>([]);
 
  

  const [count, setCount] = useState(2);

  

  const handleDelete = (key: string) => {
    // Filter the dataSource to remove the item with the specified key
    const updatedDataSource = dataSource.filter((item) => item.id !== key);
    setDataSource(updatedDataSource); // Update the state with the new dataSource
  
    // Call the deleteShelf function to delete the shelf with the specified key
    if (deleteShelf) {
      deleteShelf(key);
    }
  };
  

  const handleAdd = () => {
    const newData: item = {

      name: `Name your shelf`,

    }
   
    if(dataSource)
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  }
  const handleSave = (row: IShelf) => {
    console.log(row);
    if (dataSource) {
      if(row.id==null){
        if(createShelf)
          createShelf(row)
      }
      const newData = [...dataSource];
      const index = newData.findIndex((item) => row.id === item.id);
      const item = newData[index];
  
      // Assuming updateShelf is a function to update the shelf, pass the row.id to updateShelf
      
      if (row.id!==null&&updateShelf) {
        updateShelf(row);
      }
      console.log(row)
  
      newData.splice(index, 1, { ...item, ...row });
      setDataSource(newData);
    }
  };
  


  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    { title: 'Name', dataIndex: `name`, editable: true },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '2%',
      render: (_:any,record:item) =>
        (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id?record?.id:'')}>
            <a><DeleteFilled /></a>
          </Popconfirm>
        ) 
    },
  ];

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Build Your Shelf</h1>
      <div >
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }} className={styles.button} icon={<PlusCircleFilled />}>
        Add
      </Button>
      <Table
        className={styles.table}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns.map((col) => ({
          ...col,
          onCell: (record: item) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        }))}
      />
      </div>
    </div>
  );
}

export default ManageShelves;