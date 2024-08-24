
"use client"
import React from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({children}) => {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.3)' }} />
        <Menu theme="dark" mode="inline" >
          <Menu.Item key="/Workorder">
            <Link href="/Workorder">Workorder</Link>
          </Menu.Item>
          <Menu.Item key="/Worklog">
            <Link href="/Worklog">Worklog</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Layout with Next.js ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
