'use client'
import { useState } from 'react'
import { Input, Button } from 'antd'
import { supabase } from '@/utils/clients'
import useMessage from '@/utils/message'
import { getProfiles } from '@/utils/providerSelectData'

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
  const [resetEmail, setResetEmail] = useState<string>('')

  const sendResetEmailInfo = async () => {
    if(!resetEmail) {
      useMessage(2, 'Please enter your email', 'error')
    }else {
      getProfiles()
      .then(res => {
        let emailData = null
        emailData = res?.find(item => item.email === resetEmail) || null
        if(!emailData) {
          useMessage(2, 'Email not found', 'error')
        }else {
          alert('good')
        }
      })
    }

    // const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
    //   redirectTo: 'http://localhost:3000/resetPassword/'
    // })
    // if(!resetEmail) {
    //   useMessage(2, 'Please enter your email', 'error')
    // }else {
    //   if(error) {
    //     useMessage(2, error.message, 'error')
    //   }else {
    //     useMessage(2, 'Check your email for reset password link','success')
    //   }
    // }
  }

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
            <Input 
              placeholder='Enter your email' 
              allowClear  
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
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