'use client'
import {
  tableItems,
  typeDataName,
  typeDataBrand,
  statusItem,
  workOrderFormProps
} from '@/utils/dbType'
import {
  getWorkOrderType,
  getWorkOrderStatus,
  getWorkBrand,
  getProfiles,
  getUser,
  getWorkOrder,
  insertUpdateWorkOrder
} from '@/utils/providerSelectData'
import { Card, Space, Button, Row, Col, Tabs, Modal, Divider, Select, Input } from 'antd'
import { useState, useEffect } from 'react'
import WorkTable from '../components/WorkTable'
import useMessage from '@/utils/message'


type tableData = tableItems[]
type typeDataProps = typeDataName[]
type typeDataBrandProps = typeDataBrand[]
type statusItemProps = statusItem[]

const WorkOrder: React.FC = ({}) => {
  const [layoutWidth, setLayoutWidth] = useState<number>(12)
  const [productBrandShow, setProductBrandShow] = useState<boolean>(false)
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [workData, setWorkData] = useState<tableData>([])
  const [typeData, setTypeData] = useState<typeDataProps>([])
  const [typeDataBrand, setTypeDataBrand] = useState<typeDataBrandProps>([])
  const [typeStatus, setTypeStatus] = useState<statusItemProps>([])
  const [workOrderForm, setWorkOrderForm] = useState<workOrderFormProps>({
    created_product: '',
    created_name: '',
    created_text: '',
    created_solved: '',
    created_type: null,
    created_brand: null,
    created_status: null,
    created_remark: '',
  })


  // get profiles
  const getProfilesUsername = async () => {
    getProfiles()
    .then(res => {
      if(res) {
        setWorkOrderForm({...workOrderForm, created_name: res[0].username})
      }
    })
  }

  const modalAddHanlder = async () => {
    setIsModalAddOpen(true)
    getProfilesUsername()

    // get Product type
    getWorkOrderType()
    .then(res => {
      setTypeData(res as typeDataProps)
    })
    .catch(error => {
      throw error
    })

    // get status
    getWorkOrderStatus()
    .then(res => {
      setTypeStatus(res as statusItemProps)
    })
  }

  const confirmModalForm = () => {
    const {created_brand, created_status, created_product, created_text, created_solved, created_type } = workOrderForm
    // verify form
    if(!created_product) {
      useMessage(2, 'Enter product name', 'error')
    }else if(!created_type) { 
      useMessage(2, 'Select product type', 'error')
    }else if(!created_brand) {
      useMessage(2, 'Select product brand', 'error')
    }else if(!created_status) {
      useMessage(2, 'Select status', 'error')
    }else if(!created_text) {
      useMessage(2, 'Describe the device problem', 'error')
    }else if(!created_solved) {
      useMessage(2, 'Describe the solution', 'error')
    }else {

      insertUpdateWorkOrder(workOrderForm).then(res => {
        if(res) {
          setIsModalAddOpen(false)
          getWorkOrderData()
        }
      })
    } 
  }

  const cancelModalForm = () => {
    setIsModalAddOpen(false)
  }

  const onClosedHandler =() => {
    setProductBrandShow(false)
    setLayoutWidth(12)
    setWorkOrderForm({
      ...workOrderForm, 
      created_product: '',
      created_text: '',
      created_solved: '', 
      created_type: null, 
      created_brand: null, 
      created_status: null, 
      created_remark: ''
    })
  }

  const getWorkOrderData = async () => {
    // get workorder data
    getUser()
    .then(res => {
      let id = res?.user?.id
      getWorkOrder(id as string)
     .then(res => {
        setWorkData(res as tableItems[])
      })
    })
  }

  const selectProductType = async (keys: string) => {
    if(keys) {
      getWorkBrand(keys)
      .then(res => {
        setLayoutWidth(8)
        setProductBrandShow(true)
        setTypeDataBrand(res![0].product_brand as typeDataBrandProps)
        setWorkOrderForm({
          ...workOrderForm, 
          created_brand: res![0].product_brand[0].value,
          created_type: keys
        })
      })
    }else {
      setWorkOrderForm({
        ...workOrderForm, 
        created_type: null,
        created_brand: null
      })
      setProductBrandShow(false)
      setLayoutWidth(12)
      setTypeDataBrand([])
    }
  }

  useEffect(() => {
    getWorkOrderData()
  }, [])

  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card title="WorkOrder">
          <Row gutter={10}>
            <Col><Button type='primary' onClick={modalAddHanlder}>Create</Button></Col>
            <Col><Button type='primary' danger>Delete</Button></Col>
          </Row>
          <Modal
            title="Create Work Order"
            width={960}
            open={isModalAddOpen}
            onOk={confirmModalForm}
            onCancel={cancelModalForm}
            okText="Confirm"
            cancelText="Cancel"
            afterClose={onClosedHandler}
            maskClosable={false}
          >
            <Divider />
            <Space direction="vertical" size="middle" style={{width: '100%'}}>
              <Row gutter={20}>
                <Col span={12}>
                  <label 
                    htmlFor="Product"
                    className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      Product
                  </label>
                  <Input
                    style={{ width: '100%' }}
                    placeholder='Product name'
                    value={workOrderForm.created_product}
                    onChange={e => setWorkOrderForm({...workOrderForm, created_product: e.target.value})}
                  />
                </Col>
                <Col span={12}>
                  <label 
                    htmlFor="Create_name"
                    className='mb-1 flex items-center font-semibold'
                  >
                    <span className='mr-1 text-red-600  font-thin'>*</span>
                    Create name
                  </label>
                  <Input
                    style={{ width: '100%' }}
                    readOnly
                    value={workOrderForm.created_name}
                  />
                </Col>
              </Row>            
              <Row gutter={20}>
                <Col span={layoutWidth}>
                  {/* product type */}
                  <label 
                    htmlFor="Type"
                    className='mb-1 flex items-center font-semibold'
                  >
                    <span className='mr-1 text-red-600 font-thin'>*</span>
                    Type
                  </label>
                  <Select
                    style={{ width: '100%' }}
                    options={typeData}
                    placeholder='Product type'
                    onChange={selectProductType}
                    value={workOrderForm.created_type}
                    allowClear
                  >
                  </Select>
                </Col>
                {productBrandShow && (
                  <Col span={layoutWidth}>
                    <label 
                      htmlFor="Brand"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      Brand
                    </label>
                    <Select
                      style={{ width: '100%' }}
                      placeholder='Product brand'
                      options={typeDataBrand}
                      value={workOrderForm.created_brand}
                      onChange={e => setWorkOrderForm({...workOrderForm, created_brand: e})}
                      allowClear
                      defaultValue={typeDataBrand[0].key}
                    >
                    </Select>
                  </Col>
                )}
                
                <Col span={layoutWidth}>
                  <label 
                    htmlFor="Status"
                    className='mb-1 flex items-center font-semibold'

                  >
                    <span className='mr-1 text-red-600 font-thin'>*</span>
                    Status
                  </label>
                  <Select
                    style={{ width: '100%' }}
                    placeholder='Status'
                    options={typeStatus}
                    value={workOrderForm.created_status}
                    onChange={e => setWorkOrderForm({...workOrderForm, created_status: e})}
                  >
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <label 
                    htmlFor="Problem"
                    className='mb-1 flex items-center font-semibold'
                  >
                    <span className='mr-1 text-red-600 font-thin'>*</span>
                    Problem
                  </label>
                  <Input.TextArea 
                    rows={5}
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    placeholder='Describe the device problem'
                    value={workOrderForm.created_text}
                    onChange={e => setWorkOrderForm({...workOrderForm, created_text: e.target.value})}
                    maxLength={260}
                    showCount
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <label
                    htmlFor="Solution"
                    className='mb-1 flex items-center font-semibold'
                  >
                    <span className='mr-1 text-red-600 font-thin'>*</span>
                    Solution
                  </label>
                  <Input.TextArea
                    rows={5}
                    placeholder='Describe the solution'
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    value={workOrderForm.created_solved}
                    onChange={e => setWorkOrderForm({...workOrderForm, created_solved: e.target.value})}
                    maxLength={260}
                    showCount
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <label 
                    htmlFor="Remark"
                    className='mb-1 flex items-center font-semibold'
                  >
                    Remark
                  </label>
                  <Input.TextArea 
                    rows={4}
                    placeholder='Remark'
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    value={workOrderForm.created_remark}
                    onChange={e => setWorkOrderForm({...workOrderForm, created_remark: e.target.value})}
                    maxLength={120}
                    showCount
                  />
                </Col>
              </Row>
            </Space>
            <Divider />
          </Modal>
          <WorkTable workInfo={workData} />
        </Card>
      </Space>
    </div>
  )
}

export default WorkOrder