'use client'
import {tableItems, typeDataName, typeDataBrand, statusItem, workOrderFormProps, selectInspectionItem} from '@/utils/dbType'
import {getWorkOrderType, getWorkOrderStatus, getWorkBrand, getProfiles, getUser, getWorkOrder, insertUpdateWorkOrder, deleteWorkOrder } from '@/utils/providerSelectData'
import { editWorkOrderData } from '@/utils/pubEditProviders'
import { getFilterWorkStatus, getFilterWorkType, searchTypeData } from '@/utils/pubFilterProviders'
import { Card, Space, Button, Row, Col, Modal, Divider, Select, Input, DatePicker, Skeleton } from 'antd'
import { IoIosSearch } from "react-icons/io"
import { useState, useEffect } from 'react'
import { getTimeNumber, getDeviceData } from '@/utils/pubFunProvider'
import WorkTable from '../../components/WorkTable'
import useMessage from '@/utils/message'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@components/LanguageChange/LanguageContext'

import zhCN from 'antd/es/date-picker/locale/zh_CN'
import enUS from 'antd/es/date-picker/locale/en_US'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

type tableData = tableItems[]
type typeDataProps = typeDataName[]
type typeDataBrandProps = typeDataBrand[]
type statusItemProps = statusItem[]

const WorkOrder: React.FC = ({ }) => {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [layoutWidth, setLayoutWidth] = useState<number>(8)
  const [productBrandShow, setProductBrandShow] = useState<boolean>(false)
  const [deleteDataId, setDeleteDataId] = useState<string[]>([])

  const [typeFilter, setTypeFilter] = useState<[]>([])
  const [statusFilter, setStatusFilter] = useState<[]>([])
  const [filterTypeValue, setFilterTypeValue] = useState<string | null>(null)
  const [filterStatusValue, setFilterStatusValue] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalDelete, setIsModalDelete] = useState(false)
  const [selectOpen, setSelectOpen] = useState<boolean>(false)

  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [editId, setEditId] = useState<string>('')

  // data
  const [workData, setWorkData] = useState<tableData>([])
  const [typeData, setTypeData] = useState<typeDataProps>([])
  const [deviceData, setDeviceData] = useState<selectInspectionItem[]>([])
  const [typeDataBrand, setTypeDataBrand] = useState<typeDataBrandProps>([])
  const [typeStatus, setTypeStatus] = useState<statusItemProps>([])
  const [workOrderForm, setWorkOrderForm] = useState<workOrderFormProps>({
    created_product: null,
    created_time: '',
    created_update: '',
    created_name: '',
    created_text: '',
    created_solved: '',
    created_type: null,
    created_brand: null,
    created_status: null,
    created_remark: '',
  })

  const onDeleteConfirm = async () => {
    deleteWorkOrder(deleteDataId)
      .then(() => {
        setIsModalDelete(false)
        getWorkOrderData()
        setFilterStatusValue(null)
        setFilterTypeValue(null)
        setStartTime(null)
        setEndTime(null)
      })
  }

  const onDeleteModal = () => {
    if (deleteDataId.length !== 0) return setIsModalDelete(true)
    useMessage(2, 'Please select delete data', 'error')
  }

  const onDeleteData = (selectData: tableItems[]) => {
    let uniqueData = Array.from(new Set(selectData.map(item => item.created_id)))
    setDeleteDataId(uniqueData)
  }

  // get profiles
  const getProfilesUsername = async () => {
    getProfiles()
      .then(res => {
        if (res) {
          setWorkOrderForm({
            ...workOrderForm,
            created_name: res[0].username,
            created_time: getTimeNumber()[0],
            created_update: getTimeNumber()[0]
          })
        }
      })
  }

  const modalAddHandler = async () => {
    setIsModalAddOpen(true)
    getProfilesUsername()

    // get Product type
    getWorkOrderType()
      .then(res => {
        if (res) {
          const formattedOptions = res.map((item: any) => ({
            value: locale === 'zh'? item.name_ch : item.value,
          }))
          setTypeData(formattedOptions as typeDataProps)
        }
      })
      .catch(error => {
        throw error
      })

    // get status
    getWorkOrderStatus()
      .then(res => {
        if (res) {
          const formattedOptions = res.map((item: any) => ({
            value: locale === 'zh'? item.name_ch : item.value,
          }))
          setTypeStatus(formattedOptions as statusItemProps)
        }
      })

    // get device
    getDeviceData().then(res => {
      setDeviceData(res as selectInspectionItem[])
    })
  }

  const onEditData = (selectData: tableItems, typeNum: number) => {
    // get Product type
    getWorkOrderType()
      .then(res => {
        setTypeData(res as typeDataProps)
      })
      .catch(error => {
        throw error
      })

    // get status
    getWorkOrderStatus()
      .then(res => {
        setTypeStatus(res as statusItemProps)
      })

    if (typeNum === 1) {
      setIsModalEditOpen(true)
      setEditId(selectData.created_id)
      setWorkOrderForm({
        ...workOrderForm,
        created_product: selectData.created_product,
        created_time: selectData.created_time,
        created_update: getTimeNumber()[0],
        created_name: selectData.created_name,
        created_text: selectData.created_text,
        created_solved: selectData.created_solved,
        created_type: selectData.created_type,
        created_brand: selectData.created_brand,
        created_status: selectData.created_status,
        created_remark: selectData.created_remark,
      })
    }
  }

  const confirmModalForm = () => {
    const { created_brand, created_status, created_product, created_text, created_solved, created_type } = workOrderForm
    // verify form
    if (!created_product) {
      useMessage(2, 'Select product name', 'error')
    } else if (!created_type) {
      useMessage(2, 'Select product type', 'error')
    } else if (!created_brand) {
      useMessage(2, 'Select product brand', 'error')
    } else if (!created_status) {
      useMessage(2, 'Select status', 'error')
    } else if (!created_text) {
      useMessage(2, 'Describe the device problem', 'error')
    } else if (!created_solved) {
      useMessage(2, 'Describe the solution', 'error')
    } else {
      insertUpdateWorkOrder(workOrderForm).then(res => {
        if (res) {
          setIsModalAddOpen(false)
          getWorkOrderData()
        }
      })
    }
  }

  const cancelModalForm = () => {
    setIsModalAddOpen(false)
  }

  // edit
  const editCancelModalForm = () => {
    setIsModalEditOpen(false)
  }

  const confirmEditModalForm = () => {
    editWorkOrderData(editId, { ...workOrderForm, created_update: getTimeNumber()[0] })
      .then(res => {
        setIsModalEditOpen(false)
        useMessage(2, 'Update success!', 'success')
        getWorkOrderData()
      })
  }

  const onClosedHandler = () => {
    setProductBrandShow(false)
    setLayoutWidth(8)
    setWorkOrderForm({
      ...workOrderForm,
      created_product: '',
      created_text: '',
      created_solved: '',
      created_type: null,
      created_brand: null,
      created_status: null,
      created_remark: ''
    })
  }

  const getWorkOrderData = async () => {
    // get workorder data
    getUser()
      .then(res => {
        let id = res?.user?.id
        getWorkOrder(id as string)
          .then(res => {
            setWorkData(res as tableItems[])
            setIsLoading(false)
          })
      })
  }

  const selectProductType = async (keys: string, option: any) => {
    console.log(keys, option)
    if (keys) {
      // getWorkBrand(keys)
      //   .then(res => {
      //     let brandData = res![0].product_brand.reverse() as typeDataBrandProps
      //     brandData = brandData.sort((a, b) => {
      //       return Number(a.brand_id) - Number(b.brand_id)
      //     })
      //     setLayoutWidth(6)
      //     setProductBrandShow(true)
      //     setTypeDataBrand(brandData)
      //     setWorkOrderForm({
      //       ...workOrderForm,
      //       created_brand: res![0].product_brand[0].value,
      //       created_type: keys
      //     })
      //   })
    } else {
      setWorkOrderForm({
        ...workOrderForm,
        created_type: null,
        created_brand: null
      })
      setProductBrandShow(false)
      setLayoutWidth(8)
      setTypeDataBrand([])
    }
  }

  // filter data
  const getFilterType = async () => {
    getFilterWorkType().then(res => {
      if (res) {
        // 根据当前语言格式化选项
        const formattedOptions = res.map((item: any) => ({
          value: locale === 'zh' ? item.name_ch : item.value,
        }))
        setTypeFilter(formattedOptions as [])
      }
    })
  }

  const getFilterStatus = async () => {
    getFilterWorkStatus().then(res => {
      if (res) {
        const formattedOptions = res.map((item: any) => ({
          value: locale === 'zh' ? item.name_ch : item.value,
        }))
        setStatusFilter(formattedOptions as [])
      }
    })
  }

  const searchFilterTypeData = async (e: string) => {
    setFilterTypeValue(e)
  }

  const searchFilterStatusData = async (e: string) => {
    setFilterStatusValue(e)
  }

  const getTimeFilterData = (dateString: any) => {
    let startTime = dateString ? dateString[0].$d : ''
    let endTime = dateString ? dateString[1].$d : ''
    if (locale === 'zh') {
      startTime = startTime ? dayjs(startTime).format('YYYY-MM-DD') : ''
      endTime = endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
    } else {
      startTime = startTime ? dayjs(startTime).format('MMM D, YYYY h:mm a') : ''
      endTime = endTime ? dayjs(endTime).format('MMM D, YYYY h:mm a') : ''
    }
    setStartTime(startTime)
    setEndTime(endTime)
  }

  const searchFilterWorkOrderData = () => {
    searchTypeData(filterTypeValue, filterStatusValue, startTime, endTime)
      .then(res => {
        setWorkData(res as tableItems[])
      })
  }

  const onTriggerSelected = (open: boolean) => {
    setSelectOpen(open)
  }

  useEffect(() => {
    document.title = 'WorkOrder'
    getWorkOrderData()
  }, [])

  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card title={t('WorkOrder.WorkOrder')}>
          <Skeleton loading={isLoading} active paragraph={{rows: 10}}>
            <Row gutter={10}>
              <Col>
                <Button type='primary' onClick={modalAddHandler}>
                  {t('Public.Create')}
                </Button>
              </Col>
              <Col>
                <Button type='primary' danger onClick={onDeleteModal}>
                  {t('Public.Delete')}
                </Button>
              </Col>
              <Col className='flex my-0 mr-0 ml-auto'>
                <Select
                  className='w-40 mr-3'
                  placeholder={t('Public.Type')}
                  onFocus={getFilterType}
                  onChange={searchFilterTypeData}
                  options={typeFilter}
                  value={filterTypeValue}
                  allowClear
                >
                </Select>
                <Select
                  className='w-40 mr-3'
                  placeholder={t('Public.Status')}
                  onFocus={getFilterStatus}
                  onChange={searchFilterStatusData}
                  options={statusFilter}
                  value={filterStatusValue}
                  allowClear
                >
                </Select>
                <DatePicker.RangePicker
                  className='mr-3'
                  onChange={getTimeFilterData}
                  format={'YYYY-MM-DD'}
                  locale={locale === 'zh'? zhCN : enUS}
                />
                <Button type='primary' icon={<IoIosSearch />} onClick={searchFilterWorkOrderData}></Button>
              </Col>
            </Row>

            {/* delete */}
            <Modal
              title="Tips"
              open={isModalDelete}
              onOk={onDeleteConfirm}
              onCancel={() => setIsModalDelete(false)}
            >
              <p className="text-sm text-black">Are you sure you want to delete this data?</p>
            </Modal>

            {/* add */}
            <Modal
              title="Create Work Order"
              width={1000}
              open={isModalAddOpen}
              onOk={confirmModalForm}
              onCancel={cancelModalForm}
              okText="Confirm"
              cancelText="Cancel"
              afterClose={onClosedHandler}
              maskClosable={false}
            >
              <Divider />
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Row gutter={12}>
                  <Col span={8}>
                    <label
                      htmlFor="Product"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      {t('Public.Product')}
                    </label>
                    <Select
                      className='w-full'
                      options={deviceData}
                      placeholder={t('Public.productNamePlaceholder')}
                      showSearch
                      allowClear
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_product: e })}
                    >
                    </Select>
                  </Col>
                  <Col span={8}>
                    <label
                      htmlFor="Create_name"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600  font-thin'>*</span>
                      {t('Public.CreatedName')}
                    </label>
                    <Input
                      style={{ width: '100%' }}
                      readOnly
                      value={workOrderForm.created_name}
                    />
                  </Col>
                  <Col span={8}>
                    <label
                      htmlFor="Status"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      {t('Public.Status')}
                    </label>
                    <Select
                      style={{ width: '100%' }}
                      placeholder={t('Public.Status')}
                      options={typeStatus}
                      value={workOrderForm.created_status}
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_status: e })}
                    >
                    </Select>
                  </Col>
                </Row>
                <Row gutter={15}>
                  <Col span={layoutWidth}>
                    <label
                      htmlFor="Create_name"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600  font-thin'>*</span>
                      {t('Public.CreatedTime')}
                    </label>
                    <Input
                      style={{ width: '100%' }}
                      readOnly
                      value={workOrderForm.created_time}
                    />
                  </Col>
                  <Col span={layoutWidth}>
                    <label
                      htmlFor="Create_name"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600  font-thin'>*</span>
                      {t('Public.UpdatedTime')}
                    </label>
                    <Input
                      style={{ width: '100%' }}
                      readOnly
                      value={workOrderForm.created_update}
                    />
                  </Col>
                  <Col span={layoutWidth}>
                    {/* product type */}
                    <label
                      htmlFor="Type"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      {t('Public.Type')}
                    </label>
                    <Select
                      style={{ width: '100%' }}
                      options={typeData}
                      placeholder={t('Public.Type')}
                      onChange={selectProductType}
                      value={workOrderForm.created_type}
                      allowClear
                    >
                    </Select>
                  </Col>
                  {productBrandShow && (
                    <Col span={layoutWidth}>
                      <label
                        htmlFor="Brand"
                        className='mb-1 flex items-center font-semibold'
                      >
                        <span className='mr-1 text-red-600 font-thin'>*</span>
                        {t('Public.Brand')}
                      </label>
                      <Select
                        style={{ width: '100%' }}
                        placeholder={t('Public.Brand')}
                        options={typeDataBrand.map(item => {
                          return {
                            label:
                              <div className='flex items-center'>
                                {selectOpen && <img src={item.logo_url} alt='avatar' className='mr-2 w-7' />}<span className='w-7 mt-0.5'>{item.value}</span>
                              </div>,
                            value: item.value
                          }
                        })}
                        value={workOrderForm.created_brand}
                        onChange={e => setWorkOrderForm({ ...workOrderForm, created_brand: e })}
                        allowClear
                        onDropdownVisibleChange={onTriggerSelected}
                      >
                      </Select>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col span={24}>
                    <label
                      htmlFor="Problem"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      Problem
                    </label>
                    <Input.TextArea
                      rows={5}
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      placeholder='Describe the device problem'
                      value={workOrderForm.created_text}
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_text: e.target.value })}
                      maxLength={260}
                      showCount
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label
                      htmlFor="Solution"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      Solution
                    </label>
                    <Input.TextArea
                      rows={5}
                      placeholder='Describe the solution'
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      value={workOrderForm.created_solved}
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_solved: e.target.value })}
                      maxLength={260}
                      showCount
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label
                      htmlFor="Remark"
                      className='mb-1 flex items-center font-semibold'
                    >
                      Remark
                    </label>
                    <Input.TextArea
                      rows={4}
                      placeholder='Remark'
                      autoSize={{ minRows: 3, maxRows: 3 }}
                      value={workOrderForm.created_remark}
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_remark: e.target.value })}
                      maxLength={120}
                      showCount
                    />
                  </Col>
                </Row>
              </Space>
              <Divider />
            </Modal>

            {/* edit */}
            <Modal
              title="Edit Work Order"
              width={1000}
              open={isModalEditOpen}
              onOk={confirmEditModalForm}
              onCancel={editCancelModalForm}
              okText="Confirm"
              cancelText="Cancel"
              afterClose={onClosedHandler}
              maskClosable={false}
            >
              <Divider />
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Row gutter={15}>
                  <Col span={8}>
                    <label
                      htmlFor="Product"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      Product
                    </label>
                    <Select
                      className='w-full'
                      options={deviceData}
                      placeholder="Select the product"
                      showSearch
                      allowClear
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_product: e })}
                      value={workOrderForm.created_product}
                    >
                    </Select>
                  </Col>
                  <Col span={8}>
                    <label
                      htmlFor="Create_name"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600  font-thin'>*</span>
                      Create name
                    </label>
                    <Input
                      style={{ width: '100%' }}
                      readOnly
                      value={workOrderForm.created_name}
                    />
                  </Col>
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
                      options={typeStatus}
                      value={workOrderForm.created_status}
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_status: e })}
                    >
                    </Select>
                  </Col>
                </Row>
                <Row gutter={15}>
                  <Col span={layoutWidth}>
                    <label
                      htmlFor="Create_time"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600  font-thin'>*</span>
                      Created time
                    </label>
                    <Input
                      style={{ width: '100%' }}
                      readOnly
                      value={workOrderForm.created_time}
                    />
                  </Col>
                  <Col span={layoutWidth}>
                    <label
                      htmlFor="Create_time"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600  font-thin'>*</span>
                      Updated time
                    </label>
                    <Input
                      style={{ width: '100%' }}
                      readOnly
                      value={workOrderForm.created_update}
                    />
                  </Col>
                  <Col span={layoutWidth}>
                    {/* product type */}
                    <label
                      htmlFor="Type"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      Type
                    </label>
                    <Select
                      style={{ width: '100%' }}
                      options={typeData}
                      placeholder='Product type'
                      onChange={selectProductType}
                      value={workOrderForm.created_type}
                      allowClear
                    >
                    </Select>
                  </Col>
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
                        options={typeDataBrand.map(item => {
                          return {
                            label:
                              <div className='flex'>
                                {selectOpen && <img src={item.logo_url} alt='avatar' className='mr-2 w-6' />}<span className='w-7 mt-0.5'>{item.value}</span>
                              </div>,
                            value: item.value
                          }
                        })}
                        value={workOrderForm.created_brand}
                        onChange={e => setWorkOrderForm({ ...workOrderForm, created_brand: e })}
                        allowClear
                        onDropdownVisibleChange={onTriggerSelected}
                      >
                      </Select>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col span={24}>
                    <label
                      htmlFor="Problem"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      Problem
                    </label>
                    <Input.TextArea
                      rows={5}
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      placeholder='Describe the device problem'
                      value={workOrderForm.created_text}
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_text: e.target.value })}
                      maxLength={260}
                      showCount
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label
                      htmlFor="Solution"
                      className='mb-1 flex items-center font-semibold'
                    >
                      <span className='mr-1 text-red-600 font-thin'>*</span>
                      Solution
                    </label>
                    <Input.TextArea
                      rows={5}
                      placeholder='Describe the solution'
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      value={workOrderForm.created_solved}
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_solved: e.target.value })}
                      maxLength={260}
                      showCount
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label
                      htmlFor="Remark"
                      className='mb-1 flex items-center font-semibold'
                    >
                      Remark
                    </label>
                    <Input.TextArea
                      rows={4}
                      placeholder='Remark'
                      autoSize={{ minRows: 3, maxRows: 3 }}
                      value={workOrderForm.created_remark}
                      onChange={e => setWorkOrderForm({ ...workOrderForm, created_remark: e.target.value })}
                      maxLength={120}
                      showCount
                    />
                  </Col>
                </Row>
              </Space>
              <Divider />
            </Modal>

            <WorkTable
              workInfo={workData}
              onChangeSelectData={onDeleteData}
              onGetEditData={onEditData}
            />
          </Skeleton>
        </Card>

      </Space>
    </div>
  )
}

export default WorkOrder