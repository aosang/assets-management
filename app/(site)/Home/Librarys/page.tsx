"use client"
import { useState } from "react"
import { Card, Tabs } from "antd"
import type { TabsProps } from "antd"


import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'
i18nChangeLanguage('en')

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

  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('<p>hello</p>')
  const toolbarConfig: Partial<IToolbarConfig> = {}
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: '请输入内容...',
  }

  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}>
      <Card title="Knowledge Base">
        <Tabs defaultActiveKey="1" items={tabTitle.map((item, i) => {
          return {
            label: item.label,
            key: item.key,
            children:
              item.label === 'Computer' && <div>Computer</div> ||
              item.label === 'Network' && <div>Network</div> ||
              item.label === 'Security' && <div>Security</div>
          }
        })} />
      </Card>

      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={(editor) => setHtml(editor.getHtml())}
        mode="default"
        style={{ height: '500px', overflowY: 'hidden' }}
      />
    </div>
  )
}


export default Librarys