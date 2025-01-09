import { useState, useEffect } from "react"
import { Editor, Toolbar } from "@wangeditor/editor-for-react"
import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'

i18nChangeLanguage('en')
import '@wangeditor/editor/dist/css/style.css'

const EditorPage = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('')

  const editorConfig = {
    placeholder: "Type something...",
  }

  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'bold', // 加粗
      'italic', // 斜体
      'underline', // 下划线
      'uploadImage',
      'color',
      'bgColor',
      'fontSize',
      'lineHeight',
      'clearStyle',
      'blockquote',
      'insertLink',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'insertTable',
      'numberedList'
    ],
  }

  useEffect(() => {
    // console.log(editor?.getAllMenuKeys())
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  useEffect(() => {
    console.log(html)
    
  }, [html])

  return (
    <>
      <Toolbar 
        defaultConfig={toolbarConfig} 
        editor={editor} 
        mode="default" 
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        mode="default"
        onCreated={editor => setEditor(editor)}
        onChange={editor => setHtml(editor.getHtml())}
      />

      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </>
  )
}

export default EditorPage