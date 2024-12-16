'use client'
import { useState, useEffect } from "react"
import { Collapse, Space, Card, Row, Col, Button, Modal, Input, Divider, Table, Badge, Select, Empty } from "antd"
import { SearchOutlined, DownloadOutlined, EditOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { getInspectionStatusData, insertInspectionDeviceData, getInspectionDeviceData, deleteInspectionDevice } from '@/utils/providerInspection'
import { inspectionStatusItem, inspectionForms, inspectionItem, selectInspectionItem } from '@/utils/dbType'
import { getTimeNumber, getDeviceData } from '@/utils/pubFunProvider'
import { getUser } from '@/utils/providerSelectData'

type inspectionStatusProps = inspectionStatusItem[]

const Inspection: React.FC = () => {
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
  const [deleteInspectionId, setDeleteInspectionId] = useState<string>('')
  const [deviceRecordListData, setDeviceRecordListData] = useState<inspectionForms[]>([])
  const [isDetailsShow, setIsDetailsShow] = useState(false)
  const [deviceNum, setDeviceNum] = useState<number>(0)
  const [isAccordion, setIsAccordion] = useState<boolean>(false)
  const [createInspectionModal, setCreateInspectionModal] = useState<boolean>(false)
  const [selectAssetsData, setSelectAssetsData] = useState<selectInspectionItem[]>([])
  const [inspectionDataStatus, setInspectionDataStatus] = useState<inspectionStatusProps>([])
  const [inspectionDataForm, setInspectionDataForm] = useState<inspectionForms>({
    inspection_id: '',
    inspection_time: '',
    inspection_number: 0,
    inspection_phone: '',
    inspection_name: '',
    inspection_email: '',
    inspection_status: null,
    inspection_deviceData: [],
  })
  const [inspectionItemForm, setInspectionItemForm] = useState<inspectionItem>({
    inspection_id: '',
    inspection_device: null,
    inspection_description: '',
    key: getTimeNumber()[1],
  })

  const columns = [{
    title: 'Device Name',
    dataIndex: 'inspection_device',
    key: 'inspection_device',
  }, {
    title: 'Problem Description',
    dataIndex: 'inspection_description',
    key: 'inspection_description',
  }, {
    title: 'Other',
    dataIndex: 'other',
    key: 'other',
    width: 80,
    render: () => {
      return (
        <Button variant="filled" color="primary" icon={<EditOutlined />}></Button>
      )
    }
  }]

  const onRowData = {
    onClick: (record: inspectionItem) => {
      setInspectionDataForm({
      ...inspectionDataForm,
        inspection_deviceData: inspectionDataForm.inspection_deviceData!.filter(item => {
          return item.inspection_id!== record.inspection_id
        })
      })
    }
  }

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

    if (e === 'Discovered problem') {
      getDeviceData()
      .then(res => {
        setSelectAssetsData(res as selectInspectionItem[])
      })
    }
  }

  const selectInspectionDeviceName = (e: any) => {
    setInspectionItemForm({
      ...inspectionItemForm,
      inspection_id: getTimeNumber()[1],
      inspection_device: e
    })
  }

  const addProblemDeviceDescription = (e: any) => {
    setInspectionItemForm({
      ...inspectionItemForm,
      inspection_id: getTimeNumber()[1],
      inspection_description: e.target.value
    })
  }

  const confirmProblemDeviceName = () => {
    setInspectionDataForm({
      ...inspectionDataForm,
      inspection_deviceData: [...inspectionDataForm.inspection_deviceData!, inspectionItemForm]
    })

    setInspectionItemForm({
    ...inspectionItemForm,
      key: '',
      inspection_description: '',
      inspection_device: null
    })
  }

  const insertInspectionRecordData = () => {
    setCreateInspectionModal(false)
    insertInspectionDeviceData(inspectionDataForm)
    .then(() => {
      getInspectionRecordListData()
    })
  }

  const closeInspectionModal = () => {
    setInspectionDataForm({
      ...inspectionDataForm,
      inspection_status: null,
      inspection_deviceData: [],
      inspection_phone: '',
      inspection_number: 0,
    })
  }

  const getInspectionRecordListData = () => {
    getUser().then(res => {
      getInspectionDeviceData(res?.user!.id as string)
      .then(res => {
        if(res) {
          setDeviceRecordListData(res as inspectionForms[])
        }
      })
    })
  }

  const onDeleteInspection = (id: string) => {
    setIsModalDelete(true)
    setDeleteInspectionId(id)
  }

  const confirmDeleteAssetsData = () => {
    setIsModalDelete(false)
    deleteInspectionDevice(deleteInspectionId)
    .then(() => {
      getInspectionRecordListData()
    })
  }

  useEffect(() => {
    getInspectionRecordListData()
  }, [])

  const addColumns = [{
    title: 'Device Name',
    dataIndex: 'inspection_device',
    key: 'inspection_device',
  }, {
    title: 'Problem Description',
    dataIndex: 'inspection_description',
    key: 'inspection_description',
  }, {
    title: 'Other',
    width: 80,
    render: (record: inspectionItem) => {
      return (
        <Button 
          variant="filled" 
          color="danger" 
          icon={<DeleteOutlined />}
          onClick={() => onRowData.onClick(record)}
        >
        </Button>
      )
    }
  }]

  return (
    <div className="w-full p-3 box-border">
      <Space direction="vertical" size={16} className="w-full">
        <Card title="Inspection Record" style={{ background: '#f0f2f5' }}>
          {deviceRecordListData.length > 0 && (
            <Button
              type="primary"
              className="mb-4"
              onClick={createInspectionModalHandler}
            >
              Create
            </Button>
          )}

          <>
            {deviceRecordListData.length > 0? (
              <>
                <Row gutter={20}> 
                  {deviceRecordListData.map(item => {
                    return (
                      <Col span={6} key={item.inspection_id} className="mb-5">
                        <Card>
                          <Row className="mb-2">
                            <Col span={24}><span className="text-sm">Time: {item.inspection_time}</span></Col>
                          </Row>
                          <Row className="mb-2">
                            <Col span={24}><span className="text-sm">Status: {item.inspection_status}</span></Col>
                          </Row>
                          <Row className="mb-2">
                            <Col span={12}><span className="text-sm">Inspector: {item.inspection_name}</span></Col>                       
                            <Col span={12}><span className="text-sm">phone: {item.inspection_phone}</span></Col>
                          </Row>
      
                          <Row className="mb-2">
                            <Col span={24}><span className="text-sm">Email: {item.inspection_email}</span></Col>
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
                              className="bg-green-100 text-green-500 border-green-100 mr-3"
                              size="small"
                              icon={<DownloadOutlined />}
                            >
                              Download
                            </Button>

                            <Button
                              color="danger"
                              size="small"
                              variant="filled"
                              icon={<DeleteOutlined />}
                              onClick={() => onDeleteInspection(item.inspection_id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card>
                      </Col>
                    )
                  })}
                </Row>
              </>
            ) : (
              <Empty description="Please Create the Inspection Record">
                <Button type="primary" onClick={createInspectionModalHandler}>Create Now</Button>
              </Empty>
            )}
          </>
        </Card>
      </Space>

      <Modal
        open={isDetailsShow}
        onCancel={() => setIsDetailsShow(false)}
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
                Phone
              </label>
              <Input value={'2024-11-27'} readOnly />
            </Col>

            <Col span={12}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="email"
              >
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
        onOk={insertInspectionRecordData}
        maskClosable={false}
        afterClose={closeInspectionModal}
      >
        <Divider />
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
              <Input
                type="number"
                value={inspectionDataForm.inspection_number}
                onChange={(e) => setInspectionDataForm({
                  ...inspectionDataForm,
                  inspection_number: Number(e.target.value)
                })} />
            </Col>
            <Col span={8}>
              <label
                className='mb-1 flex items-center font-semibold'
                htmlFor="Phone"
              >
                <span className="mr-1 text-red-600 font-thin">*</span>
                Phone
              </label>
              <Input
                placeholder="Phone Number"
                value={inspectionDataForm.inspection_phone}
                onChange={(e) => setInspectionDataForm({
                  ...inspectionDataForm,
                  inspection_phone: e.target.value
                })}
              />
            </Col>
          </Row>

          {inspectionDataForm.inspection_status === 'Discovered problem' && (
            <>
              <Row gutter={20} className="mt-3">
                <Col span={24}>
                  <Table
                    bordered
                    columns={addColumns}
                    dataSource={inspectionDataForm.inspection_deviceData}
                    size='small'
                  >
                  </Table>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={4}>
                  <Select
                    style={{ width: '100%' }}
                    value={inspectionItemForm.inspection_device}
                    options={selectAssetsData}
                    placeholder="Select Device"
                    onChange={selectInspectionDeviceName}
                    allowClear
                  >
                  </Select>
                </Col>
                <Col span={18}>
                  <Input.TextArea
                    autoSize
                    placeholder="Please provide a brief description of the issue"
                    showCount
                    maxLength={120}
                    onChange={addProblemDeviceDescription}
                    allowClear
                    value={inspectionItemForm.inspection_description}
                  >
                  </Input.TextArea>
                </Col>
                <Col span={2}>
                  <Button 
                    type="primary" 
                    icon={<CheckOutlined />} 
                    onClick={confirmProblemDeviceName}>
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Space>
        <Divider />
      </Modal>

      <Modal
        title="Tips"
        open={isModalDelete}
        onCancel={() => setIsModalDelete(false)}
        onOk={confirmDeleteAssetsData}
      >
        <p className="text-sm text-black">Are you sure you want to delete this data?</p>
      </Modal>
    </div>
  )
}

export default Inspection