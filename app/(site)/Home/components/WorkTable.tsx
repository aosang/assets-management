'use client'
import { Table, Tag  } from "antd"
import type { TableColumnsType  } from 'antd'
import dayjs from "dayjs"

type tableItems = {
  key: string
  user_id: string
  created_product: string
  created_id: string
  created_name: string
  created_at: string
  created_type: string
  created_brand: string
  created_status: string
  created_remark: string
}

const colums: TableColumnsType<tableItems> = [{
  title: 'Number',
  dataIndex: 'created_id',
  key: 'created_id',
  render: (text: string) => {
    return <a onClick={() => console.log(123)}>{text}</a>
  }
}, {
  title: 'Product',
  dataIndex: 'created_product',
  key: 'created_product',
}, {
  title: 'Brand',
  dataIndex: 'created_brand',
  key: 'created_brand'
}, {
  title: 'Status',
  dataIndex: 'created_status',
  key: 'created_status',
  render: (text: string) => {
    return (
      <>
        {text === '1' && <Tag color="green">Finished</Tag>}
        {text === '2' && <Tag color="red">Processing</Tag>}
        {text === '3' && <Tag color="orange">Paused</Tag>}
      </>
    )
  }
}, {
  title: 'Problem',
  dataIndex: 'created_name',
  key: 'created_name'
}, {
  title: 'Create Time',
  dataIndex: 'created_at',
  key: 'created_at',
  render: (text: any) => {
    return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
  }
}, {
  title: 'Remark',
  dataIndex: 'created_remark',
  key: 'created_remark'
}]

interface workTableProps {
  id: string
  workInfo: tableItems[]
}

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: tableItems[]) => {
    console.log(`${selectedRowKeys}`, selectedRows)
  }
}

const WorkTable: React.FC<workTableProps> = ({ workInfo }) => {
  return (
    <>
      <div>
        <Table
          rowSelection={{
            ...rowSelection,
          }} 
          columns={colums} 
          dataSource={workInfo}
          bordered
        />
      </div>
    </>
  )
}
 
export default WorkTable;