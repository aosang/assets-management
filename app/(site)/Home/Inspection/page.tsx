import { Space, Card, Row, Col, Button } from "antd"
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'

const Inspection = () => {
  return (
    <div className="w-full p-3 box-border">
      <Space direction="vertical" size={16} className="w-full">
        <Card title="Inspection Record" style={{background: '#f0f2f5'}}>
          <Row>
            <Col span={6}>
              <Card>
                <Row className="mb-2">
                  <Col span={12}><span className="text-sm">Time: 2024-11-26</span></Col>
                  <Col span={12}><span className="text-sm">Inspector: aosang</span></Col>
                </Row>

                <Row className="mb-2">
                  <Col span={12}><span className="text-sm">Status: none</span></Col>
                  <Col span={12}><span className="text-sm">phone: 13212312345</span></Col>
                </Row>

                <Row className="mb-2">
                  <Col span={24}><span className="text-sm">Email: xiaole2071@gmail.com</span></Col>
                </Row>

                <div className="mt-4">
                  <Button 
                    color="primary"
                    size="small"
                    icon={<SearchOutlined />}
                    variant="filled"
                    className="mr-3"
                    >
                      Details
                  </Button>
                  
                  <Button 
                    color="danger"
                    variant="filled"
                    size="small"
                    icon={<DownloadOutlined />}
                  >
                    Dowload
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </Space>
    </div>
  )
}
 
export default Inspection