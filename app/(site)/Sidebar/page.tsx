"use client"
import React from 'react';
import { Layout } from 'antd';
import SideBarItem from './components/sideBarItem';
import DropDownMenu from './components/dropDownMenu';
import siderBarCss from './sideBar.module.scss'

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
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width="13%" style={siderStyle}>
        <div className={siderBarCss.sidebarTop}>Assets Management</div>
        <SideBarItem />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <DropDownMenu />
        </Header>
        <Content >
          {children}
        </Content>
        <Footer style={footerStyle}>Assets-Management with StevenWang ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
