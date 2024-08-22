"use client"
import React, { useState, useEffect } from 'react'
import { Input, Button, message } from 'antd'
import authScss from './auth.module.scss'
import useMessage from '../../../../utils/message'

interface AuthSignUpProps {
  email: string
  password: string
  username: string
  company: string
}

const Auth: React.FC<AuthSignUpProps> = ({ email, company, password, username }) => {
  // 邮箱正则
  let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let res = emailReg.test(email)
  
  const [formVisiable, setFormVisiable] = useState(true)

  const validateSignUpForm = () => {
    // useMessage(3, 'Please enter your email address!')
  }
  

  return (
    <div className={authScss.background}>
      <div className={authScss.signUpForm}>
        <h3>Assets Management</h3>
        <span className={authScss.line}></span>
        {formVisiable? (
          <>
            {/* sign up */}
            <ul className={authScss.commitForm}>
              <li className={authScss.commitFormItem}>
                <label htmlFor="Email">Email</label>
                <Input placeholder="Enter email" />
              </li>
              <li className={authScss.commitFormItem}>
                <label htmlFor="Email">Company</label>
                <Input placeholder="Enter company name" />
              </li>
              <li className={authScss.commitFormItem}>
                <label htmlFor="Email">Password</label>
                <Input.Password placeholder="Enter password" />
              </li>
              <li className={authScss.commitFormItem}>
                <label htmlFor="Email">Username</label>
                <Input placeholder="Enter username" />
              </li>
            </ul>
            <Button 
              type="primary" 
              className={authScss.commitButton} 
              size="large"
              onClick={validateSignUpForm}
            >
              Create an account
            </Button>
            <p className={authScss.commitFormInfo}>
              Already have an account? <a onClick={() => setFormVisiable(false)}>Sign in</a>
            </p>
          </>
        ) : (
          <>
            {/* sign in */}
            <ul className={authScss.commitForm}>
              <li className={authScss.commitFormItem}>
                <label htmlFor="Email">Email</label>
                <Input placeholder="Enter email" />
              </li>
              <li className={authScss.commitFormItem}>
                <label htmlFor="Email">Password</label>
                <Input.Password placeholder="Enter password" />
              </li>
            </ul>
            <Button type="primary" className={authScss.commitButton} size="large">
              Sign in
            </Button>
            <p className={authScss.commitFormInfo}>
              Don't have an account yet? <a onClick={() => setFormVisiable(true)}>Sign up</a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Auth