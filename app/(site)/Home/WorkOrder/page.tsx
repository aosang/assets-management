'use client'

import { Card, Space, Button, Row, Col, Tabs, Modal, Divider, Select, Input } from 'antd'
import type { TabsProps} from 'antd'
import WorkTable from '../components/WorkTable'
import { useState, useEffect } from 'react'
import { supabase } from '@/utils/clients'

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

type tableItems = {
  key: string
  user_id: string
  created_product: string
  created_id: string
  created_name: string
  created_at: string
  created_type: string
  created_brand: string
  created_status: string
  created_remark: string
}

type tableData = tableItems[]

type typeDataName = {
  id: string
  value: string,
  key: string,
  product_id: string
}
type typeDataProps = typeDataName[]

type typeDataBrand = {
  id: string
  value: string,
  key: string,
}
type typeDataBrandProps = typeDataBrand[]

const Worklog: React.FC = () => {
  const [workData, setWorkData] = useState<tableData>([])
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [typeData, setTypeData] = useState<typeDataProps>([])
  const [typeDataBrand, setTypeDataBrand] = useState<typeDataBrandProps>([])

  const changeTabId = (e: string) => {
    if(e === '1') {
      
    }
  }

  const modalAddHanlder = async () => {
    setIsModalAddOpen(true)

    // get Product type
    // const {data, error} = await supabase.from('product_type').select('*')
    // try {
    //   if(data) {
    //     setTypeData(data as typeDataProps)        
    //   }
    // }catch(error) { 
    //   throw error
    // }

    // get status
    const { data } = await supabase.from('status').select('*')
    console.log(data)
  }

  const hideModal = () => {
    setIsModalAddOpen(false)
  }

  const getWorkOrderData = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if(user?.id) {
      const { data, error } = await supabase
      .from('work_order')
      .select('*')
      .match({id: user?.id})
      setWorkData(data as tableItems[])
    }
  }

  const selectProductType = async (keys:string) => {
    let key = keys
    const {data, error} = await supabase.from('product_type').select(`key, product_brand (value)`).eq('key', key)
    if(data) return setTypeDataBrand(data[0].product_brand as typeDataBrandProps)
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
            width={800} 
            open={isModalAddOpen}
            onOk={hideModal}
            onCancel={hideModal}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Divider />
            <Row gutter={20}>
              <Col span={6}>
                <label htmlFor="Product">Product</label>
                <Input 
                  style={{width: '100%'}} 
                  placeholder='Product name'
                />
              </Col>
              <Col span={6}>
                {/* product type */}
                <label htmlFor="Product">Type</label>
                <Select
                  style={{width: '100%'}} 
                  options={typeData}
                  placeholder='Product Type'
                  onChange={selectProductType}
                >  
                </Select>
              </Col>
              <Col span={6}>
                <label htmlFor="Product">Brand</label>
                <Select
                  style={{width: '100%'}}  
                  placeholder='Product Brand'
                  options={typeDataBrand}
                >  
                </Select>
              </Col>
              <Col span={6}>
              <label htmlFor="Product">Status</label>
                <Select
                  style={{width: '100%'}} 
                  placeholder='Status'
                >  
                </Select>
              </Col>
            </Row>
          </Modal>
          <Tabs
            onChange={changeTabId}
            style={{marginTop: '15px'}}
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