'use client'
import { useState } from 'react'
import { Button, Row, Col, Select, DatePicker, Table, Modal } from 'antd'
import { IoIosSearch } from 'react-icons/io'
import { productItem } from '@/utils/dbType'

interface itAssetsTableProps  {
  assetsInfo: productItem[]
}

const WorkItAssetsTable: React.FC<itAssetsTableProps> = ({ assetsInfo }) => {
  const [addItAssetsShow, setAddItAssetsShow] = useState(false)

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
      <Modal open={addItAssetsShow} title="Add an IT device">
        <div>123</div>
      </Modal>
      <Row gutter={10}>
        <Col>
          <Button type='primary' onClick={() => setAddItAssetsShow(true)}>Create</Button>
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