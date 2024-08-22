"use client"
import {Form, Input, Button} from 'antd'
import signUpScss from  './signUp.module.scss'

const signUp = () => {
  return (
    <div className={signUpScss.background}>
      <div className={signUpScss.signUpForm}>
        <h3>Assets Management</h3>
        <span className={signUpScss.line}></span>
        <>
          <Form 
            layout="vertical" 
            className={signUpScss.commitForm}
            autoComplete="off"
          >
            <Form.Item 
              label="Email"
              name='email' 
              className={signUpScss.commitFormItem}
              rules={[{required: true, message: 'Please input your email!'}]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item 
              label="Company"
              name='company' 
              className={signUpScss.commitFormItem}
              rules={[{required: true, message: 'Please input your company name!'}]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
            <Form.Item 
              label="Password"
              name='password' 
              className={signUpScss.commitFormItem}
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input placeholder="Enter password" />
            </Form.Item>
            <Form.Item 
              label="Username"
              name='username' 
              className={signUpScss.commitFormItem}
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                className={signUpScss.commitButton}
                size="large">
                  Create an account
              </Button>
            </Form.Item> 
          </Form>
          <p>Already have an account? <a>Sign in</a></p> 
        </>
      </div>
    </div>
  )
}
 
export default signUp