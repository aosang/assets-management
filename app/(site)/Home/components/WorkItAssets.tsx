'use client'
import { Button, Row, Col, Select, DatePicker, Table } from 'antd'
import { IoIosSearch } from 'react-icons/io'
import { productItem } from '@/utils/dbType'

interface itAssetsTableProps  {
  assetsInfo: productItem[]
}

const workItAssets: React.FC<itAssetsTableProps> = ({ assetsInfo }) => {
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
    title: 'Count',
    dataIndex: 'product_num',
    key: 'product_num'
  }, {
    title: 'Time',
    dataIndex: 'product_time',
    key: 'product_time'
  }, {
    title: 'Remark',
    dataIndex: 'product_remark',
    key: 'product_remark'
  }]

  return (
    <div>
      <Row gutter={10}>
        <Col>
          <Button type='primary'>Create</Button>
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
 
export default workItAssets