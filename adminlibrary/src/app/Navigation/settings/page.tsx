'use client'
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, ColorPicker } from 'antd';
import { ChromePicker } from 'react-color';
import { useConfigAction, useConfigState } from '../../../../providers/AppConfigProvider';
import { IConfig } from '../../../../providers/AppConfigProvider/context';
import WithAuthSuper from '../../../../HOC/withAuthSuper/page';

const FormDisabledDemo: React.FC = () => {
  const { createConfig, fetchConfig } = useConfigAction();
  const state = useConfigState();

  useEffect(() => {
    if (fetchConfig) fetchConfig();
  },[]);

  const [primaryColorVisible, setPrimaryColorVisible] = useState<boolean>(false);
  const [secondaryColorVisible, setSecondaryColorVisible] = useState<boolean>(false);
  const [color,setColor]=useState('');
  const [scolor,setsColor]=useState('');

  const handleSubmit = (values: IConfig) => {
    if(values.primaryColor==undefined){
      values.primaryColor=color;
    }
    if(values.secondaryColor==undefined){
      values.secondaryColor=color;
    }
    console.log(state)
    if (createConfig ) {
      const updatedValues = { ...values, id: state?.FetchConfig&&state.FetchConfig?.id };
      createConfig(updatedValues);
    }
  };

  return (
    <>
    <h1>Configure your library</h1>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '1200px' }}>
      
      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ minWidth: 900 }}
      >
        <Form.Item name="name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="welcomeMessage">
          <Input placeholder="Welcome Message" />
        </Form.Item>
        <Form.Item name="address">
          <Input placeholder="Address" />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="primaryColor">
              <Button onClick={() => setPrimaryColorVisible(true)}>Select Primary Color</Button>
              {primaryColorVisible &&<ColorPicker value={color} onChange={(e)=>setColor(e.toHexString())}/>}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="EmailAddress">
          <Input placeholder="Email Address" />
        </Form.Item>
        <Form.Item name="Contact">
          <Input placeholder="Contact" />
        </Form.Item>
        <Form.Item name="aboutMessage">
          <Input.TextArea placeholder="About Message" rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default FormDisabledDemo;
