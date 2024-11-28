'use client'
import { useState } from "react"
import { Collapse, Space, Card, Row, Col, Button, Modal, Input, Divider, Table, Badge, Select } from "antd"
import { SearchOutlined, DownloadOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'
import { getInspectionStatusData } from '@/utils/providerInspection'
import { inspectionStatusItem, inspectionForms, inspectionItem, selectInspectionItem} from '@/utils/dbType'
import { getTimeNumber } from '@/utils/pubFunProvider'
import { getUser } from '@/utils/providerSelectData'
import { getItAssetsTabbleData } from '@/utils/providerItAssetsData'

type inspectionStatusProps = inspectionStatusItem[]


const Inspection = () => {
  const [isDetailsShow, setIsDetailsShow] = useState(false)
  const [deviceNum, setDeviceNum] = useState<number>(0)
  const [isAccordion, setIsAccordion] = useState<boolean>(false)
  const [createInspectionModal, setCreateInspectionModal] = useState<boolean>(false)
  const [selectAssetsData, setSelectAssetsData] = useState<selectInspectionItem>({
    id: getTimeNumber()[1],
    value: '',
    key: ''
  })
  const [inspectionDataStatus, setInspectionDataStatus] = useState<inspectionStatusProps>([])
  const [inspectionDataForm, setInspectionDataForm] = useState<inspectionForms>({
    inspection_time: '',
    inspection_number: 0,
    inspection_phone: '',
    inspection_name: '',
    inspection_email: '',
    inspection_status: null,
    inspetion_deviceData: [],
  })
  const [inspectionItemForm, setInspectionItemForm] = useState<inspectionItem>({
    inspection_device: null,
    inspection_description: ''
  })

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
    getInspectionStatusData().then((res) => {
      setInspectionDataStatus(res as inspectionStatusProps)
    })
    setInspectionDataForm({
     ...inspectionDataForm,
      inspection_time: getTimeNumber()[0]
    })

    getUser()
    .then((res) => {
      setInspectionDataForm({
        ...inspectionDataForm,
         inspection_time: getTimeNumber()[0],
         inspection_email: res!.user?.email || '',
         inspection_name: res!.user?.user_metadata.username || '',
       })
    })    
  }

  const selectInspectionStatusData = (e: any) => {
    setInspectionDataForm({
     ...inspectionDataForm,
      inspection_status: e
    })

    if(e === 'Discovered problem') {
      
    }
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
                htmlFor="InspectionTime"
                >
                  Inspection Time
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold' 
                htmlFor="Inspector"
              >
                Inspector
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold' 
                htmlFor="InspectionStatus"
              >
                Inspection Status
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="PhoneNumber"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>  
                Phone
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>

            <Col span={12}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="email"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>
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
                htmlFor="InspectionTime"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>  
                Inspection Time
              </label>
              <Input value={inspectionDataForm.inspection_time} readOnly />
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="Inspector"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>  
                Inspector
              </label>
              <Input value={inspectionDataForm.inspection_name} readOnly />
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="Email"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>  
                Email
              </label>
              <Input value={inspectionDataForm.inspection_email} readOnly />
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="InspectionStatus"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>  
                Have you discovered any problems?
              </label>
              <Select 
                options={inspectionDataStatus}
                style={{ width: '100%' }}
                value={inspectionDataForm.inspection_status}
                placeholder="Please select"
                onChange={selectInspectionStatusData}
              >         
              </Select>
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="InspectionNumber"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>  
                Problem Number
              </label>
              <Input value={inspectionDataForm.inspection_number}/>
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="Phone"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>  
                Phone
              </label>
              <Input placeholder="Phone Number" value={inspectionDataForm.inspection_phone}  />
            </Col>
          </Row>

          {inspectionDataForm.inspection_status === 'Discovered problem' && (
            <>
              <Row gutter={20} className="mt-3">
                <Col span={24}>
                  <Table bordered columns={addColumns}></Table>
                </Col>
                </Row>
                <Row gutter={20}>
                <Col span={4}>
                  <Select 
                    style={{width: '100%'}}
                    value={inspectionItemForm.inspection_device}
                    // options={selectAssetsData}
                    placeholder="Select Device"
                  >  
                  </Select>
                </Col>
                <Col span={18}>
                  <Input.TextArea autoSize></Input.TextArea>
                </Col>
                <Col span={2}>
                  <Button type="primary" icon={<CheckOutlined/>}></Button>
                </Col>
              </Row>
            </>
          )}
          
        </Space>
        <Divider/>
      </Modal>
    </div>
  )
}
 
export default Inspection