"use client"
import { Layout } from 'antd';
import { supabase } from '@/utils/clients'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import SideBarItem from './components/sideBarItem';
import DropDownMenu from './components/dropDownMenu';
import siderBarCss from './sideBar.module.scss'
import useMessage from '@/utils/message'


const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#001529',
}

const headerStyle: React.CSSProperties = {
  color: '#001529',
  height: 64,
  lineHeight: '64px',
  backgroundColor: '#fff',
}

const footerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  height: 48,
  color: '#001529',
}


const AppLayout = ({children}) => {  
  const [userInfo, setUserInfo] = useState<any>('')
  const router = useRouter()

  
  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    try{
      if(user) {
        setUserInfo(user)
        updateProfile(user)
      }
    }catch(error) {
      throw error
    }
  }

  const updateProfile = async (user: any) => {
    const {error} = await supabase.from('profiles').update({
      username: user?.user_metadata.username
    })
    if(error) throw new Error(error.message)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      {userInfo && (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width="13%" style={siderStyle}>
            <div className={siderBarCss.sidebarTop}>Assets Management</div>
            <SideBarItem />
          </Sider>
          <Layout>
            <Header style={headerStyle}>
              <DropDownMenu userInfo={userInfo} />
            </Header>
            <Content>
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
