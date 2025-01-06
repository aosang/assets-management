'use client'
import { useEffect } from "react"
import { Descriptions, Divider, Table, Result, Button } from "antd"
import { DownloadOutlined  } from '@ant-design/icons'
import Head from "next/head"

const InspectionFile = () => {
  const columns = [
    {
      title: 'Device Name',
      dataIndex: 'Device Name',
      key: 'Device Name',
    },
    {
      title: 'Problem Description',
      dataIndex: 'Problem Description',
      key: 'Problem Description',
    }
  ]

  const getInspectioPdfData = () => {
    let inspectionData = window.sessionStorage.getItem('inspectionData')
    inspectionData = inspectionData? JSON.parse(inspectionData) : ''
    console.log(inspectionData)
  }

  useEffect(() => {
    document.title = 'Inspection File'
    getInspectioPdfData()
  }, [])

  return (
    <>
      <Head>
        <title>Inspection File</title>
      </Head>
      <Button type="primary" shape="circle" className="w-16 h-16 flex flex-col fixed right-5 bottom-16">
        <DownloadOutlined className="text-xl -mt-1 block" />
        <p className="-mt-3">PDF</p>
      </Button>
      <div 
        style={{width: '720px', minHeight: '850px'}} 
        className="bg-white my-4 mx-auto py-4 px-5 rounded-md relative">
        <div className="flex items-center">
          <div className="w-40">
            <img 
              className="w-full" 
              src='https://www.wangle.run/Company_icon/public_image/system_logo.png' 
              alt="It assets logo" 
            />
          </div>
          <div className="mt-1 mb-0 mr-0 ml-auto font-bold">Meta Platforms, Inc</div>
        </div>
        
        <Divider></Divider>
        <Descriptions>
          <Descriptions.Item label="Insepector">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Time">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Status">empty</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Email">yourEmail@gmail.com</Descriptions.Item>
        </Descriptions>
        <Divider></Divider>
        <Table columns={columns}></Table>
        {/* <Result
          status="success"
          title="All the device is ok"
          subTitle="No abnormalities were found during this inspection."
        /> */}

        <div className="absolute bottom-7">
          <Divider></Divider>
          <div className="mt-3">
            <span className="mb-4" style={{fontSize: '15px'}}>Signature of the inspector:</span>
            <span style={{fontSize: '15px'}}>Signature of the responsible person:</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default InspectionFile