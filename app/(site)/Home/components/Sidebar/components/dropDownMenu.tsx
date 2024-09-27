import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { supabase } from '@/utils/clients'
import { useRouter } from 'next/navigation'
import type { MenuProps } from 'antd'
import Image from 'next/image'
import useMessage from '@/utils/message'
import { useState } from 'react'


const items: MenuProps['items'] = [{
  key: '1',
  label: 'Profile',
}, {
  key: '2',
  label: 'Signout',
}]

const profile: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center'
}

interface userInfoProps  {
  userInfo: any
}

const DropDownMenu: React.FC<userInfoProps> = ({userInfo}) => {
  const router = useRouter()
  const [username, setUserName] = useState(userInfo?.user_metadata.username)

  const handleMenuClick: MenuProps['onClick'] = async ({ key }) => { 
    if(key === '1') {

    }else if(key === '2') {
      const { error } = await supabase.auth.signOut()
      if(error) throw new Error(error.message)
      router.push('/')
      useMessage(2, 'Sign out!','success')
    }
  }

  return (
    <div style={profile}>
      <Image 
        src='/avatar.jpg' 
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
    </div>
  )
}

export default DropDownMenu;