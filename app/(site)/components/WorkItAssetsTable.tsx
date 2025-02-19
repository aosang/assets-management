'use client'
import { useEffect, useState} from 'react'
import dayjs from 'dayjs'
import{ typeDataName, typeDataBrand, productItem } from '@/utils/dbType'
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
} from 'antd'
import { getWorkOrderType, getWorkBrand } from '@/utils/providerSelectData'
import { insertItAssets, deleteItAssets, searchItAssetsData, getItAssetsTabbleData, editItAssetsData } from '@/utils/providerItAssetsData'
import { getTimeNumber } from '@/utils/pubFunProvider'
import { IoIosSearch } from 'react-icons/io'
import useMessage from '@/utils/message'

type asstesDataProps = productItem[]
type typeDataProps = typeDataName[]
type typeDataBrandProps = typeDataBrand[]

const WorkItAssetsTable: React.FC = () => {
  const [assetsData, setAssetsData] = useState<asstesDataProps>([])
  const [filterTypeValue, setFilterTypeValue] = useState<string | null>(null)
  const [filterStatusValue, setFilterStatusValue] = useState<string | null>(null)
  const [filterStartTime, setFilterStartTime] = useState<string>('')
  const [filterEndTime, setFilterEndTime] = useState<string>('')

  const [layoutWidth, setLayoutWidth] = useState<number>(8)
  const [productBrandShow, setProductBrandShow] = useState<boolean>(false)
  const [selectOpen, setSelectOpen] = useState<boolean>(false)

  const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
  const [isEditModalShow, setIsEditModalShow] = useState<boolean>(false)
  const [isEditId, setIsEditId] = useState<string>('')

  const [deleteAssetsDataId, setDeleteAssetsDataId] = useState<string[]>([])
  const [addItAssetsShow, setAddItAssetsShow] = useState(false)
  const [typeData, setTypeData] = useState<typeDataProps>([])
  const [typeDataBrand, setTypeDataBrand] = useState<typeDataBrandProps>([])
  const [assetsDataForm, setAssetsDataForm] = useState<productItem>({
    id: '',
    product_number: 0,
    product_name: '',
    product_time: getTimeNumber()[0],
    product_update: getTimeNumber()[0],
    product_type: null,
    product_brand: null,
    product_username: '',
    product_price: 0,
    product_remark: '',
    value: ''
  })

  const [columns, setColumns] = useState([
    {
      title: 'Type',
      dataIndex: 'product_type',
      key: 'product_type',
    }, {
      title: 'Brand',
      dataIndex: 'product_brand',
      key: 'product_brand',
    },  {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name'
    },  {
      title: 'Created time',
      dataIndex: 'product_time',
      key: 'product_time',
      width: 230
    },  {
      title: 'Updated time',
      dataIndex: 'product_update',
      key: 'product_update',
      width: 230
    }, {
      title: 'Number',
      dataIndex: 'product_number',
      key: 'product_number'
    }, {
      title: 'Total Price',
      dataIndex: 'product_price',
      render: (record: number) => {
        return (
          <div>
            {'$' + record}
          </div>
        )
      }
    }, {
      title: 'Remark',
      dataIndex: 'product_remark',
      key: 'product_remark'
    }, {
      title: 'Other',
      render: (record: productItem) => {
        return (
          <div>
            <Button
              className='mr-2'
              type='primary'
              size='small'
              onClick={() => onRowData.onClick(record)}
              style={{fontSize: '13px'}}
            >
              Edit
            </Button>
          </div>
        )
      }
    }
  ])

  // go to qrcode
  // const createQrCodePage = {
  //   onClick: (record: productItem) => {
  //     // window.open(`/assetsManager/TemplateCode?id=${record.product_id}`, '_blank')
  //     window.open(`/TemplateCode?id=${record.id}`, '_blank')
  //   }
  // }

  // get create time 
  const getCreateTime = () => {
    let myCreateTimeData = getTimeNumber()[0]
    setAssetsDataForm({
     ...assetsDataForm,
      product_time: myCreateTimeData,
      product_update: myCreateTimeData
    })
  }

  const onAddItAssets = () => {
    if(assetsDataForm.product_name === '') {
      useMessage(2, 'Please enter the product name','error')
    }else if(assetsDataForm.product_number <= 0) {
      useMessage(2, 'Please enter the product number','error')
    }else if(assetsDataForm.product_price <= 0) {
      useMessage(2, 'Please enter the product price','error')
    } else if(!assetsDataForm.product_type) {
      useMessage(2, 'Please select the product type','error')
    }else {
      setAddItAssetsShow(false)
      insertItAssets(assetsDataForm)
      .then(() => {
        getMyItAssetsData()
      })
    }
  }

  const getMyItAssetsData = () => {
    getItAssetsTabbleData()
      .then(res => {
        const formatData = (res as asstesDataProps).map(item => ({
          ...item,
          product_time: dayjs(item.product_time).format('MMM D, YYYY h:mm a'),
          product_update: dayjs(item.product_update).format('MMM D, YYYY h:mm a'),
        }))
        setAssetsData(formatData)
      })
  }

  const modalAddDeviceHandler = () => {
    getCreateTime()
    setAddItAssetsShow(true)
  }

  const onRowData = {
    onClick: (record: productItem) => {
      setIsEditModalShow(true)
      setIsEditId(record.id)
      setAssetsDataForm({
        ...record,
        product_name: record.product_name,
        product_type: record.product_type,
        product_brand: record. product_brand,
        product_time: record.product_time,
        product_update: getTimeNumber()[0],
        product_number: record.product_number,
        product_price: record.product_price,
        product_remark: record.product_remark,
        value: record.value
      })
    }
  }

  // edit confirm data
  const onConfirmEditAssetsData = () => {
    if(assetsDataForm.product_name === '') {
      useMessage(2, 'Please enter the product name','error')
    }else if(!assetsDataForm.product_type) {
      useMessage(2, 'Please select the product type','error')
    }else if(assetsDataForm.product_number <= 0) {
      useMessage(2, 'Please select the product number','error')
    }else if(assetsDataForm.product_price <= 0) {
      useMessage(2, 'Please enter the product price','error')
    } else {
      editItAssetsData(isEditId, assetsDataForm)
      .then(() => {
        setIsEditModalShow(false)
        getMyItAssetsData()
      })
    }
  }

  const selectProductType = (keys: string) => {
    if (keys) {
      getWorkBrand(keys)
        .then(res => {
          let brandData = res![0].product_brand.reverse() as typeDataBrandProps
          brandData = brandData.sort((a, b) => {
            return Number(a.brand_id) - Number(b.brand_id)
          })
          setLayoutWidth(6)
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
      setLayoutWidth(8)
      setAssetsDataForm({
        ...assetsDataForm,
        product_type: null,
        product_brand: null
      })
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
    setLayoutWidth(8)
 
    setAssetsDataForm({
      id: '',
      product_name: '',
      product_type: null,
      product_brand: null,
      product_number: 0,
      product_time: '',
      product_update: '',
      product_username: '',
      product_price: 0,
      product_remark: '',
      value:''
    })
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: productItem[]) => {
      let ids: string[] = []
      selectedRows.forEach(item => {
        ids.push(item.id)
      })
      setDeleteAssetsDataId(ids)
    }
  }

  // Delete data
  const deleteAssetsDataIdHandler = () => {
    if(deleteAssetsDataId.length > 0) return setIsModalDelete(true)
    useMessage(2, 'Please select the data you want to delete','error')
  }

  // Confirm delete data
  const confirmDeleteAssetsData = () => {
    setIsModalDelete(false)
    deleteItAssets(deleteAssetsDataId)
    .then (() => {
      getMyItAssetsData()
      setFilterStatusValue(null)
      setFilterTypeValue(null)
      setFilterStartTime('')
      setFilterEndTime('')
    })
  }

  // filter data
  const filterTypeDataText = (e: string) => {
    setFilterTypeValue(e)
  }
  
  const getTimeFilterData = (dateString: any) => {
    let startTime = dateString? dateString[0].$d : ''
    let endTime = dateString? dateString[1].$d : ''
    startTime = startTime?  dayjs(startTime).format('YYYY-MM-DD') : ''
    endTime = endTime? dayjs(endTime).format('YYYY-MM-DD') : ''
    setFilterStartTime(startTime)
    setFilterEndTime(endTime)
  }

  const searchFilterItAssetsData = () => {
    searchItAssetsData(filterTypeValue, filterStatusValue, filterStartTime, filterEndTime)
    .then(res => {
      setAssetsData(res as asstesDataProps)
    })
  }

  useEffect(() => {
    getWorkOrderType()
    .then(res => {
      setTypeData(res as typeDataProps)
    })
    getMyItAssetsData()
  }, [])

  return (
    <div>
      <Modal
        title="Tips"
        open={isModalDelete}
        onCancel={() => setIsModalDelete(false)}
        onOk={confirmDeleteAssetsData}
      >
        <p className="text-sm text-black">Are you sure you want to delete this data?</p>
      </Modal>

      {/* add modal */}
      <Modal 
        open={addItAssetsShow} 
        title="Add an IT device"
        onCancel={() => setAddItAssetsShow(false)}
        onOk={onAddItAssets}
        afterClose={clearAssetsDataForm}
        maskClosable={false}
        width={1000}
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
                    product_name: e.target.value,
                    value: e.target.value
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

            <Col span={layoutWidth}>
              <label
                htmlFor="Type"
                className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600 font-thin'>*</span>
                Number
              </label>
              <InputNumber
                min={0}
                style={{ width: '100%'}}
                placeholder='Product number'
                value={assetsDataForm.product_number}
                onChange={e => {
                  setAssetsDataForm({
                    ...assetsDataForm,
                    product_number: Number(e)
                  })
                }}
              />
            </Col>

            <Col span={layoutWidth}>
              <label htmlFor="Price" className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600 font-thin'>*</span>
                Total Price <i className='text-xs text-gray-500 not-italic ml-2'>(Unit Price * Quantity)</i>
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
            {/* create time */}
            <Col span={12}>
              <label
                htmlFor="Create_"
                className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600  font-thin'>*</span>
                Created time
              </label>
              <Input
                style={{ width: '100%' }}
                readOnly
                value={assetsDataForm.product_time}
              />
            </Col>
            <Col span={12}>
              <label
                htmlFor="Create_"
                className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600  font-thin'>*</span>
                Updated time
              </label>
              <Input
                style={{ width: '100%' }}
                readOnly
                value={assetsDataForm.product_update}
              />
            </Col>
          </Row>

          <Row gutter={15}>
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

      {/* edit modal */}
      <Modal
        title="Edit Device" 
        open={isEditModalShow}
        onOk={onConfirmEditAssetsData}
        onCancel={() => setIsEditModalShow(false)}
        afterClose={clearAssetsDataForm}
        maskClosable={false}
        width={1000}
      >
        <Divider/>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={15}>
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
                    product_name: e.target.value,
                    value: e.target.value
                  })
                }}
              />
            </Col>
          </Row>
          <Row gutter={15}>
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

            <Col span={layoutWidth}>
              <label htmlFor="Price" className='mb-1 flex items-center font-semibold'>
                <span className='mr-1 text-red-600 font-thin'>*</span>
                Number
              </label>
              <InputNumber
                  min={0}
                  style={{ width: '100%'}}
                  placeholder='Product price'
                  addonAfter="USD"
                  value={assetsDataForm.product_number}
                  onChange={e => {
                  setAssetsDataForm({
                  ...assetsDataForm,
                    product_number: Number(e)
                  })
                }}
              />
            </Col>

            <Col span={layoutWidth}>
              <label htmlFor="Price" className='mb-1 flex items-center font-semibold'>
                <span className='mr-1 text-red-600 font-thin'>*</span>
                Total Price
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
          <Row gutter={15}>
            <Col span={12}>
              <label
                htmlFor="Create_"
                className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600  font-thin'>*</span>
                Created time
              </label>
              <Input
                style={{ width: '100%' }}
                readOnly
                value={assetsDataForm.product_time}
              />
            </Col>
            <Col span={12}>
              <label
                htmlFor="Create_"
                className='mb-1 flex items-center font-semibold'
              >
                <span className='mr-1 text-red-600  font-thin'>*</span>
                Updated time
              </label>
              <Input
                style={{ width: '100%' }}
                readOnly
                value={assetsDataForm.product_update}
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
         <Button 
            type='primary' 
            danger
            onClick={deleteAssetsDataIdHandler}
          >
            Delete
          </Button>
        </Col>

        <Col className='flex my-0 mr-0 ml-auto'>
          <Select
            className='w-40 mr-3' 
            placeholder="Type" 
            allowClear
            options={typeData}
            onChange={filterTypeDataText}
            value={filterTypeValue}
          />
          {/* <Select
            style={{width: '32%'}}
            className='w-40 mr-3' 
            placeholder="Status" 
            allowClear
            options={assetsStatus}
            onChange={filterStatusDataText}
            value={filterStatusValue}
          /> */}
          <DatePicker.RangePicker
            className='mr-3'
            format={'YYYY-MM-DD'}
            onChange={getTimeFilterData}
          />
          <Button 
            type='primary' 
            icon={<IoIosSearch />}
            onClick={searchFilterItAssetsData}
          >
         </Button>
        </Col>
      </Row>
      <div className='mt-5'>
        <Table
          className='[&_.ant-table-thead>tr>th]:!bg-[#f0f5ff]'
          rowSelection={{...rowSelection}} 
          size='small'
          bordered
          columns={columns}
          dataSource={assetsData}
          scroll={{ x: '1300px' }}
          pagination={{ 
            position: ['bottomRight'], 
            pageSizeOptions: ['10', '20', '50'], 
            showSizeChanger: true
          }}
        />
      </div>
    </div>
  )
}
 
export default WorkItAssetsTable