import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { supabase } from '@/utils/clients'
import { useRouter } from 'next/navigation'
import type { MenuProps } from 'antd'
import Image from 'next/image'
import useMessage from '@/utils/message'
import { useState, useEffect } from 'react'
import { getProfiles, updateProfiles } from '@/utils/providerSelectData'

const items: MenuProps['items'] = [{
  key: '1',
  label: 'Signout',
}]

const profile: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center'
}



const DropDownMenu = ({ userId,  update}) => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState('')
  const [ username, setUsername ] = useState('')
  const [ avatarUrl, setAvatarUrl ] = useState('')

  const handleMenuClick: MenuProps['onClick'] = async ({ key }) => { 
    if(key === '1') {
      const { error } = await supabase.auth.signOut()
      if(error) throw new Error(error.message)
      router.push('/')
      useMessage(2, 'Sign out!','success')
    }
  }

  const getMyInfomation = async () => {
    updateProfiles(userId, update)
    getProfiles(userId)
   .then(res => {
      if (res) {
        setUserInfo(res as any)
        setUsername(res[0].username)
        setAvatarUrl(res[0].avatar_url)
      }else {
        router.replace('/')
      }
    })
  }

  useEffect(() => {
    getMyInfomation()
  }, [])

  return (
    <div style={profile}>
      {userInfo && (
        <>
          <Image 
            src={avatarUrl? avatarUrl : '/avatar.jpg' } 
            width={32} 
            height={32} 
            alt='avatar'
            style={{borderRadius: '50%', marginRight: '10px'}}  
          />
          <Dropdown menu={{
            items,
            onClick: handleMenuClick
          }}>
            <a>
              <Space>
                {username}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </>
      )}
    </div>
  )
}

export default DropDownMenu;