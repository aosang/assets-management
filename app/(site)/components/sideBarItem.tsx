import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/navigation'
import {useState, useEffect} from 'react'
import { AiTwotoneHome, AiFillProfile  } from "react-icons/ai"
import { RiComputerFill  } from 'react-icons/ri'
import { FaUser } from "react-icons/fa"
import { IoDocumentText, IoLibrary } from "react-icons/io5"


type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [{
  key: 'Home',
  label: 'Home',
  icon: <AiTwotoneHome style={{fontSize: '16px'}} />,
  style: {
    marginBottom: '12px'
  }
}, {
  key: 'WorkOrder',
  label: 'WorkOrder',
  icon: <AiFillProfile style={{fontSize: '16px'}} />,
  style: {
    marginBottom: '12px'
  }
}, {
  key: 'WorkItAssets',
  label: 'IT Assets',
  icon: <RiComputerFill style={{fontSize: '16px'}} />,
  style: {
    marginBottom: '12px'
  }
}, {
  key: 'Inspection',
  label: 'Inspection',
  icon: <IoDocumentText style={{fontSize: '16px'}} />,
  style: {
    marginBottom: '12px'
  }
}, {
  key: 'Librarys',
  label: 'Librarys',
  icon: <IoLibrary style={{fontSize: '16px'}} />,
  style: {
    marginBottom: '12px'
  }
}, {
  key: 'Profile',
  label: 'Profile',
  icon: <FaUser style={{fontSize: '16px'}} />,
}]

const SideBarItem: React.FC = () => {
  const router = useRouter()
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const swithcMenuItem: MenuProps['onClick'] = (e: any) => {
    if(e.key === 'Home') {
      router.push(`/${e.key}`)
      setCurrentUrl(e.key)
    } else {
      router.push(`/Home/${e.key}`)
      setCurrentUrl(e.key)
    }
  }

  useEffect(() => {
    let currentUrlLink = window.location.pathname
    currentUrlLink =currentUrlLink.replace(/^.*\/([^\/]+)\/?$/, "$1")
    setCurrentUrl(currentUrlLink)
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