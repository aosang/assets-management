'use client'
import { useEffect, useState } from 'react'
import { Card, Tabs, Table, Button, Drawer, Descriptions, Tag } from 'antd'
import type { TabsProps } from 'antd'
import { productItem, inventoryItem } from '@/utils/dbType'
import { getItAssetsTabbleData } from '@/utils/providerItAssetsData'
import { getLoanOutTableData } from '@/utils/providerLoanOut'
import dayjs from 'dayjs'

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<productItem[]>([])
  const [loanOutData, setLoanOutData] = useState<inventoryItem[]>([])
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [loanOutSum, setLoanOutSum] = useState<number>(0)
  const [totalQuantity, setTotalQuantity] = useState<number>(0)
  const [stockQuantity, setStockQuantity] = useState<number>(0)

  const getInventoryData =  () => {
    getItAssetsTabbleData().then(data => {
      setInventoryData(data as productItem[])
    })
  }

  const getInventoryDetails = async (id: string) => {
    setIsShowDetails(true)

    const deviceData = await getItAssetsTabbleData(id)
    let totalQuantity = deviceData![0].product_number
    
    const loanOutData = await getLoanOutTableData(id)
    
    let sum = 0
    loanOutData!.forEach(item => {
      sum += item.loanout_number
    })
    let loanOutSum = sum

    let stoke = totalQuantity - loanOutSum
    setStockQuantity(stoke)
  }

  const switchTabChange = (key: string) => {
    if(key === '2') {
      getLoanOutTableData().then(data => {
        const formatData = data?.map(item => ({
          ...item,
          loanout_time: dayjs(item.loanout_time).format('MMM D, YYYY h:mm:ss a')
        }))
        setLoanOutData(formatData as inventoryItem[])
      })
    }
  }

  const inventoryColumns = [{
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

  const loanOutColumns = [{
    title: 'No.',
    key: 'no',
    render: (_: any, __: any, index: number) => (
      <div>{index + 1}</div>
    ),
  }, {
    title: 'Type',
    dataIndex: 'loanout_type',
    key: 'loanout_type',
  }, {
    title: 'Brand',
    dataIndex: 'loanout_brand',
    key: 'loanout_brand',
  }, {
    title: 'Product',
    dataIndex: 'loanout_name',
    key: 'loanout_name',
  }, {
    title: 'Loan out quantity',
    dataIndex: 'loanout_number',
    key: 'loanout_number',
  }, {
    title: 'Loan out date',
    dataIndex: 'loanout_time',
    key: 'loanout_time',
  }, {
    title: 'Loan out by',
    dataIndex: 'loanout_user',
    key: 'loanout_user',
  }, {
    title: 'Remark',
    dataIndex: 'loanout_remark',
    key: 'loanout_remark',
  }, {
    title: 'Others',
    key: 'others',
    render: (item: any) => (
      <div>
        <Button size='small' className='bg-purple-600 text-xs text-white'>Return</Button>
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
            columns={inventoryColumns}
            dataSource={inventoryData}
            size='small'
            bordered
            className='[&_.ant-table-thead>tr>th]:!bg-[#f0f5ff]'
          />
          <Drawer
            title="Inventory Details"
            open={isShowDetails}
            onClose={() => setIsShowDetails(false)}
          >
            <div className='w-full'>
              <Descriptions column={24}>
                <Descriptions.Item span={12} label="Stock quantity">
                  <div>{stockQuantity}</div>
                </Descriptions.Item>
                <Descriptions.Item span={12} label="Status">
                  {stockQuantity > 0 ? <Tag color='green'>In stock</Tag> : <Tag color='red'>Out of stock</Tag>}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Drawer>
        </div>,
    },
    {
      key: '2',
      label: 'Loan out',
      children: <div>
        <Table
          columns={loanOutColumns}
          dataSource={loanOutData}
          size='small'
          bordered
          className='[&_.ant-table-thead>tr>th]:!bg-[#f0f5ff]'
        />
      </div>,
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
          onChange={switchTabChange}
        />
      </Card>
    </div>
  )
}

export default Inventory