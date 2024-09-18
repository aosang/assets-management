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
  getWorkBrand
} from '@/utils/providerSelectData'
import { supabase } from '@/utils/clients'
import { Card, Space, Button, Row, Col, Tabs, Modal, Divider, Select, Input } from 'antd'
import type { TabsProps } from 'antd'
import WorkTable from '../components/WorkTable'
import { useState, useEffect } from 'react'


const workTabsTitle: TabsProps['items'] = [{
  key: '1',
  label: 'All',
}, {
  key: '2',
  label: 'Processing',
}, {
  key: '3',
  label: 'Finished',
}]

type tableData = tableItems[]
type typeDataProps = typeDataName[]
type typeDataBrandProps = typeDataBrand[]
type statusItemProps = statusItem[]

const Worklog: React.FC = ({}) => {
  const [selectDisable, setSelectDisable] = useState<boolean>(true)
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [workData, setWorkData] = useState<tableData>([])
  const [typeData, setTypeData] = useState<typeDataProps>([])
  const [typeDataBrand, setTypeDataBrand] = useState<typeDataBrandProps>([])
  const [typeStatus, setTypeStatus] = useState<statusItemProps>([])
  const [workOrderForm, setWorkOrderForm] = useState<workOrderFormProps>({
    created_product: '',
    created_name: '',
    created_text: '',
    created_type: '',
    created_brand: '',
    created_status: '',
    created_remark: '',
  })

  const changeTabId = (e: string) => {
    if (e === '1') {

    }
  }

  const modalAddHanlder = async () => {
    setIsModalAddOpen(true)

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

  const hideModal = () => {
    setIsModalAddOpen(false)
  }

  const getWorkOrderData = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (user?.id) {
      const { data, error } = await supabase
        .from('work_order')
        .select('*')
        .match({ id: user?.id })
      setWorkData(data as tableItems[])
    }
  }

  const selectProductType = async (keys: string) => {
    setSelectDisable(false)
    let key = keys
    setWorkOrderForm({...workOrderForm, created_type: key})

    getWorkBrand(key)
      .then(res => {
        setTypeDataBrand(res![0].product_brand as typeDataBrandProps)
      })
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
            onOk={hideModal}
            onCancel={hideModal}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Divider />
            <Space direction="vertical" size="middle" style={{width: '100%'}}>
              <Row gutter={20}>
                <Col span={12}>
                  <label 
                    htmlFor="Product"
                    className='mb-1'
                    >
                      Product
                  </label>
                  <Input
                    style={{ width: '100%' }}
                    placeholder='Product name'
                    value={workOrderForm.created_product}
                  />
                </Col>
                <Col span={12}>
                  <label 
                    htmlFor="Create_name"
                    className='mb-1'
                  >
                    Create name
                  </label>
                  <Input
                    style={{ width: '100%' }}
                    placeholder='Description'
                  />
                </Col>
              </Row>            
              <Row gutter={20}>
                <Col span={8}>
                  {/* product type */}
                  <label 
                    htmlFor="Type"
                    className='mb-1'
                  >
                    Type
                  </label>
                  <Select
                    style={{ width: '100%' }}
                    options={typeData}
                    placeholder='Product Type'
                    onChange={selectProductType}
                    value={workOrderForm.created_type}
                  >
                  </Select>
                </Col>
                <Col span={8}>
                  <label 
                    htmlFor="Brand"
                    className='mb-1'
                  >
                    Brand
                  </label>
                  <Select
                    style={{ width: '100%' }}
                    placeholder='Product Brand'
                    options={typeDataBrand}
                    disabled={selectDisable}
                  >
                  </Select>
                </Col>
                <Col span={8}>
                  <label 
                    htmlFor="Status"
                    className='mb-1'
                  >
                    Status
                  </label>
                  <Select
                    style={{ width: '100%' }}
                    placeholder='Status'
                    options={typeStatus}
                  >
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <label 
                    htmlFor="Problem"
                    className='mb-1'
                  >
                    Problem
                  </label>
                  <Input.TextArea 
                    rows={6}
                    placeholder='Describe the device problem'
                    autoSize={{ minRows: 6, maxRows: 6 }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <label 
                    htmlFor="Remark"
                    className='mb-1'
                  >
                    Remark
                  </label>
                  <Input.TextArea 
                    rows={4}
                    placeholder='Remark'
                    autoSize={{ minRows: 4, maxRows: 4 }}
                  />
                </Col>
              </Row>
            </Space>
            <Divider />
          </Modal>
          <Tabs
            onChange={changeTabId}
            style={{ marginTop: '15px' }}
            items={workTabsTitle.map((item, index) => {
              const id = String(index + 1)
              return {
                label: `${item.label}`,
                key: id,
                children: <WorkTable
                  workInfo={workData}
                  id={id}
                />
              }
            })}
          />
        </Card>
      </Space>
    </div>
  )
}

export default Worklog;