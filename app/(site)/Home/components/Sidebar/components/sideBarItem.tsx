import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import {useState, useEffect} from 'react'
import { AiTwotoneHome, AiFillProfile  } from "react-icons/ai"
import { RiComputerFill  } from 'react-icons/ri'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [{
  key: 'Home',
  label: 'Home',
  icon: <AiTwotoneHome style={{fontSize: '16px'}} />,
}, {
  key: 'WorkOrder',
  label: 'WorkOrder',
  icon: <AiFillProfile style={{fontSize: '16px'}} />,
}, {
  key: 'WorkItAssets',
  label: 'IT Assets',
  icon: <RiComputerFill style={{fontSize: '16px'}} />,
}]

const SideBarItem: React.FC = () => {
  const router = useRouter()
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const swithcMenuItem: MenuProps['onClick'] = (e: any) => {
    if(e.key === 'Home') {
      router.push(`/${e.key}`)
      setCurrentUrl(e.key)
    }else {
      router.push(`/Home/${e.key}`)
      setCurrentUrl(e.key)
    } 
  }

  useEffect(() => {
    let currentUrl = window.location.pathname
    currentUrl === '/Home'? currentUrl = currentUrl.split('/')[1] : currentUrl = currentUrl.split('/')[2]
    setCurrentUrl(currentUrl)
  }, [])

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