"use client"
import { useState } from "react"
import { Card, Tabs, Row, Col, Button } from "antd"

import { ImBooks } from "react-icons/im"
import { PlusOutlined } from "@ant-design/icons"

import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
// import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'
// i18nChangeLanguage('en')

const Librarys = () => {
  const tabTitle = [{
    label: 'Computer',
    key: '1',
  }, {
    label: 'Network',
    key: '2',
  }, {
    label: 'Security',
    key: '3',
  }]

  // const [editor, setEditor] = useState<IDomEditor | null>(null)
  // const [html, setHtml] = useState('<p>hello</p>')
  // const toolbarConfig: Partial<IToolbarConfig> = {}
  // const editorConfig: Partial<IEditorConfig> = {
  //   // TS 语法
  //   placeholder: '请输入内容...',
  // }

  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box', overflowY: 'visible' }}>
      <Button 
        type="primary" 
        shape="circle" 
        size="large" 
        className="fixed bottom-14 right-10 z-10 w-14 h-14"
      >
        <PlusOutlined style={{fontSize: '24px', fontWeight: '700'}} />
      </Button>
      <Card>
        <div 
          className="
            w-full 
            h-16
            rounded-md 
            flex 
            justify-center 
            items-center" 
          style={{backgroundColor: '#c0defd'}}
        >
          <ImBooks style={{color: '#4483f5', opacity: 0.65}} className="text-5xl" />
          <span className="text-xl ml-6" style={{color: '#00091a'}}>IT Equipment Knowledge Base</span>
        </div>
        <Tabs defaultActiveKey="1" items={tabTitle.map((item, i) => {
          return {
            label: item.label,
            key: item.key,
            children:
              item.label === 'Computer' && 
              <div style={{maxHeight: '600px', width: '600px', backgroundColor: '#ccc', overflowY: 'scroll'}}>
                <div style={{height: '1000px', backgroundColor: '#eee'}}></div>
              </div> ||
              item.label === 'Network' && <div>Network</div> ||
              item.label === 'Security' && <div>Security</div>
          }
        })} />
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
  )
}


export default Librarys