"use client"
import { useState } from "react";
import { Card, Table, Button } from "antd"

const Librarys: React.FC = () => {
  const [columns, setColumns] = useState([
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ]);
  
  const data = [
    { key: '1', name: 'John', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe', age: 32, address: 'Sidney No. 1 Lake Park' },
  ];

  const toggleColumns = () => {
    setColumns(prevColumns => {
      // 隐藏或者显示表头列
      return prevColumns.some(col => col.title === 'Address')
        ? prevColumns.filter(col => col.title !== 'Address')
        : [
            ...prevColumns,
            { title: 'Address', dataIndex: 'address', key: 'address' },
          ];
    })
  }

  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Card title="Knowledge Base">
        <Button onClick={toggleColumns} style={{ marginBottom: 16 }}>Toggle Address Column</Button>
        <Table columns={columns} dataSource={data}></Table>
      </Card>
    </div>
  )
}
 
export default Librarys