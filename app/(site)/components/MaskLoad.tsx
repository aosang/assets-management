"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { getSession } from '@/utils/providerSelectData'
import { useRouter } from 'next/navigation'


const maskStyle: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100vh',
  background: '#fff',
  backgroundSize: "cover",
  zIndex: '1'
}

const imageStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: '-120px 0 0 -120px'
}

type isShowMask = boolean

const MaskLoad = () => {
  const [isShow, setIsShow] = useState<isShowMask>(true)
  const router = useRouter()

  const checkSession =  () => {
    getSession().then((res) => {
      if (res?.session !== null) {
        setTimeout(() => {
          router.replace('/Home')
          setIsShow(false)
        }, 2000)
      }else {
        setIsShow(false)
        router.replace('/')
      }
    })
  }

  useEffect(() => {
    checkSession()
  })
  return (
    <div>
      {isShow && 
        <div style={maskStyle}>
          <Image
            priority 
            src="/load-blue.gif" 
            alt="loadingGif" 
            width={240} height={240}
            style={imageStyle}
            unoptimized
          />
        </div>
      }
    </div>
    
  )
}
 
export default MaskLoad