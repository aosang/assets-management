'use client'
import { useEffect, useState } from 'react'
import{ typeDataName, typeDataBrand, assetsItem, productItem } from '@/utils/dbType'
import { 
  Button, 
  Row, 
  Col, 
  Select, 
  DatePicker, 
  Table, 
  Modal, 
  Divider,
  Space,
  Input,
  InputNumber,
  Tag
} from 'antd'
import { getWorkOrderType, getWorkBrand } from '@/utils/providerSelectData'
import { getItAssetsStatusData, insertItAssets } from '@/utils/providerItAssetsData'
import { getTimeNumber } from '@/utils/pubFunProvider'
import { IoIosSearch } from 'react-icons/io'
import useMessage from '@/utils/message'

interface itAssetsTableProps  {
  assetsInfo: productItem[]
}

type typeDataProps = typeDataName[]
type typeDataBrandProps = typeDataBrand[]
type assetsStatusProps = assetsItem[]

const WorkItAssetsTable: React.FC<itAssetsTableProps> = ({ assetsInfo }) => {
  const [layoutWidth, setLayoutWidth] = useState<number>(12)
  const [productBrandShow, setProductBrandShow] = useState<boolean>(false)
  const [selectOpen, setSelectOpen] = useState<boolean>(false)
  const [assetsStatusShow, setAssetsStatusShow] = useState<boolean>(false)
  const [assetsStatusWidth, setAssetsStatusWidth] = useState<number>(12)

  const [addItAssetsShow, setAddItAssetsShow] = useState(false)
  const [typeData, setTypeData] = useState<typeDataProps>([])
  const [typeDataBrand, setTypeDataBrand] = useState<typeDataBrandProps>([])
  const [assetsStatus, setAssetsStatus] = useState<assetsStatusProps>([])
  const [assetsDataForm, setAssetsDataForm] = useState<productItem>({
    product_id: '',
    product_name: '',
    product_time: '',
    product_type: null,
    product_brand: null,
    product_status: null,
    product_username: '',
    product_price: 0,
    product_remark: ''
  })

  // get create time 
  const getCreateTime = () => {
    let myCreateTimeData = getTimeNumber()[0]
    setAssetsDataForm({
     ...assetsDataForm,
      product_time: myCreateTimeData
    })
  }

  const onAddItAssets = () => {
    if(assetsDataForm.product_name === '') {
      useMessage(2, 'Please enter the product name','error')
    }else if(!assetsDataForm.product_type) {
      useMessage(2, 'Please select the product type','error')
    }else if(!assetsDataForm.product_brand) {
      useMessage(2, 'Please select the product brand','error')
    }else if(!assetsDataForm.product_status) {
      useMessage(2, 'Please select the product status','error')
    }else if(assetsDataForm.product_status === 'Checkout' && assetsDataForm.product_username === '') {
      useMessage(2, 'Please enter the user name','error')
    }else {
      setAddItAssetsShow(false)
      insertItAssets(assetsDataForm)
    }
  }

  const modalAddDeviceHandler = () => {
    getCreateTime()
    setAddItAssetsShow(true)
    getWorkOrderType()
    .then(res => {
      setTypeData(res as typeDataProps)
    })

    getItAssetsStatusData()
    .then(res => {
      setAssetsStatus(res as assetsStatusProps)
    })
  }

  const selectProductType = (keys: string) => {
    if (keys) {
      getWorkBrand(keys)
        .then(res => {
          let brandData = res![0].product_brand.reverse() as typeDataBrandProps
          brandData = brandData.sort((a, b) => {
            return Number(a.brand_id) - Number(b.brand_id)
          })
          setLayoutWidth(8)
          setProductBrandShow(true)
          setTypeDataBrand(brandData)
          setAssetsDataForm({
            ...assetsDataForm,
            product_type: keys,
            product_brand: brandData[0].value,
          })
        })
    } else {
      setProductBrandShow(false)
      setLayoutWidth(12)
      setAssetsDataForm({
        ...assetsDataForm,
        product_type: null,
        product_brand: null
      })
    }
  }

  const selectItAssetsStatusText = (keys: string) => {
    setAssetsDataForm({
      ...assetsDataForm,
       product_status: keys
     })
    if(keys === 'Checkout') {
      setAssetsStatusShow(true)
      setAssetsStatusWidth(8)
    } else {
      setAssetsStatusShow(false)
      setAssetsStatusWidth(12)
    }
  }
  
  const onTriggerSelected = (open: boolean) => {
    setSelectOpen(open)
  }

  const assetsProductBrand = (keys: string) => {
    setAssetsDataForm({
    ...assetsDataForm,
      product_brand: keys
    })
  }

  // clear form data
  const clearAssetsDataForm = () => {
    setProductBrandShow(false)
    setAssetsStatusShow(false)
    setLayoutWidth(12)
    setAssetsStatusWidth(12)

    setAssetsDataForm({
      product_id: '',
      product_name: '',
      product_type: null,
      product_brand: null,
      product_status: null,
      product_time: '',
      product_username: '',
      product_price: 0,
      product_remark: ''
    })
  }

  useEffect(() => {
    getCreateTime()
  }, [])

  const columns = [{
    title: 'Number',
    dataIndex: 'product_id',
    key: 'product_id', 
    width: 160
    // render: text => <a href="#">{text}</a>
  }, {
    title: 'Type',
    dataIndex: 'product_type',
    key: 'product_type',
  }, {
    title: 'Brand',
    dataIndex: 'product_brand',
    key: 'product_brand'
  },  {
    title: 'Product',
    dataIndex: 'product_name',
    key: 'product_name'
  }, {
    title: 'Status',
    dataIndex: 'product_status',
    key: 'product_status',
    render: (text) => {
      return (
        <div>
          {text === 'Putaway' && <Tag color='success'>{text}</Tag>}
          {text === 'Checkout' && <Tag color='processing'>{text}</Tag>}
          {text === 'Under maintenance' && <Tag color='warning'>{text}</Tag>}
          {text === 'Decommission' && <Tag color='error'>{text}</Tag>}
        </div>
      )
    }
  }, {
    title: 'User',
    dataIndex: 'product_username',
    key: 'product_username'
  }, {
    title: 'Remark',
    dataIndex: 'product_remark',
    key: 'product_remark'
  }]

  return (
    <div>
      <Modal 
        open={addItAssetsShow} 
        title="Add an IT device"
        onCancel={() => setAddItAssetsShow(false)}
        onOk={onAddItAssets}
        afterClose={clearAssetsDataForm}
        maskClosable={false}
        width={960}
      >
        <Divider/>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={20}>
            {/* product name */}
            <Col span={24}>
              <label htmlFor="Product" className='mb-1 flex items-center font-semibold'>
                <span className='mr-1 text-red-600 font-thin'>*</span>
                Product Name
              </label>
              <Input
                style={{ width: '100%' }}
                placeholder='Product name'
                value={assetsDataForm.product_name}
                onChange={e => {
                  setAssetsDataForm({
                   ...assetsDataForm,
                    product_name: e.target.value
                  })
                }}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={layoutWidth}>
              {/* product type */}
              <label
                htmlFor="Type"
                className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600 font-thin'>*</span>
                Product Type
              </label>
              <Select
                style={{ width: '100%' }}
                placeholder='Product type'
                allowClear
                options={typeData}
                onChange={selectProductType}
                value={assetsDataForm.product_type}
              >
              </Select>
            </Col>

            {/* product brand */}
            {productBrandShow && (
              <Col span={layoutWidth}>
                <label
                  htmlFor="Brand"
                  className='mb-1 flex items-center font-semibold'
                >
                  <span className='mr-1 text-red-600 font-thin'>*</span>
                  Brand
                </label>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Product brand'
                  allowClear
                  onDropdownVisibleChange={onTriggerSelected}
                  value={assetsDataForm.product_brand}
                  onChange={assetsProductBrand}
                  options={typeDataBrand.map(item => {
                    return {
                      label:
                        <div className='flex'>
                          {selectOpen && <img src={item.logo_url} alt='avatar' className='mr-2 w-6' />}<span className='w-7 mt-0.5'>{item.value}</span>
                        </div>,
                      value: item.value
                    }
                  })}
                >
                </Select>
              </Col>
            )}
            
            {/* create time */}
            <Col span={layoutWidth}>
              <label
                htmlFor="Create_"
                className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600  font-thin'>*</span>
                Create time
              </label>
              <Input
                style={{ width: '100%' }}
                readOnly
                value={assetsDataForm.product_time}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            {/* status */}
            <Col span={assetsStatusWidth}>
              <label
                htmlFor="Status"
                className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600 font-thin'>*</span>
                Status
              </label>
              <Select
                style={{ width: '100%' }}
                placeholder='Status'
                allowClear
                options={assetsStatus}
                onChange={selectItAssetsStatusText}
                value={assetsDataForm.product_status}
              >
              </Select>
            </Col>

            {/* user */}
            {assetsStatusShow && (
              <Col span={assetsStatusWidth}>
                <label htmlFor="User" className='mb-1 flex items-center font-semibold'>
                  <span className='mr-1 text-red-600 font-thin'>*</span>
                  User
                </label>
                <Input
                  style={{ width: '100%' }}
                  placeholder='Username'
                  value={assetsDataForm.product_username}
                  allowClear
                  onChange={e => {
                    setAssetsDataForm({
                     ...assetsDataForm,
                      product_username: e.target.value
                    })
                  }}
                />
              </Col>
            )}
          
            {/* price */}
            <Col span={assetsStatusWidth}>
              <label htmlFor="Price" className='mb-1 flex items-center font-semibold'>
                Reference Price
              </label>
              <InputNumber
                min={0}
                style={{ width: '100%'}}
                placeholder='Product price'
                addonAfter="USD"
                value={assetsDataForm.product_price}
                onChange={e => {
                  setAssetsDataForm({
                 ...assetsDataForm,
                    product_price: Number(e)
                  })
                }}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              <label
                htmlFor="Problem"
                className='mb-1 flex items-center font-semibold'
              >
                Remark
              </label>
              <Input.TextArea
                rows={5}
                autoSize={{ minRows: 5, maxRows: 5 }}
                placeholder='Remark'
                maxLength={260}
                value={assetsDataForm.product_remark}
                onChange={e => {
                  setAssetsDataForm({
                 ...assetsDataForm,
                    product_remark: e.target.value
                  })
                }}
              />
            </Col>
          </Row>
        </Space>
        <Divider/>
      </Modal>
      <Row gutter={10}>
        <Col>
          <Button 
            type='primary' 
            onClick={modalAddDeviceHandler}
          >
            Create
          </Button>
        </Col>
        <Col>
         <Button type='primary' danger>Delete</Button>
        </Col>
        <Col className='flex my-0 mr-0 ml-auto'>
          <Select
            className='w-40 mr-3' 
            placeholder="Type" 
            allowClear
          />
          <Select
            className='w-40 mr-3' 
            placeholder="Status" 
            allowClear
          />
          <DatePicker.RangePicker
            className='mr-3'
            format={'YYYY-MM-DD'}
          />
          <Button type='primary' icon={<IoIosSearch />}></Button>
        </Col>
      </Row>
      <div className='mt-5'>
        <Table 
          size='middle'
          bordered
          columns={columns}
          dataSource={assetsInfo}
        />
      </div>
    </div>
  )
}
 
export default WorkItAssetsTable