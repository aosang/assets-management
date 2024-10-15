"use client"
import { Layout } from 'antd';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SideBarItem from './sideBarItem'
import DropDownMenu from './dropDownMenu'
import { getProfiles } from '@/utils/providerSelectData';


const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#001529',
  zIndex: 1
}

const headerStyle: React.CSSProperties = {
  position: 'fixed',
  width: '86%',
  top: '0',
  right: '0',
  color: '#001529',
  height: 64,
  lineHeight: '64px',
  backgroundColor: '#fff',
  zIndex: 1,
}

const contentStyle: React.CSSProperties = {
  width: 'calc(100% - 14%)',
  margin: '64px 0 48px auto'
}

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  width: 'calc(100% - 14%)',
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  color: '#001529',
  zIndex: 1
}


const AppLayout = ({children}) => {  
  const [userInfo, setUserInfo] = useState<any>('')
  const router = useRouter()

  const getMyInfomation = async () => {
    getProfiles()
   .then(res => {
      if (res) return setUserInfo(res)
      router.replace('/')
    })
  }

  useEffect(() => {
    getMyInfomation()
  }, [])

  return (
    <div>
      {userInfo && (
        <Layout style={{ minHeight: '100vh'}}>
          <Sider width="14%" style={siderStyle}>
            <div className='
            h-16
           text-white 
            text-lg
            leading-64 
            whitespace-nowrap
            border-b
            border-gray-600'
          >
            Assets Management
          </div>
            <SideBarItem />
          </Sider>
          <Layout>
            <Header style={headerStyle}>
              <DropDownMenu userInfo={userInfo} />
            </Header>
            <Content style={contentStyle}>
              {children}
            </Content>
            <Footer style={footerStyle}>Assets-Management with StevenWang ©2024</Footer>
          </Layout>
        </Layout>
      )}
    </div>
  )
}

export default AppLayout;
