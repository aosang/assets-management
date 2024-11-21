'use client'
import { Card } from "antd"
import WorkItAssetsTable from "../../components/WorkItAssetsTable"
const WorkItAssets = () => {
  return (
    <div className="p-3">
      <Card title="IT Assets">
        <WorkItAssetsTable />
      </Card>
    </div>
  )
}

export default WorkItAssets