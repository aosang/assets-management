'use client'
import { useEffect, useState } from 'react'
import { Card, Tabs } from 'antd'
import type { TabsProps } from 'antd'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Inventory',
    children: <div>Inventory</div>,
  },
  {
    key: '2',
    label: 'Loan out',
    children: <div>Loan out</div>,
  },
]

const Inventory = () => {
  useEffect(() => {
    document.title = 'Inventory Management'
  }, [])
  
  return (
    <div className='p-3 w-full box-border'>
      <Card title="Inventory Management">
        <Tabs 
          items={items}
        />
      </Card>
    </div>
  )
}

export default Inventory