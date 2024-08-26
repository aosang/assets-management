'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button } from 'antd'
import { emailRegFunc, passwordRegFunc } from '@/utils/validate'
import authScss from './auth.module.scss'
import useMessage from '@/utils/message'


type formCollect = {
  email: string,
  company: string,
  password: string,
  username: string
}

const Auth: React.FC = () => { 
  const router = useRouter()
  const [formVisiable, setFormVisiable] = useState(false)
  const [formState, setFormState] = useState<formCollect>({
    email: '', 
    company: '', 
    password: '',
    username: ''
  })

  // 注册提交表单
  const validateSignUpForm = (type: number) => {
    const { email, password, company, username } = formState
    if(type === 1) {
      if(!emailRegFunc(email)) {
        useMessage(3, 'Please enter your email address!','error')
      }else if(!passwordRegFunc(password)) {
        useMessage(3, 'Please enter your password!','error')
      }else if(!company) {
        useMessage(3, 'Please enter your company name!','error')
      }else if(!username) {
        useMessage(3, 'Please enter your username!','error')
      }else {
        
      }
    }else {
      if(!emailRegFunc(email)) {
        useMessage(3, 'Please enter your email address!','error')
      }else if(!passwordRegFunc(password)) {
        useMessage(3, 'Please enter your password!','error')
      }else {
        
      }
    }
  }

  // 邮箱
  const changeEmailValue = (e: any) => {
    setFormState({...formState, email: e.target.value})
  }

  // 密码
  const changePasswordValue = (e: any) => {
    setFormState({...formState, password: e.target.value})
  }


  const changeFormVisible = (visible: boolean) => {
    setFormState({...formState, email: '', password: '', company: '', username: ''})
    setFormVisiable(visible)
  }

  return (
    <div className={authScss.background}>
      <div className={authScss.signUpForm}>
        <h3>Assets Management</h3>
        <span className={authScss.line}></span>
        {formVisiable? (
          <>
            {/* sign up */}
            <form>
              <ul className={authScss.commitForm}>
                <li className={authScss.commitFormItem}>
                  <label htmlFor="Email">Email</label>
                  <Input 
                    placeholder="Enter email"
                    name='email'
                    type='email'
                  />
                </li>
                <li className={authScss.commitFormItem}>
                  <label htmlFor="Email">Password</label>
                  <Input.Password 
                    placeholder="Enter password"
                    name='password'
                    type='password'
                  />
                </li>
              </ul>
              <Button 
                type="primary" 
                className={authScss.commitButton} 
                size="large"
                onClick={() => validateSignUpForm(1)}
              >
                Create an account
              </Button>
            </form>
            <p className={authScss.commitFormInfo}>
              Already have an account? 
              <a onClick={() => changeFormVisible(false)}>Sign in</a>
            </p>
          </>
        ) : (
          <>
            {/* sign in */}
            <form>
              <ul className={authScss.commitForm}>
                <li className={authScss.commitFormItem}>
                  <label htmlFor="Email">Email</label>
                  <Input 
                    placeholder="Enter email" 
                    value={formState.email}
                    onChange={changeEmailValue} 
                  />
                </li>
                <li className={authScss.commitFormItem}>
                  <label htmlFor="Email">Password</label>
                  <Input.Password 
                    placeholder="Enter password" 
                    value={formState.password}
                    onChange={changePasswordValue} 
                  />
                </li>
              </ul>
              <Button 
                type="primary" 
                className={authScss.commitButton} 
                size="large"
                onClick={() => validateSignUpForm(2)}
              >
                Sign in
              </Button>
            </form>
            <p className={authScss.commitFormInfo}>
              Don't have an account yet? <a onClick={() => changeFormVisible(true)}>Sign up</a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Auth