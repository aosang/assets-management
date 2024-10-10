import { Card, Col, Row, Input, Upload } from "antd"
import dayjs from "dayjs"

const Profile = () => {
  return (
    <div className="p-3">
      <Card title="My Infomation">
        <Row gutter={30}>
          <Col span={6}>
            <div>
              <label htmlFor="Email" className="font-semibold mb-1">Email</label>
              <Input type="text" readOnly />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <label htmlFor="Username" className="font-semibold mb-1">Username</label>
              <Input type="text" />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <label htmlFor="Company" className="font-semibold mb-1">Company</label>
              <Input type="text" />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <label htmlFor="CreateTime" className="font-semibold mb-1">Create Time</label>
              <Input type="text" readOnly />
            </div>
          </Col>
        </Row>
        {/* upload avatar image */}
        <div className="mt-3">
          
        </div>
      </Card>
    </div>
  )
}
 
export default Profile