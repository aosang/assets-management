"use client"

import Image from "next/image";
import React from "react";
import {Form, Input, Button} from 'antd'
import styles from  './common.module.scss'

const Home: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.signUpForm}>
        <h3>Assets Management</h3>
        <>
          <Form 
            layout="vertical" 
            className={styles.commitForm}
            autoComplete="off"
          >
            <Form.Item 
              label="Email"
              name='email' 
              className={styles.commitFormItem}
              rules={[{required: true, message: 'Please input your email!'}]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item 
              label="Company"
              name='company' 
              className={styles.commitFormItem}
              rules={[{required: true, message: 'Please input your company name!'}]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
            <Form.Item 
              label="Password"
              name='password' 
              className={styles.commitFormItem}
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input placeholder="Enter password" />
            </Form.Item>
            <Form.Item 
              label="Username"
              name='username' 
              className={styles.commitFormItem}
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                className={styles.commitButton}
                size="large">
                  Create an account
              </Button>
            </Form.Item> 
          </Form> 
        </>
      </div>
    </div>
  )
}

export default Home