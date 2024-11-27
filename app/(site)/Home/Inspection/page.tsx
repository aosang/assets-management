'use client'
import { useState } from "react"
import { Collapse, Space, Card, Row, Col, Button, Modal, Input, Divider, Table, Badge, Select } from "antd"
import { SearchOutlined, DownloadOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'

const Inspection = () => {
  const [isDetailsShow, setIsDetailsShow] = useState(false)
  const [deviceNum, setDeviceNum] = useState<number>(0)
  const [isAccordion, setIsAccordion] = useState<boolean>(false)
  const [createInspectionModal, setCreateInspectionModal] = useState<boolean>(false)

  const inspectionDataStatus = [{
    key: 1,
    label: 'Discovered a problem',
  }, {
    key: 2,
    label: 'Everything is OK'
  }]

  const columns = [{
    title: 'Device Name',
    dataIndex: 'deviceName',
    key: 'deviceName',
  },{
    title: 'Problem Description',
    dataIndex: 'problemDescription',
    key: 'problemDescription',
  }, {
    title: 'Other',
    dataIndex: 'other',
    key: 'other',
    render: () => {
      return (
        <Button variant="filled" color="primary" icon={<EditOutlined/>}></Button>
      )
    }
  }]

  const addColumns = [{
    title: 'Device Name',
    dataIndex: 'deviceName',
    key: 'deviceName',
  },{
    title: 'Problem Description',
    dataIndex: 'problemDescription',
    key: 'problemDescription',
  }]

  const createInspectionModalHandler = () => {
    setCreateInspectionModal(true)
  }

  return (
    <div className="w-full p-3 box-border">
      <Space direction="vertical" size={16} className="w-full">
        <Card title="Inspection Record" style={{background: '#f0f2f5'}}>
          <Button 
            type="primary" 
            className="mb-4"
            onClick={createInspectionModalHandler}
          >
            Create
          </Button>
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
                    onClick={() => setIsDetailsShow(true)}
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

      <Modal 
        open={isDetailsShow}
        onCancel={() => setIsDetailsShow(false) } 
        title="Inspection Details"
        maskClosable={false}
        width={1260}
      >
        <Divider />
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={20}>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold' 
                htmlFor="InspectionTime">
                  Inspection Time
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold' 
                htmlFor="Inspector">
                  Inspector
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold' 
                htmlFor="InspectionStatus">
                  Inspection Status
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="PhoneNumber">
                Phone Number
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>

            <Col span={12}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="email">
                Email
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>
          </Row>
        </Space>
        <Collapse
          accordion={isAccordion}
          className="mt-5" 
          size="small" items=
        {
          [{
          key: '1',
          label: (
            <div className="flex">
              <span className="mr-3">Problematic Equipment</span>
              <Badge count={1} />
            </div>
          ),
          children: 
            <Table columns={columns}></Table>,
          }]
        }>
        </Collapse>
        <Divider />
      </Modal>

      <Modal
        width={1260} 
        open={createInspectionModal}
        title="Create Inspection"
        onCancel={() => setCreateInspectionModal(false)}
        maskClosable={false}
      >
        <Divider/>
        <Space direction="vertical" size={16} className="w-full">
          <Row gutter={20}>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="InspectionTime">
                  Inspection Time
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="InspectionStatus">
                  Have you discovered any problems?
              </label>
              <Select 
                options={inspectionDataStatus}
                style={{ width: '100%' }}
              >         
              </Select>
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="InspectionNumber">
                  Problem Number
              </label>
              <Input value={'2024-11-27'}/>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="Inspector">
                  Inspector
              </label>
              <Input value={'2024-11-27'}/>
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="Email">
                  Email
              </label>
              <Input value={'2024-11-27'}/>
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="Phone">
                  Phone
              </label>
              <Input value={'2024-11-27'}/>
            </Col>
          </Row>

          <Row gutter={20} className="mt-3">
            <Col span={24}>
              <Table bordered columns={addColumns}></Table>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={4}>
              <Select style={{width: '100%'}}></Select>
            </Col>
            <Col span={18}>
              <Input.TextArea autoSize></Input.TextArea>
            </Col>
            <Col span={2}>
              <Button type="primary" icon={<CheckOutlined/>}></Button>
            </Col>
          </Row>
        </Space>
        <Divider/>
      </Modal>
    </div>
  )
}
 
export default Inspection