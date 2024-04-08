'use client'
import React, { useState } from 'react';
import { Form, Input, Checkbox, Row, Col, Button } from 'antd';
import { ChromePicker} from 'react-color';
import { useConfig, useConfigState } from '../../../../providers/AppConfigProvider';
import { IConfig } from '../../../../providers/AppConfigProvider/context';
import WithAuthSuper from '../../../../HOC/withAuthSuper/page';


const FormDisabledDemo: React.FC = () => {
 
    const state = useConfigState();
  const { createConfig } = useConfig();


  const [formData, setFormData] = useState({
    name: '',
    welcomeMessage: '',
    address: '',
    primaryColor: '#ffffff',
    secondaryColor: '#ffffff',
    emailAddress: '',
    contact: '',
    aboutMessage: ''
  });

  // Local state to control the visibility of color pickers
  const [primaryColorVisible, setPrimaryColorVisible] = useState<boolean>(false);
  const [secondaryColorVisible, setSecondaryColorVisible] = useState<boolean>(false);

  const handleChange = (fieldName: string, value: string | boolean) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleSubmit = (values:IConfig) => {
    // Logic to save form data goes here
    
    createConfig && createConfig(values);
 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'1200px' }}>
      <Form
         onFinish={handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item>
          <Input placeholder="Name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Welcome Message" value={formData.welcomeMessage} onChange={(e) => handleChange('welcomeMessage', e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item>
              <Button onClick={() => setPrimaryColorVisible(true)}>Select Primary Color</Button>
              {primaryColorVisible && (
                <ChromePicker
                  color={formData.primaryColor}
                  onChange={(color) => handleChange('primaryColor', color.hex)}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button onClick={() => setSecondaryColorVisible(true)}>Select Secondary Color</Button>
              {secondaryColorVisible && (
                <ChromePicker
                  color={formData.secondaryColor}
                  onChange={(color) => handleChange('secondaryColor', color.hex)}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Input placeholder="Email Address" value={formData.emailAddress} onChange={(e) => handleChange('emailAddress', e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Contact" value={formData.contact} onChange={(e) => handleChange('contact', e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Input.TextArea placeholder="About Message" value={formData.aboutMessage} rows={4} onChange={(e) => handleChange('aboutMessage', e.target.value)} />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" >Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormDisabledDemo;
