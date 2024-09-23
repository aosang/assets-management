'use client'
import { Button, Table, Tag, Modal  } from "antd"
import type { TableColumnsType} from 'antd'
import { useState } from'react'
import { supabase } from "@/utils/clients"

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


interface workTableProps {
  workInfo: tableItems[]
}


const WorkTable: React.FC<workTableProps> = ({ workInfo }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState<string | null>('')

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: tableItems[]) => {
      // setSelectedRowKeys(selectedRows)
      setSelectedRowId(selectedRows[0]?.created_id? selectedRows[0]?.created_id : null )
    }
  }

  const checkDeleteData = () => {
    if(selectedRowId && selectedRowId !== null) {
      setIsModalVisible(true)
    }else {
      alert('Please select a row')
    }
  }  

  const onDeleteConfirm = async () => {
    const {data, error} = await supabase.from('work_order').select('*').eq('created_id', selectedRowId)
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
            <Button 
              className="text-xs" 
              danger 
              size="small" 
              type="primary"
              onClick={checkDeleteData}
            >
              Delete
            </Button>  
          </div>   
        </>
      )
    }
  }]

  return (
    <>
      <Modal 
        title="Tips" 
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p className="text-sm text-black">Are you sure you want to delete this data?</p>
      </Modal>
      <div className="mt-5">
        <Table
          rowSelection={{
            ...rowSelection,
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