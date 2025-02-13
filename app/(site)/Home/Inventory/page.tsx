'use client'
import { useEffect, useState } from 'react'
import { Card, Tabs, Table } from 'antd'
import type { TabsProps } from 'antd'

const columns = [{
    title: 'Type',
    dataIndex: 'Type',
    key: 'Type',
  },{
    title: 'Brand',
    dataIndex: 'Brand',
    key: 'Brand',
  },{
    title: 'Product',
    dataIndex: 'Product',
    key: 'Product',
  },{
    title: 'Total quantity',
    dataIndex: 'Number',
    key: 'Number',
  },{
    title: 'Remaining stock',
    dataIndex: 'Remain',
    key: 'Remain',
  },{
    title: 'Status',
    dataIndex: 'Status',
    key: 'Status',
  },{
    title: 'Remark',
    dataIndex: 'Remark',
    key: 'Remark',
  }]

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Inventory',
    children: 
    <div>
      <Table
        columns={columns}
        dataSource={[]}
        size='small'
        bordered
      />
    </div>,
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