'use client'
import React, { useState } from "react"
import { Card, Col, Row, Input, Upload, Image } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { getTimeNumber } from "@/utils/pubFunProvider"
import { supabase } from "@/utils/clients"
import type { GetProp, UploadFile, UploadProps } from 'antd'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const Profile = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </button>
  )

  // upload images
  const uploadAvatarImage = async (e: any) => {    
      let file = e.file
      let fileExt = file.name.split('.').pop() 
      let filePath = `${getTimeNumber()[1]}.${fileExt}`

      const { data, error } = await supabase.storage.from('avatars').upload(filePath, file)
      if (error) {
        alert(error.message)
      }else {
        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
        setImageUrl(publicUrl)
      }
  }
  
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setImageUrl(file.url || (file.preview as string));
    setPreviewOpen(true);
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const testMyEvent = (e: any) => {
    e.stopPropagation();
    console.log("btn clicked");
  }

  return (
    <div className="p-3">
      <Card title="My Infomation">
        <Row gutter={30}>
          <Col span={6}>
            <div>
              <label htmlFor="Email" className="font-semibold mb-1">Email</label>
              <Input type="text" readOnly />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <label htmlFor="Username" className="font-semibold mb-1">Username</label>
              <Input type="text" />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <label htmlFor="Company" className="font-semibold mb-1">Company</label>
              <Input type="text" />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <label htmlFor="CreateTime" className="font-semibold mb-1">Create Time</label>
              <Input type="text" readOnly />
            </div>
          </Col>
        </Row>
        {/* upload avatar image */}
        <div className="mt-3">
          <label htmlFor="avatar" className="font-semibold">Avatar</label>
          <Row gutter={10}>
            <Col>
              <Upload 
                listType="picture-card" 
                className="mt-1"
                customRequest={uploadAvatarImage}
                maxCount={1}
                showUploadList={false}
                // fileList={fileList}
                // onPreview={handlePreview}
                // onChange={handleChange}
              >
                {uploadButton}
              </Upload>
            </Col>
            <Col className="mt-1">
              {imageUrl && 
                <Image
                  src={imageUrl} 
                  width={100} 
                  height={100} 
                  alt="avatar" 
                  className="rounded-md"
                  
                  preview={{
                    // visible: previewOpen,
                    // onVisibleChange: (visible) => setPreviewOpen(visible),
                    mask: <div className="ant-image-preview-mask" onClick={testMyEvent}>123</div>,
                  }} 
                /> 
              }
            </Col>
          </Row>
          
          
          {/* <input
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatarImage}
          /> */}
        </div>
      </Card>
    </div>
  )
}

export default Profile