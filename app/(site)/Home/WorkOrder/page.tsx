'use client'

import { Card, Space, Button, Row, Col, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import WorkTable from '../components/WorkTable'
import { useState } from 'react'

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
  title: string
  type: string
  brand: string
}

type tableData = tableItems[]


const Worklog: React.FC = () => {
  const [workData, setWorkData] = useState<tableData>([{
    title: 'Router',
    type: 'It',
    brand: 'Huawei'
  }])

  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card title="WorkOrder">
          <Row gutter={10}>
            <Col><Button type='primary'>Create</Button></Col>
            <Col><Button type='primary' danger>Delete</Button></Col>
          </Row>
          <Tabs
            style={{marginTop: '15px'}}
            items={workTabsTitle.map((item, index) => {
              const id = String(index + 1)
              return {
                label: `${item.label}`,
                key: id,
                children: <WorkTable workInfo={workData}  id={id} />
              }
            })}            
          />          
        </Card>
      </Space>
    </div>

  )
}

export default Worklog;