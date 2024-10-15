'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button } from 'antd'
import { emailRegFunc, passwordRegFunc } from '@/utils/pubFunProvider'
import { supabase } from '@/utils/clients'
import { formCollect } from '@/utils/dbType'
import authScss from './auth.module.scss'
import useMessage from '@/utils/message'
import Verify from './components/Verify'
import MaskLoad from './components/MaskLoad'

const Auth: React.FC = () => {
  const router = useRouter()
  const [mySession, setMySession] = useState<any>('')
  const [isVerify, setIsVerify] = useState<boolean>(false)
  const [formVisiable, setFormVisiable] = useState(false)

  const [formState, setFormState] = useState<formCollect>({
    email: '',
    password: '',
    company: '',
    username: '',
  })

  const getSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (session) {
      setMySession(session)
      router.push('/Home')
    }
  }

  // 回车登录
  const onPressEnterSigin = (e:any) => { 
    if(!formVisiable) {
      if(e.key === 'Enter') validateSignUpForm(2)
    } else {
      if(e.key === 'Enter') validateSignUpForm(1)
    }
  }

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
        const { data, error } = await supabase.from('profiles').select('username, email')
        if (data![0]?.username && username === data![0]?.username) {
          useMessage(2, 'Username already exists!', 'error')
        } else if (data![0]?.email && email === data![0]?.email) {
          useMessage(2, 'Email already exists!', 'error')
        } else {
          useMessage(2, 'Sign up successfully!', 'success')
          setIsVerify(true)
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { username, company },
              emailRedirectTo: 'http://localhost:3000/Home'
            }
          })
          if (error) return useMessage(2, error.message, 'error')
        }
      }
    } else {
      if (!emailRegFunc(email)) {
        useMessage(2, 'Please enter the correct Email.', 'error')
      } else if (!passwordRegFunc(password)) {
        useMessage(2, 'Please enter the correct password.', 'error')
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
            if (error.message === 'Invalid login credentials')
              useMessage(2, 'Incorrect email or password.', 'error')
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

  const sendResetPasswordEmail = async () => {
    const { data,  error } = await supabase.auth.resetPasswordForEmail('3001335841@qq.com', {
      redirectTo: 'https://www.baidu.com',
    })
    if (data) {
      useMessage(2, 'Reset password email sent!','success')
    }else {
      useMessage(2, error!.message, 'error')
    }
  }

  useEffect(() => {
    getSession()
  })

  return (
    <>
      <MaskLoad />
      {!mySession && <div>
        {isVerify ? <Verify emailAddress={formState.email} /> : (
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
                          value={formState.email}
                          onChange={changeEmailValue}
                          onKeyDown={onPressEnterSigin}
                        />
                      </li>
                      <li className={authScss.commitFormItem}>
                        <label htmlFor="Email">Password</label>
                        <Input.Password
                          placeholder="Enter password"
                          value={formState.password}
                          onChange={changePasswordValue}
                          onKeyDown={onPressEnterSigin}
                        />
                      </li>
                      <li className={authScss.commitFormItem}>
                        <label htmlFor="Company">Company</label>
                        <Input
                          placeholder="Company name"
                          value={formState.company}
                          onChange={changeCompanyValue}
                          onKeyDown={onPressEnterSigin}
                        />
                      </li>
                      <li className={authScss.commitFormItem}>
                        <label htmlFor="Username">Username</label>
                        <Input
                          placeholder="Enter username"
                          value={formState.username}
                          onChange={changeUsernameValue}
                          onKeyDown={onPressEnterSigin}
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
                          onKeyDown={onPressEnterSigin}
                        />
                      </li>
                      <li className={authScss.commitFormItem}>
                        <label htmlFor="Password">Password</label>
                        <Input.Password
                          placeholder="Enter password"
                          value={formState.password}
                          onChange={changePasswordValue}
                          onKeyDown={onPressEnterSigin}
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
                    <Button onClick={sendResetPasswordEmail}>Reset password</Button>
                  </form>
                  <p className={authScss.commitFormInfo}>
                    Don't have an account yet? <a onClick={() => changeFormVisible(true)}>Sign up</a>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>}
    </>

  )
}

export default Auth