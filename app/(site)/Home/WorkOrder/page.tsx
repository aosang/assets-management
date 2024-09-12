'use client'

import { Card, Space, Button, Row, Col, Tabs } from 'antd'
import type { TabsProps } from 'antd'
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
  created_title: string
  created_id: string
  created_name: string
  created_at: string
  created_type: string
  created_brand: string
  created_status: string
  created_remark: string
}

type tableData = tableItems[]

const Worklog: React.FC = () => {
  const [workData, setWorkData] = useState<tableData>([])
  const changeTabId = (e: string) => {
    if(e === '1') {
      
    }
  }

  const getWorkOrderData = async () => {
    const {data: {user}, error } = await supabase.auth.getUser()
    if(user?.id) {
      const { data, error } = await supabase
      .from('work_order')
      .select('*')
      .match({id: user?.id})
      setWorkData(data as tableItems[])
    }
  }

  useEffect(() => {
    // getWorkOrderData()
  }, [])

  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card title="WorkOrder">
          <Row gutter={10}>
            <Col><Button type='primary'>Create</Button></Col>
            <Col><Button type='primary' danger>Delete</Button></Col>
          </Row>
          {/* <Tabs
            onChange={changeTabId}
            style={{marginTop: '15px'}}
            items={workTabsTitle.map((item, index) => {
              const id = String(index + 1)
              return {
                label: `${item.label}`,
                key: id,
                children: <WorkTable workInfo={workData} id={id} />
              }
            })}            
          />           */}
        </Card>
      </Space>
    </div>
  )
}

export default Worklog;