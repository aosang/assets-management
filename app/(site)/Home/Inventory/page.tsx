'use client'
import { useEffect, useState } from 'react'
import { Card, Tabs, Table, Button, Drawer, Descriptions, Tag, Row, Col, Input, InputNumber, Empty } from 'antd'
import type { TabsProps } from 'antd'
import { productItem, inventoryItem } from '@/utils/dbType'
import { getItAssetsTabbleData } from '@/utils/providerItAssetsData'
import { getLoanOutTableData, insertLoanOutTableData, updateLoanOutTableData, deleteLoadoutTableData } from '@/utils/providerLoanOut'
import dayjs from 'dayjs'
import useMessage from '@/utils/message'
import { getTimeNumber } from '@/utils/pubFunProvider'

const Inventory = () => {
  const [loanOutTabKeys, setLoanOutTabKeys] = useState<string>('1')
  const [inventoryData, setInventoryData] = useState<productItem[]>([])
  const [loanOutData, setLoanOutData] = useState<inventoryItem[]>([])
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [isShowReturn, setIsShowReturn] = useState(false)
  const [stockQuantity, setStockQuantity] = useState<number>(0)
  const [returnDeviceNum, setReturnDeviceNum] = useState<number>(0)
  const [loanoutForm, setLoanoutForm] = useState<inventoryItem>({
    id: '',
    loanout_id: getTimeNumber()[1],
    loanout_name: '',
    loanout_type: '',
    loanout_brand: '',
    loanout_number: 0,
    loanout_time: getTimeNumber()[0],
    loanout_user: '',
    loanout_remark: '',
  })


  const getInventoryData = () => {
    getItAssetsTabbleData().then(data => {
      setInventoryData(data as productItem[])
    })
  }

  const getInventoryDetails = async (id: string) => {
    setIsShowDetails(true)

    const deviceData = await getItAssetsTabbleData(id)
    let totalQuantity = deviceData![0].product_number

    setLoanoutForm({
      ...loanoutForm,
      id: deviceData![0].id,
      loanout_name: deviceData![0].product_name,
      loanout_type: deviceData![0].product_type,
      loanout_brand: deviceData![0].product_brand,
      loanout_time: dayjs().format('MMM D, YYYY h:mm a'),
    })

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
    setLoanOutTabKeys(key)
    if (key === '2') {
      getLoanOutTableData().then(data => {
        const formatData = data?.map(item => ({
          ...item,
          loanout_time: dayjs(item.loanout_time).format('MMM D, YYYY h:mm a')
        }))
        setLoanOutData(formatData as inventoryItem[])
      })
    }
  }

  const clearloanoutDataForm = (type: number) => {
    type === 1 ? setIsShowDetails(false) : setIsShowReturn(false)
    setLoanoutForm({
      id: '',
      loanout_id: '',
      loanout_name: '',
      loanout_type: '',
      loanout_brand: '',
      loanout_number: 0,
      return_number: 0,
      loanout_time: '',
      loanout_user: '',
      loanout_remark: '',
    })
  }

  const returnLoanoutDevice = (item: any) => {
    setIsShowReturn(true)

    let returnDeviceNum = item.loanout_number
    setReturnDeviceNum(returnDeviceNum)

    setLoanoutForm({
      ...loanoutForm,
      id: item.id,
      loanout_id: item.loanout_id,
      loanout_name: item.loanout_name,
      loanout_type: item.loanout_type,
      loanout_brand: item.loanout_brand,
      loanout_number: 0,
      loanout_time: dayjs().format('MMM D, YYYY h:mm a'),
      loanout_user: item.loanout_user,
      loanout_remark: item.loanout_remark,
    })
  }

  const submitLoanoutDevice = () => {
    let { loanout_number, loanout_user } = loanoutForm
    if (loanout_number === 0 || loanout_number > stockQuantity) {
      useMessage(2, 'Loan out quantity is invalid', 'error')
      return
    } else if (loanout_user === '') {
      useMessage(2, 'Loan out user is invalid', 'error')
      return
    } else {
      insertLoanOutTableData(loanoutForm).then(data => {
        useMessage(2, 'Loan out device success', 'success')
        getLoanOutTableData().then(data => {
          const formatData = data?.map(item => ({
            ...item,
            loanout_time: dayjs().format('MMM D, YYYY h:mm a')
          }))
          setLoanOutData(formatData as inventoryItem[])
        })
        setIsShowDetails(false)
        clearloanoutDataForm(1)
        setLoanOutTabKeys('2')
      })
    }
  }

  const returnDeviceLoanoutEvent = () => {
    const { loanout_number, loanout_id } = loanoutForm
    if (loanout_number === 0 || loanout_number > returnDeviceNum) {
      useMessage(2, 'Return quantity is invalid', 'error')
      return
    } else {
      let returnComputed = returnDeviceNum - loanout_number
      if (returnComputed > 0) {
        updateLoanOutTableData(loanoutForm).then(data => {
          useMessage(2, 'Return device success!', 'success')
          getLoanOutTableData().then(data => {
            const formatData = data?.map(item => ({
              ...item,
              loanout_time: dayjs().format('MMM D, YYYY h:mm a')
            }))
            setLoanOutData(formatData as inventoryItem[])
          })
          setIsShowReturn(false)
        })
      }else if(returnComputed === 0) {
        deleteLoadoutTableData(loanout_id).then(data => {
          getLoanOutTableData().then(data => {
            const formatData = data?.map(item => ({
             ...item,
              loanout_time: dayjs().format('MMM D, YYYY h:mm a')
            }))
            setLoanOutData(formatData as inventoryItem[])
          })
          setIsShowReturn(false)
          clearloanoutDataForm(2)
          useMessage(2, 'Return device success!','success')
        })
      } else {
        useMessage(2, 'Return quantity is invalid', 'error')
        return
      }
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
          loan out
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
        <Button
          onClick={() => returnLoanoutDevice(item)}
          size='small'
          className='bg-green-500 
          text-xs 
          text-white'
        >
          Return
        </Button>
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
            pagination={{ 
              position: ['bottomRight'], 
              pageSizeOptions: ['10', '20', '50'], 
              showSizeChanger: true
            }}
          />
          <Drawer
            title="Loan Out"
            open={isShowDetails}
            onClose={() => clearloanoutDataForm(1)}
            maskClosable={false}
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
              {stockQuantity > 0 ? (
                <>
                  <Row gutter={15} className='mt-4'>
                    <Col span={24} className='mb-3'>
                      <label className='flex mb-1' htmlFor="Product Name">
                        Product Name
                      </label>
                      <Input value={loanoutForm.loanout_name} readOnly />
                    </Col>
                    <Col span={24} className='mb-3'>
                      <label className='flex mb-1' htmlFor="Product Type">
                        Product Type
                      </label>
                      <Input value={loanoutForm.loanout_type} readOnly />
                    </Col>
                    <Col span={24} className='mb-3'>
                      <label className='flex mb-1' htmlFor="Product Type">
                        Product Brand
                      </label>
                      <Input placeholder="Product Brand" readOnly value={loanoutForm.loanout_brand} />
                    </Col>
                    <Col span={24} className='mb-3'>
                      <label className='flex mb-1' htmlFor="Loan Out Quantity">
                        Loan Out Time
                      </label>
                      <Input placeholder="Loan Out Time" readOnly value={loanoutForm.loanout_time} />
                    </Col>
                    <Col span={24} className='mb-3'>
                      <label className='flex mb-1' htmlFor="Loan Out Quantity">
                        <span className='text-red-500 text-sx mNumber mr-1'>*</span>
                        Loan Out Quantity
                      </label>
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        placeholder="Number"
                        value={loanoutForm.loanout_number}
                        addonAfter={'<=' + stockQuantity}
                        onChange={value => setLoanoutForm({ ...loanoutForm, loanout_number: value ?? 0 })}
                      />
                    </Col>
                    <Col span={24} className='mb-3'>
                      <label className='flex mb-1' htmlFor="Loan Out Quantity">
                        <span className='text-red-500 text-sx mr-1'>*</span>
                        Loan Out User
                      </label>
                      <Input
                        placeholder="username"
                        value={loanoutForm.loanout_user}
                        onChange={e => setLoanoutForm({ ...loanoutForm, loanout_user: e.target.value })}
                      />
                    </Col>
                    <Col span={24} className='mt-3'>
                      <Input.TextArea
                        placeholder='Remark'
                        showCount
                        rows={5}
                        autoSize={{ minRows: 5, maxRows: 5 }}
                        maxLength={100}
                      />
                    </Col>
                  </Row>
                  <div className='flex mt-6'>
                    <Button className='mr-4' onClick={() => setIsShowDetails(false)}>Cancel</Button>
                    <Button type='primary' onClick={submitLoanoutDevice}>Confirm</Button>
                  </div>
                </>
              ) : (
                <div className='flex justify-center mt-16 flex-col'>
                  <Empty description='Low Inventory' />
                </div>
              )}

            </div>
          </Drawer>

          {/* return device */}
          <Drawer
            title="Return Device"
            open={isShowReturn}
            onClose={() => clearloanoutDataForm(2)}
            maskClosable={false}
          >
            <div className='w-full'>
              <Row gutter={15}>
                <Col span={24} className='mb-3'>
                  <label className='flex mb-1' htmlFor="Product Name">
                    Product Name
                  </label>
                  <Input value={loanoutForm.loanout_name} readOnly />
                </Col>
                <Col span={24} className='mb-3'>
                  <label className='flex mb-1' htmlFor="Product Type">
                    Product Type
                  </label>
                  <Input value={loanoutForm.loanout_type} readOnly />
                </Col>
                <Col span={24} className='mb-3'>
                  <label className='flex mb-1' htmlFor="Product Type">
                    Product Brand
                  </label>
                  <Input placeholder="Product Brand" readOnly value={loanoutForm.loanout_brand} />
                </Col>
                <Col span={24} className='mb-3'>
                  <label className='flex mb-1' htmlFor="Loan Out Quantity">
                    Loan Out Time
                  </label>
                  <Input placeholder="Loan Out Time" readOnly value={loanoutForm.loanout_time} />
                </Col>
                <Col span={24} className='mb-3'>
                  <label className='flex mb-1' htmlFor="Loan Out Quantity">
                    <span className='text-red-500 text-sx mNumber mr-1'>*</span>
                    Loan Out Quantity
                  </label>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    placeholder="Number"
                    value={loanoutForm.loanout_number}
                    addonAfter={'<=' + returnDeviceNum}
                    onChange={value => setLoanoutForm({ ...loanoutForm, loanout_number: value ?? 0 })}
                  />
                </Col>
                <Col span={24} className='mb-3'>
                  <label className='flex mb-1' htmlFor="Loan Out Quantity">
                    <span className='text-red-500 text-sx mr-1'>*</span>
                    Loan Out User
                  </label>
                  <Input
                    placeholder="username"
                    value={loanoutForm.loanout_user}
                    onChange={e => setLoanoutForm({ ...loanoutForm, loanout_user: e.target.value })}
                    readOnly
                  />
                </Col>
                <Col span={24} className='mt-3'>
                  <Input.TextArea
                    placeholder='Remark'
                    showCount
                    rows={5}
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    maxLength={100}
                  />
                </Col>
              </Row>
            </div>
            <div className='flex mt-6'>
              <Button className='mr-4' onClick={() => setIsShowReturn(false)}>Cancel</Button>
              <Button type='primary' onClick={returnDeviceLoanoutEvent}>Return</Button>
            </div>
          </Drawer>
        </div>
    },
    {
      key: '2',
      label: 'Loan out',
      children:
        <div>
          <Table
            columns={loanOutColumns}
            dataSource={loanOutData}
            size='small'
            bordered
            className='[&_.ant-table-thead>tr>th]:!bg-[#f0f5ff]'
            pagination={{ 
              position: ['bottomRight'], 
              pageSizeOptions: ['10', '20', '50'], 
              showSizeChanger: true
            }}
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
          activeKey={loanOutTabKeys}
          items={items}
          onChange={switchTabChange}
        />
      </Card>
    </div>
  )
}

export default Inventory