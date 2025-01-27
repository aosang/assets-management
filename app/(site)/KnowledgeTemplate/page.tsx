'use client'
import { useEffect, useState } from 'react'
import { Divider } from 'antd'
import { useSearchParams } from "next/navigation"
import { getLibrarysDataList } from "@/utils/providerLibrarys"
import knwoledgeCss from './knowledge.module.scss'

const KnowledgeTemplate = () => {
  const searchParams = useSearchParams()
  const [librarysData, setLibrarysData] = useState([
    {
      title: '',
      type: '',
      author: '',
      content: '',
      created_time: '',
    }
  ])

  const getLibrarysDataDtails = () => { 
    const id = searchParams.get('KnowledgeId')
    if (id) {
      getLibrarysDataList(id).then(res => {
        setLibrarysData(res as [])
      })
    }
  }

  useEffect(() => {
    getLibrarysDataDtails()
    document.title = 'Knowledge Document'
  }, [])
  return (
    <>
     <div 
      className="bg-white p-2 mx-auto my-4 rounded-lg min-h-[950px]"
      style={{width: '760px'}}
     >
        <div style={{backgroundColor: '#f0f5ff'}} className='w-full p-4'>
          <h3 className='text-xl font-semibold tracking-wider '>{librarysData[0].title}</h3>
        </div>
        <div className='flex text-sm pl-3 pt-3'>
          <p className='mr-4 text-gray-400'>Author: {librarysData[0].author}</p>
          <p className='mr-4 text-gray-400'>Time: {librarysData[0].created_time}</p>
          <p className='mr-4 text-gray-400'>Type: {librarysData[0].type}</p>
        </div>
        <Divider />
        <div 
          dangerouslySetInnerHTML={{__html: librarysData[0].content}}
          className={`
            text-gray-600 
            text-sm
            px-4 
            leading-7
            ${knwoledgeCss.knowledge}
          `}
        >
        </div>
      </div> 
    </>
  )
}
 
export default KnowledgeTemplate