"use client";
import { Suspense, useEffect, useState } from "react"
import { flexible } from './phone.js'
import { useSearchParams } from "next/navigation"
import { QRCodeSVG } from 'qrcode.react'
import { getCodeAssetsData } from '@/utils/providerItAssetsData'
import { Button } from "antd"
import tempcss from './temp.module.scss'
import html2canvas from "html2canvas"
import { getTimeNumber } from "@/utils/pubFunProvider"


type myDeviceInfo = {
  product_id: string,
  product_name: string,
  product_time: string,
  product_type: string,
  product_brand: string
}

const TemplateCode: React.FC = () => {
  const searchParams = useSearchParams()
  const [qrCodeData, setQrCodeData] = useState<string>('')
  const [deviceInfo, setDeviceInfo] = useState<myDeviceInfo>({
    product_id: '',
    product_name: '',
    product_time: '',
    product_type: '',
    product_brand: ''
  })

  const createQRcodeDataImage = () => {
    let myId = searchParams.get('id')
    if (myId) {
      getCodeAssetsData(myId).then(res => {
        setDeviceInfo(res![0] as myDeviceInfo)
        setQrCodeData(`http://37165a514c.vicp.fun/TemplateCode?id=${myId}`)
      })
    }
  }

  const saveImageQrcode = () => {
    const element = document.querySelector('#canvas') as HTMLCanvasElement
    html2canvas(element, {
      allowTaint: false,
      useCORS: true,
    })
      .then(canvas => {
        let dataUrl = canvas.toDataURL("image/jpeg");
        let img = new Image()
        img.src = dataUrl
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'deviceCode' + getTimeNumber()[1] + '.jpg'
        link.click()
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    flexible()
    createQRcodeDataImage()
  }, [])

  return (
    <div className={tempcss.rootLay}>
      <div className={tempcss.container}>
        <div id="canvas">
          <div className={tempcss.container_nav}>
            <h2>Device Info</h2>
          </div>
          <ul className={tempcss.container_info}>
            <li>
              <span>Device-number:</span>
              <p>{deviceInfo.product_id}</p>
            </li>
            <li>
              <span>Device-name:</span>
              <p>{deviceInfo.product_name}</p>
            </li>
            <li>
              <span>Device-time:</span>
              <p>{deviceInfo.product_time}</p>
            </li>
            <li>
              <span>Device-type:</span>
              <p>{deviceInfo.product_type}</p>
            </li>
            <li>
              <span>Device-brand:</span>
              <p>{deviceInfo.product_brand}</p>
            </li>
          </ul>

          {qrCodeData &&
            <div className={tempcss.qrcodeBox}>
              <QRCodeSVG
                value={qrCodeData}
                size={200}
                bgColor="#fff"
                fgColor="#000"
                level="L"
              />
            </div>
          }
          <div className={tempcss.qrcodeWhite}></div>
        </div>

        <div className={tempcss.qrcodeSaveImage}>
          <Button
            style={{ width: '2rem', height: '0.32rem', fontSize: '0.15rem' }}
            type="primary"
            onClick={saveImageQrcode}
            id="downLink"
          >
            Save Image
          </Button>
        </div>

      </div>
    </div>
  )
}

const WrappedTemplateCode: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <TemplateCode />
  </Suspense>
)

export default WrappedTemplateCode
