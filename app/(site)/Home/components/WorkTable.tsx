'use client'
import { Button, Table, Tag, Modal  } from "antd"
import type { TableColumnsType} from 'antd'
import { tableItems } from "@/utils/dbType"

interface workTableProps {
  workInfo: tableItems[]
  onChangeSelectData: (data:tableItems[]) => void
}

const WorkTable: React.FC<workTableProps> = ({ workInfo, onChangeSelectData }) => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: tableItems[]) => {
      onChangeSelectData(selectedRows)
    }
  }

  const colums: TableColumnsType<tableItems> = [{
    title: 'Number',
    dataIndex: 'created_id',
    key: 'created_id',
    width: 200,
    render: (text: string) => {
      return <a>{text}</a>
    }
  }, {
    title: 'Product',
    dataIndex: 'created_product',
    key: 'created_product',
    width: 200
  }, {
    title: 'Type',
    dataIndex: 'created_type',
    key: 'created_type',
    width: 120
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
    title: 'Created Time',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 200,
  }, {
    title: 'Remark',
    dataIndex: 'created_remark',
    key: 'created_remark',
  }, {
    title: 'Other',
    width: 180,
  
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
            <Button 
              className="mr-2 text-xs" 
              size="small" 
              type="primary"
            >
              Edit
            </Button>
          </div>   
        </>
      )
    }
  }]

  return (
    <>
      <div className="mt-5">
        <Table
          rowSelection={{
           ...rowSelection
          }}
          columns={colums} 
          dataSource={workInfo}
          bordered
          size="middle"
          pagination={{ 
            position: ['bottomRight'], 
            pageSizeOptions: ['10', '20', '50'], 
            showSizeChanger: true, 
          }}
        />
      </div>
    </>
  )
}
 
export default WorkTable;