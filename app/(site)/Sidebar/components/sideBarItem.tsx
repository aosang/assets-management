import { Menu } from 'antd'
import { HolderOutlined, DiffOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import {useState, useEffect} from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [{
  key: 'Workorder',
  label: 'Workorder',
  icon: <HolderOutlined />,
}, {
  key: 'Worklog',
  label: 'Worklog',
  icon: <DiffOutlined />,
}]

const SideBarItem: React.FC = () => {
  const router = useRouter()
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const swithcMenuItem: MenuProps['onClick'] = (e: any) => {
    router.push(`/${e.key}`)
    setCurrentUrl(e.key)
  }

  useEffect(() => {
    const currentUrl = window.location.pathname.split('/')[1]
    setCurrentUrl(currentUrl)
  }, [currentUrl])

  return (
    <div>
      <Menu 
        selectedKeys={[currentUrl]}
        theme='dark' 
        mode='inline' 
        items={items}
        onClick={swithcMenuItem} 
      />
    </div>
    
  )
}

export default SideBarItem