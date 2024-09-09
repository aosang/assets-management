"use client"
import { Layout } from 'antd';
import { supabase } from '@/utils/clients'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import SideBarItem from './components/sideBarItem';
import DropDownMenu from './components/dropDownMenu';
import siderBarCss from './sideBar.module.scss'


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
  width: '88%',
  top: '0',
  right: '0',
  color: '#001529',
  height: 64,
  lineHeight: '64px',
  backgroundColor: '#fff',
  zIndex: 1,
}

const contentStyle: React.CSSProperties = {
  width: 'calc(100% - 12%)',
  margin: '64px 0 48px auto'
}

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  width: 'calc(100% - 12%)',
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

  
  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    try{
      if(user) {
        setUserInfo(user)
        updateProfile(user)
      }else if(error) {
        router.replace('/')
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
        <Layout style={{ minHeight: '100vh'}}>
          <Sider width="12%" style={siderStyle}>
            <div className={siderBarCss.sidebarTop}>Assets Management</div>
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
