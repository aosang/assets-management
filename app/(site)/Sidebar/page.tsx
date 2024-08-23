"use client"
import { Layout } from "antd"
const { Header, Footer, Sider, Content } = Layout

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  // maxWidth: 'calc(50% - 8px)',
}

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
  height: '100vh',

}

const footerStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#cfd6eb'
}


const Sidebar: React.FC = () => {
  return (
    <div>
      <Layout style={layoutStyle}>
        <Sider width="15%" style={siderStyle}>Sider</Sider>
        <Layout>
          <Header style={footerStyle}>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>  
        </Layout>    
      </Layout>
    </div>
  )
}
 
export default Sidebar