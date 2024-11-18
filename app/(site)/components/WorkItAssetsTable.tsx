'use client'
import { useState } from 'react'
import{ typeDataName, typeDataBrand } from '@/utils/dbType'
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
} from 'antd'
import { getWorkOrderType, getWorkBrand } from '@/utils/providerSelectData'
import { IoIosSearch } from 'react-icons/io'
import { productItem } from '@/utils/dbType'
import useMessage from '@/utils/message'

interface itAssetsTableProps  {
  assetsInfo: productItem[]
}

type typeDataProps = typeDataName[]
type typeDataBrandProps = typeDataBrand[]

const WorkItAssetsTable: React.FC<itAssetsTableProps> = ({ assetsInfo }) => {
  const [layoutWidth, setLayoutWidth] = useState<number>(12)
  const [productBrandShow, setProductBrandShow] = useState<boolean>(false)
  const [selectOpen, setSelectOpen] = useState<boolean>(false)

  const [addItAssetsShow, setAddItAssetsShow] = useState(false)
  const [typeData, setTypeData] = useState<typeDataProps>([])
  const [typeDataBrand, setTypeDataBrand] = useState<typeDataBrandProps>([])

  const onAddItAssets = () => {
    setAddItAssetsShow(false)
    useMessage(2, 'Add an IT device successfully', 'success')
  }

  const modalAddDeviceHandler = () => {
    setAddItAssetsShow(true)
    getWorkOrderType()
    .then(res => {
      setTypeData(res as typeDataProps)
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
        })
    } else {
      setProductBrandShow(false)
      setLayoutWidth(12)
    }
  }

  const onTriggerSelected = (open: boolean) => {
    setSelectOpen(open)
  }

  const columns = [{
    title: 'Number',
    dataIndex: 'product_id',
    key: 'product_id',
    // render: text => <a href="#">{text}</a>
  }, {
    title: 'Type',
    dataIndex: 'product_type',
    key: 'product_type',
  }, {
    title: 'Product',
    dataIndex: 'product_name',
    key: 'product_name'
  }, {
    title: 'Brand',
    dataIndex: 'product_brand',
    key: 'product_brand'
  }, {
    title: 'User',
    dataIndex: 'product_username',
    key: 'product_username'
  }, {
    title: 'Status',
    dataIndex: 'product_status',
    key: 'product_status'
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
              />
            </Col>
          </Row>
          <Row gutter={20}>
            {/* status */}
            <Col span={8}>
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
              >
              </Select>
            </Col>
            {/* user */}
            <Col span={8}>
              <label htmlFor="User" className='mb-1 flex items-center font-semibold'>
                <span className='mr-1 text-red-600 font-thin'>*</span>
                User
              </label>
              <Input
                style={{ width: '100%' }}
                placeholder='Username'
              />
            </Col>
            {/* price */}
            <Col span={8}>
              <label htmlFor="Price" className='mb-1 flex items-center font-semibold'>
                Reference Price
              </label>
              <Input
                style={{ width: '100%' }}
                placeholder='Product price'
                addonAfter="USD"
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