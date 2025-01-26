'use client'
import { useEffect, useState } from 'react'
import { Divider } from 'antd'

const KnowledgeTemplate = () => {
  useEffect(() => {
    document.title = 'Knowledge Document'
  }, [])
  return (
    <>
     <div 
      className="bg-white p-2 mx-auto mb-0 mt-3 rounded-lg"
      style={{width: '760px'}}
     >
        <div style={{backgroundColor: '#f0f5ff'}} className='w-full p-3'>
          <h3 className='text-2xl font-semibold tracking-wider '>PAINTINDIA 2025: The Premier Global Event for the Coatings Industry</h3>
        </div>
        <div className='flex text-sm pl-3 pt-3'>
          <p className='mr-4 text-gray-400'>Author: Miles</p>
          <p className='mr-4 text-gray-400'>Time: 2025-01-01</p>
          <p className='mr-4 text-gray-400'>Type: 100</p>
        </div>
        <Divider />
        <div></div>
      </div> 
    </>
  )
}
 
export default KnowledgeTemplate