"use client"
import { useState, useEffect } from "react"
import { Card, Button, Select, List, Avatar, Divider } from "antd"
import { getWorkOrderType } from "@/utils/providerSelectData"
import { typeDataName } from "@/utils/dbType"
import Head from "next/head"
import { ImBooks } from "react-icons/im"
import dynamic from "next/dynamic"
import { PlusOutlined } from "@ant-design/icons"

const ReactWEditor = dynamic(() => import('../../components/Editor'), {
  ssr: false,
  loading: () => <p className="text-lg text-blue-950">Loading...</p>
})

const Librarys = () => {
  const [LibrarysType, setLibrarysType] = useState<typeDataName[]>([])
  const [editorModal, setEditorModal] = useState<boolean>(false)

  const getLibrarysType = () => {
    getWorkOrderType().then(res => {
      setLibrarysType(res as typeDataName[])
    })
  }

  useEffect(() => {
    getLibrarysType()
    document.title = 'Librarys'
  }, [])

  return (
    <>
      <Head>
        <title>Librarys</title>
      </Head>
      <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box', overflowY: 'visible' }}>
        <Card>
          <div
            className="
            w-full 
            h-11
            rounded-md 
            flex 
            justify-center 
            items-center
            bg-blue-50"
          >
            <ImBooks style={{ color: '#4483f5', opacity: 0.65 }} className="text-4xl" />
            <span className="text-base ml-6" style={{ color: '#00091a' }}>IT Equipment Knowledge Base</span>
          </div>
          {!editorModal &&
            <>
              <div className="flex mt-4 items-center">
                <Button type="primary" onClick={() => { setEditorModal(true) }}>Create</Button>
                <div className="mt-0 mb-0 mr-0 ml-auto">
                  <Select
                    className="w-36"
                    placeholder="Type"
                    allowClear
                    options={LibrarysType}
                  >
                  </Select>
                </div>
              </div>

              <Divider />

              <List
                itemLayout="horizontal"
                dataSource={[
                  'Racing car sprays burning fuel into crowd.',
                  'Japanese princess to wed commoner.',
                  'Australian walks 100km after outback crash.',
                  'Man charged over missing wedding girl.',
                  'Los Angeles battles huge wildfires.',
                ]}
                renderItem={item => (
                  <List.Item actions={[
                    <a className="text-blue-500">edit</a>,
                    <a className="text-red-500">delete</a>,
                  ]}>
                    <List.Item.Meta
                      avatar={<Avatar src='https://www.wangle.run/company_icon/public_image/pub_avatar.jpg' />}
                      title='Ant Design Title 1'
                      description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                    />
                    <div className="flex justify-end">

                    </div>
                  </List.Item>
                )}
              />
            </>
          }
          {editorModal && 
            <div className="mt-4">
              <ReactWEditor />
            </div>
            
          }
        </Card>
      </div>
    </>
  )
}

export default Librarys