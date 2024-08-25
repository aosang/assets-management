import { Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
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
  return (
    <div style={profile}>
      <Image 
        src='/avatar.jpg' 
        width={32} height={32} 
        alt='avatar'
        style={{borderRadius: '50%', marginRight: '10px'}}  
      />
      <Dropdown menu={{items}}>
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