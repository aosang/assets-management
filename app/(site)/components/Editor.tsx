import { useState, useEffect } from "react"
import { Editor, Toolbar, } from "@wangeditor/editor-for-react"
import { Row, Col, Input, Select } from "antd"
import { supabase } from "@/utils/clients"
import { getTimeNumber } from "@/utils/pubFunProvider"
import { knowledgeTypeItem } from "@/utils/dbType"

import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'
i18nChangeLanguage('en')
import '@wangeditor/editor/dist/css/style.css'


const EditorPage = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('')
  const [knowledgeItem, setKnowledgeItem] = useState<knowledgeTypeItem>({
    id: '',
    title: '',
    author: '',
    type: null,
    time: getTimeNumber()[0],
    content: ''
  })

  const editorConfig = {
    placeholder: "Write something...",
    MENU_CONF: {
      uploadImage: {
        async customUpload(files: any, insertFn: (url: string) => void) {
          let file = files.name
          let fileExt = file.split('.').pop()
          let filePath = (`${getTimeNumber()[1]}.${fileExt}`)

          const imageUrl = await handleImageUpload(filePath, files)
          
          insertFn(imageUrl)
        }
      }
    }
  }

  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      'bold', // 加粗
      'italic', // 斜体
      'underline', // 下划线
      'uploadImage',
      // "insertImage",
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
      'numberedList'
    ],
  }

  const handleImageUpload = async (file: any, obj:any) => {
    // 如果你使用 Supabase 或其他存储服务，应该在这里做具体的上传逻辑
    try {
      const { data, error } = await supabase.storage
        .from('knowledge_image') // 存储桶名称（请确保已经在 Supabase 控制台中创建了该存储桶）
        .upload(file, obj);

      if (error) {
        console.error('Image upload error:', error);
        return '';
      }

      // 获取图片的公共 URL
      const {data: {publicUrl}}  = supabase.storage.from('knowledge_image').getPublicUrl(file)

      // 返回图片 URL 给 WangEditor
      return publicUrl
      // console.log(publicUrl);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
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
    // getSession().then(res => {
    //   console.log(res)
    // })
  }, [])

  useEffect(() => {

  }, [html])

  return (
    <>
      <Row gutter={16} className="mt-5">
        <Col span={24}>
          <label className="flex items-center font-semibold">
            <span className='mr-1 text-red-600 font-thin'>*</span>
            Title
          </label>
          <Input value={knowledgeItem.title} placeholder="Enter knowledge title" />
        </Col>
      </Row>
      <Row gutter={16} className="mt-3">
        <Col span={8}>
          <label className="flex items-center font-semibold">
            <span className='mr-1 text-red-600 font-thin'>*</span>
            Time
          </label>
          <Input value={knowledgeItem.time} readOnly />
        </Col>
        <Col span={8}>
          <label className="flex items-center font-semibold">
            <span className='mr-1 text-red-600 font-thin'>*</span>
            Author
          </label>
          <Input value={knowledgeItem.author} />
        </Col>
        <Col span={8}>
          <label className="flex items-center font-semibold">
            <span className='mr-1 text-red-600 font-thin'>*</span>
            Type
          </label>
          <Select className="w-full"
            options={[{ label: 'Type1', value: 'type1' }, { label: 'Type2', value: 'type2' }]}
          />
        </Col>
      </Row>
      <div className="mt-3">
        <Toolbar
          defaultConfig={toolbarConfig}
          editor={editor}
          mode="default"
        />
        <Editor
        className="h-80"
          defaultConfig={editorConfig}
          value={html}
          mode="default"
          onCreated={editor => setEditor(editor)}
          onChange={editor => setHtml(editor.getHtml())}
        />
      </div>

      {/* <div dangerouslySetInnerHTML={{__html: html}}></div> */}
    </>
  )
}

export default EditorPage