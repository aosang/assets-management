"use client"

import Sidebar from "./Sidebar/page"
import { Card, Space } from 'antd'

const Workorder = () => {
  return (
    <Sidebar>
      <div style={{width: '100%', padding: '12px', boxSizing: 'border-box'}}>
        <Space direction="vertical" size={16} style={{width: '100%'}}>
          <Card title="Workorder"></Card>
        </Space>
      </div>
    </Sidebar>
    
  )
}
 
export default Workorder 