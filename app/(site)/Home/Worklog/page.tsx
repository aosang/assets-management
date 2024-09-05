import { Card, Space } from 'antd'

const Worklog = () => {
  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card title="Worklog"></Card>
      </Space>
    </div>

  )
}

export default Worklog;