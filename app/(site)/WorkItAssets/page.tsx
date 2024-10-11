'use client'
import { Card } from "antd"
import WorkItAssetsTable from "../components/WorkItAssetsTable"
import { productItem } from '@/utils/dbType'
import { useState, useEffect } from "react"
import { getItAssetsTabbleData } from '@/utils/providerItAssetsData'
import SideBar from '../components/Sidebar'

type asstesDataProps = productItem[]

const WorkItAssets = () => {
  const [assetsData, setAssetsData] = useState<asstesDataProps>([])

  const getMyItAssetsData = () => {
    getItAssetsTabbleData()
    .then(res => {
      setAssetsData(res as asstesDataProps)
    })
  }

  useEffect(() => {
    getMyItAssetsData()
  })
  return (
    <SideBar>
      <div className="p-3">
        <Card title="IT Assets">
          <WorkItAssetsTable assetsInfo={assetsData} />
        </Card>
      </div>
    </SideBar>
    
  )
}
 
export default WorkItAssets