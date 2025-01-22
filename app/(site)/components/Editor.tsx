import { useState, useEffect } from "react"
import { Editor, Toolbar, } from "@wangeditor/editor-for-react"
import { Row, Col, Input, Select, FloatButton  } from "antd"
import { supabase } from "@/utils/clients"
import { getTimeNumber } from "@/utils/pubFunProvider"
import { knowledgeTypeItem, typeDataName} from "@/utils/dbType"
import { getWorkOrderType } from "@/utils/providerSelectData"
import { insertLibraryData } from "@/utils/provideLibraryData"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import useMessage from "@/utils/message"

import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'
i18nChangeLanguage('en')
import '@wangeditor/editor/dist/css/style.css'


const EditorPage = ({isEdit, setIsEdit}: {isEdit: boolean, setIsEdit: (isEdit: boolean) => void}) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('')
  const [knowledgeType, setKnowledgeType] = useState<typeDataName[]>([])
  const [knowledgeItem, setKnowledgeItem] = useState<knowledgeTypeItem>({
    id: getTimeNumber()[1],
    title: '',
    author: '',
    type: null,
    created_time: getTimeNumber()[0],
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
      console.error('Error uploading image:', error)
      return ''
    }
  }

  const getWorkType = () => {
    getWorkOrderType().then(res => { 
      setKnowledgeType(res as [])
    })
  }

  const changeTitleValue = (e: any) => {
    setKnowledgeItem({
      ...knowledgeItem,
      title: e.target.value
    })
  }

  const changeTypeLibrary = (value: string) => {
    setKnowledgeItem({
      ...knowledgeItem,
      type: value
    })
  }

  const changeLibraryContent = (editor: any) => {
    const newHtml = editor.getHtml()
    setHtml(newHtml)
    setKnowledgeItem(prevState => ({
      ...prevState,
      content: newHtml
    }))
  }

  const addKnowledgeLibrarys = () => {
    const {title, type, content} = knowledgeItem
    if(title === '' || type === null ) { 
      useMessage(2, 'Please fill in the title and type', 'error')
    } else if(content === '<p><br></p>') {
      useMessage(2, 'Please fill in the content', 'error')
    }else {
      
      // insertLibraryData(knowledgeItem).then(res => {
      //   setIsEdit(false)
      //   useMessage(2, 'Knowledge library create sucessful!', 'success')
      // })
    }
  }


  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  useEffect(() => {
    let userRegister = window.localStorage.getItem('userRegister') || ''
    let userRegisterInfo = JSON.parse(userRegister)
    setKnowledgeItem(prevState => ({
      ...prevState,
      author: userRegisterInfo.username,
    }))
  }, [])

  useEffect(() => {
    getWorkType()
  }, [])

  return (
    <>
      <FloatButton
        shape="circle"
        type="default"
        style={{ insetInlineEnd: 80, bottom: 200 }}
        icon={< CloseOutlined />}
        onClick={() => {
          setIsEdit(false)
        }}
      />
      <FloatButton
        shape="circle"
        type="primary"
        style={{ insetInlineEnd: 24, bottom: 200 }}
        icon={<CheckOutlined />}
        onClick={addKnowledgeLibrarys}
      />
      <Row gutter={16} className="mt-5">
        <Col span={24}>
          <label className="flex items-center font-semibold">
            <span className='mr-1 mb-1 text-red-600 font-thin'>*</span>
            Title
          </label>
          <Input 
            value={knowledgeItem.title} 
            placeholder="Enter knowledge title"
            onChange={changeTitleValue}
            
          />
        </Col>
      </Row>
      <Row gutter={16} className="mt-3">
        <Col span={8}>
          <label className="flex items-center font-semibold">
            <span className='mr-1 mb-1 text-red-600 font-thin'>*</span>
            Time
          </label>
          <Input value={knowledgeItem.created_time} readOnly />
        </Col>
        <Col span={8}>
          <label className="flex items-center font-semibold">
            <span className='mr-1 mb-1 text-red-600 font-thin'>*</span>
            Author
          </label>
          <Input value={knowledgeItem.author} readOnly />
        </Col>
        <Col span={8}>
          <label className="flex items-center font-semibold">
            <span className='mr-1 mb-1 text-red-600 font-thin'>*</span>
            Type
          </label>
          <Select 
            className="w-full"
            options={knowledgeType}
            placeholder="Knowledge type"
            allowClear
            onChange={changeTypeLibrary}
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
          style={{height: '400px'}}
          defaultConfig={editorConfig}
          value={html}
          mode="default"
          onCreated={editor => setEditor(editor)}
          onChange={changeLibraryContent}
        />
      </div>

      {/* <div dangerouslySetInnerHTML={{__html: html}}></div> */}
    </>
  )
}

export default EditorPage