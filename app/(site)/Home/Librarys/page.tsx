"use client"
import { useState, useEffect } from "react"
import { Card, Button, Select, List, Avatar, Divider } from "antd"
import { getWorkOrderType } from "@/utils/providerSelectData"
import { typeDataName } from "@/utils/dbType"
import Head from "next/head"

import { ImBooks } from "react-icons/im"
import { PlusOutlined } from "@ant-design/icons"

import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
// import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'
// i18nChangeLanguage('en')

const Librarys = () => {
  const [LibrarysType, setLibrarysType] = useState<typeDataName[]>([])
  // const [editor, setEditor] = useState<IDomEditor | null>(null)
  // const [html, setHtml] = useState('<p>hello</p>')
  // const toolbarConfig: Partial<IToolbarConfig> = {}
  // const editorConfig: Partial<IEditorConfig> = {
  //   // TS 语法
  //   placeholder: '请输入内容...',
  // }

  const getLibrarysType = () => {
    getWorkOrderType().then(res => {
      setLibrarysType(res as typeDataName[])
    })
  }

  useEffect(() => {
    document.title = 'Librarys'
    getLibrarysType()
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
          <div className="flex mt-4 items-center">
            <Button type="primary">Create</Button>
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

          <Divider/> 

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
        </Card>

        {/* <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      /> */}

        {/* <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={(editor) => setHtml(editor.getHtml())}
        mode="default"
        style={{ height: '500px', overflowY: 'hidden' }}
      /> */}
      </div>
    </>
  )
}


export default Librarys