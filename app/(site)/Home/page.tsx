"use client"
import { Card, Space, Col, Row } from 'antd'
import { AiOutlineBars, AiOutlineCheck, AiOutlineFileSync, AiOutlinePause } from 'react-icons/ai'
import { FiMonitor, FiPrinter } from 'react-icons/fi'
import { MdOutlineComputer } from "react-icons/md"
import { HiOutlineServer } from "react-icons/hi"
import { BsToggles } from "react-icons/bs"
import { LuMouse } from "react-icons/lu"
import SideBar from '../components/Sidebar'

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
}

const workTotal: React.CSSProperties = {
  color: '#fff',
  margin: '0 0 0 auto'
}

const assetsInfo: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  height: '120px',
  background: '#fff',
  boxShadow: '0px 0px 2px 2px #ececec',
  borderRadius: '12px',
  padding: '0 24px',
  alignItems: 'center',
  color: '#333'
}

const assetsTotal: React.CSSProperties = {
  margin: '0 0 0 auto',
}

const assetsText: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '600'
}

const Home = () => {
  return (
    <SideBar>
      <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Card title="WorkOrder Info">
            <Row gutter={20}>
              <Col span={6}>
                <div style={workCardInfo} className="bg-[#54a0ff]">
                  <div style={workIcon}>
                    <AiOutlineBars style={workIconText} size={30} />
                  </div>
                  <div style={workTotal}>
                    <span style={{ fontSize: '36px', fontWeight: '600' }}>10</span>
                    <p style={{ fontSize: '15px' }}>Total</p>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div style={workCardInfo} className="bg-[#10ac84]">
                  <div style={workIcon}>
                    <AiOutlineCheck style={workIconText} size={30} />
                  </div>
                  <div style={workTotal}>
                    <span style={{ fontSize: '36px', fontWeight: '600' }}>10</span>
                    <p style={{ fontSize: '15px' }}>Finished</p>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div style={workCardInfo} className="bg-[#ee5253]">
                  <div style={workIcon}>
                    <AiOutlineFileSync style={workIconText} size={30} />
                  </div>
                  <div style={workTotal}>
                    <span style={{ fontSize: '36px', fontWeight: '600' }}>10</span>
                    <p style={{ fontSize: '15px' }}>Processing</p>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div style={workCardInfo} className="bg-[#f39c12]">
                  <div style={workIcon}>
                    <AiOutlinePause style={workIconText} size={30} />
                  </div>
                  <div style={workTotal}>
                    <span style={{ fontSize: '36px', fontWeight: '600' }}>10</span>
                    <p style={{ fontSize: '15px' }}>Pending</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Space>
        <Space direction="vertical" size={12} style={{ width: '100%', marginTop: '12px' }}>
          <Card title="Asset information">
            <Row gutter={20}>
              <Col span={4} >
                <div style={assetsInfo}>
                  <FiMonitor size={26} />
                  <div style={assetsTotal}>
                    <span style={assetsText}>10</span>
                    <p>Computer</p>
                  </div>
                </div>
              </Col>
              <Col span={4} >
                <div style={assetsInfo}>
                  <MdOutlineComputer size={26} />
                  <div style={assetsTotal}>
                    <span style={assetsText}>10</span>
                    <p>Laptop</p>
                  </div>
                </div>
              </Col>
              <Col span={4} >
                <div style={assetsInfo}>
                  <HiOutlineServer size={26} />
                  <div style={assetsTotal}>
                    <span style={assetsText}>10</span>
                    <p>Server</p>
                  </div>
                </div>
              </Col>
              <Col span={4} >
                <div style={assetsInfo}>
                  <BsToggles size={26} />
                  <div style={assetsTotal}>
                    <span style={assetsText}>10</span>
                    <p>Switch</p>
                  </div>
                </div>
              </Col>
              <Col span={4}>
                <div style={assetsInfo}>
                  <FiPrinter size={26} />
                  <div style={assetsTotal}>
                    <span style={assetsText}>10</span>
                    <p>Print</p>
                  </div>
                </div>
              </Col>
              <Col span={4}>
                <div style={assetsInfo}>
                  <LuMouse size={26} />
                  <div style={assetsTotal}>
                    <span style={assetsText}>10</span>
                    <p>Others</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Space>
      </div>
    </SideBar>

  )
}

export default Home 