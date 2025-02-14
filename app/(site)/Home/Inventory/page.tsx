'use client'
import { useEffect, useState } from 'react'
import { Card, Tabs, Table, Button, Drawer, Descriptions, Tag } from 'antd'
import type { TabsProps } from 'antd'
import { productItem } from '@/utils/dbType'
import { getItAssetsTabbleData } from '@/utils/providerItAssetsData'
import { getLoanOutTableData } from '@/utils/providerLoanOut'

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<productItem[]>([])
  const [isShowDetails, setIsShowDetails] = useState(false)

  const getInventoryData =  () => {
    getItAssetsTabbleData().then(data => {
      setInventoryData(data as productItem[])
    })
  }

  const getInventoryDetails = (id: string) => {
    setIsShowDetails(true)
    getLoanOutTableData(id).then(data => {
      console.log(data)
    })
  }

  const columns = [{
    title: 'No.',
    key: 'no',
    render: (_: any, __: any, index: number) => (
      <div>{index + 1}</div>
    ),
  }, {
    title: 'Type',
    dataIndex: 'product_type',
    key: 'product_type',
  }, {
    title: 'Brand',
    dataIndex: 'product_brand',
    key: 'product_brand',
  }, {
    title: 'Product',
    dataIndex: 'product_name',
    key: 'product_name',
  }, {
    title: 'Total quantity',
    dataIndex: 'product_number',
    key: 'product_number',
  }, {
    title: 'Remark',
    dataIndex: 'inventory_remark',
    key: 'inventory_remark',
  }, {
    title: 'Others',
    key: 'others',
    render: (item: any) => (
      <div>
        <Button 
          size='small' 
          type='primary' 
          className='mr-2 text-xs'
          onClick={() => getInventoryDetails(item.id)}
          >
            Details
        </Button>
        <Button size='small' className='bg-green-500 text-xs'>QR Code</Button>
      </div>
    )
  }]

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Inventory',
      children:
        <div>
          <Table
            columns={columns}
            dataSource={inventoryData}
            size='small'
            bordered
          />
          <Drawer
            title="Inventory Details"
            open={isShowDetails}
            onClose={() => setIsShowDetails(false)}
          >
            <div className='w-full'>
              <Descriptions column={24}>
                <Descriptions.Item span={12} label="Stock quantity">
                  <div>100</div>
                </Descriptions.Item>
                <Descriptions.Item span={12} label="Status">
                  <Tag  color='green'>In stock</Tag>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Drawer>
        </div>,
    },
    {
      key: '2',
      label: 'Loan out',
      children: <div>Loan out</div>,
    }
  ]

  useEffect(() => {
    getInventoryData()
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