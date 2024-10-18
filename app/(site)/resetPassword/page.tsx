'use client'
import { useEffect } from 'react'
import { Input, Button } from 'antd'
import { supabase } from '@/utils/clients'

const resetBg: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100vh',
  background: '#2644a6'
}

const resetBox: React.CSSProperties = {
  transform: 'translate(-50%, -50%)',
}

const resetPassword = () => {
  const sendResetEmailInfo = async () => {
    const {data, error} = await supabase.auth.resetPasswordForEmail('3001335841@qq.com', {
      redirectTo: 'http://localhost:3000/resetPassword/'
    })
    if (error) {
      console.error('发送密码重置邮件时出错:', error.message);
    } else {
      console.log('密码重置邮件已发送:', data);
    }
  }

  // const getResetType = () => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     console.log(event)
  //   })
  // }

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(subscription)
      console.log(event)
      
      
      if (event === 'PASSWORD_RECOVERY') {
        console.log('用户请求重置密码');
        // 处理重置密码逻辑
      }
    })
  }, [])

  return (
    <div style={resetBg}>
      {/* email */}
      <div className="
          w-520 
          bg-white 
          absolute
          top-1/2
          left-1/2
          rounded-sm"
        style={resetBox}
      >
        <p className="font-semibold text-center text-2xl py-5">Reset Password</p>
        <i className="w-350 h-0.5 bg-slate-200 mx-auto mt-0 mb-5 "></i>
        {/* reset password reset */}
        <div className="w-350 mx-auto my-0">
          <div className='mb-4'>
            <label htmlFor="email" className='text-sm mb-1'>Email</label>
            <Input placeholder='Enter your email' allowClear />
          </div>
          <Button
            type='primary'
            className='w-full h-10 mt-4 text-base mb-12 leading-10'
            onClick={sendResetEmailInfo}
          >
            Send Email
          </Button>
        </div>
      </div>

      {/* reset password */}
      {/* <div className="
          w-520 
          bg-white 
          absolute
          top-1/2
          left-1/2
          rounded-sm"
        style={resetBox}
      >
        <p className="font-semibold text-center text-2xl py-5">Reset Password</p>
        <i className="w-350 h-0.5 bg-slate-200 mx-auto mt-0 mb-5 "></i>

        <div className="w-350 mx-auto my-0">
          <div className='mb-4'>
            <label htmlFor="password" className='text-sm mb-1'>New Password</label>
            <Input.Password placeholder='Enter your new password' />
          </div>
          <div>
            <label htmlFor="password" className='text-sm mb-1'>Confirm Password</label>
            <Input.Password placeholder='Confirm your password' />
          </div>
          <Button
            type='primary'
            className='w-full h-10 mt-4 text-base mb-12 leading-10'>
            Confirm
          </Button>
        </div>
      </div> */}
    </div>
  )
}
export default resetPassword