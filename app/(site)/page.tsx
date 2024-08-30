"use client"

import Sidebar from "./Sidebar/page"
import { Card, Space, Col, Row } from 'antd'

const worlCardInfo: React.CSSProperties = {
  width: '100%',
  height: '130px',
  borderRadius: '12px',
}

const Workorder = () => {
  return (
    <Sidebar>
      <div style={{width: '100%', padding: '12px', boxSizing: 'border-box'}}>
        <Space direction="vertical" size={16} style={{width: '100%'}}>
          <Card>
            <Row gutter={15}>
              <Col span={6}>
                <div style={worlCardInfo} className="bg-[#54a0ff]"></div>
              </Col>
              <Col span={6}>
                <div style={worlCardInfo} className="bg-[#10ac84]"></div>
              </Col>
              <Col span={6}>
                <div style={worlCardInfo} className="bg-[#ee5253]"></div>
              </Col>
              <Col span={6}>
                <div style={worlCardInfo} className="bg-[#8395a7]"></div>
              </Col>
            </Row>
          </Card>
          
        </Space>
      </div>
    </Sidebar>
    
  )
}
 
export default Workorder 