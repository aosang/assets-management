import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { supabase } from '@/utils/clients'
import { useRouter } from 'next/navigation'
import type { MenuProps } from 'antd'
import Image from 'next/image'
import useMessage from '@/utils/message'
import { useState, useEffect } from 'react'
import { getProfiles, updateProfiles } from '@/utils/providerSelectData'
import { updateProfilesItem } from '@/utils/dbType'
import { getTimeNumber } from '@/utils/pubFunProvider'

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
  const [currentTime, setCurrentTime] = useState<string>('')
  const router = useRouter()
  const [userInfo, setUserInfo] = useState('')
  const [ username, setUsername ] = useState('')
  const [ avatarUrl, setAvatarUrl ] = useState('')
  const [updateForm,] = useState<updateProfilesItem>({
    username: update.user.user_metadata.username,
    company: update.user.user_metadata.company  ,
    email: update.user.email || '',
  })
  
  const handleMenuClick: MenuProps['onClick'] = async ({ key }) => { 
    if(key === '1') {
      const { error } = await supabase.auth.signOut()
      if(error) throw new Error(error.message)
      router.push('/')
      useMessage(2, 'Sign out!','success')
    }
  }

  const getMyInfomation = () => {
    updateProfiles(userId, updateForm).then (res => {
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
    })
  }

  useEffect(() => {
    getMyInfomation()
    
    // setInterval(() => {
    //   let TimeData =  getTimeNumber()[2]
    //   setCurrentTime(TimeData)
    // }, 1000)
  }, [])

  return (
    <>
      <div>{currentTime}</div>
      <div style={profile}>
        {userInfo && (
          <>
            <Image 
              src={avatarUrl? avatarUrl : 'https://www.wangle.run/company_icon/public_image/pub_avatar.jpg' } 
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
    </>
    
  )
}

export default DropDownMenu;