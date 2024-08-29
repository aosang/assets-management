import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { supabase } from '@/utils/clients'
import { useRouter } from 'next/navigation'
import type { MenuProps } from 'antd'
import Image from 'next/image'

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

const DropDownMenu: React.FC = () => {
  const router = useRouter()
  const handleMenuClick: MenuProps['onClick'] = async ({ key }) => { 
    if(key === '1') {

    }else if(key === '2') {
      const { error } = await supabase.auth.signOut()
      if(error) throw new Error(error.message)
      router.push('/Auth')
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
            administrator
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default DropDownMenu;