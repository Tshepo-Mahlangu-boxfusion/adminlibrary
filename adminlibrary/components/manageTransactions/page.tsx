'use client'
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Form, Input, Table, Popconfirm, Select,Modal } from 'antd';
import {DeleteOutlined}  from '@ant-design/icons';
import { useTransactionActions, useTransactionState } from '../../providers/TransactionProvider';
import { ITransaction } from '../../providers/TransactionProvider/context';
import { useStyles } from './styles/style';

const {Option}=Select;
const {confirm}=Modal;
type FormInstance<T> = import('antd').GetRef<typeof Form<T>>;
type InputRef = import('antd').InputRef;
type item ={
  id?:string,
  name:string
}
const EditableContext = React.createContext<FormInstance<ITransaction> | null>(null);

const EditableRow: React.FC<{ index: number }> = ({ index, ...props }) => {
  const [form] = Form.useForm<ITransaction>();
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
  dataIndex: keyof ITransaction;
  record: ITransaction;
  handleSave: (record: ITransaction) => void;
}

const ManageTransactions:React.FC = () => {
  useEffect(() => {
    if (fetchtransaction) {
      fetchtransaction();
      
    }
    
  }, []); 


const status=useTransactionState();
const {fetchtransaction,updateTransaction,deleteTransaction}=useTransactionActions();
  const [dataSource, setDataSource] = useState<ITransaction[]>([]);
  const [count, setCount] = useState(2);
  const {styles}=useStyles();

  

  const handleDelete = (key: string) => {
    // Filter the dataSource to remove the item with the specified key
    const updatedDataSource = dataSource.filter((item) => item.id !== key);
    setDataSource(updatedDataSource); // Update the state with the new dataSource
  
    // Call the deleteShelf function to delete the shelf with the specified key
    if (deleteTransaction) {
      deleteTransaction(key);
    }
  };
  
  function handleStatusChange(value: number, record: ITransaction) {
    // Handle the status change here, you might dispatch an action if using Redux or update the state
    var status={id:record.id,status:value}
    record.status=value;
   if(updateTransaction){updateTransaction(record)}
}

  const showConfirm=(value: number, record: ITransaction)=> {
    confirm({
        title: 'Do you want to save changes?',
        onOk() {
            handleStatusChange(value, record);
        },
        onCancel() {
            // Handle cancel action if needed
        },
    });
  }
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }
  const columns = [
    { title: 'Ref', dataIndex: 'ref' },
    { title: 'Book', dataIndex: 'book',key:'id',render:(_:any,record:ITransaction)=>(record.book?.title)},
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'shelves',
      width: '10%',
      render: (status: number, record:ITransaction) => (
          <Select
              key={record.id}
              defaultValue={status}
              style={{ width: '100%' }}
              onChange={(value:number) => showConfirm(value, record)}
          >
            
          <Option key={record.id} value={0}>Ready be to Collected</Option>
          <Option key={record.id} value={1}>Collected</Option>
          <Option key={record.id} value={2}>Returned</Option>
          <Option key={record.id} value={3}>Overdue</Option>  
          </Select>)
  },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_:any,record:ITransaction) =>
        (
          <Popconfirm  title onConfirm={() => handleDelete(record.id?record?.id:'')}>
            <a>Delete</a>
          </Popconfirm>
        ) 
    },
  ];


  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Manage Transactions</h1>
      <div >
      
      <Table
        className={styles.table}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={status.items&&status.items}
        pagination={{ pageSize: 3 }}
        columns={columns.map((col) => ({
          ...col
        }))}
      />
      </div>
    </div>
  );
}

export default ManageTransactions;