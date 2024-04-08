'use client'
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Form, Input, Table, Popconfirm, Select, Modal } from 'antd';
import { useStyles } from './styles/style';
import { useBook, useBookState } from '../../providers/BookProvider';
import { ICategory, IShelf } from '../../providers/BookProvider/context';

const {Option}=Select;
const {confirm}=Modal;
type FormInstance<T> = import('antd').GetRef<typeof Form<T>>;
type InputRef = import('antd').InputRef;
type item ={
  id?:string,
  name:string
  shelfId?:string
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
  dataIndex: keyof ICategory;
  record: ICategory;
  handleSave: (record: ICategory) => void;
}

const ManageCategories:React.FC = () => {
  const state=useBookState();
  const {fetchShelf,updateShelf,createShelf,fetchCategory,deleteCategory}=useBook();
  
  useEffect(() => {
    if (fetchShelf) {
      fetchShelf();
    }
    if(fetchCategory){
      fetchCategory();
    }
  }, []); // Watch for changes in fetchShelf

  const { styles } = useStyles();

  // Update dataSource when BookShelf changes
  useEffect(() => {
    setDataSource(state?.BookCategory?? []);
  }, [state.BookCategory]);

  const [dataSource, setDataSource] = useState<item[]>([]);
 
  

  const [count, setCount] = useState(2);

  

  const handleDelete = (key: string) => {
    // Filter the dataSource to remove the item with the specified key
    const updatedDataSource = dataSource.filter((item) => item.id !== key);
    setDataSource(updatedDataSource); // Update the state with the new dataSource
  
    // Call the deleteShelf function to delete the shelf with the specified key
    if (deleteCategory) {
      deleteCategory(key);
    }
  };
  

  const handleAdd = () => {
    const newData: item = {

      name: `Name Your Category`,

    }
   
    if(dataSource)
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  }
  const handleSave = (row: IShelf) => {

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
  function handleStatusChange(value: number, record: IShelf) {
    // Handle the status change here, you might dispatch an action if using Redux or update the state
    var status={id:record.id,status:value}
    // if(changeBookState){changeBookState(status)}
}

  const showConfirm=(value: number, record: IShelf)=> {
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
  };

  const columns = [
    { title: 'Category', dataIndex: 'name', editable: true },
    {
      title: 'Shelves',
      dataIndex: 'shelves',
      key: 'shelves',
      width: '20%',
      render: (status: number, record:IShelf) => (
          <Select
              key={record.id}
              defaultValue={status}
              style={{ width: '100%' }}
              onChange={(value:number) => showConfirm(value, record)}
          >
            {state?.BookShelf?.map((item,index)=>(
               <Option key={index} value={index}>{item.name}</Option>
            ))}
             
             
          </Select>)
  },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_:any,record:item) =>
        (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id?record?.id:'')}>
            <a>Delete</a>
          </Popconfirm>
        ) 
    },
  ];

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Add categories!  </h1>
      <div >
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }} className={styles.button}>
        Add 
      </Button>
      <Table
       pagination={{ pageSize: 5 }}
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

export default ManageCategories;