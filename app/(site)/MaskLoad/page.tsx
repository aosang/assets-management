"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

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

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false)
    }, 1000)
  }, [isShow])
  return (
    <div>
      {isShow && 
        <div style={maskStyle}>
          <Image 
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