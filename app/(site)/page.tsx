'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button } from 'antd'
import { emailRegFunc, passwordRegFunc } from '@/utils/validate'
import { supabase } from '@/utils/clients'
import authScss from './auth.module.scss'
import useMessage from '@/utils/message'
import Verify from './components/Verify'

type formCollect = {
  email: string,
  password: string,
  username: string,
  company: string
}

const Auth: React.FC = () => {
  const router = useRouter()
  const [isVerify, setIsVerify] = useState<boolean>(false)

  const [formVisiable, setFormVisiable] = useState(false)
  const [formState, setFormState] = useState<formCollect>({
    email: '',
    password: '',
    company: '',
    username: '',
  })

  // 注册提交表单
  const validateSignUpForm = async (type: number) => {
    const { email, password, company, username } = formState
    if (type === 1) {
      if (!emailRegFunc(email)) {
        useMessage(2, 'Please enter your email address!', 'error')
      } else if (!passwordRegFunc(password)) {
        useMessage(2, 'Please enter your password!', 'error')
      } else if (!company) {
        useMessage(2, 'Please enter your company name!', 'error')
      } else if (!username) {
        useMessage(2, 'Please enter your username!', 'error')
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              company,
            },
            emailRedirectTo: 'http://localhost:3000/Home'
          }
        })
        try {
          if (data.user) {
            useMessage(2, 'Sign up successfully!', 'success')
            setIsVerify(true)

          } else if (error) {
            useMessage(2, error.message, 'error')
          }
        } catch (error) {
          throw error
        }
      }
    } else {
      if (!emailRegFunc(email)) {
        useMessage(2, 'Please enter your email address!', 'error')
      } else if (!passwordRegFunc(password)) {
        useMessage(2, 'Please enter your password!', 'error')
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        try {
          if (data.session) {
            useMessage(2, 'Login in successfully!', 'success')
            router.push('/Home')
          } else if (error) {
            useMessage(2, error.message, 'error')
          }
        } catch (error) {
          throw error
        }
      }
    }
  }

  // 邮箱
  const changeEmailValue = (e: any) => {
    setFormState({ ...formState, email: e.target.value })
  }

  // 密码
  const changePasswordValue = (e: any) => {
    setFormState({ ...formState, password: e.target.value })
  }

  // 用户名
  const changeUsernameValue = (e: any) => {
    setFormState({ ...formState, username: e.target.value })
  }

  const changeCompanyValue = (e: any) => {
    setFormState({ ...formState, company: e.target.value })
  }

  const changeFormVisible = (visible: boolean) => {
    setFormState({ ...formState, email: '', password: '', company: '', username: '' })
    setFormVisiable(visible)
  }

  return (
    <>
      {isVerify? <Verify emailAddress={formState.email} /> : (
        <div className={authScss.background}>
          <div className={authScss.signUpForm}>
            <h3>Assets Management</h3>
            <span className={authScss.line}></span>
            {formVisiable ? (
              <>
                {/* sign up */}
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
                    <li className={authScss.commitFormItem}>
                      <label htmlFor="Company">Company</label>
                      <Input
                        placeholder="Company name"
                        value={formState.company}
                        onChange={changeCompanyValue}
                      />
                    </li>
                    <li className={authScss.commitFormItem}>
                      <label htmlFor="Username">Username</label>
                      <Input
                        placeholder="Enter username"
                        value={formState.username}
                        onChange={changeUsernameValue}
                      />
                    </li>
                  </ul>
                  <Button
                    type="primary"
                    className={authScss.commitButton}
                    size="large"
                    onClick={() => validateSignUpForm(1)}
                    style={{
                      background: 'linear-gradient(135deg, #6253E1, #04BEFE)',
                      border: 'none',
                    }}
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
      )}

    </>

  )
}

export default Auth