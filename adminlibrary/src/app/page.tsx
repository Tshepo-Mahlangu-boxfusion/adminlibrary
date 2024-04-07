'use client';
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useStyles } from './styles';
import { ILogin } from '../../providers/LoginProviders/context';
import { useUser } from '../../providers/LoginProviders';
const Login = () => {
    const { loginUser } = useUser();
    const { styles } = useStyles();
    
   

    const handleSubmit = async (values:ILogin) => {
        console.log('Received values of form: ', values);
        if(loginUser){
            loginUser (values);
          }

    };
    

    return (
      <div className={styles.main}>
        <div className={styles.background}>
        <div className={`${styles.shape} ${styles["shape:first-child"]}`}></div>
         <div className={`${styles.shape} ${styles["shape:last-child"]}`}></div>

        </div>
        <div className={styles.form}>
            <Form onFinish={handleSubmit}>
              <h3 className={styles.loginHeader}>Admin Login</h3>
            <Form.Item
              name="userNameOrEmailAddress"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className={styles.input}/>
            </Form.Item>
           
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" className={styles.input}/>
            </Form.Item>
            <Form.Item>
              <Button  htmlType="submit" className={styles.button} >
                Log in
              </Button>
              <br /><br />   
            </Form.Item>
          </Form>
        </div>
      </div>
    );
}

export default Login;
