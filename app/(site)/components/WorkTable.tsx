'use client'
import { Button, Table, Tag } from "antd"
import type { TableColumnsType} from 'antd'
import { tableItems } from "@/utils/dbType"

interface workTableProps {
  workInfo: tableItems[]
  onChangeSelectData: (data:tableItems[]) => void
  onGetEditData: (data:tableItems, typeNum: number) => void
}

const WorkTable: React.FC<workTableProps> = ({ workInfo, onChangeSelectData, onGetEditData }) => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: tableItems[]) => {
      onChangeSelectData(selectedRows)
    }
  }

  const onRowData = {
    onClick: (record: tableItems) => {
      onGetEditData(record, 1)
    }
  }

  const colums: TableColumnsType<tableItems> = [{
    title: 'Number',
    dataIndex: 'created_id',
    key: 'created_id',
    width: 160
  }, {
    title: 'Product',
    dataIndex: 'created_product',
    key: 'created_product'
  }, {
    title: 'Type',
    dataIndex: 'created_type',
    key: 'created_type',
  }, {
    title: 'Brand',
    dataIndex: 'created_brand',
    key: 'created_brand',
  }, {
    title: 'Created name',
    dataIndex: 'created_name',
    key: 'created_name'
  }, {
    title: 'Created Time',
    dataIndex: 'created_time',
    key: 'created_time',
    width: 160
  }, {
    title: 'Problem',
    dataIndex: 'created_text',
    key: 'created_text',
    ellipsis: true
  }, {
    title: 'Status',
    dataIndex: 'created_status',
    key: 'created_status',
    width: 120,
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
    title: 'Other',
    width: 100,
    render: () => {
      return (
        <>
          <div>
            <Button 
              className="mr-2 text-xs" 
              size="small" 
              type="primary"
              onClick={() => onGetEditData}
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
          rowSelection={{...rowSelection}}
          onRow={(record) => ({
            onClick: () => {
              onRowData.onClick(record)
            }
          })}
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
 
export default WorkTable