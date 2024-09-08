"use client"
import { Card, Space, Col, Row, Divider } from 'antd'
import {AiOutlineBars, AiOutlineCheck, AiOutlineFileSync, AiOutlinePause } from 'react-icons/ai'

const workCardInfo: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  height: '130px',
  borderRadius: '12px',
  padding: '16px 48px',
  alignItems: 'center',
}

const workIcon: React.CSSProperties = {
  width: '80px',
  height: '80px',
  borderRadius: '100%',
  background: 'rgba(255, 255, 255, 0.3)',
}

const workIconText: React.CSSProperties = {
  display: 'block', 
  margin: '24px auto',
  color: '#fff',
  verticalAlign: 'middle',
}

const workTotal: React.CSSProperties = {
  color: '#fff',
  margin: '0 0 0 auto'
}


const Home = () => {
  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card>
          <Divider orientation="left">Work-Order Info</Divider>
          <Row gutter={20}>
            <Col span={6}>
              <div style={workCardInfo} className="bg-[#54a0ff]">
                <div style={workIcon}>
                  <AiOutlineBars style={workIconText} size={30} />
                </div>
                <div style={workTotal}>
                  <span style={{fontSize: '36px', fontWeight: '600'}}>10</span>
                  <p style={{fontSize: '15px'}}>Total</p>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div style={workCardInfo} className="bg-[#10ac84]">
              <div style={workIcon}>
                  <AiOutlineCheck style={workIconText} size={30} />
                </div>
                <div style={workTotal}>
                  <span style={{fontSize: '36px', fontWeight: '600'}}>10</span>
                  <p style={{fontSize: '15px'}}>Finished</p>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div style={workCardInfo} className="bg-[#ee5253]">
              <div style={workIcon}>
                  <AiOutlineFileSync style={workIconText} size={30} />
                </div>
                <div style={workTotal}>
                  <span style={{fontSize: '36px', fontWeight: '600'}}>10</span>
                  <p style={{fontSize: '15px'}}>Pending</p>
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div style={workCardInfo} className="bg-[#f39c12]">
              <div style={workIcon}>
                  <AiOutlinePause style={workIconText} size={30} />
                </div>
                <div style={workTotal}>
                  <span style={{fontSize: '36px', fontWeight: '600'}}>10</span>
                  <p style={{fontSize: '15px'}}>Paused</p>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Space>
    </div>
  )
}

export default Home 