'use client'
import { Button, Table, Tag  } from "antd"
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
    return <a>{text}</a>
  }
}, {
  title: 'Product',
  dataIndex: 'created_product',
  key: 'created_product',
  width: 200
}, {
  title: 'Brand',
  dataIndex: 'created_brand',
  key: 'created_brand',
  width: 120
}, {
  title: 'Status',
  dataIndex: 'created_status',
  key: 'created_status',
  width: 100,
  render: (text: string) => {
    return (
      <>
        {text === 'Finished' && <Tag color="green">Finished</Tag>}
        {text === 'Processing' && <Tag color="red">Processing</Tag>}
        {text === 'Pending' && <Tag color="orange">Pending</Tag>}
      </>
    )
  }
}, {
  title: 'Created name',
  dataIndex: 'created_name',
  key: 'created_name',
  width: 150
}, {
  title: 'Create Time',
  dataIndex: 'created_at',
  key: 'created_at',
  width: 200,
}, {
  title: 'Remark',
  dataIndex: 'created_remark',
  key: 'created_remark',
}, {
  title: 'Other',
  width: 200,
  render: () => {
    return (
      <>
        <div>
          <Button 
            className="mr-2 text-xs" 
            size="small" 
            type="primary"
          >
            Details
          </Button>
          <Button className="mr-2 text-xs" size="small" type="primary">Edit</Button>
          <Button className="text-xs" danger size="small" type="primary">Delete</Button>
        </div>
        
      </>
    )
  }
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
          scroll={{y: 510}}
          size="middle"
        />
      </div>
    </>
  )
}
 
export default WorkTable;