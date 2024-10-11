'use client'
import React, { useState } from "react"
import { Card, Col, Row, Input, Image, Upload } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import dayjs from "dayjs"

const Profile = () => {
  const [fileList, setFileList] = useState([])
  const [imageUrl, setImageUrl] = useState<string>()

  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type="button">
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </button>
  )

  // upload images
  const uploadAvatarImage: React.ChangeEventHandler<HTMLInputElement> = async (e: any) => {
    console.log(e.target.files[0])
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
          {/* <Upload 
            listType="picture-card" 
            className="mt-1"
            onChange={uploadAvatarImage}
            maxCount={1}
          >
            {imageUrl? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload> */}
          <input
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatarImage}
        />
        </div>
      </Card>
    </div>
  )
}
 
export default Profile