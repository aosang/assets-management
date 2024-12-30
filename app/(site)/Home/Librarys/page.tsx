"use client"
import { useState } from "react"
import { Card, Tabs } from "antd"
import type { TabsProps } from "antd"


const Librarys =  () => {
  const tabTitle = [{
    label: 'Computer',
    key: '1',
  }, {
    label: 'Network',
    key: '2',
  }, {
    label: 'Security',
    key: '3',
  }]

  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Card title="Knowledge Base">
        {/* <Tabs defaultActiveKey="1" items={tabTitle.map((item, i) => {
          return {
            label: item.label,
            key: item.key,
            children:
              item.label === 'Computer' && <div>Computer</div> ||
              item.label === 'Network' && <div>Network</div> ||
              item.label === 'Security' && <div>Security</div>
          }
        })} /> */}

      </Card>
    </div>
  )
}


export default Librarys