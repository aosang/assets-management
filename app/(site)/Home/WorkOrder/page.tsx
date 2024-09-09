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


const Worklog: React.FC = () => {
  const [workData, setWorkData] = useState<any>([1,2,3,4,5,6,7,8,9,10])

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