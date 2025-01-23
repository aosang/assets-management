'use client'
import { useEffect, useState } from 'react'

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
          <h3 className='text-2xl font-semibold'>PAINTINDIA 2025: The Premier Global Event for the Coatings Industry</h3>
        </div>
      </div> 
    </>
  )
}
 
export default KnowledgeTemplate